document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const employerData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        companyName: document.getElementById('companyName').value,
        companyAddress: document.getElementById('companyAddress').value,
        phoneNumber: document.getElementById('phoneNumber').value
    };

    const { email, password, companyName, companyAddress, phoneNumber } = employerData;
    if (!email || !password || !companyName || !companyAddress || !phoneNumber) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    fetch('/employer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employerData)
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
        if (status >= 200 && status < 300) {
            alert('Đăng ký thành công!');
            window.location.href = '/employer/login';
        } else {
            alert(`Đăng ký thất bại: ${body.message || 'Lỗi không xác định'}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Lỗi kết nối đến server!');
    });
});