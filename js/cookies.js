/**
 * Real Working Cookie Engine for PosazhuZaDorogo
 * Uses document.cookie with secure practices, expiration handling,
 * and user consent management.
 */

const CookieManager = {
    // Set a cookie with standard attributes
    set(name, value, days = 30) {
        try {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = `expires=${date.toUTCString()}`;
            // SameSite=Lax and Path=/ for robust local & server-wide operation
            document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
            return true;
        } catch (e) {
            console.error('Cookie set error:', e);
            return false;
        }
    },

    // Get a cookie by name
    get(name) {
        try {
            const nameEQ = `${encodeURIComponent(name)}=`;
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let c = cookies[i].trim();
                if (c.indexOf(nameEQ) === 0) {
                    return decodeURIComponent(c.substring(nameEQ.length));
                }
            }
            return null;
        } catch (e) {
            console.error('Cookie get error:', e);
            return null;
        }
    },

    // Delete a cookie
    delete(name) {
        document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },

    // Check if user has made a consent choice
    hasConsent() {
        return this.get('pzd_cookie_consent_v2') !== null || sessionStorage.getItem('pzd_cookie_dismissed') === 'true';
    },

    // Save consent status ('accepted' | 'declined')
    setConsent(status) {
        if (status === 'accepted') {
            this.set('pzd_cookie_consent_v2', 'accepted', 365);
            try { localStorage.setItem('pzd_cookie_consent_v2', 'accepted'); } catch(e) {}
            // Generate or preserve persistent session token in cookie
            if (!this.get('pzd_session_id')) {
                const randomId = 'PZD-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-' + Date.now();
                this.set('pzd_session_id', randomId, 90);
            }
        } else {
            // User declined: remember choice for this session, remove existing tracking cookies
            try { sessionStorage.setItem('pzd_cookie_dismissed', 'true'); } catch(e) {}
            this.delete('pzd_cookie_consent_v2');
            this.delete('pzd_session_id');
            this.delete('pzd_form_draft');
        }
    },

    // Auto-save form draft to cookie
    saveFormDraft(formData) {
        if (!this.hasConsent()) return;
        this.set('pzd_form_draft', JSON.stringify(formData), 7);
    },

    // Retrieve form draft from cookie
    getFormDraft() {
        const draft = this.get('pzd_form_draft');
        if (!draft) return null;
        try {
            return JSON.parse(draft);
        } catch (e) {
            return null;
        }
    },

    // Clear form draft cookie
    clearFormDraft() {
        this.delete('pzd_form_draft');
    }
};

// Expose globally
window.CookieManager = CookieManager;
