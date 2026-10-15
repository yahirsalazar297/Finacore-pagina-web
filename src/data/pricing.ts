/**
 * FINCORE — Configuración central de precios y suscripciones
 *
 * Esta es la ÚNICA fuente de verdad para todos los precios, límites y
 * configuraciones de planes. No escribas ningún precio o límite directamente
 * en componentes, páginas o servicios — importa desde aquí.
 *
 * Todos los precios están en MXN e incluyen IVA del 16%.
 */

// ─── IDs de plan ────────────────────────────────────────────────────────────

export type PlanId = 'free' | 'plus' | 'pro'
export type BillingPeriod = 'monthly' | 'annual'
export type PriceVariant = 'regular' | 'founder' | 'student'

// ─── Precios (MXN, IVA incluido) ────────────────────────────────────────────

export const PRICES = {
  free: {
    monthly: 0,
    annual: 0,
  },
  plus: {
    monthly: 99,
    annual: 799,
    annualMonthlyEquivalent: 67,    // Math.round(799 / 12)
    founder: {
      monthly: 69,
      annual: 549,
      annualMonthlyEquivalent: 46,  // Math.round(549 / 12)
    },
  },
  pro: {
    monthly: 199,
    annual: 1_599,
    annualMonthlyEquivalent: 133,   // Math.round(1599 / 12)
    founder: {
      monthly: 149,
      annual: 1_199,
      annualMonthlyEquivalent: 100, // Math.round(1199 / 12)
    },
    student: {
      monthly: 129,
      annual: 999,
    },
  },
} as const

// ─── Ahorro anual (en pesos, nunca porcentaje) ───────────────────────────────

/**
 * Ahorro = 12 meses × precio mensual − precio anual.
 * Se calcula automáticamente desde PRICES; si los precios cambian, el número
 * se actualiza solo. Nunca mostrar el ahorro como porcentaje.
 */
export function getAnnualSavings(planId: PlanId, variant: PriceVariant = 'regular'): number {
  if (planId === 'free') return 0
  if (planId === 'plus') {
    if (variant === 'founder') return PRICES.plus.founder.monthly * 12 - PRICES.plus.founder.annual
    return PRICES.plus.monthly * 12 - PRICES.plus.annual
  }
  // pro
  if (variant === 'student') return PRICES.pro.student.monthly * 12 - PRICES.pro.student.annual
  if (variant === 'founder') return PRICES.pro.founder.monthly * 12 - PRICES.pro.founder.annual
  return PRICES.pro.monthly * 12 - PRICES.pro.annual
}

/** El ahorro más alto visible al usuario con planes regulares. Usado en la etiqueta del toggle. */
export const MAX_ANNUAL_SAVINGS = PRICES.pro.monthly * 12 - PRICES.pro.annual  // 789

/** @deprecated — No usar en la UI. El ahorro se muestra en MXN, nunca como porcentaje. */
export const ANNUAL_DISCOUNT_PERCENT = 33

// ─── IVA ─────────────────────────────────────────────────────────────────────

export const IVA_RATE = 0.16
export const IVA_INCLUDED_LABEL = 'Precios en MXN, IVA incluido'

// ─── Precio de fundador ──────────────────────────────────────────────────────

export const FOUNDER = {
  /**
   * 50 lugares totales, bolsa compartida entre Plus y Pro.
   * Se cuentan las personas que OBTUVIERON el precio, no las que lo conservan.
   * Un lugar perdido (por cancelación o pago fallido) NO se libera.
   * ⚠️ BACKEND REQUIRED: el conteo real vive en la DB.
   */
  limit: 50,
  /**
   * El precio de fundador se conserva de por vida mientras la suscripción
   * esté activa sin interrupción. Una pausa permitida NO es interrupción.
   * Si el usuario cancela o un pago fallido lo regresa a Gratis, lo pierde
   * de forma definitiva.
   */
  lifetimeWhileActive: true,
} as const

// ─── Prueba gratuita ─────────────────────────────────────────────────────────

export const TRIAL = {
  planId: 'pro' as PlanId,
  durationDays: 7,
  requiresPaymentMethod: true,
  /** Días antes del fin de la prueba en que se envía el aviso. */
  reminderDaysBefore: 2,
  /** Texto del aviso (se sustituye {date} con la fecha de término). */
  reminderText:
    'Tu prueba de Pro termina en 2 días. Si no quieres que se te cobre, cancela antes del {date}.',
  /** Solo se puede usar una vez por cuenta. */
  singleUsePerAccount: true,
} as const

// ─── Contenido por plan ──────────────────────────────────────────────────────

