import {loginWithEmailAndPwd} from '../firebase/firebase-auth.js'

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


    try {

      const userCredential = await loginWithEmailAndPwd(email, password, "Employer");
      console.log('User Credential:', userCredential);
      const user = userCredential.user;
      if (!user) {
        throw new Error('Không tìm thấy user trong userCredential');
      }
    
      const token = await user.getIdToken();

      console.log(token);
      localStorage.setItem('token', token);
      
      console.log('Đăng nhập thành công:');
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