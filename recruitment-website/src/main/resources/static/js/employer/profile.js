document.addEventListener("DOMContentLoaded", function() {
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
    const token = localStorage.getItem("idToken");
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
    const viewContainer = document.getElementById("profile-view");
    const editContainer = document.getElementById("profile-edit");
    const editButton = document.getElementById("edit-profile-btn");
    const cancelButton = document.getElementById("cancel-btn");
    const form = document.getElementById("profile-form");
    const logoInput = document.getElementById("profile-img");
    const logoPreview = document.getElementById("profile-img-preview");

    let profileData = null;

    // Hàm hiển thị lỗi chung
    function displayError(message) {
        const errorElement = document.getElementById("error-message");
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        }
    }

    // Hàm hiển thị thông báo trạng thái (chỉ cho success)
    function displayStatus(message) {
        const successElement = document.getElementById("success-message");
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = "block";
            setTimeout(() => {
                successElement.style.display = "none";
            }, 3000); // Ẩn sau 3 giây
        }
    }

    // Hàm hiển thị lỗi cho từng trường
    function displayFieldErrors(errors) {
        const fieldErrorMap = {
            companyName: 'companyName-error',
            companyAddress: 'companyAddress-error',
            phoneNumber: 'phoneNumber-error',
            taxCode: 'taxCode-error',
            industry: 'industry-error',
            companySize: 'companySize-error',
            foundedDate: 'foundedDate-error',
            city: 'city-error',
            companyWebsite: 'companyWebsite-error',
            companyDescription: 'companyDescription-error',
            companyLogo: 'companyLogo-error'
        };

        // Xóa tất cả thông báo lỗi trước đó
        Object.values(fieldErrorMap).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = '';
                element.style.display = 'none';
            }
        });

        // Hiển thị lỗi mới cho các trường
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(fieldErrorMap[field]);
            if (errorElement) {
                errorElement.textContent = errors[field];
                errorElement.style.display = "block";
            }
        });
    }

    // Hàm chuyển sang chế độ xem
    function switchToViewMode() {
        if (viewContainer && editContainer) {
            viewContainer.style.display = "block";
            editContainer.style.display = "none";
            document.getElementById("error-message").style.display = "none";
            document.getElementById("success-message").style.display = "none";
            displayFieldErrors({});
        }
    }

    // Hàm chuyển sang chế độ chỉnh sửa
    function switchToEditMode() {
        if (viewContainer && editContainer) {
            viewContainer.style.display = "none";
            editContainer.style.display = "block";
            populateForm(profileData);
        }
    }

    // Xử lý preview logo
    if (logoInput && logoPreview) {
        logoInput.addEventListener("change", function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    logoPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Hàm cập nhật giao diện chế độ xem
    function updateProfileView(data) {
        profileData = data;
        const fields = [
            { id: "companyLogo", value: data.companyLogo, isImage: true },
            { id: "companyName", value: data.companyName },
            { id: "industry", value: data.industry },
            { id: "companyAddress", value: data.companyAddress },
            { id: "city", value: data.city },
            { id: "companyDescription", value: data.companyDescription },
            { id: "companyWebsite", value: data.companyWebsite, isLink: true },
            { id: "phoneNumber", value: data.phoneNumber },
            { id: "companySize", value: data.companySize },
            { id: "foundedDate", value: data.foundedDate ? new Date(data.foundedDate).toLocaleDateString('vi-VN') : null },
            { id: "taxCode", value: data.taxCode },
            { id: "isApproved", value: data.isApproved ? "Đã duyệt" : "Chờ duyệt" },
            { id: "createdAt", value: data.createdAt ? new Date(data.createdAt).toLocaleString('vi-VN') : null },
            { id: "updatedAt", value: data.updatedAt ? new Date(data.updatedAt).toLocaleString('vi-VN') : null }
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

    // Hàm điền dữ liệu vào biểu mẫu
    function populateForm(data) {
        if (!data) return;
        const fields = [
            { id: "editCompanyName", value: data.companyName },
            { id: "industryUpdate", value: data.industry, isSelect: true },
            { id: "editCompanyAddress", value: data.companyAddress },
            { id: "editCity", value: data.city, isSelect: true },
            { id: "editCompanyDescription", value: data.companyDescription, isTextarea: true },
            { id: "editCompanyWebsite", value: data.companyWebsite },
            { id: "editPhoneNumber", value: data.phoneNumber },
            { id: "companySizeUpdate", value: data.companySize, isSelect: true },
            { id: "editFoundedDate", value: data.foundedDate ? new Date(data.foundedDate).toISOString().split('T')[0] : '' },
            { id: "editTaxCode", value: data.taxCode }
        ];

        fields.forEach(item => {
            const element = document.getElementById(item.id);
            if (element) {
                if (item.isSelect) {
                    const option = element.querySelector(`option[value="${item.value || ''}"]`);
                    if (option) {
                        option.selected = true;
                    } else {
                        console.warn(`Không tìm thấy tùy chọn với value "${item.value}" trong #${item.id}`);
                        element.value = '';
                    }
                } else if (item.isTextarea) {
                    element.textContent = item.value || '';
                } else {
                    element.value = item.value || '';
                }
            } else {
                console.warn(`Không tìm thấy phần tử với id: ${item.id}`);
            }
        });

        if (logoPreview && data.companyLogo) {
            logoPreview.src = data.companyLogo;
        }
    }

    // Lấy dữ liệu hồ sơ
    function fetchProfile() {
        fetch(`/api/employer/profile?uid=${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || `Lỗi HTTP: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log("Dữ liệu hồ sơ:", data);
            updateProfileView(data);
        })
        .catch(error => {
            console.error("Lỗi khi lấy thông tin:", error);
            displayError(`Lỗi khi tải hồ sơ: ${error.message}`);
        });
    }

    // Xử lý nút chỉnh sửa
    if (editButton) {
        editButton.addEventListener("click", switchToEditMode);
    }

    // Xử lý nút Hủy
    if (cancelButton) {
        cancelButton.addEventListener("click", switchToViewMode);
    }

    // Xử lý submit biểu mẫu
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            formData.append("uid", uid);

            // Xóa thông báo trước đó
            document.getElementById("error-message").style.display = "none";
            document.getElementById("success-message").style.display = "none";
            displayFieldErrors({});

            fetch(`/api/employer/profile/update`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        if (data.errors) {
                            // Hiển thị lỗi cho từng trường
                            displayFieldErrors(data.errors);
                        } else if (data.message && data.message.includes('Violation of UNIQUE KEY constraint')) {
                            // Xử lý lỗi trùng taxCode
                            displayFieldErrors({ taxCode: 'Sai mã số thuế' });
                        } else {
                            // Hiển thị lỗi chung nếu không có lỗi cụ thể
                            throw new Error(data.message || `Lỗi HTTP: ${response.status}`);
                        }
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log("Cập nhật hồ sơ thành công:", data);
                // Kiểm tra xem data có thuộc tính data không
                if (data && data.data) {
                    displayStatus("Cập nhật hồ sơ thành công!");
                    updateProfileView(data.data);
                    setTimeout(switchToViewMode, 2000);
                } else {
                    console.error("Dữ liệu trả về không đúng định dạng:", data);
                    throw new Error("Dữ liệu trả về không đúng định dạng");
                }
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật:", error);
                // Hiển thị lỗi chung
                displayError(`Lỗi: ${error.message}`);
            });
        });
    }

    // Tải dữ liệu ban đầu
    fetchProfile();
});