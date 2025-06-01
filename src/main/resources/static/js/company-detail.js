document.addEventListener("DOMContentLoaded", () => {
  // Dữ liệu mẫu (có thể thay bằng API)
  const companiesData = [
    {
      id: 1,
      name: "FPT Software",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23FF6600'/%3E%3Ctext x='20' y='45' font-family='Arial' font-size='12' fill='white'%3EFPT%3C/text%3E%3C/svg%3E",
      jobCount: 245,
      industry: "Công nghệ thông tin",
      rating: 4.2,
      location: "Hồ Chí Minh",
      description:
        "FPT Software là công ty phần mềm hàng đầu Việt Nam, chuyên cung cấp các giải pháp công nghệ và dịch vụ phần mềm toàn cầu. Được thành lập từ năm 1988, FPT Software hiện có mặt tại hơn 20 quốc gia với hơn 20,000 nhân viên.",
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
      jobCount: 89,
      industry: "Ngân hàng",
      rating: 4.1,
      location: "Hà Nội",
      description:
        "Vietcombank là một trong những ngân hàng thương mại hàng đầu tại Việt Nam, cung cấp các dịch vụ tài chính đa dạng và hiện đại. Chúng tôi luôn tìm kiếm nhân tài để đồng hành cùng sự phát triển.",
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
      jobCount: 156,
      industry: "Điện tử",
      rating: 4.3,
      location: "Bắc Ninh",
      description:
        "Samsung Vietnam là chi nhánh của tập đoàn Samsung, chuyên sản xuất và lắp ráp các sản phẩm điện tử. Chúng tôi cam kết tạo môi trường làm việc sáng tạo và chuyên nghiệp.",
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
      jobCount: 178,
      industry: "Tập đoàn đa ngành",
      rating: 4.0,
      location: "Hà Nội",
      description:
        "VinGroup là tập đoàn đa ngành lớn nhất Việt Nam, hoạt động trong các lĩnh vực bất động sản, y tế, giáo dục, và công nghệ. Chúng tôi luôn chào đón nhân tài ở mọi lĩnh vực.",
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
      jobCount: 134,
      industry: "Thương mại điện tử",
      rating: 4.2,
      location: "Hồ Chí Minh",
      description:
        "Shopee là nền tảng thương mại điện tử hàng đầu khu vực Đông Nam Á. Chúng tôi cung cấp môi trường làm việc năng động và cơ hội phát triển vượt bậc.",
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
      jobCount: 92,
      industry: "Ngân hàng",
      rating: 4.1,
      location: "Hồ Chí Minh",
      description:
        "Techcombank là ngân hàng hàng đầu tại Việt Nam, cung cấp các dịch vụ tài chính hiện đại và sáng tạo. Gia nhập chúng tôi để cùng tạo nên tương lai tài chính bền vững.",
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
    ).innerHTML = `<i class="fas fa-map-marker-alt"></i> ${company.location}`;
    document.getElementById("ratingStars").textContent =
      "★".repeat(Math.floor(company.rating)) +
      "☆".repeat(5 - Math.floor(company.rating));
    document.getElementById("ratingNumber").textContent = company.rating;
    document.getElementById("companyDescription").textContent =
      company.description;

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
