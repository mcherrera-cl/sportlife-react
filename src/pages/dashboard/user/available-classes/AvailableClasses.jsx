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

import {
  faCalendarPlus,
  faClock,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import {
  loadingAlert,
  closeAlert,
  successAlert,
} from "@utils/alerts";

import { getClassSchedules } from "@services/classSchedules";

import {
  getMyReservations,
  createReservation,
} from "@services/reservation";

export default function AvailableClasses() {
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

      if (reservationsRes.ok && schedulesRes.ok) {
        const reservedSchedules = reservationsRes.data
          .filter((reservation) => reservation.status === "active")
          .map((reservation) => reservation.class_schedule_id);

        setSchedules(
          schedulesRes.data.filter(
            (schedule) =>
              schedule.status &&
              !reservedSchedules.includes(schedule.id),
          ),
        );
      }
    } catch (err) {
      setError(err.message || "Error cargando clases");
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleReserve(scheduleId) {
    try {
      loadingAlert(
        "Creando reserva...",
        "Registrando la reserva.",
      );

      const { ok } = await createReservation({
        class_schedule_id: scheduleId,
      });

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

      setError(err.message || "No se pudo crear la reserva");
    }
  }

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

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
        <h2>Clases disponibles</h2>

        <p className="text-body-secondary">
          Reserva cualquiera de las siguientes clases.
        </p>
      </div>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {schedules.length === 0 ? (
        <Alert variant="info">
          No existen clases disponibles para reservar.
        </Alert>
      ) : (
        <Row className="g-4">
          {schedules.map((schedule) => {
            const sportRoom = schedule.sportRoom;

            const sport = sportRoom?.sport;

            const room = sportRoom?.room;

            const coach = sportRoom?.coach;

            return (
              <Col
                md={6}
                lg={4}
                key={schedule.id}
              >
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <Card.Title className="mb-0">
                        {sport?.name}
                      </Card.Title>

                      <Badge bg="success">
                        Disponible
                      </Badge>
                    </div>

                    <hr />

                    <p>
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="me-2"
                      />

                      <strong>Sala:</strong>{" "}
                      {room?.name}
                    </p>

                    <p>
                      <FontAwesomeIcon
                        icon={faUser}
                        className="me-2"
                      />

                      <strong>Coach:</strong>{" "}
                      {coach?.full_name ??
                        coach?.email}
                    </p>

                    <p>
                      <FontAwesomeIcon
                        icon={faClock}
                        className="me-2"
                      />

                      <strong>Día:</strong>{" "}
                      {days[schedule.day_of_week]}
                    </p>

                    <p>
                      <strong>Horario:</strong>{" "}
                      {schedule.start_time} -{" "}
                      {schedule.end_time}
                    </p>
                  </Card.Body>

                  <Card.Footer className="bg-transparent border-0">
                    <Button
                      className="w-100"
                      onClick={() =>
                        handleReserve(schedule.id)
                      }
                    >
                      <FontAwesomeIcon
                        icon={faCalendarPlus}
                        className="me-2"
                      />
                      Reservar
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}