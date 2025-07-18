import "./global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { toast, Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { queryClient } from "@/lib/ReactQuery";

import { router } from "./Routes";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
