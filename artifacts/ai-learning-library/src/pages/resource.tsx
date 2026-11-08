import { useState } from "react";
import { Link, useParams } from "wouter";
import { AlertTriangle, ArrowLeft, Download, ExternalLink, Loader2, RotateCcw, ShieldCheck } from "lucide-react";
import { resources, DISCLAIMER } from "@/data/resources";

function Block({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="py-6 border-t first:border-t-0">
      <h3 className="font-mono text-xs tracking-widest text-accent mb-3">{title}</h3>
      {children}
    </section>
  );
}

export default function ResourcePage() {
  const { id } = useParams<{ id: string }>();
  const r = resources.find((x) => x.id === id);
  const [pdf, setPdf] = useState<"idle" | "loading" | "error" | "done">("idle");

  if (!r) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display font-bold text-2xl">找不到這本書</h1>
        <p className="text-muted-foreground mt-2">這門課可能不在 V0.1 的書架上。</p>
        <Link href="/" className="mt-6 inline-flex items-center gap-2 h-10 px-4 rounded-md bg-primary text-primary-foreground" data-testid="link-back-notfound"><ArrowLeft className="w-4 h-4" />回到書架</Link>
      </div>
    );
  }

  const run = async () => {
    setPdf("loading");
    try {
      const { downloadNotes } = await import("@/lib/pdf");
      await downloadNotes(r);
      setPdf("done");
    } catch {
      setPdf("error");
    }
  };
  const srcIndex = (cid: string) => r.sources.findIndex((s) => s.id === cid) + 1;

  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8" data-testid="link-back"><ArrowLeft className="w-4 h-4" />回到書架</Link>

      <header className="rise grid lg:grid-cols-[1fr_300px] gap-8 pb-10 border-b">
        <div>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{r.provider}</p>
          <h1 className="font-display font-black text-3xl sm:text-5xl leading-tight mt-2" data-testid="text-title">{r.title}</h1>
          <p className="text-lg text-muted-foreground mt-3">{r.subtitle}</p>
          <p className="mt-6 leading-relaxed max-w-2xl">{r.description}</p>
          <div className="flex flex-wrap gap-2 mt-5">{r.tags.map((t) => <span key={t} className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">{t}</span>)}</div>
        </div>
        <aside className="rounded-lg border bg-card p-5 self-start space-y-4 text-sm">
          <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 h-11 rounded-md bg-primary text-primary-foreground hover:opacity-90" data-testid="link-official">前往官方課程<ExternalLink className="w-4 h-4" /></a>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <dt className="text-muted-foreground">時長</dt><dd>{r.duration}<span className="block text-xs text-muted-foreground">{r.durationNote}</span></dd>
            <dt className="text-muted-foreground">語言</dt><dd>{r.language}</dd>
            <dt className="text-muted-foreground">形式</dt><dd>{r.format}</dd>
            <dt className="text-muted-foreground">免費條件</dt><dd data-testid="text-free">{r.freeCondition}</dd>
            <dt className="text-muted-foreground">帳號需求</dt><dd data-testid="text-account">{r.accountNote}</dd>
          </dl>
          <div className="flex gap-2 pt-3 border-t text-xs"><ShieldCheck className="w-4 h-4 text-primary shrink-0" /><span><b>查證日期 {r.verifiedAt}</b><span className="block text-muted-foreground mt-0.5">{r.verificationNote}</span></span></div>
        </aside>
      </header>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8 pt-10">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h2 className="font-display font-bold text-2xl">標準版重點摘要</h2>
            <span className="seal text-xs px-2 py-1" data-testid="badge-demo">人工撰寫・示範摘要</span>
          </div>
          <div className="rounded-md border-l-4 border-accent bg-accent/5 p-4 text-sm leading-relaxed mb-4" role="note">
            <p className="font-medium">本版未啟用 AI 文本摘要。</p>
            <p className="text-muted-foreground mt-1">以下內容由人工撰寫，僅依據官方頁面公開取得的課程說明，<b className="text-foreground">並非</b>依據完整影片或逐字稿。每個重點標註其依據的公開來源。</p>
          </div>

          <Block title="概覽"><p className="leading-relaxed">{r.summary.overview}</p></Block>
          <Block title="重點">
            <ol className="space-y-4">
              {r.summary.points.map((p, i) => (
                <li key={i} className="grid grid-cols-[2rem_1fr] gap-2">
                  <span className="font-display font-bold text-primary text-lg">{i + 1}</span>
                  <div><p className="font-medium">{p.title}</p><p className="text-muted-foreground text-sm mt-1 leading-relaxed">{p.text}</p>
                    <p className="mt-1 flex gap-1">{p.citationIds.map((c) => <a key={c} href={`#src-${c}`} className="font-mono text-[11px] px-1.5 rounded bg-secondary hover:bg-primary hover:text-primary-foreground" data-testid={`link-cite-${c}`}>來源 {srcIndex(c)}</a>)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Block>
          <Block title="名詞解釋">
            <dl className="grid sm:grid-cols-2 gap-3">{r.summary.terms.map((t) => <div key={t.term} className="p-3 rounded border bg-card"><dt className="font-medium">{t.term}</dt><dd className="text-sm text-muted-foreground mt-1">{t.definition}</dd></div>)}</dl>
          </Block>
          <Block title="動手試試"><ul className="list-disc pl-5 space-y-1.5 text-sm">{r.summary.practice.map((x) => <li key={x}>{x}</li>)}</ul></Block>
          <Block title="反思問題"><ul className="list-disc pl-5 space-y-1.5 text-sm">{r.summary.reflection.map((x) => <li key={x}>{x}</li>)}</ul></Block>
          <Block title="引用來源" id="sources">
            <ol className="space-y-3">{r.sources.map((s, i) => (
              <li key={s.id} id={`src-${s.id}`} className="p-4 rounded border bg-card scroll-mt-24 target:ring-2 target:ring-accent">
                <p className="font-medium text-sm"><span className="font-mono text-accent mr-2">[{i + 1}]</span>{s.title}</p>
                <blockquote className="text-sm text-muted-foreground border-l-2 pl-3 my-2">{s.excerpt}</blockquote>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-primary break-all hover:underline" data-testid={`link-source-${s.id}`}>{s.url}</a>
              </li>
            ))}</ol>
          </Block>
          <p className="text-xs text-muted-foreground border-t pt-4">{DISCLAIMER}</p>
        </div>

        <aside className="lg:sticky lg:top-24 self-start space-y-4">
          <div className="rounded-lg border bg-card p-5">
            <p className="font-display font-bold">下載學習筆記</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4">將此示範摘要、來源與查證資訊存成 PDF。</p>
            {pdf === "error" ? (
              <div role="alert" className="space-y-3">
                <p className="text-sm text-destructive flex gap-2"><AlertTriangle className="w-4 h-4 shrink-0" />PDF 產生失敗，請再試一次。</p>
                <div className="flex gap-2">
                  <button onClick={run} className="flex-1 h-10 rounded-md bg-primary text-primary-foreground inline-flex items-center justify-center gap-2" data-testid="button-retry-pdf"><RotateCcw className="w-4 h-4" />重試</button>
                  <button onClick={() => setPdf("idle")} className="h-10 px-3 rounded-md border" data-testid="button-dismiss-pdf">關閉</button>
                </div>
              </div>
            ) : (
              <button onClick={run} disabled={pdf === "loading"} aria-busy={pdf === "loading"} className="w-full h-11 rounded-md bg-accent text-accent-foreground inline-flex items-center justify-center gap-2 disabled:opacity-70" data-testid="button-download-pdf">
                {pdf === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" />產生中…</> : <><Download className="w-4 h-4" />下載 PDF</>}
              </button>
            )}
            {pdf === "done" && <p className="text-xs text-primary mt-2" role="status">已開始下載。</p>}
          </div>
          <div className="rounded-lg border p-5 text-xs leading-relaxed text-muted-foreground">
            <p className="font-medium text-foreground mb-1">未來的「文本生成摘要」</p>
            需先取得經授權的完整文本，再由 AI 生成，且每個重點附上逐點引用。目前頁面的內容不是 AI 生成。
            <Link href="/about" className="block mt-2 text-primary hover:underline" data-testid="link-about-from-detail">了解更多</Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
