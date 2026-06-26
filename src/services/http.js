const API_BASE_URL =
  "https://frontend-backend-clubdeportivo-production.up.railway.app/api";

export const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let errorMessage = `Error ${response.status}`;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {}

    throw new Error(errorMessage);
  }

  return response.json();
};