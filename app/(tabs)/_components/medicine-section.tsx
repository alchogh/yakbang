import type { Medicine, MedicineCategory } from "../_types";
import { MedicineForm } from "./medicine-form";
import { MedicineList } from "./medicine-list";

type Props = {
  category: MedicineCategory;
  label: string;
  items: Medicine[];
};

// 제목을 눌러 펼친다. 여닫는 상태는 <details>가 들고 있어서 따로 두지 않는다.
// 섹션 안에서 추가하므로 폼에 종류를 고르는 칸이 없다 — 연 곳이 곧 종류다.
export function MedicineSection({ category, label, items }: Props) {
  return (
    // 접힌 제목끼리는 여백만으로 줄이 나뉘지 않아 머리카락 두께 선을 쓴다.
    <details className="group border-b border-line">
      <summary
        // Safari는 list-none으로 삼각형이 사라지지 않아 마커를 따로 지운다.
        className="flex min-h-11 cursor-pointer list-none items-center gap-3 py-4 select-none [&::-webkit-details-marker]:hidden"
      >
        <span className="flex-1 font-semibold">{label}</span>
        {items.length > 0 && (
          <span className="text-muted tabular-nums">{items.length}</span>
        )}
        <svg
          viewBox="0 0 20 20"
          aria-hidden
          className="size-4 text-muted transition-transform duration-150 ease-out group-open:rotate-180 motion-reduce:transition-none"
        >
          <path
            d="M5 8l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="flex flex-col gap-6 pb-6">
        <MedicineForm category={category} label={label} />
        <MedicineList items={items} />
      </div>
    </details>
  );
}
