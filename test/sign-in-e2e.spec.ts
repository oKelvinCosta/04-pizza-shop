import { test, expect } from "@playwright/test";

test("sign in successfully", async ({ page }) => {
  // waitUntil - Wait all the js to be executed, render the screen
  await page.goto("/sign-in", { waitUntil: "networkidle" }); // Already have the base URL

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("okelvincosta@gmail.com");

  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = await page.getByText(
    "Verifique seu e-mail para realizar a autenticação.",
  );

  await expect(toast).toBeVisible();
});

test("sign in with wtrong credentials", async ({ page }) => {
  // waitUntil - Wait all the js to be executed, render the screen
  await page.goto("/sign-in", { waitUntil: "networkidle" }); // Already have the base URL

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("lalala@gmail.com");

  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = await page.getByText("Erro ao realizar login.");

  await expect(toast).toBeVisible();
});

test("Navigate to new restaurant page", async ({ page }) => {
  // waitUntil - Wait all the js to be executed, render the screen
  await page.goto("/sign-in", { waitUntil: "networkidle" }); // Already have the base URL

  await page.getByRole("link", { name: "Novo estabelecimento" }).click();

  await expect(page.url()).toContain("/sign-up");
});
