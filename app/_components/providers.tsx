"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode, useState } from "react";

import { AlertProvider } from "@/components/alert-context";
import { ToastProvider } from "@/components/toast-context";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <ToastProvider>
          <AlertProvider>{children}</AlertProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
