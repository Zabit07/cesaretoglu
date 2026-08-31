/**
 * Cəsarətoğlu MMC — Data Layer & LocalStorage Management
 * Unified database for Products, Partners, News, and Global Settings
 * Trilingual support: Azerbaijani (AZ), Russian (RU), English (EN)
 */

const STORAGE_KEYS = {
    PRODUCTS: 'cesaretoglu_products',
    PARTNERS: 'cesaretoglu_partners',
    CATEGORIES: 'cesaretoglu_categories',
    NEWS: 'cesaretoglu_news',
    TEAM: 'cesaretoglu_team',
    DEPARTMENTS: 'cesaretoglu_departments',
    ABOUT: 'cesaretoglu_about',
    SETTINGS: 'cesaretoglu_settings'
};

// Initial About Page Content Seed Data (AZ, RU, EN)
const INITIAL_ABOUT = {
    badge_ru: 'О компании Cəsarətoğlu MMC',
    badge_az: 'Cəsarətoğlu MMC Haqqında',
    badge_en: 'About Cəsarətoğlu MMC',

    title_ru: 'О нашей компании',
    title_az: 'Bizim haqqımızda',
    title_en: 'About Us',

    subtitle_ru: 'Амбициозная, трудолюбивая и ответственная команда для вашего производства',
    subtitle_az: 'İddialı, çalışqan və məsuliyyətli komanda ilə istehsalatınıza etibarlı tərəfdaş',
    subtitle_en: 'An ambitious, dedicated, and responsible team partnering with premier food processors',

    lead_ru: 'Мы — амбициозная, трудолюбивая и ответственная компания, которая решит ваши производственные задачи в кратчайшие сроки.',
    lead_az: 'Biz, sizin məsələləri ən qısa müddətdə həll edəcək, iddialı, çalışqan və məsuliyyətli şirkətik.',
    lead_en: 'We are an ambitious, diligent, and responsible company committed to resolving your production requirements in the shortest possible timeframe.',

    quote_q_ru: 'Вам нужны высококачественные специи или инновационные оболочки? Думаете, как сохранить бюджет и получить лучшее качество?',
    quote_q_az: 'Sizə ədviyyatlar, üzlüklər lazımdır? Büdcənizi necə qoruyub saxlayacağınızı və ən yaxşı keyfiyyəti necə əldə edəcəyinizi bilmirsiniz?',
    quote_q_en: 'Do you need premium seasonings or advanced casings? Wondering how to safeguard your budget while attaining top quality?',

    quote_a_ru: '👉 Тогда то, что вам нужно — это Мы.',
    quote_a_az: '👉 O zaman sizə lazım olan Bizik.',
    quote_a_en: '👉 Then We are exactly what you need.',

    delivery_ru: 'Мы организуем оперативную доставку любых интересующих вас материалов и обеспечим ваше производство всем необходимым для стабильной работы.',
    delivery_az: 'Biz sizi maraqlandıran istənilən məhsulların ən qısa müddətdə çatdırılmasını təşkil edəcək və sizi lazım olan hər şey ilə təmin edəcəyik.',
    delivery_en: 'We organize swift delivery of any required materials and ensure your plant is equipped with everything necessary for successful production.',

    distributor_badge_ru: 'Официальный дистрибьютор',
    distributor_badge_az: 'Rəsmi Distribyutor',
    distributor_badge_en: 'Official Distributor'
};

// Initial Team Departments Seed Data
const INITIAL_DEPARTMENTS = [
    { id: 'executive',  title_ru: 'Руководство компании', title_az: 'Şirkət Rəhbərliyi', title_en: 'Executive Management' },
    { id: 'management', title_ru: 'Коммерческий отдел',   title_az: 'Kommersiya Şöbəsi',  title_en: 'Commercial & Sales' },
    { id: 'technology', title_ru: 'Технологический отдел', title_az: 'Texnoloji Şöbə',    title_en: 'Food Technology & R&D' },
    { id: 'supply',     title_ru: 'Снабжение и сервис',   title_az: 'Təchizat və Müştəri Servisi', title_en: 'Supply & Client Relations' },
    { id: 'logistics',  title_ru: 'Складская логистика',  title_az: 'Anbar və Logistika', title_en: 'Warehouse & Logistics' }
];

// Initial Dynamic Categories Seed Data for Homepage Slider (Admin-Panel Ready)
const INITIAL_CATEGORIES = [
    {
        id: 'casings',
        badge_az: 'Qabıqlar',
        badge_ru: 'Оболочки',
        badge_en: 'Casings',
        badgeColor: 'rgba(10, 30, 51, 0.85)',
        icon: 'fa-solid fa-drumstick-bite',
        image: 'images/hero/slide_1_casings.jpg',
        title_az: 'Kolbasa Qabıqları',
        title_ru: 'Колбасные оболочки',
        title_en: 'Sausage Casings',
        desc_az: 'Plastik, hisəkeçirici, poliamid və süni qabıqlar. Məhsuldarlığın artırılması və stabil forma.',
        desc_ru: 'Пластиковые, проницаемые, фиброузные оболочки. Высокая производительность и стабильный калибр.',
        desc_en: 'Plastic, permeable, and fibrous casing solutions for optimal production throughput.',
        btn_az: 'Qabıqlar bölməsinə keç',
        btn_ru: 'Перейти в оболочки',
        btn_en: 'Go to Casings',
        brands: ['Atlantis-Pak']
    },
    {
        id: 'spices',
        badge_az: 'Ədviyyatlar',
        badge_ru: 'Специи',
        badge_en: 'Spices',
        badgeColor: 'rgba(220, 38, 38, 0.85)',
        icon: 'fa-solid fa-pepper-hot',
        image: 'images/hero/slide_2_spices.jpg',
        title_az: 'Ədviyyatlar və İnqrediyentlər',
        title_ru: 'Специи и пищевые ингредиенты',
        title_en: 'Spices & Food Ingredients',
        desc_az: 'Premium mono-ədviyyatlar, dad ekstraktları və ət emalı üçün kompleks funksional qarışıqlar.',
        desc_ru: 'Премиальные моно-специи, экстракты, комплексные смеси для мясопереработки.',
        desc_en: 'Premium single spices, extracts, and complete culinary blends for meat processors.',
        btn_az: 'Ədviyyatlar bölməsinə keç',
        btn_ru: 'Перейти в специи',
        btn_en: 'Go to Spices',
        brands: ['Wiberg']
    },
    {
        id: 'packaging',
        badge_az: 'Plyonkalar',
        badge_ru: 'Пленки',
        badge_en: 'Films',
        badgeColor: 'rgba(14, 116, 144, 0.85)',
        icon: 'fa-solid fa-box-archive',
        image: 'images/hero/slide_3_packaging.jpg',
        title_az: 'Plyonkalar və Qablaşdırma',
        title_ru: 'Пленки и упаковка',
        title_en: 'Films & Packaging',
        desc_az: 'Yüksək maneəli vakuum, termoformasiya və termo-yığılan barier plyonkaları və paketləri.',
        desc_ru: 'Барьерные, вакуумные и термоусадочные пленки для свежего мяса и нарезки.',
        desc_en: 'High-barrier, vacuum, and thermoforming shrink films and pouches.',
        btn_az: 'Qablaşdırma bölməsinə keç',
        btn_ru: 'Перейти в пленки',
        btn_en: 'Go to Packaging',
        brands: ['Südpack', 'Atlantis-Pak']
    },
    {
        id: 'additives',
        badge_az: 'Qarışıqlar',
        badge_ru: 'Смеси',
        badge_en: 'Blends',
        badgeColor: 'rgba(217, 119, 6, 0.85)',
        icon: 'fa-solid fa-mortar-pestle',
        image: 'images/hero/slide_5_avangard.jpg',
        title_az: 'Kompleks Qarışıqlar',
        title_ru: 'Комплексные смеси Avangard',
        title_en: 'Complex Blends & Seasonings',
        desc_az: 'Kolbasalar, qril və duzlama üçün kompleks qarışıqlar.',
        desc_ru: 'Комплексные смеси для колбас, салями, гриля и компоненты для посола.',
        desc_en: 'Complete formulations for salami, sausages, grill items, and curing.',
        btn_az: 'Qarışıqlar bölməsinə keç',
        btn_ru: 'Перейти в смеси',
        btn_en: 'Go to Blends',
        brands: ['Avangard']
    }
];

// Initial Partners Seed Data (AZ, RU, EN)
const INITIAL_PARTNERS = [
    {
        id: 'atlantis-pak',
        name: 'Atlantis-Pak',
        country: 'Россия / Russia',
        logo: 'images/partners/partner_4.jpg',
        banner: 'images/hero/slide_1_casings.jpg',
        hero_bg: 'images/hero/slide_1_casings.jpg',
        status_ru: 'Официальный эксклюзивный дистрибьютор',
        status_az: 'Rəsmi eksklüziv distribyutor',
        status_en: 'Official Exclusive Distributor',
        category_ru: 'Колбасные оболочки и термоусадочные пакеты',
        category_az: 'Kolbasa qabıqları və termo-yığılan paketlər',
        category_en: 'Sausage Casings & Shrink Barrier Bags',
        description_ru: 'Один из крупнейших мировых производителей пластиковых и барьерных оболочек, проницаемых оболочек АйЦел и термоусадочных пакетов для мясной и молочной промышленности.',
        description_az: 'Ət və süd sənayesi üçün plastik və maneəli kolbasa qabıqları, yüksək keçiriciliyə malik iCel qabıqları və termo-paketlər üzrə dünya liderlərindən biri.',
        description_en: 'One of the world leading manufacturers of plastic barrier casings, permeable iCel casings, and shrink barrier bags for the meat and dairy processing industries.',
        website: 'https://atlantis-pak.top'
    },
    {
        id: 'wiberg',
        name: 'Wiberg',
        country: 'Австрия / Austria - Германия / Germany',
        logo: 'images/partners/partner_3.jpg',
        banner: 'images/hero/slide_2_spices.jpg',
        hero_bg: 'images/hero/slide_2_spices.jpg',
        status_ru: 'Официальный дистрибьютор в Азербайджане',
        status_az: 'Azərbaycanda rəsmi distribyutor',
        status_en: 'Official Distributor in Azerbaijan',
        category_ru: 'Премиальные специи, маринады и функциональные смеси',
        category_az: 'Premium ədviyyatlar, marinadlar və funksional qarışıqlar',
        category_en: 'Premium Spices, Seasonings & Functional Blends',
        description_ru: 'Мировой лидер в производстве высококачественных натуральных специй, экстрактов трав, функциональных ингредиентов и вкусовых композиций для мясопереработки и кулинарии.',
        description_az: 'Ət emalı və kulinariya sektoru üçün yüksək keyfiyyətli təbii ədviyyatlar, ot ekstraktları, funksional inqrediyentlər və dad qarışıqlarının qlobal istehsalçısı.',
        description_en: 'Global leader in premium natural spices, herb extracts, culinary seasonings, and functional ingredient formulations for meat processing.',
        website: 'https://wiberg.eu'
    },
    {
        id: 'sudpack',
        name: 'Südpack',
        country: 'Германия / Germany',
        logo: 'images/partners/Sudpack.avif',
        banner: 'images/hero/slide_3_packaging.jpg',
        hero_bg: 'images/hero/slide_3_packaging.jpg',
        status_ru: 'Официальный партнер и поставщик',
        status_az: 'Rəsmi tərəfdaş və təchizatçı',
        status_en: 'Official Partner & Supplier',
        category_ru: 'Высокобарьерные термоформовочные и вакуумные пленки',
        category_az: 'Yüksək maneəli termoformasiya və vakuum plyonkaları',
        category_en: 'High-Barrier Thermoforming & Vacuum Films',
        description_ru: 'Ведущий европейский производитель многослойных барьерных пленок серии Multifol®, термоформовочных нижних и верхних пленок для упаковки в модифицированной газовой среде (МГС).',
        description_az: 'Multifol® seriyalı çoxqatlı maneəli plyonkaların, qoruyucu qaz mühiti (MAP) və vakuum qablaşdırma üçün termoformasiya plyonkalarının aparıcı Avropa istehsalçısı.',
        description_en: 'Leading European manufacturer of multilayer barrier films, Multifol® thermoforming bottom & top webs for MAP and vacuum food packaging.',
        website: 'https://www.suedpack.com'
    },
    {
        id: 'avangard',
        name: 'Avangard',
        country: 'Россия / Russia',
        logo: 'images/partners/avangard.jpg',
        banner: 'images/hero/slide_5_avangard.jpg',
        hero_bg: 'images/hero/slide_5_avangard.jpg',
        status_ru: 'Официальный партнер и поставщик',
        status_az: 'Rəsmi tərəfdaş və təchizatçı',
        status_en: 'Official Partner & Supplier',
        category_ru: 'Пищевые смеси, приправы и комплексные добавки',
        category_az: 'Qida qarışıqları, ədviyyatlar və kompleks əlavələr',
        category_en: 'Food Seasoning Blends, Spices & Complex Additives',
        description_ru: 'Российский производитель комплексных вкусо-ароматических смесей, пищевых приправ, посолочных компонентов и функциональных смесей для мясного производства.',
        description_az: 'Ət istehsalı üçün kompleks dad-aromat qarışıqları, qida ədviyyatları, duzlama komponentləri və funksional qarışıqların etibarlı istehsalçısı.',
        description_en: 'Reliable manufacturer of complex flavoring blends, culinary seasonings, curing ingredients, and functional formulations for meat processing.',
        website: ''
    }
];

