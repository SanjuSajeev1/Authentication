// main.jsx
import { createRoot } from "react-dom/client";
import "./index.css"; // Tailwind and global styles
import App from "./App.jsx"; // Your main app component
import { BrowserRouter } from "react-router-dom"; // For routing
import { StrictMode } from "react";
import { AppContextProvider } from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        {" "}
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);
