import { ArrowRight, ExternalLink, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { brand } from '../../data/brand'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Inicio — presentación principal">
      {/* Background layers */}
      <div className="absolute inset-0 bg-navy-950" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-transparent to-brand-green/5" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-blue/8 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-3xl" aria-hidden="true" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-brand-blue/15 border border-brand-blue/25 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse-slow" aria-hidden="true" />
            <span className="text-brand-blue-electric text-sm font-medium">
              Educación financiera para México
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6 text-shadow-blue">
            El ecosistema{' '}
            <span className="gradient-text">financiero</span>{' '}
            que transforma tu futuro
          </h1>

          {/* Slogan */}
          <p className="text-xl md:text-2xl font-semibold text-brand-blue-electric mb-4">
            {brand.slogan}
          </p>

          {/* Tagline */}
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
            {brand.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={brand.academyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
              aria-label="Explorar FINCORE Academia (abre en nueva ventana)"
            >
              Explorar FINCORE
              <ExternalLink size={16} />
            </a>
            <Link
              to="/nosotros"
              className="btn-secondary text-base px-8 py-4"
            >
              Conocer nuestra misión
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Stat strip */}
          <div className="mt-20 grid grid-cols-3 gap-6 max-w-xl mx-auto">
            {[
              { label: 'Áreas académicas', value: '12' },
              { label: 'Pilares del ecosistema', value: '4' },
              { label: 'Herramientas de trabajo', value: '3+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-slate-500 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 animate-bounce" aria-hidden="true">
        <ChevronDown size={24} />
      </div>
    </section>
  )
}
