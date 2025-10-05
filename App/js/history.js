//For history
// Example actions for buttons
document.querySelectorAll(".btn-danger").forEach(button => {
  button.addEventListener("click", () => {
    alert("❌ Booking/Item has been cancelled or deleted!");
  });
});

document.querySelectorAll(".btn-warning").forEach(button => {
  button.addEventListener("click", () => {
    alert("✏️ Edit item functionality coming soon!");
  });
});