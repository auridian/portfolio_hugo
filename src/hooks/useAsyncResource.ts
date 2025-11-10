import { useEffect, useState, type DependencyList } from 'react';

export interface AsyncResourceState<T> {
  data?: T;
  error?: unknown;
  loading: boolean;
}

export function useAsyncResource<T>(
  fetcher: () => Promise<T>,
  deps: DependencyList = []
): AsyncResourceState<T> {
  const [state, setState] = useState<AsyncResourceState<T>>({
    loading: true,
    data: undefined,
    error: undefined
  });

  useEffect(() => {
    let cancelled = false;

    setState((prev) => ({
      ...prev,
      loading: true,
      error: undefined
    }));

    fetcher()
      .then((result) => {
        if (!cancelled) {
          setState({
            data: result,
            error: undefined,
            loading: false
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({
            data: undefined,
            error,
            loading: false
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher, ...deps]);

  return state;
}
