import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Container className="mt-4">
    <div className="text-center">
      <h2>Contatta il Supporto</h2>
      <p>Hai bisogno di assistenza? Compila il modulo e ti risponderemo il prima possibile.</p>
      </div>
      
      {success && <Alert variant="success">Messaggio inviato con successo!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Il tuo nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="La tua email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="subject" className="mt-3">
          <Form.Label>Oggetto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Oggetto del messaggio"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="message" className="mt-3">
          <Form.Label>Messaggio</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Scrivi qui il tuo messaggio..."
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Invia Messaggio</Button>
      </Form>
    </Container>
  );
}

export default Support;