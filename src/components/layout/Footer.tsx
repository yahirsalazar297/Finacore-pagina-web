import { Link } from 'react-router-dom'
import { ExternalLink, Mail } from 'lucide-react'
import { brand } from '../../data/brand'
import { navLinks } from '../../data/navigation'

const footerLinks = [
  {
    title: 'Empresa',
    links: navLinks.slice(0, 4),
  },
  {
    title: 'Plataforma',
    links: navLinks.slice(4),
  },
]

export function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/5" role="contentinfo">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" aria-label="FINCORE — Inicio">
              <img
                src={brand.logo}
                alt={brand.logoAlt}
                className="h-10 w-auto object-contain mb-4"
                loading="lazy"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Democratizando el acceso a la educación financiera en México mediante tecnología, formación académica y herramientas de aplicación real.
            </p>
            <p className="text-brand-blue-electric text-sm font-semibold italic">
              {brand.slogan}
            </p>
          </div>

          {/* Nav groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-200 focus:outline-none focus:text-brand-blue-electric"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} FINCORE. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={brand.academyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-brand-blue-electric text-sm flex items-center gap-1.5 transition-colors duration-200"
              aria-label="Ir a la plataforma FINCORE (abre en nueva ventana)"
            >
              Plataforma FINCORE
              <ExternalLink size={12} />
            </a>
            <Link
              to="/contacto"
              className="text-slate-400 hover:text-brand-blue-electric text-sm flex items-center gap-1.5 transition-colors duration-200"
            >
              <Mail size={12} />
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
