import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './src/e2e',  // <-- here, point to src/e2e
    timeout: 30 * 1000,
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 5000,
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    // You can add more config here like projects, retries etc.
})