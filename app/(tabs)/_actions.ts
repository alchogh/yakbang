"use server";

import { refresh } from "next/cache";
import { addMedicine } from "@/db/medicines";
import { currentUserId } from "@/lib/session";
import type { MedicineCategory } from "./_types";

// 껍데기다. 저장하는 일은 db/medicines.ts 가 한다(CLAUDE.md).
export async function addMedicineAction(input: {
  category: MedicineCategory;
  name: string;
  memo: string;
}) {
  // Server Action은 UI를 거치지 않고 POST로 직접 부를 수 있다. 여기서 한 번 더 본다.
  const name = input.name.trim();
  if (!name) throw new Error("이름이 비어 있다.");

  await addMedicine({
    userId: currentUserId(),
    category: input.category,
    name,
    memo: input.memo.trim(),
  });

  refresh();
}
