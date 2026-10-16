import { useEffect } from 'react'
import { Globe, Users, TrendingUp, BookOpen, Heart } from 'lucide-react'
import { SectionHeader } from '../components/ui/SectionHeader'
import { company } from '../data/company'

const sdgs = [
  {
    number: '4',
    name: 'Educación de calidad',
    description: 'Garantizar una educación inclusiva, equitativa y de calidad.',
    color: 'blue',
  },
  {
    number: '8',
    name: 'Trabajo decente y crecimiento económico',
    description: 'Promover el crecimiento económico inclusivo y sostenible.',
    color: 'green',
  },
  {
    number: '10',
    name: 'Reducción de las desigualdades',
    description: 'Reducir la desigualdad en y entre los países.',
    color: 'blue',
  },
]

export function Impact() {
  useEffect(() => {
    document.title = 'Impacto Social — FINCORE'
  }, [])

  return (
    <div className="bg-navy-950">
      {/* Hero */}
      <section className="relative section-padding pt-32 overflow-hidden" aria-label="Impacto social FINCORE">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green/8 to-transparent" aria-hidden="true" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <Heart className="w-16 h-16 text-brand-green-light mx-auto mb-5" strokeWidth={1.5} />
          <span className="inline-block text-brand-green-light text-sm font-semibold tracking-widest uppercase mb-4">
            Impacto social
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Democratizando la{' '}
            <span className="gradient-text">educación financiera</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            {company.purpose} {company.purposeDetail}
          </p>
        </div>
      </section>

      {/* Segments */}
      <section className="section-padding bg-navy-900" aria-labelledby="segments-heading">
        <div className="section-container">
          <SectionHeader
            eyebrow="A quién servimos"
            title="Educación financiera"
            highlight="para todos"
            description="FINCORE elimina las barreras de acceso al conocimiento financiero, sin importar el nivel de experiencia o situación económica del usuario."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {company.segments.map((segment, i) => {
              const isBlue = i % 2 === 0
              const delay = ['', 'reveal-delay-1', 'reveal-delay-2', '', 'reveal-delay-1', 'reveal-delay-2'][i] ?? ''
              return (
                <div
                  key={segment.name}
                  className={`card-glass border rounded-2xl p-7 reveal ${delay} ${
                    isBlue ? 'border-brand-blue/20 card-hover-blue' : 'border-brand-green/20 card-hover-green'
                  }`}
                >
                  <Users
                    className={`mb-4 ${isBlue ? 'text-brand-blue-electric' : 'text-brand-green-light'}`}
                    size={22}
                    strokeWidth={1.5}
                  />
                  <h3 className="text-white font-bold mb-2 text-sm">{segment.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{segment.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Accessibility focus */}
      <section className="section-padding bg-navy-950" aria-labelledby="access-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="access-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
                Accesibilidad como principio fundamental
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                FINCORE surge de la convicción de que el conocimiento financiero no debería ser un privilegio reservado para quienes tuvieron acceso a educación formal especializada o pueden pagar asesoría profesional costosa.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Mediante tecnología educativa, herramientas de trabajo accesibles e inteligencia artificial, FINCORE acerca las finanzas a personas de todos los niveles y contextos, contribuyendo al desarrollo económico y a la reducción de la brecha de conocimiento financiero en México.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Globe, title: 'Acceso desde cualquier lugar', desc: 'Plataforma digital disponible en todo momento.' },
                { icon: BookOpen, title: 'Todos los niveles', desc: 'Desde principiantes hasta profesionistas especializados.' },
                { icon: TrendingUp, title: 'Aplicación real', desc: 'Herramientas para usar el conocimiento en situaciones cotidianas.' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="card-glass border border-white/8 rounded-2xl p-5 flex items-center gap-4 reveal card-hover-neutral">
                    <div className="w-11 h-11 rounded-xl bg-brand-green/15 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-brand-green-light" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                      <p className="text-slate-400 text-xs">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SDGs - conceptual alignment only */}
      <section className="section-padding bg-navy-900" aria-labelledby="sdg-heading">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 id="sdg-heading" className="text-2xl font-bold text-white text-center mb-3">
              Alineación conceptual con los Objetivos de Desarrollo Sostenible
            </h2>
            <p className="text-slate-400 text-center text-sm mb-10 leading-relaxed">
              El propósito y las actividades de FINCORE se alinean conceptualmente con los siguientes ODS de la Agenda 2030 de Naciones Unidas. Esta alineación es de carácter conceptual y no implica aval ni alianza formal con organismos internacionales.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {sdgs.map((sdg, i) => (
                <div
                  key={sdg.number}
                  className={`card-glass border rounded-2xl p-6 text-center reveal ${['', 'reveal-delay-1', 'reveal-delay-2'][i]} ${
                    sdg.color === 'blue' ? 'border-brand-blue/20 card-hover-blue' : 'border-brand-green/20 card-hover-green'
                  }`}
                >
                  <div className={`text-3xl font-black gradient-text mb-2`}>ODS {sdg.number}</div>
                  <h3 className="text-white font-bold text-sm mb-2">{sdg.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{sdg.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
