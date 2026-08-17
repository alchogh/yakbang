import type { Medicine } from "../_types";

type Props = {
  items: Medicine[];
};

export function MedicineList({ items }: Props) {
  // 빈 상태에 문구를 넣지 않는다. 바로 위에 폼이 있어서 비어 있다는 게 이미 보인다.
  if (items.length === 0) return null;

  // 항목은 테두리로 가두지 않고 여백으로 나눈다.
  return (
    <ul className="flex flex-col gap-6">
      {items.map((item) => (
        <li key={item.id} className="flex flex-col gap-1">
          <span className="font-semibold">{item.name}</span>
          {item.memo && (
            <span className="whitespace-pre-line text-muted">{item.memo}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
