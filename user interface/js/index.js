// index.js - Updated for JNEC ECO-TRADE Marketplace with Notification and Profile Dropdowns

document.addEventListener('DOMContentLoaded', () => {
    
    // ========== MARKETPLACE FILTERING AND SEARCH ==========
    
    // 1. Get all the elements we need
    const categoryLinks = document.querySelectorAll('.category-filter');
    const sidebarGeneralLinks = document.querySelectorAll('.left-sidebar a.sidebar-item');
    const allItems = document.querySelectorAll('#item-list-row > .col');
    const searchInput = document.querySelector('.marketplace-search');
    const dashboardLink = document.getElementById('dashboard-link');

    // Helper function to remove active class from all main sidebar links
    function removeAllActiveClasses() {
        document.querySelectorAll('.left-sidebar a.sidebar-item, .left-sidebar a.category-link').forEach(link => {
            link.classList.remove('active');
        });
    }

    // Function to filter items
    function filterItems(filterCategory) {
        allItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterCategory === 'all' || itemCategory === filterCategory) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        if (searchInput) {
            searchInput.value = '';
        }
    }
    
    // 2. Add event listener to each category link
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filterCategory = this.getAttribute('data-category');
            
            removeAllActiveClasses();
            this.classList.add('active');
            
            filterItems(filterCategory);
        });
    });
    
    // Add active class toggle for all other sidebar links
    sidebarGeneralLinks.forEach(item => {
        if (!item.classList.contains('category-filter')) {
            item.addEventListener('click', function(e) {
                
                if (this.href.includes('#')) {
                    e.preventDefault();
                }
                
                removeAllActiveClasses();
                this.classList.add('active');
                
                if (this.id !== 'dashboard-link') {
                    filterItems('all');
                }
            });
        }
    });
    
    // Handle initial load based on URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam && categoryParam !== 'all') {
        const targetLink = document.querySelector(`.category-filter[data-category="${categoryParam}"]`);
        if (targetLink) {
            removeAllActiveClasses();
            targetLink.classList.add('active');
            filterItems(categoryParam);
        }
    } else {
        const browseAllLink = document.getElementById('browse-all-link');
        if (browseAllLink) {
            removeAllActiveClasses();
            browseAllLink.classList.add('active');
        }
    }
    
    // Add search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            const activeFilter = document.querySelector('.category-filter.active');
            const activeCategory = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
            
            allItems.forEach(item => {
                const title = item.querySelector('.card-title').textContent.toLowerCase();
                const itemCategory = item.getAttribute('data-category');
                
                const matchesSearch = title.includes(searchTerm);
                const matchesCategory = activeCategory === 'all' || itemCategory === activeCategory;
                
                if (matchesSearch && matchesCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // ========== NOTIFICATION AND PROFILE DROPDOWN FUNCTIONALITY ==========
    
    // Get notification and profile elements
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const markReadBtn = document.querySelector('.mark-read-btn');

    // Toggle notification dropdown
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
            if (profileDropdown) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Toggle profile dropdown
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
            if (notificationDropdown) {
                notificationDropdown.classList.remove('active');
            }
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.notification-wrapper') && !e.target.closest('.profile-wrapper')) {
            if (notificationDropdown) {
                notificationDropdown.classList.remove('active');
            }
            if (profileDropdown) {
                profileDropdown.classList.remove('active');
            }
        }
    });

    // Prevent dropdown from closing when clicking inside
    if (notificationDropdown) {
        notificationDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    if (profileDropdown) {
        profileDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Mark all notifications as read
    if (markReadBtn) {
        markReadBtn.addEventListener('click', () => {
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            unreadNotifications.forEach(notification => {
                notification.classList.remove('unread');
            });
            
            // Update badge count
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.textContent = '0';
                badge.style.display = 'none';
            }
            
            // Show success message
            showToast('All notifications marked as read');
        });
    }

    // Handle individual notification clicks
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.remove('unread');
            updateBadgeCount();
        });
    });

    // Update badge count
    function updateBadgeCount() {
        const unreadCount = document.querySelectorAll('.notification-item.unread').length;
        const badge = document.querySelector('.notification-badge');
        
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    // Toast notification function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #2d7a5e;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Handle profile menu item clicks
    const profileMenuItems = document.querySelectorAll('.profile-menu-item');
    profileMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const text = item.querySelector('span').textContent;
            
            if (text === 'Logout') {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    showToast('Logging out...');
                    // Add logout logic here
                    setTimeout(() => {
                        window.location.href = '../Html/login.html';
                    }, 1500);
                }
            } else if (text === 'Help & Support') {
                e.preventDefault();
                showToast(`Navigating to ${text}`);
                if (profileDropdown) {
                    profileDropdown.classList.remove('active');
                }
            } else {
                showToast(`Navigating to ${text}`);
                if (profileDropdown) {
                    profileDropdown.classList.remove('active');
                }
            }
        });
    });

    // Close dropdown on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (notificationDropdown) {
                notificationDropdown.classList.remove('active');
            }
            if (profileDropdown) {
                profileDropdown.classList.remove('active');
            }
        }
    });

    // Initialize badge count on page load
    updateBadgeCount();
    
});