// Dashboard JavaScript - JNEC ECO-TRADE (Enhanced with Category Filtering and Sidebar Dropdowns)

// Sample data for recent listings
const recentListingsData = [
    {
        id: 1,
        title: "MacBook Pro 2020",
        price: 45000,
        condition: "good",
        seller: "Karma Dorji",
        contact: "17123456",
        date: "2025-09-28",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
        category: "electronics"
    },
    {
        id: 2,
        title: "Engineering Textbooks Set",
        price: 2500,
        condition: "new",
        seller: "Pema Wangmo",
        contact: "17654321",
        date: "2025-09-27",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        category: "books"
    },
    {
        id: 3,
        title: "Study Desk with Chair",
        price: 3500,
        condition: "good",
        seller: "Tashi Namgyal",
        contact: "17987654",
        date: "2025-09-26",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400",
        category: "hostel"
    },
    {
        id: 4,
        title: "Smartphone Samsung",
        price: 12000,
        condition: "good",
        seller: "Sonam Choden",
        contact: "17456789",
        date: "2025-09-25",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
        category: "electronics"
    },
    {
        id: 5,
        title: "Sports Shoes Nike",
        price: 2800,
        condition: "usable",
        seller: "Jigme Dorji",
        contact: "17234567",
        date: "2025-09-24",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        category: "sports"
    },
    {
        id: 6,
        title: "Winter Jacket",
        price: 1800,
        condition: "new",
        seller: "Dorji Wangmo",
        contact: "17876543",
        date: "2025-09-23",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
        category: "clothes"
    },
    {
        id: 7,
        title: "Calculator Scientific",
        price: 450,
        condition: "good",
        seller: "Ugyen Dorji",
        contact: "17345678",
        date: "2025-09-22",
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400",
        category: "books"
    },
    {
        id: 8,
        title: "Basketball",
        price: 800,
        condition: "usable",
        seller: "Kinley Tshering",
        contact: "17567890",
        date: "2025-09-21",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400",
        category: "sports"
    },
    {
        id: 9,
        title: "Formal Shirt",
        price: 650,
        condition: "new",
        seller: "Sangay Dorji",
        contact: "17234890",
        date: "2025-09-20",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
        category: "clothes"
    },
    {
        id: 10,
        title: "Study Lamp",
        price: 450,
        condition: "good",
        seller: "Tenzin Lhamo",
        contact: "17456123",
        date: "2025-09-19",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
        category: "hostel"
    }
];

// Track current filter
let currentCategoryFilter = 'all';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    renderRecentListings(recentListingsData);
    setupSidebarEvents();
    setupDropdownEvents();
    updateCategoryCounts();
    setupMobileMenu();
    setupCategoryFiltering();
    setupSidebarDropdowns();
});

// Setup sidebar dropdowns for My Booking and My Listings (Just visual arrows with navigation)
function setupSidebarDropdowns() {
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
}

// Setup category filtering
function setupCategoryFiltering() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all categories
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Get selected category
            const category = this.getAttribute('data-category');
            currentCategoryFilter = category;
            
            // Get category name for display
            const categoryName = this.querySelector('.category-name').textContent;
            
            // Filter and render listings
            filterListingsByCategory(category, categoryName);
            
            // Scroll to listings section smoothly
            const listingsSection = document.querySelector('.listings-section');
            if (listingsSection) {
                listingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Filter listings by category
function filterListingsByCategory(category, categoryName) {
    const sectionHeader = document.querySelector('.listings-section .section-header');
    
    // Update section header
    if (category === 'all') {
        sectionHeader.innerHTML = `
            <i class="bi bi-clock-history"></i>
            Recent Listings
        `;
        renderRecentListings(recentListingsData);
        showNotification('Showing all listings', 'info');
    } else {
        // Filter listings by category
        const filteredListings = recentListingsData.filter(item => item.category === category);
        
        // Update header with category name
        sectionHeader.innerHTML = `
            <div class="filter-header">
                <div>
                    <i class="bi bi-filter-circle"></i>
                    ${categoryName}
                </div>
                <button class="clear-filter-btn" onclick="clearCategoryFilter()">
                    <i class="bi bi-x-circle"></i>
                    Clear Filter
                </button>
            </div>
        `;
        
        renderRecentListings(filteredListings);
        showNotification(`Showing ${filteredListings.length} items in ${categoryName}`, 'success');
    }
}

// Clear category filter
function clearCategoryFilter() {
    currentCategoryFilter = 'all';
    
    // Remove active class from all categories
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(cat => cat.classList.remove('active'));
    
    // Reset section header
    const sectionHeader = document.querySelector('.listings-section .section-header');
    sectionHeader.innerHTML = `
        <i class="bi bi-clock-history"></i>
        Recent Listings
    `;
    
    // Show all listings
    renderRecentListings(recentListingsData);
    showNotification('Filter cleared - Showing all listings', 'info');
    
    // Scroll to top of listings
    const listingsSection = document.querySelector('.listings-section');
    if (listingsSection) {
        listingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Update category counts dynamically
function updateCategoryCounts() {
    const categoryCounts = {
        books: 0,
        electronics: 0,
        clothes: 0,
        hostel: 0,
        sports: 0,
        others: 0
    };

    recentListingsData.forEach(item => {
        if (categoryCounts.hasOwnProperty(item.category)) {
            categoryCounts[item.category]++;
        } else {
            categoryCounts.others++;
        }
    });

    // Update the DOM
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const countElement = item.querySelector('.category-count');
        if (countElement && categoryCounts.hasOwnProperty(category)) {
            countElement.textContent = categoryCounts[category];
        }
    });
}

// Setup sidebar events
function setupSidebarEvents() {
    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-item');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const page = this.getAttribute('data-page');

            if (page && page !== 'browse-all') {
                e.preventDefault();
                
                // Remove active class from all links
                sidebarLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Handle page navigation
                handlePageNavigation(page);
            }
        });
    });
}

