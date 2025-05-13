document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = [
        { 
            title: "Sushi Palace", 
            description: "Site vitrine avec menu numérique", 
            color: "#FF6B6B",
            link: "https://sushi-palace-example.com" 
        },
        { 
            title: "Noodle Bar", 
            description: "Site e-commerce pour plats à emporter", 
            color: "#4ECDC4",
            link: "https://noodle-bar-example.com" 
        },
        { 
            title: "Dragon Wok", 
            description: "Application de réservation en ligne", 
            color: "#FFE66D",
            link: "https://dragon-wok-example.com" 
        },
        { 
            title: "Tokyo Grill", 
            description: "Menu numérique avec animations", 
            color: "#A78BFA",
            link: "https://tokyo-grill-example.com" 
        },
        { 
            title: "Bamboo Garden", 
            description: "Site vitrine avec galerie photo", 
            color: "#F472B6",
            link: "https://bamboo-garden-example.com" 
        },
        { 
            title: "Panda Express", 
            description: "Solution complète avec bornes interactives", 
            color: "#34D399",
            link: "https://panda-express-example.com" 
        }
    ];

    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (portfolioGrid) {
        portfolioItems.forEach((item, index) => {
            const portfolioItem = document.createElement('a');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.href = item.link;
            portfolioItem.target = '_blank';
            portfolioItem.setAttribute('data-animate', '');
            portfolioItem.style.transitionDelay = `${index * 0.1}s`;
            
            portfolioItem.innerHTML = `
                <div style="background-color: ${item.color}; opacity: 0.8; width: 100%; height: 100%;"></div>
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="visit-link">Visiter le site →</span>
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