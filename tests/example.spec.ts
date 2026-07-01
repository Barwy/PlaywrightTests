import {test} from 'playwright/test';

test('Basic Navigation2', async ({ page }) =>{
await page.goto("https://fakestore.testelka.pl/");
await page.locator('[class="woocommerce-store-notice__dismiss-link"]').click;
await page.locator('[id="woocommerce-product-search-field-0"]').fill('windsurfing');
await page.keyboard.press('Enter');
await page.waitForTimeout(1500);

const countOffersFound= await page.locator(productLink()).count();
console.log(`Found ${countOffersFound} product locators:`);

for (let i = 0; i < countOffersFound; i++) {
  await page.locator(productLink()).scrollIntoViewIfNeeded;
  let displayedProductTitle: string = await page.locator(productTitle()).nth(i).innerText();
   console.log(`Title displayed in offers found: ${displayedProductTitle}`);
  await page.locator(productLink()).nth(i).click();
  await page.locator(productName()).waitFor({state: 'visible', timeout: 5000});
  let holidayname: string = await page.locator(productName()).innerText();
  console.log(`Holiday name in the offer: ${holidayname}`);
  await page.goBack();
}
});

const productTitle = () => '[class="woocommerce-loop-product__title"]';
const productLink = () => '[class="woocommerce-LoopProduct-link woocommerce-loop-product__link"]';
const productName = () => '[class="product_title entry-title"]';

//npx playwright test --project chromium --headed