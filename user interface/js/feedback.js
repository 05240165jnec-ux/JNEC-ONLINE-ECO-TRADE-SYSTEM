// Sample reviews data
const reviewsData = [
    {
        id: 1,
        reviewer: 'Tashi Wangchuk',
        rating: 5,
        text: 'Excellent seller! Very responsive and the item was exactly as described. Highly recommend!',
        date: '2 days ago',
        timestamp: new Date('2025-09-30T10:00:00')
    },
    {
        id: 2,
        reviewer: 'Pema Dorji',
        rating: 4,
        text: 'Good communication. Item was in good condition. Would buy from again.',
        date: '1 week ago',
        timestamp: new Date('2025-09-25T14:00:00')
    },
    {
        id: 3,
        reviewer: 'Sonam Choden',
        rating: 5,
        text: 'Very professional seller. Quick responses and fair pricing. Great experience overall!',
        date: '2 weeks ago',
        timestamp: new Date('2025-09-18T16:00:00')
    },
    {
        id: 4,
        reviewer: 'Kinley Gyeltshen',
        rating: 4,
        text: 'Seller was helpful and patient with my questions. Item matched the description perfectly.',
        date: '3 weeks ago',
        timestamp: new Date('2025-09-11T11:00:00')
    }
];

// Star rating functionality
let selectedRating = 0;
const stars = document.querySelectorAll('.star-rating i');
const ratingInput = document.getElementById('ratingValue');

stars.forEach((star, index) => {
    star.addEventListener('click', function() {
        selectedRating = index + 1;
        ratingInput.value = selectedRating;
        updateStars(selectedRating);
    });
    
    star.addEventListener('mouseenter', function() {
        updateStars(index + 1);
    });
});

document.querySelector('.star-rating').addEventListener('mouseleave', function() {
    updateStars(selectedRating);
});

function updateStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('bi-star');
            star.classList.add('bi-star-fill', 'active');
        } else {
            star.classList.remove('bi-star-fill', 'active');
            star.classList.add('bi-star');
        }
    });
}

// Render reviews
function renderReviews() {
    const reviewsList = document.getElementById('reviewsList');
    
    reviewsList.innerHTML = reviewsData.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">
                        ${review.reviewer.charAt(0)}
                    </div>
                    <div class="reviewer-details">
                        <h4>${review.reviewer}</h4>
                        <span class="review-date">${review.date}</span>
                    </div>
                </div>
                <div class="review-stars">
                    ${generateStars(review.rating)}
                </div>
            </div>
            <p class="review-text">${review.text}</p>
            <div class="review-actions">
                <button class="action-btn" onclick="helpfulReview(${review.id})">
                    <i class="bi bi-hand-thumbs-up"></i> Helpful
                </button>
                <button class="action-btn report" onclick="reportReview(${review.id})">
                    <i class="bi bi-flag"></i> Report
                </button>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            starsHTML += '<i class="bi bi-star-fill"></i>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            starsHTML += '<i class="bi bi-star-half"></i>';
        } else {
            starsHTML += '<i class="bi bi-star"></i>';
        }
    }
    return starsHTML;
}

// Helpful button functionality
function helpfulReview(reviewId) {
    Swal.fire({
        icon: 'success',
        title: 'Thank You!',
        text: 'Your feedback has been recorded.',
        confirmButtonColor: '#667eea',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
    });
}

// Report review functionality
function reportReview(reviewId) {
    Swal.fire({
        title: 'Report Review',
        text: 'Why are you reporting this review?',
        input: 'select',
        inputOptions: {
            spam: 'Spam or Fake',
            offensive: 'Offensive Content',
            inappropriate: 'Inappropriate',
            other: 'Other'
        },
        inputPlaceholder: 'Select a reason',
        showCancelButton: true,
        confirmButtonText: 'Submit Report',
        confirmButtonColor: '#f5576c',
        cancelButtonColor: '#6c757d',
        inputValidator: (value) => {
            if (!value) {
                return 'You need to select a reason!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Reported!',
                text: 'Thank you for your report. We will review it shortly.',
                confirmButtonColor: '#667eea',
                timer: 2500,
                timerProgressBar: true
            });
        }
    });
}

// Form submission
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const rating = document.getElementById('ratingValue').value;
    const feedback = document.getElementById('feedback').value;
    
    // Validate rating
    if (rating === '0') {
        Swal.fire({
            icon: 'warning',
            title: 'Rating Required',
            text: 'Please select a star rating before submitting.',
            confirmButtonColor: '#667eea'
        });
        return;
    }
    
    // Show loading
    Swal.fire({
        title: 'Submitting Feedback...',
        text: 'Please wait',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    // Simulate API call
    setTimeout(() => {
        Swal.fire({
            icon: 'success',
            title: 'Feedback Submitted!',
            html: `
                <p>Thank you for your feedback!</p>
                <p><strong>Rating:</strong> ${rating} ⭐</p>
                <p>Your review helps the community make better decisions.</p>
            `,
            confirmButtonColor: '#667eea',
            confirmButtonText: 'Great!'
        }).then(() => {
            // Add new review to the list
            const newReview = {
                id: reviewsData.length + 1,
                reviewer: 'You',
                rating: parseInt(rating),
                text: feedback,
                date: 'Just now',
                timestamp: new Date()
            };
            
            reviewsData.unshift(newReview);
            renderReviews();
            
            // Reset form
            document.getElementById('feedbackForm').reset();
            selectedRating = 0;
            updateStars(0);
            
            // Scroll to reviews
            document.querySelector('.reviews-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }, 1500);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderReviews();
    
    // Show info message
    Swal.fire({
        icon: 'info',
        title: 'Leave Your Feedback',
        text: 'Help others by sharing your experience with this seller!',
        confirmButtonColor: '#667eea',
        timer: 3000,
        timerProgressBar: true
    });
});