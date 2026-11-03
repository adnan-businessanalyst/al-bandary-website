import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvLocal() {
  let text = "";
  try {
    text = readFileSync(resolve(root, ".env.local"), "utf8");
  } catch {
    return;
  }
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql = readFileSync(resolve(root, "db/migrations/001_inquiries.sql"), "utf8");
const pool = new pg.Pool({
  connectionString: databaseUrl,
  connectionTimeoutMillis: 8000,
});

try {
  await pool.query(sql);
  console.log("inquiries migration applied");
} catch (error) {
  const code = error && typeof error === "object" && "code" in error ? error.code : "unknown";
  console.error("migration failed", code);
  process.exitCode = 1;
} finally {
  await pool.end();
}
