document.addEventListener("DOMContentLoaded", function () {
  const filterInput = document.getElementById("candidate-filter");
  const statusFilter = document.getElementById("status-filter");
  const candidatesTable = document.querySelector(
    ".candidates-list .candidates-table"
  );

  const uid = localStorage.getItem("uid");
  console.log("uid " + uid);

  let candidates = [];

  // Fetch candidates từ API
  function loadCandidates() {
    fetch(`/api/application/employer/${uid}/get`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        candidates = data;
        renderCandidates();
      })
      .catch((error) => {
        console.error("Lỗi khi tải ứng viên:", error);
      });
  }

  // Render candidates vào bảng
  function renderCandidates() {
    const existingRows = candidatesTable.querySelectorAll(".table-row");
    existingRows.forEach((row) => row.remove());

    candidates.forEach((candidate) => {
      const row = document.createElement("div");
      row.className =
        "table-row flex flex-col md:grid md:grid-cols-6 border-b border-gray-200 p-4";
      row.setAttribute("data-candidate-id", candidate.id);

      row.innerHTML = `
  <div class="table-cell font-semibold text-gray-700">${
    candidate.employee.name
  }</div>
  <div class="table-cell">
    <a href="mailto:${
      candidate.email
    }" class="text-primary-blue hover:text-light-blue">${
        candidate.employee.email
      }</a>
  </div>
  <div class="table-cell">
    <a href="${
      candidate.cvLink
    }" class="cv-link text-primary-blue hover:text-light-blue underline" target="_blank">Xem CV</a>
  </div>
  <div class="table-cell text-gray-700">${candidate.job.title}</div>
  <div class="table-cell">${candidate.status}</div>
  <div class="table-cell flex gap-2 flex-wrap">
    ${
      candidate.status === "PENDING"
        ? `
          <button class="approve-btn px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition" data-id="${candidate.id}">Duyệt</button>
          <button class="refuse-btn px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition" data-id="${candidate.id}">Từ chối</button>
        `
        : candidate.status === "APPROVED"
        ? "" // nếu APPROVED thì không hiện gì
        : candidate.status === "REFUSED"
        ? "" // nếu REFUSED hoặc CANCEL cũng không hiện gì
        : ""
    }
  </div>
`;

      candidatesTable.appendChild(row);

      // Gán sự kiện Duyệt nếu có nút
      const approveButton = row.querySelector(".approve-btn");
      if (approveButton) {
        approveButton.addEventListener("click", () => {
          approveCandidate(candidate.id, candidate.employee.uid);
        });
      }

      // Gán sự kiện Xóa
      const refuseButton = row.querySelector(".refuse-btn");
      refuseButton.addEventListener("click", () => {
        if (confirm("Bạn chắc chắn muốn  ứng viên này?")) {
          refuseCandidate(candidate.id);
        }
      });
    });

    bindStatusChangeEvents();
    filterCandidates();
  }

  function refuseCandidate(applicationId) {
    fetch(`/api/application/${applicationId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "REFUSED" })
    })
      .then((response) => {
        if (!response.ok) throw new Error("Từ chối ứng viên thất bại");
        alert("Đã từ chối ứng viên!");
        loadCandidates();
      })
      .catch((error) => {
        console.error("Lỗi khi từ chối ứng viên:", error);
        alert("Có lỗi khi từ chối ứng viên!");
      });
  }

  function approveCandidate(applicationId, employeeId) {
    const employerId = localStorage.getItem("uid");

    // Gọi API add ApplicationApproval
    fetch(
      `/api/application/approval/add?applicationId=${applicationId}&employerId=${employerId}&employeeId=${employeeId}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("Duyệt thất bại");

        // Nếu duyệt thành công → tiếp tục set status
        return fetch(`/api/application/${applicationId}/status`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "APPROVED" }),
        });
      })
      .then((response) => {
        if (!response.ok) throw new Error("Cập nhật trạng thái thất bại");
        alert("Duyệt ứng viên thành công!");
        loadCandidates();
      })
      .catch((error) => {
        console.error("Lỗi duyệt ứng viên:", error);
        alert("Có lỗi khi duyệt ứng viên!");
      });
  }

  // Lọc ứng viên
  function filterCandidates() {
    const searchTerm = filterInput.value.toLowerCase();
    const statusTerm = statusFilter.value;

    const tableRows = document.querySelectorAll(".table-row");

    tableRows.forEach((row) => {
      const name = row.children[0].textContent.toLowerCase();
      const position = row.children[3].textContent.toLowerCase();
      const status = row.children[4].textContent.trim();

      const matchesSearch =
        name.includes(searchTerm) || position.includes(searchTerm);
      const matchesStatus = statusTerm === "" || status === statusTerm;

      row.style.display = matchesSearch && matchesStatus ? "" : "none";
    });
  }

  filterInput.addEventListener("input", filterCandidates);
  statusFilter.addEventListener("change", filterCandidates);

  // Bắt sự kiện thay đổi status và call API
  function bindStatusChangeEvents() {
    const statusSelects = document.querySelectorAll(".status-select");
    statusSelects.forEach((select) => {
      select.addEventListener("change", function () {
        const candidateId = this.dataset.candidateId;
        const newStatus = this.value;

        fetch(`/api/employer/candidates/${candidateId}/status`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        })
          .then((response) => {
            if (!response.ok) throw new Error("Cập nhật thất bại");
            console.log(`Cập nhật ứng viên ${candidateId} thành ${newStatus}`);
          })
          .catch((error) => {
            console.error("Lỗi cập nhật trạng thái:", error);
            alert("Có lỗi khi cập nhật trạng thái!");
          });
      });
    });
  }

  // Gọi API load ban đầu
  loadCandidates();
});
