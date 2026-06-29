import { CURRENCIES, type LiveRates } from "./currencies";

const FOREX_API = "https://open.er-api.com/v6/latest/USD";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour — matches API daily refresh cadence

interface ForexApiResponse {
  result: string;
  base_code: string;
  rates: Record<string, number>;
  time_last_update_utc: string;
}

export interface ForexRatesPayload {
  rates: LiveRates;
  lastUpdated: string;
  source: string;
}

let cache: { data: ForexRatesPayload; expiresAt: number } | null = null;

/** How many NGN per 1 unit of foreign currency, derived from USD-based rates */
export function usdRatesToNgnPerUnit(usdRates: Record<string, number>): LiveRates {
  const ngnPerUsd = usdRates.NGN;
  if (!ngnPerUsd || ngnPerUsd <= 0) {
    throw new Error("NGN rate unavailable");
  }

  const result: LiveRates = {};
  for (const currency of CURRENCIES) {
    const usdPerUnit = usdRates[currency.code];
    if (!usdPerUnit || usdPerUnit <= 0) continue;
    // 1 unit of currency = (1 / usdPerUnit) USD = (ngnPerUsd / usdPerUnit) NGN
    result[currency.code] = ngnPerUsd / usdPerUnit;
  }
  return result;
}

export function getFallbackRates(): LiveRates {
  return Object.fromEntries(CURRENCIES.map((c) => [c.code, c.fallbackRate]));
}

export async function fetchLiveForexRates(): Promise<ForexRatesPayload> {
  if (cache && Date.now() < cache.expiresAt) {
    return cache.data;
  }

  try {
    const res = await fetch(FOREX_API, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Forex API HTTP ${res.status}`);

    const data = (await res.json()) as ForexApiResponse;
    if (data.result !== "success" || !data.rates?.NGN) {
      throw new Error("Invalid forex API response");
    }

    const rates = usdRatesToNgnPerUnit(data.rates);
    const payload: ForexRatesPayload = {
      rates,
      lastUpdated: data.time_last_update_utc,
      source: "ExchangeRate-API",
    };

    cache = { data: payload, expiresAt: Date.now() + CACHE_TTL_MS };
    return payload;
  } catch (error) {
    console.error("Forex fetch failed, using fallback:", error);
    return {
      rates: getFallbackRates(),
      lastUpdated: new Date().toUTCString(),
      source: "fallback",
    };
  }
}
