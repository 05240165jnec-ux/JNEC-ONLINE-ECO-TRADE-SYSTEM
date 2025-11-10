// Sample data
        const sampleReviews = [
            {
                id: 1,
                reviewerName: "Unknown",
                reviewerInitials: "UN",
                rating: 5,
                date: "2 days ago",
                content: "Great experience! The seller was very responsive and the item was exactly as described. Highly recommend!",
                helpful: 12,
                reported: 2,
                type: "positive",
                archived: false,
                resolved: false,
                adminReply: ""
            },
            {
                id: 2,
                reviewerName: "Unknown",
                reviewerInitials: "UN",
                rating: 4,
                date: "1 week ago",
                content: "Good service overall. The item arrived on time and in good condition. Could have been packaged better.",
                helpful: 8,
                reported: 1,
                type: "positive",
                archived: false,
                resolved: false,
                adminReply: "Thank you for your feedback. We'll work on improving our packaging."
            },
            {
                id: 3,
                reviewerName: "Karma Wangchuk",
                reviewerInitials: "KW",
                rating: 3,
                date: "2 weeks ago",
                content: "Average experience. The item was okay but took longer to arrive than expected. Communication could be improved.",
                helpful: 5,
                reported: 0,
                type: "neutral",
                archived: false,
                resolved: false,
                adminReply: ""
            },
            {
                id: 4,
                reviewerName: "Sonam Tshering",
                reviewerInitials: "ST",
                rating: 2,
                date: "3 weeks ago",
                content: "Disappointed with the service. The item didn't match the description and the seller was unresponsive to my messages.",
                helpful: 3,
                reported: 1,
                type: "negative",
                archived: false,
                resolved: false,
                adminReply: "We apologize for the inconvenience. Please contact our support team for assistance."
            },
            {
                id: 5,
                reviewerName: "Pema Lhamo",
                reviewerInitials: "PL",
                rating: 5,
                date: "1 month ago",
                content: "Excellent platform! Found exactly what I needed at a great price. Will definitely use this service again.",
                helpful: 15,
                reported: 0,
                type: "positive",
                archived: false,
                resolved: false,
                adminReply: "Thank you for your positive feedback! We're glad you had a great experience."
            },
            {
                id: 6,
                reviewerName: "Tashi Dorji",
                reviewerInitials: "TD",
                rating: 1,
                date: "1 month ago",
                content: "Very poor experience. Item never arrived and no refund was processed. Would not recommend.",
                helpful: 7,
                reported: 3,
                type: "negative",
                archived: false,
                resolved: false,
                adminReply: "We're sorry to hear about your experience. Please check your email for a resolution."
            }
        ];

        let allReviews = [...sampleReviews];
        let currentFilter = 'all';

        // Toast notification function
        function showToast(type, title, message) {
            const toastContainer = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            
            const icons = {
                success: '✓',
                error: '✕',
                warning: '⚠'
            };
            
            toast.innerHTML = `
                <div class="toast-icon">${icons[type]}</div>
                <div class="toast-content">
                    <div class="toast-title">${title}</div>
                    <div class="toast-message">${message}</div>
                </div>
                <button class="toast-close" onclick="this.parentElement.remove()">×</button>
            `;
            
            toastContainer.appendChild(toast);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 5000);
        }

        // Navigation back to home
        function goBackToHome() {
            
            window.location.href = 'home.html';
        }

        // Navigation function for sidebar items
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
                    window.location.href = 'Manage-user.html';
                    break;
                case 'feedback':
                    // Already on feedback page
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
            if (section !== 'feedback') {
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
        function searchReviews() {
            const searchTerm = document.querySelector('.search-input').value.toLowerCase();
            
            if (searchTerm === '') {
                allReviews = [...sampleReviews];
            } else {
                allReviews = sampleReviews.filter(review => 
                    review.content.toLowerCase().includes(searchTerm) ||
                    review.reviewerName.toLowerCase().includes(searchTerm)
                );
            }
            
            loadReviews();
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            loadReviews();
            updateStats();
        });

        // Load reviews
        function loadReviews() {
            let filteredReviews = allReviews;
            
            if (currentFilter === 'positive') {
                filteredReviews = allReviews.filter(r => r.rating >= 4);
            } else if (currentFilter === 'neutral') {
                filteredReviews = allReviews.filter(r => r.rating === 3);
            } else if (currentFilter === 'negative') {
                filteredReviews = allReviews.filter(r => r.rating <= 2);
            } else if (currentFilter === 'reported') {
                filteredReviews = allReviews.filter(r => r.reported > 0);
            }
            
            loadReviewsList(filteredReviews);
        }

        function loadReviewsList(reviews) {
            const list = document.getElementById('reviewsList');
            
            if (reviews.length === 0) {
                list.innerHTML = `
                    <div class="no-reviews">
                        <div class="no-reviews-icon">💬</div>
                        <h3>No reviews found</h3>
                        <p>There are no reviews matching your current filter.</p>
                    </div>
                `;
                return;
            }

            list.innerHTML = reviews.map(review => `
                <div class="review-card">
                    <div class="review-header">
                        <div class="reviewer-info">
                            <div class="reviewer-avatar" style="background: ${getAvatarColor(review.id)}">
                                ${review.reviewerInitials}
                            </div>
                            <div class="reviewer-details">
                                <div class="reviewer-name">${review.reviewerName}</div>
                                <div class="review-date">${review.date}</div>
                            </div>
                        </div>
                        <div class="review-rating">
                            <div class="review-stars">${getStarRating(review.rating)}</div>
                            <span style="color: var(--text-color); font-weight: 600;">${review.rating}.0</span>
                        </div>
                    </div>
                    <div class="review-content">
                        <p class="review-text">${review.content}</p>
                        <div class="review-meta">
                            <span>${review.helpful} people found this helpful</span>
                            ${review.reported > 0 ? `<span>${review.reported} reports</span>` : ''}
                        </div>
                    </div>
                    
                    ${review.adminReply ? `
                    <div class="admin-reply">
                        <div class="reply-header">
                            <div class="reply-label">Admin Reply</div>
                            <div class="reply-date">Yesterday</div>
                        </div>
                        <p class="reply-text">${review.adminReply}</p>
                    </div>
                    ` : ''}
                    
                    <div class="review-actions">
                        <button class="action-btn btn-helpful" onclick="markHelpful(${review.id})">
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                            </svg>
                            Helpful
                        </button>
                        <button class="action-btn btn-report" onclick="reportReview(${review.id})">
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                            Report
                        </button>
                        <button class="action-btn btn-respond" onclick="respondToReview(${review.id})">
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                            </svg>
                            Respond
                        </button>
                        <button class="action-btn btn-archive" onclick="archiveReview(${review.id})">
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"/>
                            </svg>
                            Archive
                        </button>
                        <button class="action-btn btn-resolve" onclick="resolveReview(${review.id})">
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            Resolve
                        </button>
                        <button class="action-btn btn-delete" onclick="deleteReview(${review.id})">
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Filter reviews
        function filterReviews(type) {
            currentFilter = type;
            
            // Update active tab
            document.querySelectorAll('.filter-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');
            
            loadReviews();
        }

        // Update statistics
        function updateStats() {
            const totalReviews = sampleReviews.length;
            const averageRating = (sampleReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);
            const positiveReviews = sampleReviews.filter(r => r.rating >= 4).length;
            const recentReviews = sampleReviews.filter(r => r.date.includes('day') || r.date.includes('week')).length;
            
            document.getElementById('totalReviews').textContent = totalReviews;
            document.getElementById('averageRating').textContent = averageRating;
            document.getElementById('positiveReviews').textContent = positiveReviews;
            document.getElementById('recentReviews').textContent = recentReviews;
            
            // Update rating summary
            document.getElementById('overallRating').textContent = averageRating;
            document.getElementById('overallStars').textContent = getStarRating(parseFloat(averageRating));
            document.getElementById('totalReviewsCount').textContent = `${totalReviews} reviews`;
        }

        // Helper functions
        function getStarRating(rating) {
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 >= 0.5;
            const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
            
            return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars);
        }

        function getAvatarColor(id) {
            const colors = [
                '#f77f00', // warning
                '#52b788', // success
                '#2d6a4f', // primary
                '#52796f', // secondary
                '#e63946', // danger
                '#74c69d'  // accent
            ];
            return colors[id % colors.length];
        }

        // Review actions
        function markHelpful(reviewId) {
            const review = allReviews.find(r => r.id === reviewId);
            if (review) {
                review.helpful++;
                loadReviews();
                showToast('success', 'Action Completed', 'Review marked as helpful!');
            }
        }

        function reportReview(reviewId) {
            const review = allReviews.find(r => r.id === reviewId);
            if (review) {
                review.reported++;
                loadReviews();
                showToast('warning', 'Review Reported', 'Review has been reported. Our team will review it shortly.');
            }
        }

        // New admin actions
        function deleteReview(reviewId) {
            if (confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
                allReviews = allReviews.filter(r => r.id !== reviewId);
                sampleReviews.splice(sampleReviews.findIndex(r => r.id === reviewId), 1);
                loadReviews();
                updateStats();
                showToast('success', 'Review Deleted', 'Review has been permanently deleted.');
            }
        }

        function archiveReview(reviewId) {
            const review = allReviews.find(r => r.id === reviewId);
            if (review) {
                review.archived = true;
                allReviews = allReviews.filter(r => r.id !== reviewId);
                loadReviews();
                showToast('success', 'Review Archived', 'Review has been moved to archive.');
            }
        }

        function respondToReview(reviewId) {
            const review = allReviews.find(r => r.id === reviewId);
            if (review) {
                const response = prompt('Enter your response to this review:');
                if (response) {
                    review.adminReply = response;
                    loadReviews();
                    showToast('success', 'Response Added', 'Your response has been added to the review.');
                }
            }
        }

        function resolveReview(reviewId) {
            const review = allReviews.find(r => r.id === reviewId);
            if (review) {
                review.resolved = true;
                loadReviews();
                showToast('success', 'Issue Resolved', 'This feedback has been marked as resolved.');
            }
        }