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

// Carrusel functionality
class ImageCarousel {
    constructor() {
        this.images = [
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
        
        this.currentIndex = 0;
        this.carousel = document.getElementById("carousel");
        this.indicatorsContainer = document.getElementById("indicators");
        this.modal = document.getElementById("imageModal");
        this.modalImg = document.getElementById("modalImage");
        this.captionText = document.getElementById("modalCaption");
        this.closeBtn = document.getElementById("closeModal");
        
        this.init();
    }
    
    init() {
        this.createCarouselItems();
        this.setupEventListeners();
        this.showSlide(this.currentIndex);
        
        // Auto-avance cada 5 segundos
        this.autoAdvance = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    createCarouselItems() {
        // Crear elementos del carrusel
        this.images.forEach((image, index) => {
            const item = document.createElement("div");
            item.className = "carousel-item";
            
            const img = document.createElement("img");
            img.src = image.url;
            img.alt = image.alt;
            
            const caption = document.createElement("div");
            caption.className = "carousel-caption";
            caption.textContent = image.alt;
            
            item.appendChild(img);
            item.appendChild(caption);
            this.carousel.appendChild(item);
            
            // Crear indicadores
            const indicator = document.createElement("div");
            indicator.className = "carousel-indicator";
            indicator.dataset.index = index;
            this.indicatorsContainer.appendChild(indicator);
        });
    }
    
    setupEventListeners() {
        // Controles del carrusel
        document.getElementById("prevBtn").addEventListener("click", () => {
            this.prevSlide();
            this.resetAutoAdvance();
        });
        
        document.getElementById("nextBtn").addEventListener("click", () => {
            this.nextSlide();
            this.resetAutoAdvance();
        });
        
        // Controles del modal
        document.getElementById("modalPrevBtn").addEventListener("click", () => {
            this.prevSlide();
            this.updateModal();
            this.resetAutoAdvance();
        });
        
        document.getElementById("modalNextBtn").addEventListener("click", () => {
            this.nextSlide();
            this.updateModal();
            this.resetAutoAdvance();
        });
        
        // Indicadores
        this.indicatorsContainer.querySelectorAll(".carousel-indicator").forEach(indicator => {
            indicator.addEventListener("click", () => {
                const index = parseInt(indicator.dataset.index);
                this.showSlide(index);
                this.resetAutoAdvance();
            });
        });
        
        // Abrir modal al hacer clic en la imagen
        this.carousel.querySelectorAll("img").forEach((img, index) => {
            img.addEventListener("click", () => {
                this.showSlide(index);
                this.openModal();
            });
        });
        
        // Cerrar modal
        this.closeBtn.addEventListener("click", () => {
            this.closeModal();
        });
        
        // Cerrar al hacer clic fuera de la imagen
        this.modal.addEventListener("click", (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Navegación con teclado
        document.addEventListener("keydown", (e) => {
            if (this.modal.style.display === "flex") {
                if (e.key === "ArrowLeft") {
                    this.prevSlide();
                    this.updateModal();
                } else if (e.key === "ArrowRight") {
                    this.nextSlide();
                    this.updateModal();
                } else if (e.key === "Escape") {
                    this.closeModal();
                }
            }
        });
        
        // Soporte para gestos táctiles
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        this.carousel.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, false);
    }
    
    handleSwipe() {
        const minSwipeDistance = 50;
        
        if (touchStartX - touchEndX > minSwipeDistance) {
            // Deslizar a la izquierda -> siguiente
            this.nextSlide();
        } else if (touchEndX - touchStartX > minSwipeDistance) {
            // Deslizar a la derecha -> anterior
            this.prevSlide();
        }
        
        this.resetAutoAdvance();
    }
    
    showSlide(index) {
        // Ajustar índice si está fuera de rango
        if (index >= this.images.length) {
            index = 0;
        } else if (index < 0) {
            index = this.images.length - 1;
        }
        
        this.currentIndex = index;
        
        // Ocultar todas las diapositivas
        const items = this.carousel.querySelectorAll(".carousel-item");
        items.forEach(item => {
            item.classList.remove("active");
        });
        
        // Mostrar la diapositiva actual
        items[this.currentIndex].classList.add("active");
        
        // Actualizar indicadores
        const indicators = this.indicatorsContainer.querySelectorAll(".carousel-indicator");
        indicators.forEach(indicator => indicator.classList.remove("active"));
        indicators[this.currentIndex].classList.add("active");
    }
    
    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentIndex - 1);
    }
    
    openModal() {
        this.updateModal();
        this.modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
    
    closeModal() {
        this.modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
    
    updateModal() {
        this.modalImg.src = this.images[this.currentIndex].url;
        this.captionText.textContent = this.images[this.currentIndex].alt;
    }
    
    resetAutoAdvance() {
        clearInterval(this.autoAdvance);
        this.autoAdvance = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    createParticles();
    new ImageCarousel();
});
