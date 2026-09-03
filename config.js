/* ============================================================
   AYARLAR — Sadece burayı düzenleyin
   ============================================================ */

window.THERMOMIX_CONFIG = {
  /* ---- Danışman ---- */
  advisorName: "Zeynep Demir",
  advisorTitle: "Bağımsız Thermomix® Danışmanı",
  advisorId: "TM048014",

  /* ---- KAMPANYALI MODELLER (satın alma) ----
     Satın almak için bu resmi kampanya sayfalarına gidilir.
     {ID} yerine yukarıdaki advisorId otomatik konur. */
  models: [
    {
      sku: "BN036",
      name: "Thermomix® TM7 + Thermomix® Yemek Takımı Paketi",
      tag: "EYLÜL FIRSATI · LEZZETİ TAMAMLAYIN",
      oldPrice: "96.980,00 TL",
      price: "92.740,00 TL",
      /* Taksit vurgusu: aylık tutar bu ikisinden otomatik hesaplanır.
         installmentBase = vade farksız taksite giren tutar (TM7 fiyatı). */
      installments: 6,
      installmentBase: "89.990,00 TL",
      image: "img/tm7-yemek-takimi.jpg",
      includes: [
        "Thermomix® TM7 — vade farksız 6 taksitle 89.990₺ (14.998,33₺/ay)",
        "Thermomix® Yemek Takımı — kupon koduyla 2.750₺ (liste: 6.990₺ · 4.240₺ tasarruf)",
        "1-15 Eylül Garanti BBVA Bonus ile 10.000₺ Bonus fırsatı",
        "İlk kez abonelere 3 ay ücretsiz Cookidoo® üyeliği",
        "KDV dahil · ücretsiz kargo"
      ],
      details: "Kampanya 1 – 30 Eylül 2026 tarihleri arasında geçerlidir. Tanıtımlardan birine katılıp Thermomix® TM7 satın alanlara 6.990₺ değerindeki Thermomix® Yemek Takımı kupon kodu ile sadece 2.750₺! TM7 vade farksız 6 taksitle 89.990₺'dir (14.998,33₺/ay). Ayrıca 1-15 Eylül tarihleri arasında Garanti BBVA Bonus kartınızla Garanti BBVA sanal POS üzerinden 3 takside kadar yapılan işlemlerde 10.000₺ Bonus fırsatı (BonusFlaş katılımı ile). İlk kez Cookidoo® aboneliği alanlara 3 ay ücretsiz üyelik hediye! Diğer kampanyalarla birleştirilemez, stoklarla sınırlıdır.",
      url: "https://thermomix.vorwerk.com.tr/vorwerk-katalog/t%C3%BCm-%C3%9Cr%C3%BCnler/thermomix-tm7-%28tm7-%2b-thermomix-yemek-takimi%29/p/BN036?danisman={ID}"
    }
  ],

  /* ---- Tanıtım videoları (gömülü / embed) ----
     embedId = YouTube video ID'si. Sitede oynatıcı olarak görünür. */
  videos: [
    { title: "Thermomix, Hiç Olmadığı Gibi — Yepyeni TM7 🔥", embedId: "__Pzaip-now" },
    { title: "Tek Seferde 3 Yemek! | TM7 ile Çok Katlı Pişirme", embedId: "QTIOX63tFvQ" }
  ],

  /* ---- Shortlar (@thermozeyno — gömülü / embed) ----
     id = short/video kodu. Sitede dikey oynatıcı olarak görünür. */
  shorts: [
    { title: "Kendinize yapacağınız en güzel iyilik 🫠", id: "cDluw1g-F9w" },
    { title: "Evde yorulmayan bir yardımcı 🙂", id: "KqIkeZvTryw" },
    { title: "Ofenburger tarifi", id: "QWhFEsKfzGs" },
    { title: "Pratik tarif", id: "hMkyuq9SzjQ" },
    { title: "Tam kıvam 🤌", id: "bQAg3Ii589E" },
    { title: "Çilek reçeli", id: "4-HMLmhPIf4" }
  ],

  /* ---- Sosyal medya & iletişim ---- */
  instagramUrl: "https://instagram.com/thermozeyno",
  instagramDmUrl: "https://ig.me/m/thermozeyno",
  instagramMessage: "Merhaba Zeynep Hanım, Eylül ayı Thermomix TM7 ve Yemek Takımı kampanyası hakkında bilgi almak istiyorum 🙂",
  youtubeUrl: "https://www.youtube.com/@thermozeyno",
  whatsappNumber: "905464022099",
  whatsappMessage: "Merhaba Zeynep Hanım, Eylül ayı Thermomix TM7 ve Yemek Takımı kampanyası hakkında bilgi almak istiyorum 🙂",
  email: "",

  gaMeasurementId: "G-65HE3LLNSQ",

  /* ---- Danışman satış kademeleri ---- */
  consultantTiers: [
    { count: 1, reward: "%20 indirim" },
    { count: 2, reward: "%50 indirim" },
    { count: 3, reward: "%80 indirim" },
    { count: 4, reward: "ÜCRETSİZ TM7", free: true }
  ],

  careerApplyUrl: "https://thermomix.vorwerk.com.tr/bizekatilin",

  manuals: [
    { title: "Thermomix® TM7 Kullanım Kılavuzu", url: "https://thermomix.vorwerk.com.tr/tr/tr/c/dam-home/products/thermomix/FINAL_print_TR_11008_V1.0_CoSy_API_20241213.pdf" },
    { title: "TM7 Kesme Aparatı Kılavuzu", url: "https://thermomix.vorwerk.com.tr/tr/tr/c/dam-home/products/thermomix/CUTTER.pdf" },
    { title: "Thermomix® TM6 Kullanım Kılavuzu", url: "https://thermomix.vorwerk.com.tr/tr/tr/c/dam-home/service/web_25348_V4.0_TM6_TR_20220817.pdf" },
    { title: "Thermomix® TM5 Kullanım Kılavuzu", url: "https://thermomix.vorwerk.com.tr/tr/tr/c/dam-home/service/23855_SC_GA_TM5_TR_V4__170210.pdf" }
  ],

  /* ---- AÇILIŞ KAMPANYA POPUP'I ---- */
  campaignPopup: {
    enabled: true,
    once: true,
    emoji: "🍽️",
    title: "Lezzeti Tamamlayın! Eylül Fırsatları",
    cta: "Kampanyaları & Yemek Takımını Gör →",
    target: "#kampanya",
    intervalMs: 6000
  },

  /* ---- ÜCRETSİZ TANITIM ATÖLYELERİ ---- */
  workshops: {
    note: "Şehrinizi seçin, uygun tarihi bulun ve ücretsiz TM7 tadım & tanıtım atölyesinde yerinizi ayırın.",
    directoryUrl: "https://linktr.ee/thermomixtr",
    storyUrl: "https://www.instagram.com/p/Dcv4S_kDjfi/",
    locations: [
      {
        city: "Ankara",
        region: "GOP & Ümitköy",
        formUrl: "https://forms.gle/aziYgUMWdVrRwe8y8",
        sessions: [
          { date: "3 Eylül Çarşamba", time: "12.00 – 14.00", place: "Ankara Şube Tanıtım Evi – GOP" },
          { date: "6 Eylül Cumartesi", time: "13.00 – 15.00", place: "Ankara Şube Tanıtım Evi – GOP" },
          { date: "10 Eylül Çarşamba", time: "12.00 – 14.00", place: "Cremama Coffee Ümitköy" },
          { date: "17 Eylül Çarşamba", time: "19.00 – 21.00", place: "Ankara Şube Tanıtım Evi – GOP" },
          { date: "24 Eylül Çarşamba", time: "12.00 – 14.00", place: "Cremama Coffee Ümitköy" }
        ]
      },
      {
        city: "İstanbul Anadolu",
        region: "1. Bölge · Suadiye Tanıtım Evi",
        formUrl: "https://forms.gle/zdNZ46PWth6r72cu7",
        info: "1–29 Eylül arasında Suadiye Tanıtım Evi'nde gündüz ve akşam seçenekleri bulunuyor. Formdan size uygun seansı seçebilirsiniz."
      },
      {
        city: "İstanbul Anadolu",
        region: "Şile · Pendik · Maltepe · Zoom",
        formUrl: "https://forms.gle/yEos1Aw99VQCKBSi9",
        sessions: [
          { date: "8 Eylül Salı", time: "12.00 – 14.00", place: "Şile Çakıl Coffee" },
          { date: "9 Eylül Çarşamba", time: "12.00 – 14.00", place: "Pendik Yenişehir Mado" },
          { date: "10 Eylül Perşembe", time: "12.00 – 14.00", place: "Maltepe Renzo Vita" },
          { date: "16 Eylül Çarşamba", time: "12.00 – 14.00", place: "Pendik Yenişehir Mado" },
          { date: "17 Eylül Perşembe", time: "12.00 – 14.00", place: "Maltepe Renzo Vita" },
          { date: "23 Eylül Çarşamba", time: "12.00 – 14.00", place: "Pendik Yenişehir Mado" },
          { date: "24 Eylül Perşembe", time: "12.00 – 14.00", place: "Maltepe Renzo Vita" },
          { date: "24 Eylül Perşembe", time: "21.00", place: "Zoom" }
        ]
      },
      {
        city: "İstanbul Avrupa",
        region: "Levent · Maslak · Online",
        formUrl: "https://forms.gle/yyf66nagbZx8LiXK8",
        sessions: [
          { date: "2, 3, 4 Eylül", time: "12.00 – 16.00", place: "Levent Tanıtım Evi" },
          { date: "3 Eylül Perşembe", time: "20.30 – 22.00", place: "Zoom Online" },
          { date: "8 Eylül Salı", time: "12.00 – 15.00", place: "DOOR Maslak" },
          { date: "9, 10, 11 Eylül", time: "12.00 – 16.00", place: "Levent Tanıtım Evi" },
          { date: "15 Eylül Salı", time: "12.00 – 15.00", place: "DOOR Maslak" },
          { date: "16, 17, 18 Eylül", time: "12.00 – 16.00", place: "Levent Tanıtım Evi" },
          { date: "22 Eylül Salı", time: "12.00 – 15.00", place: "DOOR Maslak" },
          { date: "23, 24, 25 Eylül", time: "12.00 – 16.00", place: "Levent Tanıtım Evi" },
          { date: "29 Eylül Salı", time: "12.00 – 15.00", place: "DOOR Maslak" },
          { date: "30 Eylül Çarşamba", time: "12.00 – 16.00", place: "Levent Tanıtım Evi" }
        ]
      },
      {
        city: "İstanbul Avrupa",
        region: "Bahçeşehir · Başakşehir · Beylikdüzü · Bayrampaşa · Mimaroba",
        formUrl: "https://forms.gle/MjeYeWWxD6rUk49w9",
        info: "2–29 Eylül arasında farklı gün ve mekân seçenekleri bulunuyor. Formu açarak size en yakın atölyeyi seçebilirsiniz."
      },
      {
        city: "İstanbul Avrupa",
        region: "Bahçelievler · Küçükçekmece · Arnavutköy · Fatih",
        formUrl: "https://forms.gle/FPQtpfmvnspW3QQt7",
        info: "2–28 Eylül arasında dört farklı ilçede ücretsiz atölyeler bulunuyor. Formdan ilçe ve tarih seçerek kayıt talebi oluşturabilirsiniz."
      },
      {
        city: "İzmir",
        region: "Alsancak · Foça · Urla · Zoom",
        formUrl: "https://forms.gle/apMTrW84eqKrAJrt9",
        sessions: [
          { date: "8 Eylül Salı", time: "12.30 – 15.00", place: "Alsancak Tanıtım Evi" },
          { date: "9 Eylül Çarşamba", time: "14.00 – 17.00", place: "Foça" },
          { date: "9 Eylül Çarşamba", time: "21.00", place: "Zoom" },
          { date: "10, 15, 17 Eylül", time: "12.30 – 15.00", place: "Alsancak Tanıtım Evi" },
          { date: "22 Eylül Salı", time: "14.00 – 17.00", place: "Alsancak Tanıtım Evi" },
          { date: "23 Eylül Çarşamba", time: "14.00 – 17.00", place: "Urla" },
          { date: "23 Eylül Çarşamba", time: "21.00", place: "Zoom" },
          { date: "24 Eylül Perşembe", time: "12.30 – 15.00", place: "Alsancak Tanıtım Evi" },
          { date: "29 Eylül Cuma", time: "14.00 – 17.00", place: "Alsancak Tanıtım Evi" }
        ]
      },
      {
        city: "Antalya",
        region: "Konyaaltı · Finike",
        formUrl: "https://forms.gle/PjJrenFSJLKz5fLUA",
        sessions: [
          { date: "2, 4, 9, 10, 11 Eylül", time: "13.00 – 16.00", place: "Antalya Tanıtım Evi – Konyaaltı" },
          { date: "12, 15, 16, 17, 19 Eylül", time: "13.00 – 16.00", place: "Antalya Tanıtım Evi – Konyaaltı" },
          { date: "22 Eylül Salı", time: "13.00 – 16.00", place: "Luna Event Finike" }
        ]
      },
      {
        city: "Adana",
        region: "Adana · Zoom",
        formUrl: "https://forms.gle/yjymvuvP9xZZhTsJ7",
        sessions: [
          { date: "3 Eylül Çarşamba", time: "21.00 – 23.00", place: "Zoom Online" },
          { date: "8 Eylül Salı", time: "14.00 – 16.00", place: "Adana" },
          { date: "15 Eylül Salı", time: "14.00 – 16.00", place: "Adana" },
          { date: "23 Eylül Çarşamba", time: "21.00 – 23.00", place: "Zoom Online" },
          { date: "24 Eylül Perşembe", time: "14.00 – 16.00", place: "Adana" }
        ]
      },
      {
        city: "Kayseri",
        region: "Mihrimah Kahve · Zoom",
        formUrl: "https://forms.gle/rK765FN4tkLwA7tn6",
        sessions: [
          { date: "5 Eylül Cumartesi", time: "20.00 – 22.00", place: "Kayseri Mihrimah Kahve" },
          { date: "8 Eylül Salı", time: "14.00 – 16.00", place: "Kayseri Mihrimah Kahve" },
          { date: "9 Eylül Çarşamba", time: "20.00 – 22.00", place: "Kayseri Mihrimah Kahve" },
          { date: "14 Eylül Pazartesi", time: "20.00 – 22.00", place: "Zoom Online" },
          { date: "16 Eylül Çarşamba", time: "20.00 – 22.00", place: "Kayseri Mihrimah Kahve" },
          { date: "17 Eylül Perşembe", time: "13.30 – 15.30", place: "Kayseri Mihrimah Kahve" },
          { date: "23 Eylül Çarşamba", time: "20.00 – 22.00", place: "Kayseri Mihrimah Kahve" },
          { date: "24 Eylül Perşembe", time: "20.00 – 22.00", place: "Zoom Online" },
          { date: "25 Eylül Cuma", time: "20.00 – 22.00", place: "Kayseri Mihrimah Kahve" },
          { date: "26 Eylül Cumartesi", time: "13.30 – 15.30", place: "Kayseri Mihrimah Kahve" }
        ]
      },
      {
        city: "Konya",
        region: "Konya Tanıtım Evi · Online",
        formUrl: "https://forms.gle/shNbeoq1nRLoAZB1A",
        sessions: [
          { date: "2 Eylül Çarşamba", time: "13.30 – 15.30", place: "Konya Tanıtım Evi" },
          { date: "3 Eylül Perşembe", time: "21.00 – 22.00", place: "Online" },
          { date: "5, 8 Eylül", time: "14.00 – 16.00", place: "Konya Tanıtım Evi" },
          { date: "8 Eylül Salı", time: "21.00 – 22.00", place: "Online" },
          { date: "9 Eylül Çarşamba", time: "20.00 – 22.00", place: "Konya Tanıtım Evi" },
          { date: "10 Eylül Perşembe", time: "13.00 – 15.00", place: "Konya Tanıtım Evi" },
          { date: "11, 12 Eylül", time: "14.00 – 16.00", place: "Konya Tanıtım Evi" },
          { date: "17 Eylül Perşembe", time: "20.00 – 22.00", place: "Konya Tanıtım Evi" },
          { date: "18, 20, 22 Eylül", time: "14.00 – 16.00", place: "Konya Tanıtım Evi" },
          { date: "23, 24 Eylül", time: "13.00 – 15.00", place: "Konya Tanıtım Evi" },
          { date: "25 Eylül Cuma", time: "20.00 – 22.00", place: "Konya Tanıtım Evi" },
          { date: "26 Eylül Cumartesi", time: "14.00 – 16.00", place: "Konya Tanıtım Evi" }
        ]
      },
      {
        city: "Diğer Şehirler",
        region: "Balıkesir · Bursa · Sivas · Mersin · Aksaray · Nevşehir · Gaziantep · Afyon · Hatay · Osmaniye · Sakarya · Kocaeli · Karaman · Eskişehir · Muğla",
        formUrl: "https://forms.gle/zF7ASjwjgEhDxLnT8",
        sessions: [
          { date: "4 Eylül Cuma", time: "12.00 – 15.00", place: "Edremit – Gabdonia Cafe" },
          { date: "7 Eylül Pazartesi", time: "12.00 – 15.00", place: "Bursa – Sembol Ocakbaşı Odunluk" },
          { date: "11 Eylül Cuma", time: "13.30 – 15.00", place: "Sivas – Yamaç Cafe" },
          { date: "11 Eylül Cuma", time: "14.00 – 16.00", place: "Mersin" },
          { date: "15 Eylül Salı", time: "13.00 – 15.00", place: "Aksaray" },
          { date: "18 Eylül Cuma", time: "12.30 – 14.30", place: "Nevşehir – Nevada Coffee" },
          { date: "18 Eylül Cuma", time: "12.00 – 15.00", place: "Gaziantep" },
          { date: "18 Eylül Cuma", time: "14.00 – 16.00", place: "Afyon – Bonovita Cafe" },
          { date: "18 Eylül Cuma", time: "14.00 – 16.00", place: "Hatay" },
          { date: "21 Eylül Pazartesi", time: "18.00 – 20.00", place: "Osmaniye" },
          { date: "22 Eylül Salı", time: "12.00", place: "Sakarya" },
          { date: "22 Eylül Salı", time: "19.00 – 21.00", place: "Kocaeli" },
          { date: "24 Eylül Perşembe", time: "13.00 – 15.00", place: "Karaman" },
          { date: "24 Eylül Perşembe", time: "14.00 – 16.00", place: "Eskişehir – Ojo Cafe" },
          { date: "25 Eylül Cuma", time: "14.00 – 17.00", place: "Ayvalık – Balıkesir" },
          { date: "26 Eylül Cumartesi", time: "14.00 – 16.00", place: "Gaziantep" },
          { date: "26 Eylül Cumartesi", time: "14.00 – 17.00", place: "Fethiye" },
          { date: "29 Eylül Salı", time: "12.00 – 14.00", place: "Kocaeli" }
        ]
      },
      {
        city: "Online Tanıtım",
        region: "Türkiye Geneli · Zoom",
        formUrl: "https://thermomix.vorwerk.com.tr/demo",
        ctaLabel: "Online Tanıtım Talep Et",
        info: "Bulunduğunuz şehirden ücretsiz TM7 tanıtımına katılın; cihazı, Cookidoo®'yu ve kampanyaları canlı olarak keşfedin."
      }
    ]
  },

  /* ---- KAMPANYA GERİ SAYIMI ---- */
  campaignEndsAt: "2026-09-30T23:59:59+03:00",
  campaignStockNote: "Stoklarla sınırlı kampanya",

  /* ---- HIZLI İLETİŞİM FORMU ---- */
  leadForm: {
    enabled: true,
    title: "30 Saniyede Bilgi Alın",
    sub: "Adınızı ve telefonunuzu bırakın — Yemek Takımı kampanya kodunu ve size en yakın ücretsiz tanıtım tarihini ileteyim.",
    buttonText: "Bilgi İstiyorum →",
    note: "Bilgileriniz kimseyle paylaşılmaz. Gönder'e bastığınızda WhatsApp hazır mesajla açılır."
  },

  /* ---- AYIN KAMPANYALARI & HEDİYELERİ ---- */
  campaignPeriod: "1 – 30 Eylül 2026 · Sınırlı Stok",
  campaigns: [
    { icon: "💳", title: "Vade Farksız 6 Taksit: 14.998₺/Ay", desc: "Thermomix® TM7'ye bütçenizi zorlamadan, vade farksız 6 taksitle ayda sadece 14.998₺ ödeyerek sahip olun!", tag: "ÖNE ÇIKAN FİRSAT" },
    { icon: "🍽️", image: "img/tm7-yemek-takimi.jpg", title: "Yemek Takımı 6.990₺ Yerine 2.750₺", desc: "1–30 Eylül tanıtıma katılıp TM7 alanlara, 6.990₺ değerindeki Thermomix® Yemek Takımı kupon koduyla sadece 2.750₺! (4.240₺ Tasarruf)", tag: "LEZZETİ TAMAMLAYIN" },
    { icon: "🏦", title: "10.000₺ Garanti Bonus", desc: "1–15 Eylül arası Garanti BBVA Bonus kartınızla, sanal POS üzerinden 3 takside kadar alışverişte 10.000₺ Bonus. Alışverişten önce BonusFlaş'ta \"Kampanyaya Katıl\"a tıklamayı unutmayın.", tag: "BONUS (1-15 EYLÜL)" },
    { icon: "📲", title: "3 Ay Ücretsiz Cookidoo®", desc: "İlk defa Cookidoo® aboneliği alanlara 3 aylık ücretsiz Cookidoo® üyeliği hediye.", tag: "HEDİYE" },
    { icon: "✨", title: "Şık Sofralar & Ziyafetler", desc: "Eylül boyunca Thermomix® TM7 ile pişirdiğiniz eşsiz lezzetleri şık Yemek Takımı ile sunun.", tag: "ÖZEL KOLEKSİYON" },
    { icon: "👩‍🍳", title: "Hanımlara Özel Ücretsiz Demo", desc: "Yüz yüze veya Zoom ile, yalnızca hanımlara özel ücretsiz tanıtım demosu ve tarif danışmanlığı.", tag: "HANIMLARA ÖZEL" }
  ],

  /* ---- INSTAGRAM GÖNDERİLERİ ---- */
  instagramPosts: [
    "https://www.instagram.com/p/DcImhQgDhJD/",
    "https://www.instagram.com/p/DcGy9jGqGv8/",
    "https://www.instagram.com/p/DM0Vu7dtxDX/",
    "https://www.instagram.com/reel/DZppd7-oKHN/",
    "https://www.instagram.com/reel/DZfUllAsgQF/"
  ],

  /* ---- AKSESUARLAR ---- */
  accessories: [
    { icon: "🔪", title: "Kesme Aparatı+", desc: "Dilimleme, rendeleme ve doğrama için pratik aparat. Kampanyalı fiyat — detay için yazın." },
    { icon: "🌫️", title: "Varoma Buhar Seti", desc: "Aynı anda birkaç katta buharda sağlıklı pişirme." },
    { icon: "🦋", title: "Çırpma Teli (Kelebek)", desc: "Krema, yumurta akı ve hafif karışımları çırpmak için." },
    { icon: "🥄", title: "Spatula", desc: "Güvenli karıştırma ve hazneyi temizleme için özel spatula." },
    { icon: "🧺", title: "Süzgeç Sepeti", desc: "Süzme, haşlama ve yıkama işlemleri için pratik sepet." },
    { icon: "🍶", title: "Karıştırma Kabı", desc: "Yedek/ikinci hazne ile kesintisiz mutfak akışı." }
  ],

  /* ---- TEK CİHAZ, KOCA BİR MUTFAK ---- */
  replaces: [
    { icon: "🥤", name: "Blender" },
    { icon: "🍲", name: "Düdüklü tencere" },
    { icon: "⚖️", name: "Mutfak terazisi" },
    { icon: "🌀", name: "Doğrayıcı / Rondo" },
    { icon: "🥛", name: "Yoğurt makinesi" },
    { icon: "🌫️", name: "Buhar / Varoma" },
    { icon: "🥄", name: "Mikser" },
    { icon: "🍚", name: "Pilav pişirici" },
    { icon: "☕", name: "Öğütücü" },
    { icon: "🍦", name: "Dondurma makinesi" },
    { icon: "🥣", name: "El blenderı" },
    { icon: "🔥", name: "Sote tavası" },
    { icon: "🫕", name: "Çikolata eritici" },
    { icon: "🥖", name: "Hamur yoğurucu" },
    { icon: "♨️", name: "Su ısıtıcı" },
    { icon: "🧈", name: "Krema çırpıcı" }
  ],

  /* ---- TM7 MODLARI / FONKSİYONLARI ---- */
  modes: [
    { icon: "🧫", name: "Mayalama", desc: "Ev yapımı yoğurt ve hamur kabartma (37–85°C, 12 saate kadar)." },
    { icon: "💧", name: "Su Isıtıcı", desc: "Çay, biberon, makarna için hızlı su ısıtma." },
    { icon: "⚖️", name: "Tartma", desc: "1 g hassasiyetle, 6 kg'a kadar dijital tartım." },
    { icon: "🌀", name: "Turbo", desc: "Yüksek hızda (10.700 devir) anlık doğrama/öğütme." },
    { icon: "🚿", name: "Ön Yıkama", desc: "Hazneyi saniyeler içinde hızlıca temizler." },
    { icon: "🥩", name: "Sous-Vide", desc: "Et, balık ve deniz ürünlerini nazikçe vakumda pişirir." },
    { icon: "🔥", name: "Yüksek Sıcaklık", desc: "Soğan karamelize, et sotelemede 160°C'ye kadar." },
    { icon: "🥤", name: "Karıştırma", desc: "Smoothie, püre ve çorbalarda kusursuz kıvam." },
    { icon: "🥖", name: "Hamur Yoğurma", desc: "Ekmek ve köfte hamuru için güçlü yoğurma (1 kg'a kadar)." },
    { icon: "🥣", name: "Koyulaştırma", desc: "Sosların kıvamını otomatik ayarlar." },
    { icon: "🍚", name: "Pilav Pişirici", desc: "Pirinç ve tahılları mükemmel pişirir." },
    { icon: "🥚", name: "Yumurta Haşlama", desc: "Beş farklı kıvamda yumurta seçeneği." },
    { icon: "🍲", name: "Yavaş Pişirme", desc: "Et ve güveçler için uzun, dokunmadan pişirme." },
    { icon: "🍬", name: "Şeker Aşamaları", desc: "Karamel, lolipop ve şekerleme için hassas kontrol." }
  ],

  /* ---- KULLANICI YORUMLARI ----*/
  testimonials: [
    { text: "Kullanmayı becerince gerçekten işleri kolaylaştırıyor; el altında hem rondo, hem pişiren bir şey, hem hassas tartı olması gerçekten güzel.", name: "Nimooo", source: "Kadınlar Kulübü" },
    { text: "Her iş için ayrı ayrı makineler var; bu, her işi bir arada topluyor. Çok mantıklı geliyor.", name: "Lady Guinevere", source: "Kadınlar Kulübü" },
    { text: "Bir şeyi parçalarken / pişirirken aynı anda başka iş yapabilmek, mutfağı toplayabilmek yeterince mucize.", name: "kahvetelvesi", source: "Kadınlar Kulübü" },
    { text: "Kek tariflerini güzel yapıyor, benim yerime köfteyi yoğuruyor; baya kullanışlı.", name: "Nimooo", source: "Kadınlar Kulübü" }
  ],

  /* ---- HİKAYELER (Instagram tarzı) ---- */
  stories: [
    { label: "@thermozeyno", emoji: "👩‍🍳", link: "https://instagram.com/thermozeyno" },
    { label: "Tarifler", emoji: "🍝", link: "https://www.youtube.com/@thermozeyno" },
    { label: "TM7", emoji: "✨", highlight: "https://www.instagram.com/stories/highlights/18279330316302892/", slides: [
      { emoji: "✨", title: "Thermomix® TM7", text: "Yeni nesil — 10 inç çoklu dokunmatik ekran", bg: "linear-gradient(160deg,#8134af,#dd2a7b)" },
      { emoji: "📲", title: "Cookidoo® Rehberli", text: "100.000+ tarif, ekranda adım adım yönlendirme", bg: "linear-gradient(160deg,#dd2a7b,#f58529)" },
      { emoji: "⚖️", title: "28 Fonksiyon", text: "Tartar, pişirir, doğrar, yoğurur, buharda pişirir", bg: "linear-gradient(160deg,#0a8d48,#0fbf61)" },
      { emoji: "🎬", title: "Hikayenin Tamamı", text: "TM7 öne çıkanlarını Instagram'da izle", bg: "linear-gradient(160deg,#1f2937,#4b5563)" }
    ] },
    { label: "@thermomixtr", emoji: "🟢", link: "https://instagram.com/thermomixtr" },
    { label: "Yemek Takımı", emoji: "🍽️", link: "#kampanya" },
    { label: "Kampanya", emoji: "🎁", link: "#kampanya" },
    { label: "Atölyeler", emoji: "🎪", link: "#atolyeler" },
    { label: "Demo", emoji: "🎬", link: "#danisman" }
  ]
};
