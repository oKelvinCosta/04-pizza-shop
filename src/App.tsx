import "./global.css";

import { RouterProvider } from "react-router-dom";
import { toast, Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme/theme-provider";

import { router } from "./routes";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme">
        <Toaster richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
