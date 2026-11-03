import { markInquiryNotified, type InquiryRecord } from "./inquiry-store";

const DEFAULT_RECEIVER = "Info@SaudiAlbandari.com";
const SITE_URL = "https://www.saudialbandari.com";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type MailConfig = {
  apiKey: string;
  domain: string;
  from: string;
  base: string;
  receiver: string;
};

function addressFrom(from: string) {
  const match = from.match(/<([^>]+)>\s*$/);
  return (match ? match[1] : from).trim().toLowerCase();
}

function mailConfig(): MailConfig | null {
  const apiKey = process.env.MAILGUN_API_KEY ?? "";
  const domain = process.env.MAILGUN_DOMAIN ?? "";
  const from = process.env.MAILGUN_FROM ?? "";
  const base = (process.env.MAILGUN_API_BASE ?? "https://api.eu.mailgun.net").replace(/\/$/, "");
  const configuredReceiver = process.env.INQUIRY_TO_EMAIL ?? "";
  if (!apiKey || !domain || !from || !base.startsWith("https://")) return null;
  if (!addressFrom(from).endsWith(`@${domain.toLowerCase()}`)) return null;
  return {
    apiKey,
    domain,
    from,
    base,
    receiver: EMAIL.test(configuredReceiver) ? configuredReceiver : DEFAULT_RECEIVER,
  };
}

function buyerText(inquiry: InquiryRecord) {
  if (inquiry.language === "ar") {
    return [
      "وصل طلبك إلى مصنع البندري.",
      "",
      `رقم الطلب: ${inquiry.id}`,
      "",
      "سيراجع فريق المبيعات التفاصيل ويعود إليك.",
      `الموقع: ${SITE_URL}`,
    ].join("\n");
  }
  return [
    "We received your request.",
    "",
    `Reference: ${inquiry.id}`,
    "",
    "Sales will review the details and come back to you.",
    `Website: ${SITE_URL}`,
  ].join("\n");
}

function salesText(inquiry: InquiryRecord) {
  return [
    "New website inquiry",
    "",
    `Reference: ${inquiry.id}`,
    `Received: ${inquiry.createdAt.toISOString()}`,
    `Language: ${inquiry.language}`,
    `Page: ${inquiry.pagePath}`,
    `Source: ${inquiry.source}`,
    "",
    `Name: ${inquiry.name}`,
    `Company: ${inquiry.company}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone ?? ""}`,
    `Product: ${inquiry.product ?? ""}`,
    "",
    "Message:",
    inquiry.message,
  ].join("\n");
}

async function sendMail(config: MailConfig, message: { to: string; subject: string; text: string; replyTo: string }) {
  const body = new URLSearchParams({
    from: config.from,
    to: message.to,
    subject: message.subject,
    text: message.text,
    "h:Reply-To": message.replyTo,
    "o:tracking": "no",
    "o:tracking-clicks": "no",
    "o:tracking-opens": "no",
  });
  const response = await fetch(`${config.base}/v3/${encodeURIComponent(config.domain)}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${config.apiKey}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    signal: AbortSignal.timeout(10000),
  });
  return response.ok;
}

async function deliverOne(
  inquiry: InquiryRecord,
  target: "sender" | "receiver",
  config: MailConfig,
) {
  const alreadySent = target === "sender" ? inquiry.senderNotifiedAt : inquiry.receiverNotifiedAt;
  if (alreadySent) return;
  try {
    const sent = await sendMail(
      config,
      target === "sender"
        ? {
            to: inquiry.email,
            subject: inquiry.language === "ar" ? "وصل طلبك إلى البندري" : "We received your request",
            text: buyerText(inquiry),
            replyTo: config.receiver,
          }
        : {
            to: config.receiver,
            subject: `New inquiry ${inquiry.id}`,
            text: salesText(inquiry),
            replyTo: inquiry.email,
          },
    );
    if (!sent) {
      console.error(`inquiry ${target} mail failed`);
      return;
    }
    await markInquiryNotified(inquiry.id, target);
  } catch {
    console.error(`inquiry ${target} mail failed`);
  }
}

export async function deliverInquiryMail(inquiry: InquiryRecord) {
  const config = mailConfig();
  if (!config) {
    console.error("Mailgun is not configured");
    return;
  }
  await deliverOne(inquiry, "receiver", config);
  await deliverOne(inquiry, "sender", config);
}
