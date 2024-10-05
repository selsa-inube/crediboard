import { useEffect, useState } from "react";

export function useFetch<T>(apiUrl: string, retryFlag: boolean) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Business-unit": "public",
        "X-Action": "SearchAllAprovalsById",
      },
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
    console.log("retryflag", retryFlag);
  }, [apiUrl, retryFlag]);
  return { data, loading, error };
}
