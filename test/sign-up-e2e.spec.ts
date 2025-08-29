import { test, expect } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
  // waitUntil - Wait all the js to be executed, render the screen
  await page.goto("/sign-up", { waitUntil: "networkidle" }); // Already have the base URL

  await page
    .getByRole("textbox", { name: "Nome do estabelecimento" })
    .fill("Pizza Shop");

  await page.getByRole("textbox", { name: "Seu nome" }).fill("Kelvin Costa");

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("okelvincosta@gmail.com");

  await page.getByRole("textbox", { name: "Seu celular" }).fill("81237127123");

  const button = await page.getByRole("button", { name: "Finalizar cadastro" });
  button.click();

  const toast = await page.getByText("Restaurante cadastrado com sucesso!");
  await expect(toast).toBeVisible();
});

test("sign up with wrong credentials", async ({ page }) => {
  // waitUntil - Wait all the js to be executed, render the screen
  await page.goto("/sign-up", { waitUntil: "networkidle" }); // Already have the base URL

  await page
    .getByRole("textbox", { name: "Nome do estabelecimento" })
    .fill("A wrong name");

  await page.getByRole("textbox", { name: "Seu nome" }).fill("Kelvin Costa");

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("okelvincosta@gmail.com");

  await page.getByRole("textbox", { name: "Seu celular" }).fill("81237127123");

  const button = await page.getByRole("button", { name: "Finalizar cadastro" });
  button.click();

  const toast = await page.getByText("Erro ao realizar cadastro.");
  await expect(toast).toBeVisible();
});

// test("sign in with wtrong credentials", async ({ page }) => {
//   // waitUntil - Wait all the js to be executed, render the screen
//   await page.goto("/sign-in", { waitUntil: "networkidle" }); // Already have the base URL

//   // Expect a title "to contain" a substring.
//   // await expect(page).toHaveTitle(/Playwright/);

//   await page
//     .getByRole("textbox", { name: "Seu e-mail" })
//     .fill("lalala@gmail.com");

//   await page.getByRole("button", { name: "Acessar painel" }).click();

//   const toast = await page.getByText("Erro ao realizar login.");

//   await expect(toast).toBeVisible();
// });

test("Navigate to new login page", async ({ page }) => {
  // waitUntil - Wait all the js to be executed, render the screen
  await page.goto("/sign-up", { waitUntil: "networkidle" }); // Already have the base URL

  await page.getByRole("link", { name: "Acessar painel" }).click();

  await expect(page.url()).toContain("/sign-in");

  await expect(
    page.getByRole("heading", { name: "Acessar painel" }),
  ).toBeVisible();
});
