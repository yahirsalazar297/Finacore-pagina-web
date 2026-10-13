import { useEffect, useState } from 'react'
import { Mail, Send, MessageSquare, Users } from 'lucide-react'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

const initialForm: FormState = { name: '', email: '', subject: '', message: '' }

const contactReasons = [
  { icon: MessageSquare, title: 'Consultas generales', desc: 'Preguntas sobre la plataforma, acceso o funcionalidades.' },
  { icon: Users, title: 'Colaboraciones', desc: 'Alianzas educativas, instituciones o proyectos conjuntos.' },
  { icon: Mail, title: 'Soporte', desc: 'Asistencia técnica o dudas sobre el uso de la plataforma.' },
]

function sanitize(value: string): string {
  return value.replace(/[<>]/g, '')
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Contacto — FINCORE'
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: sanitize(value) }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function validate(): boolean {
    const newErrors: Partial<FormState> = {}
    if (!form.name.trim()) newErrors.name = 'El nombre es requerido.'
    if (!form.email.trim()) newErrors.email = 'El correo es requerido.'
    else if (!isValidEmail(form.email)) newErrors.email = 'Ingresa un correo válido.'
    if (!form.subject) newErrors.subject = 'Selecciona un motivo de contacto.'
    if (!form.message.trim()) newErrors.message = 'El mensaje es requerido.'
    else if (form.message.trim().length < 10) newErrors.message = 'El mensaje es demasiado corto.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) {
      // In production this would send to a backend endpoint
      setSubmitted(true)
    }
  }

  return (
    <div className="bg-navy-950">
      {/* Hero */}
      <section className="relative section-padding pt-32 overflow-hidden" aria-label="Contacto FINCORE">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/8 to-transparent" aria-hidden="true" />
        <div className="section-container relative z-10 text-center max-w-2xl mx-auto">
          <span className="inline-block text-brand-blue-electric text-sm font-semibold tracking-widest uppercase mb-4">
            Contacto
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            ¿Tienes{' '}
            <span className="gradient-text">alguna pregunta?</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Estamos aquí para ayudarte. Escríbenos y nuestro equipo se pondrá en contacto contigo a la brevedad.
          </p>
        </div>
      </section>

      {/* Contact types */}
      <section className="section-padding bg-navy-900" aria-labelledby="contact-types-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto mb-16">
            {contactReasons.map((r) => {
              const Icon = r.icon
              return (
                <div key={r.title} className="card-glass border border-white/8 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/15 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-brand-blue-electric" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1">{r.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{r.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Form */}
          <div className="max-w-xl mx-auto">
            {submitted ? (
              <div className="card-glass border border-brand-green/30 rounded-3xl p-10 text-center" role="alert" aria-live="polite">
                <div className="w-16 h-16 rounded-full bg-brand-green/15 flex items-center justify-center mx-auto mb-4">
                  <Send size={28} className="text-brand-green-light" strokeWidth={1.5} />
                </div>
                <h2 className="text-white font-bold text-xl mb-2">¡Mensaje recibido!</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Gracias por contactarnos. Nuestro equipo revisará tu mensaje y te responderá a la brevedad.
                </p>
                <button
                  type="button"
                  onClick={() => { setForm(initialForm); setSubmitted(false) }}
                  className="btn-secondary mt-6 text-sm"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="card-glass border border-white/8 rounded-3xl p-8"
                noValidate
                aria-label="Formulario de contacto"
              >
                <div className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Nombre completo <span className="text-red-400" aria-label="requerido">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      maxLength={100}
                      autoComplete="name"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors ${errors.name ? 'border-red-400/50' : 'border-white/10 hover:border-white/20'}`}
                      placeholder="Tu nombre"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Correo electrónico <span className="text-red-400" aria-label="requerido">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      maxLength={200}
                      autoComplete="email"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors ${errors.email ? 'border-red-400/50' : 'border-white/10 hover:border-white/20'}`}
                      placeholder="tu@correo.com"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Motivo de contacto <span className="text-red-400" aria-label="requerido">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors ${errors.subject ? 'border-red-400/50' : 'border-white/10 hover:border-white/20'} ${form.subject ? 'text-white' : 'text-slate-500'}`}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      aria-invalid={!!errors.subject}
                    >
                      <option value="" disabled>Selecciona un motivo</option>
                      <option value="general">Consulta general</option>
                      <option value="collaboration">Colaboración</option>
                      <option value="support">Soporte técnico</option>
                      <option value="other">Otro</option>
                    </select>
                    {errors.subject && <p id="subject-error" className="text-red-400 text-xs mt-1" role="alert">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Mensaje <span className="text-red-400" aria-label="requerido">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      maxLength={1000}
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-colors resize-none ${errors.message ? 'border-red-400/50' : 'border-white/10 hover:border-white/20'}`}
                      placeholder="Escribe tu mensaje aquí..."
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={!!errors.message}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.message
                        ? <p id="message-error" className="text-red-400 text-xs" role="alert">{errors.message}</p>
                        : <span />
                      }
                      <span className="text-slate-600 text-xs">{form.message.length}/1000</span>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary justify-center py-3.5">
                    Enviar mensaje
                    <Send size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
