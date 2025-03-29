function showMemberDetails(member) {
  // Hide all member details first
  hideAllMemberDetails();
  
  // Show the selected member's details
  const detailsSection = document.getElementById(`${member}-details`);
  if (detailsSection) {
    detailsSection.style.display = 'block';
    
    // Hide the main team content
    const aboutBanner = document.querySelector('.about--banner');
    const aboutOptions = document.querySelector('.about--options');
    if (aboutBanner) aboutBanner.style.display = 'none';
    if (aboutOptions) aboutOptions.style.display = 'none';
  }
}

function hideAllMemberDetails() {
  // Hide all member detail sections
  const detailsSections = document.querySelectorAll('.member-details-section');
  detailsSections.forEach(section => {
    section.style.display = 'none';
  });
  
  // Show the main team content
  const aboutBanner = document.querySelector('.about--banner');
  const aboutOptions = document.querySelector('.about--options');
  if (aboutBanner) aboutBanner.style.display = 'block';
  if (aboutOptions) aboutOptions.style.display = 'flex';
}

function showTeamSlide(slideId) {
  // Hide all slides
  const slides = document.querySelectorAll('.carousel-slide');
  slides.forEach(slide => {
    slide.classList.remove('active');
  });
  
  // Show the selected slide
  const selectedSlide = document.getElementById(slideId);
  if (selectedSlide) {
    selectedSlide.classList.add('active');
  }
}

// Initialize the team overview as active
document.addEventListener('DOMContentLoaded', function() {
  showTeamSlide('team-overview');
});

function openTeamModal(member) {
  const modal = document.getElementById(`${member}-modal`);
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }
}

function closeTeamModal(member) {
  const modal = document.getElementById(`${member}-modal`);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target.classList.contains('team-modal')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
} 