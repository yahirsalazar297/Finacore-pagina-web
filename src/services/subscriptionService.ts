/**
 * FINCORE — Servicio de suscripciones
 *
 * ⚠️  BACKEND REQUIRED
 * ─────────────────────────────────────────────────────────────────────────────
 * Este módulo contiene TODA la lógica de suscripciones de FINCORE.
 * Las funciones marcadas con "⚠️ BACKEND" deben ejecutarse EXCLUSIVAMENTE
 * en el servidor, nunca en el navegador, antes de cobrar dinero real:
 *
 *   • El plan del usuario NUNCA se decide en el navegador.
 *   • Ningún dato de tarjeta pasa por este servidor — lo maneja Stripe/MP.
 *   • Los cambios de plan se activan mediante webhooks del procesador de pagos.
 *   • Mientras no exista backend, los pagos NO deben activarse en producción.
 *
 * Arquitectura objetivo:
 *   Browser  →  POST /api/checkout       →  Stripe/MP
 *   Stripe   →  POST /api/webhooks/stripe →  DB (actualiza plan)
 *   MP       →  POST /api/webhooks/mp     →  DB (actualiza plan)
 *   Browser  →  GET  /api/me/subscription →  DB (lee plan real)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  type PlanId,
  type BillingPeriod,
  type PriceVariant,
  type PaymentChannel,
  type AnalyticsEvent,
  PRICES,
  TRIAL,
  PAUSE_POLICY,
  ANALYTICS_EVENTS,
  type PricingPageOrigin,
} from '../data/pricing'
import { isAllowedSchoolDomain } from '../data/allowedSchoolDomains'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface UserSubscription {
  userId: string
  planId: PlanId
  billingPeriod: BillingPeriod | null     // null = plan Gratis
  priceVariant: PriceVariant
  status: SubscriptionStatus
  currentPeriodStart: string | null       // ISO date
  currentPeriodEnd: string | null         // ISO date
  cancelAtPeriodEnd: boolean
  trialEnd: string | null                 // ISO date, null si no hay trial activo
  isFounder: boolean
  isStudentVerified: boolean
  studentVerificationExpiry: string | null
  pauseCount: number                      // Pausas usadas en el año en curso
  channel: PaymentChannel | null
  stripeSubscriptionId: string | null
  mercadopagoSubscriptionId: string | null
}

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'      // Pago fallido, dentro del periodo de gracia
  | 'canceled'
  | 'paused'
  | 'unpaid'        // Periodo de gracia expirado, pasó a Gratis

export interface CheckoutParams {
  planId: Exclude<PlanId, 'free'>
  billingPeriod: BillingPeriod
  priceVariant: PriceVariant
  channel: PaymentChannel
  couponCode?: string
  origin: PricingPageOrigin
}

export interface PlanChangeResult {
  success: boolean
  effectiveDate: string   // ISO date
  prorationAmount?: number
  error?: string
}

export interface CouponValidation {
  valid: boolean
  discountLabel?: string
  error?: string
}

export interface FounderStatus {
  available: boolean
  slotsRemaining: number
}

// ─── Estado local (reemplazar con API real en producción) ─────────────────────

/**
 * ⚠️  BACKEND: En producción leer de la DB vía GET /api/me/subscription.
 * Esta función NUNCA debe tomar decisiones de acceso basándose solo en
 * localStorage — es para UI optimista únicamente.
 */
export async function getCurrentSubscription(): Promise<UserSubscription | null> {
  // ⚠️  BACKEND REQUIRED — stub de desarrollo
  const stored = localStorage.getItem('fincore_subscription_dev')
  if (!stored) return null
  try {
    return JSON.parse(stored) as UserSubscription
  } catch {
    return null
  }
}

/**
 * Verifica si el usuario tiene acceso a un plan específico o superior.
 * ⚠️  BACKEND: En producción verificar en el servidor, no en el cliente.
 */
export async function hasAccess(requiredPlan: PlanId): Promise<boolean> {
  const sub = await getCurrentSubscription()
  if (!sub) return requiredPlan === 'free'

  const hierarchy: PlanId[] = ['free', 'plus', 'pro']
  const userLevel = hierarchy.indexOf(sub.planId)
  const requiredLevel = hierarchy.indexOf(requiredPlan)

  const isActive = sub.status === 'active' || sub.status === 'trialing' || sub.status === 'past_due'
  return isActive && userLevel >= requiredLevel
}

