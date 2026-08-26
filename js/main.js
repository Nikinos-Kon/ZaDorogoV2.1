/**
 * Main Interactive Application Logic for PosazhuZaDorogo (PZD)
 * Handles Splash -> Nav transform, section themes, accordions, chat,
 * hover unfolds, real-time leads, and cookie integrations.
 */

// Force page to open at the very top — zero visible scrolling.
//
// Strategy: the <head> applies class "loading-lock" to <html>, which sets
// visibility:hidden + overflow:hidden. The page is completely invisible while
// the browser may restore a cached scroll position. We scroll to 0 and only
// then reveal the page — the user sees nothing but a black screen, then the
// logo appears instantly.

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Instant scroll — runs as this script is parsed (page still hidden)
window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
    // Clear any URL hash that could anchor to a lower section
    if (window.location.hash) {
        window.history.replaceState('', document.title, window.location.pathname + window.location.search);
    }

    // Final instant scroll after everything is loaded
    window.scrollTo(0, 0);

    // Reveal the page now that scroll is at 0
    requestAnimationFrame(() => {
        document.documentElement.classList.remove('loading-lock');
        // Enable smooth scrolling for subsequent user interactions
        document.documentElement.style.scrollBehavior = 'smooth';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    initSplashScrollAnimation();
    initDynamicNavbar();
    initLanguageDropdown();
    initOnlineChat();
    initBurgerMenu();
    initServiceAccordions();
    initConsultationForm();
    initCookieConsent();
    initSectionScrollEffects();
    if (window.MapManager) {
        window.MapManager.init();
    }
});

/* ==========================================================================
   1. Splash Screen & Logo Sliding Transformation ("ПосажуZaДорого" -> "ПZД")
   ========================================================================== */
function initSplashScrollAnimation() {
    const splashSection = document.getElementById('splash-hero');
    const stickyNav = document.getElementById('sticky-nav');
    const splashLogo = document.getElementById('splash-logo-container');
    const navLogo = document.getElementById('nav-logo-badge');
    const heroCard = document.getElementById('hero-perspective-card');

    let isScrolled = false;

    function handleScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        const triggerThreshold = 80;

        if (scrollY > triggerThreshold && !isScrolled) {
            isScrolled = true;
            document.body.classList.add('is-scrolled');
            if (splashSection) splashSection.classList.add('splash-hidden');
            if (stickyNav) stickyNav.classList.add('nav-visible');
            if (heroCard) heroCard.classList.add('card-revealed');
        } else if (scrollY <= 10 && isScrolled) {
            isScrolled = false;
            document.body.classList.remove('is-scrolled');
            if (splashSection) splashSection.classList.remove('splash-hidden');
            if (stickyNav) stickyNav.classList.remove('nav-visible');
            if (heroCard) heroCard.classList.remove('card-revealed');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial state
    handleScroll();

    // Clicking anywhere on the splash hero or scrolling smoothly scrolls down
    if (splashSection) {
        splashSection.addEventListener('click', () => {
            const firstContent = document.getElementById('section-hero-main');
            if (firstContent) {
                firstContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/* ==========================================================================
   2. Dynamic Sticky Navbar & Theme Adaptation
   ========================================================================== */
function initDynamicNavbar() {
    const stickyNav = document.getElementById('sticky-nav');
    const sections = document.querySelectorAll('[data-nav-theme]');

    if (!stickyNav || !sections.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const theme = entry.target.getAttribute('data-nav-theme') || 'theme-dark';
                // Remove all previous theme classes
                stickyNav.classList.remove('theme-dark', 'theme-beige', 'theme-mahogany', 'theme-gold', 'theme-charcoal');
                stickyNav.classList.add(theme);
            }
        });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
}

/* ==========================================================================
   3. Language Dropdown (Hover Accordion Roll-Out)
/* ==========================================================================
   Helper: Close all navbar dropdowns
   ========================================================================== */
function closeAllNavDropdowns(exceptId = null) {
    const dropdowns = [
        { id: 'lang', el: document.getElementById('lang-dropdown'), trigger: null },
        { id: 'chat', el: document.getElementById('chat-dropdown'), trigger: null },
        { id: 'burger', el: document.getElementById('burger-dropdown'), icon: document.getElementById('burger-icon-bars') }
    ];

    dropdowns.forEach(item => {
        if (item.id !== exceptId && item.el) {
            item.el.classList.remove('accordion-open');
            if (item.icon) item.icon.classList.remove('rotate-90');
        }
    });
}

// Global outside click listener to close open nav dropdowns
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-wrapper')) {
        closeAllNavDropdowns();
    }
});

/* ==========================================================================
   3. Language Dropdown (Click & Hover Accordion)
   ========================================================================== */
function initLanguageDropdown() {
    const langWrapper = document.getElementById('nav-item-lang');
    const langBtn = langWrapper ? langWrapper.querySelector('.nav-link-btn') : null;
    const langDropdown = document.getElementById('lang-dropdown');

    if (!langWrapper || !langDropdown) return;

    let timeoutId = null;
    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    function openDropdown() {
        clearTimeout(timeoutId);
        closeAllNavDropdowns('lang');
        langDropdown.classList.add('accordion-open');
    }

    function closeDropdown() {
        timeoutId = setTimeout(() => {
            langDropdown.classList.remove('accordion-open');
        }, 220);
    }

    // Toggle on click / tap
    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = langDropdown.classList.contains('accordion-open');
            if (isOpen) {
                langDropdown.classList.remove('accordion-open');
            } else {
                openDropdown();
            }
        });
    }

    // Hover support for mouse devices
    if (!isTouchDevice) {
        langWrapper.addEventListener('mouseenter', openDropdown);
        langWrapper.addEventListener('mouseleave', closeDropdown);
        langDropdown.addEventListener('mouseenter', openDropdown);
        langDropdown.addEventListener('mouseleave', closeDropdown);
    }

    // Language selection
    langDropdown.querySelectorAll('.lang-row').forEach(row => {
        row.addEventListener('click', (e) => {
            e.stopPropagation();
            const selectedLang = row.getAttribute('data-lang');
            if (selectedLang && window.I18nManager) {
                window.I18nManager.applyLanguage(selectedLang);
            }
            langDropdown.classList.remove('accordion-open');
        });
    });
}

