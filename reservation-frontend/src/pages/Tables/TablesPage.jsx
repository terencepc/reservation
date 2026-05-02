import PageShell from '../../components/layout/PageShell';
import Button from '../../components/ui/Button';
import StatusMessage from '../../components/ui/StatusMessage';
import { tablesPage } from '../../pageObjects/tablesPage';
import { useTables } from './useTables';

function TablesPage({ onLogout }) {
  const { tables, error, isLoading, refresh } = useTables();

  return (
    <PageShell>
      <main className="panel tables-panel" data-testid={tablesPage.root} id={tablesPage.root}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">Reservation Admin</p>
            <h1>Available Tables</h1>
          </div>

          <div className="actions">
            <Button
              data-testid={tablesPage.refreshButton}
              id={tablesPage.refreshButton}
              onClick={refresh}
              type="button"
              variant="secondary"
            >
              Refresh
            </Button>
            <Button
              data-testid={tablesPage.logoutButton}
              id={tablesPage.logoutButton}
              onClick={onLogout}
              type="button"
            >
              Logout
            </Button>
          </div>
        </div>

        {isLoading ? (
          <StatusMessage
            data-testid={tablesPage.loadingState}
            id={tablesPage.loadingState}
          >
            Loading tables...
          </StatusMessage>
        ) : null}

        {!isLoading && error ? (
          <StatusMessage
            data-testid={tablesPage.errorMessage}
            id={tablesPage.errorMessage}
            tone="error"
          >
            {error}
          </StatusMessage>
        ) : null}

        {!isLoading && !error && tables.length === 0 ? (
          <StatusMessage
            data-testid={tablesPage.emptyState}
            id={tablesPage.emptyState}
          >
            No tables available.
          </StatusMessage>
        ) : null}

        {!error && tables.length > 0 ? (
          <section className="table-grid" data-testid={tablesPage.list} id={tablesPage.list}>
            {tables.map((table) => (
              <article
                key={table.id}
                className="table-card"
                data-testid={tablesPage.tableCard(table.id)}
                id={tablesPage.tableCard(table.id)}
              >
                <p className="table-label">Table</p>
                <h2>{table.tableNumber}</h2>
                <p className="table-meta">{table.seats} seats</p>
              </article>
            ))}
          </section>
        ) : null}
      </main>
    </PageShell>
  );
}

export default TablesPage;
