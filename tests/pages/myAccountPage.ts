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
    readonly btnLogIn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txtPageHeader = this.page.locator('[class="entry-title"]');
        this.labelInputNewAccEmail = this.labelInputField("reg_email");
        this.inputNewAccEmail = this.inputField("reg_email");
        this.labelInputLogInEmail = this.labelInputField("username");
        this.inputLogInEmail = this.inputField("username");
        this.labelInputNewAccPassword = this.labelInputField("reg_password");
        this.inputNewAccPassword = this.inputField("reg_password");
        this.labelInputLogInPassword = this.labelInputField("password");  
        this.inputLogInPassword = this.inputField("password");
        this.btnLogIn = this.page.locator('button[name="login"]');
    }

    labelInputField = (txtFieldName: string) => this.page.locator(`label[for="${txtFieldName}"]`);
    inputField = (txtFieldName: string) => this.page.locator(`input[id="${txtFieldName}"]`);
}