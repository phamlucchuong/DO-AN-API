document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("job-form");
  const submitBtn = document.querySelector("button[type='submit']");
  const alertContainer = document.getElementById("alert-container");
  const token = localStorage.getItem("idToken");
  console.log("Token lấy từ localStorage:", token);

  // Object để lưu trạng thái lỗi của các trường
  const fieldErrors = {
    title: true,
    employmentType: true,
    jobLevel: true,
    description: true,
    requirements: true,
    city: true,
    deadline: false, // Không bắt buộc, nhưng kiểm tra nếu có giá trị
  };

  // Hàm hiển thị thông báo lỗi
  function showError(messages) {
    const messageHtml = Array.isArray(messages)
      ? `<div class="error-message">${messages.join("<br>")}</div>`
      : `<div class="error-message">${messages}</div>`;
    alertContainer.innerHTML = messageHtml;
  }

  // Hàm xóa thông báo lỗi
  function clearError() {
    alertContainer.innerHTML = "";
  }

  // Hàm parse JWT
  function parseJwt(token) {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Lỗi parse JWT:", error);
      return null;
    }
  }

  // Kiểm tra token và isApproved khi tải trang
  if (!token) {
    alert("Vui lòng đăng nhập để đăng bài tuyển dụng.");
    window.location.href = "/employer/login";
    return;
  }

  const payload = parseJwt(token);
  if (!payload || !payload.user_id) {
    alert("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
    window.location.href = "/employer/login";
    return;
  }

  // Fetch thông tin employer để kiểm tra isApproved
  fetch(`/api/employer/profile?uid=${payload.user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Lỗi khi lấy thông tin nhà tuyển dụng");
      }
      return response.json();
    })
    .then((data) => {
      if (!data.isApproved) {
        showError("Tài khoản của bạn chưa được duyệt. Vui lòng chờ duyệt để đăng bài tuyển dụng.");
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = "#cccccc";
        submitBtn.style.cursor = "not-allowed";
        window.location.href = "/employer/dashboard";
      }
    })
    .catch((error) => {
      console.error("Lỗi khi kiểm tra isApproved:", error);
      showError("Lỗi khi kiểm tra trạng thái tài khoản: " + error.message);
    });

  // Đặt giá trị min cho input deadline
  const deadlineInput = document.getElementById("deadline");
  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // Định dạng YYYY-MM-DD
  deadlineInput.setAttribute("min", todayString);

  // Bắt sự kiện change cho deadline để kiểm tra ngay
  deadlineInput.addEventListener("change", function () {
    const value = deadlineInput.value.trim();
    if (value) {
      const selectedDate = new Date(value);
      selectedDate.setHours(0, 0, 0, 0); // Đặt giờ về 00:00 để so sánh ngày
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      fieldErrors.deadline = selectedDate < today;
      if (fieldErrors.deadline) {
        showError("Hạn nộp hồ sơ phải từ hôm nay trở đi.");
      } else {
        clearError();
      }
    } else {
      fieldErrors.deadline = false; // Không bắt buộc
      clearError();
    }
  });

  // Xử lý submit form
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearError();

    if (!token) {
      alert("Vui lòng đăng nhập để đăng bài tuyển dụng.");
      window.location.href = "/employer/login";
      return;
    }

    const payload = parseJwt(token);
    if (!payload || !payload.user_id) {
      alert("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
      window.location.href = "/employer/login";
      return;
    }

    // Kiểm tra các trường khi submit
    const fieldsToValidate = [
      { id: "job-title", key: "title", message: "Vui lòng nhập tiêu đề công việc." },
      { id: "employmentType", key: "employmentType", message: "Vui lòng chọn loại hình công việc." },
      { id: "jobLevel", key: "jobLevel", message: "Vui lòng chọn cấp bậc công việc." },
      { id: "description", key: "description", message: "Vui lòng nhập mô tả công việc." },
      { id: "requirements", key: "requirements", message: "Vui lòng nhập yêu cầu công việc." },
      { id: "city", key: "city", message: "Vui lòng chọn thành phố." },
    ];

    const errors = [];
    fieldsToValidate.forEach((field) => {
      const element = document.getElementById(field.id);
      const value = element.value.trim();
      if (value === "") {
        errors.push(field.message);
        fieldErrors[field.key] = true;
      } else {
        fieldErrors[field.key] = false;
      }
    });

    // Kiểm tra deadline
    const deadlineValue = deadlineInput.value.trim();
    if (deadlineValue) {
      const selectedDate = new Date(deadlineValue);
      selectedDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.push("Hạn nộp hồ sơ phải từ hôm nay trở đi.");
        fieldErrors.deadline = true;
      }
    }

    // Kiểm tra nếu có lỗi
    if (errors.length > 0) {
      showError(errors);
      submitBtn.disabled = true;
      submitBtn.style.backgroundColor = "#cccccc";
      submitBtn.style.cursor = "not-allowed";
      return;
    }

    // Nếu không có lỗi, bật lại nút submit và gửi dữ liệu
    submitBtn.disabled = false;
    submitBtn.style.backgroundColor = "";
    submitBtn.style.cursor = "pointer";

    const formData = new FormData(form);
    formData.append("employerId", payload.user_id);
    formData.append("status", "OPEN");

    console.log("FormData (trước khi gửi):");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    // Gửi formData bằng fetch
    fetch("/api/employer/job/add", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || "Lỗi mạng hoặc phản hồi không thành công");
          });
        }
        return response.json();
      })
      .then((result) => {
        if (result.success === "true") {
          alert("Đăng công việc thành công!");
          window.location.href = "/employer/dashboard";
        } else {
          alert("Đăng công việc thất bại: " + (result.message || "Lỗi không xác định"));
        }
      })
      .catch((error) => {
        console.error("Lỗi:", error);
        alert("Đăng công việc thất bại: " + error.message);
      });
  });
});