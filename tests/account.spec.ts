import { expect, test } from 'playwright/test';
import { LoginPage } from './pages/myAccountPage';
import { LandingPage } from './pages/landingPage';

test('Get my account page textfield headers', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const loginPage = new LoginPage(page);

    landingPage.openLandingPage();
    landingPage.btnClickMenu('Moje konto');
    await expect(loginPage.txtPageHeader).toHaveText('Moje konto');

    const inputHeaders: (string | null)[] = await Promise.all([
        loginPage.labelInputLogInEmail.textContent(),
        loginPage.labelInputNewAccEmail.textContent(),
        loginPage.labelInputLogInPassword.textContent(),
        loginPage.labelInputNewAccPassword.textContent()
    ]);
    logArrayText(inputHeaders);
});

function logArrayText(myArray: (string | null)[]) {
    for (let x of myArray) {
        x = x == null ? "" : x;
        x = x.includes(" *Wymagane") ? "" : x.slice(0, -10);
        console.log(x);
    }
}

//npx playwright test -g "Get my account page textfield headers" --project chromium --headed