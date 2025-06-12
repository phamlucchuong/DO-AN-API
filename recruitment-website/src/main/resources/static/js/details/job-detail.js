async function postCv(jobId, cvData) {
  try {
    const response = await fetch(`/api/application/${jobId}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cvData),
    });

    if (!response.ok) {
      throw new Error("Lỗi khi upload CV");
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi thêm CV:", error);
    throw error;
  }
}

async function getJobDetail(id) {
  try {
    const response = await fetch(`/api/employer/job/detail/${id}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Lỗi khi lấy job detail");
    }

    const jobDetail = await response.json();
    return jobDetail;
  } catch (error) {
    console.error("Lỗi khi lấy job detail:", error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Sample data updated with all DTO fields
  const allJobsData = [
    {
      id: 1,
      title: "Senior Frontend Developer (React/Vue)",
      employer: {
        companyName: "FPT Software",
        companyLogo:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23FF6600'/%3E%3Ctext x='15' y='35' font-family='Arial' font-size='8' fill='white'%3EFPT%3C/text%3E%3C/svg%3E",
        uid: "fpt123",
        address: "Lô E2a-7, Đường D1, Khu Công nghệ cao, TP.HCM",
        city: "Hồ Chí Minh",
      },
      salary: "25 - 35 triệu",
      experience: "3-5 năm",
      description:
        "Phát triển giao diện người dùng bằng React và Vue.js, tối ưu hiệu suất ứng dụng, làm việc với đội ngũ thiết kế và backend.",
      requirements:
        "Thành thạo React, Vue.js, JavaScript, HTML/CSS. Có kinh nghiệm làm việc với API và tối ưu hiệu suất.",
      benefits: "Bảo hiểm sức khỏe, thưởng cuối năm, hỗ trợ đào tạo.",
      deadline: "2025-02-15",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-20T15:30:00Z",
      status: "Open",
      numberOfVacancies: 2,
      jobLevel: "Senior",
      employmentType: "Toàn thời gian",
      city: "Hồ Chí Minh",
      address: "Lô E2a-7, Đường D1, Khu Công nghệ cao, TP.HCM",
      workingHours: "8h-17h, Thứ 2 - Thứ 6",
      isApproved: true,
      applicationCount: 15,
      skills: ["React", "Vue.js", "JavaScript", "HTML/CSS"],
      isHot: true,
      isUrgent: false,
    },
    // Add more sample jobs as needed, following the same structure
  ];

  // Get job ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = parseInt(urlParams.get("id"));

  // Fetch job details (use API or sample data for now)
  const job =
    allJobsData.find((j) => j.id === jobId) || (await getJobDetail(jobId));

  if (job) {
    // Populate job details
    document.getElementById("companyLogo").src = job.employer.companyLogo;
    document.getElementById("jobTitle").textContent = job.title;
    document.getElementById("companyName").textContent =
      job.employer.companyName;
    document.getElementById(
      "jobSalary"
    ).innerHTML = `<i class="fas fa-money-bill-wave"></i> ${job.salary}`;
    document.getElementById(
      "jobLocation"
    ).innerHTML = `<i class="fas fa-map-marker-alt"></i> ${job.city}, ${job.address}`;
    document.getElementById(
      "jobExperience"
    ).innerHTML = `<i class="fas fa-briefcase"></i> ${job.experience}`;
    document.getElementById(
      "jobLevel"
    ).innerHTML = `<i class="fas fa-level-up-alt"></i> ${job.jobLevel}`;
    document.getElementById(
      "employmentType"
    ).innerHTML = `<i class="fas fa-clock"></i> ${job.employmentType}`;
    document.getElementById("jobDescription").textContent = job.description;
    document.getElementById("jobRequirements").textContent = job.requirements;
    document.getElementById("jobBenefits").textContent = job.benefits;
    document.getElementById(
      "employerName"
    ).textContent = `Tên công ty: ${job.employer.companyName}`;
    document.getElementById(
      "employerAddress"
    ).textContent = `Địa chỉ: ${job.employer.address}`;
    document.getElementById(
      "employerCity"
    ).textContent = `Thành phố: ${job.employer.city}`;
    document.getElementById("numberOfVacancies").textContent =
      job.numberOfVacancies;
    document.getElementById("workingHours").textContent = job.workingHours;
    document.getElementById("deadline").textContent = formatDate(job.deadline);
    document.getElementById("isApproved").textContent = job.isApproved
      ? "Đã phê duyệt"
      : "Chưa phê duyệt";
    document.getElementById("applicationCount").textContent =
      job.applicationCount;
    document.getElementById("createdAt").textContent = formatDateTime(
      job.createdAt
    );
    document.getElementById("updatedAt").textContent = formatDateTime(
      job.updatedAt
    );
    document.getElementById("jobStatus").textContent = job.status;
    document.getElementById(
      "postedDate"
    ).textContent = `Đăng ngày: ${formatDate(job.createdAt)}`;

    // Display badges
    if (job.isHot)
      document.getElementById("jobHotBadge").style.display = "inline-block";
    if (job.isUrgent)
      document.getElementById("jobUrgentBadge").style.display = "inline-block";
    document.getElementById("jobStatus").style.display = "inline-block";

    // Populate skills
    const skillsList = document.getElementById("jobSkills");
    job.skills.forEach((skill) => {
      const skillTag = document.createElement("span");
      skillTag.className = "skill-tag";
      skillTag.textContent = skill;
      skillsList.appendChild(skillTag);
    });

    // Handle apply button and modal
    const applyButton = document.getElementById("applyButton");
    const applyModal = document.getElementById("applyModal");
    const closeModal = document.querySelector(".close-modal");
    const submitCV = document.getElementById("submitCV");
    const cvUpload = document.getElementById("cvUpload");

    applyButton.addEventListener("click", () => {
      applyModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
      applyModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === applyModal) {
        applyModal.style.display = "none";
      }
    });

    submitCV.addEventListener("click", async () => {
      const file = cvUpload.files[0];
      if (file && file.type === "application/pdf") {
        const cvData = {
          cvLink: file,
          employer_id: job.employer.uid,
          employee_id: localStorage.getItem("uid"),
        };
        try {
          await postCv(jobId, cvData);
          alert(
            `Đã gửi CV cho vị trí ${job.title} tại ${job.employer.companyName}.`
          );
          applyModal.style.display = "none";
          cvUpload.value = ""; // Reset input file
        } catch (error) {
          alert("Lỗi khi gửi CV. Vui lòng thử lại!");
        }
      } else {
        alert("Vui lòng tải lên file PDF hợp lệ!");
      }
    });
  } else {
    document.getElementById("jobDetail").innerHTML =
      '<div class="container"><h2>Không tìm thấy công việc</h2></div>';
  }

  // Format date for display
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Hôm qua";
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    return `${Math.floor(diffDays / 30)} tháng trước`;
  }

  // Format date and time for createdAt/updatedAt
  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
});
