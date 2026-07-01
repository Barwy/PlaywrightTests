import { expect, type Locator, type Page } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly btnCloseDemoInfo: Locator;
  readonly fieldSearch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnCloseDemoInfo = page.locator('[class="woocommerce-store-notice__dismiss-link"]');
    this.fieldSearch = page.locator('[id="woocommerce-product-search-field-0"]');
  }

  async openLandingPage() {
    await this.page.goto('https://fakestore.testelka.pl/');
  }

  async closeDemoStorePopup() {
    await this.btnCloseDemoInfo.click();
    expect(this.btnCloseDemoInfo).toBeHidden();
  }

async searchForText(productName: string) {
    await this.fieldSearch.fill(productName);
    await this.page.keyboard.press("Enter");
  }
}