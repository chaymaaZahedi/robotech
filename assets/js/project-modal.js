document.addEventListener('DOMContentLoaded', function() {
  // Get all project triggers
  const projectTriggers = document.querySelectorAll('.project-trigger');
  const modals = document.querySelectorAll('.project-modal');
  const closeButtons = document.querySelectorAll('.close-modal');

  // Function to show modal
  function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      // Trigger reflow
      modal.offsetHeight;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      
      // Initialize carousel for this modal
      initializeCarousel(modal);
    }
  }

  // Function to hide modal
  function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
      }, 300); // Match the transition duration
    }
  }

  // Carousel functionality
  function initializeCarousel(modal) {
    const carousel = modal.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;

    // Create navigation dots
    const dotsContainer = modal.querySelector('.carousel-dots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    const nextButton = modal.querySelector('.carousel-button.next');
    const prevButton = modal.querySelector('.carousel-button.prev');

    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    // Add event listeners for next and previous buttons
    nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    });

    prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });

    // Add event listeners for dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
      });
    });

    // Add event listeners for modal interactions
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        hideModal();
      }
    });
  }

  // Add click event listeners to project triggers
  projectTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const projectId = this.getAttribute('data-project');
      showModal(projectId + '-project');
    });
  });

  // Add click event listeners to close buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.project-modal');
      if (modal) {
        hideModal(modal.id);
      }
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('project-modal')) {
      hideModal(e.target.id);
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.style.display === 'block') {
          hideModal(modal.id);
        }
      });
    }
  });

  // Prevent modal from closing when clicking inside the content
  document.querySelectorAll('.project-modal--content').forEach(content => {
    content.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
}); 