import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SecondaryNavbar.css";

const SecondaryNavbar = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`secondary-navbar ${visible ? "visible" : "hidden"}`}>
      <Nav className="justify-content-center">
        <Nav.Item>
          <Nav.Link as={Link} to="/" className="text-muted custom-hover">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/shop" className="text-muted custom-hover">Shop</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/cart" className="text-muted custom-hover">Cart</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default SecondaryNavbar;
