import { openApplyModal, closeModal, submitApplication } from '../js/employee/apply.js';

// Utility functions
function formatSalary(salary) {
  return salary + " VNĐ";
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Hôm qua";
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`; 
  return `${Math.floor(diffDays / 30)} tháng trước`;
}

let topCompaniesData = [];

// Render Top Companies
function renderTopCompanies() {
  const companiesGrid = document.getElementById("companiesGrid");
  if (!companiesGrid) return;

  fetch("/api/employer/getTopEmployers")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch top companies");
      }
      return response.json();
    })
    .then((data) => {
      topCompaniesData = data; // gán vào biến global
      console.log(topCompaniesData);
      companiesGrid.innerHTML = data
        .map((company) => {
          const {
            uid,
            companyLogo,
            companyName,
            companyDescription,
            industry,
            jobCount = 0,
            city,
          } = company;

          return `
            <div class="company-card" onclick="window.location.href = \`/company-detail?uid=${uid}\`">
              <div class="company-header">
                <img src="${companyLogo || 'https://via.placeholder.com/50'}" alt="${companyName}" class="company-logo">
                <div class="company-info">
                  <div class="company-top">
                    <h3 class="company-name">${companyName}</h3>
                    <p class="company-industry">${industry || 'Chưa cập nhật'}</p>
                    <p class="company-description">${companyDescription || 'Chưa có mô tả'}</p>
                  </div>
                </div>
              </div>
              <div class="company-footer">
                <span class="job-count">${jobCount || 0} việc làm</span>
                <span class="company-location">${city || 'Chưa cập nhật'}</span>
              </div>
            </div>
        `;
        })
        .join("");
    })
    .catch((error) => {
      console.error("Lỗi khi lấy top companies: ", error);
      companiesGrid.innerHTML = `<p>Không thể tải danh sách công ty.</p>`;
    });
}

let hotJobsData = [];


async function fetchHotJobs() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(hotJobsData);
    }, 1000);
  });
}

async function renderHotJobs() {
  try {
    const response = await fetch("/api/employer/job/getHotJobs", {
      method: 'GET'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to fetch jobs: ${response.status}`);
    }

    const jobs = await response.json();
    const hotJobsGrid = document.getElementById("hotJobsGrid");

    if (!jobs || jobs.length === 0) {
      hotJobsGrid.innerHTML = '<p>Không có công việc nổi bật.</p>';
      return;
    }

    hotJobsGrid.innerHTML = jobs.map(job => {
      const { id, title, employer, salary, city, experience, createdAt, status } = job;
      let badgeHtml = "";
      if (status === "URGENT") {
        badgeHtml = '<span class="badge urgent">Cần gấp</span>';
      } else if (status === "OPEN") {
        badgeHtml = '<span class="badge hot">Đang tuyển</span>';
      } else if (status === "CLOSED") {
        badgeHtml = '<span class="badge closed">Hết tuyển</span>';
      }

      return `
        <div class="job-card" onclick="window.location.href = '/job-detail?id=${id}'">
          <div class="job-header">
            <img src="${employer.companyLogo}" alt="${employer.companyName}" class="company-logo-small">
            <div class="job-info">
              <h3>${title}</h3>
              <p class="company-name">${employer.companyName}</p>
            </div>
            <div class="job-badges">
              ${badgeHtml}
            </div>
          </div>
          <div class="job-details">
            <div class="job-salary">
              <i class="fas fa-money-bill-wave"></i>
              <span>${salary}</span>
            </div>
            <div class="job-location">
              <i class="fas fa-map-marker-alt"></i>
              <span>${city}</span>
            </div>
            <div class="job-experience">
              <i class="fas fa-briefcase"></i>
              <span>${experience}</span>
            </div>
          </div>
          <div class="job-footer">
            <span class="posted-date">${formatDate(createdAt)}</span>
            <button class="apply-quick-btn" onclick="event.stopPropagation(); openApplyModal(${id}, '${title}', '${employer.companyName}', '${employer.companyLogo}', '${salary}', '${city}', '${experience}')">
              Ứng tuyển nhanh
            </button>
          </div>
        </div>
      `;
    }).join("");

    console.log("Hot jobs loaded:", jobs);

  } catch (error) {
    console.error("Lỗi khi tải hot jobs:", error);
    document.getElementById("hotJobsGrid").innerHTML = '<p>Đã xảy ra lỗi khi tải công việc nổi bật.</p>';
  }
}


// Gán hàm vào window để sử dụng trong onclick
window.openApplyModal = openApplyModal;
window.closeModal = closeModal;
window.submitApplication = submitApplication;


