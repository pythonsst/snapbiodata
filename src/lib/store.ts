import "server-only";
import type { BiodataRecord } from "@/data/biodata";

/**
 * Storage for published biodatas.
 *
 * In production it uses Redis (the Vercel "Upstash for Redis" Marketplace
 * integration, which injects KV_REST_API_URL / KV_REST_API_TOKEN — also
 * accepts UPSTASH_REDIS_REST_URL / _TOKEN).
 *
 * When those env vars are absent (e.g. local dev with no Redis), it transparently
 * falls back to a JSON file store under `.data/` so the whole flow works locally.
 */

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const useRedis = Boolean(REDIS_URL && REDIS_TOKEN);

const key = (slug: string) => `bio:${slug}`;

// ── Redis backend ───────────────────────────────────────────────────────────
async function redis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis({ url: REDIS_URL!, token: REDIS_TOKEN! });
}

// ── Local file backend (dev only) ────────────────────────────────────────────
async function fileDir() {
  const path = await import("node:path");
  return path.join(process.cwd(), ".data", "biodata");
}

async function fileGet(slug: string): Promise<BiodataRecord | null> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  try {
    const raw = await fs.readFile(path.join(await fileDir(), `${slug}.json`), "utf8");
    return JSON.parse(raw) as BiodataRecord;
  } catch {
    return null;
  }
}

async function filePut(rec: BiodataRecord): Promise<void> {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const dir = await fileDir();
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${rec.slug}.json`), JSON.stringify(rec), "utf8");
}

// ── Public API ───────────────────────────────────────────────────────────────
export async function getRecord(slug: string): Promise<BiodataRecord | null> {
  if (useRedis) {
    const r = await redis();
    return (await r.get<BiodataRecord>(key(slug))) ?? null;
  }
  return fileGet(slug);
}

export async function slugExists(slug: string): Promise<boolean> {
  if (useRedis) {
    const r = await redis();
    return (await r.exists(key(slug))) === 1;
  }
  return (await fileGet(slug)) !== null;
}

export async function putRecord(rec: BiodataRecord): Promise<void> {
  if (useRedis) {
    const r = await redis();
    await r.set(key(rec.slug), rec);
    return;
  }
  await filePut(rec);
}

/** Whether persistent (cloud) storage is configured. */
export const isCloudStore = useRedis;
