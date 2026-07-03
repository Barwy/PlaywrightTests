import { test } from 'playwright/test';
import { LandingPage } from './pages/landingPage';
import { ProductListings } from './pages/productListingsPage';
import { productToPrice } from './data/mapProductToPrice'

test('Check product prices', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const productListingsPage = new ProductListings(page);

    await landingPage.openLandingPage();
    await page.locator('[class="menu nav-menu"]').getByText('Sklep').click();
    await page.locator('[class="product-categories"]').getByText('Windsurfing').click();

    const numberOfProductsDisplayed = await productListingsPage.getProductName().count();
    console.log(numberOfProductsDisplayed);
    for (let i = 0; i < numberOfProductsDisplayed; i++) {
        await productListingsPage.getProductName().scrollIntoViewIfNeeded;
        let productName: string = await productListingsPage.getProductName().nth(i).innerText();
        let productPrice: string = await productListingsPage.getProductPrice().nth(i).innerText();

        //console.log(productPrice.slice(0, -3));
        if (productPrice.slice(0, -3) === productToPrice.get(productName)) {
            console.log(`Prices match for: ${productName}`);
        } else {
            console.log(`Prices do not match for: ${productName}`);
        }
    }
});

//npx playwright test -g "Check product prices" --project chromium --headed

/*
[DONE] Open store page
[DONE] go to store
[DONE] open a category
[DONE] check products' prices by product names using the map
[todo] create array of product catogories
[todo] create a loop that opens product categories
[todo] include checking product prices by product names using the map in the loop
*/