document.addEventListener("DOMContentLoaded", function() {
    const users = [
        
    ];

    function login(event) {
        event.preventDefault();
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");

        emailInput.classList.remove("erro");

        const email = emailInput.value;
        const password = passwordInput.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailInput.classList.add("erro");
            const errorElement = document.getElementById("erroLogin");
            errorElement.textContent = "Formato de e-mail inválido";
            setTimeout(() => {
                errorElement.textContent = "";
            }, 5000);
            return;
        }
        
        sessionStorage.setItem("user", JSON.stringify({ email, name: "Usuário" }));
        const successMessage = document.getElementById("sucessoLogin");
        if (successMessage) {
            successMessage.textContent = "Login realizado com sucesso!";
            successMessage.classList.add("login-success");
        }
        setTimeout(function () {
            window.location.href = "../index.html"; 
        }, 3000);
    }

    function logout() {
        sessionStorage.removeItem("user");
        window.location.href = "../login.html"; 
    }

    function checkAuth() {
        const user = sessionStorage.getItem("user");
        if (!user) {
            window.location.href = "../login.html";
        } else {
            const userInfo = JSON.parse(user);
            const userInfoElement = document.getElementById("infoUsuario");
            if (userInfoElement) {
                userInfoElement.innerHTML = `<p>Bem-vindo, ${userInfo.name} (${userInfo.email})</p>`;
            }
            const logoutBtn = document.getElementById("logoutBtn");
            if (logoutBtn) {
                logoutBtn.addEventListener("click", logout);
            }
        }
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }

    if (window.location.pathname.includes("about.html")) {
        checkAuth();
    }
});
