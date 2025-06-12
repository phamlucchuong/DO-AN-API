import { logout } from '../firebase/firebase-auth.js';


// Khai báo profileData để tránh lỗi
let profileData = {
  personal: {
    photo: "",
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
  },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  jobNotifications: [],
};

// Hàm chuyển đổi định dạng ngày
function convertDateToISO(dateString) {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function convertDateFromISO(isoString) {
  const [year, month, day] = isoString.split("-");
  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}

// Personal data
async function getPersonal(id) {
  try {
    const response = await fetch(`/api/employee/${id}/personal`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("profile.js-loadPersonal: không lấy được data");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Lỗi khi tải profile:", error);
  }
}

async function loadPersonal(id) {
  const personalData = await getPersonal(id);
  if (!personalData) {
    console.error("Không có dữ liệu personal.");
    return;
  }

  document.getElementById("fullName").textContent = personalData.name;
  document.getElementById("email").textContent = personalData.email;
  document.getElementById("phone").textContent = personalData.phone;
  document.getElementById("birthday").textContent = convertDateFromISO(
    personalData.dateOfBirth
  );
  document.getElementById("gender").textContent =
    personalData.gender === "MALE" ? "Nam" : "Nữ";
  document.getElementById("address").textContent = personalData.address;
  document.getElementById("sidebarName").textContent = personalData.name;
}

async function updatePersonal(id, method, data) {
  try {
    const response = await fetch(`/api/employee/${id}/personal`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("profile.js-updatePersonal: không thể cập nhật personal");
    }

    console.log("Cập nhật personal thành công!");
    loadPersonal(id);
  } catch (error) {
    console.error("Lỗi khi tải profile:", error);
  }
}

// Career objective
async function loadCareerObjective(id) {
  try {
    const response = await fetch(`/api/employee/${id}/career-objective`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("profile.js-loadCareerObjective: không lấy được data");
    }

    const data = await response.text();
    document.getElementById("careerObjective").textContent =
      data || "Chưa có mục tiêu nghề nghiệp";
  } catch (error) {
    console.error("Lỗi khi tải careerObjective:", error);
  }
}

async function updateCareerObjective(id) {
  const careerObjective = document.getElementById("editCareerObjective").value;

  try {
    const response = await fetch(`/api/employee/${id}/career-objective`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(careerObjective),
    });

    if (!response.ok) {
      throw new Error(
        "profile.js-updateCareerObjective: không cập nhật được data"
      );
    }

    console.log("Cập nhật mục tiêu nghề nghiệp thành công!");
    localStorage.setItem("careerObjective", careerObjective);
    loadCareerObjective(id);
  } catch (error) {
    console.error("Lỗi khi cập nhật careerObjective:", error);
  }
}

// Experience
async function loadExperience(id) {
  try {
    const response = await fetch(`/api/employee/${id}/work-experience`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("profile.js-loadExperience: không lấy được data");
    }

    const experiences = await response.json();

    const experienceList = document.getElementById("experienceList");
    experienceList.innerHTML = "";

    if (!experiences || experiences.length === 0) {
      experienceList.innerHTML = "<p>Bạn chưa có kinh nghiệm làm việc nào</p>";
      return;
    }

    experiences.forEach((exp) => {
      const experienceItem = document.createElement("div");
      experienceItem.className = "experience-item";
      experienceItem.innerHTML = `
        <div class="experience-timeline">
          <div class="experience-duration">${exp.period}</div>
        </div>
        <div class="experience-details">
          <div class="experience-title">${exp.role}</div>
          <div class="experience-company"><a href="#" class="company-link" data-company="${exp.company}">${exp.company}</a></div>
          <div class="experience-description">${exp.description}</div>
        </div>
      `;
      experienceList.appendChild(experienceItem);
    });
  } catch (error) {
    console.error("Lỗi khi tải experience:", error);
  }
}

async function postExperience(id, formData) {
  try {
    const response = await fetch(`/api/employee/${id}/work-experience`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("profile.js-postExperience: không thêm được data");
    }

    console.log("thêm experience thành công");
    loadExperience(id);
  } catch (error) {
    console.error("Lỗi khi post experience:", error);
  }
}

// Education
async function loadEducation(id) {
  try {
    const response = await fetch(`/api/employee/${id}/education`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("profile.js-loadEducation: không lấy được data");
    }

    const education = await response.json();

    const educationList = document.getElementById("educationList");
    educationList.innerHTML = "";

    if (!education || education.length === 0) {
      educationList.innerHTML = "<p>Bạn chưa có thông tin học vấn nào</p>";
      return;
    }

    education.forEach((edu) => {
      const educationItem = document.createElement("div");
      educationItem.className = "education-item";
      educationItem.innerHTML = `
        <div class="education-year">${edu.period}</div>
        <div class="education-details">
          <div class="education-degree">${edu.major}</div>
          <div class="education-school">${edu.school}</div>
        </div>
      `;
      educationList.appendChild(educationItem);
    });
  } catch (error) {
    console.error("Lỗi khi tải education:", error);
  }
}

async function postEducation(id, data) {
  try {
    const response = await fetch(`/api/employee/${id}/education`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("profile.js-postEducation: không thêm được education");
    }

    console.log("post education thành công");
    loadEducation(id);
  } catch (error) {
    console.error("Lỗi khi tải education:", error);
  }
}

// Skill
async function loadSkills(id) {
  try {
    const response = await fetch(`/api/employee/${id}/skill`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("profile.js-loadSkills: không lấy được data");
    }

    const skills = await response.json();

    const skillsList = document.getElementById("skillsList");
    skillsList.innerHTML = "";

    if (!skills || skills.length === 0) {
      skillsList.innerHTML = "<p>Bạn chưa có kỹ năng nào</p>";
      return;
    }

    skills.forEach((skill) => {
      const skillItem = document.createElement("div");
      skillItem.className = "skill-item";
      skillItem.innerHTML = `
        <div class="skill-name">${skill.name}</div>
        <div class="skill-level">
          <div class="skill-bar">
            <div class="skill-progress" style="width: ${skill.level}%"></div>
          </div>
          <div class="skill-percentage">${skill.level}%</div>
        </div>
      `;
      skillsList.appendChild(skillItem);
    });
  } catch (error) {
    console.error("Lỗi khi tải skills:", error);
  }
}

async function postSkill(id, data) {
  try {
    const response = await fetch(`/api/employee/${id}/skill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("profile.js-postSkill: không thêm được skill");
    }

    console.log("post skill thành công");
    loadSkills(id);
  } catch (error) {
    console.error("Lỗi khi tải skill:", error);
  }
}

// Languages
async function loadLanguages(id) {
  try {
    const response = await fetch(`/api/employee/${id}/language`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("profile.js-loadLanguages: không lấy được data");
    }

    const languages = await response.json();

    const languagesList = document.getElementById("languagesList");
    languagesList.innerHTML = "";

    if (!languages || languages.length === 0) {
      languagesList.innerHTML = "<p>Bạn chưa có ngôn ngữ nào</p>";
      return;
    }

    languages.forEach((lang) => {
      const languageItem = document.createElement("div");
      languageItem.className = "language-item";
      languageItem.innerHTML = `
        <div class="language-name">${lang.name}</div>
        <div class="language-level">${lang.level}</div>
      `;
      languagesList.appendChild(languageItem);
    });
  } catch (error) {
    console.error("Lỗi khi tải languages:", error);
  }
}

async function postLanguage(id, data) {
  try {
    const response = await fetch(`/api/employee/${id}/language`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("profile.js-postLanguage: không thêm được language");
    }

    console.log("post language thành công");
    loadLanguages(id);
  } catch (error) {
    console.error("Lỗi khi tải language:", error);
  }
}

// Profile page JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  const uid = localStorage.getItem("uid");

  // Initialize page data
  initializeProfileData();
  // Event listeners
  setupEventListeners();

  // Functions
  async function initializeProfileData() {
    if (!uid) {
      console.error("UID không tồn tại trong localStorage");
      showMessage("Vui lòng đăng nhập lại");
      return;
    }

    try {
      const response = await fetch(`/api/employee/${uid}/exists`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const exists = await response.json();

      if (!exists) {
        console.log("Employee chưa được tạo");
        localStorage.setItem("isUpdate", "false");
        return;
      }

      localStorage.setItem("isUpdate", "true");
      loadPersonal(uid);
      loadCareerObjective(uid);
      loadExperience(uid);
      loadEducation(uid);
      loadSkills(uid);
      loadLanguages(uid);
    } catch (error) {
      console.error("Lỗi khi kiểm tra uid:", error);
    }
  }

  function setupEventListeners() {
    // Modal elements
    const modals = {
      personal: {
        modal: document.getElementById("editPersonalModal"),
        btn: document.getElementById("editPersonalBtn"),
        form: document.getElementById("editPersonalForm"),
        saveBtn: document.querySelector("#editPersonalModal .modal-save-btn"),
        cancelBtn: document.querySelector(
          "#editPersonalModal .modal-cancel-btn"
        ),
        closeBtn: document.querySelector("#editPersonalModal .modal-close-btn"),
      },
      objective: {
        modal: document.getElementById("editObjectiveModal"),
        btn: document.getElementById("editObjectiveBtn"),
        form: document.getElementById("editObjectiveForm"),
        saveBtn: document.querySelector("#editObjectiveModal .modal-save-btn"),
        cancelBtn: document.querySelector(
          "#editObjectiveModal .modal-cancel-btn"
        ),
        closeBtn: document.querySelector(
          "#editObjectiveModal .modal-close-btn"
        ),
      },
      experience: {
        modal: document.getElementById("editExperienceModal"),
        btn: document.getElementById("editExperienceBtn"),
        form: document.getElementById("editExperienceForm"),
        saveBtn: document.querySelector("#editExperienceModal .modal-save-btn"),
        cancelBtn: document.querySelector(
          "#editExperienceModal .modal-cancel-btn"
        ),
        closeBtn: document.querySelector(
          "#editExperienceModal .modal-close-btn"
        ),
        addBtn: document.getElementById("addExperienceBtn"),
      },
      education: {
        modal: document.getElementById("editEducationModal"),
        btn: document.getElementById("editEducationBtn"),
        form: document.getElementById("editEducationForm"),
        saveBtn: document.querySelector("#editEducationModal .modal-save-btn"),
        cancelBtn: document.querySelector(
          "#editEducationModal .modal-cancel-btn"
        ),
        closeBtn: document.querySelector(
          "#editEducationModal .modal-close-btn"
        ),
        addBtn: document.getElementById("addEducationBtn"),
      },
      skills: {
        modal: document.getElementById("editSkillsModal"),
        btn: document.getElementById("editSkillsBtn"),
        form: document.getElementById("editSkillsForm"),
        saveBtn: document.querySelector("#editSkillsModal .modal-save-btn"),
        cancelBtn: document.querySelector("#editSkillsModal .modal-cancel-btn"),
        closeBtn: document.querySelector("#editSkillsModal .modal-close-btn"),
        addBtn: document.getElementById("addSkillBtn"),
      },
      languages: {
        modal: document.getElementById("editLanguagesModal"),
        btn: document.getElementById("editLanguagesBtn"),
        form: document.getElementById("editLanguagesForm"),
        saveBtn: document.querySelector("#editLanguagesModal .modal-save-btn"),
        cancelBtn: document.querySelector(
          "#editLanguagesModal .modal-cancel-btn"
        ),
        closeBtn: document.querySelector(
          "#editLanguagesModal .modal-close-btn"
        ),
        addBtn: document.getElementById("addLanguageBtn"),
      },
    };

    // Delete account modal
    const deleteAccountBtn = document.getElementById("deleteaccount");
    const deleteAccountModal = document.getElementById("deleteAccountModal");
    const deleteModalCloseBtn =
      deleteAccountModal?.querySelector(".modal-close-btn");
    const deleteModalCancelBtn =
      deleteAccountModal?.querySelector(".modal-cancel-btn");
    const deleteModalConfirmBtn = deleteAccountModal?.querySelector(
      ".modal-confirm-delete-btn"
    );

    if (
      deleteAccountBtn &&
      deleteAccountModal &&
      deleteModalCloseBtn &&
      deleteModalCancelBtn &&
      deleteModalConfirmBtn
    ) {
      // Hiển thị modal khi nhấn nút Xóa tài khoản
      deleteAccountBtn.addEventListener("click", () => {
        deleteAccountModal.style.display = "flex";
      });

      // Đóng modal khi nhấn nút Đóng hoặc Hủy
      deleteModalCloseBtn.addEventListener("click", () => {
        deleteAccountModal.style.display = "none";
      });
      deleteModalCancelBtn.addEventListener("click", () => {
        deleteAccountModal.style.display = "none";
      });

      // Xử lý xóa tài khoản khi nhấn Xóa
      deleteModalConfirmBtn.addEventListener("click", async () => {
        try {
          if (!uid) {
            showMessage("Vui lòng đăng nhập lại");
            deleteAccountModal.style.display = "none";
            return;
          }

          const response = await fetch(`/api/employee/${uid}/delete`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          
          if (!response.ok) {
            throw new Error("Không thể xóa tài khoản");
          }
          
          localStorage.removeItem("uid");
          localStorage.removeItem("isUpdate");
          localStorage.removeItem("profileData");
          localStorage.removeItem("careerObjective");
          
          deleteAccountModal.style.display = "none";
          showMessage("Tài khoản đã được xóa thành công");
          setTimeout(() => {
            logout();
            // window.location.href = "/login";
          }, 2000);
        } catch (error) {
          console.error("Lỗi khi xóa tài khoản:", error);
          deleteAccountModal.style.display = "none";
          showMessage("Đã xảy ra lỗi khi xóa tài khoản");
        }
      });
    } else {
      console.error(
        "Nút deleteaccount hoặc các thành phần modal không tồn tại trong DOM"
      );
    }

    // Photo upload
    const uploadPhotoBtn = document.querySelector(".upload-photo-btn");
    const uploadPhotoInput = document.getElementById("uploadPhotoInput");
    uploadPhotoBtn.addEventListener("click", () => uploadPhotoInput.click());
    uploadPhotoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          profileData.personal.photo = event.target.result;
          document.getElementById("profileAvatar").src =
            profileData.personal.photo;
          document.getElementById("profilePhoto").src =
            profileData.personal.photo;
          saveToLocalStorage("profileData", profileData);
          showMessage("Ảnh đại diện đã được cập nhật");
        };
        reader.readAsDataURL(file);
      }
    });

    // Personal info modal
    modals.personal.btn.addEventListener("click", async () => {
      modals.personal.modal.style.display = "flex";
      const personalData = await getPersonal(uid);
      document.getElementById("editFullName").value = personalData.name;
      document.getElementById("editEmail").value = personalData.email;
      document.getElementById("editPhone").value = personalData.phone;
      document.getElementById("editBirthday").value = convertDateFromISO(
        personalData.dateOfBirth
      );
      document.getElementById("editGender").value =
        personalData.gender === "MALE" ? "Nam" : "Nữ";
      document.getElementById("editAddress").value = personalData.address;
    });

    // Add personal event
    modals.personal.saveBtn.addEventListener("click", () => {
      const formData = new FormData(modals.personal.form);
      const updatedData = {
        name: formData.get("fullName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        dateOfBirth: convertDateToISO(formData.get("birthday")),
        gender: formData.get("gender") === "Nam" ? "MALE" : "FEMALE",
        address: formData.get("address"),
      };
      if (!validateEmail(updatedData.email)) {
        showMessage("Email không hợp lệ");
        return;
      }
      if (!validatePhone(updatedData.phone)) {
        showMessage("Số điện thoại không hợp lệ");
        return;
      }

      updatePersonal(
        uid,
        localStorage.getItem("isUpdate") === "true" ? "PUT" : "POST",
        updatedData
      );

      saveToLocalStorage("profileData", profileData);
      modals.personal.modal.style.display = "none";
      showMessage("Thông tin cá nhân đã được cập nhật");
    });

    // Career objective modal
    modals.objective.btn.addEventListener("click", () => {
      modals.objective.modal.style.display = "flex";
      document.getElementById("editCareerObjective").value =
        localStorage.getItem("careerObjective") || "";
    });

    modals.objective.saveBtn.addEventListener("click", () => {
      updateCareerObjective(uid);
      modals.objective.modal.style.display = "none";
      showMessage("Mục tiêu nghề nghiệp đã được cập nhật");
    });

    // Experience modal
    modals.experience.btn.addEventListener("click", () => {
      modals.experience.modal.style.display = "flex";
      const entriesContainer = document.getElementById("experienceEntries");
      entriesContainer.innerHTML = "";
      profileData.experiences.forEach((exp, index) => {
        addExperienceEntry(exp, index);
      });
    });
    modals.experience.addBtn.addEventListener("click", () => {
      addExperienceEntry(
        { title: "", company: "", duration: "", description: "" },
        profileData.experiences.length
      );
    });
    modals.experience.saveBtn.addEventListener("click", () => {
      const entries = document.querySelectorAll(
        "#experienceEntries .entry-group"
      );
      entries.forEach((entry) => {
        const title = entry.querySelector("[name='title']").value;
        const company = entry.querySelector("[name='company']").value;
        const duration = entry.querySelector("[name='duration']").value;
        const description = entry.querySelector("[name='description']").value;
        if (title && company && duration && description) {
          const formData = {
            role: title,
            company: company,
            period: duration,
            description: description,
          };
          postExperience(uid, formData);
        }
      });
      modals.experience.modal.style.display = "none";
      showMessage("Kinh nghiệm làm việc đã được cập nhật");
    });

    // Education modal
    modals.education.btn.addEventListener("click", () => {
      modals.education.modal.style.display = "flex";
      const entriesContainer = document.getElementById("educationEntries");
      entriesContainer.innerHTML = "";
      profileData.education.forEach((edu, index) => {
        addEducationEntry(edu, index);
      });
    });
    modals.education.addBtn.addEventListener("click", () => {
      addEducationEntry(
        { degree: "", school: "", year: "" },
        profileData.education.length
      );
    });
    modals.education.saveBtn.addEventListener("click", () => {
      const entries = document.querySelectorAll(
        "#educationEntries .entry-group"
      );
      entries.forEach((entry) => {
        const degree = entry.querySelector("[name='degree']").value;
        const school = entry.querySelector("[name='school']").value;
        const year = entry.querySelector("[name='year']").value;
        if (degree && school && year) {
          const data = {
            major: degree,
            school: school,
            period: year,
          };
          postEducation(uid, data);
        }
      });
      modals.education.modal.style.display = "none";
      showMessage("Học vấn đã được cập nhật");
    });

    // Skills modal
    modals.skills.btn.addEventListener("click", () => {
      modals.skills.modal.style.display = "flex";
      const entriesContainer = document.getElementById("skillsEntries");
      entriesContainer.innerHTML = "";
      profileData.skills.forEach((skill, index) => {
        addSkillEntry(skill, index);
      });
    });
    modals.skills.addBtn.addEventListener("click", () => {
      addSkillEntry({ name: "", level: 50 }, profileData.skills.length);
    });
    modals.skills.saveBtn.addEventListener("click", () => {
      const entries = document.querySelectorAll("#skillsEntries .entry-group");
      entries.forEach((entry) => {
        const name = entry.querySelector("[name='skillName']").value;
        const level = parseInt(
          entry.querySelector("[name='skillLevel']").value
        );
        if (name && level >= 0 && level <= 100) {
          const data = {
            name: name,
            level: level,
          };
          postSkill(uid, data);
        }
      });
      modals.skills.modal.style.display = "none";
      showMessage("Kỹ năng đã được cập nhật");
    });

    // Languages modal
    modals.languages.btn.addEventListener("click", () => {
      modals.languages.modal.style.display = "flex";
      const entriesContainer = document.getElementById("languagesEntries");
      entriesContainer.innerHTML = "";
      profileData.languages.forEach((lang, index) => {
        addLanguageEntry(lang, index);
      });
    });
    modals.languages.addBtn.addEventListener("click", () => {
      addLanguageEntry({ name: "", level: "" }, profileData.languages.length);
    });
    modals.languages.saveBtn.addEventListener("click", () => {
      const entries = document.querySelectorAll(
        "#languagesEntries .entry-group"
      );
      entries.forEach((entry) => {
        const name = entry.querySelector("[name='languageName']").value;
        const level = entry.querySelector("[name='languageLevel']").value;
        let languageLevel;
        switch (level) {
          case "Bản ngữ":
            languageLevel = "NATIVE";
            break;
          case "Thành thạo":
            languageLevel = "FLUENT";
            break;
          case "Cơ bản":
            languageLevel = "BASIC";
            break;
          default:
            break;
        }

        if (name && level) {
          const data = {
            name: name,
            level: languageLevel,
          };
          postLanguage(uid, data);
        }
      });
      modals.languages.modal.style.display = "none";
      showMessage("Ngoại ngữ đã được cập nhật");
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

    // Edit profile button
    document.getElementById("editProfileBtn").addEventListener("click", () => {
      showMessage(
        "Chức năng chỉnh sửa hồ sơ tổng quát sẽ được phát triển trong phiên bản tiếp theo"
      );
    });

    // Company links
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("company-link")) {
        e.preventDefault();
        showMessage(`Xem chi tiết công ty: ${e.target.dataset.company}`);
      }
    });

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
    document
      .querySelector(".setup-profile-btn")
      .addEventListener("click", (e) => {
        e.preventDefault();
        showMessage("Tính năng thiết lập hồ sơ sẽ được phát triển");
      });
  }

  function addExperienceEntry(exp, index) {
    const entriesContainer = document.getElementById("experienceEntries");
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry-group";
    entryDiv.innerHTML = `
      <button type="button" class="remove-entry-btn"><i class="fas fa-trash"></i></button>
      <div class="form-group">
        <label>Chức vụ:</label>
        <input type="text" name="title" value="${exp.title}" required>
      </div>
      <div class="form-group">
        <label>Công ty:</label>
        <input type="text" name="company" value="${exp.company}" required>
      </div>
      <div class="form-group">
        <label>Thời gian:</label>
        <input type="text" name="duration" value="${exp.duration}" required>
      </div>
      <div class="form-group">
        <label>Mô tả:</label>
        <textarea name="description" rows="4" required>${exp.description}</textarea>
      </div>
    `;
    entryDiv
      .querySelector(".remove-entry-btn")
      .addEventListener("click", () => {
        entryDiv.remove();
      });
    entriesContainer.appendChild(entryDiv);
  }

  function addEducationEntry(edu, index) {
    const entriesContainer = document.getElementById("educationEntries");
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry-group";
    entryDiv.innerHTML = `
      <button type="button" class="remove-entry-btn"><i class="fas fa-trash"></i></button>
      <div class="form-group">
        <label>Bằng cấp:</label>
        <input type="text" name="degree" value="${edu.degree}" required>
      </div>
      <div class="form-group">
        <label>Trường học:</label>
        <input type="text" name="school" value="${edu.school}" required>
      </div>
      <div class="form-group">
        <label>Năm:</label>
        <input type="text" name="year" value="${edu.year}" required>
      </div>
    `;
    entryDiv
      .querySelector(".remove-entry-btn")
      .addEventListener("click", () => {
        entryDiv.remove();
      });
    entriesContainer.appendChild(entryDiv);
  }

  function addSkillEntry(skill, index) {
    const entriesContainer = document.getElementById("skillsEntries");
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry-group";
    entryDiv.innerHTML = `
      <button type="button" class="remove-entry-btn"><i class="fas fa-trash"></i></button>
      <div class="form-group">
        <label>Tên kỹ năng:</label>
        <input type="text" name="skillName" value="${skill.name}" required>
      </div>
      <div class="form-group">
        <label>Mức độ (%):</label>
        <input type="number" name="skillLevel" value="${skill.level}" min="0" max="100" required>
      </div>
    `;
    entryDiv
      .querySelector(".remove-entry-btn")
      .addEventListener("click", () => {
        entryDiv.remove();
      });
    entriesContainer.appendChild(entryDiv);
  }

  function addLanguageEntry(lang, index) {
    const entriesContainer = document.getElementById("languagesEntries");
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry-group";
    entryDiv.innerHTML = `
      <button type="button" class="remove-entry-btn"><i class="fas fa-trash"></i></button>
      <div class="form-group">
        <label>Tên ngôn ngữ:</label>
        <input type="text" name="languageName" value="${lang.name}" required>
      </div>
      <div class="form-group">
        <label>Mức độ:</label>
        <select name="languageLevel" required>
          <option value="Bản ngữ" ${
            lang.level === "Bản ngữ" ? "selected" : ""
          }>Bản ngữ</option>
          <option value="Thành thạo" ${
            lang.level === "Thành thạo" ? "selected" : ""
          }>Thành thạo</option>
          <option value="Cơ bản" ${
            lang.level === "Cơ bản" ? "selected" : ""
          }>Cơ bản</option>
        </select>
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

  // Responsive navigation toggle (for mobile)
  function toggleMobileNav() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("mobile-open");
  }

  // Add mobile nav toggle button if needed
  if (window.innerWidth <= 768) {
    const header = document.querySelector(".header-content");
    const mobileToggle = document.createElement("button");
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.className = "mobile-nav-toggle";
    mobileToggle.style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      display: block;
    `;
    mobileToggle.addEventListener("click", toggleMobileNav);
    header.appendChild(mobileToggle);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.remove("mobile-open");
    }
  });

  // Form validation utilities
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return re.test(phone);
  }

  // Data persistence utilities
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

  // Load saved data if available
  const savedData = loadFromLocalStorage("profileData");
  if (savedData) {
    profileData = savedData;
  }

  // Export functions for global access if needed
  window.ProfilePage = {
    showMessage,
    validateEmail,
    validatePhone,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
});
