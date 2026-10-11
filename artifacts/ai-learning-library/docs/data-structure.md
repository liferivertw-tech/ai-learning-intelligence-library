# 資料結構與策展規則

資料來源為 `src/data/resources.ts`，以 `Resource[]` 存放，不需要資料庫。

| 欄位 | 型別 | 意義 |
| --- | --- | --- |
| id | string | 穩定識別碼，供詳細頁及 PDF 檔名使用 |
| title / subtitle | string | 官方名稱／繁體中文導讀名稱 |
| provider / url | string | 官方組織／官方學習入口 |
| description | string | 策展者原創簡介 |
| language | string | 已知語言與翻譯限制，不推定字幕存在 |
| duration / durationNote | string | 時間與依據，清楚區分官方時數與策展者估計 |
| format / tags | string / string[] | 形式與主題 |
| freeCondition / accountNote | string | 免费適用範圍與外部平台登入需求 |
| verifiedAt | YYYY-MM-DD | 人工核對日期，不是即時監控 |
| verificationNote | string | 核對限制與變更提醒 |
| sources | Source[] | 可追溯 URL 與少量公開短引文 |
| summary.mode | "demo" | 本版只允許人工示範，沒有 AI 呼叫 |
| summary.overview | string | 人工導讀 |
| summary.points | Point[] | title、text、citationIds，逐點引用來源 ID |
| summary.terms | array | term、definition；原創補充須明確標記 |
| summary.practice / reflection | string[] | 策展者原創练習與反思，不冒充官方作業 |

`Source` 包含 `id`、`title`、`url`、`excerpt`。`citationIds` 必須指向同一 Resource 的來源 ID。全文、受保護教材、影片逐字稿及登入後內容不存放在此檔案。

## 新增資料的檢查

1. 核對官方 URL、是否重新導向及名稱是否更新。
2. 核對免费範圍、需否登入、實作計費與語言，未確認時明示限制。
3. 只保存自己撰寫的簡介／摘要與必要短引文。
4. 逐點確認引用與公開介紹一致；推論、詞彙與練習明確標為策展補充。
5. 更新查核日期與 PDF 字型子集（請見 README），避免新增字元缺字。

## 未來真正的 AI 文本摘要

不可只改 `mode` 字串就宣稱 AI 已閱讀內容。需要獨立的摘要結果型別，至少包含實際處理的文本範圍、source URL、取得時間、授權依据、引用段落／位置、模型與生成時間、錯誤狀態。公開介紹與完整教材應分開標記。模型未呼叫成功或沒有文本時，不得悄悄退回示範卻保留「AI 生成」標籤。
