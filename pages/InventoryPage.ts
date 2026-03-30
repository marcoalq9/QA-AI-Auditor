import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async assertInventoryLoaded(): Promise<void> {
    await expect(this.inventoryContainer).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", { hasText: productName }),
    });

    await productCard.locator("button").click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  async getProductDescription(productName: string): Promise<string> {
    const productCard = this.page.locator(".inventory_item").filter({
      has: this.page.locator(".inventory_item_name", { hasText: productName }),
    });

    const description = productCard.locator(".inventory_item_desc");
    await expect(description).toBeVisible();

    return (await description.textContent())?.trim() ?? "";
  }
}
