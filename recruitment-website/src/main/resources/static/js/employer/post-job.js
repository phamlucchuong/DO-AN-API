const form = document.getElementById("job-form");
const submitBtn = document.querySelector("button[type='submit']");

const token = localStorage.getItem("idToken");
console.log("Token lấy từ localStorage:", token);

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

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!token) {
    alert("Vui lòng đăng nhập để đăng bài tuyển dụng.");
    window.location.href = "/employer/login";
    return;
  }

  const payload = parseJwt(token);
  if (!payload || !payload.user_id) {
    alert("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
    return;
  }

  const formData = new FormData(form);

  // Thêm employerId vào formData
  formData.append("employerId", payload.user_id);

  formData.append("status", "OPEN");

  // Validate các field bắt buộc
  if (!formData.get("title") || formData.get("title").trim() === "") {
    alert("Vui lòng nhập tiêu đề công việc.");
    return;
  }
  if (!formData.get("employmentType") || formData.get("employmentType").trim() === "") {
    alert("Vui lòng chọn loại hình công việc.");
    return;
  }
  if (!formData.get("description") || formData.get("description").trim() === "") {
    alert("Vui lòng nhập mô tả công việc.");
    return;
  }
  if (!formData.get("requirements") || formData.get("requirements").trim() === "") {
    alert("Vui lòng nhập yêu cầu công việc.");
    return;
  }

  console.log("FormData (trước khi gửi):");
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  // Gửi formData bằng fetch mà không set Content-Type
  fetch("/api/employer/job/add", {
    method: "POST",
    body: formData
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Lỗi mạng hoặc phản hồi không thành công");
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
