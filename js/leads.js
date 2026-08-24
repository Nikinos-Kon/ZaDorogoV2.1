/**
 * Real-time Lead & Consultation Application Logger
 * Allows viewing, exporting, and logging applications in real-time.
 */

const LeadsManager = {
    STORAGE_KEY: 'pzd_applications_log',

    // Get all leads
    getAll() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error('Error reading leads:', e);
            return [];
        }
    },

    // Save a new application
    saveLead(data) {
        const leads = this.getAll();
        const newLead = {
            id: 'LEAD-' + (leads.length + 1).toString().padStart(4, '0'),
            timestamp: new Date().toISOString(),
            dateFormatted: new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }) + ' (МСК)',
            name: data.name || 'Аноним',
            phone: data.phone || 'Не указан',
            email: data.email || 'Не указан',
            city: data.city || 'Не выбран',
            category: data.category || 'Не выбрано',
            message: data.message || '',
            sessionId: (window.CookieManager && window.CookieManager.get('pzd_session_id')) || 'N/A',
            ipEstimate: '127.0.0.1 (Local Client)'
        };

        leads.unshift(newLead); // Newest on top
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(leads, null, 2));

        // Also try to send to backend /api/leads if available in server mode
        try {
            fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLead)
            }).catch(() => {
                // Standalone mode, no backend needed
            });
        } catch (err) {}

        // Trigger custom event for real-time live viewer
        window.dispatchEvent(new CustomEvent('pzd_new_lead', { detail: newLead }));
        return newLead;
    },

    // Export formatted TXT for human reading
    exportAsText() {
        const leads = this.getAll();
        if (!leads.length) return '=== ЖУРНАЛ ЗАЯВОК "ПОСАЖУ ZA ДОРОГО" ===\nЗаявок пока нет.\n';

        let text = `====================================================\n`;
        text += `   ЖУРНАЛ ЗАЯВОК И ОБРАЩЕНИЙ: ИП "ПОСАЖУZAДОРОГО"    \n`;
        text += `   Сформирован: ${new Date().toLocaleString('ru-RU')}\n`;
        text += `   Всего заявок: ${leads.length}\n`;
        text += `====================================================\n\n`;

        leads.forEach((l, index) => {
            text += `[#${l.id}] ${l.dateFormatted}\n`;
            text += `Клиент:    ${l.name}\n`;
            text += `Телефон:   ${l.phone}\n`;
            text += `Email:     ${l.email}\n`;
            text += `Город:     ${l.city}\n`;
            text += `Категория: ${l.category}\n`;
            text += `Сессия ID: ${l.sessionId}\n`;
            text += `Суть дела: ${l.message}\n`;
            text += `----------------------------------------------------\n`;
        });

        return text;
    },

    // Export formatted JSON
    exportAsJSON() {
        return JSON.stringify(this.getAll(), null, 2);
    },

    // Trigger download of the log file
    downloadFile(type = 'txt') {
        const content = type === 'json' ? this.exportAsJSON() : this.exportAsText();
        const mime = type === 'json' ? 'application/json;charset=utf-8;' : 'text/plain;charset=utf-8;';
        const filename = type === 'json' ? 'applications.json' : 'applications.txt';

        const blob = new Blob([content], { type: mime });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    // Clear log
    clearAll() {
        localStorage.removeItem(this.STORAGE_KEY);
        window.dispatchEvent(new CustomEvent('pzd_leads_cleared'));
    }
};

window.LeadsManager = LeadsManager;
