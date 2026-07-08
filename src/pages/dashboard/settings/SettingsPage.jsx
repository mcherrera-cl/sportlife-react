import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { faLock, faPalette, faRightFromBracket, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleTheme from "@components/ToggleTheme";

export default function SettingsPage() {
  return (
    <Container className="py-4">
      <h2 className="mb-4">Configuración</h2>

      <Card className="shadow-sm mb-4">
        <Card.Body className="text-center py-5">
          <FontAwesomeIcon
            icon={faPalette}
            size="3x"
            className="mb-3 text-primary"
          />

          <h4>Personalización</h4>

          <p className="text-muted">
            Elige el tema que prefieras para la aplicación.
          </p>

          <ToggleTheme />
        </Card.Body>
      </Card>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <FontAwesomeIcon
                icon={faLock}
                size="2x"
                className="text-warning mb-3"
              />

              <h5>Seguridad</h5>

              <p className="text-muted">
                Cambia tu contraseña para mantener tu cuenta segura.
              </p>

              <Button variant="outline-warning">Cambiar contraseña</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size="2x"
                className="text-danger mb-3"
              />

              <h5>Sesión</h5>

              <p className="text-muted">
                Cierra tu sesión en este dispositivo.
              </p>

              <Button variant="outline-danger">Cerrar sesión</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4 shadow-sm">
        <Card.Body className="text-center">
          <FontAwesomeIcon icon={faCircleInfo} className="me-2" />
          Gym Management System
          <br />
          <small className="text-muted">Versión 1.0.0</small>
        </Card.Body>
      </Card>
    </Container>
  );
}
