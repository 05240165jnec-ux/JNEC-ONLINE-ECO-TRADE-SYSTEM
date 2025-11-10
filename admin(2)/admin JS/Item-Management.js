// Sample data with ALL required fields
        const sampleItems = [
            {
                id: 1,
                name: "HP Laptop 15",
                category: "Electronics",
                price: "Nu. 27,000",
                condition: "Good",
                location: "JNEC Hostel A",
                contactPreference: "Contact Number: 17789821",
                seller: "Uygen Namgyel",
                postedDate: "2024-04-24",
                status: "approved",
                description: "6 inch laptop in good condition, used for 2 years. Comes with original charger and carrying case.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='100' y='110' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='16' font-weight='600'%3ELaptop%3C/text%3E%3C/svg%3E"
            },
            {
                id: 2,
                name: "Wooden Desk",
                category: "Furniture",
                price: "Nu. 5,500",
                condition: "Excellent",
                location: "JNEC Hostel B",
                contactPreference: "WhatsApp: 17893456",
                seller: "Karma Wangchuk",
                postedDate: "2024-04-22",
                status: "approved",
                description: "Solid wood desk, barely used. Perfect for home office or study room.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='100' y='110' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='16' font-weight='600'%3EDesk%3C/text%3E%3C/svg%3E"
            },
            {
                id: 3,
                name: "Textbooks Set",
                category: "Books",
                price: "Nu. 1,200",
                condition: "Fair",
                location: "JNEC Hostel C",
                contactPreference: "Telegram: 17654321",
                seller: "Sonam Dorji",
                postedDate: "2024-04-20",
                status: "rejected",
                description: "Complete set of engineering textbooks from first to final year.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='100' y='110' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='16' font-weight='600'%3EBooks%3C/text%3E%3C/svg%3E"
            },
            {
                id: 4,
                name: "iPhone 12",
                category: "Electronics",
                price: "Nu. 35,000",
                condition: "Good",
                location: "JNEC Hostel D",
                contactPreference: "Facebook Messenger",
                seller: "Pema Lhamo",
                postedDate: "2024-04-18",
                status: "approved",
                description: "64GB, black color, with original box and accessories. Screen protector installed.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='100' y='110' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='16' font-weight='600'%3EPhone%3C/text%3E%3C/svg%3E"
            },
            {
                id: 5,
                name: "Office Chair",
                category: "Furniture",
                price: "Nu. 3,500",
                condition: "Excellent",
                location: "JNEC Hostel E",
                contactPreference: "Contact Number: 17543210",
                seller: "Tashi Dema",
                postedDate: "2024-04-15",
                status: "approved",
                description: "Ergonomic office chair with lumbar support and adjustable height.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='100' y='110' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='16' font-weight='600'%3EChair%3C/text%3E%3C/svg%3E"
            },
            {
                id: 6,
                name: "Winter Jacket",
                category: "Clothing",
                price: "Nu. 2,500",
                condition: "Good",
                location: "JNEC Hostel F",
                contactPreference: "WhatsApp: 17456789",
                seller: "Dechen Wangmo",
                postedDate: "2024-04-12",
                status: "approved",
                description: "Warm winter jacket, size M. Perfect for cold weather conditions.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='100' y='110' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='16' font-weight='600'%3EClothing%3C/text%3E%3C/svg%3E"
            },
            {
                id: 7,
                name: "Gaming Mouse",
                category: "Electronics",
                price: "Nu. 1,200",
                condition: "Excellent",
                location: "JNEC Hostel G",
                contactPreference: "Telegram: 17345678",
                seller: "Kinzang Dorji",
                postedDate: "2024-04-10",
                status: "approved",
                description: "RGB gaming mouse with adjustable DPI and programmable buttons.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='100' y='110' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='14' font-weight='600'%3EGaming Mouse%3C/text%3E%3C/svg%3E"
            },
            {
                id: 8,
                name: "Study Table",
                category: "Furniture",
                price: "Nu. 4,500",
                condition: "Good",
                location: "JNEC Hostel H",
                contactPreference: "Contact Number: 17234567",
                seller: "Lhamo Yangchen",
                postedDate: "2024-04-08",
                status: "approved",
                description: "Study table with built-in shelves and drawer. Perfect for students.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='100' y='110' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='14' font-weight='600'%3EStudy Table%3C/text%3E%3C/svg%3E"
            },
            {
                id: 9,
                name: "Novel Collection",
                category: "Books",
                price: "Nu. 800",
                condition: "Fair",
                location: "JNEC Hostel I",
                contactPreference: "Facebook Messenger",
                seller: "Tshering Penjor",
                postedDate: "2024-04-05",
                status: "rejected",
                description: "Collection of 10 popular novels in good reading condition.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='100' y='110' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='14' font-weight='600'%3ENovels%3C/text%3E%3C/svg%3E"
            },
            {
                id: 10,
                name: "Wireless Headphones",
                category: "Electronics",
                price: "Nu. 3,500",
                condition: "Excellent",
                location: "JNEC Hostel J",
                contactPreference: "WhatsApp: 17012345",
                seller: "Dorji Wangchuk",
                postedDate: "2024-04-01",
                status: "approved",
                description: "Noise-cancelling wireless headphones with charging case.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='100' y='110' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='12' font-weight='600'%3EHeadphones%3C/text%3E%3C/svg%3E"
            }
        ];

        let currentItems = [...sampleItems];
        let currentPage = 1;
        const itemsPerPage = 10;

        // Navigation back to home - FUNCTIONAL
        function goBackToHome() {
            window.location.href = 'home.html';
        }

        // Navigation function for sidebar items - FUNCTIONAL
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
        function searchItems() {
            const searchTerm = document.querySelector('.search-input').value.toLowerCase();
            
            if (searchTerm === '') {
                currentItems = [...sampleItems];
            } else {
                currentItems = sampleItems.filter(item => 
                    item.name.toLowerCase().includes(searchTerm) ||
                    item.category.toLowerCase().includes(searchTerm) ||
                    item.seller.toLowerCase().includes(searchTerm)
                );
            }
            
            currentPage = 1;
            loadItems();
        }

        // Filter function
        function filterItems() {
            const categoryFilter = document.querySelector('.filter-select:nth-child(1)').value;
            const statusFilter = document.querySelector('.filter-select:nth-child(2)').value;
            
            currentItems = sampleItems.filter(item => {
                const categoryMatch = categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter;
                const statusMatch = !statusFilter || item.status === statusFilter;
                return categoryMatch && statusMatch;
            });
            
            currentPage = 1;
            loadItems();
        }

        // Sort function
        function sortItems() {
            const sortBy = document.querySelector('.filter-select:nth-child(3)').value;
            
            currentItems.sort((a, b) => {
                switch(sortBy) {
                    case 'newest':
                        return new Date(b.postedDate) - new Date(a.postedDate);
                    case 'oldest':
                        return new Date(a.postedDate) - new Date(b.postedDate);
                    case 'price-low':
                        return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
                    case 'price-high':
                        return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
                    case 'name':
                        return a.name.localeCompare(b.name);
                    default:
                        return 0;
                }
            });
            
            loadItems();
        }

        // Pagination function
        function changePage(page) {
            if (page === -1 && currentPage > 1) {
                currentPage--;
            } else if (page === 1 && currentPage < Math.ceil(currentItems.length / itemsPerPage)) {
                currentPage++;
            } else if (page > 1) {
                currentPage = page;
            }
            
            loadItems();
            
            // Update pagination buttons
            const paginationBtns = document.querySelectorAll('.pagination-btn');
            paginationBtns.forEach(btn => btn.classList.remove('active'));
            paginationBtns[currentPage].classList.add('active');
        }

        // Close modal
        function closeModal() {
            document.getElementById('itemDetailModal').classList.remove('show');
        }

        // Enhanced View item details function with ALL requested fields
        function viewItem(id) {
            const item = sampleItems.find(item => item.id === id);
            if (!item) return;
            
            const modalBody = document.getElementById('modalBody');
            modalBody.innerHTML = `
                <div class="item-detail-grid">
                    <img src="${item.image}" alt="${item.name}" class="item-detail-image">
                    <div class="item-detail-info">
                        <div class="detail-section">
                            <h3 class="detail-section-title">Item Information</h3>
                            <div class="detail-row">
                                <span class="detail-label">Item Name:</span>
                                <span class="detail-value">${item.name}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Price:</span>
                                <span class="detail-value">${item.price}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Category:</span>
                                <span class="detail-value">${item.category}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Condition:</span>
                                <span class="detail-value">${item.condition}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Location:</span>
                                <span class="detail-value">${item.location}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Contact Preference:</span>
                                <span class="detail-value">${item.contactPreference}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Status:</span>
                                <span class="detail-value item-status status-${item.status}">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3 class="detail-section-title">Seller Information</h3>
                            <div class="detail-row">
                                <span class="detail-label">Seller Name:</span>
                                <span class="detail-value">${item.seller}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Posted Date:</span>
                                <span class="detail-value">${item.postedDate}</span>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3 class="detail-section-title">Item Description</h3>
                            <div class="detail-description">
                                <p class="description-text">${item.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-btn btn-approve" onclick="approveItem(${item.id})">Approve</button>
                    <button class="modal-btn btn-reject" onclick="rejectItem(${item.id})">Reject</button>
                    <button class="modal-btn btn-edit" onclick="editItem(${item.id})">Edit</button>
                </div>
            `;
            
            document.getElementById('itemDetailModal').classList.add('show');
        }

        // Approve item
        function approveItem(id) {
            const item = sampleItems.find(item => item.id === id);
            if (item) {
                item.status = 'approved';
                alert(`Item "${item.name}" has been approved.`);
                closeModal();
                loadItems();
            }
        }

        // Reject item
        function rejectItem(id) {
            const item = sampleItems.find(item => item.id === id);
            if (item) {
                item.status = 'rejected';
                alert(`Item "${item.name}" has been rejected.`);
                closeModal();
                loadItems();
            }
        }

        // Edit item
        function editItem(id) {
            alert(`Edit functionality for item ID: ${id} would be implemented here.`);
        }

        // Load items with new card design - INCLUDES VIEW DETAILS BUTTON FOR EVERY CARD
        function loadItems() {
            const itemsGrid = document.getElementById('itemsGrid');
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const itemsToShow = currentItems.slice(startIndex, endIndex);

            if (itemsToShow.length === 0) {
                itemsGrid.innerHTML = `
                    <div class="no-items" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">📦</div>
                        <h3 style="color: var(--text-color); margin-bottom: 0.5rem;">No items found</h3>
                        <p style="color: var(--light-text);">Try adjusting your search or filter criteria.</p>
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
                        <div class="item-status status-${item.status}">
                            ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </div>
                    </div>
                    <div class="item-actions">
                        <button class="action-btn btn-view" onclick="viewItem(${item.id})">View Details</button>
                    </div>
                </div>
            `).join('');
        }

        // Close modal when clicking outside
        document.getElementById('itemDetailModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            loadItems();
            
            // Set "All Categories" and "Approved" as defaults
            const categoryFilter = document.querySelector('.filter-select:nth-child(1)');
            categoryFilter.value = 'all';
            
            const statusFilter = document.querySelector('.filter-select:nth-child(2)');
            statusFilter.value = 'approved';
        });