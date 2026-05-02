import { useCallback, useState } from 'react';

export function useAsyncState(initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const run = useCallback(async (task) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await task();
      setData(result);
      return result;
    } catch (runError) {
      setError(runError.message || 'Something went wrong');
      throw runError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    error,
    isLoading,
    run,
    setData,
    setError
  };
}
