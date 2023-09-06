import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { MatchContextProvider } from "./contexts/MatchContext";
import { AuthContextProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthContextProvider>
        <MatchContextProvider>
          <App />
        </MatchContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
