import { expect, test } from 'playwright/test';
import { LandingPage } from './pages/landingPage';
import { ProductListings } from './pages/productListingsPage';
import { productToPrice } from './data/mapProductToPrice'

//npx playwright test -g "Check product prices" --project chromium --headed
test('Check product prices', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const productListings = new ProductListings(page);
    //Open landing page
    await landingPage.openLandingPage();
    await landingPage.btnClickMenu("Sklep");
    //Create array product of categories
    let failsCount: number = 0;
    const numberOfCategories = await productListings.btnProductCategory.count();
    const listOfProductCategories = new Array();
    for (let i = 0; i < numberOfCategories; i++) {
        let categoryNames = await productListings.btnProductCategory.nth(i).innerText();
        listOfProductCategories.push(categoryNames);
    }
    //Open product category and check prices of products
    for (let x of listOfProductCategories) {
        await productListings.btnProductCategory.getByText(listOfProductCategories.at(x)).click();
        await expect(productListings.productName);
        console.log("\n" + listOfProductCategories.at(x));
        //Check prices of products in category
        let numberOfProductsDisplayed = await productListings.productName.count();
        for (let n = 0; n < numberOfProductsDisplayed; n++) {
            await productListings.productName.nth(n).scrollIntoViewIfNeeded();
            let productName: string = await productListings.productName.nth(n).innerText();
            let productPrice: string = await productListings.productPrice.nth(n).innerText();
            productPrice = productPrice.slice(0, -3);
            if (productPrice === productToPrice.get(productName)) {
                console.log(`${n + 1}/${numberOfProductsDisplayed} Prices match for: ${productName}`);
            } else {
                console.log(`${n + 1}/${numberOfProductsDisplayed} Prices do not match for: ${productName}`);
                failsCount++;
            }
            await expect.soft(productPrice).toBe(productToPrice.get(productName));
        }
    }
    //Check number of actual-expected price mismatches
    if (failsCount > 0) {
        throw new Error(`Encountered ${failsCount} fail(s). Please see the report for details.`);
    }
});

//npx playwright test -g "Open random product" --project chromium --headed
test('Open random product', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const productListings = new ProductListings(page);
    //Open landing page
    await landingPage.openLandingPage();
    await landingPage.btnClickMenu("Sklep");
    //Open random category
    const numberOfCategories: number = await productListings.btnProductCategory.count();
    const randomCategoryNumber: number = Math.floor(Math.random() * numberOfCategories);
    const categoryName: string = await productListings.btnProductCategory.nth(randomCategoryNumber).innerText();
    await productListings.btnProductCategory.getByText(categoryName).click();
    //Open random product page
    const numberOfProductsDisplayed: number = await productListings.productName.count();
    const randomProductNumber: number = Math.floor(Math.random() * numberOfProductsDisplayed);
    await productListings.productName.nth(randomProductNumber).scrollIntoViewIfNeeded();
    const randomProductName: string = await productListings.productName.nth(randomProductNumber).innerText();
    await productListings.productName.nth(randomProductNumber).click();
    console.log(`Catetgory: ${categoryName}; Product: ${randomProductName}.`);
});