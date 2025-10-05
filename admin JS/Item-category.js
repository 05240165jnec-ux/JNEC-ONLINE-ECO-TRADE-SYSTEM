// Item-category.js

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
            window.location.href = 'Active-listings.html';
            break;
        case 'category':
            // Already on category page
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
    if (section !== 'category') {
        navigateToSection(section);
    }
}

// Your existing category management functions...
function searchCategories() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    console.log('Searching for:', searchTerm);
    // Your search logic here
}

function closeModal() {
    document.getElementById('categoryDetailModal').classList.remove('show');
}

function closeAddCategoryModal() {
    document.getElementById('addCategoryModal').classList.remove('show');
    document.getElementById('addCategoryForm').reset();
}

// Sample data
const sampleCategories = [
    {
        id: 1,
        name: "Books",
        description: "Textbooks, novels, and other reading materials",
        icon: "📚",
        itemCount: 45,
        activeListings: 32,
        createdDate: "2024-01-10",
        status: "active"
    },
    {
        id: 2,
        name: "Electronics",
        description: "Laptops, phones, accessories and other electronic devices",
        icon: "💻",
        itemCount: 28,
        activeListings: 18,
        createdDate: "2024-01-15",
        status: "active"
    },
    {
        id: 3,
        name: "Clothing",
        description: "Jackets, shirts, pants and other clothing items",
        icon: "👕",
        itemCount: 36,
        activeListings: 24,
        createdDate: "2024-01-20",
        status: "active"
    },
    {
        id: 4,
        name: "Sports Equipment",
        description: "Bikes, balls, and other sports gear",
        icon: "⚽",
        itemCount: 15,
        activeListings: 8,
        createdDate: "2023-12-15",
        status: "inactive"
    },
    {
        id: 5,
        name: "Furniture",
        description: "Desks, chairs, and other furniture items",
        icon: "🛋️",
        itemCount: 12,
        activeListings: 5,
        createdDate: "2023-11-20",
        status: "inactive"
    }
];

let allCategories = [...sampleCategories];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    updateStats();
});

// Load categories
function loadCategories() {
    const activeCategories = allCategories.filter(c => c.status === 'active');
    const inactiveCategories = allCategories.filter(c => c.status === 'inactive');

    loadActiveCategories(activeCategories);
    loadInactiveCategories(inactiveCategories);
    updateStats();
}

