document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const isPassword = passwordInput.type === "password";
    
    passwordInput.type = isPassword ? "text" : "password";
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");

    
});

const translations = {
  pt: {
    usernameLabel: "Login",
    passwordLabel: "Senha",
    loginButton: "Entrar",
    errorMessage: "Usuário e/ou senha inválidos",
    footer: "© VOANET TELECOM - voanet.com v.0.0.1 / 7.25.1"
  },
  en: {
    usernameLabel: "Username",
    passwordLabel: "Password",
    loginButton: "Sign In",
    errorMessage: "Invalid username or password",
    footer: "© VOANET TELECOM - voanet.com v.0.0.1 / 7.25.1"
  },
  es: {
    usernameLabel: "Usuario",
    passwordLabel: "Contraseña",
    loginButton: "Ingresar",
    errorMessage: "Usuario y/o contraseña inválidos",
    footer: "© VOANET TELECOM - voanet.com v.0.0.1 / 7.25.1"
  }
};

document.getElementById('languageSelect').addEventListener('change', function () {
  const lang = this.value;
  const t = translations[lang];

  if (t) {
    document.querySelector('label[for="username"]').textContent = t.usernameLabel;
    document.querySelector('label[for="password"]').textContent = t.passwordLabel;
    document.querySelector('button[type="submit"]').textContent = t.loginButton;
    document.querySelector('.error-msg').textContent = t.errorMessage;
    document.querySelector('footer').textContent = t.footer;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const errorMsg = document.querySelector('.error-msg');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // impede o submit automático

    if (username.value === 'admin' && password.value === '1234') {
      window.location.href = '../HomeTela/telahome.html'; // redireciona corretamente
    } else {
      errorMsg.style.display = 'block';
    }
  });
});

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  }
});

