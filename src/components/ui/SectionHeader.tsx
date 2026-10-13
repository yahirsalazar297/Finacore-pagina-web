interface SectionHeaderProps {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  centered?: boolean
}

export function SectionHeader({ eyebrow, title, highlight, description, centered = true }: SectionHeaderProps) {
  const alignClass = centered ? 'text-center' : 'text-left'

  return (
    <div className={`${alignClass} mb-12`}>
      {eyebrow && (
        <span className="inline-block text-brand-blue-electric text-sm font-semibold tracking-widest uppercase mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {description && (
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
