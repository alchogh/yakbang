# 약방 (yakbang)

복용 중인 비타민·영양제·약을 기록하고, 같이 먹어도 되는지 묻거나 추천을 주고받는 서비스입니다.

- **기록** — 지금 무엇을 먹고 있는지 정보와 함께 한곳에 모아둡니다. 비공개가 기본입니다.
- **커뮤니티** — 피드·스레드 형태. 조합에 대한 질문, 영양제 추천 요청과 공유가 오갑니다.

> 사용자의 건강 정보를 다룹니다. 관련 취급 규칙은 [CLAUDE.md](CLAUDE.md) 를 참고하세요.

## 기술 스택

| 항목         | 버전    | 비고                                           |
| ------------ | ------- | ---------------------------------------------- |
| Next.js      | 16.3.0  | App Router                                     |
| React        | 19.2.8  |                                                |
| TypeScript   | 5.9.3   |                                                |
| Tailwind CSS | 4.3.3   | PostCSS 플러그인 방식 (`@tailwindcss/postcss`) |
| ESLint       | 9.39.5  | flat config                                    |
| Prettier     | 3.9.6   | Tailwind 클래스 자동 정렬 플러그인 포함        |
| pnpm         | 10.13.1 | `packageManager` 필드로 고정                   |

## 요구 사항

- **Node.js** `>=20.9.0` (Next.js 16 요구 사항)
- **pnpm** — `npm`/`yarn` 을 쓰지 않습니다. 잠금 파일은 `pnpm-lock.yaml` 하나뿐입니다.

```bash
corepack enable   # pnpm 버전을 packageManager 필드에 맞춰 고정
```

## 시작하기

```bash
pnpm install
pnpm dev
```

<http://localhost:3000> 접속.

## 스크립트

| 명령                | 설명                               |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | 개발 서버                          |
| `pnpm build`        | 프로덕션 빌드                      |
| `pnpm start`        | 빌드 결과 실행 (`build` 선행 필요) |
| `pnpm lint`         | ESLint 검사                        |
| `pnpm format`       | Prettier 포맷 적용                 |
| `pnpm format:check` | 포맷 검사만 (CI용)                 |

> Next.js 16에서 `next lint` 는 제거됐습니다. `lint` 스크립트는 `eslint` 를 직접 호출합니다.

## 프로젝트 구조

```
app/              App Router 진입점
  layout.tsx      루트 레이아웃
  page.tsx        홈
  globals.css     Tailwind 진입점
public/           정적 파일
eslint.config.mjs ESLint flat config
.prettierrc.json  Prettier 설정
CLAUDE.md         AI 에이전트 작업 규칙
```

## 코드 스타일

- **ESLint** — [eslint.config.mjs](eslint.config.mjs). `eslint-config-next` 의 `core-web-vitals` + `typescript` 프리셋.
- **Prettier** — [.prettierrc.json](.prettierrc.json). 서식 옵션은 **전부 기본값**입니다. 필요해지기 전에는 늘리지 않습니다.
- **Tailwind 클래스 정렬** — `prettier-plugin-tailwindcss` 가 `className` 을 권장 순서로 자동 재배열합니다. Tailwind v4라 `tailwindStylesheet` 로 CSS 진입점을 지정합니다 (`tailwindConfig` 는 v4에서 deprecated).
- **충돌 방지** — `eslint-config-prettier` 를 ESLint 설정 **마지막**에 두어 서식 관련 규칙을 끕니다. 새 config를 추가할 때 이 순서를 유지하세요.

## AI 에이전트

작업 규칙은 [CLAUDE.md](CLAUDE.md) 에 있습니다. 프로젝트 설명(이 파일)과 역할이 다릅니다 — CLAUDE.md 는 매 턴 컨텍스트에 주입되므로 **규칙만** 넣고, 설명은 여기에 씁니다.
