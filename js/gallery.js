/**
 * Cəsarətoğlu MMC — Gallery Page Controller & Lightbox Slider
 * Supports Category Tabs Filtering, Multi-photo Album Cards, and Interactive Lightbox Slider
 */

const GalleryModule = {
    currentCategory: 'all',
    activeAlbum: null,
    currentPhotoIndex: 0,
    currentPage: 1,
    itemsPerPage: 6, // 3x2 grid per page

    init() {
        this.renderCategoryFilterBar();
        this.bindEvents();
        this.renderAlbums();
    },

    renderCategoryFilterBar() {
        const filterBar = document.querySelector('.gallery-filter-bar');
        if (!filterBar) return;

        const lang = this.getCurrentLang();
        const categories = (window.dataStore && typeof window.dataStore.getGalleryCategories === 'function')
            ? window.dataStore.getGalleryCategories()
            : [];

        const allLabel = lang === 'az' ? 'Bütün Albomlar' : (lang === 'en' ? 'All Albums' : 'Все альбомы');

        let html = `
            <button class="gallery-filter-btn ${this.currentCategory === 'all' ? 'active' : ''}" data-category="all">
                <i class="fa-solid fa-layer-group"></i>
                <span>${allLabel}</span>
            </button>
        `;

        categories.forEach(cat => {
            const catTitle = this.getLocalizedText(cat, 'title') || cat.id;
            const icon = cat.icon || 'fa-solid fa-camera';
            const isActive = this.currentCategory === cat.id ? 'active' : '';

            html += `
                <button class="gallery-filter-btn ${isActive}" data-category="${cat.id}">
                    <i class="${icon}"></i>
                    <span>${catTitle}</span>
                </button>
            `;
        });

        filterBar.innerHTML = html;
    },

    bindEvents() {
        // Delegate Category Filter Buttons
        const filterBar = document.querySelector('.gallery-filter-bar');
        if (filterBar) {
            filterBar.addEventListener('click', (e) => {
                const btn = e.target.closest('.gallery-filter-btn');
                if (!btn) return;
                filterBar.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentCategory = btn.dataset.category || 'all';
                this.currentPage = 1; // reset to first page on filter switch
                this.renderAlbums();
            });
        }

        // Direct Language Switcher listener for buttons on gallery.html (AZ, RU, EN)
        document.querySelectorAll('.lang-btn, [data-lang]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetLang = e.currentTarget.dataset.lang || e.currentTarget.getAttribute('data-lang');
                if (targetLang) {
                    setTimeout(() => {
                        this.renderCategoryFilterBar();
                        this.renderAlbums();
                        if (this.activeAlbum) {
                            this.updateLightboxContent();
                        }
                    }, 50);
                }
            });
        });

        // Listen for window language change events or custom triggers
        window.addEventListener('languageChanged', () => {
            this.renderCategoryFilterBar();
            this.renderAlbums();
            if (this.activeAlbum) {
                this.updateLightboxContent();
            }
        });

        window.addEventListener('storage', (e) => {
            if (e.key === 'cesaretoglu_lang' || e.key === 'site_lang' || e.key === 'cesaretoglu_gallery_categories') {
                this.renderCategoryFilterBar();
                this.renderAlbums();
                if (this.activeAlbum) {
                    this.updateLightboxContent();
                }
            }
        });

        // Lightbox Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('gallery-lightbox-modal');
            if (modal && modal.classList.contains('active')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.prevPhoto();
                if (e.key === 'ArrowRight') this.nextPhoto();
            }
        });

        // Close on backdrop click
        const modal = document.getElementById('gallery-lightbox-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeLightbox();
                }
            });
        }
    },

    getCurrentLang() {
        if (window.mainApp && window.mainApp.lang) return window.mainApp.lang;
        if (window.app && window.app.lang) return window.app.lang;
        if (window.currentLang) return window.currentLang;
        return localStorage.getItem('cesaretoglu_lang') || localStorage.getItem('site_lang') || 'az';
    },

    getLocalizedText(obj, fieldPrefix) {
        const lang = this.getCurrentLang();
        if (!obj) return '';

        // If stored as nested object: { title: { az: "...", ru: "...", en: "..." } }
        if (obj[fieldPrefix] && typeof obj[fieldPrefix] === 'object') {
            return obj[fieldPrefix][lang] || obj[fieldPrefix].az || obj[fieldPrefix].ru || obj[fieldPrefix].en || '';
        }

        // Direct flat properties: title_az, title_ru, title_en
        if (lang === 'az') return obj[`${fieldPrefix}_az`] || obj[`${fieldPrefix}_ru`] || obj[`${fieldPrefix}_en`] || obj[fieldPrefix] || '';
        if (lang === 'en') return obj[`${fieldPrefix}_en`] || obj[`${fieldPrefix}_az`] || obj[`${fieldPrefix}_ru`] || obj[fieldPrefix] || '';
        return obj[`${fieldPrefix}_ru`] || obj[`${fieldPrefix}_az`] || obj[`${fieldPrefix}_en`] || obj[fieldPrefix] || '';
    },

    renderAlbums() {
        const grid = document.getElementById('gallery-albums-grid');
        const paginationWrapper = document.getElementById('gallery-pagination-wrapper');
        if (!grid) return;

        const lang = this.getCurrentLang();
        const albums = window.dataStore ? window.dataStore.getGallery() : [];
        const galleryCategories = (window.dataStore && typeof window.dataStore.getGalleryCategories === 'function')
            ? window.dataStore.getGalleryCategories()
            : [];

        const filtered = albums.filter(a => {
            if (this.currentCategory === 'all') return true;
            return a.category === this.currentCategory;
        });

        if (filtered.length === 0) {
            const noDataMsg = lang === 'az' ? 'Bu kateqoriyada heç bir albom tapılmadı.' : (lang === 'en' ? 'No albums found in this category.' : 'В этой категории альбомов пока нет.');
            grid.innerHTML = `
                <div class="gallery-empty-box">
                    <i class="fa-regular fa-images"></i>
                    <p>${noDataMsg}</p>
                </div>
            `;
            if (paginationWrapper) paginationWrapper.innerHTML = '';
            return;
        }

        // Pagination calculation
        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);

        if (this.currentPage > totalPages) {
            this.currentPage = totalPages;
        }
        if (this.currentPage < 1) {
            this.currentPage = 1;
        }

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageItems = filtered.slice(startIndex, endIndex);

        grid.innerHTML = pageItems.map(album => {
            const title = this.getLocalizedText(album, 'title');
            const desc = this.getLocalizedText(album, 'description');
            const location = this.getLocalizedText(album, 'location');
            const photosCount = Array.isArray(album.photos) ? album.photos.length : 1;
            const cover = album.cover_image || (album.photos && album.photos[0] && (album.photos[0].url || album.photos[0])) || 'images/hero/slide_1_casings.jpg';

            // Category badge label (dynamically matched from categories)
            const matchedCat = galleryCategories.find(c => String(c.id).toLowerCase() === String(album.category || '').toLowerCase());
            let catLabel = matchedCat ? this.getLocalizedText(matchedCat, 'title') : (lang === 'az' ? 'Hadisə' : (lang === 'en' ? 'Event' : 'Событие'));

            // Thumbnail previews strip (up to 4 thumbs)
            const photoList = Array.isArray(album.photos) ? album.photos : [{ url: cover }];
            const previewThumbs = photoList.slice(0, 4).map((p, pIdx) => {
                const pUrl = typeof p === 'object' ? (p.url || p.image) : p;
                const isMore = pIdx === 3 && photoList.length > 4;
                const moreCount = photoList.length - 3;
                return `
                    <div class="album-thumb-mini ${isMore ? 'has-overlay' : ''}" onclick="event.stopPropagation(); GalleryModule.openLightbox('${album.id}', ${pIdx})">
                        <img src="${pUrl}" alt="${title}" loading="lazy" onerror="this.src='images/logo.png'">
                        ${isMore ? `<span class="album-thumb-more">+${moreCount}</span>` : ''}
                    </div>
                `;
            }).join('');

            const viewBtnText = lang === 'az' ? 'Albomu aç' : (lang === 'en' ? 'View Album' : 'Смотреть альбом');
            const photosLabel = lang === 'az' ? 'şəkil' : (lang === 'en' ? 'photos' : 'фото');

            return `
                <div class="gallery-album-card" onclick="GalleryModule.openLightbox('${album.id}', 0)">
                    <div class="album-card-cover-wrap">
                        <img src="${cover}" alt="${title}" class="album-card-cover" loading="lazy" onerror="this.src='images/hero/slide_1_casings.jpg'">
                        <div class="album-card-overlay">
                            <span class="album-category-badge">${catLabel}</span>
                            <span class="album-photos-badge">
                                <i class="fa-solid fa-camera"></i> ${photosCount} ${photosLabel}
                            </span>
                        </div>
                    </div>

                    <div class="album-card-body">
                        <div class="album-meta-row">
                            <span class="album-meta-date"><i class="fa-regular fa-calendar"></i> ${album.date || '2024'}</span>
                            ${location ? `<span class="album-meta-location"><i class="fa-solid fa-location-dot"></i> ${location}</span>` : ''}
                        </div>
                        <h3 class="album-card-title">${title}</h3>
                        <p class="album-card-desc">${desc || ''}</p>

                        <!-- Thumbs Grid Inside Card -->
                        <div class="album-thumbs-strip">
                            ${previewThumbs}
                        </div>

                        <div class="album-card-footer">
                            <span class="album-quick-link">
                                <span>${viewBtnText}</span> <i class="fa-solid fa-arrow-right"></i>
                            </span>
                            <button type="button" class="btn btn-cta-orange btn-sm" onclick="event.stopPropagation(); GalleryModule.openLightbox('${album.id}', 0)">
                                <i class="fa-solid fa-expand"></i> <span>${viewBtnText}</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        this.renderPagination(totalPages, totalItems, startIndex + 1, Math.min(endIndex, totalItems));
    },

    renderPagination(totalPages, totalItems, startItem, endItem) {
        const wrapper = document.getElementById('gallery-pagination-wrapper');
        if (!wrapper) return;

        if (totalPages <= 1) {
            wrapper.innerHTML = '';
            return;
        }

        const lang = this.getCurrentLang();
        const loadMoreText = lang === 'az' ? 'Daha çox göstər' : (lang === 'en' ? 'Load More' : 'Показать еще');
        const showingText = lang === 'az' ? `Göstərilir: ${startItem} – ${endItem} / Cəmi: ${totalItems} albom` : (lang === 'en' ? `Showing: ${startItem} – ${endItem} of ${totalItems} albums` : `Показано: ${startItem} – ${endItem} из ${totalItems} альбомов`);

        // Load More button (if not on last page)
        const hasNextPage = this.currentPage < totalPages;
        const loadMoreBtnHtml = hasNextPage ? `
            <button type="button" class="gallery-load-more-btn" onclick="GalleryModule.loadMore()">
                <i class="fa-solid fa-rotate-right"></i>
                <span>${loadMoreText}</span>
            </button>
        ` : '';

        // Numbered pagination buttons
        let pageButtonsHtml = '';

        // Prev Button
        pageButtonsHtml += `
            <button type="button" class="gallery-page-btn" onclick="GalleryModule.goToPage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''} aria-label="Previous">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
        `;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                pageButtonsHtml += `
                    <button type="button" class="gallery-page-btn ${i === this.currentPage ? 'active' : ''}" onclick="GalleryModule.goToPage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                pageButtonsHtml += `<span style="padding: 0 4px; color:#94A3B8; font-weight:700;">...</span>`;
            }
        }

        // Next Button
        pageButtonsHtml += `
            <button type="button" class="gallery-page-btn" onclick="GalleryModule.goToPage(${this.currentPage + 1})" ${this.currentPage === totalPages ? 'disabled' : ''} aria-label="Next">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        `;

        wrapper.innerHTML = `
            ${loadMoreBtnHtml}
            <div class="gallery-pagination-bar">
                ${pageButtonsHtml}
            </div>
            <div class="gallery-pagination-info">
                ${showingText}
            </div>
        `;
    },

    goToPage(pageNumber) {
        this.currentPage = pageNumber;
        this.renderAlbums();

        // Smooth scroll to top of gallery section
        const section = document.getElementById('gallery-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    loadMore() {
        this.currentPage += 1;
        this.renderAlbums();
    },

    openLightbox(albumId, initialIndex = 0) {
        const album = window.dataStore ? window.dataStore.getAlbumById(albumId) : null;
        if (!album) return;

        this.activeAlbum = album;
        this.currentPhotoIndex = initialIndex >= 0 ? initialIndex : 0;

        const modal = document.getElementById('gallery-lightbox-modal');
        if (!modal) return;

        this.updateLightboxContent();

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeLightbox() {
        const modal = document.getElementById('gallery-lightbox-modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
        this.activeAlbum = null;
    },

    updateLightboxContent() {
        if (!this.activeAlbum) return;

        const album = this.activeAlbum;
        const photos = Array.isArray(album.photos) && album.photos.length > 0 ?
            album.photos :
            [{ url: album.cover_image, caption_ru: album.title_ru, caption_az: album.title_az, caption_en: album.title_en }];

        if (this.currentPhotoIndex < 0) this.currentPhotoIndex = photos.length - 1;
        if (this.currentPhotoIndex >= photos.length) this.currentPhotoIndex = 0;

        const currentPhoto = photos[this.currentPhotoIndex];
        const photoUrl = typeof currentPhoto === 'object' ? (currentPhoto.url || currentPhoto.image) : currentPhoto;
        const caption = typeof currentPhoto === 'object' ? this.getLocalizedText(currentPhoto, 'caption') : '';
        const albumTitle = this.getLocalizedText(album, 'title');
        const albumDesc = this.getLocalizedText(album, 'description');
        const albumDate = album.date || '';
        const albumLocation = this.getLocalizedText(album, 'location');

        // Main Lightbox Elements
        const mainImg = document.getElementById('lightbox-main-img');
        const titleEl = document.getElementById('lightbox-album-title');
        const descEl = document.getElementById('lightbox-album-description');
        const counterEl = document.getElementById('lightbox-counter');
        const captionEl = document.getElementById('lightbox-caption');
        const metaEl = document.getElementById('lightbox-meta');
        const thumbsContainer = document.getElementById('lightbox-thumbs-container');

        if (mainImg) {
            mainImg.src = photoUrl;
            mainImg.alt = caption || albumTitle;
        }

        if (titleEl) titleEl.textContent = albumTitle;
        if (descEl) {
            descEl.textContent = albumDesc || '';
            descEl.style.display = albumDesc ? 'block' : 'none';
        }
        if (counterEl) counterEl.textContent = `${this.currentPhotoIndex + 1} / ${photos.length}`;
        if (captionEl) {
            captionEl.textContent = caption || '';
            captionEl.style.display = caption && caption !== albumTitle ? 'block' : 'none';
        }
        if (metaEl) {
            metaEl.innerHTML = `
                <span><i class="fa-regular fa-calendar"></i> ${albumDate}</span>
                ${albumLocation ? `<span><i class="fa-solid fa-location-dot"></i> ${albumLocation}</span>` : ''}
            `;
        }

        // Render mini thumbnails strip at bottom of Lightbox
        if (thumbsContainer) {
            thumbsContainer.innerHTML = photos.map((p, idx) => {
                const u = typeof p === 'object' ? (p.url || p.image) : p;
                const isSelected = idx === this.currentPhotoIndex;
                return `
                    <div class="lightbox-thumb-item ${isSelected ? 'active' : ''}" onclick="GalleryModule.goToPhoto(${idx})">
                        <img src="${u}" alt="" loading="lazy">
                    </div>
                `;
            }).join('');
        }
    },

    nextPhoto() {
        if (!this.activeAlbum) return;
        const photos = Array.isArray(this.activeAlbum.photos) ? this.activeAlbum.photos : [this.activeAlbum.cover_image];
        this.currentPhotoIndex = (this.currentPhotoIndex + 1) % photos.length;
        this.updateLightboxContent();
    },

    prevPhoto() {
        if (!this.activeAlbum) return;
        const photos = Array.isArray(this.activeAlbum.photos) ? this.activeAlbum.photos : [this.activeAlbum.cover_image];
        this.currentPhotoIndex = (this.currentPhotoIndex - 1 + photos.length) % photos.length;
        this.updateLightboxContent();
    },

    goToPhoto(index) {
        this.currentPhotoIndex = index;
        this.updateLightboxContent();
    }
};

window.GalleryModule = GalleryModule;
