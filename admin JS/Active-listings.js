// Active-listings.js

// Navigation back to home
function goBackToHome() {
    window.location.href = 'home.html';
}

// Navigation function for sidebar items
function navigateToSection(section) {
    switch(section) {
        case 'items':
            window.location.href = 'Item-Management.html';
            break;
        case 'listings':
            // Already on listings page
            break;
        case 'category':
            window.location.href = 'Item-category.html';
            break;
        case 'users':
            window.location.href = 'Manage-user.html';
            break;
        case 'feedback':
            window.location.href = 'feedback.html';
            break;
        default:
            console.log('Navigation not implemented for:', section);
    }
}

// Set active navigation item
function setActiveNav(element, section) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    element.classList.add('active');
    
    // Navigate if it's not the current section
    if (section !== 'listings') {
        navigateToSection(section);
    }
}

// Your existing listings management functions...
function searchListings() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    console.log('Searching for:', searchTerm);
    // Your search logic here
}

function closeModal() {
    document.getElementById('listingDetailModal').classList.remove('show');
}

// Sample data
const sampleListings = [
    {
        id: 1,
        name: "Textbook",
        category: "Books",
        price: "Nu. 200",
        condition: "Good",
        seller: "Karma Wangchuk",
        contact: "17123456",
        postedDate: "2025-01-10",
        views: 45,
        status: "active",
        description: "Science textbook for class 10, well maintained.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='12' fill='%23fef3c7'/%3E%3Ctext x='40' y='45' text-anchor='middle' fill='%2392400e' font-family='Inter' font-size='10'%3EBook%3C/text%3E%3C/svg%3E"
    },
    {
        id: 2,
        name: "Jacket",
        category: "Clothing",
        price: "Nu. 650",
        condition: "Excellent",
        seller: "Pema Dorji",
        contact: "17234567",
        postedDate: "2025-01-12",
        views: 32,
        status: "active",
        description: "Winter jacket, size L, barely worn.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='12' fill='%23d1fae5'/%3E%3Ctext x='40' y='45' text-anchor='middle' fill='%23065f46' font-family='Inter' font-size='10'%3EJacket%3C/text%3E%3C/svg%3E"
    },
    {
        id: 3,
        name: "Laptop",
        category: "Electronics",
        price: "Nu. 35,000",
        condition: "Good",
        seller: "Sonam Tshering",
        contact: "17345678",
        postedDate: "2025-01-15",
        views: 89,
        status: "active",
        description: "Dell laptop, 8GB RAM, 256GB SSD, used for 1 year.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='40' y='45' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='10'%3ELaptop%3C/text%3E%3C/svg%3E"
    },
    {
        id: 4,
        name: "Bike",
        category: "Sports",
        price: "Nu. 4,500",
        condition: "Fair",
        seller: "Tashi Namgay",
        contact: "17456789",
        postedDate: "2024-12-20",
        views: 15,
        status: "inactive",
        description: "Mountain bike, some wear and tear but functional.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='12' fill='%23ddd6fe'/%3E%3Ctext x='40' y='45' text-anchor='middle' fill='%235b21b6' font-family='Inter' font-size='10'%3EBike%3C/text%3E%3C/svg%3E"
    },
    {
        id: 5,
        name: "Desk",
        category: "Furniture",
        price: "Nu. 1,200",
        condition: "Good",
        seller: "Kinley Wangmo",
        contact: "17567890",
        postedDate: "2024-12-15",
        views: 8,
        status: "inactive",
        description: "Wooden desk with drawers, slightly scratched.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='12' fill='%23fed7d7'/%3E%3Ctext x='40' y='45' text-anchor='middle' fill='%23c53030' font-family='Inter' font-size='10'%3EDesk%3C/text%3E%3C/svg%3E"
    }
];

let allListings = [...sampleListings];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadListings();
});

// Load listings
function loadListings() {
    const activeListings = allListings.filter(l => l.status === 'active');
    const inactiveListings = allListings.filter(l => l.status === 'inactive');

    loadActiveListings(activeListings);
    loadInactiveListings(inactiveListings);
}

