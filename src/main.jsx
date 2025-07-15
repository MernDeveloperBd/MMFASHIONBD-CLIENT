import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

import { RouterProvider } from "react-router-dom";
import router from "./Components/Routes/Router.jsx";
import AuthProvider from "./Components/AuthProvider/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./Components/AuthProvider/CartContext.jsx";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
          <RouterProvider router={router} />
          </CartProvider>
        </QueryClientProvider>
        <Toaster />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
