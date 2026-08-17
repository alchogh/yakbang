import type { Medicine } from "@/db/schema";

export type { Medicine };
export type MedicineCategory = Medicine["category"];

// 기록 화면에 이 순서로 그려진다. 값은 db/schema.ts 의 enum과 같아야 한다.
export const CATEGORIES: { value: MedicineCategory; label: string }[] = [
  { value: "supplement", label: "영양제" },
  { value: "medicine", label: "약" },
  { value: "ongoing", label: "지속적으로 먹는 약" },
];
