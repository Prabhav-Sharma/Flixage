import React from "react";
import { BrowserRouter } from "react-router-dom";
import { VideosProvider } from "./providers/VideosProvider";

function ContextsProvider({ children }) {
  return (
    <BrowserRouter>
      <VideosProvider>{children}</VideosProvider>
    </BrowserRouter>
  );
}

export default ContextsProvider;
