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
            description: "Site élégant pour restaurant japonais avec réservation en ligne", 
            color: "#1a1a2e",
            link: "https://chihiro-vert.vercel.app/",
            featured: true,
            tags: ["Site vitrine", "Réservation en ligne", "Design moderne"]
        }
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
                        <div class="portfolio-image-container" style="background-image: url('https://cdn.discordapp.com/attachments/847183709769039873/1373436188131852398/image.png?ex=682a67a0&is=68291620&hm=1e470e41b049b0776459976d902c732df76d4a9617c2347b4aebb8adcd2941d5&');"></div>
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
                        <div class="portfolio-image-container" style="background-image: url('https://media.discordapp.net/attachments/847183709769039873/1373439334165778432/image.png?ex=682a6a8e&is=6829190e&hm=dc57c30fabf34571724ba68b593b69e073f09e5954cd42989daa06325f2c6363&=&format=webp&quality=lossless&width=1872&height=521'); background-position: center 30%;"></div>
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
                        <div class="portfolio-image-container" style="background-image: url('https://media.discordapp.net/attachments/847183709769039873/1373746228482801796/chihiro_banniere.png?ex=682b885f&is=682a36df&hm=70e48612b8c21dd97a69b5f31b7d27ba332ee6d229ffb937b85183ab035d8a06&=&format=webp&quality=lossless&width=1788&height=856'); background-position: center;"></div>
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