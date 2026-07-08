import { Navbar, Container, Dropdown } from "react-bootstrap";
import { logout, getUser } from "../../services/authStorage";
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";

export default function Header() {
  const user = getUser(),
    navigate = useNavigate();

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
    navigate("/login", { replace: true });
  }

  return (
    <Navbar expand="lg" className={`${styles.header} ${roleClass}`}>
      <Container fluid>
        <Navbar.Brand className="text-uppercase">{ user.role }</Navbar.Brand>

        <Dropdown>
          <Dropdown.Toggle className="text-capitalize" variant={roleVariant}>
            {user.full_name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Perfil</Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}
