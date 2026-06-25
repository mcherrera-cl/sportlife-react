import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import logo from "../../assets/logo.webp";
import { validarEmail } from "../../utils/validaciones";
import { Link } from "react-router-dom";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailValido = validarEmail(email);
  const passwordValido = password.trim().length >= 8;
  const formularioValido = emailValido && passwordValido;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailValido || !passwordValido) {
      console.log("Formulario inválido");
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);
  };

  useEffect(() => {
    document.body.classList.add("login");
  }, []);

  return (
    <Container className="py-5">
      <div className="text-center">
        <h3 className="fw-bold display-3 text-uppercase welcome-title">
          Bienvenido
        </h3>
        <p className="fs-5 mb-5">Inicia sesión para acceder a tu cuenta</p>
      </div>
      <Row className="py-5 justify-content-center">
        <Col xs={12} md={8} xl={6} xxl={5}>
          <Form className={styles.form} onSubmit={handleSubmit} noValidate>
            <img src={logo} alt="logo" className={styles.formLogo}></img>
            <h2 className="text-center">Login</h2>
            {/* EMAIL */}
            <Form.Group>
              <Form.Label>Correo electrónico</Form.Label>

              <Form.Control
                type="email"
                placeholder="Ingrese su correo"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className={
                  email === "" ? "" : emailValido ? "is-valid" : "is-invalid"
                }
                required
              />

              <Form.Text className="invalid-feedback">
                Correo inválido
              </Form.Text>

              <Form.Text className="valid-feedback">Formato válido</Form.Text>
            </Form.Group>

            {/* PASSWORD */}
            <Form.Group>
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Ingrese su password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className={
                  password === ""
                    ? ""
                    : passwordValido
                      ? "is-valid"
                      : "is-invalid"
                }
                required
              />

              <Form.Text className="invalid-feedback">
                Mínimo 8 caracteres
              </Form.Text>

              <Form.Text className="valid-feedback">Formato válido</Form.Text>
            </Form.Group>
            <Button type="submit" className="mt-3" disabled={!formularioValido}>
              Ingresar
            </Button>

            <div
              className="my-3 d-grid"
              style={{ gridTemplateColumns: "1fr auto 1fr" }}
            >
              <a href="#" className="text-end text-decoration-none pe-3">
                ¿Olvidaste tu contraseña?
              </a>
              <span className="text-center">|</span>
              <Link
                to="/register"
                className="text-start text-decoration-none ps-3"
              >
                Registrarse
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
