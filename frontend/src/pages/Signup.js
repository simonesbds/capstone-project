import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Row>
        <Col className="text-center">
          <h2 className="fw-bold mb-4">Registrati</h2>
          <SignUp path="/sign-up" routing="path" signInUrl="/login" />
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;