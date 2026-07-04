import { expect, type Locator, type Page } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly btnCloseDemoInfo: Locator;
  readonly fieldSearch: Locator;
  readonly txtSearchResult: Locator;
  readonly btnMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    const text: string = "";
    this.btnCloseDemoInfo = page.locator('[class="woocommerce-store-notice__dismiss-link"]');
    this.fieldSearch = page.locator('[id="woocommerce-product-search-field-0"]');
    this.txtSearchResult = page.locator('[class="woocommerce-products-header__title page-title"]');
    this.btnMenu = page.locator('[class="menu nav-menu"]').getByText(text);
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
  btnClickMenu = (btnName: string) => this.page.locator('[class="menu nav-menu"]').getByText(btnName);
}