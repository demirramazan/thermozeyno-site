# Zeynep Demir · Thermomix® danışman sitesi

Bağımsız Thermomix® danışmanı Zeynep Demir'in (Danışman ID: TM048014) tanıtım ve satın alma sitesi. Statik HTML/CSS/JS; derleme adımı yok.

## Sayfalar

| Dosya | İçerik |
| --- | --- |
| `index.html` | Ana sayfa: aylık kampanya, TM7 tanıtımı, atölye takvimi, fiyat ve sipariş, iletişim formu, SSS |
| `danisman-ol.html` | Danışmanlık ve 4U Kazanç Programı, ön başvuru formu |
| `siparis-adimlari.html` | Adım adım sipariş rehberi |

## Her ay güncellenen yerler

Neredeyse her şey `config.js` içinden yönetilir:

- `models` — fiyat, taksit sayısı, paket içeriği, satın alma bağlantısı
- `campaignEndsAt`, `campaignStockNote` — kampanya geri sayımı
- `workshops` — atölye takvimi (`S(gün, "Gün", "saat", "yer", "tema")`); `year` ve `month` güncellenmeli, tarihi geçen atölyeler otomatik gizlenir
- `consultantProgram`, `consultantTiers` — danışman programı
- `testimonials`, `manuals`, iletişim bilgileri

Ay adı geçen sabit metinler (kampanya başlığı, SSS) `index.html` ve `siparis-adimlari.html` içindedir.

## Yerelde çalıştırma

```bash
node server.js
```

Ardından tarayıcıda http://localhost:8000 adresini açın (Windows'ta `siteyi-baslat.bat` da olur).

## Yayın

- **Vercel:** https://thermozeyno.vercel.app
- **GitHub Pages:** depo ayarlarında *Settings → Pages → Deploy from a branch → `master` / `(root)`* seçildiğinde `https://demirramazan.github.io/thermozeyno-site/` adresinde yayınlanır.

Thermomix® ve Cookidoo®, Vorwerk'in tescilli markalarıdır. Bu site bağımsız bir danışmana aittir; satış ve ödeme resmî Vorwerk Türkiye kanalı üzerinden yapılır.
