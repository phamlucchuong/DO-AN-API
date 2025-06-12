document.addEventListener("DOMContentLoaded", () => {
  fetchJobs();

  // Gán sự kiện cho nút Lọc
  document.querySelector(".action-button").addEventListener("click", () => {
    filterJobsByDate();
  });

  const searchInput = document.querySelector(".search-bar");
  searchInput.addEventListener("keyup", () => {
    filterJobsByTitle(searchInput.value);
  });
});

async function fetchJobs() {
  try {
    const response = await fetch("/api/employer/job/getAllJobs");
    if (!response.ok) {
      throw new Error("Lỗi khi tải dữ liệu jobs!");
    }

    const jobs = await response.json();
    console.log(jobs);
    renderJobs(jobs);
  } catch (error) {
    console.error("Lỗi khi fetch jobs:", error);
  }
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
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function filterJobsByTitle(keyword) {
  const rows = document.querySelectorAll("#jobTableBody tr");
  const lowerKeyword = keyword.toLowerCase();

  rows.forEach((row) => {
    const titleCell = row.cells[1];
    if (titleCell) {
      const titleText = titleCell.textContent.toLowerCase();
      if (titleText.includes(lowerKeyword)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  });
}

function filterJobsByDate() {
  const startDateValue = document.querySelector("input[name='startDate']").value;
  const endDateValue = document.querySelector("input[name='endDate']").value;

  const startDate = startDateValue ? new Date(startDateValue) : null;
  const endDate = endDateValue ? new Date(endDateValue) : null;

  const rows = document.querySelectorAll("#jobTableBody tr");

  let visibleCount = 0;

  rows.forEach((row) => {
    const dateCell = row.cells[4];
    if (dateCell) {
      const dateText = dateCell.textContent.split(" ")[0]; // Lấy phần ngày: "dd/MM/yyyy"
      const [day, month, year] = dateText.split("/");
      const jobDate = new Date(`${year}-${month}-${day}`);

      let isInRange = true;

      if (startDate && jobDate < startDate) isInRange = false;
      if (endDate && jobDate > endDate) isInRange = false;

      if (isInRange) {
        row.style.display = "";
        visibleCount++;
      } else {
        row.style.display = "none";
      }
    }
  });

  // Nếu không còn job nào hiển thị thì thêm dòng thông báo
  const noJobRow = document.getElementById("noJobRow");
  if (visibleCount === 0) {
    if (!noJobRow) {
      const tr = document.createElement("tr");
      tr.id = "noJobRow";
      tr.innerHTML = `<td colspan="6">Không có công việc nào.</td>`;
      document.getElementById("jobTableBody").appendChild(tr);
    }
  } else {
    if (noJobRow) noJobRow.remove();
  }
}


