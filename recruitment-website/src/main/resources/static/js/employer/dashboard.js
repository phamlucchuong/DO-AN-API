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

document.addEventListener("DOMContentLoaded", function() {
  const token = localStorage.getItem("idToken");
  console.log("Token lấy từ localStorage:", token);

  if (!token) {
    alert("Vui lòng đăng nhập.");
    window.location.href = "/employer/login";
    return;
  }

  const payload = parseJwt(token);
  if (!payload || !payload.user_id) {
    alert("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
    return;
  }

  const jobsContainer = document.getElementById("recent-jobs");
  const totalJobElement = document.getElementById("totalJobs");
  const activeJobsElement = document.getElementById("activeJobs");
  const totalCandidatesElement = document.getElementById("totalCandidates");
  const paginationContainer = document.getElementById("pagination");

  // Check if required DOM elements exist
  if (!jobsContainer || !totalJobElement || !activeJobsElement || !totalCandidatesElement || !paginationContainer) {
    console.error("Một hoặc nhiều phần tử DOM không tồn tại:", {
      jobsContainer: !!jobsContainer,
      totalJobElement: !!totalJobElement,
      activeJobsElement: !!activeJobsElement,
      totalCandidatesElement: !!totalCandidatesElement,
      paginationContainer: !!paginationContainer
    });
    alert("Lỗi giao diện: Một số phần tử không được tìm thấy. Vui lòng liên hệ hỗ trợ.");
    return;
  }

  let currentPage = 1;
  const limit = 10; // số job trên 1 trang

  function loadJobs(page) {
    fetch(`/api/employer/job/get?employerId=${payload.user_id}&page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || "Lỗi khi tải dữ liệu tin tuyển dụng");
          });
        }
        return response.json();
      })
      .then(data => {
        jobsContainer.innerHTML = ""; // Xóa nội dung cũ

        // Validate response data
        if (!data || typeof data !== 'object') {
          throw new Error("Dữ liệu API không hợp lệ");
        }

        // Cập nhật số liệu tổng
        totalJobElement.textContent = data.totalCount || 0;

        // Lọc những job đang mở
        const activeJobs = data.jobs ? data.jobs.filter(job => job.status === "OPEN").length : 0;
        activeJobsElement.textContent = activeJobs;

        // Tổng số ứng viên
        const totalCandidates = data.jobs ? data.jobs.reduce((sum, job) => sum + (job.applicationCount || 0), 0) : 0;
        totalCandidatesElement.textContent = totalCandidates;

        if (!data.jobs || data.jobs.length === 0) {
          jobsContainer.innerHTML = "<p>Chưa có tin tuyển dụng nào.</p>";
          paginationContainer.innerHTML = "";
          return;
        }

        data.jobs.forEach(job => {
          const urgentTag = job.status === "URGENT" ? '<span style="background: #f59e0b; color: white;">⚡ Khá gấp</span>' : '';
          const jobCard = `
            <div class="job-card" id="job-${job.id}">
              <h3>${job.title || "Không có tiêu đề"}</h3>
              <div class="job-meta">
                <span>🏢 ${job.employer?.companyName || "Không xác định"}</span>
                <span>📍 ${job.address || "Không xác định"}</span>
                <span>💼 ${job.employmentType || "Không xác định"}</span>
                <span>💰 ${job.salary || "Thỏa thuận"}</span>
                ${urgentTag}
              </div>
              <div class="candidate-count">${job.applicationCount || 0} candidates applied</div>
              <div class="job-actions">
                <button class="btn btn-secondary" onclick="toggleJobDetail('${job.id}')">👥 View Details</button>
                <a href="/edit-job/${job.id}" class="btn">✏️ Edit</a>
              </div>
              <div class="job-detail" id="job-detail-${job.id}" style="display: none; margin-top: 10px; padding: 10px; background: #f9f9f9; border: 1px solid #ccc;">
                <p>Đang tải chi tiết...</p>
              </div>
            </div>
          `;
          jobsContainer.innerHTML += jobCard;
        });

        // Tạo controls phân trang
        const totalPages = data.totalPages || 1;
        currentPage = page;
        renderPaginationControls(currentPage, totalPages);
      })
      .catch(error => {
        console.error("Lỗi khi tải dữ liệu:", error);
        jobsContainer.innerHTML = `<p>Lỗi khi tải dữ liệu: ${error.message}</p>`;
        paginationContainer.innerHTML = "";
      });
  }

  function renderPaginationControls(current, total) {
    if (!paginationContainer) {
      console.error("paginationContainer không tồn tại");
      return;
    }

    if (total <= 1) {
      paginationContainer.innerHTML = ""; // không cần phân trang nếu chỉ 1 trang
      return;
    }

    let controlsHTML = "";

    if (current > 1) {
      controlsHTML += `<button id="prevPage" class="btn">Previous</button>`;
    } else {
      controlsHTML += `<button class="btn" disabled>Previous</button>`;
    }

    controlsHTML += ` <span>Page ${current} of ${total}</span> `;

    if (current < total) {
      controlsHTML += `<button id="nextPage" class="btn">Next</button>`;
    } else {
      controlsHTML += `<button class="btn" disabled>Next</button>`;
    }

    paginationContainer.innerHTML = controlsHTML;

    // Gán sự kiện cho các nút
    if (current > 1) {
      const prevButton = document.getElementById("prevPage");
      if (prevButton) {
        prevButton.addEventListener("click", () => loadJobs(current - 1));
      }
    }
    if (current < total) {
      const nextButton = document.getElementById("nextPage");
      if (nextButton) {
        nextButton.addEventListener("click", () => loadJobs(current + 1));
      }
    }
  }

  // Tải trang đầu tiên khi vào
  loadJobs(currentPage);
});

function toggleJobDetail(jobId) {
  const detailDiv = document.getElementById(`job-detail-${jobId}`);
  const token = localStorage.getItem("idToken");

  if (!detailDiv) {
    console.error(`job-detail-${jobId} không tồn tại`);
    return;
  }

  if (detailDiv.style.display === "none") {
    // Hiện detail
    fetch(`/api/employer/job/detail/${jobId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Không tìm thấy công việc");
      }
      return response.json();
    })
    .then(job => {
      detailDiv.innerHTML = `
        <h2>${job.title}</h2>
        <p><strong>Công ty:</strong> ${job.employer?.companyName || "Không xác định"}</p>
        <p><strong>Địa chỉ:</strong> ${job.address || "Không xác định"}</p>
        <p><strong>Thành phố:</strong> ${job.city || "Không xác định"}</p>
        <p><strong>Loại hình công việc:</strong> ${job.employmentType || "Không xác định"}</p>
        <p><strong>Cấp độ:</strong> ${job.jobLevel || "Không xác định"}</p>
        <p><strong>Mức lương:</strong> ${job.salary || "Thỏa thuận"}</p>
        <p><strong>Kinh nghiệm:</strong> ${job.experience || "Không yêu cầu"}</p>
        <p><strong>Yêu cầu:</strong> ${formatMultilineText(job.requirements)}</p>
        <p><strong>Mô tả:</strong> ${formatMultilineText(job.description)}</p>
        <p><strong>Phúc lợi:</strong> ${
          Array.isArray(job.benefits)
            ? formatArrayText(job.benefits)
            : formatMultilineText(job.benefits)
          }
        </p>
        <p><strong>Thời gian làm việc:</strong> ${getWorkingHoursDisplayName(job.workingHours)}</p>
        <p><strong>Số lượng tuyển:</strong> ${job.numberOfVacancies || 1}</p>
        <p><strong>Số lượt ứng tuyển:</strong> ${job.applicationCount || 0}</p>
        <p><strong>Ngày hết hạn:</strong> ${job.deadline || "Không xác định"}</p>
        <p><strong>Ngày tạo:</strong> ${job.createdAt ? new Date(job.createdAt).toLocaleString() : "Không rõ"}</p>
        <p><strong>Ngày cập nhật:</strong> ${job.updatedAt ? new Date(job.updatedAt).toLocaleString() : "Không rõ"}</p>
        <p><strong>Trạng thái:</strong> ${job.status}</p>
        <p><strong>Đã duyệt:</strong> ${job.isApproved ? "Đã duyệt" : "Chưa duyệt"}</p>
        <button onclick="closeJobDetail('${jobId}')" style="margin-top: 10px;">Đóng</button>
      `;
      detailDiv.style.display = "block";

      // Cuộn mượt xuống phần chi tiết
      detailDiv.scrollIntoView({ behavior: "smooth", block: "start" });
    })
    .catch(error => {
      detailDiv.innerHTML = `<p style="color:red;">Lỗi khi tải chi tiết: ${error.message}</p>`;
      detailDiv.style.display = "block";
    });
  } else {
    detailDiv.style.display = "none";
  }
}

function closeJobDetail(jobId) {
  const detailDiv = document.getElementById(`job-detail-${jobId}`);
  if (detailDiv) {
    detailDiv.style.display = "none";

    // Cuộn mượt về lại thẻ job-card
    const jobCard = document.getElementById(`job-${jobId}`);
    if (jobCard) {
      jobCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function getWorkingHoursDisplayName(value) {
  const map = {
    "EIGHTTOSEVENTEEN": "Từ 8AM đến 17PM",
    "NINETOEIGHTEEN": "Từ 9AM đến 18PM"
  };
  return map[value] || "Không xác định";
}

function formatMultilineText(text) {
  if (!text) return "Không có";
  return "<ul>" + text.split("\n").map(item => `<li>${item.trim()}</li>`).join("") + "</ul>";
}

function formatArrayText(arr) {
  if (!arr || arr.length === 0) return "Không có";
  return "<ul>" + arr.map(item => `<li>${item}</li>`).join("") + "</ul>";
}