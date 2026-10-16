import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import { academicCategories } from '../../data/academicAreas'

export function AcademicAreasPreview() {
  return (
    <section className="section-padding bg-navy-950" aria-labelledby="areas-heading">
      <div className="section-container">
        <SectionHeader
          eyebrow="Oferta académica"
          title="12 áreas de conocimiento"
          highlight="especializadas"
          description="Desde educación financiera básica hasta formación especializada en contabilidad, finanzas, fiscalidad, inversiones y tecnología."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {academicCategories.map((category, i) => (
            <div key={category.name} className={`card-glass border border-white/8 p-6 rounded-2xl reveal ${i === 1 ? 'reveal-delay-1' : ''}`}>
              <div className="flex items-center gap-3 mb-5">
                <Badge color={category.color as 'blue' | 'green'}>{category.name}</Badge>
              </div>
              <ul className="flex flex-col gap-3">
                {category.areas.map((area) => (
                  <li key={area.id} className="flex items-start gap-3">
                    <span className={`flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${category.color === 'blue' ? 'bg-brand-blue-electric' : 'bg-brand-green-light'}`} aria-hidden="true" />
                    <div>
                      <p className="text-white text-sm font-medium">{area.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{area.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/academia" className="btn-primary">
            Ver toda la oferta académica
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
