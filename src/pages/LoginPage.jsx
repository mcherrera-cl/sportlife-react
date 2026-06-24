import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default () => {
  return (
    <>
      <h1>Login</h1>
      <Row>
        <Col xs={12} md={8} xl={4}>
          <Form className="card shadow">
            <Form.Group>
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su correo"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su password"
              ></Form.Control>
            </Form.Group>
            <Button type="submit" className="mt-3">
              Enviar
            </Button>
            <Form.Text>¿Olvidaste tu contraseña?</Form.Text>
          </Form>
        </Col>
      </Row>
    </>
  );
};
