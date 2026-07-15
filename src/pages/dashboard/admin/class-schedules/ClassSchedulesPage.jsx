import { useEffect, useState } from "react";

import {
  Container,
  Table,
  Alert,
  Spinner,
  Card,
  Button,
  Form,
  Row,
  Col,
  Badge,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCalendarDays,
  faPen,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import {
  loadingAlert,
  closeAlert,
  successAlert,
  confirmAlert,
} from "@utils/alerts";

import {
  getClassSchedules,
  createClassSchedule,
  updateClassSchedule,
  deleteClassSchedule,
} from "@services/classSchedules";

import { getSportRooms } from "@services/sportRooms";

import {
  createClassScheduleForm,
  editClassScheduleForm,
} from "@utils/formClassSchedulesAlert";

export default function ClassSchedulesPage() {
  const [schedules, setSchedules] = useState([]);

  const [sportRooms, setSportRooms] = useState([]);

  const [filteredSchedules, setFilteredSchedules] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const days = {
    0: "Domingo",
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
  };

  async function loadData(showLoader = true) {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const [schedulesRes, sportRoomsRes] = await Promise.all([
        getClassSchedules(),
        getSportRooms(),
      ]);

      if (schedulesRes.ok) {
        setSchedules(schedulesRes.data);

        setFilteredSchedules(schedulesRes.data);
      }

      if (sportRoomsRes.ok) {
        setSportRooms(sportRoomsRes.data.filter((item) => item.status));
      }
    } catch (error) {
      setError(error.message || "Error cargando horarios");
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }

  async function handleCreate() {
    const { isConfirmed, value } = await createClassScheduleForm(sportRooms);

    if (!isConfirmed) return;

    try {
      loadingAlert("Creando horario...", "Registrando nuevo horario.");

      const { ok } = await createClassSchedule(value);

      if (ok) {
        await loadData(false);

        closeAlert();

        successAlert(
          "Horario creado",
          "El horario fue registrado correctamente.",
        );
      }
    } catch (error) {
      closeAlert();

      console.error(error);
    }
  }

  async function handleEdit(item) {
    const { isConfirmed, value } = await editClassScheduleForm(
      item,
      sportRooms,
    );

    if (!isConfirmed) return;

    try {
      loadingAlert("Actualizando horario...", "Guardando cambios.");

      const { ok } = await updateClassSchedule(item.id, value);

      if (ok) {
        await loadData(false);

        closeAlert();

        successAlert("Horario actualizado", "Los cambios fueron guardados.");
      }
    } catch (error) {
      closeAlert();

      console.error(error);
    }
  }

  async function handleDelete(item) {
    const { isConfirmed } = await confirmAlert(
      "¿Eliminar horario?",
      `¿Eliminar horario de ${item.sportRoom?.sport?.name}?`,
      "Eliminar",
      "Cancelar",
    );

    if (!isConfirmed) return;

    try {
      loadingAlert("Eliminando horario...", "Procesando eliminación.");

      const { ok } = await deleteClassSchedule(item.id);

      if (ok) {
        await loadData(false);

        closeAlert();

        successAlert(
          "Horario eliminado",
          "El horario fue eliminado correctamente.",
        );
      }
    } catch (error) {
      closeAlert();

      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let result = schedules;

    if (search.trim()) {
      result = result.filter(
        (item) =>
          item.sportRoom?.sport?.name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          item.sportRoom?.room?.name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          item.sportRoom?.coach?.full_name
            ?.toLowerCase()
            .includes(search.toLowerCase()),
      );
    }

    setFilteredSchedules(result);
  }, [search, schedules]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Horarios</h2>

          <p className="text-body-secondary mb-0">
            Gestión de horarios deportivos
          </p>
        </div>

        <Card className="shadow-sm border-0">
          <Card.Body className="d-flex gap-3 align-items-center">
            <FontAwesomeIcon
              icon={faCalendarDays}
              size="2x"
              className="text-primary"
            />

            <div>
              <h4 className="mb-0">{schedules.length}</h4>

              <small>Horarios</small>
            </div>
          </Card.Body>
        </Card>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm border-0">
        <Card.Body>
          <Row className="mb-4">
            <Col md={9}>
              <Form.Control
                placeholder="Buscar deporte, sala o coach..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>

            <Col md={3} className="text-end">
              <Button variant="danger" onClick={handleCreate}>
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Nuevo horario
              </Button>
            </Col>
          </Row>

          <Table hover responsive>
            <thead>
              <tr>
                <th>Deporte</th>

                <th>Sala</th>

                <th>Coach</th>

                <th>Día</th>

                <th>Horario</th>

                <th>Estado</th>

                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredSchedules.map((item) => (
                <tr key={item.id}>
                  <td>{item.sportRoom?.sport?.name || "-"}</td>

                  <td>{item.sportRoom?.room?.name || "-"}</td>

                  <td>{item.sportRoom?.coach?.full_name || "-"}</td>

                  <td>{days[item.day_of_week]}</td>

                  <td>
                    {item.start_time}
                    {" - "}
                    {item.end_time}
                  </td>

                  <td>
                    <Badge bg={item.status ? "success" : "secondary"}>
                      {item.status ? "Activo" : "Inactivo"}
                    </Badge>
                  </td>

                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => handleEdit(item)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="ms-2"
                      onClick={() => handleDelete(item)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
