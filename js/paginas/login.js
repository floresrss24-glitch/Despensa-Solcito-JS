/* PAGINA DE INICIO DE SESION */

document.addEventListener("DOMContentLoaded", function () {
    const formLogin = document.getElementById("formLogin");
    const campoCorreo = document.getElementById("correo");
    const campoContrasena = document.getElementById("contrasena");
    const botonMostrar = document.getElementById("mostrarContrasena");
    const errorCorreo = document.getElementById("errorCorreo");
    const errorContrasena = document.getElementById("errorContrasena");
    const mensajeLogin = document.getElementById("mensajeLogin");

    if (!formLogin || !campoCorreo || !campoContrasena) return;

    // Mostrar u ocultar la contraseña
    if (botonMostrar) {
        botonMostrar.addEventListener("click", function () {
            const oculta = campoContrasena.type === "password";

            campoContrasena.type = oculta ? "text" : "password";

            botonMostrar.innerHTML = oculta
                ? '<i class="fa-regular fa-eye-slash"></i>'
                : '<i class="fa-regular fa-eye"></i>';

            botonMostrar.setAttribute(
                "aria-label",
                oculta ? "Ocultar contraseña" : "Mostrar contraseña"
            );
        });
    }

    // Validar el formulario al enviarlo
    formLogin.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const valorCorreo = campoCorreo.value.trim();
        const valorContrasena = campoContrasena.value;

        // Limpiar los mensajes anteriores
        errorCorreo.textContent = "";
        errorContrasena.textContent = "";
        mensajeLogin.textContent = "";

        let valido = true;

        // Validar que el correo no esté vacío y tenga formato correcto
        if (valorCorreo === "") {
            errorCorreo.textContent = "El correo electrónico es obligatorio.";
            valido = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valorCorreo)) {
            errorCorreo.textContent = "Ingresá un correo electrónico válido.";
            valido = false;
        }

        // Validar que la contraseña no esté vacía
        if (valorContrasena.trim() === "") {
            errorContrasena.textContent = "La contraseña es obligatoria.";
            valido = false;
        }

        // Mostrar el resultado
        if (valido) {
            mensajeLogin.textContent =
                "Los datos son válidos. Para iniciar sesión, necesitás conectar un sistema de autenticación.";
        }
    });

    // Limpiar los errores cuando el usuario modifica un campo
    campoCorreo.addEventListener("input", function () {
        errorCorreo.textContent = "";
        mensajeLogin.textContent = "";
    });

    campoContrasena.addEventListener("input", function () {
        errorContrasena.textContent = "";
        mensajeLogin.textContent = "";
    });
});