function loadActiveListings(listings) {
    const grid = document.getElementById('activeListingsGrid');
    
    if (listings.length === 0) {
        grid.innerHTML = `
            <div class="no-listings">
                <div class="no-listings-icon">📋</div>
                <h3>No active listings</h3>
                <p>There are currently no active listings.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = listings.map(listing => `
        <div class="listing-card" onclick="viewListing(${listing.id})">
            <img src="${listing.image}" alt="${listing.name}" class="listing-image">
            <div class="listing-info">
                <div class="listing-name">${listing.name}</div>
                <div class="listing-category">${listing.category}</div>
            </div>
            <div class="listing-details">
                <div class="listing-detail">
                    <span class="detail-label">Price</span>
                    <span class="detail-value">${listing.price}</span>
                </div>
                <div class="listing-detail">
                    <span class="detail-label">Views</span>
                    <span class="detail-value">${listing.views}</span>
                </div>
                <div class="listing-detail">
                    <span class="detail-label">Posted</span>
                    <span class="detail-value">${listing.postedDate}</span>
                </div>
                <div class="listing-detail">
                    <span class="detail-label">Condition</span>
                    <span class="detail-value">${listing.condition}</span>
                </div>
            </div>
            <div class="listing-status status-active">Active</div>
            <div class="listing-actions">
                <button class="action-btn btn-view" onclick="event.stopPropagation(); viewListing(${listing.id})">View Details</button>
            </div>
        </div>
    `).join('');
}

function loadInactiveListings(listings) {
    const grid = document.getElementById('inactiveListingsGrid');
    
    if (listings.length === 0) {
        grid.innerHTML = `
            <div class="no-listings">
                <div class="no-listings-icon">📋</div>
                <h3>No inactive listings</h3>
                <p>There are currently no inactive listings.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = listings.map(listing => `
        <div class="listing-card inactive" onclick="viewListing(${listing.id})">
            <img src="${listing.image}" alt="${listing.name}" class="listing-image">
            <div class="listing-info">
                <div class="listing-name">${listing.name}</div>
                <div class="listing-category">${listing.category}</div>
            </div>
            <div class="listing-details">
                <div class="listing-detail">
                    <span class="detail-label">Price</span>
                    <span class="detail-value">${listing.price}</span>
                </div>
                <div class="listing-detail">
                    <span class="detail-label">Views</span>
                    <span class="detail-value">${listing.views}</span>
                </div>
                <div class="listing-detail">
                    <span class="detail-label">Posted</span>
                    <span class="detail-value">${listing.postedDate}</span>
                </div>
                <div class="listing-detail">
                    <span class="detail-label">Condition</span>
                    <span class="detail-value">${listing.condition}</span>
                </div>
            </div>
            <div class="listing-status status-inactive">Inactive</div>
            <div class="listing-actions">
                <button class="action-btn btn-view" onclick="event.stopPropagation(); viewListing(${listing.id})">View Details</button>
            </div>
        </div>
    `).join('');
}

// View listing details
function viewListing(listingId) {
    const listing = sampleListings.find(l => l.id === listingId);
    if (!listing) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="listing-detail-grid">
            <img src="${listing.image}" alt="${listing.name}" class="listing-detail-image">
            <div class="listing-detail-info">
                <h3 style="color: var(--gray-800); margin-bottom: 1rem;">${listing.name}</h3>
                <div class="detail-row">
                    <span class="detail-label">Price:</span>
                    <strong style="color: var(--primary);">${listing.price}</strong>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Posted on:</span>
                    <span>${listing.postedDate}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Condition:</span>
                    <span>${listing.condition}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Category:</span>
                    <span>${listing.category}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Seller:</span>
                    <span>${listing.seller}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Contact:</span>
                    <span>${listing.contact}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Views:</span>
                    <span>${listing.views}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="listing-status status-${listing.status}">${listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}</span>
                </div>
            </div>
        </div>
        <div style="margin-top: 1rem;">
            <strong>Description:</strong>
            <p style="margin-top: 0.5rem; color: var(--gray-600); line-height: 1.6;">${listing.description}</p>
        </div>
        <div class="modal-actions">
            <button class="modal-btn btn-edit" onclick="editListing(${listing.id})">Edit Listing</button>
            ${listing.status === 'active' ? 
                `<button class="modal-btn btn-deactivate" onclick="toggleListingStatus(${listing.id})">Deactivate</button>` :
                `<button class="modal-btn btn-activate" onclick="toggleListingStatus(${listing.id})">Activate</button>`
            }
            <button class="modal-btn btn-delete" onclick="deleteListing(${listing.id})">Delete Listing</button>
        </div>
    `;

    document.getElementById('listingDetailModal').classList.add('show');
}

// Edit listing
function editListing(listingId) {
    alert('Edit listing functionality will be implemented for listing ID: ' + listingId);
}

// Toggle listing status
function toggleListingStatus(listingId) {
    const listing = sampleListings.find(l => l.id === listingId);
    if (!listing) return;

    const newStatus = listing.status === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'active' ? 'activate' : 'deactivate';

    if (confirm(`Are you sure you want to ${action} this listing?`)) {
        listing.status = newStatus;
        allListings = [...sampleListings];
        loadListings();
        closeModal();
        alert(`Listing ${action}d successfully!`);
    }
}

// Delete listing
function deleteListing(listingId) {
    const listing = sampleListings.find(l => l.id === listingId);
    if (!listing) return;

    if (confirm(`Are you sure you want to delete "${listing.name}"?\n\nThis action cannot be undone and will permanently remove this listing.`)) {
        const index = sampleListings.findIndex(l => l.id === listingId);
        if (index > -1) {
            sampleListings.splice(index, 1);
            allListings = [...sampleListings];
            loadListings();
            closeModal();
            alert('Listing deleted successfully!');
        }
    }
}

// Search functionality
function searchListings() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    allListings = sampleListings.filter(listing => 
        listing.name.toLowerCase().includes(searchTerm) ||
        listing.category.toLowerCase().includes(searchTerm) ||
        listing.seller.toLowerCase().includes(searchTerm)
    );
    loadListings();
}

// Close modal when clicking outside
document.getElementById('listingDetailModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});