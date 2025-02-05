import React from "react";
import { SignUp } from "@clerk/clerk-react";

const Signup = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <SignUp path="/signup" routing="path" signInUrl="/login" />
    </div>
  );
};

export default Signup;

