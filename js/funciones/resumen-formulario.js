/* RESUMEN DE FORMULARIO
   Uso: <form data-resumen="idDelContenedor"> y un contenedor con ese id.
   Al enviar un formulario válido muestra los datos cargados en el contenedor.
   Cargar este archivo DESPUÉS de validaciones.js. */

// Limpia el texto de una etiqueta: quita asteriscos y aclaraciones
function limpiarEtiqueta(texto) {
    return texto
        .replace(/\(opcional\)/i, "")
        .replace(/\*/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

// Busca el nombre visible de un campo
function obtenerEtiqueta(campo) {
    // Los grupos de opciones usan un título propio (.form-label)
    if (campo.type === "radio") {
        const grupo = campo.closest(".form-group");
        const titulo = grupo && grupo.querySelector(".form-label");
        if (titulo) return limpiarEtiqueta(titulo.textContent);
    }

    if (campo.labels && campo.labels.length > 0) {
        return limpiarEtiqueta(campo.labels[0].textContent);
    }

    return campo.name || campo.id;
}

// Obtiene el valor del campo como texto legible
function obtenerValor(formulario, campo) {
    if (campo.type === "radio") {
        const elegido = formulario.querySelector(
            'input[type="radio"][name="' + campo.name + '"]:checked'
        );
        return elegido ? limpiarEtiqueta(elegido.parentElement.textContent) : "";
    }

    if (campo.type === "checkbox") return campo.checked ? "Sí" : "No";

    if (campo.type === "file") {
        return campo.files.length > 0 ? campo.files[0].name : "";
    }

    if (campo.tagName === "SELECT") {
        return campo.value ? campo.options[campo.selectedIndex].text : "";
    }

    return campo.value.trim();
}

// Arma la lista de datos del resumen
function construirResumen(formulario) {
    const lista = document.createElement("dl");
    const vistos = new Set();

    Array.from(formulario.elements).forEach(function (campo) {
        const ignorar = ["hidden", "submit", "reset", "button"];

        if (!campo.name || ignorar.includes(campo.type)) return;

        // Los botones de opción comparten nombre: se muestran una sola vez
        if (vistos.has(campo.name)) return;
        vistos.add(campo.name);

        const titulo = document.createElement("dt");
        titulo.textContent = obtenerEtiqueta(campo);

        const dato = document.createElement("dd");
        dato.textContent = obtenerValor(formulario, campo) || "No indicado";

        lista.append(titulo, dato);
    });

    return lista;
}

function iniciarResumen(formulario) {
    const contenedor = document.getElementById(formulario.dataset.resumen);
    if (!contenedor) return;

    formulario.addEventListener("submit", function (evento) {
        // Si la validación encontró errores, no se muestra nada
        if (evento.defaultPrevented) return;

        // Todavía no hay un servidor que reciba los datos
        evento.preventDefault();

        const titulo = document.createElement("h3");
        titulo.textContent = "Resumen de tu pedido";

        const aviso = document.createElement("p");
        aviso.className = "resumen-aviso";
        aviso.textContent =
            "Revisá los datos. Esta página todavía no está conectada a un servidor, por eso el pedido no se envía.";

        contenedor.replaceChildren(titulo, construirResumen(formulario), aviso);
        contenedor.hidden = false;
        contenedor.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    // Al borrar el formulario también se oculta el resumen
    formulario.addEventListener("reset", function () {
        contenedor.hidden = true;
        contenedor.replaceChildren();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("form[data-resumen]").forEach(iniciarResumen);
});
