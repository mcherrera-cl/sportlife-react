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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { loadingAlert, closeAlert, successAlert } from "@utils/alerts";

import {
  getMyReservations,
  cancelReservation,
  createReservation,
} from "@services/reservation";

import { getClassSchedules } from "@services/classSchedules";

import { createReservationForm } from "@utils/formReservationsAlert";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);

  const [schedules, setSchedules] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  async function loadData(showLoader = true) {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const [reservationsRes, schedulesRes] = await Promise.all([
        getMyReservations(),
        getClassSchedules(),
      ]);

      if (reservationsRes.ok) {
        const activeReservations = reservationsRes.data.filter(
          (reservation) => reservation.status === "active",
        );

        setReservations(activeReservations);

        if (schedulesRes.ok) {
          const reservedSchedules = activeReservations.map(
            (reservation) => reservation.class_schedule_id,
          );

          setSchedules(
            schedulesRes.data.filter(
              (schedule) =>
                schedule.status && !reservedSchedules.includes(schedule.id),
            ),
          );
        }
      }
    } catch (err) {
      setError(err.message || "Error cargando datos");
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  async function handleCreate() {
    const { isConfirmed, value } = await createReservationForm(schedules);

    if (!isConfirmed) return;

    try {
      loadingAlert("Creando reserva...", "Registrando la reserva.");

      const { ok } = await createReservation(value);

      if (ok) {
        await loadData(false);

        closeAlert();

        successAlert(
          "Reserva creada",
          "La reserva fue registrada correctamente.",
        );
      }
    } catch (err) {
      closeAlert();

      console.error(err);
    }
  }

  async function handleCancel(id) {
    try {
      loadingAlert("Cancelando reserva...", "Procesando la cancelación.");

      const { ok } = await cancelReservation(id);

      if (ok) {
        await loadData(false);

        closeAlert();

        successAlert(
          "Reserva cancelada",
          "La reserva fue cancelada correctamente.",
        );
      }
    } catch (err) {
      closeAlert();

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Mis reservas</h2>

          <p className="text-body-secondary mb-0">
            Gestión de reservas deportivas
          </p>
        </div>

        <Button variant="primary" onClick={handleCreate}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Nueva reserva
        </Button>
      </div>

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
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <Card.Title>{sport?.name ?? "Deporte"}</Card.Title>

                      <Badge bg="success">Activa</Badge>
                    </div>

                    <hr />

                    <p>
                      <strong>Sala:</strong> {room?.name}
                    </p>

                    <p>
                      <strong>Horario:</strong> {schedule?.start_time}
                      {" - "}
                      {schedule?.end_time}
                    </p>

                    <p>
                      <strong>Coach:</strong> {coach?.full_name}
                    </p>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleCancel(reservation.id)}
                    >
                      Cancelar reserva
                    </Button>
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
