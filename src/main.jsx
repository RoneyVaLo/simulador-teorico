import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QuestionsProvider } from "./context/QuestionsProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QuestionsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QuestionsProvider>
    </AuthProvider>
  </StrictMode>
);
