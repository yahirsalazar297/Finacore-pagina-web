interface SectionHeaderProps {
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  centered?: boolean
}

export function SectionHeader({ eyebrow, title, highlight, description, centered = true }: SectionHeaderProps) {
  const alignClass = centered ? 'text-center' : 'text-left'
  const descAlign = centered ? 'mx-auto' : ''

  return (
    <div className={`${alignClass} mb-14 reveal`}>
      {eyebrow && (
        <span className={`section-eyebrow ${centered ? 'justify-center' : ''}`}>
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {description && (
        <p className={`text-slate-400 text-lg max-w-2xl ${descAlign} leading-relaxed`}>
          {description}
        </p>
      )}
    </div>
  )
}
