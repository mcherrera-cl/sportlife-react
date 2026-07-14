import Swal from "sweetalert2";

export function loadingAlert(
  titulo = "Procesando...",
  texto = "Espere mientras completamos la operación."
) {
  return Swal.fire({
    title: titulo,
    text: texto,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,

    didOpen: () => {
      Swal.showLoading();
    },

    customClass: {
      popup: "swal-bootstrap shadow",
    },
  });
}


export function closeAlert() {
  Swal.close();
}

export function successAlert(
  titulo,
  texto = "",
  position = "center"
) {
  return Swal.fire({
    icon: "success",
    title: titulo,
    text: texto,
    position,
    timer: 2000,
    showConfirmButton: false,
  });
}

export function confirmAlert(
  titulo = "¿Estás seguro?",
  texto = "",
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  icono = "warning"
) {
  return Swal.fire({
    title: titulo,
    text: texto,
    icon: icono,

    showCancelButton: true,
    confirmButtonText: textoConfirmar,
    cancelButtonText: textoCancelar,

    reverseButtons: true,
    focusCancel: true,

    buttonsStyling: false,

    customClass: {
      popup: "swal-bootstrap shadow",
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-outline-secondary me-2",
    },
  });
}