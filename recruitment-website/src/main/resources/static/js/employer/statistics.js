// Parse JWT function
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

// Animate counter function
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    let currentValue = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            element.textContent = targetValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 30);
}

// Update statistics cards
function updateStatistics(jobs, data) {
    const totalJobs = jobs.length;
    const openJobs = jobs.filter(job => job.status === "OPEN").length;
    const closedJobs = jobs.filter(job => job.status === "CLOSED").length;
    const totalCandidates = data.totalCount;

    animateCounter("total-jobs", totalJobs);
    animateCounter("open-jobs", openJobs);
    animateCounter("closed-jobs", closedJobs);
    animateCounter("total-candidates", totalCandidates);
}

// Generate gradient colors
function generateGradientColors(count) {
    const colors = [];
    const hueStep = 360 / count;
    for (let i = 0; i < count; i++) {
        const hue = i * hueStep;
        colors.push(`hsla(${hue}, 70%, 60%, 0.8)`);
    }
    return colors;
}

// Create job status chart
function createJobStatusChart(jobs) {
    const openJobs = jobs.filter(job => job.status === "OPEN").length;
    const closedJobs = jobs.filter(job => job.status === "CLOSED").length;

    const ctx = document.getElementById('jobStatusChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Đang tuyển", "Đã đóng"],
            datasets: [{
                data: [openJobs, closedJobs],
                backgroundColor: [
                    'rgba(59, 140, 194, 0.8)',
                    'rgba(211, 47, 47, 0.8)'
                ],
                borderColor: [
                    'rgba(59, 140, 194, 1)',
                    'rgba(211, 47, 47, 1)'
                ],
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: { size: 14, weight: '600' }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((context.raw / total) * 100);
                            return `${context.label}: ${context.raw} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500
            }
        }
    });
}

// Create candidate distribution chart
function createCandidateChart(jobs) {
    const labels = jobs.map(job => job.title);
    const data = jobs.map(job => job.applicationCount || 0);

    const ctx = document.getElementById('candidateChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Số ứng viên',
                data: data,
                backgroundColor: generateGradientColors(data.length),
                borderColor: 'rgba(59, 140, 194, 1)',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: function (context) {
                            return context[0].label;
                        },
                        label: function (context) {
                            return `Ứng viên: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 5, font: { size: 12 } },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' }
                },
                x: {
                    ticks: { maxRotation: 45, font: { size: 11 } },
                    grid: { display: false }
                }
            },
            animation: { duration: 1500, easing: 'easeOutQuart' }
        }
    });
}

// Load job data from API
function loadJobs() {
    const token = localStorage.getItem("idToken");
    const uid = localStorage.getItem("uid");

    return fetch(`/api/employer/job/getAllByEmployer?employerId=${uid}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Lỗi khi tải dữ liệu công việc");
        }
        return response.json();
    })
    .then(async (data) => {
        console.log("Dữ liệu jobs:", data.jobs);

        // Duyệt từng job và load số lượng candidate
        const jobsWithCandidates = await Promise.all(
            data.jobs.map(async (job) => {
                const candidates = await loadCandidates(job.id);
                job.applicationCount = candidates.length;
                return job;
            })
        );

        return { jobs: jobsWithCandidates, data: data };
    })
    .catch((error) => {
        console.error("Lỗi khi tải danh sách công việc:", error);
        return { jobs: [], data: { totalCount: 0 } };
    });
}


// Load candidate data from API
function loadCandidates(jobId) {
    const token = localStorage.getItem("idToken");
    const uid = localStorage.getItem("uid");

    return fetch(`/api/application/employer/job?employerId=${uid}&jobId=${jobId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Lỗi khi tải dữ liệu ứng viên");
            }
            return response.json();
        })
        .then((data) => {
          console.log("hehe" ,data);
            console.log("Dữ liệu candidates:", data.applications);
            return data.applications;
        })
        .catch((error) => {
            console.error("Lỗi khi tải danh sách ứng viên:", error);
            return [];
        });
}

// Initialize dashboard
function initializeDashboard() {
    const token = localStorage.getItem("idToken");
    if (!token) {
        alert("Vui lòng đăng nhập.");
        window.location.href = "/employer/login";
        return;
    }

    loadJobs().then((result) => {
        updateStatistics(result.jobs, result.data);

        setTimeout(() => {
            createJobStatusChart(result.jobs);
            createCandidateChart(result.jobs);
        }, 500);
    });
}

// Khởi chạy khi DOM load xong
document.addEventListener("DOMContentLoaded", initializeDashboard);
