let employersData = []; // Biến lưu toàn bộ dữ liệu

document.addEventListener("DOMContentLoaded", () => {
  fetchEmployers();

  // Nút "Lọc"
  document.querySelector(".action-button").addEventListener("click", () => {
    applyFilters();
  });

  // Tìm kiếm tên realtime
  const searchInput = document.querySelector(".search-bar");
  searchInput.addEventListener("keyup", () => {
    applyFilters();
  });
});

async function fetchEmployers() {
  try {
    const response = await fetch("/api/employer/get");
    if (!response.ok) {
      throw new Error("Lỗi khi tải dữ liệu employers!");
    }

    const employers = await response.json();

    // Sắp xếp employers:
    employers.sort((a, b) => {
      // Nếu cả 2 cùng trạng thái
      if (a.isApproved === b.isApproved) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      // isApproved true lên trước
      return a.isApproved ? 1 : -1;
    });

    employersData = employers; // Lưu lại vào biến toàn cục
    renderEmployers(employersData);
  } catch (error) {
    console.error("Lỗi khi fetch employers:", error);
  }
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

  // Gán sự kiện cho nút duyệt
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

  // Gán sự kiện cho nút xem chi tiết
  document.querySelectorAll(".detail-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");

      // Gọi API lấy thông tin employer
      fetch(`/api/employer/profile?uid=${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Employer not found");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // Đổ dữ liệu vào các phần tử trong overlay
          document.getElementById("profile-companyName").innerText = data.companyName || "N/A";
          document.getElementById("profile-email").innerText = data.account?.email || "N/A";
          document.getElementById("profile-companyAddress").innerText = data.companyAddress || "N/A";
          document.getElementById("profile-city").innerText = data.city || "N/A";
          document.getElementById("profile-phoneNumber").innerText = data.phoneNumber || "N/A";
          document.getElementById("profile-companyWebsite").innerText = data.companyWebsite || "N/A";
          document.getElementById("profile-industry").innerText = data.industry || "N/A";
          document.getElementById("profile-companySize").innerText = data.companySize || "N/A";
          document.getElementById("profile-taxCode").innerText = data.taxCode || "N/A";
          document.getElementById("profile-foundedDate").innerText = data.foundedDate ? formatDate(new Date(data.foundedDate)) : "N/A";
          document.getElementById("profile-status").innerText = data.status || "N/A";
          document.getElementById("profile-createdAt").innerText = data.createdAt ? formatDateTime(new Date(data.createdAt)) : "N/A";
          document.getElementById("profile-updatedAt").innerText = data.updatedAt ? formatDateTime(new Date(data.updatedAt)) : "N/A";
          document.getElementById("profile-companyDescription").innerText = data.companyDescription || "N/A";

          // Xử lý logo công ty
          const logoImg = document.querySelector("#employer-profile-overlay img");
          if (data.companyLogo && logoImg) {
            logoImg.src = data.companyLogo;
            logoImg.style.display = "block";
          } else if (logoImg) {
            logoImg.style.display = "none";
          }

          // Hiển thị overlay
          document.getElementById("employer-profile-overlay").style.display = "flex";
        })
        .catch((error) => {
          console.error(error);
          alert("Không tìm thấy employer.");
        });
    });
  });
}

// Hàm định dạng ngày (giả định đã có, nhưng đảm bảo định dạng dd/MM/yyyy)
function formatDate(date) {
  if (!date) return "N/A";
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
}

// Hàm định dạng ngày giờ (dd/MM/yyyy HH:mm)
function formatDateTime(date) {
  if (!date) return "N/A";
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

// Sự kiện đóng overlay
document.getElementById("close-profile").addEventListener("click", () => {
  document.getElementById("employer-profile-overlay").style.display = "none";
});


function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Hàm lọc theo cả tên và ngày (client-side)
function applyFilters() {
  const keyword = document.querySelector(".search-bar").value.toLowerCase();
  const startDateValue = document.querySelector(
    "input[name='startDate']"
  ).value;
  const endDateValue = document.querySelector("input[name='endDate']").value;

  const filteredEmployers = employersData.filter((employer) => {
    const nameMatch = employer.companyName.toLowerCase().includes(keyword);

    const createdDate = new Date(employer.createdAt);
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

    return nameMatch && dateInRange;
  });

  renderEmployers(filteredEmployers);
}
