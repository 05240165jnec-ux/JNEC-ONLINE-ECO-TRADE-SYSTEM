document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('#sidebar .nav-links li[data-target]');
    const contentSections = document.querySelectorAll('.content-section');
    const listingsContainer = document.getElementById('listings-container');
    const notificationList = document.getElementById('notification-list');
    const notificationCount = document.getElementById('notification-count');
    const clearNotificationsBtn = document.getElementById('clear-notifications');
    const listingSearch = document.getElementById('listing-search');
    const statusFilter = document.getElementById('listing-status-filter');

    // Modal elements
    const actionModal = document.getElementById('action-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const closeBtns = document.querySelectorAll('.close-btn');

    // --- DUMMY DATA ---

    let listingsData = [
        { id: 1, title: "HP Laptop", price: "2500", posted: "2025-09-25", views: 150, saves: 12, status: "Active", image: "../image/Laptop.png" },
        { id: 2, title: "Cycle", price: "5500", posted: "2025-09-20", views: 80, saves: 5, status: "Sold", image: "../image/cycle.png" },
        { id: 3, title: "Old School T-Shirt", price: "Free/Donate", posted: "2025-09-15", views: 200, saves: 25, status: "Active", image: "../image/shirt.png" }
    ];
    
    // Notifications data (3 unread initially, matching badge in mockup)
    let notificationsData = [
        { id: 101, message: 'New message from user **Sara D.** about your **HP Laptop**.', time: '5 minutes ago', read: false, icon: 'fa-envelope', color: 'blue' },
        { id: 102, message: 'Your listing **Vintage Bookshelf** was marked as **Sold/Donated**.', time: '1 hour ago', read: false, icon: 'fa-check-circle', color: 'green' },
        { id: 103, message: '**Old School T-Shirt** has been saved by **5** new users.', time: '4 hours ago', read: false, icon: 'fa-bookmark', color: 'orange' },
        { id: 104, message: 'System update: Insights & Statistics page improved.', time: 'Yesterday', read: true, icon: 'fa-cog', color: 'gray' },
    ];

    /**
     * 1. TAB SWITCHING (SIDEBAR)
     */
    function switchTab(targetId) {
        // Update sidebar active link and main header
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
                // Clean up the text for the header, removing badges and newlines
                let headerText = link.textContent.trim().replace(/\s+\d+$/, ''); 
                document.getElementById('main-header').querySelector('h2').textContent = headerText;
            }
        });

        // Update main content visibility
        contentSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });
        
        // Specific logic for content rendering
        if (targetId === 'notifications') {
            renderNotifications();
        } else if (targetId === 'my-listings') {
            renderListings(listingsData);
        } else if (targetId === 'insights') {
            updateInsights();
        }
    }

    // Attach click listeners to sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    /**
     * 2. LISTINGS RENDERING AND ACTIONS
     */

    function createListingHTML(listing) {
        const isSold = listing.status === "Sold";
        const statusClass = isSold ? 'status-sold' : 'status-active';
        const statusText = isSold ? 'Sold' : 'Active';
        const markButtonText = isSold ? 'Mark Active' : 'Mark as Sold';
        const priceDisplay = listing.price.includes("Free") ? listing.price.replace("/", "") : listing.price;

        return `
            <div class="listing-item" data-id="${listing.id}" data-status="${listing.status}">
                <img src="${listing.image}" class="listing-image" alt="${listing.title}">
                <div class="listing-details">
                    <h4>${listing.title}</h4>
                    <p>Price: <strong>${priceDisplay}</strong> | Posted: ${listing.posted}</p>
                    <p>Views: ${listing.views} / Saves: ${listing.saves}</p>
                </div>
                <div class="listing-actions">
                    <span class="listing-status ${statusClass}">${statusText}</span>
                    <button class="action-btn edit-btn">Edit</button>
                    <button class="action-btn status-toggle-btn">${markButtonText}</button>
                    <button class="action-btn action-delete delete-btn">Delete</button>
                </div>
            </div>
        `;
    }

    function renderListings(data) {
        listingsContainer.innerHTML = '';
        const searchTerm = listingSearch.value.toLowerCase();
        const filterStatus = statusFilter.value;

        const filteredData = data.filter(listing => {
            const matchesSearch = listing.title.toLowerCase().includes(searchTerm);
            const matchesStatus = filterStatus === 'all' || listing.status === filterStatus;
            return matchesSearch && matchesStatus;
        });

        if (filteredData.length === 0) {
            listingsContainer.innerHTML = '<p id="no-listings" class="empty-state">No listings match your criteria.</p>';
            return;
        }

        filteredData.forEach(listing => {
            listingsContainer.innerHTML += createListingHTML(listing);
        });
    }

    function handleListingAction(event) {
        const target = event.target;
        const listingItem = target.closest('.listing-item');
        if (!listingItem) return;

        const listingId = parseInt(listingItem.getAttribute('data-id'));
        let listing = listingsData.find(l => l.id === listingId);
        if (!listing) return;

        if (target.classList.contains('edit-btn')) {
            alert(`Editing listing: ${listing.title}`);
        } else if (target.classList.contains('status-toggle-btn')) {
            const newStatus = listing.status === "Active" ? "Sold" : "Active";
            
            showModal(
                `Are you sure you want to mark "${listing.title}" as **${newStatus}**?`,
                () => {
                    listing.status = newStatus;
                    renderListings(listingsData); 
                    updateInsights(); // Update stats immediately
                    hideModal();
                }
            );
        } else if (target.classList.contains('delete-btn')) {
            showModal(
                `Are you sure you want to permanently delete "**${listing.title}**"? This cannot be undone.`,
                () => {
                    listingsData = listingsData.filter(l => l.id !== listingId);
                    renderListings(listingsData);
                    updateInsights(); // Update stats immediately
                    hideModal();
                }
            );
        }
    }

    listingsContainer.addEventListener('click', handleListingAction);
    listingSearch.addEventListener('input', () => renderListings(listingsData));
    statusFilter.addEventListener('change', () => renderListings(listingsData));


    /**
     * 3. NOTIFICATION FUNCTIONALITY
     */
    
    function renderNotifications() {
        if (notificationsData.length === 0) {
            notificationList.innerHTML = '<li class="empty-notification"><i class="fa-solid fa-bell-slash"></i><p>No new notifications.</p></li>';
            clearNotificationsBtn.style.display = 'none';
            return;
        }
        
        // Sort to show unread first
        const sortedNotifications = [...notificationsData].sort((a, b) => (a.read === b.read) ? 0 : a.read ? 1 : -1);

        notificationList.innerHTML = '';
        clearNotificationsBtn.style.display = 'block';

        sortedNotifications.forEach(notif => {
            const li = document.createElement('li');
            li.className = `notification-item ${notif.read ? 'read' : 'unread'}`;
            li.innerHTML = `
                <i class="fa-solid ${notif.icon} notification-icon ${notif.color}-color"></i>
                <div class="notification-content">
                    <p class="message">${notif.message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
                    <span class="time">${notif.time}</span>
                </div>
            `;
            notificationList.appendChild(li);
            
            // Mark as read when clicked
            li.addEventListener('click', () => {
                const targetNotif = notificationsData.find(n => n.id === notif.id);
                if (targetNotif && !targetNotif.read) {
                    targetNotif.read = true;
                    renderNotifications(); // Re-render to update classes and sorting
                    updateNotificationBadge();
                }
            });
        });
    }

    // Function to update the sidebar badge count
    function updateNotificationBadge() {
        const unreadCount = notificationsData.filter(n => !n.read).length;
        notificationCount.textContent = unreadCount;
        notificationCount.style.display = unreadCount > 0 ? 'inline' : 'none';
    }
    
    // Clear all notifications
    clearNotificationsBtn.addEventListener('click', function() {
        showModal(
            'Are you sure you want to clear **all** notifications? (They will be marked as read.)',
            () => {
                notificationsData.forEach(n => n.read = true);
                renderNotifications();
                updateNotificationBadge();
                hideModal();
            }
        );
    });
    
    /**
     * 4. INSIGHTS FUNCTIONALITY
     */
    function updateInsights() {
        const totalViews = listingsData.reduce((sum, l) => sum + l.views, 0);
        const totalSaves = listingsData.reduce((sum, l) => sum + l.saves, 0);
        const activeCount = listingsData.filter(l => l.status === 'Active').length;
        const soldCount = listingsData.filter(l => l.status === 'Sold').length;

        // Use a dynamic total for the first time if the dummy data doesn't match the HTML
        document.getElementById('total-views').textContent = totalViews;
        document.getElementById('total-saves').textContent = totalSaves;
        document.getElementById('active-listings-count').textContent = activeCount;
        document.getElementById('sold-listings-count').textContent = soldCount;
    }

    /**
     * 5. MODAL FUNCTIONALITY
     */
    
    function showModal(message, confirmCallback) {
        modalMessage.innerHTML = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Clear old listener before setting new one to prevent multiple callbacks
        const oldConfirmBtn = modalConfirmBtn.cloneNode(true);
        modalConfirmBtn.parentNode.replaceChild(oldConfirmBtn, modalConfirmBtn);
        const newConfirmBtn = document.getElementById('modal-confirm-btn');

        // Set new listener
        newConfirmBtn.addEventListener('click', function handler() {
            confirmCallback();
            // Remove listener after execution
            newConfirmBtn.removeEventListener('click', handler); 
        });

        actionModal.style.display = 'block';
    }

    function hideModal() {
        actionModal.style.display = 'none';
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', hideModal);
    });

    window.addEventListener('click', function(event) {
        if (event.target === actionModal) {
            hideModal();
        }
    });


    /**
     * 6. INITIALIZATION
     */
    function initialize() {
        // Initial rendering of listings on page load
        renderListings(listingsData);
        // Initial setup of the notification badge
        updateNotificationBadge();
        // Initial setup of the insights
        updateInsights(); 
    }

    initialize();
});
