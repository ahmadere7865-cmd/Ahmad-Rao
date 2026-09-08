import { Currency } from '../types';

export const CURRENCY_RATES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
};

export function formatPrice(amountInUSD: number, currency: Currency = 'USD'): string {
  const { symbol, rate } = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = amountInUSD * rate;
  return `${symbol}${converted.toFixed(2)}`;
}
