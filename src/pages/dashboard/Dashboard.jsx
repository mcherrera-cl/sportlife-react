import { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

import {
  faUsers,
  faDumbbell,
  faDoorOpen,
  faLink,
  faCalendarDays,
  faClipboardCheck,
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
  }, [user]);

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
