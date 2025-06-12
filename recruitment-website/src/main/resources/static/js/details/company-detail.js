async function getEmployerDetail(uid) {
  try {
    const response = await fetch(`/api/employer/profile?uid=${uid}`, {
      method: 'GET'
    });

    if (!response.ok) {
      console.log('Lỗi khi lấy employer detail');
      return;
    }

    const employer = await response.json();
    return employer;

  } catch (error) {
    console.error('Lỗi khi lấy employer detail', error);
  }
}


async function getJobs(uid, page = 1, limit = 10) {
  try {
    const response = await fetch(`/api/employer/job/get?employerId=${uid}&page=${page}&limit=${limit}`, {
      method: 'GET'
    });

    if (!response.ok) {
      console.log('Lỗi khi lấy list job');
      return;
    }

    const jobsData = await response.json();
    return jobsData.jobs;

  } catch (error) {
    console.error('Lỗi khi lấy list job', error);
  }
}




document.addEventListener("DOMContentLoaded", async () => {

  const companyId = localStorage.getItem('employerID');

  // Tìm công ty theo ID
  const company = await getEmployerDetail(companyId);
  if (company) {
    // Điền thông tin công ty
    document.getElementById("companyLogo").src = company.companyLogo;
    document.getElementById("companyName").textContent = company.companyName;
    document.getElementById("companyIndustry").textContent = company.industry;
    document.getElementById(
      "companyLocation"
    ).innerHTML = `<i class="fas fa-map-marker-alt"></i> ${company.companyAddress}`;
    // document.getElementById("ratingStars").textContent =
    //   "★".repeat(Math.floor(company.rating)) +
    //   "☆".repeat(5 - Math.floor(company.rating));
    // document.getElementById("ratingNumber").textContent = company.rating;
    document.getElementById("companyDescription").textContent =
      company.companyDescription;

    // Điền danh sách công việc
    const jobsList = document.getElementById("jobsList");
    const jobs = await getJobs(companyId);
    jobs.forEach((job) => {
      const jobCard = document.createElement("div");
      jobCard.className = "job-card";
      jobCard.innerHTML = `
          <div onclick="window.location.href = \`/job-detail?id=${job.id}\`;">
            <div class="job-title">${job.title}</div>
            <div class="job-meta">
              <div class="job-salary"><i class="fas fa-money-bill-wave"></i> ${job.salary}</div>
              <div class="job-location"><i class="fas fa-map-marker-alt"></i> ${job.address}</div>
            </div>
          </div>
        `;
      jobsList.appendChild(jobCard);
    });
  } else {
    // Hiển thị thông báo nếu không tìm thấy công ty
    document.getElementById("companyDetail").innerHTML =
      '<div class="container"><h2>Không tìm thấy công ty</h2></div>';
  }
});