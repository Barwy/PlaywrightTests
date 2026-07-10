import { expect, type Locator, type Page } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly btnCloseDemoInfo: Locator;
  readonly fieldSearch: Locator;
  readonly txtSearchResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnCloseDemoInfo = page.locator('[class="woocommerce-store-notice__dismiss-link"]');
    this.fieldSearch = page.locator('[id="woocommerce-product-search-field-0"]');
    this.txtSearchResult = page.locator('[class="woocommerce-products-header__title page-title"]');
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
    await expect(this.txtSearchResult).toHaveText(`Wyniki wyszukiwania: „${productName}”`);
  }

  searchResultText = () => this.txtSearchResult;
  
  async btnClickMenu(btnName: string) {
    await this.page.locator('[class="menu nav-menu"]').getByText(btnName).click();
    await expect(this.page.locator('//h1')).toHaveText(btnName);
  }
}