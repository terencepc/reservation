import { expect, type Locator, type Page } from '@playwright/test';

export class TablesPage {
  readonly page: Page;
  readonly root: Locator;
  readonly refreshButton: Locator;
  readonly logoutButton: Locator;
  readonly list: Locator;
  readonly emptyState: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId('tables-page');
    this.refreshButton = page.getByTestId('tables-refresh-button');
    this.logoutButton = page.getByTestId('tables-logout-button');
    this.list = page.getByTestId('tables-list');
    this.emptyState = page.getByTestId('tables-empty-state');
    this.errorMessage = page.getByTestId('tables-error-message');
  }

  async expectLoaded() {
    await expect(this.root).toBeVisible();
    await expect(this.refreshButton).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
    await expect(this.errorMessage).toHaveCount(0);
    await expect(this.list.or(this.emptyState)).toBeVisible();
  }
}
