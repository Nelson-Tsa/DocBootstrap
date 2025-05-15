document.addEventListener('DOMContentLoaded', function() {
    // 1. Activer le scrollspy pour suivre la navigation
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#main-nav'
    });
    
    // 2. Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Ajustement pour la navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 3. Ajouter une fonctionnalité de copie pour les blocs de code
    addCopyButtons();
    
    // 4. Ajouter la fonction de surlignage pour le menu actif
    highlightActiveSection();
    
    // 5. Initialiser les tooltips
    initTooltips();
    
    // 6. Initialiser les popovers
    initPopovers();
    
    // 7. Démarrer le carrousel automatiquement
    initCarousel();
});

// Initialiser les tooltips (info-bulles)
function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

// Initialiser les popovers
function initPopovers() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
}

// Initialiser le carrousel
function initCarousel() {
    const carousel = document.querySelector('#carouselExample');
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 3000, // Intervalle en millisecondes entre les transitions de diapositives
            wrap: true,     // Boucler en continu
            keyboard: true, // Permettre le contrôle par clavier
            pause: 'hover'  // Mettre en pause au survol
        });
        
        // Ajouter des informations de débogage pour le carrousel
        console.log('Carrousel initialisé avec succès');
    }
}

// Fonction pour ajouter des boutons de copie aux blocs de code
function addCopyButtons() {
    // Trouver tous les éléments <code>
    document.querySelectorAll('code').forEach(codeBlock => {
        // Créer un bouton de copie
        const copyButton = document.createElement('button');
        copyButton.className = 'btn btn-sm btn-outline-secondary copy-button';
        copyButton.textContent = 'Copier';
        copyButton.style.position = 'relative';
        copyButton.style.fontSize = '0.7em';
        copyButton.style.marginLeft = '5px';
        
        // Ajouter la fonctionnalité de copie
        copyButton.addEventListener('click', function() {
            const textToCopy = codeBlock.textContent;
            navigator.clipboard.writeText(textToCopy).then(function() {
                // Changer le texte du bouton temporairement
                copyButton.textContent = 'Copié !';
                copyButton.classList.add('btn-success');
                copyButton.classList.remove('btn-outline-secondary');
                
                // Rétablir le texte d'origine après 2 secondes
                setTimeout(function() {
                    copyButton.textContent = 'Copier';
                    copyButton.classList.remove('btn-success');
                    copyButton.classList.add('btn-outline-secondary');
                }, 2000);
            }, function() {
                copyButton.textContent = 'Erreur';
                copyButton.classList.add('btn-danger');
            });
        });
        
        // Insérer le bouton après le bloc de code
        if (codeBlock.parentNode) {
            codeBlock.parentNode.insertBefore(copyButton, codeBlock.nextSibling);
        }
    });
}

// Fonction pour surligner la section active dans le menu
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.navbar .nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Ajouter un effet visuel sur les exemples au survol
const exampleContainers = document.querySelectorAll('.example-container');
exampleContainers.forEach(container => {
    container.addEventListener('mouseover', function() {
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        this.style.transition = 'box-shadow 0.3s ease';
    });
    
    container.addEventListener('mouseout', function() {
        this.style.boxShadow = 'none';
    });
});

// Ajouter des écouteurs d'événements pour les modales
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('show.bs.modal', function (event) {
        console.log('Modal en cours d\'ouverture:', this.id);
    });
    
    modal.addEventListener('hidden.bs.modal', function (event) {
        console.log('Modal fermée:', this.id);
    });
});

// Ajout de fonctionnalités pour l'accordéon
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', function() {
        // Ajouter une petite animation pour montrer quelle section est active
        if (!this.classList.contains('collapsed')) {
            this.style.backgroundColor = '#e7f1ff';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        }
    });
});

// Initialiser les toasts
document.querySelectorAll('.toast').forEach(toastEl => {
    const toast = new bootstrap.Toast(toastEl, {
        autohide: false // Désactiver la disparition automatique pour notre démonstration
    });
});

