// Navigation scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Hero particles
document.addEventListener('DOMContentLoaded', function() {
  const particlesContainer = document.querySelector('.hero-particles');
  
  // Create particles
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    
    // Random size
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random animation delay
    const delay = Math.random() * 6;
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
  }
  
  // Initialize ScrollReveal if available
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.hero-content', {
      delay: 200,
      distance: '50px',
      duration: 1000,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      origin: 'left',
      reset: false
    });
    
    ScrollReveal().reveal('.feature-card', {
      delay: 100,
      distance: '30px',
      duration: 800,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      origin: 'bottom',
      interval: 200,
      reset: false
    });
    
    ScrollReveal().reveal('.product-card', {
      delay: 100,
      distance: '30px',
      duration: 800,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      origin: 'bottom',
      interval: 200,
      reset: false
    });
    
    ScrollReveal().reveal('.testimonial-card', {
      delay: 100,
      distance: '30px',
      duration: 800,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      origin: 'bottom',
      interval: 200,
      reset: false
    });
    
    ScrollReveal().reveal('.stat-card', {
      delay: 100,
      distance: '30px',
      duration: 800,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      origin: 'bottom',
      interval: 100,
      reset: false
    });
  }
  
  // Product card hover effects enhancement
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.product-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.product-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0)';
        icon.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -6px rgba(0, 0, 0, 0.1)';
      }
    });
  });
  
  // Animate stat values on scroll
  const statCards = document.querySelectorAll('.stat-card');
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value + (element.dataset.suffix || '');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };
  
  // Intersection Observer for stat animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statCard = entry.target;
        const statValue = statCard.querySelector('.stat-value');
        if (statValue && !statValue.dataset.animated) {
          const endValue = parseInt(statValue.textContent);
          statValue.dataset.animated = true;
          animateValue(statValue, 0, endValue, 2000);
        }
      }
    });
  }, { threshold: 0.5 });
  
  statCards.forEach(card => {
    observer.observe(card);
  });
  
  // Add subtle parallax effect to hero section
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
  });
});