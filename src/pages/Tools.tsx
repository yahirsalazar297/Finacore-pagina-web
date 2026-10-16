import { useEffect } from 'react'
import { BookOpen, Calculator, TrendingUp, ExternalLink } from 'lucide-react'
import { tools } from '../data/tools'
import { brand } from '../data/brand'

const iconMap: Record<string, typeof BookOpen> = {
  BookOpen,
  Calculator,
  TrendingUp,
}

const colorMap = {
  blue: {
    icon: 'bg-brand-blue/15 text-brand-blue-electric',
    border: 'border-brand-blue/25',
    check: 'bg-brand-blue-electric',
    glow: 'from-brand-blue/20',
  },
  green: {
    icon: 'bg-brand-green/15 text-brand-green-light',
    border: 'border-brand-green/25',
    check: 'bg-brand-green-light',
    glow: 'from-brand-green/15',
  },
}

export function Tools() {
  useEffect(() => {
    document.title = 'Herramientas — FINCORE'
  }, [])

  return (
    <div className="bg-navy-950">
      {/* Hero */}
      <section className="relative section-padding pt-32 overflow-hidden" aria-label="Herramientas FINCORE">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green/6 to-transparent" aria-hidden="true" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block text-brand-green-light text-sm font-semibold tracking-widest uppercase mb-4">
            Herramientas profesionales
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            De la teoría{' '}
            <span className="gradient-text">a la práctica</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            FINCORE incorpora herramientas de trabajo diseñadas para aplicar conocimientos contables y financieros en situaciones reales, complementando tu formación académica.
          </p>
        </div>
      </section>

      {/* Tools detail */}
      <section className="section-padding bg-navy-900" aria-labelledby="tools-detail-heading">
        <div className="section-container">
          <div className="flex flex-col gap-16">
            {tools.map((tool, i) => {
              const Icon = iconMap[tool.icon]
              const colors = colorMap[tool.color as keyof typeof colorMap]
              const isReversed = i % 2 !== 0
              return (
                <div
                  key={tool.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Text */}
                  <div className={isReversed ? 'lg:col-start-2' : ''}>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${colors.icon}`}>
                      <Icon size={26} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{tool.name}</h2>
                    <p className="text-brand-blue-electric font-semibold mb-4">{tool.tagline}</p>
                    <p className="text-slate-400 leading-relaxed mb-6">{tool.description}</p>
                    <ul className="flex flex-col gap-3">
                      {tool.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.check}`} aria-hidden="true" />
                          <span className="text-slate-300 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className={isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.glow} to-transparent rounded-3xl blur-3xl`} aria-hidden="true" />
                      <div className={`relative card-glass border ${colors.border} rounded-3xl p-8`}>
                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-6 ${colors.icon}`}>
                          <Icon size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{tool.name}</h3>
                        <p className="text-slate-400 text-sm mb-6">{tool.tagline}</p>
                        <div className="grid grid-cols-2 gap-3">
                          {tool.features.map((f) => (
                            <div key={f} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                              <span className={`w-1 h-1 rounded-full flex-shrink-0 ${colors.check}`} aria-hidden="true" />
                              <span className="text-slate-300 text-xs">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-950" aria-label="Acceso a herramientas">
        <div className="section-container text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Accede a todas las herramientas en la plataforma
          </h2>
          <p className="text-slate-400 mb-8">
            Las herramientas de FINCORE están integradas en la plataforma educativa y disponibles para todos los usuarios registrados.
          </p>
          <a
            href={brand.academyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Ir a la plataforma FINCORE
            <ExternalLink size={16} />
          </a>
        </div>
      </section>
    </div>
  )
}
