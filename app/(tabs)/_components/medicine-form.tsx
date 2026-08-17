"use client";

import { useState } from "react";
import { addMedicineAction } from "../_actions";
import type { MedicineCategory } from "../_types";

type Props = {
  category: MedicineCategory;
  // 한 화면에 폼이 셋이라 입력칸 이름이 겹친다. 어느 종류의 칸인지 붙여준다.
  label: string;
};

export function MedicineForm({ category, label }: Props) {
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");

  const canSubmit = name.trim().length > 0;

  async function handleSubmit() {
    if (!canSubmit) return;
    await addMedicineAction({ category, name: name.trim(), memo: memo.trim() });
    setName("");
    setMemo("");
  }

  // 입력칸은 테두리 대신 배경 밝기 차이로 구분한다.
  // 글자 크기가 16px 아래로 내려가면 iOS가 입력 시 화면을 확대한다.
  const field =
    "bg-background w-full rounded-lg px-3 py-2.5 text-base outline-none placeholder:text-muted";

  return (
    <form action={handleSubmit} className="flex flex-col gap-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
        aria-label={`${label} 이름`}
        className={field}
      />
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모 (왜 먹는지, 언제부터)"
        aria-label={`${label} 메모`}
        rows={2}
        className={`${field} resize-none`}
      />
      <button
        type="submit"
        disabled={!canSubmit}
        // 강조색은 화면에서 여기 한 곳만 쓴다.
        className="min-h-11 rounded-lg bg-accent text-base font-semibold text-surface disabled:opacity-40"
      >
        추가
      </button>
    </form>
  );
}
