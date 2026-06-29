export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(num: number, decimals = 0): string {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export const COUNTRIES = [
  { code: "NG", flag: "🇳🇬", name: "Nigeria" },
  { code: "GB", flag: "🇬🇧", name: "UK" },
  { code: "US", flag: "🇺🇸", name: "USA" },
  { code: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "IN", flag: "🇮🇳", name: "India" },
] as const;
