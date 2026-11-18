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

  /* Vorwerk bağlantılarına danışman bilgisini ekler: {REF} → TM048014@ZEYNEP_DEMİR (adres için kodlanmış) */
  function advisorUrl(url) {
    return String(url || "")
      .replace("{REF}", encodeURIComponent(cfg.advisorRef || "").replace(/%40/g, "@"))
      .replace("{ID}", encodeURIComponent(cfg.advisorId || ""));
  }
  $$(".js-store").forEach(function (a) { if (cfg.advisorStoreUrl) external(a, advisorUrl(cfg.advisorStoreUrl)); });

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
    $$(".js-buy").forEach(function (a) { external(a, advisorUrl(model.url)); });
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
    var lower = function (t) { return String(t || "").toLocaleLowerCase("tr-TR"); };
    var showroomFor = function (place) {
      var p = lower(place);
      return (cfg.showrooms || []).filter(function (r) {
        return (r.match || [r.name]).some(function (m) { return p.indexOf(lower(m)) > -1; });
      })[0] || null;
    };
    var isOnline = function (place) { return /online|zoom/i.test(place || ""); };
    var mapsUrl = function (q) { return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); };
    var searchCity = function (loc) {
      var c = String(loc.city || "").replace(/\s+(Anadolu|Avrupa)\b.*$/i, "");
      return /diğer|online/i.test(c) ? "" : c;
    };
    var detailHtml = function (loc, s) {
      var when = s.date + " · " + s.time;
      var msg = "Merhaba Zeynep Hanım, " + when + " tarihli " + s.place + (s.topic ? " (" + s.topic + ")" : "") + " atölyesine kayıt olmak istiyorum.";
      var reg = '<a class="btn btn-primary btn-sm" href="' + esc(waLink(msg)) + '"' + (waNum ? ' target="_blank" rel="noopener"' : "") + ">" + icon("whatsapp") + " Bu tarihe kayıt ol</a>";
      var room = showroomFor(s.place);
      var info, map = "";
      if (room) {
        info = icon("pin") + "<div><strong>Thermomix " + esc(room.name) + "</strong><span>" + esc(room.address) + "</span></div>";
        map = '<a class="btn btn-outline btn-sm" href="' + esc(mapsUrl("Thermomix " + room.name + ", " + room.address)) + '" target="_blank" rel="noopener">' + icon("pin") + " Haritada aç</a>";
      } else if (isOnline(s.place)) {
        info = icon("screen") + "<div><strong>Online katılım</strong><span>Zoom bağlantısı kayıttan sonra size iletilir.</span></div>";
      } else {
        var city = searchCity(loc);
        info = icon("pin") + "<div><strong>" + esc(s.place) + "</strong><span>Açık adres kayıttan sonra iletilir; yaklaşık konumu haritada görebilirsiniz.</span></div>";
        map = '<a class="btn btn-outline btn-sm" href="' + esc(mapsUrl(s.place + (city ? ", " + city : ""))) + '" target="_blank" rel="noopener">' + icon("pin") + " Haritada ara</a>";
      }
      return '<div class="ws-detail-info">' + info + '</div><div class="ws-detail-actions">' + reg + map + "</div>";
    };

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
        var did = "ws-d-" + i + "-" + k;
        var room = showroomFor(s.place);
        return '<li class="ws-item' + (k >= SHOW ? " is-extra" : "") + (isToday(s) ? " is-today" : "") + '">' +
          '<button type="button" class="ws-row" aria-expanded="false" aria-controls="' + did + '">' +
            '<span class="ws-date"><strong>' + esc(parts[0]) + "</strong><span>" + esc(monthShort || parts[1] || "") + "</span></span>" +
            '<span class="ws-info"><span class="ws-when">' + esc(dayName) + " · " + esc(s.time) + (isToday(s) ? ' <em class="ws-badge">Bugün</em>' : "") + "</span>" +
            '<span class="ws-place">' + esc(s.place) + (room ? ' <em class="ws-house">Tanıtım evi</em>' : "") + "</span>" +
            (s.topic ? '<span class="ws-topic">' + esc(s.topic) + "</span>" : "") + "</span>" +
            '<span class="ws-chevron">' + icon("chevron-down") + "</span>" +
          "</button>" +
          '<div class="ws-detail" id="' + did + '" hidden>' + detailHtml(loc, s) + "</div></li>";
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
        (sessions.length ? '<p class="ws-hint">' + icon("pin") + " Adres ve kayıt için bir tarihe dokunun.</p>" : "") +
        body +
        '<div class="ws-actions">' +
          '<a class="btn btn-primary" href="' + esc(loc.formUrl || w.directoryUrl || "#") + '" target="_blank" rel="noopener">' + esc(loc.ctaLabel || "Kayıt formunu aç") + " " + icon("external") + "</a>" +
          '<a class="btn btn-outline" href="' + esc(waLink("Merhaba Zeynep Hanım, " + loc.city + " tanıtım atölyesine katılmak istiyorum.")) + '"' + (waNum ? ' target="_blank" rel="noopener"' : "") + ">" + icon("whatsapp") + " Benimle kayıt olun</a>" +
        "</div>";
      var more = $(".ws-more", panel);
      if (more) more.addEventListener("click", function () { panel.classList.add("show-all"); more.remove(); });
      /* Açılır satırlar: aynı anda tek satır açık */
      $$(".ws-row", panel).forEach(function (btn) {
        btn.addEventListener("click", function () {
          var open = btn.getAttribute("aria-expanded") === "true";
          $$(".ws-row", panel).forEach(function (b) {
            b.setAttribute("aria-expanded", "false");
            b.parentNode.classList.remove("is-open");
            var d = doc.getElementById(b.getAttribute("aria-controls"));
            if (d) d.hidden = true;
          });
          if (!open) {
            btn.setAttribute("aria-expanded", "true");
            btn.parentNode.classList.add("is-open");
            var det = doc.getElementById(btn.getAttribute("aria-controls"));
            if (det) det.hidden = false;
          }
        });
      });
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

