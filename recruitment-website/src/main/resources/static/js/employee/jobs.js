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

  // Load data from localStorage if available
  const savedData = loadFromLocalStorage("jobsData");
  if (savedData) {
    jobsData = savedData;
  }

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
    if (!jobsList) return;

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
    if (!jobNotificationsList) return;

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
    const addJobBtn = document.getElementById("addJobBtn");
    const createJobBtn = document.getElementById("createJobBtn");

    let currentJobId = null;

    // Add job button
    if (addJobBtn) {
      addJobBtn.addEventListener("click", function () {
        console.log("Add job button clicked");
        currentJobId = null;
        document.getElementById("editJobTitle").value = "";
        document.getElementById("editLocation").value = "";
        document.getElementById("editSalary").value = "";
        document.getElementById("editJobDescription").value = "";

        // Change modal title for adding
        const modalTitle = document.querySelector(
          "#editJobModal .modal-header h2"
        );
        if (modalTitle) {
          modalTitle.textContent = "Thêm việc làm mới";
        }

        if (editJobModal) {
          editJobModal.style.display = "flex";
        }
      });
    }

    // Create job notification button
    if (createJobBtn) {
      createJobBtn.addEventListener("click", function () {
        console.log("Create job notification button clicked");
        const newJob = {
          id: Date.now(), // Use timestamp for unique ID
          title: `Việc làm mới ${jobsData.jobNotifications.length + 1}`,
          link: "#",
        };
        jobsData.jobNotifications.push(newJob);
        loadJobNotifications();
        saveToLocalStorage("jobsData", jobsData);
        showMessage("Thông báo việc làm đã được tạo");
      });
    }

    // Event delegation for dynamically created buttons
    document.addEventListener("click", function (e) {
      // Edit job buttons
      if (
        e.target.classList.contains("edit-job-btn") ||
        e.target.parentElement.classList.contains("edit-job-btn")
      ) {
        const button = e.target.classList.contains("edit-job-btn")
          ? e.target
          : e.target.parentElement;
        currentJobId = parseInt(button.dataset.jobId);
        const job = jobsData.jobs.find((j) => j.id === currentJobId);

        if (job) {
          document.getElementById("editJobTitle").value = job.title;
          document.getElementById("editLocation").value = job.location;
          document.getElementById("editSalary").value = job.salary;
          document.getElementById("editJobDescription").value = job.description;

          // Change modal title for editing
          const modalTitle = document.querySelector(
            "#editJobModal .modal-header h2"
          );
          if (modalTitle) {
            modalTitle.textContent = "Chỉnh sửa việc làm";
          }

          if (editJobModal) {
            editJobModal.style.display = "flex";
          }
        }
      }

      // Delete job buttons
      if (
        e.target.classList.contains("delete-job-btn") ||
        e.target.parentElement.classList.contains("delete-job-btn")
      ) {
        const button = e.target.classList.contains("delete-job-btn")
          ? e.target
          : e.target.parentElement;
        const jobId = parseInt(button.dataset.jobId);

        if (confirm("Bạn có chắc chắn muốn xóa việc làm này?")) {
          jobsData.jobs = jobsData.jobs.filter((j) => j.id !== jobId);
          loadJobs();
          saveToLocalStorage("jobsData", jobsData);
          showMessage("Việc làm đã được xóa");
        }
      }

      // Job links
      if (e.target.classList.contains("job-link")) {
        e.preventDefault();
        showMessage(`Xem chi tiết việc làm: ${e.target.textContent}`);
      }

      // Navigation links
      if (e.target.classList.contains("nav-list-link")) {
        if (e.target.href.includes("#")) {
          e.preventDefault();
          showMessage("Trang này sẽ được phát triển trong phiên bản tiếp theo");
        }
      }
    });

    // Save job
    if (saveJobBtn) {
      saveJobBtn.addEventListener("click", function () {
        const jobData = {
          id: currentJobId || Date.now(),
          title: document.getElementById("editJobTitle").value,
          location: document.getElementById("editLocation").value,
          salary: document.getElementById("editSalary").value,
          description: document.getElementById("editJobDescription").value,
        };

        // Validate required fields
        if (
          !jobData.title ||
          !jobData.location ||
          !jobData.salary ||
          !jobData.description
        ) {
          showMessage("Vui lòng điền đầy đủ thông tin");
          return;
        }

        if (currentJobId) {
          // Edit existing job
          const index = jobsData.jobs.findIndex((j) => j.id === currentJobId);
          if (index !== -1) {
            jobsData.jobs[index] = jobData;
          }
        } else {
          // Add new job
          jobsData.jobs.push(jobData);
        }

        loadJobs();
        saveToLocalStorage("jobsData", jobsData);
        if (editJobModal) {
          editJobModal.style.display = "none";
        }
        showMessage("Việc làm đã được cập nhật");
      });
    }

    // Close and cancel buttons
    if (closeJobBtn) {
      closeJobBtn.addEventListener("click", function () {
        if (editJobModal) {
          editJobModal.style.display = "none";
        }
      });
    }

    if (cancelJobBtn) {
      cancelJobBtn.addEventListener("click", function () {
        if (editJobModal) {
          editJobModal.style.display = "none";
        }
      });
    }

    // Close modal when clicking outside
    if (editJobModal) {
      editJobModal.addEventListener("click", function (e) {
        if (e.target === editJobModal) {
          editJobModal.style.display = "none";
        }
      });
    }

    // Setup profile link
    const setupProfileBtn = document.querySelector(".setup-profile-btn");
    if (setupProfileBtn) {
      setupProfileBtn.addEventListener("click", function (e) {
        e.preventDefault();
        showMessage("Tính năng thiết lập hồ sơ sẽ được phát triển");
      });
    }
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
        z-index: 1001;
        font-size: 14px;
        max-width: 300px;
      `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  function saveToLocalStorage(key, data) {
    try {
      const jsonData = JSON.stringify(data);
      // Simulate localStorage for demo purposes
      window.tempStorage = window.tempStorage || {};
      window.tempStorage[key] = jsonData;
      return true;
    } catch (e) {
      console.error("Error saving data:", e);
      return false;
    }
  }

  function loadFromLocalStorage(key) {
    try {
      // Simulate localStorage for demo purposes
      window.tempStorage = window.tempStorage || {};
      const data = window.tempStorage[key];
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error loading data:", e);
      return null;
    }
  }
});
