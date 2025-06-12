document.addEventListener("DOMContentLoaded", () => {
  // Dữ liệu mẫu (có thể thay bằng API)
  const companiesData = [
    {
      id: 1,
      name: "FPT Software",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23FF6600'/%3E%3Ctext x='20' y='45' font-family='Arial' font-size='12' fill='white'%3EFPT%3C/text%3E%3C/svg%3E",
      industry: "Công nghệ thông tin",
      rating: 4.2,
      location: "Hồ Chí Minh",
      description:
        "FPT Software là công ty phần mềm hàng đầu Việt Nam, chuyên cung cấp các giải pháp công nghệ và dịch vụ phần mềm toàn cầu.",
      address:
        "Tòa nhà FPT, Lô T2, Đường D1, Công viên Công nghệ Sài Gòn, Quận 9, TP.HCM",
      phoneNumber: "028 7300 9999",
      isApproved: true,
      website: "https://www.fpt-software.com",
      companySize: "20,000+ nhân viên",
      taxCode: "0101248148",
      foundedDate: "1988-01-13",
      status: "Hoạt động",
      createdAt: "2020-01-10",
      updatedAt: "2025-06-01",
      city: "Hồ Chí Minh",
      jobs: [
        {
          title: "Java Developer",
          salary: "20-30 triệu",
          location: "Hồ Chí Minh",
        },
        {
          title: "Frontend Engineer",
          salary: "15-25 triệu",
          location: "Hà Nội",
        },
        { title: "QA Engineer", salary: "12-18 triệu", location: "Đà Nẵng" },
      ],
    },
    {
      id: 2,
      name: "Vietcombank",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23009639'/%3E%3Ctext x='15' y='45' font-family='Arial' font-size='10' fill='white'%3EVCB%3C/text%3E%3C/svg%3E",
      industry: "Ngân hàng",
      rating: 4.1,
      location: "Hà Nội",
      description:
        "Vietcombank là một trong những ngân hàng thương mại hàng đầu tại Việt Nam, cung cấp các dịch vụ tài chính đa dạng và hiện đại.",
      address: "198 Trần Quang Khải, Hoàn Kiếm, Hà Nội",
      phoneNumber: "024 3934 1234",
      isApproved: true,
      website: "https://www.vietcombank.com.vn",
      companySize: "10,000+ nhân viên",
      taxCode: "0100112437",
      foundedDate: "1963-04-01",
      status: "Hoạt động",
      createdAt: "2020-02-15",
      updatedAt: "2025-05-20",
      city: "Hà Nội",
      jobs: [
        {
          title: "Chuyên viên tín dụng",
          salary: "15-20 triệu",
          location: "Hà Nội",
        },
        {
          title: "Nhân viên giao dịch",
          salary: "10-15 triệu",
          location: "Hồ Chí Minh",
        },
      ],
    },
    {
      id: 3,
      name: "Samsung Vietnam",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%231428A0'/%3E%3Ctext x='10' y='45' font-family='Arial' font-size='8' fill='white'%3ESAMSUNG%3C/text%3E%3C/svg%3E",
      industry: "Điện tử",
      rating: 4.3,
      location: "Bắc Ninh",
      description:
        "Samsung Vietnam là chi nhánh của tập đoàn Samsung, chuyên sản xuất và lắp ráp các sản phẩm điện tử.",
      address: "KCN Yên Phong, Bắc Ninh",
      phoneNumber: "0222 369 8888",
      isApproved: true,
      website: "https://www.samsung.com/vn",
      companySize: "50,000+ nhân viên",
      taxCode: "2300321234",
      foundedDate: "2008-03-26",
      status: "Hoạt động",
      createdAt: "2020-03-01",
      updatedAt: "2025-04-15",
      city: "Bắc Ninh",
      jobs: [
        {
          title: "Kỹ sư sản xuất",
          salary: "18-25 triệu",
          location: "Bắc Ninh",
        },
        { title: "Nhân viên R&D", salary: "20-30 triệu", location: "Hà Nội" },
      ],
    },
    {
      id: 4,
      name: "VinGroup",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23C41E3A'/%3E%3Ctext x='20' y='45' font-family='Arial' font-size='10' fill='white'%3EVIN%3C/text%3E%3C/svg%3E",
      industry: "Tập đoàn đa ngành",
      rating: 4.0,
      location: "Hà Nội",
      description:
        "VinGroup là tập đoàn đa ngành lớn nhất Việt Nam, hoạt động trong các lĩnh vực bất động sản, y tế, giáo dục, và công nghệ.",
      address: "Số 7, Đường Bằng Lăng 1, Vinhomes Riverside, Hà Nội",
      phoneNumber: "024 3974 9999",
      isApproved: true,
      website: "https://www.vingroup.net",
      companySize: "40,000+ nhân viên",
      taxCode: "0102285589",
      foundedDate: "1993-08-08",
      status: "Hoạt động",
      createdAt: "2020-04-10",
      updatedAt: "2025-03-30",
      city: "Hà Nội",
      jobs: [
        {
          title: "Nhân viên kinh doanh",
          salary: "15-25 triệu",
          location: "Hà Nội",
        },
        {
          title: "Chuyên viên marketing",
          salary: "18-28 triệu",
          location: "Hồ Chí Minh",
        },
      ],
    },
    {
      id: 5,
      name: "Shopee",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23EE4D2D'/%3E%3Ctext x='10' y='45' font-family='Arial' font-size='9' fill='white'%3ESHOPEE%3C/text%3E%3C/svg%3E",
      industry: "Thương mại điện tử",
      rating: 4.2,
      location: "Hồ Chí Minh",
      description:
        "Shopee là nền tảng thương mại điện tử hàng đầu khu vực Đông Nam Á.",
      address: "Tòa nhà Capital Place, 29 Liễu Giai, Ba Đình, Hà Nội",
      phoneNumber: "028 3821 2345",
      isApproved: true,
      website: "https://shopee.vn",
      companySize: "5,000+ nhân viên",
      taxCode: "0314001234",
      foundedDate: "2015-11-11",
      status: "Hoạt động",
      createdAt: "2020-05-01",
      updatedAt: "2025-06-10",
      city: "Hồ Chí Minh",
      jobs: [
        {
          title: "Chuyên viên vận hành",
          salary: "12-18 triệu",
          location: "Hồ Chí Minh",
        },
        {
          title: "Nhân viên chăm sóc khách hàng",
          salary: "10-15 triệu",
          location: "Hà Nội",
        },
      ],
    },
    {
      id: 6,
      name: "Techcombank",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%234A90E2'/%3E%3Ctext x='15' y='45' font-family='Arial' font-size='9' fill='white'%3ETCB%3C/text%3E%3C/svg%3E",
      industry: "Ngân hàng",
      rating: 4.1,
      location: "Hà Nội",
      description:
        "Techcombank là ngân hàng hàng đầu tại Việt Nam, cung cấp các dịch vụ tài chính hiện đại và sáng tạo.",
      address: "Tòa nhà Techcombank, 191 Bà Triệu, Hai Bà Trưng, Hà Nội",
      phoneNumber: "024 3944 5678",
      isApproved: true,
      website: "https://www.techcombank.com.vn",
      companySize: "12,000+ nhân viên",
      taxCode: "0100235638",
      foundedDate: "1993-09-27",
      status: "Hoạt động",
      createdAt: "2020-06-01",
      updatedAt: "2025-05-15",
      city: "Hà Nội",
      jobs: [
        {
          title: "Chuyên viên quan hệ khách hàng",
          salary: "15-20 triệu",
          location: "Hồ Chí Minh",
        },
        { title: "Nhân viên IT", salary: "18-25 triệu", location: "Hà Nội" },
      ],
    },
  ];

  // Lấy ID công ty từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const companyId = parseInt(urlParams.get("id"));

  // Tìm công ty theo ID
  const company = companiesData.find((c) => c.id === companyId);

  if (company) {
    // Điền thông tin công ty
    document.getElementById("companyLogo").src = company.logo;
    document.getElementById("companyName").textContent = company.name;
    document.getElementById("companyIndustry").textContent = company.industry;
    document.getElementById(
      "companyLocation"
    ).innerHTML = `<i class="fas fa-map-marker-alt"></i> ${company.city}`;
    document.getElementById("ratingStars").textContent =
      "★".repeat(Math.floor(company.rating)) +
      "☆".repeat(5 - Math.floor(company.rating));
    document.getElementById("ratingNumber").textContent = company.rating;
    document.getElementById("companyDescription").textContent =
      company.description;
    document.getElementById("companyAddress").textContent = company.address;
    document.getElementById("phoneNumber").textContent = company.phoneNumber;
    document.getElementById("isApproved").textContent = company.isApproved
      ? "Đã phê duyệt"
      : "Chưa phê duyệt";
    document.getElementById("companyWebsite").textContent = company.website;
    document.getElementById("companyWebsite").href = company.website;
    document.getElementById("companySize").textContent = company.companySize;
    document.getElementById("taxCode").textContent = company.taxCode;
    document.getElementById("foundedDate").textContent = new Date(
      company.foundedDate
    ).toLocaleDateString("vi-VN");
    document.getElementById("status").textContent = company.status;
    document.getElementById("createdAt").textContent = new Date(
      company.createdAt
    ).toLocaleDateString("vi-VN");
    document.getElementById("updatedAt").textContent = new Date(
      company.updatedAt
    ).toLocaleDateString("vi-VN");
    document.getElementById("city").textContent = company.city;

    // Điền danh sách công việc
    const jobsList = document.getElementById("jobsList");
    company.jobs.forEach((job) => {
      const jobCard = document.createElement("div");
      jobCard.className = "job-card";
      jobCard.innerHTML = `
        <div class="job-title">${job.title}</div>
        <div class="job-meta">
          <div class="job-salary"><i class="fas fa-money-bill-wave"></i> ${job.salary}</div>
          <div class="job-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</div>
        </div>
      `;
      jobsList.appendChild(jobCard);
    });
  } else {
    // Hiển thị thông báo nếu không tìm thấy công ty
    document.getElementById("companyDetail").innerHTML =
      '<div class="container"><h2>Không tìm thấy công ty</h2></div>';
  }
});
