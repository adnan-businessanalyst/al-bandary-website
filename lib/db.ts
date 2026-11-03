import { Pool } from "pg";

const globalForPg = globalThis as unknown as { inquiryPool?: Pool };

export function getPool() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!globalForPg.inquiryPool) {
    globalForPg.inquiryPool = new Pool({
      connectionString: url,
      connectionTimeoutMillis: 8000,
      max: 5,
    });
  }
  return globalForPg.inquiryPool;
}
