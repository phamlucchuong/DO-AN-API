let applications = [];


async function getApplies(uid) {
  try {
    const response = await fetch(`/api/application/${uid}/list`, {
      method: 'GET'
    });

    if (!response.ok) {
      console.log("loi khi lay apply");
      return;
    }

    const applies = await response.json();
    return applies;

  } catch (error) {
    console.error("loi khi lay apply", error);
  }
}

async function putApplies(uid, cvLink) {
  try {
    const response = await fetch(`/api/application/${uid}/list`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(cvLink),
    });

    if (!response.ok) {
      console.log("loi khi lay apply");
      return;
    }


  } catch (error) {
    console.error("loi khi lay apply", error);
  }
}

async function deleteApplies(uid) {
  try {
    const response = await fetch(`/api/application/${uid}/list`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.log("loi khi xoa apply");
      return;
    }


  } catch (error) {
    console.error("loi khi xoa apply", error);
  }
}

// Function to render applications
async function renderApplications() {
  const applicationsList = document.getElementById("applicationsList");
  applicationsList.innerHTML = "";

  applications = await getApplies(localStorage.getItem('uid'));
  console.log(localStorage.getItem('uid'));

  applications.forEach((app) => {
    const applicationItem = document.createElement("div");
    applicationItem.className = "application-item";

    const applicationInfo = document.createElement("div");
    applicationInfo.className = "application-info";

    const title = document.createElement("div");
    title.className = "application-title";
    title.textContent = app.job.title;

    const company = document.createElement("div");
    company.className = "application-company";
    company.textContent = `Công ty: ${app.job.employer.companyName}`;

    const date = document.createElement("div");
    date.className = "application-date";
    date.textContent = `Ngày ứng tuyển: ${formatDate(app.createdDate)}`;

    const status = document.createElement("div");
    status.className = `application-status status-${app.status}`;

    var color;
    switch (app.status) {
      case 'CANCEL':
        color = 'Yellow';
        break;
      case 'REFUSE':
        color = 'Red';
        break;
      case 'PENDING':
        color = 'Blue';
        break;
      case 'APPROVED':
        color = 'Green';
        break;
      default:
        break;

    }

    applicationItem.style.borderColor = color;

    const actions = document.createElement("div");
    actions.className = "application-actions";

    if (app.status === 'PENDING') {
      const editButton = document.createElement("button");
      editButton.className = "application-action-btn";
      editButton.innerHTML = '<i class="fas fa-edit"></i> Sửa CV';
      editButton.dataset.appId = app.id;

      const deleteButton = document.createElement("button");
      deleteButton.className = "application-action-btn delete";
      deleteButton.innerHTML = '<i class="fas fa-trash"></i> Xóa CV';
      deleteButton.dataset.appId = app.id;

      actions.appendChild(editButton);
      actions.appendChild(deleteButton);
    }


    applicationInfo.appendChild(title);
    applicationInfo.appendChild(company);
    applicationInfo.appendChild(date);

    applicationItem.appendChild(applicationInfo);
    applicationItem.appendChild(status);
    applicationItem.appendChild(actions);
    applicationsList.appendChild(applicationItem);
  });
}

// Function to format date
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

// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
  // Set profile name (replace with actual user data)
  const sidebarName = document.getElementById("sidebarName");
  sidebarName.textContent = "Nguyễn Văn A";

  // Render applications
  await renderApplications();

  // Modal elements
  const editCVModal = document.getElementById("editCVModal");
  const deleteCVModal = document.getElementById("deleteCVModal");
  const closeEditModal = document.getElementById("closeEditModal");
  const cancelEditCV = document.getElementById("cancelEditCV");
  const saveEditCV = document.getElementById("saveEditCV");
  const editCVUpload = document.getElementById("editCVUpload");
  const closeDeleteModal = document.getElementById("closeDeleteModal");
  const cancelDeleteCV = document.getElementById("cancelDeleteCV");
  const confirmDeleteCV = document.getElementById("confirmDeleteCV");
  const deleteJobTitle = document.getElementById("deleteJobTitle");
  const deleteCompany = document.getElementById("deleteCompany");

  let currentAppId = null;

  // Handle Edit CV button clicks
  document
    .querySelectorAll(".application-action-btn:not(.delete)")
    .forEach((button) => {
      button.addEventListener("click", () => {
        currentAppId = parseInt(button.dataset.appId);
        editCVModal.style.display = "flex";
      });
    });

  // Handle Delete CV button clicks
  document
    .querySelectorAll(".application-action-btn.delete")
    .forEach((button) => {
      button.addEventListener("click", () => {
        currentAppId = parseInt(button.dataset.appId);
        const app = applications.find((a) => a.id === currentAppId);
        if (app) {
          deleteJobTitle.textContent = app.title;
          deleteCompany.textContent = app.company;
          deleteCVModal.style.display = "flex";
        }
      });
    });

  // Close modals
  closeEditModal.addEventListener("click", () => {
    editCVModal.style.display = "none";
    editCVUpload.value = "";
  });

  cancelEditCV.addEventListener("click", () => {
    editCVModal.style.display = "none";
    editCVUpload.value = "";
  });

  closeDeleteModal.addEventListener("click", () => {
    deleteCVModal.style.display = "none";
  });

  cancelDeleteCV.addEventListener("click", () => {
    deleteCVModal.style.display = "none";
  });

  // Handle click outside modals
  window.addEventListener("click", (event) => {
    if (event.target === editCVModal) {
      editCVModal.style.display = "none";
      editCVUpload.value = "";
    }
    if (event.target === deleteCVModal) {
      deleteCVModal.style.display = "none";
    }
  });

  // Handle Save Edit CV
  saveEditCV.addEventListener("click", () => {
    const file = editCVUpload.files[0];
    if (file && file.type === "application/pdf") {
      const app = applications.find((a) => a.id === currentAppId);
      if (app) {
        alert(`Đã cập nhật CV cho vị trí ${app.title} tại ${app.company}.`);
        editCVModal.style.display = "none";
        editCVUpload.value = "";
      }
    } else {
      alert("Vui lòng tải lên file PDF hợp lệ!");
    }
  });

  // Handle Confirm Delete CV
  confirmDeleteCV.addEventListener("click", () => {
    const appIndex = applications.findIndex((a) => a.id === currentAppId);
    if (appIndex !== -1) {
      const app = applications[appIndex];
      alert(`Đã xóa CV cho vị trí ${app.title} tại ${app.company}.`);
      applications.splice(appIndex, 1);
      renderApplications();
      deleteCVModal.style.display = "none";
    }
  });
});
