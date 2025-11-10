 // Account selection function
        function selectAccount(card) {
            // Remove selected class from all cards
            document.querySelectorAll('.account-card').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            card.classList.add('selected');
            
            // Update select button text
            const selectBtn = card.querySelector('.select-btn');
            selectBtn.textContent = 'Selected';
            selectBtn.style.background = 'var(--success-color)';
            selectBtn.style.color = 'white';
            selectBtn.style.borderColor = 'var(--success-color)';
        }

        // Switch to selected account
        function switchToSelectedAccount() {
            const selectedAccount = document.querySelector('.account-card.selected');
            
            if (!selectedAccount) {
                alert('Please select an account to switch to.');
                return;
            }
            
            const accountName = selectedAccount.querySelector('.account-name-small').textContent;
            const accountRole = selectedAccount.querySelector('.account-role-small').textContent;
            
            // Show loading state
            const switchBtn = event.currentTarget;
            const originalText = switchBtn.innerHTML;
            switchBtn.innerHTML = '<i>⏳</i> Switching...';
            switchBtn.disabled = true;
            
            // Simulate account switching process
            setTimeout(() => {
                switchBtn.innerHTML = originalText;
                switchBtn.disabled = false;
                
                // Determine if switching to admin or user account
                const isUserAccount = accountRole.includes('User') || accountRole.includes('Vendor');
                
                if (isUserAccount) {
                    alert(`Successfully switched to ${accountName} (${accountRole})!\n\nYou are now viewing the platform as a regular user. This helps you understand the user experience and identify areas for improvement.`);
                } else {
                    alert(`Successfully switched to ${accountName} (${accountRole})!\n\nYou now have access to different administrative permissions and features.`);
                }
                
                // Update current account display
                document.querySelector('.current-account-card .account-name').textContent = accountName;
                document.querySelector('.current-account-card .account-role').textContent = accountRole;
                document.querySelector('.current-account-card .account-avatar').textContent = 
                    accountName.split(' ').map(word => word[0]).join('');
                
                // Reset selection
                document.querySelectorAll('.account-card').forEach(c => {
                    c.classList.remove('selected');
                    const btn = c.querySelector('.select-btn');
                    btn.textContent = 'Select';
                    btn.style.background = 'transparent';
                    btn.style.color = 'var(--light-text)';
                    btn.style.borderColor = 'var(--border-color)';
                });
            }, 2000);
        }

        // Cancel switch operation
        function cancelSwitch() {
            // Reset selection
            document.querySelectorAll('.account-card').forEach(c => {
                c.classList.remove('selected');
                const btn = c.querySelector('.select-btn');
                btn.textContent = 'Select';
                btn.style.background = 'transparent';
                btn.style.color = 'var(--light-text)';
                btn.style.borderColor = 'var(--border-color)';
            });
            
            alert('Account switching cancelled.');
        }

        // Switch between user type tabs
        function switchUserType(type) {
            // Update tabs
            document.querySelectorAll('.user-type-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.currentTarget.classList.add('active');
            
            // Show/hide sections
            document.querySelectorAll('.account-type-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(`${type}-accounts`).classList.add('active');
            
            // Reset selection when switching tabs
            document.querySelectorAll('.account-card').forEach(c => {
                c.classList.remove('selected');
                const btn = c.querySelector('.select-btn');
                btn.textContent = 'Select';
                btn.style.background = 'transparent';
                btn.style.color = 'var(--light-text)';
                btn.style.borderColor = 'var(--border-color)';
            });
        }

        // Quick action functions
        function createNewAccount() {
            alert('New account creation dialog would open here.\n\nThis would allow you to create a new administrative account with specific permissions.');
        }

        function managePermissions() {
            alert('Permissions management panel would open here.\n\nYou can configure access levels and permissions for different administrative roles.');
        }

        function viewActivityLog() {
            alert('Activity log viewer would open here.\n\nView detailed history of account usage, logins, and administrative actions.');
        }

        // Notification functions
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

        // Close notifications when clicking outside
        document.addEventListener('click', function(event) {
            const popup = document.getElementById('notificationPopup');
            const notificationBtn = document.querySelector('.notification-btn');
            
            if (popup.classList.contains('show') && 
                !popup.contains(event.target) && 
                !notificationBtn.contains(event.target)) {
                popup.classList.remove('show');
            }
        });

        // Search functionality
        document.querySelector('.search-input').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const accountCards = document.querySelectorAll('.account-card');
            
            accountCards.forEach(card => {
                const accountName = card.querySelector('.account-name-small').textContent.toLowerCase();
                const accountRole = card.querySelector('.account-role-small').textContent.toLowerCase();
                
                if (accountName.includes(searchTerm) || accountRole.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });