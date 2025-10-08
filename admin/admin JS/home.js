// home.js

// Enhanced Navigation function for dashboard cards
function navigateTo(section) {
    switch(section) {
        case 'items':
            window.location.href = 'Item-Management.html';
            break;
        case 'listings':
            window.location.href = 'Active-listings.html';
            break;
        case 'categories':
            window.location.href = 'Item-category.html';
            break;
        case 'users':
            window.location.href = 'Manage-user.html';
            break;
        case 'feedback':
            window.location.href = 'feedback.html';
            break;
        case 'generate-report':
            alert('Generate Report interface will be created soon!');
            break;
        case 'profile':
            alert('Profile settings interface will be created soon!');
            break;
        case 'switch-account':
            alert('Switch Account interface will be created soon!');
            break;
        case 'logout':
            if (confirm('Are you sure you want to logout?')) {
                alert('Logging out... (Logout functionality will be implemented)');
            }
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
    
    // Navigate if it's not the home section
    if (section !== 'home') {
        navigateTo(section);
    }
}

// Navigate to specific section (for sidebar items)
function navigateToSection(section) {
    navigateTo(section);
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

// Enhanced card navigation with animations
function navigateTo(section) {
    const card = event.currentTarget;
    
    // Add click animation
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
    
    // Navigation logic
    switch(section) {
        case 'items':
            window.location.href = 'Item-Management.html';
            break;
        case 'listings':
            window.location.href = 'Active-listings.html';
            break;
        case 'categories':
            window.location.href = 'Item-category.html';
            break;
        case 'users':
            window.location.href = 'Manage-user.html';
            break;
        case 'feedback':
            window.location.href = 'feedback.html';
            break;
        default:
            console.log('Navigation not implemented for:', section);
    }
}
function navigateToSection(section) {
    if(section === 'generate-report') {
        window.location.href = "generate-report.html";
    }
    // keep your other navigation logic...
}
