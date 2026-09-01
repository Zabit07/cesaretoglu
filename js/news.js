/**
 * Cəsarətoğlu MMC — News & Events Module
 * Handles rendering of news, seminars, events, and detail modals (AZ, RU, EN)
 */

const NewsModule = {
    init() {
        this.renderNews();
        this.initSwiper();
        this.bindEvents();
    },

    initSwiper() {
        if (typeof Swiper !== 'undefined' && document.querySelector('.news-swiper')) {
            if (this.newsSwiper && this.newsSwiper.destroy) {
                this.newsSwiper.destroy(true, true);
            }
            this.newsSwiper = new Swiper('.news-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                observer: true,
                observeParents: true,
                grabCursor: true,
                speed: 600,
                navigation: {
                    nextEl: '#news-swiper-next',
                    prevEl: '#news-swiper-prev',
                },
                pagination: {
                    el: '.news-swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    550: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 28,
                    }
                }
            });
        }
    },

    nextSlide() {
        if (this.newsSwiper && this.newsSwiper.slideNext) {
            this.newsSwiper.slideNext();
        } else {
            const nextBtn = document.getElementById('news-swiper-next');
            if (nextBtn) nextBtn.click();
        }
    },

    bindEvents() {
        const modalClose = document.getElementById('news-modal-close');
        const modalBackdrop = document.getElementById('news-modal');
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', (e) => {
                if (e.target === modalBackdrop) this.closeModal();
            });
        }
        // Keyboard Esc support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    },

    renderNews() {
        const lang = window.currentLang || (window.app && window.app.lang) || 'ru';
        const allNews = window.dataStore ? window.dataStore.getNews() : [];
        const activeNews = allNews.filter(item => item.status !== 'draft');

        // 1. Render for Swiper Slider on Homepage
        const swiperWrapper = document.getElementById('news-swiper-wrapper');
        if (swiperWrapper) {
            if (activeNews.length === 0) {
                let emptyMsg = 'Hələlik heç bir xəbər yoxdur';
                if (lang === 'ru') emptyMsg = 'Пока нет опубликованных новостей';
                if (lang === 'en') emptyMsg = 'No news articles available at the moment';
                swiperWrapper.innerHTML = `<div class="swiper-slide"><div style="padding:2rem; text-align:center; color:#94A3B8; width:100%;">${emptyMsg}</div></div>`;
            } else {
                swiperWrapper.innerHTML = activeNews.map(item => `
                    <div class="swiper-slide">
                        ${this.generateCardHtml(item, lang)}
                    </div>
                `).join('');
            }
            this.initSwiper();
        }

        // 2. Render for Full Grid View on Homepage
        const gridContainer = document.getElementById('news-grid-container');
        if (gridContainer) {
            if (activeNews.length === 0) {
                let emptyMsg = 'Hələlik heç bir xəbər yoxdur';
                if (lang === 'ru') emptyMsg = 'Пока нет опубликованных новостей';
                if (lang === 'en') emptyMsg = 'No news articles available at the moment';
                gridContainer.innerHTML = `<div style="grid-column:1/-1; padding:3rem; text-align:center; color:#94A3B8; font-size:1.1rem;">${emptyMsg}</div>`;
            } else {
                gridContainer.innerHTML = activeNews.map(item => this.generateCardHtml(item, lang)).join('');
            }
        }

        // Update full grid heading based on language
        const fullGridHeading = document.getElementById('news-full-grid-heading');
        if (fullGridHeading) {
            if (lang === 'ru') fullGridHeading.textContent = 'Все новости и события компании';
            else if (lang === 'en') fullGridHeading.textContent = 'All news and corporate events';
            else fullGridHeading.textContent = 'Bütün xəbərlər və tədbirlər';
        }
    },

    toggleAllNewsView() {
        const gridWrap = document.getElementById('news-full-grid-wrap');
        if (!gridWrap) return;

        const isVisible = gridWrap.style.display === 'block';
        if (isVisible) {
            this.collapseAllNewsView();
        } else {
            this.expandAllNewsView();
        }
    },

    expandAllNewsView() {
        const swiperContainer = document.getElementById('news-swiper-container');
        const gridWrap = document.getElementById('news-full-grid-wrap');
        const navControls = document.getElementById('news-slider-nav-controls');
        const toggleBtnText = document.getElementById('news-toggle-btn-text');
        const toggleIcon = document.getElementById('news-toggle-icon');
        const lang = window.currentLang || (window.app && window.app.lang) || 'ru';

        if (swiperContainer) swiperContainer.style.display = 'none';
        if (navControls) navControls.style.display = 'none';

        if (gridWrap) {
            gridWrap.style.display = 'block';
            setTimeout(() => {
                gridWrap.style.opacity = '1';
                gridWrap.style.transform = 'translateY(0)';
            }, 20);
        }

        if (toggleBtnText) {
            if (lang === 'ru') toggleBtnText.textContent = 'Свернуть в слайдер';
            else if (lang === 'en') toggleBtnText.textContent = 'Collapse to slider';
            else toggleBtnText.textContent = 'Slayderə qayıt';
        }
        if (toggleIcon) {
            toggleIcon.className = 'fa-solid fa-arrow-up';
        }

        // Smooth scroll down to the news section
        const newsSection = document.getElementById('news');
        if (newsSection) {
            newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    collapseAllNewsView() {
        const swiperContainer = document.getElementById('news-swiper-container');
        const gridWrap = document.getElementById('news-full-grid-wrap');
        const navControls = document.getElementById('news-slider-nav-controls');
        const toggleBtnText = document.getElementById('news-toggle-btn-text');
        const toggleIcon = document.getElementById('news-toggle-icon');
        const lang = window.currentLang || (window.app && window.app.lang) || 'ru';

        if (gridWrap) {
            gridWrap.style.opacity = '0';
            gridWrap.style.transform = 'translateY(15px)';
            setTimeout(() => {
                gridWrap.style.display = 'none';
                if (swiperContainer) {
                    swiperContainer.style.display = 'block';
                    this.initSwiper();
                }
                if (navControls) navControls.style.display = 'flex';
            }, 250);
        }

        if (toggleBtnText) {
            if (lang === 'ru') toggleBtnText.textContent = 'Все новости';
            else if (lang === 'en') toggleBtnText.textContent = 'All news';
            else toggleBtnText.textContent = 'Bütün xəbərlər';
        }
        if (toggleIcon) {
            toggleIcon.className = 'fa-solid fa-arrow-down';
        }

        const newsSection = document.getElementById('news');
        if (newsSection) {
            newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    generateCardHtml(item, lang) {
        let title = item.title_ru;
        let summary = item.summary_ru;

        if (lang === 'az') {
            title = item.title_az || item.title_ru;
            summary = item.summary_az || item.summary_ru;
        } else if (lang === 'en') {
            title = item.title_en || item.title_ru || item.title_az;
            summary = item.summary_en || item.summary_ru || item.summary_az;
        } else {
            title = item.title_ru || item.title_az || item.title_en;
            summary = item.summary_ru || item.summary_az || item.summary_en;
        }

        const formattedDate = this.formatDate(item.date, lang);
        let readMoreText = 'Читать далее';
        if (lang === 'az') readMoreText = 'Ətraflı oxu';
        if (lang === 'en') readMoreText = 'Read Details';

        const imgSrc = item.image_local || item.image || 'images/news/event_1.jpg';

        return `
            <article class="news-card" onclick="NewsModule.openModal('${item.id}')">
                <div class="news-card-thumb">
                    <img src="${imgSrc}" alt="${title.replace(/"/g, '&quot;')}" loading="lazy" onerror="this.src='images/news/event_1.jpg'">
                    <div class="news-date-badge">
                        <i class="fa-regular fa-calendar"></i>
                        <span>${formattedDate}</span>
                    </div>
                </div>
                <div class="news-card-content">
                    <h3 class="news-card-title">${title}</h3>
                    <p class="news-card-summary">${summary || ''}</p>
                    <div class="news-card-link">
                        <span>${readMoreText}</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </article>
        `;
    },

    formatDate(dateStr, lang) {
        if (!dateStr) return '';
        try {
            const rawStr = String(dateStr).trim();
            let date = null;

            // Handle standard YYYY-MM-DD or YYYY/MM/DD or ISO strings
            if (/^\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/.test(rawStr)) {
                const parts = rawStr.split(/[-/.]/);
                const year = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1;
                const day = parseInt(parts[2], 10);
                date = new Date(year, month, day);
            } else if (/^\d{1,2}[-/.]\d{1,2}[-/.]\d{4}/.test(rawStr)) {
                // Handle DD-MM-YYYY or DD.MM.YYYY
                const parts = rawStr.split(/[-/.]/);
                const day = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1;
                const year = parseInt(parts[2], 10);
                date = new Date(year, month, day);
            } else {
                date = new Date(rawStr);
            }

            if (!date || isNaN(date.getTime())) {
                return dateStr;
            }

            const day = date.getDate();
            const year = date.getFullYear();
            const monthIdx = date.getMonth();

            const months = {
                az: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'],
                ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
                en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            };

            const currentLang = (lang === 'az' || lang === 'en') ? lang : 'ru';
            const monthName = months[currentLang][monthIdx];

            if (currentLang === 'az') {
                return `${day} ${monthName} ${year}`;
            } else if (currentLang === 'en') {
                return `${monthName} ${day}, ${year}`;
            } else {
                return `${day} ${monthName} ${year} г.`;
            }
        } catch(e) {
            return dateStr;
        }
    },

    openModal(id) {
        const item = window.dataStore ? window.dataStore.getNewsById(id) : null;
        if (!item) return;

        const lang = window.currentLang || (window.app && window.app.lang) || 'ru';
        const modal = document.getElementById('news-modal');
        if (!modal) return;

        let title = item.title_ru;
        let content = item.content_ru || item.summary_ru;

        if (lang === 'az') {
            title = item.title_az || item.title_ru;
            content = item.content_az || item.summary_az || item.content_ru;
        } else if (lang === 'en') {
            title = item.title_en || item.title_ru || item.title_az;
            content = item.content_en || item.summary_en || item.content_ru;
        } else {
            title = item.title_ru || item.title_az || item.title_en;
            content = item.content_ru || item.summary_ru || item.content_az;
        }

        const formattedDate = this.formatDate(item.date, lang);
        const imgSrc = item.image_local || item.image || 'images/news/event_1.jpg';

        const titleEl = document.getElementById('news-modal-title');
        const dateEl = document.getElementById('news-modal-date');
        const imgEl = document.getElementById('news-modal-image');
        const contentEl = document.getElementById('news-modal-content');

        if (titleEl) titleEl.textContent = title;
        if (dateEl) dateEl.innerHTML = `<i class="fa-regular fa-calendar" style="color:var(--accent-orange); margin-right:6px;"></i> ${formattedDate}`;
        if (imgEl) {
            imgEl.src = imgSrc;
            imgEl.onerror = () => { imgEl.src = 'images/news/event_1.jpg'; };
        }
        if (contentEl) {
            const paragraphs = (content || '').split('\n').filter(p => p.trim());
            contentEl.innerHTML = paragraphs.map(p => `<p style="margin-bottom:0.9rem; line-height:1.65;">${p}</p>`).join('');
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeModal() {
        const modal = document.getElementById('news-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
};

window.NewsModule = NewsModule;

