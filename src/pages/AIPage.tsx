import { useEffect } from 'react'
import { Brain, MessageSquare, Lightbulb, BookOpen, Zap, HelpCircle } from 'lucide-react'
import { SectionHeader } from '../components/ui/SectionHeader'

const capabilities = [
  {
    icon: MessageSquare,
    title: 'Resolución de dudas',
    description: 'Plantea preguntas sobre cualquier concepto financiero o contable y recibe explicaciones claras y comprensibles.',
    color: 'blue',
  },
  {
    icon: Lightbulb,
    title: 'Explicación de conceptos',
    description: 'El tutor adapta el nivel de explicación según el conocimiento del usuario, desde lo básico hasta lo especializado.',
    color: 'green',
  },
  {
    icon: BookOpen,
    title: 'Apoyo al aprendizaje',
    description: 'Complementa los cursos y materiales de la plataforma, reforzando la comprensión de los temas más complejos.',
    color: 'blue',
  },
  {
    icon: Zap,
    title: 'Acompañamiento continuo',
    description: 'Disponible durante todo el proceso de estudio para apoyar en cada etapa de la formación financiera.',
    color: 'green',
  },
]

export function AIPage() {
  useEffect(() => {
    document.title = 'Inteligencia Artificial — FINACORE'
  }, [])

  return (
    <div className="bg-navy-950">
      {/* Hero */}
      <section className="relative section-padding pt-32 overflow-hidden" aria-label="Tutor de IA FINACORE">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-transparent to-brand-green/5" aria-hidden="true" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-green-teal flex items-center justify-center mx-auto mb-6">
            <Brain size={36} className="text-white" strokeWidth={1.5} />
          </div>
          <span className="inline-block text-brand-blue-electric text-sm font-semibold tracking-widest uppercase mb-4">
            Inteligencia artificial
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Tu tutor de IA,{' '}
            <span className="gradient-text">siempre disponible</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            FINACORE integra un tutor de inteligencia artificial diseñado para apoyar el proceso educativo, facilitar la comprensión de conceptos y acompañar al usuario durante su formación financiera.
          </p>
        </div>
      </section>

      {/* What it is */}
      <section className="section-padding bg-navy-900" aria-labelledby="ai-what-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="ai-what-heading" className="text-2xl md:text-3xl font-bold text-white mb-4">
                Una herramienta complementaria para tu formación
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                El tutor de IA de FINACORE no reemplaza a los cursos ni a la práctica real, sino que funciona como un apoyo inteligente que enriquece la experiencia de aprendizaje.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Su rol es facilitar la comprensión de conceptos, resolver dudas en tiempo real y acompañar al usuario durante cada etapa de su formación en contabilidad, finanzas y negocios.
              </p>
            </div>

            {/* Chat demo */}
            <div className="card-glass border border-brand-blue/25 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/8">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-green-teal flex items-center justify-center">
                  <Brain size={17} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Tutor FINACORE IA</p>
                  <p className="text-brand-green text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-brand-green rounded-full" aria-hidden="true" />
                    Activo
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                  <p className="text-slate-300">¿Qué es la partida doble en contabilidad?</p>
                </div>
                <div className="bg-brand-blue/15 border border-brand-blue/20 rounded-2xl rounded-tr-sm px-4 py-3 ml-auto max-w-[85%]">
                  <p className="text-slate-200 leading-relaxed">
                    La <strong className="text-white">partida doble</strong> es el principio contable fundamental que establece que toda operación económica afecta al menos a dos cuentas con importes iguales: una en el <strong className="text-white">debe</strong> y otra en el <strong className="text-white">haber</strong>...
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                  <p className="text-slate-300">¿Me das un ejemplo sencillo?</p>
                </div>
                <div className="bg-brand-blue/15 border border-brand-blue/20 rounded-2xl rounded-tr-sm px-4 py-3 ml-auto max-w-[85%]">
                  <p className="text-slate-200 leading-relaxed">
                    Claro. Si una empresa recibe $10,000 en efectivo como pago de un cliente: <strong className="text-white">Debe: Caja $10,000 / Haber: Clientes $10,000</strong>. El total del debe siempre iguala al haber.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-padding bg-navy-950" aria-labelledby="capabilities-heading">
        <div className="section-container">
          <SectionHeader
            eyebrow="Capacidades del tutor IA"
            title="Diseñado para"
            highlight="apoyar tu aprendizaje"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon
              const isBlue = cap.color === 'blue'
              const delay = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'][i] ?? ''
              return (
                <div
                  key={cap.title}
                  className={`card-glass border rounded-2xl p-7 reveal ${delay} ${
                    isBlue ? 'border-brand-blue/20 card-hover-blue' : 'border-brand-green/20 card-hover-green'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    isBlue ? 'bg-brand-blue/15 text-brand-blue-electric' : 'bg-brand-green/15 text-brand-green-light'
                  }`}>
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-bold mb-2">{cap.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{cap.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section-padding bg-navy-900" aria-labelledby="ai-note-heading">
        <div className="section-container">
          <div className="max-w-2xl mx-auto card-glass border border-white/8 rounded-2xl p-8 flex items-start gap-4">
            <HelpCircle className="text-slate-400 flex-shrink-0 mt-1" size={22} strokeWidth={1.5} />
            <div>
              <h3 id="ai-note-heading" className="text-white font-semibold mb-2">Sobre el tutor de IA</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                El tutor de inteligencia artificial de FINACORE es una herramienta educativa complementaria diseñada para facilitar el aprendizaje. No reemplaza el criterio profesional en decisiones contables, fiscales o financieras reales. Para decisiones que requieran asesoría especializada, siempre se recomienda consultar a un profesional certificado.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
