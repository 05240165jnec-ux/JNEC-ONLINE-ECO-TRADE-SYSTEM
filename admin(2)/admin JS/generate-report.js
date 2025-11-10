 // Set default dates
        document.addEventListener('DOMContentLoaded', function() {
            const today = new Date();
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(today.getDate() - 7);
            
            document.getElementById('start-date').valueAsDate = oneWeekAgo;
            document.getElementById('end-date').valueAsDate = today;
        });

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
                    <i style="color: var(--success-color); font-size: 36px;">✅</i>
                    <h3 style="color: var(--text-color); margin-bottom: 1rem; font-size: 16px;">Report Generated Successfully!</h3>
                    <p style="font-size: 13px;"><strong>Report Type:</strong> ${reportType}</p>
                    <p style="font-size: 13px;"><strong>Date Range:</strong> ${startDate} to ${endDate}</p>
                    <p style="font-size: 13px;"><strong>Selected Format:</strong> ${format.toUpperCase()}</p>
                    <p style="margin-top: 1rem; color: var(--light-text); font-size: 12px;">Your report is ready for export. Click any of the export buttons above to download.</p>
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