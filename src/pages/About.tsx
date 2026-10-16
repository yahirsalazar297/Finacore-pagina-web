import { useEffect } from 'react'
import { Target, Eye, Globe, Star, Lightbulb, Shield, Wrench, TrendingUp } from 'lucide-react'
import { SectionHeader } from '../components/ui/SectionHeader'
import { company } from '../data/company'
import { brand } from '../data/brand'

const iconMap: Record<string, typeof Globe> = {
  Globe, Star, Lightbulb, Shield, Wrench, TrendingUp,
}

export function About() {
  useEffect(() => {
    document.title = 'Nosotros — FINCORE'
  }, [])

  return (
    <div className="bg-navy-950">
      {/* Hero */}
      <section className="relative section-padding pt-32 overflow-hidden" aria-label="Quiénes somos">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/8 to-transparent" aria-hidden="true" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block text-brand-blue-electric text-sm font-semibold tracking-widest uppercase mb-4">
            Nuestra historia
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Conoce a{' '}
            <span className="gradient-text">FINCORE</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            {company.history}
          </p>
        </div>
      </section>

      {/* Purpose */}
      <section className="section-padding bg-navy-900" aria-labelledby="purpose-heading">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="card-glass border border-brand-blue/25 rounded-3xl p-10 text-center reveal">
              <Target className="w-12 h-12 text-brand-blue-electric mx-auto mb-5" strokeWidth={1.5} />
              <h2 id="purpose-heading" className="text-2xl font-bold text-white mb-4">Nuestro Propósito</h2>
              <p className="text-xl text-brand-blue-electric font-semibold mb-4 italic">
                "{company.purpose}"
              </p>
              <p className="text-slate-400 leading-relaxed">{company.purposeDetail}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-navy-950" aria-labelledby="mission-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="card-glass border border-white/10 rounded-3xl p-8 reveal">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/15 flex items-center justify-center">
                  <Target size={22} className="text-brand-blue-electric" strokeWidth={1.5} />
                </div>
                <h2 id="mission-heading" className="text-xl font-bold text-white">Misión</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">{company.mission}</p>
              <div className="mt-6 flex flex-col gap-2">
                {['Formación académica', 'Herramientas profesionales', 'Aplicación práctica del conocimiento'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-electric flex-shrink-0" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="card-glass border border-white/10 rounded-3xl p-8 reveal reveal-delay-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-brand-green/15 flex items-center justify-center">
                  <Eye size={22} className="text-brand-green-light" strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-bold text-white">Visión</h2>
              </div>
              <p className="text-slate-400 leading-relaxed">{company.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-navy-900" aria-labelledby="philosophy-heading">
        <div className="section-container">
          <SectionHeader
            eyebrow="Filosofía de marca"
            title="Aprende."
            highlight="Aplica. Evoluciona."
            description={company.philosophy}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { step: '01', name: 'Aprender', desc: 'Adquirir conocimientos financieros y contables sólidos que construyan bases reales.', delay: '' },
              { step: '02', name: 'Aplicar', desc: 'Utilizar herramientas prácticas para resolver necesidades cotidianas y profesionales.', delay: 'reveal-delay-1' },
              { step: '03', name: 'Evolucionar', desc: 'Desarrollar progresivamente nuevas capacidades personales y profesionales.', delay: 'reveal-delay-2' },
            ].map((item) => (
              <div key={item.step} className={`card-glass border border-white/8 rounded-2xl p-6 text-center reveal ${item.delay}`}>
                <div className="text-4xl font-black gradient-text mb-2">{item.step}</div>
                <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-navy-950" aria-labelledby="values-heading">
        <div className="section-container">
          <SectionHeader
            eyebrow="Valores corporativos"
            title="Los valores que"
            highlight="nos guían"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.values.map((value, i) => {
              const Icon = iconMap[value.icon]
              const isEven = i % 2 === 0
              const delay = ['', 'reveal-delay-1', 'reveal-delay-2', '', 'reveal-delay-1', 'reveal-delay-2'][i] ?? ''
              return (
                <div
                  key={value.name}
                  className={`card-glass border rounded-2xl p-7 reveal ${delay} ${
                    isEven ? 'border-brand-blue/20 card-hover-blue' : 'border-brand-green/20 card-hover-green'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                    isEven ? 'bg-brand-blue/15 text-brand-blue-electric' : 'bg-brand-green/15 text-brand-green-light'
                  }`}>
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{value.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Logo showcase */}
      <section className="section-padding bg-navy-900" aria-label="Identidad de marca">
        <div className="section-container text-center">
          <img
            src={brand.logo}
            alt={brand.logoAlt}
            className="h-20 w-auto object-contain mx-auto mb-6"
            loading="lazy"
          />
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            La identidad visual de FINCORE representa la convergencia entre las finanzas y la tecnología, con la precisión y el crecimiento como ejes fundamentales.
          </p>
        </div>
      </section>
    </div>
  )
}
