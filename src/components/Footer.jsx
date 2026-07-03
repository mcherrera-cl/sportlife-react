import React from "react";
export default () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-3" id="contacto">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">SportLife Club</h5>
            <p style={{ color: "var(--bs-warning-bg-subtle);"}}>
              Tu espacio para entrenar, mejorar tu salud y alcanzar tus
              objetivos deportivos.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Contacto</h5>
            <p className="mb-1">
              <i className="fa-solid fa-envelope me-2"></i>
              contacto@sportlifeclub.cl
            </p>
            <p className="mb-0">
              <i className="fa-solid fa-phone me-2"></i>
              +56 9 1234 5678
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Síguenos</h5>
            <div className="d-flex gap-3 fs-4">
              <a href="javascript:void(0)" className="text-light">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="javascript:void(0)" className="text-light">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="javascript:void(0)" className="text-light">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="javascript:void(0)" className="text-light">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="text-center" style={{color: "var(--bs-warning-bg-subtle);"}}>
          <small>
            &copy; 2026 SportLife Club. Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
}
