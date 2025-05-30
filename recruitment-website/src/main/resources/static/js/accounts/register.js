

// Toggle password visibility
document.querySelector('.password-toggle').addEventListener('click', function () {
    const passwordInput = document.querySelector('#password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁' : '🙈';
});

// Form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Form submitted! (This is just a demo)');
});

// Social login buttons
document.querySelector('.facebook-btn').addEventListener('click', function () {
    alert('Facebook login clicked! (This is just a demo)');
});

document.querySelector('.google-btn').addEventListener('click', function () {
    alert('Google login clicked! (This is just a demo)');
});
