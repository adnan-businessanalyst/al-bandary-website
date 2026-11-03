import type { Locale } from "./dictionary";

const PAGES = new Set(["/", "/about", "/products", "/factory", "/quality", "/contact"]);
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CAMPAIGN = /^[\w .+-]{1,120}$/;
const OWN_HOSTS = new Set([
  "saudialbandari.com",
  "www.saudialbandari.com",
  "localhost",
  "127.0.0.1",
  "::1",
]);

export type InquiryInput = {
  idempotencyKey: string;
  language: Locale;
  pagePath: string;
  source: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  product: string | null;
  message: string;
};

function cleanLine(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (!text || text.length > max || /[\r\n\u0000-\u001F]/.test(text)) return null;
  return text;
}

function cleanMessage(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const text = value.replace(/\r\n/g, "\n").trim();
  if (!text || text.length > max || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(text)) {
    return null;
  }
  return text;
}

function optionalLine(value: unknown, max: number) {
  if (typeof value !== "string" || value.trim() === "") return { ok: true as const, value: null };
  const text = cleanLine(value, max);
  if (!text) return { ok: false as const };
  return { ok: true as const, value: text };
}

function externalReferrer(referrer: unknown) {
  if (typeof referrer !== "string" || !referrer.trim()) return false;
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return host !== "" && !OWN_HOSTS.has(host);
  } catch {
    return false;
  }
}

export function classifySource(utmCampaign: unknown, referrer: unknown) {
  if (typeof utmCampaign === "string" && CAMPAIGN.test(utmCampaign.trim())) {
    return utmCampaign.trim();
  }
  return externalReferrer(referrer) ? "organic" : "direct";
}

export function parseInquiry(body: unknown): { ok: true; value: InquiryInput } | { ok: false } {
  if (!body || typeof body !== "object") return { ok: false };
  const record = body as Record<string, unknown>;
  if (typeof record.faxNumber === "string" && record.faxNumber.trim()) return { ok: false };

  const idempotencyKey = cleanLine(record.idempotencyKey, 36);
  if (!idempotencyKey || !UUID.test(idempotencyKey)) return { ok: false };
  if (record.language !== "ar" && record.language !== "en") return { ok: false };
  const pagePath = cleanLine(record.pagePath, 200);
  if (!pagePath || !PAGES.has(pagePath)) return { ok: false };

  const name = cleanLine(record.name, 120);
  const company = cleanLine(record.company, 160);
  const email = cleanLine(record.email, 254);
  const message = cleanMessage(record.message, 4000);
  const phone = optionalLine(record.phone, 40);
  const product = optionalLine(record.product, 160);
  if (!name || !company || !email || !EMAIL.test(email) || !message || !phone.ok || !product.ok) {
    return { ok: false };
  }

  return {
    ok: true,
    value: {
      idempotencyKey,
      language: record.language,
      pagePath,
      source: classifySource(record.utmCampaign, record.referrer),
      name,
      company,
      email,
      phone: phone.value,
      product: product.value,
      message,
    },
  };
}
