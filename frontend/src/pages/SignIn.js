import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Row>
        <Col className="text-center">
          <h2 className="fw-bold mb-4">Accedi</h2>
          <SignIn path="/sign-in" routing="path" signInUrl="/login" />
        </Col>
      </Row>
    </Container>
  );
}

export default SignInPage;