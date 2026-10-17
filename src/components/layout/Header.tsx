import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ExternalLink } from 'lucide-react'
import { brand } from '../../data/brand'
import { navLinks } from '../../data/navigation'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy-950/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5' : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="section-container" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-blue rounded-lg" aria-label="FINACORE — Inicio">
            <img
              src={brand.logo}
              alt={brand.logoAlt}
              className="h-10 md:h-12 w-auto object-contain"
              loading="eager"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue ${
                  location.pathname === link.path
                    ? 'text-brand-blue-electric bg-brand-blue/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={brand.academyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2.5"
              aria-label="Explorar FINACORE Academia (abre en nueva ventana)"
            >
              Probar demo
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-navy-900/98 backdrop-blur-md border-t border-white/5 py-4 rounded-b-2xl" role="dialog" aria-label="Menú de navegación">
            <div className="flex flex-col gap-1 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-brand-blue-electric bg-brand-blue/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/10 mt-2">
                <a
                  href={brand.academyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-sm py-3"
                >
                  Probar demo
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
