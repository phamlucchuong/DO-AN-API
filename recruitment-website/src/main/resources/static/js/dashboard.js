// Global variables
let jobsData = [];
// Removed duplicate declaration of companiesData
let isLoading = false;
let currentSearchQuery = "";
let currentLocation = "Hồ Chí Minh";

// Sample job data
const sampleJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechViet Solutions",
    location: "Hồ Chí Minh",
    salary: "25 - 35 triệu",
    tags: ["JavaScript", "React", "Node.js"],
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%234285f4'/%3E%3Ctext x='15' y='30' font-family='Arial' font-size='12' fill='white'%3ETV%3C/text%3E%3C/svg%3E",
    featured: true,
    description:
      "Chúng tôi đang tìm kiếm một Senior Software Engineer có kinh nghiệm để tham gia đội ngũ phát triển sản phẩm.",
    requirements: [
      "3+ năm kinh nghiệm React/Node.js",
      "Thành thạo JavaScript ES6+",
      "Kinh nghiệm với MongoDB/PostgreSQL",
    ],
    benefits: [
      "Lương thưởng hấp dẫn",
      "Bảo hiểm sức khỏe",
      "Du lịch công ty hàng năm",
    ],
  },
  {
    id: 2,
    title: "Product Manager",
    company: "VinTech Group",
    location: "Hà Nội",
    salary: "30 - 45 triệu",
    tags: ["Strategy", "Analytics", "Agile"],
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23ea4335'/%3E%3Ctext x='15' y='30' font-family='Arial' font-size='12' fill='white'%3EVT%3C/text%3E%3C/svg%3E",
    featured: true,
    description:
      "Vị trí Product Manager cho sản phẩm fintech hàng đầu tại Việt Nam.",
    requirements: [
      "5+ năm kinh nghiệm Product Management",
      "Hiểu biết về Agile/Scrum",
      "Kỹ năng phân tích dữ liệu",
    ],
    benefits: [
      "Mức lương cạnh tranh",
      "Cơ hội thăng tiến",
      "Môi trường startup năng động",
    ],
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Digital",
    location: "Đà Nẵng",
    salary: "15 - 25 triệu",
    tags: ["Figma", "Adobe XD", "Prototyping"],
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23ff6900'/%3E%3Ctext x='12' y='30' font-family='Arial' font-size='12' fill='white'%3ECD%3C/text%3E%3C/svg%3E",
    featured: false,
    description: "Thiết kế giao diện cho các ứng dụng mobile và web hiện đại.",
    requirements: [
      "2+ năm kinh nghiệm UX/UI",
      "Thành thạo Figma, Adobe XD",
      "Portfolio mạnh về mobile app",
    ],
    benefits: [
      "Làm việc remote hybrid",
      "Đào tạo skill mới",
      "Team building định kỳ",
    ],
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Analytics Pro",
    location: "Hồ Chí Minh",
    salary: "18 - 28 triệu",
    tags: ["Python", "SQL", "Power BI"],
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%2334a853'/%3E%3Ctext x='12' y='30' font-family='Arial' font-size='12' fill='white'%3EAP%3C/text%3E%3C/svg%3E",
    featured: false,
    description: "Phân tích dữ liệu để hỗ trợ ra quyết định kinh doanh.",
    requirements: [
      "Thành thạo Python, SQL",
      "Kinh nghiệm Power BI/Tableau",
      "Tư duy logic tốt",
    ],
    benefits: [
      "Học hỏi công nghệ mới",
      "Bonus theo dự án",
      "Flexible working time",
    ],
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "Brand Solutions",
    location: "Hồ Chí Minh",
    salary: "12 - 20 triệu",
    tags: ["Digital Marketing", "SEO", "Content"],
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23fbbc04'/%3E%3Ctext x='12' y='30' font-family='Arial' font-size='12' fill='white'%3EBS%3C/text%3E%3C/svg%3E",
    featured: false,
    description: "Thực hiện các chiến dịch marketing online và offline.",
    requirements: [
      "2+ năm kinh nghiệm Digital Marketing",
      "Hiểu biết SEO/SEM",
      "Kỹ năng viết content tốt",
    ],
    benefits: [
      "Thưởng KPI hàng tháng",
      "Training marketing tools",
      "Cơ hội du lịch nước ngoài",
    ],
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "Cloud Systems",
    location: "Hà Nội",
    salary: "22 - 35 triệu",
    tags: ["AWS", "Docker", "Kubernetes"],
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%239c27b0'/%3E%3Ctext x='12' y='30' font-family='Arial' font-size='12' fill='white'%3ECS%3C/text%3E%3C/svg%3E",
    featured: true,
    description: "Quản lý hạ tầng cloud và tự động hóa quy trình deployment.",
    requirements: [
      "3+ năm kinh nghiệm DevOps",
      "Thành thạo AWS/Azure",
      "Kinh nghiệm CI/CD",
    ],
    benefits: [
      "Lương cao",
      "Được đào tạo công nghệ mới",
      "Làm việc với team quốc tế",
    ],
  },
  {
    id: 7,
    title: "Business Analyst",
    company: "FinTech Solutions",
    location: "Hồ Chí Minh",
    salary: "20 - 30 triệu",
    tags: ["Business Analysis", "Requirements", "Agile"],
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23FF5722'/%3E%3Ctext x='15' y='30' font-family='Arial' font-size='12' fill='white'%3EFS%3C/text%3E%3C/svg%3E",
    featured: false,
    description: "Phân tích nghiệp vụ và yêu cầu cho các sản phẩm fintech.",
    requirements: [
      "3+ năm kinh nghiệm BA",
      "Hiểu biết về fintech",
      "Kỹ năng communication tốt",
    ],
    benefits: ["Môi trường fintech", "Stock option", "Flexible time"],
  },
  {
    id: 8,
    title: "Mobile Developer",
    company: "App Innovation",
    location: "Đà Nẵng",
    salary: "18 - 32 triệu",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23607D8B'/%3E%3Ctext x='15' y='30' font-family='Arial' font-size='12' fill='white'%3EAI%3C/text%3E%3C/svg%3E",
    featured: false,
    description: "Phát triển ứng dụng mobile đa nền tảng.",
    requirements: [
      "2+ năm kinh nghiệm mobile dev",
      "Thành thạo React Native hoặc Flutter",
      "Hiểu biết về mobile UX",
    ],
    benefits: ["Work from home", "Macbook provided", "Training budget"],
  },
];

