let jobsData = [];
let currentPage = 0;
const pageSize = 10;
let totalPages = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetchJobs();

  // Filter button
  const filterButton = document.getElementById("filterButton");
  if (filterButton) {
    filterButton.addEventListener("click", () => {
      applyFilters();
    });
  }

  // Real-time search
  const searchInput = document.getElementById("jobSearch");
  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      applyFilters();
    });
  }

  // Pagination buttons
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (prevBtn) prevBtn.addEventListener("click", prevPage);
  if (nextBtn) nextBtn.addEventListener("click", nextPage);
});

async function fetchJobs(page = 0) {
  try {
    const response = await fetch(`/api/employer/job/getAllJobs?page=${page}&size=${pageSize}`);
    if (!response.ok) {
      throw new Error("Lỗi khi tải dữ liệu jobs!");
    }

    const data = await response.json();
    jobsData = data.content;
    totalPages = data.totalPages;
    currentPage = data.currentPage;

    console.log(data);
    renderJobs(jobsData);
    updatePaginationControls();
  } catch (error) {
    console.error("Lỗi khi fetch jobs:", error);
  }
}

function nextPage() {
  if (currentPage < totalPages - 1) {
    fetchJobs(currentPage + 1);
  }
}

function prevPage() {
  if (currentPage > 0) {
    fetchJobs(currentPage - 1);
  }
}

function updatePaginationControls() {
  const currentPageElement = document.getElementById("currentPage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!currentPageElement || !prevBtn || !nextBtn) {
    console.error("One or more pagination elements (currentPage, prevBtn, nextBtn) not found in the DOM.");
    return;
  }

  currentPageElement.textContent = `Trang ${currentPage + 1} / ${totalPages}`;
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage >= totalPages - 1;
}

function renderJobs(jobs) {
  const jobTableBody = document.getElementById("jobTableBody");
  jobTableBody.innerHTML = "";

  if (jobs.length === 0) {
    jobTableBody.innerHTML =
      "<tr><td colspan='6'>Không có công việc nào.</td></tr>";
    return;
  }

  jobs.forEach((job) => {
    const row = document.createElement("tr");
    const createdAt = formatDate(job.createdAt);

    let statusText = "";
    let statusClass = "";

    switch (job.status) {
      case "OPEN":
        statusText = "Đang mở";
        statusClass = "status open";
        break;
      case "URGENT":
        statusText = "Gấp";
        statusClass = "status urgent";
        break;
      case "CLOSED":
        statusText = "Đã đóng";
        statusClass = "status closed";
        break;
    }

    row.innerHTML = `
      <td>${job.id}</td>
      <td>${job.title}</td>
      <td>${job.employer.companyName}</td>
      <td><span class="${statusClass}">${statusText}</span></td>
      <td>${createdAt}</td>
    `;
    jobTableBody.appendChild(row);  
  });
}

function formatDate(isoString) {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function applyFilters() {
  const keyword = document.getElementById("jobSearch").value.toLowerCase();
  const startDateValue = document.querySelector("input[name='startDate']").value;
  const endDateValue = document.querySelector("input[name='endDate']").value;

  const filteredJobs = jobsData.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(keyword);
    const createdDate = new Date(job.createdAt);
    let dateInRange = true;

    if (startDateValue) {
      const startDate = new Date(startDateValue);
      if (createdDate < startDate) dateInRange = false;
    }

    if (endDateValue) {
      const endDate = new Date(endDateValue);
      endDate.setDate(endDate.getDate() + 1);
      if (createdDate >= endDate) dateInRange = false;
    }

    return titleMatch && dateInRange;
  });

  renderJobs(filteredJobs);
}