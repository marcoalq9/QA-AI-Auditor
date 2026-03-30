import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { testData } from "../utils/testData";
import { auditProductDescription } from "../utils/ai_auditor";

test("successful checkout with Sauce Labs Backpack and AI audit", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(
    testData.users.standard.username,
    testData.users.standard.password,
  );

  await inventoryPage.assertInventoryLoaded();

  const productDescription = await inventoryPage.getProductDescription(
    testData.products.backpack,
  );

  console.log("Extracted product description:", productDescription);

  const auditResult = await auditProductDescription(productDescription);

  console.log("Gemini audit result:", auditResult);

  expect(
    auditResult.approved,
    `AI auditor rejected the product description. Reason: ${auditResult.reason}`,
  ).toBe(true);

  await inventoryPage.addProductToCart(testData.products.backpack);
  await inventoryPage.openCart();

  await cartPage.assertProductInCart(testData.products.backpack);
  await cartPage.proceedToCheckout();

  await checkoutPage.fillShippingInformation(
    testData.checkout.firstName,
    testData.checkout.lastName,
    testData.checkout.postalCode,
  );

  await checkoutPage.finishCheckout();
  await checkoutPage.assertOrderConfirmation();
});
