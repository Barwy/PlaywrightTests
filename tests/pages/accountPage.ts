import { type Locator, type Page } from '@playwright/test';

export class AccountPage {
    readonly page: Page;
    readonly btnLogOut: Locator;

constructor(page: Page) {
    this.page = page;
    this.btnLogOut = page.locator('ul[class="phoen_nav_tab"] > li>a[href]').getByText('Wyloguj');
}

}