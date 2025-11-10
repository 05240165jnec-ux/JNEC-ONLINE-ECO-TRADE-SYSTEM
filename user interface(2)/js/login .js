
    // Form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (!username || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate login process
            simulateLogin(username, password);
        });
    }
    
    // Signup button
    const signupButton = document.querySelector('.signup-button');
    if (signupButton) {
        signupButton.addEventListener('click', () => {
            window.location.href = '../HTML/signup.html';
        });
    }
    
    // Google login
    const googleButton = document.querySelector('.google-button');
    if (googleButton) {
        googleButton.addEventListener('click', () => {
            alert('Google authentication would be implemented here');
        });
    }
    
    // Simulate login process
    function simulateLogin(username, password) {
        const loginButton = document.querySelector('.login-button');
        const originalText = loginButton.innerHTML;
        
        // Show loading state
        loginButton.innerHTML = 'Logging in...';
        loginButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            loginButton.innerHTML = originalText;
            loginButton.disabled = false;
            
            // Show success message and redirect
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = '../html/Dashboard.html';
        }, 1500);
    };