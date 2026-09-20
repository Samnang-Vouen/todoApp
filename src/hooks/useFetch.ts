import { useEffect, useState } from "react";

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    async function load() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data: T = await response.json();
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : "Something went wrong";
          setState({ data: null, loading: false, error: message });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}
