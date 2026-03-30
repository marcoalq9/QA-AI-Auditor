import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { testData } from "../utils/testData";

test("successful checkout with Sauce Labs Backpack", async ({ page }) => {
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
