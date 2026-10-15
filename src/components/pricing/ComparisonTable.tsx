import { CONTENT, LIMITS, PLAN_NAMES } from '../../data/pricing'

const AREAS = [
  { name: 'Finanzas Personales y Educación Financiera', topics: 20, free: true,  plus: true,  pro: true  },
  { name: 'Contabilidad Financiera',                    topics: 25, free: false, plus: true,  pro: true, freeTopics: 10 },
  { name: 'Costos y Contabilidad Administrativa',       topics: 18, free: false, plus: true,  pro: true  },
  { name: 'Fiscalidad y Tributación',                   topics: 22, free: false, plus: true,  pro: true  },
  { name: 'Economía y Entorno Empresarial',             topics: 19, free: false, plus: true,  pro: true  },
  { name: 'Emprendimiento, Administración y Estrategia',topics: 17, free: false, plus: true,  pro: true  },
  { name: 'Finanzas Corporativas',                      topics: 25, free: false, plus: false, pro: true  },
  { name: 'Inversiones y Mercados Financieros',         topics: 23, free: false, plus: false, pro: true  },
  { name: 'Auditoría, Control Interno y Riesgos',       topics: 20, free: false, plus: false, pro: true  },
  { name: 'Finanzas Cuantitativas y Gestión de Riesgos',topics: 22, free: false, plus: false, pro: true  },
  { name: 'Derecho Empresarial y Regulación',           topics: 18, free: false, plus: false, pro: true  },
  { name: 'Análisis de Datos, Tecnología e IA',         topics: 19, free: false, plus: false, pro: true  },
]

type Col = 'free' | 'plus' | 'pro'

function Check({ yes, partial }: { yes: boolean; partial?: string }) {
  if (partial) return <span className="text-brand-blue text-xs font-semibold">{partial}</span>
  if (yes) return <span className="text-brand-green">✓</span>
  return <span className="text-slate-600">—</span>
}

function THead() {
  return (
    <thead>
      <tr>
        <th className="text-left py-3 pr-4 text-slate-400 text-xs font-semibold uppercase tracking-widest w-1/2">
          Característica
        </th>
        {(['free', 'plus', 'pro'] as Col[]).map(p => (
          <th key={p} className="text-center py-3 px-2 text-sm font-bold text-white w-1/6">
            {PLAN_NAMES[p]}
          </th>
        ))}
      </tr>
    </thead>
  )
}

function SectionRow({ label }: { label: string }) {
  return (
    <tr>
      <td
        colSpan={4}
        className="pt-6 pb-2 text-xs font-bold uppercase tracking-widest"
        style={{ color: '#2479FA' }}
      >
        {label}
      </td>
    </tr>
  )
}

function DataRow({
  label,
  free,
  plus,
  pro,
}: {
  label: string
  free: React.ReactNode
  plus: React.ReactNode
  pro: React.ReactNode
}) {
  return (
    <tr className="border-t border-white/5">
      <td className="py-3 pr-4 text-sm text-slate-300">{label}</td>
      <td className="py-3 px-2 text-center">{free}</td>
      <td className="py-3 px-2 text-center">{plus}</td>
      <td className="py-3 px-2 text-center">{pro}</td>
    </tr>
  )
}

export function ComparisonTable() {
  const livesF = LIMITS.lives.free
  const livesP = LIMITS.lives.plus

  return (
    <div className="overflow-x-auto mt-16">
      <table className="w-full min-w-[560px] text-sm">
        <THead />
        <tbody>
          {/* ── Contenido ─────────────────────────────────────────── */}
          <SectionRow label="Contenido académico" />
          <DataRow
            label="Áreas incluidas"
            free={<span className="text-white text-xs">6 de 12 (parcial)</span>}
            plus={<span className="text-white text-xs">6 completas + 6 primer tema</span>}
            pro={<span className="text-white text-xs">12 completas</span>}
          />
          <DataRow
            label="Temas disponibles"
            free={<span className="text-white font-semibold">{CONTENT.free.topics}</span>}
            plus={<span className="text-white font-semibold">{CONTENT.plus.topics}</span>}
            pro={<span className="text-white font-semibold">{CONTENT.pro.topics}</span>}
          />

          {/* ── Áreas por plan ─────────────────────────────────────── */}
          <SectionRow label="Áreas académicas detalle" />
          {AREAS.map(area => (
            <tr key={area.name} className="border-t border-white/5">
              <td className="py-2.5 pr-4 text-xs text-slate-400">{area.name}</td>
              <td className="py-2.5 px-2 text-center">
                {area.free ? (
                  <Check yes={true} />
                ) : area.freeTopics ? (
                  <Check yes={false} partial={`${area.freeTopics} temas`} />
                ) : (
                  <Check yes={false} partial="1 tema" />
                )}
              </td>
              <td className="py-2.5 px-2 text-center">
                {area.plus ? <Check yes={true} /> : <Check yes={false} partial="1 tema" />}
              </td>
              <td className="py-2.5 px-2 text-center">
                <Check yes={area.pro} />
              </td>
            </tr>
          ))}

          {/* ── Práctica y repaso ──────────────────────────────────── */}
          <SectionRow label="Práctica y repaso" />
          <DataRow
            label="Vidas"
            free={<span className="text-white">{livesF}</span>}
            plus={<span className="text-white">{livesP}</span>}
            pro={<span className="text-brand-green">Ilimitadas</span>}
          />
          <DataRow
            label="Quiz por tema"
            free={<Check yes />}
            plus={<Check yes />}
            pro={<Check yes />}
          />
          <DataRow
            label="Examen por área"
            free={<Check yes={false} />}
            plus={<Check yes />}
            pro={<Check yes />}
          />
          <DataRow
            label="Modo simulacro"
            free={<Check yes={false} />}
            plus={<Check yes={false} />}
            pro={<Check yes />}
          />
          <DataRow
            label="Certificado"
            free={<Check yes={false} />}
            plus={<Check yes={false} />}
            pro={<Check yes />}
          />

          {/* ── Herramientas ────────────────────────────────────────── */}
          <SectionRow label="Herramientas" />
          <DataRow
            label="Laboratorio contable"
            free={<span className="text-slate-400 text-xs">3 ejercicios</span>}
            plus={<Check yes />}
            pro={<Check yes />}
          />
          <DataRow
            label="Calculadoras"
            free={<span className="text-slate-400 text-xs">2 básicas</span>}
            plus={<span className="text-slate-300 text-xs">Todas + ISR/IVA</span>}
            pro={<Check yes />}
          />
          <DataRow
            label="Inversión y valuación"
            free={<span className="text-slate-600 text-xs">🔒</span>}
            plus={<span className="text-slate-600 text-xs">🔒</span>}
            pro={<Check yes />}
          />

          {/* ── Tutor IA ────────────────────────────────────────────── */}
          <SectionRow label="Tutor IA" />
          <DataRow
            label="Preguntas al día"
            free={<span className="text-white">{LIMITS.aiQuestionsPerDay.free}</span>}
            plus={<span className="text-white">{LIMITS.aiQuestionsPerDay.plus}</span>}
            pro={<span className="text-brand-green">Ilimitadas</span>}
          />

          {/* ── Estadísticas ────────────────────────────────────────── */}
          <SectionRow label="Estadísticas y progreso" />
          <DataRow
            label="Progreso básico"
            free={<Check yes />}
            plus={<Check yes />}
            pro={<Check yes />}
          />
          <DataRow
            label="Estadísticas detalladas"
            free={<Check yes={false} />}
            plus={<Check yes />}
            pro={<Check yes />}
          />
        </tbody>
      </table>
    </div>
  )
}
