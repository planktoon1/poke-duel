import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
// @ts-ignore
import { MatchContextProvider } from "pokeDuelHost/MatchContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <MatchContextProvider>
        <App />
      </MatchContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
