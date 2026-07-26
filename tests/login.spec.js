const {test,expect}=require('@playwright/test');
test.only('Login', async ({page})=>
{
 await page.goto("https://www.saucedemo.com/");
 console.log(await page.title()); //print title of the page
 await expect(page).toHaveTitle("Swag Labs"); //assert title of the page
 await page.locator('input#user-name').fill('standard_user');
 await page.locator('input#password').fill('secret_saucey');
 await page.locator('input#login-button').click();
 await page.locator('//*[text()="Epic sadface: Username and password do not match any user in this service"]').isVisible();
 //await page.locator('input#password').clear();
 await page.locator('input#password').fill('secret_sauce');
 await page.locator('input#login-button').click();
 console.log (await page.locator('(//div[@class="inventory_item_name "])[1]').textContent());
 await page.locator('(//div[@class="inventory_item_name "])[1]').click();
 await expect (page.locator('//*[@data-test="inventory-item-name"]')).toContainText('Backpack');
 await page.goBack();
 const variable = page.locator('div.inventory_item_name');
 await page.locator('div.inventory_item_name').first().waitFor();
 await page.waitForLoadState('load');
 await page.waitForLoadState('networkidle');
 await page.waitForLoadState('domcontentloaded');
 console.log(await variable.allTextContents());
 console.log(await variable.last().textContent());
 console.log(await variable.nth(3).textContent());
 await page.locator('//*[@class="product_sort_container"]').selectOption('Name (Z to A)');
 
 await page.pause();




});
