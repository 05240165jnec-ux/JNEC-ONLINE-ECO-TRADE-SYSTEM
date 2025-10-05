const aboutContent = `
Welcome to the JNEC Online Eco-Trade System — a platform designed to promote sustainability and responsible consumption within our college community. This system enables students and staff to buy, sell, or donate second-hand items such as textbooks, electronics, furniture, and other essentials.

Our goal is to:
• Encourage reuse of usable items to minimize waste.
• Support affordability for students by offering second-hand goods at lower prices.
• Create a connected campus where resources can be shared efficiently and ethically.

Key Features:
• Secure login and registration for buyers and sellers.
• Easy-to-use item listing and browsing.
• In-app feedback and rating to ensure trust and transparency.
• Admin dashboard for user management and report generation.

This initiative aligns with JNEC's commitment to environmental awareness and community support. Whether you’re decluttering your room or looking for affordable items, the Eco-Trade System is your sustainable solution.
`;

const logoSrc = "/mnt/data/ae41c583-91a2-4ab7-9aad-d00ba006df7e.png"; // Your uploaded logo path

document.getElementById("content").textContent = aboutContent;
document.getElementById("logo").src = logoSrc;

// Back button functionality
document.querySelector(".back-btn").addEventListener("click", () => {
  window.history.back();
});
