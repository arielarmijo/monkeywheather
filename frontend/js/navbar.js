document.addEventListener('DOMContentLoaded', async function () {

    let response = await fetch("snippets/navbar.html");
    let navbar = await response.text();
    document.querySelector("nav").innerHTML = navbar;
    
});