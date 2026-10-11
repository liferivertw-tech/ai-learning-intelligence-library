import { useEffect, useState } from "react";

export type PathState = { topic: string | null; sub: string | null; level: string | null; provider: string; query: string };
const KEY = "ai-lib-path-v01";
const initial: PathState = { topic: null, sub: null, level: null, provider: "全部", query: "" };

export function usePathState() {
  const [state, setState] = useState<PathState>(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (!raw) return initial;
      const saved = JSON.parse(raw);
      return {
        topic: saved.topic === "ai-basics" ? saved.topic : null,
        sub: saved.topic === "ai-basics" && saved.sub === "genai" ? saved.sub : null,
        level: saved.topic === "ai-basics" && saved.sub === "genai" && saved.level === "beginner" ? saved.level : null,
        provider: ["全部", "Google Cloud", "Microsoft Learn", "OpenAI Academy", "IBM SkillsBuild", "Microsoft"].includes(saved.provider) ? saved.provider : "全部",
        query: typeof saved.query === "string" ? saved.query : "",
      };
    } catch { return initial; }
  });
  useEffect(() => { try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ } }, [state]);
  return [state, setState, () => setState(initial)] as const;
}
