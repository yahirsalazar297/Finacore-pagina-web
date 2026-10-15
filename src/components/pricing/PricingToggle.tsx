import type { BillingPeriod } from '../../data/pricing'

interface Props {
  value: BillingPeriod
  onChange: (period: BillingPeriod) => void
}

export function PricingToggle({ value, onChange }: Props) {
  return (
    <div className="flex items-center justify-center gap-4" role="group" aria-label="Periodo de facturación">
      <button
        onClick={() => onChange('monthly')}
        className={`text-sm font-semibold transition-colors ${
          value === 'monthly' ? 'text-white' : 'text-slate-400 hover:text-white'
        }`}
        aria-pressed={value === 'monthly'}
      >
        Mensual
      </button>

      <button
        onClick={() => onChange(value === 'monthly' ? 'annual' : 'monthly')}
        className="relative w-12 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        style={{ background: value === 'annual' ? 'var(--brand-blue, #2479FA)' : '#334155' }}
        role="switch"
        aria-checked={value === 'annual'}
        aria-label="Cambiar a pago anual"
      >
        <span
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
          style={{ transform: value === 'annual' ? 'translateX(24px)' : 'translateX(0)' }}
          aria-hidden="true"
        />
      </button>

      <button
        onClick={() => onChange('annual')}
        className={`text-sm font-semibold transition-colors flex items-center gap-2 ${
          value === 'annual' ? 'text-white' : 'text-slate-400 hover:text-white'
        }`}
        aria-pressed={value === 'annual'}
      >
        Anual
      </button>
    </div>
  )
}
