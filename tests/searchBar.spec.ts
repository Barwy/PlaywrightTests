import { expect, test } from 'playwright/test';
import { LandingPage } from './pages/landingPage';
import { ProductListings } from './pages/productListingsPage';
import { ProductPage } from './pages/productPage';

test('Find and open products', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const productListings = new ProductListings(page);
  const productPage = new ProductPage(page);

  await landingPage.openLandingPage();
  await landingPage.closeDemoStorePopup();
  await landingPage.searchForText('Windsurfing');

  let failsCount: number = 0;
  const countProductsFound = await productListings.btnProductDetails.count();
  console.log(`Found ${countProductsFound} products:`);
  for (let i = 0; i < countProductsFound; i++) {
    await productListings.btnProductDetails.scrollIntoViewIfNeeded;
    let listngsProductTitle: string = await productListings.productName.nth(i).innerText();
    await productListings.btnProductDetails.nth(i).click();
    await productPage.headerProductName().waitFor({ state: 'visible', timeout: 5000 });
    let productTitle: string = await productPage.headerProductName().innerText();

    if (listngsProductTitle === productTitle) {
      console.log(`Product names match: ${listngsProductTitle}`)
    } else {
      console.log(`Product names differ: ${listngsProductTitle} vs ${productTitle}`)
      failsCount++;
    }
    await expect.soft(listngsProductTitle).toBe(productTitle);
    await page.goBack();
  }
  if (failsCount > 0) {
    throw new Error(`Encountered ${failsCount} fail(s). Please see the report for details.`);
  }
});

test('Display empty search results page', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const productListings = new ProductListings(page);

  await landingPage.openLandingPage();
  await landingPage.closeDemoStorePopup();
  await landingPage.searchForText('Shoes');
  const countProductsFound = await productListings.btnProductDetails.count();
  if (countProductsFound < 1) {
    console.log(`Success: ${countProductsFound} prodeucts were found!`);
  } else {
    const productsFound = new Array();
    for (let i = 0; i < countProductsFound; i++) {
      let productFound = await productListings.productName.nth(i).innerText();
      productsFound.push(productFound);
    }
    console.log(`Failure: found ${countProductsFound} product(s): ${productsFound}`);
  }
  await expect(productListings.btnProductDetails).toHaveCount(0);
});

//npx playwright test -g "Find and open products" --project chromium --headed
//npx playwright test -g "Display empty search results page" --project chromium --headed