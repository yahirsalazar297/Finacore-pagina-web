import { BookOpen, Calculator, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeader } from '../ui/SectionHeader'
import { tools } from '../../data/tools'

const iconMap: Record<string, typeof BookOpen> = {
  BookOpen,
  Calculator,
  TrendingUp,
}

const colorMap = {
  blue: {
    icon: 'bg-brand-blue/15 text-brand-blue-electric',
    border: 'border-brand-blue/20 hover:border-brand-blue/50',
    check: 'text-brand-blue-electric',
  },
  green: {
    icon: 'bg-brand-green/15 text-brand-green-light',
    border: 'border-brand-green/20 hover:border-brand-green/50',
    check: 'text-brand-green-light',
  },
}

export function ToolsPreview() {
  return (
    <section className="section-padding bg-navy-900" aria-labelledby="tools-heading">
      <div className="section-container">
        <SectionHeader
          eyebrow="Herramientas profesionales"
          title="De la teoría"
          highlight="a la práctica"
          description="FINACORE integra herramientas de trabajo diseñadas para aplicar conocimientos contables y financieros en situaciones reales."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => {
            const Icon = iconMap[tool.icon]
            const colors = colorMap[tool.color as keyof typeof colorMap]
            return (
              <div
                key={tool.id}
                className={`card-glass border ${colors.border} p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${colors.icon}`}>
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{tool.name}</h3>
                <p className="text-brand-blue-electric text-xs font-semibold mb-3">{tool.tagline}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{tool.description}</p>
                <ul className="flex flex-col gap-2">
                  {tool.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${colors.check === 'text-brand-blue-electric' ? 'bg-brand-blue-electric' : 'bg-brand-green-light'}`} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                  {tool.features.length > 3 && (
                    <li className="text-xs text-slate-500">+{tool.features.length - 3} más</li>
                  )}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link to="/herramientas" className="btn-outline-green">
            Explorar todas las herramientas
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
