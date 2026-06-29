export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  /** Fallback NGN per 1 unit — used only if live API fails */
  fallbackRate: number;
}

export const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", fallbackRate: 1378 },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", fallbackRate: 1810 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦", fallbackRate: 968 },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", fallbackRate: 1560 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", fallbackRate: 14.5 },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", fallbackRate: 375 },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦", fallbackRate: 75 },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪", fallbackRate: 10.6 },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", flag: "🇬🇭", fallbackRate: 115 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", fallbackRate: 9.2 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", fallbackRate: 900 },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭", fallbackRate: 1580 },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", fallbackRate: 1020 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", fallbackRate: 190 },
];

export const NGN_AMOUNT = 1_500_000;

export function formatRate(rate: number): string {
  return rate >= 100 ? rate.toFixed(2) : rate.toFixed(rate < 1 ? 4 : 2);
}

export function convertNgnToCurrency(ngnAmount: number, ngnPerUnit: number): number {
  return ngnAmount / ngnPerUnit;
}

export function formatConverted(amount: number, currency: Currency, liveRate?: number): string {
  const rate = liveRate ?? currency.fallbackRate;
  const decimals = rate >= 100 ? 2 : rate >= 10 ? 2 : 0;
  return `${currency.symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

export type LiveRates = Record<string, number>;

export function initLiveRates(): LiveRates {
  return Object.fromEntries(CURRENCIES.map((c) => [c.code, c.fallbackRate]));
}
