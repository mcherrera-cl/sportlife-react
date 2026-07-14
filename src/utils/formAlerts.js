import Swal from "sweetalert2";
import { actualizarPassword } from "@services/auth";
import { validarEmail, validarNombre } from "./validaciones";

export async function createSportForm() {
  return Swal.fire({
    title: "Nuevo deporte",
    width: 600,

    html: /*html*/ `
      <div class="text-start">
        <div class="mb-3">
          <label for="name" class="form-label">
            Nombre del deporte
          </label>
          <input
            id="name"
            type="text"
            class="form-control"
            placeholder="Ej: Fútbol"
          />
        </div>

        <div class="mb-3">
          <label for="objective" class="form-label">
            Objetivo
          </label>
          <textarea
            id="objective"
            class="form-control"
            rows="3"
            placeholder="Descripción del objetivo del deporte"
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="duration" class="form-label">
            Duración (minutos)
          </label>
          <input
            id="duration"
            type="number"
            class="form-control"
            placeholder="Ej: 60"
            min="1"
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
              Activo
            </option>
            <option value="false">
              Inactivo
            </option>

          </select>
        </div>
      </div>

    `,

    showCancelButton: true,
    confirmButtonText: "Crear deporte",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    buttonsStyling: false,

    customClass: {
      popup: "swal-bootstrap shadow",
      title: "mb-3",
      htmlContainer: "mt-2",
      actions: "mt-4",
      confirmButton: "btn btn-danger",
      cancelButton: "btn btn-outline-secondary me-2",
      validationMessage: "text-danger mt-3 text-start",
    },
    focusConfirm: false,

    preConfirm: () => {
      const name = document.getElementById("name").value.trim();

      const objective = document.getElementById("objective").value.trim();

      const duration = document.getElementById("duration").value;

      const status = document.getElementById("status").value;

      if (!name) {
        Swal.showValidationMessage("Debe ingresar el nombre del deporte.");

        return false;
      }

      if (name.length > 100) {
        Swal.showValidationMessage(
          "El nombre no puede superar los 100 caracteres.",
        );

        return false;
      }

      if (!objective) {
        Swal.showValidationMessage("Debe ingresar el objetivo del deporte.");

        return false;
      }

      if (objective.length > 255) {
        Swal.showValidationMessage(
          "El objetivo no puede superar los 255 caracteres.",
        );

        return false;
      }

      if (!duration || Number(duration) <= 0) {
        Swal.showValidationMessage("Ingrese una duración válida.");

        return false;
      }

      return {
        name,
        objective,
        duration: Number(duration),
        status: status === "true",
      };
    },
  });
}

export async function changePasswordForm() {
  return Swal.fire({
    title: "Cambiar contraseña",
    width: 500,

    html: /*html*/ `
      <div class="text-start">

        <div class="mb-3">
          <label for="current_password" class="form-label">
            Contraseña actual
          </label>
          <input
            id="current_password"
            type="password"
            class="form-control"
            autocomplete="current-password"
          />
        </div>

        <div class="mb-3">
          <label for="new_password" class="form-label">
            Nueva contraseña
          </label>
          <input
            id="new_password"
            type="password"
            class="form-control"
            autocomplete="new-password"
          />
        </div>

        <div>
          <label for="confirm_password" class="form-label">
            Confirmar nueva contraseña
          </label>
          <input
            id="confirm_password"
            type="password"
            class="form-control"
            autocomplete="new-password"
          />
        </div>

      </div>
    `,

    showCancelButton: true,
    confirmButtonText: "Actualizar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,

    buttonsStyling: false,

    customClass: {
      popup: "swal-bootstrap shadow",
      title: "mb-3",
      htmlContainer: "mt-2",
      actions: "mt-4",
      confirmButton: "btn btn-warning",
      cancelButton: "btn btn-outline-secondary me-2",
      validationMessage: "text-danger mt-3 text-start",
    },

    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    allowEscapeKey: () => !Swal.isLoading(),
    focusConfirm: false,

    preConfirm: async () => {
      const current_password = document
        .getElementById("current_password")
        .value.trim();

      const new_password = document.getElementById("new_password").value.trim();

      const confirm_password = document
        .getElementById("confirm_password")
        .value.trim();

      if (!current_password) {
        Swal.showValidationMessage("Debe ingresar su contraseña actual.");
        return false;
      }

      if (!new_password) {
        Swal.showValidationMessage("Debe ingresar una nueva contraseña.");
        return false;
      }

      if (new_password.length < 8) {
        Swal.showValidationMessage(
          "La nueva contraseña debe tener al menos 8 caracteres.",
        );
        return false;
      }

      if (!confirm_password) {
        Swal.showValidationMessage("Debe confirmar la nueva contraseña.");
        return false;
      }

      if (new_password !== confirm_password) {
        Swal.showValidationMessage("Las contraseñas no coinciden.");
        return false;
      }

      try {
        await actualizarPassword({
          current_password,
          new_password,
          confirm_password,
        });

        return true;
      } catch (error) {
        Swal.showValidationMessage(
          error?.message ?? "No fue posible actualizar la contraseña.",
        );

        return false;
      }
    },
  });
}

