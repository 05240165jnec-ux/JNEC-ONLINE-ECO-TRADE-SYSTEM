// ===== NOTIFICATION DROPDOWN =====
const notificationBtn = document.getElementById('notificationBtn');
const notificationDropdown = document.getElementById('notificationDropdown');

if (notificationBtn && notificationDropdown) {
    notificationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        notificationDropdown.classList.toggle('active');
        // Close profile dropdown if open
        if (profileDropdown) {
            profileDropdown.classList.remove('active');
        }
    });
}

// ===== PROFILE DROPDOWN =====
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');

if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
        // Close notification dropdown if open
        if (notificationDropdown) {
            notificationDropdown.classList.remove('active');
        }
    });
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (notificationDropdown && !notificationDropdown.contains(e.target) && e.target !== notificationBtn) {
        notificationDropdown.classList.remove('active');
    }
    if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== profileBtn) {
        profileDropdown.classList.remove('active');
    }
});

// Mark all notifications as read
const markReadBtn = document.querySelector('.mark-read-btn');
if (markReadBtn) {
    markReadBtn.addEventListener('click', function() {
        const unreadItems = document.querySelectorAll('.notification-item.unread');
        unreadItems.forEach(item => {
            item.classList.remove('unread');
        });
        showNotification('All notifications marked as read', 'success');
    });
}

// ===== TAB NAVIGATION =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// ===== PROFILE PHOTO UPLOAD =====
document.getElementById('photoUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    
    if (file) {
        // Check file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('File size must be less than 5MB', 'error');
            return;
        }
        
        // Check file type
        if (!file.type.match('image/(jpg|jpeg|png)')) {
            showNotification('Only JPG and PNG formats are allowed', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
            showNotification('Profile photo updated successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
});

// ===== PROFILE FORM SUBMISSION =====
const profileForm = document.querySelector('.profile-form');
if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            bio: document.getElementById('bio').value
        };
        
        // Validate form
        if (!formData.fullName.trim()) {
            showNotification('Please enter your full name', 'error');
            return;
        }
        
        if (!validateEmail(formData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (!formData.phone.trim()) {
            showNotification('Please enter your phone number', 'error');
            return;
        }
        
        // Update sidebar location if changed
        if (formData.location) {
            const locationValue = document.querySelector('.location-value');
            if (locationValue) {
                locationValue.textContent = formData.location;
            }
        }
        
        showNotification('Profile updated successfully!', 'success');
    });
}

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== PASSWORD CHANGE FORM =====
const passwordForm = document.querySelector('.password-form');
if (passwordForm) {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Real-time password strength validation
    newPasswordInput.addEventListener('input', function() {
        validatePassword(this.value);
    });
    
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            showNotification('Please fill in all password fields', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match!', 'error');
            return;
        }
        
        if (!isPasswordValid(newPassword)) {
            showNotification('Password does not meet requirements', 'error');
            return;
        }
        
        showNotification('Password changed successfully!', 'success');
        passwordForm.reset();
        resetPasswordValidation();
    });
}

// Password Validation Function
function validatePassword(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password)
    };
    
    // Update visual feedback
    document.getElementById('length').classList.toggle('valid', requirements.length);
    document.getElementById('uppercase').classList.toggle('valid', requirements.uppercase);
    document.getElementById('lowercase').classList.toggle('valid', requirements.lowercase);
    document.getElementById('number').classList.toggle('valid', requirements.number);
    
    return Object.values(requirements).every(val => val === true);
}

function isPasswordValid(password) {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password);
}

function resetPasswordValidation() {
    const items = ['length', 'uppercase', 'lowercase', 'number'];
    items.forEach(item => {
        document.getElementById(item).classList.remove('valid');
    });
}

// ===== NOTIFICATION PREFERENCES =====
const notificationToggles = document.querySelectorAll('.notification-setting input[type="checkbox"]');
notificationToggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
        const setting = this.closest('.notification-setting').querySelector('h3').textContent;
        const status = this.checked ? 'enabled' : 'disabled';
        console.log(`${setting}: ${status}`);
    });
});

