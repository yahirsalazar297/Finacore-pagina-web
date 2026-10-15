import { useEffect, useState } from 'react'
import type { BillingPeriod, PlanId, PriceVariant } from '../data/pricing'
import {
  IVA_INCLUDED_LABEL,
  ANALYTICS_EVENTS,
  FOUNDER,
} from '../data/pricing'
import {
  getFounderStatus,
  startCheckout,
  trackEvent,
} from '../services/subscriptionService'
import { PricingToggle } from '../components/pricing/PricingToggle'
import { PlanCard } from '../components/pricing/PlanCard'
import { ComparisonTable } from '../components/pricing/ComparisonTable'

export function Plans() {
  const [period, setPeriod] = useState<BillingPeriod>('annual')
  const [founderAvailable, setFounderAvailable] = useState(false)
  const [founderSlotsRemaining, setFounderSlotsRemaining] = useState(0)
  const [isTableOpen, setIsTableOpen] = useState(false)

  useEffect(() => {
    document.title = 'Planes y precios — FINCORE'

    // Leer estado de fundador desde el servidor
    getFounderStatus().then(status => {
      setFounderAvailable(status.available)
      setFounderSlotsRemaining(status.slotsRemaining)
    })

    // Analítica: página de precios vista
    const params = new URLSearchParams(window.location.search)
    const origin = (params.get('from') ?? 'direct') as Parameters<typeof trackEvent>[1] extends { origin?: infer O } ? O : string
    trackEvent(ANALYTICS_EVENTS.PRICING_PAGE_VIEWED, { origin })
  }, [])

  function handlePeriodChange(newPeriod: BillingPeriod) {
    setPeriod(newPeriod)
    trackEvent(ANALYTICS_EVENTS.BILLING_TOGGLE_CHANGED, { period: newPeriod })
  }

  async function handlePlanSelect(planId: PlanId, selectedPeriod: BillingPeriod, variant: PriceVariant) {
    if (planId === 'free') {
      trackEvent(ANALYTICS_EVENTS.PLAN_CLICKED, { plan: planId, period: selectedPeriod, variant })
      window.location.href = 'https://alejandrocavazos.github.io/Fincore/#/courses'
      return
    }

    trackEvent(ANALYTICS_EVENTS.PLAN_CLICKED, { plan: planId, period: selectedPeriod, variant })

    const { checkoutUrl } = await startCheckout({
      planId,
      billingPeriod: selectedPeriod,
      priceVariant: variant,
      channel: 'web-stripe',
      origin: 'nav-menu',
    })

    if (checkoutUrl && checkoutUrl !== '#backend-required') {
      window.location.href = checkoutUrl
    } else {
      // Redirigir a la plataforma mientras el backend no está listo
      window.location.href = 'https://alejandrocavazos.github.io/Fincore/#/courses'
    }
  }

  return (
    <div style={{ background: '#081126', minHeight: '100vh' }}>
      {/* ── Hero de precios ─────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-16 text-center overflow-hidden"
        aria-labelledby="planes-heading"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(36,121,250,0.12), transparent)',
          }}
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: '#2479FA' }}
          >
            Planes y precios
          </span>
          <h1
            id="planes-heading"
            className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
          >
            Elige el plan que{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#2479FA,#20BF8F)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              se adapta a ti
            </span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Desde educación financiera básica hasta el ecosistema completo con herramientas
            profesionales, IA y las 12 áreas académicas.
          </p>

          {/* Toggle mensual / anual */}
          <PricingToggle value={period} onChange={handlePeriodChange} />

          {/* Contador de fundadores */}
          {founderAvailable && (
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mt-5 text-xs font-semibold"
              style={{
                background: 'rgba(32,191,143,0.1)',
                border: '1px solid rgba(32,191,143,0.3)',
                color: '#20BF8F',
              }}
            >
              <span>⚡</span>
              <span>
                Quedan {founderSlotsRemaining} de {FOUNDER.limit} lugares con precio de fundador
              </span>
            </div>
          )}

          {/* IVA */}
          <p className="text-slate-500 text-xs mt-4">{IVA_INCLUDED_LABEL}</p>
        </div>
      </section>

      {/* ── Tarjetas de plan ────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-16" aria-label="Comparación de planes">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PlanCard
            planId="free"
            period={period}
            founderAvailable={founderAvailable}
            founderSlotsRemaining={founderSlotsRemaining}
            onSelect={handlePlanSelect}
          />
          <PlanCard
            planId="plus"
            period={period}
            founderAvailable={founderAvailable}
            founderSlotsRemaining={founderSlotsRemaining}
            isHighlighted
            onSelect={handlePlanSelect}
          />
          <PlanCard
            planId="pro"
            period={period}
            founderAvailable={founderAvailable}
            founderSlotsRemaining={founderSlotsRemaining}
            badge="Más completo"
            onSelect={handlePlanSelect}
          />
        </div>

        {/* Enlace precio estudiante */}
        <div className="text-center mt-8">
          <a
            href="/inteligencia-artificial?ref=student-pricing"
            className="text-sm font-semibold underline underline-offset-4 transition-colors"
            style={{ color: '#20BF8F' }}
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.PLAN_CLICKED, {
                plan: 'pro',
                period,
                variant: 'student',
                origin: 'student-link',
              })
            }
          >
            ¿Eres estudiante? Obtén Pro a precio especial
          </a>
          <p className="text-slate-500 text-xs mt-1">
            Verifica tu correo institucional y paga desde $129/mes o $999/año
          </p>
        </div>
      </section>

      {/* ── Tabla comparativa ────────────────────────────────────── */}
      <section
        className="max-w-5xl mx-auto px-6 pb-24"
        aria-labelledby="tabla-heading"
      >
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(16,32,62,0.6)',
            border: '1px solid rgba(36,121,250,0.12)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <button
            className="w-full flex items-center justify-between text-left"
            onClick={() => setIsTableOpen(prev => !prev)}
            aria-expanded={isTableOpen}
            aria-controls="comparison-table"
          >
            <h2
              id="tabla-heading"
              className="text-lg font-bold text-white"
            >
              Comparativa completa de planes
            </h2>
            <span
              className="text-slate-400 text-sm transition-transform"
              style={{ transform: isTableOpen ? 'rotate(180deg)' : undefined }}
              aria-hidden="true"
            >
              ▼
            </span>
          </button>

          <div
            id="comparison-table"
            hidden={!isTableOpen}
          >
            <ComparisonTable />
          </div>

          {!isTableOpen && (
            <p className="text-slate-500 text-sm mt-3">
              Haz clic para ver la comparativa de 12 áreas, herramientas, vidas y más.
            </p>
          )}
        </div>
      </section>

      {/* ── FAQ / notas ──────────────────────────────────────────── */}
      <section
        className="max-w-3xl mx-auto px-6 pb-24"
        aria-labelledby="faq-heading"
      >
        <h2
          id="faq-heading"
          className="text-xl font-bold text-white text-center mb-8"
        >
          Preguntas frecuentes
        </h2>
        <div className="flex flex-col gap-4">
          <FaqItem
            q="¿Puedo cambiar de plan en cualquier momento?"
            a="Sí. Si subes de plan el cambio es inmediato y solo pagas la diferencia proporcional de los días restantes. Si bajas de plan, conservas el acceso actual hasta el final del periodo que ya pagaste."
          />
          <FaqItem
            q="¿Qué pasa con mi progreso si bajo de plan?"
            a="Tu progreso en las áreas que dejan de estar incluidas en tu nuevo plan se guarda con un candado. En cuanto vuelvas a ese plan o superior, lo recuperas exactamente donde lo dejaste."
          />
          <FaqItem
            q="¿Cómo cancelo mi suscripción?"
            a="Desde Configuración → Mi suscripción puedes cancelar en cualquier momento, sin contactar a nadie. Conservas el acceso hasta el final del periodo que ya pagaste y después pasas al plan Gratis."
          />
          <FaqItem
            q="¿Qué formas de pago aceptan?"
            a="En la web aceptamos tarjeta de crédito y débito (Stripe). Para el plan anual también aceptamos pago en OXXO (Mercado Pago). Dentro de las apps de iOS y Android el pago se procesa con el sistema de la tienda correspondiente."
          />
          <FaqItem
            q="¿Los precios incluyen IVA?"
            a="Sí. Todos los precios mostrados están en pesos mexicanos e incluyen el IVA del 16%, como lo exige la ley mexicana para precios al consumidor final."
          />
          <FaqItem
            q="¿Puedo pausar mi suscripción?"
            a={`Sí, puedes pausar hasta 2 veces por año, un mes cada vez. Durante la pausa no se te cobra y tienes acceso de plan Gratis. Tu progreso se mantiene intacto.`}
          />
        </div>
      </section>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <button
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white">{q}</span>
        <span
          className="text-slate-400 transition-transform flex-shrink-0"
          style={{ transform: open ? 'rotate(180deg)' : undefined }}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-slate-400 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}
