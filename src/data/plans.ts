// NOTE: Plan details, prices, and feature lists are pending confirmation by FINACORE.
// This structure is ready to populate once commercial terms are defined.

export type Plan = {
  id: string
  name: string
  price: string | null
  description: string
  highlighted: boolean
  cta: string
  features: string[]
  pending: boolean
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: null,
    description: 'Acceso inicial para explorar FINACORE y descubrir el ecosistema.',
    highlighted: false,
    cta: 'Comenzar gratis',
    features: [],
    pending: true,
  },
  {
    id: 'student',
    name: 'Student',
    price: null,
    description: 'Diseñado para estudiantes que buscan reforzar su formación académica.',
    highlighted: true,
    cta: 'Conocer más',
    features: [],
    pending: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: null,
    description: 'Para profesionistas que necesitan herramientas avanzadas y acceso completo.',
    highlighted: false,
    cta: 'Conocer más',
    features: [],
    pending: true,
  },
]
