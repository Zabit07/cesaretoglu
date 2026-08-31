/**
 * Cəsarətoğlu MMC — Partners Module
 * Compact Brand Logos Strip & Interactive Brand Detail Modal with Brand Products (AZ, RU, EN)
 */

const PartnersModule = {
    init() {
        this.renderPartners();
        this.bindEvents();
    },

    bindEvents() {
        const modalClose = document.getElementById('partner-modal-close');
        const modalBackdrop = document.getElementById('partner-detail-modal');
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', (e) => {
                if (e.target === modalBackdrop) this.closeModal();
            });
        }
    },

    renderPartners() {
        const containers = document.querySelectorAll('#partners-grid, .partners-grid, .brand-strip-container, .partners-showcase-grid');
        if (!containers.length) return;

        const lang = window.currentLang || 'ru';
        const partners = window.dataStore ? window.dataStore.getPartners().filter(p => p.status !== 'draft') : [];

        containers.forEach(container => {
            if (partners.length === 0) {
                let emptyMsg = lang === 'az' ? 'Tərəfdaş məlumatı tapılmadı' : (lang === 'ru' ? 'Информация не найдена' : 'No partners found');
                container.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
                return;
            }

            container.innerHTML = partners.map(partner => {
                let clickHint = lang === 'az' ? `${partner.name} məhsullarına baxmaq üçün klikləyin` : 
                                (lang === 'ru' ? `Нажмите, чтобы увидеть продукцию ${partner.name}` : 
                                `Click to view ${partner.name} products`);
                const brandLogo = partner.logo || 'images/logo.png';

                return `
                    <div class="brand-strip-item" data-partner-id="${partner.id}" onclick="PartnersModule.openPartnerDetail('${partner.id}')" title="${clickHint}">
                        <img src="${brandLogo}" alt="${partner.name}" loading="lazy" onerror="this.src='images/logo.png'">
                    </div>
                `;
            }).join('');
        });
    },

    openPartnerDetail(partnerId) {
        const partner = window.dataStore.getPartnerById(partnerId);
        if (!partner) return;

        const lang = window.currentLang || 'ru';
        const modal = document.getElementById('partner-detail-modal');
        if (!modal) return;

        let desc = (partner.description && typeof partner.description === 'object') ? (partner.description[lang] || partner.description.ru || partner.description.az || partner.description.en) : null;
        let status = (partner.status_text && typeof partner.status_text === 'object') ? (partner.status_text[lang] || partner.status_text.ru || partner.status_text.az || partner.status_text.en) : null;
        let category = (partner.category && typeof partner.category === 'object') ? (partner.category[lang] || partner.category.ru || partner.category.az || partner.category.en) : null;

        if (!desc) {
            if (lang === 'az') desc = partner.description_az || partner.description_ru || partner.description_en || '';
            else if (lang === 'en') desc = partner.description_en || partner.description_ru || partner.description_az || '';
            else desc = partner.description_ru || partner.description_az || partner.description_en || '';
        }

        if (!status) {
            if (lang === 'az') status = partner.status_az || partner.status_ru || partner.status_en || 'Rəsmi distribyutor';
            else if (lang === 'en') status = partner.status_en || partner.status_ru || partner.status_az || 'Official distributor';
            else status = partner.status_ru || partner.status_az || partner.status_en || 'Официальный дистрибьютор';
        }

        if (!category) {
            if (lang === 'az') category = partner.category_az || partner.category_ru || partner.category_en || '';
            else if (lang === 'en') category = partner.category_en || partner.category_ru || partner.category_az || '';
            else category = partner.category_ru || partner.category_az || partner.category_en || '';
        }

        // Get all active products by this partner
        const allProducts = window.dataStore ? window.dataStore.getProducts().filter(p => p.status !== 'draft') : [];
        const partnerProducts = allProducts.filter(p => {
            const prodPartner = (p.partner || '').toLowerCase().trim();
            const target = partner.name.toLowerCase().trim();
            return prodPartner === target || prodPartner.includes(target) || target.includes(prodPartner);
        });

        // Set modal data
        document.getElementById('pdm-logo').src = partner.logo || 'images/logo.png';
        document.getElementById('pdm-name').textContent = partner.name;
        document.getElementById('pdm-country').textContent = partner.country;
        document.getElementById('pdm-status').textContent = status;
        document.getElementById('pdm-category').textContent = category;
        document.getElementById('pdm-desc').textContent = desc;

        const bannerHeader = document.getElementById('pdm-header-banner');
        if (bannerHeader) {
            const bannerImg = partner.banner || partner.hero_bg;
            if (bannerImg) {
                bannerHeader.style.background = `linear-gradient(90deg, rgba(6, 18, 33, 0.92) 0%, rgba(6, 18, 33, 0.80) 50%, rgba(6, 18, 33, 0.40) 100%), url('${bannerImg}') center/cover no-repeat`;
            } else {
                bannerHeader.style.background = `linear-gradient(135deg, #0A1E33 0%, #0F2B48 100%)`;
            }
        }

        const webLink = document.getElementById('pdm-weblink');
        if (webLink) {
            if (partner.website) {
                webLink.href = partner.website;
                webLink.style.display = 'inline-flex';
            } else {
                webLink.style.display = 'none';
            }
        }

        // Render partner products
        const prodsContainer = document.getElementById('pdm-products-grid');
        const prodsHeading = document.getElementById('pdm-products-heading');
        
        if (prodsHeading) {
            let headingText = lang === 'az' ? `${partner.name} Məhsul Çeşidi (${partnerProducts.length})` : 
                             (lang === 'ru' ? `Продукция бренда ${partner.name} (${partnerProducts.length})` : 
                             `${partner.name} Products (${partnerProducts.length})`);
            prodsHeading.textContent = headingText;
        }

        if (prodsContainer) {
            if (partnerProducts.length === 0) {
                prodsContainer.innerHTML = `<p style="color:#64748B; padding:1rem 0;">${lang === 'az' ? 'Məhsul tapılmadı' : (lang === 'ru' ? 'Товары не найдены' : 'No products found')}</p>`;
            } else {
                prodsContainer.innerHTML = partnerProducts.map(p => {
                    let pTitle = lang === 'az' ? p.title_az : (lang === 'ru' ? (p.title_ru || p.title_az) : (p.title_en || p.title_az));
                    let pImg = p.image_local || p.image || 'images/logo.png';
                    let pCat = lang === 'az' ? p.category_az : (lang === 'ru' ? (p.category_ru || p.category_az) : (p.category_en || p.category_az));

                    let detailsText = lang === 'az' ? 'Xüsusiyyətlər' : (lang === 'ru' ? 'Характеристики' : 'Specifications');

                    return `
                        <div class="product-card" data-product-id="${p.id}" style="box-shadow:none; border:1px solid #E2E8F0;">
                            <div class="product-card-thumb" onclick="PartnersModule.viewProductSpecs('${p.id}')">
                                <img src="${pImg}" alt="${pTitle}" onerror="this.src='images/logo.png'">
                                ${p.artikul ? `<div class="product-artikul-badge" style="bottom:4px; right:4px; font-size:0.6rem; padding:1px 4px;">Art: ${p.artikul}</div>` : ''}
                            </div>
                            <div class="product-card-info">
                                <span class="product-card-category">${pCat}</span>
                                <h4 class="product-card-title" onclick="PartnersModule.viewProductSpecs('${p.id}')">${pTitle}</h4>
                            </div>
                            <div class="product-card-actions">
                                <button class="btn btn-outline-primary btn-sm" onclick="PartnersModule.viewProductSpecs('${p.id}')" style="width:100%;">
                                    <i class="fa-solid fa-circle-info"></i> ${detailsText}
                                </button>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    viewProductSpecs(productId) {
        this.closeModal();
        if (window.CatalogModule) {
            window.CatalogModule.openModal(productId);
        }
    },

    closeModal() {
        const modal = document.getElementById('partner-detail-modal');
        if (modal) {
            modal.classList.remove('active');
            const otherActive = document.querySelector('.modal-backdrop.active');
            if (!otherActive) {
                document.body.style.overflow = '';
            }
        }
    }
};

window.PartnersModule = PartnersModule;
