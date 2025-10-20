/**
 * Custom hook for fetching and managing links
 * Eliminates duplicated fetch logic across components
 */

import { useState, useEffect, useCallback } from "react";
import { ApiClient } from "@/lib/api-client";
import { ILink } from "@/lib/type";
import { showToast } from "@/lib/toast-utils";

interface UseLinksParams {
  category?: string;
  status?: string;
  search?: string;
  autoFetch?: boolean;
}

interface UseLinksReturn {
  links: ILink[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useLinks(params?: UseLinksParams): UseLinksReturn {
  const [links, setLinks] = useState<ILink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();

      if (params?.category && params.category !== "all") {
        queryParams.append("category", params.category);
      }
      if (params?.status) {
        queryParams.append("status", params.status);
      }
      if (params?.search) {
        queryParams.append("search", params.search);
      }

      const url = `/api/links${
        queryParams.toString() ? `?${queryParams}` : ""
      }`;
      const data = await ApiClient.get<ILink[]>(url);

      setLinks(data);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch links");
      setError(error);
      showToast.error(error);
    } finally {
      setLoading(false);
    }
  }, [params?.category, params?.status, params?.search]);

  useEffect(() => {
    if (params?.autoFetch !== false) {
      fetchLinks();
    }
  }, [fetchLinks, params?.autoFetch]);

  return { links, loading, error, refetch: fetchLinks };
}
