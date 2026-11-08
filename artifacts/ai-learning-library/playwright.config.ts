import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const port = 4173;
const appDir = fileURLToPath(new URL(".", import.meta.url));
const replitChromium = "/repl/tools/bin/chromium";
const executablePath =
  process.env.CHROMIUM_PATH ??
  (existsSync(replitChromium) ? replitChromium : undefined);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    browserName: "chromium",
    headless: true,
    launchOptions: executablePath ? { executablePath } : undefined,
  },
  webServer: {
    command: "pnpm run dev -- --host 127.0.0.1",
    cwd: appDir,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    env: {
      PORT: String(port),
      BASE_PATH: "/",
    },
  },
});
