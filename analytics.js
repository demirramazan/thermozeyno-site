/* Google Analytics (GA4) + tıklama takibi.
   config.js içindeki gaMeasurementId doluysa çalışır (G-XXXXXXXXXX).
   Satın al, WhatsApp, danışman, Instagram, YouTube tıklamalarını olay olarak gönderir. */
(function () {
  var cfg = window.THERMOMIX_CONFIG || {};
  var id = cfg.gaMeasurementId;
  if (!id || /^G-XXX/.test(id)) return; // kimlik girilmemişse hiçbir şey yapma

  // GA4 yükle
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id);

  // Tıklamaları olay olarak gönder
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a) return;
    var href = (a.getAttribute("href") || "").toLowerCase();
    var event = null, label = a.textContent.trim().slice(0, 60);

    if (href.indexOf("wa.me") > -1 || href.indexOf("whatsapp") > -1) event = "whatsapp_tikla";
    else if (href.indexOf("vorwerk.com.tr") > -1 || a.id === "buy-link") event = "satin_al_tikla";
    else if (href.indexOf("danisman-ol") > -1) event = "danisman_ol_tikla";
    else if (href.indexOf("siparis-adimlari") > -1) event = "siparis_adimlari_tikla";
    else if (href.indexOf("instagram.com") > -1 || href.indexOf("ig.me") > -1) event = "instagram_tikla";
    else if (href.indexOf("youtube.com") > -1 || href.indexOf("youtu.be") > -1) event = "youtube_tikla";

    if (event) gtag("event", event, { link_url: href, link_text: label });
  }, true);
})();
