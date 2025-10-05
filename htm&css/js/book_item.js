document.addEventListener('DOMContentLoaded', () => {
    // Select the content area where items will be rendered, and all menu links
    const mainContentArea = document.getElementById('content-area');
    const sectionTitle = document.querySelector('.section-title');
    const menuItems = document.querySelectorAll('.menu-item, .create-listing-btn');

    // --- Data Definitions ---
    const recentActivityItems = [
        { name: "Watch", price: 6500, image: "../image/watch.png" },
        { name: "Extra Item 1 (Shoe)", price: 100, image: "../image/shoe.png" }
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
    const allItems = [ ...recentActivityItems, ...savedItems ];
    const uniqueItems = Array.from(new Set(allItems.map(JSON.stringify))).map(JSON.parse);


    // --- Utility Functions ---

    const createItemCard = (item) => `
        <div class="col">
            <div class="card item-card">
                <img src="${item.image}" class="card-img-top p-2" alt="${item.name}">
                <div class="card-body p-2">
                    <h5 class="card-title text-center mb-1">${item.name}</h5>
                    <p class="card-text text-center text-muted mb-1">Nu ${item.price.toLocaleString()}</p>
                    <a href="#" class="btn btn-primary w-100 btn-sm">View Details (BUY NOW)</a>
                </div>
            </div>
        </div>
    `;

    const createEmptyState = (title, text) => `
        <div class="empty-state text-center p-5">
            <i class="bi bi-box-fill text-muted" style="font-size: 3rem;"></i>
            <h2 class="mt-3">${title}</h2>
            <p>${text}</p>
            <a href="../Html/index.html" class="btn btn-success browse-btn mt-2">Browse Marketplace</a>
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


    // --- NEW SIDEBAR SEARCH LOGIC ---

    const handleSidebarSearch = (query) => {
        // Remove 'active' state from all menu items when search is performed
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));

        sectionTitle.textContent = `Search Results for "${query}"`;

        const searchResults = uniqueItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

        if (searchResults.length > 0) {
            // Display results using the item card structure
            const itemsHtml = searchResults.map(item => createItemCard(item)).join('');
            mainContentArea.innerHTML = `
                <h5 class="text-muted mb-3">Found ${searchResults.length} item(s) matching: **${query}**</h5>
                <div class="item-grid">${itemsHtml}</div>
            `;
        } else {
            mainContentArea.innerHTML = createEmptyState(
                "No Matches Found",
                `We couldn't find any items matching "**${query}**". Try a different search term or browse the main categories.`
            );
        }
    };


    // --- View Switching Logic ---

    const switchView = (viewName, title) => {
        sectionTitle.textContent = title;

        // Clear the main content area first
        mainContentArea.innerHTML = '';
        
        // Hide the dummy search view if it was rendered in the main content (as per previous logic)
        // document.getElementById('search-view').style.display = 'none';

        switch (viewName) {
            // Note: The 'search' view is now handled by the live input event listener,
            // so we don't need a case 'search' here unless we want a dedicated page.

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
                            <p class="mb-1">You have successfully reserved 'Extra Item 1 (Shoe)'. The seller's number is **+975 17XXXXXX**. Please contact them now to discuss price and collection.</p>
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
                            <p class="mb-1">The seller has canceled your reservation for 'Extra Item 1 (Shoe)'. You may browse other similar items.</p>
                        </a>
                    </div>
                `;
                renderCustomContent(customAlertsHTML);
                break;
            case 'profile':
                // Custom Profile content
                renderCustomContent(`
                    <div style="padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                        <h1><i class="bi bi-person-circle"></i> Profile Settings</h1>
                        <p class="text-muted">This is your dedicated profile management area. Update your details and security settings here.</p>
                        <ul class="list-unstyled" style="margin-top: 20px;">
                            <li class="mb-2"><i class="bi bi-person-vcard-fill text-success me-2"></i> Account Details</li>
                            <li class="mb-2"><i class="bi bi-shield-lock-fill text-success me-2"></i> Privacy & Security</li>
                            <li class="mb-2"><i class="bi bi-box-arrow-right text-success me-2"></i> Logout</li>
                        </ul>
                    </div>
                `);
                break;
            case 'create-listing':
                renderCustomContent(
                    createEmptyState(
                        "Ready to Sell?",
                        "Click the button below to start listing your pre-loved item for the JNEC community."
                    )
                );
                break;
            default:
                switchView('recent-activity', 'Recent Activity');
        }
    };

    // --- Event Listeners for Menu Navigation ---

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            let title = item.classList.contains('create-listing-btn') ? 'Create New Listing' : item.textContent.trim();

            // Update active state in sidebar (remove from all, add to clicked)
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            if (item.classList.contains('menu-item')) {
                item.classList.add('active');
            }

            // If the search link was clicked, don't switch the main view, just focus the input
            if (view === 'search') {
                 document.getElementById('sidebarSearchInput').focus();
                 return;
            }

            // Switch content for actual content views
            switchView(view, title);
        });
    });
    
    // --- Attach Listener to New Sidebar Input ---
    const sidebarSearchInput = document.getElementById('sidebarSearchInput');
    if (sidebarSearchInput) {
        // Listen for the 'Enter' key press
        sidebarSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && sidebarSearchInput.value.trim() !== '') {
                e.preventDefault(); // Prevent page reload
                handleSidebarSearch(sidebarSearchInput.value.trim());
            }
        });
        
        // Optional: Listen for input changes for instant search results
        // sidebarSearchInput.addEventListener('input', () => {
        //     const query = sidebarSearchInput.value.trim();
        //     if (query.length > 2) { // Search only if at least 3 characters are typed
        //         handleSidebarSearch(query);
        //     } else if (query.length === 0) {
        //         switchView('recent-activity', 'Recent Activity'); // Go back to default view
        //     }
        // });
    }


    // Initialize: Load the default view on page load (Recent Activity)
    switchView('recent-activity', 'Recent Activity');
});