// ─── Checkout ─────────────────────────────────────────────────────────────────

/**
 * Inicia el flujo de checkout.
 * ⚠️  BACKEND REQUIRED: En producción este método llama a POST /api/checkout,
 * que crea la sesión de Stripe/MP en el servidor y devuelve la URL de pago.
 * El servidor es quien decide si aplica precio de fundador, estudiante o cupón.
 */
export async function startCheckout(params: CheckoutParams): Promise<{ checkoutUrl: string }> {
  trackEvent(ANALYTICS_EVENTS.CHECKOUT_STARTED, {
    plan: params.planId,
    period: params.billingPeriod,
    variant: params.priceVariant,
    origin: params.origin,
    channel: params.channel,
  })

  // ⚠️  BACKEND REQUIRED
  // Ejemplo de implementación real:
  // const res = await fetch('/api/checkout', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(params),
  // })
  // const { checkoutUrl } = await res.json()
  // return { checkoutUrl }

  console.warn('[subscriptionService] startCheckout: BACKEND REQUIRED — no se procesará el pago')
  return { checkoutUrl: '#backend-required' }
}

/**
 * Inicia la prueba gratuita de Pro (7 días).
 * ⚠️  BACKEND REQUIRED: Verificar en servidor que la cuenta nunca ha tenido trial.
 */
export async function startTrial(params: {
  billingPeriod: BillingPeriod
  origin: PricingPageOrigin
}): Promise<{ success: boolean; error?: string }> {
  // ⚠️  BACKEND REQUIRED
  // Verificar: ¿ya usó el trial? → 400 si sí
  // Crear suscripción de trial en Stripe con trial_period_days = TRIAL.durationDays

  trackEvent(ANALYTICS_EVENTS.TRIAL_STARTED, {
    plan: TRIAL.planId,
    period: params.billingPeriod,
    origin: params.origin,
  })

  console.warn('[subscriptionService] startTrial: BACKEND REQUIRED')
  return { success: false, error: 'Backend no disponible' }
}

// ─── Cambios de plan ──────────────────────────────────────────────────────────

/**
 * Upgrade inmediato de plan. Se cobra la diferencia proporcional.
 * ⚠️  BACKEND REQUIRED.
 */
export async function upgradePlan(
  _newPlanId: Exclude<PlanId, 'free'>,
  _newPeriod: BillingPeriod
): Promise<PlanChangeResult> {
  // ⚠️  BACKEND REQUIRED
  // Usar Stripe proration con proration_behavior: 'always_invoice'
  console.warn('[subscriptionService] upgradePlan: BACKEND REQUIRED')
  return { success: false, effectiveDate: '', error: 'Backend no disponible' }
}

/**
 * Downgrade al final del periodo actual. El plan cambia en la próxima renovación.
 * El progreso en áreas premium se preserva y aparece con candado.
 * ⚠️  BACKEND REQUIRED.
 */
export async function downgradePlan(_newPlanId: PlanId): Promise<PlanChangeResult> {
  // ⚠️  BACKEND REQUIRED
  // Stripe: schedule subscription change at period end
  console.warn('[subscriptionService] downgradePlan: BACKEND REQUIRED')
  return { success: false, effectiveDate: '', error: 'Backend no disponible' }
}

/**
 * Cancelar suscripción. El usuario conserva el plan hasta el fin del periodo.
 * Se ofrece una alternativa (bajar a Plus o pausar) antes de confirmar.
 * ⚠️  BACKEND REQUIRED.
 */
export async function cancelSubscription(reason?: string): Promise<{ success: boolean }> {
  trackEvent(ANALYTICS_EVENTS.SUBSCRIPTION_CANCELLED, { reason })
  // ⚠️  BACKEND REQUIRED
  // Stripe: cancel_at_period_end = true
  console.warn('[subscriptionService] cancelSubscription: BACKEND REQUIRED')
  return { success: false }
}

