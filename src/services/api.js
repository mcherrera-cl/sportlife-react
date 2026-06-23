

const API_BASE_URL =
  "https://frontend-backend-clubdeportivo-production.up.railway.app/api";

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}: ${response.message}`);
  }

  const data = await response.json();
  return data;
};

export async function login(email, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  try {
    const response = request("/auth/login", options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(datos.message);
    }
  } catch (error) {
    console.error(error.message);
  }

  guardarToken(data.data.token);
  guardarDatos(JSON.stringify(datos.data.user));
  redireccionar("../pages/dashboard.html");
}
