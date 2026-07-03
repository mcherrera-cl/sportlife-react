import { Form, Row, Col, Button } from "react-bootstrap";
import logo from "@assets/logo.webp";
import styles from "./RegisterForm.module.css";
import { useState } from "react";
import {
  validarEmail,
  validarNombre,
  validarFechaNacimiento,
  validarCoincidenciasPassword
} from "@utils/validaciones";

export default () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    nacimiento: "",
    password1: "",
    password2: "",
    deporte: "",
    frecuencia: 0,
    actividad: "",
  });

  const nombreValido = validarNombre(formData.nombre);
  const emailValido = validarEmail(formData.correo);
  const fechaValida = validarFechaNacimiento(formData.nacimiento);
  const passwordCoinciden = validarCoincidenciasPassword(formData.password1, formData.password2);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(formData.correo);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form className={styles.form} noValidate onSubmit={handleOnSubmit}>
      <img src={logo} alt="logo" className={styles.formLogo}></img>
      <h2 className="text-center">Registro</h2>
      {/* Nombre */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="nombre">Nombre</Form.Label>
        <Form.Control
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ingresa tu nombre"
          value={formData.nombre}
          onChange={handleOnChange}
          className={
            formData.nombre === ""
              ? ""
              : nombreValido
                ? "is-valid"
                : "is-invalid"
          }
        />
        <Form.Control.Feedback type="valid">
          Formato válido
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Nombre inválido, un nombre válido debe contener al menos 2 caracteres
          y no incluir números y símbolos extraños. Por ejemplo: Juan Pérez
        </Form.Control.Feedback>
      </Form.Group>

      {/* Email */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="correo">Email</Form.Label>
        <Form.Control
          type="email"
          id="correo"
          name="correo"
          placeholder="Ej: jperez@correo.cl"
          required
          onChange={handleOnChange}
          className={
            formData.correo === ""
              ? ""
              : emailValido
                ? "is-valid"
                : "is-invalid"
          }
        />
        <Form.Control.Feedback type="valid">
          Formato válido
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Correo con formato inválido, un correo electrónico válido es con
          formato usuario@dominio.cl
        </Form.Control.Feedback>
      </Form.Group>

      {/* Fecha de nacimiento */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="nacimiento">Fecha de nacimiento</Form.Label>

        <Form.Control
          type="date"
          id="nacimiento"
          name="nacimiento"
          value={formData.nacimiento}
          onChange={handleOnChange}
          className={
            formData.nacimiento === ""
              ? ""
              : fechaValida
                ? "is-valid"
                : "is-invalid"
          }
        />

        <Form.Control.Feedback type="valid">Fecha válida</Form.Control.Feedback>

        <Form.Control.Feedback type="invalid">
          Fecha inválida. Debes tener entre 10 y 100 años
        </Form.Control.Feedback>
      </Form.Group>
      {/* Contraseña */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="contrasenia1">Contraseña</Form.Label>
        <Form.Control
          type="password"
          id="contrasenia1"
          name="password1"
          onChange={handleOnChange}
          placeholder="Ingresa tu contraseña"
        />
        <Form.Control.Feedback type="valid">
          La contraseña debe contener al menos 8 caracteres. Se recomienda
          combinar letras, números y símbolos.
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          El password no es válido
        </Form.Control.Feedback>
      </Form.Group>
      {/* Confirmar contraseña */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="contrasenia2">Confirmar contraseña</Form.Label>
        <Form.Control
          type="password"
          id="contrasenia2"
          name="password2"
          onChange={handleOnChange}
          placeholder="Confirma tu contraseña"
          className={
            formData.password2 === "" ? "" : passwordCoinciden ? "is-valid" : "is-invalid"
          }
        />
        <Form.Control.Feedback type="valid">
          Es válido
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          Las contraseñas no coinciden. Debe coincidir exactamente con la contraseña ingresada anteriormente.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Text className="text-muted mb-3 d-block">
        Estos campos son opcionales
      </Form.Text>

      <Row>
        {/* Deporte */}
        <Col md={8}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="deporte">¿Practicas algún deporte?</Form.Label>

            <Form.Select id="deporte" name="deporte" defaultValue="">
              <option value="" disabled>
                Selecciona un deporte
              </option>
              <option value="futbol">Fútbol</option>
              <option value="basketball">Basketball</option>
              <option value="tenis">Tenis</option>
              <option value="running">Running</option>
              <option value="natacion">Natación</option>
              <option value="ciclismo">Ciclismo</option>
              <option value="gym">Gimnasio</option>
              <option value="voleibol">Voleibol</option>
              <option value="padel">Pádel</option>
              <option value="ninguno">Ninguno</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Frecuencia */}
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="frecuencia">Veces por semana</Form.Label>
            <Form.Control
              type="number"
              id="frecuencia"
              name="frecuencia"
              min={0}
              defaultValue={0}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Actividad */}
      <Form.Group className="mb-4">
        <Form.Label htmlFor="actividad">
          ¿Qué tipo de actividad le interesa?
        </Form.Label>
        <Form.Control
          type="text"
          id="actividad"
          name="actividad"
          placeholder="Por ejemplo: competir"
        />
      </Form.Group>

      <div className="d-grid mb-3">
        <Button variant="primary" type="submit">
          Crear cuenta
        </Button>
      </div>

      <div className="text-center">
        <span>
          ¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a>
        </span>
      </div>
    </Form>
  );
};
