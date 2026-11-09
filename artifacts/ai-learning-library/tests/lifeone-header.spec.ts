import { expect, test, type Locator, type Page } from "@playwright/test";

const lifeOneLinks = [
  {
    name: "LifeOne 官方首頁（在新分頁開啟）",
    href: "https://lifeone.liferiver.com.tw/",
  },
  {
    name: "登入 LifeOne 會員（在新分頁開啟）",
    href: "https://lifeone.liferiver.com.tw/sign-in",
  },
  {
    name: "註冊 LifeOne 會員（在新分頁開啟）",
    href: "https://lifeone.liferiver.com.tw/register",
  },
];

async function hasVisibleKeyboardFocus(locator: Locator) {
  return locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const width = Number.parseFloat(style.outlineWidth);
    return style.outlineStyle !== "none" && width >= 2;
  });
}

async function tabToLink(page: Page, target: Locator) {
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press("Tab");
    if (await target.evaluate((element) => element === document.activeElement)) {
      return;
    }
  }
  throw new Error("LifeOne link was not reached with keyboard navigation");
}

test("LifeOne links keep their destinations, names, and safe new-tab behavior", async ({
  page,
}) => {
  await page.goto("/");

  for (const expected of lifeOneLinks) {
    const link = page.getByRole("link", { name: expected.name });
    await expect(link).toHaveAttribute("href", expected.href);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).toHaveAttribute("rel", /noreferrer/);
  }

  await expect(
    page.getByRole("img", { name: "LifeOne 官方標誌" }),
  ).toBeVisible();
});

test("LifeLibrary and Life River brand assets render with accessible identity", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/LifeLibrary · AI 免費學習圖書館/);
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
    "content",
    "LifeLibrary",
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    "/images/LifeLibrary.png",
  );

  const libraryLogo = page.getByTestId("logo-lifelibrary");
  await expect(libraryLogo).toHaveAttribute("src", "/images/LifeLibrary.png");
  await expect(libraryLogo).toHaveAttribute("alt", "LifeLibrary 標誌");

  const riverLogo = page.getByTestId("logo-liferiver-image");
  await expect(riverLogo).toHaveAttribute("alt", "LIFE RIVER 官方直立式 Logo");

  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(libraryLogo).toBeVisible();
    await expect(riverLogo).toBeVisible();
    const expectedRiverLogo =
      "/images/life-river-vertical-final.png";
    await expect
      .poll(() =>
        riverLogo.evaluate((image: HTMLImageElement) =>
          new URL(image.currentSrc).pathname,
        ),
      )
      .toBe(expectedRiverLogo);
    const riverBox = await riverLogo.boundingBox();
    expect(riverBox).not.toBeNull();
    expect(riverBox!.width).toBeGreaterThanOrEqual(80);
    expect(riverBox!.width).toBeLessThanOrEqual(160);
    expect(riverBox!.height / riverBox!.width).toBeCloseTo(1279 / 1230, 2);
    const expectedLogoSize = width < 768 ? 64 : width < 1280 ? 80 : 96;
    await expect
      .poll(() =>
        libraryLogo.evaluate((image: HTMLImageElement) => ({
          width: image.getBoundingClientRect().width,
          height: image.getBoundingClientRect().height,
          fit: getComputedStyle(image).objectFit,
        })),
      )
      .toEqual({
        width: expectedLogoSize,
        height: expectedLogoSize,
        fit: "contain",
      });
    expect(
      await libraryLogo.evaluate((image: HTMLImageElement) => image.naturalWidth),
    ).toBeGreaterThan(0);
    expect(
      await riverLogo.evaluate((image: HTMLImageElement) => image.naturalWidth),
    ).toBeGreaterThan(0);
  }
});