// Initialiser les graphiques avec Chart.js si la bibliothèque est chargée
function initCharts() {
    if (typeof Chart !== 'undefined') {
        // Graphique en ligne
        const lineCtx = document.getElementById('lineChart');
        if (lineCtx) {
            const lineChart = new Chart(lineCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
                    datasets: [{
                        label: 'Ventes 2023',
                        data: [12, 19, 3, 5, 2, 3],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Exemple de graphique en ligne'
                        }
                    }
                }
            });
        }

        // Graphique en barres
        const barCtx = document.getElementById('barChart');
        if (barCtx) {
            const barChart = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: ['Rouge', 'Bleu', 'Jaune', 'Vert', 'Violet', 'Orange'],
                    datasets: [{
                        label: 'Exemple de données',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
        
        console.log('Graphiques initialisés avec succès');
    } else {
        console.log('Chart.js n\'est pas disponible. Les graphiques ne peuvent pas être initialisés.');
        // Ajouter un message pour informer l'utilisateur que Chart.js n'est pas chargé
        const chartContainers = document.querySelectorAll('[id$="Chart"]');
        chartContainers.forEach(container => {
            const parent = container.parentNode;
            const message = document.createElement('p');
            message.classList.add('text-danger');
            message.innerHTML = '<strong>Note:</strong> Chart.js n\'est pas chargé. Pour voir les graphiques, ajoutez <code>&lt;script src="https://cdn.jsdelivr.net/npm/chart.js"&gt;&lt;/script&gt;</code> à votre page.';
            parent.appendChild(message);
        });
    }
}

// Exécuter l'initialisation des graphiques après le chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les graphiques après un court délai pour s'assurer que Chart.js est chargé s'il est présent
    setTimeout(initCharts, 500);
});

