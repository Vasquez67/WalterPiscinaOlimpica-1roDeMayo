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
        // Ya estamos en esta página
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

// Three.js Interactive Model
class InteractiveModel3D {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.group = new THREE.Group();
    this.animationId = null;
    this.isAnimating = true;
    
    this.init();
  }
  
  init() {
    const container = document.getElementById('threejs-container');
    const rect = container.getBoundingClientRect();
    
    this.renderer.setSize(rect.width, rect.height);
    this.renderer.setClearColor(0x001122, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    container.appendChild(this.renderer.domElement);
    
    this.createScene();
    this.setupLights();
    this.setupCamera();
    this.setupControls();
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
    // Sky background
    const skyGeometry = new THREE.SphereGeometry(100, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x87CEEB,
      side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    this.scene.add(sky);
    
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xdddddd,
      roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    this.scene.add(ground);
    
    // Create cubes with hierarchy
    this.createCubes();
    
    this.scene.add(this.group);
  }
  
  createCubes() {
    // Texture for cubes
    const texture = new THREE.TextureLoader().load(
      "https://threejs.org/examples/textures/crate.gif"
    );
    const material = new THREE.MeshStandardMaterial({ 
      map: texture,
      roughness: 0.7,
      metalness: 0.1
    });
    
    // Main cube
    const cube1Geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube1 = new THREE.Mesh(cube1Geometry, material);
    cube1.position.set(0, 1, 0);
    cube1.castShadow = true;
    
    // Child cube
    const cube2Geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cube2 = new THREE.Mesh(cube2Geometry, material);
    cube2.position.set(2, 0.5, 0);
    cube2.castShadow = true;
    
    // Add cubes to group
    this.group.add(cube1);
    this.group.add(cube2);
  }
  
  setupLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);
    
    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    this.scene.add(directionalLight);
    
    // Point light
    const pointLight = new THREE.PointLight(0x4fc3f7, 0.5, 20);
    pointLight.position.set(0, 3, 5);
    this.scene.add(pointLight);
  }
  
  setupCamera() {
    this.camera.position.set(3, 3, 5);
    this.camera.lookAt(0, 0, 0);
  }
  
  setupControls() {
    document.getElementById('toggleAnimation').addEventListener('click', () => {
      this.isAnimating = !this.isAnimating;
      const btn = document.getElementById('toggleAnimation');
      btn.textContent = this.isAnimating ? '⏸️ Pausar Animación' : '▶️ Reanudar Animación';
      btn.classList.toggle('active', !this.isAnimating);
    });
    
    document.getElementById('resetCamera').addEventListener('click', () => {
      this.camera.position.set(3, 3, 5);
      this.camera.lookAt(0, 0, 0);
    });
  }
  
  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    if (this.isAnimating) {
      // Rotate the group
      this.group.rotation.y += 0.01;
      this.group.rotation.x += 0.005;
      
      // Scale animation for cube1
      const scale = 1 + 0.3 * Math.sin(Date.now() * 0.005);
      this.group.children[0].scale.set(scale, scale, scale);
      
      // Position animation for cube2
      this.group.children[1].position.x = 2 + Math.sin(Date.now() * 0.003);
    }
    
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
    window.interactiveModel = new InteractiveModel3D();
  }, 500);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.interactiveModel) {
    window.interactiveModel.destroy();
  }
});