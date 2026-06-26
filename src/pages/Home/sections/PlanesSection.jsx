export default () => {
  return (
    <section id="planes" className="container mb-5 py-5">
      <div className="text-center mb-4">
        <h2 className="text-uppercase display-3 fw-bold">Planes</h2>
        <p className="text-muted fs-5 mb-5">
          Encuentra el plan ideal para tu estilo de vida y lleva tu rendimiento
          al siguiente nivel.
        </p>
      </div>

      <div className="row flex-row-reverse g-5">
        {/* PLAN PREMIUM */}
        <div className="col-12 col-md-6 col-xl-4">
          <div className="card h-100 card-premium circle hv-primary">
            <div className="text-center pt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 32 32"
              >
                <g fill="none">
                  <circle cx="16" cy="16" r="16" fill="#F1B32B" />
                  <path
                    fill="#FFF"
                    d="M15.75 4C9.26 4 4 9.26 4 15.75S9.26 27.5 15.75 27.5S27.5 22.24 27.5 15.75A11.75 11.75 0 0 0 15.75 4m0 20.57a8.82 8.82 0 1 1 0-17.64a8.82 8.82 0 0 1 0 17.64m-2.93-8.81l2.94 4.4l2.92-4.4l-2.92-4.41z"
                  />
                </g>
              </svg>
            </div>

            <div className="card-body text-center px-4">
              <h5 className="card-title fw-bold text-uppercase">
                Plan Premium
              </h5>

              <p className="card-text text-muted">
                Acceso ilimitado a clases, máquinas y uso completo de
                instalaciones.
              </p>

              <div className="d-flex justify-content-center gap-2 mb-3">
                <span className="badge rounded-pill text-bg-warning">VIP</span>
                <span className="badge rounded-pill text-bg-dark">
                  Full Access
                </span>
              </div>

              <button
                className="btn btn-premium w-100"
                data-bs-toggle="modal"
                data-bs-target="#modalPlanPremium"
              >
                Ver plan
              </button>
            </div>
          </div>
        </div>

        {/* PLAN FAMILIAR */}
        <div className="col-12 col-md-6 col-xl-4">
          <div className="card h-100 card-familiar text-center circle hv-primary">
            <div className="pt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#eac88b"
                  d="M3.69 9.12a.88.88 0 0 0-.65-.28c-.41 0-.72.19-.92.58s-.15.76.17 1.11q1.77 1.59 2.25 2.25c.41.56.61 1.38.61 2.44c0 1.31.5 2.28 1.5 2.95c.56.44 1.17.77 1.85.99v-3.89c0-.94-.33-1.72-.96-2.35m8.92.05c-.62.62-.96 1.39-.96 2.3v3.93c.96-.34 1.76-.87 2.42-1.57c.65-.7.98-1.47.98-2.41c0-1.13.19-1.94.57-2.44c.09-.16.26-.36.53-.61c.23-.25.47-.49.71-.71c.23-.21.46-.43.68-.65l.33-.28a.9.9 0 0 0 .28-.66c0-.28-.09-.53-.28-.73s-.42-.3-.72-.3s-.5.09-.69.28M12 20c.69 0 1.36-.09 2-.28v-3.57c0-.59-.18-1.05-.59-1.49Q12.795 14 12 14c-.53 0-1 .2-1.38.61c-.4.39-.62.85-.62 1.45v3.66c.64.19 1.31.28 2 .28M9 8.5c0 .83-.67 1.5-1.5 1.5S6 9.33 6 8.5S6.67 7 7.5 7S9 7.67 9 8.5m9 0c0 .83-.67 1.5-1.5 1.5S15 9.33 15 8.5S15.67 7 16.5 7s1.5.67 1.5 1.5m-4.5-3c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 4 12 4s1.5.67 1.5 1.5m0 5.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5"
                />
              </svg>
            </div>

            <div className="card-body px-4">
              <h5 className="card-title fw-bold text-uppercase">
                Plan Familiar
              </h5>

              <p className="card-text text-muted">
                Plan para grupos familiares con beneficios especiales y acceso
                compartido.
              </p>

              <div className="d-flex justify-content-center gap-2 mb-3">
                <span className="badge rounded-pill text-bg-primary">
                  4 personas
                </span>
                <span className="badge rounded-pill text-bg-success">
                  Ahorro
                </span>
              </div>

              <button
                className="btn btn-familiar w-100"
                data-bs-toggle="modal"
                data-bs-target="#modalPlanFamiliar"
              >
                Ver plan
              </button>
            </div>
          </div>
        </div>

        {/* PLAN BÁSICO */}
        <div className="col-12 col-md-6 col-xl-4">
          <div className="card h-100 text-center card-basico circle hv-primary">
            <div className="pt-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path d="M0 0h48v48H0z" fill="none" />
                <g fill="none" stroke="#3391da" strokeWidth="4">
                  <path d="M36 15a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m12 16.77l8.003-2.772L31 19.247l-10.997 8.197L31 34.684l-6.992 9.314M35.32 21.643l2.682 1.459L44 17.466M16.849 31.545l-2.97 3.912l-9.875 5.54"
                  />
                </g>
              </svg>
            </div>

            <div className="card-body px-4">
              <h5 className="card-title fw-bold text-uppercase">Plan Básico</h5>

              <p className="card-text text-muted">
                Acceso esencial al gimnasio con beneficios limitados para
                entrenamiento libre.
              </p>

              <div className="d-flex justify-content-center gap-2 mb-3">
                <span className="badge rounded-pill text-bg-secondary">
                  Individual
                </span>
                <span className="badge rounded-pill text-bg-light border">
                  Económico
                </span>
              </div>

              <button
                className="btn btn-basico w-100"
                data-bs-toggle="modal"
                data-bs-target="#modalPlanBasico"
              >
                Ver plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
