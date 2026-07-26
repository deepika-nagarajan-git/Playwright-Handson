const{test, expect} = require('@playwright/test');
test('PlaceOrder',async({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');
    console.log(await page.title()); //print title of the page
    await expect(page).toHaveTitle("Swag Labs"); //assert title of the page
    await page.locator('input#user-name').fill('standard_user');
    await page.locator('input#password').fill('secret_sauce');
    await page.locator('input#login-button').click();
    await page.locator('//span[@data-test="title"]').isVisible();
    await page.locator('//*[@data-test="product-sort-container"]').isVisible();
    const cart = await page.locator('//*[@data-test="shopping-cart-link"]');
    await cart.isVisible();
    const item = await page.locator('//*[@data-test="inventory-item-name" and text()="Sauce Labs Onesie"]');
    await item.isVisible();
    await item.click();
    await page.locator('//*[@id="add-to-cart"]').isVisible();
    const dollar = await page.locator('//*[@data-test="inventory-item-price"]').textContent();
    console.log(dollar);
    const Newdollar = dollar.split('$')[1];
    console.log(Newdollar);
    await page.locator('//*[@id="add-to-cart"]').click();
    await page.locator('//*[@data-test="remove"]').isVisible();
    await cart.click();
    await expect(page.locator('//*[@data-test="inventory-item-price"]')).toHaveText(dollar); 
    await page.locator('button#checkout').isVisible();
    await page.locator('button#checkout').click();
    await expect(page.locator('//*[@data-test="title"]')).toHaveText('Checkout: Your Information');
    await page.locator('input#first-name').isVisible();
    await page.locator('input#first-name').fill('SACHIN');
    await page.locator('input#last-name').isVisible();
    await page.locator('input#last-name').fill('D MONKEY');
    await page.locator('input#postal-code').isVisible();
    await page.locator('input#postal-code').fill('600069');
    await page.locator('input#continue').isVisible();
    await page.locator('input#continue').click();
    await expect (item).toBeVisible();
    const OrderId = await page.locator('//*[@data-test="payment-info-value"]').textContent();
    const ShippedBy = await page.locator('//*[@data-test="shipping-info-value"]').textContent();
    const Tax = await page.locator('//*[@data-test="tax-label"]').textContent();
    const NewTax = Tax.split('$')[1];
    console.log(NewTax);
    const total = (parseFloat(Newdollar) + parseFloat(NewTax)).toFixed(2);
    console.log(total);
    //await expect(page.locator('//*[@data-test="total-label"]')).toContainText('$'+ total.toString());
    await expect(page.locator('//*[@data-test="total-label"]')).toContainText(`$${total}`);
    await page.locator('button#finish').isVisible();
    await page.locator('button#finish').click();
    console.log(`Your order id is ${OrderId} and it's shippied via ${ShippedBy} with Tax ${NewTax} which concludes the total as ${total}`);

});