
const CLAVE_TEMA = "despensaSolcitoModoOscuro";

// Aplica el tema guardado en el navegador
function aplicarTema() {
    const modoOscuro = localStorage.getItem(CLAVE_TEMA) === "true";

    document.body.classList.toggle("modo-oscuro", modoOscuro);

    // Actualiza el control de Configuración, si existe
    const interruptor = document.getElementById("modoOscuro");

    if (interruptor) {
        interruptor.checked = modoOscuro;
    }

    // Actualiza el botón de tema, si existe
    const boton = document.getElementById("temaBoton");

    if (boton) {
        boton.setAttribute("aria-pressed", String(modoOscuro));
        boton.innerHTML = modoOscuro
            ? '<i class="fas fa-sun"></i><span>Modo claro</span>'
            : '<i class="fas fa-moon"></i><span>Modo oscuro</span>';
    }
}

// Guarda la preferencia y actualiza la página
function cambiarTema(activar) {
    localStorage.setItem(CLAVE_TEMA, String(activar));
    aplicarTema();
}

document.addEventListener("DOMContentLoaded", () => {
    aplicarTema();

    const interruptor = document.getElementById("modoOscuro");

    if (interruptor) {
        interruptor.addEventListener("change", () => {
            cambiarTema(interruptor.checked);
        });
    }

    const boton = document.getElementById("temaBoton");

    if (boton) {
        boton.addEventListener("click", () => {
            const activar =
                !document.body.classList.contains("modo-oscuro");

            cambiarTema(activar);
        });
    }
});
