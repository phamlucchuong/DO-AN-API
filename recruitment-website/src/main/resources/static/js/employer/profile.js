document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("idToken");

    // Hàm phân tích JWT
    function parseJwt(token) {
        if (!token) return null;
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Lỗi parse JWT:", error);
            return null;
        }
    }

    // Kiểm tra token
    if (!token) {
        console.warn("Không tìm thấy token trong localStorage");
        displayError("Vui lòng đăng nhập để xem hồ sơ.");
        return;
    }

    const payload = parseJwt(token);
    if (!payload || !payload.user_id) {
        console.warn("Token không hợp lệ hoặc thiếu user_id.");
        displayError("Token không hợp lệ. Vui lòng đăng nhập lại.");
        return;
    }

    const uid = payload.user_id;
    console.log("Gọi API với uid:", uid);

    // Gọi API để lấy thông tin nhà tuyển dụng
    fetch(`/api/employer/profile?uid=${uid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        console.log("Phản hồi API:", response);
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || `Lỗi HTTP: ${response.status}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("Dữ liệu nhà tuyển dụng:", data);
        updateProfile(data);
    })
    .catch(error => {
        console.error("Lỗi khi lấy thông tin:", error);
        displayError(`Lỗi khi tải hồ sơ: ${error.message}`);
        const logoElement = document.getElementById("companyLogo");
        if (logoElement) {
            logoElement.src = 'https://png.pngtree.com/png-vector/20210129/ourmid/pngtree-upload-avatar-by-default-png-image_2854358.jpg';
        }
    });

    // Hàm hiển thị lỗi
    function displayError(message) {
        const errorElement = document.getElementById("error-message");
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
            document.querySelector(".profile-details-container").style.display = "none";
        }
    }

    // Hàm cập nhật giao diện
    function updateProfile(data) {
        const fields = [
            { id: "companyLogo", value: data.companyLogo, isImage: true },
            { id: "companyName", value: data.companyName },
            { id: "industry", value: data.industry },
            { id: "companyAddress", value: data.companyAddress },
            { id: "city", value: data.city },
            { id: "companyDescription", value: data.companyDescription },
            { id: "companyWebsite", value: data.companyWebsite, isLink: true },
            { id: "phoneNumber", value: data.phoneNumber },
            { id: "companySize", value: data.companySize ? `${data.companySize} employees` : null },
            { id: "foundedDate", value: data.foundedDate },
            { id: "taxCode", value: data.taxCode },
            { id: "isApproved", value: data.isApproved ? "Approved" : "Pending" },
            { id: "createdAt", value: data.createdAt },
            { id: "updatedAt", value: data.updatedAt }
        ];

        fields.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) {
                if (item.isImage) {
                    element.src = item.value || 'https://png.pngtree.com/png-vector/20210129/ourmid/pngtree-upload-avatar-by-default-png-image_2854358.jpg';
                } else if (item.isLink) {
                    element.textContent = item.value || "N/A";
                    element.href = item.value || "#";
                } else {
                    element.textContent = item.value || "N/A";
                }
            } else {
                console.warn(`Không tìm thấy phần tử với id: ${item.id}`);
            }
        });
    }
});