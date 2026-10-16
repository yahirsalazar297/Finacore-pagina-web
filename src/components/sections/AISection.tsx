import { Brain, MessageSquare, Lightbulb, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const benefits = [
  {
    icon: MessageSquare,
    title: 'Resolución de dudas',
    description: 'Obtén respuestas claras sobre conceptos contables y financieros en cualquier momento de tu estudio.',
  },
  {
    icon: Lightbulb,
    title: 'Explicación de conceptos',
    description: 'El tutor adapta las explicaciones al nivel de comprensión del usuario, desde lo básico hasta lo especializado.',
  },
  {
    icon: Brain,
    title: 'Acompañamiento continuo',
    description: 'Apoyo personalizado durante todo el proceso de aprendizaje para reforzar la comprensión y la retención.',
  },
]

export function AISection() {
  return (
    <section className="section-padding bg-navy-950" aria-labelledby="ai-heading">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="inline-block text-brand-blue-electric text-sm font-semibold tracking-widest uppercase mb-3">
              Inteligencia artificial
            </span>
            <h2 id="ai-heading" className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Tu tutor de IA,{' '}
              <span className="gradient-text">siempre disponible</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              FINCORE integra un tutor de inteligencia artificial diseñado para apoyar tu proceso educativo. Una herramienta complementaria que facilita la comprensión y acompaña tu formación financiera.
            </p>

            <div className="flex flex-col gap-5 mb-8">
              {benefits.map((b, i) => {
                const Icon = b.icon
                return (
                  <div key={b.title} className={`flex items-start gap-4 reveal reveal-delay-${i + 1}`}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-blue/15 flex items-center justify-center text-brand-blue-electric">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1">{b.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link to="/inteligencia-artificial" className="btn-primary">
              Conocer más sobre el tutor IA
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Visual card */}
          <div className="relative reveal reveal-delay-1">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-green/10 rounded-3xl blur-3xl" aria-hidden="true" />
            <div className="relative card-glass border border-brand-blue/25 p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-green-teal flex items-center justify-center">
                  <Brain size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Tutor FINCORE IA</p>
                  <p className="text-brand-green text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse-slow" aria-hidden="true" />
                    Activo
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 max-w-xs">
                  <p className="text-slate-300 text-sm">¿Puedes explicarme la diferencia entre el libro diario y el libro mayor?</p>
                </div>
                <div className="bg-brand-blue/15 border border-brand-blue/20 rounded-2xl rounded-tr-sm p-4 ml-auto max-w-xs">
                  <p className="text-slate-200 text-sm leading-relaxed">
                    ¡Claro! El <strong className="text-white">libro diario</strong> registra cada operación en orden cronológico, mientras que el <strong className="text-white">libro mayor</strong> clasifica esas operaciones por cuenta...
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 max-w-xs">
                  <p className="text-slate-300 text-sm">¿Con un ejemplo práctico?</p>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-xs ml-auto">
                  <span className="flex gap-0.5">
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} aria-hidden="true" />
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} aria-hidden="true" />
                    <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} aria-hidden="true" />
                  </span>
                  Redactando respuesta...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
