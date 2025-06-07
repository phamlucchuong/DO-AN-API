<<<<<<< HEAD
=======
import {loginWithEmailAndPwd} from '../firebase/firebase-auth.js'

>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberMe = document.getElementById('remember-me');
  
  // Tạo phần hiển thị lỗi nếu chưa có
  let errorMessage = document.getElementById('error-message');
  if (!errorMessage) {
    errorMessage = document.createElement('p');
    errorMessage.id = 'error-message';
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '10px';
    loginForm.prepend(errorMessage);
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMessage.textContent = '';

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const isRememberMe = rememberMe.checked;

    if (!email || !password) {
      errorMessage.textContent = 'Vui lòng nhập email và mật khẩu.';
      return;
    }

<<<<<<< HEAD
    try {
      const response = await fetch('/employer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        errorMessage.textContent = errorData.message || 'Đăng nhập thất bại';
        return;
      }

      const data = await response.json();
      // Lưu ID vào localStorage hoặc sessionStorage dựa trên rememberMe
      if (isRememberMe) {
        localStorage.setItem('employerId', data.id);
      } else {
        sessionStorage.setItem('employerId', data.id);
      }
      
      console.log('Đăng nhập thành công:', { email, password, isRememberMe, userId: data.id });
=======

    try {

      const userCredential = await loginWithEmailAndPwd(email, password, "Employer");
      console.log('User Credential:', userCredential);
      const user = userCredential.user;
      if (!user) {
        throw new Error('Không tìm thấy user trong userCredential');
      }
    
      const token = await user.getIdToken();

      if (isRememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      
      console.log('Đăng nhập thành công:');
>>>>>>> 54bd3df142c5d84d5be09e1d494e215c82fd8f86
      window.location.href = '/employer/dashboard';

    } catch (error) {
      errorMessage.textContent = 'Đã xảy ra lỗi. Vui lòng thử lại.';
      console.error('Lỗi đăng nhập:', error);
    }
  });

  // Toggle hiển thị mật khẩu
  const togglePasswordBtn = document.getElementById('toggle-password');
  togglePasswordBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordBtn.querySelector('.eye').classList.add('hidden');
      togglePasswordBtn.querySelector('.eye-off').classList.remove('hidden');
    } else {
      passwordInput.type = 'password';
      togglePasswordBtn.querySelector('.eye').classList.remove('hidden');
      togglePasswordBtn.querySelector('.eye-off').classList.add('hidden');
    }
  });

  // Xử lý đăng nhập bằng Google
  document.getElementById('google-login').addEventListener('click', () => {
    console.log('Đăng nhập bằng Google được khởi tạo');
    // Thêm logic đăng nhập Google (ví dụ: chuyển hướng đến Google OAuth)
  });
});