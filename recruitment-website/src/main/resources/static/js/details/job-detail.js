document.addEventListener("DOMContentLoaded", () => {
  // Dữ liệu mẫu (tổng hợp từ hotJobsData và suggestedJobsData)
  const allJobsData = [
    {
      id: 1,
      title: "Senior Frontend Developer (React/Vue)",
      company: "FPT Software",
      companyLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23FF6600'/%3E%3Ctext x='15' y='35' font-family='Arial' font-size='8' fill='white'%3EFPT%3C/text%3E%3C/svg%3E",
      location: "Hồ Chí Minh",
      salary: "25 - 35 triệu",
      experience: "3-5 năm",
      jobType: "Toàn thời gian",
      skills: ["React", "Vue.js", "JavaScript", "HTML/CSS"],
      postedDate: "2024-01-15",
      isHot: true,
      isUrgent: false,
      description:
        "Phát triển giao diện người dùng bằng React và Vue.js, tối ưu hiệu suất ứng dụng, làm việc với đội ngũ thiết kế và backend.",
    },
    {
      id: 2,
      title: "Digital Marketing Manager",
      company: "Shopee",
      companyLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23EE4D2D'/%3E%3Ctext x='8' y='35' font-family='Arial' font-size='7' fill='white'%3ESHOPEE%3C/text%3E%3C/svg%3E",
      location: "Hồ Chí Minh",
      salary: "20 - 30 triệu",
      experience: "2-4 năm",
      jobType: "Toàn thời gian",
      skills: ["Digital Marketing", "SEO", "Google Ads", "Facebook Ads"],
      postedDate: "2024-01-14",
      isHot: true,
      isUrgent: true,
      description:
        "Quản lý chiến dịch marketing số, tối ưu hóa SEO và quảng cáo trên Google Ads/Facebook Ads.",
    },
    {
      id: 3,
      title: "Business Analyst",
      company: "Vietcombank",
      companyLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23009639'/%3E%3Ctext x='12' y='35' font-family='Arial' font-size='7' fill='white'%3EVCB%3C/text%3E%3C/svg%3E",
      location: "Hà Nội",
      salary: "18 - 25 triệu",
      experience: "1-3 năm",
      jobType: "Toàn thời gian",
      skills: ["Business Analysis", "SQL", "Excel", "Power BI"],
      postedDate: "2024-01-13",
      isHot: false,
      isUrgent: true,
      description:
        "Phân tích dữ liệu kinh doanh, hỗ trợ ra quyết định chiến lược bằng SQL và Power BI.",
    },
    {
      id: 4,
      title: "Quality Assurance Engineer",
      company: "Samsung Vietnam",
      companyLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%231428A0'/%3E%3Ctext x='5' y='35' font-family='Arial' font-size='6' fill='white'%3ESAMSUNG%3C/text%3E%3C/svg%3E",
      location: "Bắc Ninh",
      salary: "15 - 22 triệu",
      experience: "1-3 năm",
      jobType: "Toàn thời gian",
      skills: ["Testing", "Automation", "Selenium", "Java"],
      postedDate: "2024-01-12",
      isHot: true,
      isUrgent: false,
      description:
        "Thực hiện kiểm thử phần mềm, phát triển kịch bản tự động bằng Selenium và Java.",
    },
    {
      id: 5,
      title: "Product Manager",
      company: "VinGroup",
      companyLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23C41E3A'/%3E%3Ctext x='15' y='35' font-family='Arial' font-size='8' fill='white'%3EVIN%3C/text%3E%3C/svg%3E",
      location: "Hà Nội",
      salary: "30 - 45 triệu",
      experience: "3-5 năm",
      jobType: "Toàn thời gian",
      skills: ["Product Management", "Agile", "Market Research", "Analytics"],
      postedDate: "2024-01-11",
      isHot: true,
      isUrgent: true,
      description:
        "Quản lý vòng đời sản phẩm, nghiên cứu thị trường và áp dụng phương pháp Agile.",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "Techcombank",
      companyLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%234A90E2'/%3E%3Ctext x='12' y='35' font-family='Arial' font-size='7' fill='white'%3ETCB%3C/text%3E%3C/svg%3E",
      location: "Hồ Chí Minh",
      salary: "28 - 40 triệu",
      experience: "2-4 năm",
      jobType: "Toàn thời gian",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
      postedDate: "2024-01-10",
      isHot: false,
      isUrgent: false,
      description:
        "Quản lý hạ tầng DevOps, triển khai Docker và Kubernetes trên AWS.",
    },
    {
      id: 7,
      title: "UI/UX Designer",
      company: "Zalo",
      companyLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%230068FF'/%3E%3Ctext x='12' y='35' font-family='Arial' font-size='8' fill='white'%3EZALO%3C/text%3E%3C/svg%3E",
      location: "Hồ Chí Minh",
      salary: "18 - 28 triệu",
      experience: "2-4 năm",
      jobType: "Toàn thời gian",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
      postedDate: "2024-01-09",
      isHot: false,
      isUrgent: false,
      description:
        "Thiết kế giao diện người dùng và trải nghiệm bằng Figma và Adobe XD.",
    },
    {
      id: 8,
      title: "Data Scientist",
      company: "Grab",
      companyLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%2300B14F'/%3E%3Ctext x='10' y='35' font-family='Arial' font-size='8' fill='white'%3EGRAB%3C/text%3E%3C/svg%3E",
      location: "Hồ Chí Minh",
      salary: "25 - 40 triệu",
      experience: "2-5 năm",
      jobType: "Toàn thời gian",
      skills: ["Python", "Machine Learning", "SQL", "Tableau"],
      postedDate: "2024-01-08",
      isHot: true,
      isUrgent: false,
      description:
        "Phân tích dữ liệu lớn, xây dựng mô hình Machine Learning bằng Python.",
    },
    {
      id: 9,
      title: "Sales Executive",
      company: "Unilever",
      companyLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23005AAA'/%3E%3Ctext x='5' y='35' font-family='Arial' font-size='6' fill='white'%3EUNILEVER%3C/text%3E%3C/svg%3E",
      location: "Hà Nội",
      salary: "12 - 18 triệu",
      experience: "1-2 năm",
      jobType: "Toàn thời gian",
      skills: ["Sales", "Communication", "CRM", "Negotiation"],
      postedDate: "2024-01-07",
      isHot: false,
      isUrgent: true,
      description:
        "Phát triển khách hàng, đàm phán và quản lý quan hệ bằng CRM.",
    },
    {
      id: 10,
      title: "Backend Developer (Node.js)",
      company: "Tiki",
      companyLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23189EFF'/%3E%3Ctext x='12' y='35' font-family='Arial' font-size='8' fill='white'%3ETIKI%3C/text%3E%3C/svg%3E",
      location: "Hồ Chí Minh",
      salary: "22 - 32 triệu",
      experience: "2-4 năm",
      jobType: "Toàn thời gian",
      skills: ["Node.js", "MongoDB", "Express", "Docker"],
      postedDate: "2024-01-06",
      isHot: true,
      isUrgent: false,
      description:
        "Phát triển backend bằng Node.js, quản lý cơ sở dữ liệu MongoDB.",
    },
    {
      id: 11,
      title: "HR Business Partner",
      company: "Masan Group",
      companyLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23D4171F'/%3E%3Ctext x='5' y='35' font-family='Arial' font-size='7' fill='white'%3EMASAN%3C/text%3E%3C/svg%3E",
      location: "Hồ Chí Minh",
      salary: "20 - 28 triệu",
      experience: "3-5 năm",
      jobType: "Toàn thời gian",
      skills: [
        "HR Management",
        "Recruitment",
        "Performance Management",
        "Employee Relations",
      ],
      postedDate: "2024-01-05",
      isHot: false,
      isUrgent: false,
      description:
        "Hỗ trợ quản lý nhân sự, tuyển dụng và phát triển nhân viên.",
    },
    {
      id: 12,
      title: "Mobile Developer (Flutter)",
      company: "VNG Corporation",
      companyLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23FF6B00'/%3E%3Ctext x='12' y='35' font-family='Arial' font-size='8' fill='white'%3EVNG%3C/text%3E%3C/svg%3E",
      location: "Hồ Chí Minh",
      salary: "20 - 30 triệu",
      experience: "1-3 năm",
      jobType: "Toàn thời gian",
      skills: ["Flutter", "Dart", "Firebase", "Mobile Development"],
      postedDate: "2024-01-04",
      isHot: false,
      isUrgent: true,
      description: "Phát triển ứng dụng di động bằng Flutter và Firebase.",
    },
  ];

  // Lấy ID công việc từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = parseInt(urlParams.get("id"));

  // Tìm công việc theo ID
  const job = allJobsData.find((j) => j.id === jobId);

  if (job) {
    // Điền thông tin công việc
    document.getElementById("companyLogo").src = job.companyLogo;
    document.getElementById("jobTitle").textContent = job.title;
    document.getElementById("companyName").textContent = job.company;
    document.getElementById("jobSalary").textContent = `${job.salary} VNĐ`;
    document.getElementById(
      "jobLocation"
    ).innerHTML = `<i class="fas fa-map-marker-alt"></i> ${job.location}`;
    document.getElementById(
      "jobExperience"
    ).innerHTML = `<i class="fas fa-briefcase"></i> ${job.experience}`;
    document.getElementById("jobDescription").textContent = job.description;
    document.getElementById(
      "postedDate"
    ).textContent = `Đăng ngày: ${formatDate(job.postedDate)}`;

    // Hiển thị badge nếu có
    if (job.isHot)
      document.getElementById("jobHotBadge").style.display = "inline-block";
    if (job.isUrgent)
      document.getElementById("jobUrgentBadge").style.display = "inline-block";

    // Hiển thị kỹ năng
    const skillsList = document.getElementById("jobSkills");
    job.skills.forEach((skill) => {
      const skillTag = document.createElement("span");
      skillTag.className = "skill-tag";
      skillTag.textContent = skill;
      skillsList.appendChild(skillTag);
    });

    // Xử lý nút ứng tuyển
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

    submitCV.addEventListener("click", () => {
      const file = cvUpload.files[0];
      if (file && file.type === "application/pdf") {
        alert(`Đã gửi CV cho vị trí ${job.title} tại ${job.company}.`);
        applyModal.style.display = "none";
        cvUpload.value = ""; // Reset input file
      } else {
        alert("Vui lòng tải lên file PDF hợp lệ!");
      }
    });
  } else {
    document.getElementById("jobDetail").innerHTML =
      '<div class="container"><h2>Không tìm thấy công việc</h2></div>';
  }

  // Hàm định dạng ngày
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
});