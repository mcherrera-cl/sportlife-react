import Swal from "sweetalert2";


export async function createReservationForm(
  schedules
) {

  return Swal.fire({

    title: "Nueva reserva",

    width: 650,

    html:/*html*/`
  <div class="text-start">
    <div class="mb-3">
      <label class="form-label">Clase disponible</label>
      <select
      id="class_schedule_id"
      class="form-select"
      >
    <option value="">
    Seleccione una clase
    </option>

    ${schedules.map(item => `
    <option value="${item.id}">

    ${item.sportRoom?.sport?.name}
    -
    ${item.sportRoom?.room?.name}
    -
    ${item.sportRoom?.coach?.full_name}

    (${item.start_time} -
    ${item.end_time})
    </option>
    `).join("")}

</select>
</div>

<div class="mb-3">

<label class="form-label">
Observación
</label>


<textarea
id="observation"
class="form-control"
rows="3"
placeholder="Comentario adicional"
></textarea>


</div>


</div>

`,

    showCancelButton: true,


    confirmButtonText:
      "Crear reserva",

    cancelButtonText:
      "Cancelar",


    reverseButtons: true,


    buttonsStyling: false,


    customClass: {

      popup:
        "swal-bootstrap shadow",

      confirmButton:
        "btn btn-success",

      cancelButton:
        "btn btn-outline-secondary me-2"

    },

    preConfirm: () => {


      const class_schedule_id =
        document
          .getElementById(
            "class_schedule_id"
          )
          .value;


      const observation =
        document
          .getElementById(
            "observation"
          )
          .value.trim();
      if (!class_schedule_id) {

        Swal.showValidationMessage(
          "Seleccione una clase."
        );
        return false;
      }

      return {

        class_schedule_id:
          Number(class_schedule_id),
        observation

      };


    }



  });


}