"use client";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default QueryProvider;
