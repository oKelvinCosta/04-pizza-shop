import { test, expect } from "@playwright/test";

test("update profile successfully", async ({ page }) => {
  // waitUntil - Wait all the js to be executed, render the screen
  await page.goto("/", { waitUntil: "networkidle" }); // Already have the base URL

  await page.getByRole("button", { name: "Pizza Shop" }).click();

  await page.getByText("Perfil da loja").click();

  //   Dialog
  await page.getByRole("textbox", { name: "Nome" }).fill("Rocket Pizza");
  await page.getByRole("textbox", { name: "Descrição" }).fill("Descrição 2");
  await page.getByRole("button", { name: "Salvar" }).click();

  // Wait all requisition http
  await page.waitForLoadState("networkidle");

  const toast = await page.getByText("Perfil atualizado com sucesso.");
  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();

  await page.waitForTimeout(2000);

  await expect(
    page.getByRole("button", { name: "Rocket Pizza" }),
  ).toBeVisible();
});

test("update wrong profile", async ({ page }) => {
  // waitUntil - Wait all the js to be executed, render the screen
  await page.goto("/", { waitUntil: "networkidle" }); // Already have the base URL

  await page.getByRole("button", { name: "Pizza Shop" }).click();

  await page.getByText("Perfil da loja").click();

  //   Dialog
  await page.getByRole("textbox", { name: "Nome" }).fill("Rocket Pizza Wrong");
  await page.getByRole("textbox", { name: "Descrição" }).fill("Descrição 2");
  await page.getByRole("button", { name: "Salvar" }).click();

  // Wait all requisition http
  await page.waitForLoadState("networkidle");

  const toast = await page.getByText("Erro ao atualizar perfil.");
  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Close" }).click();

  await page.waitForTimeout(2000);

  await expect(page.getByRole("button", { name: "Pizza Shop" })).toBeVisible();
});
