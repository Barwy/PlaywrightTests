import { expect, test } from 'playwright/test';
import { LoginPage } from './pages/myAccountPage';
import { LandingPage } from './pages/landingPage';
import { readExcelCell } from './utils/excelManager';
import { AccountPage } from './pages/accountPage';

test('Get my account page textfield headers', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const loginPage = new LoginPage(page);

    landingPage.openLandingPage();
    landingPage.btnClickMenu('Moje konto');

    const inputHeaders: (string | null)[] = await Promise.all([
        loginPage.labelInputLogInEmail.textContent(),
        loginPage.labelInputNewAccEmail.textContent(),
        loginPage.labelInputLogInPassword.textContent(),
        loginPage.labelInputNewAccPassword.textContent()
    ]);
    await logArrayText(inputHeaders);
});

function logArrayText(myArray: (string | null)[]) {
    for (let x of myArray) {
        x = x == null ? "" : x;
        x = x.includes(" *Wymagane") ? "" : x.slice(0, -10);
        console.log(x);
    }
}

test('Log in', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);

    landingPage.openLandingPage();
    landingPage.btnClickMenu('Moje konto');

    const userName = await readExcelCell('output.xlsx', 'Users', 'A2');
    const password = await readExcelCell('output.xlsx', 'Users', 'B2');
    await loginPage.inputLogInEmail.fill(userName.toString());
    await loginPage.inputLogInPassword.fill(password.toString());
    await loginPage.btnLogIn.click();
    await expect(accountPage.btnLogOut).toHaveCount(1);
});

//npx playwright test -g "Get my account page textfield headers" --project chromium --headed
//npx playwright test -g "Log in" --project chromium --headed