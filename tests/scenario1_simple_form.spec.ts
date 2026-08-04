import { test, expect } from '@playwright/test';

test.describe('Test Scenario 1: Simple Form Demo', () => {
  test('Validate simple form message display', async ({ page }) => {
    // Step 1: Open Selenium Playground
    await page.goto('https://www.testmuai.com/selenium-playground/');

    // Step 2: Click "Simple Form Demo" using Role/Text locator
    await page.getByRole('link', { name: 'Simple Form Demo', exact: true }).click();
    await page.waitForLoadState('load');
    await page.waitForFunction(() => (window as any).next?.router, { timeout: 5000 }).catch(() => {});

    // Step 3: Validate that the URL contains "simple-form-demo"
    await expect(page).toHaveURL(/.*simple-form-demo/);

    // Step 4: Create a variable for a string value
    const customMessage = 'Welcome to TestMu AI';

    // Step 5: Enter value in "Enter Message" input using precise CSS tag+ID locator
    const messageInput = page.locator('input#user-message');
    await messageInput.fill(customMessage);

    // Step 6: Click "Get Checked Value" button using CSS Button ID locator
    const showInputBtn = page.locator('button#showInput');
    await showInputBtn.click();

    // Step 7: Validate whether the same text message is displayed under "Your Message:"
    const messageDisplay = page.locator('p#message');
    await expect(messageDisplay).toHaveText(customMessage);
  });
});
