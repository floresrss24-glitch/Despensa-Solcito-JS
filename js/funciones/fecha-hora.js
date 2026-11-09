/* FECHA Y HORA EN TIEMPO REAL */

// Escribe la fecha y la hora actuales en la página
function actualizarFechaHora() {
    const elementoFecha = document.getElementById("fechaActual");
    const elementoHora = document.getElementById("horaActual");

    const ahora = new Date();

    if (elementoFecha) {
        const fecha = ahora.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
        elementoFecha.textContent = "Fecha actual: " + fecha;
    }

    if (elementoHora) {
        const hora = ahora.toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        elementoHora.textContent = "Hora actual: " + hora;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Solo se activa si la página tiene dónde mostrar la fecha y la hora
    if (!document.getElementById("fechaActual") &&
        !document.getElementById("horaActual")) {
        return;
    }

    actualizarFechaHora();
    setInterval(actualizarFechaHora, 1000);
});
