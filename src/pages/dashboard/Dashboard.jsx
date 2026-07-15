import { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";

import {
  faUsers,
  faDumbbell,
  faDoorOpen,
  faLink,
  faCalendarDays,
  faFire,
  faMedal,
  faHeartPulse,
  faClipboardCheck,
  faChalkboardUser,
  faLocationDot,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Bar, Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { successAlert } from "@utils/alerts";
import { useAuth } from "@context/AuthContext";
import { getDashboardAdmin } from "@services/dashboard";
import { getCoachDashboard } from "@services/coach";

import styles from "./Dashboard.module.css";

ChartJS.register(
  CategoryScale,

  LinearScale,

  BarElement,

  ArcElement,

  Tooltip,

  Legend,
);

export default function Dashboard() {
  const location = useLocation();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [coachDashboard, setCoachDashboard] = useState(null);

  useEffect(() => {
    const message = location.state?.successMessage;

    if (message) {
      successAlert(message.title, message.text, "bottom-end");

      navigate(location.pathname, {
        replace: true,
      });
    }
  }, []);

  useEffect(() => {
    if (user?.role === "admin") {
      loadDashboard();
    }

    if (user?.role === "coach") {
      loadCoachDashboard();
    }
  }, [user]);

  async function loadCoachDashboard() {
    try {
      const { ok, data } = await getCoachDashboard();

      if (ok) {
        setCoachDashboard(data);
      }
    } catch (error) {
      console.error("Error cargando dashboard coach", error);
    }
  }

  async function loadDashboard() {
    try {
      const [users, sports, rooms, sportRooms, schedules, reservations] =
        await getDashboardAdmin();

      setDashboard({
        users: users.data.length,

        sports: sports.data.filter((item) => item.status).length,

        rooms: rooms.data.filter((item) => item.status).length,

        sportRooms: sportRooms.data.length,

        schedules: schedules.data.length,

        reservations: reservations.data.length,
      });
    } catch (error) {
      console.error("Error cargando dashboard", error);
    }
  }

  const motivationalMessages = [
    {
      title: "¡Bienvenido!",
      text: "Cada entrenamiento te acerca a una mejor versión de ti. ¡No dejes de avanzar!",
    },
    {
      title: "La constancia es la clave",
      text: "No importa la intensidad, lo importante es mantener el hábito.",
    },
    {
      title: "Un día a la vez",
      text: "Cada reserva es una oportunidad para mejorar tu salud y bienestar.",
    },
    {
      title: "Mantente activo",
      text: "El ejercicio regular mejora tu energía, tu ánimo y tu calidad de vida.",
    },
    {
      title: "Disfruta el proceso",
      text: "No entrenes solo por el resultado, disfruta cada sesión.",
    },
    {
      title: "Nunca es tarde",
      text: "Siempre es un buen momento para comenzar una nueva rutina deportiva.",
    },
  ];

  const randomMessage =
    motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];
  return (
    <Container className="py-4">
      {/* SALUDO GENERAL */}

      <h1>
        <span className={styles.hi}></span>
        Hola
        <span className="text-capitalize"> {user.full_name}</span>
      </h1>

      {/* DASHBOARD ADMIN */}

      {user.role === "admin" &&
        (dashboard ? (
          <>
            <h3 className="mt-5 mb-4">Panel Administrativo</h3>

            <Row className="g-3">
              <DashboardCard
                icon={faUsers}
                title="Usuarios"
                value={dashboard.users}
              />

              <DashboardCard
                icon={faDumbbell}
                title="Deportes"
                value={dashboard.sports}
              />

              <DashboardCard
                icon={faDoorOpen}
                title="Salas"
                value={dashboard.rooms}
              />

              <DashboardCard
                icon={faLink}
                title="Asignaciones"
                value={dashboard.sportRooms}
              />

              <DashboardCard
                icon={faCalendarDays}
                title="Horarios"
                value={dashboard.schedules}
              />

              <DashboardCard
                icon={faClipboardCheck}
                title="Reservas"
                value={dashboard.reservations}
              />
            </Row>

            <Row className="mt-5 g-4">
              <Col md={6}>
                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <h5>Recursos del club</h5>

                    <Doughnut
                      data={{
                        labels: ["Deportes", "Salas", "Horarios"],

datasets: [
  {
    data: [
      dashboard.sports,
      dashboard.rooms,
      dashboard.schedules,
    ],

    backgroundColor: [
      "#dc3545",
      "#fd7e14",
      "#ffc107",
    ],

    borderWidth: 0,
  },
],
                      }}
                    />
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <h5>Resumen general</h5>

                    <Bar
                      data={{
                        labels: ["Usuarios", "Asignaciones", "Reservas"],

                        datasets: [
                          {
                            label: "Cantidad",

                            data: [
                              dashboard.users,

                              dashboard.sportRooms,

                              dashboard.reservations,
                            ],
                          },
                        ],
                      }}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ))}
      {/* DASHBOARD USER */}

      {user.role === "user" && (
        <>
          <Card
            className="border-0 shadow-lg text-white mb-4"
            style={{
              background: "linear-gradient(135deg, #0d6efd 0%, #4f46e5 100%)",
              borderRadius: "20px",
            }}
          >
            <Card.Body className="p-5">
              <h2 className="fw-bold">
                ¡Bienvenido nuevamente, {user.full_name}!
              </h2>
              <p className="fs-5 opacity-75 mt-3">{randomMessage.text}</p>
              <div className="mt-4">
                <Button
                  variant="light"
                  onClick={() => navigate("/dashboard/reservations")}
                >
                  Reserva tu próxima clase
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Row className="g-4">
            <Col md={6}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon
                      icon={faFire}
                      size="2x"
                      className="text-danger me-3"
                    />

                    <h5 className="mb-0">Motivación del día</h5>
                  </div>

                  <p className="text-body-secondary">
                    "La disciplina supera a la motivación. Cada entrenamiento
                    cuenta."
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon
                      icon={faHeartPulse}
                      size="2x"
                      className="text-success me-3"
                    />

                    <h5 className="mb-0">Consejo saludable</h5>
                  </div>

                  <p className="text-body-secondary">
                    Mantente hidratado antes, durante y después de cada
                    entrenamiento.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon
                      icon={faDumbbell}
                      size="2x"
                      className="text-primary me-3"
                    />

                    <h5 className="mb-0">Recuerda</h5>
                  </div>

                  <ul className="mb-0">
                    <li>Reserva con anticipación.</li>
                    <li>Llega 10 minutos antes.</li>
                    <li>Cancela si no asistirás.</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon
                      icon={faMedal}
                      size="2x"
                      className="text-warning me-3"
                    />

                    <h5 className="mb-0">Objetivo</h5>
                  </div>

                  <p className="text-body-secondary mb-0">
                    Cada sesión es una oportunidad para mejorar tu rendimiento y
                    cuidar tu salud.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {/* DASHBOARD COACH */}

      {user.role === "coach" &&
        (coachDashboard ? (
          <>
            <Card
              className="border-0 shadow-lg text-white mb-4"
              style={{
                background: "linear-gradient(135deg, #198754 0%, #20c997 100%)",
                borderRadius: "20px",
              }}
            >
              <Card.Body className="p-5">
                <div className="d-flex align-items-center mb-3">
                  <FontAwesomeIcon
                    icon={faChalkboardUser}
                    size="3x"
                    className="me-3"
                  />

                  <div>
                    <h2 className="fw-bold mb-1">Panel del Coach</h2>

                    <p className="mb-0 opacity-75">
                      Administra tus actividades y horarios asignados.
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Row className="g-4 mb-4">
              <DashboardCard
                icon={faDumbbell}
                title="Actividades"
                value={coachDashboard.total_classes}
              />

              <DashboardCard
                icon={faCalendarDays}
                title="Horarios"
                value={coachDashboard.total_schedules}
              />

              <DashboardCard
                icon={faDoorOpen}
                title="Salas asignadas"
                value={coachDashboard.total_rooms}
              />
            </Row>

            {coachDashboard.next_class && (
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                  <h4 className="mb-4">
                    <FontAwesomeIcon icon={faClock} className="me-2" />
                    Próxima clase
                  </h4>

                  <Row>
                    <Col md={6}>
                      <h3>
                        {coachDashboard.next_class.sportRoom?.sport?.name}
                      </h3>

                      <p className="text-body-secondary">
                        {coachDashboard.next_class.sportRoom?.sport?.objective}
                      </p>

                      <p>
                        <strong>Duración:</strong>{" "}
                        {coachDashboard.next_class.sportRoom?.sport?.duration}{" "}
                        minutos
                      </p>
                    </Col>

                    <Col md={6}>
                      <p>
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="me-2"
                        />
                        <strong>Sala:</strong>{" "}
                        {coachDashboard.next_class.sportRoom?.room?.name}
                      </p>

                      <p>
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          className="me-2"
                        />
                        <strong>Día:</strong>{" "}
                        {
                          [
                            "Domingo",
                            "Lunes",
                            "Martes",
                            "Miércoles",
                            "Jueves",
                            "Viernes",
                            "Sábado",
                          ][coachDashboard.next_class.day_of_week]
                        }
                      </p>

                      <p>
                        <FontAwesomeIcon icon={faClock} className="me-2" />
                        <strong>Horario:</strong>{" "}
                        {coachDashboard.next_class.start_time}
                        {" - "}
                        {coachDashboard.next_class.end_time}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </>
        ) : (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ))}
    </Container>
  );
}

function DashboardCard({
  icon,

  title,

  value,
}) {
  return (
    <Col md={4}>
      <Card className="shadow-sm border-0">
        <Card.Body className="d-flex align-items-center gap-3">
          <FontAwesomeIcon icon={icon} size="2x" />

          <div>
            <h4 className="mb-0">{value}</h4>

            <small>{title}</small>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
