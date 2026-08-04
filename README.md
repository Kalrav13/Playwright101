# Playwright 101 Certification Project

This repository contains the complete solution for the **Playwright 101 Certification Assignment** by **TestMu AI (formerly LambdaTest)**.

## Project Structure

```
Playwright101/
├── .env.example                     # Environment template for TestMu AI credentials
├── .gitignore                       # Standard Git ignore file
├── package.json                     # Dependencies and test execution scripts
├── tsconfig.json                    # TypeScript compiler configuration
├── playwright.config.ts             # Playwright test configuration
├── tests/
│   ├── scenario1_simple_form.spec.ts   # Scenario 1: Simple Form Demo
│   ├── scenario2_drag_slider.spec.ts   # Scenario 2: Drag & Drop Sliders
│   ├── scenario3_input_form.spec.ts    # Scenario 3: Input Form Submit
│   └── cloud_runner.ts             # Parallel cloud grid test launcher for TestMu AI
└── README.md                        # Documentation and instructions
```

---

## Test Scenarios Summary

### 1. Scenario 1: Simple Form Demo (`tests/scenario1_simple_form.spec.ts`)
- Navigates to `https://www.testmuai.com/selenium-playground/`.
- Clicks **"Simple Form Demo"**.
- Asserts that the URL contains `simple-form-demo`.
- Enters message `"Welcome to TestMu AI"` in the input box.
- Clicks **"Get Checked Value"**.
- Asserts that the right-hand panel under **"Your Message:"** matches the entered message.

### 2. Scenario 2: Drag & Drop Sliders (`tests/scenario2_drag_slider.spec.ts`)
- Navigates to `https://www.testmuai.com/selenium-playground/`.
- Clicks **"Drag & Drop Sliders"**.
- Selects the range slider with default value `15`.
- Drags the bar to target value `95`.
- Asserts that the output display shows `95`.

### 3. Scenario 3: Input Form Submit (`tests/scenario3_input_form.spec.ts`)
- Navigates to `https://www.testmuai.com/selenium-playground/`.
- Clicks **"Input Form Submit"**.
- Clicks **"Submit"** without filling form fields to validate browser HTML5 error messages.
- Fills in all fields (Name, Email, Password, Company, Website, City, Address1, Address2, State, Zip Code).
- Selects **"United States"** from the Country dropdown using the visible text property (`label`).
- Clicks **"Submit"**.
- Asserts success message: `"Thanks for contacting us, we will get back to you shortly."`.

---

## Setup & Installation

1. **Clone repository and install dependencies**:
   ```bash
   npm install
   ```

2. **Install Playwright browsers**:
   ```bash
   npx playwright install chromium firefox
   ```

3. **Configure TestMu AI Credentials**:
   Copy `.env.example` to `.env` and enter your TestMu AI / LambdaTest username and access key:
   ```env
   LT_USERNAME=your_username_here
   LT_ACCESS_KEY=your_access_key_here
   ```

---

## Test Execution

### Local Execution
To run all tests locally using Playwright:
```bash
npm test
```
To run tests only on Chromium locally:
```bash
npm run test:local
```

### TestMu AI Cloud Grid Parallel Execution
To run all test scenarios in parallel across at least 2 OS/browser combinations (Windows 10 Chromium & macOS Catalina Firefox) on TestMu AI Cloud:
```bash
npm run test:cloud
```

*Cloud execution configuration enables:*
- Network logs (`network: true`)
- Video recording (`video: true`)
- Screenshot logs (`visual: true`)
- Console logs (`console: true`)

---


