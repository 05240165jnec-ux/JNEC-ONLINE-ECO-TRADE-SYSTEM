// logout.js

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

// Show logout confirmation modal
function showLogoutConfirmation() {
    const modal = document.getElementById('logout-modal');
    modal.style.display = 'flex';
    
    // Add escape key listener
    document.addEventListener('keydown', handleEscapeKey);
}

// Hide logout confirmation modal
function hideLogoutConfirmation() {
    const modal = document.getElementById('logout-modal');
    modal.style.display = 'none';
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleEscapeKey);
}

// Handle escape key press
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        hideLogoutConfirmation();
    }
}

// Perform logout with progress animation
function performLogout() {
    const modal = document.getElementById('logout-modal');
    const progressContainer = document.getElementById('logout-progress');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    // Hide modal and show progress
    modal.style.display = 'none';
    progressContainer.style.display = 'flex';
    
    // Simulate logout process with progress animation
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressFill.style.width = `${progress}%`;
        
        if (progress === 25) {
            progressText.textContent = 'Closing active sessions...';
        } else if (progress === 50) {
            progressText.textContent = 'Clearing cache...';
        } else if (progress === 75) {
            progressText.textContent = 'Securing data...';
        } else if (progress === 100) {
            progressText.textContent = 'Redirecting to login...';
            clearInterval(interval);
            
            // Redirect to login page after completion
            setTimeout(() => {
                window.location.href = '../admin HTML/welcome.html';
            }, 1000);
        }
    }, 100);
}

// Close modal when clicking outside
document.getElementById('logout-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideLogoutConfirmation();
    }
});

// Auto-update session time
document.addEventListener('DOMContentLoaded', function() {
    // Update current session time
    updateSessionTime();
    
    // Update session time every minute
    setInterval(updateSessionTime, 60000);
});

function updateSessionTime() {
    // This would normally calculate actual session duration
    // For demo, we'll use a fixed time
    const sessionElement = document.querySelector('.detail-item .detail-value');
    if (sessionElement) {
        sessionElement.textContent = '2 hours 15 minutes';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const popup = document.getElementById('notificationPopup');
        if (popup.classList.contains('show')) {
            popup.classList.remove('show');
        }
        
        const modal = document.getElementById('logout-modal');
        if (modal.style.display === 'flex') {
            hideLogoutConfirmation();
        }
    }
});