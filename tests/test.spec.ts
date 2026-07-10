import { expect, test } from 'playwright/test';
import { LandingPage } from './pages/landingPage';
import { ProductListings } from './pages/productListingsPage';
import { readExcelCell, readExcelRow, writeExcelRow, writeToExcelCell } from './utils/excelManager';

test('Check if excel functions work', async ({ page }) => {
    //await writeToExcelCell("output.xlsx", "Arkusz1", "D1", "Rome");
    const cellValue = await readExcelCell("output.xlsx", "Arkusz1", "D1");
    console.log(`I live in ${cellValue}`);
    const user = await readExcelCell('output.xlsx', 'Users', 'A2');
    console.log(user);

    await writeExcelRow("output.xlsx", "Arkusz1", 3, "Amy", "Ben", "Charlie");
    const cellValues = await readExcelRow("output.xlsx", "Arkusz1", 3);
    console.log(cellValues);
    console.log(`My name is ${cellValues[0]}, this is ${cellValues[1]} and that's ${cellValues[2]}.`);
});
//npx playwright test -g "Check if excel functions work" --project chromium --headed





test('Try out', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const productListingsPage = new ProductListings(page);

    await page.goto('https://fakestore.testelka.pl/product-category/windsurfing/');
    await page.locator('[id="secondary"] > [id="woocommerce_product_categories-3"] > ul > li').scrollIntoViewIfNeeded;
    let categoryNames2 = await page.locator('[class="product-categories"] > li[class] > a').nth(1).innerText();
    console.log(categoryNames2);

    await page.waitForTimeout(3000);

});

'[id="secondary"] > [id="woocommerce_product_categories-3"] > ul > li'

//npx playwright test -g "Try out" --project chromium --headed
