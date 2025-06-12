// Profile page JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  // Sample data - in real application, this would come from backend
  let profileData = {
    personal: {
      fullName: "Vỹ Hà",
      email: "vy1098@gmail.com",
      phone: "+84 123 456 789",
      birthday: "15/03/1990",
      gender: "Nam",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      photo: "https://via.placeholder.com/120x120?text=User",
    },
    careerObjective:
      "Tìm kiếm vị trí CEO/Giám đốc điều hành tại một công ty công nghệ đầy tiềm năng. Với hơn 10 năm kinh nghiệm trong lĩnh vực quản lý và phát triển kinh doanh, tôi mong muốn đóng góp vào sự phát triển bền vững của doanh nghiệp.",
    experiences: [
      {
        title: "Chief Executive Officer (CEO)",
        company: "TechViet Solutions",
        duration: "2020 - Hiện tại",
        description:
          "Điều hành và quản lý toàn bộ hoạt động của công ty công nghệ với hơn 200 nhân viên. Tăng trưởng doanh thu 150% trong 3 năm.",
      },
      {
        title: "Giám đốc Phát triển Kinh doanh",
        company: "Digital Innovation Co.",
        duration: "2017 - 2020",
        description:
          "Phát triển và mở rộng thị trường, xây dựng đối tác chiến lược. Tăng 80% khách hàng doanh nghiệp trong 2 năm.",
      },
      {
        title: "Trưởng phòng Marketing",
        company: "StartUp Hub",
        duration: "2015 - 2017",
        description:
          "Xây dựng và triển khai chiến lược marketing tổng thể. Quản lý team 15 người và ngân sách marketing 2 tỷ đồng/năm.",
      },
    ],
    education: [
      {
        degree: "Thạc sĩ Quản trị Kinh doanh (MBA)",
        school: "Đại học Kinh tế TP.HCM",
        year: "2015",
      },
      {
        degree: "Cử nhân Công nghệ Thông tin",
        school: "Đại học Bách Khoa TP.HCM",
        year: "2012",
      },
    ],
    skills: [
      { name: "Quản lý và Lãnh đạo", level: 95 },
      { name: "Phát triển Kinh doanh", level: 90 },
      { name: "Marketing Strategy", level: 85 },
      { name: "Project Management", level: 88 },
      { name: "Digital Transformation", level: 80 },
      { name: "Team Building", level: 92 },
    ],
    languages: [
      { name: "Tiếng Việt", level: "Bản ngữ" },
      { name: "Tiếng Anh", level: "Thành thạo" },
      { name: "Tiếng Nhật", level: "Cơ bản" },
    ],
    jobNotifications: [
      { id: 1, title: "Senior Developer at TechViet", link: "#" },
      { id: 2, title: "Marketing Manager at Digital Innovation", link: "#" },
    ],
  };

  // Initialize page data
  initializeProfileData();

  // Event listeners
  setupEventListeners();

  // Functions
  function initializeProfileData() {
    // Load personal information
    const fullNameEl = document.getElementById("fullName");
    const emailEl = document.getElementById("email");
    const phoneEl = document.getElementById("phone");
    const birthdayEl = document.getElementById("birthday");
    const genderEl = document.getElementById("gender");
    const addressEl = document.getElementById("address");
    const sidebarNameEl = document.getElementById("sidebarName");
    const profileAvatarEl = document.getElementById("profileAvatar");
    const profilePhotoEl = document.getElementById("profilePhoto");
    const careerObjectiveEl = document.getElementById("careerObjective");

    if (fullNameEl) fullNameEl.textContent = profileData.personal.fullName;
    if (emailEl) emailEl.textContent = profileData.personal.email;
    if (phoneEl) phoneEl.textContent = profileData.personal.phone;
    if (birthdayEl) birthdayEl.textContent = profileData.personal.birthday;
    if (genderEl) genderEl.textContent = profileData.personal.gender;
    if (addressEl) addressEl.textContent = profileData.personal.address;
    if (sidebarNameEl)
      sidebarNameEl.textContent = profileData.personal.fullName;
    if (profileAvatarEl) profileAvatarEl.src = profileData.personal.photo;
    if (profilePhotoEl) profilePhotoEl.src = profileData.personal.photo;
    if (careerObjectiveEl)
      careerObjectiveEl.textContent = profileData.careerObjective;

    // Load other sections
    loadExperience();
    loadEducation();
    loadSkills();
    loadLanguages();
    loadJobNotifications();
  }

  function loadExperience() {
    const experienceList = document.getElementById("experienceList");
    if (!experienceList) return;

    experienceList.innerHTML = "";

    profileData.experiences.forEach((exp) => {
      const experienceItem = document.createElement("div");
      experienceItem.className = "experience-item";
      experienceItem.innerHTML = `
                <div class="experience-timeline">
                    <div class="experience-duration">${exp.duration}</div>
                </div>
                <div class="experience-details">
                    <div class="experience-title">${exp.title}</div>
                    <div class="experience-company"><a href="#" class="company-link" data-company="${exp.company}">${exp.company}</a></div>
                    <div class="experience-description">${exp.description}</div>
                </div>
            `;
      experienceList.appendChild(experienceItem);
    });
  }

  function loadEducation() {
    const educationList = document.getElementById("educationList");
    if (!educationList) return;

    educationList.innerHTML = "";

    profileData.education.forEach((edu) => {
      const educationItem = document.createElement("div");
      educationItem.className = "education-item";
      educationItem.innerHTML = `
                <div class="education-year">${edu.year}</div>
                <div class="education-details">
                    <div class="education-degree">${edu.degree}</div>
                    <div class="education-school">${edu.school}</div>
                </div>
            `;
      educationList.appendChild(educationItem);
    });
  }

  function loadSkills() {
    const skillsList = document.getElementById("skillsList");
    if (!skillsList) return;

    skillsList.innerHTML = "";

    profileData.skills.forEach((skill) => {
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
  }

  function loadLanguages() {
    const languagesList = document.getElementById("languagesList");
    if (!languagesList) return;

    languagesList.innerHTML = "";

    profileData.languages.forEach((lang) => {
      const languageItem = document.createElement("div");
      languageItem.className = "language-item";
      languageItem.innerHTML = `
                <div class="language-name">${lang.name}</div>
                <div class="language-level">${lang.level}</div>
            `;
      languagesList.appendChild(languageItem);
    });
  }

  function loadJobNotifications() {
    const jobNotificationsList = document.getElementById(
      "jobNotificationsList"
    );
    if (!jobNotificationsList) return;

    jobNotificationsList.innerHTML = "";

    profileData.jobNotifications.forEach((job) => {
      const jobItem = document.createElement("li");
      jobItem.innerHTML = `<a href="${job.link}" class="job-link" data-job-id="${job.id}">${job.title}</a>`;
      jobNotificationsList.appendChild(jobItem);
    });
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
      jobNotification: {
        modal: document.getElementById("createJobModal"),
        btn: document.getElementById("createJobBtn"),
        form: document.getElementById("createJobForm"),
        saveBtn: document.querySelector("#createJobModal .modal-save-btn"),
        cancelBtn: document.querySelector("#createJobModal .modal-cancel-btn"),
        closeBtn: document.querySelector("#createJobModal .modal-close-btn"),
      },
    };

    // Photo upload
    const uploadPhotoBtn = document.querySelector(".upload-photo-btn");
    const uploadPhotoInput = document.getElementById("uploadPhotoInput");

    if (uploadPhotoBtn && uploadPhotoInput) {
      uploadPhotoBtn.addEventListener("click", () => uploadPhotoInput.click());
      uploadPhotoInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            profileData.personal.photo = event.target.result;
            const profileAvatar = document.getElementById("profileAvatar");
            const profilePhoto = document.getElementById("profilePhoto");
            if (profileAvatar) profileAvatar.src = profileData.personal.photo;
            if (profilePhoto) profilePhoto.src = profileData.personal.photo;
            saveToLocalStorage("profileData", profileData);
            showMessage("Ảnh đại diện đã được cập nhật");
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Personal info modal
    if (modals.personal.btn && modals.personal.modal) {
      modals.personal.btn.addEventListener("click", () => {
        modals.personal.modal.style.display = "flex";
        document.getElementById("editFullName").value =
          profileData.personal.fullName;
        document.getElementById("editEmail").value = profileData.personal.email;
        document.getElementById("editPhone").value = profileData.personal.phone;
        document.getElementById("editBirthday").value =
          profileData.personal.birthday;
        document.getElementById("editGender").value =
          profileData.personal.gender;
        document.getElementById("editAddress").value =
          profileData.personal.address;
      });

      if (modals.personal.saveBtn) {
        modals.personal.saveBtn.addEventListener("click", () => {
          const formData = new FormData(modals.personal.form);
          const updatedData = {
            fullName: formData.get("fullName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            birthday: formData.get("birthday"),
            gender: formData.get("gender"),
            address: formData.get("address"),
            photo: profileData.personal.photo,
          };

          if (!validateEmail(updatedData.email)) {
            showMessage("Email không hợp lệ");
            return;
          }
          if (!validatePhone(updatedData.phone)) {
            showMessage("Số điện thoại không hợp lệ");
            return;
          }

          profileData.personal = updatedData;

          // Update display
          const elements = {
            fullName: document.getElementById("fullName"),
            email: document.getElementById("email"),
            phone: document.getElementById("phone"),
            birthday: document.getElementById("birthday"),
            gender: document.getElementById("gender"),
            address: document.getElementById("address"),
            sidebarName: document.getElementById("sidebarName"),
          };

          Object.keys(elements).forEach((key) => {
            if (elements[key]) {
              elements[key].textContent =
                updatedData[key === "sidebarName" ? "fullName" : key];
            }
          });

          saveToLocalStorage("profileData", profileData);
          modals.personal.modal.style.display = "none";
          showMessage("Thông tin cá nhân đã được cập nhật");
        });
      }
    }

    // Career objective modal
    if (modals.objective.btn && modals.objective.modal) {
      modals.objective.btn.addEventListener("click", () => {
        modals.objective.modal.style.display = "flex";
        document.getElementById("editCareerObjective").value =
          profileData.careerObjective;
      });

      if (modals.objective.saveBtn) {
        modals.objective.saveBtn.addEventListener("click", () => {
          const formData = new FormData(modals.objective.form);
          profileData.careerObjective = formData.get("careerObjective");
          const careerObjectiveEl = document.getElementById("careerObjective");
          if (careerObjectiveEl) {
            careerObjectiveEl.textContent = profileData.careerObjective;
          }
          saveToLocalStorage("profileData", profileData);
          modals.objective.modal.style.display = "none";
          showMessage("Mục tiêu nghề nghiệp đã được cập nhật");
        });
      }
    }

    // Experience modal
    if (modals.experience.btn && modals.experience.modal) {
      modals.experience.btn.addEventListener("click", () => {
        modals.experience.modal.style.display = "flex";
        const entriesContainer = document.getElementById("experienceEntries");
        if (entriesContainer) {
          entriesContainer.innerHTML = "";
          profileData.experiences.forEach((exp, index) => {
            addExperienceEntry(exp, index);
          });
        }
      });

      if (modals.experience.addBtn) {
        modals.experience.addBtn.addEventListener("click", () => {
          addExperienceEntry(
            { title: "", company: "", duration: "", description: "" },
            profileData.experiences.length
          );
        });
      }

      if (modals.experience.saveBtn) {
        modals.experience.saveBtn.addEventListener("click", () => {
          const entries = document.querySelectorAll(
            "#experienceEntries .entry-group"
          );
          const updatedExperiences = [];
          entries.forEach((entry) => {
            const title = entry.querySelector("[name='title']").value;
            const company = entry.querySelector("[name='company']").value;
            const duration = entry.querySelector("[name='duration']").value;
            const description = entry.querySelector(
              "[name='description']"
            ).value;
            if (title && company && duration && description) {
              updatedExperiences.push({
                title,
                company,
                duration,
                description,
              });
            }
          });
          profileData.experiences = updatedExperiences;
          loadExperience();
          saveToLocalStorage("profileData", profileData);
          modals.experience.modal.style.display = "none";
          showMessage("Kinh nghiệm làm việc đã được cập nhật");
        });
      }
    }

    // Education modal
    if (modals.education.btn && modals.education.modal) {
      modals.education.btn.addEventListener("click", () => {
        modals.education.modal.style.display = "flex";
        const entriesContainer = document.getElementById("educationEntries");
        if (entriesContainer) {
          entriesContainer.innerHTML = "";
          profileData.education.forEach((edu, index) => {
            addEducationEntry(edu, index);
          });
        }
      });

      if (modals.education.addBtn) {
        modals.education.addBtn.addEventListener("click", () => {
          addEducationEntry(
            { degree: "", school: "", year: "" },
            profileData.education.length
          );
        });
      }

      if (modals.education.saveBtn) {
        modals.education.saveBtn.addEventListener("click", () => {
          const entries = document.querySelectorAll(
            "#educationEntries .entry-group"
          );
          const updatedEducation = [];
          entries.forEach((entry) => {
            const degree = entry.querySelector("[name='degree']").value;
            const school = entry.querySelector("[name='school']").value;
            const year = entry.querySelector("[name='year']").value;
            if (degree && school && year) {
              updatedEducation.push({ degree, school, year });
            }
          });
          profileData.education = updatedEducation;
          loadEducation();
          saveToLocalStorage("profileData", profileData);
          modals.education.modal.style.display = "none";
          showMessage("Học vấn đã được cập nhật");
        });
      }
    }

    // Skills modal
    if (modals.skills.btn && modals.skills.modal) {
      modals.skills.btn.addEventListener("click", () => {
        modals.skills.modal.style.display = "flex";
        const entriesContainer = document.getElementById("skillsEntries");
        if (entriesContainer) {
          entriesContainer.innerHTML = "";
          profileData.skills.forEach((skill, index) => {
            addSkillEntry(skill, index);
          });
        }
      });

      if (modals.skills.addBtn) {
        modals.skills.addBtn.addEventListener("click", () => {
          addSkillEntry({ name: "", level: 50 }, profileData.skills.length);
        });
      }

      if (modals.skills.saveBtn) {
        modals.skills.saveBtn.addEventListener("click", () => {
          const entries = document.querySelectorAll(
            "#skillsEntries .entry-group"
          );
          const updatedSkills = [];
          entries.forEach((entry) => {
            const name = entry.querySelector("[name='skillName']").value;
            const level = parseInt(
              entry.querySelector("[name='skillLevel']").value
            );
            if (name && level >= 0 && level <= 100) {
              updatedSkills.push({ name, level });
            }
          });
          profileData.skills = updatedSkills;
          loadSkills();
          saveToLocalStorage("profileData", profileData);
          modals.skills.modal.style.display = "none";
          showMessage("Kỹ năng đã được cập nhật");
        });
      }
    }

    // Languages modal
    if (modals.languages.btn && modals.languages.modal) {
      modals.languages.btn.addEventListener("click", () => {
        modals.languages.modal.style.display = "flex";
        const entriesContainer = document.getElementById("languagesEntries");
        if (entriesContainer) {
          entriesContainer.innerHTML = "";
          profileData.languages.forEach((lang, index) => {
            addLanguageEntry(lang, index);
          });
        }
      });

      if (modals.languages.addBtn) {
        modals.languages.addBtn.addEventListener("click", () => {
          addLanguageEntry(
            { name: "", level: "" },
            profileData.languages.length
          );
        });
      }

      if (modals.languages.saveBtn) {
        modals.languages.saveBtn.addEventListener("click", () => {
          const entries = document.querySelectorAll(
            "#languagesEntries .entry-group"
          );
          const updatedLanguages = [];
          entries.forEach((entry) => {
            const name = entry.querySelector("[name='languageName']").value;
            const level = entry.querySelector("[name='languageLevel']").value;
            if (name && level) {
              updatedLanguages.push({ name, level });
            }
          });
          profileData.languages = updatedLanguages;
          loadLanguages();
          saveToLocalStorage("profileData", profileData);
          modals.languages.modal.style.display = "none";
          showMessage("Ngoại ngữ đã được cập nhật");
        });
      }
    }

    // Job notification modal
    if (modals.jobNotification.btn && modals.jobNotification.modal) {
      modals.jobNotification.btn.addEventListener("click", () => {
        modals.jobNotification.modal.style.display = "flex";
      });

      if (modals.jobNotification.saveBtn) {
        modals.jobNotification.saveBtn.addEventListener("click", () => {
          const formData = new FormData(modals.jobNotification.form);
          const newJob = {
            id: profileData.jobNotifications.length + 1,
            title:
              formData.get("jobTitle") ||
              `Việc làm mới ${profileData.jobNotifications.length + 1}`,
            link: formData.get("jobLink") || "#",
          };
          profileData.jobNotifications.push(newJob);
          loadJobNotifications();
          saveToLocalStorage("profileData", profileData);
          modals.jobNotification.modal.style.display = "none";
          showMessage("Thông báo việc làm đã được tạo");
        });
      }
    }

    // Close and cancel buttons for all modals
    Object.values(modals).forEach((modal) => {
      if (modal.closeBtn) {
        modal.closeBtn.addEventListener("click", () => {
          modal.modal.style.display = "none";
        });
      }
      if (modal.cancelBtn) {
        modal.cancelBtn.addEventListener("click", () => {
          modal.modal.style.display = "none";
        });
      }
    });

    // Edit profile button
    const editProfileBtn = document.getElementById("editProfileBtn");
    if (editProfileBtn) {
      editProfileBtn.addEventListener("click", () => {
        showMessage(
          "Chức năng chỉnh sửa hồ sơ tổng quát sẽ được phát triển trong phiên bản tiếp theo"
        );
      });
    }

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
    const setupProfileBtn = document.querySelector(".setup-profile-btn");
    if (setupProfileBtn) {
      setupProfileBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showMessage("Tính năng thiết lập hồ sơ sẽ được phát triển");
      });
    }
  }

  function addExperienceEntry(exp, index) {
    const entriesContainer = document.getElementById("experienceEntries");
    if (!entriesContainer) return;

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
    if (!entriesContainer) return;

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
    if (!entriesContainer) return;

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
    initializeProfileData();
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
