import { useEffect, useState } from "react";

import {
  Container,
  Card,
  Row,
  Col,
  Badge,
  Alert,
  Spinner,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faDumbbell,
  faLocationDot,
  faClock,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

import { getMyClasses } from "@services/coach";

export default function MyClasses() {
  const [classes, setClasses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  async function loadClasses() {
    try {
      setLoading(true);

      const { ok, data } = await getMyClasses();

      if (ok) {
        setClasses(data);
      }
    } catch (err) {
      setError(err.message || "Error cargando clases");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClasses();
  }, []);

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2>Mis clases</h2>

        <p className="text-body-secondary mb-0">
          Gestión de las actividades deportivas asignadas.
        </p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {classes.length === 0 ? (
        <Alert variant="info">No tienes clases asignadas actualmente.</Alert>
      ) : (
        <Row className="g-4">
          {classes.map((item) => (
            <Col md={6} lg={4} key={item.id}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title>
                      <FontAwesomeIcon icon={faDumbbell} className="me-2" />

                      {item.sport?.name}
                    </Card.Title>

                    <Badge bg="success">Activa</Badge>
                  </div>

                  <hr />

                  <p>
                    <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                    <strong>Sala:</strong> {item.room?.name}
                  </p>

                  <p>
                    <strong>Objetivo:</strong> {item.sport?.objective}
                  </p>

                  <p>
                    <strong>Duración:</strong> {item.sport?.duration} minutos
                  </p>

                  <hr />

                  <h6>
                    <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
                    Horarios
                  </h6>

                  {item.schedules?.map((schedule) => (
                    <div key={schedule.id} className="mb-2">
                      <Badge bg="primary">{days[schedule.day_of_week]}</Badge>

                      <p className="mb-0 mt-1">
                        <FontAwesomeIcon icon={faClock} className="me-2" />

                        {schedule.start_time}
                        {" - "}
                        {schedule.end_time}
                      </p>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
