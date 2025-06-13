let employersData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchEmployers();

  // Filter button
  const filterButton = document.getElementById("filterButton");
  if (filterButton) {
    filterButton.addEventListener("click", () => {
      applyFilters();
    });
  }

  // Real-time search
  const searchInput = document.getElementById("employerSearch");
  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      applyFilters();
    });
  }

  // Status filter
  const statusFilter = document.getElementById("statusFilter");
  if (statusFilter) {
    statusFilter.addEventListener("change", () => {
      applyFilters();
    });
  }

  // Pagination buttons
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (prevBtn) prevBtn.addEventListener("click", prevPage);
  if (nextBtn) nextBtn.addEventListener("click", nextPage);
});

let currentPage = 0;
const pageSize = 10;
let totalPages = 0;

async function fetchEmployers(page = 0) {
  try {
    const response = await fetch(`/api/employer/get?page=${page}&size=${pageSize}`);
    if (!response.ok) {
      throw new Error("Lỗi khi tải dữ liệu employers!");
    }

    const data = await response.json();
    const employers = data.content;
    console.log(data);

    // Sort employers
    employers.sort((a, b) => {
      if (a.isApproved === b.isApproved) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return a.isApproved ? 1 : -1;
    });

    employersData = employers;
    totalPages = data.totalPages;
    currentPage = data.currentPage;

    renderEmployers(employers);
    updatePaginationControls();
  } catch (error) {
    console.error("Lỗi khi fetch employers:", error);
  }
}

function nextPage() {
  if (currentPage < totalPages - 1) {
    fetchEmployers(currentPage + 1);
  }
}

