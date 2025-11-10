document.addEventListener('DOMContentLoaded', () => {
    // Select the content area where items will be rendered
    const mainContentArea = document.getElementById('content-area');
    const sectionTitle = document.getElementById('sectionTitle');
    const menuItems = document.querySelectorAll('.menu-item');
    const searchInput = document.getElementById('mainSearchInput');
    const browseAllLink = document.getElementById('browse-all-link');

    // Notification and Profile Dropdown functionality
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    // Category dropdown functionality
    const categoryDropdownBtn = document.getElementById('categoryDropdownBtn');
    const categoryDropdownMenu = document.getElementById('categoryDropdownMenu');
    const categoryItems = document.querySelectorAll('.category-dropdown-item');

    // My Booking dropdown functionality (NEW STYLE)
    const myBookingToggle = document.getElementById('myBookingToggle');
    const sidebarDropdown = document.querySelector('.sidebar-dropdown');

    // --- Data Definitions ---
    const browseAllItems = [
        { name: "Laptop", price: 25000, image: "../image/Laptop.png" },
        { name: "Textbook", price: 200, image: "../image/book.png" },
        { name: "Television", price: 15000, image: "../image/television.png" },
        { name: "Bicycle", price: 500, image: "../image/Cycle.png" },
        { name: "Desk", price: 350, image: "../image/Chair.png" },
        { name: "Smartphone", price: 18000, image: "../image/Laptop.png" },
        { name: "USED BOOKS", price: 1000, image: "../image/book.png" },
        { name: "USED T-SHIRT", price: 100, image: "../image/book.png" },
        { name: "USED SNEAKERS", price: 1500, image: "../image/shoe.png" },
        { name: "Tablet", price: 20000, image: "../image/Tablet.png" }
    ];

    const recentActivityItems = [
        { 
            name: "Wooden Desk", 
            price: 3500, 
            image: "../image/Chair.png", 
            category: "Furniture",
            status: "approved"
        },
        { 
            name: "Textbooks Set", 
            price: 800, 
            image: "../image/book.png", 
            category: "Books",
            status: "rejected"
        },
        { 
            name: "Watch", 
            price: 6500, 
            image: "../image/watch.png", 
            category: "Electronics",
            status: "approved"
        },
        { 
            name: "Shoe", 
            price: 100, 
            image: "../image/shoe.png", 
            category: "Clothing",
            status: "pending"
        }
    ];

    const savedItems = [
        { name: "Laptop", price: 20000, image: "../image/Laptop.png" },
        { name: "Pencil", price: 30, image: "../image/Mechanical pencil set.png" },
        { name: "Cycle", price: 2500, image: "../image/Cycle.png" },
        { name: "Book", price: 100, image: "../image/Book.png" },
        { name: "Tablet", price: 1000, image: "../image/Tablet.png" },
        { name: "Pan", price: 500, image: "../image/Pan.jpeg" },
        { name: "Watch", price: 6500, image: "../image/watch.png" },
        { name: "Television", price: 15000, image: "../image/television.png" },
        { name: "Bottle", price: 3500, image: "../image/bottle.png" }
    ];

    // Combine all unique items for searching
    const allItems = [...browseAllItems, ...recentActivityItems, ...savedItems];
    const uniqueItems = Array.from(new Set(allItems.map(JSON.stringify))).map(JSON.parse);

    // --- Utility Functions ---
    const createItemCard = (item) => {
        // Check if the item has a status property (for recent activity items)
        const hasStatus = item.status !== undefined;
        
        return `
            <div class="col">
                <div class="card item-card">
                    <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">Nu ${item.price.toLocaleString()}</p>
                        ${hasStatus ? `<div class="item-status status-${item.status}">${item.status}</div>` : ''}
                        <a href="#" class="btn btn-primary w-100 btn-sm">View Details</a>
                    </div>
                </div>
            </div>
        `;
    };

    const createEmptyState = (title, text) => `
        <div class="empty-state">
            <i class="bi bi-box-fill text-muted"></i>
            <h2>${title}</h2>
            <p>${text}</p>
            <a href="#" class="btn browse-btn" onclick="location.reload()">Browse Marketplace</a>
        </div>
    `;

    const renderItems = (items) => {
        if (items && items.length > 0) {
            const itemsHtml = items.map(createItemCard).join('');
            mainContentArea.innerHTML = `<div class="item-grid">${itemsHtml}</div>`;
        } else {
            mainContentArea.innerHTML = createEmptyState(
                "Nothing Here Yet!",
                "Looks like you haven't viewed or saved anything in this category. Start exploring the marketplace!"
            );
        }
    };

    const renderCustomContent = (html) => {
        mainContentArea.innerHTML = html;
    };

    // --- Search Functionality ---
    const handleSearch = (query) => {
        // Remove active state from all menu items
        menuItems.forEach(item => item.classList.remove('active'));
        if (browseAllLink) {
            browseAllLink.classList.remove('active');
        }
        
        sectionTitle.textContent = `Search Results for "${query}"`;

        const searchResults = uniqueItems.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        if (searchResults.length > 0) {
            const itemsHtml = searchResults.map(item => createItemCard(item)).join('');
            mainContentArea.innerHTML = `
                <h5 class="text-muted mb-3">Found ${searchResults.length} item(s) matching: "${query}"</h5>
                <div class="item-grid">${itemsHtml}</div>
            `;
        } else {
            mainContentArea.innerHTML = createEmptyState(
                "No Matches Found",
                `We couldn't find any items matching "${query}". Try a different search term or browse the main categories.`
            );
        }
    };

    // --- View Switching Logic ---
    const switchView = (viewName, title) => {
        sectionTitle.textContent = title;
        mainContentArea.innerHTML = '';

        switch (viewName) {
            case 'browse-all':
                renderItems(browseAllItems);
                break;
            case 'recent-activity':
                renderItems(recentActivityItems);
                break;
            case 'saved':
                renderItems(savedItems);
                break;
            case 'alerts':
                const customAlertsHTML = `
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1 text-success"><i class="bi bi-check-circle-fill me-2"></i>Booking Confirmation</h5>
                                <small class="text-muted">Just now</small>
                            </div>
                            <p class="mb-1">You have successfully reserved 'Shoe'. The seller's number is +975 17XXXXXX. Please contact them now to discuss price and collection.</p>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1 text-info"><i class="bi bi-person-rolodex me-2"></i>Seller Contacted</h5>
                                <small class="text-muted">5 minutes ago</small>
                            </div>
                            <p class="mb-1">The seller has been notified of your reservation. Awaiting status update.</p>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1 text-danger"><i class="bi bi-x-octagon-fill me-2"></i>Booking Canceled</h5>
                                <small class="text-muted">1 hour ago</small>
                            </div>
                            <p class="mb-1">The seller has canceled your reservation for 'Shoe'. You may browse other similar items.</p>
                        </a>
                    </div>
                `;
                renderCustomContent(customAlertsHTML);
                break;
            default:
                switchView('recent-activity', 'Recent Activity');
        }
    };

    // --- Event Listeners ---

    // My Booking Dropdown Toggle (NEW STYLE)
    if (myBookingToggle && sidebarDropdown) {
        myBookingToggle.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarDropdown.classList.toggle('active');
        });
    }

    // Browse All Link
    if (browseAllLink) {
        browseAllLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all sidebar items and menu items
            document.querySelectorAll('.sidebar-item').forEach(item => {
                item.classList.remove('active');
            });
            menuItems.forEach(item => item.classList.remove('active'));
            
            // Add active to browse all
            browseAllLink.classList.add('active');
            
            // Switch to browse all view
            switchView('browse-all', 'Browse Items');
        });
    }

    // Sidebar Menu Navigation (My Booking submenu items)
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            const title = item.textContent.trim();

            // Remove active from browse all
            if (browseAllLink) {
                browseAllLink.classList.remove('active');
            }

            // Update active state for submenu items
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Switch view
            switchView(view, title);
        });
    });

    // Search Input - Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim() !== '') {
            e.preventDefault();
            handleSearch(searchInput.value.trim());
        }
    });

    // Notification Dropdown Toggle
    if (notificationBtn) {
        notificationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
            if (profileDropdown) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Profile Dropdown Toggle
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
            if (notificationDropdown) {
                notificationDropdown.classList.remove('active');
            }
        });
    }

    // Category Dropdown Toggle
    if (categoryDropdownBtn) {
        categoryDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            categoryDropdownMenu.classList.toggle('active');
            categoryDropdownBtn.classList.toggle('active');
        });
    }

    // Category Item Selection
    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Update button text
            const categoryText = item.textContent.trim();
            categoryDropdownBtn.childNodes[0].textContent = categoryText + ' ';
            
            // Close dropdown
            categoryDropdownMenu.classList.remove('active');
            categoryDropdownBtn.classList.remove('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (notificationBtn && notificationDropdown && 
            !notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.remove('active');
        }
        if (profileBtn && profileDropdown && 
            !profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('active');
        }
        if (categoryDropdownBtn && categoryDropdownMenu && 
            !categoryDropdownBtn.contains(e.target) && !categoryDropdownMenu.contains(e.target)) {
            categoryDropdownMenu.classList.remove('active');
            categoryDropdownBtn.classList.remove('active');
        }
    });

    // Mark all as read button
    const markReadBtn = document.querySelector('.mark-read-btn');
    if (markReadBtn) {
        markReadBtn.addEventListener('click', () => {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.textContent = '0';
            }
        });
    }

    // Initialize: Load the default view on page load (Recent Activity)
    switchView('recent-activity', 'Recent Activity');
});