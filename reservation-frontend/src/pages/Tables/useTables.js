import { useEffect } from 'react';
import { useAsyncState } from '../../hooks/useAsyncState';
import { getTables } from '../../services/tableService';

export function useTables() {
  const { data, error, isLoading, run } = useAsyncState([]);

  useEffect(() => {
    run(getTables).catch(() => {});
  }, [run]);

  async function refresh() {
    await run(getTables);
  }

  return {
    tables: data,
    error,
    isLoading,
    refresh
  };
}
