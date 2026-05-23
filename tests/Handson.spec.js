import {expect, test}from '@playwright/test';
import dotenv from 'dotenv';  //.env declaration
dotenv.config();
test('Testcase_Name', async ({browser})=>  //browser declaration
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
await expect(page.locator('#modalLoginTab')).toBeVisible();
await page.locator('#modalLoginTab').click();
const LoginForm = page.locator('#modalLoginForm');
await expect(LoginForm).toContainText('Welcome Back');
await expect(LoginForm).toContainText('Login to access your API key and dashboard');
await page.locator('#loginUsername').fill(process.env.USERNAME_OR_EMAIL); //test data from .env
await page.locator('#loginPassword').fill(process.env.PASSWORD);
await page.locator('[type="submit"]').first().click();
await expect(page).toHaveTitle(title);

//switch tab
const [newPage] = await Promise.all([
context.waitForEvent('page'),
await page.locator('//a[@href="/sandbox/index.html"]').click()]);

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
//Native Dropdowns - use "selectOption method"
await newPage.locator('#nativeSelect').selectOption('Ruby');
await newPage.waitForLoadState('load');
await expect(newPage.locator('#nativeValue')).toHaveText('Selected: ruby');
//Custom Dropdowns - use click and select
await newPage.locator('#customDropdownBtn').click();
await newPage.getByTestId('dropdown-item-angular').click();
await expect(newPage.locator('#customValue')).toHaveText('Selected: angular');
//Searchable Dropdown
await newPage.locator('#searchInput').fill('Australia');
await newPage.getByTestId('search-option-0').click();
await expect(newPage.locator('#searchValue')).toHaveText('Selected: Australia');
//Multi-Select with Chips
await newPage.getByTestId('multi-option-sql').click();
await expect (newPage.locator('.chip')).toBeVisible();
await expect (newPage.getByTestId('chip-sql')).toBeVisible();
//Dependent Dropdowns
await expect (newPage.locator('#citySelect')).toBeDisabled(); //child dropdown
await newPage.locator('#countrySelect').selectOption('United Kingdom');  //parent dropdown
await newPage.waitForLoadState('load');
await expect (newPage.locator('#citySelect')).toBeEnabled();
await newPage.locator('#citySelect').selectOption('Birmingham');
await expect(newPage.locator('#dependentValue')).toHaveText('Selected: uk - birmingham');
//Autocomplete with Debounce - suggestion-item
await newPage.locator('#autocompleteInput').fill('Sony');
await newPage.waitForLoadState('load');
await newPage.locator('.suggestion-item').click();
await expect(newPage.getByTestId('autocomplete-value')).toHaveText('Selected: Sony');
//Alert - code need to be done here.
await newPage.getByTestId(btn_BackToSandbox).click();
await newPage.locator('.module-title:has-text("Data Tables")').click();  //*[@class='module-title' and text()="Data Tables"]
await newPage.waitForLoadState('load');
await newPage.locator('[aria-label="Search table"]').fill('Diana');
await newPage.waitForLoadState('load');
console.log(await newPage.locator('.expandable-row').count());
await newPage.getByRole('button', { name:'Edit'}).click();               //button[text()="Edit"]
await expect(newPage.getByTestId('bulk-delete-button')).toBeDisabled();
await newPage.locator('.row-checkbox').first().check();
await newPage.waitForLoadState('load');
await expect(newPage.getByTestId('bulk-delete-button')).toBeEnabled();
await newPage.getByRole('cell').nth(2).click();
await expect(newPage.locator('.details-content')).toBeVisible();
// clear
await newPage.locator('[aria-label="Search table"]').clear();
await newPage.locator('[aria-label="Search table"]').fill('Jo');
//count
console.log(await newPage.locator('.expandable-row').count());
await newPage.getByTestId(btn_BackToSandbox).click();
await newPage.locator('.module-title:has-text("Modals & Overlays")').click();
await newPage.waitForLoadState('domcontentloaded');
//Modal Dialogs
await newPage.getByTestId('btn-open-modal').click();
let popup_text = await newPage.locator('#modalBody').textContent();
console.log(popup_text);
await expect(newPage.locator('#modalActionBtn')).toHaveText('Confirm');
await expect(newPage.locator('#modalCancelBtn')).toHaveText('Cancel');
await newPage.locator('#modalActionBtn').click();
await newPage.waitForLoadState('domcontentloaded');
await expect(newPage.locator('.toast-title', {hasText: 'Action Confirmed'} )).toBeVisible();
await expect(newPage.locator('.toast-message', {hasText: 'Your action has been completed successfully.'})).toBeVisible();
//Tooltips :Hover over
await newPage.getByText('Hover me').hover();
await expect(newPage.getByText('This is a tooltip!')).toBeVisible();
await newPage.getByText('Info icon').hover();
await expect(newPage.getByText('Additional information here')).toBeVisible();
await newPage.getByText('Help text').hover();
await expect(newPage.getByText('Click for more details')).toBeVisible();
//Popover
await newPage.getByLabel('Toggle popover').click();
await newPage.waitForLoadState('domcontentloaded');
//await expect(newPage.locator('.popover visible')).toBeVisible();
await expect(newPage.getByTestId('popover-header')).toHaveText('Popover Title');
await expect(newPage.getByTestId('popover-body')).toHaveText('This is a popover with more detailed information. It stays open until you click outside or close it.');
await newPage.getByLabel('Toggle popover').click();
//Toast Notification
await newPage.locator('#showSuccessToast').click();
await expect(newPage.locator('.toast-title', {hasText: 'Success!'})).toBeVisible();
await expect(newPage.locator('.toast-message', {hasText: 'Your operation completed successfully.'})).toBeVisible();
await newPage.locator('#showErrorToast').click();
await expect(newPage.locator('.toast-title', {hasText: 'Error!'})).toBeVisible();
await expect(newPage.locator('.toast-message', {hasText: 'Something went wrong. Please try again.'})).toBeVisible();
await newPage.locator('#showInfoToast').click();
await expect(newPage.locator('.toast-title', {hasText: 'Information'})).toBeVisible();
await expect(newPage.locator('.toast-message', {hasText: 'Here is some useful information for you.'})).toBeVisible();
await newPage.getByTestId(btn_BackToSandbox).click();




});
