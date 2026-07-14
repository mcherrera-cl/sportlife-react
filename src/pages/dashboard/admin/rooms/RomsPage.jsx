import { useEffect, useState } from "react";

import {
  Container,
  Table,
  Badge,
  Alert,
  Spinner,
  Card,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faDoorOpen,
  faPen,
  faTrash,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import {
  getRooms,
  deleteRoom,
} from "@services/rooms";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  async function loadRooms() {
    try {
      setLoading(true);

      const { ok, data } = await getRooms();

      if (ok) {
        setRooms(data);
        setFilteredRooms(data);
      }
    } catch (err) {
      setError(err.message || "Error cargando salas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    let result = rooms;

    if (search.trim()) {
      result = result.filter((room) =>
        room.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredRooms(result);
  }, [search, rooms]);

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
          <h2 className="mb-1">Salas</h2>

          <p className="text-body-secondary mb-0">
            Gestión de salas deportivas
          </p>
        </div>

        <Card className="shadow-sm border-0">
          <Card.Body className="d-flex align-items-center gap-3">

            <FontAwesomeIcon
              icon={faDoorOpen}
              size="2x"
              className="text-primary"
            />

            <div>
              <h4 className="mb-0">{rooms.length}</h4>

              <small className="text-body-secondary">
                Salas
              </small>
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
                  placeholder="Buscar sala..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>

            </Col>

            <Col md={3} className="text-end">

              <Button variant="danger">

                <FontAwesomeIcon
                  icon={faPlus}
                  className="me-2"
                />

                Nueva sala

              </Button>

            </Col>

          </Row>

          <Table hover responsive className="align-middle">

            <thead>

              <tr>

                <th>Nombre</th>

                <th>Capacidad</th>

                <th>Ubicación</th>

                <th>Estado</th>

                <th className="text-center">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredRooms.map((room) => (

                <tr key={room.id}>

                  <td>
                    <strong>{room.name}</strong>
                  </td>

                  <td>{room.capacity}</td>

                  <td>{room.location}</td>

                  <td>

                    <Badge bg={room.status ? "success" : "secondary"}>
                      {room.status ? "Activa" : "Inactiva"}
                    </Badge>

                  </td>

                  <td>

                    <div className="d-flex justify-content-center gap-2">

                      <Button
                        variant="outline-primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                      >
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