import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pt-safe pb-safe">
        {children}
      </body>
    </html>
  );
}
