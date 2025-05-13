document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

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
    checkAnimation(); // Check on load

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
    
    // Start counters when section is in view
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

    // Phone Mockup Slider
    const screenSlider = document.querySelector('.screen-slider');
    if (screenSlider) {
        const slides = [
            { 
                title: "Menu Numérique", 
                desc: "Exemple de menu interactif pour restaurant", 
                color: "#FF6B6B" 
            },
            { 
                title: "Page d'Accueil", 
                desc: "Design moderne pour présentation du restaurant", 
                color: "#4ECDC4" 
            },
            { 
                title: "Réservation", 
                desc: "Système de réservation en ligne intégré", 
                color: "#FFE66D" 
            }
        ];
        
        let currentSlide = 0;
        
        function showSlide() {
            const slide = slides[currentSlide];
            screenSlider.innerHTML = `
                <div class="slide-content" style="background-color: ${slide.color}">
                    <h3>${slide.title}</h3>
                    <p>${slide.desc}</p>
                </div>
            `;
            screenSlider.style.backgroundColor = slide.color;
            
            currentSlide = (currentSlide + 1) % slides.length;
            setTimeout(showSlide, 3000);
        }
        
        showSlide();
    }

    // Portfolio Items
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        const portfolioItems = [
            { 
                title: "Sushi Palace", 
                desc: "Site vitrine avec menu numérique", 
                img: "sushi-palace.jpg" 
            },
            { 
                title: "Noodle Bar", 
                desc: "Site e-commerce pour plats à em
