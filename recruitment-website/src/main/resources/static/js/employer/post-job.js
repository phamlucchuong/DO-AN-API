const form = document.getElementById("job-form");
const submitBtn = document.getElementById("submit-job-btn");

submitBtn.addEventListener("click", function () {
  const formData = new FormData(form);
  const data = {};

  // Lấy employerId từ localStorage hoặc sessionStorage
  const employerId = localStorage.getItem("employerId") || sessionStorage.getItem("employerId");
  data.employerId = employerId ? parseInt(employerId, 10) : null;

  // Thu thập dữ liệu từ form
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Xử lý remoteOk (checkbox)
  if (data.hasOwnProperty('_remoteOk')) {
    delete data._remoteOk;
  }
  data.remoteOk = form.remoteOk.checked;

  // Đặt status mặc định là "Open"
  if (!data.status || data.status.trim() === "") {
    data.status = "Open";
  }

  // Chuyển numberOfVacancies thành số nguyên
  if (data.numberOfVacancies) {
    data.numberOfVacancies = parseInt(data.numberOfVacancies, 10);
    if (isNaN(data.numberOfVacancies)) {
      data.numberOfVacancies = 0;
    }
  }

  // Kiểm tra dữ liệu trước khi gửi
  if (!data.employerId) {
    alert("Không tìm thấy ID nhà tuyển dụng. Vui lòng đăng nhập lại.");
    return;
  }
  if (!data.title || data.title.trim() === "") {
    alert("Vui lòng nhập tiêu đề công việc.");
    return;
  }
  if (!data.employmentType || data.employmentType.trim() === "") {
    alert("Vui lòng chọn loại hình công việc.");
    return;
  }
  if (!data.description || data.description.trim() === "") {
    alert("Vui lòng nhập mô tả công việc.");
    return;
  }
  if (!data.requirements || data.requirements.trim() === "") {
    alert("Vui lòng nhập yêu cầu công việc.");
    return;
  }

  console.log("Job Data:", data);

  fetch("/employer/job/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Lỗi mạng hoặc phản hồi không thành công");
      }
      return response.json();
    })
    .then((result) => {
      if (result.success) {
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