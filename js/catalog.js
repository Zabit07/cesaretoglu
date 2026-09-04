/**
 * Cəsarətoğlu MMC — Product Catalog Module
 * Interactive Dropdown / Modal Catalog Browser & Specifications Viewer
 * (Compact, fast, contact-focused with Trilingual AZ / RU / EN support)
 */

const CatalogModule = {
    currentCategory: 'all',
    currentPartner: 'all',
    searchQuery: '',
    activeProductId: null,

    init() {
        this.bindEvents();
        this.renderPartnerSelect();
        this.renderCategoryTabs();
        this.renderProducts();
    },

    bindEvents() {
        // Live Search Input (input, keyup, search, change events)
        document.querySelectorAll('.catalog-search-input').forEach(input => {
            const handleSearch = (e) => {
                const val = e.target.value || '';
                this.searchQuery = val.trim().toLowerCase();

                // Sync all search inputs across the page
                document.querySelectorAll('.catalog-search-input').forEach(i => {
                    if (i !== e.target && i.value !== val) i.value = val;
                });

                // Toggle visibility of clear buttons (✕)
                document.querySelectorAll('.catalog-clear-search').forEach(btn => {
                    btn.style.display = this.searchQuery ? 'inline-flex' : 'none';
                });

                this.renderProducts();
            };

            input.addEventListener('input', handleSearch);
            input.addEventListener('keyup', handleSearch);
            input.addEventListener('search', handleSearch);
            input.addEventListener('change', handleSearch);
        });

        // Clear Search Buttons (Cross ✕)
        document.querySelectorAll('.catalog-clear-search').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.catalog-search-input').forEach(i => {
                    i.value = '';
                });
                this.searchQuery = '';
                document.querySelectorAll('.catalog-clear-search').forEach(b => {
                    b.style.display = 'none';
                });
                this.renderProducts();
            });
        });

        // Partner Dropdown Filter
        document.querySelectorAll('.catalog-partner-select').forEach(select => {
            select.addEventListener('change', (e) => {
                this.onPartnerChange(e.target.value);
            });
        });

        // Product Specs Modal Events
        const modalClose = document.getElementById('product-modal-close');
        const modalBackdrop = document.getElementById('product-modal');
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', (e) => {
                if (e.target === modalBackdrop) this.closeModal();
            });
        }

        // Full Interactive Catalog Modal Close
        const catModalClose = document.getElementById('catalog-modal-close');
        const catModalBackdrop = document.getElementById('catalog-interactive-modal');
        if (catModalClose) {
            catModalClose.addEventListener('click', () => this.closeCatalogModal());
        }
        if (catModalBackdrop) {
            catModalBackdrop.addEventListener('click', (e) => {
                if (e.target === catModalBackdrop) this.closeCatalogModal();
            });
        }

        // Global Event Delegation for Product Cards
        document.addEventListener('click', (e) => {
            const prodCard = e.target.closest('.product-card');
            if (prodCard) {
                if (e.target.closest('a[href^="tel:"]') || e.target.closest('a[href^="mailto:"]')) {
                    return;
                }
                const prodId = prodCard.dataset.productId || prodCard.getAttribute('data-product-id');
                if (prodId) {
                    this.openModal(prodId);
                }
            }
        });
    },

    onPartnerChange(partnerValue) {
        this.currentPartner = partnerValue || 'all';
        // Sync any select elements on page
        document.querySelectorAll('.catalog-partner-select').forEach(s => {
            s.value = this.currentPartner;
        });
        this.renderProducts();
    },

    openCatalogModal(category = 'all', partner = 'all') {
        this.currentCategory = category || 'all';
        this.currentPartner = partner || 'all';
        this.searchQuery = '';

        // Reset inputs
        document.querySelectorAll('.catalog-search-input').forEach(i => i.value = '');
        document.querySelectorAll('.catalog-clear-search').forEach(b => b.style.display = 'none');
        
        this.renderPartnerSelect();
        this.renderCategoryTabs();
        this.renderProducts();

        const catModal = document.getElementById('catalog-interactive-modal');
        if (catModal) {
            catModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    closeCatalogModal() {
        const catModal = document.getElementById('catalog-interactive-modal');
        if (catModal) {
            catModal.classList.remove('active');
            const otherActive = document.querySelector('.modal-backdrop.active');
            if (!otherActive) {
                document.body.style.overflow = '';
            }
        }
        if (window.location.hash && (window.location.hash.startsWith('#catalog') || window.location.hash.startsWith('#category'))) {
            try {
                if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, '', window.location.pathname + window.location.search);
                }
            } catch(e){}
        }
    },

    setCategory(category) {
        this.currentCategory = category || 'all';
        
        // Update active tab styles
        document.querySelectorAll('.catalog-tab-btn').forEach(tab => {
            if (tab.dataset.category === this.currentCategory) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        this.renderProducts();
    },

    filterByPartner(partnerName) {
        this.openCatalogModal('all', partnerName);
    },

    // Helper: Match product category dynamically
    isProductInCategory(product, categoryId, categoryObj = null) {
        if (!product || !categoryId) return false;
        if (categoryId === 'all') return true;

        const prodCat = (product.category || '').toLowerCase().trim();
        const prodCatAz = (product.category_az || '').toLowerCase().trim();
        const prodCatRu = (product.category_ru || '').toLowerCase().trim();
        const prodCatEn = (product.category_en || '').toLowerCase().trim();
        const targetId = String(categoryId).toLowerCase().trim();

        if (prodCat === targetId) return true;

        if (categoryObj) {
            const catAz = (categoryObj.title_az || (categoryObj.title && categoryObj.title.az) || '').toLowerCase().trim();
            const catRu = (categoryObj.title_ru || (categoryObj.title && categoryObj.title.ru) || '').toLowerCase().trim();
            const catEn = (categoryObj.title_en || (categoryObj.title && categoryObj.title.en) || '').toLowerCase().trim();

            if (catAz && (prodCat === catAz || prodCatAz === catAz)) return true;
            if (catRu && (prodCat === catRu || prodCatRu === catRu)) return true;
            if (catEn && (prodCat === catEn || prodCatEn === catEn)) return true;
        }

        const aliases = {
            casings: ['casings', 'qabıqlar', 'qabiqlar', 'kolbasa qabıqları', 'колбасные оболочки', 'оболочки', 'sausage casings'],
            spices: ['spices', 'ədviyyatlar', 'edviyyatlar', 'специи', 'специи и пищевые ингредиенты', 'spices & food ingredients', 'spices & seasonings'],
            packaging: ['packaging', 'plyonkalar', 'пленки', 'пленки и упаковка', 'plyonkalar və qablaşdırma', 'films & packaging', 'films'],
            additives: ['additives', 'qarışıqlar', 'qarisinlar', 'смеси', 'комплексные смеси', 'kompleks qarışıqlar', 'complex blends', 'blends']
        };

        if (aliases[targetId]) {
            return aliases[targetId].some(a => prodCat === a || prodCatRu === a || prodCatAz === a || prodCatEn === a);
        }

        return false;
    },

    // Helper: Match product partner dynamically
    isProductInPartner(product, partnerName) {
        if (!product || !partnerName) return false;
        if (partnerName === 'all') return true;

        const prodPartner = (product.partner || '').toLowerCase().trim();
        const target = partnerName.toLowerCase().trim();

        return prodPartner === target || prodPartner.includes(target) || target.includes(prodPartner);
    },

    renderPartnerSelect() {
        const lang = window.currentLang || 'az';
        const partners = window.dataStore ? window.dataStore.getPartners().filter(p => p.status !== 'draft') : [];
        const products = window.dataStore ? window.dataStore.getProducts().filter(p => p.status !== 'draft') : [];
        const allText = lang === 'az' ? 'Bütün brendlər' : (lang === 'ru' ? 'Все бренды' : 'All Brands');

        document.querySelectorAll('.catalog-partner-select').forEach(select => {
            const currentVal = this.currentPartner || 'all';

            let optionsHtml = `<option value="all" ${currentVal === 'all' ? 'selected' : ''}>${allText} (${products.length})</option>`;
            partners.forEach(partner => {
                const isSelected = (currentVal.toLowerCase() === partner.name.toLowerCase() ||
                                    currentVal.toLowerCase() === partner.id.toLowerCase() ||
                                    partner.name.toLowerCase().includes(currentVal.toLowerCase())) && currentVal !== 'all' ? 'selected' : '';

                const partnerProductCount = products.filter(p => this.isProductInPartner(p, partner.name)).length;

                optionsHtml += `<option value="${partner.name}" ${isSelected}>${partner.name} (${partnerProductCount})</option>`;
            });

            select.innerHTML = optionsHtml;
            select.value = this.currentPartner;
        });
    },

    renderCategoryTabs() {
        const lang = window.currentLang || 'az';
        const products = window.dataStore ? window.dataStore.getProducts().filter(p => p.status !== 'draft') : [];
        const storedCategories = window.dataStore ? window.dataStore.getCategories() : [];

        const getCategoryIcon = (catId) => {
            const map = {
                casings: 'fa-drumstick-bite',
                spices: 'fa-pepper-hot',
                additives: 'fa-mortar-pestle',
                packaging: 'fa-box-archive'
            };
            return map[catId] || 'fa-layer-group';
        };

        const allTab = {
            id: 'all',
            name_az: 'Bütün məhsullar',
            name_ru: 'Все товары',
            name_en: 'All Products',
            icon: 'fa-cubes',
            count: products.length
        };

        const dynamicCategories = [
            allTab,
            ...storedCategories.map(cat => ({
                id: cat.id,
                name_az: cat.title_az || (cat.title && cat.title.az) || cat.title_ru || cat.id,
                name_ru: cat.title_ru || (cat.title && cat.title.ru) || cat.title_az || cat.id,
                name_en: cat.title_en || (cat.title && cat.title.en) || cat.title_ru || cat.title_az || cat.id,
                icon: getCategoryIcon(cat.id),
                count: products.filter(p => this.isProductInCategory(p, cat.id, cat)).length
            }))
        ];

        document.querySelectorAll('.catalog-category-tabs-container').forEach(tabsContainer => {
            tabsContainer.innerHTML = dynamicCategories.map(cat => {
                let name = cat.name_az;
                if (lang === 'ru') name = cat.name_ru;
                if (lang === 'en') name = cat.name_en;

                const isActive = this.currentCategory === cat.id ? 'active' : '';

                return `
                    <button class="catalog-tab-btn ${isActive}" data-category="${cat.id}" onclick="CatalogModule.setCategory('${cat.id}')">
                        <i class="fa-solid ${cat.icon}"></i>
                        <span>${name}</span>
                        <span class="tab-count-badge">${cat.count}</span>
                    </button>
                `;
            }).join('');
        });
    },

    // Comprehensive multilingual, SKU, specs, and description search
    matchesSearchQuery(product, query) {
        if (!query) return true;
        const q = String(query).toLowerCase().trim();
        if (!q) return true;

        const terms = q.split(/\s+/).filter(Boolean);
        const searchableParts = [];

        // 1. Titles on all languages
        if (product.title) {
            if (typeof product.title === 'object') {
                if (product.title.ru) searchableParts.push(product.title.ru);
                if (product.title.az) searchableParts.push(product.title.az);
                if (product.title.en) searchableParts.push(product.title.en);
            } else {
                searchableParts.push(String(product.title));
            }
        }
        if (product.title_ru) searchableParts.push(product.title_ru);
        if (product.title_az) searchableParts.push(product.title_az);
        if (product.title_en) searchableParts.push(product.title_en);

        // 2. Artikul / SKU / Code / ID
        if (product.artikul) searchableParts.push(product.artikul);
        if (product.sku) searchableParts.push(product.sku);
        if (product.code) searchableParts.push(product.code);
        if (product.id) searchableParts.push(product.id);

        // 3. Partner / Brand
        if (product.partner) searchableParts.push(product.partner);

        // 4. Category
        if (product.category) searchableParts.push(product.category);
        if (product.category_ru) searchableParts.push(product.category_ru);
        if (product.category_az) searchableParts.push(product.category_az);
        if (product.category_en) searchableParts.push(product.category_en);

        // 5. Description on all languages
        if (product.description) {
            if (typeof product.description === 'object') {
                if (product.description.ru) searchableParts.push(product.description.ru);
                if (product.description.az) searchableParts.push(product.description.az);
                if (product.description.en) searchableParts.push(product.description.en);
            } else {
                searchableParts.push(String(product.description));
            }
        }
        if (product.description_ru) searchableParts.push(product.description_ru);
        if (product.description_az) searchableParts.push(product.description_az);
        if (product.description_en) searchableParts.push(product.description_en);

        // 6. Dynamic Specs (names and values on all languages)
        if (Array.isArray(product.specs)) {
            product.specs.forEach(s => {
                if (!s) return;
                if (s.name) searchableParts.push(s.name);
                if (s.value) searchableParts.push(s.value);
                if (s.name_ru) searchableParts.push(s.name_ru);
                if (s.name_az) searchableParts.push(s.name_az);
                if (s.name_en) searchableParts.push(s.name_en);
                if (s.value_ru) searchableParts.push(s.value_ru);
                if (s.value_az) searchableParts.push(s.value_az);
                if (s.value_en) searchableParts.push(s.value_en);
                if (s.key_ru) searchableParts.push(s.key_ru);
                if (s.key_az) searchableParts.push(s.key_az);
                if (s.key_en) searchableParts.push(s.key_en);
            });
        }

        // 7. Legacy Params and Structured Specs
        ['param1_ru', 'param1_az', 'param1_en', 'param2_ru', 'param2_az', 'param2_en', 'param3_ru', 'param3_az', 'param3_en'].forEach(k => {
            if (product[k]) searchableParts.push(product[k]);
        });

        if (product.specs_structured && typeof product.specs_structured === 'object') {
            Object.values(product.specs_structured).forEach(specObj => {
                if (specObj && typeof specObj === 'object') {
                    Object.values(specObj).forEach(val => {
                        if (val) searchableParts.push(String(val));
                    });
                } else if (specObj) {
                    searchableParts.push(String(specObj));
                }
            });
        }

        const fullHaystack = searchableParts.join(' ').toLowerCase();
        return terms.every(term => fullHaystack.includes(term));
    },

    renderProducts() {
        const containers = document.querySelectorAll('.catalog-products-render-target');
        const countDisplays = document.querySelectorAll('.catalog-results-count-target');

        const lang = window.currentLang || 'az';
        let products = window.dataStore ? window.dataStore.getProducts().filter(p => p.status !== 'draft') : [];
        const storedCategories = window.dataStore ? window.dataStore.getCategories() : [];

        // 1. Filter by category
        if (this.currentCategory && this.currentCategory !== 'all') {
            const matchedCategoryObj = storedCategories.find(c => c.id === this.currentCategory);
            products = products.filter(p => this.isProductInCategory(p, this.currentCategory, matchedCategoryObj));
        }

        // 2. Filter by partner
        if (this.currentPartner && this.currentPartner !== 'all') {
            products = products.filter(p => this.isProductInPartner(p, this.currentPartner));
        }

        // 3. Filter by search query (Live Multilingual Search)
        if (this.searchQuery) {
            products = products.filter(p => this.matchesSearchQuery(p, this.searchQuery));
        }

        // 4. Update count text dynamically
        countDisplays.forEach(el => {
            if (lang === 'az') el.textContent = `Tapılan məhsul: ${products.length}`;
            else if (lang === 'ru') el.textContent = `Найдено товаров: ${products.length}`;
            else el.textContent = `Products found: ${products.length}`;
        });

        containers.forEach(container => {
            if (products.length === 0) {
                const emptyTitle = lang === 'az' ? 'Axtarışınıza uyğun məhsul tapılmadı' : (lang === 'ru' ? 'По вашему запросу ничего не найдено' : 'No products match your search');
                const resetBtnText = lang === 'az' ? 'Filtrləri sıfırla' : (lang === 'ru' ? 'Сбросить фильтры' : 'Reset Filters');

                container.innerHTML = `
                    <div class="catalog-empty-state" style="grid-column: 1 / -1; padding: 2.5rem; text-align: center;">
                        <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; color: #94A3B8; margin-bottom: 0.8rem;"></i>
                        <h4 style="font-size: 1.1rem; color: #0F172A; margin-bottom: 0.5rem;">${emptyTitle}</h4>
                        <button class="btn btn-outline-primary btn-sm" onclick="CatalogModule.resetFilters()">
                            <i class="fa-solid fa-rotate-left"></i> ${resetBtnText}
                        </button>
                    </div>
                `;
                return;
            }

            const allCategories = window.dataStore ? window.dataStore.getCategories() : [];

            container.innerHTML = products.map(product => {
                let title = (product.title && typeof product.title === 'object') ? (product.title[lang] || product.title.ru || product.title.az || product.title.en) : null;
                
                if (!title) {
                    if (lang === 'ru') {
                        title = product.title_ru || product.title_az || product.title_en || '';
                    } else if (lang === 'en') {
                        title = product.title_en || product.title_ru || product.title_az || '';
                    } else {
                        title = product.title_az || product.title_ru || product.title_en || '';
                    }
                }

                // Resolve category name from DataStore categories or product properties
                let categoryName = '';
                const matchedCat = allCategories.find(c => c.id === product.category);
                if (matchedCat) {
                    categoryName = (lang === 'ru' ? (matchedCat.title_ru || (matchedCat.title && matchedCat.title.ru)) : (lang === 'en' ? (matchedCat.title_en || (matchedCat.title && matchedCat.title.en)) : (matchedCat.title_az || (matchedCat.title && matchedCat.title.az)))) || matchedCat.title_az || matchedCat.title_ru || '';
                }
                if (!categoryName) {
                    categoryName = (lang === 'ru' ? product.category_ru : (lang === 'en' ? product.category_en : product.category_az)) || product.category_ru || product.category_az || product.category || '';
                }

                let detailsText = lang === 'az' ? 'Xüsusiyyətlər' : (lang === 'ru' ? 'Характеристики' : 'Specifications');
                const img = product.image_local || product.image || 'images/logo.png';

                // Helper: extract localized value from {az, ru, en} object or plain string
                const getSpecVal = (val) => {
                    if (!val) return '';
                    if (typeof val === 'object') return val[lang] || val.ru || val.az || val.en || '';
                    return String(val).trim();
                };

                // ====== Dynamic specs array (product.specs) - TOP 3 PREVIEW ONLY ======
                let specsHtml = '';
                const specsArr = Array.isArray(product.specs) ? product.specs : [];

                if (specsArr.length > 0) {
                    // Strictly top 3 characteristics with leader dots for a clean, professional B2B layout
                    const rows = specsArr.slice(0, 3).map(s => {
                        // Pick localized name: try lang-specific field first, then fallback chain
                        const name = (
                            (lang === 'az' ? (s.name_az || s.name) :
                             lang === 'en' ? (s.name_en || s.name) :
                                             (s.name_ru || s.name)) || ''
                        ).trim();
                        const value = (
                            (lang === 'az' ? (s.value_az || s.value) :
                             lang === 'en' ? (s.value_en || s.value) :
                                             (s.value_ru || s.value)) || ''
                        ).trim();
                        if (!name && !value) return '';
                        const cleanName = name.replace(/:$/, '').trim();
                        return `
                            <div class="product-spec-row">
                                <span class="product-spec-label">${cleanName}</span>
                                <span class="product-spec-dots"></span>
                                <span class="product-spec-val">${value}</span>
                            </div>`;
                    }).join('');
                    specsHtml = `<div class="product-card-specs">${rows}</div>`;
                } else {
                    // ====== LEGACY FALLBACK: old param1/2/3 or specs_structured ======
                    const specs = product.specs_structured || {};

                    let p1 = (lang === 'ru' ? product.param1_ru : (lang === 'en' ? product.param1_en : product.param1_az)) || product.param1_ru || product.param1_az || product.param1_en || '';
                    let p2 = (lang === 'ru' ? product.param2_ru : (lang === 'en' ? product.param2_en : product.param2_az)) || product.param2_ru || product.param2_az || product.param2_en || '';
                    let p3 = (lang === 'ru' ? product.param3_ru : (lang === 'en' ? product.param3_en : product.param3_az)) || product.param3_ru || product.param3_az || product.param3_en || '';

                    if (!p1 && specs.dosage) { p1 = (lang === 'az' ? 'Dozalanma' : (lang === 'ru' ? 'Дозировка' : 'Dosage')) + ': ' + getSpecVal(specs.dosage); }
                    else if (!p1 && specs.smokePermeability) { p1 = (lang === 'az' ? 'Keçiricilik' : (lang === 'ru' ? 'Проницаемость' : 'Permeability')) + ': ' + getSpecVal(specs.smokePermeability); }
                    else if (!p1 && specs.materialType) { p1 = (lang === 'az' ? 'Material' : (lang === 'ru' ? 'Материал' : 'Material')) + ': ' + getSpecVal(specs.materialType); }

                    if (!p2 && specs.application) { p2 = (lang === 'az' ? 'Təyinatı' : (lang === 'ru' ? 'Назначение' : 'Application')) + ': ' + getSpecVal(specs.application); }
                    else if (!p2 && specs.overstuffing) { p2 = (lang === 'az' ? 'Doldurma' : (lang === 'ru' ? 'Фаршеемкость' : 'Overstuffing')) + ': ' + getSpecVal(specs.overstuffing); }
                    else if (!p2 && specs.caliber) { p2 = (lang === 'az' ? 'Kalibr' : (lang === 'ru' ? 'Калибр' : 'Caliber')) + ': ' + getSpecVal(specs.caliber); }

                    if (!p3 && specs.shelfLife) { p3 = (lang === 'az' ? 'Saxlama' : (lang === 'ru' ? 'Хранение' : 'Shelf Life')) + ': ' + getSpecVal(specs.shelfLife); }
                    else if (!p3 && specs.storage) { p3 = (lang === 'az' ? 'Saxlama' : (lang === 'ru' ? 'Хранение' : 'Storage')) + ': ' + getSpecVal(specs.storage); }

                    if (!p1 && !p2 && !p3) {
                        if (product.category === 'casings') {
                            p1 = lang === 'az' ? 'Kalibr: Stabil forma' : (lang === 'ru' ? 'Калибр: Стабильная форма' : 'Caliber: High uniformity');
                            p2 = lang === 'az' ? 'Təyinat: Bütün növ kolbasalar' : (lang === 'ru' ? 'Назначение: Для вареных и с/к колбас' : 'Application: Cooked & smoked sausages');
                            p3 = lang === 'az' ? 'Saxlama: Quru yerdə 24 ay' : (lang === 'ru' ? 'Хранение: В сухом месте 24 мес' : 'Storage: Dry place 24 months');
                        } else if (product.category === 'spices' || product.category === 'additives') {
                            p1 = lang === 'az' ? 'Dozalanma: 2–5 q/kq qiymə' : (lang === 'ru' ? 'Дозировка: 2–5 г/кг фарша' : 'Dosage: 2–5 g/kg meat');
                            p2 = lang === 'az' ? 'Təyinat: Ət emalı' : (lang === 'ru' ? 'Назначение: Мясопереработка' : 'Application: Meat processing');
                            p3 = lang === 'az' ? 'Saxlama: 0...+20 °C' : (lang === 'ru' ? 'Хранение: 0...+20 °C' : 'Storage: 0...+20 °C');
                        } else {
                            p1 = lang === 'az' ? 'Material: Yüksək baryerli PA/PE' : (lang === 'ru' ? 'Материал: Высокобарьерный PA/PE' : 'Material: High-barrier PA/PE');
                            p2 = lang === 'az' ? 'Təyinat: Vakuum və MAP' : (lang === 'ru' ? 'Назначение: Вакуум и МГС' : 'Usage: Vacuum & MAP');
                            p3 = lang === 'az' ? 'Saxlama: 15–25 °C' : (lang === 'ru' ? 'Хранение: 15–25 °C' : 'Storage: 15–25 °C');
                        }
                    }

                    const fmtRow = (text) => {
                        if (!text) return '';
                        let label = text, val = '';
                        if (text.includes(':')) {
                            const parts = text.split(':');
                            label = parts[0].trim();
                            val = parts.slice(1).join(':').trim();
                        }
                        return `
                            <div class="product-spec-row">
                                <span class="product-spec-label">${label}</span>
                                <span class="product-spec-dots"></span>
                                <span class="product-spec-val">${val}</span>
                            </div>`;
                    };
                    specsHtml = `<div class="product-card-specs">${fmtRow(p1)}${fmtRow(p2)}${fmtRow(p3)}</div>`;
                }

                return `
                    <div class="product-card" data-product-id="${product.id}">
                        <div class="product-card-thumb" onclick="CatalogModule.openModal('${product.id}')">
                            <img src="${img}" alt="${title}" loading="lazy" onerror="this.src='images/hero/slide_1_casings.jpg'">
                            <div class="product-partner-badge">
                                <span>${product.partner}</span>
                            </div>
                        </div>
                        <div class="product-card-info">
                            <span class="product-card-category">${categoryName}</span>
                            <h3 class="product-card-title" onclick="CatalogModule.openModal('${product.id}')" title="${title}">${title}</h3>
                            
                            <!-- Technical Characteristics Top-3 Preview -->
                            ${specsHtml}
                        </div>
                        <div class="product-card-actions">
                            <button class="btn btn-primary btn-sm product-details-btn" onclick="CatalogModule.openModal('${product.id}')" style="width:100%;">
                                <i class="fa-solid fa-circle-info"></i>
                                <span>${detailsText}</span>
                            </button>
                        </div>
                    </div>
                `;

            }).join('');
        });
    },

     openModal(id) {
        this.activeProductId = id;
        const product = window.dataStore.getProductById(id);
        if (!product) return;

        const lang = window.currentLang || 'az';
        const modal = document.getElementById('product-modal');
        if (!modal) return;

        let title = (product.title && typeof product.title === 'object') ? (product.title[lang] || product.title.ru || product.title.az || product.title.en) : null;
        let desc = (product.description && typeof product.description === 'object') ? (product.description[lang] || product.description.ru || product.description.az || product.description.en) : null;

        if (!title) {
            if (lang === 'ru') title = product.title_ru || product.title_az || product.title_en || '';
            else if (lang === 'en') title = product.title_en || product.title_ru || product.title_az || '';
            else title = product.title_az || product.title_ru || product.title_en || '';
        }

        if (!desc) {
            if (lang === 'ru') desc = product.description_ru || product.description_az || product.description_en || '';
            else if (lang === 'en') desc = product.description_en || product.description_ru || product.description_az || '';
            else desc = product.description_az || product.description_ru || product.description_en || '';
        }

        // Resolve category name from DataStore categories or product properties
        let categoryName = '';
        const allCategories = window.dataStore ? window.dataStore.getCategories() : [];
        const matchedCat = allCategories.find(c => c.id === product.category);
        if (matchedCat) {
            categoryName = (lang === 'ru' ? (matchedCat.title_ru || (matchedCat.title && matchedCat.title.ru)) : (lang === 'en' ? (matchedCat.title_en || (matchedCat.title && matchedCat.title.en)) : (matchedCat.title_az || (matchedCat.title && matchedCat.title.az)))) || matchedCat.title_az || matchedCat.title_ru || '';
        }
        if (!categoryName) {
            categoryName = (lang === 'ru' ? product.category_ru : (lang === 'en' ? product.category_en : product.category_az)) || product.category_ru || product.category_az || product.category || '';
        }

        const img = product.image_local || product.image || 'images/logo.png';

        document.getElementById('pm-title').textContent = title;
        document.getElementById('pm-partner').textContent = product.partner;
        document.getElementById('pm-category').textContent = categoryName;
        document.getElementById('pm-image').src = img;
        document.getElementById('pm-description').innerHTML = `<p>${(desc || '').replace(/\n/g, '</p><p>')}</p>`;

        // Render Complete Specifications Table (All items, without limit)
        const specsContainer = document.getElementById('pm-specs-table');
        if (specsContainer) {
            let specsList = Array.isArray(product.specs) ? product.specs : [];

            // Fallback for legacy products without specs array
            if (specsList.length === 0) {
                const legacyRows = [];
                if (product.param1_ru || product.param1_az || product.param1_en) {
                    legacyRows.push({
                        name_ru: 'Дозировка / Параметр 1', name_az: 'Dozalanma / Xüsusiyyət 1', name_en: 'Dosage / Feature 1',
                        value_ru: product.param1_ru || product.param1_az,
                        value_az: product.param1_az || product.param1_ru,
                        value_en: product.param1_en || product.param1_ru
                    });
                }
                if (product.param2_ru || product.param2_az || product.param2_en) {
                    legacyRows.push({
                        name_ru: 'Калибр / Параметр 2', name_az: 'Kalibr / Xüsusiyyət 2', name_en: 'Caliber / Feature 2',
                        value_ru: product.param2_ru || product.param2_az,
                        value_az: product.param2_az || product.param2_ru,
                        value_en: product.param2_en || product.param2_ru
                    });
                }
                if (product.param3_ru || product.param3_az || product.param3_en) {
                    legacyRows.push({
                        name_ru: 'Хранение / Параметр 3', name_az: 'Saxlama / Xüsusiyyət 3', name_en: 'Storage / Feature 3',
                        value_ru: product.param3_ru || product.param3_az,
                        value_az: product.param3_az || product.param3_ru,
                        value_en: product.param3_en || product.param3_ru
                    });
                }
                if (product.specs_structured && typeof product.specs_structured === 'object') {
                    const labelMap = {
                        dosage: { ru: 'Дозировка', az: 'Dozalanma', en: 'Dosage' },
                        application: { ru: 'Назначение', az: 'Təyinatı', en: 'Application' },
                        shelfLife: { ru: 'Срок хранения', az: 'Saxlama müddəti', en: 'Shelf Life' },
                        storage: { ru: 'Условия хранения', az: 'Saxlama şəraiti', en: 'Storage' },
                        caliber: { ru: 'Калибр', az: 'Kalibr', en: 'Caliber' },
                        overstuffing: { ru: 'Фаршеемкость', az: 'Doldurma', en: 'Overstuffing' },
                        smokePermeability: { ru: 'Проницаемость', az: 'Keçiricilik', en: 'Smoke Permeability' },
                        materialType: { ru: 'Материал', az: 'Material', en: 'Material' },
                        waterBinding: { ru: 'Влагосвязывавание', az: 'Su tutumu', en: 'Water Binding' },
                        proteinType: { ru: 'Тип белка', az: 'Zülal növü', en: 'Protein Type' }
                    };
                    Object.entries(product.specs_structured).forEach(([k, val]) => {
                        const labels = labelMap[k] || { ru: k, az: k, en: k };
                        const valRu = typeof val === 'object' ? (val.ru || val.az || val.en || '') : String(val);
                        const valAz = typeof val === 'object' ? (val.az || val.ru || val.en || '') : String(val);
                        const valEn = typeof val === 'object' ? (val.en || val.ru || val.az || '') : String(val);
                        if (valRu || valAz || valEn) {
                            legacyRows.push({
                                name_ru: labels.ru, name_az: labels.az, name_en: labels.en,
                                value_ru: valRu, value_az: valAz, value_en: valEn
                            });
                        }
                    });
                }
                specsList = legacyRows;
            }

            if (specsList.length > 0) {
                const rows = specsList.map(s => {
                    // Resolve localized name (supports both old key_* and new name_* formats)
                    let key = '';
                    if (lang === 'ru')      key = s.name_ru || s.key_ru || s.name || s.name_az || s.key_az || s.name_en || '';
                    else if (lang === 'en') key = s.name_en || s.key_en || s.name || s.name_ru || s.name_az || s.key_az || '';
                    else                   key = s.name_az || s.key_az || s.name || s.name_ru || s.name_en || '';

                    if (!key) return '';

                    // Resolve localized value
                    let val = '';
                    if (lang === 'ru')      val = s.value_ru || s.value || s.value_az || s.value_en || '';
                    else if (lang === 'en') val = s.value_en || s.value || s.value_ru || s.value_az || '';
                    else                   val = s.value_az || s.value || s.value_ru || s.value_en || '';
                    if (!val) val = '—';

                    return `<tr><th>${key}</th><td>${val}</td></tr>`;
                }).filter(Boolean).join('');

                specsContainer.innerHTML = rows
                    ? `<table class="specs-table"><tbody>${rows}</tbody></table>`
                    : '';
            } else {
                specsContainer.innerHTML = '';
            }
        }

        // Direct Contact Links
        let emailSubject = '';
        let emailBody = '';

        if (lang === 'az') {
            emailSubject = encodeURIComponent(`Məhsul sorğusu: ${title}`);
            emailBody = encodeURIComponent(`Salam!\n\nAşağıdakı məhsul barədə məlumat və qiymət təklifi almaq istəyirik:\nMəhsul: ${title}\nBrend: ${product.partner}`);
        } else if (lang === 'ru') {
            emailSubject = encodeURIComponent(`Запрос по продукту: ${title}`);
            emailBody = encodeURIComponent(`Здравствуйте!\n\nПросим предоставить информацию и коммерческое предложение по следующему продукту:\nНаименование: ${title}\nПроизводитель: ${product.partner}`);
        } else {
            emailSubject = encodeURIComponent(`Product Inquiry: ${title}`);
            emailBody = encodeURIComponent(`Hello!\n\nPlease provide detailed technical data and price offer for:\nProduct: ${title}\nBrand: ${product.partner}`);
        }

        const callBtn = document.getElementById('pm-call-btn');
        if (callBtn) callBtn.href = 'tel:+994553277655';

        const emailBtn = document.getElementById('pm-email-btn');
        if (emailBtn) emailBtn.href = `mailto:info@casaratoglu.az?subject=${emailSubject}&body=${emailBody}`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    refreshActiveModal() {
        const modal = document.getElementById('product-modal');
        if (modal && modal.classList.contains('active') && this.activeProductId) {
            this.openModal(this.activeProductId);
        }
    },

    closeModal() {
        this.activeProductId = null;
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.classList.remove('active');
            const otherActive = document.querySelector('.modal-backdrop.active');
            if (!otherActive) {
                document.body.style.overflow = '';
            }
        }
    }
};

window.CatalogModule = CatalogModule;
