import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { UserDataProvider } from "./providers/UserDataProvider";
import { VideosProvider } from "./providers/VideosProvider";

function ContextsProvider({ children }) {
  return (
    <AuthProvider>
      <BrowserRouter>
        <UserDataProvider>
          <VideosProvider>{children}</VideosProvider>
        </UserDataProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default ContextsProvider;
