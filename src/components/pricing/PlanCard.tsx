import type { BillingPeriod, PlanId, PriceVariant } from '../../data/pricing'
import {
  LIMITS,
  CONTENT,
  IVA_INCLUDED_LABEL,
  PLAN_NAMES,
  PLAN_TAGLINES,
  TRIAL,
  PRICES,
  getAnnualSavings,
} from '../../data/pricing'
import {
  getBilledTotal,
  formatPrice,
} from '../../services/subscriptionService'

interface Props {
  planId: PlanId
  period: BillingPeriod
  isHighlighted?: boolean
  badge?: string
  onSelect: (planId: PlanId, period: BillingPeriod, variant: PriceVariant) => void
}

function LivesLabel(lives: number | typeof Infinity): string {
  return lives === Infinity ? 'Ilimitadas' : `${lives} vidas`
}

function AiLabel(questions: number | typeof Infinity): string {
  if (questions === Infinity) return 'Ilimitadas'
  return `${questions} preguntas/día`
}

export function PlanCard({
  planId,
  period,
  isHighlighted = false,
  badge,
  onSelect,
}: Props) {
  const isFree = planId === 'free'
  const variant: PriceVariant = 'regular'

  const fixedMonthlyPrice = planId === 'free' ? 0 : planId === 'plus' ? PRICES.plus.monthly : PRICES.pro.monthly
  const billedTotal = getBilledTotal(planId, period, variant)
  const annualSavings = !isFree ? getAnnualSavings(planId as 'plus' | 'pro') : null

  const lives = LIMITS.lives[planId]
  const aiQuestions = LIMITS.aiQuestionsPerDay[planId === 'free' ? 'free' : planId === 'plus' ? 'plus' : 'pro']
  const topicCount = planId === 'free' ? CONTENT.free.topics : planId === 'plus' ? CONTENT.plus.topics : CONTENT.pro.topics

  const cardBorderStyle = isHighlighted
    ? { border: '1px solid rgba(36,121,250,0.5)', background: 'rgba(36,121,250,0.07)' }
    : { border: '1px solid rgba(36,121,250,0.12)', background: 'rgba(16,32,62,0.65)' }

  return (
    <div
      className="relative flex flex-col rounded-2xl p-8 backdrop-blur-sm"
      style={cardBorderStyle}
    >
      {badge && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap"
          style={{ background: '#2479FA' }}
        >
          {badge}
        </div>
      )}

      {/* Nombre del plan */}
      <div className="mb-1">
        <span
          className={`text-2xl font-black ${
            planId === 'pro'
              ? 'bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent'
              : planId === 'plus'
              ? 'text-brand-blue'
              : 'text-white'
          }`}
          style={planId === 'pro' ? {
            background: 'linear-gradient(135deg,#2479FA,#20BF8F)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          } : undefined}
        >
          {PLAN_NAMES[planId]}
        </span>
      </div>
      <p className="text-slate-400 text-sm mb-6">{PLAN_TAGLINES[planId]}</p>

      {/* Precio principal */}
      {isFree ? (
        <div className="mb-2">
          <span className="text-4xl font-black text-white">$0</span>
          <span className="text-slate-400 text-sm ml-1">/ siempre</span>
        </div>
      ) : (
        <>
          <div className="flex items-end gap-1 mb-1">
            <span className="text-4xl font-black text-white">{formatPrice(fixedMonthlyPrice)}</span>
            <span className="text-slate-400 text-sm mb-1.5">/ mes</span>
          </div>
          {period === 'annual' && (
            <p className="text-slate-400 text-sm mb-1">
              {formatPrice(billedTotal)} cobrado una vez al año
            </p>
          )}
          {period === 'annual' && annualSavings && (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold mt-1 mb-1 self-start"
              style={{
                background: 'rgba(32,191,143,0.12)',
                border: '1px solid rgba(32,191,143,0.25)',
                color: '#20BF8F',
              }}
            >
              Te ahorras {formatPrice(annualSavings.amount)} al año · {annualSavings.percent}% menos
            </div>
          )}
        </>
      )}

      {/* IVA */}
      <p className="text-xs text-slate-500 mb-6">{IVA_INCLUDED_LABEL}</p>

      {/* Highlights de funcionalidades */}
      <ul className="flex flex-col gap-2.5 mb-8 flex-1">
        <FeatureRow label="Temas disponibles" value={`${topicCount} de ${CONTENT.totalTopics}`} />
        <FeatureRow label="Vidas" value={LivesLabel(lives)} />
        <FeatureRow
          label="Laboratorio contable"
          value={LIMITS.labExercises[planId] === Infinity ? 'Acceso completo' : `${LIMITS.labExercises.free} ejercicios`}
        />
        <FeatureRow
          label="Calculadoras"
          value={planId === 'free' ? '2 básicas' : planId === 'plus' ? 'Todas + ISR e IVA' : 'Todas'}
        />
        <FeatureRow
          label="Inversión y valuación"
          value={planId === 'pro' ? 'Incluido' : '🔒 Bloqueado'}
          locked={planId !== 'pro'}
        />
        <FeatureRow label="Tutor IA" value={AiLabel(aiQuestions)} />
        <FeatureRow
          label="Estadísticas"
          value={LIMITS.statistics[planId] === 'basic' ? 'Básicas' : 'Detalladas'}
        />
      </ul>

      {/* Trial label para Pro */}
      {planId === 'pro' && !isFree && (
        <p className="text-center text-xs text-brand-green mb-3 font-semibold">
          🎁 Prueba gratis {TRIAL.durationDays} días — cancela cuando quieras
        </p>
      )}

      {/* CTA */}
      {isFree ? (
        <button
          onClick={() => onSelect(planId, period, 'regular')}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
          style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
        >
          Comenzar gratis
        </button>
      ) : (
        <button
          onClick={() => onSelect(planId, period, variant)}
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all text-white"
          style={{
            background: planId === 'pro' ? 'linear-gradient(135deg,#2479FA,#20BF8F)' : '#2479FA',
          }}
        >
          {planId === 'pro' ? `Probar Pro gratis ${TRIAL.durationDays} días` : 'Obtener Plus'}
        </button>
      )}
    </div>
  )
}

function FeatureRow({
  label,
  value,
  locked = false,
}: {
  label: string
  value: string
  locked?: boolean
}) {
  return (
    <li className="flex items-start justify-between gap-2 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className={`font-semibold text-right ${locked ? 'text-slate-500' : 'text-white'}`}>
        {value}
      </span>
    </li>
  )
}
