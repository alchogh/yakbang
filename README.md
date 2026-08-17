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
| PostgreSQL   | 18      | 로컬은 `docker-compose.yml` 로 띄웁니다        |
| Drizzle ORM  | 0.45.2  | 드라이버는 `postgres` (postgres.js)            |
| drizzle-kit  | 0.31.10 | 마이그레이션 생성·적용                         |

## 요구 사항

- **Node.js** `>=20.9.0` (Next.js 16 요구 사항)
- **pnpm** — `npm`/`yarn` 을 쓰지 않습니다. 잠금 파일은 `pnpm-lock.yaml` 하나뿐입니다.
- **Docker** — 로컬 PostgreSQL 을 띄우는 데 씁니다.

```bash
corepack enable   # pnpm 버전을 packageManager 필드에 맞춰 고정
```

## 시작하기

```bash
pnpm install
cp .env.example .env.local   # DATABASE_URL. 로컬 기본값 그대로 쓰면 됩니다
docker compose up -d         # PostgreSQL
pnpm db:migrate              # 스키마 적용
pnpm dev
```

<http://localhost:3000> 접속.

## 데이터베이스

스키마는 [db/schema.ts](db/schema.ts) 하나가 출처입니다. 고친 뒤 `pnpm db:generate` 로 마이그레이션을 만들고 `pnpm db:migrate` 로 적용합니다. `db/migrations/` 는 **커밋합니다** — 생성물이지만 적용 순서가 기록이라서요.

쿼리는 [db/](db/) 안의 함수들에 있고, Server Action 은 그 함수를 부르는 껍데기입니다. 네이티브 앱에서 Server Actions 를 쓸 수 없기 때문인데, 자세한 이유는 [CLAUDE.md](CLAUDE.md) 에 있습니다.

> **로그인이 아직 없습니다.** [lib/session.ts](lib/session.ts) 가 개발용 사용자 ID 하나를 돌려주고, 프로덕션에서는 예외를 던져서 이 상태로는 배포되지 않게 막습니다.

## 스크립트

| 명령                | 설명                                |
| ------------------- | ----------------------------------- |
| `pnpm dev`          | 개발 서버                           |
| `pnpm build`        | 프로덕션 빌드                       |
| `pnpm start`        | 빌드 결과 실행 (`build` 선행 필요)  |
| `pnpm lint`         | ESLint 검사                         |
| `pnpm format`       | Prettier 포맷 적용                  |
| `pnpm format:check` | 포맷 검사만 (CI용)                  |
| `pnpm db:generate`  | 스키마 변경분으로 마이그레이션 생성 |
| `pnpm db:migrate`   | 마이그레이션 적용                   |

> Next.js 16에서 `next lint` 는 제거됐습니다. `lint` 스크립트는 `eslint` 를 직접 호출합니다.

## 프로젝트 구조

```
app/              App Router 진입점
  layout.tsx      루트 레이아웃
  globals.css     Tailwind 진입점, 색 토큰의 출처
  manifest.ts     PWA 매니페스트
  icon.svg        브라우저 아이콘
  apple-icon.tsx  iOS 홈 화면 아이콘 (PNG 생성)
  (tabs)/         하단 탭을 쓰는 화면들
    layout.tsx    탭 껍데기
    page.tsx      기록 (/)
    _components/  이 탭들에서만 쓰는 화면 조각
    _types.ts     기록 항목의 타입과 종류 목록
    _actions.ts   Server Action (db/ 함수를 부르는 껍데기)
    feed/         커뮤니티 (/feed)
    me/           나 (/me)
db/               데이터 접근 — Next에 기대지 않게 app/ 밖에 둡니다
  schema.ts       테이블 정의, 스키마의 출처
  client.ts       DB 연결
  medicines.ts    기록 조회·저장 쿼리
  migrations/     drizzle-kit 생성물, 커밋합니다
lib/session.ts    "지금 누구인가" (로그인 붙기 전 임시 사용자)
public/           정적 파일
docker-compose.yml 로컬 PostgreSQL
drizzle.config.ts drizzle-kit 설정
.env.example      DATABASE_URL 견본, .env.local 로 복사해 씁니다
eslint.config.mjs ESLint flat config
.prettierrc.json  Prettier 설정
CLAUDE.md         AI 에이전트 작업 규칙
DESIGN.md         화면이 왜 그렇게 생겼는지
```

`_` 로 시작하는 폴더는 라우트가 되지 않습니다. 컴포넌트를 어느 폴더에 둘지는 [CLAUDE.md](CLAUDE.md) 의 규칙을 따릅니다 — 개별 파일은 여기 적지 않습니다. 늘고 줄 때마다 이 문단이 먼저 낡습니다.

## 코드 스타일

- **ESLint** — [eslint.config.mjs](eslint.config.mjs). `eslint-config-next` 의 `core-web-vitals` + `typescript` 프리셋.
- **Prettier** — [.prettierrc.json](.prettierrc.json). 서식 옵션은 **전부 기본값**입니다. 필요해지기 전에는 늘리지 않습니다.
- **Tailwind 클래스 정렬** — `prettier-plugin-tailwindcss` 가 `className` 을 권장 순서로 자동 재배열합니다. Tailwind v4라 `tailwindStylesheet` 로 CSS 진입점을 지정합니다 (`tailwindConfig` 는 v4에서 deprecated).
- **충돌 방지** — `eslint-config-prettier` 를 ESLint 설정 **마지막**에 두어 서식 관련 규칙을 끕니다. 새 config를 추가할 때 이 순서를 유지하세요.

## AI 에이전트

작업 규칙은 [CLAUDE.md](CLAUDE.md) 에 있습니다. 프로젝트 설명(이 파일)과 역할이 다릅니다 — CLAUDE.md 는 매 턴 컨텍스트에 주입되므로 **규칙만** 넣고, 설명은 여기에 씁니다.
