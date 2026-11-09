/* PAGINA DE CONTACTOS */

// Clave donde la página de Configuración guarda los datos del perfil
const CLAVE_PERFIL_CONTACTOS = "despensaSolcitoConfiguracion";

// Completa nombre y correo con los datos guardados en Configuración
function completarDatosGuardados(formulario) {
    try {
        const guardada = localStorage.getItem(CLAVE_PERFIL_CONTACTOS);
        const datos = guardada ? JSON.parse(guardada) : {};

        const campoNombre = formulario.elements["nombre"];
        const campoCorreo = formulario.elements["correo"];

        const nombre = [datos.nombre, datos.apellido]
            .filter(Boolean)
            .join(" ");

        if (campoNombre && !campoNombre.value && nombre) {
            campoNombre.value = nombre;
        }

        if (campoCorreo && !campoCorreo.value && datos.correo) {
            campoCorreo.value = datos.correo;
        }
    } catch (error) {
        // Si no se puede leer, el formulario queda vacío
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formContacto");
    const mensaje = document.getElementById("mensajeContacto");

    if (!formulario || !mensaje) return;

    completarDatosGuardados(formulario);

    formulario.addEventListener("submit", function (evento) {
        // Si la validación encontró errores, no se muestra la confirmación
        if (evento.defaultPrevented) return;

        // Todavía no hay un servidor que reciba los mensajes
        evento.preventDefault();

        const nombre = formulario.elements["nombre"].value.trim();

        mensaje.textContent =
            "¡Gracias, " + nombre + "! Tu mensaje es válido. " +
            "Esta página todavía no está conectada a un servidor, por eso no se envió.";

        formulario.elements["asunto"].value = "";
        formulario.elements["mensaje"].value = "";
    });

    // Se borra la confirmación cuando el usuario vuelve a escribir
    formulario.addEventListener("input", function () {
        mensaje.textContent = "";
    });
});
