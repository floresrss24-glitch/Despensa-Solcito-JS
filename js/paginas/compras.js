/* PAGINA DE COMPRAS */

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formPedido");
    if (!formulario) return;

    const campoFecha = document.getElementById("fecha");
    const campoCantidad = document.getElementById("cantidad");
    const campoComentarios = document.getElementById("comentarios");
    const contador = document.getElementById("contadorComentarios");

    // La fecha de entrega no puede ser anterior a hoy
    if (campoFecha) {
        const hoy = new Date();
        const mes = String(hoy.getMonth() + 1).padStart(2, "0");
        const dia = String(hoy.getDate()).padStart(2, "0");

        campoFecha.min = hoy.getFullYear() + "-" + mes + "-" + dia;
    }

    // La cantidad debe quedar dentro de los límites del campo
    if (campoCantidad) {
        campoCantidad.addEventListener("change", function () {
            const minimo = Number(campoCantidad.min) || 1;
            const maximo = Number(campoCantidad.max) || 50;
            let valor = Math.round(Number(campoCantidad.value));

            if (Number.isNaN(valor) || valor < minimo) valor = minimo;
            if (valor > maximo) valor = maximo;

            campoCantidad.value = valor;
        });
    }

    // Contador de caracteres de los comentarios
    function actualizarContador() {
        if (!campoComentarios || !contador) return;

        const maximo = campoComentarios.maxLength;
        contador.textContent =
            campoComentarios.value.length + " / " + maximo + " caracteres";
    }

    if (campoComentarios && contador) {
        campoComentarios.addEventListener("input", actualizarContador);

        // El navegador borra los campos después del evento "reset"
        formulario.addEventListener("reset", function () {
            setTimeout(actualizarContador, 0);
        });

        actualizarContador();
    }
});
