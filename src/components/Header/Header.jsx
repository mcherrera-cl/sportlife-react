import { Navbar, Container, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { logout } from "@services/authStorage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

import styles from "./Header.module.css";

export default function Header() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const roleClass =
    {
      admin: styles.admin,
      coach: styles.coach,
      user: styles.user,
    }[user.role] ?? "";

  const roleVariant =
    {
      admin: "danger",
      coach: "success",
      user: "light",
    }[user.role] || "secondary";

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <Navbar expand="lg" className={`${styles.header} ${roleClass}`}>
      <Container fluid>
        <Navbar.Brand className="text-uppercase">{user.role}</Navbar.Brand>

        <Dropdown align="end">
          <Dropdown.Toggle
            className="text-capitalize d-flex align-items-center gap-2"
            variant={roleVariant}
          >
            <FontAwesomeIcon icon={faUser} />

            {user.full_name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate("/dashboard/profile")}>
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Perfil
            </Dropdown.Item>

            <Dropdown.Item onClick={() => navigate("/dashboard/settings")}>
              <FontAwesomeIcon icon={faGear} className="me-2" />
              Configuración
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="text-danger" onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
              Cerrar sesión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}
