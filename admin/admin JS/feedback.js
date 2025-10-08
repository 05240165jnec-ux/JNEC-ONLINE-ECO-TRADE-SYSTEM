// feedback.js

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

// Your existing feedback management functions...
function searchReviews() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    console.log('Searching for:', searchTerm);
    // Your search logic here
}

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
        type: "positive"
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
        type: "positive"
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
        type: "neutral"
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
        type: "negative"
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
        type: "positive"
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
        type: "negative"
    }
];

let allReviews = [...sampleReviews];
let currentFilter = 'all';

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
                    <span style="color: var(--gray-600); font-weight: 600;">${review.rating}.0</span>
                </div>
            </div>
            <div class="review-content">
                <p class="review-text">${review.content}</p>
                <div class="review-meta">
                    <span>${review.helpful} people found this helpful</span>
                    ${review.reported > 0 ? `<span>${review.reported} reports</span>` : ''}
                </div>
            </div>
            <div class="review-actions">
                <button class="action-btn btn-helpful" onclick="markHelpful(${review.id})">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                    </svg>
                    Helpful
                </button>
                <button class="action-btn btn-report" onclick="reportReview(${review.id})">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    Report
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

// Search functionality
function searchReviews() {
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();
    allReviews = sampleReviews.filter(review => 
        review.content.toLowerCase().includes(searchTerm) ||
        review.reviewerName.toLowerCase().includes(searchTerm)
    );
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
        '#f59e0b', // amber
        '#10b981', // emerald
        '#3b82f6', // blue
        '#8b5cf6', // violet
        '#ef4444', // red
        '#06b6d4'  // cyan
    ];
    return colors[id % colors.length];
}

// Review actions
function markHelpful(reviewId) {
    const review = allReviews.find(r => r.id === reviewId);
    if (review) {
        review.helpful++;
        loadReviews();
        alert('Marked as helpful!');
    }
}

function reportReview(reviewId) {
    const review = allReviews.find(r => r.id === reviewId);
    if (review) {
        review.reported++;
        loadReviews();
        alert('Review reported. Our team will review it shortly.');
    }
}