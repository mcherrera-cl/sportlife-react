import Swal from "sweetalert2";


export async function createRoomForm() {
  return Swal.fire({
    title: "Nueva sala",
    width: 650,

    html: /*html*/ `
      <div class="text-start">

        <div class="mb-3">
          <label for="name" class="form-label">
            Nombre
          </label>

          <input
            id="name"
            type="text"
            class="form-control"
            placeholder="Ej: Sala Fitness 1"
          />
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">
            Descripción
          </label>

          <textarea
            id="description"
            class="form-control"
            rows="3"
            placeholder="Descripción de la sala"
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="capacity" class="form-label">
            Capacidad
          </label>

          <input
            id="capacity"
            type="number"
            class="form-control"
            min="1"
            placeholder="Ej: 30"
          />
        </div>

        <div class="mb-3">
          <label for="location" class="form-label">
            Ubicación
          </label>

          <input
            id="location"
            type="text"
            class="form-control"
            placeholder="Ej: Segundo piso"
          />
        </div>

        <div class="mb-3">
          <label for="observation" class="form-label">
            Observaciones
          </label>

          <textarea
            id="observation"
            class="form-control"
            rows="3"
            placeholder="Información adicional"
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="image_url" class="form-label">
            URL de la imagen
          </label>

          <input
            id="image_url"
            type="url"
            class="form-control"
            placeholder="https://..."
          />
        </div>

        <div class="mb-3">
          <label for="status" class="form-label">
            Estado
          </label>

          <select
            id="status"
            class="form-select"
          >
            <option value="true" selected>
              Activa
            </option>

            <option value="false">
              Inactiva
            </option>
          </select>
        </div>

      </div>
    `,

    showCancelButton: true,

    confirmButtonText: "Crear sala",
    cancelButtonText: "Cancelar",

    reverseButtons: true,

    buttonsStyling: false,

    customClass: {
      popup: "swal-bootstrap shadow",
      title: "mb-3",
      htmlContainer: "mt-2",
      actions: "mt-4",
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-outline-secondary me-2",
      validationMessage: "text-danger mt-3 text-start",
    },

    focusConfirm: false,

    preConfirm: () => {
      const name = document.getElementById("name").value.trim();
      const description = document.getElementById("description").value.trim();
      const capacity = document.getElementById("capacity").value;
      const location = document.getElementById("location").value.trim();
      const observation = document.getElementById("observation").value.trim();
      const image_url = document.getElementById("image_url").value.trim();
      const status = document.getElementById("status").value;

      if (!name) {
        Swal.showValidationMessage("Debe ingresar el nombre de la sala.");
        return false;
      }

      if (!description) {
        Swal.showValidationMessage("Debe ingresar una descripción.");
        return false;
      }

      if (!capacity || Number(capacity) <= 0) {
        Swal.showValidationMessage("Ingrese una capacidad válida.");
        return false;
      }

      if (!location) {
        Swal.showValidationMessage("Debe ingresar la ubicación.");
        return false;
      }

      return {
        name,
        description,
        capacity: Number(capacity),
        location,
        observation,
        image_url,
        status: status === "true",
      };
    },
  });
}