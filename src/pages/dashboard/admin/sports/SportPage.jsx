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
  faDumbbell,
  faPen,
  faTrash,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import {
  createSport,
  getSports,
  updateSport,
  deleteSport,
} from "@services/sports";
import { createSportForm, editSportForm } from "@utils/formAlerts";

export default function SportsPage() {
  const [sports, setSports] = useState([]);
  const [filteredSports, setFilteredSports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  async function loadSports() {
    try {
      setLoading(true);

      const { ok, data } = await getSports();

      if (ok) {
        setSports(data);
        setFilteredSports(data);
      }
    } catch (err) {
      setError(err.message || "Error cargando deportes");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    const result = await createSportForm();

    if (!result.isConfirmed) return;

    try {
      const { ok } = await createSport(result.value);

      if (ok) {
        loadSports();
      }
    } catch (err) {
      setError(err.message || "Error creando deporte");
    }
  }

  async function handleEdit(sport) {
    const result = await editSportForm(sport);

    if (!result.isConfirmed) return;

    try {
      const { ok } = await updateSport(sport.id, result.value);

      if (ok) {
        loadSports();
      }
    } catch (err) {
      setError(err.message || "Error editando deporte");
    }
  }

  async function handleDelete(id) {
    try {
      const confirm = window.confirm("¿Deseas eliminar este deporte?");

      if (!confirm) return;

      const { ok } = await deleteSport(id);

      if (ok) {
        loadSports();
      }
    } catch (err) {
      setError(err.message || "Error eliminando deporte");
    }
  }

  useEffect(() => {
    loadSports();
  }, []);

  useEffect(() => {
    let result = sports;

    if (search.trim()) {
      result = result.filter((sport) =>
        sport.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredSports(result);
  }, [search, sports]);

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
          <h2 className="mb-1">Deportes</h2>

          <p className="text-body-secondary mb-0">
            Gestión de disciplinas deportivas
          </p>
        </div>

        <Card className="shadow-sm border-0">
          <Card.Body className="d-flex align-items-center gap-3">
            <FontAwesomeIcon
              icon={faDumbbell}
              size="2x"
              className="text-primary"
            />

            <div>
              <h4 className="mb-0">{sports.length}</h4>

              <small className="text-body-secondary">Deportes</small>
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
                  placeholder="Buscar deporte..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Col>
            <Col md={3} className="text-end">
              <Button variant="danger" onClick={handleCreate}>
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Nuevo deporte
              </Button>
            </Col>
          </Row>

          <Table hover responsive className="align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Objetivo</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSports.map((sport) => (
                <tr key={sport.id}>
                  <td>
                    <strong>{sport.name}</strong>
                  </td>
                  <td>{sport.objective || "Sin objetivo"}</td>
                  <td>
                    <Badge bg={sport.status ? "success" : "secondary"}>
                      {sport.status ? "Activo" : "Inactivo"}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(sport)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(sport.id)}
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