/**
 * Pausar suscripción (máx. 2 veces/año, 1 mes cada vez).
 * Durante la pausa el usuario tiene acceso de plan Gratis.
 * ⚠️  BACKEND REQUIRED.
 */
export async function pauseSubscription(): Promise<{ success: boolean; error?: string }> {
  const sub = await getCurrentSubscription()
  if (!sub) return { success: false, error: 'Sin suscripción activa' }

  if (sub.pauseCount >= PAUSE_POLICY.maxPausesPerYear) {
    return {
      success: false,
      error: `Ya usaste tus ${PAUSE_POLICY.maxPausesPerYear} pausas de este año.`,
    }
  }

  trackEvent(ANALYTICS_EVENTS.SUBSCRIPTION_PAUSED, { plan: sub.planId })
  // ⚠️  BACKEND REQUIRED
  console.warn('[subscriptionService] pauseSubscription: BACKEND REQUIRED')
  return { success: false, error: 'Backend no disponible' }
}

// ─── Precio de fundador ───────────────────────────────────────────────────────

/**
 * Consulta cuántos lugares de fundador quedan.
 * ⚠️  BACKEND REQUIRED: Leer el conteo real de la DB.
 * En development devuelve un stub.
 */
export async function getFounderStatus(): Promise<FounderStatus> {
  // ⚠️  BACKEND REQUIRED
  // const res = await fetch('/api/founder-status')
  // return res.json()

  // Stub de desarrollo (simula 423 usados, quedan 77)
  return { available: true, slotsRemaining: 77 }
}

/**
 * Un fundador que cancela y regresa PIERDE el precio de fundador.
 * Esta verificación ocurre en el servidor al crear la nueva suscripción.
 */
export function wasFormerFounder(sub: UserSubscription): boolean {
  return sub.isFounder && sub.status === 'canceled'
}

// ─── Verificación de estudiante ───────────────────────────────────────────────

/**
 * Verifica si el correo institucional es elegible para precio de estudiante.
 * Paso 1 (frontend): valida el dominio contra la lista local.
 * Paso 2 (backend): envía un código al correo y lo verifica.
 */
export function isEligibleStudentEmail(email: string): boolean {
  return isAllowedSchoolDomain(email)
}

/**
 * Solicita el envío del código de verificación al correo institucional.
 * ⚠️  BACKEND REQUIRED.
 */
export async function sendStudentVerificationCode(
  email: string
): Promise<{ success: boolean; error?: string }> {
  if (!isEligibleStudentEmail(email)) {
    return {
      success: false,
      error: 'El dominio de tu correo no está en la lista de escuelas aceptadas.',
    }
  }
  // ⚠️  BACKEND REQUIRED
  console.warn('[subscriptionService] sendStudentVerificationCode: BACKEND REQUIRED')
  return { success: false, error: 'Backend no disponible' }
}

/**
 * Confirma el código de verificación de estudiante.
 * ⚠️  BACKEND REQUIRED.
 */
export async function verifyStudentCode(
  _email: string,
  _code: string
): Promise<{ success: boolean; error?: string }> {
  // ⚠️  BACKEND REQUIRED
  console.warn('[subscriptionService] verifyStudentCode: BACKEND REQUIRED')
  trackEvent(ANALYTICS_EVENTS.STUDENT_VERIFIED, { plan: 'pro' })
  return { success: false, error: 'Backend no disponible' }
}

// ─── Cupones ──────────────────────────────────────────────────────────────────

/**
 * Valida un cupón de descuento.
 * ⚠️  BACKEND REQUIRED: La validación real ocurre en el servidor.
 * Un cupón no se puede combinar con precio de fundador ni de estudiante.
 */
export async function validateCoupon(
  _code: string,
  _planId: PlanId,
  _period: BillingPeriod,
  variant: PriceVariant
): Promise<CouponValidation> {
  if (variant === 'founder' || variant === 'student') {
    return {
      valid: false,
      error: 'Los cupones no se pueden combinar con precio de fundador ni de estudiante.',
    }
  }
  // ⚠️  BACKEND REQUIRED
  console.warn('[subscriptionService] validateCoupon: BACKEND REQUIRED')
  return { valid: false, error: 'Backend no disponible' }
}

