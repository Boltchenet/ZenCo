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
           ];

    // Éléments DOM
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const filterContainer = document.createElement('div');
    filterContainer.className = 'portfolio-filters';
    
    // Création des filtres
    function setupFilters() {
        const allTags = [...new Set(portfolioItems.flatMap(item => item.tags))];
        
        const filterHTML = `
            <button class="filter-btn active" data-filter="all">Tous</button>
            ${allTags.map(tag => `
                <button class="filter-btn" data-filter="${tag.replace(/\s+/g, '-').toLowerCase()}">${tag}</button>
            `).join('')}
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
        // Afficher l'état de chargement
        portfolioGrid.classList.add('loading');
        
        // Simuler un chargement asynchrone
        setTimeout(() => {
            portfolioGrid.classList.remove('loading');
            portfolioGrid.innerHTML = '';
            
            // Trier pour mettre le projet featured en premier
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
                
                // Structure HTML du projet
                if (item.tags.includes("Design luxe")) {
                    // Style spécial pour Shidori
                    portfolioItem.innerHTML = `
                        <div style="background: url('https://media.discordapp.net/attachments/847183709769039873/1373316837302997103/image.png?ex=6829f879&is=6828a6f9&hm=5bf017de2bc3388982d57028cc304e8df2567589f812f30e6b0f1df4f0033922&=&format=webp&quality=lossless&width=1872&height=294') center/cover no-repeat; width: 100%; height: 100%;"></div>
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
                    // Style standard pour les autres projets
                    portfolioItem.innerHTML = `
                        <div style="background-color: ${item.color}; opacity: 0.8; width: 100%; height: 100%;"></div>
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
                        <div style="background-color: ${item.color}; opacity: 0.8; width: 100%; height: 100%;"></div>
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