import { Navbar, Container, Dropdown } from "react-bootstrap";
import { logout } from "../services/authStorage";

export default function Header() {

    return (

        <Navbar expand="lg">

            <Container fluid>

                <Navbar.Brand>
                    Panel Administrativo
                </Navbar.Brand>

                <Dropdown>

                    <Dropdown.Toggle>
                        Marco Antonio
                    </Dropdown.Toggle>

                    <Dropdown.Menu>

                        <Dropdown.Item>
                            Perfil
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item onClick={() => logout()}>
                            Cerrar sesión
                        </Dropdown.Item>

                    </Dropdown.Menu>

                </Dropdown>

            </Container>

        </Navbar>

    );

}