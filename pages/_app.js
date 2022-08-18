import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
