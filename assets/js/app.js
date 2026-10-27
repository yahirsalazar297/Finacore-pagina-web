/* FINACORE — Future Finance 3.0
   Lógica de la página. Las funciones de negocio (precios, tabla comparativa,
   menú, navegación activa, scroll suave, ticker) conservan su comportamiento
   original; el resto es mejora progresiva: sin JS el contenido sigue visible. */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ── Precios (única fuente de verdad de esta página) ────────────────── */
  // Precios oficiales (MXN, IVA incluido). Se muestra siempre el precio mensual fijo ($99 / $199); en periodo anual
  // se añade el total anual y el ahorro, que se calcula desde esta misma tabla. Plan estudiante: $129/mes o $999/año.
  var PRICING = {
    plus: { monthly: 99,  annual: 799  },
    pro:  { monthly: 199, annual: 1599 }
  };

  var currentPeriod = 'annual';
  var pricesReady = false;

  function formatMXN(n) { return '$' + n.toLocaleString('es-MX'); }

  function setAmount(el, text) {
    var changed = pricesReady && el.textContent !== text;
    el.textContent = text;
    if (changed && !prefersReduced) {
      el.classList.remove('rolled');
      void el.offsetWidth;
      el.classList.add('rolled');
    }
  }

  function annualSavings(plan) {
    var yearAtMonthly = plan.monthly * 12;
    if (!(plan.monthly > 0 && plan.annual > 0 && plan.annual < yearAtMonthly)) return null;
    var amount = yearAtMonthly - plan.annual;
    return { amount: amount, percent: Math.round(amount / yearAtMonthly * 100) };
  }

  function showSavings(el, plan, isAnnual) {
    var saving = isAnnual ? annualSavings(plan) : null;
    if (saving) {
      el.textContent = 'Te ahorras ' + formatMXN(saving.amount) + ' al año · ' + saving.percent + '% menos';
      el.classList.add('visible');
    } else {
      el.textContent = '';
      el.classList.remove('visible');
    }
  }

  function updatePrices() {
    var isAnnual = currentPeriod === 'annual';

    // Precios fijos: $99 Plus, $199 Pro (no cambian con el toggle)
    setAmount($('#plus-price'), formatMXN(PRICING.plus.monthly));
    setAmount($('#pro-price'), formatMXN(PRICING.pro.monthly));

    // Total facturado (solo en anual)
    var plusBilled = $('#plus-billed');
    var proBilled = $('#pro-billed');
    if (isAnnual) {
      plusBilled.textContent = formatMXN(PRICING.plus.annual) + ' cobrado una vez al año';
      plusBilled.classList.add('visible');
      proBilled.textContent = formatMXN(PRICING.pro.annual) + ' cobrado una vez al año';
      proBilled.classList.add('visible');
    } else {
      plusBilled.classList.remove('visible');
      proBilled.classList.remove('visible');
    }

    // Ahorro anual vs. mensual: (mensual × 12) − anual, solo en periodo anual y solo si los precios lo permiten
    showSavings($('#plus-savings'), PRICING.plus, isAnnual);
    showSavings($('#pro-savings'), PRICING.pro, isAnnual);
  }

  function setPeriod(period) {
    currentPeriod = period;
    var isAnnual = period === 'annual';
    $('#btn-monthly').classList.toggle('active', !isAnnual);
    $('#btn-annual').classList.toggle('active', isAnnual);
    $('#btn-monthly').setAttribute('aria-pressed', String(!isAnnual));
    $('#btn-annual').setAttribute('aria-pressed', String(isAnnual));
    $('#toggle-switch').setAttribute('aria-checked', String(isAnnual));
    updatePrices();
  }

  function flipToggle() { setPeriod(currentPeriod === 'annual' ? 'monthly' : 'annual'); }

  $('#btn-monthly').addEventListener('click', function () { setPeriod('monthly'); });
  $('#btn-annual').addEventListener('click', function () { setPeriod('annual'); });
  $('#toggle-switch').addEventListener('click', flipToggle);

  updatePrices();            // render inicial (anual por defecto)
  pricesReady = true;

  /* ── Tabla comparativa ──────────────────────────────────────────────── */
  $('#compare-toggle').addEventListener('click', function () {
    var table = $('#compare-table');
    var arrow = $('#compare-arrow');
    var open = this.getAttribute('aria-expanded') === 'true';   // el estado vive en aria-expanded: la animación puede estar a medias
    if (window.FFMotion) window.FFMotion.expand(table, !open);  // motion.js: altura y opacidad animadas
    else table.hidden = open;
    this.setAttribute('aria-expanded', String(!open));
    arrow.style.transform = open ? '' : 'rotate(180deg)';
  });

  /* ── Año del copyright ──────────────────────────────────────────────── */
  $('#year').textContent = new Date().getFullYear();

  /* ── Menú móvil (hoja + dock) con foco controlado ───────────────────── */
  var hamburger = $('#hamburger');
  var sheet = $('#mobile-menu');
  var label = $('.dock-label', hamburger);
  var inertTargets = ['#main', '#navbar', 'footer', '#coming-soon', '#announce-bar', '.rail']
    .map(function (s) { return $(s); }).filter(Boolean);

  function toggleMenu(open) {
    sheet.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (label) label.textContent = open ? 'Cerrar' : 'Menú';
    document.body.style.overflow = open ? 'hidden' : '';
    inertTargets.forEach(function (el) { el.inert = open; });
    if (open) {
      var first = $('a', sheet);
      if (first) first.focus({ preventScroll: true });
    }
  }

  hamburger.addEventListener('click', function () {
    toggleMenu(!sheet.classList.contains('open'));
  });
  $$('a', sheet).forEach(function (link) {
    link.addEventListener('click', function () { toggleMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sheet.classList.contains('open')) {
      toggleMenu(false);
      hamburger.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (e) {
    if (e.matches && sheet.classList.contains('open')) toggleMenu(false);
  });

  /* ── Barra superior: estado con scroll ──────────────────────────────── */
  var navbar = $('#navbar');
  var rail = $('.rail');
  var ticking = false;
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (rail) rail.style.setProperty('--progress', p.toFixed(4));
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ── Sección activa → menú, riel y acto (suelo en perspectiva) ──────── */
  var ACT = {
    'inicio': 'aprende', 'academia': 'aprende', 'para-quien': 'aprende',
    'planes': 'aplica', 'ia': 'aplica',
    'nosotros': 'evoluciona', 'contacto': 'evoluciona', 'coming-soon': 'evoluciona'
  };
  var navLinks = $$('#desktop-menu a');
  var railStops = $$('.rail-stop');

  function setActive(id) {
    navLinks.forEach(function (l) { l.classList.remove('active'); l.removeAttribute('aria-current'); });
    var link = $('#desktop-menu a[href="#' + id + '"]');
    if (link) { link.classList.add('active'); link.setAttribute('aria-current', 'true'); }
    var act = ACT[id];
    if (act) {
      document.body.setAttribute('data-act', act);
      railStops.forEach(function (s) { s.classList.toggle('active', s.getAttribute('data-act') === act); });
    }
  }

  var sections = $$('section[id]');
  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.getAttribute('id'));
    });
  }, { threshold: 0, rootMargin: '-35% 0px -60% 0px' });   // banda fina a ~35 % de la ventana: sirve para secciones de cualquier altura
  sections.forEach(function (s) { navObserver.observe(s); });
  setActive('inicio');

  /* ── Títulos que se ensanchan al entrar (una sola vez) ──────────────── */
  var revealEls = $$('.reveal-type');
  var drawEls = $$('.access, .foot-curve, .foot-fit');
  if ('IntersectionObserver' in window) {
    var once = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          once.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });
    revealEls.concat(drawEls).forEach(function (el) { once.observe(el); });
  } else {
    revealEls.concat(drawEls).forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ── Scroll suave con compensación de la barra ──────────────────────── */
  $$('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var offset = 72;
        var top = id === '#inicio' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: prefersReduced ? 'auto' : 'smooth' });
        if (history.replaceState) history.replaceState(null, '', id);
      }
    });
  });

  /* ── Explorador académico: panel de instrumento (≥1024 px) ──────────── */
  (function () {
    var explorer = $('[data-explorer]');
    if (!explorer) return;
    var panelInner = $('[data-panel] .panel-inner', explorer);
    var items = $$('.area > details', explorer);
    var mq = window.matchMedia('(min-width: 1024px)');
    var current = null;

    function render(details) {
      if (!details || details === current) return;
      current = details;
      var title = document.createElement('h3');
      title.className = 'panel-title';
      title.textContent = $('.area-name', details).textContent;
      var body = $('.area-body', details).cloneNode(true);
      panelInner.replaceChildren(title, body);
    }
    function openOne() { return items.filter(function (d) { return d.open; })[0]; }

    function sync() {
      var on = mq.matches;
      explorer.classList.toggle('has-panel', on);
      if (on) {
        var d = openOne();
        if (!d) { d = items[0]; d.open = true; }
        current = null;
        render(d);
      }
    }

    items.forEach(function (d) {
      // Acordeón exclusivo (respaldo del atributo name)
      d.addEventListener('toggle', function () {
        if (d.open) {
          items.forEach(function (o) { if (o !== d) o.open = false; });
          if (mq.matches) render(d);
        } else if (mq.matches && !openOne()) {
          d.open = true;   // en escritorio el panel siempre muestra un área
        }
      });
      var row = d.parentElement;
      row.addEventListener('mouseenter', function () { if (mq.matches) render(d); });
      row.addEventListener('focusin', function () { if (mq.matches) render(d); });
    });
    $('.areas', explorer).addEventListener('mouseleave', function () {
      if (mq.matches) render(openOne());
    });

    mq.addEventListener('change', sync);
    sync();
  })();

  /* ── Plano del hero: paralaje sutil con el puntero ──────────────────── */
  (function () {
    var plane = $('[data-plane]');
    var hero = $('#inicio');
    if (!plane || prefersReduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var raf = 0;
    hero.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        var r = hero.getBoundingClientRect();
        var nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        var ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        plane.style.setProperty('--rx', (14 - ny * 3).toFixed(2) + 'deg');
        plane.style.setProperty('--ry', (-16 + nx * 4).toFixed(2) + 'deg');
        raf = 0;
      });
    });
    hero.addEventListener('pointerleave', function () {
      plane.style.removeProperty('--rx');
      plane.style.removeProperty('--ry');
    });
  })();

  /* ── Botones de tienda (aún sin URL): avisan "Próximamente" ─────────── */
  (function () {
    var status = $('#store-status');
    $$('.store').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.classList.add('is-hinting');
        setTimeout(function () { btn.classList.remove('is-hinting'); }, 1800);
        if (status) {
          status.textContent = '';
          setTimeout(function () { status.textContent = btn.getAttribute('data-hint'); }, 30);
        }
      });
    });
  })();

  /* ── Cinta de mercado: pausa (WCAG 2.2.2) ───────────────────────────── */
  (function () {
    var bar = $('#announce-bar');
    var btn = $('#ticker-pause');
    if (!btn) return;
    var use = $('use', btn);
    btn.addEventListener('click', function () {
      var paused = bar.classList.toggle('is-paused');
      btn.setAttribute('aria-pressed', String(paused));
      btn.setAttribute('aria-label', paused ? 'Reanudar la cinta de cotizaciones' : 'Pausar la cinta de cotizaciones');
      use.setAttribute('href', paused ? '#i-play' : '#i-pause');
    });
  })();

  /* ── Cinta de mercado: cotizaciones en vivo ─────────────────────────────
     BTC/USD y USD/MXN se muestran SOLO mientras su API responde con un valor válido.
     Si la API falla, tarda demasiado o devuelve un dato inválido, el elemento se oculta
     y se borra su valor: nunca se muestran cifras de respaldo ni valores vencidos. */
  (function () {
    var bar = $('#announce-bar');
    var TIMEOUT_MS = 10000;

    function fmtPrice(n, decimals) {
      return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    }
    function fmtPct(n) { return (n >= 0 ? '+' : '') + n.toFixed(2) + '%'; }
    function valid(n) { return typeof n === 'number' && isFinite(n) && n > 0; }
    function tickerItems(sym) { return document.querySelectorAll('.ticker-item[data-ticker="' + sym + '"]'); }
    function syncBar() {
      bar.classList.toggle('has-live', !!document.querySelector('.ticker-item[data-ticker]:not([hidden])'));
    }

    function show(sym, price, pct) {
      var decimals = sym === 'BTC/USD' ? 2 : 4;
      var hasPct = typeof pct === 'number' && isFinite(pct);
      document.querySelectorAll('[data-ticker-val="' + sym + '"]').forEach(function (el) {
        el.textContent = fmtPrice(price, decimals);
      });
      document.querySelectorAll('[data-ticker-chg="' + sym + '"]').forEach(function (el) {
        el.className = 't-chg ' + (hasPct ? (pct >= 0 ? 't-up' : 't-down') : '');
        el.textContent = hasPct ? (pct >= 0 ? '▲ ' : '▼ ') + fmtPct(pct) : '';
      });
      tickerItems(sym).forEach(function (el) { el.hidden = false; });
      syncBar();
    }

    function hide(sym) {
      tickerItems(sym).forEach(function (el) { el.hidden = true; });
      document.querySelectorAll('[data-ticker-val="' + sym + '"], [data-ticker-chg="' + sym + '"]').forEach(function (el) {
        el.textContent = '';
      });
      syncBar();
    }

    function getJSON(url) {
      var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, TIMEOUT_MS) : null;
      return fetch(url, ctrl ? { signal: ctrl.signal } : undefined)
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(function (data) { clearTimeout(timer); return data; },
              function (err) { clearTimeout(timer); throw err; });
    }

    function fetchBTC() {
      /* CoinCap v2 — gratis, sin clave, con CORS */
      getJSON('https://api.coincap.io/v2/assets/bitcoin')
        .then(function (data) {
          var d = data && data.data;
          var price = d ? parseFloat(d.priceUsd) : NaN;
          if (!valid(price)) throw new Error('dato inválido');
          show('BTC/USD', price, parseFloat(d.changePercent24Hr));
        })
        .catch(function () { hide('BTC/USD'); });
    }

    function fetchUSDMXN() {
      /* @fawazahmed0/currency-api vía jsDelivr, con respaldo en pages.dev */
      var urls = [
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
        'https://latest.currency-api.pages.dev/v1/currencies/usd.json'
      ];
      function attempt(i) {
        if (i >= urls.length) { hide('USD/MXN'); return; }
        getJSON(urls[i])
          .then(function (data) {
            var rate = data && data.usd ? data.usd.mxn : NaN;
            if (!valid(rate)) throw new Error('dato inválido');
            show('USD/MXN', rate, null);   // la fuente no entrega variación: no se muestra ninguna
          })
          .catch(function () { attempt(i + 1); });
      }
      attempt(0);
    }

    function refresh() { fetchBTC(); fetchUSDMXN(); }
    refresh();
    setInterval(refresh, 60000);
  })();
})();