function prevPage() {
  if (currentPage > 0) {
    fetchEmployers(currentPage - 1);
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

function renderEmployers(employers) {
  const employerTableBody = document.getElementById("employerTableBody");
  employerTableBody.innerHTML = "";

  if (employers.length === 0) {
    employerTableBody.innerHTML =
      "<tr><td colspan='7'>Không có nhà tuyển dụng nào.</td></tr>";
    return;
  }

  employers.forEach((employer) => {
    const row = document.createElement("tr");
    const createdAt = formatDate(employer.createdAt);

    let statusText = "";
    let statusClass = "";

    switch (employer.isApproved) {
      case true:
        statusText = "Đã duyệt";
        statusClass = "status active";
        break;
      case false:
        statusText = "Chưa duyệt";
        statusClass = "status inactive";
        break;
      default:
        statusText = "Không rõ";
        statusClass = "status unknown";
        break;
    }

    row.innerHTML = `
      <td>${employer.uid}</td>
      <td>${employer.companyName}</td>
      <td>${employer.account.email}</td>
      <td id="jobCount-${employer.uid}">Đang tải...</td>
      <td><span class="${statusClass}">${statusText}</span></td>
      <td>${createdAt}</td>
      <td>
        <button class="action-icon detail-btn" data-id="${employer.uid}">
          <i class="fas fa-eye"></i>
        </button>
        ${
          employer.isApproved
            ? ""
            : `<button class="action-icon approve-btn" data-id="${employer.uid}">
                <i class="fas fa-check-circle"></i>
              </button>`
        }
        <button class="action-icon delete-btn" data-id="${employer.uid}">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    employerTableBody.appendChild(row);
    fetch(`/api/employer/${employer.uid}/jobs/count`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(`jobCount-${employer.uid}`).textContent = data;
      })
      .catch((error) => {
        console.error("Lỗi khi lấy job count:", error);
        document.getElementById(`jobCount-${employer.uid}`).textContent = "N/A";
      });
  });

  // Approve button event listeners
  document.querySelectorAll(".approve-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      if (confirm("Bạn có chắc muốn duyệt nhà tuyển dụng này?")) {
        try {
          const response = await fetch(`/api/employer/approve/${id}`);
          const result = await response.json();

          if (result.success) {
            alert("Duyệt thành công!");
            window.location.href = "/admin/employers-management";
          } else {
            alert("Có lỗi: " + result.message);
          }
        } catch (err) {
          console.error("Lỗi duyệt employer:", err);
          alert("Có lỗi xảy ra khi duyệt.");
        }
      }
    });
  });

  // Detail button event listeners
  document.querySelectorAll(".detail-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");

      fetch(`/api/employer/profile?uid=${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Employer not found");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          document.getElementById("profile-companyName").innerText = data.companyName || "N/A";
          document.getElementById("profile-email").innerText = data.account?.email || "N/A";
          document.getElementById("profile-companyAddress").innerText = data.companyAddress || "N/A";
          document.getElementById("profile-city").innerText = data.city || "N/A";
          document.getElementById("profile-phoneNumber").innerText = data.phoneNumber || "N/A";
          document.getElementById("profile-companyWebsite").innerText = data.companyWebsite || "N/A";
          document.getElementById("profile-industry").innerText = data.industry || "N/A";
          document.getElementById("profile-companySize").innerText = data.companySize || "N/A";
          document.getElementById("profile-taxCode").innerText = data.taxCode || "N/A";
          document.getElementById("profile-foundedDate").innerText = data.foundedDate
            ? formatDate(new Date(data.foundedDate))
            : "N/A";
          document.getElementById("profile-status").innerText = data.status || "N/A";
          document.getElementById("profile-createdAt").innerText = data.createdAt
            ? formatDateTime(new Date(data.createdAt))
            : "N/A";
          document.getElementById("profile-updatedAt").innerText = data.updatedAt
            ? formatDateTime(new Date(data.updatedAt))
            : "N/A";
          document.getElementById("profile-companyDescription").innerText = data.companyDescription || "N/A";

          const logoImg = document.getElementById("profile-companyLogo");
          if (data.companyLogo && logoImg) {
            logoImg.src = data.companyLogo;
            logoImg.style.display = "block";
          } else if (logoImg) {
            logoImg.style.display = "none";
          }

          document.getElementById("employer-profile-overlay").style.display = "flex";
        })
        .catch((error) => {
          console.error(error);
          alert("Không tìm thấy employer.");
        });
    });
  });

  // Delete button event listeners
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      if (confirm("Bạn có chắc muốn xóa nhà tuyển dụng này? Hành động này không thể hoàn tác.")) {
        try {
          const response = await fetch(`/api/employer/delete/${id}`, {
            method: "DELETE",
          });
          const result = await response.json();

          if (result.success) {
            alert("Xóa thành công!");
            fetchEmployers(currentPage); // Refresh the current page
          } else {
            alert("Có lỗi: " + result.message);
          }
        } catch (err) {
          console.error("Lỗi xóa employer:", err);
          alert("Có lỗi xảy ra khi xóa.");
        }
      }
    });
  });
}

function formatDate(date) {
  if (!date) return "N/A";
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
}

function formatDateTime(date) {
  if (!date) return "N/A";
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

const closeProfileBtn = document.getElementById("close-profile");
if (closeProfileBtn) {
  closeProfileBtn.addEventListener("click", () => {
    document.getElementById("employer-profile-overlay").style.display = "none";
  });
}

function applyFilters() {
  const keyword = document.getElementById("employerSearch").value.toLowerCase();
  const statusFilter = document.getElementById("statusFilter").value;
  const startDateValue = document.querySelector("input[name='startDate']").value;
  const endDateValue = document.querySelector("input[name='endDate']").value;

  const filteredEmployers = employersData.filter((employer) => {
    const nameMatch = (employer.companyName || "").toLowerCase().includes(keyword);

    let statusMatch = true;
    if (statusFilter === "approved") {
      statusMatch = employer.isApproved === true;
    } else if (statusFilter === "not-approved") {
      statusMatch = employer.isApproved === false;
    }

    const createdDate = new Date(employer.createdAt);
    let dateInRange = true;

    if (startDateValue) {
      const startDate = new Date(startDateValue);
      if (createdDate < startDate) {
        dateInRange = false;
      }
    }

    if (endDateValue) {
      const endDate = new Date(endDateValue);
      endDate.setDate(endDate.getDate() + 1);
      if (createdDate >= endDate) {
        dateInRange = false;
      }
    }

    return nameMatch && statusMatch && dateInRange;
  });

  renderEmployers(filteredEmployers);
}