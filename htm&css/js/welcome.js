// Initialize Lucide icons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Animate hamburger menu
  const spans = menuToggle.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    
    // Reset hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar background change on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.10) 100%)';
    navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.25)';
  } else {
    navbar.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%)';
    navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
  }
  
  lastScroll = currentScroll;
});

// Add intersection observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.feature-card, .value-card, .contact-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// Add parallax effect to hero section (REMOVED - was causing overlap)
// window.addEventListener('scroll', () => {
//   const scrolled = window.pageYOffset;
//   const heroSection = document.querySelector('.hero-section');
//   if (heroSection) {
//     heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
//   }
// });

// Add hover effect sound (optional - can be removed if not needed)
const cards = document.querySelectorAll('.feature-card, .value-card, .contact-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// Add typing effect to hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  let i = 0;
  
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  // Start typing effect after page load
  setTimeout(typeWriter, 500);
}

// Cursor trail effect removed - disabled by user
// (You can enable it again by uncommenting this section)

// Add scroll progress indicator
const createScrollProgress = () => {
  const progressBar = document.createElement('div');
  progressBar.style.position = 'fixed';
  progressBar.style.top = '0';
  progressBar.style.left = '0';
  progressBar.style.height = '3px';
  progressBar.style.background = 'linear-gradient(90deg, var(--primary-green), var(--accent-light))';
  progressBar.style.zIndex = '10000';
  progressBar.style.transition = 'width 0.1s ease';
  progressBar.style.width = '0%';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
};

createScrollProgress();

// Add button ripple effect
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .btn-primary, .btn-secondary {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 30, 0.92) 100%)';
    navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6)';
  } else {
    navbar.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.92) 0%, rgba(20, 20, 30, 0.88) 100%)';
    navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
  }
  
  lastScroll = currentScroll;
});

console.log('JNEC Eco-Trade - Website loaded successfully! 🌱');