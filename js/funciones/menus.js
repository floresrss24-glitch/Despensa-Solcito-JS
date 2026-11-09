/* MENUS DEL SITIO: perfil desplegable y enlace activo */

// Menú desplegable de "Mi perfil"
function iniciarMenuPerfil() {
    const boton = document.getElementById("perfilBoton");
    const menu = document.getElementById("perfilMenu");

    if (!boton || !menu) return;

    function cerrar() {
        menu.hidden = true;
        boton.setAttribute("aria-expanded", "false");
    }

    // Abrir o cerrar al hacer clic en el botón
    boton.addEventListener("click", function () {
        const abierto = boton.getAttribute("aria-expanded") === "true";

        boton.setAttribute("aria-expanded", String(!abierto));
        menu.hidden = abierto;
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", function (evento) {
        if (!evento.target.closest(".dropdown-menu")) {
            cerrar();
        }
    });

    // Cerrar al presionar Escape
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && !menu.hidden) {
            cerrar();
            boton.focus();
        }
    });
}

// Marcar en la barra de navegación la página en la que estamos
function marcarEnlaceActivo() {
    const enlaces = document.querySelectorAll(".navbar a");
    if (enlaces.length === 0) return;

    const ruta = window.location.pathname.toLowerCase();
    let actual = ruta.split("/").pop();

    if (actual === "") actual = "index.html";

    // Las páginas dentro de /categorias/ pertenecen a "Productos"
    if (ruta.includes("/categorias/")) actual = "producto.html";

    enlaces.forEach(function (enlace) {
        const destino = new URL(enlace.href).pathname
            .toLowerCase()
            .split("/")
            .pop();

        if (destino === actual) {
            enlace.setAttribute("aria-current", "page");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    iniciarMenuPerfil();
    marcarEnlaceActivo();
});
