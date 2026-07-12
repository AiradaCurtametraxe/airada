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

// sliders da home
document.querySelectorAll(".slider-home").forEach((slider) => {
    const track = slider.querySelector(".slider-track");
    const prev = slider.querySelector(".slider-prev");
    const next = slider.querySelector(".slider-next");

    if (!track || !prev || !next) return;

    next.addEventListener("click", () => {
        const card = track.querySelector(".icona-card");
        if (!card) return;

        const cardWidth = card.offsetWidth + 30;
        track.scrollBy({
            left: cardWidth,
            behavior: "smooth"
        });
    });

    prev.addEventListener("click", () => {
        const card = track.querySelector(".icona-card");
        if (!card) return;

        const cardWidth = card.offsetWidth + 30;
        track.scrollBy({
            left: -cardWidth,
            behavior: "smooth"
        });
    });
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