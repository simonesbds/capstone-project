import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { useClerk } from "@clerk/clerk-react";
import { BsCart, BsPerson, Bs } from "react-icons/bs";
import "./styles/Navbar.css";

function Navigation() {
  const { user, signOut } = useClerk();
  const location = useLocation();

  return (
    <>
      {/* Fila superiore */}
      <Navbar expand="lg" className="py-1 border-bottom">
        <Container className="d-flex justify-content-between align-items-center">
        <div style={{ width: "50px" }}></div>
          <Navbar.Brand as={Link} to="/" className="position-absolute start-50 translate-middle-x"><img src="/logo.svg" alt="Logo" className="logo" style={{ height: "50px", width: "auto" }}/></Navbar.Brand>
          <div className="d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle as={Button} variant="link" className="text-dark nav-icon" style={{ background: "transparent", border: "none" }}>
                <BsPerson size={24} />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                {user ? (
                  <>
                    <Dropdown.Item as={Link} to="/profile">Il mio profilo</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders">Ordini</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/support">Supporto</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => signOut()}>Esci</Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item as={Link} to="/sign-in">Accedi</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/sign-up">Registrati</Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link as={Link} to="/cart" className="ms-3 text-dark">
              <BsCart size={24} className="nav-icon" />
            </Nav.Link>
          </div>
        </Container>
      </Navbar>

      {/* Seconda fila di voci */}
      <Navbar  variant="dark" expand="lg"  className="py-2 custom-nav">
        <Container>
          <Nav className="m-auto">
            <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active-nav" : ""}>Home</Nav.Link>
            <Nav.Link as={Link} to="/shop" className={location.pathname === "/shop" ? "active-nav" : ""}>Shop</Nav.Link>
            <Nav.Link as={Link} to="/location" className={location.pathname === "/location" ? "active-nav" : ""}>Dove Siamo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;