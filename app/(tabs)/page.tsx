import { connection } from "next/server";
import { listMedicines } from "@/db/medicines";
import { currentUserId } from "@/lib/session";
import { MedicineSection } from "./_components/medicine-section";
import { CATEGORIES } from "./_types";

export default async function RecordPage() {
  // DB를 읽으므로 빌드 때 미리 그리지 않고 요청마다 그린다.
  await connection();
  const items = await listMedicines(currentUserId());

  return (
    <>
      <h1 className="pt-8 pb-6 text-2xl font-semibold tracking-tight">기록</h1>
      {CATEGORIES.map(({ value, label }) => (
        <MedicineSection
          key={value}
          category={value}
          label={label}
          items={items.filter((item) => item.category === value)}
        />
      ))}
    </>
  );
}
