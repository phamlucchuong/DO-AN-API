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

function normalizeStatus(status) {
  if (!status) return status;
  return status.toLowerCase();
}

function getStatusDisplayName(status) {
  const map = {
    'open': 'Mở',
    'urgent': 'Khẩn cấp',
    'closed': 'Đóng'
  };
  return map[normalizeStatus(status)] || status;
}

function getWorkingHoursDisplayName(value) {
  const map = {
    'EIGHTTOSEVENTEEN': 'Từ 8AM đến 17PM',
    'NINETOEIGHTEEN': 'Từ 9AM đến 18PM'
  };
  return map[value] || 'Không xác định';
}

function formatMultilineText(text) {
  if (!text) return 'Không có';
  return '<ul>' + text.split('\n').map(item => `<li>${item.trim()}</li>`).join('') + '</ul>';
}

document.addEventListener('DOMContentLoaded', function () {
  const token = localStorage.getItem('idToken');
  console.log('Token lấy từ localStorage:', token);

  if (!token) {
    alert('Vui lòng đăng nhập.');
    window.location.href = '/employer/login';
    return;
  }

  const payload = parseJwt(token);
  if (!payload || !payload.user_id) {
    alert('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
    return;
  }

  const jobsContainer = document.getElementById('recent-jobs');
  const totalJobElement = document.getElementById('totalJobs');
  const activeJobsElement = document.getElementById('activeJobs');
  const totalCandidatesElement = document.getElementById('totalCandidates');
  const paginationContainer = document.getElementById('pagination');

  if (!jobsContainer || !totalJobElement || !activeJobsElement || !totalCandidatesElement || !paginationContainer) {
    console.error('Một hoặc nhiều phần tử DOM không tồn tại:', {
      jobsContainer: !!jobsContainer,
      totalJobElement: !!totalJobElement,
      activeJobsElement: !!activeJobsElement,
      totalCandidatesElement: !!totalCandidatesElement,
      paginationContainer: !!paginationContainer
    });
    alert('Lỗi giao diện: Một số phần tử không được tìm thấy. Vui lòng liên hệ hỗ trợ.');
    return;
  }

  let currentPage = 1;
  const limit = 10;

  function loadJobs(page) {
    fetch(`/api/employer/job/get?employerId=${payload.user_id}&page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || 'Lỗi khi tải dữ liệu tin tuyển dụng');
          });
        }
        return response.json();
      })
      .then(data => {
        jobsContainer.innerHTML = '';
        if (!data || typeof data !== 'object') {
          throw new Error('Dữ liệu API không hợp lệ');
        }

        totalJobElement.textContent = data.totalCount || 0;
        const activeJobs = data.jobs ? data.jobs.filter(job => normalizeStatus(job.status) === 'open').length : 0;
        activeJobsElement.textContent = activeJobs;
        const totalCandidates = data.jobs ? data.jobs.reduce((sum, job) => sum + (job.applicationCount || 0), 0) : 0;
        totalCandidatesElement.textContent = totalCandidates;

        if (!data.jobs || data.jobs.length === 0) {
          jobsContainer.innerHTML = '<p>Chưa có tin tuyển dụng nào.</p>';
          paginationContainer.innerHTML = '';
          return;
        }

        data.jobs.forEach(job => {
          const urgentTag = normalizeStatus(job.status) === 'urgent' ? '<span style="background: #f59e0b; color: white;">⚡ Khá gấp</span>' : '';
          const jobCard = `
            <div class="job-card" id="job-${job.id}">
              <h3>${job.title || 'Không có tiêu đề'}</h3>
              <div class="job-meta">
                <span>🏢 ${job.employer?.companyName || 'Không xác định'}</span>
                <span>📍 ${job.address || 'Không xác định'}</span>
                <span>💼 ${job.employmentType || 'Không xác định'}</span>
                <span>💰 ${job.salary || 'Thỏa thuận'}</span>
                ${urgentTag}
              </div>
              <div class="candidate-count">${job.applicationCount || 0} candidates applied</div>
              <div class="job-actions">
                <button class="btn btn-secondary" data-job-id="${job.id}" data-action="detail">👥 Xem chi tiết</button>
                <button class="btn" data-job-id="${job.id}" data-action="edit">✏️ Chỉnh sửa</button>
              </div>
              <div class="job-detail" id="job-detail-${job.id}" style="display: none; margin-top: 10px; padding: 10px; background: #f9f9f9; border: 1px solid #ccc;">
                <p>Đang tải chi tiết...</p>
              </div>
              <div class="job-edit" id="job-edit-${job.id}" style="display: none; margin-top: 10px; padding: 10px; background: #f9f9f9; border: 1px solid #ccc;">
                <p>Đang tải biểu mẫu chỉnh sửa...</p>
              </div>
            </div>
          `;
          jobsContainer.innerHTML += jobCard;
        });

        // Gắn sự kiện sau khi tạo các phần tử
        jobsContainer.addEventListener('click', (event) => {
          const button = event.target.closest('button[data-action]');
          if (!button) return;

          const jobId = button.dataset.jobId;
          const action = button.dataset.action;

          if (action === 'detail') {
            toggleJobDetail(jobId);
          } else if (action === 'edit') {
            toggleEditJob(jobId);
          } else if (action === 'close-detail') {
            closeJobDetail(jobId);
          } else if (action === 'update') {
            updateJob(jobId);
          } else if (action === 'close-edit') {
            closeEditJob(jobId);
          }
        });

        const totalPages = data.totalPages || 1;
        currentPage = page;
        renderPaginationControls(currentPage, totalPages);
      })
      .catch(error => {
        console.error('Lỗi khi tải dữ liệu:', error);
        jobsContainer.innerHTML = `<p>Lỗi khi tải dữ liệu: ${error.message}</p>`;
        paginationContainer.innerHTML = '';
      });
  }

  function renderPaginationControls(current, total) {
    if (!paginationContainer) {
      console.error('paginationContainer không tồn tại');
      return;
    }

    if (total <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let controlsHTML = '';
    if (current > 1) {
      controlsHTML += `<button id="prevPage" class="btn">Previous</button>`;
    } else {
      controlsHTML += `<button class="btn" disabled>Previous</button>`;
    }

    controlsHTML += ` <span>Page ${current} of ${total}</span> `;

    if (current < total) {
      controlsHTML += `<button id="nextPage" class="btn">Next</button>`;
    } else {
      controlsHTML += `<button class="btn" disabled>Next</button>`;
    }

    paginationContainer.innerHTML = controlsHTML;

    if (current > 1) {
      const prevButton = document.getElementById('prevPage');
      if (prevButton) {
        prevButton.addEventListener('click', () => loadJobs(current - 1));
      }
    }
    if (current < total) {
      const nextButton = document.getElementById('nextPage');
      if (nextButton) {
        nextButton.addEventListener('click', () => loadJobs(current + 1));
      }
    }
  }

  function toggleJobDetail(jobId) {
    const detailDiv = document.getElementById(`job-detail-${jobId}`);
    const editDiv = document.getElementById(`job-edit-${jobId}`);
    const token = localStorage.getItem('idToken');

    if (!detailDiv) {
      console.error(`job-detail-${jobId} không tồn tại`);
      return;
    }

    if (editDiv) {
      editDiv.style.display = 'none';
    }

    if (detailDiv.style.display === 'none') {
      fetch(`/api/employer/job/detail/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Không tìm thấy công việc');
          }
          return response.json();
        })
        .then(job => {
          detailDiv.innerHTML = `
            <h2>${job.title}</h2>
            <p><strong>Công ty:</strong> ${job.employer?.companyName || 'Không xác định'}</p>
            <p><strong>Địa chỉ:</strong> ${job.address || 'Không xác định'}</p>
            <p><strong>Thành phố:</strong> ${job.city || 'Không xác định'}</p>
            <p><strong>Loại hình công việc:</strong> ${job.employmentType || 'Không xác định'}</p>
            <p><strong>Cấp độ:</strong> ${job.jobLevel || 'Không xác định'}</p>
            <p><strong>Mức lương:</strong> ${job.salary || 'Thỏa thuận'}</p>
            <p><strong>Kinh nghiệm:</strong> ${job.experience || 'Không yêu cầu'}</p>
            <p><strong>Yêu cầu:</strong> ${formatMultilineText(job.requirements)}</p>
            <p><strong>Mô tả:</strong> ${formatMultilineText(job.description)}</p>
            <p><strong>Phúc lợi:</strong> ${formatMultilineText(job.benefits)}</p>
            <p><strong>Thời gian làm việc:</strong> ${getWorkingHoursDisplayName(job.workingHours)}</p>
            <p><strong>Số lượng tuyển:</strong> ${job.numberOfVacancies || 1}</p>
            <p><strong>Số lượt ứng tuyển:</strong> ${job.applicationCount || 0}</p>
            <p><strong>Ngày hết hạn:</strong> ${job.deadline || 'Không xác định'}</p>
            <p><strong>Ngày tạo:</strong> ${job.createdAt ? new Date(job.createdAt).toLocaleString() : 'Không rõ'}</p>
            <p><strong>Ngày cập nhật:</strong> ${job.updatedAt ? new Date(job.updatedAt).toLocaleString() : 'Không rõ'}</p>
            <p><strong>Trạng thái:</strong> ${getStatusDisplayName(job.status)}</p>
            <p><strong>Đã duyệt:</strong> ${job.isApproved ? 'Đã duyệt' : 'Chưa duyệt'}</p>
            <button data-job-id="${job.id}" data-action="close-detail" style="margin-top: 10px;">Đóng</button>
          `;
          detailDiv.style.display = 'block';
          detailDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .catch(error => {
          detailDiv.innerHTML = `<p style="color:red;">Lỗi khi tải chi tiết: ${error.message}</p>`;
          detailDiv.style.display = 'block';
        });
    } else {
      detailDiv.style.display = 'none';
    }
  }

  function closeJobDetail(jobId) {
    const detailDiv = document.getElementById(`job-detail-${jobId}`);
    if (detailDiv) {
      detailDiv.style.display = 'none';
      const jobCard = document.getElementById(`job-${jobId}`);
      if (jobCard) {
        jobCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function toggleEditJob(jobId) {
    const editDiv = document.getElementById(`job-edit-${jobId}`);
    const detailDiv = document.getElementById(`job-detail-${jobId}`);
    const token = localStorage.getItem('idToken');

    if (!editDiv) {
      console.error(`job-edit-${jobId} không tồn tại`);
      return;
    }

    if (detailDiv) {
      detailDiv.style.display = 'none';
    }

    if (editDiv.style.display === 'none') {
      fetch(`/api/employer/job/${jobId}/detail`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Không tìm thấy công việc');
          }
          return response.json();
        })
        .then(job => {
          // Danh sách thành phố tĩnh
          const cities = [
            'An Giang', 'Bà Rịa - Vũng Tàu', 'Bạc Liêu', 'Bắc Giang', 'Bắc Kạn', 'Bắc Ninh',
            'Bến Tre', 'Bình Dương', 'Bình Định', 'Bình Phước', 'Bình Thuận', 'Cà Mau',
            'Cao Bằng', 'Cần Thơ', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai',
            'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Nội', 'Hà Tĩnh', 'Hải Dương',
            'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang',
            'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
            'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 'Quảng Bình',
            'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La',
            'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế',
            'Tiền Giang', 'TP. Hồ Chí Minh', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long',
            'Vĩnh Phúc', 'Yên Bái'
          ];


          editDiv.innerHTML = `
            <h2>Chỉnh sửa công việc: ${job.title}</h2>
            <form id="edit-job-form-${job.id}">
              <div class="form-group">
                <label for="job-title-${job.id}"><strong>Tiêu đề:</strong></label>
                <input type="text" id="job-title-${job.id}" name="title" value="${job.title || ''}" required style="width: 100%; margin-bottom: 10px;" placeholder="e.g. Senior Software Engineer">
              </div>
              <div class="form-group">
                <label for="companyName-${job.id}"><strong>Công ty:</strong></label>
                <input type="text" id="companyName-${job.id}" name="companyName" value="${job.employer?.companyName || ''}" style="width: 100%; margin-bottom: 10px;" readonly>
              </div>
              <div class="form-group">
                <label for="address-${job.id}"><strong>Địa chỉ:</strong></label>
                <input type="text" id="address-${job.id}" name="address" value="${job.address || ''}" style="width: 100%; margin-bottom: 10px;" placeholder="e.g. 123 Lê Duẩn">
              </div>
              <div class="form-group">
                <label for="city-${job.id}"><strong>Thành phố:</strong></label>
                <select id="city-${job.id}" name="city" style="width: 100%; margin-bottom: 10px;">
                  <option value="${job.city}" disabled ${!job.city ? 'selected' : ''}>Chọn thành phố</option>
                  ${cities.map(city => `
                    <option value="${city}" ${job.city === city ? 'selected' : ''}>${city}</option>
                  `).join('')}
                </select>
              </div>
              <div class="form-group">
                <label for="employmentType-${job.id}"><strong>Loại hình công việc:</strong></label>
                <select id="employmentType-${job.id}" name="employmentType" style="width: 100%; margin-bottom: 10px;" required>
                  <option value="" disabled ${!job.employmentType ? 'selected' : ''}>Chọn loại hình công việc</option>
                  <option value="FULL_TIME" ${job.employmentType === 'FULL_TIME' ? 'selected' : ''}>Toàn thời gian</option>
                  <option value="PART_TIME" ${job.employmentType === 'PART_TIME' ? 'selected' : ''}>Bán thời gian</option>
                  <option value="CONTRACT" ${job.employmentType === 'CONTRACT' ? 'selected' : ''}>Hợp đồng</option>
                  <option value="INTERNSHIP" ${job.employmentType === 'INTERNSHIP' ? 'selected' : ''}>Thực tập</option>
                  <option value="FREELANCE" ${job.employmentType === 'FREELANCE' ? 'selected' : ''}>Tự do</option>
                </select>
              </div>
              <div class="form-group">
                <label for="jobLevel-${job.id}"><strong>Cấp độ:</strong></label>
                <select id="jobLevel-${job.id}" name="jobLevel" style="width: 100%; margin-bottom: 10px;" required>
                  <option value="" disabled ${!job.jobLevel ? 'selected' : ''}>Chọn cấp độ</option>
                  <option value="INTERN" ${job.jobLevel === 'INTERN' ? 'selected' : ''}>Thực tập sinh</option>
                  <option value="FRESH_GRADUATE" ${job.jobLevel === 'FRESH_GRADUATE' ? 'selected' : ''}>Mới ra trường</option>
                  <option value="STAFF" ${job.jobLevel === 'STAFF' ? 'selected' : ''}>Nhân viên</option>
                  <option value="MANAGER" ${job.jobLevel === 'MANAGER' ? 'selected' : ''}>Trưởng phòng</option>
                  <option value="DIRECTOR_OR_HIGHER" ${job.jobLevel === 'DIRECTOR_OR_HIGHER' ? 'selected' : ''}>Giám Đốc</option>
                </select>
              </div>
              <div class="form-group">
                <label for="salary-${job.id}"><strong>Mức lương:</strong></label>
                <input type="text" id="salary-${job.id}" name="salary" value="${job.salary || ''}" style="width: 100%; margin-bottom: 10px;" placeholder="e.g. $80,000 - $120,000">
              </div>
              <div class="form-group">
                <label for="experience-${job.id}"><strong>Kinh nghiệm:</strong></label>
                <input type="text" id="experience-${job.id}" name="experience" value="${job.experience || ''}" style="width: 100%; margin-bottom: 10px;" placeholder="e.g. 3+ years">
              </div>
              <div class="form-group">
                <label for="requirements-${job.id}"><strong>Yêu cầu:</strong></label>
                <textarea id="requirements-${job.id}" name="requirements" style="width: 100%; height: 100px; margin-bottom: 10px;">${job.requirements || ''}</textarea>
              </div>
              <div class="form-group">
                <label for="description-${job.id}"><strong>Mô tả:</strong></label>
                <textarea id="description-${job.id}" name="description" style="width: 100%; height: 100px; margin-bottom: 10px;">${job.description || ''}</textarea>
              </div>
              <div class="form-group">
                <label for="benefits-${job.id}"><strong>Phúc lợi:</strong></label>
                <textarea id="benefits-${job.id}" name="benefits" style="width: 100%; height: 100px; margin-bottom: 10px;">${job.benefits || ''}</textarea>
              </div>
              <div class="form-group">
                <label for="workingHours-${job.id}"><strong>Thời gian làm việc:</strong></label>
                <select id="workingHours-${job.id}" name="workingHours" style="width: 100%; margin-bottom: 10px;" required>
                  <option value="" disabled ${!job.workingHours ? 'selected' : ''}>Chọn thời gian làm việc</option>
                  <option value="EIGHTTOSEVENTEEN" ${job.workingHours === 'EIGHTTOSEVENTEEN' ? 'selected' : ''}>Từ 8AM đến 17PM</option>
                  <option value="NINETOEIGHTEEN" ${job.workingHours === 'NINETOEIGHTEEN' ? 'selected' : ''}>Từ 9AM đến 18PM</option>
                </select>
              </div>
              <div class="form-group">
                <label for="numberOfVacancies-${job.id}"><strong>Số lượng tuyển:</strong></label>
                <input type="number" id="numberOfVacancies-${job.id}" name="numberOfVacancies" value="${job.numberOfVacancies || 1}" min="1" style="width: 100%; margin-bottom: 10px;">
              </div>
              <div class="form-group">
                <label for="deadline-${job.id}"><strong>Ngày hết hạn:</strong></label>
                <input type="date" id="deadline-${job.id}" name="deadline" value="${job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : ''}" style="width: 100%; margin-bottom: 10px;">
              </div>
              <div class="form-group">
                <label for="status-${job.id}"><strong>Trạng thái:</strong></label>
                <select id="status-${job.id}" name="status" style="width: 100%; margin-bottom: 10px;" required>
                  <option value="open" ${normalizeStatus(job.status) === 'open' ? 'selected' : ''}>Mở</option>
                  <option value="urgent" ${normalizeStatus(job.status) === 'urgent' ? 'selected' : ''}>Khẩn cấp</option>
                  <option value="closed" ${normalizeStatus(job.status) === 'closed' ? 'selected' : ''}>Đóng</option>
                </select>
              </div>
              <div style="margin-top: 10px;">
                <button type="button" data-job-id="${job.id}" data-action="update" class="btn btn-primary">Cập nhật</button>
                <button type="button" data-job-id="${job.id}" data-action="close-edit" class="btn btn-secondary">Đóng</button>
              </div>
            </form>
          `;
          editDiv.style.display = 'block';
          editDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .catch(error => {
          editDiv.innerHTML = `<p style="color:red;">Lỗi khi tải biểu mẫu: ${error.message}</p>`;
          editDiv.style.display = 'block';
        });
    } else {
      editDiv.style.display = 'none';
    }
  }

  function closeEditJob(jobId) {
    const editDiv = document.getElementById(`job-edit-${jobId}`);
    if (editDiv) {
      editDiv.style.display = 'none';
      const jobCard = document.getElementById(`job-${jobId}`);
      if (jobCard) {
        jobCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function updateJob(jobId) {
    const form = document.getElementById(`edit-job-form-${jobId}`);
    const token = localStorage.getItem('idToken');

    if (!form) {
      console.error(`Form edit-job-form-${jobId} không tồn tại`);
      return;
    }

    const payload = parseJwt(token);
    if (!payload || !payload.user_id) {
      alert('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
      return;
    }

    const formData = new FormData(form);
    formData.append('employerId', payload.user_id);

    // Log FormData for debugging
    console.log('FormData gửi đi:');
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    fetch(`/api/employer/job/update/${jobId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || 'Lỗi khi cập nhật công việc');
          });
        }
        return response.json();
      })
      .then(data => {
        alert('Cập nhật công việc thành công!');
        closeEditJob(jobId);
        loadJobs(currentPage);
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật:', error);
        alert(`Lỗi khi cập nhật: ${error.message}`);
      });
  }

  // Tải trang đầu tiên
  loadJobs(currentPage);
});