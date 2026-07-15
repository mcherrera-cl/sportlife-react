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
  faPen,
  faTrash,
  faSearch,
  faPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { createUserForm, editUserForm } from "../../../../utils/formAlerts";
import {
  successAlert,
  loadingAlert,
  closeAlert,
  confirmAlert,
} from "@utils/alerts";

import { createUser, getUsers, updateUser, deleteUser } from "@services/users";
import { getSports } from "@services/sports";

import { useAuth } from "@context/AuthContext";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sports, setSports] = useState([]);
  const { user: currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

async function loadUsers() {
  try {
    setLoading(true);

    const { ok, data } = await getUsers();

    if (ok) {
      const filtered = data.filter(
        (user) => user.id !== currentUser?.id
      );

      setUsers(data);
      setFilteredUsers(filtered);
    }

  } catch (err) {
    setError(err.message || "Error cargando usuarios");

  } finally {
    setLoading(false);
  }
}

  async function loadSports() {
    try {
      const { ok, data } = await getSports();

      if (ok) {
        const activeSports = data.filter((sport) => sport.status);

        setSports(activeSports);
      }
    } catch (err) {
      console.error("Error cargando deportes", err);
    }
  }

useEffect(() => {
  if (currentUser) {
    loadUsers();
    loadSports();
  }
}, [currentUser]);

  useEffect(() => {
    let result = users.filter((user) => user.id !== currentUser?.id);

    if (search.trim()) {
      result = result.filter(
        (user) =>
          user.full_name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(result);
  }, [users, search, roleFilter, currentUser]);

  function formatDate(date) {
    return new Intl.DateTimeFormat("es-CL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  }

  async function handleCreate() {
    const { isConfirmed, value } = await createUserForm(sports);

    if (!isConfirmed) return;

    try {
      loadingAlert("Creando usuario...", "Registrando el nuevo usuario.");

      const { ok, data } = await createUser(value);

      if (ok) {
        setUsers((prev) => [...prev, data]);

        closeAlert();

        successAlert(
          "Usuario creado",
          "El usuario fue registrado correctamente.",
        );
      }
    } catch (error) {
      closeAlert();

      console.error(error);
    }
  }

  async function handleEdit(user) {
    console.log("Deportes enviados:", sports);

    const { isConfirmed, value } = await editUserForm(user, sports);

    if (!isConfirmed) return;

    try {
      loadingAlert(
        "Actualizando usuario...",
        "Guardando los cambios realizados.",
      );

      const { ok, data } = await updateUser(user.id, value);

      if (ok) {
        setUsers((prev) =>
          prev.map((item) => (item.id === user.id ? data : item)),
        );
        closeAlert();
        successAlert("Usuario actualizado");
      }
    } catch (error) {
      closeAlert();

      console.error(error);
    }
  }
  async function handleDelete(user) {
    const { isConfirmed } = await confirmAlert(
      "¿Eliminar usuario?",
      `¿Estás seguro de eliminar al usuario ${user.full_name}?`,
      "Eliminar",
      "Cancelar",
      "warning",
    );

    if (!isConfirmed) return;

    try {
      loadingAlert("Eliminando usuario...", "Procesando la eliminación.");

      const { ok } = await deleteUser(user.id);

      if (ok) {
        closeAlert();

        setUsers((prev) => prev.filter((item) => item.id !== user.id));

        successAlert(
          "Usuario eliminado",
          `${user.full_name} fue eliminado correctamente.`,
        );
      }
    } catch (error) {
      closeAlert();

      console.error(error);
    }
  }

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
          <h2 className="mb-1">Usuarios</h2>

          <p className="text-body-secondary mb-0">
            Gestión de usuarios del sistema
          </p>
        </div>

        <Card className="shadow-sm border-0">
          <Card.Body className="d-flex align-items-center gap-3">
            <FontAwesomeIcon
              icon={faUsers}
              size="2x"
              className="text-primary"
            />

            <div>
              <h4 className="mb-0">{users.length}</h4>

              <small className="text-body-secondary">Usuarios</small>
            </div>
          </Card.Body>
        </Card>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm border-0">
        <Card.Body>
          <Row className="mb-4 g-3">
            <Col md={8}>
              <div className="position-relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="position-absolute top-50 translate-middle-y ms-3 text-secondary"
                />

                <Form.Control
                  className="ps-5"
                  placeholder="Buscar por nombre o correo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Col>

            <Col md={4}>
              <Form.Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">Todos los roles</option>
                <option value="user">Usuarios</option>
                <option value="coach">Coaches</option>
                <option value="admin">Administradores</option>
              </Form.Select>
            </Col>
          </Row>
          <Button
            variant="danger"
            className="mb-3 d-block ms-auto"
            onClick={handleCreate}
          >
            <FontAwesomeIcon icon={faPlus} />
            Nuevo usuario
          </Button>
          <Table responsive hover className="align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Deporte</th>
                <th>Registro</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <strong>{user.full_name}</strong>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <Badge
                      bg={
                        user.role === "admin"
                          ? "danger"
                          : user.role === "coach"
                            ? "success"
                            : "primary"
                      }
                    >
                      {user.role}
                    </Badge>
                  </td>

                  <td>
                    {user.metadata?.sports?.length
                      ? user.metadata.sports[0].name
                      : "-"}
                  </td>

                  <td>{formatDate(user.created_at)}</td>

                  <td>
                    {user.must_change_password ? (
                      <Badge bg="warning">Cambio contraseña</Badge>
                    ) : (
                      <Badge bg="success">Activo</Badge>
                    )}
                  </td>

                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        title="Editar"
                        onClick={() => handleEdit(user)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        title="Eliminar"
                        onClick={() => handleDelete(user)}
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
