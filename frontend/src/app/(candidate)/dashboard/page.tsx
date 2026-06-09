"use client";

import { getTestingApi } from "@/lib/api";
import type { TestingApiResponse } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<TestingApiResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTestingApi();
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "API call failed");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <div>{data?.data}</div>;
}
