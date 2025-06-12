// Sample data for applications (replace with actual API call in production)
const applications = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp",
    date: "2025-06-01",
    status: "approved",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Innovate Ltd",
    date: "2025-05-28",
    status: "pending",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignHub",
    date: "2025-05-20",
    status: "rejected",
  },
];

// Function to render applications
function renderApplications() {
  const applicationsList = document.getElementById("applicationsList");
  applicationsList.innerHTML = "";

  applications.forEach((app) => {
    const applicationItem = document.createElement("div");
    applicationItem.className = "application-item";

    const applicationInfo = document.createElement("div");
    applicationInfo.className = "application-info";

    const title = document.createElement("div");
    title.className = "application-title";
    title.textContent = app.title;

    const company = document.createElement("div");
    company.className = "application-company";
    company.textContent = `Công ty: ${app.company}`;

    const date = document.createElement("div");
    date.className = "application-date";
    date.textContent = `Ngày ứng tuyển: ${app.date}`;

    const status = document.createElement("div");
    status.className = `application-status status-${app.status}`;
    status.textContent =
      app.status === "approved"
        ? "Đã duyệt"
        : app.status === "pending"
        ? "Đang chờ duyệt"
        : "Bị từ chối";

    applicationInfo.appendChild(title);
    applicationInfo.appendChild(company);
    applicationInfo.appendChild(date);
    applicationItem.appendChild(applicationInfo);
    applicationItem.appendChild(status);
    applicationsList.appendChild(applicationItem);
  });
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Set profile name (replace with actual user data)
  const sidebarName = document.getElementById("sidebarName");
  sidebarName.textContent = "Nguyễn Văn A";

  // Render applications
  renderApplications();
});
