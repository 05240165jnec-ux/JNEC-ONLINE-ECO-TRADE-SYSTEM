// Page navigation function
        function showPage(page) {
            // In a real application, this would navigate to the selected page
            // For this demo, we'll show an alert
            if (page !== 'logout') {
                alert(`Navigating to ${page} page...`);
            }
        }

        // Show logout page
        function showLogoutPage() {
            // This function is called when logout is clicked in sidebar
            // The page is already showing logout content
        }

        // Show logout confirmation modal (Facebook-style)
        function showLogoutConfirmation() {
            const modal = document.getElementById('logout-modal');
            modal.style.display = 'flex';
            
            // Add escape key listener
            document.addEventListener('keydown', handleEscapeKey);
        }

        // Hide logout confirmation modal
        function hideLogoutConfirmation() {
            const modal = document.getElementById('logout-modal');
            modal.style.display = 'none';
            
            // Remove escape key listener
            document.removeEventListener('keydown', handleEscapeKey);
        }

        // Handle escape key press
        function handleEscapeKey(event) {
            if (event.key === 'Escape') {
                hideLogoutConfirmation();
            }
        }

        // Perform logout with progress animation
        function performLogout() {
            const modal = document.getElementById('logout-modal');
            const progressContainer = document.getElementById('logout-progress');
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            
            // Hide modal and show progress
            modal.style.display = 'none';
            progressContainer.style.display = 'flex';
            
            // Simulate logout process with progress animation
            let progress = 0;
            const interval = setInterval(() => {
                progress += 5;
                progressFill.style.width = `${progress}%`;
                
                if (progress === 25) {
                    progressText.textContent = 'Closing active sessions...';
                } else if (progress === 50) {
                    progressText.textContent = 'Clearing cache...';
                } else if (progress === 75) {
                    progressText.textContent = 'Securing data...';
                } else if (progress === 100) {
                    progressText.textContent = 'Redirecting to login...';
                    clearInterval(interval);
                    
                    // Redirect to login page after completion
                    setTimeout(() => {
                        window.location.href = '../HTML/login.html';
                    }, 1000);
                }
            }, 100);
        }

        // Other existing functions...
        function showNotifications() {
            alert('Notifications panel would open here');
        }

        function showQuickActions() {
            alert('Quick actions menu would appear here');
        }

        // Close modal when clicking outside
        document.getElementById('logout-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                hideLogoutConfirmation();
            }
        });

        // Auto-show logout page when navigating directly to logout
        document.addEventListener('DOMContentLoaded', function() {
            // Update current session time
            updateSessionTime();
            
            // Update session time every minute
            setInterval(updateSessionTime, 60000);
        });

        function updateSessionTime() {
            // This would normally calculate actual session duration
            // For demo, we'll use a fixed time
            const sessionElement = document.querySelector('.detail-item .detail-value');
            if (sessionElement) {
                sessionElement.textContent = '2 hours 15 minutes';
            }
        }