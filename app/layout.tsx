import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "약방",
  description: "복용 중인 비타민·영양제·약을 기록하고 나누는 곳",
};

// viewportFit: 화면을 노치 영역까지 확장한다. env(safe-area-inset-*)를
// 쓰려면 필수다. 안전 영역 여백은 globals.css의 pt-safe/pb-safe로 준다.
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
