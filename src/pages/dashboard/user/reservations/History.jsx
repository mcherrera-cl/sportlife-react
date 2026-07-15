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

import { getMyReservations } from "@services/reservation";

export default function ReservationHistory() {
  const [reservations, setReservations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  async function loadReservations() {
    try {
      setLoading(true);

      const { ok, data } = await getMyReservations();

      if (ok) {
        setReservations(
          data.filter((reservation) => reservation.status === "cancelled"),
        );
      }
    } catch (err) {
      setError(err.message || "Error cargando historial");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReservations();
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
        <h2>Historial de reservas</h2>

        <p className="text-body-secondary mb-0">
          Reservas canceladas anteriormente.
        </p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {reservations.length === 0 ? (
        <Alert variant="info">No tienes reservas canceladas.</Alert>
      ) : (
        <Row className="g-4">
          {reservations.map((reservation) => {
            const schedule = reservation.classSchedule;

            const sportRoom = schedule?.sportRoom;

            const sport = sportRoom?.sport;

            const room = sportRoom?.room;

            const coach = sportRoom?.coach;

            return (
              <Col md={6} lg={4} key={reservation.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <Card.Title>{sport?.name ?? "Deporte"}</Card.Title>

                      <Badge bg="secondary">Cancelada</Badge>
                    </div>

                    <hr />

                    <p>
                      <strong>Sala:</strong> {room?.name}
                    </p>

                    <p>
                      <strong>Horario:</strong> {schedule?.start_time} -{" "}
                      {schedule?.end_time}
                    </p>

                    <p>
                      <strong>Coach:</strong> {coach?.full_name ?? coach?.email}
                    </p>

                    {reservation.observation && (
                      <p>
                        <strong>Observación:</strong> {reservation.observation}
                      </p>
                    )}

                    <p className="mb-0 text-body-secondary small">
                      <strong>Cancelada:</strong>{" "}
                      {new Date(reservation.updated_at).toLocaleString(
                        "es-CL",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}
