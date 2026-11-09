/* GALERIA DE IMAGENES (visor ampliado)
   Uso: agregar data-galeria al contenedor que tiene las imágenes. */

function crearVisor() {
    const raiz = document.createElement("div");
    raiz.className = "visor";
    raiz.hidden = true;
    raiz.setAttribute("role", "dialog");
    raiz.setAttribute("aria-modal", "true");
    raiz.setAttribute("aria-label", "Galería de imágenes");

    raiz.innerHTML =
        '<button type="button" class="visor-cerrar" aria-label="Cerrar">&times;</button>' +
        '<button type="button" class="visor-anterior" aria-label="Imagen anterior">&#10094;</button>' +
        '<figure class="visor-figura"><img alt=""><figcaption></figcaption></figure>' +
        '<button type="button" class="visor-siguiente" aria-label="Imagen siguiente">&#10095;</button>';

    document.body.appendChild(raiz);

    return {
        raiz: raiz,
        imagen: raiz.querySelector("img"),
        texto: raiz.querySelector("figcaption"),
        cerrar: raiz.querySelector(".visor-cerrar"),
        anterior: raiz.querySelector(".visor-anterior"),
        siguiente: raiz.querySelector(".visor-siguiente")
    };
}

function iniciarGaleria(contenedor) {
    const imagenes = Array.from(contenedor.querySelectorAll("img"));
    if (imagenes.length === 0) return;

    const visor = crearVisor();
    let indice = 0;

    function mostrar(nuevoIndice) {
        // Al llegar al final se vuelve al principio y viceversa
        indice = (nuevoIndice + imagenes.length) % imagenes.length;

        const origen = imagenes[indice];
        visor.imagen.src = origen.currentSrc || origen.src;
        visor.imagen.alt = origen.alt;
        visor.texto.textContent = origen.alt;
    }

    function abrir(nuevoIndice) {
        mostrar(nuevoIndice);
        visor.raiz.hidden = false;
        visor.cerrar.focus();
    }

    function cerrar() {
        visor.raiz.hidden = true;
        imagenes[indice].focus();
    }

    imagenes.forEach(function (imagen, i) {
        imagen.tabIndex = 0;
        imagen.setAttribute("role", "button");

        imagen.addEventListener("click", function () { abrir(i); });

        imagen.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                abrir(i);
            }
        });
    });

    visor.cerrar.addEventListener("click", cerrar);
    visor.anterior.addEventListener("click", function () { mostrar(indice - 1); });
    visor.siguiente.addEventListener("click", function () { mostrar(indice + 1); });

    // Cerrar al hacer clic en el fondo oscuro
    visor.raiz.addEventListener("click", function (evento) {
        if (evento.target === visor.raiz) cerrar();
    });

    // Teclado: Escape cierra y las flechas cambian de imagen
    document.addEventListener("keydown", function (evento) {
        if (visor.raiz.hidden) return;

        if (evento.key === "Escape") cerrar();
        if (evento.key === "ArrowLeft") mostrar(indice - 1);
        if (evento.key === "ArrowRight") mostrar(indice + 1);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-galeria]").forEach(iniciarGaleria);
});
