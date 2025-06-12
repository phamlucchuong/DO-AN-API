document.getElementById('resetForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const btnText = document.getElementById('btnText');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
   
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Vui lòng nhập địa chỉ email hợp lệ.';
        return;
    }
    
   
    loading.style.display = 'inline-block';
    btnText.textContent = 'Đang gửi...';
    submitBtn.disabled = true;
  
    import('/js/firebase/firebase-auth.js').then(({ forgotPassword }) => {
        forgotPassword(email).then(() => {
            
            loading.style.display = 'none';
            btnText.textContent = 'Gởi link để tạo mật khẩu';
            submitBtn.disabled = false;
            
     
            successMessage.style.display = 'block';
            successMessage.textContent = `Link đặt lại mật khẩu đã được gửi đến ${email}. Vui lòng kiểm tra hộp thư của bạn.`;
            
           
            document.getElementById('email').value = '';
            
            // Auto hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
            
            // Trigger particles on successful submission
            setTimeout(createParticles, 1500);
        }).catch((error) => {
            // Hide loading state
            loading.style.display = 'none';
            btnText.textContent = 'Gởi link để tạo mật khẩu';
            submitBtn.disabled = false;
            
            // Show error message
            errorMessage.style.display = 'block';
            if (error.code === 'auth/invalid-email') {
                errorMessage.textContent = 'Email không hợp lệ. Vui lòng kiểm tra lại.';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage.textContent = 'Không tìm thấy tài khoản với email này.';
            } else {
                errorMessage.textContent = 'Lỗi: ' + error.message;
            }
        });
    });
});


const input = document.getElementById('email');

input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
    this.parentElement.style.transition = 'transform 0.3s ease';
});

input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
});

const shieldIcon = document.querySelector('.shield-icon');

setInterval(() => {
    shieldIcon.style.transform = 'perspective(1000px) rotateX(10deg) translateY(-5px)';
    setTimeout(() => {
        shieldIcon.style.transform = 'perspective(1000px) rotateX(10deg) translateY(0px)';
    }, 1000);
}, 3000);

// Add particle effect on form submission
function createParticles() {
    const card = document.querySelector('.reset-card');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#3b82f6';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = 'fadeOut 2s ease forwards';
        
        card.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }
`;
document.head.appendChild(style);