import { testIds } from '../constants/testIds';

export const tablesPage = {
  root: testIds.tables.page,
  logoutButton: testIds.tables.logoutButton,
  refreshButton: testIds.tables.refreshButton,
  loadingState: testIds.tables.loadingState,
  errorMessage: testIds.tables.errorMessage,
  emptyState: testIds.tables.emptyState,
  list: testIds.tables.tableList,
  tableCard: (id) => `${testIds.tables.tableCard}-${id}`
};
