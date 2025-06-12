function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Lỗi parse JWT:", error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("idToken");
  console.log("Token lấy từ localStorage:", token);

  if (!token) {
    alert("Vui lòng đăng nhập.");
    window.location.href = "/employer/login";
    return;
  }

  const payload = parseJwt(token);
  if (!payload || !payload.user_id) {
    alert("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
    return;
  }

  fetch(`/api/employer/job/get?employerId=${payload.user_id}`)
    .then(res => res.json())
    .then(data => {
        const jobs = data.jobs;
        drawJobStatusChart(jobs);
        drawCandidatePieChart(jobs);
    })
    .catch(err => {
      console.error("Lỗi load dữ liệu jobs:", err);
    });
});

function drawJobStatusChart(jobs) {
  const openJobs = jobs.filter(job => job.status === "OPEN").length;
  const closedJobs = jobs.filter(job => job.status === "CLOSED").length;

  const ctx = document.createElement("canvas");
  document.querySelector(".charts-grid").appendChild(ctx);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["OPEN", "CLOSED"],
      datasets: [{
        label: "Số lượng job",
        data: [openJobs, closedJobs],
        backgroundColor: ["#42a5f5", "#ef5350"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Trạng thái tin tuyển dụng"
        }
      }
    }
  });
}

function drawCandidatePieChart(jobs) {
  const labels = jobs.map(job => job.title);
  const candidateCounts = jobs.map(job => job.applicationCount || 0);

    console.log(candidateCounts);
  const ctx = document.createElement("canvas");
  document.querySelector(".charts-grid").appendChild(ctx);

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: "Ứng viên",
        data: candidateCounts,
        backgroundColor: generateColors(candidateCounts.length)
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: "Số lượng ứng viên theo từng job"
        }
      }
    }
  });
}

function generateColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(`hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`);
  }
  return colors;
}