// Initial News Seed Data (AZ, RU, EN)
const INITIAL_NEWS = [
    {
        id: 'news-1',
        status: 'active',
        title_ru: 'Практический семинар и мастер-класс по мясным технологиям в Шемахе',
        title_az: 'Şamaxıda ət texnologiyaları üzrə praktiki seminar və ustad dərsi',
        title_en: 'Meat Technology Practical Workshop & Masterclass in Shamakhi',
        date: '2024-10-18',
        image: 'images/news/event_1.jpg',
        image_local: 'images/news/event_1.jpg',
        summary_ru: 'Компания Cəsarətoğlu MMC совместно с европейскими технологами провела масштабный технологический семинар для ведущих мясокомбинатов Азербайджана.',
        summary_az: 'Cəsarətoğlu MMC şirkəti avropalı texnoloqlarla birgə Azərbaycanın aparıcı ət kombinatları üçün genişmiqyaslı texnoloji seminar təşkil etdi.',
        summary_en: 'Cəsarətoğlu MMC, in collaboration with European food technologists, organized a comprehensive seminar for leading meat processing plants in Azerbaijan.',
        content_ru: 'На семинаре были продемонстрированы инновационные методы использования сверхпроницаемых оболочек АйЦел и натуральных специй Wiberg. Участники провели дегустацию готовой продукции и обсудили оптимизацию производственных процессов.\n\nЭксперты детально разобрали вопросы снижения потерь массы при термообработке, подбора оптимальных оболочек для полукопченых колбас и технологии применения функциональных смесей нового поколения.',
        content_az: 'Seminarda iCel yüksək keçiricilikli qabıqların və Wiberg təbii ədviyyatlarının tətbiqi üzrə innovativ metodlar nümayiş etdirildi. İştirakçılar hazır məhsulların dequstasiyasını keçirdi və istehsalat proseslərinin optimallaşdırılmasını müzakirə etdi.\n\nEkspertlər termik emal zamanı çəki itkisinin azaldılması, yarımhisə verilmiş kolbasalar üçün uyğun qabıqların seçimi və yeni nəsil funksional qarışıqların tətbiqi məsələlərini ətraflı təhlil etdilər.',
        content_en: 'The workshop highlighted advanced applications of high-permeability iCel casings and Wiberg natural spice formulations, featuring product tasting and production optimization discussions.\n\nIndustry experts thoroughly reviewed methods for minimizing thermal weight loss, selecting optimal barrier casings for semi-smoked sausages, and implementing next-generation functional food ingredients.'
    },
    {
        id: 'news-2',
        status: 'active',
        title_ru: 'Презентация новой линейки вакуумных пленок Multifol® GA от Südpack',
        title_az: 'Südpack-dan yeni Multifol® GA vakuum plyonkaları xəttinin təqdimatı',
        title_en: 'Launch of Südpack Multifol® GA High-Barrier Vacuum Film Series',
        date: '2024-08-22',
        image: 'images/news/event_2.jpg',
        image_local: 'images/news/event_2.jpg',
        summary_ru: 'На склад в Баку поступила новейшая серия высокопрочных пленок с улучшенными барьерными свойствами для сыров и деликатесов.',
        summary_az: 'Bakıdakı anbara pendir və delikateslər üçün gücləndirilmiş maneə xüsusiyyətlərinə malik ən yeni davamlı plyonka seriyası daxil oldu.',
        summary_en: 'New high-durability barrier film stock for cheese and deli packaging is now available in our Baku central warehouse.',
        content_ru: 'Пленки Multifol® GA обладают исключительной стойкостью к проколам и идеальной прозрачностью, обеспечивая длительный срок годности упакованной продукции в торговых сетях.\n\nДанная инновационная упаковка отлично подходит как для стандартного вакуумирования, так и для упаковки в модифицированной газовой среде (МГС). Материал легко формуется на термоформовочных линиях любого типа.',
        content_az: 'Multifol® GA plyonkaları deşilməyə qarşı müstəsna davamlılığa və ideal şəffaflığa malikdir, ticarət şəbəkələrində məhsulun saxlama müddətini əhəmiyyətli dərəcədə uzadır.\n\nBu innovativ qablaşdırma həm standart vakuumlaşdırma, həm də modifikasiya olunmuş qaz mühitində (MAP) qablaşdırma üçün mükəmməldir. Material istənilən tipli termoformasiya xətlərində asanlıqla formalaşır.',
        content_en: 'Multifol® GA films offer exceptional puncture resistance and clarity, ensuring extended shelf-life for packaged meat and cheese products in retail chains.\n\nThis cutting-edge packaging solution is ideal for standard vacuum packing as well as Modified Atmosphere Packaging (MAP). It provides superb thermoformability on all major automated packaging machines.'
    },
    {
        id: 'news-3',
        status: 'active',
        title_ru: 'Технологические выезды и адаптация рецептур на предприятиях клиентов',
        title_az: 'Müştəri müəssisələrində texnoloji səfərlər və reseptlərin uyğunlaşdırılması',
        title_en: 'On-Site Technological Support and Recipe Optimization for Clients',
        date: '2024-06-15',
        image: 'images/news/event_3.jpg',
        image_local: 'images/news/event_3.jpg',
        summary_ru: 'Наши технологи продолжают оказывать квалифицированную поддержку клиентам по всей территории Азербайджана.',
        summary_az: 'Texnoloqlarımız bütün Azərbaycan ərazisində müştərilərə ixtisaslı dəstək göstərməyə davam edirlər.',
        summary_en: 'Our experienced technologists provide dedicated on-site consulting for meat processing plants across Azerbaijan.',
        content_ru: 'В рамках сервисной программы специалисты Cəsarətoğlu MMC выезжают на производства партнеров для настройки параметров термокамер, корректировки дозировок специй и тестирования новых видов оболочек прямо на действующих производственных линиях.\n\nКлиенты получают индивидуальные рецептуры и оптимизацию себестоимости готовой продукции без потери вкуса и сочности.',
        content_az: 'Servis proqramı çərçivəsində Cəsarətoğlu MMC mütəxəssisləri termokameraların parametrlərinin sazlanması, ədviyyatların dozalanmasının tənzimlənməsi və yeni növ qabıqların birbaşa işlək xətlərdə sınaqdan keçirilməsi üçün tərəfdaş müəssisələrə səfərlər edirlər.\n\nMüştərilər dad və şirəliliyi qorumaqla hazır məhsulun maya dəyərinin optimallaşdırılmasını və fərdi resepturalar əldə edirlər.',
        content_en: 'As part of our comprehensive technical service, Cəsarətoğlu MMC specialists visit customer factories to fine-tune smokehouse parameters, optimize spice dosages, and test novel casings directly on active manufacturing lines.\n\nClients receive customized formulations and cost-effective yield improvements while maintaining superior taste and texture.'
    },
    {
        id: 'news-4',
        status: 'active',
        title_ru: 'Расширение складской программы сырья и материалов в Баку',
        title_az: 'Bakıda xammal və materialların anbar proqramının genişləndirilməsi',
        title_en: 'Expansion of Baku Warehouse Stock and Logistics Capacity',
        date: '2024-04-10',
        image: 'images/news/event_4.jpg',
        image_local: 'images/news/event_4.jpg',
        summary_ru: 'Увеличены объемы постоянного запаса полиамидных оболочек, говяжьего коллагена и термоусадочных пакетов на складе в Баку.',
        summary_az: 'Anbarda poliamid qabıqların, mal əti kollageninin və termo-paketlərin daimi ehtiyat həcmi artırıldı.',
        summary_en: 'We have substantially expanded permanent stock levels for polyamide casings, bovine collagen, and shrink bags in Baku.',
        content_ru: 'Для обеспечения бесперебойного снабжения мясокомбинатов и сыродельных предприятий Азербайджана площадь центрального склада в Баку была расширена, а объем поддерживаемой номенклатуры увеличен на 40%.\n\nТеперь отгрузка ходовых позиций специй Wiberg и оболочек Atlantis-Pak осуществляется в день подачи заявки.',
        content_az: 'Azərbaycanın ət kombinatları və pendir istehsalı müəssisələrinin fasiləsiz təchizatını təmin etmək üçün Bakıdakı mərkəzi anbarın sahəsi genişləndirildi və daimi saxlanılan çeşid həcmi 40% artırıldı.\n\nİndi ən çox tələb olunan Wiberg ədviyyatları və Atlantis-Pak qabıqlarının təhvil verilməsi sifariş daxil olduğu gün həyata keçirilir.',
        content_en: 'To ensure seamless deliveries to meat and dairy processors across Azerbaijan, our central Baku warehouse facility was expanded, increasing inventory volume by 40%.\n\nFast-moving Wiberg seasonings and Atlantis-Pak casings are now available for same-day dispatch upon receiving client orders.'
    }
];

// Initial Team Seed Data (AZ, RU, EN)
const INITIAL_TEAM = [
    {
        id: 'team-1',
        name_ru: 'Джасарат Мамедов',
        name_az: 'Cəsarət Məmmədov',
        name_en: 'Jasarat Mammadov',
        role_ru: 'Генеральный директор',
        role_az: 'Baş Direktor',
        role_en: 'General Director / CEO',
        department: 'executive',
        is_leader: true,
        order: 1,
        status: 'active',
        image: 'images/team/director.jpg',
        image_local: 'images/team/director.jpg',
        bio_ru: 'Основатель и руководитель компании. Более 18 лет успешного опыта в индустрии поставок сырья и упаковки для мясоперерабатывающей отрасли Азербайджана.',
        bio_az: 'Şirkətin təsisçisi və rəhbəri. Azərbaycanın ət emalı sənayesi üçün xammal və qablaşdırma təchizatı sahəsində 18 ildən artıq uğurlu təcrübə.',
        bio_en: 'Founder and Chief Executive Officer. Over 18 years of proven leadership in food packaging and ingredient supply for Azerbaijan meat industry.'
    },
    {
        id: 'team-2',
        name_ru: 'Эльдар Гусейнов',
        name_az: 'Eldar Hüseynov',
        name_en: 'Eldar Huseynov',
        role_ru: 'Коммерческий директор',
        role_az: 'Kommersiya Direktoru',
        role_en: 'Commercial Director',
        department: 'management',
        is_leader: false,
        order: 2,
        status: 'active',
        image: 'images/team/commercial_director.jpg',
        image_local: 'images/team/commercial_director.jpg',
        bio_ru: 'Руководит стратегическими продажами, развитием партнерских отношений с мировыми брендами (Atlantis-Pak, Wiberg, Südpack) и ключевыми клиентами.',
        bio_az: 'Strateji satışlar, beynəlxalq brendlər (Atlantis-Pak, Wiberg, Südpack) və əsas müştərilərlə tərəfdaşlıq əlaqələrinin inkişafına rəhbərlik edir.',
        bio_en: 'Leads strategic sales, key customer relationships, and partnership expansion with premier international brands.'
    },
    {
        id: 'team-3',
        name_ru: 'Рашид Алиев',
        name_az: 'Rəşid Əliyev',
        name_en: 'Rashid Aliyev',
        role_ru: 'Главный технолог / Технический директор',
        role_az: 'Baş Texnoloq / Texniki Direktor',
        role_en: 'Chief Food Technologist / Technical Director',
        department: 'technology',
        is_leader: false,
        order: 3,
        status: 'active',
        image: 'images/team/tech_director.jpg',
        image_local: 'images/team/tech_director.jpg',
        bio_ru: 'Эксперт по внедрению передовых рецептур, проведению производственных аудитов и адаптации специй Wiberg и оболочек на предприятиях клиентов.',
        bio_az: 'Qabaqcıl resepturaların tətbiqi, istehsalat auditlərinin keçirilməsi və müştəri zavodlarında Wiberg ədviyyatlarının və qabıqların adaptasiyası üzrə ekspert.',
        bio_en: 'Expert in recipe optimization, manufacturing audits, and on-site integration of Wiberg spices and high-barrier casings.'
    },
    {
        id: 'team-4',
        name_ru: 'Лейла Махмудова',
        name_az: 'Leyla Mahmudova',
        name_en: 'Leyla Mahmudova',
        role_ru: 'Руководитель отдела снабжения и клиентского сервиса',
        role_az: 'Təchizat və Müştəri Xidmətləri Şöbəsinin Rəhbəri',
        role_en: 'Head of Supply & Client Relations',
        department: 'supply',
        is_leader: false,
        order: 4,
        status: 'active',
        image: 'images/team/sales_manager.jpg',
        image_local: 'images/team/sales_manager.jpg',
        bio_ru: 'Курирует оперативную обработку заказов, бесперебойное сопровождение поставок и персональный сервис для каждого мясокомбината.',
        bio_az: 'Sifarişlərin operativ icrası, təchizatın fasiləsiz müşayiəti və hər bir ət kombinatı üçün fərdi yüksək səviyyəli servisə nəzarət edir.',
        bio_en: 'Oversees seamless order fulfillment, responsive procurement workflows, and dedicated customer service.'
    },
    {
        id: 'team-5',
        name_ru: 'Вусал Гасымов',
        name_az: 'Vüsal Qasımov',
        name_en: 'Vusal Gasimov',
        role_ru: 'Руководитель складской логистики',
        role_az: 'Anbar və Logistika Şöbəsinin Rəhbəri',
        role_en: 'Head of Warehouse Logistics',
        department: 'logistics',
        is_leader: false,
        order: 5,
        status: 'active',
        image: 'images/team/logistics_manager.jpg',
        image_local: 'images/team/logistics_manager.jpg',
        bio_ru: 'Обеспечивает строгое соблюдение температурных режимов хранения пищевых ингредиентов и экспресс-доставку по Баку и регионам Азербайджана.',
        bio_az: 'Qida inqrediyentlərinin düzgün temperatur rejimində saxlanılması və Bakı üzrə eləcə də regionlara təcili çatdırılmanı təmin edir.',
        bio_en: 'Manages controlled-climate warehouse storage, safety compliance, and swift distribution across all regions of Azerbaijan.'
    }
];

