# 작업 원칙

이 파일은 **지식이 아니라 습관**을 적는 곳이다.
폴더 구조, 네이밍 규칙, 기술 스택처럼 코드를 열어보면 알 수 있는 것은 여기 없다. 직접 읽어서 파악할 것.

아래는 전부 "할 줄 알면서도 안 하는 일"이다.

## 지킬 것

- **낡은 코드는 지운다.** 기존 함수 옆에 새 함수를 하나 더 만들지 말고, 기존 것을 고치거나 지운다. 대체된 코드·주석 처리한 코드·더 이상 안 쓰는 export는 같은 커밋에서 제거한다.

- **지금 필요한 만큼만 만든다.** 요청에 없는 옵션·설정·확장 포인트를 미리 만들지 않는다. 호출부가 하나뿐이면 추상화하지 않는다.

- **만들기 전에 먼저 본다.** 같은 일을 하는 코드가 이미 있는지, 라이브러리가 이미 제공하는지 확인한 뒤 짠다. 없다는 걸 확인했을 때만 새로 만든다.

- **임시방편은 내지 않는다.** "일단 이렇게 하고 나중에 갈아끼우자"는 코드는 제출하지 않는다. 제대로 못 하겠으면 짜지 말고 막힌 지점을 말한다.

## 무엇을 여기 적는가

1. 스스로 알아낼 수 있는 것 → **적지 않는다**
2. 알면서도 안 하는 것 → **반드시 적는다**
3. 팀마다 답이 갈리는 것 → **우리 답을 적는다**

효과가 확인되지 않은 줄은 추가하지 않는다. 중요한 3줄이 묻힌다.

## 우리 답

- 패키지 매니저는 **pnpm**. `npm`/`yarn` 명령을 쓰지 않는다.

- 사용자의 **복용 정보는 건강 정보**다. 로그·에러 리포트·분석 도구·URL 쿼리에 값을 실어 보내지 않는다. 디버깅용 `console.log` 도 마찬가지다.

- **내 기록은 비공개가 기본이다.** 커뮤니티에 올라가는 건 사용자가 직접 고른 것뿐이다. 기록을 피드에 자동 노출하거나, 공개 범위를 기본값으로 열어두지 않는다.

- 조합·추천에 대한 판단은 **사용자끼리 주고받는 콘텐츠**다. 앱이(그리고 내가) 의학적 판단을 지어내 UI 문구·기본값·자동 경고로 넣지 않는다. 그런 기능이 필요해 보이면 만들지 말고 먼저 묻는다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
