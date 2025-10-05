// Tab Navigation
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

// Back Button - Goes to previous page
function goBack() {
    // Check if there's a previous page in history
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // If no history, go to dashboard
        window.location.href = '../Html/history.html';
    }
}

// Profile Photo Upload
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

// Profile Form Submission
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
        
        // Save data (in real app, this would be an API call)
        console.log('Profile Data:', formData);
        
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

// Password Change Form
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
        
        // Simulate password change (in real app, this would be an API call)
        console.log('Password changed successfully');
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

// Notification Preferences
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
        
        // Save preferences (in real app, this would be an API call)
        console.log('Notification Preferences:', preferences);
        showNotification('Notification preferences saved!', 'success');
    });
}

// Rating Stars
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

// Feedback Form Submission
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
        
        // Submit feedback (in real app, this would be an API call)
        console.log('Feedback Data:', feedbackData);
        showNotification('Thank you for your feedback!', 'success');
        
        // Reset form
        feedbackForm.reset();
        currentRating = 0;
        updateStars(0);
    });
}

// Notification System
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

// Location Edit Function
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

// Logout Functionality
const logoutBtn = document.querySelector('.logout-link');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            showNotification('Logging out...', 'info');
            setTimeout(() => {
                // Redirect to login page (adjust path as needed)
                window.location.href = '../Html/login.html';
            }, 1500);
        }
    });
}

// Form Input Animations and Focus Effects
const formInputs = document.querySelectorAll('input, textarea, select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Auto-save draft for feedback (saves to memory)
let feedbackDraft = {};
const feedbackInputs = document.querySelectorAll('#feedback input, #feedback textarea, #feedback select');

feedbackInputs.forEach(input => {
    input.addEventListener('input', function() {
        feedbackDraft[this.id] = this.value;
        console.log('Draft auto-saved');
    });
});

// Load saved feedback draft on page load
function loadFeedbackDraft() {
    if (Object.keys(feedbackDraft).length > 0) {
        Object.keys(feedbackDraft).forEach(key => {
            const input = document.getElementById(key);
            if (input && feedbackDraft[key]) {
                input.value = feedbackDraft[key];
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('JNEC ECO-TRADE Settings Page Loaded Successfully');
    
    // Load any saved preferences
    loadUserPreferences();
    
    // Load feedback draft if exists
    loadFeedbackDraft();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Simulate loading user preferences
function loadUserPreferences() {
    // In a real application, this would load from a database or API
    const savedPreferences = {
        emailNotifications: true,
        newItemsAlert: true,
        purchaseUpdates: true,
        priceDrops: false,
        marketing: false
    };
    
    console.log('Loaded user preferences:', savedPreferences);
}

// Mobile sidebar toggle (for responsive design)
function toggleSidebar() {
    const sidebar = document.querySelector('.left-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Close sidebar when clicking outside (mobile)
document.addEventListener('click', function(e) {
    const sidebar = document.querySelector('.left-sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    
    if (sidebar && window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !sidebarToggle?.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Prevent form submission on Enter key (except in textarea)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});

// Character count for bio textarea
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

console.log('All settings page functionality initialized successfully!');