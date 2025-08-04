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
        // Ya estamos en esta página
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

// Three.js Location Pin Model
class LocationPin3D {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.pinGroup = new THREE.Group();
    this.animationId = null;
    this.time = 0;
    
    this.init();
  }
  
  init() {
    const container = document.getElementById('threejs-container');
    const rect = container.getBoundingClientRect();
    
    this.renderer.setSize(rect.width, rect.height);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    
    container.appendChild(this.renderer.domElement);
    
    this.createScene();
    this.setupLights();
    this.setupCamera();
    this.animate();
    
    // Hide loading screen after delay
    setTimeout(() => {
      document.getElementById('loadingScreen').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
      }, 500);
    }, 1500);
    
    window.addEventListener('resize', () => this.onWindowResize());
  }
  
  createScene() {
    // Create the location pin
    this.createPin();
    this.scene.add(this.pinGroup);
  }
  
  createPin() {
    // Pin base (sphere)
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff0000,
      shininess: 100
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 0.3;
    
    // Pin stick (cylinder)
    const cylinderGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
    const cylinderMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xcccccc,
      shininess: 50
    });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.y = -0.5;
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff5555,
      transparent: true,
      opacity: 0.5
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    
    this.pinGroup.add(sphere);
    this.pinGroup.add(cylinder);
    this.pinGroup.add(glow);
  }
  
  setupLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    this.scene.add(directionalLight);
    
    // Point light inside the pin
    const pointLight = new THREE.PointLight(0xff0000, 1, 2);
    pointLight.position.set(0, 0.3, 0);
    this.pinGroup.add(pointLight);
  }
  
  setupCamera() {
    this.camera.position.set(0, 0, 3);
    this.camera.lookAt(0, 0, 0);
  }
  
  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.time += 0.01;
    
    // Gentle bobbing animation
    this.pinGroup.position.y = Math.sin(this.time * 2) * 0.1;
    
    // Rotation
    this.pinGroup.rotation.y = this.time * 0.5;
    
    this.renderer.render(this.scene, this.camera);
  }
  
  onWindowResize() {
    const container = document.getElementById('threejs-container');
    const rect = container.getBoundingClientRect();
    
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(rect.width, rect.height);
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    // Clean up materials and geometries
    this.scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
}

// Initialize everything when page loads
window.addEventListener('load', () => {
  createParticles();
  
  // Initialize 3D model
  setTimeout(() => {
    window.locationPin = new LocationPin3D();
  }, 500);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.locationPin) {
    window.locationPin.destroy();
  }
});