// Company data
const companiesData = [
  {
    name: "TechViet Solutions",
    industry: "Technology",
    size: "100-500",
    location: "Hồ Chí Minh",
  },
  {
    name: "VinTech Group",
    industry: "Fintech",
    size: "500-1000",
    location: "Hà Nội",
  },
  {
    name: "Creative Digital",
    industry: "Design",
    size: "50-100",
    location: "Đà Nẵng",
  },
  {
    name: "Analytics Pro",
    industry: "Data Analytics",
    size: "20-50",
    location: "Hồ Chí Minh",
  },
  {
    name: "Brand Solutions",
    industry: "Marketing",
    size: "100-200",
    location: "Hồ Chí Minh",
  },
  {
    name: "Cloud Systems",
    industry: "Cloud Computing",
    size: "200-500",
    location: "Hà Nội",
  },
];

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  jobsData = [...sampleJobs];
  initializeApp();
});

function initializeApp() {
  loadHotJobs();
  loadSuggestedJobs();
  setupSearchFunctionality();
  setupScrollAnimations();
  console.log("VietnamWorks Dashboard initialized successfully!");
}

// Utility functions
function showLoading(element) {
  if (!element) return;
  element.innerHTML =
    '<div class="loading"><div class="spinner"></div><p>Đang tải...</p></div>';
}

function hideLoading() {
  const loadingElements = document.querySelectorAll(".loading");
  loadingElements.forEach((el) => el.remove());
}

function formatSalary(salary) {
  return salary || "Thỏa thuận";
}

function formatLocation(location) {
  return location || "Toàn quốc";
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success"
            ? "check-circle"
            : type === "error"
            ? "exclamation-circle"
            : "info-circle"
        }"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Job card creation
