export function clearError(input) {
    input.classList.add("d-none");
    input.innerText="";
}

export function showError(input, message) {
    input.classList.remove("d-none");
    input.innerText=message;
}