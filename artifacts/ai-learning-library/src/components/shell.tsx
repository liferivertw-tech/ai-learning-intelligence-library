import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";

export function Shell({ children }: { children: ReactNode }) {
  const [loc] = useLocation();
  const nav = [{ href: "/", label: "選課" }, { href: "/about", label: "來源與使用說明" }];
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-3 md:py-0 md:min-h-16 flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
          <Link href="/" aria-label="LifeLibrary 首頁" className="flex items-center gap-3 min-w-0" data-testid="link-home">
            <img
              src="/images/LifeLibrary.png"
              alt="LifeLibrary 標誌"
              className="h-16 w-16 shrink-0 object-contain md:h-20 md:w-20 xl:h-24 xl:w-24"
              data-testid="logo-lifelibrary"
            />
            <span className="min-w-0">
              <span className="block font-display font-bold text-[15px] sm:text-lg leading-tight truncate">AI 免費學習圖書館</span>
              <span className="block font-mono text-[10px] tracking-widest text-muted-foreground">PoC V0.1 · 獨立示範</span>
            </span>
          </Link>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between md:ml-auto md:gap-4">
            <nav aria-label="主要導覽" className="flex gap-1">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} data-testid={`link-nav-${n.href === "/" ? "home" : "about"}`}
                  className={`px-3 py-2 rounded text-sm transition-colors ${loc === n.href ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <div aria-label="LifeOne 會員入口" className="flex items-center justify-end gap-2 border-t pt-2 sm:border-0 sm:pt-0">
              <a
                href="https://lifeone.liferiver.com.tw/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LifeOne 官方首頁（在新分頁開啟）"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <img src="/images/lifeone-logo.png" alt="LifeOne 官方標誌" className="h-9 w-9 object-contain" />
              </a>
              <a
                href="https://lifeone.liferiver.com.tw/sign-in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="登入 LifeOne 會員（在新分頁開啟）"
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-blue-700 px-3 text-sm font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                登入
              </a>
              <a
                href="https://lifeone.liferiver.com.tw/register"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="註冊 LifeOne 會員（在新分頁開啟）"
                className="inline-flex min-h-10 items-center justify-center rounded-full bg-blue-700 px-3 text-sm font-medium text-white transition-colors hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                註冊
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t mt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <div className="grid gap-4 text-xs leading-relaxed text-muted-foreground sm:grid-cols-2">
            <p>本站為獨立概念驗證，與 Google、Microsoft、OpenAI、IBM 無任何隸屬或合作關係。課程內容版權屬原提供者。</p>
            <p className="sm:text-right">本站不需登入、不收集資料。外部官方網站可能要求註冊帳號。</p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 border-t pt-6">
            <a
              href="https://liferiver.com.tw/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Life River 官方網站：企業標語，供應生命，享受生活，結出健康美果。；品牌格言，日日有供應，月月結新果，年年都歡樂。；出處，《啟示錄》22:1–2（在新分頁開啟）"
              className="group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 'clamp(16px, 3vw, 32px)', width: '100%', maxWidth: 760, margin: '0 auto', textAlign: 'left' }}
              data-testid="link-liferiver"
            >
                <img
                  src="/images/life-river-vertical-final.png"
                  alt="LIFE RIVER 官方直立式 Logo"
                  width="1230"
                  height="1279"
                  style={{ display: 'block', width: 'clamp(88px, 16vw, 144px)', maxWidth: 144, height: 'auto', flexShrink: 0, objectFit: 'contain', borderRadius: 6 }}
                  data-testid="logo-liferiver-image"
                />
                <span style={{ display: 'grid', gap: 8, minWidth: 0, textAlign: 'left', lineHeight: 1.7 }}>
                  <span className="text-foreground" style={{ fontSize: 'clamp(13px, 1.8vw, 18px)', fontWeight: 600 }}>
                    供應生命，享受生活，結出健康美果。
                  </span>
                  <span className="text-muted-foreground" style={{ fontSize: 'clamp(12px, 1.5vw, 15px)' }}>
                    日日有供應，月月結新果，年年都歡樂。
                  </span>
                  <span className="text-muted-foreground" style={{ fontSize: 'clamp(11px, 1.3vw, 13px)' }}>
                    ——《啟示錄》22:1–2
                  </span>
                </span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
