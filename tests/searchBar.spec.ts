import {expect, test} from 'playwright/test';
import { LandingPage } from './pages/landingPage';
import { ProductListings } from './pages/productListingsPage';

test('Find and open products', async ({ page }) =>{
const landingPage = new LandingPage(page);
const productsPage = new ProductListings(page);
  
await landingPage.openLandingPage();
await landingPage.closeDemoStorePopup();
await landingPage.searchForText("Windsurfing");

const countProductsFound = await productsPage.getBtnProductDetails().count();
console.log(`Found ${countProductsFound} products:`);

for (let i = 0; i < countProductsFound; i++) {
  await productsPage.getBtnProductDetails().scrollIntoViewIfNeeded;
  let displayedProductTitle: string = await productsPage.getProductName().nth(i).innerText();
   console.log(`Title displayed in offers found: ${displayedProductTitle}`);
  await productsPage.getBtnProductDetails().nth(i).click();
  await page.locator(productName()).waitFor({state: 'visible', timeout: 5000});
  let holidayname: string = await page.locator(productName()).innerText();
  console.log(`Product name in the offer: ${holidayname}`);
  await page.goBack();
}
});

const productName = () => '[class="product_title entry-title"]';

//npx playwright test --project chromium --headed