// Fonctions pour les formulaires d'authentification
function setupAuthenticationForms() {
    // Formulaire de connexion
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let isValid = validateForm(this);
            
            if (isValid) {
                const email = document.getElementById('loginEmail').value;
                // Simuler une connexion réussie
                showStatusMessage('loginStatusMessage', 'Connexion réussie! Redirection en cours...', 'success');
                
                // Simuler une redirection après 2 secondes
                setTimeout(() => {
                    resetForm(loginForm);
                }, 2000);
            }
        });
        
        // Afficher/masquer le mot de passe
        setupPasswordToggle('toggleLoginPassword', 'loginPassword');
    }
    
    // Formulaire d'inscription
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Vérifier que les mots de passe correspondent
            const password = document.getElementById('registerPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            let passwordMatch = true;
            
            if (password && confirmPassword) {
                if (password.value !== confirmPassword.value) {
                    confirmPassword.classList.add('is-invalid');
                    document.getElementById('confirmPasswordFeedback').textContent = 'Les mots de passe ne correspondent pas.';
                    passwordMatch = false;
                } else {
                    confirmPassword.classList.remove('is-invalid');
                }
            }
            
            // Vérifier que les conditions d'utilisation sont acceptées
            const termsCheck = document.getElementById('termsCheck');
            if (termsCheck && !termsCheck.checked) {
                termsCheck.classList.add('is-invalid');
                passwordMatch = false;
            }
            
            let isValid = validateForm(this) && passwordMatch;
            
            if (isValid) {
                // Simuler une inscription réussie
                showStatusMessage('registerStatusMessage', 'Compte créé avec succès! Un email de confirmation a été envoyé.', 'success');
                
                // Réinitialiser le formulaire après 2 secondes
                setTimeout(() => {
                    resetForm(registerForm);
                }, 2000);
            }
        });
        
        // Contrôle de la force du mot de passe
        const registerPassword = document.getElementById('registerPassword');
        if (registerPassword) {
            registerPassword.addEventListener('input', function() {
                checkPasswordStrength(this.value);
            });
            
            // Afficher/masquer le mot de passe
            setupPasswordToggle('toggleRegisterPassword', 'registerPassword');
        }
        
        // Accepter les termes depuis la modal
        const acceptTermsBtn = document.getElementById('acceptTermsBtn');
        if (acceptTermsBtn) {
            acceptTermsBtn.addEventListener('click', function() {
                const termsCheck = document.getElementById('termsCheck');
                if (termsCheck) {
                    termsCheck.checked = true;
                    termsCheck.classList.remove('is-invalid');
                }
            });
        }
    }
    
    // Formulaire de récupération de mot de passe
    const passwordResetForm = document.getElementById('passwordResetForm');
    if (passwordResetForm) {
        passwordResetForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const resetEmail = document.getElementById('resetEmail');
            
            if (!resetEmail.value || !resetEmail.checkValidity()) {
                resetEmail.classList.add('is-invalid');
                return;
            }
            
            resetEmail.classList.add('is-valid');
            
            const securityQuestionSection = document.getElementById('securityQuestionSection');
            const securityAnswerSection = document.getElementById('securityAnswerSection');
            const securityQuestion = document.getElementById('securityQuestion');
            const securityAnswer = document.getElementById('securityAnswer');
            const resetPasswordBtn = document.getElementById('resetPasswordBtn');
            const resetPasswordCancelBtn = document.getElementById('resetPasswordCancelBtn');
            
            // Première étape: afficher les questions de sécurité
            if (securityQuestionSection.classList.contains('d-none')) {
                securityQuestionSection.classList.remove('d-none');
                securityQuestion.disabled = false;
                
                // Changement du texte du bouton
                resetPasswordBtn.textContent = 'Vérifier';
                resetPasswordCancelBtn.classList.remove('d-none');
                
                showStatusMessage('resetStatusMessage', 'Email trouvé. Veuillez répondre à la question de sécurité.', 'info');
                return;
            }
            
            // Deuxième étape: vérifier la question de sécurité
            if (securityAnswerSection.classList.contains('d-none') && securityQuestion.value) {
                securityAnswerSection.classList.remove('d-none');
                securityAnswer.disabled = false;
                resetPasswordBtn.textContent = 'Vérifier la réponse';
                return;
            }
            
            // Troisième étape: vérifier la réponse et afficher les champs de mot de passe
            if (securityAnswer.value && document.getElementById('newPasswordSection').classList.contains('d-none')) {
                document.getElementById('newPasswordSection').classList.remove('d-none');
                document.getElementById('confirmNewPasswordSection').classList.remove('d-none');
                document.getElementById('newPassword').disabled = false;
                document.getElementById('confirmNewPassword').disabled = false;
                document.getElementById('toggleNewPassword').disabled = false;
                
                resetPasswordBtn.textContent = 'Réinitialiser le mot de passe';
                return;
            }
            
            // Dernière étape: réinitialiser le mot de passe
            const newPassword = document.getElementById('newPassword');
            const confirmNewPassword = document.getElementById('confirmNewPassword');
            
            if (newPassword.value && confirmNewPassword.value) {
                if (newPassword.value !== confirmNewPassword.value) {
                    confirmNewPassword.classList.add('is-invalid');
                    return;
                }
                
                // Réinitialisation réussie
                showStatusMessage('resetStatusMessage', 'Mot de passe réinitialisé avec succès! Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.', 'success');
                
                // Réinitialiser le formulaire après 3 secondes
                setTimeout(() => {
                    resetForm(passwordResetForm);
                    securityQuestionSection.classList.add('d-none');
                    securityAnswerSection.classList.add('d-none');
                    document.getElementById('newPasswordSection').classList.add('d-none');
                    document.getElementById('confirmNewPasswordSection').classList.add('d-none');
                    resetPasswordBtn.textContent = 'Envoyer un lien de réinitialisation';
                    resetPasswordCancelBtn.classList.add('d-none');
                }, 3000);
            }
        });
        
        // Bouton d'annulation
        const resetPasswordCancelBtn = document.getElementById('resetPasswordCancelBtn');
        if (resetPasswordCancelBtn) {
            resetPasswordCancelBtn.addEventListener('click', function() {
                resetForm(passwordResetForm);
                document.getElementById('securityQuestionSection').classList.add('d-none');
                document.getElementById('securityAnswerSection').classList.add('d-none');
                document.getElementById('newPasswordSection').classList.add('d-none');
                document.getElementById('confirmNewPasswordSection').classList.add('d-none');
                document.getElementById('resetPasswordBtn').textContent = 'Envoyer un lien de réinitialisation';
                resetPasswordCancelBtn.classList.add('d-none');
                document.getElementById('resetStatusMessage').classList.add('d-none');
            });
        }
        
        // Afficher/masquer le nouveau mot de passe
        setupPasswordToggle('toggleNewPassword', 'newPassword');
    }
    
    // Navigation entre les formulaires
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Faire défiler jusqu'au formulaire de récupération
            const resetForm = document.getElementById('passwordResetForm');
            if (resetForm) {
                resetForm.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('resetEmail').focus();
            }
        });
    }
    
    const createAccountLink = document.getElementById('createAccountLink');
    if (createAccountLink) {
        createAccountLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Faire défiler jusqu'au formulaire d'inscription
            const registerForm = document.getElementById('registerForm');
            if (registerForm) {
                registerForm.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('firstName').focus();
            }
        });
    }
}

