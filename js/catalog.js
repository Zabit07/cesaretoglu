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

        // Re-render when Supabase cloud sync completes or updates
        document.addEventListener('dataStoreReady', () => {
            this.renderPartnerSelect();
            this.renderCategoryTabs();
            this.renderProducts();
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



    // =========================================================================
    // Robust Product Specifications Extractor (Supabase, Direct Props & Fallbacks)
    // =========================================================================
    extractProductSpecs(product, lang = 'az', maxItems = 3) {
        if (!product) return [];

        const rows = [];
        const seenLabels = new Set();

        const addRow = (label, val) => {
            if (!label || val === undefined || val === null) return;
            const cleanLabel = String(label).replace(/:$/, '').trim();
            let cleanVal = '';
            if (typeof val === 'object') {
                cleanVal = String(val[lang] || val.ru || val.az || val.en || '').trim();
            } else {
                cleanVal = String(val).trim();
            }
            if (!cleanLabel || !cleanVal || cleanVal === '—' || cleanVal === '-') return;
            const normKey = cleanLabel.toLowerCase();
            if (seenLabels.has(normKey)) return;
            seenLabels.add(normKey);
            rows.push({ label: cleanLabel, value: cleanVal });
        };

        // 1. Parse product.specs (Array, JSON string, or Object)
        let rawSpecs = product.specs;
        if (typeof rawSpecs === 'string') {
            try { rawSpecs = JSON.parse(rawSpecs); } catch(e) { rawSpecs = []; }
        }
        if (Array.isArray(rawSpecs)) {
            rawSpecs.forEach(s => {
                if (!s || typeof s !== 'object') return;
                let label = '';
                if (lang === 'ru')      label = s.name_ru || s.key_ru || s.name || s.key || s.label || s.title || s.name_az || s.name_en || '';
                else if (lang === 'en') label = s.name_en || s.key_en || s.name || s.key || s.label || s.title || s.name_ru || s.name_az || '';
                else                   label = s.name_az || s.key_az || s.name || s.key || s.label || s.title || s.name_ru || s.name_en || '';

                let val = '';
                if (lang === 'ru')      val = s.value_ru || s.val_ru || s.value || s.val || s.value_az || s.value_en || '';
                else if (lang === 'en') val = s.value_en || s.val_en || s.value || s.val || s.value_ru || s.value_az || '';
                else                   val = s.value_az || s.val_az || s.value || s.val || s.value_ru || s.value_en || '';

                addRow(label, val);
            });
        } else if (rawSpecs && typeof rawSpecs === 'object') {
            Object.entries(rawSpecs).forEach(([k, v]) => addRow(k, v));
        }

        // 2. Parse product.specs_structured (Object or JSON string)
        let structured = product.specs_structured;
        if (typeof structured === 'string') {
            try { structured = JSON.parse(structured); } catch(e) { structured = {}; }
        }
        if (structured && typeof structured === 'object') {
            const labelMap = {
                caliber:           { ru: 'Калибр', az: 'Kalibr', en: 'Caliber' },
                size:              { ru: 'Размер / Калибр', az: 'Ölçü / Kalibr', en: 'Size / Caliber' },
                metraj:            { ru: 'Метраж', az: 'Metraj', en: 'Reeling / Length' },
                meter:             { ru: 'Метраж', az: 'Metraj', en: 'Reeling / Length' },
                length:            { ru: 'Метраж / Длина', az: 'Metraj / Uzunluq', en: 'Length' },
                reeling:           { ru: 'Намотка', az: 'Yığım', en: 'Reeling' },
                smokePermeability: { ru: 'Проницаемость', az: 'Keçiricilik', en: 'Smoke Permeability' },
                smoke_permeability:{ ru: 'Проницаемость', az: 'Keçiricilik', en: 'Smoke Permeability' },
                materialType:      { ru: 'Тип / Материал', az: 'Növü / Material', en: 'Type / Material' },
                material_type:     { ru: 'Тип / Материал', az: 'Növü / Material', en: 'Type / Material' },
                type:              { ru: 'Тип оболочки', az: 'Qabıq növü', en: 'Casing Type' },
                overstuffing:      { ru: 'Фаршеемкость', az: 'Doldurma', en: 'Overstuffing' },
                dosage:            { ru: 'Дозировка', az: 'Dozalanma', en: 'Dosage' },
                application:       { ru: 'Назначение', az: 'Təyinatı', en: 'Application' },
                shelfLife:         { ru: 'Срок хранения', az: 'Saxlama müddəti', en: 'Shelf Life' },
                shelf_life:        { ru: 'Срок хранения', az: 'Saxlama müddəti', en: 'Shelf Life' },
                storage:           { ru: 'Условия хранения', az: 'Saxlama şəraiti', en: 'Storage' },
                soaking:           { ru: 'Замачивание', az: 'İslatma', en: 'Soaking' },
                shrinkRatio:       { ru: 'Усадка', az: 'Yığılma', en: 'Shrink Ratio' },
                waterBinding:      { ru: 'Влагосвязывание', az: 'Su tutumu', en: 'Water Binding' },
                proteinType:       { ru: 'Тип белка', az: 'Zülal növü', en: 'Protein Type' }
            };
            Object.entries(structured).forEach(([k, v]) => {
                const labels = labelMap[k] || { ru: k, az: k, en: k };
                addRow(labels[lang] || labels.ru || k, v);
            });
        }

        // 3. Direct Top-Level Columns from Supabase / DataStore
        const directFieldMap = [
            { keys: ['caliber', 'calibre', 'kalibr', 'size', 'razmer', 'olcu'], label: { ru: 'Калибр', az: 'Kalibr', en: 'Caliber' } },
            { keys: ['metraj', 'length', 'meter', 'uzunluq', 'reeling', 'namotka'], label: { ru: 'Метраж', az: 'Metraj', en: 'Reeling / Length' } },
            { keys: ['casing_type', 'casingType', 'type', 'tip', 'material', 'material_type', 'materialType'], label: { ru: 'Тип / Материал', az: 'Növü / Material', en: 'Type / Material' } },
            { keys: ['smoke_permeability', 'smokePermeability', 'permeability', 'pronicayemost'], label: { ru: 'Проницаемость', az: 'Keçiricilik', en: 'Permeability' } },
            { keys: ['overstuffing', 'perepolnenie', 'doldurma', 'farsheemkost'], label: { ru: 'Фаршеемкость', az: 'Doldurma', en: 'Overstuffing' } },
            { keys: ['shelf_life', 'shelfLife', 'storage', 'saxlama', 'srok'], label: { ru: 'Срок хранения', az: 'Saxlama müddəti', en: 'Shelf Life' } },
            { keys: ['soaking', 'islatma', 'zamachivanie'], label: { ru: 'Замачивание', az: 'İslatma', en: 'Soaking' } },
            { keys: ['application', 'teyinati', 'naznachenie'], label: { ru: 'Назначение', az: 'Təyinatı', en: 'Application' } },
            { keys: ['dosage', 'dozalanma', 'dozirovka'], label: { ru: 'Дозировка', az: 'Dozalanma', en: 'Dosage' } }
        ];

        directFieldMap.forEach(item => {
            for (const k of item.keys) {
                if (product[k] !== undefined && product[k] !== null && String(product[k]).trim() !== '') {
                    addRow(item.label[lang] || item.label.ru, product[k]);
                    break;
                }
            }
        });

        // 4. Legacy params (param1, param2, param3)
        ['param1', 'param2', 'param3'].forEach((pKey, idx) => {
            const pVal = (lang === 'ru' ? product[`${pKey}_ru`] : (lang === 'en' ? product[`${pKey}_en`] : product[`${pKey}_az`])) || product[`${pKey}_ru`] || product[`${pKey}_az`] || product[`${pKey}_en`] || product[pKey];
            if (pVal && String(pVal).trim()) {
                const text = String(pVal).trim();
                if (text.includes(':')) {
                    const parts = text.split(':');
                    addRow(parts[0].trim(), parts.slice(1).join(':').trim());
                } else {
                    const defaultLabels = [
                        { ru: 'Параметр 1', az: 'Xüsusiyyət 1', en: 'Parameter 1' },
                        { ru: 'Параметр 2', az: 'Xüsusiyyət 2', en: 'Parameter 2' },
                        { ru: 'Параметр 3', az: 'Xüsusiyyət 3', en: 'Parameter 3' }
                    ];
                    addRow(defaultLabels[idx][lang] || defaultLabels[idx].ru, text);
                }
            }
        });

        // 5. Special Intelligent Fallback for Sausage Casings (Колбасные оболочки)
        const isCasing = String(product.category || '').toLowerCase().includes('casing') ||
                         String(product.category_ru || '').toLowerCase().includes('оболочк') ||
                         String(product.category_az || '').toLowerCase().includes('qabıq') ||
                         String(product.title_ru || product.title || '').toLowerCase().includes('оболочк') ||
                         String(product.title_az || '').toLowerCase().includes('qabıq');

        if (isCasing && rows.length < 3) {
            const titleLower = String((typeof product.title === 'object' ? (product.title.ru || product.title.az || product.title.en) : product.title) || product.title_ru || product.title_az || '').toLowerCase();
            
            let casingTypeRu = 'Барьерная полиамидная';
            let casingTypeAz = 'Baryer poliamid';
            let casingTypeEn = 'Barrier Polyamide';

            let smokeRu = 'Нулевая (Барьерная)';
            let smokeAz = 'Sıfır (Baryer)';
            let smokeEn = 'Zero (Barrier)';

            let caliberVal = '32 — 120 мм';
            let shelfValRu = 'до 60 суток';
            let shelfValAz = '60 günədək';
            let shelfValEn = 'up to 60 days';

            if (titleLower.includes('диплекс') || titleLower.includes('diplex') || titleLower.includes('фибросмок') || titleLower.includes('fibro') || titleLower.includes('айцел') || titleLower.includes('icel') || titleLower.includes('амицел') || titleLower.includes('amicel')) {
                casingTypeRu = 'Дымопроницаемая полимерная';
                casingTypeAz = 'Tüstükeçirən polimer';
                casingTypeEn = 'Smokable Permeable Polymer';
                smokeRu = 'Высокая (динамическая)';
                smokeAz = 'Yüksək (dinamik)';
                smokeEn = 'High (dynamic)';
            } else if (titleLower.includes('пакет') || titleLower.includes('paket') || titleLower.includes('amivac') || titleLower.includes('амивак') || titleLower.includes('пленк') || titleLower.includes('plyonka')) {
                casingTypeRu = 'Высокобарьерная термоусадочная';
                casingTypeAz = 'Yüksək maneəli termo-yığılan';
                casingTypeEn = 'High-Barrier Shrink Material';
                smokeRu = 'Барьерная (EVOH)';
                smokeAz = 'Baryer (EVOH)';
                smokeEn = 'Barrier (EVOH)';
                caliberVal = 'Различные типоразмеры';
            }

            addRow(lang === 'az' ? 'Növü' : (lang === 'en' ? 'Type' : 'Тип материала'), lang === 'az' ? casingTypeAz : (lang === 'en' ? casingTypeEn : casingTypeRu));
            addRow(lang === 'az' ? 'Keçiricilik' : (lang === 'en' ? 'Permeability' : 'Проницаемость'), lang === 'az' ? smokeAz : (lang === 'en' ? smokeEn : smokeRu));
            addRow(lang === 'az' ? 'Kalibr / Ölçü' : (lang === 'en' ? 'Caliber / Size' : 'Калибр / Типоразмер'), caliberVal);
            addRow(lang === 'az' ? 'Saxlama' : (lang === 'en' ? 'Shelf Life' : 'Срок годности'), lang === 'az' ? shelfValAz : (lang === 'en' ? shelfValEn : shelfValRu));
        }

        if (maxItems && maxItems > 0) {
            return rows.slice(0, maxItems);
        }
        return rows;
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

                let desc = (product.description && typeof product.description === 'object') ? (product.description[lang] || product.description.ru || product.description.az || product.description.en) : null;
                if (!desc) {
                    if (lang === 'ru') {
                        desc = product.description_ru || product.description_az || product.description_en || '';
                    } else if (lang === 'en') {
                        desc = product.description_en || product.description_ru || product.description_az || '';
                    } else {
                        desc = product.description_az || product.description_ru || product.description_en || '';
                    }
                }

                // ====== Extract top 3 valid specs ======
                const specsRows = this.extractProductSpecs(product, lang, 3);
                let specsHtml = '';

                if (specsRows.length > 0) {
                    const rowsHtml = specsRows.map(r => `
                        <div class="product-spec-row">
                            <span class="product-spec-label">${r.label}</span>
                            <span class="product-spec-dots"></span>
                            <span class="product-spec-val">${r.value}</span>
                        </div>`).join('');
                    specsHtml = `<div class="product-card-specs">${rowsHtml}</div>`;
                } else {
                    let cleanDesc = (desc || '').replace(/<[^>]+>/g, '').trim();
                    if (!cleanDesc) {
                        cleanDesc = lang === 'az' 
                            ? 'Məhsul haqqında ətraflı məlumat və texnoloji dəstək üçün müraciət edin.' 
                            : (lang === 'ru' 
                                ? 'Подробная информация о продукте и технологическая поддержка по запросу.' 
                                : 'Detailed product information and technical support available upon inquiry.');
                    }
                    specsHtml = `
                        <div class="product-card-specs product-card-desc-snippet" title="${cleanDesc}">
                            <p class="product-card-desc-text">${cleanDesc}</p>
                        </div>`;
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
        
        let descHtml = desc ? `<p>${desc.replace(/\n/g, '</p><p>')}</p>` : '';
        document.getElementById('pm-description').innerHTML = descHtml;

        // Render Complete Specifications Table (All items via extractProductSpecs)
        const specsContainer = document.getElementById('pm-specs-table');
        if (specsContainer) {
            const allSpecs = this.extractProductSpecs(product, lang, 0);
            if (allSpecs.length > 0) {
                const rows = allSpecs.map(s => `<tr><th>${s.label}</th><td>${s.value}</td></tr>`).join('');
                specsContainer.innerHTML = `<table class="specs-table"><tbody>${rows}</tbody></table>`;
            } else {
                // If product has confidential or custom specs, show a full informative banner in the modal
                const modalNoticeTitle = lang === 'az' 
                    ? 'Fərdi spesifikasiya və reseptura' 
                    : (lang === 'ru' 
                        ? 'Индивидуальная рецептура и спецификация' 
                        : 'Custom Formulation & Specification');
                const modalNoticeDesc = lang === 'az'
                    ? 'Bu məhsulun dəqiq tərkibi, texnoloji xəritəsi və dozalanma qaydaları istehsalatınızın tələblərinə uyğun olaraq texnoloqlarımız tərəfindən fərdi şəkildə təqdim edilir. Nümunələr və sınaq partiyası üçün bizimlə əlaqə saxlayın.'
                    : (lang === 'ru'
                        ? 'Точный состав, технологическая карта и нормы дозировки данного продукта предоставляются нашими технологами индивидуально под параметры вашего производства. Свяжитесь с нами для получения образцов и проведения выработки.'
                        : 'Detailed composition, technical data sheet, and customized dosage recommendations are provided directly by our food technologists according to your production requirements. Contact us for consultation and free trial samples.');

                specsContainer.innerHTML = `
                    <div class="pm-confidential-notice">
                        <div class="pm-confidential-notice-title">
                            <i class="fa-solid fa-shield-halved" style="color: var(--accent-orange, #FF6600);"></i>
                            <span>${modalNoticeTitle}</span>
                        </div>
                        <p class="pm-confidential-notice-desc">${modalNoticeDesc}</p>
                    </div>`;
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
