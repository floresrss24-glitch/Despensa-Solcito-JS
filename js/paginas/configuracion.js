/* CONFIGURACION DE DESPENSA SOLCITO
   El modo oscuro lo administra funciones/tema.js (cargar ese archivo antes). */

const form = document.getElementById("formConfiguracion");
const mensaje = document.getElementById("mensaje");

const campos = {
    nombre: document.getElementById("nombre"),
    apellido: document.getElementById("apellido"),
    correo: document.getElementById("correo"),
    modoOscuro: document.getElementById("modoOscuro"),
    notificacionesPromos:
        document.getElementById("notificacionesPromos"),
    notificacionesNovedades:
        document.getElementById("notificacionesNovedades")
};

const CLAVE = "despensaSolcitoConfiguracion";

// Cargar configuracion guardada.
function cargarConfiguracion() {
    try {
        const guardada = localStorage.getItem(CLAVE);
        const datos = guardada ? JSON.parse(guardada) : {};

        campos.nombre.value = datos.nombre || "";
        campos.apellido.value = datos.apellido || "";
        campos.correo.value = datos.correo || "";

        campos.notificacionesPromos.checked =
            datos.notificacionesPromos === true;

        campos.notificacionesNovedades.checked =
            datos.notificacionesNovedades === true;

        // El tema se lee de la misma clave que usan las demás páginas.
        campos.modoOscuro.checked =
            localStorage.getItem(CLAVE_TEMA) === "true";

    } catch (error) {
        mensaje.textContent =
            "No se pudieron cargar las preferencias guardadas.";
    }
}

// Guardar las preferencias.
form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const correo = campos.correo.value.trim();

    if (correo !== "" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mensaje.textContent =
            "Ingresá un correo electrónico válido.";
        campos.correo.focus();
        return;
    }

    const datos = {
        nombre: campos.nombre.value.trim(),
        apellido: campos.apellido.value.trim(),
        correo: correo,
        notificacionesPromos:
            campos.notificacionesPromos.checked,
        notificacionesNovedades:
            campos.notificacionesNovedades.checked
    };

    try {
        localStorage.setItem(CLAVE, JSON.stringify(datos));
        cambiarTema(campos.modoOscuro.checked);
        mensaje.textContent =
            "¡Configuración guardada correctamente!";
    } catch (error) {
        mensaje.textContent =
            "No se pudo guardar. Revisá la configuración del navegador.";
    }
});

// Restablecer todas las opciones.
document.getElementById("restablecer").addEventListener("click", function () {
    const confirmar = window.confirm(
        "¿Querés restablecer todas las preferencias?"
    );

    if (!confirmar) return;

    localStorage.removeItem(CLAVE);
    form.reset();
    cambiarTema(false);

    mensaje.textContent = "Se restablecieron las preferencias.";
});

// Iniciar la página.
cargarConfiguracion();
