/**
 * FINCORE — Servicio de analítica
 *
 * Todos los eventos definidos en pricing.ts se registran aquí.
 * Reemplaza la implementación de `send()` con tu proveedor real.
 */

import {
  ANALYTICS_EVENTS,
  type PlanId,
  type BillingPeriod,
  type PriceVariant,
  type PaymentChannel,
  type PricingPageOrigin,
} from '../data/pricing'

export type { AnalyticsEvent } from '../data/pricing'

interface BaseEventProps extends Record<string, unknown> {
  plan?: PlanId
  period?: BillingPeriod
  variant?: PriceVariant
  origin?: PricingPageOrigin
  channel?: PaymentChannel
}

function send(event: string, props?: Record<string, unknown>): void {
  // ⚠️  Conectar con Mixpanel / Amplitude / PostHog / GA4 aquí
  if (import.meta.env.DEV) console.info(`[analytics] ${event}`, props)

  // Ejemplo con gtag (Google Analytics 4):
  // if (typeof window.gtag === 'function') {
  //   window.gtag('event', event, props)
  // }
}

// ─── Eventos de la página de precios ─────────────────────────────────────────

export function trackPricingPageViewed(origin: PricingPageOrigin): void {
  send(ANALYTICS_EVENTS.PRICING_PAGE_VIEWED, { origin })
}

export function trackBillingToggleChanged(period: BillingPeriod): void {
  send(ANALYTICS_EVENTS.BILLING_TOGGLE_CHANGED, { period })
}

export function trackPlanClicked(props: BaseEventProps): void {
  send(ANALYTICS_EVENTS.PLAN_CLICKED, props)
}

// ─── Eventos de checkout ──────────────────────────────────────────────────────

export function trackCheckoutStarted(props: BaseEventProps): void {
  send(ANALYTICS_EVENTS.CHECKOUT_STARTED, props)
}

export function trackCheckoutCompleted(props: BaseEventProps & { revenue: number }): void {
  send(ANALYTICS_EVENTS.CHECKOUT_COMPLETED, props)
}

// ─── Eventos de trial ─────────────────────────────────────────────────────────

export function trackTrialStarted(props: BaseEventProps): void {
  send(ANALYTICS_EVENTS.TRIAL_STARTED, props)
}

export function trackTrialCancelled(props: BaseEventProps): void {
  send(ANALYTICS_EVENTS.TRIAL_CANCELLED, props)
}

export function trackTrialConverted(props: BaseEventProps & { revenue: number }): void {
  send(ANALYTICS_EVENTS.TRIAL_CONVERTED, props)
}

// ─── Eventos de cambio de plan ────────────────────────────────────────────────

export function trackPlanUpgraded(props: BaseEventProps & { fromPlan: PlanId }): void {
  send(ANALYTICS_EVENTS.PLAN_UPGRADED, props)
}

export function trackPlanDowngraded(props: BaseEventProps & { fromPlan: PlanId }): void {
  send(ANALYTICS_EVENTS.PLAN_DOWNGRADED, props)
}

// ─── Eventos de gestión de suscripción ───────────────────────────────────────

export function trackSubscriptionPaused(props: BaseEventProps): void {
  send(ANALYTICS_EVENTS.SUBSCRIPTION_PAUSED, props)
}

export function trackSubscriptionCancelled(
  props: BaseEventProps & { reason?: string }
): void {
  send(ANALYTICS_EVENTS.SUBSCRIPTION_CANCELLED, props)
}

// ─── Eventos de pago ──────────────────────────────────────────────────────────

export function trackPaymentFailed(props: BaseEventProps): void {
  send(ANALYTICS_EVENTS.PAYMENT_FAILED, props)
}

export function trackPaymentRecovered(props: BaseEventProps): void {
  send(ANALYTICS_EVENTS.PAYMENT_RECOVERED, props)
}

// ─── Eventos de descuentos y verificaciones ───────────────────────────────────

export function trackCouponApplied(
  props: BaseEventProps & { couponCode: string; discountLabel: string }
): void {
  send(ANALYTICS_EVENTS.COUPON_APPLIED, props)
}

export function trackStudentVerified(props: BaseEventProps): void {
  send(ANALYTICS_EVENTS.STUDENT_VERIFIED, props)
}

export function trackFounderSlotUsed(props: BaseEventProps): void {
  send(ANALYTICS_EVENTS.FOUNDER_SLOT_USED, props)
}
