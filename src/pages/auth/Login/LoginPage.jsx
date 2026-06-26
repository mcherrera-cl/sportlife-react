import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

import { validarEmail } from "../../../utils/validaciones";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/auth";
import { saveAuth } from "../../../services/authStorage";

import styles from "./LoginPage.module.css";
import logo from "@assets/logo.webp";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const navigate = useNavigate();

  const emailValido = validarEmail(email);
  const passwordValido = password.trim().length >= 8;
  const formularioValido = emailValido && passwordValido;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailValido || !passwordValido) return;

    try {
      const { ok, data } = await login(email, password);
      if (ok) {
        saveAuth(data.token, data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorLogin(error.message || "Credenciales incorrectas");
    }
  };

  useEffect(() => {
    document.title = "Sportlife | Login";
    document.body.classList.add("login");
    return () => {
      document.body.className = "";
    }
  }, []);

  return (
    <Container className={styles.loginWrapper}>
      <div className="text-center">
        <h2 className={styles.loginTitle}>Bienvenido</h2>
        <p className="fs-4 mb-5 text-light fw-bold">
          Inicia sesión para acceder a tu cuenta
        </p>
      </div>
      <Row className="py-5 justify-content-center">
        <Col xs={12} md={8} xl={6} xxl={5}>
          <Form className={styles.form} onSubmit={handleSubmit} noValidate>
            <img src={logo} alt="logo" className={styles.formLogo}></img>
            <h2 className="text-center">Login</h2>
            {errorLogin && (
              <div className="alert alert-danger mt-3 text-center">
                {errorLogin}
              </div>
            )}
            {/* EMAIL */}
            <Form.Group>
              <Form.Label>Correo electrónico</Form.Label>

              <Form.Control
                type="email"
                placeholder="Ingrese su correo"
                value={email}
                onChange={(ev) => {
                  setEmail(ev.target.value);
                  setErrorLogin("");
                }}
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
                onChange={(ev) => {
                  setPassword(ev.target.value);
                  setErrorLogin("");
                }}
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
            <Button type="submit" className={styles.btnSubmit} disabled={!formularioValido}>
              Ingresar
            </Button>

            <div
              className="my-3 d-grid"
              style={{ gridTemplateColumns: "1fr auto 1fr" }}
            >
              <Link
                to="/forgot-password"
                className="text-end text-decoration-none pe-3"
              >
                ¿Olvidaste tu contraseña?
              </Link>
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
