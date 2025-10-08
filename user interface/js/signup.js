// DOM elements
const form = document.getElementById("signupForm");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const passwordToggle = document.getElementById("passwordToggle");
const confirmPasswordToggle = document.getElementById("confirmPasswordToggle");

// Toggle password visibility
function togglePassword(input, btn) {
  const icon = btn.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.setAttribute("data-lucide", "eye");
  } else {
    input.type = "password";
    icon.setAttribute("data-lucide", "eye-off");
  }

  // refresh Lucide icons after attribute change
  lucide.createIcons();
}

passwordToggle.addEventListener("click", () =>
  togglePassword(passwordInput, passwordToggle)
);

confirmPasswordToggle.addEventListener("click", () =>
  togglePassword(confirmPasswordInput, confirmPasswordToggle)
);

// Form validation
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const emailPhone = document.getElementById("emailPhone").value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (!name) {
    alert("Please enter your name");
    return;
  }
  if (!emailPhone) {
    alert("Please enter your email or phone number");
    return;
  }
  if (!password) {
    alert("Please enter a password");
    return;
  }
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Simulate successful signup
  alert("Account created successfully!");
  window.location.href = "../html/login.html"; // redirect back to login
});
