import React from "react";
import { Card, Button, Container, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles/Home.css";

function Home() {

  return (
    <div className="homepage-container">
      <Carousel className="hero-carousel h-100 w-auto" indicators={true} controls={false} interval={3000}>
        <Carousel.Item>
          <img className="d-block w-100" alt="First slide" src="./manifest2.png" />
          <Carousel.Caption>
            <h2>Offerte Esclusive!</h2>
            <p>Scopri gli sconti imperdibili sui prodotti più venduti.</p>
            <Button variant="light text-white" as={Link} to={`/shop`}>Scopri Ora</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 img-fluid object-fit-cover" src="./argonit.svg" alt="New arrivals slide"/>
          <Carousel.Caption>
            <h2>Nuovi Arrivi</h2>
            <p>Una Ventata di Aria Fresca!</p>
            <Button variant="light text-white">Acquista Ora</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container className="py-5">
        <h3 className="text-center mb-4">Categorie in Evidenza</h3>
        <Row className="justify-content-center">
          <Col md={4} sm={6} className="mb-4">
            <Card className="category-card">
              <Card.Img variant="top" src="./detergenti.png" />
              <Card.Body className="text-center">
                <Card.Title>Detergenti</Card.Title>
                <Button className="custom-btn" as={Link} to={`/shop`}>Esplora</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6} className="mb-4">
            <Card className="category-card">
              <Card.Img variant="top" src="./disinfettanti.png" />
              <Card.Body className="text-center">
                <Card.Title>Igienizzanti</Card.Title>
                <Button className="custom-btn" variant="primary" as={Link} to={`/shop`}>Esplora</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6} className="mb-4">
            <Card className="category-card">
              <Card.Img variant="top" src="./sgrassatori.png" />
              <Card.Body className="text-center">
                <Card.Title>Sgrassatori</Card.Title>
                <Button className="custom-btn" variant="primary" as={Link} to={`/shop`}>Esplora</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="py-5 benefits">
        <Row className="text-center">
          <Col md={4}>
            <h4>🚚 Spedizione Gratuita</h4>
            <p>Su tutti gli ordini superiori a 50€.</p>
          </Col>
          <Col md={4}>
            <h4>🔒 Pagamenti Sicuri</h4>
            <p>Transazioni crittografate al 100%.</p>
          </Col>
          <Col md={4}>
            <h4>📦 Resi Facili</h4>
            <p>Hai 30 giorni per cambiare idea.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;