/* ==========================================================================
   4. Online Consultation & Live Chat Accordion
   ========================================================================== */
function initOnlineChat() {
    const chatWrapper = document.getElementById('nav-item-chat');
    const chatBtn = chatWrapper ? chatWrapper.querySelector('.nav-link-btn') : null;
    const chatDropdown = document.getElementById('chat-dropdown');
    const chatForm = document.getElementById('chat-widget-form');
    const chatInput = document.getElementById('chat-widget-input');
    const chatMessages = document.getElementById('chat-messages-container');

    if (!chatWrapper || !chatDropdown) return;

    let timeoutId = null;
    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    function openChat() {
        clearTimeout(timeoutId);
        closeAllNavDropdowns('chat');
        chatDropdown.classList.add('accordion-open');
        if (chatInput) {
            setTimeout(() => chatInput.focus(), 150);
        }
    }

    function closeChat() {
        timeoutId = setTimeout(() => {
            chatDropdown.classList.remove('accordion-open');
        }, 300);
    }

    // Toggle on click / tap
    if (chatBtn) {
        chatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = chatDropdown.classList.contains('accordion-open');
            if (isOpen) {
                chatDropdown.classList.remove('accordion-open');
            } else {
                openChat();
            }
        });
    }

    // Hover support for mouse devices
    if (!isTouchDevice) {
        chatWrapper.addEventListener('mouseenter', openChat);
        chatWrapper.addEventListener('mouseleave', closeChat);
        chatDropdown.addEventListener('mouseenter', openChat);
        chatDropdown.addEventListener('mouseleave', closeChat);
    }

    // Prevent click inside dropdown from bubbling up and closing it
    chatDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    if (chatForm && chatInput && chatMessages) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message bubble
            const userBubble = document.createElement('div');
            userBubble.className = 'chat-bubble user-bubble';
            userBubble.textContent = message;
            chatMessages.appendChild(userBubble);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Add typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'chat-bubble bot-bubble typing-bubble';
            typingIndicator.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Automatic realistic bot reply
            setTimeout(() => {
                typingIndicator.remove();
                const botBubble = document.createElement('div');
                botBubble.className = 'chat-bubble bot-bubble';
                const botText = (window.I18nManager && window.I18nManager.translationsCache[window.I18nManager.currentLang]?.chat_bot_reply) || 'Ищем свободного оператора...';
                botBubble.textContent = botText;
                chatMessages.appendChild(botBubble);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 850);
        });
    }
}

/* ==========================================================================
   5. Hamburger Menu (90-degree Rotation & 3D Press Accordion)
   ========================================================================== */
