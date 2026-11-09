/* PAGINA DE INICIO */

// Clave donde la página de Configuración guarda los datos del perfil
const CLAVE_PERFIL_INICIO = "despensaSolcitoConfiguracion";

// Muestra en el menú de perfil el nombre guardado en Configuración
function mostrarNombreGuardado() {
    const titulo = document.querySelector(".user-info h2");
    if (!titulo) return;

    try {
        const guardada = localStorage.getItem(CLAVE_PERFIL_INICIO);
        const datos = guardada ? JSON.parse(guardada) : {};
        const nombre = [datos.nombre, datos.apellido]
            .filter(Boolean)
            .join(" ");

        if (nombre) titulo.textContent = nombre;
    } catch (error) {
        // Si no se puede leer, se deja el texto original
    }
}

document.addEventListener("DOMContentLoaded", mostrarNombreGuardado);
