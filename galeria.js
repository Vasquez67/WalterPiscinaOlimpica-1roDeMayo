// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Navigation functionality
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.getAttribute('data-page');
    
    // Efecto visual al hacer click
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 150);

    switch (page) {
      case 'inicio':
        window.location.href = 'inicio.html';
        break;
      case 'modelado_3D':
        window.location.href = 'modelado_3D.html';
        break;
      case 'ubicacion':
        window.location.href = 'ubicacion.html';
        break;
      case 'historia':
        window.location.href = 'historia.html';
        break;
      case 'galeria':
        // Ya estamos en esta página
        break;
      case 'contacto':
        window.location.href = 'contacto.html';
        break;
    }
  });
});

// Particles animation
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    particlesContainer.appendChild(particle);
  }
}

// Gallery functionality
function initGallery() {
  const images = [
    { url: "https://cdn.glitch.global/6560f157-1f37-4242-9d97-edc2228dad93/5.jpg?v=1748298480752", 
      alt: "Vista aérea de la piscina olímpica" },
    { url: "https://cdn.glitch.global/6560f157-1f37-4242-9d97-edc2228dad93/21.jpg?v=1748308995265", 
      alt: "Granizada colapsa tinglado de la piscina" },
    { url: "https://cdn.glitch.global/6560f157-1f37-4242-9d97-edc2228dad93/6.jpg?v=1748298486522", 
      alt: "Competencia nacional de natación" },
    { url: "https://cdn.glitch.global/6560f157-1f37-4242-9d97-edc2228dad93/9.jpg?v=1748298520305", 
      alt: "Celebración tras una victoria" },
    { url: "https://cdn.glitch.global/6560f157-1f37-4242-9d97-edc2228dad93/7.jpg?v=1748298494158", 
      alt: "Diseño arquitectónico del complejo" },
    { url: "https://cdn.glitch.global/6560f157-1f37-4242-9d97-edc2228dad93/4.jpg?v=1748298471528", 
      alt: "Piscina olímpica al atardecer" }, 
    { url: "https://cdn.glitch.global/6560f157-1f37-4242-9d97-edc2228dad93/1.jpg?v=1748298436717", 
      alt: "Vista por dentro la piscina olímpica" },
    { url: "https://cdn.glitch.global/6560f157-1f37-4242-9d97-edc2228dad93/11.jpg?v=1748298537750",
      alt: "Vista frontal de la piscina olímpica 1ro de mayo" }
  ];

  const gallery = document.getElementById("gallery");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("modalCaption");
  const closeBtn = document.getElementById("closeModal");

  // Create gallery items
  images.forEach((image, index) => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.style.animationDelay = `${index * 0.1}s`;
    
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    
    const img = document.createElement("img");
    img.src = image.url;
    img.alt = image.alt;
    img.loading = "lazy";
    
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    
    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = image.alt;
    
    imgContainer.appendChild(img);
    imgContainer.appendChild(overlay);
    imgContainer.appendChild(caption);
    card.appendChild(imgContainer);
    gallery.appendChild(card);
    
    // Click event for modal
    imgContainer.addEventListener('click', () => {
      modal.style.display = "flex";
      modalImg.src = image.url;
      captionText.textContent = image.alt;
    });
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
  });

  // Close when clicking outside image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Initialize everything when page loads
window.addEventListener('load', () => {
  createParticles();
  initGallery();
});