test("Life River logo and tagline form a safe, keyboard-accessible link", async ({
  page,
}) => {
  await page.goto("/");
  const link = page.getByRole("link", {
    name: "Life River 官方網站：企業標語，供應生命，享受生活，結出健康美果。；品牌格言，日日有供應，月月結新果，年年都歡樂。；出處，《啟示錄》22:1–2（在新分頁開啟）",
  });
  await expect(link).toHaveAttribute("href", "https://liferiver.com.tw/");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  await expect(link).not.toContainText("母品牌");
  await expect(link).toContainText("供應生命，享受生活，結出健康美果。");
  await expect(link).toContainText("日日有供應，月月結新果，年年都歡樂。");
  await expect(link).toContainText("——《啟示錄》22:1–2");
  await expect(link).not.toContainText("Life Flows. Intelligence Connects.");

  const footerLogo = page.getByTestId("logo-liferiver-image");
  const enterpriseSlogan = link.getByText(
    "供應生命，享受生活，結出健康美果。",
  );
  const brandMotto = link.getByText("日日有供應，月月結新果，年年都歡樂。");
  const source = link.getByText("——《啟示錄》22:1–2");
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const layout = await page.evaluate(() => {
      const footer = document.querySelector("footer");
      const brandLink = footer?.querySelector('[data-testid="link-liferiver"]');
      const logo = footer?.querySelector(
        '[data-testid="logo-liferiver-image"]',
      );
      const copy = [
        "供應生命，享受生活，結出健康美果。",
        "日日有供應，月月結新果，年年都歡樂。",
        "——《啟示錄》22:1–2",
      ].map((text) =>
        [...(brandLink?.querySelectorAll("span") ?? [])].find(
          (element) => element.textContent === text,
        ),
      );
      if (
        !footer ||
        !brandLink ||
        !logo ||
        copy.some((element) => !element)
      ) {
        throw new Error("Expected Life River footer elements are missing");
      }

      const rect = (element: Element) => {
        const { left, right, top, bottom } = element.getBoundingClientRect();
        return { left, right, top, bottom };
      };
      const linkBox = rect(brandLink);

      return {
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        footerWidth: footer.getBoundingClientRect().width,
        linkBox,
        logoBox: rect(logo),
        copyBoxes: copy.map((element) => rect(element!)),
      };
    });

    expect(
      layout.documentWidth,
      `horizontal overflow at ${width}px: ${JSON.stringify(layout)}`,
    ).toBeLessThanOrEqual(layout.viewportWidth);
    expect(layout.footerWidth).toBeLessThanOrEqual(layout.viewportWidth);
    expect(layout.linkBox.left).toBeGreaterThanOrEqual(0);
    expect(layout.linkBox.right).toBeLessThanOrEqual(width);
    expect(layout.linkBox.right - layout.linkBox.left).toBeLessThanOrEqual(760);
    expect(layout.logoBox.left).toBeGreaterThanOrEqual(layout.linkBox.left);
    expect(layout.logoBox.right).toBeLessThanOrEqual(layout.linkBox.right);
    for (const box of layout.copyBoxes) {
      expect(box.left).toBeGreaterThan(layout.logoBox.right);
      expect(box.left).toBeCloseTo(layout.copyBoxes[0].left, 0);
    }
    const logoCenter = (layout.logoBox.top + layout.logoBox.bottom) / 2;
    const copyCenter = (layout.copyBoxes[0].top + layout.copyBoxes[2].bottom) / 2;
    expect(copyCenter).toBeCloseTo(logoCenter, 0);
    expect(layout.copyBoxes[0].bottom).toBeLessThanOrEqual(
      layout.copyBoxes[1].top,
    );
    expect(layout.copyBoxes[1].bottom).toBeLessThanOrEqual(
      layout.copyBoxes[2].top,
    );
    for (const copyBox of layout.copyBoxes) {
      expect(copyBox.left).toBeGreaterThanOrEqual(layout.linkBox.left);
      expect(copyBox.right).toBeLessThanOrEqual(layout.linkBox.right);
    }
    await expect(footerLogo).toBeVisible();
    await expect(enterpriseSlogan).toBeVisible();
    await expect(brandMotto).toBeVisible();
    await expect(source).toBeVisible();
  }

  await tabToLink(page, link);
  await expect(link).toBeFocused();
  expect(await hasVisibleKeyboardFocus(link)).toBe(true);
});

test("keyboard navigation visibly focuses the logo, sign-in, and registration links", async ({
  page,
}) => {
  await page.goto("/");

  for (const expected of lifeOneLinks) {
    const link = page.getByRole("link", { name: expected.name });
    await tabToLink(page, link);
    await expect(link).toBeFocused();
    expect(await hasVisibleKeyboardFocus(link), `${expected.name} focus ring`).toBe(
      true,
    );
  }
});

test("header stays within narrow, tablet, and desktop viewports", async ({
  page,
}) => {
  await page.goto("/");

  for (const width of [320, 360, 390, 640, 767, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });

    const result = await page.evaluate(() => {
      const header = document.querySelector("header");
      const brand = document.querySelector('[data-testid="link-home"]');
      const nav = document.querySelector('nav[aria-label="主要導覽"]');
      const lifeOne = document.querySelector(
        '[aria-label="LifeOne 會員入口"]',
      );
      if (!header || !brand || !nav || !lifeOne) {
        throw new Error("Expected header elements are missing");
      }

      const rect = (element: Element) => {
        const { left, right, top, bottom } = element.getBoundingClientRect();
        return { left, right, top, bottom };
      };
      const boxes = [rect(brand), rect(nav), rect(lifeOne)];
      const overlaps = boxes.some((box, i) =>
        boxes.slice(i + 1).some(
          (other) =>
            box.left < other.right &&
            box.right > other.left &&
            box.top < other.bottom &&
            box.bottom > other.top,
        ),
      );

      return {
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        headerWidth: header.getBoundingClientRect().width,
        overlaps,
      };
    });

    expect(
      result.documentWidth,
      `horizontal overflow at ${width}px: ${JSON.stringify(result)}`,
    ).toBeLessThanOrEqual(result.viewportWidth);
    expect(
      result.headerWidth,
      `header wider than viewport at ${width}px`,
    ).toBeLessThanOrEqual(result.viewportWidth);
    expect(
      result.overlaps,
      `header elements overlap at ${width}px`,
    ).toBe(false);
  }
});
