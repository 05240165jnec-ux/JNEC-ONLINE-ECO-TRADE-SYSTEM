// Dashboard JavaScript - JNEC ECO-TRADE (Updated)

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
    }
];

// Sample data for user's listings
const myListingsData = [
    {
        id: 101,
        title: "bag",
        price: 800,
        condition: "new",
        status: "available",
        date: "2025-09-20",
        image: "../image/Bag.png",
        category: "books"
    },
    {
        id: 102,
        title: "Winter Jacket",
        price: 1500,
        condition: "good",
        status: "available",
        date: "2025-09-18",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
        category: "clothes"
    },
    {
        id: 103,
        title: "USB Headphones",
        price: 600,
        condition: "good",
        status: "sold",
        date: "2025-09-15",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        category: "electronics"
    }
];

// Store filtered data
let filteredListings = [...recentListingsData];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    renderRecentListings(recentListingsData);
    renderMyListings(myListingsData);
    setupEventListeners();
    setupSidebarEvents();
    animateCounters();
});

// Setup sidebar events
function setupSidebarEvents() {
    // Categories toggle
    const categoriesToggle = document.getElementById('categoriesToggle');
    const categoriesList = document.getElementById('categoriesList');
    
    if (categoriesToggle && categoriesList) {
        categoriesToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            categoriesList.classList.toggle('show');
        });
    }
    
    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-item');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            
            // Only prevent default for links that have a 'data-page' attribute 
            // other than 'browse-all', or if the link is handled internally.
            const page = this.getAttribute('data-page');

            if (page && page !== 'browse-all') {
                e.preventDefault();
                
                // Remove active class from all links
                sidebarLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Handle page navigation
                handlePageNavigation(page);
            } else if (page === 'browse-all') {
                // ADDED: Let the browser handle the default 'href' for 'browse-all' 
                // but ensure filters are reset before navigation.
                handlePageNavigation('browse-all');
            }
        });
    });
    
    // Category filter links
    const categoryFilters = document.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            if (category) {
                document.getElementById('categoryFilter').value = category;
                filterListings();
                
                // Scroll to listings
                const listingsSection = document.getElementById('recentListings').parentElement;
                listingsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Sidebar search
    const sidebarSearch = document.getElementById('sidebarSearch');
    if (sidebarSearch) {
        sidebarSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Filter sidebar categories
            const categoryLinks = document.querySelectorAll('.category-link');
            categoryLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    link.style.display = 'flex';
                } else {
                    link.style.display = 'none';
                }
            });
        });
    }
}

