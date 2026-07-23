const {test,expect}=require('@playwright/test');
test.only('RadioButton', async ({page})=>
{
    await page.goto('https://testautomationcentral.com/demo/radiobuttons.html');
    //radio button checked
    await page.locator('//h2[text()="Radio Buttons"]').isVisible();
    await page.locator('//h3[text()="Simple Radio Buttons"]').isVisible();
    await page.locator('//input[@type="radio"]').first().click();
    await page.locator('//*[text()="Option B"]').click();
    await expect(page.locator('//*[text()="Option B"]')).toBeChecked();
    console.log(await page.locator('//*[text()="Option B"]').isChecked());
    await page.locator('//input[@type="radio"]').last().click();
    await page.locator('//input[@type="radio"]').nth(4).click();
    expect(await page.locator('//input[@type="radio"]').nth(4)).toBeChecked();
    console.log(await page.locator('//input[@type="radio"]').nth(4).isChecked());
    //radio button unchecked
    await page.locator('//input[@type="radio"]').nth(3).uncheck();
    expect(console.log(await page.locator('//input[@type="radio"]').nth(3).isChecked())).toBeFalsy();
    const check = page.locator('//*[text()="Checkboxes (Multiple Selection)"]');
    await expect(check).toHaveAttribute('class', 'block px-4 py-2 text-blue-500 hover:bg-gray-200');
    await expect(check).toHaveAttribute('href','checkboxes.html');



    



});