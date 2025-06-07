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

  // Initialize page data
  initializeCompanyData();

  // Event listeners
  setupEventListeners();

  function initializeCompanyData() {
    // Load company information
    document.getElementById("companyName").textContent =
      companyData.info.companyName;
    document.getElementById("industry").textContent = companyData.info.industry;
    document.getElementById("size").textContent = companyData.info.size;
    document.getElementById("companyAddress").textContent =
      companyData.info.companyAddress;
    document.getElementById(
      "website"
    ).innerHTML = `<a href="${companyData.info.website}" target="_blank">${companyData.info.website}</a>`;
    document.getElementById("companyLogo").src = companyData.info.logo;

    // Load company description
    document.getElementById("companyDescription").textContent =
      companyData.description;

    // Load branches
    loadBranches();

    // Load job notifications
    loadJobNotifications();
  }

  function loadBranches() {
    const branchesList = document.getElementById("branchesList");
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
    jobNotificationsList.innerHTML = "";
    companyData.jobNotifications.forEach((job) => {
      const jobItem = document.createElement("li");
      jobItem.innerHTML = `<a href="${job.link}" class="job-link" data-job-id="${job.id}">${job.title}</a>`;
      jobNotificationsList.appendChild(jobItem);
    });
  }

  function setupEventListeners() {
    const modals = {
      companyInfo: {
        modal: document.getElementById("editCompanyInfoModal"),
        btn: document.getElementById("editCompanyInfoBtn"),
        form: document.getElementById("editCompanyInfoForm"),
        saveBtn: document.querySelector(
          "#editCompanyInfoModal .modal-save-btn"
        ),
        cancelBtn: document.querySelector(
          "#editCompanyInfoModal .modal-cancel-btn"
        ),
        closeBtn: document.querySelector(
          "#editCompanyInfoModal .modal-close-btn"
        ),
      },
      description: {
        modal: document.getElementById("editDescriptionModal"),
        btn: document.getElementById("editDescriptionBtn"),
        form: document.getElementById("editDescriptionForm"),
        saveBtn: document.querySelector(
          "#editDescriptionModal .modal-save-btn"
        ),
        cancelBtn: document.querySelector(
          "#editDescriptionModal .modal-cancel-btn"
        ),
        closeBtn: document.querySelector(
          "#editDescriptionModal .modal-close-btn"
        ),
      },
      branches: {
        modal: document.getElementById("editBranchesModal"),
        btn: document.getElementById("editBranchesBtn"),
        form: document.getElementById("editBranchesForm"),
        saveBtn: document.querySelector("#editBranchesModal .modal-save-btn"),
        cancelBtn: document.querySelector(
          "#editBranchesModal .modal-cancel-btn"
        ),
        closeBtn: document.querySelector("#editBranchesModal .modal-close-btn"),
        addBtn: document.getElementById("addBranchBtn"),
      },
    };

    // Logo upload
    const uploadLogoBtn = document.querySelector(".upload-logo-btn");
    const uploadLogoInput = document.getElementById("uploadLogoInput");
    uploadLogoBtn.addEventListener("click", () => uploadLogoInput.click());
    uploadLogoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          companyData.info.logo = event.target.result;
          document.getElementById("companyLogo").src = companyData.info.logo;
          saveToLocalStorage("companyData", companyData);
          showMessage("Logo công ty đã được cập nhật");
        };
        reader.readAsDataURL(file);
      }
    });

    // Company info modal
    modals.companyInfo.btn.addEventListener("click", () => {
      modals.companyInfo.modal.style.display = "flex";
      document.getElementById("editCompanyName").value =
        companyData.info.companyName;
      document.getElementById("editIndustry").value = companyData.info.industry;
      document.getElementById("editSize").value = companyData.info.size;
      document.getElementById("editCompanyAddress").value =
        companyData.info.companyAddress;
      document.getElementById("editWebsite").value = companyData.info.website;
    });
    modals.companyInfo.saveBtn.addEventListener("click", () => {
      const formData = new FormData(modals.companyInfo.form);
      const updatedData = {
        companyName: formData.get("companyName"),
        industry: formData.get("industry"),
        size: formData.get("size"),
        companyAddress: formData.get("companyAddress"),
        website: formData.get("website"),
        logo: companyData.info.logo,
      };
      companyData.info = updatedData;
      initializeCompanyData();
      saveToLocalStorage("companyData", companyData);
      modals.companyInfo.modal.style.display = "none";
      showMessage("Thông tin công ty đã được cập nhật");
    });

    // Description modal
    modals.description.btn.addEventListener("click", () => {
      modals.description.modal.style.display = "flex";
      document.getElementById("editCompanyDescription").value =
        companyData.description;
    });
    modals.description.saveBtn.addEventListener("click", () => {
      const formData = new FormData(modals.description.form);
      companyData.description = formData.get("companyDescription");
      document.getElementById("companyDescription").textContent =
        companyData.description;
      saveToLocalStorage("companyData", companyData);
      modals.description.modal.style.display = "none";
      showMessage("Mô tả công ty đã được cập nhật");
    });

    // Branches modal
    modals.branches.btn.addEventListener("click", () => {
      modals.branches.modal.style.display = "flex";
      const entriesContainer = document.getElementById("branchesEntries");
      entriesContainer.innerHTML = "";
      companyData.branches.forEach((branch, index) => {
        addBranchEntry(branch, index);
      });
    });
    modals.branches.addBtn.addEventListener("click", () => {
      addBranchEntry({ name: "", address: "" }, companyData.branches.length);
    });
    modals.branches.saveBtn.addEventListener("click", () => {
      const entries = document.querySelectorAll(
        "#branchesEntries .entry-group"
      );
      const updatedBranches = [];
      entries.forEach((entry) => {
        const name = entry.querySelector("[name='branchName']").value;
        const address = entry.querySelector("[name='branchAddress']").value;
        if (name && address) {
          updatedBranches.push({ name, address });
        }
      });
      companyData.branches = updatedBranches;
      loadBranches();
      saveToLocalStorage("companyData", companyData);
      modals.branches.modal.style.display = "none";
      showMessage("Chi nhánh đã được cập nhật");
    });

    // Close and cancel buttons for all modals
    Object.values(modals).forEach((modal) => {
      modal.closeBtn.addEventListener("click", () => {
        modal.modal.style.display = "none";
      });
      modal.cancelBtn.addEventListener("click", () => {
        modal.modal.style.display = "none";
      });
    });

    // Edit company button
    document.getElementById("editCompanyBtn").addEventListener("click", () => {
      showMessage(
        "Chức năng chỉnh sửa công ty tổng quát sẽ được phát triển trong phiên bản tiếp theo"
      );
    });

    // Job notification links
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("job-link")) {
        e.preventDefault();
        showMessage(`Xem chi tiết việc làm: ${e.target.dataset.jobId}`);
      }
    });

    // Create job notification button
    document.getElementById("createJobBtn").addEventListener("click", () => {
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

  function addBranchEntry(branch, index) {
    const entriesContainer = document.getElementById("branchesEntries");
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry-group";
    entryDiv.innerHTML = `
        <button type="button" class="remove-entry-btn"><i class="fas fa-trash"></i></button>
        <div class="form-group">
          <label>Tên chi nhánh:</label>
          <input type="text" name="branchName" value="${branch.name}" required>
        </div>
        <div class="form-group">
          <label>Địa chỉ:</label>
          <input type="text" name="branchAddress" value="${branch.address}" required>
        </div>
      `;
    entryDiv
      .querySelector(".remove-entry-btn")
      .addEventListener("click", () => {
        entryDiv.remove();
      });
    entriesContainer.appendChild(entryDiv);
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

  const savedData = loadFromLocalStorage("companyData");
  if (savedData) {
    companyData = savedData;
    initializeCompanyData();
  }
});
