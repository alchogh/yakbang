import { desc, eq } from "drizzle-orm";
import { db } from "./client";
import { medicines, type Medicine, type NewMedicine } from "./schema";

/* 데이터 접근은 Server Action이 아니라 여기 있다(CLAUDE.md).
   네이티브 앱은 Server Actions를 못 써서, 이 함수들이 나중에 HTTP API 뒤로
   그대로 옮겨간다. Next에 기대는 것(connection·refresh)은 여기 넣지 않는다. */

export async function listMedicines(userId: string): Promise<Medicine[]> {
  return db
    .select()
    .from(medicines)
    .where(eq(medicines.userId, userId))
    .orderBy(desc(medicines.createdAt));
}

export async function addMedicine(medicine: NewMedicine): Promise<void> {
  await db.insert(medicines).values(medicine);
}
