import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useClerk, SignedIn, SignedOut } from "@clerk/clerk-react";
import "./TopNavbar.css";

const TopNavbar = () => {
  const { signOut } = useClerk();

  return (
    <Navbar variant="dark" className="top-navbar">
      <Container className="position-relative">
        <Navbar.Brand as={Link} to="/" className="mx-auto logo">
          <img src="/logo.svg" alt="Logo" height="50" />
        </Navbar.Brand>
        <div className="position-absolute end-0">
          <SignedOut>
            <Button variant="outline-light" as={Link} to="/login">
              Accedi/Registrati
            </Button>
          </SignedOut>
          <SignedIn>
            <Button variant="outline-light" onClick={() => signOut()}>
              Logout
            </Button>
          </SignedIn>
        </div>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
