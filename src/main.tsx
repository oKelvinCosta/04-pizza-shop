import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import { enableMSW } from "./api/mocks";

// If not a test environment, enable MSW
// If is a test environment, use then() to wait for the MSW to be enabled
enableMSW().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