// Fonctions utilitaires pour les formulaires
function validateForm(form) {
    // Utilisez la validation native de Bootstrap 5
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
    }
    return true;
}

function resetForm(form) {
    form.reset();
    form.classList.remove('was-validated');
    form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
        field.classList.remove('is-valid', 'is-invalid');
    });
    
    // Réinitialiser les messages d'état
    const statusMessages = form.querySelectorAll('[id$="StatusMessage"]');
    statusMessages.forEach(msg => msg.classList.add('d-none'));
    
    // Réinitialiser les éléments de force du mot de passe
    const passwordStrength = form.querySelector('#passwordStrength');
    if (passwordStrength) {
        passwordStrength.classList.add('d-none');
    }
}

function showStatusMessage(elementId, message, type) {
    const statusElement = document.getElementById(elementId);
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = `alert alert-${type} mt-3`;
        statusElement.classList.remove('d-none');
    }
}

function checkPasswordStrength(password) {
    const strengthBar = document.getElementById('passwordStrengthBar');
    const strengthText = document.getElementById('passwordStrengthText');
    const strengthSection = document.getElementById('passwordStrength');
    
    if (!strengthBar || !strengthText || !strengthSection) return;
    
    // Afficher la section de force du mot de passe
    strengthSection.classList.remove('d-none');
    
    // Évaluer la force du mot de passe
    let strength = 0;
    let feedback = '';
    
    if (password.length >= 8) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    
    // Mettre à jour la barre de progression
    strengthBar.style.width = `${strength}%`;
    strengthBar.setAttribute('aria-valuenow', strength);
    
    // Mettre à jour le texte d'information
    if (strength <= 25) {
        strengthBar.className = 'progress-bar bg-danger';
        feedback = 'Très faible';
    } else if (strength <= 50) {
        strengthBar.className = 'progress-bar bg-warning';
        feedback = 'Faible';
    } else if (strength <= 75) {
        strengthBar.className = 'progress-bar bg-info';
        feedback = 'Moyen';
    } else {
        strengthBar.className = 'progress-bar bg-success';
        feedback = 'Fort';
    }
    
    strengthText.textContent = feedback;
}

function setupPasswordToggle(toggleId, passwordId) {
    const toggleBtn = document.getElementById(toggleId);
    const passwordInput = document.getElementById(passwordId);
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Changer l'icône
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                if (type === 'text') {
                    icon.innerHTML = '👁️‍🗨️'; // Œil barré ou autre symbole pour "masquer"
                } else {
                    icon.innerHTML = '👁️'; // Œil normal pour "afficher"
                }
            }
        });
    }
}

