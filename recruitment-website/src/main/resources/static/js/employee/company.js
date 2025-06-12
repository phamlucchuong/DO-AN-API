document.addEventListener("DOMContentLoaded", function () {
  // Sample data
  let companyData = {
    info: {
      companyName: "TechViet Solutions",
      industry: "Công nghệ Thông tin",
      size: "200-500 nhân viên",
      companyAddress: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      website: "https://techviet.com",
      logo: "https://via.placeholder.com/120x120?text=Logo",
    },
    description:
      "TechViet Solutions là công ty công nghệ hàng đầu, chuyên cung cấp giải pháp phần mềm sáng tạo và dịch vụ CNTT cho doanh nghiệp toàn cầu.",
    branches: [
      { name: "Chi nhánh Hà Nội", address: "456 Lê Lợi, Hoàn Kiếm, Hà Nội" },
      {
        name: "Chi nhánh Đà Nẵng",
        address: "789 Hai Bà Trưng, Hải Châu, Đà Nẵng",
      },
    ],
    jobNotifications: [
      { id: 1, title: "Senior Developer at TechViet", link: "#" },
      { id: 2, title: "Marketing Manager at Digital Innovation", link: "#" },
    ],
  };

  // Load saved data first
  const savedData = loadFromLocalStorage("companyData");
  if (savedData) {
    companyData = savedData;
  }

  // Initialize page data
  initializeCompanyData();

  // Event listeners
  setupEventListeners();

  function initializeCompanyData() {
    // Load company information
    const companyNameEl = document.getElementById("companyName");
    const industryEl = document.getElementById("industry");
    const sizeEl = document.getElementById("size");
    const companyAddressEl = document.getElementById("companyAddress");
    const websiteEl = document.getElementById("website");
    const companyLogoEl = document.getElementById("companyLogo");
    const companyDescriptionEl = document.getElementById("companyDescription");

    if (companyNameEl) companyNameEl.textContent = companyData.info.companyName;
    if (industryEl) industryEl.textContent = companyData.info.industry;
    if (sizeEl) sizeEl.textContent = companyData.info.size;
    if (companyAddressEl)
      companyAddressEl.textContent = companyData.info.companyAddress;
    if (websiteEl) {
      websiteEl.innerHTML = `<a href="${companyData.info.website}" target="_blank">${companyData.info.website}</a>`;
    }
    if (companyLogoEl) companyLogoEl.src = companyData.info.logo;
    if (companyDescriptionEl)
      companyDescriptionEl.textContent = companyData.description;

    // Load branches
    loadBranches();

    // Load job notifications
    loadJobNotifications();
  }

  function loadBranches() {
    const branchesList = document.getElementById("branchesList");
    if (!branchesList) return;

    branchesList.innerHTML = "";
    companyData.branches.forEach((branch) => {
      const branchItem = document.createElement("div");
      branchItem.className = "branch-item";
      branchItem.innerHTML = `
          <div class="branch-name">${branch.name}</div>
          <div class="branch-address">${branch.address}</div>
        `;
      branchesList.appendChild(branchItem);
    });
  }

  function loadJobNotifications() {
    const jobNotificationsList = document.getElementById(
      "jobNotificationsList"
    );
    if (!jobNotificationsList) return;

    jobNotificationsList.innerHTML = "";
    companyData.jobNotifications.forEach((job) => {
      const jobItem = document.createElement("li");
      jobItem.innerHTML = `<a href="${job.link}" class="job-link" data-job-id="${job.id}">${job.title}</a>`;
      jobNotificationsList.appendChild(jobItem);
    });
  }

  function setupEventListeners() {
    // Logo upload functionality
    const uploadLogoBtn = document.querySelector(".upload-logo-btn");
    const uploadLogoInput = document.getElementById("uploadLogoInput");

    if (uploadLogoBtn && uploadLogoInput) {
      uploadLogoBtn.addEventListener("click", () => {
        uploadLogoInput.click();
      });

      uploadLogoInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            companyData.info.logo = event.target.result;
            const logoEl = document.getElementById("companyLogo");
            if (logoEl) logoEl.src = companyData.info.logo;
            saveToLocalStorage("companyData", companyData);
            showMessage("Logo công ty đã được cập nhật");
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Company Info Modal
    setupCompanyInfoModal();

    // Description Modal
    setupDescriptionModal();

    // Branches Modal
    setupBranchesModal();

    // Edit company button
    const editCompanyBtn = document.getElementById("editCompanyBtn");
    if (editCompanyBtn) {
      editCompanyBtn.addEventListener("click", () => {
        showMessage(
          "Chức năng chỉnh sửa công ty tổng quát sẽ được phát triển trong phiên bản tiếp theo"
        );
      });
    }

    // Create job notification button
    const createJobBtn = document.getElementById("createJobBtn");
    if (createJobBtn) {
      createJobBtn.addEventListener("click", () => {
        const newJob = {
          id: companyData.jobNotifications.length + 1,
          title: `Việc làm mới ${companyData.jobNotifications.length + 1}`,
          link: "#",
        };
        companyData.jobNotifications.push(newJob);
        loadJobNotifications();
        saveToLocalStorage("companyData", companyData);
        showMessage("Thông báo việc làm đã được tạo");
      });
    }

    // Job notification links
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("job-link")) {
        e.preventDefault();
        showMessage(`Xem chi tiết việc làm: ${e.target.dataset.jobId}`);
      }
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
    const setupProfileBtn = document.querySelector(".setup-profile-btn");
    if (setupProfileBtn) {
      setupProfileBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showMessage("Tính năng thiết lập hồ sơ sẽ được phát triển");
      });
    }
  }

  function setupCompanyInfoModal() {
    const modal = document.getElementById("editCompanyInfoModal");
    const btn = document.getElementById("editCompanyInfoBtn");
    const form = document.getElementById("editCompanyInfoForm");
    const saveBtn = modal?.querySelector(".modal-save-btn");
    const cancelBtn = modal?.querySelector(".modal-cancel-btn");
    const closeBtn = modal?.querySelector(".modal-close-btn");

    if (!modal || !btn || !form || !saveBtn || !cancelBtn || !closeBtn) return;

    // Open modal
    btn.addEventListener("click", () => {
      modal.style.display = "flex";

      // Populate form fields
      const companyNameInput = document.getElementById("editCompanyName");
      const industryInput = document.getElementById("editIndustry");
      const sizeInput = document.getElementById("editSize");
      const addressInput = document.getElementById("editCompanyAddress");
      const websiteInput = document.getElementById("editWebsite");

      if (companyNameInput)
        companyNameInput.value = companyData.info.companyName;
      if (industryInput) industryInput.value = companyData.info.industry;
      if (sizeInput) sizeInput.value = companyData.info.size;
      if (addressInput) addressInput.value = companyData.info.companyAddress;
      if (websiteInput) websiteInput.value = companyData.info.website;
    });

    // Save changes
    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      companyData.info = {
        companyName:
          formData.get("companyName") || companyData.info.companyName,
        industry: formData.get("industry") || companyData.info.industry,
        size: formData.get("size") || companyData.info.size,
        companyAddress:
          formData.get("companyAddress") || companyData.info.companyAddress,
        website: formData.get("website") || companyData.info.website,
        logo: companyData.info.logo,
      };

      initializeCompanyData();
      saveToLocalStorage("companyData", companyData);
      modal.style.display = "none";
      showMessage("Thông tin công ty đã được cập nhật");
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  function setupDescriptionModal() {
    const modal = document.getElementById("editDescriptionModal");
    const btn = document.getElementById("editDescriptionBtn");
    const form = document.getElementById("editDescriptionForm");
    const saveBtn = modal?.querySelector(".modal-save-btn");
    const cancelBtn = modal?.querySelector(".modal-cancel-btn");
    const closeBtn = modal?.querySelector(".modal-close-btn");

    if (!modal || !btn || !form || !saveBtn || !cancelBtn || !closeBtn) return;

    // Open modal
    btn.addEventListener("click", () => {
      modal.style.display = "flex";
      const descriptionInput = document.getElementById(
        "editCompanyDescription"
      );
      if (descriptionInput) {
        descriptionInput.value = companyData.description;
      }
    });

    // Save changes
    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const newDescription = formData.get("companyDescription");

      if (newDescription) {
        companyData.description = newDescription;
        const descriptionEl = document.getElementById("companyDescription");
        if (descriptionEl) {
          descriptionEl.textContent = companyData.description;
        }
        saveToLocalStorage("companyData", companyData);
        modal.style.display = "none";
        showMessage("Mô tả công ty đã được cập nhật");
      }
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  function setupBranchesModal() {
    const modal = document.getElementById("editBranchesModal");
    const btn = document.getElementById("editBranchesBtn");
    const form = document.getElementById("editBranchesForm");
    const saveBtn = modal?.querySelector(".modal-save-btn");
    const cancelBtn = modal?.querySelector(".modal-cancel-btn");
    const closeBtn = modal?.querySelector(".modal-close-btn");
    const addBtn = document.getElementById("addBranchBtn");

    if (
      !modal ||
      !btn ||
      !form ||
      !saveBtn ||
      !cancelBtn ||
      !closeBtn ||
      !addBtn
    )
      return;

    // Open modal
    btn.addEventListener("click", () => {
      modal.style.display = "flex";
      const entriesContainer = document.getElementById("branchesEntries");
      if (entriesContainer) {
        entriesContainer.innerHTML = "";
        companyData.branches.forEach((branch, index) => {
          addBranchEntry(branch, index);
        });
      }
    });

    // Add new branch entry
    addBtn.addEventListener("click", () => {
      addBranchEntry({ name: "", address: "" }, companyData.branches.length);
    });

    // Save changes
    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const entries = document.querySelectorAll(
        "#branchesEntries .entry-group"
      );
      const updatedBranches = [];

      entries.forEach((entry) => {
        const nameInput = entry.querySelector("[name='branchName']");
        const addressInput = entry.querySelector("[name='branchAddress']");
        const name = nameInput?.value?.trim();
        const address = addressInput?.value?.trim();

        if (name && address) {
          updatedBranches.push({ name, address });
        }
      });

      companyData.branches = updatedBranches;
      loadBranches();
      saveToLocalStorage("companyData", companyData);
      modal.style.display = "none";
      showMessage("Chi nhánh đã được cập nhật");
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  function addBranchEntry(branch, index) {
    const entriesContainer = document.getElementById("branchesEntries");
    if (!entriesContainer) return;

    const entryDiv = document.createElement("div");
    entryDiv.className = "entry-group";
    entryDiv.innerHTML = `
        <button type="button" class="remove-entry-btn"><i class="fas fa-trash"></i></button>
        <div class="form-group">
          <label>Tên chi nhánh:</label>
          <input type="text" name="branchName" value="${
            branch.name || ""
          }" required>
        </div>
        <div class="form-group">
          <label>Địa chỉ:</label>
          <input type="text" name="branchAddress" value="${
            branch.address || ""
          }" required>
        </div>
      `;

    const removeBtn = entryDiv.querySelector(".remove-entry-btn");
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        entryDiv.remove();
      });
    }

    entriesContainer.appendChild(entryDiv);
  }

  function showMessage(message) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll(
      ".notification-message"
    );
    existingNotifications.forEach((n) => n.remove());

    const notification = document.createElement("div");
    notification.className = "notification-message";
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
        animation: slideIn 0.3s ease-out;
      `;

    // Add CSS animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideIn 0.3s ease-out reverse";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  function saveToLocalStorage(key, data) {
    try {
      // In artifact environment, we'll just store in memory
      window[key] = data;
      return true;
    } catch (e) {
      console.error("Error saving data:", e);
      return false;
    }
  }

  function loadFromLocalStorage(key) {
    try {
      // In artifact environment, load from memory
      return window[key] || null;
    } catch (e) {
      console.error("Error loading data:", e);
      return null;
    }
  }
});
