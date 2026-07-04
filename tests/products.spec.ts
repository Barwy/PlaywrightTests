import { test } from 'playwright/test';
import { LandingPage } from './pages/landingPage';
import { ProductListings } from './pages/productListingsPage';
import { productToPrice } from './data/mapProductToPrice'

test('Check product prices', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const productListingsPage = new ProductListings(page);

    await landingPage.openLandingPage();
    await page.locator('[class="menu nav-menu"]').getByText('Sklep').click();

    const numberOfCategories = await page.locator('[class="product-categories"]').locator("li[class]").count();
    const listOfProductCategories = new Array();
    for (let i = 0; i < numberOfCategories; i++) {
        let categoryNames = await page.locator('[class="product-categories"] > li[class] > a').nth(i).innerText();
        listOfProductCategories.push(categoryNames);
    }

    for (let i = 0; i < listOfProductCategories.length; i++) {
        await page.locator('[class="product-categories"]').getByText(listOfProductCategories.at(i)).click();
        await page.waitForTimeout(2000); //Add wait for element
        console.log("\n"+listOfProductCategories.at(i));

        let numberOfProductsDisplayed = await productListingsPage.getProductName().count();
        for (let n = 0; n < numberOfProductsDisplayed; n++) {
            await productListingsPage.getProductName().nth(n).scrollIntoViewIfNeeded;
            let productName: string = await productListingsPage.getProductName().nth(n).innerText();
            let productPrice: string = await productListingsPage.getProductPrice().nth(n).innerText();
            if (productPrice.slice(0, -3) === productToPrice.get(productName)) {
                console.log(`${n+1}/${numberOfProductsDisplayed} Prices match for: ${productName}`);
            } else {
                console.log(`${n+1}/${numberOfProductsDisplayed} Prices do not match for: ${productName}`);
            }
        }
    }
});

//npx playwright test -g "Check product prices" --project chromium --headed