document.addEventListener('DOMContentLoaded', async function () {

    let response = await fetch("snippets/navbar.html");
    let navbarTemplate = await response.text();
    let navbar = document.querySelector("nav");
    navbar.classList.add("navbar", "navbar-light", "bg-light");
    navbar.innerHTML = navbarTemplate;
    
});