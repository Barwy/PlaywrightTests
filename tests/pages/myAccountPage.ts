import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly txtPageHeader: Locator;
    readonly labelInputNewAccEmail: Locator;
    readonly labelInputNewAccPassword: Locator;
    readonly labelInputLogInEmail: Locator;
    readonly labelInputLogInPassword: Locator;
    readonly inputNewAccEmail: Locator;
    readonly inputNewAccPassword: Locator;
    readonly inputLogInEmail: Locator;
    readonly inputLogInPassword: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtPageHeader = this.page.locator('[class="entry-title"]');
        this.labelInputNewAccEmail = this.labelInputField("username");
        this.inputNewAccEmail = this.inputField("username");
        this.labelInputNewAccPassword = this.labelInputField("password");
        this.inputNewAccPassword = this.inputField("password");
        this.labelInputLogInEmail = this.labelInputField("reg_email");
        this.inputLogInEmail = this.inputField("reg_email");
        this.labelInputLogInPassword = this.labelInputField("reg_password");  
        this.inputLogInPassword = this.inputField("reg_password");
    }

    labelInputField = (txtFieldName: string) => this.page.locator(`label[for="${txtFieldName}"]`);
    inputField = (txtFieldName: string) => this.page.locator(`input[id="${txtFieldName}"]`);
}