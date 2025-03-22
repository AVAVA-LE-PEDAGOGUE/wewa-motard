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
});