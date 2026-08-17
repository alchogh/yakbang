import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DATABASE_URL이 없다. .env.example 을 .env.local 로 복사한다.",
  );
}

// next dev는 파일이 바뀔 때마다 모듈을 다시 불러온다.
// 전역에 붙여두지 않으면 저장할 때마다 커넥션이 새로 쌓인다.
const globalForDb = globalThis as { sql?: ReturnType<typeof postgres> };
const sql = globalForDb.sql ?? postgres(url);
if (process.env.NODE_ENV !== "production") globalForDb.sql = sql;

export const db = drizzle(sql, { schema });
