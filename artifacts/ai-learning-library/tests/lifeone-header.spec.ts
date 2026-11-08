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
  await expect(riverLogo).toHaveAttribute("alt", "Life River 母品牌標誌");

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(libraryLogo).toBeVisible();
    await expect(riverLogo).toBeVisible();
    const expectedRiverLogo =
      width <= 640
        ? "/images/LifeRiver-v-final.png"
        : "/images/LifeRiver-h-final.png";
    await expect
      .poll(() =>
        riverLogo.evaluate((image: HTMLImageElement) =>
          new URL(image.currentSrc).pathname,
        ),
      )
      .toBe(expectedRiverLogo);
    expect(
      await libraryLogo.evaluate((image: HTMLImageElement) => image.naturalWidth),
    ).toBeGreaterThan(0);
    expect(
      await riverLogo.evaluate((image: HTMLImageElement) => image.naturalWidth),
    ).toBeGreaterThan(0);
  }
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
