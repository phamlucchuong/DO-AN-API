
async function postCv(uid, cvData, file) {
  try {
    const formData = new FormData();
    formData.append("cvFile", file); // file pdf
    formData.append("data", new Blob([JSON.stringify(cvData)], {
      type: "application/json"
    }));

    const response = await fetch(`/api/application/${uid}/post`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      console.log('Lỗi khi upload CV');
    } else {
      console.log('Upload thành công!');
    }
  } catch (error) {
    console.error("Lỗi khi thêm CV", error);
  }
}


async function getJobDetail(id) {
  try {
    const response = await fetch(`/api/employer/job/${id}/detail`, {
      method: 'GET',
    });

    if (!response.ok) {
      console.log('Lỗi khi lấy job detail');
      return;
    }

    const job_detail = response.json();
    return job_detail;

  } catch (error) {
    console.error("Lỗi khi lấy job detail", error);
  }
}


document.addEventListener("DOMContentLoaded", async () => {

  const jobId = localStorage.getItem('jobID');

  // Tìm công việc theo ID
  const job = await getJobDetail(jobId);

  if (job) {
    // Điền thông tin công việc
    document.getElementById("companyLogo").src = job.employer.companyLogo;
    document.getElementById("jobTitle").textContent = job.title;
    document.getElementById("companyName").textContent = job.employer.companyName;
    document.getElementById("jobSalary").textContent = `${job.salary} VNĐ`;
    document.getElementById(
      "jobLocation"
    ).innerHTML = `<i class="fas fa-map-marker-alt"></i> ${job.address}`;
    document.getElementById(
      "jobExperience"
    ).innerHTML = `<i class="fas fa-briefcase"></i> ${job.experience}`;
    document.getElementById("jobDescription").textContent = job.description;
    document.getElementById(
      "postedDate"
    ).textContent = `Đăng ngày: ${formatDate(job.createdAt)}`;

    // Hiển thị badge nếu có
    if (job.isHot)
      document.getElementById("jobHotBadge").style.display = "inline-block";
    if (job.isUrgent)
      document.getElementById("jobUrgentBadge").style.display = "inline-block";

    // Hiển thị kỹ năng
    const skill = document.getElementById("jobSkills");
    skill.textContent = job.requirements;

    // Xử lý nút ứng tuyển
    const applyButton = document.getElementById("applyButton");
    const applyModal = document.getElementById("applyModal");
    const closeModal = document.querySelector(".close-modal");
    const submitCV = document.getElementById("submitCV");
    const cvUpload = document.getElementById("cvUpload");

    applyButton.addEventListener("click", () => {
      if(localStorage.getItem("isUpdate") === "true")
        applyModal.style.display = "block";
      else alert('Vui lòng điền đầy đủ thông tin tài khoản trước khi ứng tuyển!');
    });

    closeModal.addEventListener("click", () => {
      applyModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === applyModal) {
        applyModal.style.display = "none";
      }
    });


    submitCV.addEventListener("click", async () => {
      const file = cvUpload.files[0];
      console.log(file);
      if (file && file.type === "application/pdf") {
        alert(`Đã gửi CV cho vị trí ${job.title} tại ${job.employer.companyName}.`);
        applyModal.style.display = "none";
        cvUpload.value = ""; // Reset input file
        const cvData = {
          cvLink: "", // không cần, để service tự gán
          employee_id: localStorage.getItem('uid'),
        };
        await postCv(jobId, cvData, file);
      } else {
        alert("Vui lòng tải lên file PDF hợp lệ!");
      }
    });


  } else {
    document.getElementById("jobDetail").innerHTML =
      '<div class="container"><h2>Không tìm thấy công việc</h2></div>';
  }

  // Hàm định dạng ngày
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Hôm qua";
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    return `${Math.floor(diffDays / 30)} tháng trước`;
  }
});