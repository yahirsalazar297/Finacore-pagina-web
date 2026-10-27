/* FINACORE — Future Finance · sistema de movimiento (Fase 4)
   Capa opcional: si este archivo no carga o falla, la página funciona igual y todo el contenido es visible.
   No cambia contenido, precios, enlaces ni lógica; solo añade estados visuales y animaciones.

   Qué hace:
   · Revelaciones al hacer scroll (IntersectionObserver, una vez, con escalonado) y limpieza posterior.
   · Indicador de navegación único que se desliza entre secciones y sigue al cursor/foco.
   · Transiciones entre categorías académicas: regla verde de la categoría abierta, color del panel, cambio animado.
   · Utilidades de componente (FFMotion.expand) para la tabla comparativa.
   · Vínculo plan ↔ punto de la curva de acceso. Pausa del movimiento ambiental fuera de pantalla / con ahorro de datos.
   Con prefers-reduced-motion, sin IntersectionObserver, con ahorro de datos o en equipos de ≤ 2 GB el <head> no añade
   html.motion: no hay revelaciones y todo el contenido se muestra de inmediato. */
(function () {
  'use strict';

  var root = document.documentElement;
  var motion = root.classList.contains('motion');
  var $ = function (sel, el) { return (el || document).querySelector(sel); };
  var $$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };
  var EASE = 'cubic-bezier(.2, 0, 0, 1)';
  var canAnimate = motion && typeof Element.prototype.animate === 'function';

  /* ── Utilidades de componente ───────────────────────────────────────── */
  var FF = window.FFMotion = {
    /* Abre o cierra un bloque con [hidden] animando altura y opacidad (acción iniciada por la persona). */
    expand: function (el, show) {
      if (el._ffAnim) { el._ffAnim.cancel(); el._ffAnim = null; }
      if (!canAnimate) { el.hidden = !show; return; }
      var from, to, anim;
      if (show) {
        el.hidden = false;
        from = { height: '0px', opacity: 0 };
        to = { height: el.scrollHeight + 'px', opacity: 1 };
      } else {
        from = { height: el.offsetHeight + 'px', opacity: 1 };
        to = { height: '0px', opacity: 0 };
      }
      el.style.overflow = 'hidden';
      anim = el._ffAnim = el.animate([from, to], { duration: 320, easing: EASE });
      var done = function () {
        if (el._ffAnim !== anim) return;          // sustituida por otra animación: ella limpia
        el._ffAnim = null;
        el.style.overflow = '';
        el.hidden = !show;
      };
      anim.onfinish = done;
      anim.oncancel = function () { if (el._ffAnim === anim) { el._ffAnim = null; el.style.overflow = ''; el.hidden = !show; } };
    }
  };

  /* ── Ahorro de datos / equipos modestos: sin movimiento ambiental ───── */
  try {
    var conn = navigator.connection;
    if ((conn && conn.saveData) || (navigator.deviceMemory && navigator.deviceMemory <= 2)) root.classList.add('no-ambient');
  } catch (e) { /* sin API: se mantiene el movimiento ambiental */ }

  /* ── Revelación al hacer scroll ─────────────────────────────────────── */
  function initReveal() {
    var els = $$('[data-reveal]');
    var STAGGER = 70;

    // Cada lote revelado se limpia con un único temporizador (una sola invalidación de estilos, no una por elemento)
    function revealBatch(list) {
      var life = 0;
      list.forEach(function (el, i) {
        var kind = el.getAttribute('data-reveal');
        if (kind !== 'draw') el.style.setProperty('--d', Math.min(i, 5) * STAGGER + 'ms');
        el.classList.add('is-in');
        life = Math.max(life, (el.classList.contains('cover') ? 1500 : (kind === 'draw' ? 1900 : 1000)) + Math.min(i, 5) * STAGGER);
      });
      // Limpieza: tras la revelación el elemento queda exactamente como si nunca hubiera tenido el marcador
      setTimeout(function () {
        list.forEach(function (el) { el.removeAttribute('data-reveal'); el.style.removeProperty('--d'); });
      }, life);
    }

    var io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) {
        // Elementos muy altos (secciones) cuentan cuando una parte razonable ya está a la vista
        return e.isIntersecting && (e.intersectionRatio >= 0.12 || e.intersectionRect.height > window.innerHeight * 0.25);
      });
      batch.sort(function (a, b) {
        return (a.boundingClientRect.top - b.boundingClientRect.top) || (a.boundingClientRect.left - b.boundingClientRect.left);
      });
      batch.forEach(function (e) { io.unobserve(e.target); });
      if (batch.length) revealBatch(batch.map(function (e) { return e.target; }));
    }, { threshold: [0, 0.12], rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });

    // El margen inferior de -8 % deja fuera lo que queda pegado al final de la página (copyright del footer):
    // al llegar al final se revela todo lo pendiente que ya está en pantalla.
    var endTick = false;
    function flushAtEnd() {
      endTick = false;
      if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 4) return;
      var rest = els.filter(function (el) {
        return el.hasAttribute('data-reveal') && !el.classList.contains('is-in') && el.getClientRects().length &&
               el.getBoundingClientRect().top < window.innerHeight;
      });
      rest.forEach(function (el) { io.unobserve(el); });
      if (rest.length) revealBatch(rest);
    }
    window.addEventListener('scroll', function () {
      if (!endTick) { endTick = true; requestAnimationFrame(flushAtEnd); }
    }, { passive: true });
    requestAnimationFrame(flushAtEnd);
    root.classList.add('motion-ready');
  }

  /* ── Indicador de navegación ─────────────────────────────────────────── */
  function initNavInk() {
    var menu = $('#desktop-menu');
    var ink = menu && $('.nav-ink', menu);
    if (!ink) return;
    var links = $$('a', menu);
    var raf = 0;

    function activeLink() { return $('a.active', menu); }
    function place(link, animate) {
      if (!link) { menu.classList.remove('has-ink'); return; }
      if (!animate) menu.classList.remove('ink-ready');
      var cs = getComputedStyle(link);
      var pl = parseFloat(cs.paddingLeft) || 0, pr = parseFloat(cs.paddingRight) || 0;
      menu.style.setProperty('--ink-x', (link.offsetLeft + pl).toFixed(1) + 'px');
      menu.style.setProperty('--ink-w', Math.max(0, (link.offsetWidth - pl - pr) / 100).toFixed(4));
      menu.classList.add('has-ink');
      if (!animate) {
        void menu.offsetWidth;                                        // fija la posición sin transición
        requestAnimationFrame(function () { menu.classList.add('ink-ready'); });
      }
    }
    function reset() { place(activeLink(), false); }

    // Solo se observan los enlaces: place() cambia clases de #desktop-menu y observarlo a él sería un bucle
    var watcher = new MutationObserver(function () { place(activeLink(), true); });
    links.forEach(function (a) { watcher.observe(a, { attributes: true, attributeFilter: ['class'] }); });

    links.forEach(function (a) {
      a.addEventListener('focus', function () { place(a, true); });
      a.addEventListener('blur', function () { place(activeLink(), true); });
    });
    if (window.matchMedia('(hover: hover)').matches) {
      links.forEach(function (a) { a.addEventListener('mouseenter', function () { place(a, true); }); });
      menu.addEventListener('mouseleave', function () { place(activeLink(), true); });
    }
    window.addEventListener('resize', function () {
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; reset(); });
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(reset);
    reset();
  }

  /* ── Categorías académicas: regla, tono y cambio de panel ────────────── */
  function initCategories() {
    var explorer = $('[data-explorer]');
    if (!explorer) return;
    var cats = $$('.area-cat', explorer);
    var panel = $('[data-panel]', explorer);
    var inner = panel && $('.panel-inner', panel);

    function syncOpen() {
      cats.forEach(function (c) { c.classList.toggle('has-open', !!$('details[open]', c)); });
    }
    // El evento toggle no burbujea: se escucha en captura
    explorer.addEventListener('toggle', syncOpen, true);
    syncOpen();

    if (!inner) return;
    var swap = null;
    function paintTone() {
      var title = $('.panel-title', inner);
      if (!title) return;
      var name = title.textContent;
      var hit = $$('.area-name', explorer).filter(function (n) { return n.textContent === name; })[0];
      var cat = hit && hit.closest('.area-cat');
      if (cat) panel.setAttribute('data-tone', cat.getAttribute('data-tone') || '');
    }
    // app.js sustituye el contenido del panel (clic, hover o foco): aquí solo se anima y se tiñe
    new MutationObserver(function () {
      paintTone();
      if (!canAnimate) return;
      if (swap) swap.cancel();
      swap = inner.animate(
        [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }],
        { duration: 220, easing: EASE }
      );
    }).observe(inner, { childList: true });
    paintTone();
  }

  /* ── Planes ↔ curva de acceso ────────────────────────────────────────── */
  function initPlanLink() {
    var plans = $$('#plans-grid > .plan');
    var pts = $$('.access .pt');
    if (!plans.length || plans.length !== pts.length) return;
    function set(i, on) { pts[i].classList.toggle('is-active', on); }
    plans.forEach(function (plan, i) {
      plan.addEventListener('focusin', function () { set(i, true); });
      plan.addEventListener('focusout', function () { set(i, false); });
      if (window.matchMedia('(hover: hover)').matches) {
        plan.addEventListener('mouseenter', function () { set(i, true); });
        plan.addEventListener('mouseleave', function () { set(i, false); });
      }
    });
  }

  /* ── Movimiento ambiental: se pausa cuando no se ve ──────────────────── */
  function initAmbient() {
    var wrap = $('.plane-wrap');
    var ground = $('.ground');
    if (!wrap) return;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        wrap.classList.toggle('is-offscreen', !e.isIntersecting);
        if (ground) ground.classList.toggle('is-paused', !e.isIntersecting);   // el suelo deriva solo mientras se ve el hero
      });
    }).observe(wrap);
  }

  /* ── Progreso de lectura: respaldo sin scroll-timeline ───────────────── */
  function initProgress() {
    var bar = $('.nav-progress');
    if (!bar) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()') && !reduced) return;   // lo hace CSS
    var wide = window.matchMedia('(min-width: 1280px)');
    var tick = false;
    function update() {
      tick = false;
      if (wide.matches) return;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0).toFixed(4) + ')';
    }
    window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function safe(fn) { try { fn(); } catch (e) { if (window.console) console.warn('motion:', e); } }

  if (motion) {
    safe(initReveal);
    safe(initAmbient);
    safe(initPlanLink);
  }
  safe(initProgress);
  safe(initNavInk);          // con movimiento reducido motion.css no lo pinta: queda el subrayado original
  safe(initCategories);
})();
