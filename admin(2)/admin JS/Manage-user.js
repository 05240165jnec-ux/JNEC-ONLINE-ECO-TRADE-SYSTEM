  // Sample data
        const sampleUsers = [
            {
                id: 1,
                name: "Ugyen",
                email: "ugyen@example.com",
                phone: "+975 17123456",
                role: "Buyer",
                type: "buyer",
                joinDate: "2024-01-10",
                listings: 0,
                purchases: 12,
                status: "active",
                avatarColor: "#f77f00"
            },
            {
                id: 2,
                name: "Rabten",
                email: "rabten@example.com",
                phone: "+975 17234567",
                role: "Seller",
                type: "seller",
                joinDate: "2024-01-15",
                listings: 8,
                purchases: 3,
                status: "active",
                avatarColor: "#52b788"
            },
            {
                id: 3,
                name: "Dogi Wangdi",
                email: "dogi@example.com",
                phone: "+975 17345678",
                role: "Buyer",
                type: "buyer",
                joinDate: "2024-01-20",
                listings: 0,
                purchases: 7,
                status: "active",
                avatarColor: "#2d6a4f"
            },
            {
                id: 4,
                name: "Yeshi Dekar",
                email: "yeshi@example.com",
                phone: "+975 17456789",
                role: "Seller",
                type: "seller",
                joinDate: "2024-02-05",
                listings: 15,
                purchases: 2,
                status: "active",
                avatarColor: "#52796f"
            },
            {
                id: 5,
                name: "Sonam Yoshi",
                email: "sonam@example.com",
                phone: "+975 17567890",
                role: "Buyer",
                type: "buyer",
                joinDate: "2024-02-10",
                listings: 0,
                purchases: 5,
                status: "inactive",
                avatarColor: "#e63946"
            },
            {
                id: 6,
                name: "Yoesel Dema",
                email: "yoesel@example.com",
                phone: "+975 17678901",
                role: "Seller",
                type: "seller",
                joinDate: "2024-02-15",
                listings: 22,
                purchases: 0,
                status: "active",
                avatarColor: "#74c69d"
            },
            {
                id: 7,
                name: "Karma Wangchuk",
                email: "karma@example.com",
                phone: "+975 17789012",
                role: "Buyer & Seller",
                type: "both",
                joinDate: "2023-12-20",
                listings: 6,
                purchases: 9,
                status: "active",
                avatarColor: "#40916c"
            },
            {
                id: 8,
                name: "Pema Dorji",
                email: "pema@example.com",
                phone: "+975 17890123",
                role: "Seller",
                type: "seller",
                joinDate: "2023-11-15",
                listings: 18,
                purchases: 4,
                status: "inactive",
                avatarColor: "#1b4332"
            },
            {
                id: 9,
                name: "Dechen Wangmo",
                email: "dechen@example.com",
                phone: "+975 17901234",
                role: "Buyer",
                type: "buyer",
                joinDate: "2024-03-01",
                listings: 0,
                purchases: 3,
                status: "active",
                avatarColor: "#2d6a4f"
            },
            {
                id: 10,
                name: "Tashi Dorji",
                email: "tashi@example.com",
                phone: "+975 17012345",
                role: "Seller",
                type: "seller",
                joinDate: "2024-02-28",
                listings: 11,
                purchases: 1,
                status: "active",
                avatarColor: "#52796f"
            }
        ];

        let allUsers = [...sampleUsers];
        let currentUserType = 'all';

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
                    window.location.href = 'Item-category.html';
                    break;
                case 'users':
                    // Already on users page
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
            if (section !== 'users') {
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
        function searchUsers() {
            const searchTerm = document.querySelector('.search-input').value.toLowerCase();
            
            if (searchTerm === '') {
                allUsers = [...sampleUsers];
            } else {
                allUsers = sampleUsers.filter(user => 
                    user.name.toLowerCase().includes(searchTerm) ||
                    user.email.toLowerCase().includes(searchTerm) ||
                    user.phone.toLowerCase().includes(searchTerm)
                );
            }
            loadUsers();
        }

        // Close modal
        function closeModal() {
            document.getElementById('userDetailModal').classList.remove('show');
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            loadUsers();
            updateStats();
        });

        // Load users with new card design
        function loadUsers() {
            let filteredUsers = allUsers;
            
            if (currentUserType === 'buyers') {
                filteredUsers = allUsers.filter(u => u.type === 'buyer');
            } else if (currentUserType === 'sellers') {
                filteredUsers = allUsers.filter(u => u.type === 'seller');
            }
            
            loadUsersGrid(filteredUsers);
            updateStats();
        }

        function loadUsersGrid(users) {
            const grid = document.getElementById('usersGrid');
            
            if (users.length === 0) {
                grid.innerHTML = `
                    <div class="no-items" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">👥</div>
                        <h3 style="color: var(--text-color); margin-bottom: 0.5rem;">No users found</h3>
                        <p style="color: var(--light-text);">Try adjusting your search or filter criteria.</p>
                    </div>
                `;
                return;
            }

            grid.innerHTML = users.map(user => `
                <div class="user-card ${user.status === 'inactive' ? 'inactive' : ''}" data-id="${user.id}">
                    <div class="user-avatar" style="background: ${user.avatarColor}">
                        ${user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div class="user-info">
                        <div class="user-name">${user.name}</div>
                        <div class="user-role">${user.role}</div>
                        <div class="user-status status-${user.status}">
                            ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </div>
                    </div>
                    <div class="user-actions">
                        <button class="action-btn btn-view" onclick="viewUser(${user.id})">View Details</button>
                    </div>
                </div>
            `).join('');
        }

        // View user details
        function viewUser(userId) {
            const user = allUsers.find(u => u.id === userId);
            if (!user) return;

            const modalBody = document.getElementById('modalBody');
            modalBody.innerHTML = `
                <div class="user-detail-grid">
                    <div class="user-detail-avatar" style="background: ${user.avatarColor}">
                        ${user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div class="user-detail-info">
                        <div class="detail-section">
                            <h3 class="detail-section-title">User Information</h3>
                            <div class="detail-row">
                                <span class="detail-label">Full Name:</span>
                                <span class="detail-value">${user.name}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Email:</span>
                                <span class="detail-value">${user.email}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Phone:</span>
                                <span class="detail-value">${user.phone}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Role:</span>
                                <span class="detail-value">${user.role}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Join Date:</span>
                                <span class="detail-value">${user.joinDate}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">Status:</span>
                                <span class="detail-value user-status status-${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h3 class="detail-section-title">Activity Summary</h3>
                            ${user.type === 'seller' || user.type === 'both' ? `
                                <div class="detail-row">
                                    <span class="detail-label">Active Listings:</span>
                                    <span class="detail-value">${user.listings}</span>
                                </div>
                            ` : ''}
                            ${user.type === 'buyer' || user.type === 'both' ? `
                                <div class="detail-row">
                                    <span class="detail-label">Total Purchases:</span>
                                    <span class="detail-value">${user.purchases}</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-btn btn-edit" onclick="editUser(${user.id})">Edit User</button>
                    ${user.status === 'active' ? 
                        `<button class="modal-btn btn-deactivate" onclick="toggleUserStatus(${user.id})">Deactivate</button>` :
                        `<button class="modal-btn btn-activate" onclick="toggleUserStatus(${user.id})">Activate</button>`
                    }
                    <button class="modal-btn btn-delete" onclick="deleteUser(${user.id})">Delete User</button>
                </div>
            `;

            document.getElementById('userDetailModal').classList.add('show');
        }

        // Switch user type
        function switchUserType(type) {
            currentUserType = type;
            
            // Update active tab
            document.querySelectorAll('.user-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Update section title
            const titles = {
                'all': 'All Users',
                'buyers': 'Buyers',
                'sellers': 'Sellers'
            };
            document.getElementById('usersSectionTitle').textContent = titles[type];
            
            loadUsers();
        }

        // Edit user
        function editUser(userId) {
            alert(`Edit functionality for user ID: ${userId} would be implemented here.`);
        }

        // Toggle user status
        function toggleUserStatus(userId) {
            const user = allUsers.find(u => u.id === userId);
            if (!user) return;

            const newStatus = user.status === 'active' ? 'inactive' : 'active';
            const action = newStatus === 'active' ? 'activate' : 'deactivate';

            if (confirm(`Are you sure you want to ${action} this user?`)) {
                user.status = newStatus;
                allUsers = [...allUsers];
                loadUsers();
                closeModal();
                alert(`User "${user.name}" has been ${action}d.`);
            }
        }

        // Delete user
        function deleteUser(userId) {
            const user = allUsers.find(u => u.id === userId);
            if (!user) return;

            if (confirm(`Are you sure you want to delete "${user.name}"?\n\nThis action cannot be undone and will permanently remove this user.`)) {
                const index = allUsers.findIndex(u => u.id === userId);
                if (index > -1) {
                    allUsers.splice(index, 1);
                    loadUsers();
                    closeModal();
                    alert('User deleted successfully!');
                }
            }
        }

        // Update statistics
        function updateStats() {
            const buyers = allUsers.filter(u => u.type === 'buyer').length;
            const sellers = allUsers.filter(u => u.type === 'seller').length;
            const both = allUsers.filter(u => u.type === 'both').length;
            
            document.getElementById('totalUsersCount').textContent = allUsers.length;
            document.getElementById('buyersCount').textContent = buyers + both;
            document.getElementById('sellersCount').textContent = sellers + both;
        }

        // Close modal when clicking outside
        document.getElementById('userDetailModal').addEventListener('click', function(e) {
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