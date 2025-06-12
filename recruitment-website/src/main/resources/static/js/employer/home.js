document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired');

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const loginButtonDesktop = document.querySelector('.header-right .btn.btn-outline');
    const loginButtonMobile = document.querySelector('.mobile-nav .mobile-login');
    const token = localStorage.getItem('idToken');

    // Hàm phân tích JWT
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

    // Handle mobile menu toggle
    if (mobileMenuButton && mobileMenu && closeMobileMenu) {
        console.log('Mobile menu elements found');
        mobileMenuButton.addEventListener('click', () => {
            console.log('Mobile menu button clicked');
            mobileMenu.classList.toggle('hidden');
        });

        closeMobileMenu.addEventListener('click', () => {
            console.log('Close mobile menu clicked');
            mobileMenu.classList.add('hidden');
        });
    } else {
        console.warn('Mobile menu elements missing:', { mobileMenuButton, mobileMenu, closeMobileMenu });
    }

    // Check for token and update login button
    if (token) {
        console.log('Token found, processing logged-in state');
        const payload = parseJwt(token);
        if (!payload || !payload.user_id) {
            console.warn("Token không hợp lệ hoặc thiếu user_id");
            return;
        }

        const uid = payload.user_id;
        const defaultLogo = 'https://png.pngtree.com/png-vector/20210129/ourmid/pngtree-upload-avatar-by-default-png-image_2854358.jpg';

        // Fetch employer profile to get company logo
        fetch(`/api/employer/profile?uid=${uid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.message || "Lỗi khi lấy thông tin nhà tuyển dụng");
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Profile fetched:', data);
                const logo = data.companyLogo || defaultLogo;

                // Desktop: Replace login button with company logo and dropdown
                if (loginButtonDesktop) {
                    console.log('Replacing desktop login button');
                    loginButtonDesktop.classList.remove('btn', 'btn-outline');
                    loginButtonDesktop.classList.add('company-logo-container');
                    loginButtonDesktop.innerHTML = `
                        <img src="${logo}" alt="Company Logo" class="company-logo">
                        <div class="dropdown-menu company-dropdown hidden">
                            <a href="/employer/dashboard" class="dropdown-item">Dashboard</a>
                            <a href="#" class="dropdown-item logout-link">Logout</a>
                        </div>
                    `;

                    // Toggle dropdown on logo click
                    const logoContainer = loginButtonDesktop;
                    const dropdown = logoContainer.querySelector('.company-dropdown');
                    logoContainer.addEventListener('click', (e) => {
                        e.stopPropagation();
                        console.log('Logo clicked, toggling dropdown');
                        dropdown.classList.toggle('hidden');
                    });

                    // Handle logout
                    const logoutLink = logoContainer.querySelector('.logout-link');
                    logoutLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log('Logout clicked');
                        localStorage.removeItem('idToken');
                        alert('Đã đăng xuất thành công!');
                        window.location.href = '/';
                    });
                } else {
                    console.warn('Desktop login button not found');
                }

                // Mobile: Replace login button with company logo and dropdown
                if (loginButtonMobile) {
                    console.log('Replacing mobile login button');
                    loginButtonMobile.classList.remove('btn', 'btn-primary', 'mobile-login');
                    loginButtonMobile.classList.add('company-logo-container');
                    loginButtonMobile.innerHTML = `
                        <img src="${logo}" alt="Company Logo" class="company-logo">
                        <div class="dropdown-menu company-dropdown hidden">
                            <a href="/employer/dashboard" class="dropdown-item">Dashboard</a>
                            <a href="#" class="dropdown-item logout-link">Logout</a>
                        </div>
                    `;

                    // Toggle dropdown on logo click
                    const logoContainer = loginButtonMobile;
                    const dropdown = logoContainer.querySelector('.company-dropdown');
                    logoContainer.addEventListener('click', (e) => {
                        e.stopPropagation();
                        console.log('Mobile logo clicked, toggling dropdown');
                        dropdown.classList.toggle('hidden');
                    });

                    // Handle logout
                    const logoutLink = logoContainer.querySelector('.logout-link');
                    logoutLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log('Mobile logout clicked');
                        localStorage.removeItem('idToken');
                        alert('Đã đăng xuất thành công!');
                        window.location.href = '/';
                    });
                } else {
                    console.warn('Mobile login button not found');
                }

                // Single document click listener for closing dropdowns
                document.addEventListener('click', (e) => {
                    const desktopDropdown = loginButtonDesktop?.querySelector('.company-dropdown');
                    const mobileDropdown = loginButtonMobile?.querySelector('.company-dropdown');
                    if (
                        !loginButtonDesktop?.contains(e.target) &&
                        !loginButtonMobile?.contains(e.target)
                    ) {
                        if (desktopDropdown && !desktopDropdown.classList.contains('hidden')) {
                            console.log('Closing desktop dropdown');
                            desktopDropdown.classList.add('hidden');
                        }
                        if (mobileDropdown && !mobileDropdown.classList.contains('hidden')) {
                            console.log('Closing mobile dropdown');
                            mobileDropdown.classList.add('hidden');
                        }
                    }
                }, { once: false });
            })
            .catch(error => {
                console.error("Lỗi khi lấy logo:", error);
                const logo = defaultLogo;

                // Desktop: Replace login button with default logo
                if (loginButtonDesktop) {
                    console.log('Replacing desktop login button with default logo');
                    loginButtonDesktop.classList.remove('btn', 'btn-outline');
                    loginButtonDesktop.classList.add('company-logo-container');
                    loginButtonDesktop.innerHTML = `
                        <img src="${logo}" alt="Company Logo" class="company-logo">
                        <div class="dropdown-menu company-dropdown hidden">
                            <a href="/employer/dashboard" class="dropdown-item">Dashboard</a>
                            <a href="#" class="dropdown-item logout-link">Logout</a>
                        </div>
                    `;

                    // Toggle dropdown on logo click
                    const logoContainer = loginButtonDesktop;
                    const dropdown = logoContainer.querySelector('.company-dropdown');
                    logoContainer.addEventListener('click', (e) => {
                        e.stopPropagation();
                        console.log('Logo clicked, toggling dropdown (error case)');
                        dropdown.classList.toggle('hidden');
                    });

                    // Handle logout
                    const logoutLink = logoContainer.querySelector('.logout-link');
                    logoutLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log('Logout clicked (error case)');
                        localStorage.removeItem('idToken');
                        alert('Đã đăng xuất thành công!');
                        window.location.href = '/';
                    });
                }

                // Mobile: Replace login button with default logo
                if (loginButtonMobile) {
                    console.log('Replacing mobile login button with default logo');
                    loginButtonMobile.classList.remove('btn', 'btn-primary', 'mobile-login');
                    loginButtonMobile.classList.add('company-logo-container');
                    loginButtonMobile.innerHTML = `
                        <img src="${logo}" alt="Company Logo" class="company-logo">
                        <div class="dropdown-menu company-dropdown hidden">
                            <a href="/employer/dashboard" class="dropdown-item">Dashboard</a>
                            <a href="#" class="dropdown-item logout-link">Logout</a>
                        </div>
                    `;

                    // Toggle dropdown on logo click
                    const logoContainer = loginButtonMobile;
                    const dropdown = logoContainer.querySelector('.company-dropdown');
                    logoContainer.addEventListener('click', (e) => {
                        e.stopPropagation();
                        console.log('Mobile logo clicked, toggling dropdown (error case)');
                        dropdown.classList.toggle('hidden');
                    });

                    // Handle logout
                    const logoutLink = logoContainer.querySelector('.logout-link');
                    logoutLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        console.log('Mobile logout clicked (error case)');
                        localStorage.removeItem('idToken');
                        alert('Đã đăng xuất thành công!');
                        window.location.href = '/';
                    });
                }

                // Single document click listener for closing dropdowns (error case)
                document.addEventListener('click', (e) => {
                    const desktopDropdown = loginButtonDesktop?.querySelector('.company-dropdown');
                    const mobileDropdown = loginButtonMobile?.querySelector('.company-dropdown');
                    if (
                        !loginButtonDesktop?.contains(e.target) &&
                        !loginButtonMobile?.contains(e.target)
                    ) {
                        if (desktopDropdown && !desktopDropdown.classList.contains('hidden')) {
                            console.log('Closing desktop dropdown (error case)');
                            desktopDropdown.classList.add('hidden');
                        }
                        if (mobileDropdown && !mobileDropdown.classList.contains('hidden')) {
                            console.log('Closing mobile dropdown (error case)');
                            mobileDropdown.classList.add('hidden');
                        }
                    }
                }, { once: false });
            });
    } else {
        console.log('No token found, keeping default login buttons');
    }
});
