import { t as private_env } from "./shared-server.js";
import { Pool } from "pg";
//#region src/lib/server/db/postgres.ts
if (!private_env.DATABASE_URL) throw new Error("DATABASE_URL is not configured.");
var globalForDb = globalThis;
var pool = globalForDb.tecspaPostgresPool ?? new Pool({ connectionString: private_env.DATABASE_URL });
if (process.env.NODE_ENV !== "production") globalForDb.tecspaPostgresPool = pool;
//#endregion
export { pool as t };