export const CONTENT = {
  totalAreas: 12,
  totalTopics: 248,
  free: {
    topics: 38,
    /** Áreas completas incluidas en Gratis. */
    fullAreas: ['Finanzas Personales y Educación Financiera'],
    /** Primeros N temas del área "Contabilidad Financiera". */
    partialAreas: {
      'Contabilidad Financiera': 10,
    },
    /** Un tema de cada una de las otras 10 áreas. */
    firstTopicAreas: 10,
  },
  plus: {
    topics: 141,
    fullAreas: [
      'Contabilidad Financiera',
      'Costos y Contabilidad Administrativa',
      'Fiscalidad y Tributación',
      'Finanzas Personales y Educación Financiera',
      'Economía y Entorno Empresarial',
      'Emprendimiento, Administración y Estrategia',
    ],
    /** Primer tema de las otras 6 áreas. */
    firstTopicAreas: 6,
  },
  pro: {
    topics: 248,
    fullAreas: 'all' as const,
    /** Áreas adicionales que se desbloquean al ir de Plus a Pro. */
    exclusiveAreas: [
      'Finanzas Corporativas',
      'Inversiones y Mercados Financieros',
      'Auditoría, Control Interno y Riesgos',
      'Finanzas Cuantitativas y Gestión de Riesgos',
      'Derecho Empresarial y Regulación',
      'Análisis de Datos, Tecnología e IA',
    ],
  },
} as const

// ─── Límites de funcionalidades ──────────────────────────────────────────────

export const LIMITS = {
  lives: {
    free: 5,
    plus: 15,
    pro: Infinity,
  },
  aiQuestionsPerDay: {
    free: 3,
    plus: 20,
    pro: Infinity,
    /**
     * Límite silencioso de uso justo en Pro.
     * No se muestra al usuario pero se aplica en el servidor.
     */
    proFairUseSilentLimit: 100,
  },
  labExercises: {
    free: 3,
    plus: Infinity,
    pro: Infinity,
  },
  calculators: {
    free: ['interes-simple', 'presupuesto'],
    plus: ['interes-simple', 'presupuesto', 'interes-compuesto', 'anualidades', 'isr', 'iva'],
    pro: 'all' as const,
  },
  investmentModule: {
    free: 'locked' as const,
    plus: 'locked' as const,
    pro: 'full' as const,
  },
  statistics: {
    free: 'basic' as const,
    plus: 'detailed' as const,
    pro: 'detailed' as const,
  },
  evaluations: {
    free: ['quiz-por-tema'],
    plus: ['quiz-por-tema', 'examen-por-area'],
    pro: ['quiz-por-tema', 'examen-por-area', 'certificado', 'modo-simulacro'],
  },
} as const

// ─── Pago fallido / periodo de gracia ────────────────────────────────────────

export const PAYMENT_RECOVERY = {
  gracePeriodDays: 7,
  retryScheduleDays: [1, 3, 7],  // Días del periodo en que se reintenta el cobro
} as const

// ─── Pausa de suscripción ────────────────────────────────────────────────────

export const PAUSE_POLICY = {
  maxPausesPerYear: 2,
  pauseDurationMonths: 1,
  /** Durante la pausa el usuario tiene acceso de plan Gratis. */
  planDuringPause: 'free' as PlanId,
} as const

// ─── Cupones ──────────────────────────────────────────────────────────────────

export type CouponDiscountType = 'percentage' | 'fixed'
export type CouponApplicableTo = 'plus' | 'pro' | 'both'
export type CouponPeriodApplicableTo = 'monthly' | 'annual' | 'both'

export interface CouponConfig {
  code: string
  discountType: CouponDiscountType
  discountValue: number         // % o MXN según discountType
  applicableTo: CouponApplicableTo
  periodApplicableTo: CouponPeriodApplicableTo
  expiresAt: string | null      // ISO date string o null = sin vencimiento
  maxUses: number | null        // null = usos ilimitados
  /** Un cupón no se puede combinar con precio de fundador ni de estudiante. */
  combinesWithFounder: false
  combinesWithStudent: false
}

// ─── Verificación de estudiante ──────────────────────────────────────────────

export const STUDENT_VERIFICATION = {
  /** Solo aplica al plan Pro. Plus no tiene precio de estudiante. */
  applicablePlans: ['pro'] as PlanId[],
  expiryMonths: 12,
  renewalWarningDays: 15,
  verificationMethod: 'institutional-email-code' as const,
} as const

// ─── Canales de pago ──────────────────────────────────────────────────────────

export type PaymentChannel = 'web-stripe' | 'web-mercadopago' | 'app-store' | 'play-store'

export const PAYMENT_CHANNELS = {
  /** OXXO solo disponible en Mercado Pago, solo para plan anual. */
  oxxo: {
    processor: 'mercadopago' as const,
    applicablePeriods: ['annual'] as BillingPeriod[],
  },
  /**
   * Priorizar pago web cuando las reglas de la tienda lo permiten,
   * porque las tiendas cobran comisión (15–30%).
   */
  preferWeb: true,
} as const

// ─── Cambios de plan ──────────────────────────────────────────────────────────

