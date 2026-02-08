export type Currency = "USD" | "CLP" | "ARS" | "BTC";

export function formatMoney(amount: number, currency: Currency, locale = "es-CL") {
  if (currency === "BTC") return `${amount} BTC`;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "CLP" ? 0 : 2,
  }).format(amount);
}
