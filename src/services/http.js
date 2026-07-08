const API_BASE_URL =
  "https://frontend-backend-clubdeportivo-production.up.railway.app/api";

export const request = async (
  endpoint,
  { requiereAuth = false, headers = {}, ...options } = {}
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(requiereAuth && token
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    let errorMessage = `Error ${response.status}`;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {}

    throw new Error(errorMessage);
  }

  return response.json();
};