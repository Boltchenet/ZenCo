/**
 * Zenkō Portfolio Script
 * Gère l'affichage dynamique des projets et les animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Données des projets
    const portfolioItems = [
        { 
            title: "Shidori", 
            description: "Site premium pour restaurant japonais avec menu interactif", 
            color: "#d4af37",
            link: "https://shidori-five.vercel.app",
            featured: true,
            tags: ["Site vitrine", "Menu digital", "Design luxe"]
        },
        { 
            title: "Bartender", 
            description: "Site web moderne pour un bar à cocktails avec menu animé", 
            color: "#1a1a2e",
            link: "https://boltchenet.github.io/Bartender/",
            featured: true,
            tags: ["Site vitrine", "Menu digital"]
        },
        { 
            title: "Chihiro", 
            description: "Site élégant pour restaurant japonais avec livraison à domicile", 
            color: "#1a1a2e",
            link: "https://chihiro-vert.vercel.app/",
            featured: true,
            tags: ["Site vitrine", "Livraison à domicile", "Design moderne"]
        },
        { 
            title: "ADVIN BARBER", 
            description: "Site moderne pour salon de coiffure avec présentation des services", 
            color: "#1a1a2e",
            link: "https://advin-coiffure.vercel.app/",
            featured: true,
            tags: ["Site vitrine", "Design moderne", "Coiffure"]
        }
    ];

    // Éléments DOM
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterContainer = document.createElement('div');
    filterContainer.className = 'portfolio-filters';
    
    // Création des filtres
    function setupFilters() {
        const filterHTML = `
            <button class="filter-btn active" data-filter="all">Tous</button>
            <button class="filter-btn" data-filter="site-vitrine">Site Vitrine</button>
            <button class="filter-btn" data-filter="menu-digital">Menu Digital</button>
            <button class="filter-btn" data-filter="livraison-a-domicile">Livraison à domicile</button>
            <button class="filter-btn" data-filter="coiffure">Coiffure</button>
        `;
        
        filterContainer.innerHTML = filterHTML;
        portfolioGrid.before(filterContainer);
        
        // Gestion des clics sur les filtres
        filterContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                
                const filter = e.target.dataset.filter;
                filterProjects(filter);
            }
        });
    }

    // Filtrage des projets
    function filterProjects(filter) {
        const items = document.querySelectorAll('.portfolio-item');
        
        items.forEach(item => {
            if (filter === 'all') {
                item.style.display = 'block';
            } else {
                const tags = item.dataset.tags.split(',');
                tags.includes(filter) ? item.style.display = 'block' : item.style.display = 'none';
            }
        });
    }

    // Affichage des projets
    function displayProjects() {
        portfolioGrid.classList.add('loading');
        
        setTimeout(() => {
            portfolioGrid.classList.remove('loading');
            portfolioGrid.innerHTML = '';
            
            const sortedItems = [...portfolioItems].sort((a, b) => (b.featured || false) - (a.featured || false));
            
            sortedItems.forEach((item, index) => {
                const portfolioItem = document.createElement('a');
                portfolioItem.className = `portfolio-item ${item.featured ? 'featured' : ''}`;
                portfolioItem.href = item.link;
                portfolioItem.target = '_blank';
                portfolioItem.rel = 'noopener noreferrer';
                portfolioItem.setAttribute('data-animate', '');
                portfolioItem.dataset.tags = item.tags.map(tag => tag.replace(/\s+/g, '-').toLowerCase()).join(',');
                portfolioItem.style.transitionDelay = `${index * 0.1}s`;
                
                if (item.tags.includes("Design luxe")) {
                    portfolioItem.innerHTML = `
                        <div class="portfolio-image-container" style="background-image: url('assets/images/shidori_banniere.png');"></div>
                        <div class="portfolio-overlay">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <div class="portfolio-tags">
                                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                            <span class="visit-link">Visiter le site →</span>
                        </div>
                    `;
                } else if (item.title === "Bartender") {
                    portfolioItem.innerHTML = `
                        <div class="portfolio-image-container" style="background-image: url('assets/images/bartender_banniere.png'); background-position: center 30%;"></div>
                        <div class="portfolio-overlay">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <div class="portfolio-tags">
                                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                            <span class="visit-link">Visiter le site →</span>
                        </div>
                    `;
                } else if (item.title === "Chihiro") {
                    portfolioItem.innerHTML = `
                        <div class="portfolio-image-container" style="background-image: url('assets/images/chihiro_banniere.png'); background-position: center;"></div>
                        <div class="portfolio-overlay">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <div class="portfolio-tags">
                                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                            <span class="visit-link">Visiter le site →</span>
                        </div>
                    `;
                } else if (item.title === "ADVIN BARBER") {
                    portfolioItem.innerHTML = `
                        <div class="portfolio-image-container" style="background-image: url('assets/images/advinbarber.jpg'); background-position: center;"></div>
                        <div class="portfolio-overlay">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <div class="portfolio-tags">
                                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                            <span class="visit-link">Visiter le site →</span>
                        </div>
                    `;
                } else {
                    portfolioItem.innerHTML = `
                        <div class="portfolio-image-container" style="background-color: ${item.color};"></div>
                        <div class="portfolio-overlay">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <div class="portfolio-tags">
                                ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                            <span class="visit-link">Visiter le site →</span>
                        </div>
                    `;
                }
                
                portfolioGrid.appendChild(portfolioItem);
            });
            
            setupAnimations();
        }, 800);
    }

    // Gestion des animations
    function setupAnimations() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            document.querySelectorAll('.portfolio-item[data-animate]').forEach(item => {
                observer.observe(item);
            });
        } else {
            // Fallback pour les anciens navigateurs
            const animateItems = () => {
                const items = document.querySelectorAll('.portfolio-item[data-animate]');
                items.forEach(item => {
                    const itemTop = item.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (itemTop < windowHeight - 100) {
                        item.classList.add('animate');
                    }
                });
            };

            window.addEventListener('scroll', animateItems);
            animateItems();
        }
    }

    // Fallback si JavaScript est désactivé
    function setupNoScriptFallback() {
        const noscriptFallback = document.createElement('noscript');
        const fallbackHTML = `
            <div class="portfolio-grid-fallback">
                ${portfolioItems.slice(0, 3).map(item => `
                    <a href="${item.link}" class="portfolio-item" target="_blank" rel="noopener">
                        <div class="portfolio-image-container" style="background-color: ${item.color};"></div>
                        <div class="portfolio-overlay">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <span class="visit-link">Visiter le site →</span>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
        noscriptFallback.innerHTML = fallbackHTML;
        portfolioGrid.appendChild(noscriptFallback);
    }

    // Initialisation
    setupFilters();
    displayProjects();
    setupNoScriptFallback();

    // Gestion du redimensionnement
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.querySelectorAll('.portfolio-item.animate').forEach(item => {
                item.classList.remove('animate');
            });
            setupAnimations();
        }, 250);
    });
});