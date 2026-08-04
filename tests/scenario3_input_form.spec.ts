import { test, expect } from '@playwright/test';

test.describe('Test Scenario 3: Input Form Submit', () => {
  test('Submit form validation and successful submission', async ({ page }) => {
    // Step 1: Open Selenium Playground
    await page.goto('https://www.testmuai.com/selenium-playground/');

    // Click "Input Form Submit" using Link locator
    await page.getByRole('link', { name: 'Input Form Submit', exact: true }).click();
    await page.waitForLoadState('load');
    await page.waitForFunction(() => (window as any).next?.router, { timeout: 5000 }).catch(() => {});
    await expect(page).toHaveURL(/.*input-form-demo/);

    // Step 2: Click "Submit" without filling in any information in the form
    const submitButton = page.locator('button.selenium_btn');
    await submitButton.click();

    // Step 3: Assert "Please fill in the fields" / HTML5 validation error message
    const nameInput = page.locator('input#name');
    const validationMessage = await nameInput.evaluate(
      (element: HTMLInputElement) => element.validationMessage
    );
    expect(validationMessage).toBeTruthy();
    expect(validationMessage.length).toBeGreaterThan(0);

    // Step 4: Fill in Name, Email, Password, Company, Website, City, Address1, Address2, State, Zip Code
    await nameInput.fill('John Doe');
    await page.locator('#inputEmail4').fill('john.doe@example.com');
    await page.locator('#inputPassword4').fill('SecurePassword123');
    await page.locator('#company').fill('TestMu AI Solutions');
    await page.locator('#websitename').fill('https://www.example.com');

    // Step 5: From Country drop-down, select "United States" using label (text property)
    const countrySelect = page.locator('select[name="country"]');
    await countrySelect.selectOption({ label: 'United States' });

    await page.locator('#inputCity').fill('San Francisco');
    await page.locator('#inputAddress1').fill('123 Test Street');
    await page.locator('#inputAddress2').fill('Suite 400');
    await page.locator('#inputState').fill('California');
    await page.locator('#inputZip').fill('94105');

    // Step 6: Click "Submit" after filling all fields
    await submitButton.click();

    // Step 7: Validate the success message "Thanks for contacting us, we will get back to you shortly."
    const successMessage = page.locator('.success-msg');
    await expect(successMessage).toHaveText('Thanks for contacting us, we will get back to you shortly.');
  });
});
