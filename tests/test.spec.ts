import { expect, test } from 'playwright/test';
import { LandingPage } from './pages/landingPage';
import { ProductListings } from './pages/productListingsPage';
import { ProductPage } from './pages/productPage';
import { productToPrice } from './data/mapProductToPrice';






test('Try out', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const productListingsPage = new ProductListings(page);

    await page.goto('https://fakestore.testelka.pl/product-category/windsurfing/');
    await page.locator('[id="secondary"] > [id="woocommerce_product_categories-3"] > ul > li').scrollIntoViewIfNeeded;
    let categoryNames2 = await page.locator('[class="product-categories"] > li[class] > a').nth(1).innerText();
    console.log(categoryNames2);

    await page.waitForTimeout(10000);

});

'[id="secondary"] > [id="woocommerce_product_categories-3"] > ul > li'

//npx playwright test -g "Try out" --project chromium --headed
