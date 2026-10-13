import { type ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline-green' | 'ghost'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  href?: string
  onClick?: () => void
  className?: string
  external?: boolean
  type?: 'button' | 'submit'
}

const variantClasses: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  'outline-green': 'btn-outline-green',
  ghost: 'inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200',
}

export function Button({ children, variant = 'primary', href, onClick, className = '', external, type = 'button' }: ButtonProps) {
  const cls = `${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
