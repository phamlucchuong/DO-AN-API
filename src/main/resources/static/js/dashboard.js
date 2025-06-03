// Dashboard JavaScript for VietnamWorks
// Data structures for companies and jobs

// Mock data for Top Companies
const topCompaniesData = [
  {
    id: 1,
    name: "FPT Software",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23FF6600'/%3E%3Ctext x='20' y='45' font-family='Arial' font-size='12' fill='white'%3EFPT%3C/text%3E%3C/svg%3E",
    jobCount: 245,
    industry: "Công nghệ thông tin",
    rating: 4.2,
    location: "Hồ Chí Minh",
  },
  {
    id: 2,
    name: "Vietcombank",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23009639'/%3E%3Ctext x='15' y='45' font-family='Arial' font-size='10' fill='white'%3EVCB%3C/text%3E%3C/svg%3E",
    jobCount: 89,
    industry: "Ngân hàng",
    rating: 4.1,
    location: "Hà Nội",
  },
  {
    id: 3,
    name: "Samsung Vietnam",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%231428A0'/%3E%3Ctext x='10' y='45' font-family='Arial' font-size='8' fill='white'%3ESAMSUNG%3C/text%3E%3C/svg%3E",
    jobCount: 156,
    industry: "Điện tử",
    rating: 4.3,
    location: "Bắc Ninh",
  },
  {
    id: 4,
    name: "VinGroup",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23C41E3A'/%3E%3Ctext x='20' y='45' font-family='Arial' font-size='10' fill='white'%3EVIN%3C/text%3E%3C/svg%3E",
    jobCount: 178,
    industry: "Tập đoàn đa ngành",
    rating: 4.0,
    location: "Hà Nội",
  },
  {
    id: 5,
    name: "Shopee",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23EE4D2D'/%3E%3Ctext x='10' y='45' font-family='Arial' font-size='9' fill='white'%3ESHOPEE%3C/text%3E%3C/svg%3E",
    jobCount: 134,
    industry: "Thương mại điện tử",
    rating: 4.2,
    location: "Hồ Chí Minh",
  },
  {
    id: 6,
    name: "Techcombank",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%234A90E2'/%3E%3Ctext x='15' y='45' font-family='Arial' font-size='9' fill='white'%3ETCB%3C/text%3E%3C/svg%3E",
    jobCount: 92,
    industry: "Ngân hàng",
    rating: 4.1,
    location: "Hồ Chí Minh",
  },
];

// Mock data for Hot Jobs
const hotJobsData = [
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
  },
];

// Mock data for Suggested Jobs
const suggestedJobsData = [
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
  },
];

// Utility functions
function formatSalary(salary) {
  return salary + " VNĐ";
}

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

// Render Top Companies
function renderTopCompanies() {
  const companiesGrid = document.getElementById("companiesGrid");
  if (!companiesGrid) return;

  companiesGrid.innerHTML = topCompaniesData
    .map(
      (company) => `
    <div class="company-card" onclick="viewCompany(${company.id})">
      <div class="company-header">
        <img src="${company.logo}" alt="${company.name}" class="company-logo">
        <div class="company-info">
          <h3>${company.name}</h3>
          <p class="company-industry">${company.industry}</p>
          <div class="company-rating">
            <span class="rating-stars">${"★".repeat(
              Math.floor(company.rating)
            )}${"☆".repeat(5 - Math.floor(company.rating))}</span>
            <span class="rating-number">${company.rating}</span>
          </div>
        </div>
      </div>
      <div class="company-footer">
        <span class="job-count">${company.jobCount} việc làm</span>
        <span class="company-location">${company.location}</span>
      </div>
    </div>
  `
    )
    .join("");
}

