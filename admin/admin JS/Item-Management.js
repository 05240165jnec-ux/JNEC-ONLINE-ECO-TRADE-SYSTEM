// Item-Management.js

// Navigation back to home
function goBackToHome() {
    window.location.href = 'home.html';
}

// Navigation function for sidebar items
function navigateToSection(section) {
    switch(section) {
        case 'items':
            // Already on items page
            break;
        case 'listings':
            window.location.href = 'Active-listings.html';
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
    if (section !== 'items') {
        navigateToSection(section);
    }
}

// Your existing item management functions...
function searchItems() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    console.log('Searching for:', searchTerm);
    // Implement your search logic here
}

function filterItems() {
    console.log('Filtering items...');
    // Implement your filter logic here
}

function sortItems() {
    console.log('Sorting items...');
    // Implement your sort logic here
}

function changePage(page) {
    console.log('Changing to page:', page);
    // Implement your pagination logic here
}

function closeModal() {
    document.getElementById('itemDetailModal').classList.remove('show');
}

// Load sample items when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadItems();
});

// Your existing item management code continues...
const sampleItems = [
    {
        id: 1,
        name: "HP Laptop 15",
        category: "Electronics",
        price: "Nu. 27,000",
        condition: "Good",
        seller: "Uygen Namgyel",
        contact: "17789821",
        postedDate: "2024-04-24",
        status: "pending",
        description: "6 inch laptop in good condition, used for 2 years.",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='40' y='45' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='10'%3ELaptop%3C/text%3E%3C/svg%3E"
    },
    // ... rest of your sample items array
];

let currentItems = [...sampleItems];
let currentPage = 1;
const itemsPerPage = 6;
let editMode = false;

function loadItems() {
    const itemsGrid = document.getElementById('itemsGrid');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = currentItems.slice(startIndex, endIndex);

    if (itemsToShow.length === 0) {
        itemsGrid.innerHTML = `
            <div class="no-items">
                <div class="no-items-icon">📦</div>
                <h3>No items found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    itemsGrid.innerHTML = itemsToShow.map(item => `
        <div class="item-card" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-category">${item.category}</div>
            </div>
            <div class="item-details">
                <div class="item-detail">
                    <span class="detail-label">Price</span>
                    <span class="detail-value">${item.price}</span>
                </div>
                <div class="item-detail">
                    <span class="detail-label">Condition</span>
                    <span class="detail-value">${item.condition}</span>
                </div>
                <div class="item-detail">
                    <span class="detail-label">Posted</span>
                    <span class="detail-value">${item.postedDate}</span>
                </div>
                <div class="item-detail">
                    <span class="detail-label">Contact</span>
                    <span class="detail-value">${item.contact}</span>
                </div>
            </div>
            <div class="item-status status-${item.status}">
                ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </div>
            <div class="item-actions">
                <button class="action-btn btn-view" onclick="viewItem(${item.id})">View Details</button>
            </div>
        </div>
    `).join('');
}

// ... rest of your existing item management functions (viewItem, editItem, saveItem, etc.)