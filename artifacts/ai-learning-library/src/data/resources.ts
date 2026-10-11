export interface Source {
  id: string;
  title: string;
  url: string;
  excerpt: string;
}

export interface Resource {
  id: string;
  title: string;
  subtitle: string;
  provider: string;
  url: string;
  description: string;
  language: string;
  duration: string;
  durationNote: string;
  format: string;
  tags: string[];
  freeCondition: string;
  accountNote: string;
  verifiedAt: string;
  verificationNote: string;
  sources: Source[];
  summary: {
    mode: 'demo';
    overview: string;
    points: { title: string; text: string; citationIds: string[] }[];
    terms: { term: string; definition: string }[];
    practice: string[];
    reflection: string[];
  };
}

export const DISCLAIMER = '人工撰寫・示範摘要。依據已取得的官方公開課程介紹整理，並附策展者原創練習；不是 AI 即時生成，也不是完整教材或影片全文摘要。本版未啟用 AI 文本摘要，未取得或讀取影片逐字稿。';
const verifiedAt = '2026-10-11';
const verificationNote = '已核對官方公開頁面與免費說明；未登入試讀受帳號限制的教材。網址、時數及免費條件可能變更，請以官方最新頁面為準。';

export const resources: Resource[] = [
  {
    id: 'google-generative-ai',
    title: 'Introduction to Generative AI',
    subtitle: '生成式 AI 入門',
    provider: 'Google Cloud',
    url: 'https://www.skills.google/course_templates/536',
    description: '從 AI 與機器學習的關係開始，認識生成式 AI、模型類型與 Google 開發工具。',
    language: '英文／可選繁體中文介面',
    duration: '45 分鐘',
    durationNote: '官方課程頁標示；字幕與教材翻譯以官方選單為準。',
    format: '影片・閱讀・測驗',
    tags: ['AI 基礎', '生成式 AI', '零程式門檻'],
    freeCondition: '官方將此入門課列為 no-cost 訓練；不代表所有 Google Skills 課程、實驗室或雲端服務免費。',
    accountNote: '進入學習與記錄完成狀態可能需要 Google Skills 帳號。',
    verifiedAt, verificationNote,
    sources: [
      { id: 'G1', title: '官方課程介紹與時數', url: 'https://www.skills.google/course_templates/536', excerpt: 'This is an introductory level microlearning course aimed at explaining what Generative AI is, how it is used, and how it differs from traditional machine learning methods.' },
      { id: 'G2', title: 'Google Cloud 免費訓練公告', url: 'https://cloud.google.com/blog/topics/training-certifications/new-google-cloud-generative-ai-training-resources', excerpt: 'Seven new no-cost generative AI training courses to advance your cloud career' },
    ],
    summary: {
      mode: 'demo',
      overview: '這門微型課程適合先建立生成式 AI 的基本地圖，再決定是否繼續學習工具與開發。以下只概括官方課程介紹的範圍。',
      points: [
        { title: '先理解生成式 AI 是什麼', text: '課程以生成式 AI 的定義與用途為起點，並比較它與傳統機器學習方法的不同。', citationIds: ['G1'] },
        { title: '了解它在 AI 領域的位置', text: '公開目錄包含 AI／ML 的關係、監督與非監督學習，以及生成式 AI 與深度學習的關係。目錄不等於影片全文。', citationIds: ['G1'] },
        { title: '從概念走向工具', text: '官方介紹涵蓋協助開發生成式 AI 應用的 Google 工具；入門訓練免費不代表雲端運算使用免費。', citationIds: ['G1', 'G2'] },
      ],
      terms: [
        { term: '生成式 AI', definition: '策展者補充：根據學到的模式產生文字、圖像等內容的 AI 類型。' },
        { term: '機器學習', definition: '策展者補充：讓模型從資料中學習規律，而非為每個情境手寫規則。' },
      ],
      practice: ['原創練習：列出一個「分類資料」與一個「產生新內容」的日常任務，思考兩者差別。'],
      reflection: ['你想用生成式 AI 協助哪一個小任務？結果應如何由人確認？'],
    },
  },
  {
    id: 'microsoft-learn-generative-ai',
    title: 'Introduction to generative AI and agents',
    subtitle: '生成式 AI 與代理入門',
    provider: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/',
    description: '以七個單元認識大型語言模型、提示與 AI 代理；建議先具備基本 AI 與機器學習概念。',
    language: '英文／Microsoft Learn 多語介面',
    duration: '37 分鐘',
    durationNote: '官方標示 7 個單元、37 分鐘；語言版本可能回退英文。',
    format: '閱讀・練習・測驗',
    tags: ['大型語言模型', '提示', 'AI 代理'],
    freeCondition: 'Microsoft Learn 官方 FAQ 說明訓練免費。外部實作工具、雲端用量與認證考試不在此免費承諾內。',
    accountNote: '閱讀不需 Microsoft Learn 個人檔案；記錄成就或評量結果需要登入。',
    verifiedAt, verificationNote,
    sources: [
      { id: 'M1', title: '官方模組介紹與先備知識', url: 'https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/', excerpt: "In this module, you'll explore the fundamentals of generative AI, including large language models (LLMs), prompts, and AI agents." },
      { id: 'M2', title: 'Microsoft Learn 免費與帳號 FAQ', url: 'https://learn.microsoft.com/en-us/training/support/faq#how-much-does-the-training-cost', excerpt: 'Microsoft Learn training is free and available to anyone who has an interest to learn about Microsoft products.' },
    ],
    summary: {
      mode: 'demo',
      overview: '官方已將原生成式 AI 入門模組更新為涵蓋代理的版本。先讀核心概念，再用提示練習理解模型的互動方式。',
      points: [
        { title: '認識大型語言模型', text: '官方學習目標包含說明 LLM 的運作方式；本筆記不宣稱涵蓋該單元完整內容。', citationIds: ['M1'] },
        { title: '學習有效提示', text: '模組將建立有效提示列為學習目標，可作為後續練習的方向。', citationIds: ['M1'] },
        { title: '理解代理的基本概念', text: '更新後的課程加入 AI 代理與代理式解決方案；官方也建議先熟悉 AI 術語及機器學習原理。', citationIds: ['M1'] },
      ],
      terms: [
        { term: 'LLM', definition: '策展者補充：大型語言模型，能處理與產生自然語言的模型。' },
        { term: '提示', definition: '策展者補充：提供給模型的任務、背景資訊與輸出要求。' },
      ],
      practice: ['原創練習：把「幫我解釋 AI」改寫成包含讀者程度、目的與字數限制的指令。'],
      reflection: ['沒有背景資訊的提示，可能得到什麼不符合期待的結果？'],
    },
  },
  {
    id: 'openai-foundations',
    title: 'AI Foundations',
    subtitle: '把 AI 基礎用在日常工作',
    provider: 'OpenAI Academy',
    url: 'https://academy.openai.com/public/courses/ai-foundations-juzjs',
    description: '不需技術背景，從真實任務練習清楚指示、提供情境、審查輸出與負責任使用。',
    language: '英文',
    duration: '約 70 分鐘',
    durationNote: '課程頁約 70 分鐘；官方 FAQ 範圍 60–75 分鐘。',
    format: '自學課程・實作',
    tags: ['ChatGPT', '日常應用', '負責任使用'],
    freeCondition: 'OpenAI 官方說明 Academy 課程免費，不需工作區會員資格。ChatGPT 付費方案或 API 用量不包含在免費課程內。',
    accountNote: '瀏覽介紹不需登入；開始課程與保存進度需要 ChatGPT 帳號。',
    verifiedAt, verificationNote,
    sources: [
      { id: 'O1', title: 'AI Foundations 官方課程介紹', url: 'https://academy.openai.com/public/courses/ai-foundations-juzjs', excerpt: "You'll choose a real task you perform regularly and build core habits for giving clear instructions, providing context, reviewing outputs, and using AI responsibly." },
      { id: 'O2', title: 'OpenAI Academy 課程免費與登入說明', url: 'https://help.openai.com/en/articles/20001270', excerpt: 'Courses are free and do not require a workspace membership.' },
    ],
    summary: {
      mode: 'demo',
      overview: '這門課把 AI 基礎與真實工作任務連在一起，重點是培養提示、情境與審查習慣；摘要僅依公開介紹撰寫。',
      points: [
        { title: '從一個真實任務開始', text: '官方建議選擇經常執行的工作任務，透過實作學習 AI、LLM 與 ChatGPT 的基礎。', citationIds: ['O1'] },
        { title: '指示與情境同樣重要', text: '課程公開介紹將清楚指示、提供背景資訊和審查輸出列為核心習慣。', citationIds: ['O1'] },
        { title: '保留人的責任', text: '負責任使用是課程目標之一。免費課程可個人參與，但開課與記錄進度需要 ChatGPT 帳號。', citationIds: ['O1', 'O2'] },
      ],
      terms: [
        { term: '情境', definition: '策展者補充：讓 AI 理解任務的相關背景、讀者與限制。' },
        { term: '輸出審查', definition: '策展者補充：由人檢查結果是否正確、合適且符合要求。' },
      ],
      practice: ['原創練習：選一個不含個資的日常任務，寫出目的、背景、輸出格式與需要人工核對的項目。'],
      reflection: ['哪些資訊不能直接交給外部 AI 工具？'],
    },
  },
  {
    id: 'ibm-generative-ai',
    title: 'Foundations in Generative AI',
    subtitle: '生成式 AI 基礎',
    provider: 'IBM SkillsBuild',
    url: 'https://skills.yourlearning.ibm.com/activity/ALM-COURSE_3955079',
    description: '認識機器如何產生文字、圖像與其他內容，建立生成式 AI 的基礎詞彙。',
    language: '英文；其他語言依官方登入後清單',
    duration: '1–3 小時',
    durationNote: '官方公開目錄標示；不是完整 Getting Started 路徑的 3–10 小時。',
    format: '自學課程',
    tags: ['AI 詞彙', '文字與圖像', '基礎概念'],
    freeCondition: 'IBM SkillsBuild 首頁明確標示 100% free learning。此項僅指 SkillsBuild 學習，不承諾其他 IBM 商業服務免費。',
    accountNote: '課程活動在 IBM Your Learning 平台；開始學習通常需免費 SkillsBuild 帳號，登入後可用性依官方規則。',
    verifiedAt, verificationNote,
    sources: [
      { id: 'I1', title: 'IBM SkillsBuild 官方免費說明與課程目錄', url: 'https://skillsbuild.org/', excerpt: 'IBM SkillsBuild offers 100% free learning from a global leader in technology and innovation.' },
      { id: 'I2', title: '官方目錄：Foundations in Generative AI', url: 'https://skillsbuild.org/?topic=ai', excerpt: "In this course, you’ll learn the foundational concepts of generative artificial intelligence, with a focus on how machines create text, images, and other content." },
    ],
    summary: {
      mode: 'demo',
      overview: '選用官方目錄中的獨立 Foundations 課程，讓初學者先認識內容生成與基本詞彙，不將較長的路徑時數混為單課時數。',
      points: [
        { title: '理解內容如何生成', text: '公開課程說明聚焦機器產生文字、圖像與其他內容的基本概念。', citationIds: ['I2'] },
        { title: '建立可使用的詞彙', text: '官方說明以範例與解釋建立基礎詞彙，以及生成式 AI 系統的基本理解。', citationIds: ['I2'] },
        { title: '先確認平台條件', text: 'SkillsBuild 學習免費；本次核對的是公開目錄，未讀取帳號內的完整課程。', citationIds: ['I1', 'I2'] },
      ],
      terms: [
        { term: '內容生成', definition: '策展者補充：產生新的文字、圖像或其他內容，而非只檢索既有答案。' },
        { term: '模型', definition: '策展者補充：從資料中學到規律，並用於預測或生成的計算系統。' },
      ],
      practice: ['原創練習：整理三個你想學會的 AI 詞彙，用自己的話各寫一句解釋，再找官方資料核對。'],
      reflection: ['產生看似合理的內容，是否就代表內容真實？'],
    },
  },
  {
    id: 'microsoft-beginners',
    title: 'Generative AI for Beginners',
    subtitle: 'Microsoft 開源生成式 AI 課程',
    provider: 'Microsoft',
    url: 'https://github.com/microsoft/generative-ai-for-beginners',
    description: '21 課開源教材；初學者先從概念課開始，提供繁體中文翻譯，程式實作可留待後續。',
    language: '英文／繁體中文翻譯',
    duration: '建議先讀 30–60 分鐘',
    durationNote: '策展者估計首課閱讀時間；官方未標示全課總時數。全套為 21 課。',
    format: '開源文字教材・程式範例',
    tags: ['開源教材', '繁體中文', '延伸學習'],
    freeCondition: '公開 GitHub 教材可免費閱讀。執行 Azure／OpenAI 等 API 範例可能需帳號並產生費用；不保證實作免費。',
    accountNote: '閱讀公開教材不需 GitHub 帳號；fork 或使用外部模型服務可能需要帳號。',
    verifiedAt, verificationNote,
    sources: [
      { id: 'B1', title: 'Microsoft 官方儲存庫 README', url: 'https://github.com/microsoft/generative-ai-for-beginners#readme', excerpt: 'Learn the fundamentals of building Generative AI applications with our 21-lesson comprehensive course by Microsoft Cloud Advocates.' },
      { id: 'B2', title: '官方繁體中文翻譯', url: 'https://github.com/microsoft/generative-ai-for-beginners/blob/main/translations/zh-TW/README.md', excerpt: 'Chinese (Traditional, Taiwan)' },
    ],
    summary: {
      mode: 'demo',
      overview: '這是一套從概念到開發的開源課程。V0.1 將它作為延伸入口，不要求初學者立即執行程式或購買 API。',
      points: [
        { title: '按主題選課', text: 'README 說明全課 21 課，每課有自己的主題；可先選概念課，而不是一次讀完。', citationIds: ['B1'] },
        { title: '區分 Learn 與 Build', text: '官方將解釋概念的 Learn 與包含 Python／TypeScript 範例的 Build 課程分開，幫助選擇合適入口。', citationIds: ['B1'] },
        { title: '免費教材不等於免費 API', text: '儲存庫提供多種模型服務實作選項。先閱讀不需購買服務；實作前應查看各服務的計費條件。', citationIds: ['B1'] },
      ],
      terms: [
        { term: '開源教材', definition: '策展者補充：在公開儲存庫提供，使用或再散布仍須遵守授權。' },
        { term: 'API', definition: '策展者補充：讓程式呼叫另一個服務的介面；免費閱讀不代表呼叫免費。' },
      ],
      practice: ['原創練習：瀏覽目錄，選一堂 Learn 課，寫下你要回答的問題；先不要配置任何付費服務。'],
      reflection: ['你目前需要的是理解 AI，還是開發 AI 應用？兩者的學習起點有何不同？'],
    },
  },
];
