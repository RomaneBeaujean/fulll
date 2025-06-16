import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: '__tests__',
    webServer: {
        command: 'npm run start',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 120 * 1000,
    },
    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
        viewport: { width: 1280, height: 720 },
    },
});
