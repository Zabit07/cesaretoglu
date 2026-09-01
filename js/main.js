/**
 * Cəsarətoğlu MMC — Main Website Controller
 * Exact asp-pack.ru Architecture: White Header Dropdowns, Full-Width Hero Slider,
 * Interactive Modals, Trilingual Engine (AZ 🇦🇿 / RU 🇷🇺 / EN 🇬🇧)
 */

// UI Translations Dictionary (AZ, RU, EN)
const TRANSLATIONS = {
    az: {
        // Topbar
        topbar_address: 'Bakı şəhəri, Ağ Şəhər / Xətai r-nu',
        topbar_hours: 'B.e - Cümə: 09:30 - 18:30',
        topbar_call_us: 'Əlaqə telefonu:',
        topbar_admin_link: 'İdarəetmə Paneli',

        // Navigation Dropdowns (asp-pack.ru style)
        nav_home: 'Ana səhifə',
        nav_catalog: 'Məhsul Kataloqu',
        nav_casings: 'Kolbasa Qabıqları',
        nav_packaging: 'Plyonkalar və Paketlər',
        nav_spices: 'Wiberg Ədviyyatları',
        nav_proteins: 'Hulshof Zülalları',
        nav_partners: 'Tərəfdaşlarımız',
        nav_about: 'Şirkət haqqında',
        nav_services: 'Texnoloji Dəstək',
        nav_news: 'Xəbərlər',
        nav_contacts: 'Əlaqə',

        // Slider 1: Atlantis-Pak
        slider_1_badge: 'Atlantis-Pak — Eksklüziv Distribyutor',
        slider_1_title: 'İnnovativ Kolbasa Qabıqları və Maneə Materialları',
        slider_1_desc: 'Dünyanın 1 nömrəli plastik və super-keçirici iCel qabıqları. Məhsuldarlığın artırılması və 100% keyfiyyət təminatı.',
        slider_1_btn: 'Qabıqlar Kataloqu',

        // Slider 2: Wiberg
        slider_2_badge: 'Wiberg (NovaTaste) — Rəsmi Distribyutor',
        slider_2_badge_sub: 'Avstriya / Almaniya',
        slider_2_title: 'Premium Təbii Ədviyyatlar və Dad Ekstraktları',
        slider_2_desc: 'Ət kombinatları və delikateslər üçün dünya şöhrətli ədviyyatlar, marinadlar və xüsusi dad kompozisiyaları.',
        slider_2_btn: 'Wiberg Ədviyyatları',

        // Slider 3: Südpack
        slider_3_badge: 'Südpack Verpackungen — Almaniya',
        slider_3_title: 'Yüksək Maneəli Vakuum və Termoformasiya Plyonkaları',
        slider_3_desc: 'Multifol® GA çoxqatlı elastik plyonkaları və qoruyucu qaz mühiti (MAP) üçün qablaşdırma materialları.',
        slider_3_btn: 'Plyonkalara Bax',

        // Slider 4: Avangard
        slider_4_badge: 'Avangard — Rəsmi Tərəfdaş',
        slider_4_title: 'Kompleks Qida Qarışıqları, Ədviyyatlar və Duzlama Komponentləri',
        slider_4_desc: 'Yüksək keyfiyyətli dad-aromat qarışıqları, marinadlar və ət emalı üçün xüsusi inqrediyentlər.',
        slider_4_btn: 'Avangard Ədviyyatları',

        // Category Cards (Product-First UX)
        cat_sec_badge: 'Məhsul Bölmələri',
        cat_sec_title: 'Məhsul Kataloqu',
        cat_sec_subtitle: 'İstehsalatınız üçün lazım olan xammal və materialların kateqoriyasını seçin',
        cat_1_badge: 'Qabıqlar',
        cat_1_title: 'Kolbasa Qabıqları',
        cat_1_desc: 'Plastik, hisəkeçirici, poliamid və süni qabıqlar. Məhsuldarlığın artırılması və stabil forma.',
        cat_1_btn: 'Qabıqlar bölməsinə keç',
        cat_2_badge: 'Ədviyyatlar',
        cat_2_title: 'Ədviyyatlar və İnqrediyentlər',
        cat_2_desc: 'Premium mono-ədviyyatlar, dad ekstraktları və ət emalı üçün kompleks funksional qarışıqlar.',
        cat_2_btn: 'Ədviyyatlar bölməsinə keç',
        cat_3_badge: 'Plyonkalar',
        cat_3_title: 'Plyonkalar və Qablaşdırma',
        cat_3_desc: 'Yüksək maneəli vakuum, termoformasiya və termo-yığılan barier plyonkaları və paketləri.',
        cat_3_btn: 'Qablaşdırma bölməsinə keç',
        cat_4_badge: 'Qarışıqlar',
        cat_4_title: 'Kompleks Qarışıqlar',
        cat_4_desc: 'Kolbasalar, qril və duzlama üçün kompleks qarışıqlar.',
        cat_4_btn: 'Qarışıqlar bölməsinə keç',
        cat_proteins_title: 'Funksional zülallar',
        suppliers_label: 'İstehsalçılar:',
        spec_dosage: 'Dozalanma',
        spec_flavor_profile: 'Dad profili',
        spec_application: 'Təyinatı',
        spec_ingredients: 'Əsas tərkibi',
        spec_shelf_life: 'Saxlama müddəti',

        // 8 Advantages of Working with Us (AZ)
        adv8_sec_badge: 'Niyə Məhz Biz?',
        adv8_sec_title: '«Cəsarətoğlu MMC» ilə İşləməyin 8 Üstünlüyü',
        adv8_sec_subtitle: 'Əsas məqsədimiz — yüksək keyfiyyətli məhsulun istehsalatınıza vaxtında çatdırılmasıdır.',
        adv8_1_title: 'Birbaşa Təchizat',
        adv8_1_desc: 'Dünyanın aparıcı istehsalçıları ilə birbaşa əməkdaşlıq. Yüksək texnologiyalı qabıqlar, qablaşdırma və ya premium ədviyyatlar — sizi ən yaxşısı ilə təmin edirik.',
        adv8_2_title: 'Fərdi Şərtlər',
        adv8_2_desc: 'Qabaqcadan sifariş zamanı müştərilərə xüsusi yanaşma. Sərfəli qiymətlər və dəqiq tədarük qrafiki ilə rahat əməkdaşlıq.',
        adv8_3_title: 'Etibarlı Distribyutor',
        adv8_3_desc: 'İşgüzar nüfuzumuza dəyər veririk. Üzərimizə götürdüyümüz bütün öhdəlikləri ciddi, keyfiyyətlə və dəqiq vaxtında yerinə yetiririk.',
        adv8_4_title: 'Yüksək Məsuliyyət',
        adv8_4_desc: 'Uzunmüddətli tərəfdaşlığa yönəlmişik. Xammal tədarükünün həcmini əvvəlcədən planlaşdırır və istehsalatınızın ritminə tam uyğunlaşırıq.',
        adv8_5_title: 'Texnoloji Dəstək',
        adv8_5_desc: 'Məsələləri hər zaman birlikdə həll edir, avadanlıqların sazlanmasına və inqrediyentlərimizlə resepturaların adaptasiyasına kömək edirik.',
        adv8_6_title: 'İnkişaf Etmiş Logistika',
        adv8_6_desc: 'Bazarda 15 ildən artıq təcrübə. Bu müddət ərzində minlərlə kilometr qablaşdırma və tonlarla yüksək keyfiyyətli qida əlavələri çatdırmışıq.',
        adv8_7_title: 'Keyfiyyətə Nəzarət',
        adv8_7_desc: 'İstehsalat xətlərinizdə birbaşa sınaqlar aparmaq üçün plyonka, qabıq və ədviyyatların pulsuz test nümunələrini təqdim edirik.',
        adv8_8_title: 'Kompleks Həllər',
        adv8_8_desc: 'Yalnız ideal qablaşdırma və məhsul dizaynının yaradılmasına deyil, həm də təkrarolunmaz dad üçün müəllif resepturalarının tərtibinə kömək edirik.',

        // News & Events Section (AZ)
        news_sec_badge: 'YENİLİKLƏR',
        news_sec_subtitle: 'Şirkətimizin ən son hadisələri, ustad dərsləri və texnoloji yenilikləri',
        news_all_btn: 'Bütün xəbərlər',
        news_read_more: 'Ətraflı oxu',
        news_1_date: '18 Oktyabr 2024',
        news_1_title: 'Şamaxıda ət texnologiyaları üzrə praktiki seminar və ustad dərsi',
        news_1_summary: 'Cəsarətoğlu MMC şirkəti avropalı texnoloqlarla birgə Azərbaycanın aparıcı ət kombinatları üçün genişmiqyaslı texnoloji seminar təşkil etdi.',
        news_2_date: '22 Avqust 2024',
        news_2_title: 'Südpack-dan yeni Multifol® GA vakuum plyonkaları xəttinin təqdimatı',
        news_2_summary: 'Bakıdakı anbara pendir və delikateslər üçün gücləndirilmiş maneə xüsusiyyətlərinə malik ən yeni davamlı plyonka seriyası daxil oldu.',
        news_3_date: '15 İyun 2024',
        news_3_title: 'Müştəri müəssisələrində texnoloji səfərlər və reseptlərin uyğunlaşdırılması',
        news_3_summary: 'Texnoloqlarımız bütün Azərbaycan ərazisində müştərilərə ixtisaslı dəstək göstərməyə davam edirlər.',
        news_4_date: '10 Aprel 2024',
        news_4_title: 'Bakıda xammal və materialların anbar proqramının genişləndirilməsi',
        news_4_summary: 'Anbarda poliamid qabıqların, mal əti kollageninin və termo-paketlərin daimi ehtiyat həcmi artırıldı.',

        // About Page Specific Translations (AZ)
        about_page_badge: 'Cəsarətoğlu MMC Haqqında',
        about_page_title: 'Bizim haqqımızda',
        about_page_subtitle: 'İddialı, çalışqan və məsuliyyətli komanda ilə istehsalatınıza etibarlı tərəfdaş',
        about_lead_text: 'Biz, sizin məsələləri ən qısa müddətdə həll edəcək, iddialı, çalışqan və məsuliyyətli şirkətik.',
        about_quote_q: 'Sizə ədviyyatlar, üzlüklər lazımdır? Büdcənizi necə qoruyub saxlayacağınızı və ən yaxşı keyfiyyəti necə əldə edəcəyinizi bilmirsiniz?',
        about_quote_a: 'O zaman sizə lazım olan Bizik.',
        about_delivery_p: 'Biz sizi maraqlandıran istənilən məhsulların ən qısa müddətdə çatdırılmasını təşkil edəcək və sizi lazım olan hər şey ilə təmin edəcəyik.',
        about_btn_catalog: 'Məhsul Kataloqu',
        about_badge_distributor: 'Rəsmi Distribyutor',
        about_adv_badge: 'Üstünlüklər',
        about_adv_title: 'Əsas Üstünlüklərimiz',
        about_adv_1_t: 'Sürətli Həll',
        about_adv_1_d: 'Məsələlərinizin ən qısa müddətdə operativ həlli və texnoloji dəstək.',
        about_adv_2_t: 'Yüksək Keyfiyyət',
        about_adv_2_d: 'Büdcənizi qoruyaraq Avropa və dünya standartlarına cavab verən məhsullar.',
        about_adv_3_t: 'Operativ Çatdırılma',
        about_adv_3_d: 'İstənilən məhsulların ən qısa müddətdə Bakı anbarından birbaşa çatdırılması.',

        // Team & Leadership Section (AZ)
        team_sec_badge: 'KOMANDAMIZ',
        team_sec_title: 'Rəhbərlik və Mütəxəssislərimiz',
        team_sec_subtitle: 'İstehsalatınızın uğuru üçün çalışan peşəkar, məsuliyyətli və təcrübəli komanda',
        team_leader_badge: 'Şirkət Rəhbəri',
        team_spec_badge: 'Aparıcı Mütəxəssis',

        // Footer Direct Contact Banner
        footer_consult_title: 'Təchizat şöbəsi və texnoloqlarla birbaşa əlaqə',
        footer_consult_desc: 'Bizə zəng edin və ya elektron poçt ünvanımıza müraciət göndərin — operativ şəkildə cavablandıracağıq.',
        footer_quick_links: 'Cəld Keçidlər',
        footer_desc: 'Azərbaycanda Atlantis-Pak, Wiberg, Südpack və Avangard şirkətlərinin rəsmi distribyutoru.',
        footer_catalog_links: 'Məhsul Bölmələri',
        footer_contacts_heading: 'Bizimlə Əlaqə',
        footer_hours: 'B.e - Cümə: 09:30 - 18:30',
        footer_address: 'Bakı, Ağ Şəhər, Azərbaycan',
        footer_copyright: '© 2026 Cəsarətoğlu MMC. Bütün hüquqlar qorunur.',
        footer_admin_access: 'Admin Paneli',

        // Catalog Modal
        modal_catalog_title: 'Cəsarətoğlu MMC Məhsul Kataloqu',
        modal_catalog_subtitle: 'Atlantis-Pak, Wiberg, Südpack və Avangard şirkətlərindən rəsmi təchizat',
        search_placeholder: 'Ad, artikul və ya brend üzrə axtarış...'
    },

    ru: {
        // Topbar
        topbar_address: 'г. Баку, Белый город / Хатаинский р-н',
        topbar_hours: 'Пн - Пт: 09:30 - 18:30',
        topbar_call_us: 'Телефон для связи:',
        topbar_admin_link: 'Панель управления',

        // Navigation Dropdowns (asp-pack.ru style)
        nav_home: 'Главная',
        nav_catalog: 'Каталог продукции',
        nav_casings: 'Колбасные оболочки',
        nav_packaging: 'Пленки и пакеты',
        nav_spices: 'Специи Wiberg',
        nav_partners: 'Партнеры',
        nav_about: 'О компании',
        nav_services: 'Техподдержка',
        nav_news: 'Новости',
        nav_contacts: 'Контакты',

        // Slider 1: Atlantis-Pak
        slider_1_badge: 'Atlantis-Pak — Эксклюзивный Дистрибьютор',
        slider_1_title: 'Инновационные Колбасные Оболочки и Барьерные Материалы',
        slider_1_desc: 'Пластиковые и проницаемые оболочки АйЦел, Фибросмок, Амифлекс. Высокая производительность и гарантия качества.',
        slider_1_btn: 'Каталог Оболочек',

        // Slider 2: Wiberg
        slider_2_badge: 'Wiberg (NovaTaste) — Австрия / Германия',
        slider_2_title: 'Премиальные Натуральные Специи и Вкусовые Экстракты',
        slider_2_desc: 'Мировой лидер в производстве пряностей, маринадов и функциональных смесей для колбас и мясных деликатесов.',
        slider_2_btn: 'Специи Wiberg',

        // Slider 3: Südpack
        slider_3_badge: 'Südpack Verpackungen — Германия',
        slider_3_title: 'Высокобарьерные Термоформовочные и Вакуумные Пленки',
        slider_3_desc: 'Многослойные гибкие пленки Multifol® GA для упаковки мясных изделий и сыров в вакуум и газовую среду (МГС).',
        slider_3_btn: 'Каталог Пленок',

        // Slider 4: Avangard
        slider_4_badge: 'Avangard — Официальный Партнер',
        slider_4_title: 'Комплексные Пищевые Смеси, Специи и Посолочные Компоненты',
        slider_4_desc: 'Высококачественные вкусо-ароматические смеси, маринады и специальные ингредиенты для мясного производства.',
        slider_4_btn: 'Продукция Avangard',

        // Category Cards (Product-First UX)
        cat_sec_badge: 'Каталог сырья и материалов',
        cat_sec_title: 'Каталог продукции',
        cat_sec_subtitle: 'Выберите категорию сырья и материалов для вашего производства',
        cat_1_badge: 'Оболочки',
        cat_1_title: 'Колбасные оболочки',
        cat_1_desc: 'Пластиковые, проницаемые, фиброузные оболочки.',
        cat_1_btn: 'Перейти в оболочки',
        cat_2_badge: 'Специи',
        cat_2_title: 'Специи и ингредиенты',
        cat_2_desc: 'Премиальные моно-специи, экстракты, комплексные смеси для мясопереработки.',
        cat_2_btn: 'Перейти в специи',
        cat_3_badge: 'Пленки',
        cat_3_title: 'Пленки и упаковка',
        cat_3_desc: 'Барьерные, вакуумные и термоусадочные пленки.',
        cat_3_btn: 'Перейти в пленки',
        cat_4_badge: 'Смеси',
        cat_4_title: 'Комплексные смеси Avangard',
        cat_4_desc: 'Комплексные смеси для колбас, салями, гриля и компоненты для посола.',
        cat_4_btn: 'Перейти в смеси',
        cat_proteins_title: 'Функциональные белки',
        suppliers_label: 'Производители:',
        spec_dosage: 'Дозировка',
        spec_flavor_profile: 'Вкусовой профиль',
        spec_application: 'Применение',
        spec_ingredients: 'Основные ингредиенты',
        spec_shelf_life: 'Срок годности',

        // Brands Strip
        brands_sec_title: 'Официальные Мировые Производители',

        // 8 Advantages of Working with Us (RU)
        adv8_sec_badge: 'Почему выбирают нас',
        adv8_sec_title: '8 преимуществ работы с «Cəsarətoğlu MMC»',
        adv8_sec_subtitle: 'Наша главная цель — качественный продукт, своевременно доставленный на ваше производство.',
        adv8_1_title: 'Прямые поставки',
        adv8_1_desc: 'Работаем напрямую с ведущими мировыми производителями. Если вам нужны высокотехнологичные оболочки, упаковка или премиальные специи — мы обеспечим вас лучшим.',
        adv8_2_title: 'Индивидуальные условия',
        adv8_2_desc: 'Особый подход к клиентам при заблаговременном заказе. Предлагаем выгодные цены и работу по четкому графику поставок.',
        adv8_3_title: 'Надежный дистрибьютор',
        adv8_3_desc: 'Дорожим своей репутацией. Выполняем все взятые на себя обязательства строго, качественно и точно в срок.',
        adv8_4_title: 'Высокая ответственность',
        adv8_4_desc: 'Мы ориентированы на долгосрочное сотрудничество. Планируем объемы поставок сырья и полностью подстраиваемся под ритм вашего производства.',
        adv8_5_title: 'Технологическая поддержка',
        adv8_5_desc: 'Всегда совместно решаем задачи, помогаем настроить оборудование и адаптировать рецептуры с нашими ингредиентами.',
        adv8_6_title: 'Развитая логистика',
        adv8_6_desc: 'На рынке более 15 лет. За это время мы своевременно поставили тысячи километров упаковки и тонны высококачественных добавок для пищевой промышленности.',
        adv8_7_title: 'Контроль качества',
        adv8_7_desc: 'Предоставляем бесплатные тестовые образцы пленок, оболочек и специй для проведения испытаний прямо на ваших линиях.',
        adv8_8_title: 'Комплексные решения',
        adv8_8_desc: 'Помогаем не только создать идеальную упаковку и дизайн продукта, но и предоставляем авторские рецептуры для достижения неповторимого вкуса.',

        // News & Events Section (RU)
        news_sec_badge: 'НОВОВВЕДЕНИЯ',
        news_sec_subtitle: 'Последние события, мастер-классы и технологические новости нашей компании.',
        news_all_btn: 'Все новости',
        news_read_more: 'Читать далее',
        news_1_date: '18 Октября 2024',
        news_1_title: 'Практический семинар и мастер-класс по мясным технологиям в Шемахе',
        news_1_summary: 'Компания Cəsarətoğlu MMC совместно с европейскими технологами провела масштабный технологический семинар для ведущих мясокомбинатов Азербайджана.',
        news_2_date: '22 Августа 2024',
        news_2_title: 'Презентация новой линейки вакуумных пленок Multifol® GA от Südpack',
        news_2_summary: 'На склад в Баку поступила новейшая серия высокопрочных пленок с улучшенными барьерными свойствами для сыров и деликатесов.',
        news_3_date: '15 Июня 2024',
        news_3_title: 'Технологические выезды и адаптация рецептур на предприятиях клиентов',
        news_3_summary: 'Наши технологи продолжают оказывать квалифицированную поддержку клиентам по всей территории Азербайджана.',
        news_4_date: '10 Апреля 2024',
        news_4_title: 'Расширение складской программы сырья и материалов в Баку',
        news_4_summary: 'Увеличены объемы постоянного запаса полиамидных оболочек, говяжьего коллагена и термоусадочных пакетов на складе в Баку.',

        // About Page Specific Translations (RU)
        about_page_badge: 'О компании Cəsarətoğlu MMC',
        about_page_title: 'О нашей компании',
        about_page_subtitle: 'Амбициозная, трудолюбивая и ответственная команда — надежный партнер вашего производства',
        about_lead_text: 'Мы — амбициозная, трудолюбивая и ответственная компания, которая оперативно и качественно решает любые производственные задачи в сфере пищевой промышленности.',
        about_quote_q: 'Вам нужны высококачественные специи, оболочки или пленка? Не знаете, как сберечь бюджет и получить премиальное европейское качество?',
        about_quote_a: '👉 Тогда то, что вам нужно — это Мы.',
        about_delivery_p: 'Мы оперативно организуем поставку интересующих вас материалов и сырья прямо с нашего центрального склада в Баку и полностью обеспечим ваше производство всем необходимым.',
        about_btn_catalog: 'Каталог продукции',
        about_badge_distributor: 'Официальный Дистрибьютор',
        about_adv_badge: 'Преимущества',
        about_adv_title: 'Наши ключевые преимущества',
        about_adv_1_t: 'Быстрое решение',
        about_adv_1_d: 'Оперативное решение ваших задач, выезд технолога и индивидуальный подход к каждому клиенту.',
        about_adv_2_t: 'Высокое качество',
        about_adv_2_d: 'Сбережение вашего бюджета при строгом соответствии международным и европейским стандартам качества.',
        about_adv_3_t: 'Оперативная доставка',
        about_adv_3_d: 'Богатый постоянный складской запас в Баку и мгновенная безопасная доставка прямо на ваше производство.',

        // Team & Leadership Section (RU)
        team_sec_badge: 'НАША КОМАНДА',
        team_sec_title: 'Руководство и ключевые специалисты',
        team_sec_subtitle: 'Опытная и сплоченная команда экспертов, работающая для стабильности и роста вашего бизнеса',
        team_leader_badge: 'Руководитель компании',
        team_spec_badge: 'Ведущий специалист',

        // Footer Direct Contact Banner
        footer_consult_title: 'Прямая связь с отделом снабжения и технологами',
        footer_consult_desc: 'Позвоните нам или отправьте запрос на электронную почту — мы оперативно ответим на все вопросы.',
        footer_quick_links: 'Быстрые ссылки',
        footer_desc: 'Официальный дистрибьютор компаний Atlantis-Pak, Wiberg, Südpack и Avangard в Азербайджане.',
        footer_catalog_links: 'Разделы каталога',
        footer_contacts_heading: 'Контакты',
        footer_hours: 'Пн - Пт: 09:30 - 18:30',
        footer_address: 'Азербайджан, Баку, Белый город',
        footer_copyright: '© 2026 Cəsarətoğlu MMC. Все права защищены.',
        footer_admin_access: 'Панель управления'
    },

    en: {
        // Topbar
        topbar_address: 'Baku, White City / Khatai district',
        topbar_hours: 'Mon - Fri: 09:30 - 18:30',
        topbar_call_us: 'Contact phone:',
        topbar_admin_link: 'Admin Panel',

        // Navigation Dropdowns
        nav_home: 'Home',
        nav_catalog: 'Product Catalog',
        nav_casings: 'Sausage Casings',
        nav_packaging: 'Films & Packaging',
        nav_spices: 'Wiberg Spices',
        nav_partners: 'Partners',
        nav_about: 'About Us',
        nav_services: 'Technical Support',
        nav_news: 'News & Events',
        nav_contacts: 'Contacts',

        // Slider 1: Atlantis-Pak
        slider_1_badge: 'Atlantis-Pak — Exclusive Distributor',
        slider_1_title: 'Innovative Sausage Casings & High-Barrier Materials',
        slider_1_desc: 'Plastic and permeable casings iCel, Fibrosmoke, Amiflex. Superior efficiency and guaranteed European quality.',
        slider_1_btn: 'Casings Catalog',

        // Slider 2: Wiberg
        slider_2_badge: 'Wiberg (NovaTaste) — Austria / Germany',
        slider_2_title: 'Premium Natural Spices & Flavor Extracts',
        slider_2_desc: 'Global benchmark in spice manufacturing, marinades, and functional ingredient formulations for meat delicacies.',
        slider_2_btn: 'Wiberg Spices',

        // Slider 3: Südpack
        slider_3_badge: 'Südpack Verpackungen — Germany',
        slider_3_title: 'High-Barrier Thermoforming & Vacuum Films',
        slider_3_desc: 'Multilayer flexible barrier films Multifol® GA for vacuum and MAP meat and cheese packaging.',
        slider_3_btn: 'Films Catalog',

        // Slider 4: Avangard
        slider_4_badge: 'Avangard — Official Partner',
        slider_4_title: 'Complex Food Seasonings, Spices & Curing Ingredients',
        slider_4_desc: 'High-grade flavor-aromatic compounds, functional marinades, and processing additives for food manufacturing.',
        slider_4_btn: 'Avangard Products',

        // Category Cards (Product-First UX)
        cat_sec_badge: 'Materials & Raw Ingredients',
        cat_sec_title: 'Product Catalog',
        cat_sec_subtitle: 'Select a product category for your meat and food production requirements',
        cat_1_badge: 'Casings',
        cat_1_title: 'Sausage Casings',
        cat_1_desc: 'Plastic, permeable, fibrous casings from Atlantis-Pak.',
        cat_1_btn: 'Explore Casings',
        cat_2_badge: 'Spices',
        cat_2_title: 'Spices & Ingredients',
        cat_2_desc: 'Premium natural seasonings, extracts, and functional blends from Wiberg.',
        cat_2_btn: 'Explore Spices',
        cat_3_badge: 'Films',
        cat_3_title: 'Films & Packaging',
        cat_4_btn: 'Go to Blends',
        cat_proteins_title: 'Functional Proteins',
        suppliers_label: 'Manufacturers:',
        spec_dosage: 'Dosage',
        spec_flavor_profile: 'Flavor Profile',
        spec_application: 'Application',
        spec_ingredients: 'Main Ingredients',
        spec_shelf_life: 'Shelf Life',

        // Brands Strip
        brands_sec_title: 'Official World-Class Manufacturers',

        // 8 Advantages of Working with Us (EN)
        adv8_sec_badge: 'Why Choose Us',
        adv8_sec_title: '8 Advantages of Working with Cəsarətoğlu MMC',
        adv8_sec_subtitle: 'Our primary goal is a premium product delivered promptly to your manufacturing floor.',
        adv8_1_title: 'Direct Supplies',
        adv8_1_desc: 'Direct partnerships with leading global manufacturers. Advanced casings, packaging, or premium spices — we provide only the best.',
        adv8_2_title: 'Tailored Terms',
        adv8_2_desc: 'Special client conditions for advance ordering. Competitive pricing and reliable scheduled deliveries.',
        adv8_3_title: 'Reliable Distributor',
        adv8_3_desc: 'We value our reputation. We fulfill all contractual obligations strictly, qualitatively, and precisely on schedule.',
        adv8_4_title: 'High Responsibility',
        adv8_4_desc: 'Focused on long-term partnership. We plan supply volumes in advance to match your plant’s operational rhythm perfectly.',
        adv8_5_title: 'Technological Support',
        adv8_5_desc: 'Collaborative problem solving, machinery tuning, and custom recipe adaptation with our premium ingredients.',
        adv8_6_title: 'Advanced Logistics',
        adv8_6_desc: 'Over 15 years on the market. Thousands of kilometers of barrier packaging and tons of high-grade food additives delivered.',
        adv8_7_title: 'Quality Verification',
        adv8_7_desc: 'Complimentary production trial samples of films, casings, and seasonings for testing directly on your processing lines.',
        adv8_8_title: 'Turnkey Solutions',
        adv8_8_desc: 'We assist with exceptional packaging design as well as proprietary recipe formulations for exquisite flavor.',

        // News & Events Section (EN)
        news_sec_badge: 'UPDATES & NEWS',
        news_sec_subtitle: 'Latest events, workshops, and technological innovations from our company.',
        news_all_btn: 'All News',
        news_read_more: 'Read more',
        news_1_date: 'October 18, 2024',
        news_1_title: 'Meat Technology Practical Workshop & Masterclass in Shamakhi',
        news_1_summary: 'Cəsarətoğlu MMC, in collaboration with European food technologists, organized a comprehensive seminar for leading meat plants.',
        news_2_date: 'August 22, 2024',
        news_2_title: 'Launch of Südpack Multifol® GA High-Barrier Vacuum Film Series',
        news_2_summary: 'New high-durability barrier film stock for cheese and deli packaging is now available in our Baku central warehouse.',
        news_3_date: 'June 15, 2024',
        news_3_title: 'On-Site Technological Support and Recipe Optimization for Clients',
        news_3_summary: 'Our experienced technologists provide dedicated on-site consulting for meat processing plants across Azerbaijan.',
        news_4_date: 'April 10, 2024',
        news_4_title: 'Expansion of Baku Warehouse Stock and Logistics Capacity',
        news_4_summary: 'We have substantially expanded permanent stock levels for polyamide casings, bovine collagen, and shrink bags in Baku.',

        // About Page Specific Translations (EN)
        about_page_badge: 'About Cəsarətoğlu MMC',
        about_page_title: 'About Us',
        about_page_subtitle: 'An ambitious, dedicated, and responsible team partnering with premier food processors',
        about_lead_text: 'We are an ambitious, diligent, and responsible company committed to resolving your production requirements in the shortest possible timeframe.',
        about_quote_q: 'Do you need premium seasonings or advanced casings? Wondering how to safeguard your budget while attaining top quality?',
        about_quote_a: 'Then We are exactly what you need.',
        about_delivery_p: 'We organize swift delivery of any required materials and ensure your plant is equipped with everything necessary for successful production.',
        about_btn_catalog: 'Product Catalog',
        about_badge_distributor: 'Official Distributor',
        about_adv_badge: 'Advantages',
        about_adv_title: 'Our Core Strengths',
        about_adv_1_t: 'Fast Resolution',
        about_adv_1_d: 'Rapid turnaround for manufacturing needs and dedicated technological support.',
        about_adv_2_t: 'High Quality',
        about_adv_2_d: 'Safeguarding your budget while delivering world-class certified European standards.',
        about_adv_3_t: 'Prompt Delivery',
        about_adv_3_d: 'Fast dispatched orders direct from our central Baku warehouse facility.',

        // Team & Leadership Section (EN)
        team_sec_badge: 'OUR TEAM',
        team_sec_title: 'Leadership & Key Specialists',
        team_sec_subtitle: 'An experienced and committed team of industry professionals dedicated to your success',
        team_leader_badge: 'Company Leader',
        team_spec_badge: 'Lead Specialist',

        // Footer Direct Contact Banner
        footer_consult_title: 'Direct Contact with Supply Dept & Technologists',
        footer_consult_desc: 'Call our hotline or send an inquiry via email — our specialists will assist you promptly.',
        footer_quick_links: 'Quick Links',
        footer_desc: 'Official distributor of Atlantis-Pak, Wiberg, Südpack, and Avangard in Azerbaijan.',
        footer_catalog_links: 'Product Categories',
        footer_contacts_heading: 'Contact Us',
        footer_hours: 'Mon - Fri: 09:30 - 18:30',
        footer_address: 'Baku, White City, Azerbaijan',
        footer_copyright: '© 2026 Cəsarətoğlu MMC. All rights reserved.',
        footer_admin_access: 'Admin Login',

        // Catalog Modal
        modal_catalog_title: 'Cəsarətoğlu MMC Product Catalog',
        modal_catalog_subtitle: 'Official supply from Atlantis-Pak, Wiberg, Südpack, and Avangard',
        search_placeholder: 'Search by name, SKU, or brand...'
    }
};

