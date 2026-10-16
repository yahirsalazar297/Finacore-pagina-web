import { ExternalLink, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { brand } from '../../data/brand'

export function HomeCTA() {
  return (
    <section className="section-padding bg-navy-900" aria-labelledby="cta-heading">
      <div className="section-container">
        <div className="relative overflow-hidden card-glass border border-brand-blue/20 rounded-3xl p-10 md:p-16 text-center reveal">
          {/* Glow effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue/10 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-brand-green/8 rounded-full blur-3xl" aria-hidden="true" />

          <div className="relative z-10">
            <span className="inline-block text-brand-blue-electric text-sm font-semibold tracking-widest uppercase mb-4">
              Empieza hoy
            </span>
            <h2 id="cta-heading" className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Tu camino hacia la{' '}
              <span className="gradient-text">educación financiera</span>{' '}
              comienza aquí
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Únete a FINCORE y accede a un ecosistema de aprendizaje, herramientas profesionales e inteligencia artificial diseñado para transformar tu conocimiento financiero.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={brand.academyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-10 py-4"
              >
                Explorar FINCORE
                <ExternalLink size={16} />
              </a>
              <Link to="/planes" className="btn-secondary text-base px-10 py-4">
                Ver planes disponibles
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
