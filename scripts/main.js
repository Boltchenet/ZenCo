document.addEventListener('DOMContentLoaded', function() {
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
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        
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
                desc: "Site e-commerce pour plats à emporter", 
                img: "noodle-bar.jpg" 
            },
            { 
                title: "Dragon Wok", 
                desc: "Application de réservation en ligne", 
                img: "dragon-wok.jpg" 
            },
            { 
                title: "Tokyo Grill", 
                desc: "Menu numérique avec animations", 
                img: "tokyo-grill.jpg" 
            },
            { 
                title: "Bamboo Garden", 
                desc: "Site vitrine avec galerie photo", 
                img: "bamboo-garden.jpg" 
            },
            { 
                title: "Panda Express", 
                desc: "Solution complète avec bornes interactives", 
                img: "panda-express.jpg" 
            }
        ];
        
        portfolioItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-animate', '');
            portfolioItem.innerHTML = `
                <img src="assets/images/portfolio/${item.img}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });
    }

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            
            // Simulate form submission
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

    // Parallax Effect
    const floatingElements = document.querySelectorAll('.floating-noodles, .floating-chopsticks');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        floatingElements.forEach((el, index) => {
            const speed = index === 0 ? 0.2 : 0.3;
            el.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });

    // Gradient Text Animation
    const gradientTexts = document.querySelectorAll('.text-gradient');
    gradientTexts.forEach(text => {
        text.classList.add('text-gradient-animated');
    });

    // Dynamic Year in Footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
});
