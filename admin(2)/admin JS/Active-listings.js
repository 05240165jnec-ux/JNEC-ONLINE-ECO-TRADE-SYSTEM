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
            },
            {
                id: 6,
                name: "iPhone 12",
                category: "Electronics",
                price: "Nu. 25,000",
                condition: "Excellent",
                seller: "Dechen Wangmo",
                contact: "17678901",
                postedDate: "2025-01-05",
                views: 67,
                status: "active",
                description: "64GB, black color, with original box and accessories.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='40' y='45' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='10'%3EPhone%3C/text%3E%3C/svg%3E"
            },
            {
                id: 7,
                name: "Chair",
                category: "Furniture",
                price: "Nu. 800",
                condition: "Good",
                seller: "Lhamo Yangchen",
                contact: "17789012",
                postedDate: "2025-01-08",
                views: 23,
                status: "active",
                description: "Office chair with adjustable height and lumbar support.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='12' fill='%23fed7d7'/%3E%3Ctext x='40' y='45' text-anchor='middle' fill='%23c53030' font-family='Inter' font-size='10'%3EChair%3C/text%3E%3C/svg%3E"
            },
            {
                id: 8,
                name: "Novel Collection",
                category: "Books",
                price: "Nu. 350",
                condition: "Fair",
                seller: "Tshering Penjor",
                contact: "17890123",
                postedDate: "2024-12-25",
                views: 12,
                status: "inactive",
                description: "Collection of 5 popular novels in good reading condition.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='12' fill='%23fef3c7'/%3E%3Ctext x='40' y='45' text-anchor='middle' fill='%2392400e' font-family='Inter' font-size='10'%3ENovels%3C/text%3E%3C/svg%3E"
            },
            {
                id: 9,
                name: "Headphones",
                category: "Electronics",
                price: "Nu. 1,500",
                condition: "Excellent",
                seller: "Dorji Wangchuk",
                contact: "17901234",
                postedDate: "2025-01-03",
                views: 41,
                status: "active",
                description: "Wireless noise-cancelling headphones with charging case.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='12' fill='%23e2e8f0'/%3E%3Ctext x='40' y='45' text-anchor='middle' fill='%2364748b' font-family='Inter' font-size='10'%3EHeadphones%3C/text%3E%3C/svg%3E"
            },
            {
                id: 10,
                name: "Winter Boots",
                category: "Clothing",
                price: "Nu. 1,200",
                condition: "Good",
                seller: "Pema Lhamo",
                contact: "17012345",
                postedDate: "2024-12-28",
                views: 18,
                status: "inactive",
                description: "Waterproof winter boots, size 9, worn only a few times.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='12' fill='%23d1fae5'/%3E%3Ctext x='40' y='45' text-anchor='middle' fill='%23065f46' font-family='Inter' font-size='10'%3EBoots%3C/text%3E%3C/svg%3E"
            }
        ];

        let currentListings = [...sampleListings];
        let currentPage = 1;
        const listingsPerPage = 10;

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
        function searchListings() {
            const searchTerm = document.querySelector('.search-input').value.toLowerCase();
            
            if (searchTerm === '') {
                currentListings = [...sampleListings];
            } else {
                currentListings = sampleListings.filter(listing => 
                    listing.name.toLowerCase().includes(searchTerm) ||
                    listing.category.toLowerCase().includes(searchTerm) ||
                    listing.seller.toLowerCase().includes(searchTerm)
                );
            }
            
            currentPage = 1;
            loadListings();
        }

        // Filter function
        function filterListings() {
            const categoryFilter = document.querySelector('.filter-select:nth-child(1)').value;
            const statusFilter = document.querySelector('.filter-select:nth-child(2)').value;
            
            currentListings = sampleListings.filter(listing => {
                const categoryMatch = categoryFilter === 'all' || listing.category.toLowerCase() === categoryFilter;
                const statusMatch = statusFilter === 'all' || listing.status === statusFilter;
                return categoryMatch && statusMatch;
            });
            
            currentPage = 1;
            loadListings();
        }

        // Sort function
        function sortListings() {
            const sortBy = document.querySelector('.filter-select:nth-child(3)').value;
            
            currentListings.sort((a, b) => {
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
            
            loadListings();
        }

        // Pagination function
        function changePage(page) {
            if (page === -1 && currentPage > 1) {
                currentPage--;
            } else if (page === 1 && currentPage < Math.ceil(currentListings.length / listingsPerPage)) {
                currentPage++;
            } else if (page > 1) {
                currentPage = page;
            }
            
            loadListings();
            
            // Update pagination buttons
            const paginationBtns = document.querySelectorAll('.pagination-btn');
            paginationBtns.forEach(btn => btn.classList.remove('active'));
            paginationBtns[currentPage].classList.add('active');
        }

        // Close modal
        function closeModal() {
            document.getElementById('listingDetailModal').classList.remove('show');
        }

        // View listing details
        function viewListing(id) {
            const listing = sampleListings.find(listing => listing.id === id);
            if (!listing) return;
            
            const modalBody = document.getElementById('modalBody');
            modalBody.innerHTML = `
                <div class="item-detail-grid">
                    <img src="${listing.image}" alt="${listing.name}" class="item-detail-image">
                    <div class="item-detail-info">
                        <div class="detail-section">
                            <h3 class="detail-section-title">Listing Information</h3>
                            <div class="detail-row">
                                <span class="detail-label">Listing Name:</span>
                                <span class="detail-value">${listing.name}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Price:</span>
                                <span class="detail-value">${listing.price}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Category:</span>
                                <span class="detail-value">${listing.category}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Condition:</span>
                                <span class="detail-value">${listing.condition}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Views:</span>
                                <span class="detail-value">${listing.views}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Status:</span>
                                <span class="detail-value item-status status-${listing.status}">${listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}</span>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3 class="detail-section-title">Seller Information</h3>
                            <div class="detail-row">
                                <span class="detail-label">Seller Name:</span>
                                <span class="detail-value">${listing.seller}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Contact:</span>
                                <span class="detail-value">${listing.contact}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Posted Date:</span>
                                <span class="detail-value">${listing.postedDate}</span>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3 class="detail-section-title">Listing Description</h3>
                            <div class="detail-description">
                                <p class="description-text">${listing.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-btn btn-edit" onclick="editListing(${listing.id})">Edit</button>
                    ${listing.status === 'active' ? 
                        `<button class="modal-btn btn-deactivate" onclick="toggleListingStatus(${listing.id})">Deactivate</button>` :
                        `<button class="modal-btn btn-activate" onclick="toggleListingStatus(${listing.id})">Activate</button>`
                    }
                    <button class="modal-btn btn-delete" onclick="deleteListing(${listing.id})">Delete</button>
                </div>
            `;
            
            document.getElementById('listingDetailModal').classList.add('show');
        }

        // Edit listing
        function editListing(id) {
            alert(`Edit functionality for listing ID: ${id} would be implemented here.`);
        }

        // Toggle listing status
        function toggleListingStatus(id) {
            const listing = sampleListings.find(listing => listing.id === id);
            if (listing) {
                const newStatus = listing.status === 'active' ? 'inactive' : 'active';
                const action = newStatus === 'active' ? 'activate' : 'deactivate';
                
                if (confirm(`Are you sure you want to ${action} this listing?`)) {
                    listing.status = newStatus;
                    alert(`Listing "${listing.name}" has been ${action}d.`);
                    closeModal();
                    loadListings();
                }
            }
        }

        // Delete listing
        function deleteListing(id) {
            const listing = sampleListings.find(listing => listing.id === id);
            if (listing) {
                if (confirm(`Are you sure you want to delete "${listing.name}"?\n\nThis action cannot be undone and will permanently remove this listing.`)) {
                    const index = sampleListings.findIndex(listing => listing.id === id);
                    if (index > -1) {
                        sampleListings.splice(index, 1);
                        currentListings = [...sampleListings];
                        alert(`Listing "${listing.name}" has been deleted.`);
                        closeModal();
                        loadListings();
                    }
                }
            }
        }

        // Load listings with new card design
        function loadListings() {
            const activeListingsGrid = document.getElementById('activeListingsGrid');
            const inactiveListingsGrid = document.getElementById('inactiveListingsGrid');
            
            const activeListings = currentListings.filter(listing => listing.status === 'active');
            const inactiveListings = currentListings.filter(listing => listing.status === 'inactive');
            
            const startIndex = (currentPage - 1) * listingsPerPage;
            const endIndex = startIndex + listingsPerPage;
            const activeToShow = activeListings.slice(startIndex, endIndex);
            const inactiveToShow = inactiveListings.slice(startIndex, endIndex);

            // Load active listings
            if (activeToShow.length === 0) {
                activeListingsGrid.innerHTML = `
                    <div class="no-items" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">📦</div>
                        <h3 style="color: var(--text-color); margin-bottom: 0.5rem;">No active listings found</h3>
                        <p style="color: var(--light-text);">Try adjusting your search or filter criteria.</p>
                    </div>
                `;
            } else {
                activeListingsGrid.innerHTML = activeToShow.map(listing => `
                    <div class="item-card" data-id="${listing.id}">
                        <img src="${listing.image}" alt="${listing.name}" class="item-image">
                        <div class="item-info">
                            <div class="item-name">${listing.name}</div>
                            <div class="item-category">${listing.category}</div>
                            <div class="item-status status-active">
                                Active
                            </div>
                        </div>
                        <div class="item-actions">
                            <button class="action-btn btn-view" onclick="viewListing(${listing.id})">View Details</button>
                        </div>
                    </div>
                `).join('');
            }

            // Load inactive listings
            if (inactiveToShow.length === 0) {
                inactiveListingsGrid.innerHTML = `
                    <div class="no-items" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">📦</div>
                        <h3 style="color: var(--text-color); margin-bottom: 0.5rem;">No inactive listings found</h3>
                        <p style="color: var(--light-text);">Try adjusting your search or filter criteria.</p>
                    </div>
                `;
            } else {
                inactiveListingsGrid.innerHTML = inactiveToShow.map(listing => `
                    <div class="item-card" data-id="${listing.id}">
                        <img src="${listing.image}" alt="${listing.name}" class="item-image">
                        <div class="item-info">
                            <div class="item-name">${listing.name}</div>
                            <div class="item-category">${listing.category}</div>
                            <div class="item-status status-inactive">
                                Inactive
                            </div>
                        </div>
                        <div class="item-actions">
                            <button class="action-btn btn-view" onclick="viewListing(${listing.id})">View Details</button>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Close modal when clicking outside
        document.getElementById('listingDetailModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            loadListings();
            
            // Set "All Categories" and "All Status" as defaults
            const categoryFilter = document.querySelector('.filter-select:nth-child(1)');
            categoryFilter.value = 'all';
            
            const statusFilter = document.querySelector('.filter-select:nth-child(2)');
            statusFilter.value = 'all';
        });