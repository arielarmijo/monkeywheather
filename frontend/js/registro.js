import { url } from "./api.js";

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('image').addEventListener('change', updateImagePreview);
    document.getElementById('btnVerUsuarios').addEventListener('click', logUsers);
    document.getElementById('btnRegistrar').addEventListener('click', registrarUsuario);

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
        let usuario = document.getElementById("userName").value;
        let password = document.getElementById("password").value;
        let imagen = document.getElementById('image').files[0];
        console.log(usuario, password, imagen);
        var data = new FormData();
        data.append("userName", usuario);
        data.append("password", password);
        data.append("image", imagen);
        fetch(url + "user", {
            method: "POST",
            body: data
            })
            .then(response => console.log(response))
            .catch(response => console.log(response));
    };

    function logUsers() {
        fetch(url + "users")
            .then(response => {
                if (response.status == 200) {
                    return response.text();
                } else {
                    throw "Respuesta incorrecta del servidor"
                }
            })
            .then(responseText => {
                let users = JSON.parse(responseText).results;
                console.log(responseText);
            })
            .catch(err => {
                console.log(err);
            });
    }
});