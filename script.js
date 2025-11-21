// ==================== MOBILE MENU TOGGLE ====================
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

// ==================== SMOOTH SCROLL TO TOP ====================
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== CONTACT FORM HANDLING ====================
function handleSubmit(event) {
  event.preventDefault();
  
  // Show success message
  alert('Thank you for your message! I will get back to you within 24 hours. 🚀');
  
  // Reset form
  event.target.reset();
  
  // Optional: You can integrate with email services like EmailJS, Formspree, or your backend here
  // Example with EmailJS:
  // emailjs.sendForm('service_4b07pqk', 'YOUR_TEMPLATE_ID', event.target, 'YOUR_PUBLIC_KEY')
  //   .then(() => {
  //     alert('Message sent successfully!');
  //     event.target.reset();
  //   })
  //   .catch((error) => {
  //     alert('Failed to send message. Please try again.');
  //     console.error('Error:', error);
  //   });
}

// ==================== CLOSE MOBILE MENU ON LINK CLICK ====================
document.addEventListener('DOMContentLoaded', function() {
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navLinks').classList.remove('active');
    });
  });

  // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    });
  });

  // ==================== SCROLL REVEAL ANIMATIONS ====================
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections for animation
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-up');
    observer.observe(section);
  });

  // ==================== NAVBAR SCROLL EFFECT ====================
  let lastScroll = 0;
  const navbar = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }

    lastScroll = currentScroll;
  });

  // ==================== SKILL BAR ANIMATION ====================
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ==================== TYPING EFFECT (Optional Enhancement) ====================
  // Uncomment if you want a typing effect on the hero subtitle
  /*
  const subtitle = document.querySelector('.hero-content .subtitle');
  const text = subtitle.textContent;
  subtitle.textContent = '';
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }

  setTimeout(typeWriter, 1000);
  */

  // ==================== ACTIVE NAVIGATION HIGHLIGHT ====================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = '#00a3e0';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);

  // ==================== SHOW BACK TO TOP BUTTON ON SCROLL ====================
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  });

  // Initialize button as hidden
  backToTopBtn.style.transition = 'opacity 0.3s, visibility 0.3s';
  backToTopBtn.style.opacity = '0';
  backToTopBtn.style.visibility = 'hidden';

  // ==================== FORM VALIDATION ENHANCEMENT ====================
  const contactForm = document.querySelector('.contact-form');
  const formInputs = contactForm.querySelectorAll('input, textarea, select');

  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() === '' && this.hasAttribute('required')) {
        this.style.borderColor = '#ff4444';
      } else {
        this.style.borderColor = '#00a3e0';
      }
    });

    input.addEventListener('focus', function() {
      this.style.borderColor = '#00a3e0';
    });
  });

  // ==================== STATS COUNTER ANIMATION ====================
  const stats = document.querySelectorAll('.stat-number');
  
  const countUp = (element) => {
    const target = element.textContent;
    const isNumber = /^\d+$/.test(target);
    
    if (!isNumber) return; // Skip if not a pure number
    
    const duration = 2000;
    const increment = parseInt(target) / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= parseInt(target)) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + '+';
      }
    }, 16);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => statsObserver.observe(stat));

  // ==================== PREVENT FORM SPAM ====================
  let formSubmitCount = 0;
  const maxSubmits = 3;

  const originalSubmit = window.handleSubmit;
  window.handleSubmit = function(event) {
    event.preventDefault();
    
    if (formSubmitCount >= maxSubmits) {
      alert('You have reached the maximum number of submissions. Please contact me directly via email.');
      return;
    }
    
    formSubmitCount++;
    originalSubmit(event);
  };

  // ==================== LAZY LOAD IMAGES ====================
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // ==================== CONSOLE MESSAGE (Easter Egg) ====================
  console.log('%c👋 Hey there, fellow developer!', 'font-size: 20px; font-weight: bold; color: #00a3e0;');
  console.log('%cLooking at the code? I like your style!', 'font-size: 14px; color: #666;');
  console.log('%cLet\'s connect: mmanuelcollins@gmail.com', 'font-size: 14px; color: #00a3e0;');

  // ==================== PERFORMANCE MONITORING (Optional) ====================
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    });
  }
});

// ==================== UTILITY FUNCTIONS ====================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ==================== COPY EMAIL TO CLIPBOARD (Enhancement) ====================
document.addEventListener('DOMContentLoaded', function() {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  
  emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const email = this.getAttribute('href').replace('mailto:', '');
      
      if (navigator.clipboard) {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
          const originalText = this.textContent;
          this.textContent = '✓ Email copied!';
          setTimeout(() => {
            this.textContent = originalText;
            window.location.href = this.getAttribute('href');
          }, 1500);
        });
      }
    });
  });
});