export function validarEmail(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = String(valor).trim();
  return regex.test(email);
}

function validarPassword(input) {
  const esValido = input.value.trim().length >= 8;

  input.classList.toggle("is-invalid", !esValido);

  return esValido;
}
