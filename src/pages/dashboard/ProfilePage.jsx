import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button, Badge } from "react-bootstrap";
import { getUser } from "@services/authStorage";
import { validarEmail, validarNombre } from "../../utils/validaciones";

export default function ProfilePage() {
  const user = getUser();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    birth_date: "",
    metadata: {
      about: "",
      sport: "",
    },
  });
  const [originalForm, setOriginalForm] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!user) return;

    const data = {
      full_name: user.full_name ?? "",
      email: user.email ?? "",
      birth_date: user.birth_date?.split("T")[0] ?? "",
      metadata: {
        about: user.metadata?.about ?? "",
        sport: user.metadata?.sports?.[0]?.name ?? "",
      },
    };

    setForm(data);
    setOriginalForm(data);
  }, []);

  const nombreValido = validarNombre(form.full_name);
  const emailValido = validarEmail(form.email);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleMetadataChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [name]: value,
      },
    }));
  }
  function handleSubmit(event) {
    event.preventDefault();

    console.log(form);

    // updateMe(...)
  }

  function handleCancel(event) {
    setForm(structuredClone(originalForm));
    setEditing(false);
  }

  return (
    <Container>
      <h2 className="mb-4">Mi perfil</h2>

      <Row className="g-4">
        <Col xs={12} md={4}>
        <Card>
          <Card.Img src="//robohash.org/1" />
          <Card.Body>
            <hr />
            <div className="text-center">
              <Badge pill bg="primary" className="fs-6">{user.role}</Badge>
            </div>
          </Card.Body>
        </Card>
        </Col>

        <Col xs={12} md={8}>
          <Card>
            <Card.Header>
              <h3 className="mb-0">Información personal</h3>
            </Card.Header>

            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Nombre completo</Form.Label>

                      <Form.Control
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        disabled={!editing}
className={
  !editing
    ? ""
    : form.full_name === ""
      ? ""
      : nombreValido
        ? "is-valid"
        : "is-invalid"
}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Correo electrónico</Form.Label>

                      <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
className={
  !editing
    ? ""
    : form.email === ""
      ? ""
      : emailValido
        ? "is-valid"
        : "is-invalid"
}
                        disabled={!editing}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Fecha de nacimiento</Form.Label>

                      <Form.Control
                        type="date"
                        name="birth_date"
                        value={form.birth_date}
                        onChange={handleChange}
                        disabled={!editing}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Deporte favorito</Form.Label>
                      <Form.Control
                        type="text"
                        name="sport"
                        value={form.metadata.sport}
                        onChange={handleMetadataChange}
                        disabled={!editing}
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Sobre mí</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="about"
                        placeholder="Cuéntanos un poco sobre ti..."
                        value={form.metadata.about}
                        onChange={handleMetadataChange}
                        disabled={!editing}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    {!editing ? (
                      <Button onClick={() => setEditing(true)}>
                        Editar perfil
                      </Button>
                    ) : (
                      <div className="d-flex gap-2">
                        <Button variant="secondary" onClick={handleCancel}>
                          Cancelar
                        </Button>

                        <Button type="submit">Guardar cambios</Button>
                      </div>
                    )}
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
