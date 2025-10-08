// Set default dates
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date();
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(today.getDate() - 7);
            
            document.getElementById('start-date').valueAsDate = oneWeekAgo;
            document.getElementById('end-date').valueAsDate = today;
        });

        // Navigation function
        function navigateTo(section) {
            switch(section) {
                case 'home':
                    window.location.href = 'home.html';
                    break;
                case 'generate-report':
                    // Already on this page
                    break;
                case 'profile':
                    alert('Profile interface will be created next!');
                    break;
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

        // Reset form function
        function resetForm() {
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

        // Other existing functions...
        function showNotifications() {
            alert('Notifications panel would open here');
        }

        function showQuickActions() {
            alert('Quick actions menu would appear here');
        }