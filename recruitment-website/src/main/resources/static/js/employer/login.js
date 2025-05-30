document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const rememberMe = document.getElementById('remember-me').checked;
      console.log('Login attempt:', { email, password, rememberMe });
      // Handle login logic here
    });

    document.getElementById('toggle-password').addEventListener('click', function() {
      const passwordInput = document.getElementById('password');
      const eye = this.querySelector('.eye');
      const eyeOff = this.querySelector('.eye-off');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eye.classList.add('hidden');
        eyeOff.classList.remove('hidden');
      } else {
        passwordInput.type = 'password';
        eye.classList.remove('hidden');
        eyeOff.classList.add('hidden');
      }
    });

    document.getElementById('google-login').addEventListener('click', function() {
      console.log('Google login initiated');
      // Implement Google login logic here (e.g., redirect to Google OAuth)
    });

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
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

    if (!email || !password) {
      errorMessage.textContent = 'Please enter email and password.';
      return;
    }

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
        errorMessage.textContent = errorData.message || 'Login failed';
        return;
      }

      const data = await response.json();
        window.location.href = '/employer/dashboard';

    } catch (error) {
      errorMessage.textContent = 'Error occurred. Please try again.';
      console.error('Login error:', error);
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
});
