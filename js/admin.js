/**
 * Cəsarətoğlu MMC — Admin Panel Controller (Enterprise Edition)
 * Handles authentication, multilingual tabs, Smart AI Auto-Translation,
 * and full CRUD operations for Partners (Brands) and Catalog Products.
 */

class AdminApp {
    constructor() {
        this.currentTab = 'dashboard';
        this.currentModalLang = 'az';
        this.editingProductId = null;
        this.editingPartnerId = null;
        this.editingNewsId = null;

        // Specialized Food & Meat Processing Dictionary for Smart Translation
        this.dictionary = {
            ruToAz: {
                'консервант': 'konservant',
                'перец': 'istiot (bibər)',
                'чили': 'çili',
                'грубого помола': 'qaba üyüdülmüş',
                'мелкого помола': 'incə üyüdülmüş',
                'колбаса': 'kolbasa',
                'колбасы': 'kolbasalar',
                'вареных колбас': 'bişmiş kolbasalar',
                'вареные колбасы': 'bişmiş kolbasalar',
                'полукопченых': 'yarıhisəverilmiş',
                'сырокопченых': 'çiy hisəverilmiş',
                'сосисок': 'sosislər',
                'сосиски': 'sosislər',
                'сарделек': 'sardelkalar',
                'паштетов': 'paştetlər',
                'пищевая добавка': 'qida əlavəsi',
                'для увеличения сроков годности': 'saxlama müddətinin artırılması üçün',
                'подавления роста микрофлоры': 'mikrofloranın inkişafının qarşısının alınması üçün',
                'мясной продукции': 'ət məhsulları',
                'мясная продукция': 'ət məhsulları',
                'дозировка': 'dozalanma',
                'г/кг': 'q/kq',
                'кг': 'kq',
                'для': 'üçün',
                'всех видов': 'bütün növləri',
                'мясопереработки': 'ət emalı',
                'натуральные экстракты': 'təbii ekstraktlar',
                'комплексная смесь': 'kompleks qarışıq',
                'оболочка': 'qabıq',
                'полиамидная': 'poliamid',
                'пленка': 'plyonka',
                'барьерная': 'baryer',
                'вакуумная': 'vakuum',
                'термоусадочные пакеты': 'termo-yığılan paketlər',
                'срок годности': 'saxlama müddəti',
                'месяцев': 'ay',
                'хранение': 'saxlama',
                'официальный дистрибьютор': 'Rəsmi distribyutor',
                'производитель': 'İstehsalçı',
                'мировой лидер': 'Dünya lideri',
                'высокое качество': 'Yüksək keyfiyyət',
                'европейские стандарты': 'Avropa standartları',
                'надежный партнер': 'etibarlı tərəfdaş',
                'премиальные специи': 'premium ədviyyatlar',
                'ингредиенты': 'inqrediyentlər'
            },
            ruToEn: {
                'консервант': 'preservative',
                'перец': 'pepper',
                'чили': 'chili',
                'грубого помола': 'coarse ground',
                'мелкого помола': 'fine ground',
                'колбаса': 'sausage',
                'колбасы': 'sausages',
                'вареных колбас': 'cooked sausages',
                'вареные колбасы': 'cooked sausages',
                'полукопченых': 'semi-smoked sausages',
                'сырокопченых': 'dry-cured sausages',
                'сосисок': 'frankfurters / wieners',
                'сосиски': 'frankfurters',
                'сарделек': 'bologna sausages',
                'паштетов': 'pâtés',
                'пищевая добавка': 'food additive',
                'для увеличения сроков годности': 'to extend shelf life',
                'подавления роста микрофлоры': 'inhibiting unwanted microflora',
                'мясной продукции': 'meat products',
                'мясная продукция': 'meat products',
                'дозировка': 'dosage',
                'г/кг': 'g/kg',
                'кг': 'kg',
                'для': 'for',
                'всех видов': 'all types of',
                'мясопереработки': 'meat processing',
                'натуральные экстракты': 'natural extracts',
                'комплексная смесь': 'complex blend',
                'оболочка': 'casing',
                'полиамидная': 'polyamide',
                'пленка': 'film',
                'барьерная': 'barrier',
                'вакуумная': 'vacuum',
                'термоусадочные пакеты': 'shrink bags',
                'срок годности': 'shelf life',
                'месяцев': 'months',
                'хранение': 'storage',
                'официальный дистрибьютор': 'Official distributor',
                'производитель': 'Manufacturer',
                'мировой лидер': 'Global leader',
                'высокое качество': 'High quality',
                'европейские стандарты': 'European quality standards',
                'надежный партнер': 'reliable partner',
                'премиальные специи': 'premium spices',
                'ингредиенты': 'ingredients'
            },
            azToRu: {
                'konservant': 'консервант',
                'istiot': 'перец',
                'bibər': 'перец',
                'çili': 'чили',
                'qaba üyüdülmüş': 'грубого помола',
                'incə üyüdülmüş': 'мелкого помола',
                'kolbasa': 'колбаса',
                'kolbasalar': 'колбасы',
                'bişmiş kolbasalar': 'вареные колбасы',
                'yarıhisəverilmiş': 'полукопченые',
                'çiy hisəverilmiş': 'сырокопченые',
                'sosislər': 'сосиски',
                'sardelkalar': 'сардельки',
                'paştetlər': 'паштеты',
                'qida əlavəsi': 'пищевая добавка',
                'saxlama müddəti': 'срок годности',
                'ət məhsulları': 'мясная продукция',
                'dozalanma': 'дозировка',
                'q/kq': 'г/кг',
                'kq': 'кг',
                'üçün': 'для',
                'bütün növləri': 'всех видов',
                'ət emalı': 'мясопереработка',
                'təbii ekstraktlar': 'натуральные экстракты',
                'kompleks qarışıq': 'комплексная смесь',
                'qabıq': 'оболочка',
                'poliamid': 'полиамидная',
                'plyonka': 'пленка',
                'baryer': 'барьерная',
                'vakuum': 'вакуумная',
                'termo-yığılan paketlər': 'термоусадочные пакеты',
                'ay': 'месяцев',
                'saxlama': 'хранение',
                'rəsmi distribyutor': 'Официальный дистрибьютор',
                'istehsalçı': 'Производитель',
                'dünya lideri': 'Мировой лидер',
                'yüksək keyfiyyət': 'Высокое качество',
                'avropa standartları': 'Европейские стандарты',
                'etibarlı tərəfdaş': 'надежный партнер',
                'premium ədviyyatlar': 'премиальные специи',
                'inqrediyentlər': 'ингредиенты'
            },
            enToRu: {
                'preservative': 'консервант',
                'pepper': 'перец',
                'chili': 'чили',
                'coarse ground': 'грубого помола',
                'fine ground': 'мелкого помола',
                'sausage': 'колбаса',
                'sausages': 'колбасы',
                'cooked sausages': 'вареные колбасы',
                'semi-smoked sausages': 'полукопченые колбасы',
                'dry-cured sausages': 'сырокопченые колбасы',
                'frankfurters': 'сосиски',
                'wieners': 'сосиски',
                'bologna sausages': 'сардельки',
                'pâtés': 'паштеты',
                'food additive': 'пищевая добавка',
                'shelf life': 'срок годности',
                'meat products': 'мясная продукция',
                'dosage': 'дозировка',
                'g/kg': 'г/кг',
                'kg': 'кг',
                'for': 'для',
                'all types of': 'всех видов',
                'meat processing': 'мясопереработка',
                'natural extracts': 'натуральные экстракты',
                'complex blend': 'комплексная смесь',
                'casing': 'оболочка',
                'polyamide': 'полиамидная',
                'film': 'пленка',
                'barrier': 'барьерная',
                'vacuum': 'вакуумная',
                'shrink bags': 'термоусадочные пакеты',
                'months': 'месяцев',
                'storage': 'хранение',
                'official distributor': 'Официальный дистрибьютор',
                'manufacturer': 'Производитель',
                'global leader': 'Мировой лидер',
                'high quality': 'Высокое качество',
                'european quality standards': 'Европейские стандарты качества',
                'reliable partner': 'надежный партнер',
                'premium spices': 'премиальные специи',
                'ingredients': 'ингредиенты'
            }
        };
    }

    init() {
        this.checkAuth();
        this.bindEvents();
        this.bindMultilingualTabs();
        this.populatePartnersDropdown();
        this.populateCategoriesDropdown();
        this.renderAll();

        // Restore active tab from URL hash or localStorage on F5 / reload
        let initialTab = 'dashboard';
        const hash = (window.location.hash || '').replace(/^#tab-|^#/, '').trim();
        if (hash && document.getElementById(`tab-${hash}`)) {
            initialTab = hash;
        } else {
            const savedTab = localStorage.getItem('cesaretoglu_admin_tab');
            if (savedTab && document.getElementById(`tab-${savedTab}`)) {
                initialTab = savedTab;
            }
        }
        this.switchTab(initialTab, false);
    }

    // ==========================================
    // Authentication
    // ==========================================
    checkAuth() {
        const isAuth = localStorage.getItem('cesaretoglu_admin_logged') === 'true' || 
                       sessionStorage.getItem('cesaretoglu_admin_logged') === 'true';
        const loginScreen = document.getElementById('admin-login-screen');
        const dashLayout = document.getElementById('admin-dashboard-layout');

        if (isAuth) {
            if (loginScreen) loginScreen.style.display = 'none';
            if (dashLayout) dashLayout.style.display = 'flex';
        } else {
            if (loginScreen) loginScreen.style.display = 'flex';
            if (dashLayout) dashLayout.style.display = 'none';
        }
    }

    login(password) {
        const pass = (password || '').trim();
        const settings = window.dataStore ? window.dataStore.getSettings() : {};
        const validPass = settings.admin_password_hash || 'admin123';

        if (pass === validPass) {
            localStorage.setItem('cesaretoglu_admin_logged', 'true');
            sessionStorage.setItem('cesaretoglu_admin_logged', 'true');
            this.checkAuth();
            this.renderAll();
            this.showToast('Вход выполнен!', 'success');
        } else {
            alert('Неверный пароль администратора! Если вы меняли пароль в настройках, введите актуальный пароль.');
        }
    }

    logout() {
        localStorage.removeItem('cesaretoglu_admin_logged');
        sessionStorage.removeItem('cesaretoglu_admin_logged');
        this.checkAuth();
        this.showToast('Вы вышли из системы', 'info');
    }

    // ==========================================
    // Event Bindings
    // ==========================================
    bindEvents() {
        // Login Form
        const loginForm = document.getElementById('admin-login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const passInput = document.getElementById('admin-login-password');
                if (passInput) this.login(passInput.value);
            });
        }

        // Logout Buttons
        document.querySelectorAll('.admin-logout-btn').forEach(btn => {
            btn.addEventListener('click', () => this.logout());
        });

