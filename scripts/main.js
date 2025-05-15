document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('nav-link')) {
                if (navLinks) navLinks.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
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
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        
        const interactiveElements = document.querySelectorAll(
            'a, button, .service-card, .portfolio-item, input, textarea, [tabindex]'
        );
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }

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
    
    window.addEventListener('scroll', checkAnimation, { passive: true });
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
    if (statsSection && counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // Portfolio Carousel
    const carousel = document.querySelector('.portfolio-carousel');
    if (carousel) {
        const container = carousel.querySelector('.carousel-container');
        const images = carousel.querySelectorAll('.carousel-image');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        let currentIndex = 0;
        const totalImages = images.length;
        
        // Create dots if images exist
        if (totalImages > 0 && dotsContainer) {
            images.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Aller à l'image ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        
        const dots = carousel.querySelectorAll('.carousel-dot');
        
        function updateCarousel() {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Update ARIA attributes
            images.forEach((img, index) => {
                img.setAttribute('aria-hidden', index !== currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Auto-rotate if more than one image
        if (totalImages > 1) {
            let interval = setInterval(nextSlide, 5000);
            
            carousel.addEventListener('mouseenter', () => {
                clearInterval(interval);
            });
            
            carousel.addEventListener('mouseleave', () => {
                interval = setInterval(nextSlide, 5000);
            });
        }
    }

    // Form Submission avec FormSubmit
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            if (!submitBtn) return;
            
            const originalText = submitBtn.textContent;
            const originalBg = submitBtn.style.backgroundColor;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.setAttribute('aria-busy', 'true');
            
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
            })
            .then(response => {
                if (response.ok) {
                    submitBtn.textContent = 'Message envoyé!';
                    submitBtn.style.backgroundColor = '#4ECDC4';
                    submitBtn.setAttribute('aria-busy', 'false');
                    
                    const nextPage = this.querySelector('[name="_next"]')?.value;
                    if (nextPage) {
                        window.location.href = nextPage;
                    }
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.backgroundColor = originalBg;
                        submitBtn.disabled = false;
                        this.reset();
                    }, 2000);
                } else {
                    throw new Error('Erreur réseau');
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                submitBtn.textContent = 'Erreur, réessayez';
                submitBtn.style.backgroundColor = '#FF6B6B';
                submitBtn.setAttribute('aria-busy', 'false');
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = originalBg;
                    submitBtn.disabled = false;
                }, 2000);
            });
        });
    }

    // Sticky Navigation on Scroll
    const nav = document.querySelector('.glass-nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                nav.style.padding = '10px 0';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.padding = '15px 0';
                nav.style.backdropFilter = 'blur(10px)';
            }
        }, { passive: true });
    }

    // Dynamic Year in Footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }

    // Gestion des cookies
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    const settingsCookies = document.getElementById('settingsCookies');

    function checkCookiePreferences() {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        
        // Si aucun choix n'a été fait, afficher la bannière
        if (cookiesAccepted === null) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }
        
        // Si cookies acceptés, charger les scripts externes
        if (cookiesAccepted === 'true') {
            loadAnalytics();
        }
    }

    function loadAnalytics() {
        // Ici vous pourriez charger Google Analytics par exemple
        console.log('Analytics loaded');
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('show');
            loadAnalytics();
        });
    }

    if (declineCookies) {
        declineCookies.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'false');
            cookieBanner.classList.remove('show');
        });
    }

    if (settingsCookies) {
        settingsCookies.addEventListener('click', () => {
            // Ici vous pourriez ouvrir un modal avec plus d'options
            alert("Options cookies: Actuellement nous utilisons seulement des cookies essentiels et analytiques.");
        });
    }

    // Vérifier les préférences au chargement
    checkCookiePreferences();
});