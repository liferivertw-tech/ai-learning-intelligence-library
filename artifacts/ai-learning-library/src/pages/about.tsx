import { Link } from "wouter";
import { DISCLAIMER } from "@/data/resources";

const items = [
  ["這是什麼", "一個獨立的概念驗證（PoC V0.1），幫中文初學者在眾多免費 AI 課程中，先找到值得信任的官方起點。與任何課程提供者皆無隸屬關係。"],
  ["資料從哪裡來", "每門課的資訊皆來自官方網站公開頁面，並標示查證日期。免費條件與帳號需求可能隨時變動，請以官方網站為準。"],
  ["版權與逐字稿", "我們不下載、不轉錄、不儲存任何課程影片或逐字稿。摘要只依據公開的課程說明撰寫，並附上短摘錄與原始網址。"],
  ["現在的摘要是什麼", "「標準版重點摘要」皆為人工撰寫的示範內容（人工撰寫・示範摘要）。本版未啟用 AI 文本摘要。"],
  ["未來的文本生成摘要", "要提供真正的 AI 文本摘要，必須先實際取得經授權的完整文本，再由 AI 生成，並為每一個重點附上可查證的引用。在達成這些條件前，我們不會把示範內容標為 AI 生成。"],
  ["帳號與隱私", "本站不需要註冊或登入，也不收集個人資料、不收費。但點擊前往的外部官方網站，可能需要你建立該平台的帳號。"],
];

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <p className="font-mono text-xs tracking-[.25em] text-accent">ABOUT · 來源與使用說明</p>
      <h1 className="font-display font-black text-4xl sm:text-5xl mt-3 leading-tight">誠實地標示，<br />每一份內容從何而來。</h1>
      <dl className="mt-12 divide-y border-y">
        {items.map(([t, d], i) => (
          <div key={t} className="rise grid sm:grid-cols-[200px_1fr] gap-2 sm:gap-8 py-6" style={{ animationDelay: `${i * 60}ms` }}>
            <dt className="font-display font-bold">{t}</dt><dd className="text-muted-foreground leading-relaxed">{d}</dd>
          </div>
        ))}
      </dl>
      <p className="text-xs text-muted-foreground mt-6">{DISCLAIMER}</p>
      <Link href="/" className="mt-8 inline-flex h-11 px-5 items-center rounded-md bg-primary text-primary-foreground" data-testid="link-start">開始選課</Link>
    </div>
  );
}
