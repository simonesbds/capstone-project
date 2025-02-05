import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const clerkFrontendAPI = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
console.log("Clerk Publishable Key:", clerkFrontendAPI); 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ClerkProvider publishableKey={clerkFrontendAPI}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);

