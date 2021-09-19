const loginForm = document.getElementById("login-form");
const loginInput = document.getElementById("login-input");
const loginSubmit = document.getElementById("login-submit");


const handleLogin = () => {
    const { value } = loginInput;
    localStorage.setItem("nickname", value);
}

loginForm.addEventListener("submit", handleLogin);