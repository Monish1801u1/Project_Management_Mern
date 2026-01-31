import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NuqsAdapter } from "nuqs/adapters/react";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./context/query-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

import { ThemeProvider } from "./components/theme-provider.tsx";
import { AuthProvider } from "./context/auth-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <NuqsAdapter>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
              <App />
            </AuthProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </BrowserRouter>
      <Toaster />
    </QueryProvider>
  </StrictMode>
);
