/*
 * BANK OF AMERICA MOCKUP - CORE JAVASCRIPT
 * This file handles interactive components like the navigation, search modal, and new virtual assistant.
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // -------------------- 1. GLOBAL SEARCH FUNCTIONALITY --------------------
    const searchModal = document.getElementById('searchModal');
    const searchBtn = document.querySelector('.btn-search');
    const closeSearchBtn = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('active');
            searchInput.focus();
        });
    }

    if (closeSearchBtn) {
        closeSearchBtn.addEventListener('click', () => {
            searchModal.classList.remove('active');
        });
    }

    // Redirect search input on Enter key press
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && searchInput.value.trim() !== '') {
                // SIMULATION: Redirect to the new search results page
                window.location.href = `pages/search-results.html?query=${encodeURIComponent(searchInput.value.trim())}`;
                searchModal.classList.remove('active');
            }
        });
    }

    // Close modal on outside click
    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });
    }

    // -------------------- 2. MOBILE MENU TOGGLE --------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
            // Toggle body scroll lock
            document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Mobile Dropdown Toggles (for the menu inside the overlay)
    const mobileDropdownToggles = document.querySelectorAll('.mobile-nav-menu .dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = toggle.closest('.mobile-nav-item');
            const content = parent.querySelector('.mobile-dropdown-content');
            
            // Close other open mobile menus
            document.querySelectorAll('.mobile-nav-item').forEach(item => {
                const itemContent = item.querySelector('.mobile-dropdown-content');
                if (itemContent && itemContent !== content && itemContent.style.display === 'block') {
                     itemContent.style.display = 'none';
                }
            });

            // Toggle current menu
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    // -------------------- 3. MEGA MENU HOVER LOGIC (Desktop) --------------------
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.mega-menu');
        if (menu) {
            // Function to handle opening the menu
            const openMenu = () => {
                // Close any other open mega menus
                document.querySelectorAll('.mega-menu.active').forEach(openMenu => {
                    openMenu.classList.remove('active');
                    openMenu.style.display = 'none';
                });
                // Open the target menu
                menu.style.display = 'grid'; // Use grid for mega menu structure
                setTimeout(() => menu.classList.add('active'), 10); // Small delay for CSS transition
            };

            // Function to handle closing the menu
            const closeMenu = () => {
                menu.classList.remove('active');
                setTimeout(() => menu.style.display = 'none', 300); // Wait for CSS transition
            };

            // Desktop: Open on mouseenter, close on mouseleave (Debouncing not implemented for simplicity)
            dropdown.addEventListener('mouseenter', openMenu);
            dropdown.addEventListener('mouseleave', closeMenu);
        }
    });
    
    // -------------------- 4. VIRTUAL ASSISTANT (ERICA) MOCK --------------------
    const assistantBtn = document.getElementById('assistantBtn');
    const assistantModal = document.getElementById('assistantModal');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const assistantBody = document.getElementById('assistantBody');

    // Initial Bot Message
    if(assistantBody) {
        setTimeout(() => {
            appendMessage('Hi! I\'m Erica, your virtual financial assistant. How can I help you today?', 'bot');
        }, 500);
    }

    if(assistantBtn) {
        assistantBtn.addEventListener('click', () => {
            assistantModal.classList.add('active');
            assistantBtn.style.display = 'none';
        });
    }
    
    if(chatCloseBtn) {
        chatCloseBtn.addEventListener('click', () => {
            assistantModal.classList.remove('active');
            assistantBtn.style.display = 'flex'; // Show button again
        });
    }

    function appendMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('assistant-message', type);
        messageDiv.textContent = text;
        assistantBody.appendChild(messageDiv);
        assistantBody.scrollTop = assistantBody.scrollHeight; // Auto-scroll to bottom
    }

    function handleChatSend() {
        const userText = chatInput.value.trim();
        if (userText === '') return;

        appendMessage(userText, 'user');
        chatInput.value = '';

        // Simple Bot Response Simulation
        setTimeout(() => {
            const lowerText = userText.toLowerCase();
            let botResponse = 'I apologize, I\'m just a mock-up and can only handle simple requests. Try asking about **hours**, **fees**, or **dashboard**.';
            
            if (lowerText.includes('hour') || lowerText.includes('open')) {
                botResponse = 'Our general customer service line is available 24/7. Branch hours vary, please use the Branch/ATM Locator.';
            } else if (lowerText.includes('fee') || lowerText.includes('charge')) {
                 botResponse = 'For specific fee schedules, please visit the "Fees & Services" section linked in our footer.';
            } else if (lowerText.includes('dashboard') || lowerText.includes('login')) {
                botResponse = 'You can access your account dashboard by using the Sign In button at the top right of the page.';
            } else if (lowerText.includes('thank') || lowerText.includes('bye')) {
                botResponse = 'You\'re welcome! Have a great day.';
            }

            appendMessage(botResponse, 'bot');
        }, 800);
    }
    
    if(chatSendBtn) {
        chatSendBtn.addEventListener('click', handleChatSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleChatSend();
            }
        });
    }

});