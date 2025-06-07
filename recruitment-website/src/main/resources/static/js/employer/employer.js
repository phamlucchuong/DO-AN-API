document.addEventListener("DOMContentLoaded", function () {
  loadDashboardStats();
});

function loadDashboardStats() {
  // Load stats from localStorage or API
  const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
  const candidates = JSON.parse(localStorage.getItem("candidates") || "[]");

  document.getElementById("total-jobs").textContent = jobs.length;
  document.getElementById("total-candidates").textContent = candidates.length;
  document.getElementById("active-jobs").textContent = jobs.filter(
    (j) => j.isActive
  ).length;
  document.getElementById("avg-candidates").textContent =
    jobs.length > 0 ? Math.round(candidates.length / jobs.length) : 0;
}