// Wait for document to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // ===== Typewriter Effect =====
  const text = "I am a Lecturer";
  const typeTarget = document.createElement("span");
  typeTarget.classList.add("typing-text");

  const heading = document.querySelector(".hero .display-4"); // Updated selector for Bootstrap
  if (heading) {
    heading.appendChild(document.createElement("br"));
    heading.appendChild(typeTarget);

    let index = 0;
    function typeWriter() {
      if (index < text.length) {
        typeTarget.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
      }
    }
    typeWriter();
  }

  // ===== Smooth Scroll with Bootstrap nav =====
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link"); // Updated selector for Bootstrap navbar

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      // Only prevent default for links to sections on the same page
      const href = link.getAttribute("href");
      if (href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          // Account for fixed navbar height
          const navbarHeight = document.querySelector(".navbar").offsetHeight;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
          
          // Close mobile menu if open
          const navbarToggler = document.querySelector(".navbar-toggler");
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            navbarToggler.click();
          }
        }
      }
    });
  });

  // ===== Navbar Active Highlight =====
  function updateActiveNavLink() {
    let current = "";
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Offset for navbar
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Initial call to set active link
  updateActiveNavLink();
  
  // Update active link on scroll
  window.addEventListener("scroll", updateActiveNavLink);
  
  // Initialize Bootstrap tooltips if any
  if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  
  // Add animation class to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .section-title, .hero-content');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        element.classList.add('fade-in-up');
      }
    });
  };
  
  // Initial check for elements in view
  animateOnScroll();
  
  // Check for elements on scroll
  window.addEventListener('scroll', animateOnScroll);
});
