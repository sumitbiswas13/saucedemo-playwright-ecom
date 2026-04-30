# SauceDemo Playwright E-Commerce Test Suite

![E-Commerce Automation Suite](https://github.com/sumitbiswas13/saucedemo-playwright-ecom/actions/workflows/tests.yml/badge.svg)

End-to-end automation suite for [saucedemo.com](https://www.saucedemo.com) — a demo e-commerce platform. Built with **Playwright + TypeScript** using the **Page Object Model** pattern.

## What's Tested

| Area | Tests | Tags |
|---|---|---|
| Login | Valid login, locked user, invalid credentials, empty fields, logout | `@smoke` `@regression` |
| Product Catalog | 6 products visible, sort by name A-Z/Z-A, sort by price, product detail | `@smoke` `@regression` |
| Shopping Cart | Add/remove items, cart badge count, cart contents, continue shopping | `@smoke` `@regression` |
| Checkout | Full flow, missing fields validation, order total, order confirmation | `@smoke` `@regression` |
| End-to-End | Full shopping journey, multi-item with mid-cart removal | `@smoke` `@regression` |

## Tech Stack

- **[Playwright](https://playwright.dev)** — cross-browser automation
- **TypeScript** — type-safe test code
- **Page Object Model** — clean separation of page logic and test logic
- **GitHub Actions** — CI/CD with scheduled daily runs
- **Multi-browser** — Chrome, Firefox, Safari, Android, iPhone

## Project Structure

```
├── pages/              # Page Object Models
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ProductPage.ts
├── tests/              # Test specs
│   ├── 01-login.spec.ts
│   ├── 02-inventory.spec.ts
│   ├── 03-cart.spec.ts
│   ├── 04-checkout.spec.ts
│   └── 05-e2e.spec.ts
├── test-data/          # Test data
│   └── users.ts
├── playwright.config.ts
└── .github/workflows/tests.yml
```

## Getting Started

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npm test

# Run smoke tests only
npm run test:smoke

# Run regression tests
npm run test:regression

# Run on specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari

# Run on mobile
npm run test:mobile

# View HTML report
npm run report
```

## Running in CI

Tests run automatically on:
- Every push to `main`
- Every pull request
- Daily at 8 AM UTC (scheduled)
- Manual trigger via GitHub Actions UI

## Author

**Sumit Biswas** — 13+ years in telecom/QA automation
