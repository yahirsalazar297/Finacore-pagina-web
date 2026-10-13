import { useEffect } from 'react'
import { ExternalLink, CheckCircle2 } from 'lucide-react'
import { SectionHeader } from '../components/ui/SectionHeader'
import { Badge } from '../components/ui/Badge'
import { academicCategories } from '../data/academicAreas'
import { brand } from '../data/brand'

export function Academy() {
  useEffect(() => {
    document.title = 'Academia — FINCORE'
  }, [])

  return (
    <div className="bg-navy-950">
      {/* Hero */}
      <section className="relative section-padding pt-32 overflow-hidden" aria-label="Academia FINCORE">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/8 to-transparent" aria-hidden="true" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <span className="inline-block text-brand-blue-electric text-sm font-semibold tracking-widest uppercase mb-4">
            Academia FINCORE
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            12 áreas de{' '}
            <span className="gradient-text">conocimiento especializado</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Desde educación financiera básica hasta formación avanzada en contabilidad, finanzas, tecnología y negocios. Un catálogo educativo diseñado para todos los niveles.
          </p>
          <a
            href={brand.academyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-4"
          >
            Acceder a la plataforma
            <ExternalLink size={16} />
          </a>
        </div>
      </section>

      {/* Learning benefits */}
      <section className="section-padding bg-navy-900" aria-labelledby="benefits-heading">
        <div className="section-container">
          <SectionHeader
            eyebrow="Metodología de aprendizaje"
            title="Una experiencia educativa"
            highlight="completa"
            description="Cada área académica está diseñada para que el aprendizaje sea progresivo, aplicado y medible."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: 'Cursos estructurados', desc: 'Contenido organizado en rutas de aprendizaje claras y progresivas.' },
              { label: 'Ejercicios prácticos', desc: 'Actividades para reforzar y aplicar cada concepto estudiado.' },
              { label: 'Módulos de repaso', desc: 'Revisión periódica para consolidar el conocimiento adquirido.' },
              { label: 'Evaluaciones', desc: 'Medición objetiva del progreso y comprensión de los temas.' },
            ].map((b) => (
              <div key={b.label} className="card-glass border border-white/8 rounded-2xl p-6">
                <CheckCircle2 className="text-brand-green-light mb-3" size={22} strokeWidth={1.5} />
                <h3 className="text-white font-semibold text-sm mb-2">{b.label}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic areas */}
      <section className="section-padding bg-navy-950" aria-labelledby="areas-heading">
        <div className="section-container">
          <SectionHeader
            eyebrow="Oferta académica completa"
            title="Todas las"
            highlight="áreas académicas"
          />

          <div className="flex flex-col gap-12">
            {academicCategories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center gap-4 mb-6">
                  <Badge color={category.color as 'blue' | 'green'}>{category.name}</Badge>
                  <div className="flex-1 h-px bg-white/5" aria-hidden="true" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {category.areas.map((area) => (
                    <div
                      key={area.id}
                      className={`card-glass border rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 ${
                        category.color === 'blue'
                          ? 'border-brand-blue/15 hover:border-brand-blue/35'
                          : 'border-brand-green/15 hover:border-brand-green/35'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            category.color === 'blue'
                              ? 'bg-brand-blue/20 text-brand-blue-electric'
                              : 'bg-brand-green/20 text-brand-green-light'
                          }`}
                          aria-hidden="true"
                        >
                          {area.id}
                        </span>
                        <div>
                          <h3 className="text-white font-semibold mb-2">{area.name}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">{area.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <p className="text-slate-500 text-sm mb-6">Accede a todos los cursos y herramientas en la plataforma FINCORE</p>
            <a
              href={brand.academyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Ir a la plataforma educativa
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
