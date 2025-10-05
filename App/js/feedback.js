// Back button
function goBack() {
  alert("Going back...");
  // In real app: window.history.back();
}

// Star rating functionality
const stars = document.querySelectorAll("#starContainer i");
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener("click", function () {
    selectedRating = this.getAttribute("data-value");
    updateStars(selectedRating);
  });
});

function updateStars(rating) {
  stars.forEach(star => {
    if (star.getAttribute("data-value") <= rating) {
      star.classList.add("active", "fas");
      star.classList.remove("far");
    } else {
      star.classList.remove("active", "fas");
      star.classList.add("far");
    }
  });
}

// Submit feedback
function submitFeedback() {
  const comment = document.getElementById("commentBox").value;
  const alertContainer = document.getElementById("alertContainer");

  alertContainer.innerHTML = "";

  if (selectedRating === 0) {
    showAlert("Please select a star rating!", "warning");
    return;
  }

  if (comment.trim() === "") {
    showAlert("Please write a comment before submitting.", "warning");
    return;
  }

  showAlert("Thank you for your feedback!", "success");

  // Reset form
  selectedRating = 0;
  updateStars(0);
  document.getElementById("commentBox").value = "";
}

// Show Bootstrap-style alert
function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.getElementById("alertContainer").appendChild(alertDiv);

  setTimeout(() => {
    if (alertDiv) alertDiv.remove();
  }, 4000);
}