function loadActiveCategories(categories) {
    const grid = document.getElementById('activeCategoriesGrid');
    
    if (categories.length === 0) {
        grid.innerHTML = `
            <div class="no-categories">
                <div class="no-categories-icon">📂</div>
                <h3>No active categories</h3>
                <p>There are currently no active categories.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = categories.map(category => `
        <div class="category-card" onclick="viewCategory(${category.id})">
            <div class="category-icon" style="background: ${getCategoryColor(category.id)}; color: white;">
                ${category.icon}
            </div>
            <div class="category-info">
                <div class="category-name">${category.name}</div>
                <div class="category-description">${category.description}</div>
            </div>
            <div class="category-details">
                <div class="category-detail">
                    <span class="detail-label">Items</span>
                    <span class="detail-value">${category.itemCount}</span>
                </div>
                <div class="category-detail">
                    <span class="detail-label">Active</span>
                    <span class="detail-value">${category.activeListings}</span>
                </div>
                <div class="category-detail">
                    <span class="detail-label">Created</span>
                    <span class="detail-value">${category.createdDate}</span>
                </div>
            </div>
            <div class="category-status status-active">Active</div>
            <div class="category-actions">
                <button class="action-btn btn-view" onclick="event.stopPropagation(); viewCategory(${category.id})">View Details</button>
            </div>
        </div>
    `).join('');
}

function loadInactiveCategories(categories) {
    const grid = document.getElementById('inactiveCategoriesGrid');
    
    if (categories.length === 0) {
        grid.innerHTML = `
            <div class="no-categories">
                <div class="no-categories-icon">📂</div>
                <h3>No inactive categories</h3>
                <p>There are currently no inactive categories.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = categories.map(category => `
        <div class="category-card inactive" onclick="viewCategory(${category.id})">
            <div class="category-icon" style="background: ${getCategoryColor(category.id)}; color: white;">
                ${category.icon}
            </div>
            <div class="category-info">
                <div class="category-name">${category.name}</div>
                <div class="category-description">${category.description}</div>
            </div>
            <div class="category-details">
                <div class="category-detail">
                    <span class="detail-label">Items</span>
                    <span class="detail-value">${category.itemCount}</span>
                </div>
                <div class="category-detail">
                    <span class="detail-label">Active</span>
                    <span class="detail-value">${category.activeListings}</span>
                </div>
                <div class="category-detail">
                    <span class="detail-label">Created</span>
                    <span class="detail-value">${category.createdDate}</span>
                </div>
            </div>
            <div class="category-status status-inactive">Inactive</div>
            <div class="category-actions">
                <button class="action-btn btn-view" onclick="event.stopPropagation(); viewCategory(${category.id})">View Details</button>
            </div>
        </div>
    `).join('');
}

// View category details
function viewCategory(categoryId) {
    const category = allCategories.find(c => c.id === categoryId);
    if (!category) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="category-detail-grid">
            <div class="category-detail-icon" style="background: ${getCategoryColor(category.id)}; color: white;">
                ${category.icon}
            </div>
            <div class="category-detail-info">
                <h3 style="color: var(--gray-800); margin-bottom: 1rem;">${category.name}</h3>
                <div class="detail-row">
                    <span class="detail-label">Description:</span>
                    <span>${category.description}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Items:</span>
                    <strong style="color: var(--primary);">${category.itemCount}</strong>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Active Listings:</span>
                    <span>${category.activeListings}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Created Date:</span>
                    <span>${category.createdDate}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="category-status status-${category.status}">${category.status.charAt(0).toUpperCase() + category.status.slice(1)}</span>
                </div>
            </div>
        </div>
        <div class="modal-actions">
            <button class="modal-btn btn-edit" onclick="editCategory(${category.id})">Edit Category</button>
            ${category.status === 'active' ? 
                `<button class="modal-btn btn-deactivate" onclick="toggleCategoryStatus(${category.id})">Deactivate</button>` :
                `<button class="modal-btn btn-activate" onclick="toggleCategoryStatus(${category.id})">Activate</button>`
            }
            <button class="modal-btn btn-delete" onclick="deleteCategory(${category.id})">Delete Category</button>
        </div>
    `;

    document.getElementById('categoryDetailModal').classList.add('show');
}

// Edit category
function editCategory(categoryId) {
    alert('Edit category functionality will be implemented for category ID: ' + categoryId);
}

// Toggle category status
function toggleCategoryStatus(categoryId) {
    const category = allCategories.find(c => c.id === categoryId);
    if (!category) return;

    const newStatus = category.status === 'active' ? 'inactive' : 'active';
    const action = newStatus === 'active' ? 'activate' : 'deactivate';

    if (confirm(`Are you sure you want to ${action} this category?`)) {
        category.status = newStatus;
        allCategories = [...allCategories];
        loadCategories();
        closeModal();
        alert(`Category ${action}d successfully!`);
    }
}

// Delete category
function deleteCategory(categoryId) {
    const category = allCategories.find(c => c.id === categoryId);
    if (!category) return;

    if (confirm(`Are you sure you want to delete "${category.name}"?\n\nThis action cannot be undone and will permanently remove this category.`)) {
        const index = allCategories.findIndex(c => c.id === categoryId);
        if (index > -1) {
            allCategories.splice(index, 1);
            loadCategories();
            closeModal();
            alert('Category deleted successfully!');
        }
    }
}

// Search functionality
function searchCategories() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    const filteredCategories = sampleCategories.filter(category => 
        category.name.toLowerCase().includes(searchTerm) ||
        category.description.toLowerCase().includes(searchTerm)
    );
    
    const activeCategories = filteredCategories.filter(c => c.status === 'active');
    const inactiveCategories = filteredCategories.filter(c => c.status === 'inactive');

    loadActiveCategories(activeCategories);
    loadInactiveCategories(inactiveCategories);
}

// Update statistics
function updateStats() {
    const activeCategories = allCategories.filter(c => c.status === 'active');
    const totalItems = allCategories.reduce((sum, category) => sum + category.itemCount, 0);
    
    document.getElementById('activeCategoriesCount').textContent = activeCategories.length;
    document.getElementById('totalItemsCount').textContent = totalItems;
}

// Get category color based on ID
function getCategoryColor(id) {
    const colors = [
        '#f59e0b', // amber
        '#10b981', // emerald
        '#3b82f6', // blue
        '#8b5cf6', // violet
        '#ef4444', // red
        '#06b6d4', // cyan
        '#f97316', // orange
        '#84cc16'  // lime
    ];
    return colors[id % colors.length];
}

// Add new category modal
function openAddCategoryModal() {
    document.getElementById('addCategoryModal').classList.add('show');
}

function addNewCategory(event) {
    event.preventDefault();
    
    const name = document.getElementById('categoryName').value;
    const description = document.getElementById('categoryDescription').value;
    const icon = document.getElementById('categoryIcon').value;
    
    const newCategory = {
        id: Math.max(...allCategories.map(c => c.id)) + 1,
        name: name,
        description: description,
        icon: icon,
        itemCount: 0,
        activeListings: 0,
        createdDate: new Date().toISOString().split('T')[0],
        status: 'active'
    };
    
    allCategories.push(newCategory);
    loadCategories();
    closeAddCategoryModal();
    alert('Category added successfully!');
}

// Close modal when clicking outside
document.getElementById('categoryDetailModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

document.getElementById('addCategoryModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAddCategoryModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeAddCategoryModal();
    }
});