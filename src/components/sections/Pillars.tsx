import { GraduationCap, Wrench, Brain, Rocket } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import { company } from '../../data/company'

const iconMap: Record<string, typeof GraduationCap> = {
  GraduationCap,
  Wrench,
  Brain,
  Rocket,
}

const colorMap = {
  blue: {
    border:  'border-brand-blue/25',
    icon:    'bg-brand-blue/15 text-brand-blue-electric',
    number:  'text-brand-blue/20',
    hover:   'card-hover-blue',
  },
  green: {
    border:  'border-brand-green/25',
    icon:    'bg-brand-green/15 text-brand-green-light',
    number:  'text-brand-green/20',
    hover:   'card-hover-green',
  },
}

const revealDelays = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3']

export function Pillars() {
  return (
    <section className="section-padding bg-navy-900" aria-labelledby="pillars-heading">
      <div className="section-container">
        <SectionHeader
          eyebrow="Los pilares de FINCORE"
          title="Un ecosistema diseñado para"
          highlight="transformar"
          description="FINCORE integra cuatro pilares que funcionan en conjunto para ofrecer una experiencia de aprendizaje y trabajo financiero completa."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {company.pillars.map((pillar, i) => {
            const Icon   = iconMap[pillar.icon]
            const colors = colorMap[pillar.color as keyof typeof colorMap]
            const delay  = revealDelays[i] ?? ''
            return (
              <div
                key={pillar.number}
                className={`group card-glass border ${colors.border} ${colors.hover} reveal ${delay} p-8`}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${colors.icon} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={26} strokeWidth={1.5} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
                        Pilar {pillar.number}
                      </span>
                      <span className={`text-5xl font-black ${colors.number} leading-none select-none`} aria-hidden="true">
                        {String(pillar.number).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{pillar.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
