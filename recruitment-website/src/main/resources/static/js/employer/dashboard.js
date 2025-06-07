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

    fetch(`/api/employer/job/get?employerId=${payload.user_id}`, {
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

            const totalJobElement = document.getElementById("totalJobs");
            totalJobElement.textContent = `${data.length}`;

            const totalActiveJobs = data.filter(job => job.status === "OPEN").length;
            document.getElementById("activeJobs").textContent = totalActiveJobs;

            const totalCandidates = data.reduce((sum, job) => sum + (job.applicationCount || 0), 0);
            document.getElementById("totalCandidates").textContent = totalCandidates;

            if (!data || data.length === 0) {
                jobsContainer.innerHTML = "<p>Chưa có tin tuyển dụng nào.</p>";
                return;
            }

            data.forEach(job => {
                const urgentTag = job.status === "URGENT" ? '<span style="background: #f59e0b; color: white;">⚡ Khá gấp</span>' : '';
                const jobCard = `
                    <div class="job-card">
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
                            <a href="/job-details/${job.id}" class="btn btn-secondary">👥 View Candidates</a>
                            <a href="/edit-job/${job.id}" class="btn">✏️ Edit</a>
                        </div>
                    </div>
                `;
                jobsContainer.innerHTML += jobCard;
            });
        })
        .catch(error => {
            console.error("Lỗi khi tải dữ liệu:", error);
            jobsContainer.innerHTML = `<p>Lỗi khi tải dữ liệu: ${error.message}</p>`;
        });
});