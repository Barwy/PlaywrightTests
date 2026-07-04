import { expect, type Locator, type Page } from '@playwright/test';

export class ProductListings {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly btnProductDetails: Locator;
  readonly btnProductCategory: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[class="woocommerce-loop-product__title"]');
    this.productPrice = page.locator('[class="price"] [class="woocommerce-Price-amount amount"]');
    this.btnProductDetails = page.locator('[class="woocommerce-LoopProduct-link woocommerce-loop-product__link"]');
    this.btnProductCategory = page.locator('[class="product-categories"] > li[class] > a');
  }

  async openProductDetails() {
    await this.btnProductDetails.click();
  }
}