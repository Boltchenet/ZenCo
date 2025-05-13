document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = [
        { 
            title: "Sushi Palace", 
            description: "Site vitrine avec menu numérique", 
            image: "assets/images/portfolio/sushi-palace.jpg" 
        },
        { 
            title: "Noodle Bar", 
            description: "Site e-commerce pour plats à emporter", 
            image: "assets/images/portfolio/noodle-bar.jpg" 
        },
        { 
            title: "Dragon Wok", 
            description: "Application de réservation en ligne", 
            image: "assets/images/portfolio/dragon-wok.jpg" 
        },
        { 
            title: "Tokyo Grill", 
            description: "Menu numérique avec animations", 
            image: "assets/images/portfolio/tokyo-grill.jpg" 
        },
        { 
            title: "Bamboo Garden", 
            description: "Site vitrine avec galerie photo", 
            image: "assets/images/portfolio/bamboo-garden.jpg" 
        },
        { 
            title: "Panda Express", 
            description: "Solution complète avec bornes interactives", 
            image: "assets/images/portfolio/panda-express.jpg" 
        }
    ];

    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (portfolioGrid) {
        portfolioItems.forEach((item, index) => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-animate', '');
            portfolioItem.style.transitionDelay = `${index * 0.1}s`;
            
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }

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
});