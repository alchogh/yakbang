import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

// drizzle-kit은 Next 밖에서 도니 .env.local 을 스스로 읽지 않는다.
// Next와 같은 순서로 읽게 해서 DATABASE_URL 을 한 곳에만 적는다.
loadEnvConfig(process.cwd());

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