function createJobCard(job) {
  const featuredBadge = job.featured
    ? '<span class="featured-badge">Nổi bật</span>'
    : "";

  return `
        <div class="job-card ${
          job.featured ? "featured" : ""
        }" onclick="viewJob(${job.id})" data-job-id="${job.id}">
            ${featuredBadge}
            <div class="job-header">
                <img src="${job.logo}" alt="${
    job.company
  }" class="job-logo" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 50 50\\'%3E%3Crect width=\\'50\\' height=\\'50\\' fill=\\'%23ccc\\'/%3E%3C/svg%3E'">
                <div class="job-info">
                    <h3>${job.title}</h3>
                    <p class="job-company">${job.company}</p>
                </div>
                <button class="save-job-btn" onclick="event.stopPropagation(); toggleSaveJob(${
                  job.id
                })" title="Lưu việc làm">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="job-details">
                <div class="job-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${formatLocation(job.location)}</span>
                </div>
                <div class="job-salary">
                    <i class="fas fa-dollar-sign"></i>
                    <span>${formatSalary(job.salary)}</span>
                </div>
            </div>
            <div class="job-tags">
                ${job.tags
                  .map((tag) => `<span class="job-tag-item">${tag}</span>`)
                  .join("")}
            </div>
            <div class="job-actions">
                <button class="apply-btn-small" onclick="event.stopPropagation(); quickApply(${
                  job.id
                })">
                    Ứng tuyển nhanh
                </button>
                <button class="view-details-btn" onclick="event.stopPropagation(); viewJob(${
                  job.id
                })">
                    Xem chi tiết
                </button>
            </div>
        </div>
    `;
}

// Load jobs into grid
function loadJobs(container, jobs, limit = null) {
  if (!container) return;

  showLoading(container);

  // Simulate API delay
  setTimeout(() => {
    const jobsToShow = limit ? jobs.slice(0, limit) : jobs;
    container.innerHTML = jobsToShow.map((job) => createJobCard(job)).join("");

    // Add animation to job cards
    const jobCards = container.querySelectorAll(".job-card");
    jobCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.transition = "all 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 100);
    });

    hideLoading();
  }, 800);
}

function loadHotJobs() {
  const hotJobsGrid = document.getElementById("hotJobsGrid");
  const featuredJobs = jobsData.filter((job) => job.featured);
  loadJobs(hotJobsGrid, featuredJobs, 3);
}

function loadSuggestedJobs() {
  const suggestedJobsGrid = document.getElementById("suggestedJobsGrid");
  const suggestedJobs = jobsData.slice(3, 9); // Get different jobs for suggested section
  loadJobs(suggestedJobsGrid, suggestedJobs, 6);
}

// Header functions
function closeNotification() {
  const notification = document.querySelector(".header-top");
  if (notification) {
    notification.style.transform = "translateY(-100%)";
    setTimeout(() => {
      notification.style.display = "none";
    }, 300);
  }
}

// Search functionality
function setupSearchFunctionality() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });

    // Add search suggestions
    searchInput.addEventListener("input", function () {
      showSearchSuggestions(this.value);
    });
  }
}

function performSearch() {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput?.value.trim() || "";

  if (!query) {
    showNotification("Vui lòng nhập từ khóa tìm kiếm", "error");
    return;
  }

  currentSearchQuery = query;
  showNotification(`Đang tìm kiếm "${query}"...`, "info");

  // Simulate search with delay
  setTimeout(() => {
    const searchResults = searchJobs(query);
    displaySearchResults(searchResults);
    showNotification(
      `Tìm thấy ${searchResults.length} việc làm phù hợp`,
      "success"
    );
  }, 1000);
}

function searchJobs(query) {
  const lowerQuery = query.toLowerCase();
  return jobsData.filter(
    (job) =>
      job.title.toLowerCase().includes(lowerQuery) ||
      job.company.toLowerCase().includes(lowerQuery) ||
      job.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      job.location.toLowerCase().includes(lowerQuery)
  );
}

