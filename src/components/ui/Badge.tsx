interface BadgeProps {
  children: string
  color?: 'blue' | 'green' | 'gray'
}

const colorMap = {
  blue: 'bg-brand-blue/20 text-brand-blue-electric border border-brand-blue/30',
  green: 'bg-brand-green/20 text-brand-green-light border border-brand-green/30',
  gray: 'bg-white/10 text-slate-300 border border-white/10',
}

export function Badge({ children, color = 'blue' }: BadgeProps) {
  return (
    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${colorMap[color]}`}>
      {children}
    </span>
  )
}
