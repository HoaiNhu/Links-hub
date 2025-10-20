/**
 * Custom hook for fetching and managing categories
 * Provides reusable category data across components
 */

import { useState, useEffect, useCallback } from "react";
import { ApiClient } from "@/lib/api-client";
import { ICategory } from "@/lib/type";
import { showToast } from "@/lib/toast-utils";

interface UseCategoriesReturn {
  categories: ICategory[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await ApiClient.get<ICategory[]>("/api/categories");
      setCategories(data);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch categories");
      setError(error);
      showToast.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: fetchCategories };
}