function displaySearchResults(results) {
  // Create or update search results section
  let searchSection = document.getElementById("searchResults");
  if (!searchSection) {
    searchSection = document.createElement("section");
    searchSection.id = "searchResults";
    searchSection.className = "search-results";
    searchSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Kết quả tìm kiếm</h2>
                    <button class="clear-search" onclick="clearSearchResults()">Xóa kết quả</button>
                </div>
                <div class="jobs-grid" id="searchResultsGrid"></div>
            </div>
        `;

    // Insert after search section
    const searchSectionEl = document.querySelector(".search-section");
    searchSectionEl.parentNode.insertBefore(
      searchSection,
      searchSectionEl.nextSibling
    );
  }

  const resultsGrid = document.getElementById("searchResultsGrid");
  loadJobs(resultsGrid, results);

  // Scroll to results
  searchSection.scrollIntoView({ behavior: "smooth" });
}

function showSearchSuggestions(query) {
  if (!query || query.length < 2) {
    hideSuggestions();
    return;
  }

  const suggestions = generateSuggestions(query);
  if (suggestions.length === 0) {
    hideSuggestions();
    return;
  }

  let suggestionsBox = document.getElementById("searchSuggestions");
  if (!suggestionsBox) {
    suggestionsBox = document.createElement("div");
    suggestionsBox.id = "searchSuggestions";
    suggestionsBox.className = "search-suggestions";

    const searchWrapper = document.querySelector(".search-input-wrapper");
    searchWrapper.appendChild(suggestionsBox);
  }

  suggestionsBox.innerHTML = suggestions
    .map(
      (suggestion) =>
        `<div class="suggestion-item" onclick="selectSuggestion('${suggestion}')">${suggestion}</div>`
    )
    .join("");

  suggestionsBox.style.display = "block";
}

function generateSuggestions(query) {
  const lowerQuery = query.toLowerCase();
  const suggestions = new Set();

  jobsData.forEach((job) => {
    if (job.title.toLowerCase().includes(lowerQuery)) {
      suggestions.add(job.title);
    }
    if (job.company.toLowerCase().includes(lowerQuery)) {
      suggestions.add(job.company);
    }
    job.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(lowerQuery)) {
        suggestions.add(tag);
      }
    });
  });

  return Array.from(suggestions).slice(0, 5);
}

function selectSuggestion(suggestion) {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = suggestion;
    performSearch();
  }
  hideSuggestions();
}

function hideSuggestions() {
  const suggestionsBox = document.getElementById("searchSuggestions");
  if (suggestionsBox) {
    suggestionsBox.style.display = "none";
  }
}

function clearSearchResults() {
  const searchSection = document.getElementById("searchResults");
  if (searchSection) {
    searchSection.remove();
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = "";
  }

  currentSearchQuery = "";
  showNotification("Đã xóa kết quả tìm kiếm", "info");
}

// Location functions
function removeLocation() {
  const locationFilter = document.querySelector(".location-filter span");
  if (locationFilter) {
    locationFilter.textContent = "Tất cả địa điểm";
    currentLocation = "";
    showNotification("Đã bỏ lọc theo địa điểm", "info");
  }
}

// Job interaction functions
function viewJob(jobId) {
  const job = jobsData.find((j) => j.id === jobId);
  if (!job) return;

  // Create job modal
  const modal = document.createElement("div");
  modal.className = "job-modal";
  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <button class="close-modal" onclick="closeJobModal()">&times;</button>
                <div class="job-header">
                    <img src="${job.logo}" alt="${
    job.company
  }" class="job-logo-large">
                    <div class="job-info">
                        <h2>${job.title}</h2>
                        <h3>${job.company}</h3>
                        <div class="job-meta">
                            <span><i class="fas fa-map-marker-alt"></i> ${
                              job.location
                            }</span>
                            <span><i class="fas fa-dollar-sign"></i> ${
                              job.salary
                            }</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="job-description">
                    <h4>Mô tả công việc</h4>
                    <p>${job.description}</p>
                </div>
                <div class="job-requirements">
                    <h4>Yêu cầu</h4>
                    <ul>
                        ${job.requirements
                          .map((req) => `<li>${req}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="job-benefits">
                    <h4>Quyền lợi</h4>
                    <ul>
                        ${job.benefits
                          .map((benefit) => `<li>${benefit}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="job-tags">
                    <h4>Kỹ năng yêu cầu</h4>
                    ${job.tags
                      .map((tag) => `<span class="job-tag-item">${tag}</span>`)
                      .join("")}
                </div>
            </div>
            <div class="modal-footer">
                <button class="apply-btn" onclick="applyForJob(${job.id})">
                    <i class="fas fa-paper-plane"></i> Ứng Tuyển Ngay
                </button>
                <button class="save-btn" onclick="toggleSaveJob(${job.id})">
                    <i class="far fa-heart"></i> Lưu Việc Làm
                </button>
                <button class="share-btn" onclick="shareJob(${job.id})">
                    <i class="fas fa-share-alt"></i> Chia Sẻ
                </button>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Animate modal
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeJobModal() {
  const modal = document.querySelector(".job-modal");
  if (modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = "auto";
    }, 300);
  }
}

function quickApply(jobId) {
  const job = jobsData.find((j) => j.id === jobId);
  if (job) {
    showNotification(
      `Ứng tuyển nhanh vào vị trí ${job.title} tại ${job.company}`,
      "success"
    );
    // Here you would typically open a quick application form
    setTimeout(() => {
      showNotification(
        "Đã gửi hồ sơ thành công! HR sẽ liên hệ với bạn sớm.",
        "success"
      );
    }, 2000);
  }
}

function applyForJob(jobId) {
  const job = jobsData.find((j) => j.id === jobId);
  if (job) {
    showNotification(
      `Đang chuyển đến trang ứng tuyển cho vị trí ${job.title}...`,
      "info"
    );
    closeJobModal();
    // Simulate navigation to application page
    setTimeout(() => {
      showNotification("Trang ứng tuyển đã được mở trong tab mới", "success");
    }, 1000);
  }
}

function toggleSaveJob(jobId) {
  const job = jobsData.find((j) => j.id === jobId);
  if (job) {
    // Toggle saved state (in real app, this would be stored in database)
    job.saved = !job.saved;

    const saveButtons = document.querySelectorAll(
      `[onclick*="toggleSaveJob(${jobId})"]`
    );
    saveButtons.forEach((btn) => {
      const icon = btn.querySelector("i");
      if (job.saved) {
        icon.className = "fas fa-heart";
        btn.style.color = "#e74c3c";
      } else {
        icon.className = "far fa-heart";
        btn.style.color = "";
      }
    });

    const message = job.saved
      ? `Đã lưu việc làm ${job.title}`
      : `Đã bỏ lưu việc làm ${job.title}`;
    showNotification(message, job.saved ? "success" : "info");
  }
}

function shareJob(jobId) {
  const job = jobsData.find((j) => j.id === jobId);
  if (job) {
    // Create share URL
    const shareUrl = `${window.location.origin}/job/${jobId}`;

    // Try to use native share API
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Cơ hội việc làm tại ${job.company}`,
        url: shareUrl,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
        showNotification("Đã sao chép link việc làm vào clipboard", "success");
      });
    }
  }
}

