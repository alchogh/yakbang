import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// 기록 화면의 세 종류. 값을 바꾸면 마이그레이션이 필요하다.
export const medicineCategory = pgEnum("medicine_category", [
  "supplement",
  "medicine",
  "ongoing",
]);

export const medicines = pgTable("medicines", {
  id: uuid("id").primaryKey().defaultRandom(),
  /* 로그인이 아직 없어서 users 테이블이 없다. 외래키는 그때 건다.
     건강 기록이라 "누구 것인가" 없이 쌓으면 나중에 통째로 다시 짜야 해서
     컬럼은 지금부터 둔다. 값은 lib/session.ts 가 정한다. */
  userId: uuid("user_id").notNull(),
  category: medicineCategory("category").notNull(),
  name: text("name").notNull(),
  /* 사용자가 직접 쓴 메모. 왜 먹는지, 언제부터 같은 것.
     공공 API에서 받아올 공식 정보(효능·용법·주의사항)는 여기 섞지 않는다.
     누가 한 말인지 구분돼야 해서 자리를 따로 둔다. */
  memo: text("memo").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Medicine = typeof medicines.$inferSelect;
export type NewMedicine = typeof medicines.$inferInsert;
