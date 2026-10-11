# AI 免費學習圖書館 PoC V0.1

全新獨立的繁體中文初學者學習入口；不修改或複製舊有 YouTube 分類圖書館。完整 app 文件見 `artifacts/ai-learning-library/README.md`。

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

第一版只聚焦 AI 基礎入門 > 生成式 AI 入門 > 初學者，提供五項官方資源、免費條件與來源引用、人工示範摘要及繁體中文 PDF。網站不需會員、資料庫、付款或 B2B；不呼叫共享 API。保留其他原有服務，不做資料庫設定。

## User preferences

本次只提供開發預覽，不發布正式網站。摘要不能假稱已讀影片全文；不抓 YouTube 逐字稿、不重製受保護教材。人工示範與真正已取得文本的 AI 摘要必須分開標示。

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
