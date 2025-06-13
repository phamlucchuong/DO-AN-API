import { loginWithGoogle, registerWithEmailAndPassword } from '/js/firebase/firebase-auth.js';

// Toggle password visibility
document.querySelector('.password-toggle').addEventListener('click', function () {
    const passwordInput = document.querySelector('#password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁' : '🙈';
});


document.getElementById('btnGoogleLogin').addEventListener('click', loginWithGoogle);

document.getElementById('registerForm').addEventListener('submit', () => {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = "Employee";
    const terms = document.getElementById("terms").checked;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!userName || !email || !password) {
        alert('Vui lòng nhập đầy đủ họ tên, email và mật khẩu.');
        return;
    }
    if (!terms) {
        alert('Vui lòng đồng ý với Thỏa thuận sử dụng và Quy định bảo mật.');
        return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,50}$/;
    if (!passwordRegex.test(password)) {
        alert('Mật khẩu phải từ 6 đến 50 ký tự, chứa ít nhất 1 chữ hoa và 1 số.');
        return;
    }
    if (!emailRegex.test(email)) {
        alert('Email không hợp lệ.');
        return;
    }
    registerWithEmailAndPassword(email, password, role);
});