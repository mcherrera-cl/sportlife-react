import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.webp";

export default () => {
  const location = useLocation();

  return (
    <header className="sticky-top shadow-sm mb-0 navbar-index bg-pro">
      <nav className="navbar navbar-expand-lg container" data-bs-theme="dark">
        <div className="container-fluid">
          {/* Logo */}
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="logo" width="90" />
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center text-uppercase">
              {/* Home */}
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-bold" : "")
                  }
                >
                  Inicio
                </NavLink>
              </li>
              {/*  LOGIN  */}
              <li className="nav-item ms-lg-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-bold" : "")
                  }
                >
                  Login
                </NavLink>
              </li>

              {/*  REGISTRO  */}
              <li className="nav-item ms-lg-2">
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active fw-bold" : "")
                  }
                >
                  Registrarse
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
