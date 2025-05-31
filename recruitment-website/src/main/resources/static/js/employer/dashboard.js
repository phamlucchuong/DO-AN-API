document.addEventListener("DOMContentLoaded", function() {
    const employerId = localStorage.getItem("employerId") || sessionStorage.getItem("employerId");
    if (employerId) {
        fetch(`/employer/job/get?employerId=${employerId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Lỗi khi load job data");
                }
                return response.json();
            })
            .then(data => {
                const jobsContainer = document.getElementById("recent-jobs");
                jobsContainer.innerHTML = ""; // clear cũ

                if (data.length === 0) {
                    jobsContainer.innerHTML = "<p>Chưa có tin tuyển dụng nào.</p>";
                } else {
                    data.forEach(job => {
                        const urgentTag = job.urgent ? '<span style="background: #f59e0b; color: white;">⚡ Khá gấp</span>' : '';
                        const jobCard = `
                            <div class="job-card">
                                <h3>${job.title}</h3>
                                <div class="job-meta">
                                    <span>🏢 ${job.companyName}</span>
                                    <span>📍 ${job.companyAddress}</span>
                                    <span>💼 ${job.jobType}</span>
                                    <span>💰 ${job.salaryRange}</span>
                                    ${urgentTag}
                                </div>
                                <div class="candidate-count">${job.candidateCount} candidates applied</div>
                                <div class="job-actions">
                                    <a href="/job-details/${job.id}" class="btn btn-secondary">👥 View Candidates</a>
                                    <a href="/edit-job/${job.id}" class="btn">✏️ Edit</a>
                                </div>
                            </div>
                        `;
                        jobsContainer.innerHTML += jobCard;
                    });
                }
            })
            .catch(error => {
                console.error(error);
                document.getElementById("recent-jobs").innerHTML = "<p>Lỗi khi tải dữ liệu job.</p>";
            });
    } else {
        console.warn("Chưa đăng nhập hoặc thiếu employerId trong localStorage");
        document.getElementById("recent-jobs").innerHTML = "<p>Vui lòng đăng nhập để xem job.</p>";
    }
});
