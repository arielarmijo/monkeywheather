import { api } from "./api.js";

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('btnLogin').addEventListener('click', async function () {
        
        let usuario = document.getElementById("usuario").value;
        let password = document.getElementById("password").value;
        let feedback = document.getElementById('feedback');

        if (!usuario || !password) {
            feedback.classList.remove("d-none");
            feedback.innerText = "Llena todos los campos.";
            return;
        }

        let response = await fetch(api.user + "user/" + usuario);
        let userData = await response.json();
        console.log(userData);

        if (userData.userName === "NULL" || userData.password !== password) {
            feedback.classList.remove("d-none");
            feedback.innerText = "Usuario y/o contraseña inválido.";
            return;
        }

        window.location.href = "./user.html?user=" + usuario;

    });

});