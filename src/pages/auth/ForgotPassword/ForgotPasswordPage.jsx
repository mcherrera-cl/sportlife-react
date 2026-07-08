import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { validarEmail } from "@utils/validaciones";
import { successAlert } from "@utils/alerts";

import styles from "./ForgotPasswordPage.module.css";

export default () => {
  const [email, setEmail] = useState("");

  const emailValido = validarEmail(email);

  function handleSubmit(event) {
    event.preventDefault();
    successAlert("Correo enviado");
    setEmail("");
  }

  return (
    <Container fluid className={"d-flex justify-content-center align-items-center min-vh-100 " + styles.containerBg}>
      <Row>
        <Col xs={12} md={6} xl={5} className="mx-auto">
          <Card className={styles.formContainer}>
            <Card.Body>
              <h2 className="text-center mb-3">¿Olvidaste tu contraseña?</h2>

              <p className="text-muted text-center mb-4">
                Ingresa el correo electrónico asociado a tu cuenta. Si existe
                una cuenta con ese correo, te enviaremos un enlace para
                restablecer tu contraseña.
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className={
                      email === ""
                        ? ""
                        : emailValido
                          ? "is-valid"
                          : "is-invalid"
                    }
                    placeholder="usuario@correo.com"
                  />
                  <Form.Text className="invalid-feedback">
                    Correo inválido
                  </Form.Text>
                  <Form.Text className="valid-feedback">
                    Formato válido
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  className="w-100"
                  type="submit"
                  disabled={!emailValido}
                >
                  Enviar enlace de recuperación
                </Button>
              </Form>

              <div className="text-center mt-4">
                <Link to="/login">Volver al inicio de sesión</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
