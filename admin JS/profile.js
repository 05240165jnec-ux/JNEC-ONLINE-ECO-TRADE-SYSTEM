// Set default dates for report generation
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date();
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(today.getDate() - 7);
            
            document.getElementById('start-date').valueAsDate = oneWeekAgo;
            document.getElementById('end-date').valueAsDate = today;
        });

        // Page navigation function
        function showPage(page) {
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(`${page}-page`).classList.add('active');
            
            // Update active nav item
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Find and activate the correct nav item
            const navItems = document.querySelectorAll('.nav-item');
            if (page === 'home') {
                navItems[0].classList.add('active');
            } else {
                // Find the sub-nav-item that matches the page
                navItems.forEach(item => {
                    if (item.textContent.toLowerCase().includes(page)) {
                        item.classList.add('active');
                    }
                });
            }
            
            // Update page title and subtitle
            const pageTitle = document.getElementById('page-title');
            const pageSubtitle = document.getElementById('page-subtitle');
            
            switch(page) {
                case 'home':
                    pageTitle.textContent = 'Dashboard Overview';
                    pageSubtitle.textContent = 'Welcome back! Here\'s what\'s happening with your platform.';
                    break;
                case 'generate-report':
                    pageTitle.textContent = 'Generate Report';
                    pageSubtitle.textContent = 'Create and download comprehensive reports for your platform analytics';
                    break;
                case 'profile':
                    pageTitle.textContent = 'Profile Settings';
                    pageSubtitle.textContent = 'Manage your account information and security settings';
                    break;
            }
        }

        // Navigation function for other sections
        function navigateTo(section) {
            switch(section) {
                case 'switch-account':
                    alert('Switch Account interface will be created next!');
                    break;
                case 'logout':
                    if (confirm('Are you sure you want to logout?')) {
                        alert('Logging out...');
                        // In a real application, this would redirect to login page
                    }
                    break;
                default:
                    console.log('Navigation not implemented for:', section);
            }
        }

        // Home page navigation
        function navigateToSection(section) {
            alert(`Navigating to ${section} section...`);
            // In a real application, this would navigate to specific sections
        }

        // Report type selection
        function selectReportType(card) {
            // Remove selected class from all cards
            document.querySelectorAll('.option-card').forEach(c => {
                c.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            card.classList.add('selected');
        }

        // Generate report function
        function generateReport() {
            const selectedType = document.querySelector('.option-card.selected');
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            const format = document.getElementById('report-format').value;

            if (!selectedType) {
                alert('Please select a report type');
                return;
            }

            if (!startDate || !endDate) {
                alert('Please select a date range');
                return;
            }

            // Show preview and export buttons
            document.getElementById('report-preview').classList.add('active');
            document.getElementById('export-buttons').style.display = 'flex';
            
            // Update preview content
            const previewContent = document.querySelector('.preview-content');
            const reportType = selectedType.querySelector('.option-title').textContent;
            
            previewContent.innerHTML = `
                <div class="preview-placeholder">
                    <i style="color: var(--success); font-size: 48px;">✅</i>
                    <h3 style="color: var(--gray-800); margin-bottom: 1rem;">Report Generated Successfully!</h3>
                    <p><strong>Report Type:</strong> ${reportType}</p>
                    <p><strong>Date Range:</strong> ${startDate} to ${endDate}</p>
                    <p><strong>Selected Format:</strong> ${format.toUpperCase()}</p>
                    <p style="margin-top: 1.5rem; color: var(--gray-600);">Your report is ready for export. Click any of the export buttons above to download.</p>
                </div>
            `;
        }

        // Reset report form function
        function resetReportForm() {
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            
            const today = new Date();
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(today.getDate() - 7);
            
            document.getElementById('start-date').valueAsDate = oneWeekAgo;
            document.getElementById('end-date').valueAsDate = today;
            document.getElementById('report-format').value = 'pdf';
            
            document.getElementById('report-preview').classList.remove('active');
            document.getElementById('export-buttons').style.display = 'none';
            
            const previewContent = document.querySelector('.preview-content');
            previewContent.innerHTML = `
                <div class="preview-placeholder">
                    <i>📊</i>
                    <p>Your report will be generated here</p>
                </div>
            `;
        }

        // Export report function
        function exportReport(format) {
            const selectedType = document.querySelector('.option-card.selected');
            const reportType = selectedType ? selectedType.querySelector('.option-title').textContent : 'Unknown Report';
            
            alert(`Exporting ${reportType} as ${format.toUpperCase()}...\n\nIn a real application, this would trigger a file download.`);
            
            // Simulate download process
            const exportBtn = event.currentTarget;
            const originalText = exportBtn.innerHTML;
            
            exportBtn.innerHTML = `<i>⏳</i> Exporting...`;
            exportBtn.disabled = true;
            
            setTimeout(() => {
                exportBtn.innerHTML = originalText;
                exportBtn.disabled = false;
                alert(`${reportType} has been successfully exported as ${format.toUpperCase()}!`);
            }, 1500);
        }

        // Profile functions
        function editProfile() {
            const inputs = document.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.readOnly = !input.readOnly;
                if (!input.readOnly) {
                    input.style.backgroundColor = 'white';
                    input.style.borderColor = 'var(--primary)';
                } else {
                    input.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    input.style.borderColor = 'var(--gray-200)';
                }
            });
            
            const btn = event.currentTarget;
            if (btn.innerHTML.includes('Edit Profile')) {
                btn.innerHTML = '<i>💾</i> Save Edits';
                btn.classList.add('btn-primary');
                btn.classList.remove('btn-outline');
            } else {
                btn.innerHTML = '<i>✏️</i> Edit Profile';
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline');
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
                    input.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    input.style.borderColor = 'var(--gray-200)';
                });
                
                const editBtn = document.querySelector('.profile-actions .btn-primary');
                editBtn.innerHTML = '<i>✏️</i> Edit Profile';
                editBtn.classList.remove('btn-primary');
                editBtn.classList.add('btn-outline');
                
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

        function toggleNotifications(checkbox) {
            if (checkbox.checked) {
                alert('Login notifications have been enabled.');
            } else {
                alert('Login notifications have been disabled.');
            }
        }

        function changePassword() {
            alert('Password change dialog would open here');
        }

        // Other existing functions...
        function showNotifications() {
            alert('Notifications panel would open here');
        }

        function showQuickActions() {
            alert('Quick actions menu would appear here');
        }

        function viewUser(userId) {
            alert('Viewing user: ' + userId);
        }

        function viewListing(listingId) {
            alert('Viewing listing: ' + listingId);
        }