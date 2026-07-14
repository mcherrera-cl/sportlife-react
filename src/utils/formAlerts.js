import Swal from "sweetalert2";
import { actualizarPassword } from "@services/auth";
import { validarEmail, validarNombre } from "./validaciones";

export async function changePasswordForm() {
  return Swal.fire({
    title: "Cambiar contraseña",
    width: 500,

    html: /*html*/`
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

      const new_password = document
        .getElementById("new_password")
        .value.trim();

      const confirm_password = document
        .getElementById("confirm_password")
        .value.trim();

      if (!current_password) {
        Swal.showValidationMessage(
          "Debe ingresar su contraseña actual."
        );
        return false;
      }

      if (!new_password) {
        Swal.showValidationMessage(
          "Debe ingresar una nueva contraseña."
        );
        return false;
      }

      if (new_password.length < 8) {
        Swal.showValidationMessage(
          "La nueva contraseña debe tener al menos 8 caracteres."
        );
        return false;
      }

      if (!confirm_password) {
        Swal.showValidationMessage(
          "Debe confirmar la nueva contraseña."
        );
        return false;
      }

      if (new_password !== confirm_password) {
        Swal.showValidationMessage(
          "Las contraseñas no coinciden."
        );
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
          error?.message ??
          "No fue posible actualizar la contraseña."
        );

        return false;
      }
    },
  });
}

export async function editUserForm(user) {
  return Swal.fire({
    title: "Editar usuario",
    width: 600,

    html: /*html*/`
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
          <label for="email" class="form-label">
            Deporte favorito
          </label>

          <input
            id="email"
            type="email"
            class="form-control"
            value="${user.metadata?.sports?.[0]?.name ?? ""}"
          />

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
            fullnameInput.classList.remove(
                "is-valid",
                "is-invalid"
            );
            return;
        }

        fullnameInput.classList.toggle(
            "is-valid",
            valido
        )

        fullnameInput.classList.toggle(
            "is-invalid",
            !valido
        )
      });

      emailInput.addEventListener("input", () => {
        const valido = validarEmail(emailInput.value);

        if (emailInput.value === "") {
          emailInput.classList.remove(
            "is-valid",
            "is-invalid"
          );
          return;
        }

        emailInput.classList.toggle(
          "is-valid",
          valido
        );

        emailInput.classList.toggle(
          "is-invalid",
          !valido
        );
      });


    },


    preConfirm: () => {
      const full_name = document
        .getElementById("full_name")
        .value.trim();

      const email = document
        .getElementById("email")
        .value.trim();

      const role = document
        .getElementById("role")
        .value;


      if (!validarNombre(full_name)) {
        Swal.showValidationMessage(
          "Ingrese un nombre válido."
        );

        return false;
      }

      if (!validarEmail(email)) {
        Swal.showValidationMessage(
          "Ingrese un correo válido."
        );

        return false;
      }



      return {
        id: user.id,
        full_name,
        email,
        role,
      };
    },
  });
}