document.addEventListener('DOMContentLoaded', function() {
    // Preloader simplifié
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('nav-link')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });

    // Scroll Animations
    const animateElements = document.querySelectorAll('[data-animate]');
    
    function checkAnimation() {
        animateElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elTop < windowHeight - 100) {
                el.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkAnimation);
    checkAnimation();

    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(statsSection);
        }
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Phone Mockup Slider simplifié
    const screenSlider = document.querySelector('.screen-slider');
    if (screenSlider) {
        const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D"];
        let currentIndex = 0;
        
        function changeColor() {
            screenSlider.style.backgroundColor = colors[currentIndex];
            currentIndex = (currentIndex + 1) % colors.length;
            setTimeout(changeColor, 3000);
        }
        
        changeColor();
    }

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            
            setTimeout(() => {
                submitBtn.textContent = 'Message envoyé!';
                submitBtn.style.backgroundColor = '#4ECDC4';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Envoyer le message';
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Sticky Navigation on Scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 100) {
            nav.style.padding = '10px 0';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.padding = '15px 0';
            nav.style.backdropFilter = 'blur(10px)';
        }
    });

    // Dynamic Year in Footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
});