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
              className="h-14 w-14 shrink-0 object-contain"
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
          <div className="mt-8 flex flex-col items-center gap-3 border-t pt-6 sm:flex-row sm:justify-between">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">Life River 母品牌</p>
            <picture data-testid="logo-liferiver">
              <source
                media="(max-width: 640px)"
                srcSet="/images/LifeRiver-v-final.png"
              />
              <img
                src="/images/LifeRiver-h-final.png"
                alt="Life River 母品牌標誌"
                className="h-24 w-24 max-w-full object-contain sm:h-14 sm:w-72 md:w-80"
                data-testid="logo-liferiver-image"
              />
            </picture>
          </div>
        </div>
      </footer>
    </div>
  );
}
