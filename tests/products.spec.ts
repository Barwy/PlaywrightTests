import { expect, test } from 'playwright/test';
import { LandingPage } from './pages/landingPage';
import { ProductListings } from './pages/productListingsPage';
import { productToPrice } from './data/mapProductToPrice'

test('Check product prices', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const productListings = new ProductListings(page);

    await landingPage.openLandingPage();
    await landingPage.btnClickMenu("Sklep").click();

    const numberOfCategories = await productListings.btnProductCategory.count();
    const listOfProductCategories = new Array();
    for (let i = 0; i < numberOfCategories; i++) {
        let categoryNames = await productListings.btnProductCategory.nth(i).innerText();
        listOfProductCategories.push(categoryNames);
    }

     for (let x of listOfProductCategories) {
        await productListings.btnProductCategory.getByText(listOfProductCategories.at(x)).click();
        await expect(productListings.productName);
        console.log("\n" + listOfProductCategories.at(x));

        let numberOfProductsDisplayed = await productListings.productName.count();
        for (let n = 0; n < numberOfProductsDisplayed; n++) {
            await productListings.productName.nth(n).scrollIntoViewIfNeeded;
            let productName: string = await productListings.productName.nth(n).innerText();
            let productPrice: string = await productListings.productPrice.nth(n).innerText();
            if (productPrice.slice(0, -3) === productToPrice.get(productName)) {
                console.log(`${n + 1}/${numberOfProductsDisplayed} Prices match for: ${productName}`);
            } else {
                console.log(`${n + 1}/${numberOfProductsDisplayed} Prices do not match for: ${productName}`);
            }
        }
    }
});

//npx playwright test -g "Check product prices" --project chromium --headed