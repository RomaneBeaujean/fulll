import { test, expect } from '@playwright/test';

test.describe('Github User Search', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000');
    });

    test('should renders the "Github Search" header', async ({ page }) => {
        const component = page.getByTestId('header');
        await expect(component).toBeVisible();
    });

    test('should renders the "User Search" component', async ({ page }) => {
        const component = page.getByTestId('user-search');
        await expect(component).toBeVisible();
    });
});