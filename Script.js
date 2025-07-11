// Loading Animation
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    } else {
        console.log('Loading element not found');
    }
});

// Mobile Menu Toggle with Content Push
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let mainContent = document.querySelector('.main-content');
let body = document.body;

if (menuIcon && navbar && mainContent) {
    menuIcon.onclick = () => {
        navbar.classList.toggle('active');
        mainContent.classList.toggle('menu-open');
        menuIcon.classList.toggle('bx-x');
        
        // Prevent body scroll when menu is open
        if (navbar.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    };
}

// Scroll Spy Highlighting
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            const activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    // Sticky header
    let header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 100);
    }
};

// Auto-close navbar when clicking a link (for mobile)
if (navbar && mainContent && menuIcon) {
    document.querySelectorAll('.navbar a').forEach(link => {
        link.onclick = () => {
            navbar.classList.remove('active');
            mainContent.classList.remove('menu-open');
            menuIcon.classList.remove('bx-x');
            body.style.overflow = 'auto';
        };
    });
}

// Smooth scroll on anchor click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Form submission handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('.btn-submit');
        
        // Show loading state
        if (submitBtn) {
            submitBtn.value = 'Sending...';
            submitBtn.disabled = true;
        }
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            if (submitBtn) {
                submitBtn.value = 'Send Message';
                submitBtn.disabled = false;
            }
        }, 2000);
    });
} else {
    console.log('Contact form not found');
}

// Enhanced mobile touch interactions
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - close mobile menu if open
            if (navbar && navbar.classList.contains('active') && mainContent && menuIcon) {
                navbar.classList.remove('active');
                mainContent.classList.remove('menu-open');
                menuIcon.classList.remove('bx-x');
                body.style.overflow = 'auto';
            }
        }
    }
}

// Preload images for better performance
function preloadImages() {
    const images = [
        './Images/IMG_2184.JPEG',
        './Images/IMG_2185.JPEG'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Enhanced scroll performance
let ticking = false;

function updateScrollEffects() {
    // Add any scroll-based animations here
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

window.addEventListener('scroll', requestScrollUpdate);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navbar && navbar.classList.contains('active') && mainContent && menuIcon) {
        navbar.classList.remove('active');
        mainContent.classList.remove('menu-open');
        menuIcon.classList.remove('bx-x');
        body.style.overflow = 'auto';
    }
});

// Portfolio video optimization for mobile
const videos = document.querySelectorAll('.portfolio-box video');
if (videos.length > 0) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => {
        videoObserver.observe(video);
    });
}

// Resize handler for responsive adjustments
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navbar && navbar.classList.contains('active') && mainContent && menuIcon) {
        navbar.classList.remove('active');
        mainContent.classList.remove('menu-open');
        menuIcon.classList.remove('bx-x');
        body.style.overflow = 'auto';
    }
});