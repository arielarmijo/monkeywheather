import { apiUrl } from "./api.js";

document.addEventListener('DOMContentLoaded', function () {

    let userNameError = document.getElementById("userNameError");
    let passwordError = document.getElementById("passwordError");

    document.getElementById('image').addEventListener('change', updateImagePreview);
    document.getElementById('btnRegistrar').addEventListener('click', registrarUsuario);

    document.getElementById('userName').addEventListener('focus', function() {clearError(userNameError)});
    document.getElementById('pwd1').addEventListener('focus', function() {clearError(passwordError)});
    document.getElementById('pwd2').addEventListener('focus', function() {clearError(passwordError)});

    function clearError(input) {
        input.classList.add("d-none");
        input.innerText="";
    }

    function showError(input, message) {
        input.classList.remove("d-none");
        input.innerText=message;
    }

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

        let userName = document.getElementById("userName").value;

        if (!userName) {
            showError(userNameError, "Ingresa nombre de usuario.");
            return;
        }

        let pwd1 = document.getElementById("pwd1").value;
        let pwd2 = document.getElementById("pwd2").value;
        
        if (!pwd1 && !pwd2) {
            showError(passwordError, "Ingresa contraseña.");
            return;
        }

        if (pwd1 !== pwd2) {
            showError(passwordError, "Contraseñas no coinciden.");
            return;
        }

        let imagen = document.getElementById('image').files[0];
        let location = document.getElementById("location").value;
        var data = new FormData();
        data.append("userName", userName);
        data.append("password", pwd1);
        data.append("location", location);
        data.append("image", imagen);

        fetch(apiUrl + "user", {
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
            .then(data => console.log(data))
            .catch(e => console.log(e));
    };

    function getUserNames() {
        fetch(apiUrl + "users")
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.status);
                }
            })
            .then(data => callback(data))
            .catch(e => console.log(e.message));
    }
});