// Handle page navigation
function handlePageNavigation(page) {
    console.log('Navigating to:', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // MODIFIED LOGIC for 'browse-all' navigation
    if (page === 'browse-all') {
        // 1. Reset all filters
        const categoryFilter = document.getElementById('categoryFilter');
        const priceFilter = document.getElementById('priceFilter');
        const conditionFilter = document.getElementById('conditionFilter');
        const searchInput = document.getElementById('searchInput');

        if (categoryFilter) categoryFilter.value = 'all';
        if (priceFilter) priceFilter.value = 'all';
        if (conditionFilter) conditionFilter.value = 'all';
        if (searchInput) searchInput.value = '';

        // 2. Show notification and perform actual redirect
        showNotification('Redirecting to the Full Listings Page...', 'success');
        
        // **ACTUAL REDIRECT:** Navigate to the specified listings page
        setTimeout(() => {
            window.location.href = '../Html/index.html'; 
        }, 500);
        
    }
    // You'd add other page navigation logic here (e.g., if (page === 'my-listings') ...)
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
                <p>Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = listings.map(item => `
        <div class="listing-card" data-category="${item.category}" data-price="${item.price}" data-condition="${item.condition}">
            <img src="${item.image}" alt="${item.title}" class="listing-image">
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

// Render user's listings
function renderMyListings(listings) {
    const container = document.getElementById('myListings');
    
    if (!container) return;
    
    if (listings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-inbox"></i>
                <h3>You haven't listed any items yet</h3>
                <p>Click "Add New Item" to create your first listing</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = listings.map(item => `
        <div class="listing-card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.title}" class="listing-image">
            <div class="listing-info">
                <div class="listing-title">${item.title}</div>
                <div class="listing-price">Nu ${item.price.toLocaleString()}</div>
                <div class="listing-details">
                    <span class="condition-badge condition-${item.condition}">
                        ${item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
                    </span>
                    <span class="status-badge status-${item.status}">
                        ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                </div>
                <div class="listing-details">
                    <i class="bi bi-calendar"></i> Posted: ${formatDate(item.date)}
                </div>
                <div class="listing-actions">
                    ${item.status === 'available' ? `
                        <button class="btn-action btn-edit" onclick="editListing(${item.id})">
                            <i class="bi bi-pencil"></i> Edit
                        </button>
                        <button class="btn-action btn-mark-sold" onclick="markAsSold(${item.id})">
                            <i class="bi bi-check-circle"></i> Mark as Sold
                        </button>
                    ` : ''}
                    <button class="btn-action btn-delete" onclick="deleteListing(${item.id})">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterListings);
    }
    
    // Filter selects
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const conditionFilter = document.getElementById('conditionFilter');
    
    if (categoryFilter) categoryFilter.addEventListener('change', filterListings);
    if (priceFilter) priceFilter.addEventListener('change', filterListings);
    if (conditionFilter) conditionFilter.addEventListener('change', filterListings);
    
    // Quick action buttons
    const addItemBtn = document.getElementById('addItemBtn');
    const viewMyListingsBtn = document.getElementById('viewMyListingsBtn');
    const createListingBtn = document.getElementById('createListingBtn');
    
    if (addItemBtn) {
        addItemBtn.addEventListener('click', () => {
            showNotification('Redirecting to Add New Item page...', 'success');
            // window.location.href = '../Html/post_item.html';
        });
    }
    
    if (createListingBtn) {
        createListingBtn.addEventListener('click', () => {
            showNotification('Redirecting to Create New Listing page...', 'success');
            // window.location.href = '../Html/post_item.html';
        });
    }
    
    if (viewMyListingsBtn) {
        viewMyListingsBtn.addEventListener('click', () => {
            const myListingsSection = document.getElementById('myListings');
            if (myListingsSection) {
                myListingsSection.parentElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Category items click
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const categoryFilter = document.getElementById('categoryFilter');
            if (categoryFilter && category) {
                categoryFilter.value = category;
                filterListings();
                
                // Scroll to listings
                const listingsSection = document.getElementById('recentListings');
                if (listingsSection) {
                    listingsSection.parentElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // MODIFIED: "Browse All Listings" quick link now explicitly calls navigation handler
    const browseAllQuickLink = document.getElementById('browseAllQuickLink'); 
    if (browseAllQuickLink) {
        browseAllQuickLink.addEventListener('click', () => {
            handlePageNavigation('browse-all');
        });
    }
}

// Filter listings based on search and filters
function filterListings() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const conditionFilter = document.getElementById('conditionFilter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const categoryValue = categoryFilter ? categoryFilter.value : 'all';
    const priceValue = priceFilter ? priceFilter.value : 'all';
    const conditionValue = conditionFilter ? conditionFilter.value : 'all';
    
    filteredListings = recentListingsData.filter(item => {
        // Search filter
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) || 
                              item.seller.toLowerCase().includes(searchTerm);
        
        // Category filter
        const matchesCategory = categoryValue === 'all' || item.category === categoryValue;
        
        // Price filter
        let matchesPrice = true;
        if (priceValue !== 'all') {
            if (priceValue === '0-500') {
                matchesPrice = item.price < 500;
            } else if (priceValue === '500-2000') {
                matchesPrice = item.price >= 500 && item.price <= 2000;
            } else if (priceValue === '2000-10000') {
                matchesPrice = item.price > 2000 && item.price <= 10000;
            } else if (priceValue === '10000+') {
                matchesPrice = item.price > 10000;
            }
        }
        
        // Condition filter
        const matchesCondition = conditionValue === 'all' || item.condition === conditionValue;
        
        return matchesSearch && matchesCategory && matchesPrice && matchesCondition;
    });
    
    renderRecentListings(filteredListings);
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
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.innerText = target;
                clearInterval(timer);
            } else {
                counter.innerText = Math.floor(current);
            }
        }, 16);
    });
}

// Edit listing function
function editListing(id) {
    const listing = myListingsData.find(item => item.id === id);
    if (listing) {
        showNotification(`Edit listing: ${listing.title}`, 'success');
        // In a real application, this would open a modal or redirect to edit page
    }
}

// Mark as sold function
function markAsSold(id) {
    const listing = myListingsData.find(item => item.id === id);
    if (listing) {
        if (confirm(`Mark "${listing.title}" as sold?`)) {
            listing.status = 'sold';
            renderMyListings(myListingsData);
            
            // Update stats
            const soldElement = document.getElementById('soldItems');
            if (soldElement) {
                const currentSold = parseInt(soldElement.innerText) || 0; // Handle initial NaN
                soldElement.innerText = currentSold + 1;
            }
            
            // Show success message
            showNotification('Item marked as sold successfully!', 'success');
        }
    }
}

// Delete listing function
function deleteListing(id) {
    const listing = myListingsData.find(item => item.id === id);
    if (listing) {
        if (confirm(`Are you sure you want to delete "${listing.title}"?`)) {
            const index = myListingsData.findIndex(item => item.id === id);
            myListingsData.splice(index, 1);
            renderMyListings(myListingsData);
            
            // Update stats
            const totalElement = document.getElementById('totalItems');
            if (totalElement) {
                const currentTotal = parseInt(totalElement.innerText) || 0; // Handle initial NaN
                totalElement.innerText = currentTotal - 1;
            }
            
            // Show success message
            showNotification('Item deleted successfully!', 'success');
        }
    }
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(90deg, #52b788, #74c69d);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(82, 183, 136, 0.3);
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

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export functions for global access
window.editListing = editListing;
window.markAsSold = markAsSold;
window.deleteListing = deleteListing;