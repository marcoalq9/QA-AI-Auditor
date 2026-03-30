import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { testData } from "../utils/testData";

test("locked out user sees correct error message", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(
    testData.users.lockedOut.username,
    testData.users.lockedOut.password,
  );

  await loginPage.assertLoginError(testData.messages.lockedOutError);
});