class MainApp {
    constructor() {
        this.lang = localStorage.getItem('cesaretoglu_lang') || 'ru'; // Default to RU matching asp-pack.ru or AZ
        window.currentLang = this.lang;
        this.sliderIndex = 0;
        this.sliderTimer = null;
    }

    init() {
        this.applyLanguage(this.lang);
        this.bindEvents();
        this.applyDynamicSettings();
        this.renderDynamicHeroSlider();
        this.renderDynamicCategories();
        this.renderAboutPageContent();
        this.renderAboutTeam();

        // Initialize child modules
        if (window.PartnersModule) window.PartnersModule.init();
        if (window.CatalogModule) window.CatalogModule.init();
        if (window.NewsModule) window.NewsModule.init();

        // Ensure all modals start closed and handle clean anchor scrolling if needed
        this.handleInitialScroll();
    }

    renderAboutPageContent() {
        if (!window.dataStore) return;
        const about = window.dataStore.getAbout();
        if (!about) return;
        const lang = this.lang || 'ru';

        const getText = (prefix) => {
            if (lang === 'az') return about[`${prefix}_az`] || about[`${prefix}_ru`] || about[`${prefix}_en`];
            if (lang === 'en') return about[`${prefix}_en`] || about[`${prefix}_ru`] || about[`${prefix}_az`];
            return about[`${prefix}_ru`] || about[`${prefix}_az`] || about[`${prefix}_en`];
        };

        const updateEl = (selector, val) => {
            if (!val) return;
            const el = document.querySelector(selector);
            if (el) el.textContent = val;
        };

        const updateHtml = (selector, html) => {
            if (!html) return;
            const el = document.querySelector(selector);
            if (el) el.innerHTML = html;
        };

        updateEl('[data-i18n="about_page_badge"]', getText('badge'));
        updateEl('[data-i18n="about_page_title"]', getText('title'));
        updateEl('[data-i18n="about_page_subtitle"]', getText('subtitle'));
        updateEl('[data-i18n="about_lead_text"]', getText('lead'));

        const quoteQ = getText('quote_q');
        if (quoteQ) {
            updateHtml('[data-i18n="about_quote_q"]', `<i class="fa-solid fa-quote-left" style="color:var(--accent-orange); margin-right:6px; opacity:0.7;"></i> ${quoteQ}`);
        }
        updateEl('[data-i18n="about_quote_a"]', getText('quote_a'));
        updateEl('[data-i18n="about_delivery_p"]', getText('delivery'));
    }

