import {SubscriptionState} from '../types/app';

export const CHECKOUT_URL =
  'https://pay.mapadaaprovacaocnh.com.br/assinatura-mensal-5';

export const MONTHLY_PRICE_TEXT = 'R$ 5,00/mês';
export const MONTHLY_PRICE_SHORT = 'R$ 5/mês';
export const FREE_QUESTION_LIMIT = 6;
export const SUBSCRIPTION_DURATION_DAYS = 30;

export const VALID_ACTIVATION_CODES = ['APROVADO5', 'CNHPRO5', 'MAPA5'];

export function isSubscriptionActive(sub: SubscriptionState): boolean {
  if (sub.plan !== 'pro' || !sub.expiresAt) return false;
  return new Date(sub.expiresAt).getTime() > Date.now();
}

export function getDaysRemaining(sub: SubscriptionState): number {
  if (!isSubscriptionActive(sub) || !sub.expiresAt) return 0;
  const diffMs = new Date(sub.expiresAt).getTime() - Date.now();
  return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

export function createProSubscription(
  source: 'code' | 'test',
  codeUsed?: string,
): SubscriptionState {
  const now = new Date();
  const expires = new Date(
    now.getTime() + SUBSCRIPTION_DURATION_DAYS * 24 * 60 * 60 * 1000,
  );
  return {
    plan: 'pro',
    activatedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    activationSource: source,
    codeUsed,
  };
}

export function createFreeSubscription(): SubscriptionState {
  return {
    plan: 'free',
    activatedAt: null,
    expiresAt: null,
    activationSource: null,
  };
}

export function formatDateBR(isoDate: string | null): string {
  if (!isoDate) return '—';
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
