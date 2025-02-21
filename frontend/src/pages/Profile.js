import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

function Profile() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!user || !user.id) {
      console.log("User non caricato correttamente.");
      return;
    }
  
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${user.id}`);
        console.log("Risposta dal server:", response.data);
  
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          address: response.data.address || "",
          phone: response.data.phone || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Errore nel caricamento del profilo:", err.response ? err.response.data : err.message);
        setError("Errore nel caricamento del profilo.");
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, [user]);  
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${user.id}`, formData);
      setSuccess("Profilo aggiornato con successo!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Errore nell'aggiornamento del profilo.");
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg p-4 border-0 rounded-lg">
            <h2 className="fw-bold text-center mb-4">Gestione Profilo</h2>
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} disabled />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Indirizzo</Form.Label>
                <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Telefono</Form.Label>
                <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">Aggiorna Profilo</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;