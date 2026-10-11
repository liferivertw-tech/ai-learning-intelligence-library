import { PDFDocument, rgb, type PDFPage } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { DISCLAIMER, type Resource } from '../data/resources';

/** Pure PDF generation, shared by the browser download and local smoke check. */
export async function createNotesPdf(resource: Resource, fontBytes: Uint8Array): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  // Ship a static TrueType subset and embed it intact for PDF-reader compatibility.
  const font = await doc.embedFont(fontBytes, { subset: false });
  doc.setTitle(`${resource.subtitle}｜AI 學習筆記`);
  doc.setAuthor('AI 學習圖書館・人工策展');
  doc.setSubject('標準版人工撰寫示範摘要，非完整影片或教材摘要');
  doc.setLanguage('zh-Hant');
  let page: PDFPage;
  let y = 0;
  const width = 595.28;
  const height = 841.89;
  const margin = 48;
  const ink = rgb(0.12, 0.23, 0.23);
  const teal = rgb(0.08, 0.35, 0.32);

  function newPage() {
    page = doc.addPage([width, height]);
    page.drawText('AI 學習圖書館  /  PoC V0.1  /  學習筆記', {
      x: margin, y: height - 32, size: 9, font, color: teal,
    });
    y = height - 64;
  }

  // Character wrapping accommodates CJK, mixed Latin text and long source URLs.
  function text(value: string, size = 11, heading = false) {
    const lineHeight = size * 1.65;
    for (const paragraph of value.split('\n')) {
      let line = '';
      const lines: string[] = [];
      for (const char of paragraph) {
        if (line && font.widthOfTextAtSize(line + char, size) > width - margin * 2) {
          lines.push(line);
          line = '';
        }
        line += char;
      }
      if (line) lines.push(line);
      if (!lines.length) lines.push('');
      for (const current of lines) {
        if (y - lineHeight < 54) newPage();
        page.drawText(current, { x: margin, y, size, font, color: heading ? teal : ink });
        y -= lineHeight;
      }
    }
    y -= 7;
  }
  const heading = (value: string) => {
    if (y < 110) newPage();
    text(value, 14, true);
  };
  newPage();
  text(resource.subtitle, 21, true);
  text(resource.title, 13);
  text('標準版重點摘要｜人工撰寫・示範摘要', 12, true);
  text(DISCLAIMER, 10);
  text(`來源：${resource.provider}\n語言：${resource.language}\n時間：${resource.duration}\n時數說明：${resource.durationNote}\n核對日期：${resource.verifiedAt}`, 10);
  heading('免費與使用條件');
  text(resource.freeCondition);
  text(resource.accountNote);
  text(resource.verificationNote, 10);
  heading('內容概覽');
  text(resource.summary.overview);
  heading('重點筆記');
  resource.summary.points.forEach((point, index) => {
    text(`${index + 1}. ${point.title}`, 12, true);
    text(`${point.text} [${point.citationIds.join('、')}]`);
  });
  heading('詞彙卡｜策展者補充');
  resource.summary.terms.forEach(item => text(`${item.term}：${item.definition}`));
  heading('練習｜策展者原創，非官方作業');
  resource.summary.practice.forEach((item, index) => text(`${index + 1}. ${item}`));
  heading('反思問題｜策展者原創');
  resource.summary.reflection.forEach((item, index) => text(`${index + 1}. ${item}`));
  heading('可追溯來源與短引文');
  resource.sources.forEach(source => {
    text(`[${source.id}] ${source.title}`, 11, true);
    text(`URL：${source.url}`, 9);
    text(`公開頁面短引文：${source.excerpt}`, 10);
    text(`查核日期：${resource.verifiedAt}。引用僅支持對應介紹重點，不代表已閱讀完整課程。`, 9);
  });
  heading('摘要透明度與著作權');
  text('本版未啟用 AI 文本摘要。真正的文本生成摘要必須先取得可合法使用的文本，記錄取得範圍，再經 AI 處理並逐點附引用；不可把人工示範摘要標成該結果。', 10);
  text('不擷取 YouTube 逐字稿、不重製受保護教材。本筆記為原創導讀與短引文，不能取代官方課程。免費條件以官方最新公告為準。', 10);
  doc.getPages().forEach((p, index, pages) => {
    p.drawText(`人工示範摘要・非完整教材  |  ${index + 1} / ${pages.length}`, {
      x: margin, y: 28, font, size: 8, color: teal,
    });
  });
  return doc.save();
}

let cachedFont: Uint8Array | undefined;

export async function downloadNotes(resource: Resource): Promise<void> {
  if (!cachedFont) {
    const response = await fetch(`${import.meta.env.BASE_URL}fonts/NotoSansTC-Notes.ttf`, {
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error('中文字型載入失敗，請確認網路後重試。');
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.length < 1000) throw new Error('中文字型檔案不完整，無法產生 PDF。');
    cachedFont = bytes;
  }
  const bytes = await createNotesPdf(resource, cachedFont);
  const blob = new Blob([Uint8Array.from(bytes).buffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `AI學習筆記-${resource.id}-示範摘要.pdf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
