"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "기록" },
  { href: "/feed", label: "커뮤니티" },
  { href: "/me", label: "나" },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function TabBar() {
  const pathname = usePathname();

  return (
    // 면을 나누는 건 그림자가 아니라 머리카락 두께 선이다.
    // 폭을 본문과 같은 max-w-md로 묶는다. 폰에서는 화면을 꽉 채우고,
    // 넓은 화면에서는 선이 본문 열 밖으로 삐져나오지 않는다.
    // pb-safe가 없으면 홈 인디케이터에 가린다.
    <nav className="fixed inset-x-0 bottom-0 mx-auto max-w-md border-t border-line bg-surface pb-safe">
      <ul className="flex">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.href);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                // 글자가 작아도 터치 영역은 44px을 지킨다.
                className={`flex min-h-11 flex-col items-center justify-center gap-1 py-2 text-xs ${
                  active ? "text-accent" : "text-muted"
                }`}
              >
                <TabIcon href={tab.href} />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function TabIcon({ href }: { href: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (href === "/") {
    return (
      <svg {...common}>
        <rect x="3.5" y="8" width="17" height="8" rx="4" />
        <path d="M12 8v8" />
      </svg>
    );
  }

  if (href === "/feed") {
    return (
      <svg {...common}>
        <path d="M20 12a8 8 0 0 1-11.8 7L4 20l1-4.2A8 8 0 1 1 20 12z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}