// Save Notification Preferences
const saveNotificationBtn = document.querySelector('#notification .btn-primary');
if (saveNotificationBtn) {
    saveNotificationBtn.addEventListener('click', function() {
        const preferences = {};
        notificationToggles.forEach((toggle) => {
            const setting = toggle.closest('.notification-setting').querySelector('h3').textContent;
            preferences[setting] = toggle.checked;
        });
        
        showNotification('Notification preferences saved!', 'success');
    });
}

// ===== RATING STARS =====
const stars = document.querySelectorAll('.star');
let currentRating = 0;

stars.forEach(star => {
    star.addEventListener('click', function() {
        currentRating = parseInt(this.getAttribute('data-rating'));
        updateStars(currentRating);
    });
    
    star.addEventListener('mouseenter', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
        updateStars(rating);
    });
});

const ratingContainer = document.querySelector('.rating-stars');
if (ratingContainer) {
    ratingContainer.addEventListener('mouseleave', function() {
        updateStars(currentRating);
    });
}

function updateStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.textContent = '★';
            star.classList.add('active');
        } else {
            star.textContent = '☆';
            star.classList.remove('active');
        }
    });
}

// ===== FEEDBACK FORM SUBMISSION =====
const feedbackForm = document.querySelector('.feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const feedbackData = {
            type: document.getElementById('feedbackType').value,
            subject: document.getElementById('feedbackSubject').value,
            message: document.getElementById('feedbackMessage').value,
            rating: currentRating,
            followUp: document.getElementById('followUp').checked
        };
        
        // Validation
        if (!feedbackData.type) {
            showNotification('Please select a feedback type', 'error');
            return;
        }
        
        if (!feedbackData.subject.trim()) {
            showNotification('Please enter a subject', 'error');
            return;
        }
        
        if (!feedbackData.message.trim()) {
            showNotification('Please enter your feedback message', 'error');
            return;
        }
        
        if (currentRating === 0) {
            showNotification('Please rate your experience', 'error');
            return;
        }
        
        showNotification('Thank you for your feedback!', 'success');
        
        // Reset form
        feedbackForm.reset();
        currentRating = 0;
        updateStars(0);
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.toast-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `toast-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== LOCATION EDIT FUNCTION =====
function editLocation() {
    const locationValue = document.querySelector('.location-value');
    const currentLocation = locationValue.textContent;
    
    const newLocation = prompt('Enter new location:', currentLocation);
    if (newLocation && newLocation.trim() !== '') {
        locationValue.textContent = newLocation.trim();
        
        // Update location in profile form
        const locationInput = document.getElementById('location');
        if (locationInput) {
            locationInput.value = newLocation.trim();
        }
        
        showNotification('Location updated successfully!', 'success');
    }
}

// ===== LOGOUT FUNCTIONALITY =====
const logoutBtn = document.querySelector('.logout-link');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            showNotification('Logging out...', 'info');
            setTimeout(() => {
                window.location.href = '../Html/login.html';
            }, 1500);
        }
    });
}

// ===== CHARACTER COUNT FOR BIO TEXTAREA =====
const bioTextarea = document.getElementById('bio');
if (bioTextarea) {
    const maxLength = 500;
    const charCountDiv = document.createElement('div');
    charCountDiv.className = 'char-count';
    charCountDiv.style.cssText = 'text-align: right; font-size: 12px; color: #666; margin-top: 5px;';
    bioTextarea.parentElement.appendChild(charCountDiv);
    
    bioTextarea.addEventListener('input', function() {
        const remaining = maxLength - this.value.length;
        charCountDiv.textContent = `${this.value.length}/${maxLength} characters`;
        
        if (remaining < 50) {
            charCountDiv.style.color = '#dc2626';
        } else {
            charCountDiv.style.color = '#666';
        }
    });
    
    // Set initial count
    bioTextarea.dispatchEvent(new Event('input'));
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('JNEC ECO-TRADE Settings Page Loaded Successfully');
    document.documentElement.style.scrollBehavior = 'smooth';
});

console.log('All settings page functionality initialized successfully!');