import { url } from "./api.js";

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('btnLogin').addEventListener('click', login);
    var loginSuccess;
    function login() {
        let usuario = document.getElementById("usuario").value;
        let password = document.getElementById("password").value;
        var data = new FormData();
        data.append("userName", usuario);
        fetch(url + "user/" + usuario, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if (password == data.password) {
                var queryString = "?user=" + usuario;
                window.location.href = "./user.html" + queryString;
            } else {
                let feedback = document.getElementById('feedback');
                feedback.classList.remove("d-none");
            }
        })
        .catch(e => console.log(e));
    };

    console.log(loginSuccess);

});