// Initial Products Seed Data (AZ, RU, EN)
const INITIAL_PRODUCTS = [
    {
        id: 'prod-1',
        title_ru: 'Wiberg Krainer',
        title_az: 'Wiberg Krainer',
        title_en: 'Wiberg Krainer',
        partner: 'Wiberg',
        category: 'spices',
        category_ru: 'Специи и пищевые ингредиенты',
        category_az: 'Ədviyyatlar və qida inqrediyentləri',
        category_en: 'Spices & Food Ingredients',
        artikul: 'WB-KRAINER',
        image: 'images/products/chili-grubogo-pomola-1.jpg',
        description_ru: 'Классическая австрийская смесь натуральных пряностей для полукопченых и варено-копченых колбас типа «Крайнская».',
        description_az: 'Yarımhisə verilmiş «Krayna» tipli kolbasalar üçün klassik Avstriya təbii ədviyyat qarışığı.',
        description_en: 'Classic Austrian natural spice blend for semi-smoked and cooked-smoked sausages.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '5–8 г/кг', value_az: '5–8 q/kq', value_en: '5–8 g/kg', value: '5–8 g/kg' },
            { key_ru: 'Вкусовой профиль', key_az: 'Dad profili', key_en: 'Flavor Profile', value_ru: 'Пряный', value_az: 'Ədviyyatlı', value_en: 'Spicy', value: 'Spicy' },
            { key_ru: 'Применение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Полукопченые колбасы', value_az: 'Yarımhisə verilmiş kolbasalar', value_en: 'Semi-smoked sausages', value: 'Semi-smoked sausages' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '24 мес.', value_az: '24 ay', value_en: '24 mo.', value: '24 mo.' },
            { key_ru: 'Упаковка', key_az: 'Qablaşdırma', key_en: 'Packaging', value_ru: '1 кг / 10 кг', value_az: '1 kq / 10 kq', value_en: '1 kg / 10 kg', value: '1 kg / 10 kg' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Wiberg (Австрия / Германия)', value_az: 'Wiberg (Avstriya / Almaniya)', value_en: 'Wiberg (Austria / Germany)', value: 'Wiberg (Austria / Germany)' }
        ],
        specs_structured: {
            dosage: { az: '5–8 q/kq', ru: '5–8 г/кг', en: '5–8 g/kg' },
            flavorProfile: { az: 'Ədviyyatlı', ru: 'Пряный', en: 'Spicy' },
            application: { az: 'Yarımhisə verilmiş kolbasalar', ru: 'Полукопченые колбасы', en: 'Semi-smoked sausages' },
            shelfLife: { az: '24 ay', ru: '24 мес.', en: '24 mo.' }
        }
    },
    {
        id: 'prod-2',
        title_ru: 'Wiberg Wiener',
        title_az: 'Wiberg Wiener',
        title_en: 'Wiberg Wiener',
        partner: 'Wiberg',
        category: 'spices',
        category_ru: 'Специи и пищевые ингредиенты',
        category_az: 'Ədviyyatlar və qida inqrediyentləri',
        category_en: 'Spices & Food Ingredients',
        artikul: 'WB-WIENER',
        image: 'images/products/chernyy-perets-molotyy-2.jpg',
        description_ru: 'Премиальная вкусо-ароматическая смесь для венских сосисок, сарделек и сосисок высшего сорта.',
        description_az: 'Vyana sosisləri, sardelkalar və əla növ sosislər üçün premium dad-aromat qarışığı.',
        description_en: 'Premium seasoning blend for Vienna frankfurters and wieners.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '4–6 г/кг', value_az: '4–6 q/kq', value_en: '4–6 g/kg', value: '4–6 g/kg' },
            { key_ru: 'Вкусовой профиль', key_az: 'Dad profili', key_en: 'Flavor Profile', value_ru: 'Мясной', value_az: 'Ət dadı', value_en: 'Savory meat', value: 'Savory meat' },
            { key_ru: 'Применение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Сосиски, сардельки', value_az: 'Sosiska, sardelka', value_en: 'Frankfurters, wieners', value: 'Frankfurters, wieners' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '24 мес.', value_az: '24 ay', value_en: '24 mo.', value: '24 mo.' },
            { key_ru: 'Упаковка', key_az: 'Qablaşdırma', key_en: 'Packaging', value_ru: '1 кг / 10 кг', value_az: '1 kq / 10 kq', value_en: '1 kg / 10 kg', value: '1 kg / 10 kg' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Wiberg (Австрия / Германия)', value_az: 'Wiberg (Avstriya / Almaniya)', value_en: 'Wiberg (Austria / Germany)', value: 'Wiberg (Austria / Germany)' }
        ],
        specs_structured: {
            dosage: { az: '4–6 q/kq', ru: '4–6 г/кг', en: '4–6 g/kg' },
            flavorProfile: { az: 'Ət dadı', ru: 'Мясной', en: 'Savory meat' },
            application: { az: 'Sosiska, sardelka', ru: 'Сосиски, сардельки', en: 'Frankfurters, wieners' },
            shelfLife: { az: '24 ay', ru: '24 мес.', en: '24 mo.' }
        }
    },
    {
        id: 'prod-3',
        title_ru: 'Wiberg Combi 12',
        title_az: 'Wiberg Combi 12',
        title_en: 'Wiberg Combi 12',
        partner: 'Wiberg',
        category: 'spices',
        category_ru: 'Специи и пищевые ингредиенты',
        category_az: 'Ədviyyatlar və qida inqrediyentləri',
        category_en: 'Spices & Food Ingredients',
        artikul: 'WB-COMBI12',
        image: 'images/products/sladkaya-paprika-3.jpg',
        description_ru: 'Многофункциональная смесь для вареных колбасных изделий, сосисок и сарделек.',
        description_az: 'Bişmiş kolbasa məmulatları, sosis və sardelkalar üçün çoxfunksiyalı kompleks qarışıq.',
        description_en: 'Multifunctional blend for cooked sausages and bologna products.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '10–12 г/кг', value_az: '10–12 q/kq', value_en: '10–12 g/kg', value: '10–12 g/kg' },
            { key_ru: 'Вкусовой профиль', key_az: 'Dad profili', key_en: 'Flavor Profile', value_ru: 'Нейтральный', value_az: 'Neytral', value_en: 'Neutral', value: 'Neutral' },
            { key_ru: 'Применение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Функциональная смесь для вареных колбас', value_az: 'Bişmiş kolbasalar üçün funksional qarışıq', value_en: 'Functional blend for cooked sausages', value: 'Functional blend for cooked sausages' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '24 мес.', value_az: '24 ay', value_en: '24 mo.', value: '24 mo.' },
            { key_ru: 'Упаковка', key_az: 'Qablaşdırma', key_en: 'Packaging', value_ru: '1 кг / 15 кг', value_az: '1 kq / 15 kq', value_en: '1 kg / 15 kg', value: '1 kg / 15 kg' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Wiberg (Австрия / Германия)', value_az: 'Wiberg (Avstriya / Almaniya)', value_en: 'Wiberg (Austria / Germany)', value: 'Wiberg (Austria / Germany)' }
        ],
        specs_structured: {
            dosage: { az: '10–12 q/kq', ru: '10–12 г/кг', en: '10–12 g/kg' },
            flavorProfile: { az: 'Neytral', ru: 'Нейтральный', en: 'Neutral' },
            application: { az: 'Bişmiş kolbasalar üçün funksional qarışıq', ru: 'Функциональная смесь для вареных колбас', en: 'Functional blend for cooked sausages' },
            shelfLife: { az: '24 ay', ru: '24 мес.', en: '24 mo.' }
        }
    },
    {
        id: 'prod-4',
        title_ru: 'Wiberg Happy Butter',
        title_az: 'Wiberg Happy Butter',
        title_en: 'Wiberg Happy Butter',
        partner: 'Wiberg',
        category: 'spices',
        category_ru: 'Специи и пищевые ингредиенты',
        category_az: 'Ədviyyatlar və qida inqrediyentləri',
        category_en: 'Spices & Food Ingredients',
        artikul: 'WB-HAPPYBUTTER',
        image: 'images/products/molotaya-koritsa-4.jpg',
        description_ru: 'Натуральный ароматизатор сливочного масла премиум-класса для паштетов, деликатесов и соусов.',
        description_az: 'Paştetlər, delikateslər və souslar üçün premium sinif təbii kərə yağı aromatizatoru.',
        description_en: 'Premium natural butter flavoring delivering rich creamy butter notes for pâtés, delicacies, and sauces.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '3–5 г/кг', value_az: '3–5 q/kq', value_en: '3–5 g/kg', value: '3–5 g/kg' },
            { key_ru: 'Вкусовой профиль', key_az: 'Dad profili', key_en: 'Flavor Profile', value_ru: 'Сливочный', value_az: 'Qaymaqlı', value_en: 'Creamy', value: 'Creamy' },
            { key_ru: 'Применение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Деликатесы, паштеты, соусы', value_az: 'Delikateslər, paştetlər, souslar', value_en: 'Delicacies, pâtés, sauces', value: 'Delicacies, pâtés, sauces' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '18 мес.', value_az: '18 ay', value_en: '18 mo.', value: '18 mo.' },
            { key_ru: 'Упаковка', key_az: 'Qablaşdırma', key_en: 'Packaging', value_ru: '1 кг / 5 кг', value_az: '1 kq / 5 kq', value_en: '1 kg / 5 kg', value: '1 kg / 5 kg' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Wiberg (Австрия / Германия)', value_az: 'Wiberg (Avstriya / Almaniya)', value_en: 'Wiberg (Austria / Germany)', value: 'Wiberg (Austria / Germany)' }
        ],
        specs_structured: {
            dosage: { az: '3–5 q/kq', ru: '3–5 г/кг', en: '3–5 g/kg' },
            flavorProfile: { az: 'Qaymaqlı', ru: 'Сливочный', en: 'Creamy' },
            application: { az: 'Delikateslər, paştetlər, souslar', ru: 'Деликатесы, паштеты, соусы', en: 'Delicacies, pâtés, sauces' },
            shelfLife: { az: '18 ay', ru: '18 мес.', en: '18 mo.' }
        }
    },
    {
        id: 'prod-5',
        title_ru: 'Wiberg Colorado',
        title_az: 'Wiberg Colorado',
        title_en: 'Wiberg Colorado',
        partner: 'Wiberg',
        category: 'spices',
        category_ru: 'Специи и пищевые ингредиенты',
        category_az: 'Ədviyyatlar və qida inqrediyentləri',
        category_en: 'Spices & Food Ingredients',
        artikul: 'WB-COLORADO',
        image: 'images/products/lukovye-granuly-5.jpg',
        description_ru: 'Ароматный масляный маринад для всех видов мяса, стейков, шашлыка и гриль-колбасок.',
        description_az: 'Bütün növ ət, steyk, kabab və qril kolbasaları üçün ətirli yağlı marinad.',
        description_en: 'Aromatic oil-based grill marinade for all meats, steaks, and barbecue specialties.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: 'По вкусу (маринад)', value_az: 'Zövqə görə', value_en: 'To taste (marinade)', value: 'To taste (marinade)' },
            { key_ru: 'Вкусовой профиль', key_az: 'Dad profili', key_en: 'Flavor Profile', value_ru: 'Гриль и травы', value_az: 'Qril və otlar', value_en: 'Grill & herbs', value: 'Grill & herbs' },
            { key_ru: 'Применение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Гриль, маринады для мяса', value_az: 'Qril, ət üçün marinadlar', value_en: 'Grill, barbecue & meat marinades', value: 'Grill, barbecue & meat marinades' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '12 мес.', value_az: '12 ay', value_en: '12 mo.', value: '12 mo.' },
            { key_ru: 'Упаковка', key_az: 'Qablaşdırma', key_en: 'Packaging', value_ru: '4 кг / ведро', value_az: '4 kq / qab', value_en: '4 kg / pail', value: '4 kg / pail' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Wiberg (Австрия / Германия)', value_az: 'Wiberg (Avstriya / Almaniya)', value_en: 'Wiberg (Austria / Germany)', value: 'Wiberg (Austria / Germany)' }
        ],
        specs_structured: {
            dosage: { az: 'Zövqə görə', ru: 'По вкусу (маринад)', en: 'To taste (marinade)' },
            flavorProfile: { az: 'Qril və otlar', ru: 'Гриль и травы', en: 'Grill & herbs' },
            application: { az: 'Qril, ət üçün marinadlar', ru: 'Гриль, маринады для мяса', en: 'Grill & meat marinades' },
            shelfLife: { az: '12 ay', ru: '12 мес.', en: '12 mo.' }
        }
    },
    {
        id: 'prod-6',
        title_ru: 'Wiberg Карри',
        title_az: 'Wiberg Karri',
        title_en: 'Wiberg Curry',
        partner: 'Wiberg',
        category: 'spices',
        category_ru: 'Специи и пищевые ингредиенты',
        category_az: 'Ədviyyatlar və qida inqrediyentləri',
        category_en: 'Spices & Food Ingredients',
        artikul: '135650',
        image: 'images/products/karri-smes-spetsiy-6.jpg',
        description_ru: 'Универсальная пряная композиция премиум-качества для сосисок, изделий из птицы и кулинарии.',
        description_az: 'Quş əti məhsulları, sosislər və kulinariya üçün premium keyfiyyətli universal ədviyyat qarışığı.',
        description_en: 'Premium universal spice formulation for poultry products, sausages, and culinary specialties.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '5–10 г/кг', value_az: '5–10 q/kq', value_en: '5–10 g/kg', value: '5–10 g/kg' },
            { key_ru: 'Вкусовой профиль', key_az: 'Dad profili', key_en: 'Flavor Profile', value_ru: 'Пряный', value_az: 'Ədviyyatlı', value_en: 'Spicy', value: 'Spicy' },
            { key_ru: 'Применение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Птица, колбаски, кулинария', value_az: 'Quş əti, kolbasalar, kulinariya', value_en: 'Poultry, sausages, culinary', value: 'Poultry, sausages, culinary' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '24 мес.', value_az: '24 ay', value_en: '24 mo.', value: '24 mo.' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Wiberg (Австрия / Германия)', value_az: 'Wiberg (Avstriya / Almaniya)', value_en: 'Wiberg (Austria / Germany)', value: 'Wiberg (Austria / Germany)' }
        ],
        specs_structured: {
            dosage: { az: '5–10 q/kq', ru: '5–10 г/кг', en: '5–10 g/kg' },
            flavorProfile: { az: 'Ədviyyatlı', ru: 'Пряный', en: 'Spicy' },
            application: { az: 'Quş əti, kolbasalar', ru: 'Птица, колбаски, кулинария', en: 'Poultry, sausages' },
            shelfLife: { az: '24 ay', ru: '24 мес.', en: '24 mo.' }
        }
    },
    {
        id: 'prod-7',
        title_ru: 'Wiberg Жареный лук',
        title_az: 'Wiberg Qızardılmış soğan',
        title_en: 'Wiberg Fried Onion',
        partner: 'Wiberg',
        category: 'spices',
        category_ru: 'Специи и пищевые ингредиенты',
        category_az: 'Ədviyyatlar və qida inqrediyentləri',
        category_en: 'Spices & Food Ingredients',
        artikul: '210890',
        image: 'images/products/zharenyy-luk-narezannyy-7.jpg',
        description_ru: 'Хрустящий жареный лук специальной обжарки. Отличный компонент для ливерных колбас, паштетов, бургеров и соусов.',
        description_az: 'Xüsusi qızardılmış xırtıldayan soğan. Ciyər kolbasaları, paştetlər, burgerlər və souslar üçün əla inqrediyentdir.',
        description_en: 'Crispy golden fried chopped onions. Excellent ingredient for liverwurst, pâtés, burgers, and sauces.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '10–30 г/кг', value_az: '10–30 q/kq', value_en: '10–30 g/kg', value: '10–30 g/kg' },
            { key_ru: 'Вкусовой профиль', key_az: 'Dad profili', key_en: 'Flavor Profile', value_ru: 'Жареный лук', value_az: 'Qızardılmış soğan', value_en: 'Roasted onion', value: 'Roasted onion' },
            { key_ru: 'Применение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Паштеты, ливерные колбасы, бургеры', value_az: 'Paştetlər, ciyər kolbasaları, burgerlər', value_en: 'Pâtés, liverwurst, burgers', value: 'Pâtés, liverwurst, burgers' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '12 мес.', value_az: '12 ay', value_en: '12 mo.', value: '12 mo.' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Wiberg (Австрия / Германия)', value_az: 'Wiberg (Avstriya / Almaniya)', value_en: 'Wiberg (Austria / Germany)', value: 'Wiberg (Austria / Germany)' }
        ],
        specs_structured: {
            dosage: { az: '10–30 q/kq', ru: '10–30 г/кг', en: '10–30 g/kg' },
            flavorProfile: { az: 'Qızardılmış soğan', ru: 'Жареный лук', en: 'Roasted onion' },
            application: { az: 'Paştetlər, burgerlər', ru: 'Паштеты, бургеры, колбасы', en: 'Pâtés, burgers, sausages' },
            shelfLife: { az: '12 ay', ru: '12 мес.', en: '12 mo.' }
        }
    },
    {
        id: 'prod-8',
        title_ru: 'Wiberg Белый перец',
        title_az: 'Wiberg Ağ istiot',
        title_en: 'Wiberg White Pepper',
        partner: 'Wiberg',
        category: 'spices',
        category_ru: 'Специи и пищевые ингредиенты',
        category_az: 'Ədviyyatlar və qida inqrediyentləri',
        category_en: 'Spices & Food Ingredients',
        artikul: '163055',
        image: 'images/products/belyy-perets-molotyy-8.jpg',
        description_ru: 'Отборный белый перец тонкого помола для вареных колбас, сарделек и светлых сыров. Не оставляет темных включений на срезе.',
        description_az: 'Bişmiş kolbasalar, sardelkalar və açıq rəngli pendirlər üçün seçmə incə üyüdülmüş ağ istiot. Kəsikdə qara ləkələr buraxmır.',
        description_en: 'Finely milled white pepper for cooked sausages and white cheeses, leaving a clean appearance on product slices.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '2–4 г/кг', value_az: '2–4 q/kq', value_en: '2–4 g/kg', value: '2–4 g/kg' },
            { key_ru: 'Вкусовой профиль', key_az: 'Dad profili', key_en: 'Flavor Profile', value_ru: 'Мягкий перечный', value_az: 'Zərif istiot', value_en: 'Mild peppery', value: 'Mild peppery' },
            { key_ru: 'Применение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Вареные колбасы, сардельки, сыры', value_az: 'Bişmiş kolbasalar, sardelkalar, pendir', value_en: 'Cooked sausages, frankfurters, cheese', value: 'Cooked sausages, frankfurters, cheese' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '24 мес.', value_az: '24 ay', value_en: '24 mo.', value: '24 mo.' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Wiberg (Австрия / Германия)', value_az: 'Wiberg (Avstriya / Almaniya)', value_en: 'Wiberg (Austria / Germany)', value: 'Wiberg (Austria / Germany)' }
        ],
        specs_structured: {
            dosage: { az: '2–4 q/kq', ru: '2–4 г/кг', en: '2–4 g/kg' },
            flavorProfile: { az: 'Zərif istiot', ru: 'Мягкий перечный', en: 'Mild peppery' },
            application: { az: 'Bişmiş kolbasalar, pendir', ru: 'Вареные колбасы, сосиски, сыры', en: 'Cooked sausages, cheeses' },
            shelfLife: { az: '24 ay', ru: '24 мес.', en: '24 mo.' }
        }
    },
    {
        id: 'prod-9',
        title_ru: 'Wiberg Базилик',
        title_az: 'Wiberg Reyhan (Bazilik)',
        title_en: 'Wiberg Basil',
        partner: 'Wiberg',
        category: 'spices',
        category_ru: 'Специи и пищевые ингредиенты',
        category_az: 'Ədviyyatlar və qida inqrediyentləri',
        category_en: 'Spices & Food Ingredients',
        artikul: '225607',
        image: 'images/products/bazilik-izmelchennyy-9.jpg',
        description_ru: 'Сушеный базилик специальной очистки и бережной сушки, сохраняющий натуральный цвет и аромат для ветчин и деликатесов.',
        description_az: 'Xüsusi qurutma texnologiyası ilə rəngini və təbii ətrini qoruyan qurudulmuş reyhan.',
        description_en: 'Gently dried crushed basil preserving natural color and aroma for hams and delicacies.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '1–3 г/кг', value_az: '1–3 q/kq', value_en: '1–3 g/kg', value: '1–3 g/kg' },
            { key_ru: 'Вкусовой профиль', key_az: 'Dad profili', key_en: 'Flavor Profile', value_ru: 'Пряные травы', value_az: 'Ətirli otlar', value_en: 'Aromatic herbs', value: 'Aromatic herbs' },
            { key_ru: 'Применение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Ветчины, деликатесы, пицца, паста', value_az: 'Vetçinalar, delikateslər, pizza, pasta', value_en: 'Hams, gourmet meats, pizza, pasta', value: 'Hams, gourmet meats, pizza, pasta' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '18 мес.', value_az: '18 ay', value_en: '18 mo.', value: '18 mo.' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Wiberg (Австрия / Германия)', value_az: 'Wiberg (Avstriya / Almaniya)', value_en: 'Wiberg (Austria / Germany)', value: 'Wiberg (Austria / Germany)' }
        ],
        specs_structured: {
            dosage: { az: '1–3 q/kq', ru: '1–3 г/кг', en: '1–3 g/kg' },
            flavorProfile: { az: 'Ətirli otlar', ru: 'Пряные травы', en: 'Aromatic herbs' },
            application: { az: 'Vetçinalar, delikateslər', ru: 'Ветчины, деликатесы, кулинария', en: 'Hams, specialty meats' },
            shelfLife: { az: '18 ay', ru: '18 мес.', en: '18 mo.' }
        }
    },
    {
        id: 'prod-10',
        title_ru: 'Multifol® GA',
        title_az: 'Multifol® GA maneəli plyonka',
        title_en: 'Multifol® GA High-Barrier Film',
        partner: 'Südpack',
        category: 'packaging',
        category_ru: 'Барьерные и вакуумные пленки',
        category_az: 'Vakuum və maneə plyonkaları',
        category_en: 'Vacuum & Barrier Films',
        artikul: 'SÜD-MF-GA',
        image: 'images/products/multifol-ga-10.jpg',
        description_ru: 'Соэкструдированные гибкие пленки семейства Multifol® из полимеров PA и PE. Высокая устойчивость к проколам, идеальная свариваемость при термоформовании для вакуумной упаковки и МГС.',
        description_az: 'PA və PE polimerlərindən hazırlanmış çoxqatlı Multifol® elastik plyonkaları. Deşilməyə qarşı yüksək davamlılıq, MAP və vakuum qablaşdırma üçün mükəmməl termoformasiya.',
        description_en: 'Coextruded flexible PA/PE barrier films of the Multifol® family. Superior puncture resistance and sealing properties for thermoformed vacuum and MAP packaging.',
        specs: [
            { key_ru: 'Тип пленки', key_az: 'Plyonka növü', key_en: 'Film Type', value: 'Thermoforming Top & Bottom Web (PA/PE)' },
            { key_ru: 'Свойства', key_az: 'Xüsusiyyətlər', key_en: 'Properties', value: 'High oxygen barrier, high puncture resistance' },
            { key_ru: 'Применение', key_az: 'Tətbiqi', key_en: 'Application', value: 'Fresh meat, sliced cold cuts, cheeses' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value: 'Südpack (Germany)' }
        ],
        specs_structured: {
            materialType: { az: 'PA / PE çoxqatlı', ru: 'PA / PE многослойная', en: 'PA / PE Multilayer' },
            application:  { az: 'Termoformasiya & MAP', ru: 'Термоформование и МГС', en: 'Thermoforming & MAP' },
            shelfLife:    { az: '18 ay', ru: '18 мес.', en: '18 mo.' }
        }
    },
    {
        id: 'prod-12',
        title_ru: 'Оболочка Диплекс',
        title_az: 'Diplex qabığı',
        title_en: 'Diplex Sausage Casing',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-DIPLEX',
        image: 'images/products/dipleks-12.jpg',
        description_ru: 'Инновационная многослойная оболочка с динамической проницаемостью. Пропускает дым при копчении, но сохраняет влагу при хранении.',
        description_az: 'Dinamik keçiriciliyə malik innovativ çoxqatlı qabıq. Hisəvermə zamanı tüstünü keçirir, saxlama zamanı isə nəmliyi qoruyur.',
        description_en: 'Innovative multilayer casing with dynamic permeability. Transmits smoke during smoking, retains moisture during storage.',
        specs: [
            {
                key_ru: 'Дымопроницаемость',
                key_az: 'Tüstükeçiricilik',
                key_en: 'Smoke Permeability',
                value_ru: 'Динамическая (высокая при копчении)',
                value_az: 'Dinamik (hisəvermə zamanı yüksək)',
                value_en: 'Dynamic (high during smoking)',
                value: 'Dynamic (high during smoking)'
            },
            {
                key_ru: 'Термоусадка',
                key_az: 'Termoyığılma',
                key_en: 'Thermal Shrinkage',
                value_ru: 'Высокая',
                value_az: 'Yüksək',
                value_en: 'High',
                value: 'High'
            },
            {
                key_ru: 'Макс. переполнение',
                key_az: 'Maks. doldurma',
                key_en: 'Max. Overstuffing',
                value_ru: '10–12%',
                value_az: '10–12%',
                value_en: '10–12%',
                value: '10–12%'
            },
            {
                key_ru: 'Срок годности гот. продукта',
                key_az: 'Hazır məhsulun saxlama müddəti',
                key_en: 'Finished Product Shelf Life',
                value_ru: 'до 60 суток',
                value_az: '60 günədək',
                value_en: 'up to 60 days',
                value: 'up to 60 days'
            },
            {
                key_ru: 'Замачивание',
                key_az: 'İslatma',
                key_en: 'Soaking',
                value_ru: '3–5 мин в воде 20–25°C',
                value_az: '20–25°C suda 3–5 dəq.',
                value_en: '3–5 min in water 20–25°C',
                value: '3–5 min in water 20–25°C'
            },
            {
                key_ru: 'Ключ. преимущество',
                key_az: 'Əsas üstünlük',
                key_en: 'Key Benefit',
                value_ru: 'Вкус копчения без потери веса',
                value_az: 'Çəki itkisi olmadan hisə verilmə',
                value_en: 'Smoky taste without weight loss',
                value: 'Smoky taste without weight loss'
            },
            {
                key_ru: 'Микроб. стойкость',
                key_az: 'Mikrobioloji davamlılıq',
                key_en: 'Microbial Resistance',
                value_ru: 'Высокая',
                value_az: 'Yüksək',
                value_en: 'High',
                value: 'High'
            }
        ],
        specs_structured: {
            smokePermeability: { az: 'Dinamik', ru: 'Динамическая', en: 'Dynamic' },
            overstuffing:      { az: '10 — 12%', ru: '10 — 12%', en: '10 — 12%' },
            shelfLife:         { az: '60 günədək', ru: 'до 60 суток', en: 'up to 60 days' }
        }
    },
    {
        id: 'prod-13',
        title_ru: 'Оболочка Фибросмок',
        title_az: 'Fibrosmok kolbasa qabığı',
        title_en: 'Fibrosmoke Sausage Casing',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-FIBRO',
        image: 'images/products/fibrosmok-13.jpg',
        description_ru: 'Однослойная матовая оболочка с шероховатой поверхностью. Внешне и на ощупь неотличима от фиброузных вискозно-армированных оболочек. Отлично пропускает дым.',
        description_az: 'Nahamar səthə malik birqatlı mat qabıq. Fibrouz qabıqlara tam bənzəyir, hisi və tüstünü mükəmməl keçirir.',
        description_en: 'Single-layer matte casing with fibrous-like texture. Smoke and vapor permeable alternative to traditional fibrous and cellulose casings.',
        specs: [
            { key_ru: 'Дымопроницаемость', key_az: 'Tüstükeçiricilik', key_en: 'Smoke Permeability', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' },
            { key_ru: 'Термоусадка', key_az: 'Termoyığılma', key_en: 'Thermal Shrinkage', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' },
            { key_ru: 'Макс. переполнение', key_az: 'Maks. doldurma', key_en: 'Max. Overstuffing', value_ru: '10–15%', value_az: '10–15%', value_en: '10–15%', value: '10–15%' },
            { key_ru: 'Срок годности гот. продукта', key_az: 'Hazır məhsulun saxlama müddəti', key_en: 'Finished Product Shelf Life', value_ru: 'до 30–60 суток', value_az: '30–60 günədək', value_en: 'up to 30–60 days', value: 'up to 30–60 days' },
            { key_ru: 'Замачивание', key_az: 'İslatma', key_en: 'Soaking', value_ru: '5–10 мин в воде 25–30°C', value_az: '25–30°C suda 5–10 dəq.', value_en: '5–10 min in water 25–30°C', value: '5–10 min in water 25–30°C' },
            { key_ru: 'Ключ. преимущество', key_az: 'Əsas üstünlük', key_en: 'Key Benefit', value_ru: 'Внешний вид как у фиброузных оболочек', value_az: 'Fibrouz qabıq görünüşü', value_en: 'Fibrous casing appearance', value: 'Fibrous casing appearance' },
            { key_ru: 'Микроб. стойкость', key_az: 'Mikrobioloji davamlılıq', key_en: 'Microbial Resistance', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' }
        ],
        specs_structured: {
            smokePermeability: { az: 'Yüksək', ru: 'Высокая', en: 'High' },
            overstuffing:      { az: '10 — 15%', ru: '10 — 15%', en: '10 — 15%' },
            shelfLife:         { az: '30 — 60 gün', ru: 'до 30–60 суток', en: 'up to 30–60 days' }
        }
    },
    {
        id: 'prod-14',
        title_ru: 'АМИФЛЕКС Тко‑Синюга',
        title_az: 'AMİFLEKS Tko‑Sinyuqa qabığı',
        title_en: 'AMIFLEX Tco‑Bung Casing',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-AMIFLEX-TKO',
        image: 'images/products/amifleks-tko-sinyuga-14.jpg',
        description_ru: 'Многослойная барьерная оболочка с имитацией натуральной синюги. Обеспечивает аппетитный рельеф и длительные сроки хранения вареных колбас, зельцев и паштетов.',
        description_az: 'Təbii kor bağırsaq (sinyuqa) formasını təqlid edən çoxqatlı maneəli qabıq. Bişmiş kolbasalar, paştetlər və zelslər üçün uzun saxlama müddəti təmin edir.',
        description_en: 'Multilayer barrier casing shaped like natural beef bungs, delivering traditional artisanal contour and extended shelf-life for cooked sausages and headcheese.',
        specs: [
            { key_ru: 'Дымопроницаемость', key_az: 'Tüstükeçiricilik', key_en: 'Smoke Permeability', value_ru: 'Нулевая (Барьерная)', value_az: 'Sıfır (Baryer)', value_en: 'Zero (Barrier)', value: 'Zero (Barrier)' },
            { key_ru: 'Термоусадка', key_az: 'Termoyığılma', key_en: 'Thermal Shrinkage', value_ru: 'Средняя', value_az: 'Orta', value_en: 'Medium', value: 'Medium' },
            { key_ru: 'Макс. переполнение', key_az: 'Maks. doldurma', key_en: 'Max. Overstuffing', value_ru: '10–12%', value_az: '10–12%', value_en: '10–12%', value: '10–12%' },
            { key_ru: 'Срок годности гот. продукта', key_az: 'Hazır məhsulun saxlama müddəti', key_en: 'Finished Product Shelf Life', value_ru: 'до 60–90 суток', value_az: '60–90 günədək', value_en: 'up to 60–90 days', value: 'up to 60–90 days' },
            { key_ru: 'Замачивание', key_az: 'İslatma', key_en: 'Soaking', value_ru: 'Не требует', value_az: 'Tələb olunmur', value_en: 'Not required', value: 'Not required' },
            { key_ru: 'Ключ. преимущество', key_az: 'Əsas üstünlük', key_en: 'Key Benefit', value_ru: 'Рельеф натуральной синюги', value_az: 'Təbii kor bağırsaq teksturası', value_en: 'Natural bung contour', value: 'Natural bung contour' },
            { key_ru: 'Микроб. стойкость', key_az: 'Mikrobioloji davamlılıq', key_en: 'Microbial Resistance', value_ru: 'Максимальная', value_az: 'Maksimal', value_en: 'Maximum', value: 'Maximum' }
        ],
        specs_structured: {
            smokePermeability: { az: 'Sıfır (Baryer)', ru: 'Нулевая (Барьерная)', en: 'Zero (Barrier)' },
            overstuffing:      { az: '10 — 12%', ru: '10 — 12%', en: '10 — 12%' },
            shelfLife:         { az: '60 — 90 gün', ru: 'до 60–90 суток', en: 'up to 60–90 days' }
        }
    },
    {
        id: 'prod-15',
        title_ru: 'АМИФЛЕКС Т',
        title_az: 'AMİFLEKS T çoxqatlı qabıq',
        title_en: 'AMIFLEX T Barrier Casing',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-AMIFLEX-T',
        image: 'images/products/amifleks-t-15.jpg',
        description_ru: 'Многослойная барьерная оболочка для плавленых колбасных сыров, сливочного масла, творога, мороженого и вареных колбас. Полная защита от кислорода и света.',
        description_az: 'Əridilmiş kolbasa pendirləri, kərə yağı, kəsmik və bişmiş kolbasalar üçün çoxqatlı maneəli qabıq. Oksigendən və işıqdan tam qoruma.',
        description_en: 'Multilayer barrier casing designed for processed sausage cheeses, butter, quark, and cooked bologna products, providing maximum oxygen barrier.',
        specs: [
            { key_ru: 'Дымопроницаемость', key_az: 'Tüstükeçiricilik', key_en: 'Smoke Permeability', value_ru: 'Нулевая (Барьерная)', value_az: 'Sıfır (Baryer)', value_en: 'Zero (Barrier)', value: 'Zero (Barrier)' },
            { key_ru: 'Термоусадка', key_az: 'Termoyığılma', key_en: 'Thermal Shrinkage', value_ru: 'Умеренная', value_az: 'Mülayim', value_en: 'Moderate', value: 'Moderate' },
            { key_ru: 'Макс. переполнение', key_az: 'Maks. doldurma', key_en: 'Max. Overstuffing', value_ru: '8–12%', value_az: '8–12%', value_en: '8–12%', value: '8–12%' },
            { key_ru: 'Срок годности гот. продукта', key_az: 'Hazır məhsulun saxlama müddəti', key_en: 'Finished Product Shelf Life', value_ru: 'до 60–120 суток', value_az: '60–120 günədək', value_en: 'up to 60–120 days', value: 'up to 60–120 days' },
            { key_ru: 'Замачивание', key_az: 'İslatma', key_en: 'Soaking', value_ru: 'Не требует', value_az: 'Tələb olunmur', value_en: 'Not required', value: 'Not required' },
            { key_ru: 'Ключ. преимущество', key_az: 'Əsas üstünlük', key_en: 'Key Benefit', value_ru: 'Полная защита от O₂ и света', value_az: 'O₂ və işıqdan tam qoruma', value_en: 'Full O₂ and light barrier', value: 'Full O₂ and light barrier' },
            { key_ru: 'Микроб. стойкость', key_az: 'Mikrobioloji davamlılıq', key_en: 'Microbial Resistance', value_ru: 'Максимальная', value_az: 'Maksimal', value_en: 'Maximum', value: 'Maximum' }
        ],
        specs_structured: {
            smokePermeability: { az: 'Sıfır (Baryer)', ru: 'Нулевая (Барьерная)', en: 'Zero (Barrier)' },
            overstuffing:      { az: '8 — 12%', ru: '8 — 12%', en: '8 — 12%' },
            shelfLife:         { az: '60 — 120 gün', ru: 'до 60–120 суток', en: 'up to 60–120 days' }
        }
    },
    {
        id: 'prod-16',
        title_ru: 'АМИВАК МВЛ',
        title_az: 'AMİVAK MVL termo-yığılan paketlər',
        title_en: 'AMIVAC MVL High-Barrier Shrink Bags',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки и термоусадочные пакеты',
        category_az: 'Kolbasa qabıqları və termo-paketlər',
        category_en: 'Sausage Casings & Shrink Bags',
        artikul: 'AP-AMIVAC-MVL',
        image: 'images/products/amivak-mvl-16.jpg',
        description_ru: 'Высокобарьерные термоусадочные пакеты для вакуумной упаковки колбасных изделий, деликатесов, сыров без созревания и порционной нарезки. Высокий процент усадки.',
        description_az: 'Kolbasa məmulatları, delikateslər, yetişməmiş pendirlər və porsiyalı kəsimlərin vakuum qablaşdırılması üçün yüksək maneəli termo-paketlər.',
        description_en: 'High-barrier shrink bags for vacuum packaging of processed meats, gourmet delicacies, fresh cheeses, and portioned cuts.',
        specs: [
            { key_ru: 'Тип', key_az: 'Növü', key_en: 'Type', value: 'Multilayer barrier shrink bags (EVOH)' },
            { key_ru: 'Усадка', key_az: 'Yığılma', key_en: 'Shrink Ratio', value: 'Up to 45-50%' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value: 'Atlantis-Pak' }
        ],
        specs_structured: {
            materialType: { az: 'EVOH termo-paket', ru: 'EVOH термоусадочный', en: 'EVOH Shrink Bag' },
            application:  { az: 'Vakuum paketləmə', ru: 'Вакуумная упаковка', en: 'Vacuum packaging' },
            shelfLife:    { az: '12 — 24 ay', ru: '12 — 24 мес.', en: '12 — 24 mo.' }
        }
    },
    {
        id: 'prod-17',
        title_ru: 'АйЦел Премиум‑М',
        title_az: 'iCel Premium‑M mat kolbasa qabığı',
        title_en: 'iCel Premium‑M Matte Permeable Casing',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-ICEL-PREM-M',
        image: 'images/products/aytsel-premium-m-17.jpg',
        description_ru: 'Матовая сверхпроницаемая полимерная оболочка премиум-класса. Придает благородный матовый внешний вид сырокопченым, сыровяленым и варено-копченым колбасам.',
        description_az: 'Premium sinif mat yüksək keçiricilikli polimer qabıq. Çiy hisə verilmiş, qurudulmuş və bişmiş-hisə verilmiş kolbasalara nəcib mat görünüş verir.',
        description_en: 'Premium matte ultra-permeable polymer casing, conferring an authentic noble matte appearance to dry, dry-cured, and semi-dry salamis.',
        specs: [
            { key_ru: 'Дымопроницаемость', key_az: 'Tüstükeçiricilik', key_en: 'Smoke Permeability', value_ru: 'Очень высокая', value_az: 'Çox yüksək', value_en: 'Very high', value: 'Very high' },
            { key_ru: 'Термоусадка', key_az: 'Termoyığılma', key_en: 'Thermal Shrinkage', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' },
            { key_ru: 'Макс. переполнение', key_az: 'Maks. doldurma', key_en: 'Max. Overstuffing', value_ru: '10–15%', value_az: '10–15%', value_en: '10–15%', value: '10–15%' },
            { key_ru: 'Срок годности гот. продукта', key_az: 'Hazır məhsulun saxlama müddəti', key_en: 'Finished Product Shelf Life', value_ru: 'до 90–120 суток', value_az: '90–120 günədək', value_en: 'up to 90–120 days', value: 'up to 90–120 days' },
            { key_ru: 'Замачивание', key_az: 'İslatma', key_en: 'Soaking', value_ru: '15–20 мин в воде 20°C', value_az: '20°C suda 15–20 dəq.', value_en: '15–20 min in water 20°C', value: '15–20 min in water 20°C' },
            { key_ru: 'Ключ. преимущество', key_az: 'Əsas üstünlük', key_en: 'Key Benefit', value_ru: 'Матовый вид сырокопченых колбас', value_az: 'Çiy hisə verilmiş kolbasa görünüşü', value_en: 'Matte finish for dry-cured sausages', value: 'Matte finish for dry-cured sausages' },
            { key_ru: 'Микроб. стойкость', key_az: 'Mikrobioloji davamlılıq', key_en: 'Microbial Resistance', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' }
        ],
        specs_structured: {
            smokePermeability: { az: 'Çox yüksək', ru: 'Очень высокая', en: 'Very high' },
            overstuffing:      { az: '10 — 15%', ru: '10 — 15%', en: '10 — 15%' },
            shelfLife:         { az: '90 — 120 gün', ru: 'до 90–120 суток', en: 'up to 90–120 days' }
        }
    },
    {
        id: 'prod-18',
        title_ru: 'АйЦел Премиум',
        title_az: 'iCel Premium super keçirici qabıq',
        title_en: 'iCel Premium Permeable Casing',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-ICEL-PREM',
        image: 'images/products/aytsel-premium-18.jpg',
        description_ru: 'Флагманская сверхпроницаемая оболочка, лучшая альтернатива фиброузным и целлюлозным оболочкам. Позволяет сократить время созревания сырокопченых колбас.',
        description_az: 'Fibrouz və sellüloz qabıqlara ən yaxşı alternativ olan flaqman super keçirici qabıq. Çiy hisə verilmiş kolbasaların yetişmə müddətini qısaldır.',
        description_en: 'Flagship permeable polymer casing, supreme alternative to fibrous and collagen casings. Reduces curing and drying cycle time.',
        specs: [
            { key_ru: 'Дымопроницаемость', key_az: 'Tüstükeçiricilik', key_en: 'Smoke Permeability', value_ru: 'Очень высокая', value_az: 'Çox yüksək', value_en: 'Very high', value: 'Very high' },
            { key_ru: 'Термоусадка', key_az: 'Termoyığılma', key_en: 'Thermal Shrinkage', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' },
            { key_ru: 'Макс. переполнение', key_az: 'Maks. doldurma', key_en: 'Max. Overstuffing', value_ru: '10–15%', value_az: '10–15%', value_en: '10–15%', value: '10–15%' },
            { key_ru: 'Срок годности гот. продукта', key_az: 'Hazır məhsulun saxlama müddəti', key_en: 'Finished Product Shelf Life', value_ru: 'до 90–120 суток', value_az: '90–120 günədək', value_en: 'up to 90–120 days', value: 'up to 90–120 days' },
            { key_ru: 'Замачивание', key_az: 'İslatma', key_en: 'Soaking', value_ru: '15–20 мин в воде 20°C', value_az: '20°C suda 15–20 dəq.', value_en: '15–20 min in water 20°C', value: '15–20 min in water 20°C' },
            { key_ru: 'Ключ. преимущество', key_az: 'Əsas üstünlük', key_en: 'Key Benefit', value_ru: 'Лучшая альтернатива фиброузным оболочкам', value_az: 'Fibrouz qabıqların ən yaxşı alternativi', value_en: 'Best alternative to fibrous casings', value: 'Best alternative to fibrous casings' },
            { key_ru: 'Микроб. стойкость', key_az: 'Mikrobioloji davamlılıq', key_en: 'Microbial Resistance', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' }
        ],
        specs_structured: {
            smokePermeability: { az: 'Çox yüksək', ru: 'Очень высокая', en: 'Very high' },
            overstuffing:      { az: '10 — 15%', ru: '10 — 15%', en: '10 — 15%' },
            shelfLife:         { az: '90 — 120 gün', ru: 'до 90–120 суток', en: 'up to 90–120 days' }
        }
    },
    {
        id: 'prod-19',
        title_ru: 'АМИСТАЙЛ СР',
        title_az: 'AMİSTAYL SR üst örtük plyonkası',
        title_en: 'AMISTYLE CP Lidding Film',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки и барьерные материалы',
        category_az: 'Kolbasa qabıqları və maneə materialları',
        category_en: 'Sausage Casings & Barrier Materials',
        artikul: 'AP-AMISTYLE-CP',
        image: 'images/products/amistayl-sr-19.jpg',
        description_ru: 'Многослойная высокобарьерная пленка для запайки лотков и термоформовки. Идеальная прозрачность, антифог-эффект (не запотевает) и надежный герметичный шов.',
        description_az: 'Qabların lehimlənməsi və termoformasiya üçün çoxqatlı yüksək maneəli üst örtük plyonkası. Şəffaflıq, dumanlanmayan örtük və möhkəm tikiş.',
        description_en: 'Multilayer high-barrier lidding and thermoforming film with anti-fog properties and crystal-clear presentation for fresh meat and deli trays.',
        specs: [
            { key_ru: 'Толщина', key_az: 'Qalınlıq', key_en: 'Thickness', value: '45 — 75 µm' },
            { key_ru: 'Особенности', key_az: 'Xüsusiyyətlər', key_en: 'Features', value: 'Anti-fog, optical clarity, strong seal' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value: 'Atlantis-Pak' }
        ],
        specs_structured: {
            materialType: { az: 'Yüksək maneəli üst örtük', ru: 'Высокобарьерная пленка', en: 'High-Barrier Lidding' },
            application:  { az: 'Lötmə & termoformasiya', ru: 'Запайка лотков', en: 'Tray sealing' },
            shelfLife:    { az: '12 — 18 ay', ru: '12 — 18 мес.', en: '12 — 18 mo.' }
        }
    },
    {
        id: 'prod-20',
        title_ru: 'АМИЦЕЛ',
        title_az: 'AMİCEL sosiska qabığı',
        title_en: 'AMICEL Frank Casing',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-AMICEL',
        image: 'images/products/amitsel-20.jpg',
        description_ru: 'Дымопроницаемая сосисочная оболочка нового поколения. Обеспечивает классический глянец, нежный «укус» и превосходный аромат копчения сосисок и сарделек.',
        description_az: 'Yeni nəsil tüstükeçirən sosiska qabığı. Sosiska və sardelkalara klassik parıltı, zərif dişləmə və mükəmməl his qoxusu qazandırır.',
        description_en: 'Next-generation smokable frankfurter casing delivering authentic smoky aroma, tender bite, and glossy appearance.',
        specs: [
            { key_ru: 'Дымопроницаемость', key_az: 'Tüstükeçiricilik', key_en: 'Smoke Permeability', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' },
            { key_ru: 'Термоусадка', key_az: 'Termoyığılma', key_en: 'Thermal Shrinkage', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' },
            { key_ru: 'Макс. переполнение', key_az: 'Maks. doldurma', key_en: 'Max. Overstuffing', value_ru: '10–12%', value_az: '10–12%', value_en: '10–12%', value: '10–12%' },
            { key_ru: 'Срок годности гот. продукта', key_az: 'Hazır məhsulun saxlama müddəti', key_en: 'Finished Product Shelf Life', value_ru: 'до 15–30 суток', value_az: '15–30 günədək', value_en: 'up to 15–30 days', value: 'up to 15–30 days' },
            { key_ru: 'Замачивание', key_az: 'İslatma', key_en: 'Soaking', value_ru: 'Не требует', value_az: 'Tələb olunmur', value_en: 'Not required', value: 'Not required' },
            { key_ru: 'Ключ. преимущество', key_az: 'Əsas üstünlük', key_en: 'Key Benefit', value_ru: 'Классический глянец и аромат копчения', value_az: 'Klassik parıltı və hisə ətri', value_en: 'Classic gloss and smoke aroma', value: 'Classic gloss and smoke aroma' },
            { key_ru: 'Микроб. стойкость', key_az: 'Mikrobioloji davamlılıq', key_en: 'Microbial Resistance', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' }
        ],
        specs_structured: {
            smokePermeability: { az: 'Yüksək', ru: 'Высокая', en: 'High' },
            overstuffing:      { az: '10 — 12%', ru: '10 — 12%', en: '10 — 12%' },
            shelfLife:         { az: '15 — 30 gün', ru: 'до 15–30 суток', en: 'up to 15–30 days' }
        }
    },
    {
        id: 'prod-21',
        title_ru: 'АМИФЛЕКС‑Мини',
        title_az: 'AMİFLEKS‑Mini kiçik porsiyalı qabıq',
        title_en: 'AMIFLEX‑Mini Small Caliber Casing',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-AMIFLEX-MINI',
        image: 'images/products/amifleks-mini-21.jpg',
        description_ru: 'Барьерная оболочка малого калибра для порционных колбасок, паштетов и плавленых сырков фиксированного веса от 25 до 100 грамм с долгим сроком хранения.',
        description_az: '25-dən 100 qrama qədər fiksasiya olunmuş çəkiyə malik kiçik porsiyalı kolbasalar, paştetlər və pendirlər üçün kiçik kalibrli maneəli qabıq.',
        description_en: 'Small caliber barrier casing for portioned snack sausages, pâtés, and cheese spreads with fixed weight (25-100 g) and extended shelf life.',
        specs: [
            { key_ru: 'Дымопроницаемость', key_az: 'Tüstükeçiricilik', key_en: 'Smoke Permeability', value_ru: 'Нулевая (Барьерная)', value_az: 'Sıfır (Baryer)', value_en: 'Zero (Barrier)', value: 'Zero (Barrier)' },
            { key_ru: 'Термоусадка', key_az: 'Termoyığılma', key_en: 'Thermal Shrinkage', value_ru: 'Умеренная', value_az: 'Mülayim', value_en: 'Moderate', value: 'Moderate' },
            { key_ru: 'Макс. переполнение', key_az: 'Maks. doldurma', key_en: 'Max. Overstuffing', value_ru: '8–12%', value_az: '8–12%', value_en: '8–12%', value: '8–12%' },
            { key_ru: 'Срок годности гот. продукта', key_az: 'Hazır məhsulun saxlama müddəti', key_en: 'Finished Product Shelf Life', value_ru: 'до 60–90 суток', value_az: '60–90 günədək', value_en: 'up to 60–90 days', value: 'up to 60–90 days' },
            { key_ru: 'Замачивание', key_az: 'İslatma', key_en: 'Soaking', value_ru: 'Не требует', value_az: 'Tələb olunmur', value_en: 'Not required', value: 'Not required' },
            { key_ru: 'Ключ. преимущество', key_az: 'Əsas üstünlük', key_en: 'Key Benefit', value_ru: 'Фиксированный вес 25–100 г', value_az: '25–100 q sabit çəki', value_en: 'Fixed portion weight 25–100 g', value: 'Fixed portion weight 25–100 g' },
            { key_ru: 'Микроб. стойкость', key_az: 'Mikrobioloji davamlılıq', key_en: 'Microbial Resistance', value_ru: 'Максимальная', value_az: 'Maksimal', value_en: 'Maximum', value: 'Maximum' }
        ],
        specs_structured: {
            smokePermeability: { az: 'Sıfır (Baryer)', ru: 'Нулевая (Барьерная)', en: 'Zero (Barrier)' },
            overstuffing:      { az: '8 — 12%', ru: '8 — 12%', en: '8 — 12%' },
            shelfLife:         { az: '60 — 90 gün', ru: 'до 60–90 суток', en: 'up to 60–90 days' }
        }
    },
    {
        id: 'prod-22',
        title_ru: 'АйПил-Черева',
        title_az: 'iPeel təbii bağırsaq analoqu sosiska qabığı',
        title_en: 'iPeel Natural Casings Look-Alike',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-IPEEL-CHEREVA',
        image: 'images/products/aypil-chereva-22.jpg',
        description_ru: 'Легкосъемная проницаемая полимерная сосисочная оболочка с эффектом натуральной черевы. Идеальна для автоматических линий пилинга (снятия оболочки).',
        description_az: 'Təbii bağırsaq effektinə malik, asan soyulan keçirici polimer sosiska qabığı. Avtomatik soyma xətləri üçün idealdır.',
        description_en: 'Easy-peeling permeable polymer sausage casing mimicking natural casings. Excellent performance on high-speed peeling machinery.',
        specs: [
            { key_ru: 'Дымопроницаемость', key_az: 'Tüstükeçiricilik', key_en: 'Smoke Permeability', value_ru: 'Средняя', value_az: 'Orta', value_en: 'Medium', value: 'Medium' },
            { key_ru: 'Термоусадка', key_az: 'Termoyığılma', key_en: 'Thermal Shrinkage', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' },
            { key_ru: 'Макс. переполнение', key_az: 'Maks. doldurma', key_en: 'Max. Overstuffing', value_ru: '10–12%', value_az: '10–12%', value_en: '10–12%', value: '10–12%' },
            { key_ru: 'Срок годности гот. продукта', key_az: 'Hazır məhsulun saxlama müddəti', key_en: 'Finished Product Shelf Life', value_ru: 'до 15–30 суток', value_az: '15–30 günədək', value_en: 'up to 15–30 days', value: 'up to 15–30 days' },
            { key_ru: 'Замачивание', key_az: 'İslatma', key_en: 'Soaking', value_ru: 'Не требует', value_az: 'Tələb olunmur', value_en: 'Not required', value: 'Not required' },
            { key_ru: 'Ключ. преимущество', key_az: 'Əsas üstünlük', key_en: 'Key Benefit', value_ru: 'Легкий пилинг на автоматических линиях', value_az: 'Avtomatik xətlərdə asan soyulma', value_en: 'Easy peeling on automatic lines', value: 'Easy peeling on automatic lines' },
            { key_ru: 'Микроб. стойкость', key_az: 'Mikrobioloji davamlılıq', key_en: 'Microbial Resistance', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' }
        ],
        specs_structured: {
            smokePermeability: { az: 'Orta', ru: 'Средняя', en: 'Medium' },
            overstuffing:      { az: '10 — 12%', ru: '10 — 12%', en: '10 — 12%' },
            shelfLife:         { az: '15 — 30 gün', ru: 'до 15–30 суток', en: 'up to 15–30 days' }
        }
    },
    {
        id: 'prod-23',
        title_ru: 'АМИЛЮКС ТЛ',
        title_az: 'AMİLUKS TL parıltılı sosiska qabığı',
        title_en: 'AMILUX TL Glossy Frankfurter Casing',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-AMILUX-TL',
        image: 'images/products/amilyuks-tl-23.jpg',
        description_ru: 'Проницаемая для коптильного дыма глянцевая сосисочная оболочка. Обеспечивает минимальные термопотери при термообработке и увеличенный срок годности продукта без вторичной упаковки.',
        description_az: 'Tüstükeçirən parlaq sosiska qabığı. Termik emal zamanı minimum çəki itkisini və təkrar qablaşdırmasız məhsulun uzun saxlama müddətini təmin edir.',
        description_en: 'Smokable high-gloss frankfurter casing delivering minimal cooking losses and extended retail shelf life without secondary packaging.',
        specs: [
            { key_ru: 'Дымопроницаемость', key_az: 'Tüstükeçiricilik', key_en: 'Smoke Permeability', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' },
            { key_ru: 'Термоусадка', key_az: 'Termoyığılma', key_en: 'Thermal Shrinkage', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' },
            { key_ru: 'Макс. переполнение', key_az: 'Maks. doldurma', key_en: 'Max. Overstuffing', value_ru: '10–12%', value_az: '10–12%', value_en: '10–12%', value: '10–12%' },
            { key_ru: 'Срок годности гот. продукта', key_az: 'Hazır məhsulun saxlama müddəti', key_en: 'Finished Product Shelf Life', value_ru: 'до 20–45 суток', value_az: '20–45 günədək', value_en: 'up to 20–45 days', value: 'up to 20–45 days' },
            { key_ru: 'Замачивание', key_az: 'İslatma', key_en: 'Soaking', value_ru: 'Не требует', value_az: 'Tələb olunmur', value_en: 'Not required', value: 'Not required' },
            { key_ru: 'Ключ. преимущество', key_az: 'Əsas üstünlük', key_en: 'Key Benefit', value_ru: 'Глянец без вторичной упаковки', value_az: 'Təkrar qablaşdırmasız parıltı', value_en: 'Gloss without secondary packaging', value: 'Gloss without secondary packaging' },
            { key_ru: 'Микроб. стойкость', key_az: 'Mikrobioloji davamlılıq', key_en: 'Microbial Resistance', value_ru: 'Высокая', value_az: 'Yüksək', value_en: 'High', value: 'High' }
        ],
        specs_structured: {
            smokePermeability: { az: 'Yüksək', ru: 'Высокая', en: 'High' },
            overstuffing:      { az: '10 — 12%', ru: '10 — 12%', en: '10 — 12%' },
            shelfLife:         { az: '20 — 45 gün', ru: 'до 20–45 суток', en: 'up to 20–45 days' }
        }
    },
    {
        id: 'prod-24',
        title_ru: 'АМИПАК',
        title_az: 'AMİPAK birqatlı sosiska qabığı',
        title_en: 'AMIPAK Single-Layer Barrier Casing',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-AMIPAK',
        image: 'images/products/amipak-24.jpg',
        description_ru: 'Однослойная барьерная сосисочная оболочка высокой механической прочности. Обеспечивает микробиологическую стойкость, термостойкость и стабильный калибр батончиков.',
        description_az: 'Yüksək mexaniki möhkəmliyə malik birqatlı maneəli sosiska qabığı. Mikrobioloji sabitliyi, temperatur dözümlülüyünü və sabit kalibri təmin edir.',
        description_en: 'Single-layer barrier frankfurter casing of high mechanical strength, providing microbiological stability, heat resistance, and consistent caliber.',
        specs: [
            { key_ru: 'Дымопроницаемость', key_az: 'Tüstükeçiricilik', key_en: 'Smoke Permeability', value_ru: 'Нулевая (Барьерная)', value_az: 'Sıfır (Baryer)', value_en: 'Zero (Barrier)', value: 'Zero (Barrier)' },
            { key_ru: 'Термоусадка', key_az: 'Termoyığılma', key_en: 'Thermal Shrinkage', value_ru: 'Умеренная', value_az: 'Mülayim', value_en: 'Moderate', value: 'Moderate' },
            { key_ru: 'Макс. переполнение', key_az: 'Maks. doldurma', key_en: 'Max. Overstuffing', value_ru: '10–12%', value_az: '10–12%', value_en: '10–12%', value: '10–12%' },
            { key_ru: 'Срок годности гот. продукта', key_az: 'Hazır məhsulun saxlama müddəti', key_en: 'Finished Product Shelf Life', value_ru: 'до 30–60 суток', value_az: '30–60 günədək', value_en: 'up to 30–60 days', value: 'up to 30–60 days' },
            { key_ru: 'Замачивание', key_az: 'İslatma', key_en: 'Soaking', value_ru: 'Не требует', value_az: 'Tələb olunmur', value_en: 'Not required', value: 'Not required' },
            { key_ru: 'Ключ. преимущество', key_az: 'Əsas üstünlük', key_en: 'Key Benefit', value_ru: 'Высокая мех. прочность при набивке', value_az: 'Doldurmada yüksək mexaniki möhkəmlik', value_en: 'High mechanical strength during stuffing', value: 'High mechanical strength during stuffing' },
            { key_ru: 'Микроб. стойкость', key_az: 'Mikrobioloji davamlılıq', key_en: 'Microbial Resistance', value_ru: 'Максимальная', value_az: 'Maksimal', value_en: 'Maximum', value: 'Maximum' }
        ],
        specs_structured: {
            smokePermeability: { az: 'Sıfır (Baryer)', ru: 'Нулевая (Барьерная)', en: 'Zero (Barrier)' },
            overstuffing:      { az: '10 — 12%', ru: '10 — 12%', en: '10 — 12%' },
            shelfLife:         { az: '30 — 60 gün', ru: 'до 30–60 суток', en: 'up to 30–60 days' }
        }
    },
    {
        id: 'prod-25',
        title_ru: 'Авангард Салями',
        title_az: 'Avanqard Salyami',
        title_en: 'Avangard Salami',
        partner: 'Avangard',
        category: 'additives',
        category_ru: 'Комплексные смеси и добавки',
        category_az: 'Kompleks qarışıqlar və əlavələr',
        category_en: 'Complex Blends & Additives',
        artikul: 'AVG-SALAMI-01',
        image: 'images/partners/avangard.jpg',
        description_ru: 'Высококачественная сбалансированная вкусо-ароматическая смесь для производства полукопченых и варено-копченых колбас.',
        description_az: 'Yarıhisəverilmiş və bişmiş-hisəverilmiş kolbasaların istehsalı üçün yüksək keyfiyyətli balanslaşdırılmış dad-aromat qarışığı.',
        description_en: 'Premium balanced flavoring blend for semi-smoked and cooked-smoked sausage manufacturing.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '5–7 г/кг', value_az: '5–7 q/kq', value_en: '5–7 g/kg', value: '5–7 g/kg' },
            { key_ru: 'Вкусовой профиль', key_az: 'Dad profili', key_en: 'Flavor Profile', value_ru: 'Пряная салями', value_az: 'Ədviyyatlı salyami', value_en: 'Spicy salami', value: 'Spicy salami' },
            { key_ru: 'Применение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Полукопченые и с/к колбасы', value_az: 'Yarımhisəli və çiy hisəli kolbasalar', value_en: 'Semi-smoked and dry salami', value: 'Semi-smoked and dry salami' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '18 мес.', value_az: '18 ay', value_en: '18 mo.', value: '18 mo.' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Avangard', value_az: 'Avangard', value_en: 'Avangard', value: 'Avangard' }
        ],
        specs_structured: {
            dosage:        { az: '5–7 q/kq', ru: '5–7 г/кг', en: '5–7 g/kg' },
            flavorProfile: { az: 'Ədviyyatlı salyami', ru: 'Пряная салями', en: 'Spicy salami' },
            application:   { az: 'Yarımhisəli kolbasalar', ru: 'Колбасы и деликатесы', en: 'Sausages & deli' },
            shelfLife:     { az: '18 ay', ru: '18 мес.', en: '18 mo.' }
        }
    },
    {
        id: 'prod-26',
        title_ru: 'Авангард Гриль Премиум',
        title_az: 'Avanqard Qril Premium',
        title_en: 'Avangard Grill Premium',
        partner: 'Avangard',
        category: 'additives',
        category_ru: 'Комплексные смеси и добавки',
        category_az: 'Kompleks qarışıqlar və əlavələr',
        category_en: 'Complex Blends & Additives',
        artikul: 'AVG-GRILL-02',
        image: 'images/partners/avangard.jpg',
        description_ru: 'Ароматная композиция для маринования мясных полуфабрикатов, шашлыка и гриль-колбасок.',
        description_az: 'Ət yarımfabrikatlarının, kabab və qril kolbasalarının marinadlaşdırılması üçün ətirli qarışıq.',
        description_en: 'Aromatic formulation for fresh meats, barbecue, and grilling sausages.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '8–12 г/кг', value_az: '8–12 q/kq', value_en: '8–12 g/kg', value: '8–12 g/kg' },
            { key_ru: 'Вкусовой профиль', key_az: 'Dad profili', key_en: 'Flavor Profile', value_ru: 'Гриль и пряности', value_az: 'Qril və ədviyyatlar', value_en: 'Grill & spices', value: 'Grill & spices' },
            { key_ru: 'Применение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Гриль, полуфабрикаты, маринады', value_az: 'Qril, yarımfabrikatlar, marinadlar', value_en: 'Grill, fresh meats, marinades', value: 'Grill, fresh meats, marinades' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '18 мес.', value_az: '18 ay', value_en: '18 mo.', value: '18 mo.' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Avangard', value_az: 'Avangard', value_en: 'Avangard', value: 'Avangard' }
        ],
        specs_structured: {
            dosage:        { az: '8–12 q/kq', ru: '8–12 г/кг', en: '8–12 g/kg' },
            flavorProfile: { az: 'Qril və ədviyyatlar', ru: 'Гриль и пряности', en: 'Grill & spices' },
            application:   { az: 'Qril, marinadlar', ru: 'Гриль, маринады', en: 'Grill, marinades' },
            shelfLife:     { az: '18 ay', ru: '18 мес.', en: '18 mo.' }
        }
    },
    {
        id: 'prod-27',
        title_ru: 'Оболочка Диплекс-Мини',
        title_az: 'Diplex-Mini qabığı',
        title_en: 'Diplex-Mini Sausage Casing',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-DIPLEX-MINI',
        image: 'images/products/dipleks-12.jpg',
        description_ru: 'Оболочка с динамической проницаемостью для сосисок, сарделек и шпикачек малых калибров.',
        description_az: 'Kiçik kalibrli sosiska, sardelka və şpikadön üçün dinamik keçiricilikli qabıq.',
        description_en: 'Dynamic permeability casing for frankfurters, wieners, and knackwurst of small calibers.',
        specs: [
            {
                key_ru: 'Дымопроницаемость',
                key_az: 'Tüstükeçiricilik',
                key_en: 'Smoke Permeability',
                value_ru: 'Динамическая',
                value_az: 'Dinamik (hisəvermə zamanı yüksək)',
                value_en: 'Dynamic (high during smoking)',
                value: 'Dynamic (high during smoking)'
            },
            {
                key_ru: 'Термоусадка',
                key_az: 'Termoyığılma',
                key_en: 'Thermal Shrinkage',
                value_ru: 'Высокая',
                value_az: 'Yüksək',
                value_en: 'High',
                value: 'High'
            },
            {
                key_ru: 'Макс. переполнение',
                key_az: 'Maks. doldurma',
                key_en: 'Max. Overstuffing',
                value_ru: '8–10%',
                value_az: '8–10%',
                value_en: '8–10%',
                value: '8–10%'
            },
            {
                key_ru: 'Срок годности гот. продукта',
                key_az: 'Hazır məhsulun saxlama müddəti',
                key_en: 'Finished Product Shelf Life',
                value_ru: 'до 45 суток',
                value_az: '45 günədək',
                value_en: 'up to 45 days',
                value: 'up to 45 days'
            },
            {
                key_ru: 'Замачивание',
                key_az: 'İslatma',
                key_en: 'Soaking',
                value_ru: 'Не требует замачивания',
                value_az: 'İslatma tələb olunmur',
                value_en: 'No soaking required',
                value: 'No soaking required'
            },
            {
                key_ru: 'Ключ. преимущество',
                key_az: 'Əsas üstünlük',
                key_en: 'Key Benefit',
                value_ru: 'Идеальна для сосисочных линий',
                value_az: 'Sosiska xətləri üçün idealdır',
                value_en: 'Ideal for frankfurter lines',
                value: 'Ideal for frankfurter lines'
            },
            {
                key_ru: 'Микроб. стойкость',
                key_az: 'Mikrobioloji davamlılıq',
                key_en: 'Microbial Resistance',
                value_ru: 'Высокая',
                value_az: 'Yüksək',
                value_en: 'High',
                value: 'High'
            }
        ],
        specs_structured: {
            smokePermeability: { az: 'Dinamik', ru: 'Динамическая', en: 'Dynamic' },
            overstuffing:      { az: '8 — 10%', ru: '8 — 10%', en: '8 — 10%' },
            shelfLife:         { az: '45 günədək', ru: 'до 45 суток', en: 'up to 45 days' }
        }
    },
    {
        id: 'prod-28',
        title_ru: 'Оболочка Экстрафлекс',
        title_az: 'Extraflex qabığı',
        title_en: 'Extraflex Sausage Casing',
        partner: 'Atlantis-Pak',
        category: 'casings',
        category_ru: 'Колбасные оболочки',
        category_az: 'Kolbasa qabıqları',
        category_en: 'Sausage Casings',
        artikul: 'AP-EXTRAFLEX',
        image: 'images/products/dipleks-12.jpg',
        description_ru: 'Пятислойная барьерная колбасная оболочка с повышенной эластичностью и механической прочностью.',
        description_az: 'Artırılmış elastiklik və mexaniki möhkəmliyə malik beşqatlı baryer kolbasa qabığı.',
        description_en: 'Five-layer barrier sausage casing with enhanced elasticity and mechanical strength.',
        specs: [
            {
                key_ru: 'Дымопроницаемость',
                key_az: 'Tüstükeçiricilik',
                key_en: 'Smoke Permeability',
                value_ru: 'Нулевая (Барьерная)',
                value_az: 'Sıfır (Baryer)',
                value_en: 'Zero (Barrier)',
                value: 'Zero (Barrier)'
            },
            {
                key_ru: 'Термоусадка',
                key_az: 'Termoyığılma',
                key_en: 'Thermal Shrinkage',
                value_ru: '12–15%',
                value_az: '12–15%',
                value_en: '12–15%',
                value: '12–15%'
            },
            {
                key_ru: 'Макс. переполнение',
                key_az: 'Maks. doldurma',
                key_en: 'Max. Overstuffing',
                value_ru: '10–15%',
                value_az: '10–15%',
                value_en: '10–15%',
                value: '10–15%'
            },
            {
                key_ru: 'Срок годности гот. продукта',
                key_az: 'Hazır məhsulun saxlama müddəti',
                key_en: 'Finished Product Shelf Life',
                value_ru: 'до 90 суток',
                value_az: '90 günədək',
                value_en: 'up to 90 days',
                value: 'up to 90 days'
            },
            {
                key_ru: 'Замачивание',
                key_az: 'İslatma',
                key_en: 'Soaking',
                value_ru: '30 мин в воде 20–25°C',
                value_az: '20–25°C suda 30 dəq.',
                value_en: '30 min in water 20–25°C',
                value: '30 min in water 20–25°C'
            },
            {
                key_ru: 'Ключ. преимущество',
                key_az: 'Əsas üstünlük',
                key_en: 'Key Benefit',
                value_ru: 'Максимальная эластичность',
                value_az: 'Maksimal elastiklik',
                value_en: 'Maximum elasticity',
                value: 'Maximum elasticity'
            },
            {
                key_ru: 'Микроб. стойкость',
                key_az: 'Mikrobioloji davamlılıq',
                key_en: 'Microbial Resistance',
                value_ru: 'Максимальная',
                value_az: 'Maksimal',
                value_en: 'Maximum',
                value: 'Maximum'
            }
        ],
        specs_structured: {
            smokePermeability: { az: 'Sıfır (Baryer)', ru: 'Нулевая (Барьерная)', en: 'Zero (Barrier)' },
            overstuffing:      { az: '10 — 15%', ru: '10 — 15%', en: '10 — 15%' },
            shelfLife:         { az: '90 günədək', ru: 'до 90 суток', en: 'up to 90 days' }
        }
    },
    {
        id: 'prod-29',
        title_ru: 'Консервант Avangard',
        title_az: 'Avangard Konservantı',
        title_en: 'Avangard Preservative',
        partner: 'Avangard',
        category: 'additives',
        category_ru: 'Комплексные смеси и добавки',
        category_az: 'Kompleks qarışıqlar və əlavələr',
        category_en: 'Complex Blends & Additives',
        artikul: 'AVG-KONS-03',
        image: 'images/partners/avangard.jpg',
        description_ru: 'Пищевая добавка для увеличения сроков годности готовой мясной продукции и подавления роста нежелательной микрофлоры.',
        description_az: 'Hazır ət məhsullarının saxlama müddətini artırmaq və arzuolunmaz mikrofloranın inkişafını dayandırmaq üçün qida əlavəsi.',
        description_en: 'Food additive designed to extend the shelf life of finished meat products and suppress undesirable microflora growth.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '2–3 г/кг', value_az: '2–3 q/kq', value_en: '2–3 g/kg', value: '2–3 g/kg' },
            { key_ru: 'Назначение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Вареные и полукопченые колбасы', value_az: 'Bişmiş və yarımhissə verilmiş kolbasalar', value_en: 'Cooked & semi-smoked sausages', value: 'Cooked & semi-smoked sausages' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '24 мес.', value_az: '24 ay', value_en: '24 mo.', value: '24 mo.' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Avangard', value_az: 'Avangard', value_en: 'Avangard', value: 'Avangard' }
        ],
        specs_structured: {
            dosage:      { az: '2–3 q/kq', ru: '2–3 г/кг', en: '2–3 g/kg' },
            application: { az: 'Bişmiş və yarımhissə verilmiş kolbasalar', ru: 'Вареные и полукопченые колбасы', en: 'Cooked & semi-smoked sausages' },
            shelfLife:   { az: '24 ay', ru: '24 мес.', en: '24 mo.' }
        }
    },
    {
        id: 'prod-30',
        title_ru: 'Эмульгатор Avangard',
        title_az: 'Avangard Emulqatoru',
        title_en: 'Avangard Emulsifier',
        partner: 'Avangard',
        category: 'additives',
        category_ru: 'Комплексные смеси и добавки',
        category_az: 'Kompleks qarışıqlar və əlavələr',
        category_en: 'Complex Blends & Additives',
        artikul: 'AVG-EMUL-04',
        image: 'images/partners/avangard.jpg',
        description_ru: 'Стабилизирует фаршевую эмульсию, надежно связывает жир и влагу, предотвращает образование бульонно-жировых отеков.',
        description_az: 'Farş emulsiyasını stabilləşdirir, yağ və nəmliyi möhkəm bağlayır, bulyon və yağ axıntılarının qarşısını alır.',
        description_en: 'Stabilizes meat emulsion, reliably binds fat and moisture, and prevents broth-fat pocket formation.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '3–5 г/кг', value_az: '3–5 q/kq', value_en: '3–5 g/kg', value: '3–5 g/kg' },
            { key_ru: 'Назначение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Вареные колбасы, сосиски, паштеты', value_az: 'Bişmiş kolbasalar, sosiskalar, paştetlər', value_en: 'Cooked sausages, frankfurters, pâtés', value: 'Cooked sausages, frankfurters, pâtés' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '24 мес.', value_az: '24 ay', value_en: '24 mo.', value: '24 mo.' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Avangard', value_az: 'Avangard', value_en: 'Avangard', value: 'Avangard' }
        ],
        specs_structured: {
            dosage:      { az: '3–5 q/kq', ru: '3–5 г/кг', en: '3–5 g/kg' },
            application: { az: 'Bişmiş kolbasalar, sosiskalar, paştetlər', ru: 'Вареные колбасы, сосиски, паштеты', en: 'Cooked sausages, frankfurters, pâtés' },
            shelfLife:   { az: '24 ay', ru: '24 мес.', en: '24 mo.' }
        }
    },
    {
        id: 'prod-31',
        title_ru: 'Молочный белок',
        title_az: 'Süd zülalı',
        title_en: 'Milk Protein',
        partner: 'Avangard',
        category: 'additives',
        category_ru: 'Комплексные смеси и добавки',
        category_az: 'Kompleks qarışıqlar və əlavələr',
        category_en: 'Complex Blends & Additives',
        artikul: 'AVG-MILKPROT-05',
        image: 'images/partners/avangard.jpg',
        description_ru: 'Высокофункциональный молочный белок. Улучшает структуру, кусаемость готового продукта и повышает выход.',
        description_az: 'Yüksək funksional süd zülalı. Hazır məhsulun strukturunu, dişləməsini yaxşılaşdırır və çıxımı artırır.',
        description_en: 'High-functional milk protein improving texture, bite, and yield of finished meat products.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '10–15 г/кг', value_az: '10–15 q/kq', value_en: '10–15 g/kg', value: '10–15 g/kg' },
            { key_ru: 'Назначение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Вареные колбасы, ветчины', value_az: 'Bişmiş kolbasalar, vetçinalar', value_en: 'Cooked sausages, hams', value: 'Cooked sausages, hams' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '24 мес.', value_az: '24 ay', value_en: '24 mo.', value: '24 mo.' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Avangard', value_az: 'Avangard', value_en: 'Avangard', value: 'Avangard' }
        ],
        specs_structured: {
            dosage:      { az: '10–15 q/kq', ru: '10–15 г/кг', en: '10–15 g/kg' },
            application: { az: 'Bişmiş kolbasalar, vetçinalar', ru: 'Вареные колбасы, ветчины', en: 'Cooked sausages, hams' },
            shelfLife:   { az: '24 ay', ru: '24 мес.', en: '24 mo.' }
        }
    },
    {
        id: 'prod-32',
        title_ru: 'МДМ Маскиратор',
        title_az: 'MDM Maskiratoru',
        title_en: 'MDM Masking Flavor',
        partner: 'Avangard',
        category: 'additives',
        category_ru: 'Комплексные смеси и добавки',
        category_az: 'Kompleks qarışıqlar və əlavələr',
        category_en: 'Complex Blends & Additives',
        artikul: 'AVG-MDMMASK-06',
        image: 'images/partners/avangard.jpg',
        description_ru: 'Эффективно нейтрализует посторонние запахи и привкусы при использовании мяса механической обвалки (МДМ) и субпродуктов.',
        description_az: 'Mexaniki sümüksüzləşdirilmiş ət (MDM) və sakatat istifadəsi zamanı kənar qoxu və tamları effektiv şəkildə neytrallaşdırır.',
        description_en: 'Effectively neutralizes off-flavors and odors when using mechanically deboned meat (MDM) and offal.',
        specs: [
            { key_ru: 'Дозировка', key_az: 'Dozalanma', key_en: 'Dosage', value_ru: '2–4 г/кг', value_az: '2–4 q/kq', value_en: '2–4 g/kg', value: '2–4 g/kg' },
            { key_ru: 'Назначение', key_az: 'Təyinatı', key_en: 'Application', value_ru: 'Изделия с использованием МДМ', value_az: 'MDM istifadə olunan məhsullar', value_en: 'MDM-based meat products', value: 'MDM-based meat products' },
            { key_ru: 'Срок годности', key_az: 'Saxlama müddəti', key_en: 'Shelf Life', value_ru: '18 мес.', value_az: '18 ay', value_en: '18 mo.', value: '18 mo.' },
            { key_ru: 'Производитель', key_az: 'İstehsalçı', key_en: 'Manufacturer', value_ru: 'Avangard', value_az: 'Avangard', value_en: 'Avangard', value: 'Avangard' }
        ],
        specs_structured: {
            dosage:      { az: '2–4 q/kq', ru: '2–4 г/кг', en: '2–4 g/kg' },
            application: { az: 'MDM istifadə olunan məhsullar', ru: 'Изделия с использованием МДМ', en: 'MDM-based meat products' },
            shelfLife:   { az: '18 ay', ru: '18 мес.', en: '18 mo.' }
        }
    }
];

// Initial Global Settings Seed Data (AZ, RU, EN)
const INITIAL_SETTINGS = {
    phone: '+994 55 327-76-55',
    phone_clean: '+994553277655',
    email: 'info@casaratoglu.az',
    address_ru: 'Азербайджан, Баку, Белый город / Хатаинский район',
    address_az: 'Azərbaycan, Bakı şəhəri, Ağ Şəhər / Xətai rayonu',
    address_en: 'Azerbaijan, Baku, White City / Khatai district',
    working_hours_ru: 'Пн-Пт: 09:30 - 18:30, Сб: 09:30 - 14:00',
    working_hours_az: 'B.e - Cümə: 09:30 - 18:30, Şənbə: 09:30 - 14:00',
    working_hours_en: 'Mon - Fri: 09:30 - 18:30, Sat: 09:30 - 14:00',
    whatsapp: 'https://wa.me/994553277655',
    admin_password_hash: 'admin123'
};

/**
 * Data API Manager for LocalStorage and In-Memory Fallback
 */
class DataStore {
    constructor() {
        this.init();
    }

    init() {
        // Only seed localStorage if keys do not already exist
        if (!localStorage.getItem(STORAGE_KEYS.PARTNERS)) {
            localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(INITIAL_PARTNERS));
        }

        if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
        }

        if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
            localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
        }

        if (!localStorage.getItem(STORAGE_KEYS.NEWS)) {
            localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
        }

        if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
        }
    }

    getCategories() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
            if (stored) return JSON.parse(stored);
            localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
            return JSON.parse(JSON.stringify(INITIAL_CATEGORIES));
        } catch(e) {
            return INITIAL_CATEGORIES;
        }
    }

    getCategoryById(id) {
        if (!id) return null;
        const targetId = String(id).trim().toLowerCase();
        return this.getCategories().find(c => String(c.id).trim().toLowerCase() === targetId);
    }

    saveCategory(category) {
        let categories = this.getCategories();
        if (!category.id) {
            const base = (category.title_az || category.title_ru || category.title_en || 'cat');
            category.id = 'cat-' + base.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        }
        const targetId = String(category.id).trim();
        category.id = targetId;

        const idx = categories.findIndex(c => String(c.id).trim().toLowerCase() === targetId.toLowerCase());
        if (idx >= 0) {
            categories[idx] = { ...categories[idx], ...category, id: targetId };
        } else {
            categories.push(category);
        }
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
        return category;
    }

    deleteCategory(id) {
        if (!id) return;
        const targetId = String(id).trim().toLowerCase();
        let categories = this.getCategories();
        categories = categories.filter(c => String(c.id).trim().toLowerCase() !== targetId);
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));

        // Automatically delete all products belonging to this deleted category
        try {
            let products = this.getProducts();
            const initialCount = products.length;
            products = products.filter(p => {
                const pCat = String(p.category || p.category_id || '').trim().toLowerCase();
                return pCat !== targetId;
            });
            if (products.length !== initialCount) {
                localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
            }
        } catch(e) {
            console.error('Error deleting products of category:', e);
        }
    }

    getProducts() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
            let products = stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
            
            // Normalize any legacy/test category discrepancies in stored data
            let modified = false;
            products = products.map(p => {
                const partnerName = (p.partner || '').toLowerCase();
                // Atlantis-Pak belongs strictly to casings (casings and shrink bags)
                if (partnerName.includes('atlantis') && p.category === 'packaging') {
                    p.category = 'casings';
                    p.category_ru = 'Колбасные оболочки и термоусадочные пакеты';
                    modified = true;
                }
                return p;
            });

            if (modified && stored) {
                localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
            } else if (!stored) {
                localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
            }

            return products;
        } catch(e) {
            return INITIAL_PRODUCTS;
        }
    }

    getProductById(id) {
        return this.getProducts().find(p => p.id === id);
    }

    saveProduct(product) {
        let products = this.getProducts();
        if (!product.id) {
            product.id = 'prod-' + Date.now();
        }
        const targetId = String(product.id).trim();
        const idx = products.findIndex(p => String(p.id).trim() === targetId);
        if (idx >= 0) {
            products[idx] = { ...products[idx], ...product, id: targetId };
        } else {
            products.unshift(product);
        }
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        return product;
    }

    deleteProduct(id) {
        let products = this.getProducts();
        const targetId = String(id).trim();
        products = products.filter(p => String(p.id).trim() !== targetId);
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }

    getPartners() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.PARTNERS);
            if (stored) return JSON.parse(stored);
            localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(INITIAL_PARTNERS));
            return JSON.parse(JSON.stringify(INITIAL_PARTNERS));
        } catch(e) {
            return INITIAL_PARTNERS;
        }
    }

    getPartnerById(id) {
        const targetId = String(id).trim();
        return this.getPartners().find(p => String(p.id).trim() === targetId);
    }

    savePartner(partner) {
        let partners = this.getPartners();
        if (!partner.id) {
            partner.id = 'partner-' + (partner.name ? partner.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : Date.now());
        }
        const targetId = String(partner.id).trim();
        const idx = partners.findIndex(p => String(p.id).trim() === targetId);
        if (idx >= 0) {
            partners[idx] = { ...partners[idx], ...partner, id: targetId };
        } else {
            partners.push(partner);
        }
        localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners));
        return partner;
    }

    deletePartner(id) {
        let partners = this.getPartners();
        partners = partners.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(partners));
    }

    getNews() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.NEWS);
            if (stored) return JSON.parse(stored);
            localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
            return JSON.parse(JSON.stringify(INITIAL_NEWS));
        } catch(e) {
            return INITIAL_NEWS;
        }
    }

    getNewsById(id) {
        return this.getNews().find(n => n.id === id);
    }

    saveNews(newsItem) {
        const newsList = this.getNews();
        if (!newsItem.id) {
            newsItem.id = 'news-' + Date.now();
        }
        const idx = newsList.findIndex(n => n.id === newsItem.id);
        if (idx >= 0) {
            newsList[idx] = newsItem;
        } else {
            newsList.unshift(newsItem);
        }
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newsList));
        return newsItem;
    }

    deleteNews(id) {
        let newsList = this.getNews();
        newsList = newsList.filter(n => n.id !== id);
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newsList));
    }

    // ==========================================
    // Team Members CRUD Management
    // ==========================================
    getTeam() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.TEAM);
            let team = stored ? JSON.parse(stored) : INITIAL_TEAM;
            if (!Array.isArray(team) || team.length === 0) {
                team = INITIAL_TEAM;
            }
            // Auto-clean any duplicates that may have accumulated in localStorage by id or name
            const seenIds = new Set();
            const uniqueTeam = [];
            for (const m of team) {
                if (!m || !m.id) continue;
                const cleanId = String(m.id).trim();
                if (!seenIds.has(cleanId)) {
                    seenIds.add(cleanId);
                    uniqueTeam.push(m);
                }
            }
            if (uniqueTeam.length !== team.length) {
                localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(uniqueTeam));
            }
            return uniqueTeam;
        } catch(e) {
            return INITIAL_TEAM;
        }
    }

    getTeamById(id) {
        if (!id) return null;
        const cleanId = String(id).trim();
        return this.getTeam().find(m => String(m.id).trim() === cleanId);
    }

    saveTeamMember(member) {
        if (!member) return null;
        let team = this.getTeam();
        
        const memberIdStr = member.id ? String(member.id).trim() : '';

        if (memberIdStr) {
            // Updating an existing member: find existing index
            const idx = team.findIndex(m => String(m.id).trim() === memberIdStr);
            if (idx >= 0) {
                // Mutate and replace the existing member cleanly at the exact index
                team[idx] = {
                    ...team[idx],
                    ...member,
                    id: memberIdStr
                };
            } else {
                // ID was given but not found in list (fallback)
                team.push({ ...member, id: memberIdStr });
            }
        } else {
            // Genuinely new member without any ID
            const newId = 'team-' + Date.now();
            team.push({ ...member, id: newId });
            member.id = newId;
        }

        localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
        return member;
    }

    deleteTeamMember(id) {
        if (!id) return;
        const cleanId = String(id).trim();
        let team = this.getTeam();
        team = team.filter(m => String(m.id).trim() !== cleanId);
        localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
    }

    // ==========================================
    // Team Departments CRUD
    // ==========================================
    getDepartments() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.DEPARTMENTS);
            if (stored) return JSON.parse(stored);
            localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(INITIAL_DEPARTMENTS));
            return JSON.parse(JSON.stringify(INITIAL_DEPARTMENTS));
        } catch(e) {
            return INITIAL_DEPARTMENTS;
        }
    }

    saveDepartment(department) {
        const departments = this.getDepartments();
        if (!department.id) {
            department.id = 'dep-' + Date.now();
        }
        const idx = departments.findIndex(d => d.id === department.id);
        if (idx >= 0) {
            departments[idx] = department;
        } else {
            departments.push(department);
        }
        localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departments));
        return department;
    }

    deleteDepartment(id) {
        let departments = this.getDepartments();
        departments = departments.filter(d => d.id !== id);
        localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departments));
    }

    // ==========================================
    // About Page Texts CRUD
    // ==========================================
    getAbout() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.ABOUT);
            if (stored) return { ...INITIAL_ABOUT, ...JSON.parse(stored) };
            localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(INITIAL_ABOUT));
            return JSON.parse(JSON.stringify(INITIAL_ABOUT));
        } catch(e) {
            return INITIAL_ABOUT;
        }
    }

    saveAbout(aboutData) {
        const current = this.getAbout();
        const updated = { ...current, ...aboutData };
        localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(updated));
        return updated;
    }

    getSettings() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
            if (stored) return JSON.parse(stored);
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
            return JSON.parse(JSON.stringify(INITIAL_SETTINGS));
        } catch(e) {
            return INITIAL_SETTINGS;
        }
    }

    saveSettings(settings) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }

    resetToDefaults() {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
        localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(INITIAL_PARTNERS));
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(INITIAL_NEWS));
        localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(INITIAL_TEAM));
        localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(INITIAL_DEPARTMENTS));
        localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(INITIAL_ABOUT));
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    }

    exportBackup() {
        return JSON.stringify({
            products: this.getProducts(),
            partners: this.getPartners(),
            categories: this.getCategories(),
            news: this.getNews(),
            team: this.getTeam(),
            departments: this.getDepartments(),
            about: this.getAbout(),
            settings: this.getSettings(),
            exportedAt: new Date().toISOString()
        }, null, 2);
    }

    importBackup(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data.products) localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data.products));
            if (data.partners) localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(data.partners));
            if (data.categories) localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data.categories));
            if (data.news) localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(data.news));
            if (data.team) localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(data.team));
            if (data.departments) localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(data.departments));
            if (data.about) localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(data.about));
            if (data.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
            return true;
        } catch(e) {
            console.error('Import error:', e);
            return false;
        }
    }
}

if (typeof window !== 'undefined') {
    window.dataStore = new DataStore();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataStore;
}
