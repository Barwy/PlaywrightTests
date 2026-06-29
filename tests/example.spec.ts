import {test} from 'playwright/test';

test('Basic Navigation2', async ({ page }) =>{
await page.goto("https://fakestore.testelka.pl/");
await page.locator('[class="woocommerce-store-notice__dismiss-link"]').click;
await page.locator('[id="woocommerce-product-search-field-0"]').fill('windsurfing');
await page.keyboard.press('Enter');
//await page.waitForTimeout(3000);
const productSelector = '[class="woocommerce-loop-product__title"]';
await page.locator(productSelector);
const count = await page.locator(productSelector).count();
console.log(`Found ${count} elements:`);
for(let i = 0; i < count; i++) {
    let holidayName: string = await page.locator(productSelector).nth(i).innerText();
console.log(holidayName);
}
});

//npx playwright test --project chromium --headed