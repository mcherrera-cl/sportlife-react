import Swal from "sweetalert2";

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