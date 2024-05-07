import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const CACHE_SEC = 30;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_SEC * 1000,
      gcTime: CACHE_SEC * 1000,
      retry: 3,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