// Event handlers for existing HTML functions
function closeNotification() {
  const notification = document.querySelector(".header-notification");
  if (notification) {
    notification.style.display = "none";
  }
}

function removeLocation() {
  const locationFilter = document.querySelector(".location-filter");
  if (locationFilter) {
    locationFilter.style.display = "none";
  }
}

function performSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput ? searchInput.value : "";
  console.log("Performing search for:", searchTerm);
  // Here you would implement actual search functionality
  alert(`Tìm kiếm: ${searchTerm}`);
}

function applyNow() {
  alert("Chuyển hướng đến trang ứng tuyển...");
}

function viewCategory(category) {
  console.log("Viewing category:", category);
  alert(`Xem danh mục: ${category}`);
}

function playPodcast() {
  alert("Phát podcast...");
}

function createCV() {
  alert("Chuyển hướng đến trang tạo CV...");
}



function quickApply(jobId) {
  const allJobs = [...hotJobsData, ...suggestedJobsData];
  const job = allJobs.find((j) => j.id === jobId);
  if (job) {
    console.log("Quick applying to job:", job);
    alert(`Ứng tuyển nhanh cho vị trí: ${job.title} tại ${job.company}`);
  }
}

// API simulation functions (for future API integration)
async function fetchTopCompanies() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(topCompaniesData);
    }, 1000);
  });
}

async function fetchSuggestedJobs() {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(suggestedJobsData);
    }, 1000);
  });
}

async function loadLoginButton() {
  const loginButton = document.querySelector(".nav-item.login");

  // Kiểm tra xem user đã đăng nhập chưa bằng cách xem có token trong localStorage không
  const idToken = localStorage.getItem("idToken");

  if (!idToken) {
    // Nếu chưa đăng nhập, giữ nguyên nút "Đăng nhập"
    loginButton.innerHTML = `<i class="fas fa-user"></i> Đăng nhập`;
    loginButton.setAttribute("href", "/login");
    loginButton.onclick = null;
  } else {
    try {
      // Gửi token tới backend để lấy thông tin người dùng (giả định backend có endpoint này)
      const response = await fetch("/api/auth/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken, role: "Employee" }), // hoặc không truyền role nếu backend mặc định USER
      });

      if (!response.ok) {
        throw new Error("Token không hợp lệ hoặc hết hạn");
      }

      const userData = await response.json(); // Giả sử có avatarURL trong response

      // Hiển thị ảnh đại diện và xử lý chuyển trang
      loginButton.classList.remove("nav-item");
      loginButton.innerHTML = `
        <img src="${userData.avatarURL || "https://via.placeholder.com/30"}" 
             alt="avatar" 
             style="width: 40px; height: 40px; box-fit: contains; border-radius: 50%; border: 2px solid rgb(97, 221, 255)" />
      `;
      loginButton.setAttribute("href", "#");
      loginButton.onclick = function () {

        // window.location.href = "/employee-profile";
        window.location.href = "/profile";
      };
    } catch (error) {
      console.error("Lỗi khi xác minh token:", error);
      // Token có thể hết hạn hoặc backend lỗi -> xóa và hiển thị lại nút đăng nhập
      localStorage.removeItem("idToken");
      loginButton.innerHTML = `<i class="fas fa-user"></i> Đăng nhập`;
      loginButton.setAttribute("href", "/login");
      loginButton.onclick = null;
    }
  }
}

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dashboard initialized");

  // Render all sections
  loadLoginButton();
  renderTopCompanies();
  renderHotJobs();
  // Setup search functionality
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }
});

// Export data for potential external use
window.VietnamWorksData = {
  get topCompanies() {
    return topCompaniesData;
  },
  get hotJobs() {
    return hotJobsData;
  },
  fetchTopCompanies,
  fetchHotJobs,
  fetchSuggestedJobs,
};


let chatboxOpen = false;

