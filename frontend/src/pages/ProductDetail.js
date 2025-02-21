import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Button, Spinner, Alert, Card } from "react-bootstrap";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
        fetchRelatedProducts(data.category);
      } catch (err) {
        setError("Errore nel caricamento del prodotto.");
        setLoading(false);
      }
    };
    
    const fetchRelatedProducts = async (category) => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products?category=${category}`);
        setRelatedProducts(data.filter(item => item._id !== id).slice(0, 3));
      } catch (err) {
        console.error("Errore nel caricamento dei prodotti correlati.");
      }
    };
    
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Prodotto aggiunto al carrello!");
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg p-4 border-0 rounded-lg">
            <Row>
              <Col md={6} className="text-center">
                <Image src={product.image} alt={product.name} fluid className="rounded shadow-sm" />
              </Col>
              <Col md={6} className="d-flex flex-column justify-content-center">
                <h2 className="fw-bold text-primary">{product.name}</h2>
                <h4 className="text-success fw-bold">€{product.price.toFixed(2)}</h4>
                <p className="text-muted">{product.description}</p>
                <p><strong>Categoria:</strong> {product.category}</p>
                <p><strong>Disponibilità:</strong> {product.stock > 0 ? "Disponibile" : "Esaurito"}</p>
                
                <div className="d-flex align-items-center my-3">
                  <Button variant="light text-light" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</Button>
                  <span className="mx-3">{quantity}</span>
                  <Button variant="light text-light" onClick={() => setQuantity(quantity + 1)}>+</Button>
                </div>
                
                <Button
                  variant="primary"
                  className="mt-3 shadow-sm w-100"
                  onClick={addToCart}
                  disabled={product.stock === 0}
                >
                  Aggiungi al Carrello
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3 className="fw-bold text-center">Prodotti Correlati</h3>
          <Row className="justify-content-center">
            {relatedProducts.map((related) => (
              <Col key={related._id} md={4} sm={6} xs={12} className="mb-3">
                <Card className="shadow-sm border-0 rounded-lg text-center" style={{ maxWidth: "150px", margin: "0 auto" }}>
                  <Card.Img variant="top" src={related.image} className="p-2 rounded" style={{ height: "100px", objectFit: "contain" }} />
                  <Card.Body>
                    <Card.Title className="fw-bold" style={{ fontSize: "0.9rem" }}>{related.name}</Card.Title>
                    <h6 className="text-success">€{related.price.toFixed(2)}</h6>
                    <Button as={Link} to={`/product/${related._id}`} variant="primary" size="sm" className="w-100">
                      Vedi Dettagli
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;