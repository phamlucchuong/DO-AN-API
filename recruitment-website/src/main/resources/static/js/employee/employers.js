const apiUrl = '/api/employer/get';
const companiesGrid = document.getElementById('companiesGrid');
const itemsPerPage = 9;
let totalPages = 1;
let currentPage = 0;
let companies = []; // Khai báo biến toàn cục

async function fetchCompanies(page = 0) {
    try {
        const response = await fetch(`${apiUrl}?page=${page}&size=${itemsPerPage}`);
        if (!response.ok) throw new Error('Không thể tải dữ liệu');
        const data = await response.json(); // Đổi tên biến cho rõ ràng
        console.log(data);

        // Lấy số lượng công việc cho từng công ty
        companies = await Promise.all(data.content.map(async company => {
            const jobCountResponse = await fetch(`/api/employer/${company.uid}/jobs/count`);
            const jobCount = jobCountResponse.ok ? await jobCountResponse.json() : 0;
            return {
                uid: company.uid,
                logoUrl: company.companyLogo || 'https://placehold.co/100x50?text=Logo',
                name: company.companyName,
                industry: company.industry,
                location: company.city,
                jobsAvailable: jobCount
            };
        }));

        totalPages = data.totalPages;
        currentPage = data.currentPage;

        renderCompanies();
        renderPagination();
    } catch (error) {
        console.error('Lỗi:', error);
        companiesGrid.innerHTML = '<p>Không thể tải danh sách công ty.</p>';
    }
}

function renderCompanies() {
    companiesGrid.innerHTML = '';
    if (!companies || companies.length === 0) {
        companiesGrid.innerHTML = '<p>Không có công ty nào để hiển thị.</p>';
        return;
    }
    companies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'company-card';
        card.innerHTML = `
            <img src="${company.logoUrl}" alt="${company.name} Logo" class="company-logo-small">
            <div class="company-details">
                <h3>${company.name}</h3>
                <p>Ngành: ${company.industry}</p>
                <p>Vị trí: ${company.location}</p>
                    <a href="/company-detail?uid=${company.uid}" class="text-blue-600 hover:underline">Xem chi tiết</a>
            </div>
        `;
        companiesGrid.appendChild(card);
    });
}

function renderPagination() {
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';

    if (currentPage > 0) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Trang trước';
        prevButton.onclick = () => fetchCompanies(currentPage - 1);
        paginationContainer.appendChild(prevButton);
    }

    if (currentPage < totalPages - 1) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Trang tiếp';
        nextButton.onclick = () => fetchCompanies(currentPage + 1);
        paginationContainer.appendChild(nextButton);
    }

    const oldPagination = document.querySelector('.pagination');
    if (oldPagination) oldPagination.remove();
    companiesGrid.after(paginationContainer);
}

function performSearch() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(keyword)
    );

    if (filteredCompanies.length === 0) {
        companiesGrid.innerHTML = '<p>Không tìm thấy công ty phù hợp.</p>';
        const oldPagination = document.querySelector('.pagination');
        if (oldPagination) oldPagination.remove();
        return;
    }

    companiesGrid.innerHTML = '';
    filteredCompanies.forEach(company => {
        const card = document.createElement('div');
        card.className = 'company-card';
        card.innerHTML = `
            <div>
                <img src="${company.logoUrl}" alt="Logo" class="company-logo-small">
                <div class="company-details">
                    <h3>${company.name}</h3>
                    <p>Ngành: ${company.industry}</p>
                    <p>Vị trí: ${company.location}</p>
                    <a href="/company-detail?uid=${company.uid}" class="text-blue-600 hover:underline">Xem chi tiết</a>
                </div>
            </div>
        `;
        companiesGrid.appendChild(card);
    });

    const oldPagination = document.querySelector('.pagination');
    if (oldPagination) oldPagination.remove();
}

function removeLocation() {
    const locationFilter = document.querySelector('.location-filter');
    if (locationFilter) locationFilter.remove();
}

function closeNotification() {
    const notification = document.querySelector('.header-notification');
    if (notification) notification.style.display = 'none';
}

fetchCompanies();