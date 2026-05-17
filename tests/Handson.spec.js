import {expect, test}from '@playwright/test';
import dotenv from 'dotenv';  //.env declaration
dotenv.config();
test('Testcase_Name', async ({browser})=>  //broswer declaration
{
const context = await browser.newContext(); //context declaration
await context.clearCookies();   //clearCookies
const page = await context.newPage(); //page declaration

await page.goto('https://www.qacloud.dev/profile.html'); //launch url
const btn_login = page.locator('#loginButton');  //id locator
await expect(btn_login).toBeVisible(); 
await expect(btn_login).toHaveText('Login / Register');  
await btn_login.click();
let title = await page.title();  //get page title
console.log(`Title of the page is ${title}`);   //concating string and variable
await expect(page.locator('button#modalLoginTab')).toBeVisible();
await page.locator('button#modalLoginTab').click();
const LoginForm = page.locator('#modalLoginForm');
await expect(LoginForm).toContainText('Welcome Back');
await expect(LoginForm).toContainText('Login to access your API key and dashboard');
await page.locator('input#loginUsername').fill(process.env.USERNAME_OR_EMAIL); //test data from .env
await page.locator('input#loginPassword').fill(process.env.PASSWORD);
await page.locator('[type="submit"]').first().click();
await expect(page).toHaveTitle(title);

//switch tab
const [newPage] = await Promise.all([
context.waitForEvent('page'),
await page.locator('//a[@href="/sandbox/index.html"]').click()
]);

title = await newPage.title();  
console.log(`Title of the page is ${title}`);
await newPage.getByText('Basic Forms').click();
await newPage.getByTestId('section-personal').textContent('Personal Information');
await expect (newPage.getByTestId('label-firstname')).toBeVisible();
await newPage.getByPlaceholder('Enter your first name').fill('Sachin');
await expect (newPage.getByTestId('label-lastname')).toBeVisible();
await newPage.getByPlaceholder('Enter your last name').fill('Baka');
await expect (newPage.getByTestId('label-email')).toBeVisible();
await newPage.getByPlaceholder('example@email.com').fill('SachinBaka@niya.com');
await expect (newPage.getByTestId('input-password')).toBeVisible();
await newPage.getByPlaceholder('Enter password (min 8 characters)').fill('Password1234!');
await expect(newPage.locator('.password-toggle-btn')).toBeVisible();
await newPage.getByTestId('toggle-password').click();
await expect (newPage.locator('//div[@class="form-group password-toggle"]//input[@type="text"]')).toBeVisible();
console.log(await newPage.locator('//div[@class="form-group password-toggle"]//input[@type="password"]').isVisible());
//checkboxes
await newPage.locator('input[type="checkbox"]').first().check();
await newPage.locator('input[type="checkbox"]').nth(1).check();
await newPage.locator('input[type="checkbox"]').nth(2).check();
await newPage.locator('input[type="checkbox"]').last().check();
//radio button
await newPage.locator('input[type="radio"]').last().click();
const btn_BackToSandbox = 'back-button';
await newPage.getByTestId(btn_BackToSandbox).click();
await newPage.getByText('Advanced Inputs').waitFor();
await newPage.getByText('Advanced Inputs').click();
//Phone number
await expect (newPage.getByPlaceholder('(XXX) XXX-XXXX')).toBeVisible();
await newPage.getByPlaceholder('(XXX) XXX-XXXX').fill('5152346789');
//Currency
await newPage.getByPlaceholder('$0.00').fill('450.15');
//Range slider
await newPage.locator('#rangeSlider').fill('15');
await expect (newPage.locator('#rangeValue')).toHaveText('15');
//Date - always YYYY-MM-DD
await newPage.locator('#dateInput').fill('2026-09-09');
//Time - HH:MM
await newPage.locator('#timeInput').fill('07:30');
//Toggle
await newPage.getByTestId('toggle-slider').click();
//Email
await expect (newPage.getByPlaceholder('Enter email address')).toBeVisible();
await newPage.getByPlaceholder('Enter email address').fill('sample@gmail.com');
await newPage.getByTestId('submit-button').click();
//Banner
await expect(newPage.locator('#successMessage')).toBeVisible();
await newPage.getByTestId(btn_BackToSandbox).waitFor();
await newPage.getByTestId(btn_BackToSandbox).click();
await expect (newPage.getByText('Dropdowns & Autocomplete')).toBeVisible();
await newPage.getByText('Dropdowns & Autocomplete').click();
//Native Dropdowns
await newPage.locator('#nativeSelect').selectOption('Ruby');
await newPage.waitForLoadState('load');
await expect(newPage.locator('#nativeValue')).toHaveText('Selected: ruby');
//Custom Dropdowns
await newPage.locator('#customDropdownBtn').click();
await newPage.getByTestId('dropdown-item-angular').click();
await expect(newPage.locator('#customValue')).toHaveText('Selected: angular');


});
