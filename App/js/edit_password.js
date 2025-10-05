// For edit button
document.getElementById("passwordForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {
    alert("New password and confirm password do not match!");
    return;
  }

  if (newPassword.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  alert("Password updated successfully!");
  // TODO: Send to backend here
});