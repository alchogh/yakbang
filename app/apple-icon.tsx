import { ImageResponse } from "next/og";

// iOS 홈 화면 아이콘. SVG를 지원하지 않아 PNG로 생성한다.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#171717",
      }}
    >
      <div
        style={{
          width: 64,
          height: 116,
          borderRadius: 32,
          overflow: "hidden",
          transform: "rotate(-45deg)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, background: "#ffffff" }} />
        <div style={{ flex: 1, background: "#60a5fa" }} />
      </div>
    </div>,
    size,
  );
}
