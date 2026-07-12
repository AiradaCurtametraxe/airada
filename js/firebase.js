import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD7jJ-r9Vz_dshXO0VakEdrpiNAiTigBpc",
    authDomain: "airadaweb.firebaseapp.com",
    projectId: "airadaweb",
    storageBucket: "airadaweb.firebasestorage.app",
    messagingSenderId: "346848795832",
    appId: "1:346848795832:web:436d0ba3bb93343c13e84d",
    measurementId: "G-D5ERV4HM5R"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app, "default");

export { db };