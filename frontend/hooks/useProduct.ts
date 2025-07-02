"use client";

import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (key: string, route: string) => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await api.get(route);
      const result = await response.data;

      return result;
    },
  });

  return { products, isLoading, isError, error };
};
