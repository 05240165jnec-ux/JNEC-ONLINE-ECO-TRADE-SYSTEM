// Sample dynamic data for contact info
const contactData = {
  email: "supprt.jnec@rub.edu.bt",
  phone: "+97517625321",
  address: "JNEC, Dewathang, Samdrupjongkhar"
};

function populateContactInfo(data) {
  document.getElementById("email").textContent = data.email;
  document.getElementById("phone").textContent = data.phone;
  document.getElementById("address").textContent = data.address;
}

// Back button functionality (example: go back to previous page)
document.querySelector(".back-btn").addEventListener("click", () => {
  window.history.back();
});

// Populate on page load
window.onload = () => {
  populateContactInfo(contactData);
};
