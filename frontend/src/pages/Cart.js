import React, { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col, Card } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import "./styles/Cart.css"

function Cart() {
  const { user } = useUser();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (id, amount) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert(" Il carrello è vuoto!");
      return;
    }
    console.log("Cart:", cart);
    console.log("User:", user);
    try {
      const { data } = await axios.post("http://localhost:4242/create-checkout-session", {
        products: cart,
        userId: user?.id,
      });

      if (data.clientSecret) {
        window.location.href = `http://localhost:3000/checkout?session_id=${data.sessionUrl}`;
      } else {
        alert("Errore durante la creazione della sessione di pagamento.");
      }
    } catch (err) {
      console.log(" Errore nel pagamento:", err);
      alert("Errore nel completamento del pagamento. Riprova.");
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h2 className="fw-bold mb-4">Carrello</h2>
          {cart.length === 0 ? (
            <p>Il carrello è vuoto.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Prodotto</th>
                  <th>Prezzo</th>
                  <th>Quantità</th>
                  <th>Subtotale</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.image || "/default-product.jpg"}
                        alt={item.name}
                        width="auto"
                        height="50"
                        className="me-2"
                      />
                      <Link to={`/product/${item._id}`} className="fw-bold text-decoration-none">
                        {item.name}
                      </Link>
                    </td>
                    <td>€{item.price.toFixed(2)}</td>
                    <td>
                      <Button variant="light text-light" onClick={() => updateQuantity(item._id, -1)}>
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button variant="light text-light" onClick={() => updateQuantity(item._id, 1)}>
                        +
                      </Button>
                    </td>
                    <td>€{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button variant="danger" className="clear-button" onClick={() => removeItem(item._id)}>
                        <BsTrash size={20} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Button as={Link} to="/shop" variant="primary" className="me-2">
            Continua lo shopping
          </Button>
          <Button variant="danger" onClick={clearCart} className="clear-button"> 
           Svuota carrello
          </Button>
        </Col>
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h4 className="fw-bold">Dettagli Ordine</h4>
            <hr />
            <Row>
              <Col>Subtotale:</Col>
              <Col className="text-end">€{getTotal()}</Col>
            </Row>
            <Row>
              <Col>Tasse:</Col>
              <Col className="text-end">€0</Col>
            </Row>
            <hr />
            <Row className="fw-bold">
              <Col>Totale:</Col>
              <Col className="text-end">€{getTotal()}</Col>
            </Row>
            <Button variant="primary" className="w-100 mt-3 bg-success" onClick={handleCheckout}>
              Paga €{getTotal()}
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;