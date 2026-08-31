# Cəsarətoğlu MMC — Rəsmi Korporativ və Diler Vebsaytı

Müasir, yüksək səviyyəli B2B korporativ diler saytı və idarəetmə paneli (Admin Panel).
«Cəsarətoğlu MMC» şirkəti — qlobal istehsalçılar **Atlantis-Pak**, **Wiberg (NovaTaste)**, **Südpack** və **Avangard** brendlərinin Azərbaycandakı rəsmi distribyutorudur.

---

## 🌐 3 Dilli Dəstək / 3 Языка / 3 Languages

Sayt və Admin paneli tam şəkildə 3 dildə fəaliyyət göstərir:
1. **Azərbaycan dili (AZ 🇦🇿)**
2. **Русский язык (RU 🇷🇺)**
3. **English (EN 🇬🇧)**

Dil dəyişdirildikdə bütün mətnlər, menyular, məhsul xüsusiyyətləri, tərəfdaş məlumatları və WhatsApp/Email müraciət şablonları səhifəni yeniləmədən avtomatik dəyişir.

---

## 🚀 Saytın Başladılması

1. **Əsas Sayt**: `index.html` faylını istənilən brauzerdə açın.
2. **Admin Paneli**: `admin.html` faylını brauzerdə açın (və ya saytın yuxarı sağ küncündən / footer-dən «Admin Paneli» düyməsinə klikləyin).
   - **Admin Giriş Şifrəsi**: `admin123` (Şifrəni Admin Panelində «Tənzimləmələr» bölməsindən dəyişə bilərsiniz).

---

## 📁 Fayl Strukturu və Modulların Ayrılması

Kod təmiz və aydın şəkildə modullara bölünüb:

```
/
├── index.html              # Əsas müştəri saytı (AZ / RU / EN)
├── admin.html              # Ayrı İdarəetmə Paneli (Admin Dashboard)
├── style.css               # Əsas stil yönləndiricisi
├── css/
│   ├── main.css            # Əsas saytın stilləri (B2B dizayn, responsive, animasiyalar)
│   └── admin.css           # Admin panelinin stilləri
├── js/
│   ├── data.js             # Məlumat bazası (24 məhsul, 4 tərəfdaş, xəbərlər 3 dildə + LocalStorage CRUD)
│   ├── partners.js         # Tərəfdaşlar modulu (kartlar, filtrlər)
│   ├── catalog.js          # Kataloq modulu (axtarış, kateqoriyalar, spesifikasiya modalları)
│   ├── news.js             # Xəbərlər və seminarlar modulu
│   ├── main.js             # Baş idarəetmə, 3 dilli mühərrik (AZ / RU / EN), əlaqə forması
│   └── admin.js            # Admin panelinin bütün əməliyyatları (Əlavə et, Redaktə, Sil, Backup)
└── images/                 # Bütün foto və loqolar
    ├── logo.svg / logo.png # Cəsarətoğlu MMC orijinal loqosu
    ├── products/           # 24 real məhsulun yüksək keyfiyyətli fotoları
    ├── partners/           # Tərəfdaş loqoları (Atlantis-Pak, Wiberg, Südpack, Hulshof)
    └── news/               # Seminarlar və tədbirlər fotoları
```

---

## ✨ Əsas Xüsusiyyətlər və Funksionallıq

### 1. Birbaşa Əlaqə Modeli (Səbətsiz, birbaşa Zəng / WhatsApp / Email)
İstifadəçinin tələbinə uyğun olaraq alış/sifariş səbəti yoxdur. Əvəzində hər məhsul kartında və modal pəncərəsində birbaşa əlaqə vasitələri mövcuddur:
- **WhatsApp Çat**: Həmin məhsulun adı və artikulu avtomatik mesaj mətni kimi doldurulmuş link.
- **Birbaşa Zəng**: `+994 55 327-76-55` nömrəsinə bir kliklə zəng.
- **Email Sorğusu**: `info@casaratoglu.az` ünvanına hazır məhsul şablonu ilə məktub.

### 2. Ayrı İdarəetmə Paneli (`admin.html`)
Admin panelində:
- **Məhsulların İdarə Olunması**: Yeni məhsul əlavə etmək (AZ/RU/EN ad və təsvir), mövcud məhsulları redaktə etmək, silmək, foto yükləmək, artikul və texniki göstəriciləri daxil etmək.
- **Tərəfdaşların İdarə Olunması**: Yeni tərəfdaş brend əlavə etmək, loqo yükləmək, status və məlumatları 3 dildə dəyişmək.
- **Xəbərlərin İdarə Olunması**: Seminarlar və tədbirlər barədə yeni xəbərlər yazmaq, foto əlavə etmək.
- **Məlumatların Ehtiyat Nüsxəsi (Backup)**: Bütün sayt bazasını bir kliklə `JSON` faylı olaraq endirmək və ya `JSON` faylından bərpa etmək.

---

## 📞 Əlaqə

- **Şirkət:** Cəsarətoğlu MMC
- **Telefon:** +994 55 327-76-55
- **Email:** info@casaratoglu.az
- **Ünvan:** Bakı şəhəri, Ağ Şəhər / Xətai rayonu, Azərbaycan

© 2026 Cəsarətoğlu MMC. Bütün hüquqlar qorunur.