// Fonctions pour les barres de recherche
function setupSearchFunctionality() {
    // Dictionnaire de démonstration des résultats de recherche
    const searchData = [
        { title: 'Introduction à Bootstrap', category: 'general', url: '#introduction' },
        { title: 'Grille et système de colonnes', category: 'layout', url: '#grid' },
        { title: 'Composants Boutons', category: 'components', url: '#buttons' },
        { title: 'Cartes (Cards)', category: 'components', url: '#cards' },
        { title: 'Formulaires', category: 'components', url: '#forms' },
        { title: 'Carrousel', category: 'components', url: '#carousel' },
        { title: 'Alertes', category: 'components', url: '#alerts' },
        { title: 'Badges', category: 'components', url: '#badges' },
        { title: 'Utilitaires de marge', category: 'utilities', url: '#margin' },
        { title: 'Utilitaires de padding', category: 'utilities', url: '#padding' },
        { title: 'Utilitaires de texte', category: 'utilities', url: '#text' },
        { title: 'Typographie', category: 'content', url: '#typography' },
        { title: 'Images', category: 'content', url: '#images' },
        { title: 'Tableaux', category: 'content', url: '#tables' },
        { title: 'Containers', category: 'layout', url: '#containers' },
        { title: 'Breakpoints', category: 'layout', url: '#breakpoints' },
        { title: 'Modals', category: 'components', url: '#modals' },
        { title: 'Pagination', category: 'components', url: '#pagination' },
        { title: 'Tooltips', category: 'components', url: '#tooltips' },
        { title: 'Popovers', category: 'components', url: '#popovers' }
    ];
    
    // Barre de recherche simple
    setupSimpleSearch('simpleSearchForm', 'simpleSearchInput', 'simpleSearchResults', 'simpleResultsList', searchData);
    
    // Barre de recherche dans navbar
    setupNavbarSearch('navbarSearchForm', 'navbarSearchInput', 'navbarSearchResults', 'navResultsList', searchData);
    
    // Barre de recherche avancée avec autocomplétion
    setupAdvancedSearch('advancedSearchForm', 'advancedSearchInput', 'advancedSearchResults', 'advancedResultsList', 'autocompleteResults', 'autocompleteSuggestions', searchData);
}

function setupSimpleSearch(formId, inputId, resultsId, listId, searchData) {
    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);
    const resultsContainer = document.getElementById(resultsId);
    const resultsList = document.getElementById(listId);
    
    if (!form || !input || !resultsContainer || !resultsList) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = input.value.toLowerCase().trim();
        
        if (query.length < 2) {
            resultsContainer.classList.add('d-none');
            return;
        }
        
        // Filtrer les résultats
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        
        // Afficher les résultats
        displaySearchResults(results, resultsList);
        resultsContainer.classList.remove('d-none');
    });
}

function setupNavbarSearch(formId, inputId, resultsId, listId, searchData) {
    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);
    const resultsContainer = document.getElementById(resultsId);
    const resultsList = document.getElementById(listId);
    
    if (!form || !input || !resultsContainer || !resultsList) return;
    
    // Afficher/masquer les résultats lors de la frappe
    input.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            resultsContainer.classList.add('d-none');
            return;
        }
        
        // Filtrer les résultats
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        ).slice(0, 5); // Limiter à 5 résultats
        
        // Afficher les résultats
        displaySearchResults(results, resultsList, true);
        resultsContainer.classList.remove('d-none');
    });
    
    // Masquer les résultats lorsque l'utilisateur clique ailleurs
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.add('d-none');
        }
    });
    
    // Soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = input.value.toLowerCase().trim();
        
        if (query.length < 2) return;
        
        // Action de recherche complète, pourrait rediriger vers une page de résultats
        alert(`Recherche pour: ${query}`);
        resultsContainer.classList.add('d-none');
    });
}

