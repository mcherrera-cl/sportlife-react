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
  faLink,
  faPen,
  faTrash,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import {
  loadingAlert,
  closeAlert,
  successAlert,
  confirmAlert,
} from "@utils/alerts";

import {
  getSportRooms,
  createSportRoom,
  deleteSportRoom,
  updateSportRoom,
} from "@services/sportRooms";

import { getSports } from "@services/sports";
import { getRooms } from "@services/rooms";
import { getUsers } from "@services/users";

import {
  createSportRoomForm,
  editSportRoomForm,
} from "@utils/formSportRoomsAlert";

export default function SportRoomsPage() {
  const [sportRooms, setSportRooms] = useState([]);
  const [sports, setSports] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [filteredSportRooms, setFilteredSportRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  async function loadData(showLoader = true) {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const [sportRoomsRes, sportsRes, roomsRes, usersRes] = await Promise.all([
        getSportRooms(),
        getSports(),
        getRooms(),
        getUsers(),
      ]);

      if (sportRoomsRes.ok) {
        setSportRooms(sportRoomsRes.data);

        setFilteredSportRooms(sportRoomsRes.data);
      }

      if (sportsRes.ok) {
        setSports(sportsRes.data.filter((sport) => sport.status));
      }

      if (roomsRes.ok) {
        setRooms(roomsRes.data.filter((room) => room.status));
      }

      if (usersRes.ok) {
        setCoaches(usersRes.data.filter((user) => user.role === "coach"));
      }
    } catch (err) {
      setError(err.message || "Error cargando asignaciones");
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }

  async function handleCreate() {
    const { isConfirmed, value } = await createSportRoomForm(
      sports,
      rooms,
      coaches,
    );

    if (!isConfirmed) return;

    try {
      loadingAlert(
        "Creando asignación...",
        "Registrando deporte, sala y coach.",
      );

      const { ok } = await createSportRoom(value);

      if (ok) {
        await loadData(false);

        closeAlert();

        successAlert(
          "Asignación creada",
          "La asignación fue registrada correctamente.",
        );
      }
    } catch (error) {
      closeAlert();

      console.error(error);
    }
  }

  async function handleEdit(item) {
    const { isConfirmed, value } = await editSportRoomForm(
      item,
      sports,
      rooms,
      coaches,
    );

    if (!isConfirmed) return;

    try {
      loadingAlert("Actualizando asignación...", "Guardando cambios.");

      const { ok } = await updateSportRoom(item.id, value);

      if (ok) {
        await loadData(false);

        closeAlert();

        successAlert("Asignación actualizada", "Los cambios fueron guardados.");
      }
    } catch (error) {
      closeAlert();

      console.error(error);
    }
  }

  async function handleDelete(item) {
    const { isConfirmed } = await confirmAlert(
      "¿Eliminar asignación?",
      `¿Estás seguro de eliminar ${item.sport?.name} en ${item.room?.name}?`,
      "Eliminar",
      "Cancelar",
      "warning",
    );

    if (!isConfirmed) return;

    try {
      loadingAlert("Eliminando asignación...", "Procesando la eliminación.");

      const { ok } = await deleteSportRoom(item.id);

      if (ok) {
        await loadData(false);

        closeAlert();

        successAlert(
          "Asignación eliminada",
          "La asignación fue eliminada correctamente.",
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
    let result = sportRooms;

    if (search.trim()) {
      result = result.filter(
        (item) =>
          item.sport?.name?.toLowerCase().includes(search.toLowerCase()) ||
          item.room?.name?.toLowerCase().includes(search.toLowerCase()) ||
          item.coach?.full_name?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredSportRooms(result);
  }, [search, sportRooms]);

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
          <h2 className="mb-1">Asignaciones</h2>

          <p className="text-body-secondary mb-0">
            Gestión de deportes, salas y coaches
          </p>
        </div>

        <Card className="shadow-sm border-0">
          <Card.Body className="d-flex align-items-center gap-3">
            <FontAwesomeIcon icon={faLink} size="2x" className="text-primary" />

            <div>
              <h4 className="mb-0">{sportRooms.length}</h4>

              <small className="text-body-secondary">Asignaciones</small>
            </div>
          </Card.Body>
        </Card>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm border-0">
        <Card.Body>
          <Row className="mb-4">
            <Col md={9}>
              <div className="position-relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="position-absolute top-50 translate-middle-y ms-3 text-secondary"
                />

                <Form.Control
                  className="ps-5"
                  placeholder="Buscar deporte, sala o coach..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Col>

            <Col md={3} className="text-end">
              <Button variant="danger" onClick={handleCreate}>
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Nueva asignación
              </Button>
            </Col>
          </Row>

          <Table hover responsive className="align-middle">
            <thead>
              <tr>
                <th>Deporte</th>

                <th>Sala</th>

                <th>Coach</th>

                <th>Estado</th>

                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredSportRooms.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.sport?.name}</strong>
                  </td>

                  <td>{item.room?.name}</td>

                  <td>{item.coach?.full_name}</td>

                  <td>
                    <Badge bg={item.status ? "success" : "secondary"}>
                      {item.status ? "Activa" : "Inactiva"}
                    </Badge>
                  </td>

                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Button>

                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
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
