import { api } from "./api.js";
import { clearError } from "./utils.js";
import { showError } from "./utils.js";

document.addEventListener('DOMContentLoaded', function () {

    let feedbackDiv = document.getElementById('feedback');
    let usuarioInput = document.getElementById("usuario");
    let passwordInput = document.getElementById("password");
    let loginButton = document.getElementById('loginBtn');

    usuarioInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          passwordInput.focus();
        }
      });

    passwordInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          loginButton.click();
        }
      });

    usuarioInput.addEventListener('focus', function () { clearError(feedbackDiv) });
    passwordInput.addEventListener('focus', function () { clearError(feedbackDiv) });

    loginButton.addEventListener('click', login);

    async function login() {
       
        let usuario = usuarioInput.value;
        let password = passwordInput.value;

        if (!usuario || !password) {
            showError(feedbackDiv, "Llena todos los campos.");
            return;
        }

        let response = await fetch(`${api.user}/user/${usuario}`);
        let userData = await response.json();
        console.log(userData);

        if (userData.userName === "NULL" || userData.password !== password) {
            showError(feedbackDiv, "Usuario y/o contraseña inválido.");
            return;
        }

        window.location.href = "./user.html?user=" + usuario;

    }

});