function setupAdvancedSearch(formId, inputId, resultsId, listId, autocompleteId, suggestionsId, searchData) {
    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);
    const resultsContainer = document.getElementById(resultsId);
    const resultsList = document.getElementById(listId);
    const autocompleteContainer = document.getElementById(autocompleteId);
    const suggestionsList = document.getElementById(suggestionsId);
    const categorySelect = document.getElementById('searchCategory');
    const sortSelect = document.getElementById('searchSort');
    const resultCount = document.getElementById('resultCount');
    
    if (!form || !input || !resultsContainer || !resultsList) return;
    
    // Autocomplétion
    input.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            autocompleteContainer.classList.add('d-none');
            return;
        }
        
        // Trouver des suggestions
        const suggestions = searchData
            .filter(item => item.title.toLowerCase().includes(query))
            .map(item => item.title)
            .slice(0, 5); // Limiter à 5 suggestions
        
        if (suggestions.length === 0) {
            autocompleteContainer.classList.add('d-none');
            return;
        }
        
        // Afficher les suggestions
        suggestionsList.innerHTML = '';
        suggestions.forEach(suggestion => {
            const item = document.createElement('button');
            item.className = 'list-group-item list-group-item-action';
            item.textContent = suggestion;
            item.addEventListener('click', function() {
                input.value = suggestion;
                autocompleteContainer.classList.add('d-none');
                input.focus();
            });
            suggestionsList.appendChild(item);
        });
        
        autocompleteContainer.classList.remove('d-none');
    });
    
    // Masquer l'autocomplétion lorsque l'utilisateur clique ailleurs
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !autocompleteContainer.contains(e.target)) {
            autocompleteContainer.classList.add('d-none');
        }
    });
    
    // Recherche avec filtres
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = input.value.toLowerCase().trim();
        const category = categorySelect.value;
        const sortBy = sortSelect.value;
        
        // Filtrer les résultats
        let results = searchData.filter(item => {
            const matchesQuery = item.title.toLowerCase().includes(query) || 
                                item.category.toLowerCase().includes(query);
            const matchesCategory = category ? item.category === category : true;
            return matchesQuery && matchesCategory;
        });
        
        // Trier les résultats
        if (sortBy === 'name') {
            results.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'recent') {
            // Simulation de tri par date (pour la démonstration)
            results.reverse();
        }
        
        // Afficher les résultats
        displaySearchResults(results, resultsList);
        resultsContainer.classList.remove('d-none');
        
        // Mettre à jour le compteur
        if (resultCount) {
            resultCount.textContent = results.length;
        }
    });
}

function displaySearchResults(results, container, asLinks = false) {
    container.innerHTML = '';
    
    if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = asLinks ? 'list-group-item' : 'list-group-item text-center text-muted';
        noResults.textContent = 'Aucun résultat trouvé';
        container.appendChild(noResults);
        return;
    }
    
    results.forEach(result => {
        const item = document.createElement(asLinks ? 'a' : 'div');
        item.className = asLinks ? 'list-group-item list-group-item-action' : 'list-group-item';
        
        if (asLinks) {
            item.href = result.url;
        }
        
        const title = document.createElement('div');
        title.className = 'd-flex justify-content-between align-items-center';
        
        const titleText = document.createElement('strong');
        titleText.textContent = result.title;
        
        const badge = document.createElement('span');
        badge.className = `badge bg-${getCategoryColor(result.category)}`;
        badge.textContent = result.category;
        
        title.appendChild(titleText);
        title.appendChild(badge);
        
        item.appendChild(title);
        
        if (!asLinks) {
            const link = document.createElement('div');
            link.className = 'mt-2';
            const linkBtn = document.createElement('a');
            linkBtn.href = result.url;
            linkBtn.className = 'btn btn-sm btn-outline-primary';
            linkBtn.textContent = 'Voir la documentation';
            link.appendChild(linkBtn);
            item.appendChild(link);
        }
        
        container.appendChild(item);
    });
}

function getCategoryColor(category) {
    switch(category) {
        case 'components': return 'primary';
        case 'layout': return 'success';
        case 'content': return 'info';
        case 'utilities': return 'warning';
        default: return 'secondary';
    }
}

// Initialisation des fonctionnalités au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les fonctionnalités d'authentification
    setupAuthenticationForms();
    
    // Initialiser les fonctionnalités de recherche
    setupSearchFunctionality();
    
    // ...autres initialisations de fonctionnalités précédemment ajoutées
});

