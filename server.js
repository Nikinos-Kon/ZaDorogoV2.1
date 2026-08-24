/**
 * Ultra-lightweight zero-dependency local static server with real-time leads file logger
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'applications.txt');
const LEADS_JSON = path.join(DATA_DIR, 'applications.json');

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
    // Lead Submission API (saves directly to disk in real-time)
    if (req.method === 'POST' && req.url === '/api/leads') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const lead = JSON.parse(body);
                
                // 1. Append to applications.txt
                const logEntry = `\n[#${lead.id || 'LEAD'}] ${lead.dateFormatted || new Date().toLocaleString()}\n` +
                    `Имя:       ${lead.name}\n` +
                    `Телефон:   ${lead.phone}\n` +
                    `Email:     ${lead.email}\n` +
                    `Город:     ${lead.city}\n` +
                    `Категория: ${lead.category}\n` +
                    `Суть дела: ${lead.message}\n` +
                    `----------------------------------------------------\n`;
                fs.appendFileSync(LEADS_FILE, logEntry, 'utf8');

                // 2. Update applications.json
                let allLeads = [];
                if (fs.existsSync(LEADS_JSON)) {
                    try {
                        allLeads = JSON.parse(fs.readFileSync(LEADS_JSON, 'utf8'));
                    } catch (e) { allLeads = []; }
                }
                allLeads.unshift(lead);
                fs.writeFileSync(LEADS_JSON, JSON.stringify(allLeads, null, 2), 'utf8');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, leadId: lead.id }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // Static file serving
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    
    // Allow viewing applications.txt and applications.json directly in browser
    if (req.url === '/applications.txt') filePath = LEADS_FILE;
    if (req.url === '/applications.json') filePath = LEADS_JSON;

    const extname = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('404 Not Found: ' + req.url);
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`PosazhuZaDorogo Server running at http://localhost:${PORT}`);
    console.log(`Real-time leads file log: ${LEADS_FILE}`);
});
