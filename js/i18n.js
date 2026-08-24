/**
 * Localization Engine with Cookie Persistence and Dynamic Flag Badge support
 */

const I18nManager = {
    defaultLang: 'ru',
    languages: {
        'ru': {
            code: 'RU',
            name: 'Русский',
            flag: '🇷🇺',
            flagClass: 'flag-ru'
        },
        'en': {
            code: 'EN',
            name: 'English (US)',
            flag: '🇺🇸',
            flagClass: 'flag-en'
        },
        'zh': {
            code: 'ZH',
            name: '中文',
            flag: '🇨🇳',
            flagClass: 'flag-zh'
        },
        'be': {
            code: 'BE',
            name: 'Беларуская',
            flag: '🇧🇾',
            flagClass: 'flag-be'
        }
    },
    translationsCache: {},
    currentLang: 'ru',

    init() {
        // Retrieve language preference from cookies or localStorage
        let savedLang = (window.CookieManager && window.CookieManager.get('pzd_lang')) || localStorage.getItem('pzd_lang') || this.defaultLang;
        if (!this.languages[savedLang]) savedLang = this.defaultLang;

        this.applyLanguage(savedLang);
    },

    async loadTranslations(lang) {
        if (this.translationsCache[lang]) {
            return this.translationsCache[lang];
        }
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            const data = await response.json();
            this.translationsCache[lang] = data;
            return data;
        } catch (error) {
            console.error(`Failed to load translations for ${lang}:`, error);
            return null;
        }
    },

    async applyLanguage(lang) {
        if (!this.languages[lang]) lang = this.defaultLang;
        const translations = await this.loadTranslations(lang);
        if (!translations) return;

        this.currentLang = lang;
        document.documentElement.lang = lang;

        // Save preference in cookies and localStorage
        if (window.CookieManager) {
            window.CookieManager.set('pzd_lang', lang, 365);
        }
        localStorage.setItem('pzd_lang', lang);

        // Update elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key] !== undefined) {
                el.innerHTML = translations[key];
            }
            el.classList.add('loaded');
        });

        // Update placeholders with data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[key] !== undefined) {
                el.placeholder = translations[key];
            }
        });

        // Update titles with data-i18n-title
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (translations[key] !== undefined) {
                el.title = translations[key];
            }
        });

        // Update top-bar logo flag badge
        this.updateLogoFlagBadge(lang);

        // Update active class in language picker table
        document.querySelectorAll('.lang-row').forEach(row => {
            if (row.getAttribute('data-lang') === lang) {
                row.classList.add('active');
            } else {
                row.classList.remove('active');
            }
        });

        // Broadcast language change
        window.dispatchEvent(new CustomEvent('pzd_language_changed', { detail: { lang, translations } }));
    },

    updateLogoFlagBadge(lang) {
        const logoBadge = document.getElementById('nav-logo-badge');
        if (!logoBadge) return;

        // Remove previous flag classes
        logoBadge.classList.remove('flag-ru', 'flag-en', 'flag-zh', 'flag-be');
        const langInfo = this.languages[lang] || this.languages['ru'];
        logoBadge.classList.add(langInfo.flagClass);
    }
};

window.I18nManager = I18nManager;

document.addEventListener('DOMContentLoaded', () => {
    I18nManager.init();
});
