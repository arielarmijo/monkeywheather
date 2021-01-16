import { apiUrl } from "./api.js";

document.addEventListener('DOMContentLoaded', function () {
    var url = new URL(window.location);
    var userName = url.searchParams.get("user");
    var avatar = document.querySelector("#avatar");
    avatar.width="150";
    avatar.height="150";
    avatar.src = apiUrl + "user/" + userName + "/image";
    document.querySelector("h1").textContent = "Bienvenido usuario " + userName;
});

