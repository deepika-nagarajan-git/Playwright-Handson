import {test,expect}from '@playwright/test';

test.describe('storageState_Sample', ()=>{
    test.use({storageState : 'auth.json'});
    test('Login', async({page})=>{
        await page.goto('https://www.qacloud.dev/profile.html'); //launch url
        const btn_login = page.locator('#loginButton');  //id locator
        await expect(btn_login).toBeVisible(); 
        await expect(btn_login).toHaveText('Login / Register');  
        await btn_login.click();
        let title = await page.title();  //get page title
        console.log(`Title of the page is ${title}`);   //concating string and variable
        await expect(page.locator('#modalLoginTab')).toBeVisible();
        await page.locator('#modalLoginTab').click();
        const LoginForm = page.locator('#modalLoginForm');
        await expect(LoginForm).toContainText('Welcome Back');
        await expect(LoginForm).toContainText('Login to access your API key and dashboard');
        await page.locator('#loginUsername').fill('deepikanagarajancareer@gmail.com'); //test data from .env
        await page.locator('#loginPassword').fill('Luffy-Kun2017.');
        await page.locator('[type="submit"]').first().click();
        await page.waitForLoadState('networkidle');
        await page.context().storageState({path: 'auth.json'});
        
    });

    test('Implementing StorageState', async({browser})=>{
        const context = await browser.newContext({storageState:'auth.json'});
        const page=await context.newPage();
        await page.goto('https://www.qacloud.dev/profile.html'); //re-launch url
        await expect(page.getByText('🔗 Open App').nth(5)).toBeVisible();

    });

    test('Implementing StorageState using test use', async({page})=>{
        await page.goto('https://www.qacloud.dev/profile.html'); //re-launch url
        await expect(page.getByText('🔗 Open App').nth(5)).toBeVisible();

    });
});

test.describe('Switching_MultipleTabs', ()=>{
test.use({storageState:'auth.json'});

test('Creating multiple tabs and switching through them', async({page,context})=>{
    await page.goto('https://www.qacloud.dev/profile.html');
    //opening tab one.
    const [page1] = await Promise.all([
    context.waitForEvent('page'),
    page.getByText('🔗 Open App').first().click() 
    ]);
    console.log(page1.url());

    //opening tab two.
    const[page2]=await Promise.all([
     context.waitForEvent('page'),
     page.getByText('🔗 Open App').nth(1).click()   
    ]);
    console.log(page2.url());

    //opening tab three.
    const [page3]=await Promise.all([
     page.waitForEvent('popup'),
     page.getByText('🔗 Open App').nth(2).click()   
    ]);
    console.log(page3.url());

    const Total_Pages=context.pages();
    console.log(`Total number of tabs opened ${Total_Pages.length}`);
    //loop through "for of loop"
    for(const p of Total_Pages){
        console.log(p.url());
        console.log(await p.title());
    }

    const Attribute = await page2.getByText('PENDING_REVIEW').getAttribute('class');
    console.log(Attribute);  
    
});

});

test.describe('Frames and alert', ()=>{
    test.use({storageState : 'auth.json'});
    test('Iframe and Alert', async({page,context})=>{
    await page.goto('https://www.qacloud.dev/profile.html');
    const [App8th]=await Promise.all([
        context.waitForEvent('page'),
        page.getByText('Open App').nth(8).click()
    ]);  
    await App8th.getByText('Locator Practice').click();
    const iFramePage = App8th.frameLocator('#testFrame');
    await expect(iFramePage.locator('#iframeSubmitBtn')).toBeVisible();
    await expect(iFramePage.locator('#iframeSubmitBtn')).toBeEnabled();
    //type1
    const AlertEvent2 = App8th.waitForEvent('dialog');
    iFramePage.locator('#iframeSubmitBtn').click();
    const Alert2 = await AlertEvent2;
    console.log(Alert2.message());
    await Alert2.accept();

    //type2
    page.on('dialog', async dialog =>{
        console.log(dialog.message());
        await dialog.accept();
    });
    await iFramePage.locator('#iframeSubmitBtn').click();
    });
});

