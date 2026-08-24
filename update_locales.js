const fs = require('fs');

const keys = {
  "ru": {
    "footer_brand_desc": "Лидирующая коллегия правовой защиты особого назначения. 30 лет абсолютной преданности интересам доверителя.",
    "footer_phone_msk": "📞 +7 (495) 777-90-90 (Москва)",
    "footer_phone_minsk": "📞 +375 (17) 300-11-22 (Минск)",
    "footer_phone_ny": "📞 +1 (212) 555-0199 (New York)",
    "footer_phone_hk": "📞 +852 3100-8890 (Hong Kong)",
    "footer_telegram": "🔒 Signal / Telegram: @pzd_law_official",
    "footer_addr_msk": "🏢 Москва, Пресненская наб., 12, Башня Федерация",
    "footer_addr_minsk": "🏢 Минск, пр-т Победителей, 7А",
    "footer_addr_ny": "🏢 New York, 350 5th Ave (Empire State Bldg)",
    "footer_addr_hk": "🏢 Hong Kong, Two IFC, Central",
    "footer_ssl": "Безопасное соединение SSL • TLS 1.3 • AES-256",
    "map_hq_badge": "🏛️ Главная штаб-квартира",
    "map_hq_title": "Москва — Главная штаб-квартира (ЦАО)",
    "map_hq_addr": "Пресненская наб., 12, ММДЦ «Москва-Сити», Башня Федерация, 48 этаж",
    "map_hq_hours": "Круглосуточно 24/7 (Экстренная защита)",
    "map_status_online": "Дежурный партнер на месте"
  },
  "en": {
    "footer_brand_desc": "The leading special purpose legal defense firm. 30 years of absolute dedication to our clients' interests.",
    "footer_phone_msk": "📞 +7 (495) 777-90-90 (Moscow)",
    "footer_phone_minsk": "📞 +375 (17) 300-11-22 (Minsk)",
    "footer_phone_ny": "📞 +1 (212) 555-0199 (New York)",
    "footer_phone_hk": "📞 +852 3100-8890 (Hong Kong)",
    "footer_telegram": "🔒 Signal / Telegram: @pzd_law_official",
    "footer_addr_msk": "🏢 Moscow, Presnenskaya Nab. 12, Federation Tower",
    "footer_addr_minsk": "🏢 Minsk, Pobediteley Ave, 7A",
    "footer_addr_ny": "🏢 New York, 350 5th Ave (Empire State Bldg)",
    "footer_addr_hk": "🏢 Hong Kong, Two IFC, Central",
    "footer_ssl": "Secure connection SSL • TLS 1.3 • AES-256",
    "map_hq_badge": "🏛️ Global Headquarters",
    "map_hq_title": "Moscow — Global Headquarters",
    "map_hq_addr": "Presnenskaya Nab. 12, Federation Tower, 48th floor",
    "map_hq_hours": "24/7 (Emergency defense)",
    "map_status_online": "Duty partner on site"
  },
  "zh": {
    "footer_brand_desc": "领先的特种法律辩护公司。30 年来对客户利益的绝对奉献。",
    "footer_phone_msk": "📞 +7 (495) 777-90-90 (莫斯科)",
    "footer_phone_minsk": "📞 +375 (17) 300-11-22 (明斯克)",
    "footer_phone_ny": "📞 +1 (212) 555-0199 (纽约)",
    "footer_phone_hk": "📞 +852 3100-8890 (香港)",
    "footer_telegram": "🔒 Signal / Telegram: @pzd_law_official",
    "footer_addr_msk": "🏢 莫斯科，Presnenskaya 大街 12 号，联邦大厦",
    "footer_addr_minsk": "🏢 明斯克，Pobediteley 大道，7A",
    "footer_addr_ny": "🏢 纽约，帝国大厦",
    "footer_addr_hk": "🏢 香港，中环国际金融中心二期",
    "footer_ssl": "安全连接 SSL • TLS 1.3 • AES-256",
    "map_hq_badge": "🏛️ 全球总部",
    "map_hq_title": "莫斯科 — 全球总部",
    "map_hq_addr": "莫斯科城，联邦大厦，48 楼",
    "map_hq_hours": "24/7 (紧急辩护)",
    "map_status_online": "值班合伙人在场"
  },
  "be": {
    "footer_brand_desc": "Вядучая калегія прававой абароны асобага прызначэння. 30 гадоў абсалютнай адданасці інтарэсам даверніка.",
    "footer_phone_msk": "📞 +7 (495) 777-90-90 (Масква)",
    "footer_phone_minsk": "📞 +375 (17) 300-11-22 (Мінск)",
    "footer_phone_ny": "📞 +1 (212) 555-0199 (New York)",
    "footer_phone_hk": "📞 +852 3100-8890 (Hong Kong)",
    "footer_telegram": "🔒 Signal / Telegram: @pzd_law_official",
    "footer_addr_msk": "🏢 Масква, Прэсненская наб., 12, Вежа Федэрацыя",
    "footer_addr_minsk": "🏢 Мінск, пр-т Пераможцаў, 7А",
    "footer_addr_ny": "🏢 New York, 350 5th Ave (Empire State Bldg)",
    "footer_addr_hk": "🏢 Hong Kong, Two IFC, Central",
    "footer_ssl": "Бяспечнае злучэнне SSL • TLS 1.3 • AES-256",
    "map_hq_badge": "🏛️ Галоўная штаб-кватэра",
    "map_hq_title": "Масква — Галоўная штаб-кватэра",
    "map_hq_addr": "Прэсненская наб., 12, Вежа Федэрацыя, 48 паверх",
    "map_hq_hours": "Кругласутачна 24/7 (Экстранная абарона)",
    "map_status_online": "Дзяжурны партнёр на месцы"
  }
};

['ru', 'en', 'zh', 'be'].forEach(lang => {
  let path = 'locales/' + lang + '.json';
  let data = JSON.parse(fs.readFileSync(path, 'utf8'));
  Object.assign(data, keys[lang]);
  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
});