        // Sidebar Navigation Tabs
        document.querySelectorAll('.sidebar-nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.dataset.tab;
                if (target) this.switchTab(target);
            });
        });

        // Search in Products Table
        const prodSearch = document.getElementById('adm-prod-search');
        if (prodSearch) {
            prodSearch.addEventListener('input', () => this.renderProductsTable());
        }

        // Image file upload previews for Modals
        this.bindImageUpload('prod-file-input', 'prod-image-url', 'prod-img-preview');
        this.bindImageUpload('partner-file-input', 'partner-logo-url', 'partner-logo-preview');
        this.bindImageUpload('partner-banner-file-input', 'partner-banner-url', 'partner-banner-preview');
        this.bindImageUpload('news-file-input', 'news-image-url', 'news-img-preview');
        this.bindImageUpload('team-file-input', 'team-image-url', 'team-img-preview');

        // Form Submit Handlers
        const prodForm = document.getElementById('form-product-edit');
        if (prodForm) {
            prodForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProductForm();
            });
        }

        const partnerForm = document.getElementById('form-partner-edit');
        if (partnerForm) {
            partnerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.savePartnerForm();
            });
        }

        const newsForm = document.getElementById('form-news-edit');
        if (newsForm) {
            newsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveNewsForm();
            });
        }

        const teamForm = document.getElementById('form-team-edit');
        if (teamForm) {
            teamForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveTeamForm();
            });
        }

        const settingsForm = document.getElementById('form-settings-edit');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveSettingsForm();
            });
        }

        // Auto-Translate Buttons
        const autoTranslateProdBtn = document.getElementById('btn-auto-translate-prod');
        if (autoTranslateProdBtn) {
            autoTranslateProdBtn.addEventListener('click', () => this.autoTranslateProduct());
        }

        const autoTranslatePartBtn = document.getElementById('btn-auto-translate-part');
        if (autoTranslatePartBtn) {
            autoTranslatePartBtn.addEventListener('click', () => this.autoTranslatePartner());
        }

        const autoTranslateTeamBtn = document.getElementById('btn-auto-translate-team');
        if (autoTranslateTeamBtn) {
            autoTranslateTeamBtn.addEventListener('click', () => this.autoTranslateTeam());
        }

        // Close custom category & department dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#custom-cat-dropdown-container')) {
                this.closeCategoryDropdown();
            }
            if (!e.target.closest('#custom-dep-dropdown-container')) {
                this.closeDepartmentDropdown();
            }
        });

        // Browser Back / Forward hash navigation
        window.addEventListener('hashchange', () => {
            const h = (window.location.hash || '').replace(/^#tab-|^#/, '').trim();
            if (h && document.getElementById(`tab-${h}`) && h !== this.currentTab) {
                this.switchTab(h, false);
            }
        });
    }

    // ==========================================
    // Simultaneous Multilingual Live Highlights & Status Badges
    // ==========================================
    bindMultilingualTabs() {
        // Live input tracking to update border highlights and badges
        document.querySelectorAll('.prod-track-input, .part-track-input, .news-track-input, .team-track-input, .about-track-input').forEach(input => {
            input.addEventListener('input', () => this.updateFieldHighlights());
            input.addEventListener('blur', () => this.updateFieldHighlights());
        });
    }

    updateFieldHighlights() {
        // Track Product fields
        document.querySelectorAll('.prod-track-input').forEach(input => {
            const hasVal = input.value.trim().length > 0;
            if (hasVal) {
                input.classList.add('input-has-value');
                input.classList.remove('input-is-empty');
            } else {
                input.classList.remove('input-has-value');
                input.classList.add('input-is-empty');
            }
        });

        // Track Partner fields
        document.querySelectorAll('.part-track-input').forEach(input => {
            const hasVal = input.value.trim().length > 0;
            if (hasVal) {
                input.classList.add('input-has-value');
                input.classList.remove('input-is-empty');
            } else {
                input.classList.remove('input-has-value');
                input.classList.add('input-is-empty');
            }
        });

        // Track News fields
        document.querySelectorAll('.news-track-input').forEach(input => {
            const hasVal = input.value.trim().length > 0;
            if (hasVal) {
                input.classList.add('input-has-value');
                input.classList.remove('input-is-empty');
            } else {
                input.classList.remove('input-has-value');
                input.classList.add('input-is-empty');
            }
        });

        // Track Team fields
        document.querySelectorAll('.team-track-input').forEach(input => {
            const hasVal = input.value.trim().length > 0;
            if (hasVal) {
                input.classList.add('input-has-value');
                input.classList.remove('input-is-empty');
            } else {
                input.classList.remove('input-has-value');
                input.classList.add('input-is-empty');
            }
        });

        // Track About fields
        document.querySelectorAll('.about-track-input').forEach(input => {
            const hasVal = input.value.trim().length > 0;
            if (hasVal) {
                input.classList.add('input-has-value');
                input.classList.remove('input-is-empty');
            } else {
                input.classList.remove('input-has-value');
                input.classList.add('input-is-empty');
            }
        });

        // Update Product Card Status Badges
        const prodRuVal = (document.getElementById('prod-title-ru')?.value || '').trim();
        const prodAzVal = (document.getElementById('prod-title-az')?.value || '').trim();
        const prodEnVal = (document.getElementById('prod-title-en')?.value || '').trim();

        const badgeProdRu = document.getElementById('badge-prod-ru');
        const badgeProdAz = document.getElementById('badge-prod-az');
        const badgeProdEn = document.getElementById('badge-prod-en');

        if (badgeProdRu) {
            badgeProdRu.className = prodRuVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeProdRu.textContent = prodRuVal ? '🟢 Заполнено' : '⚪ Пусто';
        }
        if (badgeProdAz) {
            badgeProdAz.className = prodAzVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeProdAz.textContent = prodAzVal ? '🟢 Doldurulub' : '⚪ Boş';
        }
        if (badgeProdEn) {
            badgeProdEn.className = prodEnVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeProdEn.textContent = prodEnVal ? '🟢 Filled' : '⚪ Empty';
        }

        // Update Partner Card Status Badges
        const partRuVal = (document.getElementById('partner-desc-ru')?.value || '').trim();
        const partAzVal = (document.getElementById('partner-desc-az')?.value || '').trim();
        const partEnVal = (document.getElementById('partner-desc-en')?.value || '').trim();

        const badgePartRu = document.getElementById('badge-part-ru');
        const badgePartAz = document.getElementById('badge-part-az');
        const badgePartEn = document.getElementById('badge-part-en');

        if (badgePartRu) {
            badgePartRu.className = partRuVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgePartRu.textContent = partRuVal ? '🟢 Заполнено' : '⚪ Пусто';
        }
        if (badgePartAz) {
            badgePartAz.className = partAzVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgePartAz.textContent = partAzVal ? '🟢 Doldurulub' : '⚪ Boş';
        }
        if (badgePartEn) {
            badgePartEn.className = partEnVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgePartEn.textContent = partEnVal ? '🟢 Filled' : '⚪ Empty';
        }

        // Update News Card Status Badges
        const newsRuVal = (document.getElementById('news-title-ru')?.value || '').trim();
        const newsAzVal = (document.getElementById('news-title-az')?.value || '').trim();
        const newsEnVal = (document.getElementById('news-title-en')?.value || '').trim();

        const badgeNewsRu = document.getElementById('badge-news-ru');
        const badgeNewsAz = document.getElementById('badge-news-az');
        const badgeNewsEn = document.getElementById('badge-news-en');

        if (badgeNewsRu) {
            badgeNewsRu.className = newsRuVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeNewsRu.textContent = newsRuVal ? '🟢 Заполнено' : '⚪ Пусто';
        }
        if (badgeNewsAz) {
            badgeNewsAz.className = newsAzVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeNewsAz.textContent = newsAzVal ? '🟢 Doldurulub' : '⚪ Boş';
        }
        if (badgeNewsEn) {
            badgeNewsEn.className = newsEnVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeNewsEn.textContent = newsEnVal ? '🟢 Filled' : '⚪ Empty';
        }

        // Update Team Card Status Badges
        const teamRuVal = (document.getElementById('team-name-ru')?.value || '').trim();
        const teamAzVal = (document.getElementById('team-name-az')?.value || '').trim();
        const teamEnVal = (document.getElementById('team-name-en')?.value || '').trim();

        const badgeTeamRu = document.getElementById('badge-team-ru');
        const badgeTeamAz = document.getElementById('badge-team-az');
        const badgeTeamEn = document.getElementById('badge-team-en');

        if (badgeTeamRu) {
            badgeTeamRu.className = teamRuVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeTeamRu.textContent = teamRuVal ? '🟢 Заполнено' : '⚪ Пусто';
        }
        if (badgeTeamAz) {
            badgeTeamAz.className = teamAzVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeTeamAz.textContent = teamAzVal ? '🟢 Doldurulub' : '⚪ Boş';
        }
        if (badgeTeamEn) {
            badgeTeamEn.className = teamEnVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeTeamEn.textContent = teamEnVal ? '🟢 Filled' : '⚪ Empty';
        }

        // Update Category Card Status Badges
        const catRuVal = (document.getElementById('cat-title-ru')?.value || '').trim();
        const catAzVal = (document.getElementById('cat-title-az')?.value || '').trim();
        const catEnVal = (document.getElementById('cat-title-en')?.value || '').trim();

        const badgeCatRu = document.getElementById('badge-cat-ru');
        const badgeCatAz = document.getElementById('badge-cat-az');
        const badgeCatEn = document.getElementById('badge-cat-en');

        if (badgeCatRu) {
            badgeCatRu.className = catRuVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeCatRu.textContent = catRuVal ? '🟢 Заполнено' : '⚪ Пусто';
        }
        if (badgeCatAz) {
            badgeCatAz.className = catAzVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeCatAz.textContent = catAzVal ? '🟢 Doldurulub' : '⚪ Boş';
        }
        if (badgeCatEn) {
            badgeCatEn.className = catEnVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeCatEn.textContent = catEnVal ? '🟢 Filled' : '⚪ Empty';
        }

        // Update About Page Status Badges
        const aboutRuVal = (document.getElementById('about-title-ru')?.value || '').trim();
        const aboutAzVal = (document.getElementById('about-title-az')?.value || '').trim();
        const aboutEnVal = (document.getElementById('about-title-en')?.value || '').trim();

        const badgeAboutRu = document.getElementById('badge-about-ru');
        const badgeAboutAz = document.getElementById('badge-about-az');
        const badgeAboutEn = document.getElementById('badge-about-en');

        if (badgeAboutRu) {
            badgeAboutRu.className = aboutRuVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeAboutRu.textContent = aboutRuVal ? '🟢 Заполнено' : '⚪ Пусто';
        }
        if (badgeAboutAz) {
            badgeAboutAz.className = aboutAzVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeAboutAz.textContent = aboutAzVal ? '🟢 Doldurulub' : '⚪ Boş';
        }
        if (badgeAboutEn) {
            badgeAboutEn.className = aboutEnVal ? 'lang-badge-status badge-filled' : 'lang-badge-status badge-empty';
            badgeAboutEn.textContent = aboutEnVal ? '🟢 Filled' : '⚪ Empty';
        }
    }

    // Compatibility aliases
    switchModalLangTab(lang) { this.updateFieldHighlights(); }
    switchPartnerModalLangTab(lang) { this.updateFieldHighlights(); }
    updateTabDots() { this.updateFieldHighlights(); }
    updatePartTabDots() { this.updateFieldHighlights(); }

    // ==========================================
    // Dynamic Partners Dropdown Population
    populatePartnersDropdown() {
        const select = document.getElementById('prod-partner-select');
        if (!select || !window.dataStore) return;
        const partners = window.dataStore.getPartners();
        const currentVal = select.value;
        
        select.innerHTML = partners.map(p => `
            <option value="${p.name}">${p.name} (${p.country})</option>
        `).join('');

        if (currentVal && partners.some(p => p.name === currentVal)) {
            select.value = currentVal;
        }
    }

    populateCategoriesDropdown(selectedId = null) {
        if (!window.dataStore) return;

        const categories = window.dataStore.getCategories();
        const hiddenInput = document.getElementById('prod-category-select');
        const labelEl = document.getElementById('custom-cat-selected-label');
        const itemsList = document.getElementById('custom-cat-items-list');

        let targetVal = selectedId;
        if (!targetVal && hiddenInput) {
            targetVal = hiddenInput.value;
        }
        if (!targetVal || !categories.some(c => c.id === targetVal)) {
            targetVal = categories.length > 0 ? categories[0].id : 'casings';
        }

        if (hiddenInput) {
            hiddenInput.value = targetVal;
        }
        this.lastSelectedCategory = targetVal;

        // Find selected category object and update label
        const selCat = categories.find(c => c.id === targetVal);
        if (labelEl) {
            if (selCat) {
                const titleRu = selCat.title_ru || (selCat.title && selCat.title.ru) || selCat.title_az || selCat.id;
                const titleAz = selCat.title_az || (selCat.title && selCat.title.az) || '';
                labelEl.textContent = titleAz ? `${titleRu} (${titleAz})` : titleRu;
            } else {
                labelEl.textContent = 'Выберите категорию...';
            }
        }

        // Render rows in dropdown list
        if (itemsList) {
            if (categories.length === 0) {
                itemsList.innerHTML = `<div style="padding:0.6rem 0.9rem; color:#94A3B8; font-size:0.85rem;">Категории отсутствуют</div>`;
            } else {
                itemsList.innerHTML = categories.map(c => {
                    const titleRu = c.title_ru || (c.title && c.title.ru) || c.title_az || c.id;
                    const titleAz = c.title_az || (c.title && c.title.az) || '';
                    const displayTitle = titleAz ? `${titleRu} (${titleAz})` : titleRu;
                    const isSelected = c.id === targetVal;

                    return `
                        <div class="custom-cat-row ${isSelected ? 'selected' : ''}" onclick="adminApp.selectCategoryFromDropdown('${c.id}')" style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.95rem; cursor:pointer; gap:0.75rem; border-bottom:1px solid #F1F5F9;">
                            <span class="custom-cat-row-title" style="flex:1 1 auto; text-align:left; font-weight:${isSelected ? '700' : '500'}; color:${isSelected ? '#4338CA' : '#1E293B'}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${displayTitle}</span>
                            <button type="button" class="custom-cat-del-btn" onclick="adminApp.deleteCategoryFromDropdown(event, '${c.id}')" title="Удалить категорию '${titleRu}' (×)" style="flex:0 0 24px; width:24px; height:24px; display:inline-flex; align-items:center; justify-content:center; background:#F1F5F9; border:1px solid #CBD5E1; color:#64748B; border-radius:6px; font-size:0.95rem; font-weight:700; cursor:pointer; line-height:1; padding:0; margin:0;">
                                ×
                            </button>
                        </div>
                    `;
                }).join('');
            }
        }
    }

    toggleCategoryDropdown(event) {
        if (event) event.stopPropagation();
        const menu = document.getElementById('custom-cat-dropdown-menu');
        const arrow = document.getElementById('custom-cat-arrow');
        if (!menu) return;

        const isOpen = menu.style.display === 'block';
        if (isOpen) {
            this.closeCategoryDropdown();
        } else {
            this.populateCategoriesDropdown();
            menu.style.display = 'block';
            if (arrow) arrow.style.transform = 'rotate(180deg)';
        }
    }

    closeCategoryDropdown() {
        const menu = document.getElementById('custom-cat-dropdown-menu');
        const arrow = document.getElementById('custom-cat-arrow');
        if (menu) menu.style.display = 'none';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }

    selectCategoryFromDropdown(catId) {
        const hiddenInput = document.getElementById('prod-category-select');
        if (hiddenInput) hiddenInput.value = catId;
        this.lastSelectedCategory = catId;
        this.populateCategoriesDropdown(catId);
        this.closeCategoryDropdown();
    }

    deleteCategoryFromDropdown(event, catId) {
        if (event) event.stopPropagation();
        if (!catId) return;

        const cleanId = String(catId).trim();
        const category = window.dataStore ? window.dataStore.getCategoryById(cleanId) : null;
        const catTitle = (category && (category.title_ru || category.title_az || category.title_en)) || cleanId;
        
        const products = window.dataStore ? window.dataStore.getProducts() : [];
        const relatedProds = products.filter(p => {
            const pCat = String(p.category || p.category_id || '').trim().toLowerCase();
            return pCat === cleanId.toLowerCase();
        });

        let confirmMsg = `Удалить категорию "${catTitle}"?`;
        if (relatedProds.length > 0) {
            confirmMsg = `⚠️ В категории "${catTitle}" находится ${relatedProds.length} товаров.\n\nПри удалении категории все связанные товары (${relatedProds.length} шт.) будут также автоматически удалены, исключая их случайное перемещение в другие разделы.\n\nУдалить категорию и все её товары?`;
        }

        if (confirm(confirmMsg)) {
            if (window.dataStore) {
                window.dataStore.deleteCategory(cleanId);
            }
            const remaining = window.dataStore ? window.dataStore.getCategories() : [];
            const newSelected = remaining.length > 0 ? remaining[0].id : '';
            this.populateCategoriesDropdown(newSelected);
            this.renderProductsTable();
            this.renderDashboardStats();
            this.showToast(`Категория "${catTitle}" и её товары удалены!`, 'info');
        }
    }

    openNewCategoryModal(event) {
        if (event) event.stopPropagation();
        this.closeCategoryDropdown();

        const input = document.getElementById('new-cat-input-name');
        if (input) input.value = '';

        const modal = document.getElementById('modal-category-create');
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
            setTimeout(() => {
                input?.focus();
            }, 100);
        }
    }

    async submitNewCategoryModal() {
        const input = document.getElementById('new-cat-input-name');
        const rawName = input ? input.value.trim() : '';

        if (!rawName) {
            this.showToast('Пожалуйста, введите название категории!', 'error');
            return;
        }

        const newCatId = 'cat-' + Date.now();
        let titleRu = rawName;
        let titleAz = rawName;
        let titleEn = rawName;

        try {
            titleAz = await this.translateUniversal(rawName, 'ru', 'az') || rawName;
            titleEn = await this.translateUniversal(rawName, 'ru', 'en') || rawName;
        } catch (e) {}

        const categoryData = {
            id: newCatId,
            title_ru: titleRu,
            title_az: titleAz,
            title_en: titleEn,
            title: { ru: titleRu, az: titleAz, en: titleEn }
        };

        if (window.dataStore) {
            window.dataStore.saveCategory(categoryData);
        }

        this.closeModal('modal-category-create');
        this.lastSelectedCategory = newCatId;
        this.populateCategoriesDropdown(newCatId);
        this.showToast(`✨ Новая категория "${titleRu}" создана и выбрана!`, 'success');
    }

    // ==========================================
    // Dynamic Departments Dropdown Logic
    // ==========================================
    populateDepartmentsDropdown(selectedId = null) {
        if (!window.dataStore) return;

        const departments = window.dataStore.getDepartments();
        const hiddenInput = document.getElementById('team-department');
        const labelEl = document.getElementById('custom-dep-selected-label');
        const itemsList = document.getElementById('custom-dep-items-list');

        let targetVal = selectedId;
        if (!targetVal && hiddenInput) {
            targetVal = hiddenInput.value;
        }
        if (!targetVal || !departments.some(d => d.id === targetVal)) {
            targetVal = departments.length > 0 ? departments[0].id : 'executive';
        }

        if (hiddenInput) {
            hiddenInput.value = targetVal;
        }
        this.lastSelectedDepartment = targetVal;

        // Find selected department object and update trigger label
        const selDep = departments.find(d => d.id === targetVal);
        if (labelEl) {
            if (selDep) {
                const titleRu = selDep.title_ru || selDep.title_az || selDep.title_en || selDep.id;
                const titleAz = selDep.title_az || '';
                labelEl.textContent = titleAz ? `${titleRu} (${titleAz})` : titleRu;
            } else {
                labelEl.textContent = 'Выберите отдел...';
            }
        }

        // Render rows in dropdown list
        if (itemsList) {
            if (departments.length === 0) {
                itemsList.innerHTML = `<div style="padding:0.6rem 0.9rem; color:#94A3B8; font-size:0.85rem;">Отделы отсутствуют</div>`;
            } else {
                itemsList.innerHTML = departments.map(d => {
                    const titleRu = d.title_ru || d.title_az || d.title_en || d.id;
                    const titleAz = d.title_az || '';
                    const displayTitle = titleAz ? `${titleRu} (${titleAz})` : titleRu;
                    const isSelected = d.id === targetVal;

                    return `
                        <div class="custom-cat-row ${isSelected ? 'selected' : ''}" onclick="adminApp.selectDepartmentFromDropdown('${d.id}')" style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.95rem; cursor:pointer; gap:0.75rem; border-bottom:1px solid #F1F5F9;">
                            <span class="custom-cat-row-title" style="flex:1 1 auto; text-align:left; font-weight:${isSelected ? '700' : '500'}; color:${isSelected ? '#2563EB' : '#1E293B'}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${displayTitle}</span>
                            <button type="button" class="custom-cat-del-btn" onclick="adminApp.deleteDepartmentFromDropdown(event, '${d.id}')" title="Удалить отдел '${titleRu}' (×)" style="flex:0 0 24px; width:24px; height:24px; display:inline-flex; align-items:center; justify-content:center; background:#F1F5F9; border:1px solid #CBD5E1; color:#64748B; border-radius:6px; font-size:0.95rem; font-weight:700; cursor:pointer; line-height:1; padding:0; margin:0;">
                                ×
                            </button>
                        </div>
                    `;
                }).join('');
            }
        }
    }

    toggleDepartmentDropdown(event) {
        if (event) event.stopPropagation();
        const menu = document.getElementById('custom-dep-dropdown-menu');
        const arrow = document.getElementById('custom-dep-arrow');
        if (!menu) return;

        const isOpen = menu.style.display === 'block';
        if (isOpen) {
            this.closeDepartmentDropdown();
        } else {
            this.populateDepartmentsDropdown();
            menu.style.display = 'block';
            if (arrow) arrow.style.transform = 'rotate(180deg)';
        }
    }

    closeDepartmentDropdown() {
        const menu = document.getElementById('custom-dep-dropdown-menu');
        const arrow = document.getElementById('custom-dep-arrow');
        if (menu) menu.style.display = 'none';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    }

    selectDepartmentFromDropdown(depId) {
        const hiddenInput = document.getElementById('team-department');
        if (hiddenInput) hiddenInput.value = depId;
        this.lastSelectedDepartment = depId;
        this.populateDepartmentsDropdown(depId);
        this.closeDepartmentDropdown();
    }

    deleteDepartmentFromDropdown(event, depId) {
        if (event) event.stopPropagation();
        if (!depId) return;

        const cleanId = String(depId).trim();
        const departments = window.dataStore ? window.dataStore.getDepartments() : [];
        const dep = departments.find(d => d.id === cleanId);
        const depTitle = (dep && (dep.title_ru || dep.title_az || dep.title_en)) || cleanId;

        if (confirm(`Вы уверены, что хотите удалить отдел "${depTitle}"?`)) {
            if (window.dataStore) {
                window.dataStore.deleteDepartment(cleanId);
            }
            const remaining = window.dataStore ? window.dataStore.getDepartments() : [];
            const newSelected = remaining.length > 0 ? remaining[0].id : 'executive';
            this.populateDepartmentsDropdown(newSelected);
            this.showToast(`Отдел "${depTitle}" удален`, 'info');
        }
    }

    openNewDepartmentModal(event) {
        if (event) event.stopPropagation();
        this.closeDepartmentDropdown();

        const input = document.getElementById('new-dep-input-name');
        if (input) input.value = '';

        const modal = document.getElementById('modal-department-create');
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
            setTimeout(() => {
                input?.focus();
            }, 100);
        }
    }

    async submitNewDepartmentModal() {
        const input = document.getElementById('new-dep-input-name');
        const rawName = input ? input.value.trim() : '';

        if (!rawName) {
            this.showToast('Пожалуйста, введите название отдела!', 'error');
            return;
        }

        const newDepId = 'dep-' + Date.now();
        let titleRu = rawName;
        let titleAz = rawName;
        let titleEn = rawName;

        try {
            titleAz = await this.translateUniversal(rawName, 'ru', 'az') || rawName;
            titleEn = await this.translateUniversal(rawName, 'ru', 'en') || rawName;
        } catch (e) {}

        const depData = {
            id: newDepId,
            title_ru: titleRu,
            title_az: titleAz,
            title_en: titleEn
        };

        if (window.dataStore) {
            window.dataStore.saveDepartment(depData);
        }

        this.closeModal('modal-department-create');
        this.lastSelectedDepartment = newDepId;
        this.populateDepartmentsDropdown(newDepId);
        this.showToast(`✨ Новый отдел "${titleRu}" создан и выбран!`, 'success');
    }

    // ==========================================
    // Universal Real Translation Engine (Online Neural + Offline Dict Fallback)
    // ==========================================
    async translateUniversal(text, fromLang, toLang) {
        if (!text || !text.trim()) return '';
        if (fromLang === toLang) return text.trim();

        const cleanText = text.trim();

        // 1. Online Real Translation via Neural Translation Endpoint (Instant & High Quality)
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2500);
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(cleanText)}`;
            
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                if (data && data[0] && Array.isArray(data[0])) {
                    const translatedText = data[0].map(item => item[0]).join('').trim();
                    if (translatedText && translatedText !== cleanText) {
                        return translatedText;
                    }
                }
            }
        } catch (e) {
            // Graceful fallback to offline dictionary
        }

        // 2. Offline Dictionary Engine Fallback
        return this.translateOffline(cleanText, fromLang, toLang);
    }

    translateOffline(text, fromLang, toLang) {
        if (!text || !text.trim()) return '';
        if (fromLang === toLang) return text.trim();

        let res = text.trim();

        const dictKey = `${fromLang}To${toLang.charAt(0).toUpperCase() + toLang.slice(1)}`;
        if (this.dictionary[dictKey]) {
            // Sort by length descending to match phrases before single words
            const sortedKeys = Object.keys(this.dictionary[dictKey]).sort((a, b) => b.length - a.length);
            for (const k of sortedKeys) {
                const v = this.dictionary[dictKey][k];
                const regex = new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
                res = res.replace(regex, v);
            }
        } else {
            // Pivot via RU
            if (fromLang === 'az' && toLang === 'en') {
                const ruIntermediate = this.translateOffline(res, 'az', 'ru');
                return this.translateOffline(ruIntermediate, 'ru', 'en');
            } else if (fromLang === 'en' && toLang === 'az') {
                const ruIntermediate = this.translateOffline(res, 'en', 'ru');
                return this.translateOffline(ruIntermediate, 'ru', 'az');
            }
        }

        // Apply industry units and phrases
        if (toLang === 'az') {
            res = res.replace(/\bг\/кг\b/gi, 'q/kq')
                     .replace(/\bg\/kg\b/gi, 'q/kq')
                     .replace(/\bкг\b/gi, 'kq')
                     .replace(/\bkg\b/gi, 'kq')
                     .replace(/\bг\b/gi, 'q')
                     .replace(/\bg\b/gi, 'q');
        } else if (toLang === 'en') {
            res = res.replace(/\bг\/кг\b/gi, 'g/kg')
                     .replace(/\bq\/kq\b/gi, 'g/kg')
                     .replace(/\bкг\b/gi, 'kg')
                     .replace(/\bkq\b/gi, 'kg')
                     .replace(/\bг\b/gi, 'g')
                     .replace(/\bq\b/gi, 'g');
        } else if (toLang === 'ru') {
            res = res.replace(/\bq\/kq\b/gi, 'г/кг')
                     .replace(/\bg\/kg\b/gi, 'г/кг')
                     .replace(/\bkq\b/gi, 'кг')
                     .replace(/\bkg\b/gi, 'кг')
                     .replace(/\bq\b/gi, 'г')
                     .replace(/\bg\b/gi, 'г');
        }

        return res;
    }

    // ==========================================
    // ✨ Smart AI Auto-Translation for Partners (From Any Language)
    // ==========================================
    async autoTranslatePartner() {
        const fields = [
            { key: 'desc', elRu: 'partner-desc-ru', elAz: 'partner-desc-az', elEn: 'partner-desc-en' },
            { key: 'cat', elRu: 'partner-cat-ru', elAz: 'partner-cat-az', elEn: 'partner-cat-en' },
            { key: 'status', elRu: 'partner-status-ru', elAz: 'partner-status-az', elEn: 'partner-status-en' }
        ];

        let hasAnyInput = false;
        fields.forEach(f => {
            if ((document.getElementById(f.elRu)?.value || '').trim() ||
                (document.getElementById(f.elAz)?.value || '').trim() ||
                (document.getElementById(f.elEn)?.value || '').trim()) {
                hasAnyInput = true;
            }
        });

        if (!hasAnyInput) {
            alert('⚠️ Zəhmət olmasa heç olmasa bir dildə (AZ, RU və ya EN) şirkət haqqında məlumat daxil edin!\nПожалуйста, введите описание компании хотя бы на одном языке (AZ, RU или EN)!');
            document.getElementById('partner-desc-ru')?.focus();
            return;
        }

        const translateBtn = document.getElementById('btn-auto-translate-part');
        if (translateBtn) {
            translateBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Tərcümə edilir... / Переводим...</span>`;
            translateBtn.style.opacity = '0.7';
            translateBtn.disabled = true;
        }

        try {
            for (const f of fields) {
                const elRu = document.getElementById(f.elRu);
                const elAz = document.getElementById(f.elAz);
                const elEn = document.getElementById(f.elEn);

                const valRu = elRu ? elRu.value.trim() : '';
                const valAz = elAz ? elAz.value.trim() : '';
                const valEn = elEn ? elEn.value.trim() : '';

                // Find whichever language has text
                let srcLang = null;
                let srcVal = '';

                if (valRu) { srcLang = 'ru'; srcVal = valRu; }
                else if (valAz) { srcLang = 'az'; srcVal = valAz; }
                else if (valEn) { srcLang = 'en'; srcVal = valEn; }

                if (!srcVal && f.key === 'status') {
                    srcLang = 'ru';
                    srcVal = 'Официальный дистрибьютор';
                }

                if (!srcVal) continue;

                // Fill only empty fields with real translation
                if (elRu && !valRu) elRu.value = await this.translateUniversal(srcVal, srcLang, 'ru');
                if (elAz && !valAz) elAz.value = await this.translateUniversal(srcVal, srcLang, 'az');
                if (elEn && !valEn) elEn.value = await this.translateUniversal(srcVal, srcLang, 'en');
            }

            this.updateFieldHighlights();
        } catch (err) {
            console.error('Translation error:', err);
            this.showToast('Перевод завершен', 'info');
        } finally {
            if (translateBtn) {
                translateBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> <span>✨ Авто-перевод (на все языки)</span>`;
                translateBtn.style.opacity = '1';
                translateBtn.disabled = false;
            }
        }
    }

    // ==========================================
    // ✨ Smart AI Auto-Translation for News (From Any Language)
    // ==========================================
    async autoTranslateNews() {
        const fields = [
            { key: 'title', elRu: 'news-title-ru', elAz: 'news-title-az', elEn: 'news-title-en' },
            { key: 'summary', elRu: 'news-summary-ru', elAz: 'news-summary-az', elEn: 'news-summary-en' },
            { key: 'content', elRu: 'news-content-ru', elAz: 'news-content-az', elEn: 'news-content-en' }
        ];

        let hasAnyInput = false;
        fields.forEach(f => {
            if ((document.getElementById(f.elRu)?.value || '').trim() ||
                (document.getElementById(f.elAz)?.value || '').trim() ||
                (document.getElementById(f.elEn)?.value || '').trim()) {
                hasAnyInput = true;
            }
        });

        if (!hasAnyInput) {
            alert('Пожалуйста, введите заголовок или текст новости хотя бы на одном языке (RU, AZ или EN)!');
            document.getElementById('news-title-ru')?.focus();
            return;
        }

        const translateBtn = document.getElementById('btn-auto-translate-news');
        if (translateBtn) {
            translateBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Переводим...</span>`;
            translateBtn.style.opacity = '0.7';
            translateBtn.disabled = true;
        }

        try {
            for (const f of fields) {
                const elRu = document.getElementById(f.elRu);
                const elAz = document.getElementById(f.elAz);
                const elEn = document.getElementById(f.elEn);

                const valRu = elRu ? elRu.value.trim() : '';
                const valAz = elAz ? elAz.value.trim() : '';
                const valEn = elEn ? elEn.value.trim() : '';

                // Find source language
                let srcLang = null, srcVal = '';
                if (valRu) { srcLang = 'ru'; srcVal = valRu; }
                else if (valAz) { srcLang = 'az'; srcVal = valAz; }
                else if (valEn) { srcLang = 'en'; srcVal = valEn; }

                if (!srcVal) continue;

                // Translate into missing fields
                if (elRu && !valRu) elRu.value = await this.translateUniversal(srcVal, srcLang, 'ru');
                if (elAz && !valAz) elAz.value = await this.translateUniversal(srcVal, srcLang, 'az');
                if (elEn && !valEn) elEn.value = await this.translateUniversal(srcVal, srcLang, 'en');
            }

            this.updateFieldHighlights();
            this.showToast('✨ Новость переведена на все языки!', 'success');
        } catch (err) {
            console.error('Translation error:', err);
            this.showToast('Перевод завершен', 'info');
        } finally {
            if (translateBtn) {
                translateBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> <span>✨ Авто-перевод (на все языки)</span>`;
                translateBtn.style.opacity = '1';
                translateBtn.disabled = false;
            }
        }
    }

    // ==========================================
    // ✨ Smart AI Auto-Translation for Team Members (From Any Language)
    // ==========================================
    async autoTranslateTeam() {
        const fields = [
            { key: 'name', elRu: 'team-name-ru', elAz: 'team-name-az', elEn: 'team-name-en' },
            { key: 'role', elRu: 'team-role-ru', elAz: 'team-role-az', elEn: 'team-role-en' },
            { key: 'bio',  elRu: 'team-bio-ru',  elAz: 'team-bio-az',  elEn: 'team-bio-en' }
        ];

        let hasAnyInput = false;
        fields.forEach(f => {
            if ((document.getElementById(f.elRu)?.value || '').trim() ||
                (document.getElementById(f.elAz)?.value || '').trim() ||
                (document.getElementById(f.elEn)?.value || '').trim()) {
                hasAnyInput = true;
            }
        });

        if (!hasAnyInput) {
            alert('Пожалуйста, введите имя или должность сотрудника хотя бы на одном языке (RU, AZ или EN)!');
            document.getElementById('team-name-ru')?.focus();
            return;
        }

        const translateBtn = document.getElementById('btn-auto-translate-team');
        if (translateBtn) {
            translateBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Переводим...</span>`;
            translateBtn.style.opacity = '0.7';
            translateBtn.disabled = true;
        }

        try {
            for (const f of fields) {
                const elRu = document.getElementById(f.elRu);
                const elAz = document.getElementById(f.elAz);
                const elEn = document.getElementById(f.elEn);

                const valRu = elRu ? elRu.value.trim() : '';
                const valAz = elAz ? elAz.value.trim() : '';
                const valEn = elEn ? elEn.value.trim() : '';

                // Find source language
                let srcLang = null, srcVal = '';
                if (valRu) { srcLang = 'ru'; srcVal = valRu; }
                else if (valAz) { srcLang = 'az'; srcVal = valAz; }
                else if (valEn) { srcLang = 'en'; srcVal = valEn; }

                if (!srcVal) continue;

                // Translate into missing fields
                if (elRu && !valRu) elRu.value = await this.translateUniversal(srcVal, srcLang, 'ru');
                if (elAz && !valAz) elAz.value = await this.translateUniversal(srcVal, srcLang, 'az');
                if (elEn && !valEn) elEn.value = await this.translateUniversal(srcVal, srcLang, 'en');
            }

            this.updateFieldHighlights();
            this.showToast('✨ Данные сотрудника переведены на все языки!', 'success');
        } catch (err) {
            console.error('Team translation error:', err);
            this.showToast('Перевод завершен', 'info');
        } finally {
            if (translateBtn) {
                translateBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> <span>✨ Авто-перевод (на все языки)</span>`;
                translateBtn.style.opacity = '1';
                translateBtn.disabled = false;
            }
        }
    }

    // ==========================================
    // ✨ Smart AI Auto-Translation for Products (From Any Language)
    // ==========================================
    async autoTranslateProduct() {
        // Static fields (title + description)
        const staticFields = [
            { key: 'title', elRu: 'prod-title-ru', elAz: 'prod-title-az', elEn: 'prod-title-en' },
            { key: 'desc',  elRu: 'prod-desc-ru',  elAz: 'prod-desc-az',  elEn: 'prod-desc-en' }
        ];

        // Check if there's anything to translate at all
        const container = document.getElementById('specs-rows-container');
        const specRows = container ? container.querySelectorAll('.spec-row') : [];
        const titleRu = (document.getElementById('prod-title-ru')?.value || '').trim();
        const titleAz = (document.getElementById('prod-title-az')?.value || '').trim();
        const titleEn = (document.getElementById('prod-title-en')?.value || '').trim();

        if (!titleRu && !titleAz && !titleEn && specRows.length === 0) {
            alert('Пожалуйста, введите название товара хотя бы на одном языке (RU, AZ или EN)!');
            document.getElementById('prod-title-ru')?.focus();
            return;
        }

        const translateBtn = document.getElementById('btn-auto-translate-prod');
        if (translateBtn) {
            translateBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Переводим...</span>`;
            translateBtn.style.opacity = '0.7';
            translateBtn.disabled = true;
        }

        try {
            // ── 1. Translate static title/desc fields ──
            for (const f of staticFields) {
                const elRu = document.getElementById(f.elRu);
                const elAz = document.getElementById(f.elAz);
                const elEn = document.getElementById(f.elEn);

                const valRu = elRu ? elRu.value.trim() : '';
                const valAz = elAz ? elAz.value.trim() : '';
                const valEn = elEn ? elEn.value.trim() : '';

                let srcLang = null, srcVal = '';
                if (valRu) { srcLang = 'ru'; srcVal = valRu; }
                else if (valAz) { srcLang = 'az'; srcVal = valAz; }
                else if (valEn) { srcLang = 'en'; srcVal = valEn; }
                if (!srcVal) continue;

                if (elRu && !valRu) elRu.value = await this.translateUniversal(srcVal, srcLang, 'ru');
                if (elAz && !valAz) elAz.value = await this.translateUniversal(srcVal, srcLang, 'az');
                if (elEn && !valEn) elEn.value = await this.translateUniversal(srcVal, srcLang, 'en');
            }

            // ── 2. Translate each dynamic spec row ──
            for (const row of specRows) {
                // NAME field: source is always spec-input-name (RU), translate to AZ + EN
                const nameInput  = row.querySelector('.spec-input-name');
                const nameAzInput = row.querySelector('.spec-hidden-name-az');
                const nameEnInput = row.querySelector('.spec-hidden-name-en');

                const nameRu = (nameInput?.value || '').trim();
                if (nameRu) {
                    if (nameAzInput && !nameAzInput.value.trim()) {
                        nameAzInput.value = await this.translateUniversal(nameRu, 'ru', 'az');
                    }
                    if (nameEnInput && !nameEnInput.value.trim()) {
                        nameEnInput.value = await this.translateUniversal(nameRu, 'ru', 'en');
                    }
                }

                // VALUE field: source is spec-input-val (RU), translate to AZ + EN
                const valInput  = row.querySelector('.spec-input-val');
                const valAzInput = row.querySelector('.spec-hidden-val-az');
                const valEnInput = row.querySelector('.spec-hidden-val-en');

                const valRu = (valInput?.value || '').trim();
                if (valRu) {
                    if (valAzInput && !valAzInput.value.trim()) {
                        valAzInput.value = await this.translateUniversal(valRu, 'ru', 'az');
                    }
                    if (valEnInput && !valEnInput.value.trim()) {
                        valEnInput.value = await this.translateUniversal(valRu, 'ru', 'en');
                    }
                }
            }

            // Show translated previews in each row
            this._refreshSpecTranslationPreviews();
            this.updateFieldHighlights();
            this.showToast('✨ Название, описание и характеристики товара переведены на все языки!', 'success');
        } catch (err) {
            console.error('Translation error:', err);
            this.showToast('Перевод завершен', 'info');
        } finally {
            if (translateBtn) {
                translateBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> <span>✨ Авто-перевод (на все языки)</span>`;
                translateBtn.style.opacity = '1';
                translateBtn.disabled = false;
            }
        }
    }

    // Show translated values as small preview chips inside each spec row
    _refreshSpecTranslationPreviews() {
        const container = document.getElementById('specs-rows-container');
        if (!container) return;
        container.querySelectorAll('.spec-row').forEach(row => {
            const previewEl = row.querySelector('.spec-translation-preview');
            if (!previewEl) return;
            const nameAz = row.querySelector('.spec-hidden-name-az')?.value || '';
            const nameEn = row.querySelector('.spec-hidden-name-en')?.value || '';
            const valAz  = row.querySelector('.spec-hidden-val-az')?.value  || '';
            const valEn  = row.querySelector('.spec-hidden-val-en')?.value  || '';
            if (nameAz || nameEn) {
                previewEl.innerHTML = `
                    <span title="AZ">🇦🇿 ${nameAz || '—'}${valAz ? ': ' + valAz : ''}</span>
                    <span title="EN">🇬🇧 ${nameEn || '—'}${valEn ? ': ' + valEn : ''}</span>
                `;
                previewEl.style.display = 'flex';
            } else {
                previewEl.style.display = 'none';
            }
        });
    }

    bindImageUpload(fileInputId, urlInputId, previewImgId) {
        const fileInput = document.getElementById(fileInputId);
        const urlInput = document.getElementById(urlInputId);
        const previewImg = document.getElementById(previewImgId);

        if (fileInput && previewImg) {
            fileInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                // 1. Instant local preview
                const reader = new FileReader();
                reader.onload = (re) => {
                    previewImg.src = re.target.result;
                    if (urlInput) urlInput.value = re.target.result;
                };
                reader.readAsDataURL(file);

                // 2. Upload to Supabase Storage if configured
                if (window.supabaseService && window.supabaseService.isConfigured) {
                    this.showToast('Загрузка изображения в Supabase Storage...', 'info');
                    try {
                        const publicUrl = await window.supabaseService.uploadImage(file, 'media');
                        if (publicUrl) {
                            if (urlInput) urlInput.value = publicUrl;
                            previewImg.src = publicUrl;
                            this.showToast('Изображение успешно загружено в Supabase Storage!', 'success');
                        }
                    } catch (err) {
                        console.error('Upload to Supabase Storage failed:', err);
                    }
                }
            });
        }

        if (urlInput && previewImg) {
            urlInput.addEventListener('input', (e) => {
                if (e.target.value.trim()) {
                    previewImg.src = e.target.value.trim();
                }
            });
        }
    }

    switchTab(tabId, updateUrl = true) {
        if (!tabId) return;
        this.currentTab = tabId;

        if (updateUrl) {
            try {
                if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, '', `#tab-${tabId}`);
                } else {
                    window.location.hash = `tab-${tabId}`;
                }
                localStorage.setItem('cesaretoglu_admin_tab', tabId);
            } catch (e) {}
        }
        
        // Update sidebar active item
        document.querySelectorAll('.sidebar-nav-item').forEach(item => {
            if (item.dataset.tab === tabId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update content active section
        document.querySelectorAll('.admin-tab-content').forEach(content => {
            if (content.id === `tab-${tabId}`) {
                content.classList.add('active');
                content.style.display = 'block';
            } else {
                content.classList.remove('active');
                content.style.display = 'none';
            }
        });

        this.renderAll();
    }

    renderAll() {
        this.renderDashboardStats();
        this.populateCategoriesDropdown();
        this.renderPartnersTable();
        this.renderProductsTable();
        this.renderNewsTable();
        this.renderTeamTable();
        this.renderAboutForm();
        this.renderSettingsForm();
    }

    // ==========================================
    // Dashboard Overview Stats
    // ==========================================
    renderDashboardStats() {
        const products = window.dataStore ? window.dataStore.getProducts() : [];
        const partners = window.dataStore ? window.dataStore.getPartners() : [];
        const news = window.dataStore ? window.dataStore.getNews() : [];

        const pCount = document.getElementById('dash-stat-products');
        const bCount = document.getElementById('dash-stat-partners');
        const nCount = document.getElementById('dash-stat-news');

        if (pCount) pCount.textContent = products.length;
        if (bCount) bCount.textContent = partners.length;
        if (nCount) nCount.textContent = news.length;
    }

    // ==========================================
    // Products Management
    // ==========================================
    renderProductsTable() {
        const tbody = document.getElementById('admin-products-tbody');
        if (!tbody) return;

        let products = window.dataStore.getProducts();
        const searchVal = document.getElementById('adm-prod-search')?.value.trim().toLowerCase();

        if (searchVal) {
            products = products.filter(p => 
                (p.title_ru && p.title_ru.toLowerCase().includes(searchVal)) ||
                (p.title_az && p.title_az.toLowerCase().includes(searchVal)) ||
                (p.title_en && p.title_en.toLowerCase().includes(searchVal)) ||
                (p.partner && p.partner.toLowerCase().includes(searchVal)) ||
                (p.artikul && p.artikul.toLowerCase().includes(searchVal))
            );
        }

        if (products.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2.5rem; color: #94A3B8;">Heç bir məhsul tapılmadı</td></tr>`;
            return;
        }

        tbody.innerHTML = products.map((p, idx) => {
            const img = p.image_local || p.image || 'images/logo.png';
            const titleAz = p.title_az || (p.title && p.title.az) || p.title_ru || '';
            const titleRu = p.title_ru || (p.title && p.title.ru) || p.title_az || '';
            const titleEn = p.title_en || (p.title && p.title.en) || '';

            const hasAz = Boolean(p.title_az || (p.title && p.title.az));
            const hasRu = Boolean(p.title_ru || (p.title && p.title.ru));
            const hasEn = Boolean(p.title_en || (p.title && p.title.en));

            return `
                <tr>
                    <td>${idx + 1}</td>
                    <td>
                        <div class="item-main-cell">
                            <img src="${img}" class="item-thumb-sm" alt="" onerror="this.src='images/logo.png'">
                            <div>
                                <span class="item-title-bold">${titleAz || titleRu}</span>
                                <span class="item-subtitle-muted">${titleRu} ${titleEn ? `• ${titleEn}` : ''}</span>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge badge-partner">${p.partner}</span></td>
                    <td><span class="badge badge-category">${p.category_az || p.category_ru || p.category}</span></td>
                    <td><code>${p.artikul || '—'}</code></td>
                    <td>
                        <div style="display:flex; gap:4px; font-size:0.75rem;">
                            <span style="color:${hasAz ? '#16A34A' : '#EF4444'}; font-weight:700;">AZ</span>
                            <span style="color:#CBD5E1;">•</span>
                            <span style="color:${hasRu ? '#16A34A' : '#EF4444'}; font-weight:700;">RU</span>
                            <span style="color:#CBD5E1;">•</span>
                            <span style="color:${hasEn ? '#16A34A' : '#EF4444'}; font-weight:700;">EN</span>
                        </div>
                    </td>
                    <td>
                        <div class="tbl-actions">
                            <button class="btn-action btn-action-edit" onclick="adminApp.openProductModal('${p.id}')" title="Redaktə et">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn-action btn-action-del" onclick="adminApp.deleteProduct('${p.id}')" title="Sil">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    openProductModal(productId = null) {
        const cleanId = productId ? String(productId).trim() : null;
        this.editingProductId = cleanId;

        const hiddenIdInput = document.getElementById('prod-edit-id');
        if (hiddenIdInput) hiddenIdInput.value = cleanId || '';

        const modal = document.getElementById('modal-product-edit');
        const titleEl = document.getElementById('mpe-modal-title');
        
        // Dynamically refresh partners & categories dropdown in form
        this.populatePartnersDropdown();

        if (cleanId) {
            const product = window.dataStore ? window.dataStore.getProductById(cleanId) : null;
            if (!product) return;
            if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color:#6366F1;"></i> <span>Редактировать товар: <strong>${product.title_ru || product.title_az}</strong></span>`;
            
            this.populateCategoriesDropdown(product.category || 'casings');

            const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };

            setVal('prod-title-az', product.title_az || (product.title && product.title.az));
            setVal('prod-title-ru', product.title_ru || (product.title && product.title.ru));
            setVal('prod-title-en', product.title_en || (product.title && product.title.en));
            
            setVal('prod-partner-select', product.partner || 'Atlantis-Pak');
            setVal('prod-category-select', product.category || 'casings');
            setVal('prod-artikul', product.artikul);
            setVal('prod-image-url', product.image_local || product.image);
            
            const prev = document.getElementById('prod-img-preview');
            if (prev) prev.src = product.image_local || product.image || 'images/logo.png';
            
            setVal('prod-desc-az', product.description_az || (product.description && product.description.az));
            setVal('prod-desc-ru', product.description_ru || (product.description && product.description.ru));
            setVal('prod-desc-en', product.description_en || (product.description && product.description.en));

            // Load dynamic specs rows
            this.renderSpecsRows(product.specs || this._legacySpecsToRows(product));

            const statusCheckbox = document.getElementById('prod-status-active');
            if (statusCheckbox) statusCheckbox.checked = product.status !== 'draft';
        } else {
            if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-plus-circle" style="color:#16A34A;"></i> <span>Добавить товар</span>`;
            this.populateCategoriesDropdown('casings');
            const form = document.getElementById('form-product-edit');
            if (form) form.reset();
            if (hiddenIdInput) hiddenIdInput.value = '';
            const prev = document.getElementById('prod-img-preview');
            if (prev) prev.src = 'images/logo.png';
            const statusCheckbox = document.getElementById('prod-status-active');
            if (statusCheckbox) statusCheckbox.checked = true;
            // Clear specs for new product
            this.renderSpecsRows([]);
        }

        // Update live field highlights and status badges
        this.updateFieldHighlights();

        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
        }
    }

    // Convert legacy param1/2/3 or specs_structured to rows array for backward compat
    _legacySpecsToRows(product) {
        const rows = [];
        if (product.param1_ru || product.param1_az) {
            rows.push({ name: product.param1_ru || product.param1_az || '', value: '' });
        }
        if (product.param2_ru || product.param2_az) {
            rows.push({ name: product.param2_ru || product.param2_az || '', value: '' });
        }
        if (product.param3_ru || product.param3_az) {
            rows.push({ name: product.param3_ru || product.param3_az || '', value: '' });
        }
        const specs = product.specs_structured || {};
        if (rows.length === 0) {
            const fields = [
                { key: 'dosage', labelRu: 'Дозировка' },
                { key: 'smokePermeability', labelRu: 'Проницаемость' },
                { key: 'materialType', labelRu: 'Материал' },
                { key: 'application', labelRu: 'Назначение / Применение' },
                { key: 'overstuffing', labelRu: 'Фаршеемкость' },
                { key: 'caliber', labelRu: 'Калибр' },
                { key: 'waterBinding', labelRu: 'Влагосвязывание' },
                { key: 'shelfLife', labelRu: 'Срок хранения' },
                { key: 'storage', labelRu: 'Условия хранения' },
                { key: 'proteinType', labelRu: 'Тип белка' }
            ];
            fields.forEach(f => {
                const v = specs[f.key];
                if (!v) return;
                const val = typeof v === 'object' ? (v.ru || v.az || v.en || '') : String(v);
                if (val) rows.push({ name: f.labelRu, value: val });
            });
        }
        return rows;
    }

    // Render rows into the specs builder
    renderSpecsRows(rows = []) {
        const container = document.getElementById('specs-rows-container');
        if (!container) return;
        container.innerHTML = '';
        (rows || []).forEach((row, idx) => this._appendSpecRow(
            row.name    || row.name_ru   || '',
            row.value   || row.value_ru  || '',
            idx,
            row.name_az  || '', row.name_en  || '',
            row.value_az || '', row.value_en || ''
        ));
        this._updateSpecsCount();
        // Restore translation previews
        setTimeout(() => this._refreshSpecTranslationPreviews(), 0);
    }

    _appendSpecRow(name = '', value = '', idx = null,
                   nameAz = '', nameEn = '', valueAz = '', valueEn = '') {
        const container = document.getElementById('specs-rows-container');
        if (!container) return;
        const div = document.createElement('div');
        div.className = 'spec-row';

        // Build inner HTML with RU visible inputs + hidden AZ/EN inputs
        div.innerHTML = `
            <input type="text"
                class="spec-input-name adm-input"
                placeholder="Название (напр: Калибр, Дозировка...)"
                value="${this._esc(name)}"
                title="Название характеристики (RU)">
            <input type="text"
                class="spec-input-val adm-input"
                placeholder="Значение (напр: 40-120 мм, 3-5 г/кг...)"
                value="${this._esc(value)}"
                title="Значение характеристики (RU)">
            <button type="button" class="btn-spec-del" onclick="adminApp.removeSpecRow(this)" title="Удалить строку">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <input type="hidden" class="spec-hidden-name-az" value="${this._esc(nameAz)}">
            <input type="hidden" class="spec-hidden-name-en" value="${this._esc(nameEn)}">
            <input type="hidden" class="spec-hidden-val-az"  value="${this._esc(valueAz)}">
            <input type="hidden" class="spec-hidden-val-en"  value="${this._esc(valueEn)}">
            <div class="spec-translation-preview" style="display:none; grid-column:1/-1; gap:0.6rem; flex-wrap:wrap; font-size:0.75rem; color:#6366F1; margin-top:0.25rem;"></div>
        `;
        container.appendChild(div);

        // When user edits the RU inputs, clear the cached AZ/EN so they get re-translated
        div.querySelector('.spec-input-name').addEventListener('input', () => {
            div.querySelector('.spec-hidden-name-az').value = '';
            div.querySelector('.spec-hidden-name-en').value = '';
            div.querySelector('.spec-translation-preview').style.display = 'none';
        });
        div.querySelector('.spec-input-val').addEventListener('input', () => {
            div.querySelector('.spec-hidden-val-az').value = '';
            div.querySelector('.spec-hidden-val-en').value = '';
            div.querySelector('.spec-translation-preview').style.display = 'none';
        });

        this._updateSpecsCount();
    }

    _esc(str) {
        return String(str || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    addSpecRow() {
        this._appendSpecRow('', '');
        // Focus the new name input
        const container = document.getElementById('specs-rows-container');
        if (container) {
            const rows = container.querySelectorAll('.spec-row');
            const lastRow = rows[rows.length - 1];
            if (lastRow) {
                const inp = lastRow.querySelector('.spec-input-name');
                if (inp) inp.focus();
            }
        }
    }

    removeSpecRow(btn) {
        const row = btn.closest('.spec-row');
        if (row) {
            row.style.opacity = '0';
            row.style.transform = 'translateX(10px)';
            row.style.transition = 'all 0.18s ease';
            setTimeout(() => { row.remove(); this._updateSpecsCount(); }, 180);
        }
    }

    _updateSpecsCount() {
        const container = document.getElementById('specs-rows-container');
        const badge = document.getElementById('specs-count-badge');
        if (badge && container) {
            badge.textContent = container.children.length;
        }
    }

    // Collect specs from builder rows — now with all 6 language fields
    _collectSpecs() {
        const container = document.getElementById('specs-rows-container');
        if (!container) return [];
        const rows = [];
        container.querySelectorAll('.spec-row').forEach(row => {
            const name    = (row.querySelector('.spec-input-name')?.value    || '').trim();
            const value   = (row.querySelector('.spec-input-val')?.value     || '').trim();
            const nameAz  = (row.querySelector('.spec-hidden-name-az')?.value || '').trim();
            const nameEn  = (row.querySelector('.spec-hidden-name-en')?.value || '').trim();
            const valueAz = (row.querySelector('.spec-hidden-val-az')?.value  || '').trim();
            const valueEn = (row.querySelector('.spec-hidden-val-en')?.value  || '').trim();
            if (name || value) {
                rows.push({
                    name,     // RU (primary editable)
                    value,    // RU (primary editable)
                    name_ru:  name,
                    value_ru: value,
                    name_az:  nameAz  || name,   // fallback to RU if not yet translated
                    value_az: valueAz || value,
                    name_en:  nameEn  || name,
                    value_en: valueEn || value
                });
            }
        });
        return rows;
    }

    saveProductForm() {
        const getVal = (id) => (document.getElementById(id)?.value || '').trim();

        const hiddenId = (document.getElementById('prod-edit-id')?.value || '').trim();
        const targetId = hiddenId || (this.editingProductId ? String(this.editingProductId).trim() : null) || ('prod-' + Date.now());

        const titleAz = getVal('prod-title-az');
        const titleRu = getVal('prod-title-ru');
        const titleEn = getVal('prod-title-en');
        const partner = getVal('prod-partner-select');
        const category = getVal('prod-category-select');
        const artikul = getVal('prod-artikul');
        const image = getVal('prod-image-url') || 'images/logo.png';
        const descAz = getVal('prod-desc-az');
        const descRu = getVal('prod-desc-ru');
        const descEn = getVal('prod-desc-en');

        // Collect dynamic specs from builder
        const specsArray = this._collectSpecs();

        const isActive = document.getElementById('prod-status-active')?.checked ?? true;

        if (!titleAz && !titleRu && !titleEn) {
            this.showToast('Пожалуйста, введите название товара хотя бы на одном языке!', 'error');
            return;
        }

        const categoryNames = {
            casings: { az: 'Kolbasa qabıqları', ru: 'Колбасные оболочки', en: 'Sausage Casings' },
            packaging: { az: 'Plyonkalar və qablaşdırma', ru: 'Пленки и упаковка', en: 'Films & Packaging' },
            spices: { az: 'Ədviyyatlar və inqrediyentlər', ru: 'Специи и пищевые ингредиенты', en: 'Spices & Food Ingredients' },
            additives: { az: 'Kompleks qarışıqlar', ru: 'Комплексные смеси', en: 'Complex Blends' }
        };

        const storeCat = window.dataStore ? window.dataStore.getCategoryById(category) : null;
        const catInfo = storeCat ? {
            az: storeCat.title_az || (storeCat.title && storeCat.title.az) || category,
            ru: storeCat.title_ru || (storeCat.title && storeCat.title.ru) || category,
            en: storeCat.title_en || (storeCat.title && storeCat.title.en) || category
        } : (categoryNames[category] || { az: category, ru: category, en: category });

        const productData = {
            id: targetId,
            status: isActive ? 'active' : 'draft',

            // Common non-translated fields
            partner: partner,
            category: category,
            category_az: catInfo.az,
            category_ru: catInfo.ru,
            category_en: catInfo.en,
            artikul: artikul,
            image_local: image,
            image: image,

            // Multilingual objects
            title: {
                az: titleAz || titleRu || titleEn,
                ru: titleRu || titleAz || titleEn,
                en: titleEn || titleRu || titleAz
            },
            description: {
                az: descAz || descRu || descEn,
                ru: descRu || descAz || descEn,
                en: descEn || descRu || descAz
            },

            // Flat backward-compatibility properties
            title_az: titleAz || titleRu || titleEn,
            title_ru: titleRu || titleAz || titleEn,
            title_en: titleEn || titleRu || titleAz,
            description_az: descAz || descRu || descEn,
            description_ru: descRu || descAz || descEn,
            description_en: descEn || descRu || descAz,

            // Dynamic specs array (new format)
            specs: specsArray
        };

        if (window.dataStore) {
            window.dataStore.saveProduct(productData);
        }
        this.editingProductId = null;
        const hiddenIdInput = document.getElementById('prod-edit-id');
        if (hiddenIdInput) hiddenIdInput.value = '';

        this.closeModal('modal-product-edit');
        this.renderAll();
        this.showToast('Товар успешно сохранен!', 'success');
    }

    deleteProduct(id) {
        if (confirm('Вы уверены, что хотите удалить этот товар?')) {
            if (window.dataStore) window.dataStore.deleteProduct(id);
            this.renderAll();
            this.showToast('Товар удален', 'info');
        }
    }

    // ==========================================
    // Partners Management
    // ==========================================
    renderPartnersTable() {
        const tbody = document.getElementById('admin-partners-tbody');
        if (!tbody) return;

        const partners = window.dataStore ? window.dataStore.getPartners() : [];

        if (partners.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem; color: #94A3B8;">Партнеры не найдены</td></tr>`;
            return;
        }

        tbody.innerHTML = partners.map((part, idx) => {
            return `
                <tr>
                    <td>${idx + 1}</td>
                    <td>
                        <div class="item-main-cell">
                            <img src="${part.logo}" class="item-thumb-sm" alt="" onerror="this.src='images/logo.png'" style="object-fit:contain; background:#FFF;">
                            <div>
                                <span class="item-title-bold">${part.name}</span>
                                <span class="item-subtitle-muted">${part.country}</span>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge badge-category">${part.category_ru || part.category_az || 'Партнер'}</span></td>
                    <td>
                        <div style="display:flex; gap:4px; font-size:0.75rem;">
                            <span style="color:${part.status_ru || (part.description && part.description.ru) ? '#16A34A' : '#EF4444'}; font-weight:700;">RU</span>
                            <span style="color:#CBD5E1;">•</span>
                            <span style="color:${part.status_az || (part.description && part.description.az) ? '#16A34A' : '#EF4444'}; font-weight:700;">AZ</span>
                            <span style="color:#CBD5E1;">•</span>
                            <span style="color:${part.status_en || (part.description && part.description.en) ? '#16A34A' : '#EF4444'}; font-weight:700;">EN</span>
                        </div>
                    </td>
                    <td>
                        <div class="tbl-actions">
                            <button class="btn-action btn-action-edit" onclick="adminApp.openPartnerModal('${part.id}')" title="Редактировать">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn-action btn-action-del" onclick="adminApp.deletePartner('${part.id}')" title="Удалить">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    openPartnerModal(partnerId = null) {
        const cleanId = partnerId ? String(partnerId).trim() : null;
        this.editingPartnerId = cleanId;

        const hiddenIdInput = document.getElementById('partner-edit-id');
        if (hiddenIdInput) hiddenIdInput.value = cleanId || '';

        const modal = document.getElementById('modal-partner-edit');
        const titleEl = document.getElementById('mpart-modal-title');

        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };

        if (cleanId) {
            const partner = window.dataStore ? window.dataStore.getPartnerById(cleanId) : null;
            if (!partner) return;
            if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color:#6366F1;"></i> <span>Редактировать партнера: <strong>${partner.name}</strong></span>`;

            setVal('partner-name', partner.name);
            setVal('partner-country', partner.country);
            setVal('partner-logo-url', partner.logo);
            
            const prev = document.getElementById('partner-logo-preview');
            if (prev) prev.src = partner.logo || 'images/logo.png';

            setVal('partner-banner-url', partner.banner || partner.hero_bg || '');
            const bannerPrev = document.getElementById('partner-banner-preview');
            if (bannerPrev) bannerPrev.src = partner.banner || partner.hero_bg || 'images/hero/slide_1_casings.jpg';

            setVal('partner-website', partner.website);

            const statusCheckbox = document.getElementById('partner-status-active');
            if (statusCheckbox) statusCheckbox.checked = partner.status !== 'draft';

            // Multilingual fields
            setVal('partner-status-az', partner.status_az || (partner.status_text && partner.status_text.az));
            setVal('partner-status-ru', partner.status_ru || (partner.status_text && partner.status_text.ru));
            setVal('partner-status-en', partner.status_en || (partner.status_text && partner.status_text.en));

            setVal('partner-cat-az', partner.category_az || (partner.category && partner.category.az));
            setVal('partner-cat-ru', partner.category_ru || (partner.category && partner.category.ru));
            setVal('partner-cat-en', partner.category_en || (partner.category && partner.category.en));

            setVal('partner-desc-az', partner.description_az || (partner.description && partner.description.az));
            setVal('partner-desc-ru', partner.description_ru || (partner.description && partner.description.ru));
            setVal('partner-desc-en', partner.description_en || (partner.description && partner.description.en));
        } else {
            if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-plus-circle" style="color:#16A34A;"></i> <span>Добавить партнера</span>`;
            const form = document.getElementById('form-partner-edit');
            if (form) form.reset();
            if (hiddenIdInput) hiddenIdInput.value = '';
            const prev = document.getElementById('partner-logo-preview');
            if (prev) prev.src = 'images/logo.png';
            const bannerPrev = document.getElementById('partner-banner-preview');
            if (bannerPrev) bannerPrev.src = 'images/hero/slide_1_casings.jpg';
            const statusCheckbox = document.getElementById('partner-status-active');
            if (statusCheckbox) statusCheckbox.checked = true;
        }

        // Update live field highlights and status badges
        this.updateFieldHighlights();

        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
        }
    }

    savePartnerForm() {
        const getVal = (id) => (document.getElementById(id)?.value || '').trim();

        const name = getVal('partner-name');
        const country = getVal('partner-country');
        const logo = getVal('partner-logo-url') || 'images/logo.png';
        const banner = getVal('partner-banner-url') || '';
        const website = getVal('partner-website');
        const isActive = document.getElementById('partner-status-active')?.checked ?? true;

        const hiddenId = (document.getElementById('partner-edit-id')?.value || '').trim();
        const targetId = hiddenId || (this.editingPartnerId ? String(this.editingPartnerId).trim() : null) || ('partner-' + (name ? name.toLowerCase().replace(/[^a-z0-9]/g, '-') : Date.now()));

        const statusAz = getVal('partner-status-az');
        const statusRu = getVal('partner-status-ru');
        const statusEn = getVal('partner-status-en');

        const catAz = getVal('partner-cat-az');
        const catRu = getVal('partner-cat-ru');
        const catEn = getVal('partner-cat-en');

        const descAz = getVal('partner-desc-az');
        const descRu = getVal('partner-desc-ru');
        const descEn = getVal('partner-desc-en');

        if (!name) {
            this.showToast('Пожалуйста, введите название компании / бренда!', 'error');
            return;
        }

        const partnerData = {
            id: targetId,
            name: name,
            country: country,
            logo: logo,
            banner: banner,
            hero_bg: banner,
            status: isActive ? 'active' : 'draft',
            website: website,

            // Structured multilingual objects
            description: {
                az: descAz || descRu,
                ru: descRu || descAz,
                en: descEn || descRu || descAz
            },
            category: {
                az: catAz || catRu,
                ru: catRu || catAz,
                en: catEn || catRu || catAz
            },
            status_text: {
                az: statusAz || statusRu,
                ru: statusRu || statusAz,
                en: statusEn || statusRu || statusAz
            },

            // Flat backward-compatibility properties
            status_az: statusAz || statusRu || 'Rəsmi distribyutor',
            status_ru: statusRu || statusAz || 'Официальный дистрибьютор',
            status_en: statusEn || statusRu || statusAz || 'Official distributor',
            category_az: catAz || catRu,
            category_ru: catRu || catAz,
            category_en: catEn || catRu || catAz,
            description_az: descAz || descRu,
            description_ru: descRu || descAz,
            description_en: descEn || descRu || descAz
        };

        if (window.dataStore) {
            window.dataStore.savePartner(partnerData);
        }
        this.editingPartnerId = null;
        const hiddenIdInput = document.getElementById('partner-edit-id');
        if (hiddenIdInput) hiddenIdInput.value = '';

        this.populatePartnersDropdown();
        this.closeModal('modal-partner-edit');
        this.renderAll();
        this.showToast('Партнер успешно сохранен!', 'success');
    }

    deletePartner(id) {
        if (confirm('Вы уверены, что хотите удалить этого партнера?')) {
            if (window.dataStore) window.dataStore.deletePartner(id);
            this.populatePartnersDropdown();
            this.renderAll();
            this.showToast('Партнер удален', 'info');
        }
    }

    // ==========================================
    // News & Events Management
    // ==========================================
    renderNewsTable() {
        const tbody = document.getElementById('admin-news-tbody');
        if (!tbody) return;

        const newsList = window.dataStore ? window.dataStore.getNews() : [];

        if (newsList.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem; color: #94A3B8;">Новости не найдены</td></tr>`;
            return;
        }

        tbody.innerHTML = newsList.map((item, idx) => {
            const hasRu = !!(item.title_ru || item.content_ru);
            const hasAz = !!(item.title_az || item.content_az);
            const hasEn = !!(item.title_en || item.content_en);
            const isActive = item.status !== 'draft';

            return `
                <tr>
                    <td>${idx + 1}</td>
                    <td>
                        <div class="item-main-cell">
                            <img src="${item.image_local || item.image || 'images/logo.png'}" class="item-thumb-sm" alt="" onerror="this.src='images/logo.png'" style="object-fit:cover; border-radius:6px;">
                            <div>
                                <span class="item-title-bold">${item.title_ru || item.title_az || item.title_en || 'Без названия'}</span>
                                <span class="item-subtitle-muted">${item.title_az || item.title_en || ''}</span>
                            </div>
                        </div>
                    </td>
                    <td><code style="font-size:0.82rem; font-weight:600; color:#334155;">${item.date || '—'}</code></td>
                    <td>
                        <div style="display:flex; gap:4px; font-size:0.75rem;">
                            <span style="color:${hasRu ? '#16A34A' : '#EF4444'}; font-weight:700;">RU</span>
                            <span style="color:#CBD5E1;">•</span>
                            <span style="color:${hasAz ? '#16A34A' : '#EF4444'}; font-weight:700;">AZ</span>
                            <span style="color:#CBD5E1;">•</span>
                            <span style="color:${hasEn ? '#16A34A' : '#EF4444'}; font-weight:700;">EN</span>
                        </div>
                    </td>
                    <td>
                        <span class="badge ${isActive ? 'badge-active' : 'badge-draft'}" style="background:${isActive ? '#DCFCE7' : '#F1F5F9'}; color:${isActive ? '#15803D' : '#64748B'}; font-weight:700; padding:3px 8px; border-radius:12px; font-size:0.75rem;">
                            ${isActive ? '🟢 Активна' : '⚪ Черновик'}
                        </span>
                    </td>
                    <td>
                        <div class="tbl-actions">
                            <button class="btn-action btn-action-edit" onclick="adminApp.openNewsModal('${item.id}')" title="Редактировать">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn-action btn-action-del" onclick="adminApp.deleteNews('${item.id}')" title="Удалить">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    openNewsModal(newsId = null) {
        const cleanId = newsId ? String(newsId).trim() : null;
        this.editingNewsId = cleanId;

        const hiddenIdInput = document.getElementById('news-edit-id');
        if (hiddenIdInput) hiddenIdInput.value = cleanId || '';

        const modal = document.getElementById('modal-news-edit');
        const titleEl = document.getElementById('mnews-modal-title');

        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };

        if (cleanId) {
            const item = window.dataStore ? window.dataStore.getNewsById(cleanId) : null;
            if (!item) return;
            if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-pen-to-square" style="color:#10B981;"></i> <span>Редактировать новость</span>`;

            setVal('news-title-az', item.title_az);
            setVal('news-title-ru', item.title_ru);
            setVal('news-title-en', item.title_en);
            setVal('news-date', item.date);
            setVal('news-image-url', item.image_local || item.image);
            
            const prev = document.getElementById('news-img-preview');
            if (prev) prev.src = item.image_local || item.image || 'images/news/event_1.jpg';

            const statusCheckbox = document.getElementById('news-status-active');
            if (statusCheckbox) statusCheckbox.checked = item.status !== 'draft';

            setVal('news-summary-az', item.summary_az);
            setVal('news-summary-ru', item.summary_ru);
            setVal('news-summary-en', item.summary_en);

            setVal('news-content-az', item.content_az);
            setVal('news-content-ru', item.content_ru);
            setVal('news-content-en', item.content_en);
        } else {
            if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-plus-circle" style="color:#10B981;"></i> <span>Добавить новость</span>`;
            const form = document.getElementById('form-news-edit');
            if (form) form.reset();
            if (hiddenIdInput) hiddenIdInput.value = '';
            const prev = document.getElementById('news-img-preview');
            if (prev) prev.src = 'images/news/event_1.jpg';
            const statusCheckbox = document.getElementById('news-status-active');
            if (statusCheckbox) statusCheckbox.checked = true;
            setVal('news-date', new Date().toISOString().slice(0, 10));
        }

        this.updateFieldHighlights();

        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
        }
    }

    saveNewsForm() {
        const getVal = (id) => (document.getElementById(id)?.value || '').trim();

        const titleRu = getVal('news-title-ru');
        const titleAz = getVal('news-title-az');
        const titleEn = getVal('news-title-en');

        if (!titleRu && !titleAz && !titleEn) {
            this.showToast('Пожалуйста, введите заголовок новости хотя бы на одном языке!', 'error');
            return;
        }

        const hiddenId = (document.getElementById('news-edit-id')?.value || '').trim();
        const targetId = hiddenId || (this.editingNewsId ? String(this.editingNewsId).trim() : null) || ('news-' + Date.now());
        const isActive = document.getElementById('news-status-active')?.checked ?? true;
        const image = getVal('news-image-url') || 'images/news/event_1.jpg';

        const newsData = {
            id: targetId,
            status: isActive ? 'active' : 'draft',
            title_az: titleAz || titleRu || titleEn,
            title_ru: titleRu || titleAz || titleEn,
            title_en: titleEn || titleRu || titleAz,
            date: getVal('news-date') || new Date().toISOString().slice(0, 10),
            image_local: image,
            image: image,
            summary_az: getVal('news-summary-az'),
            summary_ru: getVal('news-summary-ru'),
            summary_en: getVal('news-summary-en'),
            content_az: getVal('news-content-az') || getVal('news-summary-az'),
            content_ru: getVal('news-content-ru') || getVal('news-summary-ru'),
            content_en: getVal('news-content-en') || getVal('news-summary-en')
        };

        if (window.dataStore) {
            window.dataStore.saveNews(newsData);
        }
        this.editingNewsId = null;
        const hiddenIdInput = document.getElementById('news-edit-id');
        if (hiddenIdInput) hiddenIdInput.value = '';

        this.closeModal('modal-news-edit');
        this.renderAll();
        this.showToast('Новость успешно сохранена!', 'success');
    }

    deleteNews(id) {
        if (confirm('Вы уверены, что хотите удалить эту новость?')) {
            if (window.dataStore) window.dataStore.deleteNews(id);
            this.renderAll();
            this.showToast('Новость удалена', 'info');
        }
    }

    // ==========================================
    // Team & Leadership Management
    // ==========================================
    renderTeamTable() {
        const tbody = document.getElementById('admin-team-tbody');
        if (!tbody) return;

        const team = window.dataStore ? window.dataStore.getTeam() : [];

        if (team.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem; color: #94A3B8;">Сотрудники не найдены</td></tr>`;
            return;
        }

        tbody.innerHTML = team.map((item, idx) => {
            const hasRu = !!item.name_ru;
            const hasAz = !!item.name_az;
            const hasEn = !!item.name_en;
            const isLeader = Boolean(item.is_leader === true || item.is_leader === 'true');
            const isActive = item.status !== 'draft';

            return `
                <tr>
                    <td>${idx + 1}</td>
                    <td>
                        <div class="item-main-cell">
                            <img src="${item.image_local || item.image || 'images/team/director.jpg'}" class="item-thumb-sm" alt="" onerror="this.src='images/logo.png'" style="object-fit:cover; border-radius:8px; border:1px solid #CBD5E1;">
                            <div>
                                <span class="item-title-bold">${item.name_ru || item.name_az || item.name_en || 'Без имени'}</span>
                                <span class="item-subtitle-muted">${item.name_az || item.name_en || ''}</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span style="font-weight:600; color:#334155; font-size:0.85rem;">${item.role_ru || item.role_az || item.role_en || '—'}</span>
                    </td>
                    <td>
                        <span class="badge" style="background:${isLeader ? '#FEF3C7' : '#F1F5F9'}; color:${isLeader ? '#D97706' : '#475569'}; font-weight:700; padding:4px 9px; border-radius:12px; font-size:0.75rem;">
                            ${isLeader ? '👑 Руководство (Director)' : 'Специалист'}
                        </span>
                    </td>
                    <td>
                        <span class="badge ${isActive ? 'badge-active' : 'badge-draft'}" style="background:${isActive ? '#DCFCE7' : '#F1F5F9'}; color:${isActive ? '#15803D' : '#64748B'}; font-weight:700; padding:3px 8px; border-radius:12px; font-size:0.75rem;">
                            ${isActive ? '🟢 Активен' : '⚪ Черновик'}
                        </span>
                    </td>
                    <td>
                        <div class="tbl-actions">
                            <button class="btn-action btn-action-edit" onclick="adminApp.openTeamModal('${item.id}')" title="Редактировать">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn-action btn-action-del" onclick="adminApp.deleteTeamMember('${item.id}')" title="Удалить">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    openTeamModal(memberId = null) {
        const cleanId = memberId ? String(memberId).trim() : null;
        this.editingTeamId = cleanId;

        const hiddenIdInput = document.getElementById('team-edit-id');
        if (hiddenIdInput) hiddenIdInput.value = cleanId || '';

        const modal = document.getElementById('modal-team-edit');
        const titleEl = document.getElementById('mteam-modal-title');

        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };

        if (cleanId) {
            const item = window.dataStore ? window.dataStore.getTeamById(cleanId) : null;
            if (!item) return;
            if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-user-pen" style="color:#3B82F6;"></i> <span>Редактировать сотрудника</span>`;

            setVal('team-name-ru', item.name_ru);
            setVal('team-name-az', item.name_az);
            setVal('team-name-en', item.name_en);

            setVal('team-role-ru', item.role_ru);
            setVal('team-role-az', item.role_az);
            setVal('team-role-en', item.role_en);

            setVal('team-bio-ru', item.bio_ru);
            setVal('team-bio-az', item.bio_az);
            setVal('team-bio-en', item.bio_en);

            setVal('team-department', item.department || 'management');
            setVal('team-image-url', item.image_local || item.image);

            const prev = document.getElementById('team-img-preview');
            if (prev) prev.src = item.image_local || item.image || 'images/team/director.jpg';

            const fileInput = document.getElementById('team-file-input');
            if (fileInput) fileInput.value = '';

            const leaderCheckbox = document.getElementById('team-is-leader');
            if (leaderCheckbox) leaderCheckbox.checked = Boolean(item.is_leader === true || item.is_leader === 'true');

            const statusCheckbox = document.getElementById('team-status-active');
            if (statusCheckbox) statusCheckbox.checked = Boolean(item.status !== 'draft');

            this.populateDepartmentsDropdown(item.department || 'management');
        } else {
            if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-user-plus" style="color:#3B82F6;"></i> <span>Добавить сотрудника</span>`;
            const form = document.getElementById('form-team-edit');
            if (form) form.reset();
            if (hiddenIdInput) hiddenIdInput.value = '';
            const prev = document.getElementById('team-img-preview');
            if (prev) prev.src = 'images/team/director.jpg';
            const fileInput = document.getElementById('team-file-input');
            if (fileInput) fileInput.value = '';
            const statusCheckbox = document.getElementById('team-status-active');
            if (statusCheckbox) statusCheckbox.checked = true;
            const leaderCheckbox = document.getElementById('team-is-leader');
            if (leaderCheckbox) leaderCheckbox.checked = false;

            this.populateDepartmentsDropdown('management');
        }

        this.updateFieldHighlights();

        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
        }
    }

    saveTeamForm() {
        const getVal = (id) => (document.getElementById(id)?.value || '').trim();

        const nameRu = getVal('team-name-ru');
        const nameAz = getVal('team-name-az');
        const nameEn = getVal('team-name-en');

        if (!nameRu && !nameAz && !nameEn) {
            this.showToast('Пожалуйста, введите имя сотрудника хотя бы на одном языке!', 'error');
            return;
        }

        const hiddenId = (document.getElementById('team-edit-id')?.value || '').trim();
        const editingId = this.editingTeamId ? String(this.editingTeamId).trim() : '';
        const targetId = hiddenId || editingId || ('team-' + Date.now());

        const isLeader = Boolean(document.getElementById('team-is-leader')?.checked);
        const isActive = Boolean(document.getElementById('team-status-active')?.checked);
        const image = getVal('team-image-url') || 'images/team/director.jpg';
        const department = getVal('team-department') || 'management';

        const memberData = {
            id: targetId,
            name_ru: nameRu || nameAz || nameEn,
            name_az: nameAz || nameRu || nameEn,
            name_en: nameEn || nameRu || nameAz,
            role_ru: getVal('team-role-ru'),
            role_az: getVal('team-role-az'),
            role_en: getVal('team-role-en'),
            bio_ru: getVal('team-bio-ru'),
            bio_az: getVal('team-bio-az'),
            bio_en: getVal('team-bio-en'),
            department: department,
            is_leader: isLeader,
            status: isActive ? 'active' : 'draft',
            image_local: image,
            image: image
        };

        if (window.dataStore) {
            window.dataStore.saveTeamMember(memberData);
        }
        this.editingTeamId = null;
        const hiddenIdInput = document.getElementById('team-edit-id');
        if (hiddenIdInput) hiddenIdInput.value = '';

        this.closeModal('modal-team-edit');
        this.renderAll();
        this.showToast('Сотрудник успешно сохранен!', 'success');
    }

    deleteTeamMember(id) {
        if (confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
            if (window.dataStore) window.dataStore.deleteTeamMember(id);
            this.renderAll();
            this.showToast('Сотрудник удален', 'info');
        }
    }

    // ==========================================
    // About Page Content Form
    // ==========================================
    renderAboutForm() {
        const about = window.dataStore ? window.dataStore.getAbout() : {};

        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };

        setVal('about-badge-ru', about.badge_ru);
        setVal('about-badge-az', about.badge_az);
        setVal('about-badge-en', about.badge_en);

        setVal('about-title-ru', about.title_ru);
        setVal('about-title-az', about.title_az);
        setVal('about-title-en', about.title_en);

        setVal('about-subtitle-ru', about.subtitle_ru);
        setVal('about-subtitle-az', about.subtitle_az);
        setVal('about-subtitle-en', about.subtitle_en);

        setVal('about-lead-ru', about.lead_ru);
        setVal('about-lead-az', about.lead_az);
        setVal('about-lead-en', about.lead_en);

        setVal('about-quote-q-ru', about.quote_q_ru);
        setVal('about-quote-q-az', about.quote_q_az);
        setVal('about-quote-q-en', about.quote_q_en);

        setVal('about-quote-a-ru', about.quote_a_ru);
        setVal('about-quote-a-az', about.quote_a_az);
        setVal('about-quote-a-en', about.quote_a_en);

        setVal('about-delivery-ru', about.delivery_ru);
        setVal('about-delivery-az', about.delivery_az);
        setVal('about-delivery-en', about.delivery_en);

        this.updateFieldHighlights();
    }

    saveAboutForm() {
        const getVal = (id) => (document.getElementById(id)?.value || '').trim();

        const aboutData = {
            badge_ru: getVal('about-badge-ru'),
            badge_az: getVal('about-badge-az'),
            badge_en: getVal('about-badge-en'),

            title_ru: getVal('about-title-ru'),
            title_az: getVal('about-title-az'),
            title_en: getVal('about-title-en'),

            subtitle_ru: getVal('about-subtitle-ru'),
            subtitle_az: getVal('about-subtitle-az'),
            subtitle_en: getVal('about-subtitle-en'),

            lead_ru: getVal('about-lead-ru'),
            lead_az: getVal('about-lead-az'),
            lead_en: getVal('about-lead-en'),

            quote_q_ru: getVal('about-quote-q-ru'),
            quote_q_az: getVal('about-quote-q-az'),
            quote_q_en: getVal('about-quote-q-en'),

            quote_a_ru: getVal('about-quote-a-ru'),
            quote_a_az: getVal('about-quote-a-az'),
            quote_a_en: getVal('about-quote-a-en'),

            delivery_ru: getVal('about-delivery-ru'),
            delivery_az: getVal('about-delivery-az'),
            delivery_en: getVal('about-delivery-en')
        };

        if (window.dataStore) {
            window.dataStore.saveAbout(aboutData);
        }
        this.renderAboutForm();
        this.showToast('Тексты страницы «О компании» успешно сохранены!', 'success');
    }

    async autoTranslateAbout() {
        const translateBtn = document.getElementById('btn-auto-translate-about');
        if (translateBtn) {
            translateBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Переводим тексты...</span>`;
            translateBtn.style.opacity = '0.85';
            translateBtn.disabled = true;
        }

        try {
            const fields = ['badge', 'title', 'subtitle', 'lead', 'quote-q', 'quote-a', 'delivery'];

            for (const f of fields) {
                const ruEl = document.getElementById(`about-${f}-ru`);
                const azEl = document.getElementById(`about-${f}-az`);
                const enEl = document.getElementById(`about-${f}-en`);

                const ruVal = (ruEl?.value || '').trim();
                const azVal = (azEl?.value || '').trim();
                const enVal = (enEl?.value || '').trim();

                // Determine primary source text
                const srcText = ruVal || azVal || enVal;
                const srcLang = ruVal ? 'ru' : (azVal ? 'az' : 'en');

                if (srcText) {
                    if (ruEl && !ruEl.value.trim() && srcLang !== 'ru') {
                        ruEl.value = await this.translateUniversal(srcText, srcLang, 'ru');
                    }
                    if (azEl && !azEl.value.trim() && srcLang !== 'az') {
                        azEl.value = await this.translateUniversal(srcText, srcLang, 'az');
                    }
                    if (enEl && !enEl.value.trim() && srcLang !== 'en') {
                        enEl.value = await this.translateUniversal(srcText, srcLang, 'en');
                    }
                }
            }

            this.updateFieldHighlights();
            this.showToast('✨ Тексты страницы «О компании» успешно переведены на все языки!', 'success');
        } catch (e) {
            console.error('About translation error:', e);
            this.showToast('Перевод текстов завершен', 'info');
        } finally {
            if (translateBtn) {
                translateBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> <span>✨ Авто-перевод (на все языки)</span>`;
                translateBtn.style.opacity = '1';
                translateBtn.disabled = false;
            }
        }
    }

    // ==========================================
    // Settings Form
    // ==========================================
    renderSettingsForm() {
        const settings = window.dataStore ? window.dataStore.getSettings() : {};

        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };

        setVal('set-phone', settings.phone || '+994 55 327-76-55');
        setVal('set-email', settings.email || 'info@casaratoglu.az');
        setVal('set-admin-pass', settings.admin_password_hash || 'admin123');
        setVal('set-addr-az', settings.address_az || 'Bakı ş., Nərimanov r-nu, Əhməd Rəcəbli 25');
        setVal('set-addr-ru', settings.address_ru || 'г. Баку, Наримановский р-н, ул. Ахмеда Раджабли 25');
        setVal('set-addr-en', settings.address_en || 'Baku, Narimanov dist., 25 Ahmad Rajabli str.');
    }

    saveSettingsForm() {
        const getVal = (id) => (document.getElementById(id)?.value || '').trim();

        const phone = getVal('set-phone');
        const email = getVal('set-email');
        const pass = getVal('set-admin-pass');
        const addrAz = getVal('set-addr-az');
        const addrRu = getVal('set-addr-ru');
        const addrEn = getVal('set-addr-en');

        const settings = {
            phone: phone,
            phone_clean: phone.replace(/[^0-9+]/g, ''),
            email: email,
            admin_password_hash: pass,
            address_az: addrAz,
            address_ru: addrRu,
            address_en: addrEn,
            whatsapp: `https://wa.me/${phone.replace(/[^0-9]/g, '')}`
        };

        if (window.dataStore) {
            window.dataStore.saveSettings(settings);
        }
        this.showToast('Настройки успешно сохранены!', 'success');
    }

    exportData() {
        if (!window.dataStore) return;
        const json = window.dataStore.exportBackup();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cesaretoglu-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        this.showToast('Резервная копия базы данных скачана!', 'success');
    }

    importData(fileInput) {
        const file = fileInput.files && fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const success = window.dataStore ? window.dataStore.importBackup(e.target.result) : false;
            if (success) {
                this.renderAll();
                this.showToast('База данных успешно восстановлена!', 'success');
            } else {
                this.showToast('Ошибка при чтении файла JSON!', 'error');
            }
        };
        reader.readAsText(file);
    }

    resetDefaults() {
        if (confirm('ВНИМАНИЕ! Это действие сбросит все изменения к начальным заводским данным. Продолжить?')) {
            if (window.dataStore) window.dataStore.resetToDefaults();
            this.renderAll();
            this.showToast('База данных сброшена к начальному состоянию!', 'info');
        }
    }

    // ==========================================
    // UI Helpers
    // ==========================================
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    showToast(msg, type = 'info') {
        let container = document.getElementById('admin-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'admin-toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        // Prevent duplicate consecutive toasts with identical text
        const existingToasts = container.querySelectorAll ? container.querySelectorAll('.toast-msg') : [];
        for (const t of existingToasts) {
            if (t.textContent && t.textContent.includes(msg)) {
                return;
            }
        }

        const iconMap = {
            success: 'fa-circle-check',
            error: 'fa-circle-exclamation',
            info: 'fa-circle-info'
        };
        const icon = iconMap[type] || 'fa-circle-info';

        const toast = document.createElement('div');
        toast.className = `toast-msg toast-${type}`;
        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${msg}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
            }, 300);
        }, 3000);
    }
}

// Bootstrap Admin
const initAdminApp = () => {
    if (typeof window !== 'undefined' && !window.adminApp) {
        window.adminApp = new AdminApp();
        window.adminApp.init();
    }
};

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAdminApp);
    } else {
        initAdminApp();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminApp;
}
