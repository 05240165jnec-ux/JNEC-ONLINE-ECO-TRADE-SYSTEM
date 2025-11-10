// Function to set active navigation based on current page
        function setActiveNavigation() {
            // Get current page filename
            const currentPage = window.location.pathname.split('/').pop();
            
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Set active class based on current page
            if (currentPage === 'home.html' || currentPage === '') {
                document.getElementById('nav-home').classList.add('active');
            } else if (currentPage === 'Active-listings.html') {
                document.getElementById('nav-listings').classList.add('active');
            } else if (currentPage === 'Item-category.html') {
                document.getElementById('nav-category').classList.add('active');
            } else if (currentPage === 'Manage-user.html') {
                document.getElementById('nav-users').classList.add('active');
            } else if (currentPage === 'feedback.html') {
                document.getElementById('nav-feedback').classList.add('active');
            } else if (currentPage === 'profile.html') {
                document.getElementById('nav-profile').classList.add('active');
            } else if (currentPage === 'switch-acc.html') {
                document.getElementById('nav-switch-account').classList.add('active');
            } else if (currentPage === 'logout.html') {
                document.getElementById('nav-logout').classList.add('active');
            }
        }

        // Notification functionality
        function toggleNotifications() {
            const popup = document.getElementById('notificationPopup');
            popup.classList.toggle('show');
        }

        function markAllAsRead() {
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            // Update badge count
            const badge = document.querySelector('.notification-badge');
            badge.textContent = '0';
            badge.style.display = 'none';
            
            // Close popup after marking all as read
            setTimeout(() => {
                toggleNotifications();
            }, 500);
        }

        // Close notification popup when clicking outside
        document.addEventListener('click', function(event) {
            const popup = document.getElementById('notificationPopup');
            const notificationBtn = document.querySelector('.notification-btn');
            
            if (popup.classList.contains('show') && 
                !popup.contains(event.target) && 
                !notificationBtn.contains(event.target)) {
                popup.classList.remove('show');
            }
        });

        // Navigation functionality
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                // Navigate to the respective page
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            });
        });

        // Search functionality
        document.querySelector('.search-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    console.log('Searching for:', searchTerm);
                    // Implement search functionality here
                }
            }
        });

        // Initialize active navigation on page load
        document.addEventListener('DOMContentLoaded', function() {
            setActiveNavigation();
        });