// ─── Precios de display ───────────────────────────────────────────────────────

/** Devuelve el precio mensual que se muestra al usuario según el periodo seleccionado. */
export function getDisplayPrice(
  planId: PlanId,
  period: BillingPeriod,
  variant: PriceVariant = 'regular'
): number {
  if (planId === 'free') return 0

  if (planId === 'plus') {
    if (variant === 'founder') {
      return period === 'annual'
        ? PRICES.plus.founder.annualMonthlyEquivalent
        : PRICES.plus.founder.monthly
    }
    if (period === 'annual') return PRICES.plus.annualMonthlyEquivalent
    return PRICES.plus.monthly
  }

  if (planId === 'pro') {
    if (variant === 'student') {
      return period === 'annual'
        ? Math.round(PRICES.pro.student.annual / 12)
        : PRICES.pro.student.monthly
    }
    if (variant === 'founder') {
      return period === 'annual'
        ? PRICES.pro.founder.annualMonthlyEquivalent
        : PRICES.pro.founder.monthly
    }
    if (period === 'annual') return PRICES.pro.annualMonthlyEquivalent
    return PRICES.pro.monthly
  }

  return 0
}

/** Devuelve el total a cobrar (lo que aparece "al año" o "al mes"). */
export function getBilledTotal(
  planId: PlanId,
  period: BillingPeriod,
  variant: PriceVariant = 'regular'
): number {
  if (planId === 'free') return 0

  if (planId === 'plus') {
    if (variant === 'founder') {
      return period === 'annual' ? PRICES.plus.founder.annual : PRICES.plus.founder.monthly
    }
    if (period === 'annual') return PRICES.plus.annual
    return PRICES.plus.monthly
  }

  if (planId === 'pro') {
    if (variant === 'student') {
      return period === 'annual' ? PRICES.pro.student.annual : PRICES.pro.student.monthly
    }
    if (variant === 'founder') {
      return period === 'annual' ? PRICES.pro.founder.annual : PRICES.pro.founder.monthly
    }
    if (period === 'annual') return PRICES.pro.annual
    return PRICES.pro.monthly
  }

  return 0
}

/** Formatea un precio en MXN: "$1,599" */
export function formatPrice(amount: number): string {
  if (amount === 0) return '$0'
  return `$${amount.toLocaleString('es-MX')}`
}

// ─── Analítica ────────────────────────────────────────────────────────────────

interface TrackPayload {
  plan?: PlanId | string
  period?: BillingPeriod | string
  variant?: PriceVariant | string
  origin?: PricingPageOrigin | string
  channel?: PaymentChannel | string
  reason?: string
  [key: string]: unknown
}

/**
 * Registra un evento de analítica.
 * Reemplaza con tu proveedor real (Mixpanel, Amplitude, PostHog, etc.)
 */
export function trackEvent(event: AnalyticsEvent | string, payload?: TrackPayload): void {
  // ⚠️  Conectar con el proveedor de analítica en producción
  if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).analytics) {
    ;((window as unknown as Record<string, unknown>).analytics as { track: (e: string, p?: TrackPayload) => void }).track(event, payload)
  }
  // Siempre loguear en desarrollo
  if (import.meta.env.DEV) {
    console.info(`[analytics] ${event}`, payload)
  }
}

// ─── Webhooks (referencia de implementación en servidor) ──────────────────────
/**
 * ⚠️  BACKEND REQUIRED
 *
 * El servidor debe manejar estos eventos de Stripe:
 *   customer.subscription.created      → activar plan
 *   customer.subscription.updated      → cambiar plan
 *   customer.subscription.deleted      → pasar a Gratis
 *   invoice.payment_succeeded          → renovar, generar comprobante
 *   invoice.payment_failed             → iniciar periodo de gracia
 *   customer.subscription.trial_will_end (2 días antes) → enviar aviso
 *
 * Y de Mercado Pago:
 *   payment.created / payment.approved → activar plan anual
 *   subscription.cancelled            → pasar a Gratis
 *
 * En TODOS los casos: actualizar la DB y emitir un evento de analítica.
 * Nunca confiar en el frontend para decidir el estado del plan.
 */
export const _WEBHOOK_REFERENCE = null
