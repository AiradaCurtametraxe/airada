import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const formularioComentarios = document.getElementById("form-comentarios");

if (formularioComentarios) {

    const paxina = document.body.dataset.paxina;
    const campoNome = document.getElementById("nome");
    const campoComentario = document.getElementById("comentario");
    const listaComentarios = document.getElementById("lista-comentarios");
    const contador = document.getElementById("contador-comentarios");

    const comentariosRef = collection(db, "comentarios");

    const consultaComentarios = query(
        comentariosRef,
        where("paxina", "==", paxina),
        orderBy("data", "desc")
    );

    onSnapshot(consultaComentarios, function(snapshot) {

        listaComentarios.innerHTML = "";

        if (contador) {
            contador.textContent = "(" + snapshot.size + ")";
        }

        snapshot.forEach(function(doc) {

            const comentario = doc.data();

            const data = comentario.data?.toDate
                ? comentario.data.toDate().toLocaleString("gl-ES")
                : "Agora mesmo";

            const div = document.createElement("div");
            div.classList.add("comentario");

            div.innerHTML = `
                <h3>${comentario.nome}</h3>
                <p>${comentario.texto}</p>
                <small>${data}</small>
            `;

            listaComentarios.appendChild(div);

        });

    });

    formularioComentarios.addEventListener("submit", async function(e) {

        e.preventDefault();

        await addDoc(comentariosRef, {
            paxina: paxina,
            nome: campoNome.value,
            texto: campoComentario.value,
            data: serverTimestamp()
        });

        formularioComentarios.reset();

    });

}