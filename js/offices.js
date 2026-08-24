/**
 * Interactive Offices & Google Maps Manager for PosazhuZaDorogo (PZD)
 * Covers Central HQ (Moscow) and branches across Russian regions, USA, Belarus, and China.
 */

const OfficesData = [
    // 🇷🇺 РОССИЯ (Административные центры регионов)
    {
        id: 'msk',
        country: 'ru',
        countryName: 'Россия',
        city: 'Москва',
        isHQ: true,
        title: 'Главная штаб-квартира (ЦАО)',
        address: 'Пресненская наб., 12, ММДЦ «Москва-Сити», Башня Федерация, 48 этаж',
        phone: '+7 (495) 777-90-90',
        hours: 'Круглосуточно 24/7 (Экстренная защита)',
        status: 'Дежурный партнер на месте',
        query: 'Пресненская набережная, 12, Москва',
        coords: { lat: 55.7495, lng: 37.5371 }
    },
    {
        id: 'spb',
        country: 'ru',
        countryName: 'Россия',
        city: 'Санкт-Петербург',
        title: 'Северо-Западный филиал',
        address: 'Невский пр-т, 28, Литер А (Дом Зингера), 4 этаж',
        phone: '+7 (812) 600-45-45',
        hours: '24/7 • Выезд в СИЗО и УВД',
        status: 'Открыто',
        query: 'Невский проспект, 28, Санкт-Петербург'
    },
    {
        id: 'nsk',
        country: 'ru',
        countryName: 'Россия',
        city: 'Новосибирск',
        title: 'Сибирский филиал',
        address: 'Красный пр-т, 22, БЦ «Красный», офис 602',
        phone: '+7 (383) 310-88-22',
        hours: '08:00 – 22:00 (Дежурный 24/7)',
        status: 'Открыто',
        query: 'Красный проспект, 22, Новосибирск'
    },
    {
        id: 'ekb',
        country: 'ru',
        countryName: 'Россия',
        city: 'Екатеринбург',
        title: 'Уральский филиал',
        address: 'ул. Бориса Ельцина, 3, Деловой квартал «Екатеринбург-Сити»',
        phone: '+7 (343) 288-71-10',
        hours: '24/7 • Защита бизнеса и активов',
        status: 'Открыто',
        query: 'улица Бориса Ельцина, 3, Екатеринбург'
    },
    {
        id: 'kzn',
        country: 'ru',
        countryName: 'Россия',
        city: 'Казань',
        title: 'Поволжский филиал',
        address: 'ул. Баумана, 58, Деловой центр «Гранд», офис 410',
        phone: '+7 (843) 590-33-00',
        hours: '09:00 – 21:00 (Экстренный выезд 24/7)',
        status: 'Открыто',
        query: 'улица Баумана, 58, Казань'
    },
    {
        id: 'nn',
        country: 'ru',
        countryName: 'Россия',
        city: 'Нижний Новгород',
        title: 'Волго-Вятский филиал',
        address: 'ул. Большая Покровская, 1, БЦ «Покровский»',
        phone: '+7 (831) 420-55-11',
        hours: '09:00 – 20:00',
        status: 'Открыто',
        query: 'Большая Покровская улица, 1, Нижний Новгород'
    },
    {
        id: 'krd',
        country: 'ru',
        countryName: 'Россия',
        city: 'Краснодар',
        title: 'Южный филиал',
        address: 'ул. Красная, 120, БЦ «Кубань Плаза»',
        phone: '+7 (861) 205-99-44',
        hours: '24/7 • Арбитраж и уголовная защита',
        status: 'Открыто',
        query: 'Красная улица, 120, Краснодар'
    },
    {
        id: 'vld',
        country: 'ru',
        countryName: 'Россия',
        city: 'Владивосток',
        title: 'Дальневосточный филиал',
        address: 'ул. Светланская, 45, БЦ «Золотой Рог», 5 этаж',
        phone: '+7 (423) 279-00-11',
        hours: '24/7 • ВЭД, таможня и международное право',
        status: 'Открыто',
        query: 'Светланская улица, 45, Владивосток'
    },
    {
        id: 'khv',
        country: 'ru',
        countryName: 'Россия',
        city: 'Хабаровск',
        title: 'Приамурский филиал',
        address: 'ул. Муравьева-Амурского, 19, офис 305',
        phone: '+7 (4212) 90-44-88',
        hours: '09:00 – 20:00',
        status: 'Открыто',
        query: 'улица Муравьева-Амурского, 19, Хабаровск'
    },
    {
        id: 'rnd',
        country: 'ru',
        countryName: 'Россия',
        city: 'Ростов-на-Дону',
        title: 'Донской филиал',
        address: 'ул. Большая Садовая, 47, БЦ «Садовый»',
        phone: '+7 (863) 303-12-80',
        hours: '09:00 – 21:00 (Дежурный 24/7)',
        status: 'Открыто',
        query: 'Большая Садовая улица, 47, Ростов-на-Дону'
    },
    {
        id: 'kln',
        country: 'ru',
        countryName: 'Россия',
        city: 'Калининград',
        title: 'Балтийский филиал',
        address: 'Ленинский пр-т, 30, Деловой комплекс «Европа»',
        phone: '+7 (4012) 70-80-90',
        hours: '24/7 • Экстрадиция и таможенные споры',
        status: 'Открыто',
        query: 'Ленинский проспект, 30, Калининград'
    },
    {
        id: 'sochi',
        country: 'ru',
        countryName: 'Россия',
        city: 'Сочи',
        title: 'Черноморский филиал',
        address: 'Курортный пр-т, 50, Гранд Плаза',
        phone: '+7 (862) 291-77-33',
        hours: '24/7 • Защита недвижимости и курортного бизнеса',
        status: 'Открыто',
        query: 'Курортный проспект, 50, Сочи'
    },

    // 🇺🇸 США (Major Metro Hubs)
    {
        id: 'nyc',
        country: 'us',
        countryName: 'США',
        city: 'New York',
        title: 'US East Coast Headquarters',
        address: '350 5th Ave (Empire State Building), Suite 5200, New York, NY 10118',
        phone: '+1 (212) 555-0199',
        hours: '24/7 • Cross-Border Litigation & Trust Defense',
        status: 'Open 24/7',
        query: '350 5th Ave, New York, NY 10118, USA'
    },
    {
        id: 'wdc',
        country: 'us',
        countryName: 'США',
        city: 'Washington D.C.',
        title: 'Federal Regulatory & Sanctions Defense',
        address: '1200 Pennsylvania Avenue NW, Washington, DC 20004',
        phone: '+1 (202) 555-0144',
        hours: '08:30 – 19:00 EST',
        status: 'Open',
        query: '1200 Pennsylvania Avenue NW, Washington, DC 20004, USA'
    },
    {
        id: 'la',
        country: 'us',
        countryName: 'США',
        city: 'Los Angeles',
        title: 'West Coast Litigation Hub',
        address: '400 S Hope St, Downtown Los Angeles, CA 90071',
        phone: '+1 (213) 555-0182',
        hours: '09:00 – 20:00 PST',
        status: 'Open',
        query: '400 S Hope St, Los Angeles, CA 90071, USA'
    },
    {
        id: 'mia',
        country: 'us',
        countryName: 'США',
        city: 'Miami',
        title: 'Offshore & Asset Protection Hub',
        address: '801 Brickell Ave, Financial District, Miami, FL 33131',
        phone: '+1 (305) 555-0163',
        hours: '24/7 • International Banking & Maritime Law',
        status: 'Open 24/7',
        query: '801 Brickell Ave, Miami, FL 33131, USA'
    },
    {
        id: 'chi',
        country: 'us',
        countryName: 'США',
        city: 'Chicago',
        title: 'Midwest Commercial Arbitration',
        address: '233 S Wacker Dr (Willis Tower), Chicago, IL 60606',
        phone: '+1 (312) 555-0177',
        hours: '09:00 – 18:00 CST',
        status: 'Open',
        query: '233 S Wacker Dr, Chicago, IL 60606, USA'
    },

    // 🇧🇾 БЕЛАРУСЬ (Областные центры)
    {
        id: 'minsk',
        country: 'be',
        countryName: 'Беларусь',
        city: 'Минск',
        title: 'Главное представительство в РБ',
        address: 'пр-т Победителей, 7А, БЦ «Royal Plaza», 18 этаж',
        phone: '+375 (17) 300-11-22',
        hours: '24/7 • Уголовная защита и Экономический суд',
        status: 'Дежурный адвокат на месте',
        query: 'проспект Победителей 7А, Минск, Беларусь'
    },
    {
        id: 'brest',
        country: 'be',
        countryName: 'Беларусь',
        city: 'Брест',
        title: 'Брестский филиал',
        address: 'ул. Советская, 34, БЦ «Дидас Персия»',
        phone: '+375 (162) 55-40-10',
        hours: '09:00 – 19:00 (Таможня 24/7)',
        status: 'Открыто',
        query: 'улица Советская, 34, Брест, Беларусь'
    },
    {
        id: 'grodno',
        country: 'be',
        countryName: 'Беларусь',
        city: 'Гродно',
        title: 'Гродненский филиал',
        address: 'ул. Советская, 18, БЦ «Неман»',
        phone: '+375 (152) 62-33-44',
        hours: '09:00 – 19:00',
        status: 'Открыто',
        query: 'улица Советская, 18, Гродно, Беларусь'
    },
    {
        id: 'gomel',
        country: 'be',
        countryName: 'Беларусь',
        city: 'Гомель',
        title: 'Гомельский филиал',
        address: 'ул. Ленина, 10, Деловой центр «Пассаж»',
        phone: '+375 (232) 79-88-00',
        hours: '09:00 – 19:00',
        status: 'Открыто',
        query: 'улица Ленина, 10, Гомель, Беларусь'
    },
    {
        id: 'vitebsk',
        country: 'be',
        countryName: 'Беларусь',
        city: 'Витебск',
        title: 'Витебский филиал',
        address: 'ул. Ленина, 26, БЦ «Марко-Сити»',
        phone: '+375 (212) 60-12-34',
        hours: '09:00 – 19:00',
        status: 'Открыто',
        query: 'улица Ленина, 26, Витебск, Беларусь'
    },
    {
        id: 'mogilev',
        country: 'be',
        countryName: 'Беларусь',
        city: 'Могилев',
        title: 'Могилевский филиал',
        address: 'ул. Первомайская, 29, ТОЦ «Атриум»',
        phone: '+375 (222) 71-20-00',
        hours: '09:00 – 19:00',
        status: 'Открыто',
        query: 'Первомайская улица, 29, Могилев, Беларусь'
    },

    // 🇨🇳 КИТАЙ (Key Mega Cities)
    {
        id: 'bj',
        country: 'zh',
        countryName: 'Китай',
        city: 'Пекин (Beijing)',
        title: 'China Main Office (Chaoyang)',
        address: 'Chaoyangmen Outer St, 16, Prime Tower, 22F, Chaoyang District, Beijing',
        phone: '+86 (10) 6588-9900',
        hours: '09:00 – 18:00 CST (Duty Partner 24/7)',
        status: 'Open',
        query: 'Chaoyangmen Outer Street, 16, Beijing, China'
    },
    {
        id: 'sh',
        country: 'zh',
        countryName: 'Китай',
        city: 'Шанхай (Shanghai)',
        title: 'Shanghai Financial Hub (Pudong)',
        address: '100 Century Ave, Shanghai World Financial Center, 36F, Pudong, Shanghai',
        phone: '+86 (21) 5088-3344',
        hours: '24/7 • Cross-Border Trade & Corporate Defense',
        status: 'Open 24/7',
        query: '100 Century Ave, Pudong, Shanghai, China'
    },
    {
        id: 'hk',
        country: 'zh',
        countryName: 'Китай',
        city: 'Гонконг (Hong Kong)',
        title: 'Asia-Pacific Arbitration HQ',
        address: 'Two International Finance Centre (Two IFC), 8 Finance St, Central, Hong Kong',
        phone: '+852 3100-8890',
        hours: '24/7 • International Arbitration & Asset Defense',
        status: 'Open 24/7',
        query: 'Two International Finance Centre, 8 Finance St, Central, Hong Kong'
    },
    {
        id: 'gz',
        country: 'zh',
        countryName: 'Китай',
        city: 'Гуанчжоу (Guangzhou)',
        title: 'Guangdong Trade Litigation',
        address: 'Zhujiang New Town, 5, Guangzhou International Finance Center, 28F',
        phone: '+86 (20) 8800-4411',
        hours: '09:00 – 19:00 CST',
        status: 'Open',
        query: 'Guangzhou International Finance Center, Guangzhou, China'
    },
    {
        id: 'sz',
        country: 'zh',
        countryName: 'Китай',
        city: 'Шэньчжэнь (Shenzhen)',
        title: 'Tech & IP Protection Bar',
        address: 'Fuhua 3rd Rd, Ping An Finance Centre, 42F, Futian District, Shenzhen',
        phone: '+86 (755) 8300-6622',
        hours: '09:00 – 20:00 CST',
        status: 'Open',
        query: 'Ping An Finance Centre, Shenzhen, China'
    }
];