function initBurgerMenu() {
    const burgerWrapper = document.getElementById('nav-item-burger');
    const burgerTrigger = burgerWrapper ? burgerWrapper.querySelector('.burger-trigger-btn') : null;
    const burgerMenu = document.getElementById('burger-dropdown');
    const burgerIcon = document.getElementById('burger-icon-bars');

    if (!burgerWrapper || !burgerMenu) return;

    let timeoutId = null;
    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    function openMenu() {
        clearTimeout(timeoutId);
        closeAllNavDropdowns('burger');
        if (burgerIcon) burgerIcon.classList.add('rotate-90');
        burgerMenu.classList.add('accordion-open');
    }

    function closeMenu() {
        timeoutId = setTimeout(() => {
            if (burgerIcon) burgerIcon.classList.remove('rotate-90');
            burgerMenu.classList.remove('accordion-open');
        }, 250);
    }

    // Toggle on click / tap
    if (burgerTrigger) {
        burgerTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = burgerMenu.classList.contains('accordion-open');
            if (isOpen) {
                if (burgerIcon) burgerIcon.classList.remove('rotate-90');
                burgerMenu.classList.remove('accordion-open');
            } else {
                openMenu();
            }
        });
    }

    // Hover support for mouse devices
    if (!isTouchDevice) {
        burgerWrapper.addEventListener('mouseenter', openMenu);
        burgerWrapper.addEventListener('mouseleave', closeMenu);
        burgerMenu.addEventListener('mouseenter', openMenu);
        burgerMenu.addEventListener('mouseleave', closeMenu);
    }

    // Click behavior for 3D buttons inside menu
    burgerMenu.querySelectorAll('.burger-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
            // Auto close on click
            if (burgerIcon) burgerIcon.classList.remove('rotate-90');
            burgerMenu.classList.remove('accordion-open');
        });
    });
}

/* ==========================================================================
   6. Service Accordions with Click and Hover '+'
   ========================================================================== */
function initServiceAccordions() {
    const tabButtons = document.querySelectorAll('.services-tab-btn');
    const tabPanels = document.querySelectorAll('.services-tab-content');

    // Switch between Individuals and Corporate tabs
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const activePanel = document.getElementById(`tab-${targetTab}`);
            if (activePanel) activePanel.classList.add('active');
        });
    });

    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    // Expand/collapse accordion on each service item
    document.querySelectorAll('.service-item-card').forEach(card => {
        const header = card.querySelector('.service-card-header');
        const descSheet = card.querySelector('.service-desc-sheet');

        if (!header || !descSheet) return;

        // Click / Tap toggle (works everywhere, essential on mobile)
        header.addEventListener('click', () => {
            const isCurrentlyExpanded = card.classList.contains('is-expanded');
            card.classList.toggle('is-expanded');
        });

        // Hover accordion for desktop mice
        if (!isTouchDevice) {
            let closeTimeout = null;
            card.addEventListener('mouseenter', () => {
                clearTimeout(closeTimeout);
                card.classList.add('is-expanded');
            });
            card.addEventListener('mouseleave', () => {
                closeTimeout = setTimeout(() => {
                    card.classList.remove('is-expanded');
                }, 180);
            });
        }
    });
}

/* ==========================================================================
   7. Consultation Form & Real-time Auto Draft in Cookie
   ========================================================================== */
function initConsultationForm() {
    const form = document.getElementById('consultation-booking-form');
    if (!form) return;

    const nameInput = document.getElementById('client-name');
    const phoneInput = document.getElementById('client-phone');
    const emailInput = document.getElementById('client-email');
    const cityInput = document.getElementById('client-city');
    const categoryInput = document.getElementById('client-category');
    const messageInput = document.getElementById('client-message');
    const successBox = document.getElementById('form-success-notification');

    // Restore draft from cookie if available
    if (window.CookieManager) {
        const draft = window.CookieManager.getFormDraft();
        if (draft) {
            if (nameInput && draft.name) nameInput.value = draft.name;
            if (phoneInput && draft.phone) phoneInput.value = draft.phone;
            if (emailInput && draft.email) emailInput.value = draft.email;
            if (cityInput && draft.city) cityInput.value = draft.city;
            if (categoryInput && draft.category) categoryInput.value = draft.category;
            if (messageInput && draft.message) messageInput.value = draft.message;
        }

        // Auto-save draft on input changes
        const saveDraft = () => {
            window.CookieManager.saveFormDraft({
                name: nameInput ? nameInput.value : '',
                phone: phoneInput ? phoneInput.value : '',
                email: emailInput ? emailInput.value : '',
                city: cityInput ? cityInput.value : '',
                category: categoryInput ? categoryInput.value : '',
                message: messageInput ? messageInput.value : ''
            });
        };

        [nameInput, phoneInput, emailInput, cityInput, categoryInput, messageInput].forEach(el => {
            if (el) el.addEventListener('input', saveDraft);
        });
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = {
            name: nameInput ? nameInput.value.trim() : '',
            phone: phoneInput ? phoneInput.value.trim() : '',
            email: emailInput ? emailInput.value.trim() : '',
            city: cityInput ? cityInput.value : '',
            category: categoryInput ? categoryInput.value : '',
            message: messageInput ? messageInput.value.trim() : ''
        };

        if (!data.name || !data.phone) {
            alert('Пожалуйста, укажите ваше имя и номер телефона.');
            return;
        }

        // Save lead in real-time
        if (window.LeadsManager) {
            window.LeadsManager.saveLead(data);
        }

        // Clear draft cookie & form
        if (window.CookieManager) {
            window.CookieManager.clearFormDraft();
        }
        form.reset();

        // Show success animation
        if (successBox) {
            successBox.classList.add('show-success');
            setTimeout(() => {
                successBox.classList.remove('show-success');
            }, 6000);
        }
    });
}

