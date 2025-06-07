document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize fallback data
        const initialData = {
            jobs: [
                { id: 1, title: 'Senior React Developer', isActive: true },
                { id: 2, title: 'UX/UI Designer', isActive: true },
                { id: 3, title: 'Lập trình viên Frontend', isActive: false },
                ...Array(9).fill().map((_, i) => ({ id: i + 4, title: `Job ${i + 4}`, isActive: i % 2 === 0 }))
            ],
            candidates: [
                { id: 1, position: 'Senior Software Engineer', status: 'pending', appliedDate: '2025-01-15' },
                { id: 2, position: 'UX/UI Designer', status: 'interview', appliedDate: '2025-02-10' },
                { id: 3, position: 'Lập trình viên Frontend', status: 'accepted', appliedDate: '2025-03-05' },
                ...Array(244).fill().map((_, i) => ({
                    id: i + 4,
                    position: `Job ${Math.floor(Math.random() * 12) + 1}`,
                    status: ['pending', 'interview', 'accepted', 'rejected'][Math.floor(Math.random() * 4)],
                    appliedDate: `2025-${String(Math.floor(Math.random() * 5) + 1).padStart(2, '0')}-01`
                }))
            ],
            campaigns: [
                { name: 'Chiến dịch IT 2025', applications: 100 },
                { name: 'Chiến dịch Thiết kế', applications: 80 },
                { name: 'Chiến dịch Q1', applications: 67 }
            ]
        };

        // Load data from localStorage or use initial data
        let jobs = JSON.parse(localStorage.getItem('jobs') || JSON.stringify(initialData.jobs));
        let candidates = JSON.parse(localStorage.getItem('candidates') || JSON.stringify(initialData.candidates));
        let campaigns = JSON.parse(localStorage.getItem('campaigns') || JSON.stringify(initialData.campaigns));
        localStorage.setItem('jobs', JSON.stringify(jobs));
        localStorage.setItem('candidates', JSON.stringify(candidates));
        localStorage.setItem('campaigns', JSON.stringify(campaigns));

        // Update stats
        document.getElementById('total-jobs').textContent = jobs.length;
        document.getElementById('total-candidates').textContent = candidates.length;
        document.getElementById('active-jobs').textContent = jobs.filter(j => j.isActive).length;
        document.getElementById('avg-candidates').textContent = jobs.length > 0 ? Math.round(candidates.length / jobs.length) : 0;

        // Candidates over time (Line Chart)
        const candidatesByMonth = candidates.reduce((acc, c) => {
            const month = c.appliedDate.slice(0, 7);
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});
        const months = ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05'];
        const candidateCounts = months.map(m => candidatesByMonth[m] || 0);

        if (document.getElementById('candidates-over-time')) {
            new Chart(document.getElementById('candidates-over-time'), {
                type: 'line',
                data: {
                    labels: months.map(m => `Tháng ${m.slice(5)}`),
                    datasets: [{
                        label: 'Số ứng viên',
                        data: candidateCounts,
                        borderColor: 'var(--vnw-blue)',
                        backgroundColor: 'rgba(0, 91, 150, 0.2)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'top' }
                    },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: 'Số ứng viên' } },
                        x: { title: { display: true, text: 'Tháng' } }
                    }
                }
            });
        }

        // Candidate status ratios (Pie Chart)
        const statusCounts = candidates.reduce((acc, c) => {
            acc[c.status] = (acc[c.status] || 0) + 1;
            return acc;
        }, { pending: 0, interview: 0, accepted: 0, rejected: 0 });

        if (document.getElementById('candidate-status')) {
            new Chart(document.getElementById('candidate-status'), {
                type: 'pie',
                data: {
                    labels: ['Chờ xử lý', 'Phỏng vấn', 'Được nhận', 'Loại'],
                    datasets: [{
                        data: [statusCounts.pending, statusCounts.interview, statusCounts.accepted, statusCounts.rejected],
                        backgroundColor: [
                            'var(--vnw-blue)',
                            'var(--vnw-orange)',
                            'var(--vnw-light-blue)',
                            'var(--vnw-red)'
                        ],
                        borderColor: '#fff',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' }
                    }
                }
            });
        }

        // Campaign effectiveness (Bar Chart)
        if (document.getElementById('campaign-effectiveness')) {
            new Chart(document.getElementById('campaign-effectiveness'), {
                type: 'bar',
                data: {
                    labels: campaigns.map(c => c.name),
                    datasets: [{
                        label: 'Số ứng viên',
                        data: campaigns.map(c => c.applications),
                        backgroundColor: 'var(--vnw-blue)',
                        borderColor: 'var(--vnw-blue)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'top' }
                    },
                    scales: {
                        y: { beginAtZero: true, title: { display: true, text: 'Số ứng viên' } },
                        x: { title: { display: true, text: 'Chiến dịch' } }
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error initializing statistics:', error);
    }
});