document.addEventListener('DOMContentLoaded', function() {
    // ===== DOM ELEMENTS =====
    
    // Sidebar navigation
    const submenuItems = document.querySelectorAll('.submenu-item[data-target]');
    const contentSections = document.querySelectorAll('.content-section');
    const listingsDropdownBtn = document.getElementById('listingsDropdownBtn');
    const sidebarDropdown = document.querySelector('.sidebar-dropdown');
    
    // Listing elements
    const listingsContainer = document.getElementById('listings-container');
    const listingSearch = document.getElementById('listing-search');
    const statusFilter = document.getElementById('listing-status-filter');
    
    // Booking elements
    const bookingContainer = document.getElementById('booking-requests-container');
    const bookingSearch = document.getElementById('booking-search');
    const bookingStatusFilter = document.getElementById('booking-status-filter');
    
    // Notification elements
    const notificationList = document.getElementById('notification-list');
    const notificationCount = document.getElementById('notification-count');
    const clearNotificationsBtn = document.getElementById('clear-notifications');
    
    // Modal elements
    const actionModal = document.getElementById('action-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const closeBtns = document.querySelectorAll('.close-btn');
    const modalCancelBtn = document.querySelector('.modal-cancel-btn');
    
    // Toast element
    const successToast = document.getElementById('success-toast');
    const toastMessage = document.getElementById('toast-message');
    
    // Header dropdown elements
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    // ===== DATA =====
    let listingsData = [
        { id: 1, title: "Laptop", price: "25,000", posted: "2025-09-25", views: 150, saves: 12, status: "Active", image: "../image/Laptop.png" },
        { id: 2, title: "Bicycle", price: "500", posted: "2025-09-20", views: 80, saves: 5, status: "Sold", image: "../image/Cycle.png" },
        { id: 3, title: "Textbook", price: "200", posted: "2025-09-15", views: 200, saves: 25, status: "Active", image: "../image/shirt.png" },
    ];
    
    let bookingsData = [
        { 
            id: 1, 
            itemId: 1, 
            itemTitle: "HP Laptop", 
            itemPrice: "Nu 2500", 
            itemPosted: "2025-09-25",
            itemImage: "../image/Laptop.png",
            buyerName: "Sonam Yeshi", 
            buyerId: "B001", 
            requestDate: "2025-10-15 10:30 AM", 
            status: "Pending"
        },
        { 
            id: 2, 
            itemId: 3, 
            itemTitle: "Old School T-Shirt", 
            itemPrice: "Free Donate", 
            itemPosted: "2025-09-15",
            itemImage: "../image/shirt.png",
            buyerName: "Karma Dorji", 
            buyerId: "B002", 
            requestDate: "2025-10-14 3:45 PM", 
            status: "Pending"
        },
        { 
            id: 3, 
            itemId: 2, 
            itemTitle: "Cycle", 
            itemPrice: "Nu 5500", 
            itemPosted: "2025-09-20",
            itemImage: "../image/Cycle.png",
            buyerName: "Pema Zangmo", 
            buyerId: "B003", 
            requestDate: "2025-10-13 11:20 AM", 
            status: "Approved"
        },
        { 
            id: 4, 
            itemId: 1, 
            itemTitle: "HP Laptop", 
            itemPrice: "Nu 2500", 
            itemPosted: "2025-09-25",
            itemImage: "../image/Laptop.png",
            buyerName: "Tashi Wangchuk", 
            buyerId: "B004", 
            requestDate: "2025-10-12 2:15 PM", 
            status: "Rejected"
        },
        { 
            id: 5, 
            itemId: 3, 
            itemTitle: "Old School T-Shirt", 
            itemPrice: "Free Donate", 
            itemPosted: "2025-09-15",
            itemImage: "../image/shirt.png",
            buyerName: "Deki Choden", 
            buyerId: "B005", 
            requestDate: "2025-10-11 9:00 AM", 
            status: "Pending"
        }
    ];
    
    let notificationsData = [
        { id: 101, message: 'New message from user **Sara D.** about your **HP Laptop**.', time: '5 minutes ago', read: false, icon: 'fa-envelope', color: 'blue' },
        { id: 102, message: 'Your listing **Vintage Bookshelf** was marked as **Sold/Donated**.', time: '1 hour ago', read: false, icon: 'fa-check-circle', color: 'green' },
        { id: 103, message: '**Old School T-Shirt** has been saved by **5** new users.', time: '4 hours ago', read: false, icon: 'fa-bookmark', color: 'orange' },
        { id: 104, message: 'New booking request from **Karma Dorji** for **Old School T-Shirt**.', time: '6 hours ago', read: true, icon: 'fa-calendar-check', color: 'blue' },
        { id: 105, message: 'Your item **Cycle** received a new inquiry.', time: '1 day ago', read: true, icon: 'fa-question-circle', color: 'gray' }
    ];

    // ===== SIDEBAR NAVIGATION =====
    
    // Handle dropdown toggle for My Listings
    if (listingsDropdownBtn && sidebarDropdown) {
        listingsDropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarDropdown.classList.toggle('active');
        });
    }

    // Handle submenu item clicks to switch content sections
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            
            // Remove active class from all submenu items
            submenuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // ===== HEADER DROPDOWNS =====
    
    // Notification Dropdown Toggle
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
            if (profileDropdown) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Profile Dropdown Toggle
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
            if (notificationDropdown) {
                notificationDropdown.classList.remove('active');
            }
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (notificationDropdown && !notificationDropdown.contains(e.target) && e.target !== notificationBtn) {
            notificationDropdown.classList.remove('active');
        }
        if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileBtn) {
            profileDropdown.classList.remove('active');
        }
    });

    // ===== LISTINGS MANAGEMENT =====
    
    function renderListings() {
        const searchQuery = listingSearch.value.toLowerCase();
        const statusValue = statusFilter.value;
        
        const filtered = listingsData.filter(listing => {
            const matchesSearch = listing.title.toLowerCase().includes(searchQuery);
            const matchesStatus = statusValue === 'all' || listing.status === statusValue;
            return matchesSearch && matchesStatus;
        });
        
        if (filtered.length === 0) {
            listingsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-box-open"></i>
                    <p>No listings found matching your criteria.</p>
                </div>
            `;
            return;
        }
        
        listingsContainer.innerHTML = filtered.map(listing => `
            <div class="listing-item" data-id="${listing.id}">
                <img src="${listing.image}" alt="${listing.title}" class="listing-image">
                <div class="listing-details">
                    <h4>${listing.title}</h4>
                    <p><strong>Price:</strong> Nu ${listing.price}</p>
                    <p><strong>Posted:</strong> ${listing.posted} | <strong>Views:</strong> ${listing.views} | <strong>Saves:</strong> ${listing.saves}</p>
                </div>
                <div class="listing-actions">
                    <span class="listing-status ${listing.status === 'Active' ? 'status-active' : 'status-sold'}">
                        ${listing.status}
                    </span>
                    <button class="action-btn" onclick="editListing(${listing.id})">
                        <i class="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    ${listing.status === 'Active' ? `
                        <button class="action-btn" onclick="markAsSold(${listing.id})">
                            <i class="fa-solid fa-check"></i> Mark as Sold
                        </button>
                    ` : ''}
                    <button class="action-btn action-delete" onclick="deleteListing(${listing.id})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Edit listing function
    window.editListing = function(id) {
        showToast('Edit functionality would redirect to edit page');
        console.log('Editing listing:', id);
    };

    // Mark as sold function
    window.markAsSold = function(id) {
        showModal(
            'Mark as Sold',
            'Are you sure you want to mark this item as sold?',
            function() {
                const listing = listingsData.find(l => l.id === id);
                if (listing) {
                    listing.status = 'Sold';
                    renderListings();
                    showToast('Listing marked as sold successfully!');
                }
                closeModal();
            }
        );
    };

    // Delete listing function
    window.deleteListing = function(id) {
        showModal(
            'Delete Listing',
            'Are you sure you want to delete this listing? This action cannot be undone.',
            function() {
                listingsData = listingsData.filter(l => l.id !== id);
                renderListings();
                showToast('Listing deleted successfully!');
                closeModal();
            }
        );
    };

    // Attach event listeners for listing filters
    if (listingSearch) {
        listingSearch.addEventListener('input', renderListings);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', renderListings);
    }

    // ===== BOOKING REQUESTS MANAGEMENT =====
    
    function renderBookings() {
        const searchQuery = bookingSearch.value.toLowerCase();
        const statusValue = bookingStatusFilter.value;
        
        const filtered = bookingsData.filter(booking => {
            const matchesSearch = booking.itemTitle.toLowerCase().includes(searchQuery) || 
                                  booking.buyerName.toLowerCase().includes(searchQuery);
            const matchesStatus = statusValue === 'all' || booking.status === statusValue;
            return matchesSearch && matchesStatus;
        });
        
        if (filtered.length === 0) {
            bookingContainer.innerHTML = `
                <div class="empty-bookings">
                    <i class="fa-solid fa-inbox"></i>
                    <h3>No booking requests found</h3>
                    <p>There are no booking requests matching your criteria.</p>
                </div>
            `;
            updateBookingCount(0);
            return;
        }
        
        bookingContainer.innerHTML = filtered.map(booking => `
            <div class="booking-card" data-id="${booking.id}">
                <div class="booking-header">
                    <img src="${booking.itemImage}" alt="${booking.itemTitle}" class="booking-item-image">
                    <div class="booking-item-info">
                        <h3 class="booking-item-title">${booking.itemTitle}</h3>
                        <p class="booking-item-price">${booking.itemPrice}</p>
                        <p class="booking-item-posted">Posted: ${booking.itemPosted}</p>
                    </div>
                    <span class="booking-status-badge status-${booking.status.toLowerCase()}">
                        ${booking.status}
                    </span>
                </div>
                <div class="booking-body">
                    <div class="booking-info-section">
                        <div class="booking-info-label">Buyer Name</div>
                        <div class="booking-info-value booking-buyer-name">${booking.buyerName}</div>
                    </div>
                    <div class="booking-info-section">
                        <div class="booking-info-label">Buyer ID</div>
                        <div class="booking-info-value">${booking.buyerId}</div>
                    </div>
                    <div class="booking-info-section">
                        <div class="booking-info-label">Request Date</div>
                        <div class="booking-info-value booking-date">${booking.requestDate}</div>
                    </div>
                    <div class="booking-info-section">
                        <div class="booking-info-label">Status</div>
                        <div class="booking-info-value">${booking.status}</div>
                    </div>
                </div>
                <div class="booking-actions">
                    ${booking.status === 'Pending' ? `
                        <button class="booking-action-btn btn-approve" onclick="approveBooking(${booking.id})">
                            <i class="fa-solid fa-check"></i> Approve
                        </button>
                        <button class="booking-action-btn btn-reject" onclick="rejectBooking(${booking.id})">
                            <i class="fa-solid fa-times"></i> Reject
                        </button>
                    ` : `
                        <button class="booking-action-btn" disabled>
                            <i class="fa-solid fa-info-circle"></i> ${booking.status}
                        </button>
                    `}
                </div>
            </div>
        `).join('');
        
        // Update booking count badge
        const pendingCount = bookingsData.filter(b => b.status === 'Pending').length;
        updateBookingCount(pendingCount);
    }

    // Update booking count in sidebar
    function updateBookingCount(count) {
        const bookingCountBadge = document.getElementById('booking-count');
        if (bookingCountBadge) {
            bookingCountBadge.textContent = count;
            if (count === 0) {
                bookingCountBadge.style.display = 'none';
            } else {
                bookingCountBadge.style.display = 'inline-block';
            }
        }
    }

    // Approve booking function
    window.approveBooking = function(id) {
        showModal(
            'Approve Booking',
            'Are you sure you want to approve this booking request?',
            function() {
                const booking = bookingsData.find(b => b.id === id);
                if (booking) {
                    booking.status = 'Approved';
                    renderBookings();
                    showToast(`Booking request from ${booking.buyerName} approved!`);
                }
                closeModal();
            }
        );
    };

    // Reject booking function
    window.rejectBooking = function(id) {
        showModal(
            'Reject Booking',
            'Are you sure you want to reject this booking request?',
            function() {
                const booking = bookingsData.find(b => b.id === id);
                if (booking) {
                    booking.status = 'Rejected';
                    renderBookings();
                    showToast(`Booking request from ${booking.buyerName} rejected.`);
                }
                closeModal();
            }
        );
    };

    // Attach event listeners for booking filters
    if (bookingSearch) {
        bookingSearch.addEventListener('input', renderBookings);
    }
    if (bookingStatusFilter) {
        bookingStatusFilter.addEventListener('change', renderBookings);
    }

    // ===== NOTIFICATIONS MANAGEMENT =====
    
    function renderNotifications() {
        if (notificationsData.length === 0) {
            notificationList.innerHTML = '<li class="empty-notification">No notifications at this time.</li>';
            updateNotificationCount(0);
            return;
        }
        
        notificationList.innerHTML = notificationsData.map(notif => {
            const messageHtml = notif.message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return `
                <li class="notification-item ${notif.read ? 'read' : 'unread'}" data-id="${notif.id}">
                    <i class="fa-solid ${notif.icon} notification-icon ${notif.color}-color"></i>
                    <div class="notification-content">
                        <p class="message">${messageHtml}</p>
                        <span class="time">${notif.time}</span>
                    </div>
                </li>
            `;
        }).join('');
        
        // Add click handlers to mark as read
        document.querySelectorAll('#notification-list .notification-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                markNotificationAsRead(id);
            });
        });
        
        // Update notification count
        const unreadCount = notificationsData.filter(n => !n.read).length;
        updateNotificationCount(unreadCount);
    }

    function markNotificationAsRead(id) {
        const notif = notificationsData.find(n => n.id === id);
        if (notif && !notif.read) {
            notif.read = true;
            renderNotifications();
        }
    }

    function updateNotificationCount(count) {
        const badges = document.querySelectorAll('#notification-count, .notification-badge');
        badges.forEach(badge => {
            if (badge.id === 'notification-count' || badge.closest('.header-right')) {
                badge.textContent = count;
                if (count === 0) {
                    badge.style.display = 'none';
                } else {
                    badge.style.display = 'inline-block';
                }
            }
        });
    }

    // Clear all notifications
    if (clearNotificationsBtn) {
        clearNotificationsBtn.addEventListener('click', function() {
            showModal(
                'Clear Notifications',
                'Are you sure you want to clear all notifications?',
                function() {
                    notificationsData = [];
                    renderNotifications();
                    showToast('All notifications cleared!');
                    closeModal();
                }
            );
        });
    }

    // ===== MODAL MANAGEMENT =====
    
    function showModal(title, message, confirmCallback) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        actionModal.style.display = 'block';
        
        // Remove old event listeners by cloning
        const newConfirmBtn = modalConfirmBtn.cloneNode(true);
        modalConfirmBtn.parentNode.replaceChild(newConfirmBtn, modalConfirmBtn);
        
        // Add new event listener
        newConfirmBtn.addEventListener('click', confirmCallback);
        
        // Update reference
        window.modalConfirmBtn = newConfirmBtn;
    }

    function closeModal() {
        actionModal.style.display = 'none';
    }

    // Close modal on X button or Cancel button
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    if (modalCancelBtn) {
        modalCancelBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === actionModal) {
            closeModal();
        }
    });

    // ===== TOAST NOTIFICATION =====
    
    function showToast(message) {
        toastMessage.textContent = message;
        successToast.classList.add('show');
        
        setTimeout(() => {
            successToast.classList.remove('show');
        }, 3000);
    }

    // ===== INITIALIZE =====
    
    // Render initial data
    renderListings();
    renderBookings();
    renderNotifications();
    
    console.log('Seller Dashboard initialized successfully!');
});