/* Tanıtım evleri + giriş kampanya penceresi */
(function () {
  "use strict";
  var cfg = window.THERMOMIX_CONFIG || {};
  var doc = document;
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(name) { return '<svg class="i" aria-hidden="true"><use href="img/icons.svg#' + name + '"/></svg>'; }
  var waNum = String(cfg.whatsappNumber || "").replace(/\D/g, "");
  function waLink(msg) { return waNum ? "https://wa.me/" + waNum + "?text=" + encodeURIComponent(msg || "") : "#"; }

  /* ---------- Tanıtım evleri ---------- */
  var box = doc.getElementById("showrooms");
  var list = doc.getElementById("showroom-list");
  if (box && list && cfg.showrooms && cfg.showrooms.length) {
    list.innerHTML = cfg.showrooms.map(function (r) {
      var maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Thermomix " + r.name + ", " + r.address);
      return '<li class="showroom">' +
        '<span class="showroom-city">' + esc(r.city) + "</span>" +
        "<h4>" + esc(r.name) + "</h4>" +
        "<p>" + esc(r.address) + "</p>" +
        '<a href="' + esc(maps) + '" target="_blank" rel="noopener">' + icon("pin") + " Haritada aç</a></li>";
    }).join("");
    var cnt = box.querySelector(".js-showroom-count");
    if (cnt) cnt.textContent = cfg.showrooms.length;
    var det = doc.getElementById("showroom-details");
    var openRooms = function () { if (det) det.open = true; };
    if (location.hash === "#tanitim-evleri") openRooms();
    doc.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href$="#tanitim-evleri"]');
      if (a) openRooms();
    });
    var src = box.querySelector(".js-showroom-source");
    if (src) src.href = cfg.showroomSourceUrl || "https://thermomix.vorwerk.com.tr/pages/vorwerk-stores";
    box.hidden = false;
  }

  /* ---------- Giriş kampanya bildirimi (geçişli slaytlar) ---------- */
  var cp = cfg.campaignPopup;
  var slides = cp && cp.slides ? cp.slides : [];
  if (!cp || !cp.enabled || !slides.length || !doc.querySelector(".hero")) return;
  var KEY = "tm_campaign_seen";
  try { if (cp.once && sessionStorage.getItem(KEY)) return; } catch (e) {}
  if (cfg.campaignEndsAt && new Date(cfg.campaignEndsAt).getTime() < Date.now()) return;

  var INTERVAL = cp.intervalMs || 5000;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var idx = 0, timer = null, lastFocus = null;

  var pop = doc.createElement("div");
  pop.className = "npop";
  pop.setAttribute("role", "dialog");
  pop.setAttribute("aria-modal", "true");
  pop.setAttribute("aria-label", "Kampanyalar");
  pop.innerHTML =
    '<div class="npop-backdrop" data-close></div>' +
    '<div class="npop-card">' +
      '<button type="button" class="npop-close" data-close aria-label="Kapat">' + icon("close") + "</button>" +
      '<div class="npop-track">' +
        slides.map(function (s, i) {
          return '<a class="npop-slide' + (i === 0 ? " is-active" : "") + (s.fit === "contain" ? " is-contain" : "") + '" href="' + esc(s.link || "#kampanya") + '" data-go' +
            (i === 0 ? "" : ' tabindex="-1" aria-hidden="true"') + ">" +
            '<img src="' + esc(s.image) + '" alt="' + esc(s.alt || s.title || "") + '"' + (i === 0 ? "" : ' loading="lazy"') + " />" +
            '<span class="npop-cap">' +
              (s.tag ? '<span class="npop-tag">' + esc(s.tag) + "</span>" : "") +
              "<strong>" + esc(s.title || "") + "</strong>" +
              (s.text ? "<span>" + esc(s.text) + "</span>" : "") +
              '<span class="npop-more">İncele ' + icon("arrow-right") + "</span>" +
            "</span></a>";
        }).join("") +
      "</div>" +
      (slides.length > 1
        ? '<button type="button" class="npop-nav npop-prev" data-prev aria-label="Önceki">' + icon("arrow-right") + "</button>" +
          '<button type="button" class="npop-nav npop-next" data-next aria-label="Sonraki">' + icon("arrow-right") + "</button>" +
          '<div class="npop-dots" role="tablist" aria-label="Slaytlar">' +
            slides.map(function (_, i) {
              return '<button type="button" class="npop-dot' + (i === 0 ? " is-active" : "") + '" data-dot="' + i + '" aria-label="' + (i + 1) + '. slayt"><i></i></button>';
            }).join("") +
          "</div>"
        : "") +
    "</div>";

  var items = pop.querySelectorAll(".npop-slide");
  var dots = pop.querySelectorAll(".npop-dot");

  function show(i) {
    idx = (i + items.length) % items.length;
    Array.prototype.forEach.call(items, function (el, k) {
      var on = k === idx;
      el.classList.toggle("is-active", on);
      if (on) { el.removeAttribute("tabindex"); el.removeAttribute("aria-hidden"); }
      else { el.setAttribute("tabindex", "-1"); el.setAttribute("aria-hidden", "true"); }
    });
    Array.prototype.forEach.call(dots, function (d, k) {
      d.classList.toggle("is-active", k === idx);
      d.setAttribute("aria-selected", k === idx ? "true" : "false");
    });
    restart();
  }
  function stop() { if (timer) { clearTimeout(timer); timer = null; } pop.classList.remove("is-playing"); }
  function restart() {
    stop();
    if (reduce || items.length < 2) return;
    void pop.offsetWidth;            // ilerleme çubuğu animasyonunu baştan başlat
    pop.classList.add("is-playing");
    pop.style.setProperty("--npop-interval", INTERVAL + "ms");
    timer = setTimeout(function () { show(idx + 1); }, INTERVAL);
  }
  function markSeen() { try { if (cp.once) sessionStorage.setItem(KEY, "1"); } catch (e) {} }
  function close() {
    stop(); markSeen();
    pop.classList.remove("is-open");
    doc.body.classList.remove("modal-open");
    doc.removeEventListener("keydown", onKey);
    setTimeout(function () { if (pop.parentNode) pop.parentNode.removeChild(pop); }, 250);
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} }
  }
  function onKey(e) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") show(idx + 1);
    else if (e.key === "ArrowLeft") show(idx - 1);
  }

  pop.addEventListener("click", function (e) {
    var t = e.target;
    if (t.closest("[data-close]")) { close(); return; }
    if (t.closest("[data-next]")) { show(idx + 1); return; }
    if (t.closest("[data-prev]")) { show(idx - 1); return; }
    var dot = t.closest("[data-dot]");
    if (dot) { show(parseInt(dot.getAttribute("data-dot"), 10)); return; }
    var go = t.closest("[data-go]");
    if (go) {
      var href = go.getAttribute("href") || "";
      if (href.charAt(0) === "#") {
        /* Sayfa içi bağlantı: pencereyi kapat, kilit kalkınca bölüme kaydır */
        e.preventDefault();
        close();
        var target = doc.querySelector(href);
        setTimeout(function () {
          if (target) {
            target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
            /* Yedek: yumuşak kaydırma çalışmadıysa doğrudan git */
            setTimeout(function () {
              if (Math.abs(target.getBoundingClientRect().top) > 200 && window.scrollY < 10) {
                var root = doc.documentElement, prev = root.style.scrollBehavior;
                root.style.scrollBehavior = "auto";
                target.scrollIntoView({ block: "start" });
                root.style.scrollBehavior = prev;
              }
            }, 900);
          }
          if (history.replaceState) history.replaceState(null, "", href);
        }, 30);
      } else {
        close();                                   // başka sayfaya normal şekilde gider
      }
    }
  });
  var card = pop.querySelector(".npop-card");
  card.addEventListener("mouseenter", stop);
  card.addEventListener("mouseleave", restart);

  /* Dokunmatik: sağa/sola kaydırma */
  var sx = null, moved = false;
  card.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; moved = false; stop(); }, { passive: true });
  card.addEventListener("touchmove", function (e) { if (sx !== null && Math.abs(e.touches[0].clientX - sx) > 10) moved = true; }, { passive: true });
  card.addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (dx < -40) show(idx + 1); else if (dx > 40) show(idx - 1); else restart();
  }, { passive: true });
  card.addEventListener("click", function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);

  setTimeout(function () {
    if (doc.body.classList.contains("nav-open")) return;
    lastFocus = doc.activeElement;
    doc.body.appendChild(pop);
    doc.body.classList.add("modal-open");
    requestAnimationFrame(function () { pop.classList.add("is-open"); restart(); });
    doc.addEventListener("keydown", onKey);
    var c = pop.querySelector(".npop-close");
    if (c) c.focus({ preventScroll: true });
  }, cp.delayMs || 1500);
})();
