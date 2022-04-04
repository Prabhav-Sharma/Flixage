import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { VideosProvider } from "./providers/VideosProvider";

function ContextsProvider({ children }) {
  return (
    <AuthProvider>
      <BrowserRouter>
        <VideosProvider>{children}</VideosProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default ContextsProvider;
