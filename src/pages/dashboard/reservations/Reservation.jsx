import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Badge,
  Alert,
  Spinner,
} from "react-bootstrap";

import { getMyReservations, cancelReservation } from "@services/reservation";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadReservations() {
    try {
      setLoading(true);

      const { ok, data } = await getMyReservations();

      if (ok) {
        setReservations(data);
      }
    } catch (err) {
      setError(err.message || "Error cargando reservas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReservations();
  }, []);

  async function handleCancel(id) {
    try {
      const { ok } = await cancelReservation(id);

      if (ok) {
        loadReservations();
      }
    } catch (err) {
      setError(err.message || "No se pudo cancelar la reserva");
    }
  }

  if (loading) {
    return (
      <Container className="py-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Mis reservas</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {reservations.length === 0 ? (
        <Alert variant="info">No tienes reservas realizadas.</Alert>
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
                <Card className="h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <Card.Title>{sport?.name ?? "Deporte"}</Card.Title>

                      <Badge
                        bg={
                          reservation.status === "active"
                            ? "success"
                            : "secondary"
                        }
                      >
                        {reservation.status}
                      </Badge>
                    </div>

                    <hr />

                    <p>
                      <strong>Sala:</strong> {room?.name ?? "-"}
                    </p>

                    <p>
                      <strong>Ubicación:</strong> {room?.location ?? "-"}
                    </p>

                    <p>
                      <strong>Horario:</strong> {schedule?.start_time} -{" "}
                      {schedule?.end_time}
                    </p>

                    <p>
                      <strong>Duración:</strong> {sport?.duration ?? "-"}{" "}
                      minutos
                    </p>

                    <p>
                      <strong>Coach:</strong> {coach?.email ?? "-"}
                    </p>

                    <p>
                      <strong>Observación:</strong>{" "}
                      {reservation.observation ?? "-"}
                    </p>

                    {reservation.status === "active" && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancel(reservation.id)}
                      >
                        Cancelar reserva
                      </Button>
                    )}
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
