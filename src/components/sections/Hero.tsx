import { ArrowRight, ExternalLink, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { brand } from '../../data/brand'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Inicio — presentación principal">

      {/* Background layers */}
      <div className="absolute inset-0 bg-navy-950" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/12 via-transparent to-brand-green/6" aria-hidden="true" />

      {/* Primary glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Secondary green accent */}
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 py-20 md:py-36">
        <div className="max-w-4xl mx-auto text-center">

          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 bg-brand-blue/15 border border-brand-blue/25 rounded-full px-5 py-2 mb-10 animate-fade-in-up">
            <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse-slow" aria-hidden="true" />
            <span className="text-brand-blue-electric text-sm font-medium tracking-wide">
              Educación financiera para México
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 text-shadow-strong animate-fade-in-up-d1"
          >
            El ecosistema{' '}
            <span className="gradient-text">financiero</span>{' '}
            que transforma tu futuro
          </h1>

          {/* Slogan */}
          <p className="text-xl md:text-2xl font-semibold text-brand-blue-electric mb-4 animate-fade-in-up-d2">
            {brand.slogan}
          </p>

          {/* Tagline */}
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 animate-fade-in-up-d3">
            {brand.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-d4">
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
          <div className="mt-24 animate-fade-in-up-d5">
            <div className="inline-grid grid-cols-3 divide-x divide-white/10 max-w-lg mx-auto">
              {[
                { label: 'Áreas académicas',       value: '12'  },
                { label: 'Pilares del ecosistema', value: '4'   },
                { label: 'Herramientas de trabajo', value: '3+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center px-8 first:pl-0 last:pr-0">
                  <div className="text-4xl font-extrabold gradient-text mb-1.5 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-xs font-medium tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 animate-bounce" aria-hidden="true">
        <ChevronDown size={22} />
      </div>

    </section>
  )
}
