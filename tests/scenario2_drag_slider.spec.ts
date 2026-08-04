import { test, expect } from '@playwright/test';

test.describe('Test Scenario 2: Drag & Drop Sliders', () => {
  test('Drag slider from default 15 to 95 and validate range output', async ({ page }) => {
    // Step 1: Open Selenium Playground
    await page.goto('https://www.testmuai.com/selenium-playground/');

    // Click "Drag & Drop Sliders" using Link locator
    await page.getByRole('link', { name: 'Drag & Drop Sliders', exact: true }).click();
    await page.waitForLoadState('load');
    await page.waitForFunction(() => (window as any).next?.router, { timeout: 5000 }).catch(() => {});
    await expect(page).toHaveURL(/.*drag-drop-range-sliders-demo/);

    // Step 2: Select the slider "Default value 15"
    const slider = page.locator('input[type="range"][value="15"]');
    const rangeOutput = page.locator('#rangeSuccess');

    // Drag the slider using mouse movement towards 95
    const sliderBox = await slider.boundingBox();
    if (sliderBox) {
      const startX = sliderBox.x + sliderBox.width * (15 / 100);
      const targetX = sliderBox.x + sliderBox.width * (95 / 100);
      const centerY = sliderBox.y + sliderBox.height / 2;

      await page.mouse.move(startX, centerY);
      await page.mouse.down();
      await page.mouse.move(targetX, centerY);
      await page.mouse.up();
    }

    // Fine-tune to exactly 95 using keyboard arrow keys if needed
    await slider.focus();
    let currentValue = parseInt((await rangeOutput.textContent()) || '0', 10);
    while (currentValue < 95) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(50);
      currentValue = parseInt((await rangeOutput.textContent()) || '0', 10);
    }
    while (currentValue > 95) {
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(50);
      currentValue = parseInt((await rangeOutput.textContent()) || '0', 10);
    }

    // Validate whether the range value shows 95
    await expect(rangeOutput).toHaveText('95');
  });
});