    applyDynamicSettings() {
        if (!window.dataStore) return;
        const settings = window.dataStore.getSettings();
        if (!settings) return;
        const lang = this.lang || 'ru';

        const phone = settings.phone || '+994 55 327-76-55';
        const phoneClean = settings.phone_clean || phone.replace(/[^0-9+]/g, '');
        const email = settings.email || 'info@casaratoglu.az';
        const address = (lang === 'az' ? settings.address_az : (lang === 'en' ? settings.address_en : settings.address_ru)) || settings.address_ru || settings.address_az || 'г. Баку, ул. Ахмеда Раджабли 25';

        // Update phone links
        document.querySelectorAll('a[href^="tel:"]').forEach(a => {
            a.href = `tel:${phoneClean}`;
            const icon = a.querySelector('i');
            if (icon) {
                a.innerHTML = `${icon.outerHTML} ${phone}`;
            } else {
                a.textContent = phone;
            }
        });

        // Update email links
        document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
            a.href = `mailto:${email}`;
            const icon = a.querySelector('i');
            if (icon) {
                a.innerHTML = `${icon.outerHTML} ${email}`;
            } else {
                a.textContent = email;
            }
        });

        // Update addresses in topbar, footer, and body
        document.querySelectorAll('[data-i18n="topbar_address"], [data-i18n="footer_address"]').forEach(el => {
            el.textContent = address;
        });

        // Update WhatsApp links if present
        if (settings.whatsapp) {
            document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
                a.href = settings.whatsapp;
            });
        }
    }

    renderAboutTeam() {
        const leaderContainer = document.getElementById('about-team-leader-container');
        const specialistsContainer = document.getElementById('about-team-specialists-container');
        if (!leaderContainer && !specialistsContainer) return;

        const lang = this.lang || 'ru';
        const team = window.dataStore ? window.dataStore.getTeam() : [];
        const activeMembers = team.filter(m => m.status !== 'draft');

        // A member is ONLY treated as leader if is_leader is explicitly true
        const leader = activeMembers.find(m => m.is_leader === true || m.is_leader === 'true');
        const specialists = activeMembers.filter(m => m !== leader);

        if (leaderContainer) {
            if (leader) {
                const name = lang === 'az' ? (leader.name_az || leader.name_ru) : (lang === 'en' ? (leader.name_en || leader.name_ru) : (leader.name_ru || leader.name_az));
                const role = lang === 'az' ? (leader.role_az || leader.role_ru) : (lang === 'en' ? (leader.role_en || leader.role_ru) : (leader.role_ru || leader.role_az));
                const bio = lang === 'az' ? (leader.bio_az || leader.bio_ru) : (lang === 'en' ? (leader.bio_en || leader.bio_ru) : (leader.bio_ru || leader.bio_az));
                const badge = lang === 'az' ? 'Şirkət Rəhbəri' : (lang === 'en' ? 'Company Leader' : 'Руководитель компании');
                const img = leader.image_local || leader.image || 'images/team/director.jpg';

                leaderContainer.innerHTML = `
                    <div class="team-leader-card">
                        <div class="team-leader-badge">
                            <i class="fa-solid fa-crown"></i>
                            <span>${badge}</span>
                        </div>
                        <div>
                            <img src="${img}" alt="${name}" class="team-leader-photo" onerror="this.src='images/logo.png'">
                        </div>
                        <div class="team-leader-info">
                            <h3>${name}</h3>
                            <div class="team-leader-role">${role}</div>
                            <p class="team-leader-bio">${bio || ''}</p>
                        </div>
                    </div>
                `;
                leaderContainer.style.display = 'flex';
            } else {
                // If no leader is selected, hide the leader container cleanly
                leaderContainer.innerHTML = '';
                leaderContainer.style.display = 'none';
            }
        }

        if (specialistsContainer) {
            specialistsContainer.innerHTML = specialists.map(m => {
                const name = lang === 'az' ? (m.name_az || m.name_ru) : (lang === 'en' ? (m.name_en || m.name_ru) : (m.name_ru || m.name_az));
                const role = lang === 'az' ? (m.role_az || m.role_ru) : (lang === 'en' ? (m.role_en || m.role_ru) : (m.role_ru || m.role_az));
                const bio = lang === 'az' ? (m.bio_az || m.bio_ru) : (lang === 'en' ? (m.bio_en || m.bio_ru) : (m.bio_ru || m.bio_az));
                const img = m.image_local || m.image || 'images/team/director.jpg';

                return `
                    <div class="team-card-modern" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px; overflow:hidden; display:grid; grid-template-columns:190px 1fr; max-height:240px; box-shadow:0 6px 18px rgba(10,30,51,0.04); text-align:left;">
                        <div class="team-card-thumb-wrap" style="width:100%; height:100%; min-height:190px; max-height:240px; overflow:hidden; background:#F8FAFC;">
                            <img src="${img}" alt="${name}" loading="lazy" onerror="this.src='images/logo.png'" style="width:100%; height:100%; max-height:240px; object-fit:cover; object-position:top center; display:block;">
                        </div>
                        <div class="team-card-body" style="padding:1.4rem 1.3rem; display:flex; flex-direction:column; justify-content:center; overflow:hidden;">
                            <h4 class="team-card-name" style="font-size:1.15rem; font-weight:800; color:#1E293B; margin-bottom:0.25rem;">${name}</h4>
                            <div class="team-card-role" style="font-size:0.88rem; font-weight:700; color:#FF6600; margin-bottom:0.5rem;">${role}</div>
                            <p class="team-card-desc" style="font-size:0.85rem; color:#64748B; line-height:1.5; margin:0; display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden;">${bio || ''}</p>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    renderDynamicHeroSlider() {
        const sliderContainer = document.querySelector('.slider-container');
        const dotsContainer = document.querySelector('.slider-dots');
        if (!sliderContainer || !dotsContainer) return;

        const lang = this.lang || 'ru';
        // Filter ONLY active partners (governed strictly by the 'Отображать на сайте (Активен)' checkbox in admin)
        const partners = window.dataStore ? window.dataStore.getPartners().filter(p => p.status !== 'draft' && p.active !== false) : [];
        if (partners.length === 0) return;

        const bgImages = [
            'images/hero/slide_1_casings.jpg',
            'images/hero/slide_2_spices.jpg',
            'images/hero/slide_3_packaging.jpg',
            'images/hero/slide_5_avangard.jpg'
        ];

        let slidesHtml = '';
        let dotsHtml = '';

        partners.forEach((partner, idx) => {
            const bg = partner.banner || partner.hero_bg || bgImages[idx % bgImages.length];

            // Extract localized texts
            let status = (partner.status_text && typeof partner.status_text === 'object') ?
                (partner.status_text[lang] || partner.status_text.ru || partner.status_text.az || partner.status_text.en) :
                (lang === 'az' ? (partner.status_az || partner.status_ru) : (lang === 'en' ? (partner.status_en || partner.status_ru) : (partner.status_ru || partner.status_az)));

            if (!status) status = lang === 'az' ? 'Rəsmi Distribyutor' : (lang === 'en' ? 'Official Distributor' : 'Официальный Дистрибьютор');

            let category = (partner.category && typeof partner.category === 'object') ?
                (partner.category[lang] || partner.category.ru || partner.category.az || partner.category.en) :
                (lang === 'az' ? (partner.category_az || partner.category_ru) : (lang === 'en' ? (partner.category_en || partner.category_ru) : (partner.category_ru || partner.category_az)));

            let desc = (partner.description && typeof partner.description === 'object') ?
                (partner.description[lang] || partner.description.ru || partner.description.az || partner.description.en) :
                (lang === 'az' ? (partner.description_az || partner.description_ru) : (lang === 'en' ? (partner.description_en || partner.description_ru) : (partner.description_ru || partner.description_az)));

            let btnText = lang === 'az' ? `${partner.name} Məhsulları` : (lang === 'en' ? `${partner.name} Products` : `Продукция ${partner.name}`);
            let websiteBtnLabel = lang === 'az' ? 'İstehsalçının saytı' : (lang === 'en' ? 'Official Website' : 'Сайт производителя');

            const isActive = idx === 0 ? 'active' : '';
            const brandLogo = partner.logo || 'images/logo.png';

            // Website button is rendered if partner has a website URL specified in admin
            let websiteBtnHtml = '';
            const rawWeb = (partner.website || '').trim();
            if (rawWeb) {
                const siteUrl = (rawWeb.startsWith('http://') || rawWeb.startsWith('https://')) ? rawWeb : ('https://' + rawWeb);
                websiteBtnHtml = `
                  <a href="${siteUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-white btn-lg" style="background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(4px); border-color: rgba(255, 255, 255, 0.45);" title="${partner.name}">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    <span>${websiteBtnLabel}</span>
                  </a>
                `;
            }

            slidesHtml += `
              <div class="slide-item ${isActive}" style="background: linear-gradient(90deg, rgba(6, 18, 33, 0.92) 0%, rgba(6, 18, 33, 0.78) 50%, rgba(6, 18, 33, 0.40) 100%), url('${bg}') center/cover no-repeat;">
                <div class="container slide-inner">
                  <div class="slide-content-wrap">
                    <span class="slide-brand-pill">${partner.name} — ${status}</span>
                    <h2 class="slide-title">${category || partner.name}</h2>
                    <p class="slide-subtitle">${desc || ''}</p>
                    <div class="slide-actions">
                      <button class="btn btn-cta-orange btn-lg" onclick="PartnersModule.openPartnerDetail('${partner.id}')">
                        <i class="fa-solid fa-boxes-stacked"></i>
                        <span>${btnText}</span>
                      </button>
                      ${websiteBtnHtml}
                      <a href="tel:+994553277655" class="btn btn-outline-white btn-lg">
                        <i class="fa-solid fa-phone"></i>
                        <span>+994 55 327-76-55</span>
                      </a>
                    </div>
                  </div>
                  <div class="slide-logo-panel">
                    <div class="slide-logo-box">
                      <img src="${brandLogo}" alt="${partner.name}" onerror="this.src='images/logo.png'">
                    </div>
                  </div>
                </div>
              </div>
            `;

            dotsHtml += `<button class="slider-dot ${isActive}" aria-label="Slide ${idx + 1}"></button>`;
        });

        sliderContainer.innerHTML = slidesHtml;
        dotsContainer.innerHTML = dotsHtml;

        this.initSlider();
    }

    renderDynamicCategories() {
        const wrapper = document.getElementById('category-swiper-wrapper');
        if (!wrapper) return;

        const lang = this.lang || 'ru';
        const partners = window.dataStore ? window.dataStore.getPartners().filter(p => p.status !== 'draft') : [];
        const products = window.dataStore ? window.dataStore.getProducts().filter(p => p.status !== 'draft') : [];
        const storedCategories = window.dataStore ? window.dataStore.getCategories() : [];

        const defaultThemes = {
            casings: {
                icon: 'fa-drumstick-bite',
                badgeBg: 'rgba(10, 30, 51, 0.85)',
                image: 'images/hero/slide_1_casings.jpg',
                badge_az: 'Qabıqlar', badge_ru: 'Оболочки', badge_en: 'Casings',
                desc_az: 'Plastik, hisəkeçirici, poliamid və süni qabıqlar. Məhsuldarlığın artırılması və stabil forma.',
                desc_ru: 'Пластиковые, проницаемые и полиамидные оболочки. Высокая производительность и стабильный калибр.',
                desc_en: 'Plastic, permeable, and synthetic casings for meat and sausage production.',
                btn_az: 'Qabıqlar bölməsinə keç', btn_ru: 'Перейти в оболочки', btn_en: 'Go to Casings'
            },
            spices: {
                icon: 'fa-pepper-hot',
                badgeBg: 'rgba(220, 38, 38, 0.85)',
                image: 'images/hero/slide_2_spices.jpg',
                badge_az: 'Ədviyyatlar', badge_ru: 'Специи', badge_en: 'Spices',
                desc_az: 'Premium mono-ədviyyatlar, dad ekstraktları və ət emalı üçün kompleks funksional qarışıqlar.',
                desc_ru: 'Премиальные натуральные специи, вкусовые экстракты и комплексные функциональные смеси.',
                desc_en: 'Premium natural single spices, taste extracts, and functional meat ingredients.',
                btn_az: 'Ədviyyatlar bölməsinə keç', btn_ru: 'Перейти в специи', btn_en: 'Go to Spices'
            },
            packaging: {
                icon: 'fa-box-archive',
                badgeBg: 'rgba(14, 116, 144, 0.85)',
                image: 'images/hero/slide_3_packaging.jpg',
                badge_az: 'Plyonkalar', badge_ru: 'Пленки', badge_en: 'Films',
                desc_az: 'Yüksək maneəli vakuum, termoformasiya və termo-yığılan barier plyonkaları və paketləri.',
                desc_ru: 'Высокобарьерные вакуумные, термоформовочные и термоусадочные пленки и пакеты.',
                desc_en: 'High-barrier vacuum, thermoforming, and shrink films and pouches.',
                btn_az: 'Qablaşdırma bölməsinə keç', btn_ru: 'Перейти в пленки', btn_en: 'Go to Packaging'
            },
            additives: {
                icon: 'fa-mortar-pestle',
                badgeBg: 'rgba(217, 119, 6, 0.85)',
                image: 'images/hero/slide_5_avangard.jpg',
                badge_az: 'Qarışıqlar', badge_ru: 'Смеси', badge_en: 'Blends',
                desc_az: 'Kolbasalar, qril və duzlama üçün kompleks qarışıqlar.',
                desc_ru: 'Комплексные смеси для колбас, деликатесов, гриля и компоненты для посола.',
                desc_en: 'Complete blends and seasonings for sausages, cured meats, and grill products.',
                btn_az: 'Qarışıqlar bölməsinə keç', btn_ru: 'Перейти в смеси', btn_en: 'Go to Blends'
            }
        };

        const suppliersLabel = lang === 'az' ? 'İstehsalçılar:' : (lang === 'en' ? 'Manufacturers:' : 'Производители:');

        // Map registered partner names for normalization
        const partnerNameMap = {};
        partners.forEach(p => {
            if (p.name) partnerNameMap[p.name.toLowerCase().trim()] = p.name;
        });

        // Filter ONLY categories that contain at least 1 active product
        const activeCategoriesWithProducts = storedCategories.map(cat => {
            const categoryProducts = products.filter(p => {
                if (window.CatalogModule && typeof window.CatalogModule.isProductInCategory === 'function') {
                    return window.CatalogModule.isProductInCategory(p, cat.id, cat);
                }
                return (p.category || '').toLowerCase().trim() === String(cat.id).toLowerCase().trim();
            });
            return { cat, categoryProducts };
        }).filter(item => item.categoryProducts.length > 0);

        if (activeCategoriesWithProducts.length === 0) {
            wrapper.innerHTML = `
                <div class="swiper-slide" style="width:100%; text-align:center; padding:3rem 1rem;">
                    <p style="color:#64748B; font-size:1rem;">${lang === 'az' ? 'Aktiv məhsul kateqoriyası tapılmadı' : (lang === 'ru' ? 'Нет категорий с активными товарами' : 'No categories with active products')}</p>
                </div>
            `;
            this.initCategorySwiper();
            return;
        }

        wrapper.innerHTML = activeCategoriesWithProducts.map(({ cat, categoryProducts }) => {
            const theme = defaultThemes[cat.id] || {
                icon: 'fa-layer-group',
                badgeBg: 'rgba(79, 70, 229, 0.85)',
                image: 'images/hero/slide_1_casings.jpg',
                badge_az: cat.title_az || cat.title_ru || 'Xammal',
                badge_ru: cat.title_ru || cat.title_az || 'Сырье',
                badge_en: cat.title_en || cat.title_ru || 'Materials',
                desc_az: `${cat.title_az || cat.title_ru} kateqoriyası üzrə yüksək keyfiyyətli xammal və materiallar.`,
                desc_ru: `Высококачественные материалы и продукция в категории ${cat.title_ru || cat.title_az}.`,
                desc_en: `High quality raw materials and products in ${cat.title_en || cat.title_ru || 'category'}.`,
                btn_az: 'Bölməyə keç',
                btn_ru: 'Перейти в раздел',
                btn_en: 'View Category'
            };

            const title = (lang === 'ru' ? (cat.title_ru || (cat.title && cat.title.ru)) : (lang === 'en' ? (cat.title_en || (cat.title && cat.title.en)) : (cat.title_az || (cat.title && cat.title.az)))) || cat.title_az || cat.title_ru || cat.id;
            const badge = theme[`badge_${lang}`] || theme.badge_ru || title;
            const desc = theme[`desc_${lang}`] || theme.desc_ru;
            const btn = theme[`btn_${lang}`] || theme.btn_ru;

            // Extract unique manufacturers / brands strictly from real active products in this category
            const brandSet = new Set();
            categoryProducts.forEach(p => {
                let b = (p.partner || p.brand || p.manufacturer || '').trim();
                if (!b) return;

                const bLower = b.toLowerCase();
                // Filter out test dummy keywords in Latin & Cyrillic (tct, тст, tst, тест, test, gemi)
                if (bLower.includes('tct') || bLower.includes('тст') || bLower.includes('tst') || bLower.includes('тест') || bLower.includes('test') || bLower.includes('gemi')) {
                    return;
                }

                if (bLower.includes('atlantis')) b = 'Atlantis-Pak';
                else if (bLower.includes('wiberg')) b = 'Wiberg';
                else if (bLower.includes('südpack') || bLower.includes('sudpack')) b = 'Südpack';
                else if (bLower.includes('avangard')) b = 'Avangard';
                else if (partnerNameMap[bLower]) b = partnerNameMap[bLower];

                brandSet.add(b);
            });

            const brandNames = Array.from(brandSet);

            // If custom category has product with image, use it for card banner
            let cardImage = theme.image;
            if (!defaultThemes[cat.id] && categoryProducts.length > 0) {
                const imgProd = categoryProducts.find(p => p.image_local || p.image);
                if (imgProd) {
                    cardImage = imgProd.image_local || imgProd.image;
                }
            }

            const brandPillsHtml = brandNames.map(b => `<span class="pcc-brand-pill"><i class="fa-solid fa-circle-check"></i> ${b}</span>`).join('');

            return `
              <div class="swiper-slide">
                <div class="partner-cat-card" data-category="${cat.id}" onclick="CatalogModule.openCatalogModal('${cat.id}')">
                  <div class="pcc-img-banner">
                    <img src="${cardImage}" alt="${title}" class="pcc-banner-img" onerror="this.src='images/hero/slide_1_casings.jpg'">
                    <span class="pcc-img-badge" style="background:${theme.badgeBg};"><i class="fa-solid ${theme.icon}"></i> <span>${badge}</span></span>
                  </div>
                  <div class="pcc-body">
                    <h3 class="pcc-name">${title}</h3>
                    <p class="pcc-desc">${desc}</p>
                    <div class="pcc-brand-badges">
                      <span class="pcc-brand-badge-label">${suppliersLabel}</span>
                      ${brandPillsHtml}
                    </div>
                  </div>
                  <div class="pcc-footer">
                    <span>${btn}</span>
                    <i class="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            `;
        }).join('');

        this.initCategorySwiper();
    }

    initCategorySwiper() {
        if (typeof Swiper !== 'undefined' && document.querySelector('.category-swiper')) {
            if (this.categorySwiper && this.categorySwiper.destroy) {
                this.categorySwiper.destroy(true, true);
            }
            this.categorySwiper = new Swiper('.category-swiper', {
                slidesPerView: 1,
                spaceBetween: 24,
                grabCursor: true,
                speed: 600,
                preventClicks: false,
                preventClicksPropagation: false,
                touchStartPreventDefault: false,
                navigation: {
                    nextEl: '#cat-swiper-next',
                    prevEl: '#cat-swiper-prev',
                },
                pagination: {
                    el: '.cat-swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    550: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                    }
                }
            });
        }
    }

    bindEvents() {
        // Language Switcher Buttons (AZ, RU, EN)
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetLang = e.currentTarget.dataset.lang;
                if (targetLang && targetLang !== this.lang) {
                    this.switchLanguage(targetLang);
                }
            });
        });

        // Mobile Menu Drawer Toggle
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        const mobileMenuClose = document.getElementById('mobile-menu-close');

        if (mobileToggle && mobileNav) {
            mobileToggle.addEventListener('click', () => {
                mobileNav.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (mobileMenuClose && mobileNav) {
            mobileMenuClose.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Global Event Delegation for category cards
        document.addEventListener('click', (e) => {
            const catCard = e.target.closest('.partner-cat-card');
            if (catCard) {
                const catId = catCard.dataset.category || catCard.getAttribute('data-category');
                if (catId && window.CatalogModule) {
                    window.CatalogModule.openCatalogModal(catId);
                }
            }
        });

        // Smooth anchor scrolling
        window.addEventListener('hashchange', () => this.handleInitialScroll());
    }

    handleInitialScroll() {
        const hash = (window.location.hash || '').trim();

        // Clean up any stale modal hashes from URL without page jump
        if (hash.startsWith('#catalog') || hash.startsWith('#product') || hash.startsWith('#partner') || hash.startsWith('#brand') || hash.startsWith('#news')) {
            try {
                if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, '', window.location.pathname + window.location.search);
                }
            } catch (e) {}
            return;
        }

        // Standard on-page section anchors (e.g. #contacts, #about, #catalog-section)
        if (['#contacts', '#about', '#categories', '#partners', '#news-section'].includes(hash)) {
            const targetEl = document.querySelector(hash);
            if (targetEl) {
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }, 150);
            }
        }
    }

    switchLanguage(lang) {
        this.lang = lang;
        window.currentLang = lang;
        localStorage.setItem('cesaretoglu_lang', lang);
        this.applyLanguage(lang);
        this.applyDynamicSettings();
        this.renderDynamicHeroSlider();
        this.renderDynamicCategories();
        this.renderAboutPageContent();
        this.renderAboutTeam();

        if (window.PartnersModule) window.PartnersModule.renderPartners();
        if (window.CatalogModule) {
            window.CatalogModule.renderPartnerSelect();
            window.CatalogModule.renderCategoryTabs();
            window.CatalogModule.renderProducts();
        }
        if (window.NewsModule) window.NewsModule.renderNews();
    }

    applyLanguage(lang) {
        document.documentElement.lang = lang;
        const dict = TRANSLATIONS[lang] || TRANSLATIONS.ru;

        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.dataset.lang === lang) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) el.innerHTML = dict[key];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) el.placeholder = dict[key];
        });
    }

    // =========================================================================
    // Full-Width Hero Slider Controller (asp-pack.ru)
    // =========================================================================
    initSlider() {
        const slides = document.querySelectorAll('.slide-item');
        const dots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.getElementById('slider-prev');
        const nextBtn = document.getElementById('slider-next');
        const sliderContainer = document.getElementById('hero') || document.getElementById('hero-slider');

        if (!slides.length) return;

        // Clear existing timer if any
        if (this.sliderTimer) {
            clearInterval(this.sliderTimer);
            this.sliderTimer = null;
        }

        const showSlide = (idx) => {
            if (idx < 0) idx = slides.length - 1;
            if (idx >= slides.length) idx = 0;
            this.sliderIndex = idx;

            slides.forEach((s, i) => {
                if (i === idx) s.classList.add('active');
                else s.classList.remove('active');
            });

            dots.forEach((d, i) => {
                if (i === idx) d.classList.add('active');
                else d.classList.remove('active');
            });
        };

        const startAutoPlay = () => {
            stopAutoPlay();
            this.sliderTimer = setInterval(() => {
                showSlide(this.sliderIndex + 1);
            }, 5500);
        };

        const stopAutoPlay = () => {
            if (this.sliderTimer) clearInterval(this.sliderTimer);
        };

        if (prevBtn) {
            // Replace click listener
            const newPrev = prevBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrev, prevBtn);
            newPrev.addEventListener('click', () => {
                showSlide(this.sliderIndex - 1);
                startAutoPlay();
            });
        }

        if (nextBtn) {
            const newNext = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNext, nextBtn);
            newNext.addEventListener('click', () => {
                showSlide(this.sliderIndex + 1);
                startAutoPlay();
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showSlide(idx);
                startAutoPlay();
            });
        });

        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoPlay);
            sliderContainer.addEventListener('mouseleave', startAutoPlay);
        }

        showSlide(0);
        startAutoPlay();
    }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MainApp();
    window.app.init();
});
