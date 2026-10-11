import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";

export function Shell({ children }: { children: ReactNode }) {
  const [loc] = useLocation();
  const nav = [{ href: "/", label: "選課" }, { href: "/about", label: "來源與使用說明" }];
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 min-w-0" data-testid="link-home">
            <span className="seal grid place-items-center w-9 h-9 text-sm font-bold shrink-0">書</span>
            <span className="min-w-0">
              <span className="block font-display font-bold text-[15px] sm:text-lg leading-tight truncate">AI 免費學習圖書館</span>
              <span className="block font-mono text-[10px] tracking-widest text-muted-foreground">PoC V0.1 · 獨立示範</span>
            </span>
          </Link>
          <nav className="flex gap-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} data-testid={`link-nav-${n.href === "/" ? "home" : "about"}`}
                className={`px-3 py-2 rounded text-sm transition-colors ${loc === n.href ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t mt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-xs text-muted-foreground leading-relaxed grid sm:grid-cols-2 gap-4">
          <p>本站為獨立概念驗證，與 Google、Microsoft、OpenAI、IBM 無任何隸屬或合作關係。課程內容版權屬原提供者。</p>
          <p className="sm:text-right">本站不需登入、不收集資料。外部官方網站可能要求註冊帳號。</p>
        </div>
      </footer>
    </div>
  );
}
