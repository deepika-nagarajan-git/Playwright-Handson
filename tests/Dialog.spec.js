import{expect,test} from '@playwright/test'
test('EventDialog', async ({browser}) => {

const context = await browser.newContext();
await context.clearCookies();
const page = await context.newPage();

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
await page.locator('#loginUsername').fill('deepikanagarajancareer@gmail.com');
await page.locator('#loginPassword').fill('Luffy-Kun2017.');
await page.locator('[type="submit"]').first().click();

const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('//a[@href="/sandbox/index.html"]').click()
    ]);

 await newPage.locator('.module-title').filter({hasText: 'Locator Practice'}).click(); 
 const Frame = newPage.frameLocator('#testFrame');
await expect (Frame.getByTestId('iframe-form-title')).toBeVisible();

const [Alert] = await Promise.all([
    newPage.waitForEvent('dialog'),
    Frame.locator('#iframeSubmitBtn').click()
]);
    await Alert.accept();
});