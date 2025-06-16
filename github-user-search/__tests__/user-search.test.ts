import { test, expect, Page, Locator } from '@playwright/test';

const fakeUsers = [
    { id: 1, login: 'romane_1', avatar_url: 'url1', html_url: 'url1' },
    { id: 2, login: 'romane_2', avatar_url: 'url2', html_url: 'url2' },
];

const getCheckboxOfUser = (page: Page, userId: number): Locator => {
    const userCard = page.getByTestId(`user-${userId}`);
    const checkbox = userCard.locator('.checkbox input[type="checkbox"]');
    return checkbox;
}

test.describe('UserSearch', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('https://api.github.com/search/users*', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ items: fakeUsers }),
            });
        });

        await page.goto('http://localhost:3000');
    });

    test('should display empty state when no search', async ({ page }) => {
        await expect(page.getByTestId('empty-state')).toBeVisible();
    });

    test('should display users after search input', async ({ page }) => {
        await page.getByTestId('search-input').fill('romane');
        await page.waitForResponse(resp => resp.url().includes('search/users') && resp.status() === 200);
        await expect(page.getByTestId('user-1')).toBeVisible();
        await expect(page.getByTestId('user-2')).toBeVisible();
    });

    test('should display edit toolbar when enable edition', async ({ page }) => {
        await page.getByTestId('search-input').fill('romane');
        await page.waitForResponse(resp => resp.url().includes('search/users') && resp.status() === 200);
        await page.getByTestId('edit-mode-checkbox').click();
        await expect(page.getByTestId('edit-toolbar')).toBeVisible();
    });

    test.describe('when enable edition', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByTestId('search-input').fill('romane');
            await page.waitForSelector("[data-testid='user-1']")
            await page.getByTestId('edit-mode-checkbox').click();
        });

        test('should select a user', async ({ page }) => {
            const firstUserCheckbox = getCheckboxOfUser(page, 1);
            await firstUserCheckbox.click();
            await expect(firstUserCheckbox).toBeChecked();
        });

        test('should select all users', async ({ page }) => {
            await page.getByTestId('edit-toolbar').locator('input[type="checkbox"]').click();
            await expect(page.getByTestId('user-1').getByRole("checkbox")).toBeChecked();
            await expect(page.getByTestId('user-2').getByRole("checkbox")).toBeChecked();
        });

        test('should duplicate selected user', async ({ page }) => {
            const firstUserCheckbox = getCheckboxOfUser(page, 1);
            await firstUserCheckbox.click();
            await page.getByTestId('duplicate-button').click();
            await expect(page.getByTestId('user-3')).toBeVisible();
        });

        test('should delete selected user', async ({ page }) => {
            const firstUserCheckbox = getCheckboxOfUser(page, 1);
            await firstUserCheckbox.click();
            await page.getByTestId('delete-button').click();
            await expect(page.getByTestId('user-1')).not.toBeVisible();
        });

        test('should clear selection after typing new text', async ({ page }) => {
            await getCheckboxOfUser(page, 1).click();
            await page.getByTestId('search-input').fill('new search');
            await expect(getCheckboxOfUser(page, 1)).not.toBeChecked();
        });

        test('should clear selection after duplicate', async ({ page }) => {
            await getCheckboxOfUser(page, 1).click();
            await page.getByTestId('duplicate-button').click();
            await expect(getCheckboxOfUser(page, 1)).not.toBeChecked();
        });

        test('should clear selection after delete', async ({ page }) => {
            await getCheckboxOfUser(page, 1).click();
            await page.getByTestId('delete-button').click();
            await expect(getCheckboxOfUser(page, 1)).not.toBeAttached();
        });

        test('should clear selection when disabling edit mode', async ({ page }) => {
            await getCheckboxOfUser(page, 1).click();
            await page.getByTestId('edit-mode-checkbox').click(); // disable
            await page.getByTestId('edit-mode-checkbox').click(); // re-enable
            await expect(getCheckboxOfUser(page, 1)).not.toBeChecked();
        });
    });

});
