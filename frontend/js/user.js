import { apiUrl } from "./api.js";

document.addEventListener('DOMContentLoaded', function () {
    
    var url = new URL(window.location);
    var userName = url.searchParams.get("user");

    if (userName) {
        // Reemplaza los links del navbar
        var loginLink = document.getElementById("firstLink");
        var userLink = document.createElement("a");
        userLink.classList.add("nav-link");
        userLink.href = "user.html?user=" + userName;
        userLink.innerHTML = `<i class="fas fa-user-circle"></i> ${userName}`;
        loginLink.parentNode.replaceChild(userLink, loginLink);

        var signInLink = document.getElementById("secondLink");
        var logOutLink = document.createElement("a");
        logOutLink.classList.add("nav-link");
        logOutLink.href = "login.html";
        logOutLink.innerHTML = `<i class="fas fa-sign-out-alt"></i> Log out`;
        signInLink.parentNode.replaceChild(logOutLink, signInLink);

        // Muestra información del usuario
        var saludo = document.querySelector("#saludo");
        var avatar = document.querySelector("#avatar");
        saludo.textContent = "Bienvenido usuario " + userName;
        avatar.width="150";
        avatar.height="150";
        avatar.src = apiUrl + "user/" + userName + "/image";
        
        fetch(apiUrl + "user/" + userName)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response.status);
                }
            })
            .then(data => {
                console.log(data.locations);
                if (data.locations.length > 0) {
                    var ciudades = document.querySelector("#ciudades");
                    var selectList = document.createElement("select");
                    selectList.classList.add("form-control");
                    ciudades.appendChild(selectList);
                    data.locations.forEach(e => {
                    var option = document.createElement("option");
                    option.value=e.city;
                    option.text = e.city;
                    selectList.appendChild(option);
                });
                }
            })
            .catch(e => console.log(e.message));

    }
    
});