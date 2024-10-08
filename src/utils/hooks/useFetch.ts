import { useEffect, useState } from "react";

export function useFetch<T>(
  apiUrl: string,
  options: RequestInit,
  retryFlag: boolean,
  maxRetries = 1,
  fetchTimeout = 3000
) {
  const [data, setData] = useState<T | null | []>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        const abortController = new AbortController();

        const timeout = setTimeout(
          () => abortController?.abort(),
          fetchTimeout
        );

        const fetchOptions: RequestInit = {
          ...options,
          signal: abortController.signal,
        };

        try {
          const response = await fetch(apiUrl, fetchOptions);
          clearTimeout(timeout);

          if (!response.ok) {
            throw new Error(`Error en la solicitud`);
          }

          if (response.status === 204) {
            setData([]);
            return;
          }

          const json = await response.json();
          setData(json);
          return;
        } catch (e) {
          if (attempt === maxRetries) {
            setError((e as Error).message);
          }
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [apiUrl, options, fetchTimeout, maxRetries, retryFlag]);

  return { data, loading, error };
}
