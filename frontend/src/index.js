import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";

const clerkFrontendAPI = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkFrontendAPI}>
      <Router>
        <App stripePromise={stripePromise} />
      </Router>
    </ClerkProvider>
  </React.StrictMode>
);