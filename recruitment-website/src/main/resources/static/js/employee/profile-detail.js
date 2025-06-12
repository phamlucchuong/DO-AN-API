// DOM Elements
const createJobBtn = document.getElementById("createJobBtn");
const jobModal = document.getElementById("jobModal");
const closeModalBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const jobNotificationForm = document.getElementById("jobNotificationForm");

// Account Management Elements
const setupAccountBtn = document.getElementById("setupAccountBtn");
const changePasswordBtn = document.getElementById("changePasswordBtn");
const setupEmailBtn = document.getElementById("setupEmailBtn");
const searchRelevanceToggle = document.getElementById("searchRelevanceToggle");

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

// Generic Modal Functions
function createModal(title, content, buttons = []) {
  const modalId = `modal_${Date.now()}`;
  const modalHTML = `
    <div class="modal-overlay" id="${modalId}">
      <div class="modal-content">
        <div class="modal-header">
          <h2>${title}</h2>
          <button class="modal-close" onclick="closeGenericModal('${modalId}')">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        <div class="modal-footer">
          ${buttons
            .map(
              (btn) =>
                `<button type="${btn.type || "button"}" class="${btn.class}" ${
                  btn.onclick ? `onclick="${btn.onclick}"` : ""
                }>${btn.text}</button>`
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
  const modal = document.getElementById(modalId);
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  return modalId;
}

function closeGenericModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// Account Setup Modal
function openAccountSetupModal() {
  const content = `
    <form id="accountSetupForm">
      <div class="form-group">
        <label for="newEmail">Email mới</label>
        <input type="email" id="newEmail" placeholder="Nhập email mới" required>
      </div>
      <div class="form-group">
        <label for="confirmEmail">Xác nhận email</label>
        <input type="email" id="confirmEmail" placeholder="Nhập lại email mới" required>
      </div>
      <div class="form-group">
        <label for="currentPassword">Mật khẩu hiện tại</label>
        <input type="password" id="currentPassword" placeholder="Nhập mật khẩu hiện tại" required>
      </div>
    </form>
  `;

  const buttons = [
    {
      text: "Hủy",
      class: "btn-secondary",
      onclick: `closeGenericModal(this.closest('.modal-overlay').id)`,
    },
    { text: "Cập nhật", class: "btn-primary", onclick: "handleAccountSetup()" },
  ];

  return createModal("Thiết lập tài khoản", content, buttons);
}

function handleAccountSetup() {
  const form = document.getElementById("accountSetupForm");
  const newEmail = document.getElementById("newEmail").value;
  const confirmEmail = document.getElementById("confirmEmail").value;
  const currentPassword = document.getElementById("currentPassword").value;

  // Validation
  if (!newEmail || !confirmEmail || !currentPassword) {
    showNotification("Vui lòng điền đầy đủ thông tin!", "error");
    return;
  }

  if (newEmail !== confirmEmail) {
    showNotification("Email xác nhận không khớp!", "error");
    return;
  }

  if (!isValidEmail(newEmail)) {
    showNotification("Email không hợp lệ!", "error");
    return;
  }

  // Simulate API call
  showNotification("Đang cập nhật tài khoản...", "info");

  setTimeout(() => {
    // Update displayed email
    const currentEmailElement = document.getElementById("currentEmail");
    if (currentEmailElement) {
      currentEmailElement.textContent = newEmail;
    }

    showNotification("Cập nhật tài khoản thành công!", "success");
    closeGenericModal(form.closest(".modal-overlay").id);
  }, 1500);
}

// Change Password Modal
function openChangePasswordModal() {
  const content = `
    <form id="changePasswordForm">
      <div class="form-group">
        <label for="oldPassword">Mật khẩu hiện tại</label>
        <input type="password" id="oldPassword" placeholder="Nhập mật khẩu hiện tại" required>
      </div>
      <div class="form-group">
        <label for="newPassword">Mật khẩu mới</label>
        <input type="password" id="newPassword" placeholder="Nhập mật khẩu mới" required>
        <small class="form-hint">Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số</small>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Xác nhận mật khẩu mới</label>
        <input type="password" id="confirmPassword" placeholder="Nhập lại mật khẩu mới" required>
      </div>
      <div class="password-strength" id="passwordStrength" style="display: none;">
        <div class="strength-bar">
          <div class="strength-fill"></div>
        </div>
        <span class="strength-text">Mức độ bảo mật: <span class="strength-level">Yếu</span></span>
      </div>
    </form>
  `;

  const buttons = [
    {
      text: "Hủy",
      class: "btn-secondary",
      onclick: `closeGenericModal(this.closest('.modal-overlay').id)`,
    },
    {
      text: "Đổi mật khẩu",
      class: "btn-primary",
      onclick: "handlePasswordChange()",
    },
  ];

  const modalId = createModal("Thay đổi mật khẩu", content, buttons);

  // Add password strength checker
  setTimeout(() => {
    const newPasswordInput = document.getElementById("newPassword");
    if (newPasswordInput) {
      newPasswordInput.addEventListener("input", checkPasswordStrength);
    }
  }, 100);

  return modalId;
}

function checkPasswordStrength() {
  const password = this.value;
  const strengthElement = document.getElementById("passwordStrength");
  const strengthFill = document.querySelector(".strength-fill");
  const strengthLevel = document.querySelector(".strength-level");

  if (!password) {
    strengthElement.style.display = "none";
    return;
  }

  strengthElement.style.display = "block";

  let score = 0;
  let level = "Yếu";
  let color = "#ff4757";

  // Length check
  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 25;

  // Character variety checks
  if (/[a-z]/.test(password)) score += 12.5;
  if (/[A-Z]/.test(password)) score += 12.5;
  if (/[0-9]/.test(password)) score += 12.5;
  if (/[^A-Za-z0-9]/.test(password)) score += 12.5;

  if (score >= 75) {
    level = "Mạnh";
    color = "#2ed573";
  } else if (score >= 50) {
    level = "Trung bình";
    color = "#ffa502";
  }

  strengthFill.style.width = `${score}%`;
  strengthFill.style.backgroundColor = color;
  strengthLevel.textContent = level;
  strengthLevel.style.color = color;
}

function handlePasswordChange() {
  const form = document.getElementById("changePasswordForm");
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validation
  if (!oldPassword || !newPassword || !confirmPassword) {
    showNotification("Vui lòng điền đầy đủ thông tin!", "error");
    return;
  }

  if (newPassword !== confirmPassword) {
    showNotification("Mật khẩu xác nhận không khớp!", "error");
    return;
  }

  if (!isValidPassword(newPassword)) {
    showNotification(
      "Mật khẩu không đủ mạnh! Vui lòng đảm bảo có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.",
      "error"
    );
    return;
  }

  if (oldPassword === newPassword) {
    showNotification("Mật khẩu mới phải khác mật khẩu hiện tại!", "error");
    return;
  }

  // Simulate API call
  showNotification("Đang thay đổi mật khẩu...", "info");

  setTimeout(() => {
    showNotification("Thay đổi mật khẩu thành công!", "success");
    closeGenericModal(form.closest(".modal-overlay").id);
  }, 1500);
}

// Email Setup Modal
function openEmailSetupModal() {
  const content = `
    <form id="emailSetupForm">
      <div class="form-group">
        <h3>Cài đặt thông báo email</h3>
        <p>Chọn các loại thông báo bạn muốn nhận qua email:</p>
      </div>
      
      <div class="notification-options">
        <label class="checkbox-option">
          <input type="checkbox" id="jobMatchNotif" checked>
          <span>Việc làm phù hợp với hồ sơ của bạn</span>
        </label>
        
        <label class="checkbox-option">
          <input type="checkbox" id="applicationStatusNotif" checked>
          <span>Cập nhật trạng thái ứng tuyển</span>
        </label>
        
        <label class="checkbox-option">
          <input type="checkbox" id="profileViewNotif" checked>
          <span>Nhà tuyển dụng xem hồ sơ</span>
        </label>
        
        <label class="checkbox-option">
          <input type="checkbox" id="recruitmentNotif">
          <span>Lời mời phỏng vấn</span>
        </label>
        
        <label class="checkbox-option">
          <input type="checkbox" id="promotionNotif">
          <span>Khuyến mãi và ưu đãi</span>
        </label>
        
        <label class="checkbox-option">
          <input type="checkbox" id="newsletterNotif">
          <span>Bản tin hàng tuần</span>
        </label>
      </div>
      
      <div class="form-group">
        <label for="emailFrequency">Tần suất nhận email</label>
        <select id="emailFrequency">
          <option value="immediate">Ngay lập tức</option>
          <option value="daily" selected>Hàng ngày</option>
          <option value="weekly">Hàng tuần</option>
          <option value="monthly">Hàng tháng</option>
        </select>
      </div>
    </form>
  `;

  const buttons = [
    {
      text: "Hủy",
      class: "btn-secondary",
      onclick: `closeGenericModal(this.closest('.modal-overlay').id)`,
    },
    {
      text: "Lưu cài đặt",
      class: "btn-primary",
      onclick: "handleEmailSetup()",
    },
  ];

  return createModal("Cài đặt thông báo Email", content, buttons);
}

function handleEmailSetup() {
  const form = document.getElementById("emailSetupForm");
  const settings = {
    jobMatch: document.getElementById("jobMatchNotif").checked,
    applicationStatus: document.getElementById("applicationStatusNotif")
      .checked,
    profileView: document.getElementById("profileViewNotif").checked,
    recruitment: document.getElementById("recruitmentNotif").checked,
    promotion: document.getElementById("promotionNotif").checked,
    newsletter: document.getElementById("newsletterNotif").checked,
    frequency: document.getElementById("emailFrequency").value,
  };

  // Save to localStorage (in real app, would send to server)
  localStorage.setItem("emailNotificationSettings", JSON.stringify(settings));

  showNotification("Cài đặt email đã được lưu thành công!", "success");
  closeGenericModal(form.closest(".modal-overlay").id);

  console.log("Email settings saved:", settings);
}

// Validation Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  // At least 8 characters, contains uppercase, lowercase, and number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
}

// Event Listeners for Job Modal
if (createJobBtn) {
  createJobBtn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Tạo Thông Báo Việc Làm button clicked");
    openModal();
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

if (cancelBtn) {
  cancelBtn.addEventListener("click", closeModal);
}

// Close modal when clicking outside
if (jobModal) {
  jobModal.addEventListener("click", function (e) {
    if (e.target === jobModal) {
      closeModal();
    }
  });
}

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && jobModal && jobModal.classList.contains("active")) {
    closeModal();
  }
});

// Form Handling for Job Notification
if (jobNotificationForm) {
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
      frequency: document.querySelector('input[name="frequency"]:checked')
        ?.value,
      notification: document.querySelector('input[name="notification"]:checked')
        ?.value,
      receiveNotifications: document.getElementById("receiveNotifications")
        .checked,
    };

    // Validate required fields
    if (!formData.jobTitle.trim()) {
      showNotification("Vui lòng nhập chức danh việc làm!", "error");
      document.getElementById("jobTitle").focus();
      return;
    }

    // Process form data (you can customize this part)
    console.log("Form Data:", formData);

    // Save to localStorage
    const savedNotifications = JSON.parse(
      localStorage.getItem("jobNotifications") || "[]"
    );
    savedNotifications.push({
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(
      "jobNotifications",
      JSON.stringify(savedNotifications)
    );

    // Show success message
    showNotification("Thông báo việc làm đã được tạo thành công!", "success");

    // Reset form and close modal
    jobNotificationForm.reset();
    closeModal();
  });
}

// Account Management Event Listeners
if (setupAccountBtn) {
  setupAccountBtn.addEventListener("click", function (e) {
    e.preventDefault();
    openAccountSetupModal();
  });
}

if (changePasswordBtn) {
  changePasswordBtn.addEventListener("click", function (e) {
    e.preventDefault();
    openChangePasswordModal();
  });
}

if (setupEmailBtn) {
  setupEmailBtn.addEventListener("click", function (e) {
    e.preventDefault();
    openEmailSetupModal();
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

    // Save setting to localStorage
    localStorage.setItem("searchRelevanceSetting", isEnabled);

    // Show feedback
    const message = isEnabled
      ? "Đã bật sắp xếp theo thứ tự liên quan nhất"
      : "Đã tắt sắp xếp theo thứ tự liên quan nhất";

    showNotification(message, "success");
  });

  // Load saved setting
  const savedSetting = localStorage.getItem("searchRelevanceSetting");
  if (savedSetting !== null) {
    searchRelevanceToggle.checked = savedSetting === "true";
  }
}

// Enhanced Utility function to show notifications
function showNotification(message, type = "info", duration = 3000) {
  // Create notification element
  const notification = document.createElement("div");
  notification.textContent = message;

  let bgColor = "var(--primary-blue)";
  let icon = "fas fa-info-circle";

  switch (type) {
    case "success":
      bgColor = "#2ed573";
      icon = "fas fa-check-circle";
      break;
    case "error":
      bgColor = "#ff4757";
      icon = "fas fa-exclamation-circle";
      break;
    case "warning":
      bgColor = "#ffa502";
      icon = "fas fa-exclamation-triangle";
      break;
  }

  notification.innerHTML = `<i class="${icon}"></i> ${message}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${bgColor};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 350px;
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
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "Mobile Developer",
      "Quality Assurance",
      "System Administrator",
      "Network Engineer",
      "Database Administrator",
      "Content Writer",
      "Digital Marketing Specialist",
    ];

    // Create autocomplete dropdown
    const dropdown = document.createElement("div");
    dropdown.className = "autocomplete-dropdown";
    dropdown.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      max-height: 200px;
      overflow-y: auto;
      z-index: 1000;
      display: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;

    const container = jobTitleInput.parentNode;
    container.style.position = "relative";
    container.appendChild(dropdown);

    jobTitleInput.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      if (value.length > 1) {
        const suggestions = commonJobTitles.filter((title) =>
          title.toLowerCase().includes(value)
        );

        if (suggestions.length > 0) {
          dropdown.innerHTML = suggestions
            .map(
              (title) =>
                `<div class="autocomplete-item" style="padding: 8px 12px; cursor: pointer; border-bottom: 1px solid #f0f0f0;" 
             onmouseover="this.style.backgroundColor='#f8f9fa'" 
             onmouseout="this.style.backgroundColor='white'"
             onclick="selectJobTitle('${title}')">${title}</div>`
            )
            .join("");
          dropdown.style.display = "block";
        } else {
          dropdown.style.display = "none";
        }
      } else {
        dropdown.style.display = "none";
      }
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!container.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }

  // Load saved email settings on page load
  const savedEmailSettings = localStorage.getItem("emailNotificationSettings");
  if (savedEmailSettings) {
    console.log("Loaded email settings:", JSON.parse(savedEmailSettings));
  }

  // Load saved job notifications
  const savedNotifications = localStorage.getItem("jobNotifications");
  if (savedNotifications) {
    console.log("Saved job notifications:", JSON.parse(savedNotifications));
  }
});

// Global function for autocomplete
function selectJobTitle(title) {
  const jobTitleInput = document.getElementById("jobTitle");
  const dropdown = document.querySelector(".autocomplete-dropdown");

  if (jobTitleInput) {
    jobTitleInput.value = title;
  }
  if (dropdown) {
    dropdown.style.display = "none";
  }
}

// Add styles for modal and form elements
const additionalStyles = `
<style>
.notification-options {
  margin: 20px 0;
}

.notification-options .checkbox-option {
  display: block;
  margin: 12px 0;
  padding: 8px 0;
}

.password-strength {
  margin: 10px 0;
}

.strength-bar {
  width: 100%;
  height: 6px;
  background-color: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  background-color: #ff4757;
  transition: all 0.3s ease;
  width: 0%;
}

.strength-text {
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.form-hint {
  font-size: 12px;
  color: #6c757d;
  margin-top: 4px;
  display: block;
}

.autocomplete-dropdown::-webkit-scrollbar {
  width: 6px;
}

.autocomplete-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.autocomplete-dropdown::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.autocomplete-dropdown::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
`;

document.head.insertAdjacentHTML("beforeend", additionalStyles);

console.log("Enhanced Profile Detail JavaScript loaded successfully!");
