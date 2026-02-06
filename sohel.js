// Particle Background (keep your existing code)
const container = document.getElementById('particle-container');
const particleCount = 50;
const connectionDistance = 150;
const particles = [];

class Particle {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'particle';
        
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        
        container.appendChild(this.element);
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > window.innerWidth) {
            this.vx *= -1;
            this.x = Math.max(0, Math.min(window.innerWidth, this.x));
        }
        if (this.y < 0 || this.y > window.innerHeight) {
            this.vy *= -1;
            this.y = Math.max(0, Math.min(window.innerHeight, this.y));
        }
        
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
}

function init() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    const oldLines = document.querySelectorAll('.connection-line');
    oldLines.forEach(line => line.remove());
    
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
                const line = document.createElement('div');
                line.className = 'connection-line';
                
                const length = distance;
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                const opacity = (1 - distance / connectionDistance) * 0.3;
                
                line.style.width = length + 'px';
                line.style.left = particles[j].x + 'px';
                line.style.top = particles[j].y + 'px';
                line.style.transform = `rotate(${angle}deg)`;
                line.style.background = `rgba(255, 255, 255, ${opacity})`;
                
                container.appendChild(line);
            }
        }
    }
}

function animate() {
    particles.forEach(particle => particle.update());
    drawConnections();
    requestAnimationFrame(animate);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top functionality
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
}

// Initialize back to top button
if (backToTopBtn) {
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.visibility = 'hidden';
    backToTopBtn.style.transition = 'all 0.3s ease';
}

// Handle window resize
window.addEventListener('resize', () => {
    particles.forEach(particle => {
        if (particle.x > window.innerWidth) particle.x = window.innerWidth;
        if (particle.y > window.innerHeight) particle.y = window.innerHeight;
    });
});

// Initialize everything
init();
animate();