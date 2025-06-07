document.addEventListener("DOMContentLoaded", function () {
  // Sample data
  let jobsData = {
    jobs: [
      {
        id: 1,
        title: "Senior Developer",
        location: "TP.HCM",
        salary: "30-50 triệu VND",
        description:
          "Phát triển và duy trì các ứng dụng web cho công ty TechViet Solutions.",
      },
      {
        id: 2,
        title: "Marketing Manager",
        location: "Hà Nội",
        salary: "25-40 triệu VND",
        description:
          "Xây dựng và triển khai chiến lược marketing cho sản phẩm công nghệ.",
      },
    ],
    jobNotifications: [
      { id: 1, title: "Senior Developer at TechViet", link: "#" },
      { id: 2, title: "Marketing Manager at Digital Innovation", link: "#" },
    ],
  };

  // Initialize page data
  initializeJobsData();

  // Event listeners
  setupEventListeners();

  function initializeJobsData() {
    // Load jobs
    loadJobs();

    // Load job notifications
    loadJobNotifications();
  }

  function loadJobs() {
    const jobsList = document.getElementById("jobsList");
    jobsList.innerHTML = "";
    jobsData.jobs.forEach((job) => {
      const jobItem = document.createElement("div");
      jobItem.className = "job-item";
      jobItem.innerHTML = `
          <div class="job-details">
            <div class="job-title"><a href="#" class="job-link" data-job-id="${job.id}">${job.title}</a></div>
            <div class="job-location">${job.location}</div>
            <div class="job-salary">${job.salary}</div>
            <div class="job-description">${job.description}</div>
            <div class="job-actions">
              <button class="job-action-btn edit-job-btn" data-job-id="${job.id}"><i class="fas fa-edit"></i> Chỉnh sửa</button>
              <button class="job-action-btn delete-job-btn" data-job-id="${job.id}"><i class="fas fa-trash"></i> Xóa</button>
            </div>
          </div>
        `;
      jobsList.appendChild(jobItem);
    });
  }

  function loadJobNotifications() {
    const jobNotificationsList = document.getElementById(
      "jobNotificationsList"
    );
    jobNotificationsList.innerHTML = "";
    jobsData.jobNotifications.forEach((job) => {
      const jobItem = document.createElement("li");
      jobItem.innerHTML = `<a href="${job.link}" class="job-link" data-job-id="${job.id}">${job.title}</a>`;
      jobNotificationsList.appendChild(jobItem);
    });
  }

  function setupEventListeners() {
    const editJobModal = document.getElementById("editJobModal");
    const editJobForm = document.getElementById("editJobForm");
    const saveJobBtn = document.querySelector("#editJobModal .modal-save-btn");
    const cancelJobBtn = document.querySelector(
      "#editJobModal .modal-cancel-btn"
    );
    const closeJobBtn = document.querySelector(
      "#editJobModal .modal-close-btn"
    );
    let currentJobId = null;

    // Add job button
    document.getElementById("addJobBtn").addEventListener("click", () => {
      currentJobId = null;
      document.getElementById("editJobTitle").value = "";
      document.getElementById("editLocation").value = "";
      document.getElementById("editSalary").value = "";
      document.getElementById("editJobDescription").value = "";
      editJobModal.style.display = "flex";
    });

    // Edit job buttons
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit-job-btn")) {
        currentJobId = parseInt(e.target.dataset.jobId);
        const job = jobsData.jobs.find((j) => j.id === currentJobId);
        document.getElementById("editJobTitle").value = job.title;
        document.getElementById("editLocation").value = job.location;
        document.getElementById("editSalary").value = job.salary;
        document.getElementById("editJobDescription").value = job.description;
        editJobModal.style.display = "flex";
      }
    });

    // Delete job buttons
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-job-btn")) {
        const jobId = parseInt(e.target.dataset.jobId);
        jobsData.jobs = jobsData.jobs.filter((j) => j.id !== jobId);
        loadJobs();
        saveToLocalStorage("jobsData", jobsData);
        showMessage("Việc làm đã được xóa");
      }
    });

    // Save job
    saveJobBtn.addEventListener("click", () => {
      const formData = new FormData(editJobForm);
      const jobData = {
        id: currentJobId || jobsData.jobs.length + 1,
        title: formData.get("jobTitle"),
        location: formData.get("location"),
        salary: formData.get("salary"),
        description: formData.get("jobDescription"),
      };
      if (currentJobId) {
        const index = jobsData.jobs.findIndex((j) => j.id === currentJobId);
        jobsData.jobs[index] = jobData;
      } else {
        jobsData.jobs.push(jobData);
      }
      loadJobs();
      saveToLocalStorage("jobsData", jobsData);
      editJobModal.style.display = "none";
      showMessage("Việc làm đã được cập nhật");
    });

    // Close and cancel buttons
    closeJobBtn.addEventListener("click", () => {
      editJobModal.style.display = "none";
    });
    cancelJobBtn.addEventListener("click", () => {
      editJobModal.style.display = "none";
    });

    // Job links
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("job-link")) {
        e.preventDefault();
        showMessage(`Xem chi tiết việc làm: ${e.target.dataset.jobId}`);
      }
    });

    // Create job notification button
    document.getElementById("createJobBtn").addEventListener("click", () => {
      const newJob = {
        id: jobsData.jobNotifications.length + 1,
        title: `Việc làm mới ${jobsData.jobNotifications.length + 1}`,
        link: "#",
      };
      jobsData.jobNotifications.push(newJob);
      loadJobNotifications();
      saveToLocalStorage("jobsData", jobsData);
      showMessage("Thông báo việc làm đã được tạo");
    });

    // Navigation links
    document.querySelectorAll(".nav-list-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (link.href.includes("#")) {
          e.preventDefault();
          showMessage("Trang này sẽ được phát triển trong phiên bản tiếp theo");
        }
      });
    });

    // Setup profile link
    document
      .querySelector(".setup-profile-btn")
      .addEventListener("click", (e) => {
        e.preventDefault();
        showMessage("Tính năng thiết lập hồ sơ sẽ được phát triển");
      });
  }

  function showMessage(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4285f4;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 1000;
        font-size: 14px;
        max-width: 300px;
      `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  function saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Error saving to localStorage:", e);
      return false;
    }
  }

  function loadFromLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error loading from localStorage:", e);
      return null;
    }
  }

  const savedData = loadFromLocalStorage("jobsData");
  if (savedData) {
    jobsData = savedData;
    initializeJobsData();
  }
});
