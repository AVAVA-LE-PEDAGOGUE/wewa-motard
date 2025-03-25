/**
 * JavaScript pour le blog Wewa Motard
 * 
 * Ce fichier contient toutes les fonctionnalités interactives du blog:
 * - Gestion du mode sombre/clair
 * - Défilement fluide vers les sections
 * - Système de commentaires
 * - Gestion des formulaires
 */

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // === GESTION DU MODE SOMBRE ===
    
    // Vérifier si l'utilisateur préfère le mode sombre
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        document.getElementById('modeIcon').textContent = '🌙';
    }

    // Écouter les changements de préférence de thème
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            document.documentElement.classList.add('dark');
            document.getElementById('modeIcon').textContent = '🌙';
        } else {
            document.documentElement.classList.remove('dark');
            document.getElementById('modeIcon').textContent = '☀️';
        }
    });

    // Bouton de basculement du mode sombre
    document.getElementById('darkModeToggle').addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        document.getElementById('modeIcon').textContent = isDark ? '🌙' : '☀️';
    });

    // === DÉFILEMENT FLUIDE ===
    
    // Ajouter un défilement fluide pour tous les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset pour l'en-tête fixe
                    behavior: 'smooth'
                });
            }
        });
    });

    // === SYSTÈME DE COMMENTAIRES ===
    
    const submitComment = document.getElementById('submitComment');
    const commentName = document.getElementById('commentName');
    const commentMessage = document.getElementById('commentMessage');
    const chatContainer = document.getElementById('chatContainer');
    const commentStatus = document.getElementById('commentStatus');

    submitComment.addEventListener('click', async function() {
        // Validation des champs
        const name = commentName.value.trim();
        const message = commentMessage.value.trim();
        
        if (!name || !message) {
            commentStatus.textContent = "Veuillez remplir tous les champs.";
            commentStatus.className = "text-red-500 text-sm";
            return;
        }

        // Désactiver le bouton pendant le traitement
        submitComment.disabled = true;
        commentStatus.textContent = "Envoi du message...";
        commentStatus.className = "text-vintage-muted text-sm";

        try {
            // Créer et ajouter le nouveau commentaire à l'interface
            const commentHtml = `
                <div class="message-bubble p-4 bg-vintage-light rounded-lg comment-appear">
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-heading">${name}</span>
                        <span class="text-xs text-vintage-muted">${new Date().toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p class="font-body">${message}</p>
                </div>
            `;
            chatContainer.innerHTML += commentHtml;

            // Vider le formulaire
            commentName.value = "";
            commentMessage.value = "";
            
            commentStatus.textContent = "Message publié avec succès!";
            commentStatus.className = "text-green-600 text-sm";
            
            // Simuler une réponse du modérateur après un délai
            setTimeout(() => {
                const moderatorResponse = `
                    <div class="message-bubble p-4 bg-vintage-light rounded-lg comment-appear">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-heading">Modérateur</span>
                            <span class="text-xs text-vintage-muted">${new Date().toLocaleDateString('fr-FR')}</span>
                        </div>
                        <p class="font-body">Merci pour votre contribution, ${name}! Votre message a été enregistré et sera pris en compte dans nos démarches.</p>
                    </div>
                `;
                chatContainer.innerHTML += moderatorResponse;
            }, 2000);

            // Faire défiler vers le nouveau commentaire
            chatContainer.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
        } catch (error) {
            commentStatus.textContent = "Erreur lors de l'envoi du message.";
            commentStatus.className = "text-red-500 text-sm";
            console.error("Error:", error);
        } finally {
            submitComment.disabled = false;
        }
    });

    // === GESTION DU FORMULAIRE DE CONTACT ===
    
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert("Veuillez remplir tous les champs du formulaire.");
            return;
        }
        
        // Afficher un message de succès
        contactForm.innerHTML = `
            <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
                <p class="font-body">Merci pour votre message, ${name}! Nous vous contacterons bientôt.</p>
            </div>
        `;
    });

    // === INTERACTION DES ARTICLES ===
    
    document.querySelectorAll('.article-card button').forEach(button => {
        button.addEventListener('click', function() {
            const article = this.closest('.article-card');
            const title = article.querySelector('h3').textContent;
            alert(`Article "${title}" sera ouvert dans une prochaine version du blog.`);
        });
    });
    // === GESTION DU FORMULAIRE D'ABONNEMENT ===
const subscribeForm = document.getElementById('subscribeForm');
const subscribeStatus = document.getElementById('subscribeStatus');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('subscribeName').value.trim();
        const email = document.getElementById('subscribeEmail').value.trim();
        
        if (!name || !email) {
            subscribeStatus.textContent = "Veuillez remplir tous les champs.";
            subscribeStatus.className = "text-red-500 text-sm";
            return;
        }
        
        // Simuler l'envoi d'un formulaire
        const subscribeButton = document.getElementById('subscribeButton');
        subscribeButton.disabled = true;
        subscribeButton.textContent = "Traitement...";
        
        setTimeout(() => {
            subscribeForm.innerHTML = `
                <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
                    <p class="font-body">Merci ${name} ! Votre abonnement a été enregistré avec succès.</p>
                    <p class="font-body mt-2">Nous vous enverrons nos prochains articles à ${email}.</p>
                </div>
            `;
            
            // Incrémenter le compteur d'abonnés
            const subscribersCounter = document.querySelector('.stats-item:first-child .counter-value');
            const currentCount = parseInt(subscribersCounter.textContent);
            subscribersCounter.textContent = currentCount + 1;
            subscribersCounter.classList.add('text-green-600');
            
            setTimeout(() => {
                subscribersCounter.classList.remove('text-green-600');
            }, 2000);
            
        }, 1500);
    });
}

// === ANIMATION DES COMPTEURS ===
// Fonction pour animer les compteurs quand ils deviennent visibles
function animateCounters() {
    const counters = document.querySelectorAll('.counter-value');
    const options = {
        threshold: 0.7 // 70% visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                let count = 0;
                const duration = 1500; // ms
                const increment = Math.ceil(target / (duration / 30)); // update every 30ms
                
                counter.classList.add('counting');
                
                const updateCount = () => {
                    count += increment;
                    if (count >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = count;
                    }
                };
                
                const timer = setInterval(updateCount, 30);
                observer.unobserve(counter);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Déclencher l'animation des compteurs au chargement
document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
});

    // === GESTION DES ARTICLES DÉTAILLÉS ===
document.querySelectorAll('.article-detail-button').forEach(button => {
    button.addEventListener('click', function() {
        const articleId = this.getAttribute('data-article-id');
        const fullContent = document.getElementById(articleId);
        
        if (fullContent) {
            fullContent.classList.toggle('hidden');
            this.textContent = fullContent.classList.contains('hidden') ? 
                'Lire l\'article complet' : 'Réduire l\'article';
        }
    });
});

document.querySelectorAll('.close-article').forEach(button => {
    button.addEventListener('click', function() {
        const fullContent = this.closest('.article-full-content');
        const detailButton = document.querySelector(`[data-article-id="${fullContent.id}"]`);
        
        if (fullContent) {
            fullContent.classList.add('hidden');
            if (detailButton) {
                detailButton.textContent = 'Lire l\'article complet';
            }
        }
    });
});
    
});
