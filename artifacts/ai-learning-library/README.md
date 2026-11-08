# AI 免費學習圖書館 — PoC V0.1

全新、獨立的繁體中文 AI 學習入口。本專案不修改、不複製舊有 YouTube 分類圖書館，亦不連接 YouTube。

## 功能與範圍

- 選單：**AI 基礎入門 → 生成式 AI 入門 → 初學者**。
- 五筆人工策展的官方免費資源；來源篩選、搜尋、詳細說明、語言與時數。
- 所有摘要均為 **人工撰寫・示範摘要**，提供逐點引用、官方來源及短引文。
- 真正下載 PDF，不是以列印視窗代替；內嵌 Noto 繁體中文字型。
- 手機版、尚未選擇／搜尋無結果／找不到課程等空狀態；PDF 載入失敗可重試。
- 不需本網站會員、資料庫、付款、AI API key 或 API 伺服器。
- 只建立開發預覽；未發布正式網站。

## 摘要透明度

`summary.mode = "demo"`。公開課程介紹與目錄於 **2026-10-11** 核對；未登入取得限制教材，也未閱讀影片全文。摘要是人工導讀，練習與詞彙解釋為策展者原創補充，不是官方教材重製或官方作業。

本版**未啟用 AI 文本摘要**。未來若加入此模式，必須先合法取得文本，記錄 URL、取得日期、範圍與授權／使用依据，再由模型處理並附逐點引用。僅取得課程介紹時，應標記「僅依公開介紹」，不得宣稱讀過完整教材或影片。不任意取得 YouTube 逐字稿。

## 已核對的資源

| 來源 | 官方入口 | 學習時間 | 免費與限制 |
| --- | --- | --- | --- |
| Google Cloud | https://www.skills.google/course_templates/536 | 45 分鐘（官方） | 入門訓練列為 no-cost；學習可能需 Google Skills 帳號；雲端服務不保證免費 |
| Microsoft Learn | https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/ | 37 分鐘（官方） | 訓練免費；閱讀不需個人檔案，記錄成就需登入 |
| OpenAI Academy | https://academy.openai.com/public/courses/ai-foundations-juzjs | 約 70 分鐘（官方） | 課程免費；開始課程與保存進度需 ChatGPT 帳號 |
| IBM SkillsBuild | https://skills.yourlearning.ibm.com/activity/ALM-COURSE_3955079 | 1–3 小時（公開目錄） | SkillsBuild 免費；官方課程平台通常需免費帳號；未登入驗證課程全文 |
| Microsoft | https://github.com/microsoft/generative-ai-for-beginners | 首課建議 30–60 分鐘（策展者估計） | 公開教材免費；API 實作可能付費，閱讀不需帳號 |

詳細免費依據與短引文位於 `src/data/resources.ts` 及各課程頁。Google 旧 Cloud Skills Boost URL 目前轉至 Google Skills；Microsoft Learn 模組目前正式標題為 **Introduction to generative AI and agents**。IBM 選取獨立 **Foundations in Generative AI**，不是整條 3–10 小時的 Getting Started 路徑。免費、語言與課程內容可能更動，出站學習前應再次查看官方規則。

## 本機開發

需求：Node.js 24、pnpm 10。從儲存庫根目錄：

```sh
pnpm install --frozen-lockfile
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/ai-learning-library run dev
```

瀏覽 `http://localhost:5173`。Replit 開發預覽使用既有 `artifacts/ai-learning-library: web` 執行流程，無須手動設定環境變數。首頁、課程詳細頁和說明頁皆不呼叫共享 API。

### 頁首回歸測試

```sh
pnpm --filter @workspace/ai-learning-library run test:ui
```

測試會自動啟動開發伺服器，檢查 LifeOne 三個外連、可及名稱與安全新分頁屬性、鍵盤焦點提示，以及 320–1440px 寬度下頁首是否溢位或重疊。Replit 會自動使用預裝 Chromium；其他環境首次執行前可安裝瀏覽器：`pnpm --filter @workspace/ai-learning-library exec playwright install chromium`。

## 建置與未來部署

```sh
pnpm --filter @workspace/ai-learning-library run typecheck
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/ai-learning-library run build
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/ai-learning-library run serve
```

產出於 `artifacts/ai-learning-library/dist/public/`。將該目錄交給任一靜態網站主機即可，不需後端或資料庫；**本次不執行發布**。主機需 SPA fallback：`/resource/*`、`/about` 路由回傳 `index.html`，但 `/fonts/*` 應提供實際靜態檔，不能回傳 HTML。若部署在子路徑，建置及預覽的 `BASE_PATH` 均須設為 `/你的路徑/`。預覽保留 `noindex,nofollow`，未來公開前再依需求調整。所有字型資產與授權要隨靜態輸出部署。

## 資料與目錄

- `src/data/resources.ts`：五項資料與 TypeScript 資料結構，無資料庫。
- `src/lib/pdf.ts`：PDF 生成與瀏覽器下載。
- `src/pages/`：首頁、課程頁與使用說明。
- `src/lib/path-state.ts`：導覽暫存（瀏覽器 sessionStorage），不是學習紀錄系統。
- `public/fonts/`：PDF 用 TC 子集字型與 SIL OFL 授權。
- `scripts/subset-font.py`：內容變更時重新建立 PDF 字型子集。
- `docs/data-structure.md`：欄位、引用與擴充規則。

### PDF 字型維護

字型採 Noto Sans TC（SIL Open Font License），固定為 Regular 400，來源：
https://github.com/google/fonts/blob/main/ofl/notosanstc/NotoSansTC%5Bwght%5D.ttf

完整字型不存入此專案。已提交的小型子集包含現有五筆筆記及 PDF 模板的字元，執行時直接內嵌此子集。新增資源或修改筆記後，先下載完整官方字型至暫存目錄，再執行：

```sh
# 在已安裝 fonttools 的 Python 環境中，從 app 目錄執行
python3 scripts/subset-font.py /tmp/NotoSansTC.ttf
```

FontTools 只用於重新製作字型，不是網站執行需求。網站文字可使用 CSS 字型 fallback；PDF 字型為本地靜態資產，不依賴 Google Fonts 網路請求。

## 遷移 GitHub

可保留整個 pnpm 儲存庫並提交 lockfile，或單獨匯出此 app 並將 catalog 依賴改成目前 lockfile 的實際版本、移除未使用的 workspace API 依賴及 tsconfig references。不要提交 secrets、node_modules 或 dist。沒有外部憑證可遷移。保留字型授權及來源核對資料；勿將外部教材完整匯入儲存庫。
