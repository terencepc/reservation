import { test } from '@playwright/test';
import { adminUser } from '../../test-data/adminUser';
import { LoginPage } from '../../page-objects/LoginPage';
import { TablesPage } from '../../page-objects/TablesPage';

test.describe('Login', () => {
  test('logs in successfully and shows the tables page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const tablesPage = new TablesPage(page);

    await loginPage.goto();
    await loginPage.expectLoaded();
    await loginPage.expectFieldsVisible();

    await loginPage.login(adminUser.username, adminUser.password);

    await tablesPage.expectLoaded();
  });
});
