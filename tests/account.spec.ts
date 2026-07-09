import { expect, test } from 'playwright/test';

test('Get my account page textfield headers', async ({ page }) => {
    await page.goto("https://fakestore.testelka.pl/moje-konto/");

    const txtPageHeader: string = '[class="entry-title"]';

    const inputNewAccEmail: string = 'label[for="username"]';
    const inputNewAccPassword: string = 'label[for="password"]';
    const inputLogInEmail: string = 'label[for="reg_email"]';
    const inputLogInPassword: string = 'label[for="reg_password"]';

    await expect(page.locator(txtPageHeader)).toHaveText('Moje konto');

    const headers: (string | null)[] = await Promise.all([
        page.locator(inputNewAccEmail).textContent(),
        page.locator(inputNewAccPassword).textContent(),
        page.locator(inputLogInEmail).textContent(),
        page.locator(inputLogInPassword).textContent()
    ]);
    
    for(let x of headers) {
        x = x ==null ? "" : x;
        x = x.includes(" *Wymagane") ? "" : x.slice(0, -10);
        console.log(x);
        } 
});

//npx playwright test -g "Get my account page textfield headers" --project chromium --headed