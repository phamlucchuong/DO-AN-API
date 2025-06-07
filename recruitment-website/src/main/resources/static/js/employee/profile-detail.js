// DOM Elements
const createJobBtn = document.getElementById("createJobBtn");
const jobModal = document.getElementById("jobModal");
const closeModalBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const jobNotificationForm = document.getElementById("jobNotificationForm");

// Debug: Check if elements exist
console.log("DOM Elements Check:");
console.log("createJobBtn:", createJobBtn);
console.log("jobModal:", jobModal);
console.log("closeModalBtn:", closeModalBtn);
console.log("cancelBtn:", cancelBtn);

// Modal Control Functions
function openModal() {
  console.log("Opening modal...");
  if (jobModal) {
    jobModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    console.log("Modal opened successfully");
  } else {
    console.error("Modal element not found");
  }
}

function closeModal() {
  console.log("Closing modal...");
  if (jobModal) {
    jobModal.classList.remove("active");
    document.body.style.overflow = "auto"; // Restore scrolling
    console.log("Modal closed successfully");
  }
}

// Event Listeners
createJobBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Tạo Thông Báo Việc Làm button clicked");
  openModal();
});

closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

// Close modal when clicking outside
jobModal.addEventListener("click", function (e) {
  if (e.target === jobModal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && jobModal.classList.contains("active")) {
    closeModal();
  }
});

// Form Handling
jobNotificationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = {
    jobTitle: document.getElementById("jobTitle").value,
    salaryMin: document.getElementById("salaryMin").value,
    currency: document.getElementById("currency").value,
    salaryFrequency: document.getElementById("salaryFrequency").value,
    level: document.getElementById("level").value,
    location: document.getElementById("location").value,
    industry: document.getElementById("industry").value,
    companyType: document.getElementById("companyType").value,
    frequency: document.querySelector('input[name="frequency"]:checked').value,
    notification: document.querySelector('input[name="notification"]:checked')
      .value,
    receiveNotifications: document.getElementById("receiveNotifications")
      .checked,
  };

  // Validate required fields
  if (!formData.jobTitle.trim()) {
    alert("Vui lòng nhập chức danh việc làm!");
    document.getElementById("jobTitle").focus();
    return;
  }

  // Process form data (you can customize this part)
  console.log("Form Data:", formData);

  // Show success message
  alert("Thông báo việc làm đã được tạo thành công!");

  // Reset form and close modal
  jobNotificationForm.reset();
  closeModal();
});

// Additional Account Management Functions
const setupAccountBtn = document.getElementById("setupAccountBtn");
const changePasswordBtn = document.getElementById("changePasswordBtn");
const setupEmailBtn = document.getElementById("setupEmailBtn");
const searchRelevanceToggle = document.getElementById("searchRelevanceToggle");

// Setup Account Button
if (setupAccountBtn) {
  setupAccountBtn.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Chức năng thiết lập tài khoản sẽ được phát triển!");
  });
}

// Change Password Button
if (changePasswordBtn) {
  changePasswordBtn.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Chức năng thay đổi mật khẩu sẽ được phát triển!");
  });
}

// Setup Email Button
if (setupEmailBtn) {
  setupEmailBtn.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Chức năng thiết lập email sẽ được phát triển!");
  });
}

// Search Relevance Toggle
if (searchRelevanceToggle) {
  searchRelevanceToggle.addEventListener("change", function () {
    const isEnabled = this.checked;
    console.log(
      "Search relevance setting:",
      isEnabled ? "Enabled" : "Disabled"
    );

    // You can save this setting to localStorage or send to server
    localStorage.setItem("searchRelevanceSetting", isEnabled);

    // Show feedback
    const message = isEnabled
      ? "Đã bật sắp xếp theo thứ tự liên quan nhất"
      : "Đã tắt sắp xếp theo thứ tự liên quan nhất";

    // Create a temporary notification
    showNotification(message);
  });

  // Load saved setting
  const savedSetting = localStorage.getItem("searchRelevanceSetting");
  if (savedSetting !== null) {
    searchRelevanceToggle.checked = savedSetting === "true";
  }
}

// Utility function to show notifications
function showNotification(message, duration = 3000) {
  // Create notification element
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-blue);
        color: white;
        padding: 12px 20px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-md);
        z-index: 9999;
        font-size: 14px;
        font-weight: 500;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 100);

  // Hide and remove notification
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, duration);
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Content Loaded");

  // Verify modal functionality
  if (createJobBtn && jobModal) {
    console.log("Modal elements found - functionality ready");

    // Add additional click handler for testing
    createJobBtn.addEventListener("click", function () {
      console.log("Create Job Button clicked - showing modal");
    });
  } else {
    console.error("Modal elements not found!");
    console.error("createJobBtn:", createJobBtn);
    console.error("jobModal:", jobModal);
  }

  // Auto-format salary input
  const salaryMinInput = document.getElementById("salaryMin");
  if (salaryMinInput) {
    salaryMinInput.addEventListener("input", function () {
      // Remove non-numeric characters
      let value = this.value.replace(/[^\d]/g, "");

      // Add thousand separators
      if (value) {
        value = parseInt(value).toLocaleString();
      }

      this.value = value;
    });
  }

  // Job title suggestions (basic implementation)
  const jobTitleInput = document.getElementById("jobTitle");
  if (jobTitleInput) {
    const commonJobTitles = [
      "Software Engineer",
      "Product Manager",
      "UI/UX Designer",
      "Data Analyst",
      "Marketing Manager",
      "Sales Executive",
      "HR Manager",
      "Business Analyst",
      "Project Manager",
      "DevOps Engineer",
    ];

    // You can implement autocomplete functionality here
    jobTitleInput.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      if (value.length > 2) {
        const suggestions = commonJobTitles.filter((title) =>
          title.toLowerCase().includes(value)
        );
        // You can show suggestions dropdown here
        console.log("Job title suggestions:", suggestions);
      }
    });
  }

  // Cascade dropdowns (example: update locations based on selection)
  const locationSelect = document.getElementById("location");
  if (locationSelect) {
    locationSelect.addEventListener("change", function () {
      const selectedLocation = this.value;
      console.log("Selected location:", selectedLocation);

      // You can implement location-based filtering here
      // For example, update industry options based on location
    });
  }
});

console.log("Profile Detail JavaScript loaded successfully!");
