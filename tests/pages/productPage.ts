import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productHeader: Locator;

    constructor(page: Page) {
this.page = page;
this.productHeader = page.locator('[class="product_title entry-title"]');
    }

    headerProductName = () => this.productHeader;
}