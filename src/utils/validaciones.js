export function validarEmail(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = String(valor).trim();
  return regex.test(email);
}

export function validarNombre(valor) {
  const nombre = String(valor)
    .trim()
    .replace(/\s+/g, " ");

  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;

  return regex.test(nombre);
}

function validarPassword(input) {
  const esValido = input.value.trim().length >= 8;

  input.classList.toggle("is-invalid", !esValido);

  return esValido;
}