// Get DOM elements
const chatToggle = document.getElementById('chatboxToggle');
const chatboxClose = document.getElementById('chatboxClose');
const chatboxWindow = document.getElementById('chatboxWindow');
const chatboxMessages = document.getElementById('chatboxMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const scrollToBottom = document.getElementById('scrollToBottom');
const notification = document.querySelector('.chat-notification');
const quickActions = document.getElementById('quickActions');

// Toggle chatbox open/close
function toggleChatbox() {
    chatboxOpen = !chatboxOpen;
    
    if (chatboxOpen) {
        chatboxWindow.classList.add('show');
        if (notification) notification.style.display = 'none';
        // Auto-focus on input when chatbox opens
        setTimeout(() => chatInput.focus(), 100);
    } else {
        chatboxWindow.classList.remove('show');
    }
}

// Add event listeners
if (chatToggle) {
    chatToggle.addEventListener('click', toggleChatbox);
}

if (chatboxClose) {
    chatboxClose.addEventListener('click', toggleChatbox);
}

// Display message in chatbox
function appendMessage(sender, message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : ''}`;
    
    if (isUser) {
        // User message: Avatar on left, then message content on right
        messageDiv.innerHTML = `
            <div class="message-avatar user-avatar">Bạn</div>
            <div class="message-content user-content">
                ${message}
            </div>
        `;
    } else {
        // Bot message: Avatar on left, then message content on right
        messageDiv.innerHTML = `
            <div class="message-avatar">VW</div>
            <div class="message-content">
                ${message}
            </div>
        `;
    }
    
    chatboxMessages.appendChild(messageDiv);
    // Scroll to bottom smoothly
    setTimeout(() => {
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
    }, 100);
}

// Send message to webhook
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Hide quick actions after first user message
    if (quickActions) {
        quickActions.style.display = 'none';
    }
    
    // Display user message
    appendMessage('Bạn', message, true);
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        const response = await fetch('https://c6fd-2405-4803-c786-ef80-e87b-3be8-3d79-c151.ngrok-free.app/webhook/chat_bot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        const contentType = response.headers.get('content-type') || '';
        let text = '';
        
        if (contentType.includes('application/json')) {
            const data = await response.json();
            if (typeof data === 'object' && data !== null) {
                if (data.output) {
                    text = data.output;
                } else if (data.reply) {
                    text = data.reply;
                } else if (data.text) {
                    text = data.text;
                } else if (Array.isArray(data)) {
                    text = data[0]?.output || data[0]?.reply || data[0]?.text || JSON.stringify(data[0]);
                } else {
                    text = JSON.stringify(data);
                }
            } else {
                text = String(data);
            }
        } else {
            text = await response.text();
        }
        
        // Hide typing indicator and show bot response
        hideTypingIndicator();
        appendMessage('VietnamWorks', text.trim() || 'Không có phản hồi từ hệ thống');
        
    } catch (error) {
        hideTypingIndicator();
        appendMessage('VietnamWorks', 'Xin lỗi, hiện tại hệ thống đang gặp sự cố. Vui lòng thử lại sau hoặc liên hệ hotline 1900-1512 để được hỗ trợ.');
        console.error('Fetch error:', error);
    }
}

// Send quick message
function sendQuickMessage(message) {
    // Hide quick actions
    if (quickActions) {
        quickActions.style.display = 'none';
    }
    
    // Display user message
    appendMessage('Bạn', message, true);
    
    // Show typing indicator
    showTypingIndicator();
    
    // Send to webhook
    fetch('https://41c0-2405-4803-c786-ef80-d0c3-bac0-9687-b4fe.ngrok-free.app/webhook/chat_bot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            return response.json();
        } else {
            return response.text();
        }
    })
    .then(data => {
        let text = '';
        if (typeof data === 'object' && data !== null) {
            if (data.output) {
                text = data.output;
            } else if (data.reply) {
                text = data.reply;
            } else if (data.text) {
                text = data.text;
            } else {
                text = JSON.stringify(data);
            }
        } else {
            text = String(data);
        }
        
        hideTypingIndicator();
        appendMessage('VietnamWorks', text.trim() || 'Không có phản hồi từ hệ thống');
    })
    .catch(error => {
        hideTypingIndicator();
        appendMessage('VietnamWorks', 'Xin lỗi, hiện tại hệ thống đang gặp sự cố. Vui lòng thử lại sau.');
        console.error('Fetch error:', error);
    });
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Add event listeners
if (chatInput) {
    chatInput.addEventListener('keydown', handleKeyPress);
}

if (sendButton) {
    sendButton.addEventListener('click', sendMessage);
}

// Quick actions event listeners
if (quickActions) {
    quickActions.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-action')) {
            const message = e.target.getAttribute('data-message');
            if (message) {
                sendQuickMessage(message);
            }
        }
    });
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">VW</div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatboxMessages.appendChild(typingDiv);
    // Scroll to bottom smoothly
    setTimeout(() => {
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
    }, 100);
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Scroll to bottom functionality
if (scrollToBottom) {
    scrollToBottom.addEventListener('click', function() {
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
    });
}

// Show/hide scroll button based on scroll position
if (chatboxMessages && scrollToBottom) {
    chatboxMessages.addEventListener('scroll', function() {
        const isNearBottom = chatboxMessages.scrollTop + chatboxMessages.clientHeight >= chatboxMessages.scrollHeight - 50;
        if (isNearBottom) {
            scrollToBottom.classList.remove('show');
        } else {
            scrollToBottom.classList.add('show');
        }
    });
}

