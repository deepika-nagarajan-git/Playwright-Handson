const{test,expect}=require('@playwright/test');
test('sample',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://testautomationcentral.com/demo/links.html');
    await page.locator('//*[text()="External Link"]').first().isVisible();
    await page.locator('//*[text()="External Link"]').first().click();
    await page.locator('//*[text()="Go to Example.com"]').isVisible();
    

    const [newPage]=await Promise.all([
        page.context().waitForEvent('page'),
        page.locator('//*[text()="Go to Example.com"]').click()
        ]);

    const split_text = await newPage.locator('(//p)[1]').textContent();
    const newy = split_text.split('.');
    console.log(newy);
    
    await newPage.screenshot();
    await page.locator('//*[@id="external-message"]').isVisible();
    await page.locator('(//*[text()="Textboxes"])[1]').isVisible();
    await page.locator('(//*[text()="Textboxes"])[1]').click();
    await page.pause();
    await page.locator('(//h3[@class="text-xl font-semibold mb-2"])[1]').isVisible();
    console.log (await page.locator('(//h3[@class="text-xl font-semibold mb-2"])[1]').textContent());
    await page.locator('[placeholder="Enter text"]').fill('Hi there, we are testing input value function');
    console.log(await page.locator('[placeholder="Enter text"]').inputValue());


});