/* ==========================================================================
   8. Real-time Lead Viewer Modal (For Testing & Live File Export)
   ========================================================================== */
function initRealtimeLeadViewer() {
    const modal = document.getElementById('leads-admin-modal');
    const toggleBtn = document.getElementById('open-leads-admin-btn');
    const closeBtn = document.getElementById('close-leads-admin-btn');
    const leadsListContainer = document.getElementById('admin-leads-list');
    const downloadTxtBtn = document.getElementById('download-leads-txt-btn');
    const downloadJsonBtn = document.getElementById('download-leads-json-btn');
    const clearLeadsBtn = document.getElementById('clear-leads-btn');
    const countBadge = document.getElementById('admin-leads-count-badge');

    function renderLeads() {
        if (!leadsListContainer || !window.LeadsManager) return;
        const leads = window.LeadsManager.getAll();

        if (countBadge) countBadge.textContent = leads.length;

        if (!leads.length) {
            leadsListContainer.innerHTML = '<div class="admin-no-leads">Заявок пока нет. Отправьте форму записи для проверки в реальном времени.</div>';
            return;
        }

        leadsListContainer.innerHTML = leads.map(l => `
            <div class="admin-lead-card">
                <div class="admin-lead-header">
                    <span class="lead-id-tag">#${l.id}</span>
                    <span class="lead-time-tag">${l.dateFormatted}</span>
                </div>
                <div class="admin-lead-body">
                    <div><strong>Имя / Псевдоним:</strong> ${escapeHtml(l.name)}</div>
                    <div><strong>Телефон:</strong> <a href="tel:${escapeHtml(l.phone)}">${escapeHtml(l.phone)}</a></div>
                    <div><strong>Email:</strong> ${escapeHtml(l.email)}</div>
                    <div><strong>Город:</strong> ${escapeHtml(l.city)}</div>
                    <div><strong>Категория:</strong> <span class="lead-cat-pill">${escapeHtml(l.category)}</span></div>
                    <div class="lead-msg-text"><strong>Описание проблемы:</strong><br>${escapeHtml(l.message || '—')}</div>
                </div>
            </div>
        `).join('');
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            renderLeads();
            if (modal) modal.classList.add('modal-open');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.remove('modal-open'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('modal-open');
        });
    }

    if (downloadTxtBtn && window.LeadsManager) {
        downloadTxtBtn.addEventListener('click', () => window.LeadsManager.downloadFile('txt'));
    }

    if (downloadJsonBtn && window.LeadsManager) {
        downloadJsonBtn.addEventListener('click', () => window.LeadsManager.downloadFile('json'));
    }

    if (clearLeadsBtn && window.LeadsManager) {
        clearLeadsBtn.addEventListener('click', () => {
            if (confirm('Очистить весь журнал заявок?')) {
                window.LeadsManager.clearAll();
                renderLeads();
            }
        });
    }

    // Auto-update modal if new lead comes in
    window.addEventListener('pzd_new_lead', () => {
        renderLeads();
    });

    renderLeads();
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

/* ==========================================================================
   9. Cookie Consent Banner (Real Cookie Integration)
   ========================================================================== */
function initCookieConsent() {
    const banner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const declineBtn = document.getElementById('cookie-decline-btn');

    if (!banner || !window.CookieManager) return;

    function hideBanner() {
        banner.classList.remove('cookie-banner-visible');
    }

    // Check if consent has already been given or dismissed
    if (!window.CookieManager.hasConsent()) {
        setTimeout(() => {
            banner.classList.add('cookie-banner-visible');
        }, 800);
    }

    if (acceptBtn) {
        const handleAccept = (e) => {
            if (e) e.preventDefault();
            window.CookieManager.setConsent('accepted');
            hideBanner();
        };
        acceptBtn.addEventListener('click', handleAccept);
    }

    if (declineBtn) {
        const handleDecline = (e) => {
            if (e) e.preventDefault();
            window.CookieManager.setConsent('declined');
            hideBanner();
        };
        declineBtn.addEventListener('click', handleDecline);
    }
}

/* ==========================================================================
   10. Multi-layer Section Scroll & Reveal Effects
   ========================================================================== */
function initSectionScrollEffects() {
    const sections = document.querySelectorAll('.page-section');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.15
    });

    sections.forEach(sec => observer.observe(sec));
}
