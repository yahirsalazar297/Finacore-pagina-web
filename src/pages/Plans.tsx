import { useEffect } from 'react'
import { Clock, ExternalLink } from 'lucide-react'
import { plans } from '../data/plans'
import { brand } from '../data/brand'

export function Plans() {
  useEffect(() => {
    document.title = 'Planes — FINCORE'
  }, [])

  return (
    <div className="bg-navy-950">
      {/* Hero */}
      <section className="relative section-padding pt-32 overflow-hidden" aria-label="Planes FINCORE">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/8 to-transparent" aria-hidden="true" />
        <div className="section-container relative z-10 text-center max-w-2xl mx-auto">
          <span className="inline-block text-brand-blue-electric text-sm font-semibold tracking-widest uppercase mb-4">
            Planes y acceso
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Elige el plan{' '}
            <span className="gradient-text">que se adapta a ti</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            FINCORE contempla un modelo que combina acceso básico con planes especializados. Los detalles comerciales están siendo finalizados.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding bg-navy-900" aria-labelledby="plans-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative card-glass rounded-2xl p-8 flex flex-col ${
                  plan.highlighted
                    ? 'border border-brand-blue/50 shadow-xl shadow-brand-blue/10'
                    : 'border border-white/8'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-blue text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                      Popular
                    </span>
                  </div>
                )}

                <h2 className="text-xl font-bold text-white mb-2">{plan.name}</h2>

                {plan.pending ? (
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={14} className="text-slate-500" />
                    <span className="text-slate-500 text-sm">Precio por confirmar</span>
                  </div>
                ) : (
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                  </div>
                )}

                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{plan.description}</p>

                {plan.pending && (
                  <div className="bg-white/5 border border-white/8 rounded-xl p-3 mb-6">
                    <p className="text-slate-500 text-xs text-center">
                      Los beneficios y condiciones de este plan están siendo definidos.
                    </p>
                  </div>
                )}

                <a
                  href={brand.academyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={plan.highlighted ? 'btn-primary justify-center' : 'btn-secondary justify-center'}
                >
                  {plan.cta}
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-2xl mx-auto text-center card-glass border border-white/8 rounded-2xl p-6">
            <Clock className="w-8 h-8 text-slate-500 mx-auto mb-3" strokeWidth={1.5} />
            <h3 className="text-white font-semibold mb-2">Información comercial en proceso</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Los precios, beneficios específicos y condiciones de cada plan están siendo definidos por el equipo de FINCORE. Esta sección se actualizará con información oficial una vez confirmada.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
