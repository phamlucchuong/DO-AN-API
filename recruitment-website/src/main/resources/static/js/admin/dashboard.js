const jobsCtx = document.getElementById("jobsChart").getContext("2d");

// Khởi tạo chart rỗng
const jobsChart = new Chart(jobsCtx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Công việc đăng mới",
        data: [],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Nhà tuyển dụng mới",
        data: [],
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.8)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "rgba(255, 255, 255, 0.8)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  },
});

// Hàm fetch data và cập nhật chart
function loadChartData() {
  const period = document.getElementById("chartPeriod").value;
  console.log("Chọn khoảng thời gian:", period);

  fetch(`/api/admin/chart-data?period=${period}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Dữ liệu chart:", data);

      // Cập nhật labels và datasets
      jobsChart.data.labels = data.labels;
      jobsChart.data.datasets[0].data = data.newJobs;
      jobsChart.data.datasets[1].data = data.newEmployers;

      // Cập nhật lại chart
      jobsChart.update();
    })
    .catch((error) => {
      console.error("Lỗi khi lấy dữ liệu biểu đồ:", error);
    });
}

// Gọi lần đầu mặc định
loadChartData();

const typeCtx = document.getElementById("jobTypeChart").getContext("2d");

const jobTypeChart = new Chart(typeCtx, {
  type: "doughnut",
  data: {
    labels: [],
    datasets: [
      {
        label: "Số lượng công việc",
        data: [],
        backgroundColor: [
          "#4CAF50",
          "#FFC107",
          "#2196F3",
          "#FF5722",
          "#9C27B0"
        ],
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white"
        }
      }
    }
  }
});

function loadJobTypeChart() {
  fetch("/api/admin/job-type-distribution")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const labels = Object.keys(data);
      const values = Object.values(data);

      jobTypeChart.data.labels = labels;
      jobTypeChart.data.datasets[0].data = values;
      jobTypeChart.update();
    })
    .catch((error) => {
      console.error("Lỗi khi lấy dữ liệu phân bố loại công việc:", error);
    });
}

// Load chart lần đầu
loadJobTypeChart();


document.addEventListener("DOMContentLoaded", function () {
  // Gọi API job statistics
  fetch("/api/employer/job/statistics")
    .then((response) => response.json())
    .then((data) => {
      updateStatCard(1, data.currentMonth, data.lastMonth);
    })
    .catch((error) => console.error("Lỗi khi load thống kê công việc:", error));

  // Gọi API employer statistics
  fetch("/api/employer/statistics")
    .then((response) => response.json())
    .then((data) => {
      updateStatCard(3, data.currentMonth, data.lastMonth);
      console.log(data.currentMonth, data.lastMonth);
    })
    .catch((error) =>
      console.error("Lỗi khi load thống kê nhà tuyển dụng:", error)
    );

  fetch('/api/employer/pending')
        .then(response => response.json())
        .then(data => {
            const pendingCount = data.length;

            const card = document.querySelector('.quick-actions a[href="/admin/employers-management"]');
            if (card) {
                card.querySelector("p").textContent = `${pendingCount} tài khoản chờ duyệt`;
            }
        })
        .catch(error => console.error('Lỗi khi load danh sách tài khoản chờ duyệt:', error));
});

// Hàm chung cập nhật stat-card
function updateStatCard(cardIndex, currentValue, lastValue) {
    let trendPercent = 0;
    let trendClass = "up";
    let trendIcon = "fa-arrow-up";

    if (lastValue > 0) {
        trendPercent = (((currentValue - lastValue) / lastValue) * 100).toFixed(1);
        if (trendPercent < 0) {
            trendClass = "down";
            trendIcon = "fa-arrow-down";
        }
    } else if (lastValue === 0 && currentValue > 0) {
        trendPercent = 100;
        trendClass = "up";
        trendIcon = "fa-arrow-up";
    } else {
        trendPercent = 0;
    }

    const card = document.querySelector(`.stat-card:nth-child(${cardIndex})`);
    const trendElement = card.querySelector(".trend");

    card.querySelector("h3").textContent = currentValue;

    trendElement.classList.remove("up", "down");
    trendElement.classList.add(trendClass);
    trendElement.innerHTML = `<i class="fas ${trendIcon}"></i> ${trendPercent}%`;
}
