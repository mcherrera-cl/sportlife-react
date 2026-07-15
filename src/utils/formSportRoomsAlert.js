import Swal from "sweetalert2";

export async function createSportRoomForm(
  sports,
  rooms,
  coaches
) {
  return Swal.fire({

    title: "Nueva asignación",

    width: 650,

    html: /*html*/`
      <div class="text-start">
        <div class="mb-3">
          <label class="form-label">
            Deporte
          </label>


          <select
            id="sport_id"
            class="form-select"
          >

            <option value="">
              Seleccione un deporte
            </option>


            ${sports.map(sport => `

              <option value="${sport.id}">
                ${sport.name}
              </option>

            `).join("")}


          </select>


        </div>

        <div class="mb-3">

          <label class="form-label">
            Sala
          </label>


          <select
            id="room_id"
            class="form-select"
          >

            <option value="">
              Seleccione una sala
            </option>


            ${rooms.map(room => `

              <option value="${room.id}">
                ${room.name}
              </option>


            `).join("")}


          </select>


        </div>

        <div class="mb-3">

          <label class="form-label">
            Coach
          </label>


          <select
            id="coach_id"
            class="form-select"
          >

            <option value="">
              Seleccione un coach
            </option>



            ${coaches.map(coach => `

              <option value="${coach.id}">
                ${coach.full_name}
              </option>


            `).join("")}


          </select>


        </div>



      </div>


    `,


    showCancelButton: true,

    confirmButtonText:
      "Crear asignación",

    cancelButtonText:
      "Cancelar",

    reverseButtons: true,


    buttonsStyling: false,


    customClass: {

      popup:
        "swal-bootstrap shadow",

      title:
        "mb-3",

      htmlContainer:
        "mt-2",

      actions:
        "mt-4",

      confirmButton:
        "btn btn-success",

      cancelButton:
        "btn btn-outline-secondary me-2",

      validationMessage:
        "text-danger mt-3 text-start",

    },


    focusConfirm: false,

    preConfirm: () => {
      const sport_id =
        document
          .getElementById("sport_id")
          .value;


      const room_id =
        document
          .getElementById("room_id")
          .value;


      const coach_id =
        document
          .getElementById("coach_id")
          .value;

      if (!sport_id) {

        Swal.showValidationMessage(
          "Seleccione un deporte."
        );
        return false;
      }

      if (!room_id) {

        Swal.showValidationMessage(
          "Seleccione una sala."
        );

        return false;

      }

      if (!coach_id) {

        Swal.showValidationMessage(
          "Seleccione un coach."
        );
        return false;
      }
      return {
        sport_id: Number(sport_id),
        room_id: Number(room_id),
        coach_id: Number(coach_id),
      };

    }

  });

}

export async function editSportRoomForm(
  sportRoom,
  sports,
  rooms,
  coaches
) {

  return Swal.fire({

    title: "Editar asignación",

    width: 650,


    html: /*html*/`
        <div class="text-start">


            <div class="mb-3">

                <label class="form-label">
                    Deporte
                </label>


                <select
                    id="sport_id"
                    class="form-select"
                >

                    ${sports.map(sport => `

                        <option
                            value="${sport.id}"
                            ${sport.id === sportRoom.sport_id ? "selected" : ""}
                        >
                            ${sport.name}
                        </option>


                    `).join("")}


                </select>


            </div>




            <div class="mb-3">

                <label class="form-label">
                    Sala
                </label>


                <select
                    id="room_id"
                    class="form-select"
                >


                    ${rooms.map(room => `

                        <option
                            value="${room.id}"
                            ${room.id === sportRoom.room_id ? "selected" : ""}
                        >

                            ${room.name}

                        </option>


                    `).join("")}


                </select>


            </div>





            <div class="mb-3">

                <label class="form-label">
                    Coach
                </label>


                <select
                    id="coach_id"
                    class="form-select"
                >


                    ${coaches.map(coach => `

                        <option
                            value="${coach.id}"
                            ${coach.id === sportRoom.coach_id ? "selected" : ""}
                        >

                            ${coach.full_name}

                        </option>


                    `).join("")}



                </select>


            </div>


        </div>
        `,


    showCancelButton: true,


    confirmButtonText:
      "Guardar cambios",


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
        "btn btn-outline-secondary me-2",

      validationMessage:
        "text-danger mt-3 text-start",

    },



    focusConfirm: false,



    preConfirm: () => {


      const sport_id =
        document.getElementById("sport_id").value;


      const room_id =
        document.getElementById("room_id").value;


      const coach_id =
        document.getElementById("coach_id").value;




      if (!sport_id) {

        Swal.showValidationMessage(
          "Seleccione un deporte."
        );

        return false;

      }

      if (!room_id) {

        Swal.showValidationMessage(
          "Seleccione una sala."
        );

        return false;

      }

      if (!coach_id) {

        Swal.showValidationMessage(
          "Seleccione un coach."
        );

        return false;
      }

      return {
        sport_id: Number(sport_id),
        room_id: Number(room_id),
        coach_id: Number(coach_id)

      };
    }
  });

}