/* Site davranışları — tüm sayfalarda ortak.
   İçerik (fiyat, atölyeler, yorumlar) config.js'ten okunur. */
(function () {
  "use strict";
  var cfg = window.THERMOMIX_CONFIG || {};
  var doc = document;
  doc.documentElement.classList.add("js");

  function $(sel, root) { return (root || doc).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function priceToNum(s) { return parseFloat(String(s || "").replace(/[^\d,]/g, "").replace(/\./g, "").replace(",", ".")) || 0; }
  function tl(n) { return Math.round(n).toLocaleString("tr-TR") + " ₺"; }
  function icon(name) { return '<svg class="i" aria-hidden="true"><use href="img/icons.svg#' + name + '"/></svg>'; }

  /* ---------- Bağlantılar ---------- */
  var waNum = String(cfg.whatsappNumber || "").replace(/\D/g, "");
  function waLink(msg) {
    if (!waNum) return "#";
    return "https://wa.me/" + waNum + "?text=" + encodeURIComponent(msg || cfg.whatsappMessage || "Merhaba Zeynep Hanım, Thermomix hakkında bilgi almak istiyorum.");
  }
  function external(a, url) {
    a.href = url || "#";
    if (url) { a.target = "_blank"; a.rel = "noopener"; }
  }
  $$(".js-wa").forEach(function (a) { external(a, waLink(a.getAttribute("data-msg"))); });
  $$(".js-ig").forEach(function (a) { external(a, cfg.instagramUrl); });
  $$(".js-yt").forEach(function (a) { external(a, cfg.youtubeUrl); });

  /* ---------- Danışman bilgisi, yıl ---------- */
  $$(".js-advisor-id").forEach(function (el) { if (cfg.advisorId) el.textContent = cfg.advisorId; });
  $$(".js-advisor-name").forEach(function (el) { if (cfg.advisorName) el.textContent = cfg.advisorName; });
  $$(".js-year").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Fiyat (config.models[0]) ---------- */
  var model = (cfg.models || [])[0];
  if (model) {
    var n = parseInt(model.installments, 10) || 1;
    var base = priceToNum(model.installmentBase || model.price);
    $$(".js-installments").forEach(function (el) { el.textContent = n; });
    $$(".js-monthly").forEach(function (el) { el.textContent = tl(base / n); });
    $$(".js-total").forEach(function (el) { el.textContent = tl(base); });
    $$(".js-buy").forEach(function (a) { external(a, String(model.url || "").replace("{ID}", encodeURIComponent(cfg.advisorId || ""))); });
    $$(".js-includes").forEach(function (ul) {
      ul.innerHTML = (model.includes || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    });
  }

  /* ---------- Kullanım kılavuzları (alt bilgi) ---------- */
  $$(".js-manuals").forEach(function (ul) {
    if (!cfg.manuals || !cfg.manuals.length) return;
    ul.innerHTML = cfg.manuals.map(function (m) {
      return '<li><a href="' + esc(m.url) + '" target="_blank" rel="noopener">' + esc(m.title.replace("Thermomix® ", "").replace(" Kullanım Kılavuzu", " kılavuzu")) + "</a></li>";
    }).join("");
  });

  /* ---------- Mobil menü ---------- */
  var toggle = $(".nav-toggle");
  var menu = $("#nav-links");
  function setMenu(open) {
    doc.body.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    }
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () { setMenu(!doc.body.classList.contains("nav-open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 960) setMenu(false); });
  }

  /* ---------- Kampanya geri sayımı ---------- */
  var cd = $("#campaign-countdown");
  if (cd && cfg.campaignEndsAt) {
    var end = new Date(cfg.campaignEndsAt).getTime();
    var tick = function () {
      var left = end - Date.now();
      if (!(left > 0)) { cd.hidden = true; return; }
      var d = Math.floor(left / 86400000), h = Math.floor(left / 3600000) % 24;
      cd.innerHTML = icon("clock") + "<span>Kampanyanın bitmesine <strong>" + (d ? d + " gün " : "") + h + " saat</strong> kaldı" +
        (cfg.campaignStockNote ? " · " + esc(cfg.campaignStockNote) : "") + "</span>";
      cd.hidden = false;
    };
    tick();
    setInterval(tick, 60000);
  }

  /* ---------- Danışman ID kopyalama ---------- */
  $$(".js-copy-id").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var label = $("span", btn);
      var done = function () {
        if (label) label.textContent = "Kopyalandı";
        setTimeout(function () { if (label) label.textContent = "Kopyala"; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cfg.advisorId || "").then(done, done);
      } else { done(); }
    });
  });

  /* ---------- Video: tıklayınca yüklenir ---------- */
  $$(".video-facade").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-yt");
      var frame = doc.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
      frame.title = btn.getAttribute("aria-label") || "Video";
      frame.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      frame.allowFullscreen = true;
      var wrap = doc.createElement("div");
      wrap.className = "video-frame";
      wrap.appendChild(frame);
      btn.parentNode.replaceChild(wrap, btn);
    });
  });

  /* ---------- Kullanıcı yorumları ---------- */
  var quotes = $("#testimonials");
  if (quotes) {
    var list = (cfg.testimonials || []).slice(0, 3);
    if (!list.length) { var qs = quotes.closest("section"); if (qs) qs.hidden = true; }
    quotes.innerHTML = list.map(function (t) {
      return '<figure class="quote">' + icon("quote") + "<blockquote>" + esc(t.text) + "</blockquote>" +
        "<figcaption><strong>" + esc(t.name) + "</strong>" + (t.source ? "<span>" + esc(t.source) + "</span>" : "") + "</figcaption></figure>";
    }).join("");
  }

  /* ---------- Atölye takvimi ---------- */
  var ws = $("#workshops");
  var w = cfg.workshops;
  if (ws && w && w.locations && w.locations.length) {
    var locations = w.locations;
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var upcoming = function (s) { return !s.d || !w.year || !w.month || new Date(w.year, w.month - 1, s.d) >= today; };
    var isToday = function (s) { return s.d && w.year && w.month && new Date(w.year, w.month - 1, s.d).getTime() === today.getTime(); };
    var SHOW = 6;
    var monthShort = (w.monthLabel || "").slice(0, 3);

    ws.innerHTML =
      '<div class="ws-picker">' +
        '<label class="ws-select"><span class="sr-only">Şehir seçin</span>' + icon("pin") +
          '<select id="ws-select">' + locations.map(function (l, i) { return '<option value="' + i + '">' + esc(l.city) + "</option>"; }).join("") + "</select>" +
          icon("chevron-down") + "</label>" +
        '<div class="ws-tabs" role="tablist" aria-label="Şehirler">' +
          locations.map(function (l, i) {
            return '<button type="button" role="tab" class="ws-tab" data-i="' + i + '" aria-selected="false">' + esc(l.city) + "</button>";
          }).join("") +
        "</div>" +
      "</div>" +
      '<div class="ws-panel" id="ws-panel" role="tabpanel"></div>';

    var panel = $("#ws-panel", ws);
    var select = $("#ws-select", ws);
    var tabs = $$(".ws-tab", ws);

    var render = function (i) {
      var loc = locations[i];
      var sessions = (loc.sessions || []).filter(upcoming);
      var all = (loc.sessions || []).length;
      var rows = sessions.map(function (s, k) {
        var parts = String(s.date || "").split(" ");
        var dayName = parts.slice(2).join(" ");
        return '<li class="ws-item' + (k >= SHOW ? " is-extra" : "") + (isToday(s) ? " is-today" : "") + '">' +
          '<div class="ws-date"><strong>' + esc(parts[0]) + "</strong><span>" + esc(monthShort || parts[1] || "") + "</span></div>" +
          '<div class="ws-info"><p class="ws-when">' + esc(dayName) + " · " + esc(s.time) + (isToday(s) ? ' <em class="ws-badge">Bugün</em>' : "") + "</p>" +
          '<p class="ws-place">' + esc(s.place) + "</p>" +
          (s.topic ? '<p class="ws-topic">' + esc(s.topic) + "</p>" : "") + "</div></li>";
      }).join("");
      var body;
      if (sessions.length) {
        body = '<ul class="ws-list">' + rows + "</ul>" +
          (sessions.length > SHOW ? '<button type="button" class="ws-more">Tüm tarihleri göster (' + sessions.length + ")</button>" : "");
      } else {
        body = '<p class="ws-empty">' + esc(loc.info || (all ? (w.monthLabel || "Bu ay") + " atölyeleri bu bölgede tamamlandı. Yeni tarihler için kayıt formunu doldurun ya da WhatsApp'tan yazın." : "Güncel tarihler için iletişime geçin.")) + "</p>";
      }
      panel.innerHTML =
        '<div class="ws-panel-head"><div><h3>' + esc(loc.city) + "</h3>" + (loc.region ? "<p>" + esc(loc.region) + "</p>" : "") + "</div>" +
          (sessions.length ? '<span class="ws-count">' + sessions.length + " atölye · ücretsiz</span>" : "") + "</div>" +
        body +
        '<div class="ws-actions">' +
          '<a class="btn btn-primary" href="' + esc(loc.formUrl || w.directoryUrl || "#") + '" target="_blank" rel="noopener">' + esc(loc.ctaLabel || "Kayıt formunu aç") + " " + icon("external") + "</a>" +
          '<a class="btn btn-outline" href="' + esc(waLink("Merhaba Zeynep Hanım, " + loc.city + " tanıtım atölyesine katılmak istiyorum.")) + '"' + (waNum ? ' target="_blank" rel="noopener"' : "") + ">" + icon("whatsapp") + " Benimle kayıt olun</a>" +
        "</div>";
      var more = $(".ws-more", panel);
      if (more) more.addEventListener("click", function () { panel.classList.add("show-all"); more.remove(); });
      tabs.forEach(function (t, k) { t.setAttribute("aria-selected", k === i ? "true" : "false"); });
      select.value = String(i);
    };

    tabs.forEach(function (t) {
      t.addEventListener("click", function () { render(parseInt(t.getAttribute("data-i"), 10)); });
    });
    select.addEventListener("change", function () { render(parseInt(select.value, 10)); });
    render(0);
  }

  /* ---------- Hızlı iletişim formu → WhatsApp ---------- */
  var form = $("#lead-form");
  if (form) {
    var err = $("#lead-error");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.elements.name.value || "").trim();
      var phone = (form.elements.phone.value || "").trim();
      var city = form.elements.city ? (form.elements.city.value || "").trim() : "";
      var problem = name.length < 2 ? "Lütfen adınızı yazın." :
        phone.replace(/\D/g, "").length < 10 ? "Lütfen geçerli bir telefon numarası yazın." : "";
      if (problem) { err.textContent = problem; err.hidden = false; return; }
      err.hidden = true;
      if (!waNum) return;
      var msg = "Merhaba Zeynep Hanım, Thermomix TM7 ve Kasım kampanyası hakkında bilgi almak istiyorum.\nAdım: " + name + "\nTelefonum: " + phone + (city ? "\nŞehrim: " + city : "");
      window.open(waLink(msg), "_blank", "noopener");
      if (window.gtag) window.gtag("event", "form_gonderildi", { form: "hizli_iletisim" });
      form.reset();
    });
  }

  /* ---------- Kaydırma: üst menü gölgesi, mobil işlem çubuğu ---------- */
  var header = $(".site-header");
  var hero = $(".hero, .page-hero");
  var footer = $(".site-footer");
  var ticking = false;
  var onScroll = function () {
    ticking = false;
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 4);
    var pastHero = !hero || hero.getBoundingClientRect().bottom < 60;
    var nearEnd = footer && footer.getBoundingClientRect().top < window.innerHeight - 40;
    doc.body.classList.toggle("show-bar", pastHero && !nearEnd);
  };
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
})();
