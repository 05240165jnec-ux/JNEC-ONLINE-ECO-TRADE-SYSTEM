document.addEventListener('DOMContentLoaded', () => {
    // Get the password toggle icons and input fields
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const passwordInput = toggle.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            // Toggle the eye icon
            toggle.classList.toggle('fa-eye');
            toggle.classList.toggle('fa-eye-slash');
        });
    });

    // Handle screen transitions
    const signUpScreen = document.querySelector('.sign-up-screen');
    const confirmationScreen = document.querySelector('.confirmation-screen');
    const createAccountBtn = document.querySelector('.create-account-btn');

    createAccountBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission for now

        // Check if all fields are filled to simulate a successful sign-up
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');

        if (nameInput.value && emailInput.value && passwordInput.value && confirmPasswordInput.value) {
            // Hide sign-up screen and show confirmation screen
            signUpScreen.classList.remove('active');
            confirmationScreen.classList.add('active');
        } else {
            alert('Please fill in all the fields.');
        }
    });

    // You can add more functionality for the 'Next' button here if needed
    // For example, redirecting the user to another page
    const nextBtn = document.querySelector('.next-btn');
    nextBtn.addEventListener('click', () => {
        alert('Navigating to the next page...');
        // window.location.href = 'your-next-page.html';
    });
});