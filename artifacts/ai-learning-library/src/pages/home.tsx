import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, Clock, RotateCcw, Search, X } from "lucide-react";
import { resources } from "@/data/resources";
import { usePathState } from "@/lib/path-state";

const TOPICS = [
  { id: "ai-basics", label: "AI 基礎入門", note: "從零開始認識人工智慧", open: true },
];
const SUBS = [
  { id: "genai", label: "生成式 AI 入門", note: "了解 ChatGPT 這類工具如何運作", open: true },
];
const LEVELS = [
  { id: "beginner", label: "初學者", note: "沒有程式或數學背景也可以", open: true },
];
const PROVIDERS = ["全部", "Google Cloud", "Microsoft Learn", "OpenAI Academy", "IBM SkillsBuild", "Microsoft"];

function Step({ n, title, done, active, children }: { n: number; title: string; done: boolean; active: boolean; children: React.ReactNode }) {
  return (
    <section className={`rise relative pl-12 pb-10 ${active || done ? "" : "opacity-45"}`} style={{ animationDelay: `${n * 80}ms` }}>
      <span className={`absolute left-0 top-0 w-8 h-8 rounded-full grid place-items-center font-mono text-sm border-2 transition-colors ${done ? "bg-primary border-primary text-primary-foreground" : active ? "border-accent text-accent bg-card" : "border-border text-muted-foreground bg-card"}`}>
        {done ? <Check className="w-4 h-4" /> : n}
      </span>
      <span className="absolute left-[15px] top-9 bottom-1 w-px bg-border" aria-hidden />
      <h2 className="font-display font-bold text-lg mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Options({ items, value, onPick, disabled, name }: { items: { id: string; label: string; note: string; open: boolean }[]; value: string | null; onPick: (id: string) => void; disabled: boolean; name: string }) {
  return (
    <div role="group" aria-label={name} className="grid gap-2">
      {items.map((it) => {
        const sel = value === it.id;
        return (
          <button key={it.id} aria-pressed={sel} disabled={disabled || !it.open} onClick={() => onPick(it.id)} data-testid={`option-${name}-${it.id}`}
            className={`text-left p-4 rounded-md border transition-all ${sel ? "border-primary bg-primary text-primary-foreground shadow-[4px_4px_0_hsl(var(--accent))]" : it.open ? "bg-card hover:border-primary hover:-translate-y-0.5" : "bg-muted/50 cursor-not-allowed text-muted-foreground"}`}>
            <span className="flex items-center justify-between gap-2 font-medium">{it.label}{sel && <Check className="w-4 h-4" />}</span>
            <span className={`block text-xs mt-1 ${sel ? "opacity-80" : "text-muted-foreground"}`}>{it.note}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [s, set, reset] = usePathState();
  const ready = !!(s.topic && s.sub && s.level);
  const filtered = useMemo(() => {
    const q = s.query.trim().toLowerCase();
    return resources.filter((r) => (s.provider === "全部" || r.provider === s.provider) &&
      (!q || [r.title, r.subtitle, r.description, r.provider, ...r.tags].join(" ").toLowerCase().includes(q)));
  }, [s.provider, s.query]);
  const crumbs = [s.topic && "AI 基礎入門", s.sub && "生成式 AI 入門", s.level && "初學者"].filter(Boolean) as string[];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="py-12 sm:py-16 grid lg:grid-cols-[1.3fr_1fr] gap-8 items-end border-b">
        <div className="rise">
          <p className="font-mono text-xs tracking-[.25em] text-accent mb-4">PERSONAL LIBRARY · 繁體中文</p>
          <h1 className="font-display font-black text-4xl sm:text-6xl leading-[1.1]">不必全部讀完，<br />先挑一本對的。</h1>
        </div>
        <p className="rise text-muted-foreground leading-relaxed" style={{ animationDelay: "120ms" }}>
          這是一座小小的私人書架。我們只收錄大型機構公開提供的免費 AI 課程，替你先讀過公開說明，再用三個選擇帶你走到最適合起步的五門課。
        </p>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-10 pt-10">
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="flex items-center justify-between mb-6">
            <p className="font-mono text-xs tracking-widest text-muted-foreground">選書路徑</p>
            <button onClick={reset} className="text-xs flex items-center gap-1 text-muted-foreground hover:text-accent" data-testid="button-reset-path"><RotateCcw className="w-3 h-3" />重新選擇</button>
          </div>
          <Step n={1} title="想學什麼領域？" done={!!s.topic} active={!s.topic}>
            <Options name="topic" items={TOPICS} value={s.topic} disabled={false} onPick={(id) => set({ ...s, topic: id })} />
          </Step>
          <Step n={2} title="從哪個主題開始？" done={!!s.sub} active={!!s.topic && !s.sub}>
            <Options name="sub" items={SUBS} value={s.sub} disabled={!s.topic} onPick={(id) => set({ ...s, sub: id })} />
          </Step>
          <Step n={3} title="你目前的程度？" done={!!s.level} active={!!s.sub && !s.level}>
            <Options name="level" items={LEVELS} value={s.level} disabled={!s.sub} onPick={(id) => set({ ...s, level: id })} />
          </Step>
          <p className="text-xs text-muted-foreground pl-12 -mt-4">V0.1 專注一條入門路徑，不需註冊即可瀏覽。</p>
        </aside>

        <section aria-live="polite">
          <nav aria-label="目前路徑" className="flex flex-wrap items-center gap-2 text-sm mb-6 font-mono" data-testid="text-breadcrumb">
            <span className="text-muted-foreground">書架</span>
            {crumbs.map((c) => <span key={c} className="flex items-center gap-2"><span className="text-accent">/</span>{c}</span>)}
          </nav>
          {!ready ? (
            <div className="border-2 border-dashed rounded-lg p-10 sm:p-16 text-center bg-card/50">
              <div className="mx-auto w-24 h-28 relative mb-6" aria-hidden>
                {[0, 1, 2].map((i) => <span key={i} className="absolute bottom-0 w-6 rounded-sm border-2 border-primary/40" style={{ left: i * 30, height: 70 + i * 14, background: i === 2 ? "hsl(var(--accent) / .15)" : "transparent" }} />)}
              </div>
              <h3 className="font-display font-bold text-xl">書架還在等你</h3>
              <p className="text-muted-foreground text-sm mt-2">依序完成選書路徑，還有 {3 - crumbs.length} 個選擇，這裡就會出現為你挑好的課程。</p>
            </div>
          ) : (
            <div className="rise">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <label className="relative flex-1">
                  <span className="sr-only">搜尋課程</span>
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="search" value={s.query} onChange={(e) => set({ ...s, query: e.target.value })} placeholder="搜尋課名、關鍵字，例如：提示"
                    className="w-full h-11 pl-9 pr-9 rounded-md border bg-card focus:outline-none focus:ring-2 focus:ring-ring" data-testid="input-search" />
                  {s.query && <button onClick={() => set({ ...s, query: "" })} aria-label="清除搜尋" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-accent" data-testid="button-clear-search"><X className="w-4 h-4" /></button>}
                </label>
              </div>
              <div role="group" aria-label="提供者" className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
                {PROVIDERS.map((p) => (
                  <button key={p} aria-pressed={s.provider === p} onClick={() => set({ ...s, provider: p })} data-testid={`filter-provider-${p}`}
                    className={`shrink-0 px-3 h-8 rounded-full text-sm border transition-colors ${s.provider === p ? "bg-foreground text-background border-foreground" : "bg-card hover:border-primary"}`}>{p}</button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4" data-testid="text-result-count">共 {filtered.length} / {resources.length} 門課</p>
              {filtered.length === 0 ? (
                <div className="border rounded-lg p-10 text-center bg-card">
                  <h3 className="font-display font-bold text-lg">這格書架是空的</h3>
                  <p className="text-sm text-muted-foreground mt-2">沒有符合「{s.query || s.provider}」的課程。試試其他字詞，或清除篩選。</p>
                  <button onClick={() => set({ ...s, query: "", provider: "全部" })} className="mt-5 inline-flex items-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground" data-testid="button-reset-filters"><RotateCcw className="w-4 h-4" />清除篩選</button>
                </div>
              ) : (
                <ol className="space-y-3">
                  {filtered.map((r, i) => (
                    <li key={r.id} className="rise" style={{ animationDelay: `${i * 60}ms` }}>
                      <Link href={`/resource/${r.id}`} data-testid={`card-resource-${r.id}`}
                        className="group grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-4 items-start p-5 rounded-lg border bg-card hover:border-primary hover:shadow-[6px_6px_0_hsl(var(--primary)/.15)] transition-all">
                        <span className="font-mono text-xs text-accent pt-1">{String(i + 1).padStart(2, "0")}</span>
                        <span className="min-w-0">
                          <span className="block font-mono text-[11px] tracking-wider text-muted-foreground uppercase">{r.provider}</span>
                          <span className="block font-display font-bold text-lg leading-snug mt-1 group-hover:text-primary">{r.title}</span>
                          <span className="block text-sm text-muted-foreground mt-1 line-clamp-2">{r.subtitle}</span>
                          <span className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{r.duration}</span>
                            <span>{r.language}</span><span>{r.format}</span>
                          </span>
                        </span>
                        <span className="hidden sm:flex items-center gap-1 text-sm text-primary self-center">翻開<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                      </Link>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
