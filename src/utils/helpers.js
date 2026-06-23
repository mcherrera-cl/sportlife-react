function guardarToken(token) {
  localStorage.setItem("token", token);
}

function obtenerToken() {
  return localStorage.getItem("token");
}

function eliminarToken() {
  localStorage.removeItem("token");
}

function guardarDatos(datos) {
  localStorage.setItem("user", datos);
}

function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${obtenerToken()}`,
  };
}

export { guardarDatos, eliminarToken, obtenerToken, getAuthHeaders };
