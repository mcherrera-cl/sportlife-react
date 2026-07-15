export function validarEmail(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const email = String(valor).trim();
  return regex.test(email);
}

export function validarNombre(valor) {
  const nombre = String(valor)
    .trim()
    .replace(/\s+/g, " ");

  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]{4,}$/;

  return regex.test(nombre);
}

export function validarFechaNacimiento(fecha) {
  const d = new Date(fecha), h = new Date();

  const min = new Date(h.getFullYear() - 100, h.getMonth(), h.getDate());
  const max = new Date(h.getFullYear() - 10, h.getMonth(), h.getDate());
  
  // fecha válida y edad entre 10 y 100 años
  return !isNaN(d) && d >= min && d <= max;
}

function validarPassword(input) {
  const esValido = input.value.trim().length >= 8;

  input.classList.toggle("is-invalid", !esValido);

  return esValido;
}

// Validaciones sobre campos de password
// 1. Longitud del password
export function validarLongitudPassword(pass) {
  return pass.length >= 8;
}
// 2. Que los password coincidan (al momento de crear cuenta)
export function validarCoincidenciasPassword(pass1, pass2) {
  return pass1 === pass2;
}