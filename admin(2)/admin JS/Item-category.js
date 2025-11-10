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
            },
            {
                id: 6,
                name: "Kitchen Items",
                description: "Cookware, utensils, and kitchen appliances",
                icon: "🍳",
                itemCount: 22,
                activeListings: 15,
                createdDate: "2024-02-01",
                status: "active"
            },
            {
                id: 7,
                name: "Art Supplies",
                description: "Paints, brushes, canvases and other art materials",
                icon: "🎨",
                itemCount: 18,
                activeListings: 12,
                createdDate: "2024-01-25",
                status: "active"
            },
            {
                id: 8,
                name: "Tools",
                description: "Hand tools, power tools, and workshop equipment",
                icon: "🔧",
                itemCount: 14,
                activeListings: 9,
                createdDate: "2023-12-28",
                status: "inactive"
            }
        ];

        let allCategories = [...sampleCategories];

        // Navigation back to home - FUNCTIONAL
        function goBackToHome() {
            window.location.href = 'home.html';
        }

        // Navigation function for sidebar items - FUNCTIONAL
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

        // Notification functionality
        function toggleNotificationPopup() {
            const popup = document.getElementById('notificationPopup');
            popup.classList.toggle('show');
        }

        // Close notification popup when clicking outside
        document.addEventListener('click', function(event) {
            const popup = document.getElementById('notificationPopup');
            const notificationIcon = document.querySelector('.notification-icon');
            
            if (!notificationIcon.contains(event.target) && !popup.contains(event.target)) {
                popup.classList.remove('show');
            }
        });

        // Search function
        function searchCategories() {
            const searchTerm = document.querySelector('.search-input').value.toLowerCase();
            
            if (searchTerm === '') {
                allCategories = [...sampleCategories];
            } else {
                allCategories = sampleCategories.filter(category => 
                    category.name.toLowerCase().includes(searchTerm) ||
                    category.description.toLowerCase().includes(searchTerm)
                );
            }
            
            loadCategories();
        }

        // Close modal
        function closeModal() {
            document.getElementById('categoryDetailModal').classList.remove('show');
        }

        function closeAddCategoryModal() {
            document.getElementById('addCategoryModal').classList.remove('show');
            document.getElementById('addCategoryForm').reset();
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            loadCategories();
            updateStats();
        });

        // Load categories with new card design
        function loadCategories() {
            const activeCategoriesGrid = document.getElementById('activeCategoriesGrid');
            const inactiveCategoriesGrid = document.getElementById('inactiveCategoriesGrid');
            
            const activeCategories = allCategories.filter(category => category.status === 'active');
            const inactiveCategories = allCategories.filter(category => category.status === 'inactive');

            // Load active categories
            if (activeCategories.length === 0) {
                activeCategoriesGrid.innerHTML = `
                    <div class="no-items" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">📂</div>
                        <h3 style="color: var(--text-color); margin-bottom: 0.5rem;">No active categories found</h3>
                        <p style="color: var(--light-text);">Try adjusting your search criteria.</p>
                    </div>
                `;
            } else {
                activeCategoriesGrid.innerHTML = activeCategories.map(category => `
                    <div class="item-card" data-id="${category.id}">
                        <div class="item-icon" style="background: ${getCategoryColor(category.id)}; color: white;">
                            ${category.icon}
                        </div>
                        <div class="item-info">
                            <div class="item-name">${category.name}</div>
                            <div class="item-description">${category.description}</div>
                            <div class="item-details">
                                <div class="item-detail">
                                    <span class="detail-label">Items</span>
                                    <span class="detail-value">${category.itemCount}</span>
                                </div>
                                <div class="item-detail">
                                    <span class="detail-label">Active</span>
                                    <span class="detail-value">${category.activeListings}</span>
                                </div>
                            </div>
                            <div class="item-status status-active">
                                Active
                            </div>
                        </div>
                        <div class="item-actions">
                            <button class="action-btn btn-view" onclick="viewCategory(${category.id})">View Details</button>
                        </div>
                    </div>
                `).join('');
            }

            // Load inactive categories
            if (inactiveCategories.length === 0) {
                inactiveCategoriesGrid.innerHTML = `
                    <div class="no-items" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">📂</div>
                        <h3 style="color: var(--text-color); margin-bottom: 0.5rem;">No inactive categories found</h3>
                        <p style="color: var(--light-text);">Try adjusting your search criteria.</p>
                    </div>
                `;
            } else {
                inactiveCategoriesGrid.innerHTML = inactiveCategories.map(category => `
                    <div class="item-card" data-id="${category.id}">
                        <div class="item-icon" style="background: ${getCategoryColor(category.id)}; color: white;">
                            ${category.icon}
                        </div>
                        <div class="item-info">
                            <div class="item-name">${category.name}</div>
                            <div class="item-description">${category.description}</div>
                            <div class="item-details">
                                <div class="item-detail">
                                    <span class="detail-label">Items</span>
                                    <span class="detail-value">${category.itemCount}</span>
                                </div>
                                <div class="item-detail">
                                    <span class="detail-label">Active</span>
                                    <span class="detail-value">${category.activeListings}</span>
                                </div>
                            </div>
                            <div class="item-status status-inactive">
                                Inactive
                            </div>
                        </div>
                        <div class="item-actions">
                            <button class="action-btn btn-view" onclick="viewCategory(${category.id})">View Details</button>
                        </div>
                    </div>
                `).join('');
            }
            
            updateStats();
        }

        // View category details
        function viewCategory(categoryId) {
            const category = allCategories.find(c => c.id === categoryId);
            if (!category) return;

            const modalBody = document.getElementById('modalBody');
            modalBody.innerHTML = `
                <div class="item-detail-grid">
                    <div class="category-detail-icon" style="background: ${getCategoryColor(category.id)}; color: white;">
                        ${category.icon}
                    </div>
                    <div class="item-detail-info">
                        <div class="detail-section">
                            <h3 class="detail-section-title">Category Information</h3>
                            <div class="detail-row">
                                <span class="detail-label">Category Name:</span>
                                <span class="detail-value">${category.name}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Total Items:</span>
                                <span class="detail-value">${category.itemCount}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Active Listings:</span>
                                <span class="detail-value">${category.activeListings}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Created Date:</span>
                                <span class="detail-value">${category.createdDate}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Status:</span>
                                <span class="detail-value item-status status-${category.status}">${category.status.charAt(0).toUpperCase() + category.status.slice(1)}</span>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3 class="detail-section-title">Category Description</h3>
                            <div class="detail-description">
                                <p class="description-text">${category.description}</p>
                            </div>
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
            alert(`Edit functionality for category ID: ${categoryId} would be implemented here.`);
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
                alert(`Category "${category.name}" has been ${action}d.`);
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
                '#2d6a4f', // primary green
                '#52796f', // secondary green
                '#52b788', // success green
                '#f77f00', // warning orange
                '#e63946', // danger red
                '#40916c', // hover green
                '#74c69d', // accent green
                '#1b4332'  // dark green
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