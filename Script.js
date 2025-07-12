// ⏳ Loading Animation
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
});

// 🍔 Mobile Menu Toggle with Content Push
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const mainContent = document.querySelector('.main-content');
const body = document.body;

if (menuIcon && navbar && mainContent) {
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        mainContent.classList.toggle('menu-open');
        menuIcon.classList.toggle('bx-x');
        body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// 📌 Scroll Spy Highlighting + Sticky Header
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    const top = window.scrollY;

    // Scroll Spy Logic
    sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`header nav a[href*=${id}]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });

    // ✅ Sticky Header Toggle (NO push down)
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('sticky', top > 100);
    }
});

// 📱 Auto-close navbar after clicking link (for mobile)
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        mainContent.classList.remove('menu-open');
        menuIcon.classList.remove('bx-x');
        body.style.overflow = 'auto';
    });
});

// 🎯 Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// ✨ Fade-in animation on scroll using Intersection Observer
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// 📬 Simulated Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const submitBtn = this.querySelector('.btn-submit');

        // Simulate sending
        if (submitBtn) {
            submitBtn.value = 'Sending...';
            submitBtn.disabled = true;
        }

        setTimeout(() => {
            alert("Thank you for your message! I’ll get back to you soon.");
            this.reset();
            if (submitBtn) {
                submitBtn.value = 'Send Message';
                submitBtn.disabled = false;
            }
        }, 2000);
    });
}

// 📱 Touch swipe up to close mobile menu
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => touchStartY = e.changedTouches[0].screenY);
document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    if (touchStartY - touchEndY > 50) {
        // Swipe up
        navbar?.classList.remove('active');
        mainContent?.classList.remove('menu-open');
        menuIcon?.classList.remove('bx-x');
        body.style.overflow = 'auto';
    }
});

// 🖼️ Preload images
const preloadImages = () => {
    const images = ['./Images/IMG_2184.JPEG', './Images/IMG_2185.JPEG'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};
preloadImages();

// 📈 Optimize scroll performance
let ticking = false;

function updateScrollEffects() {
    // Add scroll-based logic if needed
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

window.addEventListener('scroll', requestScrollUpdate);

// ⌨️ Escape key closes mobile menu
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        mainContent.classList.remove('menu-open');
        menuIcon.classList.remove('bx-x');
        body.style.overflow = 'auto';
    }
});

// 🎥 Optimize portfolio videos
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

    videos.forEach(video => videoObserver.observe(video));
}

// 🧠 Auto-close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navbar.classList.remove('active');
        mainContent.classList.remove('menu-open');
        menuIcon.classList.remove('bx-x');
        body.style.overflow = 'auto';
    }
});