// Company functions
function viewCompany(companyName) {
  showNotification(`Đang xem thông tin công ty ${companyName}...`, "info");
  // Simulate company page navigation
  setTimeout(() => {
    showNotification(`Trang công ty ${companyName} đã được mở`, "success");
  }, 1000);
}

function applyNow() {
  showNotification("Đang chuyển đến trang ứng tuyển...", "info");
  setTimeout(() => {
    showNotification("Trang ứng tuyển đã được mở", "success");
  }, 1000);
}

// Category functions
function viewCategory(categoryName) {
  showNotification(`Đang xem danh mục ${categoryName}...`, "info");

  // Filter jobs by category (simplified)
  const categoryJobs = jobsData.filter((job) => {
    const categoryMap = {
      "KINH DOANH": ["Strategy", "Business Analysis"],
      "KẾ TOÁN / KIỂM TOÁN": ["Finance", "Accounting"],
      "KIẾN TRÚC / XÂY DỰNG": ["Architecture", "Construction"],
      "CÔNG NGHỆ THÔNG TIN / VIỄN THÔNG": [
        "JavaScript",
        "Python",
        "React",
        "Node.js",
        "AWS",
        "Docker",
      ],
      "SẢN XUẤT": ["Manufacturing", "Production"],
    };

    const categoryTags = categoryMap[categoryName] || [];
    return job.tags.some((tag) => categoryTags.includes(tag));
  });

  setTimeout(() => {
    displaySearchResults(categoryJobs);
    showNotification(
      `Tìm thấy ${categoryJobs.length} việc làm trong danh mục ${categoryName}`,
      "success"
    );
  }, 1000);
}

// Podcast and CV functions
function playPodcast() {
  showNotification("Đang mở podcast...", "info");
  setTimeout(() => {
    showNotification("Podcast đã được mở trong tab mới", "success");
  }, 1000);
}

function createCV() {
  showNotification("Đang chuyển đến công cụ tạo CV...", "info");
  setTimeout(() => {
    showNotification("Công cụ tạo CV đã được mở trong tab mới", "success");
  }, 1000);
}

// Scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe sections for animation
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Filter functions
function filterJobsByLocation(location) {
  currentLocation = location;
  const filteredJobs = location
    ? jobsData.filter((job) => job.location === location)
    : jobsData;

  showNotification(
    `Lọc việc làm theo địa điểm: ${location || "Tất cả"}`,
    "info"
  );

  // Update hot jobs
  const hotJobsGrid = document.getElementById("hotJobsGrid");
  const featuredJobs = filteredJobs.filter((job) => job.featured);
  loadJobs(hotJobsGrid, featuredJobs, 3);

  // Update suggested jobs
  const suggestedJobsGrid = document.getElementById("suggestedJobsGrid");
  loadJobs(suggestedJobsGrid, filteredJobs.slice(3, 9), 6);
}

