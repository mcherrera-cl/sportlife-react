import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@context/ThemeContext";

export default function() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light">
        <FontAwesomeIcon
          icon={theme === "light" ? faSun : faMoon}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          active={theme === "light"}
          onClick={() => theme !== "light" && toggleTheme()}
        >
          <FontAwesomeIcon icon={faSun} className="me-2" />
          Claro
        </Dropdown.Item>

        <Dropdown.Item
          active={theme === "dark"}
          onClick={() => theme !== "dark" && toggleTheme()}
        >
          <FontAwesomeIcon icon={faMoon} className="me-2" />
          Oscuro
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}