// Render Hot Jobs
function renderHotJobs() {
  const hotJobsGrid = document.getElementById("hotJobsGrid");
  if (!hotJobsGrid) return;

  hotJobsGrid.innerHTML = hotJobsData
    .map(
      (job) => `
    <div class="job-card" onclick="viewJob(${job.id})">
      <div class="job-header">
        <img src="${job.companyLogo}" alt="${
        job.company
      }" class="company-logo-small">
        <div class="job-info">
          <h3>${job.title}</h3>
          <p class="company-name">${job.company}</p>
        </div>
        <div class="job-badges">
          ${job.isHot ? '<span class="badge hot">HOT</span>' : ""}
          ${job.isUrgent ? '<span class="badge urgent">URGENT</span>' : ""}
        </div>
      </div>
      <div class="job-details">
        <div class="job-salary">
          <i class="fas fa-money-bill-wave"></i>
          <span>${job.salary}</span>
        </div>
        <div class="job-location">
          <i class="fas fa-map-marker-alt"></i>
          <span>${job.location}</span>
        </div>
        <div class="job-experience">
          <i class="fas fa-briefcase"></i>
          <span>${job.experience}</span>
        </div>
      </div>
      <div class="job-skills">
        ${job.skills
          .slice(0, 3)
          .map((skill) => `<span class="skill-tag">${skill}</span>`)
          .join("")}
        ${
          job.skills.length > 3
            ? `<span class="skill-more">+${job.skills.length - 3}</span>`
            : ""
        }
      </div>
      <div class="job-footer">
        <span class="posted-date">${formatDate(job.postedDate)}</span>
        <button class="apply-quick-btn" onclick="quickApply(${
          job.id
        }); event.stopPropagation();">
          Ứng tuyển nhanh
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

// Render Suggested Jobs
function renderSuggestedJobs() {
  const suggestedJobsGrid = document.getElementById("suggestedJobsGrid");
  if (!suggestedJobsGrid) return;

  suggestedJobsGrid.innerHTML = suggestedJobsData
    .map(
      (job) => `
    <div class="job-card" onclick="viewJob(${job.id})">
      <div class="job-header">
        <img src="${job.companyLogo}" alt="${
        job.company
      }" class="company-logo-small">
        <div class="job-info">
          <h3>${job.title}</h3>
          <p class="company-name">${job.company}</p>
        </div>
        <div class="job-badges">
          ${job.isHot ? '<span class="badge hot">HOT</span>' : ""}
          ${job.isUrgent ? '<span class="badge urgent">URGENT</span>' : ""}
        </div>
      </div>
      <div class="job-details">
        <div class="job-salary">
          <i class="fas fa-money-bill-wave"></i>
          <span>${job.salary}</span>
        </div>
        <div class="job-location">
          <i class="fas fa-map-marker-alt"></i>
          <span>${job.location}</span>
        </div>
        <div class="job-experience">
          <i class="fas fa-briefcase"></i>
          <span>${job.experience}</span>
        </div>
      </div>
      <div class="job-skills">
        ${job.skills
          .slice(0, 3)
          .map((skill) => `<span class="skill-tag">${skill}</span>`)
          .join("")}
        ${
          job.skills.length > 3
            ? `<span class="skill-more">+${job.skills.length - 3}</span>`
            : ""
        }
      </div>
      <div class="job-footer">
        <span class="posted-date">${formatDate(job.postedDate)}</span>
        <button class="apply-quick-btn" onclick="quickApply(${
          job.id
        }); event.stopPropagation();">
          Ứng tuyển nhanh
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

// Event handlers for existing HTML functions
function closeNotification() {
  const notification = document.querySelector(".header-notification");
  if (notification) {
    notification.style.display = "none";
  }
}

function removeLocation() {
  const locationFilter = document.querySelector(".location-filter");
  if (locationFilter) {
    locationFilter.style.display = "none";
  }
}

function performSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput ? searchInput.value : "";
  console.log("Performing search for:", searchTerm);
  // Here you would implement actual search functionality
  alert(`Tìm kiếm: ${searchTerm}`);
}

function applyNow() {
  alert("Chuyển hướng đến trang ứng tuyển...");
}

function viewCategory(category) {
  console.log("Viewing category:", category);
  alert(`Xem danh mục: ${category}`);
}

function playPodcast() {
  alert("Phát podcast...");
}

function createCV() {
  alert("Chuyển hướng đến trang tạo CV...");
}

// New event handlers for dynamic content
function viewCompany(companyId) {
  const company = topCompaniesData.find((c) => c.id === companyId);
  if (company) {
    window.location.href = `/company-detail?id=${company.id}`;
  } else {
    console.error("Company not found:", companyId);
    alert("Không tìm thấy công ty!");
  }
}

function viewJob(jobId) {
  const allJobs = [...hotJobsData, ...suggestedJobsData];
  const job = allJobs.find((j) => j.id === jobId);
  if (job) {
    window.location.href = `/job-detail?id=${job.id}`;
  } else {
    console.error("Job not found:", jobId);
    alert("Không tìm thấy công việc!");
  }
}

function quickApply(jobId) {
  const allJobs = [...hotJobsData, ...suggestedJobsData];
  const job = allJobs.find((j) => j.id === jobId);
  if (job) {
    console.log("Quick applying to job:", job);
    alert(`Ứng tuyển nhanh cho vị trí: ${job.title} tại ${job.company}`);
  }
}

// API simulation functions (for future API integration)
async function fetchTopCompanies() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(topCompaniesData);
    }, 1000);
  });
}

async function fetchHotJobs() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(hotJobsData);
    }, 1000);
  });
}

async function fetchSuggestedJobs() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(suggestedJobsData);
    }, 1000);
  });
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard initialized");

  // Render all sections
  renderTopCompanies();
  renderHotJobs();
  renderSuggestedJobs();

  // Setup search functionality
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }
});

// Export data for potential external use
window.VietnamWorksData = {
  topCompanies: topCompaniesData,
  hotJobs: hotJobsData,
  suggestedJobs: suggestedJobsData,
  fetchTopCompanies,
  fetchHotJobs,
  fetchSuggestedJobs,
};
