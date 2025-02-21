import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert, Form, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slider";
import "./styles/Shop.css";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState("Tutti");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = ["Tutti", ...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        setError("Errore nel caricamento dei prodotti");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterProducts(e.target.value, selectedCategory, priceRange);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    filterProducts(search, category, priceRange);
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    filterProducts(search, selectedCategory, newRange);
  };

  const filterProducts = (searchTerm, category, priceRange) => {
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    if (category !== "Tutti") {
      filtered = filtered.filter(product => product.category === category);
    }
    setFilteredProducts(filtered);
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid className="mt-4">
      {/* Banner */}
      <div className="banner text-center py-5 mb-4 text-white">
        <img src="./banner-shop.svg" alt="Banner" width="100%" />
      </div>
      <Row>
      
        {/* Sidebar */}
        <Col md={3} className="sidebar p-3 border-end">
          <h4 className="mb-3 fw-bold">FILTRI</h4>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Categorie</Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled">
                  {categories.map(category => (
                    <li key={category} className={selectedCategory === category ? "fw-bold" : ""} onClick={() => filterByCategory(category)} style={{ cursor: "pointer",  }}>
                      {category}
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Prezzo</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Label>Prezzo: €{priceRange[0]} - €{priceRange[1]}</Form.Label>
                  <Slider
                    className="custom-slider"
                    min={0}
                    max={100}
                    step={1}
                    value={priceRange}
                    onChange={handlePriceChange}
                    pearling
                    minDistance={1}
                    withTracks={true}
                  />
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        
        {/* Main */}
        <Col md={9}>
          <Form className="mb-4">
            <Form.Control 
              type="text" 
              placeholder="Cerca un prodotto..." 
              value={search} 
              onChange={handleSearch} 
            />
          </Form>
          
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product._id} md={4} className="mb-4">
                <Card className="shadow-lg border-0 rounded-lg d-block flex-column h-100">
                  <Card.Img 
                    variant="top" 
                    src={product.image || "/default-product.jpg"} 
                    className="p-3 rounded flex-grow-1 object-fit-contain"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold">{product.name}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">{product.description.substring(0, 60)}...</Card.Text>
                    <div className="d-flex justify-content-between mt-3">
                    <h5 className="text-success fw-bold">€{product.price.toFixed(2)}</h5>
                      <Button as={Link} to={`/product/${product._id}`}>
                        Dettagli
                      </Button>
                    </div>
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

export default Shop;