function filterJobsBySalary(minSalary, maxSalary) {
  const filteredJobs = jobsData.filter((job) => {
    if (!job.salary || job.salary === "Thỏa thuận") return true;

    // Extract salary numbers (simplified)
    const salaryMatch = job.salary.match(/(\d+)/g);
    if (!salaryMatch) return true;

    const jobMinSalary = parseInt(salaryMatch[0]);
    return (
      jobMinSalary >= minSalary &&
      (maxSalary ? jobMinSalary <= maxSalary : true)
    );
  });

  displaySearchResults(filteredJobs);
  showNotification(
    `Lọc theo mức lương: ${minSalary}${
      maxSalary ? `-${maxSalary}` : "+"
    } triệu`,
    "info"
  );
}

function filterJobsByTags(tags) {
  if (!Array.isArray(tags)) tags = [tags];

  const filteredJobs = jobsData.filter((job) =>
    tags.some((tag) => job.tags.includes(tag))
  );

  displaySearchResults(filteredJobs);
  showNotification(`Lọc theo kỹ năng: ${tags.join(", ")}`, "info");
}

// Sort functions
function sortJobs(criteria) {
  let sortedJobs = [...jobsData];

  switch (criteria) {
    case "newest":
      // In real app, would sort by posted date
      sortedJobs = sortedJobs.reverse();
      break;
    case "salary-high":
      sortedJobs.sort((a, b) => {
        const getSalaryValue = (salary) => {
          if (!salary || salary === "Thỏa thuận") return 0;
          const match = salary.match(/(\d+)/);
          return match ? parseInt(match[0]) : 0;
        };
        return getSalaryValue(b.salary) - getSalaryValue(a.salary);
      });
      break;
    case "salary-low":
      sortedJobs.sort((a, b) => {
        const getSalaryValue = (salary) => {
          if (!salary || salary === "Thỏa thuận") return 0;
          const match = salary.match(/(\d+)/);
          return match ? parseInt(match[0]) : 0;
        };
        return getSalaryValue(a.salary) - getSalaryValue(b.salary);
      });
      break;
    case "company":
      sortedJobs.sort((a, b) => a.company.localeCompare(b.company));
      break;
    default:
      break;
  }

  displaySearchResults(sortedJobs);
  showNotification(`Sắp xếp theo: ${criteria}`, "info");
}

// Advanced search
function advancedSearch(filters) {
  let filteredJobs = [...jobsData];

  // Filter by title/keywords
  if (filters.keywords) {
    const keywords = filters.keywords.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(keywords) ||
        job.description.toLowerCase().includes(keywords)
    );
  }

  // Filter by location
  if (filters.location && filters.location !== "all") {
    filteredJobs = filteredJobs.filter(
      (job) => job.location === filters.location
    );
  }

  // Filter by company
  if (filters.company) {
    filteredJobs = filteredJobs.filter((job) =>
      job.company.toLowerCase().includes(filters.company.toLowerCase())
    );
  }

  // Filter by salary range
  if (filters.minSalary || filters.maxSalary) {
    filteredJobs = filteredJobs.filter((job) => {
      if (!job.salary || job.salary === "Thỏa thuận") return !filters.minSalary;

      const salaryMatch = job.salary.match(/(\d+)/g);
      if (!salaryMatch) return false;

      const jobSalary = parseInt(salaryMatch[0]);
      return (
        (!filters.minSalary || jobSalary >= filters.minSalary) &&
        (!filters.maxSalary || jobSalary <= filters.maxSalary)
      );
    });
  }

  // Filter by job type (if we had this data)
  if (filters.jobType && filters.jobType !== "all") {
    // This would filter by full-time, part-time, contract, etc.
    // For now, we'll just show all jobs
  }

  displaySearchResults(filteredJobs);
  showNotification(
    `Tìm thấy ${filteredJobs.length} việc làm phù hợp với bộ lọc`,
    "success"
  );
}

// Statistics and analytics
function getJobStatistics() {
  const stats = {
    totalJobs: jobsData.length,
    featuredJobs: jobsData.filter((job) => job.featured).length,
    locations: [...new Set(jobsData.map((job) => job.location))],
    companies: [...new Set(jobsData.map((job) => job.company))],
    topTags: getTopTags(),
    salaryRanges: getSalaryRanges(),
  };

  return stats;
}

