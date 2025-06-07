import { registerWithEmailAndPassword } from '../firebase/firebase-auth.js';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    const statusMessage = document.getElementById("status-message");

    const errorFields = {
        email: document.getElementById("email-error"),
        password: document.getElementById("password-error"),
        companyName: document.getElementById("companyName-error"),
        companyLogo: document.getElementById("companyLogo-error"),
        companyAddress: document.getElementById("companyAddress-error"),
        phoneNumber: document.getElementById("phoneNumber-error"),
        taxCode: document.getElementById("taxCode-error"),
        industry: document.getElementById("industry-error"),
        companySize: document.getElementById("companySize-error"),
        foundedDate: document.getElementById("foundedDate-error"),
        city: document.getElementById("city-error"),
        companyWebsite: document.getElementById("companyWebsite-error"),
        companyDescription: document.getElementById("companyDescription-error"),
    };

    function clearErrors() {
        Object.values(errorFields).forEach(span => {
            span.textContent = "";
        });
        statusMessage.textContent = "";
        statusMessage.className = "status-message";
    }

    function validateForm(data) {
        let isValid = true;
        clearErrors();

        if (!data.get("email")) {
            errorFields.email.textContent = "Email không được để trống";
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.get("email"))) {
                errorFields.email.textContent = "Email không hợp lệ";
                isValid = false;
            }
        }

        if (!data.get("password") || data.get("password").length < 6) {
            errorFields.password.textContent = "Mật khẩu ít nhất 6 ký tự";
            isValid = false;
        }

        ["companyName", "companyAddress", "phoneNumber", "taxCode", "industry", "companySize", "foundedDate", "city"].forEach(field => {
            if (!data.get(field)) {
                errorFields[field].textContent = "Trường này không được để trống";
                isValid = false;
            }
        });

        const phone = data.get("phoneNumber");
        if (phone && !/^\d{9,11}$/.test(phone)) {
            errorFields.phoneNumber.textContent = "Số điện thoại không hợp lệ (9-11 chữ số)";
            isValid = false;
        }

        const website = data.get("companyWebsite");
        if (website) {
            try {
                new URL(website);
            } catch {
                errorFields.companyWebsite.textContent = "URL không hợp lệ";
                isValid = false;
            }
        }

        return isValid;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        console.log('FormData entries:', Object.fromEntries(formData));

        if (!validateForm(formData)) {
            return;
        }

        statusMessage.textContent = "Đang gửi dữ liệu...";
        statusMessage.className = "status-message info";

        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const userCredential = await registerWithEmailAndPassword(email, password, "Employer");
            console.log('User Credential:', userCredential);
            const user = userCredential.user;
            if (!user) {
                throw new Error('Không tìm thấy user trong userCredential');
            }

            formData.append('firebaseUid', user.uid);
            console.log('FormData with firebaseUid:', Object.fromEntries(formData));

            const response = await fetch("/api/employer/register", {
                method: "POST",
                body: formData,
            });

            const contentType = response.headers.get("content-type");
            let responseData;

            if (contentType && contentType.includes("application/json")) {
                responseData = await response.json();
            } else {
                responseData = { message: await response.text() };
            }

            if (response.ok && responseData.success) {
                statusMessage.textContent = responseData.message || "Đăng ký thành công!";
                statusMessage.className = "status-message success";
                form.reset();
                window.location.href = "/employer/login";
            } else {
                console.error('Server error response:', responseData);
                statusMessage.textContent = responseData.message || `Lỗi server: ${response.status}`;
                statusMessage.className = "status-message error";
            }
        } catch (error) {
            console.error('Error creating user:', error);
            statusMessage.textContent = "Lỗi khi đăng ký: " + error.message;
            statusMessage.className = "status-message error";
        }
    });
});