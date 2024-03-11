import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ContextWrapper from "./context/ContextWrapper.jsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <React.StrictMode>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </React.StrictMode>
  </MantineProvider>
);