function getTopTags() {
  const tagCounts = {};
  jobsData.forEach((job) => {
    job.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([tag, count]) => ({ tag, count }));
}

function getSalaryRanges() {
  const ranges = {
    "under-15": 0,
    "15-25": 0,
    "25-35": 0,
    "over-35": 0,
    negotiable: 0,
  };

  jobsData.forEach((job) => {
    if (!job.salary || job.salary === "Thỏa thuận") {
      ranges.negotiable++;
      return;
    }

    const salaryMatch = job.salary.match(/(\d+)/);
    if (!salaryMatch) {
      ranges.negotiable++;
      return;
    }

    const salary = parseInt(salaryMatch[0]);
    if (salary < 15) ranges["under-15"]++;
    else if (salary <= 25) ranges["15-25"]++;
    else if (salary <= 35) ranges["25-35"]++;
    else ranges["over-35"]++;
  });

  return ranges;
}

// Export/Import functions for data management
function exportJobsData() {
  const dataStr = JSON.stringify(jobsData, null, 2);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = "vietnamworks-jobs.json";

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();

  showNotification("Đã xuất dữ liệu việc làm", "success");
}

function importJobsData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedData = JSON.parse(e.target.result);
      if (Array.isArray(importedData)) {
        jobsData = importedData;
        loadHotJobs();
        loadSuggestedJobs();
        showNotification("Đã nhập dữ liệu việc làm thành công", "success");
      } else {
        throw new Error("Định dạng file không hợp lệ");
      }
    } catch (error) {
      showNotification("Lỗi nhập dữ liệu: " + error.message, "error");
    }
  };
  reader.readAsText(file);
}

// Local Storage functions (for demo purposes)
function saveToLocalStorage() {
  try {
    // Note: In real Claude.ai artifacts, localStorage is not available
    // This is just for demonstration
    const dataToSave = {
      jobs: jobsData,
      searchHistory: getSearchHistory(),
      savedJobs: getSavedJobs(),
      userPreferences: getUserPreferences(),
    };

    // In a real environment, you would use:
    // localStorage.setItem('vietnamworks-data', JSON.stringify(dataToSave));

    showNotification("Dữ liệu đã được lưu", "success");
  } catch (error) {
    showNotification("Không thể lưu dữ liệu: " + error.message, "error");
  }
}

function loadFromLocalStorage() {
  try {
    // Note: In real Claude.ai artifacts, localStorage is not available
    // This is just for demonstration

    // In a real environment, you would use:
    // const savedData = localStorage.getItem('vietnamworks-data');
    // if (savedData) {
    //     const parsedData = JSON.parse(savedData);
    //     jobsData = parsedData.jobs || sampleJobs;
    //     // Restore other saved data...
    // }

    showNotification("Dữ liệu đã được khôi phục", "success");
  } catch (error) {
    showNotification("Không thể khôi phục dữ liệu: " + error.message, "error");
  }
}

// Helper functions for saved data
function getSearchHistory() {
  // Return mock search history
  return [
    { query: "javascript developer", timestamp: Date.now() - 86400000 },
    { query: "product manager", timestamp: Date.now() - 172800000 },
    { query: "ux designer", timestamp: Date.now() - 259200000 },
  ];
}

function getSavedJobs() {
  return jobsData.filter((job) => job.saved).map((job) => job.id);
}

function getUserPreferences() {
  return {
    preferredLocation: currentLocation,
    preferredSalaryRange: { min: 15, max: 30 },
    preferredJobTypes: ["full-time"],
    notificationSettings: {
      newJobs: true,
      applications: true,
      messages: true,
    },
  };
}

// Performance optimization functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Debounced search function for better performance
const debouncedSearch = debounce(function (query) {
  if (query.length >= 2) {
    const results = searchJobs(query);
    showSearchSuggestions(query);
  }
}, 300);

// Setup event listeners with performance optimizations
function setupOptimizedEventListeners() {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      debouncedSearch(e.target.value);
    });
  }

  // Throttled scroll handler for better performance
  const throttledScrollHandler = throttle(function () {
    // Handle scroll-based features like sticky headers, load more, etc.
    handleScroll();
  }, 100);

  window.addEventListener("scroll", throttledScrollHandler);
}

function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add sticky header effect
  const header = document.querySelector(".header-main");
  if (header) {
    if (scrollTop > 100) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  }

  // Implement infinite scroll for job listings
  if (
    scrollTop + window.innerHeight >=
    document.documentElement.scrollHeight - 1000
  ) {
    loadMoreJobs();
  }
}

