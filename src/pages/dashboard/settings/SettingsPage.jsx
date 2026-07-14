import { Card, Container, Button, Row, Col } from "react-bootstrap";
import {
  faLock,
  faPalette,
  faRightFromBracket,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import ToggleTheme from "@components/ToggleTheme";
import { changePasswordForm } from "@utils/formAlerts";
import { successAlert, confirmAlert } from "@utils/alerts";
import { logout } from "@services/authStorage";

export default function SettingsPage() {

  const navigate = useNavigate();
  
  const handleCambiarPassword = async () => {
    const { isConfirmed } = await changePasswordForm();

    if (!isConfirmed) return;

    successAlert(
      "Contraseña actualizada",
      "Tu contraseña se ha actualizado correctamente.",
    );
  };

  const handleCerrarSesion = async () => {
    const { isConfirmed } = await confirmAlert(
      "Cerrar sesión",
      "¿Deseas cerrar tu sesión en este dispositivo?",
      "Cerrar sesión",
    );

    if (!isConfirmed) return;

    logout();
    navigate("/login", {
      replace: true,
    });
  };

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

              <Button variant="outline-warning" onClick={handleCambiarPassword}>
                Cambiar contraseña
              </Button>
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

              <Button variant="outline-danger" onClick={handleCerrarSesion}>
                Cerrar sesión
              </Button>
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
