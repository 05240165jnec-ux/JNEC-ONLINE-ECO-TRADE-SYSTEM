// browse-all.js - JavaScript for Browse All Page with Notification & Profile Functionality

document.addEventListener('DOMContentLoaded', () => {
    
    // ========== SIDEBAR DROPDOWN NAVIGATION (My Booking & My Listings) ==========
    
    const bookingDropdown = document.getElementById('bookingDropdownBtn');
    const listingsDropdown = document.getElementById('listingsDropdownBtn');
    
    // My Booking - redirect to book_item.html
    if (bookingDropdown) {
        bookingDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = "../Html/book_item.html";
        });
    }
    
    // My Listings - redirect to selling.html
    if (listingsDropdown) {
        listingsDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = "../Html/selling.html";
        });
    }
    
    // ========== NOTIFICATION AND PROFILE DROPDOWN FUNCTIONALITY ==========
    
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
            // Close profile dropdown if open
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
            // Close notification dropdown if open
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
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    // Toast notification function
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(90deg, #2d6a4f, #40916c);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
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
                    setTimeout(() => {
                        window.location.href = '../Html/login.html';
                    }, 1500);
                }
            } else if (text === 'Help & Support') {
                e.preventDefault();
                showToast(`Opening ${text}...`);
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

    // ========== MARKETPLACE FILTERING AND SEARCH ==========
    
    const categoryLinks = document.querySelectorAll('.category-filter');
    const sidebarGeneralLinks = document.querySelectorAll('.left-sidebar a.sidebar-item');
    const allItems = document.querySelectorAll('#item-list-row > .col');
    const mainSearchInput = document.getElementById('mainSearchInput');
    const categoryDropdownBtn = document.getElementById('categoryDropdownBtn');
    const categoryDropdownMenu = document.getElementById('categoryDropdownMenu');
    const categoryDropdownItems = document.querySelectorAll('.category-dropdown-item');
    
    let currentCategory = 'all';

    // Helper function to remove active class from all main sidebar links
    function removeAllActiveClasses() {
        document.querySelectorAll('.left-sidebar a.sidebar-item, .left-sidebar a.category-link').forEach(link => {
            link.classList.remove('active');
        });
    }

    // Function to filter items
    function filterItems(filterCategory, searchTerm = '') {
        currentCategory = filterCategory;
        const search = searchTerm.toLowerCase();
        
        let visibleCount = 0;
        
        allItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const title = item.querySelector('.card-title').textContent.toLowerCase();
            
            const matchesCategory = filterCategory === 'all' || itemCategory === filterCategory;
            const matchesSearch = search === '' || title.includes(search);
            
            if (matchesCategory && matchesSearch) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show message if no items found
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        if (visibleCount === 0) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results-message';
            noResultsMessage.style.cssText = `
                text-align: center;
                padding: 40px;
                color: var(--light-text);
                font-size: 1.1rem;
            `;
            noResultsMessage.innerHTML = `
                <i class="bi bi-inbox" style="font-size: 3rem; display: block; margin-bottom: 15px; color: var(--border-color);"></i>
                <p>No items found matching your criteria</p>
            `;
            document.getElementById('item-list-row').appendChild(noResultsMessage);
        }
    }
    
    // Sidebar category filter functionality
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filterCategory = this.getAttribute('data-category');
            
            removeAllActiveClasses();
            this.classList.add('active');
            
            const searchTerm = mainSearchInput ? mainSearchInput.value : '';
            filterItems(filterCategory, searchTerm);
        });
    });
    
    // Add active class toggle for all other sidebar links
    sidebarGeneralLinks.forEach(item => {
        if (!item.classList.contains('category-filter') && 
            item.id !== 'bookingDropdownBtn' && 
            item.id !== 'listingsDropdownBtn') {
            item.addEventListener('click', function(e) {
                if (this.href.includes('#')) {
                    e.preventDefault();
                }
                
                removeAllActiveClasses();
                this.classList.add('active');
                
                if (this.id !== 'dashboard-link') {
                    const searchTerm = mainSearchInput ? mainSearchInput.value : '';
                    filterItems('all', searchTerm);
                }
            });
        }
    });
    
    // ========== MAIN SEARCH BAR FUNCTIONALITY ==========
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', function() {
            const searchTerm = this.value;
            filterItems(currentCategory, searchTerm);
        });
    }
    
    // ========== CATEGORY DROPDOWN FUNCTIONALITY ==========
    
    // Toggle category dropdown
    if (categoryDropdownBtn && categoryDropdownMenu) {
        categoryDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            categoryDropdownMenu.classList.toggle('active');
            categoryDropdownBtn.classList.toggle('active');
        });
    }
    
    // Handle category dropdown item clicks
    categoryDropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get selected category
            const selectedCategory = this.getAttribute('data-category');
            const categoryText = this.textContent;
            
            // Update button text
            const btnIcon = categoryDropdownBtn.querySelector('i');
            categoryDropdownBtn.innerHTML = categoryText + ' ';
            categoryDropdownBtn.appendChild(btnIcon);
            
            // Update active state
            categoryDropdownItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Close dropdown
            categoryDropdownMenu.classList.remove('active');
            categoryDropdownBtn.classList.remove('active');
            
            // Filter items
            const searchTerm = mainSearchInput ? mainSearchInput.value : '';
            filterItems(selectedCategory, searchTerm);
            
            // Update sidebar if exists
            const sidebarCategoryLink = document.querySelector(`.category-filter[data-category="${selectedCategory}"]`);
            if (sidebarCategoryLink) {
                removeAllActiveClasses();
                sidebarCategoryLink.classList.add('active');
            }
        });
    });
    
    // Close category dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.category-dropdown-wrapper') && categoryDropdownMenu) {
            categoryDropdownMenu.classList.remove('active');
            if (categoryDropdownBtn) {
                categoryDropdownBtn.classList.remove('active');
            }
        }
    });

    // Close all dropdowns on Escape key (combined)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (notificationDropdown) {
                notificationDropdown.classList.remove('active');
            }
            if (profileDropdown) {
                profileDropdown.classList.remove('active');
            }
            if (categoryDropdownMenu) {
                categoryDropdownMenu.classList.remove('active');
            }
            if (categoryDropdownBtn) {
                categoryDropdownBtn.classList.remove('active');
            }
        }
    });

    // ========== LOGOUT FUNCTIONALITY ==========
    const logoutLinks = document.querySelectorAll('.logout-link');
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                showToast('Logging out...');
                setTimeout(() => {
                    window.location.href = '../Html/login.html';
                }, 1500);
            }
        });
    });
    
});