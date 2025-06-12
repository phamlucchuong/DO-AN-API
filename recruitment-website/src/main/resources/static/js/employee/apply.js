// apply.js
export function openApplyModal(jobId, title, companyName, companyLogo, salary, city, experience) {
  const modal = document.getElementById("applicationModal");
  if (!modal) {
    const modalHtml = `
      <div id="applicationModal" class="modal">
        <div class="modal-content">
          <span class="close" onclick="closeModal()">×</span>
          <div class="company-info">
            <img src="${companyLogo}" alt="${companyName}" class="company-logo">
            <div>
              <div class="company-name">${companyName}</div>
              <div class="job-title">${title}</div>
            </div>
          </div>
          <div class="application-form">
            <div class="form-group">
              <label>Hồ sơ của bạn</label>
              <input type="file" accept=".pdf" onchange="this.nextElementSibling.textContent = this.files[0] ? this.files[0].name : 'CV Dang Quang V...pdf';">
              <div class="file-info">@ Hồ sơ định kèm • Đã tải lên: ${new Date().toLocaleDateString('vi-VN')}</div>
            </div>
            <button class="submit-btn" onclick="submitApplication(${jobId})">Ứng tuyển</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }
  document.getElementById("applicationModal").style.display = "block";
}

export function closeModal() {
  document.getElementById("applicationModal").style.display = "none";
}

export function submitApplication(jobId) {
  alert(`Ứng tuyển thành công cho công việc ID: ${jobId}`);
  closeModal();
}

window.onclick = function(event) {
  const modal = document.getElementById("applicationModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};