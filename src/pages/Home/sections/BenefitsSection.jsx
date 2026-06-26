import styles from './BenefitsSection.module.css'

export default () => {
  return (
    <section className="py-5 overflow-hidden container">

      {/* TITULO */}
      <div className="text-center mb-4">
        <h2 className="fw-bold display-4 text-uppercase">
          Entrena. Supera. Evoluciona.
        </h2>
        <p className="text-muted fs-5 mt-3">
          Todo lo que necesitas para alcanzar tus objetivos.
        </p>
      </div>

      {/* SLIDER */}
      <div className={styles.benefitsSlider}>
        <div className={styles.benefitsTrack}>

          {/* items */}
          <div className={styles.benefitItem}>
            <i className="fa-solid fa-dumbbell"></i>
            <span>Equipamiento Moderno</span>
          </div>

          <div className={styles.benefitItem}>
            <i className="fa-solid fa-user-group"></i>
            <span>Coaches Certificados</span>
          </div>

          <div className={styles.benefitItem}>
            <i className="fa-solid fa-heart-pulse"></i>
            <span>Bienestar Integral</span>
          </div>

          <div className={styles.benefitItem}>
            <i className="fa-solid fa-trophy"></i>
            <span>Resultados Reales</span>
          </div>

          <div className={styles.benefitItem}>
            <i className="fa-solid fa-bolt"></i>
            <span>Más Energía</span>
          </div>

          <div className={styles.benefitItem}>
            <i className="fa-solid fa-fire"></i>
            <span>Quema Calorías</span>
          </div>

          {/* DUPLICADOS (loop infinito visual) */}
          <div className={styles.benefitItem}>
            <i className="fa-solid fa-dumbbell"></i>
            <span>Equipamiento Moderno</span>
          </div>

          <div className={styles.benefitItem}>
            <i className="fa-solid fa-user-group"></i>
            <span>Coaches Certificados</span>
          </div>

          <div className={styles.benefitItem}>
            <i className="fa-solid fa-heart-pulse"></i>
            <span>Bienestar Integral</span>
          </div>

          <div className={styles.benefitItem}>
            <i className="fa-solid fa-trophy"></i>
            <span>Resultados Reales</span>
          </div>

          <div className={styles.benefitItem}>
            <i className="fa-solid fa-bolt"></i>
            <span>Más Energía</span>
          </div>

          <div className={styles.benefitItem}>
            <i className="fa-solid fa-fire"></i>
            <span>Quema Calorías</span>
          </div>

        </div>
      </div>

    </section>
  );
}