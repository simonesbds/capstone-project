import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner, Alert, Badge } from "react-bootstrap";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

function Orders() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.id) {
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${user.id}`);
        console.log("Risposta dal server:", response.data);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Errore nel recupero ordini:", err.response ? err.response.data : err.message);
        setError("Errore nel caricamento degli ordini.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user || !user.id) {
    return <Alert variant="warning" className="text-center">Caricamento profilo in corso...</Alert>;
  }

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h2 className="fw-bold text-center mb-4">I miei ordini</h2>
      {orders.length === 0 ? (
        <Alert variant="info" className="text-center">Nessun ordine trovato.</Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Data</th>
              <th>Prodotti</th>
              <th>Totale</th>
              <th>Stato</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {order.products.map((item, idx) => (
                    <div key={idx}>{item.name} x{item.quantity}</div>
                  ))}
                </td>
                <td>€{order.total.toFixed(2)}</td>
                <td>
                  <Badge bg={order.status === "Consegnato" ? "success" : "warning"}>{order.status}</Badge>
                </td>
                <td>
                  <Button variant="outline-primary" size="sm">Dettagli</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Orders;