document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    this.setAttribute('aria-expanded', this.classList.contains('active'));
  });

  // Improved Smooth Scrolling with Header Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Get the navbar height (use the actual navbar element)
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        
        // Calculate target position with offset
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        // Smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.classList.remove('no-scroll');
          hamburger.setAttribute('aria-expanded', 'false');
        }
        
        // Update URL
        history.pushState(null, null, targetId);
      }
    });
  });

  // Sticky Header - Make sure you're using the correct element
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('header-scrolled', window.scrollY > 50);
  });

  // Back to Top Button
  const backToTop = document.createElement('a');
  backToTop.href = '#';
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', function() {
    backToTop.classList.toggle('show', window.scrollY > 300);
  });

  // Optimized Scroll Animations
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.section > *');
    const windowHeight = window.innerHeight;
    
    elements.forEach((element, index) => {
      const elementPosition = element.getBoundingClientRect().top;
      
      if (elementPosition < windowHeight - 100 && !element.classList.contains('animated')) {
        element.classList.add('animated');
        element.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        element.classList.add('fade-in');
      }
    });
  };


  // Throttle scroll events for better performance
  let isScrolling;
  window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(animateOnScroll, 50);
  }, false);

  animateOnScroll(); // Run once on load
// Add this to your existing JS
console.log('Checking resume button visibility:');
const resumeBtn = document.querySelector('.resume-btn');
if (resumeBtn) {
  console.log('Button exists in DOM');
  console.log('Computed display:', window.getComputedStyle(resumeBtn).display);
  console.log('Computed visibility:', window.getComputedStyle(resumeBtn).visibility);
  console.log('Parent overflow:', window.getComputedStyle(resumeBtn.parentElement).overflow);
}

  // Skill cards animation
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Project cards animation
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Resume download tracking
  document.querySelectorAll('[download]').forEach(btn => {
    btn.addEventListener('click', function() {
      console.log('Resume downloaded');
      // Analytics tracking would go here
    });
  });
});