// Handle page navigation
function handlePageNavigation(page) {
    console.log('Navigating to:', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'dashboard') {
        // Stay on dashboard
        showNotification('Dashboard loaded successfully', 'success');
    }
}

// Render recent listings
function renderRecentListings(listings) {
    const container = document.getElementById('recentListings');
    
    if (!container) return;
    
    if (listings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-inbox"></i>
                <h3>No listings found</h3>
                <p>No items available in this category</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = listings.map(item => `
        <div class="listing-card" data-category="${item.category}" data-price="${item.price}" data-condition="${item.condition}">
            <img src="${item.image}" alt="${item.title}" class="listing-image" onerror="this.src='https://via.placeholder.com/100'">
            <div class="listing-info">
                <div class="listing-title">${item.title}</div>
                <div class="listing-price">Nu ${item.price.toLocaleString()}</div>
                <div class="listing-details">
                    <span class="condition-badge condition-${item.condition}">
                        ${item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
                    </span>
                    <span><i class="bi bi-person"></i> ${item.seller}</span> | 
                    <span><i class="bi bi-telephone"></i> ${item.contact}</span>
                </div>
                <div class="listing-details">
                    <i class="bi bi-calendar"></i> Posted: ${formatDate(item.date)}
                </div>
            </div>
        </div>
    `).join('');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconClass = type === 'success' ? 'bi-check-circle-fill' : 
                      type === 'error' ? 'bi-x-circle-fill' : 
                      'bi-info-circle-fill';
    
    const bgColor = type === 'success' ? 'linear-gradient(90deg, #52b788, #74c69d)' : 
                    type === 'error' ? 'linear-gradient(90deg, #e63946, #d62828)' : 
                    'linear-gradient(90deg, #0dcaf0, #0aa2c0)';
    
    notification.innerHTML = `
        <i class="bi ${iconClass}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations if not already present
if (!document.getElementById('notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        .filter-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
        
        .clear-filter-btn {
            background: linear-gradient(135deg, #e63946, #d62828);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.3s ease;
        }
        
        .clear-filter-btn:hover {
            background: linear-gradient(135deg, #d62828, #c1121f);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(230, 57, 70, 0.3);
        }
        
        .category-item {
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .category-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .category-item.active {
            background: white;
            border: 2px solid #2d8052ff;
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(31, 102, 63, 0.3);
        }
        
        .category-item.active .category-icon {
            color: #6ec499ff;
        }
        
        .category-item.active .category-count {
            background: #6ec499ff;
            color: white;
        }
        
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #6c757d;
        }
        
        .empty-state i {
            font-size: 64px;
            margin-bottom: 20px;
            opacity: 0.5;
        }
        
        .empty-state h3 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #495057;
        }
        
        .empty-state p {
            font-size: 16px;
            color: #6c757d;
        }
    `;
    document.head.appendChild(style);
}

// ===== NOTIFICATION & PROFILE DROPDOWN FUNCTIONALITY =====
function setupDropdownEvents() {
    // Get dropdown elements
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const markReadBtn = document.querySelector('.mark-read-btn');
    const notificationBadge = document.querySelector('.notification-badge');

    // Toggle Notification Dropdown
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
            
            // Close profile dropdown if open
            if (profileDropdown) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Toggle Profile Dropdown
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', function(e) {
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
    document.addEventListener('click', function(e) {
        // Close notification dropdown
        if (notificationBtn && notificationDropdown) {
            if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.remove('active');
            }
        }
        
        // Close profile dropdown
        if (profileBtn && profileDropdown) {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        }
    });

    // Mark all notifications as read
    if (markReadBtn && notificationBadge) {
        markReadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove unread class from all notifications
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            // Update badge count to 0
            notificationBadge.textContent = '0';
            notificationBadge.style.display = 'none';
            
            showNotification('All notifications marked as read', 'success');
        });
    }

    // Handle individual notification clicks
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove unread class
            this.classList.remove('unread');
            
            // Update badge count
            const unreadCount = document.querySelectorAll('.notification-item.unread').length;
            if (notificationBadge) {
                notificationBadge.textContent = unreadCount;
                if (unreadCount === 0) {
                    notificationBadge.style.display = 'none';
                }
            }
            
            console.log('Notification clicked:', this.querySelector('.notification-title').textContent);
        });
    });

    // Handle profile menu item clicks
    const profileMenuItems = document.querySelectorAll('.profile-menu-item');
    profileMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't prevent default for logout link
            if (!this.classList.contains('logout')) {
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    return;
                }
            }
            
            console.log('Profile menu item clicked:', this.querySelector('span').textContent);
        });
    });
}

// Mobile menu toggle (for responsive design)
function setupMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.left-sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 480) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('show');
                }
            }
        });
    }
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close dropdowns on resize
        const notificationDropdown = document.getElementById('notificationDropdown');
        const profileDropdown = document.getElementById('profileDropdown');
        
        if (notificationDropdown) notificationDropdown.classList.remove('active');
        if (profileDropdown) profileDropdown.classList.remove('active');
    }, 250);
});

// Export functions for external use if needed
window.dashboardUtils = {
    showNotification,
    renderRecentListings,
    clearCategoryFilter
};