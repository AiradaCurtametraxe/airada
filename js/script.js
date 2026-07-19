/* index */

const introContainer = document.getElementById("intro-container");
const introVideo = document.getElementById("intro-video");
const pantallaFinal = document.getElementById("pantalla-final");

if (introVideo) {
    introVideo.addEventListener("ended", function () {
        introContainer.style.display = "none";
        pantallaFinal.style.display = "flex";
    });
}


/* carrusel */

const carrusel = document.querySelector(".carrusel");

if (carrusel) {

    const imaxes = carrusel.querySelectorAll(".carrusel-img");
    const anterior = carrusel.querySelector(".anterior");
    const seguinte = carrusel.querySelector(".seguinte");

    let indice = 0;

    function mostrarImaxe(posicion) {
        imaxes.forEach(function(imaxe) {
            imaxe.classList.remove("activa");
        });

        imaxes[posicion].classList.add("activa");
    }

    seguinte.addEventListener("click", function() {
        indice++;

        if (indice >= imaxes.length) {
            indice = 0;
        }

        mostrarImaxe(indice);
    });

    anterior.addEventListener("click", function() {
        indice--;

        if (indice < 0) {
            indice = imaxes.length - 1;
        }

        mostrarImaxe(indice);
    });
}

/* home */

document.querySelectorAll(".slider-home").forEach(function(slider) {

    const viewport = slider.querySelector(".slider-viewport");
    const track = slider.querySelector(".slider-track");
    const prev = slider.querySelector(".slider-prev");
    const next = slider.querySelector(".slider-next");

    if (!viewport || !track || !prev || !next) {
        return;
    }

    function obterDesprazamento() {

        const primeiraTarxeta =
            track.querySelector(".icona-card");

        if (!primeiraTarxeta) {
            return viewport.clientWidth;
        }

        const estilosTrack =
            window.getComputedStyle(track);

        const separacion =
            parseFloat(estilosTrack.gap) || 0;

        return primeiraTarxeta.getBoundingClientRect().width
            + separacion;
    }

    function actualizarFrechas() {

        const desprazamentoMaximo =
            viewport.scrollWidth - viewport.clientWidth;

        prev.disabled =
            viewport.scrollLeft <= 2;

        next.disabled =
            viewport.scrollLeft >= desprazamentoMaximo - 2;
    }

    next.addEventListener("click", function() {

        viewport.scrollBy({
            left: obterDesprazamento(),
            behavior: "smooth"
        });

    });

    prev.addEventListener("click", function() {

        viewport.scrollBy({
            left: -obterDesprazamento(),
            behavior: "smooth"
        });

    });

    viewport.addEventListener(
        "scroll",
        actualizarFrechas
    );

    window.addEventListener(
        "resize",
        actualizarFrechas
    );

    window.addEventListener(
        "load",
        actualizarFrechas
    );

    requestAnimationFrame(actualizarFrechas);

});

/* fomulario - formulario */

const formContacto = document.getElementById("form-contacto");
const mensaxeFormulario = document.getElementById("mensaxe-formulario");

if (formContacto) {

    emailjs.init({
        publicKey: "uzF1mRtVBXoi-lQNt"
    });

    formContacto.addEventListener("submit", function(evento) {

        evento.preventDefault();

        mensaxeFormulario.textContent = "Enviando mensaxe...";

        emailjs.sendForm(
            "service_3jkp9e9",
            "template_9m3bcea",
            formContacto
        )
        .then(function() {
            mensaxeFormulario.textContent = "Mensaxe enviada correctamente.";
            formContacto.reset();
        })
        .catch(function(error) {
            console.error("Erro:", error);
            mensaxeFormulario.textContent = "Produciuse un erro ao enviar a mensaxe.";
        });

    });
}