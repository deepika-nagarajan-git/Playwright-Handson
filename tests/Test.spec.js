// ...existing code...
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should login with valid credentials', async ({ page }) => {
    const username = process.env.TEST_USER || 'user@example.com';
    const password = process.env.TEST_PASS || 'password123';

    await page.goto('https://www.qacloud.dev/profile.html');

    const btnLogin = page.locator('#loginButton');
    await expect(btnLogin).toBeVisible();
    await expect(btnLogin).toHaveText(/Login/i);
    await btnLogin.click();

    await expect(page.locator('#modalLoginTab')).toBeVisible();
    await page.locator('#modalLoginTab').click();

    const loginForm = page.locator('#modalLoginForm');
    await expect(loginForm).toContainText('Welcome Back');

    await page.locator('#loginUsername').fill(username);
    await page.locator('#loginPassword').fill(password);
    await page.locator('[type="submit"]').first().click();

    // wait for potential navigation or UI update after login
    await page.waitForLoadState('networkidle');

    // verify the login modal is closed (or replace with a more specific post-login check)
    await expect(loginForm).not.toBeVisible();
  });
});
// ...existing code...