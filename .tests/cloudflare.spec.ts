import { test, expect } from "@playwright/test";

import { startVite } from "./utils.js";

let vite: Awaited<ReturnType<typeof startVite>>;
test.beforeAll(async () => {
  vite = await startVite("cloudflare");
});
test.afterAll(async () => {
  await vite?.cleanup();
});

test("loads home page", async ({ page }) => {
  await page.goto(new URL("/", vite.baseURL).href);

  await expect(page).toHaveTitle(/New React Router App/);

  await page
    .getByRole("link", {
      name: "React Router Docs",
    })
    .waitFor();
  await page
    .getByRole("link", {
      name: "Join Discord",
    })
    .waitFor();
});
