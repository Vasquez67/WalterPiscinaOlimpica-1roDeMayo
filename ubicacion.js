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
        window.location.href = 'galeria.html';
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

// Inicializar partículas al cargar la página
window.addEventListener('load', () => {
  createParticles();
});
