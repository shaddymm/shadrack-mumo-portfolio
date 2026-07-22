// ============================================================
// PRELOADER WITH PROGRESS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 10 + 5;
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + '%';
        progressPercent.textContent = Math.round(progress) + '%';

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 400);
        }
    }, 150);
});

// ============================================================
// AOS INITIALIZATION
// ============================================================
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
});

// ============================================================
// CURSOR EFFECTS
// ============================================================
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');
const cursorGlow = document.getElementById('cursorGlow');

if (cursorDot && cursorOutline) {
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursorDot.style.width = '12px';
        cursorDot.style.height = '12px';
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
    });

    document.addEventListener('mouseup', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
    });

    document.querySelectorAll('a, button, .btn, .service-card, .portfolio-card, .testimonial-card, .filter-btn')
        .forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.borderColor = '#2ECC71';
                cursorOutline.style.background = 'rgba(46, 204, 113, 0.05)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.borderColor = '#2ECC71';
                cursorOutline.style.background = 'transparent';
            });
        });
}

// ============================================================
// NAVIGATION
// ============================================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================================
// TYPING EFFECT
// ============================================================
const typingText = document.getElementById('typingText');

if (typingText) {
    const roles = [
        'ICT Systems Architect',
        'Full-Stack Developer',
        'Robotics Education Consultant',
        'Digital Transformation Expert',
        'STEM Education Specialist'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, 400);
                return;
            }

            setTimeout(typeRole, 30);
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                setTimeout(() => {
                    isDeleting = true;
                    setTimeout(typeRole, 300);
                }, 2500);
                return;
            }

            setTimeout(typeRole, 70);
        }
    }

    typeRole();
}

// ============================================================
// BACK TO TOP
// ============================================================
const backToTop = document.getElementById('backToTop');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / height) * 100;

    if (scrollY > 400) {
        backToTop.classList.add('visible');
        if (scrollProgress) {
            scrollProgress.style.setProperty('--progress', progress + '%');
        }
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// STATS COUNTER
// ============================================================
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            if (current < target) {
                stat.textContent = current + '+';
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
}

// ============================================================
// PORTFOLIO FILTERS
// ============================================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        portfolioItems.forEach((item, index) => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.add('show');
                item.style.animationDelay = (index * 0.08) + 's';
            } else {
                item.classList.remove('show');
            }
        });
    });
});

portfolioItems.forEach((item, index) => {
    item.classList.add('show');
    item.style.animationDelay = (index * 0.08) + 's';
});

// ============================================================
// CONTACT FORM
// ============================================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent Successfully!';
            submitBtn.style.background = '#2ECC71';
            submitBtn.style.borderColor = '#2ECC71';

            showNotification('Thank you! Your message has been sent successfully.', 'success');

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                contactForm.reset();
            }, 3000);
        }, 2000);
    });
}

// ============================================================
// NOTIFICATION SYSTEM
// ============================================================
function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `notification-toast notification-${type}`;
    toast.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });

    toast.querySelector('.notification-close').addEventListener('click', () => {
        removeToast(toast);
    });

    setTimeout(() => {
        removeToast(toast);
    }, 5000);
}

function removeToast(toast) {
    toast.style.transform = 'translateY(30px)';
    toast.style.opacity = '0';
    setTimeout(() => {
        toast.remove();
    }, 500);
}

// ============================================================
// SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================================
// PARTICLES BACKGROUND
// ============================================================
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 2;
        Object.assign(particle.style, {
            position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            background: 'rgba(46, 204, 113, 0.15)',
            borderRadius: '50%',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animation: `float-particle ${Math.random() * 10 + 15}s linear infinite`,
            animationDelay: Math.random() * 10 + 's',
        });
        particlesContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
// CONSOLE BRANDING
// ============================================================
console.log('%c╔═══════════════════════════════════════════════════════╗', 'color: #2ECC71; font-size: 12px;');
console.log('%c║     🚀 Shadrack Mumo - Professional Portfolio       ║', 'color: #2ECC71; font-size: 14px; font-weight: bold;');
console.log('%c╠═══════════════════════════════════════════════════════╣', 'color: #2ECC71; font-size: 12px;');
console.log('%c║  📧 Email: mumoshadrack20@gmail.com                  ║', 'color: #6B7A8F; font-size: 13px;');
console.log('%c║  📱 Phone: +254 793 522 500                         ║', 'color: #6B7A8F; font-size: 13px;');
console.log('%c║  🌐 Portfolio: shadrackmumo.netlify.app             ║', 'color: #6B7A8F; font-size: 13px;');
console.log('%c╚═══════════════════════════════════════════════════════╝', 'color: #2ECC71; font-size: 12px;');