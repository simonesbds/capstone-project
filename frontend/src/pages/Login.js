import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <SignIn path="/login" routing="path" signUpUrl="/signup" />
    </div>
  );
};

export default Login;
