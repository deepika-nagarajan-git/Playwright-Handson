const{test,expect}=require('@playwright/test');
test('DynamicObject', async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    console.log(await page.title()); //print title of the page
    await expect(page).toHaveTitle("Swag Labs"); //assert title of the page
    await page.locator('input#user-name').fill('standard_user');
    await page.locator('input#password').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await expect(page.locator('//span[@data-test="title"]')).toBeVisible();
    await expect(page.locator('//*[@data-test="product-sort-container"]')).toBeVisible();
    const cart = page.locator('//*[@data-test="shopping-cart-link"]');
    await expect(cart).toBeVisible();  
    const itemName = 'Sauce Labs Fleece Jacket';
    const objItem = page.locator('//*[@class="inventory_item"]');
    const count = await objItem.count();
    console.log(`count of the total product is : ${count}`);
    for(let i=0; i<count; i++){
        const text = await objItem.nth(i).textContent();
        if(text.includes(itemName)){
            console.log('item found');
            await objItem.nth(i)
           // .locator('xpath=ancestor::div[@class="inventory_item"]')
            .locator('button')
            .click();
            break;
        }
    }
    await cart.click();
    await expect(page.locator(`text=${itemName}`)).toBeVisible();

});