export async function editUserForm(user, sports = []) {
  return Swal.fire({
    title: "Editar usuario",
    width: 600,

    html: /*html*/ `
      <div class="text-start">

        <div class="mb-3">
          <label for="full_name" class="form-label">
            Nombre completo
          </label>

          <input
            id="full_name"
            type="text"
            class="form-control"
            value="${user.full_name ?? ""}"
          />

          <div class="invalid-feedback">
            Ingrese un nombre válido sin caracteres extraños.
          </div>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">
            Correo electrónico
          </label>

          <input
            id="email"
            type="email"
            class="form-control"
            value="${user.email ?? ""}"
          />

          <div class="invalid-feedback">
            Ingrese un correo válido.
          </div>
        </div>


        <div class="mb-3">
          <label for="role" class="form-label">
            Rol
          </label>

          <select id="role" class="form-select">
            <option value="user" ${user.role === "user" ? "selected" : ""}>
              Usuario
            </option>

            <option value="coach" ${user.role === "coach" ? "selected" : ""}>
              Coach
            </option>

            <option value="admin" ${user.role === "admin" ? "selected" : ""}>
              Administrador
            </option>
          </select>
        </div>

<div class="mb-3">
  <label for="favorite_sport" class="form-label">
    Deporte favorito
  </label>

  <select id="favorite_sport" class="form-select">

    <option value="">
      Seleccione un deporte
    </option>

    ${sports
      .map(
        (sport) => `
      <option 
        value="${sport.id}"
        ${user.metadata?.sports?.[0]?.id === sport.id ? "selected" : ""}
      >
        ${sport.name}
      </option>
    `,
      )
      .join("")}

  </select>

</div>

      </div>
    `,

    showCancelButton: true,

    confirmButtonText: "Guardar cambios",
    cancelButtonText: "Cancelar",

    reverseButtons: true,

    buttonsStyling: false,

    customClass: {
      popup: "swal-bootstrap shadow",
      title: "mb-3",
      htmlContainer: "mt-2",
      actions: "mt-4",
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-outline-secondary me-2",
      validationMessage: "text-danger mt-3 text-start",
    },

    focusConfirm: false,

    didOpen: () => {
      const fullnameInput = document.getElementById("full_name");
      const emailInput = document.getElementById("email");

      fullnameInput.addEventListener("input", () => {
        const valido = validarNombre(fullnameInput.value);

        if (fullnameInput.value === "") {
          fullnameInput.classList.remove("is-valid", "is-invalid");
          return;
        }

        fullnameInput.classList.toggle("is-valid", valido);

        fullnameInput.classList.toggle("is-invalid", !valido);
      });

      emailInput.addEventListener("input", () => {
        const valido = validarEmail(emailInput.value);

        if (emailInput.value === "") {
          emailInput.classList.remove("is-valid", "is-invalid");
          return;
        }

        emailInput.classList.toggle("is-valid", valido);

        emailInput.classList.toggle("is-invalid", !valido);
      });
    },

    preConfirm: () => {
      const full_name = document.getElementById("full_name").value.trim();

      const email = document.getElementById("email").value.trim();

      const role = document.getElementById("role").value;

      const sportId = document.getElementById("favorite_sport").value;

      const selectedSport = sports.find((sport) => sport.id == sportId);

      if (!validarNombre(full_name)) {
        Swal.showValidationMessage("Ingrese un nombre válido.");

        return false;
      }

      if (!validarEmail(email)) {
        Swal.showValidationMessage("Ingrese un correo válido.");

        return false;
      }

      return {
        id: user.id,
        full_name,
        email,
        role,

        metadata: {
          ...user.metadata,

          sports: selectedSport
            ? [
                {
                  name: selectedSport.name,
                  frequency_per_week:
                    user.metadata?.sports?.[0]?.frequency_per_week ?? 0,
                },
              ]
            : [],
        },
      };
    },
  });
}

export async function editSportForm(sport) {
  return Swal.fire({
    title: "Editar deporte",
    width: 600,

    html: /*html*/ `
      <div class="text-start">

        <div class="mb-3">
          <label for="name" class="form-label">
            Nombre del deporte
          </label>

          <input
            id="name"
            type="text"
            class="form-control"
            value="${sport.name ?? ""}"
          />
        </div>


        <div class="mb-3">
          <label for="objective" class="form-label">
            Objetivo
          </label>

          <textarea
            id="objective"
            class="form-control"
            rows="3"
          >${sport.objective ?? ""}</textarea>

        </div>


        <div class="mb-3">
          <label for="duration" class="form-label">
            Duración (minutos)
          </label>

          <input
            id="duration"
            type="number"
            class="form-control"
            min="1"
            value="${sport.duration ?? ""}"
          />
        </div>


        <div class="mb-3">
          <label for="status" class="form-label">
            Estado
          </label>

          <select id="status" class="form-select">

            <option value="true" ${
              sport.status ? "selected" : ""
            }>
              Activo
            </option>

            <option value="false" ${
              !sport.status ? "selected" : ""
            }>
              Inactivo
            </option>

          </select>

        </div>

      </div>
    `,


    showCancelButton: true,

    confirmButtonText: "Guardar cambios",

    cancelButtonText: "Cancelar",

    reverseButtons: true,


    buttonsStyling: false,

    customClass: {
      popup: "swal-bootstrap shadow",
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-outline-secondary me-2",
    },


    preConfirm: () => {

      const name = document
        .getElementById("name")
        .value.trim();


      const objective = document
        .getElementById("objective")
        .value.trim();


      const duration = document
        .getElementById("duration")
        .value;


      const status = document
        .getElementById("status")
        .value;


      if (!name) {

        Swal.showValidationMessage(
          "El nombre es obligatorio"
        );

        return false;
      }


      return {
        id: sport.id,
        name,
        objective,
        duration: Number(duration),
        status: status === "true",
      };
    },

  });
}