import {expect, test} from 'playwright/test';
import { LandingPage } from './pages/landingPage';
import { ProductListings } from './pages/productListingsPage';
import { ProductPage } from './pages/productPage';

test('Find and open products', async ({ page }) =>{
const landingPage = new LandingPage(page);
const productListings = new ProductListings(page);
const productPage = new ProductPage(page);
  
await landingPage.openLandingPage();
await landingPage.closeDemoStorePopup();
await landingPage.searchForText("Windsurfing");

const countProductsFound = await productListings.getBtnProductDetails().count();
console.log(`Found ${countProductsFound} products:`);
for (let i = 0; i < countProductsFound; i++) {
  await productListings.getBtnProductDetails().scrollIntoViewIfNeeded;
  let listngsProductTitle: string = await productListings.getProductName().nth(i).innerText();
  await productListings.getBtnProductDetails().nth(i).click();
  await productPage.headerProductName().waitFor({state: 'visible', timeout: 5000});
  let productTitle: string = await productPage.headerProductName().innerText();
  
  if (listngsProductTitle === productTitle) {
    console.log(`Product names match: ${listngsProductTitle}`)
  } else {
    console.log(`Product names differ: ${listngsProductTitle} vs ${productTitle}`)
  }
  await page.goBack();
}
});

//npx playwright test -g "Find and open products" --project chromium --headed