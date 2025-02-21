import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useUser } from "@clerk/clerk-react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function Checkout() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      initializeCheckout();
    } else {
      setError("Utente non autenticato. Effettua il login.");
      setLoading(false);
    }
  }, [user]);

  async function initializeCheckout() {
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        setError("Errore nel caricamento di Stripe.");
        setLoading(false);
        return;
      }

      const fetchClientSecret = async () => {
        const response = await fetch("http://localhost:4242/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id })
        });
        const { clientSecret } = await response.json();
        return clientSecret;
      };

      const checkout = await stripe.initEmbeddedCheckout({ fetchClientSecret });
      checkout.mount("#checkout");
      setLoading(false);
    } catch (err) {
      console.error("Errore nel checkout:", err);
      setError("Errore nel completamento del pagamento. Riprova.");
      setLoading(false);
    }
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="fw-bold text-center mb-4">Checkout</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <Spinner animation="border" className="d-block mx-auto mt-5" />
          ) : (
            <div id="checkout"></div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;