// Profile functions
        function editProfile() {
            const inputs = document.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.readOnly = !input.readOnly;
                if (!input.readOnly) {
                    input.style.backgroundColor = 'white';
                    input.style.borderColor = 'var(--primary-color)';
                } else {
                    input.style.backgroundColor = 'var(--bg-light)';
                    input.style.borderColor = 'var(--border-color)';
                }
            });
            
            const btn = event.currentTarget;
            if (btn.innerHTML.includes('Edit Profile')) {
                btn.innerHTML = '<i>💾</i> Save Edits';
            } else {
                btn.innerHTML = '<i>✏️</i> Edit Profile';
                alert('Profile changes saved successfully!');
            }
        }

        function uploadPhoto() {
            alert('Photo upload dialog would open here');
        }

        function saveProfile() {
            alert('All profile changes have been saved successfully!');
        }

        function resetProfile() {
            if (confirm('Are you sure you want to reset all changes?')) {
                document.querySelectorAll('.form-control').forEach(input => {
                    input.readOnly = true;
                    input.style.backgroundColor = 'var(--bg-light)';
                    input.style.borderColor = 'var(--border-color)';
                });
                
                const editBtn = document.querySelector('.profile-actions .btn-primary');
                editBtn.innerHTML = '<i>✏️</i> Edit Profile';
                
                alert('Profile information reset to original values');
            }
        }

        function toggle2FA(checkbox) {
            if (checkbox.checked) {
                alert('Two-Factor Authentication has been enabled. You will receive a setup email shortly.');
            } else {
                alert('Two-Factor Authentication has been disabled.');
            }
        }

        function toggleNotificationsSetting(checkbox) {
            if (checkbox.checked) {
                alert('Login notifications have been enabled.');
            } else {
                alert('Login notifications have been disabled.');
            }
        }

        function changePassword() {
            alert('Password change dialog would open here');
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

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const popup = document.getElementById('notificationPopup');
                if (popup.classList.contains('show')) {
                    popup.classList.remove('show');
                }
            }
        });