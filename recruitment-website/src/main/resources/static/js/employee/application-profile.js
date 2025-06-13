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
    const formData = new FormData();
    formData.append("cvLink", cvLink); // file pdf

    const response = await fetch(`/api/application/${uid}/update-cv`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      console.log("loi khi cap nhat cv");
      return;
    }
    console.log("cap nhat cv thanh cong");

  } catch (error) {
    console.error("loi khi cap nhat cv", error);
  }
}

// ✅ Fixed: Changed to use application ID instead of user ID
async function deleteApplies(applicationId) {
  try {
    const response = await fetch(`/api/application/${applicationId}/delete`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.log("loi khi xoa apply");
      return false;
    }

    return true;

  } catch (error) {
    console.error("loi khi xoa apply", error);
    return false;
  }
}

// Function to render applications
async function renderApplications() {
  const applicationsList = document.getElementById("applicationsList");
  applicationsList.innerHTML = "";

  applications = await getApplies(localStorage.getItem('uid'));
  console.log(localStorage.getItem('uid'));

  applications.forEach(app => {
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
      case 'REFUSED':
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

      // ✅ Debug: Add console log to check if buttons are created
      console.log("Created buttons for app ID:", app.id);

      // ✅ Add event listeners directly when creating buttons
      editButton.addEventListener("click", (e) => {
        console.log("Edit button clicked for app:", app.id);
        window.currentAppId = app.id;
        const editCVModal = document.getElementById("editCVModal");
        if (editCVModal) {
          editCVModal.style.display = "flex";
        }
      });

      deleteButton.addEventListener("click", (e) => {
        console.log("Delete button clicked for app:", app.id);
        window.currentAppId = app.id;
        const deleteCVModal = document.getElementById("deleteCVModal");
        const deleteJobTitle = document.getElementById("deleteJobTitle");
        const deleteCompany = document.getElementById("deleteCompany");

        if (deleteCVModal && deleteJobTitle && deleteCompany) {
          deleteJobTitle.textContent = app.job.title;
          deleteCompany.textContent = app.job.employer.companyName;
          deleteCVModal.style.display = "flex";
        } else {
          console.error("Modal elements not found!");
        }
      });

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

  // ✅ Use window.currentAppId to make it globally accessible
  window.currentAppId = null;

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
  saveEditCV.addEventListener("click", async () => {
    const file = editCVUpload.files[0];
    if (file && file.type === "application/pdf") {
      const app = applications.find((a) => a.id === window.currentAppId);
      if (app) {
        try {
          const result = await putApplies(app.id, file);
          if (result) {
            alert(`Đã cập nhật CV cho vị trí ${app.job.title} tại ${app.job.employer.companyName}.`);
            await renderApplications(); // Re-render the list
            editCVModal.style.display = "none";
            editCVUpload.value = "";
          }

        } catch (error) {

        }

      }
    } else {
      alert("Vui lòng tải lên file PDF hợp lệ!");
    }
  });

  // ✅ Fixed: Handle Confirm Delete CV
  confirmDeleteCV.addEventListener("click", async () => {
    console.log("Confirm delete clicked for app ID:", window.currentAppId);
    const app = applications.find((a) => a.id === window.currentAppId);
    if (app) {
      // Show loading state
      confirmDeleteCV.disabled = true;
      confirmDeleteCV.textContent = "Đang xóa...";

      try {
        // Call delete API with application ID
        console.log("Calling deleteApplies with ID:", app.id);
        const success = await deleteApplies(app.id);

        if (success) {
          // Remove from local array and update UI
          const appIndex = applications.findIndex((a) => a.id === window.currentAppId);
          if (appIndex !== -1) {
            applications.splice(appIndex, 1);
          }

          alert(`Đã xóa CV cho vị trí ${app.job.title} tại ${app.job.employer.companyName}.`);
          await renderApplications(); // Re-render the list
          deleteCVModal.style.display = "none";
        } else {
          alert("Có lỗi xảy ra khi xóa CV. Vui lòng thử lại!");
        }
      } catch (error) {
        console.error("Error deleting application:", error);
        alert("Có lỗi xảy ra khi xóa CV. Vui lòng thử lại!");
      } finally {
        // Reset button state
        confirmDeleteCV.disabled = false;
        confirmDeleteCV.textContent = "Xác nhận";
      }
    } else {
      console.error("App not found for ID:", window.currentAppId);
    }
  });

});