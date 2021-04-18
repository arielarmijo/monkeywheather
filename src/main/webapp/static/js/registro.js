import { api } from "./api.js";
import { clearError } from "./utils.js";
import { showError } from "./utils.js";

document.addEventListener('DOMContentLoaded', function () {

    let userNameError = document.getElementById("userNameError");
    let passwordError = document.getElementById("passwordError");
    let userNameInput = document.getElementById("userName");
    let pwd1Input = document.getElementById("pwd1");
    let pwd2Input = document.getElementById("pwd2");
    let imgPreview = document.getElementById('image');
    let registrarButton = document.getElementById('registrarButton');

    userNameInput.addEventListener('focus', function() {clearError(userNameError)});
    pwd1Input.addEventListener('focus', function() {clearError(passwordError)});
    pwd2Input.addEventListener('focus', function() {clearError(passwordError)});
    imgPreview.addEventListener('change', updateImagePreview);
    registrarButton.addEventListener('click', registrarUsuario);

    function updateImagePreview() {
        let preview = document.getElementById('preview');
        if (preview.firstChild) {
            preview.removeChild(preview.firstChild);
        }
        let file = document.getElementById("image").files[0];
        let img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.width = "200";
        img.height = "200";
        preview.appendChild(img);
    }

    function registrarUsuario() {

        // Validaciones
        let userName = userNameInput.value;
        let pwd1 = pwd1Input.value;
        let pwd2 = pwd2Input.value;

        if (!userName) {
            showError(userNameError, "Ingresa nombre de usuario.");
            return;
        }
        
        if (!pwd1 && !pwd2) {
            showError(passwordError, "Ingresa contraseña.");
            return;
        }

        if (pwd1 !== pwd2) {
            showError(passwordError, "Contraseñas no coinciden.");
            return;
        }

        // Registro de usuario
        let imagen = document.getElementById('image').files[0];
        let location = document.getElementById("location").value;
        var data = new FormData();
        data.append("userName", userName);
        data.append("password", pwd1);
        data.append("location", location);
        data.append("image", imagen);

        fetch(`${api.user}/user`, {
            method: "POST",
            body: data
            })
            .then(response => {
                if (response.status == 200) {
                    var queryString = "?user=" + userName;
                    window.location.href = "./user.html" + queryString;
                } else {
                    console.log(response);
                }
                return response.text();
            })
            .then(data => {if (data) console.log(data)})
            .catch(e => console.log(e));
    };

});