const MapManager = {
    currentOffice: OfficesData[0], // Moscow HQ by default
    activeCountry: 'all',

    init() {
        this.renderCountryFilters();
        this.renderOfficeDropdown();
        this.renderOfficesList();
        this.selectOffice(this.currentOffice.id);
        this.attachEventListeners();
    },

    renderCountryFilters() {
        const tabsContainer = document.getElementById('map-country-tabs');
        if (!tabsContainer) return;

        const countries = [
            { id: 'all', label: 'Все филиалы (28)', flag: '🌐' },
            { id: 'ru', label: 'Россия (12)', flag: '🇷🇺' },
            { id: 'us', label: 'США (5)', flag: '🇺🇸' },
            { id: 'be', label: 'Беларусь (6)', flag: '🇧🇾' },
            { id: 'zh', label: 'Китай (5)', flag: '🇨🇳' }
        ];

        tabsContainer.innerHTML = countries.map(c => `
            <button class="map-tab-btn ${c.id === this.activeCountry ? 'active' : ''}" data-country="${c.id}">
                <span>${c.flag}</span> ${c.label}
            </button>
        `).join('');
    },

    renderOfficeDropdown() {
        const select = document.getElementById('map-city-select');
        if (!select) return;

        const filtered = this.activeCountry === 'all' 
            ? OfficesData 
            : OfficesData.filter(o => o.country === this.activeCountry);

        select.innerHTML = filtered.map(o => `
            <option value="${o.id}" ${o.id === this.currentOffice.id ? 'selected' : ''}>
                ${o.country === 'ru' ? '🇷🇺' : o.country === 'us' ? '🇺🇸' : o.country === 'be' ? '🇧🇾' : '🇨🇳'} ${o.city} — ${o.title}
            </option>
        `).join('');
    },

    renderOfficesList() {
        const listContainer = document.getElementById('map-offices-scroll-list');
        if (!listContainer) return;

        const filtered = this.activeCountry === 'all' 
            ? OfficesData 
            : OfficesData.filter(o => o.country === this.activeCountry);

        listContainer.innerHTML = filtered.map(o => `
            <div class="office-list-item ${o.id === this.currentOffice.id ? 'active' : ''}" data-office-id="${o.id}">
                <div class="office-item-header">
                    <span class="office-item-city">
                        ${o.country === 'ru' ? '🇷🇺' : o.country === 'us' ? '🇺🇸' : o.country === 'be' ? '🇧🇾' : '🇨🇳'} ${o.city}
                    </span>
                    ${o.isHQ ? '<span class="hq-badge">HQ • Центральный</span>' : ''}
                </div>
                <div class="office-item-title">${o.title}</div>
                <div class="office-item-addr">${o.address}</div>
            </div>
        `).join('');
    },

    selectOffice(officeId) {
        const office = OfficesData.find(o => o.id === officeId) || OfficesData[0];
        this.currentOffice = office;

        // 1. Update Map iframe
        const mapFrame = document.getElementById('gmap-embed-frame');
        if (mapFrame) {
            const encodedQuery = encodeURIComponent(office.query);
            mapFrame.src = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        }

        // 2. Update Active Card Details
        const badge = document.getElementById('office-card-badge');
        const title = document.getElementById('office-card-title');
        const addr = document.getElementById('office-card-address');
        const phone = document.getElementById('office-card-phone');
        const hours = document.getElementById('office-card-hours');
        const status = document.getElementById('office-card-status');
        const routeBtn = document.getElementById('office-card-route-btn');

        if (badge) badge.textContent = office.isHQ ? '🏛️ Главная штаб-квартира' : `🌐 Филиал • ${office.countryName}`;
        if (title) title.textContent = `${office.city} — ${office.title}`;
        if (addr) addr.textContent = office.address;
        if (phone) {
            phone.textContent = office.phone;
            phone.href = `tel:${office.phone.replace(/[^0-9+]/g, '')}`;
        }
        if (hours) hours.textContent = office.hours;
        if (status) status.textContent = office.status;
        if (routeBtn) {
            routeBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.query)}`;
        }

        // 3. Highlight in list & select dropdown
        const select = document.getElementById('map-city-select');
        if (select) select.value = office.id;

        document.querySelectorAll('.office-list-item').forEach(item => {
            if (item.getAttribute('data-office-id') === office.id) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });
    },

    attachEventListeners() {
        // Country tabs
        const tabsContainer = document.getElementById('map-country-tabs');
        if (tabsContainer) {
            tabsContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.map-tab-btn');
                if (!btn) return;
                const country = btn.getAttribute('data-country');
                this.activeCountry = country;
                this.renderCountryFilters();
                this.renderOfficeDropdown();
                this.renderOfficesList();

                // Select first office of filtered country
                const firstOfCountry = OfficesData.find(o => country === 'all' || o.country === country);
                if (firstOfCountry) this.selectOffice(firstOfCountry.id);
            });
        }

        // Dropdown select
        const select = document.getElementById('map-city-select');
        if (select) {
            select.addEventListener('change', (e) => {
                this.selectOffice(e.target.value);
            });
        }

        // List item click
        const listContainer = document.getElementById('map-offices-scroll-list');
        if (listContainer) {
            listContainer.addEventListener('click', (e) => {
                const item = e.target.closest('.office-list-item');
                if (!item) return;
                const officeId = item.getAttribute('data-office-id');
                this.selectOffice(officeId);
            });
        }

        // "Book in this office" button -> smooth scrolls up to form and updates city
        const bookBtn = document.getElementById('office-card-book-btn');
        if (bookBtn) {
            bookBtn.addEventListener('click', () => {
                const formCity = document.getElementById('client-city');
                const formSection = document.getElementById('section-consultation');
                if (formCity && this.currentOffice) {
                    // Try to match or add value
                    let matched = false;
                    for (let opt of formCity.options) {
                        if (opt.text.includes(this.currentOffice.city) || opt.value.includes(this.currentOffice.city)) {
                            formCity.value = opt.value;
                            matched = true;
                            break;
                        }
                    }
                    if (!matched) {
                        const newOpt = new Option(`${this.currentOffice.city} (${this.currentOffice.countryName})`, this.currentOffice.city, true, true);
                        formCity.add(newOpt);
                    }
                }
                if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
};

window.OfficesData = OfficesData;
window.MapManager = MapManager;
