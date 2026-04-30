import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir:       "./tests",
  testMatch:     "**/*.spec.ts",
  timeout:       30_000,
  retries:       1,
  fullyParallel: true,
  workers:       4,
  reporter: [
    ["list"],
    ["html", { outputFolder: "reports/html", open: "never" }],
    ["json", { outputFile: "reports/results.json" }],
  ],
  use: {
    baseURL:            "https://www.saucedemo.com",
    headless:           true,
    viewport:           { width: 1280, height: 900 },
    screenshot:         "only-on-failure",
    video:              "retain-on-failure",
    trace:              "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox",  use: { ...devices["Desktop Firefox"] } },
    { name: "webkit",   use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 14"] } },
  ],
  outputDir: "test-results",
});
