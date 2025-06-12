document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("idToken");

    // Hàm phân tích JWT
    function parseJwt(token) {
        if (!token) return null;
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Lỗi parse JWT:", error);
            return null;
        }
    }

    if (!token) {
        console.warn("Không tìm thấy token trong localStorage");
        // Giữ logo mặc định
        return;
    }

    const payload = parseJwt(token);
    if (!payload || !payload.user_id) {
        console.warn("Token không hợp lệ hoặc thiếu user_id");
        // Giữ logo mặc định
        return;
    }

    const uid = payload.user_id;

    // Gọi API để lấy thông tin nhà tuyển dụng
    fetch(`/api/employer/profile?uid=${uid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Thêm token nếu API yêu cầu xác thực
        }
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || "Lỗi khi lấy thông tin nhà tuyển dụng");
                });
            }
            return response.json();
        })
        .then(data => {
            const logo = data.companyLogo || 'https://png.pngtree.com/png-vector/20210129/ourmid/pngtree-upload-avatar-by-default-png-image_2854358.jpg';
            const logoElement = document.querySelector(".logo");
            if (logoElement) {
                logoElement.src = logo;
            }
        })
        .catch(error => {
            console.error("Lỗi khi lấy logo:", error);
            // Giữ logo mặc định nếu lỗi
        });
});