function loadMoreJobs() {
  if (isLoading) return;

  isLoading = true;
  showNotification("Đang tải thêm việc làm...", "info");

  // Simulate loading more jobs
  setTimeout(() => {
    const additionalJobs = generateMoreJobs(6);
    jobsData.push(...additionalJobs);

    const suggestedJobsGrid = document.getElementById("suggestedJobsGrid");
    if (suggestedJobsGrid) {
      const newJobsHtml = additionalJobs
        .map((job) => createJobCard(job))
        .join("");
      suggestedJobsGrid.insertAdjacentHTML("beforeend", newJobsHtml);
    }

    isLoading = false;
    showNotification(
      `Đã tải thêm ${additionalJobs.length} việc làm`,
      "success"
    );
  }, 1500);
}

function generateMoreJobs(count) {
  const jobTitles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Project Manager",
    "Scrum Master",
    "Technical Lead",
    "Quality Assurance",
    "DevOps Engineer",
    "Data Scientist",
    "UI/UX Designer",
    "Graphic Designer",
    "Content Writer",
  ];

  const companies = [
    "Tech Innovate",
    "Digital Solutions",
    "Smart Systems",
    "Future Corp",
    "NextGen Tech",
    "Innovation Hub",
  ];

  const locations = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ"];

  const skills = [
    ["React", "JavaScript", "CSS"],
    ["Node.js", "MongoDB", "Express"],
    ["Python", "Django", "PostgreSQL"],
    ["Java", "Spring", "MySQL"],
    ["Angular", "TypeScript", "RxJS"],
    ["Vue.js", "Vuex", "Nuxt.js"],
  ];

  const newJobs = [];
  for (let i = 0; i < count; i++) {
    const jobIndex = Math.floor(Math.random() * jobTitles.length);
    const companyIndex = Math.floor(Math.random() * companies.length);
    const locationIndex = Math.floor(Math.random() * locations.length);
    const skillIndex = Math.floor(Math.random() * skills.length);

    newJobs.push({
      id: jobsData.length + i + 1,
      title: jobTitles[jobIndex],
      company: companies[companyIndex],
      location: locations[locationIndex],
      salary: `${15 + Math.floor(Math.random() * 20)} - ${
        25 + Math.floor(Math.random() * 20)
      } triệu`,
      tags: skills[skillIndex],
      logo: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'%3E%3Crect width='50' height='50' fill='%23${Math.floor(
        Math.random() * 16777215
      ).toString(
        16
      )}'/%3E%3Ctext x='15' y='30' font-family='Arial' font-size='12' fill='white'%3E${companies[
        companyIndex
      ]
        .substring(0, 2)
        .toUpperCase()}%3C/text%3E%3C/svg%3E`,
      featured: Math.random() > 0.7,
      description: `Cơ hội tuyệt vời để tham gia vào đội ngũ ${companies[companyIndex]} với vị trí ${jobTitles[jobIndex]}.`,
      requirements: [
        `2+ năm kinh nghiệm ${skills[skillIndex][0]}`,
        `Thành thạo ${skills[skillIndex].join(", ")}`,
        "Kỹ năng teamwork tốt",
      ],
      benefits: [
        "Lương thưởng cạnh tranh",
        "Bảo hiểm đầy đủ",
        "Môi trường làm việc thân thiện",
      ],
    });
  }

  return newJobs;
}

// Error handling
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);
  showNotification("Đã xảy ra lỗi. Vui lòng thử lại sau.", "error");
});

window.addEventListener("unhandledrejection", function (e) {
  console.error("Unhandled Promise Rejection:", e.reason);
  showNotification("Đã xảy ra lỗi kết nối. Vui lòng kiểm tra mạng.", "error");
});

// Initialize optimized event listeners when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  setupOptimizedEventListeners();
});

// Cleanup function for better memory management
function cleanup() {
  // Remove event listeners
  window.removeEventListener("scroll", throttledScrollHandler);

  // Clear timeouts and intervals
  const highestTimeoutId = setTimeout(";");
  for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }

  const highestIntervalId = setInterval(";");
  for (let i = 0; i < highestIntervalId; i++) {
    clearInterval(i);
  }

  console.log("VietnamWorks Dashboard cleaned up");
}

// Make cleanup available globally
window.cleanupVietnamWorks = cleanup;

console.log("VietnamWorks Dashboard JavaScript loaded successfully!");