// Validar los formularios de la página
document.addEventListener("DOMContentLoaded", function () {

    // Buscar los formularios que necesitan validación
    const formularios = document.querySelectorAll("[data-validar]");

    formularios.forEach(function (formulario) {

        formulario.addEventListener("submit", function (evento) {

            let formularioValido = true;

            // Buscar los campos obligatorios
            const campos = formulario.querySelectorAll("[required]");

            campos.forEach(function (campo) {

                // Buscar el espacio donde aparecerá el mensaje
                let mensaje = campo.parentElement.querySelector(".mensaje-error");

                // Crear el espacio para el mensaje si no existe
                if (!mensaje) {
                    mensaje = document.createElement("small");
                    mensaje.classList.add("mensaje-error");
                    campo.parentElement.appendChild(mensaje);
                }

                // Comprobar si el campo está vacío
                if (campo.value.trim() === "") {

                    mensaje.textContent = "Este campo es obligatorio.";
                    formularioValido = false;

                }

                // Validar el formato del correo electrónico
                else if (campo.type === "email") {
                    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!expresionCorreo.test(campo.value.trim())) {

                        mensaje.textContent = "Ingresá un correo electrónico válido.";
                        formularioValido = false;
                    } else {
                        mensaje.textContent = "";
                    }
                } else {
                    mensaje.textContent = "";
                }
            });
            // Evitar el envío si existen errores
            if (!formularioValido) {
                evento.preventDefault();
            }
        });

        // Limpiar los mensajes cuando el usuario modifica un campo
        formulario.querySelectorAll("[required]").forEach(function (campo) {
            campo.addEventListener("input", function () {
                const mensaje = campo.parentElement.querySelector(".mensaje-error");
                if (mensaje) {
                    mensaje.textContent = "";
                }
            });
        });
    });
});