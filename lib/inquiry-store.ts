import type { Locale } from "./dictionary";
import { getPool } from "./db";
import type { InquiryInput } from "./inquiry";

export type InquiryRecord = {
  id: string;
  language: Locale;
  pagePath: string;
  source: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  product: string | null;
  message: string;
  createdAt: Date;
  senderNotifiedAt: Date | null;
  receiverNotifiedAt: Date | null;
};

type InquiryRow = {
  id: string;
  language: Locale;
  page_path: string;
  source: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  product: string | null;
  message: string;
  created_at: Date;
  sender_notified_at: Date | null;
  receiver_notified_at: Date | null;
};

const RETURNING = `
  id, language, page_path, source, name, company, email, phone, product, message,
  created_at, sender_notified_at, receiver_notified_at
`;

function asDate(value: Date | string | null) {
  if (!value) return null;
  return value instanceof Date ? value : new Date(value);
}

function mapRow(row: InquiryRow): InquiryRecord {
  return {
    id: row.id,
    language: row.language,
    pagePath: row.page_path,
    source: row.source,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    product: row.product,
    message: row.message,
    createdAt: asDate(row.created_at) ?? new Date(),
    senderNotifiedAt: asDate(row.sender_notified_at),
    receiverNotifiedAt: asDate(row.receiver_notified_at),
  };
}

export async function saveInquiry(input: InquiryInput) {
  const pool = getPool();
  const inserted = await pool.query<InquiryRow>(
    `INSERT INTO inquiries (
      idempotency_key, type, language, page_path, source,
      name, company, email, phone, product, message
    ) VALUES ($1, 'form', $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ON CONFLICT (idempotency_key) DO NOTHING
    RETURNING ${RETURNING}`,
    [
      input.idempotencyKey,
      input.language,
      input.pagePath,
      input.source,
      input.name,
      input.company,
      input.email,
      input.phone,
      input.product,
      input.message,
    ],
  );
  const row =
    inserted.rows[0] ??
    (
      await pool.query<InquiryRow>(
        `SELECT ${RETURNING} FROM inquiries WHERE idempotency_key = $1`,
        [input.idempotencyKey],
      )
    ).rows[0];
  if (!row) throw new Error("inquiry missing after insert");
  return mapRow(row);
}

export async function markInquiryNotified(id: string, target: "sender" | "receiver") {
  const column = target === "sender" ? "sender_notified_at" : "receiver_notified_at";
  await getPool().query(
    `UPDATE inquiries SET ${column} = now() WHERE id = $1 AND ${column} IS NULL`,
    [id],
  );
}
