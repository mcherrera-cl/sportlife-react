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
  faCalendarDays,
  faClock,
  faDumbbell,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import { getMySchedules } from "@services/coach";

export default function MySchedule() {
  const [schedules, setSchedules] = useState([]);

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

  async function loadSchedules() {
    try {
      setLoading(true);

      const { ok, data } = await getMySchedules();

      if (ok) {
        setSchedules(data);
      }
    } catch (error) {
      setError(error.message || "Error cargando horarios");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSchedules();
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
        <h2>Mi horario</h2>

        <p className="text-body-secondary mb-0">
          Consulta tus actividades deportivas asignadas.
        </p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {schedules.length === 0 ? (
        <Alert variant="info">No tienes horarios asignados actualmente.</Alert>
      ) : (
        <Row className="g-4">
          {schedules.map((item) => (
            <Col md={6} lg={4} key={item.id}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title>
                      <FontAwesomeIcon icon={faDumbbell} className="me-2" />

                      {item.sportRoom?.sport?.name ?? "Actividad"}
                    </Card.Title>

                    <Badge bg="success">Activo</Badge>
                  </div>

                  <hr />

                  <p>
                    <FontAwesomeIcon icon={faCalendarDays} className="me-2" />
                    <strong>Día:</strong> {days[item.day_of_week]}
                  </p>

                  <p>
                    <FontAwesomeIcon icon={faClock} className="me-2" />
                    <strong>Horario:</strong> {item.start_time}
                    {" - "}
                    {item.end_time}
                  </p>

                  <p>
                    <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                    <strong>Sala:</strong>{" "}
                    {item.sportRoom?.room?.name ?? "Sin sala"}
                  </p>

                  <p className="text-body-secondary">
                    {item.sportRoom?.sport?.objective}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
