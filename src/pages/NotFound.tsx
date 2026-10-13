import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function NotFound() {
  useEffect(() => {
    document.title = 'Página no encontrada — FINCORE'
  }, [])

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="section-container text-center max-w-lg">
        <div className="text-8xl font-black gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Página no encontrada</h1>
        <p className="text-slate-400 mb-8">
          La página que buscas no existe o ha sido movida a una nueva ubicación.
        </p>
        <Link to="/" className="btn-primary">
          <ArrowLeft size={16} />
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
