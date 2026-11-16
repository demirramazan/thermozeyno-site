/* ============================================================
   AYARLAR — Sadece burayı düzenleyin
   ============================================================ */

/* Atölye satırı: S(gün, "Gün adı", "saat", "yer", "özel atölye teması")
   Gün sayısı (d) sayesinde tarihi geçen atölyeler sitede otomatik gizlenir. */
function S(d, dayName, time, place, topic) {
  return { d: d, date: d + " Kasım " + dayName, time: time, place: place, topic: topic || "" };
}

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
      sku: "TM7 + Karıştırma Kabı",
      name: "Thermomix® TM7 + Thermomix® Karıştırma Kabı",
      tag: "KASIM FIRSATI · İÇİNİZİ ISITAN FIRSAT",
      oldPrice: "105.980,00 TL",
      price: "95.990,00 TL",
      /* Taksit vurgusu: aylık tutar bu ikisinden otomatik hesaplanır.
         installmentBase = vade farksız taksite giren tutar (TM7 fiyatı). */
      installments: 9,
      installmentBase: "89.990,00 TL",
      image: "img/kampanya-kasim.jpg",
      includes: [
        "Thermomix® TM7 — vade farksız 9 taksitle 89.990₺ (9.998,89₺/ay)",
        "Thermomix® Karıştırma Kabı — kupon koduyla 6.000₺ (liste: 15.990₺ · 9.990₺ tasarruf)",
        "Daha önce yıllık abonelik almamış hesaplara 3 ay ücretsiz Cookidoo®",
        "KDV dahil · ücretsiz kargo"
      ],
      details: "Kampanya 1 – 30 Kasım 2026 tarihleri arasında geçerlidir. Bağımsız Thermomix® danışmanlarının tanıtımlarından en az birine katılıp aynı tarihlerde Thermomix® TM7 satın alanlara, 15.990₺ değerindeki Thermomix® Karıştırma Kabı size özel kupon koduyla 6.000₺! TM7 vade farksız 9 taksitle 89.990₺'dir (9.998,89₺/ay). Daha önce yıllık Cookidoo® aboneliği satın almamış hesaplara 3 aylık Cookidoo® üyeliği ücretsiz; süre, üyeliğin cihazdan aktive edildiği tarihte başlar. Satın alma sırasında danışmanınızı belirtmeniz zorunludur. Kampanya toplam 2.500 adet TM7 ile sınırlıdır, başka kampanyalarla birleştirilemez; kupon yalnızca Karıştırma Kabı alımında kullanılır, nakde çevrilemez.",
      url: "https://thermomix.vorwerk.com.tr/products/thermomix-tm7"
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
  instagramMessage: "Merhaba Zeynep Hanım, Kasım ayı Thermomix TM7 ve Karıştırma Kabı kampanyası hakkında bilgi almak istiyorum 🙂",
  youtubeUrl: "https://www.youtube.com/@thermozeyno",
  whatsappNumber: "905464022099",
  whatsappMessage: "Merhaba Zeynep Hanım, Kasım ayı Thermomix TM7 ve Karıştırma Kabı kampanyası hakkında bilgi almak istiyorum 🙂",
  email: "",

  gaMeasurementId: "G-65HE3LLNSQ",

  /* ---- Danışman satış kademeleri ---- */
  consultantTiers: [
    { count: 1, reward: "%20 indirim" },
    { count: 2, reward: "%50 indirim" },
    { count: 3, reward: "%80 indirim" },
    { count: 4, reward: "ÜCRETSİZ TM7", free: true }
  ],

  /* ---- 4U Kazanç Programı (danisman-ol.html) ---- */
  consultantProgram: {
    name: "4U Kazanç Programı",
    deadline: "2026-12-31T23:59:59+03:00",
    deadlineLabel: "31 Aralık 2026",
    oldDeadlineLabel: "31 Ekim",
    standardTarget: 6,
    programTarget: 4,
    devicePrice: 89990,
    sourceUrl: "https://www.instagram.com/p/DfPihf2jgJn/"
  },

  careerApplyUrl: "https://thermomix.vorwerk.com.tr/pages/join-us",

  manuals: [
    { title: "Thermomix® TM7 Kullanım Kılavuzu", url: "https://thermomix.vorwerk.com.tr/tr/tr/c/dam-home/products/thermomix/FINAL_print_TR_11008_V1.0_CoSy_API_20241213.pdf" },
    { title: "TM7 Kesme Aparatı Kılavuzu", url: "https://thermomix.vorwerk.com.tr/tr/tr/c/dam-home/products/thermomix/CUTTER.pdf" },
    { title: "Thermomix® TM6 Kullanım Kılavuzu", url: "https://thermomix.vorwerk.com.tr/tr/tr/c/dam-home/service/web_25348_V4.0_TM6_TR_20220817.pdf" },
    { title: "Thermomix® TM5 Kullanım Kılavuzu", url: "https://thermomix.vorwerk.com.tr/tr/tr/c/dam-home/service/23855_SC_GA_TM5_TR_V4__170210.pdf" }
  ],

  /* ---- AÇILIŞ KAMPANYA POPUP'I ---- */
  campaignPopup: {
    enabled: false,
    once: true,
    emoji: "🍂",
    title: "İçinizi Isıtan Fırsat! Kasım Kampanyası",
    cta: "9 Taksit & Karıştırma Kabı Fırsatını Gör →",
    target: "#kampanya",
    intervalMs: 6000
  },

  /* ---- ÜCRETSİZ TANITIM ATÖLYELERİ (Kasım 2026) ----
     Kaynak: @thermomixtr "Kasım Ayı Thermomix® Atölyeleri" paylaşımı.
     year/month: tarihi geçen satırların otomatik gizlenmesi için (month: 1-12). */
  workshops: {
    year: 2026,
    month: 11,
    monthLabel: "Kasım",
    note: "Şehrinizi seçin, uygun tarihi bulun ve ücretsiz TM7 Tadım & Tanıtım Atölyesinde yerinizi ayırın.",
    directoryUrl: "https://linktr.ee/thermomixtr",
    storyUrl: "https://www.instagram.com/p/DfWbBmnju14/",
    locations: [
      {
        city: "İstanbul Anadolu 1",
        region: "Suadiye · Maltepe · Üsküdar · Beykoz · Ümraniye · Çekmeköy",
        formUrl: "https://forms.gle/zdNZ46PWth6r72cu7",
        sessions: [
          S(3, "Salı", "12.00 – 15.00", "Suadiye Tanıtım Evi"),
          S(3, "Salı", "19.00 – 21.00", "Suadiye Tanıtım Evi"),
          S(5, "Perşembe", "12.00 – 15.00", "Suadiye Tanıtım Evi"),
          S(7, "Cumartesi", "12.00 – 15.00", "Suadiye Tanıtım Evi"),
          S(10, "Salı", "12.00 – 15.00", "Suadiye Tanıtım Evi"),
          S(10, "Salı", "19.00 – 21.00", "Suadiye Tanıtım Evi"),
          S(12, "Perşembe", "12.00 – 15.00", "Suadiye Tanıtım Evi"),
          S(12, "Perşembe", "12.00", "Maltepe Tanıtım & Tadım Atölyesi"),
          S(14, "Cumartesi", "12.00 – 15.00", "Suadiye Tanıtım Evi"),
          S(17, "Salı", "12.00 – 15.00", "Suadiye Tanıtım Evi"),
          S(17, "Salı", "19.00 – 21.00", "Suadiye Tanıtım Evi"),
          S(18, "Çarşamba", "12.00", "Üsküdar Tanıtım & Tadım Atölyesi"),
          S(18, "Çarşamba", "21.00", "Online · Zoom", "Online Yemek Atölyesi"),
          S(19, "Perşembe", "12.00", "Beykoz Tanıtım & Tadım Atölyesi"),
          S(19, "Perşembe", "12.00 – 15.00", "Suadiye Tanıtım Evi"),
          S(21, "Cumartesi", "12.00 – 15.00", "Suadiye Tanıtım Evi"),
          S(24, "Salı", "12.00", "Ümraniye Tanıtım & Tadım Atölyesi"),
          S(24, "Salı", "12.00 – 15.00", "Suadiye Tanıtım Evi"),
          S(24, "Salı", "19.00 – 21.00", "Suadiye Tanıtım Evi"),
          S(25, "Çarşamba", "12.00", "Çekmeköy Tanıtım & Tadım Atölyesi"),
          S(26, "Perşembe", "12.00 – 15.00", "Suadiye Tanıtım Evi"),
          S(28, "Cumartesi", "12.00 – 15.00", "Suadiye Tanıtım Evi")
        ]
      },
      {
        city: "İstanbul Anadolu 2",
        region: "Şile · Pendik · Tuzla · Online",
        formUrl: "https://forms.gle/yEos1Aw99VQCKBSi9",
        sessions: [
          S(9, "Pazartesi", "12.00 – 14.00", "Şile Çakıl Coffee"),
          S(11, "Çarşamba", "12.00 – 14.00", "Pendik – Yenişehir Mado"),
          S(11, "Çarşamba", "21.00 – 22.00", "Online"),
          S(13, "Cuma", "12.00 – 14.00", "Chocolabs – Tuzla"),
          S(16, "Pazartesi", "12.00 – 14.00", "Şile Çakıl Coffee"),
          S(18, "Çarşamba", "12.00 – 14.00", "Pendik – Yenişehir Mado"),
          S(20, "Cuma", "12.00 – 14.00", "Chocolabs – Tuzla"),
          S(23, "Pazartesi", "12.00 – 14.00", "Şile Çakıl Coffee"),
          S(25, "Çarşamba", "12.00 – 14.00", "Pendik – Yenişehir Mado"),
          S(27, "Cuma", "12.00 – 14.00", "Chocolabs – Tuzla")
        ]
      },
      {
        city: "İstanbul Avrupa 1",
        region: "Levent Tanıtım Evi · DOOR Maslak · Zoom",
        formUrl: "https://forms.gle/yyf66nagbZx8LiXK8",
        sessions: [
          S(2, "Pazartesi", "14.00 – 17.00", "Levent Tanıtım Evi"),
          S(3, "Salı", "12.00 – 16.00", "DOOR Maslak"),
          S(4, "Çarşamba", "12.00 – 16.00", "Levent Tanıtım Evi"),
          S(5, "Perşembe", "12.00 – 16.00", "Levent Tanıtım Evi"),
          S(5, "Perşembe", "20.30 – 22.00", "Online · Zoom", "Online Tanıtım Atölyesi"),
          S(6, "Cuma", "12.00 – 16.00", "Levent Tanıtım Evi"),
          S(9, "Pazartesi", "14.00 – 17.00", "Levent Tanıtım Evi"),
          S(10, "Salı", "12.00 – 16.00", "DOOR Maslak"),
          S(11, "Çarşamba", "12.00 – 16.00", "Levent Tanıtım Evi"),
          S(12, "Perşembe", "12.00 – 16.00", "Levent Tanıtım Evi"),
          S(13, "Cuma", "12.00 – 16.00", "Levent Tanıtım Evi", "Kahvaltı Lezzetleri"),
          S(14, "Cumartesi", "12.00 – 16.00", "Levent Tanıtım Evi"),
          S(16, "Pazartesi", "14.00 – 17.00", "Levent Tanıtım Evi"),
          S(17, "Salı", "12.00 – 16.00", "DOOR Maslak"),
          S(18, "Çarşamba", "12.00 – 16.00", "Levent Tanıtım Evi", "TM7 ile Pizza Atölyesi"),
          S(19, "Perşembe", "14.00 – 17.00", "Levent Tanıtım Evi"),
          S(20, "Cuma", "14.00 – 17.00", "Levent Tanıtım Evi"),
          S(23, "Pazartesi", "14.00 – 17.00", "Levent Tanıtım Evi"),
          S(24, "Salı", "12.00 – 16.00", "DOOR Maslak"),
          S(25, "Çarşamba", "12.00 – 16.00", "Levent Tanıtım Evi", "Sushi Atölyesi"),
          S(26, "Perşembe", "12.00 – 16.00", "Levent Tanıtım Evi"),
          S(27, "Cuma", "12.00 – 16.00", "Levent Tanıtım Evi"),
          S(28, "Cumartesi", "12.00 – 16.00", "Levent Tanıtım Evi"),
          S(30, "Pazartesi", "14.00 – 17.00", "Levent Tanıtım Evi")
        ]
      },
      {
        city: "İstanbul Avrupa 2",
        region: "Bahçeşehir · Başakşehir · Beylikdüzü · Bayrampaşa · Silivri · Büyükçekmece",
        formUrl: "https://forms.gle/MjeYeWWxD6rUk49w9",
        sessions: [
          S(2, "Pazartesi", "13.00 – 16.00", "Bahçeşehir Tanıtım Evi"),
          S(3, "Salı", "12.00 – 15.00", "Bahçeşehir Tanıtım Evi", "Vegan Lezzetler Atölyesi"),
          S(4, "Çarşamba", "12.00 – 15.00", "Başakşehir"),
          S(5, "Perşembe", "12.00 – 15.00", "Beylikdüzü"),
          S(5, "Perşembe", "19.00 – 21.00", "Bahçeşehir Tanıtım Evi"),
          S(6, "Cuma", "14.00 – 16.00", "Bahçeşehir Tanıtım Evi", "Thermomix ile Kahve ve Kahve Yanı Lezzetler"),
          S(9, "Pazartesi", "13.00 – 16.00", "Bahçeşehir Tanıtım Evi"),
          S(10, "Salı", "12.00 – 15.00", "Bahçeşehir Tanıtım Evi"),
          S(11, "Çarşamba", "12.00 – 15.00", "Bahçeşehir Tanıtım Evi"),
          S(12, "Perşembe", "12.00 – 15.00", "Bayrampaşa"),
          S(12, "Perşembe", "20.30 – 22.00", "Online · Zoom", "Online Tanıtım Atölyesi"),
          S(13, "Cuma", "12.00 – 15.00", "Bahçeşehir Tanıtım Evi"),
          S(16, "Pazartesi", "13.00 – 16.00", "Bahçeşehir Tanıtım Evi"),
          S(17, "Salı", "12.00 – 15.00", "Bahçeşehir Tanıtım Evi", "Minik Şeflerle Pizza ve Çikolatalı Lezzetler"),
          S(17, "Salı", "19.00 – 21.00", "Bahçeşehir Tanıtım Evi"),
          S(18, "Çarşamba", "12.00 – 15.00", "Silivri"),
          S(19, "Perşembe", "12.00 – 15.00", "Bahçeşehir Tanıtım Evi", "Börek Atölyesi"),
          S(20, "Cuma", "12.00 – 15.00", "Bahçeşehir Tanıtım Evi"),
          S(21, "Cumartesi", "12.00 – 15.00", "Bahçeşehir Tanıtım Evi"),
          S(23, "Pazartesi", "13.00 – 16.00", "Bahçeşehir Tanıtım Evi"),
          S(24, "Salı", "12.00 – 15.00", "Büyükçekmece"),
          S(25, "Çarşamba", "12.00 – 15.00", "Bahçeşehir Tanıtım Evi", "Taze Makarna Atölyesi"),
          S(25, "Çarşamba", "19.00 – 21.00", "Bahçeşehir Tanıtım Evi"),
          S(26, "Perşembe", "12.00 – 15.00", "Beylikdüzü"),
          S(27, "Cuma", "12.00 – 15.00", "Bahçeşehir Tanıtım Evi"),
          S(28, "Cumartesi", "12.00 – 15.00", "Bahçeşehir Tanıtım Evi"),
          S(29, "Pazar", "12.00 – 15.00", "Levent Tanıtım Evi", "İşitme Engelliler için Tadım & Tanıtım Atölyesi")
        ]
      },
      {
        city: "İstanbul Avrupa 3",
        region: "Fatih · Arnavutköy · Bakırköy · Küçükçekmece · Bağcılar · Bahçelievler",
        formUrl: "https://forms.gle/FPQtpfmvnspW3QQt7",
        sessions: [
          S(2, "Pazartesi", "13.00 – 15.00", "Fatih"),
          S(3, "Salı", "15.00 – 17.00", "Arnavutköy"),
          S(4, "Çarşamba", "12.00 – 14.00", "Bakırköy"),
          S(5, "Perşembe", "12.00 – 14.00", "Küçükçekmece"),
          S(7, "Cumartesi", "12.00 – 14.00", "Bağcılar"),
          S(9, "Pazartesi", "13.00 – 15.00", "Fatih"),
          S(11, "Çarşamba", "12.00 – 14.00", "Bahçelievler"),
          S(12, "Perşembe", "12.00 – 14.00", "Bağcılar"),
          S(14, "Cumartesi", "12.00 – 14.00", "Arnavutköy"),
          S(16, "Pazartesi", "13.00 – 15.00", "Fatih"),
          S(17, "Salı", "15.00 – 17.00", "Arnavutköy"),
          S(18, "Çarşamba", "12.00 – 14.00", "Bakırköy"),
          S(18, "Çarşamba", "20.30 – 22.00", "Online", "Online Tanıtım Atölyesi"),
          S(19, "Perşembe", "12.00 – 14.00", "Küçükçekmece"),
          S(23, "Pazartesi", "13.00 – 15.00", "Fatih"),
          S(24, "Salı", "15.00 – 17.00", "Arnavutköy"),
          S(25, "Çarşamba", "12.00 – 14.00", "Bahçelievler"),
          S(26, "Perşembe", "12.00 – 14.00", "Bağcılar"),
          S(28, "Cumartesi", "12.00 – 14.00", "Bahçelievler")
        ]
      },
      {
        city: "Ankara",
        region: "Ankara Tanıtım Evi · Ümitköy · Macunköy",
        formUrl: "https://forms.gle/aziYgUMWdVrRwe8y8",
        sessions: [
          S(7, "Cumartesi", "13.00 – 15.00", "Ankara Tanıtım Evi"),
          S(10, "Salı", "12.00 – 14.00", "Ankara Tanıtım Evi"),
          S(12, "Perşembe", "13.00 – 15.00", "Ankara Tanıtım Evi"),
          S(14, "Cumartesi", "13.00 – 15.00", "Ankara Tanıtım Evi"),
          S(17, "Salı", "13.00 – 15.00", "Ankara Tanıtım Evi"),
          S(18, "Çarşamba", "12.00 – 14.00", "Ümitköy Cremama Coffee"),
          S(19, "Perşembe", "13.00 – 15.00", "Ankara Tanıtım Evi"),
          S(20, "Cuma", "19.00 – 21.00", "Ankara Tanıtım Evi"),
          S(21, "Cumartesi", "13.00 – 15.00", "Ankara Tanıtım Evi"),
          S(24, "Salı", "12.00 – 14.00", "Ankara Tanıtım Evi"),
          S(25, "Çarşamba", "12.00 – 14.00", "Macunköy Lady Desert & Drink"),
          S(28, "Cumartesi", "13.00 – 15.00", "Ankara Tanıtım Evi")
        ]
      },
      {
        city: "İzmir",
        region: "Alsancak · Karşıyaka · Gaziemir · Narlıdere · Bornova · Online",
        formUrl: "https://forms.gle/apMTrW84eqKrAJrt9",
        sessions: [
          S(4, "Çarşamba", "14.00", "Gaziemir Tanıtım Atölyesi"),
          S(4, "Çarşamba", "21.00", "Online Tanıtım Atölyesi"),
          S(5, "Perşembe", "15.00", "Alsancak Tanıtım Atölyesi"),
          S(10, "Salı", "12.30", "Alsancak Tanıtım Atölyesi"),
          S(12, "Perşembe", "12.30", "Alsancak Tanıtım Atölyesi"),
          S(12, "Perşembe", "13.00", "Karşıyaka Tanıtım Atölyesi"),
          S(17, "Salı", "12.30", "Alsancak Tanıtım Atölyesi"),
          S(18, "Çarşamba", "14.00", "Narlıdere Tanıtım Atölyesi"),
          S(18, "Çarşamba", "21.00", "Online Tanıtım Atölyesi"),
          S(19, "Perşembe", "12.30", "Alsancak Tanıtım Atölyesi"),
          S(19, "Perşembe", "13.00", "Karşıyaka Tanıtım Atölyesi"),
          S(20, "Cuma", "14.00", "Alsancak", "Mezeler Atölyesi"),
          S(24, "Salı", "12.30", "Alsancak Tanıtım Atölyesi"),
          S(25, "Çarşamba", "12.00", "Bornova Tanıtım Atölyesi"),
          S(25, "Çarşamba", "14.00", "Gaziemir Tanıtım Atölyesi"),
          S(25, "Çarşamba", "21.00", "Online Tanıtım Atölyesi"),
          S(26, "Perşembe", "12.30", "Alsancak Tanıtım Atölyesi"),
          S(26, "Perşembe", "13.00", "Karşıyaka Tanıtım Atölyesi")
        ]
      },
      {
        city: "Antalya",
        region: "Antalya Tanıtım Evi",
        formUrl: "https://forms.gle/PjJrenFSJLKz5fLUA",
        sessions: [
          S(4, "Çarşamba", "13.00 – 16.00", "Antalya Tanıtım Evi", "Pizza Atölyesi"),
          S(10, "Salı", "13.00 – 16.00", "Antalya Tanıtım Evi", "Salata ve Mezeler Atölyesi"),
          S(11, "Çarşamba", "13.00 – 16.00", "Antalya Tanıtım Evi"),
          S(12, "Perşembe", "13.00 – 16.00", "Antalya Tanıtım Evi", "Kış Çorbaları Atölyesi"),
          S(13, "Cuma", "13.00 – 16.00", "Antalya Tanıtım Evi"),
          S(19, "Perşembe", "13.00 – 16.00", "Antalya Tanıtım Evi"),
          S(20, "Cuma", "13.00 – 16.00", "Antalya Tanıtım Evi", "Makarna Atölyesi"),
          S(24, "Salı", "13.00 – 16.00", "Antalya Tanıtım Evi")
        ]
      },
      {
        city: "Adana",
        region: "Adana",
        formUrl: "https://forms.gle/yjymvuvP9xZZhTsJ7",
        sessions: [
          S(5, "Perşembe", "13.00 – 15.00", "Adana"),
          S(7, "Cumartesi", "13.00 – 15.00", "Adana"),
          S(12, "Perşembe", "13.00 – 15.00", "Adana"),
          S(19, "Perşembe", "13.00 – 15.00", "Adana"),
          S(25, "Çarşamba", "13.00 – 15.00", "Adana")
        ]
      },
      {
        city: "Bursa",
        region: "Bursa · Karacabey · Gemlik · Mudanya · Balıkesir",
        formUrl: "https://forms.gle/zF7ASjwjgEhDxLnT8",
        sessions: [
          S(10, "Salı", "13.00 – 16.00", "Karacabey – Kafe"),
          S(16, "Pazartesi", "13.00 – 16.00", "Sembol Ocakbaşı Restaurant"),
          S(17, "Salı", "13.00 – 16.00", "Gemlik – Kafe"),
          S(18, "Çarşamba", "13.00 – 16.00", "Millet Mahallesi – Kafe"),
          S(20, "Cuma", "13.00 – 16.00", "Balıkesir – Kafe"),
          S(25, "Çarşamba", "13.00 – 16.00", "Mudanya Kafe")
        ]
      },
      {
        city: "Kocaeli",
        region: "Başiskele · İzmit · Çayırova",
        formUrl: "https://forms.gle/zF7ASjwjgEhDxLnT8",
        sessions: [
          S(10, "Salı", "12.00 – 14.00", "Başiskele – İskele Naila Cafe"),
          S(12, "Perşembe", "12.00 – 14.00", "İzmit – Caffe Negra"),
          S(17, "Salı", "19.00 – 21.00", "Mutlukent Çayırova – Elite Mutfak"),
          S(19, "Perşembe", "12.00 – 14.00", "İzmit – Caffe Negra"),
          S(24, "Salı", "12.00 – 14.00", "Başiskele – Monia Cafe")
        ]
      },
      {
        city: "Kayseri",
        region: "Mihrimah Kahve · Zoom",
        formUrl: "https://forms.gle/rK765FN4tkLwA7tn6",
        sessions: [
          S(3, "Salı", "20.00 – 22.00", "Online · Zoom"),
          S(4, "Çarşamba", "20.00 – 22.00", "Kayseri Mihrimah Kahve", "Fit Lezzetler Atölyesi"),
          S(6, "Cuma", "13.30 – 15.30", "Kayseri Mihrimah Kahve", "Ekşi Maya Ekmek Atölyesi"),
          S(6, "Cuma", "20.00 – 22.00", "Kayseri Mihrimah Kahve", "Arabaşı Atölyesi"),
          S(9, "Pazartesi", "20.00 – 22.00", "Online · Zoom", "Ana Yemekler Atölyesi"),
          S(10, "Salı", "20.00 – 22.00", "Online · Zoom"),
          S(13, "Cuma", "20.00 – 22.00", "Kayseri Mihrimah Kahve", "Tatlıdan Makarnaya Lezzet Atölyesi"),
          S(16, "Pazartesi", "20.00 – 22.00", "Online · Zoom"),
          S(17, "Salı", "13.30 – 15.30", "Kayseri Mihrimah Kahve", "Tatlı Atölyesi"),
          S(17, "Salı", "20.00 – 22.00", "Online · Zoom"),
          S(19, "Perşembe", "20.00 – 22.00", "Kayseri Mihrimah Kahve", "Pilav Atölyesi"),
          S(20, "Cuma", "20.00 – 22.00", "Kayseri Mihrimah Kahve", "Ekmek Üstü Lezzetler Atölyesi"),
          S(24, "Salı", "20.00 – 22.00", "Online · Zoom"),
          S(27, "Cuma", "19.00 – 21.00", "Kayseri Mihrimah Kahve"),
          S(28, "Cumartesi", "13.30 – 15.30", "Kayseri Mihrimah Kahve", "Ketojenik Beslenme Atölyesi")
        ]
      },
      {
        city: "Konya",
        region: "Konya Tanıtım Evi · Zoom",
        formUrl: "https://forms.gle/shNbeoq1nRLoAZB1A",
        sessions: [
          S(3, "Salı", "14.00", "Konya Tanıtım Evi", "Glutensiz"),
          S(4, "Çarşamba", "18.00", "Konya Tanıtım Evi", "Sıcak Yemekler"),
          S(5, "Perşembe", "12.00", "Konya Tanıtım Evi"),
          S(5, "Perşembe", "20.00", "Zoom", "Online Tanıtım"),
          S(7, "Cumartesi", "13.30", "Konya Tanıtım Evi", "Ekmek Atölyesi"),
          S(8, "Pazar", "14.00", "Konya Tanıtım Evi"),
          S(12, "Perşembe", "12.00", "Konya Tanıtım Evi"),
          S(13, "Cuma", "19.00", "Konya Tanıtım Evi"),
          S(15, "Pazar", "14.00", "Konya Tanıtım Evi"),
          S(17, "Salı", "13.30", "Konya Tanıtım Evi", "Fast Food Atölyesi"),
          S(18, "Çarşamba", "13.00", "Konya Tanıtım Evi", "Kore Yemekleri"),
          S(19, "Perşembe", "13.00", "Konya Tanıtım Evi", "Pizza Atölyesi"),
          S(21, "Cumartesi", "18.00", "Konya Tanıtım Evi", "Balık Atölyesi"),
          S(24, "Salı", "13.00", "Konya Tanıtım Evi", "Diyet Tarifler"),
          S(25, "Çarşamba", "18.00", "Konya Tanıtım Evi", "Makarna Atölyesi"),
          S(26, "Perşembe", "13.00", "Konya Tanıtım Evi", "İtalyan Lezzetleri"),
          S(26, "Perşembe", "20.00", "Zoom", "Online Tanıtım"),
          S(27, "Cuma", "15.00", "Konya Tanıtım Evi", "Beş Çayı Atölyesi"),
          S(28, "Cumartesi", "13.00", "Konya Tanıtım Evi")
        ]
      },
      {
        city: "Manisa",
        region: "Güzelyurt",
        formUrl: "https://forms.gle/zF7ASjwjgEhDxLnT8",
        sessions: [
          S(10, "Salı", "18.00", "Manisa Güzelyurt Tanıtım Atölyesi"),
          S(17, "Salı", "18.00", "Manisa Güzelyurt Tanıtım Atölyesi")
        ]
      },
      {
        city: "Diğer İller",
        region: "Aksaray · Mersin · Eskişehir · Elazığ · Sakarya · Gaziantep · Karaman · Akhisar · Nevşehir · Denizli · Aydın · Muğla · Osmaniye · Hatay · Kırşehir",
        formUrl: "https://forms.gle/zF7ASjwjgEhDxLnT8",
        sessions: [
          S(6, "Cuma", "13.00", "Aksaray"),
          S(10, "Salı", "14.00 – 16.00", "Mersin"),
          S(11, "Çarşamba", "13.00 – 15.00", "Eskişehir"),
          S(12, "Perşembe", "12.30 – 15.30", "Yamaç Cafe"),
          S(16, "Pazartesi", "13.00 – 15.00", "Elazığ – Harput Dibek Kahve"),
          S(17, "Salı", "12.00", "Sakarya"),
          S(17, "Salı", "13.00 – 15.00", "Gaziantep"),
          S(20, "Cuma", "13.00", "Karaman"),
          S(20, "Cuma", "13.00 – 15.00", "Doku Cafe"),
          S(21, "Cumartesi", "14.00", "Akhisar"),
          S(21, "Cumartesi", "13.30 – 15.30", "Nevşehir – Nevada Coffee"),
          S(23, "Pazartesi", "12.00", "Aydın"),
          S(23, "Pazartesi", "18.00", "Denizli"),
          S(24, "Salı", "13.00", "Fethiye"),
          S(24, "Salı", "14.00 – 16.00", "Osmaniye"),
          S(24, "Salı", "19.00", "Muğla Dalaman"),
          S(26, "Perşembe", "13.00 – 15.00", "Hatay"),
          S(27, "Cuma", "13.00 – 15.00", "Kırşehir – Afife Sanat Atölyesi"),
          S(28, "Cumartesi", "12.00", "Sakarya")
        ]
      },
      {
        city: "Online Tanıtım",
        region: "Türkiye Geneli · Zoom",
        formUrl: "https://thermomix.vorwerk.com.tr/pages/tm7-book-a-demo#form",
        ctaLabel: "Online Tanıtım Talep Et",
        info: "Bulunduğunuz şehirden ücretsiz TM7 tanıtımına katılın; cihazı, Cookidoo®'yu ve Kasım kampanyasını canlı olarak keşfedin. Dilerseniz bana WhatsApp'tan yazın, size özel bir Zoom tanıtımı planlayalım."
      }
    ]
  },

  /* ---- KAMPANYA GERİ SAYIMI ---- */
  campaignEndsAt: "2026-11-30T23:59:59+03:00",
  campaignStockNote: "Toplam 2.500 adet TM7 ile sınırlı",

  /* ---- HIZLI İLETİŞİM FORMU ---- */
  leadForm: {
    enabled: true,
    title: "30 Saniyede Bilgi Alın",
    sub: "Adınızı ve telefonunuzu bırakın — Karıştırma Kabı kupon kodunu ve size en yakın ücretsiz tanıtım tarihini ileteyim.",
    buttonText: "Bilgi İstiyorum →",
    note: "Bilgileriniz kimseyle paylaşılmaz. Gönder'e bastığınızda WhatsApp hazır mesajla açılır."
  },

  /* ---- AYIN KAMPANYALARI & HEDİYELERİ ---- */
  campaignPeriod: "1 – 30 Kasım 2026 · 2.500 Adetle Sınırlı",
  campaigns: [
    { icon: "💳", title: "Vade Farksız 9 Taksit: 9.999₺/Ay", desc: "Thermomix® TM7'ye bütçenizi zorlamadan, vade farksız 9 taksitle ayda yaklaşık 9.999₺ ödeyerek sahip olun (toplam 89.990₺).", tag: "ÖNE ÇIKAN FIRSAT" },
    { icon: "🥣", title: "Karıştırma Kabı 15.990₺ Yerine 6.000₺", desc: "1–30 Kasım'da tanıtıma katılıp TM7 alanlara, 15.990₺ değerindeki ikinci Thermomix® Karıştırma Kabı size özel kupon koduyla 6.000₺! (9.990₺ tasarruf)", tag: "İÇİNİZİ ISITAN FIRSAT" },
    { icon: "📲", title: "3 Ay Ücretsiz Cookidoo®", desc: "Daha önce yıllık Cookidoo® aboneliği almamış hesaplara 3 aylık üyelik ücretsiz. Süre, üyeliği cihazdan aktive ettiğiniz gün başlar.", tag: "HEDİYE" },
    { icon: "🎪", title: "Önce Tanıtım, Sonra Fırsat", desc: "Kampanya için satın almadan önce bir tanıtıma katılmak ve siparişte danışmanınızı belirtmek şart. Size en yakın ücretsiz atölyeyi birlikte seçelim.", tag: "KOŞUL" },
    { icon: "🍲", title: "İki Kap, Kesintisiz Mutfak", desc: "Çorba bir kapta pişerken tatlıyı diğerinde hazırlayın. İkinci Karıştırma Kabı ile yıkama beklemeden tarife devam edin.", tag: "NEDEN İKİNCİ KAP?" },
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
    { icon: "🥣", title: "Karıştırma Kabı", desc: "İkinci hazne ile kesintisiz mutfak akışı. Kasım'da TM7 alanlara kuponla 15.990₺ yerine 6.000₺." }
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
    { label: "Karıştırma Kabı", emoji: "🥣", link: "#kampanya" },
    { label: "Kampanya", emoji: "🎁", link: "#kampanya" },
    { label: "Atölyeler", emoji: "🎪", link: "#atolyeler" },
    { label: "Danışman Ol", emoji: "💚", link: "danisman-ol.html" },
    { label: "Demo", emoji: "🎬", link: "#danisman" }
  ]
};
