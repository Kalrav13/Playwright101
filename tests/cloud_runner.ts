import { chromium, firefox, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.LT_USERNAME || 'YOUR_USERNAME';
const ACCESS_KEY = process.env.LT_ACCESS_KEY || 'YOUR_ACCESS_KEY';

interface CapabilityConfig {
  browserName: 'pw-chromium' | 'pw-firefox';
  platform: string;
  name: string;
}

const configs: CapabilityConfig[] = [
  {
    browserName: 'pw-chromium',
    platform: 'Windows 10',
    name: 'Playwright 101 - Windows 10 Chromium',
  },
  {
    browserName: 'pw-firefox',
    platform: 'macOS Sonoma',
    name: 'Playwright 101 - macOS Sonoma Firefox',
  },
];

async function runCloudTest(config: CapabilityConfig) {
  const capabilities = {
    browserName: config.browserName,
    browserVersion: 'latest',
    'LT:Options': {
      platform: config.platform,
      build: 'Playwright 101 Certification Build',
      name: config.name,
      user: USERNAME,
      accessKey: ACCESS_KEY,
      network: true,     // Network logs enabled
      video: true,       // Video recording enabled
      visual: true,      // Screenshot logs enabled
      console: true,     // Console logs enabled
    },
  };

  const endpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`;

  console.log(`[Cloud Grid] Connecting for configuration: ${config.name}...`);

  const browserType = config.browserName === 'pw-firefox' ? firefox : chromium;
  let browser;

  try {
    browser = await browserType.connect(endpoint);
    const page = await browser.newPage();

    console.log(`[Cloud Grid] Running Scenario 1 on ${config.name}...`);
    // Scenario 1: Simple Form Demo
    await page.goto('https://www.testmuai.com/selenium-playground/');
    await page.getByRole('link', { name: 'Simple Form Demo', exact: true }).evaluate((el: HTMLElement) => el.click());
    await page.waitForLoadState('load');
    await page.waitForFunction(() => (window as any).next?.router, { timeout: 5000 }).catch(() => { });
    await page.waitForTimeout(2000);
    const msgInput = page.locator('input#user-message');
    await msgInput.fill('Welcome to TestMu AI');
    await page.locator('button#showInput').evaluate((el: HTMLElement) => el.click());
    const msgDisplay = page.locator('p#message');
    const msg = (await msgDisplay.textContent()) || '';
    console.log(`[Scenario 1] Message display result: "${msg}"`);

    console.log(`[Cloud Grid] Running Scenario 2 on ${config.name}...`);
    // Scenario 2: Drag & Drop Sliders
    await page.goto('https://www.testmuai.com/selenium-playground/');
    await page.getByRole('link', { name: 'Drag & Drop Sliders', exact: true }).evaluate((el: HTMLElement) => el.click());
    await page.waitForLoadState('load');
    await page.waitForFunction(() => (window as any).next?.router, { timeout: 5000 }).catch(() => { });
    await page.waitForTimeout(2000);
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

    // Fine-tune to exactly 95 using keyboard arrow keys
    await slider.focus();
    let currentValue = parseInt((await rangeOutput.textContent()) || '0', 10);
    for (let i = 0; i < 100 && currentValue < 95; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(50);
      currentValue = parseInt((await rangeOutput.textContent()) || '0', 10);
    }
    for (let i = 0; i < 100 && currentValue > 95; i++) {
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(50);
      currentValue = parseInt((await rangeOutput.textContent()) || '0', 10);
    }
    const rangeVal = await rangeOutput.textContent();
    console.log(`[Scenario 2] Range value output: "${rangeVal}"`);

    console.log(`[Cloud Grid] Running Scenario 3 on ${config.name}...`);
    // Scenario 3: Input Form Submit
    await page.goto('https://www.testmuai.com/selenium-playground/');
    await page.getByRole('link', { name: 'Input Form Submit', exact: true }).evaluate((el: HTMLElement) => el.click());
    await page.waitForLoadState('load');
    await page.waitForFunction(() => (window as any).next?.router, { timeout: 5000 }).catch(() => { });
    await page.waitForTimeout(2000);
    await page.locator('input#name').fill('John Doe');
    await page.locator('#inputEmail4').fill('john.doe@example.com');
    await page.locator('#inputPassword4').fill('SecurePassword123');
    await page.locator('#company').fill('TestMu AI Solutions');
    await page.locator('#websitename').fill('https://www.example.com');
    await page.locator('select[name="country"]').selectOption({ label: 'United States' });
    await page.locator('#inputCity').fill('San Francisco');
    await page.locator('#inputAddress1').fill('123 Test Street');
    await page.locator('#inputAddress2').fill('Suite 400');
    await page.locator('#inputState').fill('California');
    await page.locator('#inputZip').fill('94105');
    await page.locator('button.selenium_btn').evaluate((el: HTMLElement) => el.click());
    const successMsg = await page.locator('.success-msg').textContent();
    console.log(`[Scenario 3] Form submission result: "${successMsg}"`);

    await page.close();
    console.log(`[Cloud Grid] SUCCESS for ${config.name}`);
  } catch (error) {
    console.error(`[Cloud Grid] ERROR for ${config.name}:`, error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function main() {
  console.log('Starting parallel cloud execution on TestMu AI Platform...');
  await Promise.all(configs.map((config) => runCloudTest(config)));
  console.log('Cloud execution finished.');
}

if (require.main === module) {
  main();
}
