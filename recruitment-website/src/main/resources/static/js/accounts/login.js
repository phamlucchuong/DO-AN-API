import { loginWithGoogle, loginWithEmailAndPwd, forgotPassword } from '../firebase/firebase-auth.js';
// import { loginWithGoogle, loginWithEmailAndPwd, forgotPassword } from '/js/firebase/firebase-auth.js';



function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁';
    }
}

function closeModal() {
    document.querySelector('.login-modal').style.transform = 'scale(0.95)';
    document.querySelector('.login-modal').style.opacity = '0';
    setTimeout(() => {
        alert('Modal would close in a real application');
    }, 200);
}

// Form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Form submitted! In a real app, this would process the login.');
});



document.getElementById('forget-pwd-btn').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('forgotPasswordForm').style.display = 'block';
    document.querySelector('.modal-title').innerHTML = "Quên mật khẩu";
});

window.backToLogin = function () {
    document.getElementById('forgotPasswordForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.querySelector('.modal-title').innerHTML = "Đăng nhập để tiếp tục";
};




document.getElementById('btnGoogleLogin').addEventListener('click', () => loginWithGoogle('Employee'));


document.getElementById('btnEmailLogin').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Vui lòng nhập đầy đủ email và mật khẩu.');
        return;
    }

    loginWithEmailAndPwd(email, password, 'Employee');
});


document.getElementById('reset-pwd').addEventListener('click', () => {
    const email = document.getElementById('resetEmail').value;
    if (!email) {
        alert('Vui lòng nhập email để đặt lại mật khẩu.');
        return;
    }

    try {
        forgotPassword(email);
        alert('Đã gửi email đặt lại mật khẩu!');
        backToLogin();
    } catch (error) {
        alert('Lỗi gửi yêu cầu: ' + error.message);
    }
});