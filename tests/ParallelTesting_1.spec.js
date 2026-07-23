import{expect,test}from'@playwright/test';
test.describe.configure({mode: 'parallel'});

test('Testcase1.1',async({page})=>{
    await page.goto('https://www.saucedemo.com/');
});

test('Testcase1.2',async({page})=>{
await page.goto('https://parabank.parasoft.com/parabank/index.htm');
});

test('Testcase1.3', async({page})=>{
await page.goto('https://www.qacloud.dev/');
});