export const PLAN_CHANGE_RULES = {
  /**
   * Upgrade (subir de plan): cambio inmediato, se cobra solo la diferencia
   * proporcional de los días que quedan en el periodo actual.
   */
  upgrade: {
    immediate: true,
    chargeProration: true,
  },
  /**
   * Downgrade (bajar de plan): el cambio se aplica al inicio del siguiente
   * periodo. El usuario conserva el plan actual hasta que expire.
   */
  downgrade: {
    immediate: false,
    appliesAtPeriodEnd: true,
    /** El progreso en áreas bloqueadas se conserva y se muestra con candado. */
    preserveProgress: true,
  },
  /**
   * Cambio de mensual a anual: se cobra el anual y se acredita el tiempo
   * que le quedaba al mensual.
   */
  monthlyToAnnual: {
    immediate: true,
    creditRemainingTime: true,
  },
} as const

// ─── Facturación (CFDI) ───────────────────────────────────────────────────────

export const BILLING = {
  currency: 'MXN',
  /**
   * Por ahora las facturas se generan de forma manual a partir de la
   * solicitud del usuario. El sistema guarda los datos fiscales para
   * conectar un proveedor de CFDI más adelante.
   */
  cfdiMode: 'manual-request' as 'manual-request' | 'automatic',
  requiredFiscalData: ['rfc', 'razon-social', 'codigo-postal', 'regimen-fiscal'] as const,
} as const

// ─── Stripe (IDs de producto) ─────────────────────────────────────────────────
// Estos IDs se crean en el dashboard de Stripe y se ponen aquí.
// En producción deben venir de variables de entorno.

export const STRIPE_CONFIG = {
  /**
   * ⚠️  BACKEND REQUIRED: La clave pública de Stripe puede estar aquí
   * (es pública por diseño), pero NUNCA la clave secreta.
   * La clave secreta solo existe en el servidor.
   */
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? '',

  priceIds: {
    plus: {
      monthly: import.meta.env.VITE_STRIPE_PRICE_PLUS_MONTHLY ?? 'price_plus_monthly_placeholder',
      annual: import.meta.env.VITE_STRIPE_PRICE_PLUS_ANNUAL ?? 'price_plus_annual_placeholder',
    },
    pro: {
      monthly: import.meta.env.VITE_STRIPE_PRICE_PRO_MONTHLY ?? 'price_pro_monthly_placeholder',
      annual: import.meta.env.VITE_STRIPE_PRICE_PRO_ANNUAL ?? 'price_pro_annual_placeholder',
      studentMonthly: import.meta.env.VITE_STRIPE_PRICE_PRO_STUDENT_MONTHLY ?? 'price_pro_student_monthly_placeholder',
      studentAnnual: import.meta.env.VITE_STRIPE_PRICE_PRO_STUDENT_ANNUAL ?? 'price_pro_student_annual_placeholder',
    },
  },
} as const

// ─── Mercado Pago ─────────────────────────────────────────────────────────────

export const MERCADOPAGO_CONFIG = {
  /**
   * ⚠️  BACKEND REQUIRED: La clave pública de Mercado Pago puede estar
   * en el frontend. La Access Token (secreta) solo va en el servidor.
   */
  publicKey: import.meta.env.VITE_MP_PUBLIC_KEY ?? '',
} as const

// ─── Eventos de analítica ─────────────────────────────────────────────────────

export const ANALYTICS_EVENTS = {
  PRICING_PAGE_VIEWED:         'pricing_page_viewed',
  BILLING_TOGGLE_CHANGED:      'billing_toggle_changed',
  PLAN_CLICKED:                'plan_clicked',
  CHECKOUT_STARTED:            'checkout_started',
  CHECKOUT_COMPLETED:          'checkout_completed',
  TRIAL_STARTED:               'trial_started',
  TRIAL_CANCELLED:             'trial_cancelled',
  TRIAL_CONVERTED:             'trial_converted',
  PLAN_UPGRADED:               'plan_upgraded',
  PLAN_DOWNGRADED:             'plan_downgraded',
  SUBSCRIPTION_PAUSED:         'subscription_paused',
  SUBSCRIPTION_CANCELLED:      'subscription_cancelled',
  PAYMENT_FAILED:              'payment_failed',
  PAYMENT_RECOVERED:           'payment_recovered',
  COUPON_APPLIED:              'coupon_applied',
  STUDENT_VERIFIED:            'student_verified',
  FOUNDER_SLOT_USED:           'founder_slot_used',
} as const

export type AnalyticsEvent = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS]

export type PricingPageOrigin =
  | 'lives-warning'
  | 'locked-area'
  | 'locked-calculator'
  | 'locked-investment'
  | 'ai-limit-reached'
  | 'nav-menu'
  | 'direct'

// ─── Nombres de display ───────────────────────────────────────────────────────

export const PLAN_NAMES: Record<PlanId, string> = {
  free:  'Gratis',
  plus:  'Plus',
  pro:   'Pro',
}

export const PLAN_TAGLINES: Record<PlanId, string> = {
  free:  'Para empezar sin compromiso',
  plus:  'Para quien quiere aprender en serio',
  pro:   'El ecosistema completo',
}
