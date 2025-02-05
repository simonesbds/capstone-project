import React from "react";
import { Routes, Route } from "react-router-dom";
import TopNavbar from "./component/TopNavbar";
import SecondaryNavbar from "./component/SecondaryNavbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TopNavbar />
      <SecondaryNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
