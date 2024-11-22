import { execFile } from "node:child_process";
import * as path from "node:path";

import { test, expect } from "@playwright/test";

import { startCustom } from "./utils.js";

let vite: Awaited<ReturnType<typeof startCustom>>;
test.beforeAll(async () => {
  const cp = execFile("pnpm", ["db:migrate"], {
    cwd: path.resolve(process.cwd(), "node-postgres"),
  });
  await new Promise((resolve) => cp.on("exit", resolve));
  if (cp.exitCode !== 0) {
    throw new Error("Failed to run db:migrate");
  }

  vite = await startCustom("node-postgres");
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

  const randomText = Math.random().toString(36).substring(7);
  await page.getByRole("textbox", { name: "Name" }).fill(randomText);
  await page
    .getByRole("textbox", { name: "Email" })
    .fill(`email${randomText}@example.com`);
  await page.getByRole("button", { name: "Sign Guest Book" }).click();
  await page.getByText(randomText).waitFor();

  await page.goto(new URL("/", vite.baseURL).href);
  await page.getByText(randomText).waitFor();
});
