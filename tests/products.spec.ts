import {test} from 'playwright/test';
import { LandingPage } from './pages/landingPage';

test('Check product prices', async ({page}) => {
const landingPage = new LandingPage(page);

await landingPage.openLandingPage();
await page.locator('[id="menu-item-198"]').click();
await page.locator('[class="product-categories"]').getByText('Windsurfing').click();
await page.waitForTimeout(15000);

});

//npx playwright test -g "Check product prices" --project chromium --headed

/*
[DONE] Open store page
[DONE] go to store
[DONE] open a category
[todo] check products' prices by product names using the map
[todo] create array of product catogories
[todo] create a loop that opens product categories
[todo] include checking product prices by product names using the map in the loop
*/