import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <Container>
        <Row>
          <Col md={4} sm={12}>
            <h5>Chi Siamo</h5>
            <p>
              TecnoYgiene Store è il punto di riferimento per i migliori prodotti per la pulizia della casa e dell'ufficio.
            </p>
          </Col>

          <Col md={4} sm={12}>
            <h5>Servizio Clienti</h5>
            <ul className="list-unstyled">
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Termini e Condizioni</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/support">Contattaci</Link></li>
            </ul>
          </Col>

          <Col md={4} sm={12}>
            <h5>Seguici</h5>
            <div className="social-icons d-flex">
              <a href="https://facebook.com/tecnoygiene" target="_blank" rel="noopener noreferrer"><img src="./facebook.svg" alt="Facebook" className="social-icon me-2 bi bi-facebook text-light"/></a>
              <a href="https://instagram.com/tecnoygienestore" target="_blank" rel="noopener noreferrer"><img src="./instagram.svg" alt="Instagram" className="social-icon me-2 bi bi-instagram text-light"/></a>
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} TecnoYgiene Store. Tutti i diritti riservati.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;