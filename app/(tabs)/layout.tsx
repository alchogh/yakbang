import { TabBar } from "./_components/tab-bar";

// 하단 탭을 쓰는 화면들의 껍데기.
// 탭바가 fixed라 본문 아래쪽에 탭바 높이만큼 여백을 둔다.
export default function TabsLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <main className="mx-auto w-full max-w-md flex-1 bg-surface px-5 pt-safe pb-24">
        {children}
      </main>
      <TabBar />
    </>
  );
}
