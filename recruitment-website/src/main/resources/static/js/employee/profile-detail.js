document.addEventListener("DOMContentLoaded", () => {
  // Dữ liệu mẫu cho hồ sơ
  const profileData = {
    fullName: "Nguyen Van A",
    jobTitle: "Senior Software Engineer",
    location: "Hồ Chí Minh, Việt Nam",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    dob: "1995-05-15",
    educationLevel: "Cử nhân Công nghệ Thông tin - Đại học Quốc gia TP.HCM",
    languages: "Tiếng Việt, Tiếng Anh (IELTS 6.5)",
    experienceYears: 5,
    workExperience: [
      {
        company: "FPT Software",
        role: "Software Engineer",
        period: "2020 - Hiện tại",
        description:
          "Phát triển ứng dụng web bằng Java và React, tối ưu hiệu suất hệ thống.",
      },
      {
        company: "VinGroup",
        role: "Junior Developer",
        period: "2018 - 2020",
        description:
          "Hỗ trợ phát triển backend bằng Node.js và quản lý cơ sở dữ liệu.",
      },
    ],
    education: [
      {
        school: "Đại học Quốc gia TP.HCM",
        major: "Công nghệ Thông tin",
        period: "2013 - 2017",
      },
    ],
    skills: ["Java", "React", "Node.js", "SQL", "Docker"],
    certifications: ["AWS Certified Solutions Architect", "Oracle Java SE 8"],
    summary:
      "Tôi là một kỹ sư phần mềm có 5 năm kinh nghiệm trong phát triển web và ứng dụng. Tôi đam mê tối ưu hóa mã nguồn và làm việc nhóm hiệu quả.",
    cvLink: "https://example.com/cv.pdf",
    desiredSalary: "30 - 40 triệu VNĐ",
    startDate: "Ngay lập tức",
    viewsCount: 15,
    contactCount: 3,
  };

  // Điền thông tin vào trang
  document.getElementById("fullName").textContent = profileData.fullName;
  document.getElementById("jobTitle").textContent = profileData.jobTitle;
  document.getElementById(
    "location"
  ).innerHTML = `<i class="fas fa-map-marker-alt"></i> ${profileData.location}`;
  document.getElementById(
    "email"
  ).innerHTML = `<i class="fas fa-envelope"></i> ${profileData.email}`;
  document.getElementById(
    "phone"
  ).innerHTML = `<i class="fas fa-phone"></i> ${profileData.phone}`;
  document.getElementById("dob").textContent = profileData.dob;
  document.getElementById("educationLevel").textContent =
    profileData.educationLevel;
  document.getElementById("languages").textContent = profileData.languages;
  document.getElementById("experienceYears").textContent =
    profileData.experienceYears;
  document.getElementById("desiredSalary").textContent =
    profileData.desiredSalary;
  document.getElementById("startDate").textContent = profileData.startDate;
  document.getElementById("viewsCount").textContent = profileData.viewsCount;
  document.getElementById("contactCount").textContent =
    profileData.contactCount;
  document.getElementById("summary").textContent = profileData.summary;
  document.getElementById("cvLink").href = profileData.cvLink;
  document.getElementById("cvLink").textContent = "Xem CV";

  // Điền kinh nghiệm làm việc
  const workExperienceDiv = document.getElementById("workExperience");
  profileData.workExperience.forEach((exp) => {
    const expItem = document.createElement("div");
    expItem.className = "experience-item";
    expItem.innerHTML = `
        <h3>${exp.role} - ${exp.company}</h3>
        <p><strong>Thời gian:</strong> ${exp.period}</p>
        <p>${exp.description}</p>
      `;
    workExperienceDiv.appendChild(expItem);
  });

  // Điền học vấn
  const educationDiv = document.getElementById("education");
  profileData.education.forEach((edu) => {
    const eduItem = document.createElement("div");
    eduItem.className = "education-item";
    eduItem.innerHTML = `
        <h3>${edu.school} - ${edu.major}</h3>
        <p><strong>Thời gian:</strong> ${edu.period}</p>
      `;
    educationDiv.appendChild(eduItem);
  });

  // Điền kỹ năng
  const skillsDiv = document.getElementById("skills");
  profileData.skills.forEach((skill) => {
    const skillTag = document.createElement("span");
    skillTag.className = "skill-tag";
    skillTag.textContent = skill;
    skillsDiv.appendChild(skillTag);
  });

  // Điền chứng chỉ
  const certDiv = document.getElementById("certifications");
  profileData.certifications.forEach((cert) => {
    const certTag = document.createElement("span");
    certTag.className = "skill-tag";
    certTag.textContent = cert;
    certDiv.appendChild(certTag);
  });

  // Xử lý hành động
  const editButton = document.getElementById("editButton");
  const downloadButton = document.getElementById("downloadButton");
  const publicStatus = document.getElementById("publicStatus");

  editButton.addEventListener("click", () => {
    alert("Chuyển hướng đến trang chỉnh sửa hồ sơ...");
    // Thêm logic chuyển hướng đến trang chỉnh sửa (ví dụ: /edit-profile)
  });

  downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = profileData.cvLink;
    link.download = "profile_cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("Đã tải xuống CV!");
  });

  publicStatus.addEventListener("change", (e) => {
    alert(`Hồ sơ đã được ${e.target.checked ? "công khai" : "ẩn"}.`);
    // Thêm logic cập nhật trạng thái công khai/ẩn (ví dụ: gọi API)
  });
});