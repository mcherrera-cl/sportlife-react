import Swal from "sweetalert2";


const days = [
  { id: 1, name: "Lunes" },
  { id: 2, name: "Martes" },
  { id: 3, name: "Miércoles" },
  { id: 4, name: "Jueves" },
  { id: 5, name: "Viernes" },
  { id: 6, name: "Sábado" },
  { id: 0, name: "Domingo" },
];


// Validación de horas
function validateTimes(start_time, end_time) {

  if (start_time >= end_time) {

    Swal.showValidationMessage(
      "La hora de término debe ser posterior a la hora de inicio."
    );

    return false;
  }

  return true;
}


// Normaliza hora del backend
function formatTime(time) {

  if (!time) return "";

  return time.substring(0,5);
}



export async function createClassScheduleForm(
  sportRooms
) {

  return Swal.fire({

    title: "Nuevo horario",

    width: 650,


    html: /*html*/`

    <div class="text-start">


      <div class="mb-3">

        <label class="form-label">
          Asignación
        </label>

        <select
          id="sport_room_id"
          class="form-select"
        >

          <option value="">
            Seleccione una asignación
          </option>


          ${sportRooms.map(item => `

            <option value="${item.id}">
              ${item.sport?.name}
              -
              ${item.room?.name}
              -
              ${item.coach?.full_name}
            </option>

          `).join("")}


        </select>

      </div>



      <div class="mb-3">

        <label class="form-label">
          Día
        </label>


        <select
          id="day_of_week"
          class="form-select"
        >

          <option value="">
            Seleccione un día
          </option>


          ${days.map(day => `

            <option value="${day.id}">
              ${day.name}
            </option>

          `).join("")}


        </select>

      </div>



      <div class="mb-3">

        <label class="form-label">
          Hora inicio
        </label>


        <input
          id="start_time"
          type="time"
          class="form-control"
        />

      </div>



      <div class="mb-3">

        <label class="form-label">
          Hora término
        </label>


        <input
          id="end_time"
          type="time"
          class="form-control"
        />

      </div>


    </div>

    `,


    showCancelButton:true,

    confirmButtonText:"Crear horario",

    cancelButtonText:"Cancelar",

    reverseButtons:true,

    buttonsStyling:false,


    customClass:{

      popup:"swal-bootstrap shadow",

      confirmButton:"btn btn-success",

      cancelButton:"btn btn-outline-secondary me-2",

      validationMessage:
        "text-danger mt-3 text-start",

    },


    focusConfirm:false,


    preConfirm:()=>{


      const sport_room_id =
        document.getElementById("sport_room_id").value;


      const day_of_week =
        document.getElementById("day_of_week").value;


      const start_time =
        document.getElementById("start_time").value;


      const end_time =
        document.getElementById("end_time").value;



      if(!sport_room_id){

        Swal.showValidationMessage(
          "Seleccione una asignación."
        );

        return false;
      }



      if(day_of_week === ""){

        Swal.showValidationMessage(
          "Seleccione un día."
        );

        return false;
      }



      if(!start_time || !end_time){

        Swal.showValidationMessage(
          "Debe ingresar ambas horas."
        );

        return false;
      }



      if(!validateTimes(start_time,end_time)){
        return false;
      }



      return {

        sport_room_id:Number(sport_room_id),

        day_of_week:Number(day_of_week),

        start_time,

        end_time,

      };


    }


  });

}







export async function editClassScheduleForm(
  schedule,
  sportRooms
) {


  return Swal.fire({


    title:"Editar horario",

    width:650,


    html:/*html*/`

    <div class="text-start">


      <div class="mb-3">

        <label class="form-label">
          Asignación
        </label>


        <select
          id="sport_room_id"
          class="form-select"
        >


        ${sportRooms.map(item=>`

          <option

            value="${item.id}"

            ${item.id === schedule.sport_room_id
              ? "selected"
              :""
            }

          >

            ${item.sport?.name}
            -
            ${item.room?.name}
            -
            ${item.coach?.full_name}

          </option>


        `).join("")}


        </select>


      </div>




      <div class="mb-3">

        <label class="form-label">
          Día
        </label>


        <select
          id="day_of_week"
          class="form-select"
        >


        ${days.map(day=>`

          <option

            value="${day.id}"

            ${day.id === schedule.day_of_week
              ?"selected"
              :""
            }

          >

            ${day.name}

          </option>


        `).join("")}


        </select>


      </div>




      <div class="mb-3">

        <label class="form-label">
          Hora inicio
        </label>


        <input

          id="start_time"

          type="time"

          class="form-control"

          value="${formatTime(schedule.start_time)}"

        />


      </div>




      <div class="mb-3">

        <label class="form-label">
          Hora término
        </label>


        <input

          id="end_time"

          type="time"

          class="form-control"

          value="${formatTime(schedule.end_time)}"

        />


      </div>



    </div>

    `,


    showCancelButton:true,

    confirmButtonText:"Guardar cambios",

    cancelButtonText:"Cancelar",

    reverseButtons:true,


    buttonsStyling:false,


    customClass:{

      popup:"swal-bootstrap shadow",

      confirmButton:"btn btn-success",

      cancelButton:"btn btn-outline-secondary me-2",

      validationMessage:
      "text-danger mt-3 text-start",

    },


    preConfirm:()=>{


      const sport_room_id =
        document.getElementById("sport_room_id").value;


      const day_of_week =
        document.getElementById("day_of_week").value;


      const start_time =
        document.getElementById("start_time").value;


      const end_time =
        document.getElementById("end_time").value;



      if(!start_time || !end_time){

        Swal.showValidationMessage(
          "Debe ingresar ambas horas."
        );

        return false;
      }



      if(!validateTimes(start_time,end_time)){
        return false;
      }



      return {

        sport_room_id:Number(sport_room_id),

        day_of_week:Number(day_of_week),

        start_time,

        end_time,

      };


    }


  });


}