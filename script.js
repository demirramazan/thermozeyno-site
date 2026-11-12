(function () {
  var cfg = window.THERMOMIX_CONFIG || {};
  function set(id, fn) { var el = document.getElementById(id); if (el) fn(el); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  }); }
  function withId(url) { return String(url || "#").replace("{ID}", encodeURIComponent(cfg.advisorId || "")); }
  function priceToNum(s) { return parseFloat(String(s || "").replace(/[^\d,]/g, "").replace(/\./g, "").replace(",", ".")) || 0; }
  function numToTRY(n) { return n.toLocaleString("tr-TR") + " TL"; }

  /* Yıl */
  set("year", function (el) { el.textContent = new Date().getFullYear(); });

  /* Mobil menü aç/kapat */
  (function () {
    var btn = document.getElementById("nav-toggle");
    var menu = document.getElementById("nav-links");
    if (!btn || !menu) return;
    function closeMenu() { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  })();

  /* Açılış kampanya popup'ı */
  (function () {
    var cp = cfg.campaignPopup;
    if (!cp || cp.enabled === false) return;
    var KEY = "tmx_campaign_popup_seen";
    if (cp.once) {
      try { if (sessionStorage.getItem(KEY)) return; } catch (e) { /* sessionStorage yoksa devam */ }
    }
    var target = cp.target || "#kampanya";
    var camps = cfg.campaigns || [];
    // Otomatik geçiş süresi (5–10 sn arası, varsayılan 6 sn)
    var INTERVAL = Math.min(10000, Math.max(5000, cp.intervalMs || 6000));

    var slidesHtml = camps.map(function (c) {
      var tag = c.tag ? '<span class="cpop-tag">' + esc(c.tag) + '</span>' : "";
      var visual = c.image
        ? '<img class="cpop-slide-img" src="' + esc(c.image) + '" alt="" data-emoji="' + esc(c.icon || "🎁") + '" />'
        : '<span class="cpop-slide-emoji">' + esc(c.icon || "🎁") + '</span>';
      return '<div class="cpop-slide">' + tag + visual +
        '<h4 class="cpop-slide-title">' + esc(c.title || "") + '</h4>' +
        '<p class="cpop-slide-desc">' + esc(c.desc || "") + '</p></div>';
    }).join("");
    var dotsHtml = camps.map(function (_, k) {
      return '<button type="button" class="cpop-dot' + (k === 0 ? " on" : "") + '" data-cpop-dot="' + k + '" aria-label="Kampanya ' + (k + 1) + '"></button>';
    }).join("");

    var pop = document.createElement("div");
    pop.className = "cpop";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-modal", "true");
    pop.setAttribute("aria-label", cp.title || "Kampanyalar");
    pop.innerHTML =
      '<div class="cpop-backdrop" data-cpop-close></div>' +
      '<div class="cpop-card">' +
        '<button type="button" class="cpop-close" data-cpop-close aria-label="Kapat">×</button>' +
        '<h3 class="cpop-title">' + esc(cp.emoji || "🎁") + ' ' + esc(cp.title || "Bu Ayın Kampanyaları") + '</h3>' +
        '<a class="cpop-viewport" href="' + esc(target) + '" aria-label="' + esc(cp.cta || "Kampanyaları Gör") + '">' +
          '<div class="cpop-track">' + slidesHtml + '</div>' +
        '</a>' +
        (camps.length > 1 ? '<div class="cpop-dots">' + dotsHtml + '</div>' : "") +
        '<a class="cpop-cta" href="' + esc(target) + '">' + esc(cp.cta || "Kampanyaları Gör →") + '</a>' +
      '</div>';
    document.body.appendChild(pop);

    var track = pop.querySelector(".cpop-track");
    var dots = pop.querySelectorAll(".cpop-dot");
    var idx = 0, timer = null;

    // Görsel yüklenemezse emojiye düş
    pop.querySelectorAll(".cpop-slide-img").forEach(function (im) {
      im.addEventListener("error", function () {
        var span = document.createElement("span");
        span.className = "cpop-slide-emoji";
        span.textContent = im.getAttribute("data-emoji") || "🎁";
        im.parentNode.replaceChild(span, im);
      });
    });

    function show(i) {
      idx = (i + camps.length) % camps.length;
      if (track) track.style.transform = "translateX(-" + (idx * 100) + "%)";
      dots.forEach(function (d, k) { d.classList.toggle("on", k === idx); });
    }
    function startAuto() { if (camps.length > 1) { stopAuto(); timer = setInterval(function () { show(idx + 1); }, INTERVAL); } }
    function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }

    function markSeen() { if (cp.once) { try { sessionStorage.setItem(KEY, "1"); } catch (e) {} } }
    function closePop() { stopAuto(); markSeen(); pop.parentNode && pop.parentNode.removeChild(pop); document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); }
    function goTarget() { markSeen(); stopAuto(); document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); setTimeout(function () { pop.parentNode && pop.parentNode.removeChild(pop); }, 0); }
    function onKey(e) { if (e.key === "Escape") closePop(); }

    pop.addEventListener("click", function (e) {
      if (e.target.closest("[data-cpop-close]")) { e.preventDefault(); closePop(); return; }
      var dot = e.target.closest("[data-cpop-dot]");
      if (dot) { e.preventDefault(); show(parseInt(dot.getAttribute("data-cpop-dot"), 10) || 0); startAuto(); return; }
      // görsel veya buton tıklanınca: kampanyalar bölümüne git + kapat
      if (e.target.closest(".cpop-viewport") || e.target.closest(".cpop-cta")) { goTarget(); }
    });
    document.addEventListener("keydown", onKey);

    // küçük gecikmeyle, yumuşak giriş
    setTimeout(function () {
      document.body.style.overflow = "hidden";
      pop.classList.add("show");
      show(0);
      startAuto();
    }, 550);
  })();

  /* Danışman bilgileri */
  if (cfg.advisorName) {
    set("advisor-name", function (el) { el.textContent = cfg.advisorName; });
    set("advisor-initials", function (el) {
      var parts = cfg.advisorName.trim().split(/\s+/);
      var ini = parts.map(function (p) { return p.charAt(0); }).join("").slice(0, 2).toUpperCase();
      if (ini) el.textContent = ini;
    });
  }
  if (cfg.advisorTitle) set("advisor-title", function (el) { el.textContent = cfg.advisorTitle; });
  if (cfg.advisorId) set("advisor-id-display", function (el) { el.textContent = cfg.advisorId; });

  /* WhatsApp linki */
  var waUrl = "#";
  if (cfg.whatsappNumber) {
    var num = String(cfg.whatsappNumber).replace(/\D/g, "");
    var msg = encodeURIComponent(cfg.whatsappMessage || "");
    waUrl = "https://wa.me/" + num + (msg ? "?text=" + msg : "");
  }
  ["hero-wa", "advisor-wa", "cta-wa", "footer-wa", "wa-float", "campaign-wa", "campaign-code-wa"].forEach(function (id) {
    set(id, function (el) {
      el.href = waUrl;
      if (waUrl !== "#") { el.target = "_blank"; el.rel = "noopener"; }
    });
  });

  /* Instagram linki */
  ["advisor-ig", "footer-ig"].forEach(function (id) {
    set(id, function (el) { el.href = cfg.instagramUrl || "#"; if (cfg.instagramUrl) { el.target = "_blank"; el.rel = "noopener"; } });
  });

  /* Instagram DM (mesaj) — sabit float butonu.
     Instagram hazır metni otomatik dolduramadığı için, tıklanınca mesaj
     panoya kopyalanır ve kısa bir bildirim gösterilir; kişi DM'e yapıştırır. */
  var igDmUrl = cfg.instagramDmUrl || cfg.instagramUrl || "#";
  var igMsg = cfg.instagramMessage || "";
  set("ig-float", function (el) {
    el.href = igDmUrl;
    if (igDmUrl !== "#") { el.target = "_blank"; el.rel = "noopener"; }
    if (igMsg) {
      el.addEventListener("click", function () {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(igMsg);
          } else {
            var ta = document.createElement("textarea");
            ta.value = igMsg; ta.style.position = "fixed"; ta.style.opacity = "0";
            document.body.appendChild(ta); ta.select();
            document.execCommand("copy"); document.body.removeChild(ta);
          }
          showToast("✓ Mesaj kopyalandı — Instagram'da sohbete yapıştırın");
        } catch (err) { /* kopyalama engellenirse sessiz geç */ }
      });
    }
  });

  /* Basit bildirim (toast) */
  function showToast(text) {
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = text;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("toast-show"); });
    setTimeout(function () {
      t.classList.remove("toast-show");
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 300);
    }, 3000);
  }

  /* YouTube linki */
  ["advisor-yt", "footer-yt", "youtube-link"].forEach(function (id) {
    set(id, function (el) { el.href = cfg.youtubeUrl || "#"; if (cfg.youtubeUrl) { el.target = "_blank"; el.rel = "noopener"; } });
  });

  /* Tanıtım videoları — gömülü oynatıcı (iframe) */
  set("videos-grid", function (grid) {
    var list = cfg.videos || [];
    if (!list.length) { var s = grid.closest("section"); if (s) s.style.display = "none"; return; }
    grid.innerHTML = list.map(function (v) {
      var id = v.embedId || "";
      var cap = v.title ? '<div class="video-cap">' + esc(v.title) + '</div>' : "";
      return '<div class="video-item"><div class="video-wrap">' +
        '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(id) + '?rel=0" ' +
        'title="' + esc(v.title || "Thermomix video") + '" loading="lazy" frameborder="0" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
        'allowfullscreen></iframe></div>' + cap + '</div>';
    }).join("");
  });

  /* Shortlar — dikey gömülü oynatıcı (iframe) */
  set("shorts-grid", function (grid) {
    var list = cfg.shorts || [];
    if (!list.length) { var s = grid.closest("section"); if (s) s.style.display = "none"; return; }
    grid.innerHTML = list.map(function (sh) {
      var id = sh.id || "";
      var cap = sh.title ? '<div class="short-cap">' + esc(sh.title) + '</div>' : "";
      return '<div class="short-card"><div class="short-frame">' +
        '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(id) + '?rel=0" ' +
        'title="' + esc(sh.title || "Thermomix short") + '" loading="lazy" frameborder="0" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
        'allowfullscreen></iframe></div>' + cap + '</div>';
    }).join("");
  });

  /* Kampanya dönemi + duyuru bandı */
  if (cfg.campaignPeriod) {
    set("campaign-period", function (el) { el.textContent = cfg.campaignPeriod; });
  }
  set("announce-text", function (el) {
    el.innerHTML = "🍂 <strong>Kasım Kampanyası:</strong> TM7 vade farksız 9 taksitle 89.990 ₺ — Thermomix® Karıştırma Kabı 15.990 ₺ yerine 6.000 ₺ · 3 ay Cookidoo® ücretsiz · <a href='#kampanya' style='color:#fff;text-decoration:underline'>İncele</a>";
  });

  /* Kampanya geri sayımı — canlı sayaç (bitince gizlenir) */
  (function () {
    var el = document.getElementById("campaign-countdown");
    if (!el || !cfg.campaignEndsAt) return;
    var end = new Date(cfg.campaignEndsAt).getTime();
    if (isNaN(end)) return;
    var pad = function (v) { return v < 10 ? "0" + v : String(v); };

    function tick() {
      var left = end - Date.now();
      if (left <= 0) { el.setAttribute("hidden", ""); clearInterval(t); return; }
      var d = Math.floor(left / 86400000);
      var h = Math.floor(left / 3600000) % 24;
      var mi = Math.floor(left / 60000) % 60;
      var s = Math.floor(left / 1000) % 60;
      el.innerHTML =
        '<span class="cd-label">⏳ Kampanyanın bitmesine</span>' +
        '<span class="cd-boxes">' +
          '<span class="cd-box"><b>' + d + '</b><i>gün</i></span>' +
          '<span class="cd-box"><b>' + pad(h) + '</b><i>saat</i></span>' +
          '<span class="cd-box"><b>' + pad(mi) + '</b><i>dk</i></span>' +
          '<span class="cd-box"><b>' + pad(s) + '</b><i>sn</i></span>' +
        '</span>' +
        (cfg.campaignStockNote ? '<span class="cd-stock">📦 ' + esc(cfg.campaignStockNote) + '</span>' : "");
      el.removeAttribute("hidden");
    }
    tick();
    var t = setInterval(tick, 1000);
  })();

  /* Hızlı iletişim formu — bilgileri WhatsApp hazır mesajı olarak iletir */
  (function () {
    var form = document.getElementById("lead-form");
    var lf = cfg.leadForm;
    if (!form || !lf || lf.enabled === false || !cfg.whatsappNumber) return;

    set("lead-title", function (el) { el.textContent = lf.title || "Hızlı Bilgi Alın"; });
    set("lead-sub", function (el) { el.textContent = lf.sub || ""; });
    set("lead-submit", function (el) { el.textContent = lf.buttonText || "Gönder →"; });
    set("lead-note", function (el) { el.textContent = lf.note || ""; });
    form.removeAttribute("hidden");

    var errEl = document.getElementById("lead-error");
    function showErr(msg) {
      if (!errEl) return;
      errEl.textContent = msg;
      errEl.removeAttribute("hidden");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("lead-name").value || "").trim();
      var phone = (document.getElementById("lead-phone").value || "").trim();
      var digits = phone.replace(/\D/g, "");

      if (name.length < 2) { showErr("Lütfen adınızı yazın."); return; }
      if (digits.length < 10) { showErr("Lütfen geçerli bir telefon numarası yazın (en az 10 hane)."); return; }
      if (errEl) errEl.setAttribute("hidden", "");

      var msg = "Merhaba Zeynep Hanım, Thermomix TM7 Kasım kampanyası (9 taksit + Karıştırma Kabı) ve ücretsiz tanıtım atölyeleri hakkında bilgi almak istiyorum 🙂\n" +
        "Adım: " + name + "\nTelefonum: " + phone;
      var num = String(cfg.whatsappNumber).replace(/\D/g, "");
      window.open("https://wa.me/" + num + "?text=" + encodeURIComponent(msg), "_blank", "noopener");

      if (window.gtag) { window.gtag("event", "form_gonderildi", { form: "hizli_iletisim" }); }
      form.reset();
    });
  })();

  /* Kampanyalar */
  set("campaign-grid", function (grid) {
    var list = cfg.campaigns || [];
    if (!list.length) { grid.parentNode.style.display = "none"; return; }
    grid.innerHTML = list.map(function (c) {
      var tag = c.tag ? '<span class="camp-tag">' + esc(c.tag) + '</span>' : "";
      return '<div class="card camp-card">' + tag +
        '<div class="ico">' + esc(c.icon || "🎁") + '</div><h3>' + esc(c.title) + '</h3><p>' + esc(c.desc) + '</p></div>';
    }).join("");
  });

  /* Tanıtım atölyeleri — şehir bazlı kaydırmalı takvim */
  set("workshop-card", function (el) {
    var w = cfg.workshops;
    var locations = w && w.locations ? w.locations : [];
    if (!locations.length && w && w.sessions && w.sessions.length) {
      locations = [{ city: w.city || "Atölye", sessions: w.sessions }];
    }
    if (!locations.length) { var s = el.closest("section"); if (s) s.style.display = "none"; return; }
    var featuresHtml =
      '<div class="ws-features">' +
        '<h4>Atölyelerimizde Sizi Neler Bekliyor?</h4>' +
        '<ul>' +
          '<li>✅ <strong>TM7 Canlı Deneyimi:</strong> TM7 ile tarif hazırlamanın nasıl bir deneyim olduğunu keşfedin.</li>' +
          '<li>✅ <strong>Cookidoo® İlhamı:</strong> Cookidoo®’daki binlerce tariften ilham alın.</li>' +
          '<li>✅ <strong>Birebir Soru & Cevap:</strong> Aklınızdaki tüm soruları danışmanlarımıza yöneltin.</li>' +
          '<li>✅ <strong>Mutfakta Çok Yönlülük:</strong> Thermomix®’in mutfaktaki kullanım alanlarını yakından görün.</li>' +
          '<li>✅ <strong>Danışmanlık & Ek Gelir:</strong> Thermomix® danışmanlığı ve ek gelir fırsatlarını tanıyın.</li>' +
        '</ul>' +
      '</div>';
    var directory = w.directoryUrl || "#";
    var story = w.storyUrl || "#";
    /* Tarihi geçen atölyeler otomatik gizlenir (S(...) satırlarındaki gün + workshops.year/month). */
    var now = new Date();
    var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    function isUpcoming(session) {
      if (!session.d || !w.year || !w.month) return true;
      return new Date(w.year, w.month - 1, session.d).getTime() >= todayStart;
    }
    function isToday(session) {
      return !!(session.d && w.year && w.month && new Date(w.year, w.month - 1, session.d).getTime() === todayStart);
    }
    var endedInfo = (w.monthLabel || "Bu ay") + " ayı atölyeleri bu bölgede tamamlandı. Yeni tarihler için kayıt formunu doldurabilir veya WhatsApp'tan yazabilirsiniz; size özel bir tanıtım planlayalım.";
    var slides = locations.map(function (location, index) {
      var allSessions = location.sessions || [];
      var sessions = allSessions.filter(isUpcoming);
      var form = location.formUrl || directory;
      var ctaLabel = location.ctaLabel || "Bu Şehir İçin Kayıt Ol";
      var scheduleHtml = sessions.length
        ? '<div class="ws-table">' +
            '<div class="ws-row ws-row-head"><span>📅 Tarih</span><span>🕐 Saat</span><span>📍 Yer & Atölye</span></div>' +
            sessions.map(function (session) {
              var today = isToday(session);
              return '<div class="ws-row' + (today ? ' ws-row-today' : '') + '">' +
                '<span class="ws-date">' + esc(session.date) + (today ? ' <em class="ws-today">Bugün</em>' : '') + '</span>' +
                '<span class="ws-time">' + esc(session.time) + '</span>' +
                '<span class="ws-place">' + esc(session.place) +
                  (session.topic ? '<em class="ws-topic">🍴 ' + esc(session.topic) + '</em>' : '') + '</span></div>';
            }).join("") +
          '</div>'
        : '<div class="ws-contact-card"><span>📍</span><p>' + esc(location.info || (allSessions.length ? endedInfo : "Güncel tarih ve konum için iletişime geçin.")) + '</p></div>';
      var countHtml = sessions.length ? '<span class="ws-count">' + sessions.length + ' atölye</span>' : "";
      return '<article class="workshop-slide" data-workshop-slide="' + index + '">' +
        '<div class="ws-head"><div><span class="ws-city">' + esc(location.city || "") + '</span>' +
        (location.region ? '<span class="ws-region">' + esc(location.region) + '</span>' : "") + '</div>' +
        '<span class="ws-head-tags">' + countHtml + '<span class="ws-free">Ücretsiz Katılım</span></span></div>' +
        scheduleHtml +
        '<div class="ws-form-status">✓ ' + (location.formUrl ? 'Bu bölge için resmî kayıt formu hazır' : 'Kayıt seçeneklerini görüntüleyin') + '</div>' +
        '<div class="ws-actions">' +
          '<a class="ws-cta" href="' + esc(form) + '" target="_blank" rel="noopener" aria-label="' + esc((location.city || "Atölye") + " kayıt formunu aç") + '">📝 ' + esc(ctaLabel) + '</a>' +
          '<a class="ws-story" href="' + esc(story) + '" target="_blank" rel="noopener">Program paylaşımını gör ↗</a>' +
          '<a class="ws-story" href="' + esc(directory) + '" target="_blank" rel="noopener">Tüm resmî formlar ↗</a>' +
        '</div></article>';
    }).join("");
    el.innerHTML =
      '<div class="ws-slider-head"><span class="ws-note">' + esc(w.note || "") + '</span>' +
        '<div class="ws-slider-controls"><button type="button" data-ws-prev aria-label="Önceki şehir">←</button>' +
        '<span><strong data-ws-current>1</strong> / ' + locations.length + '</span>' +
        '<button type="button" data-ws-next aria-label="Sonraki şehir">→</button></div></div>' +
      featuresHtml +
      '<div class="ws-chips" role="tablist" aria-label="Şehir seç">' +
        locations.map(function (location, index) {
          return '<button type="button" class="ws-chip' + (index === 0 ? ' active' : '') + '" data-ws-chip="' + index + '">' + esc(location.city || "") + '</button>';
        }).join("") +
      '</div>' +
      '<div class="workshops-slider" data-ws-slider>' + slides + '</div>' +
      '<p class="ws-swipe-hint">← Mobilde şehirleri görmek için kaydırın →</p>';

    var slider = el.querySelector("[data-ws-slider]");
    var current = el.querySelector("[data-ws-current]");
    var previous = el.querySelector("[data-ws-prev]");
    var next = el.querySelector("[data-ws-next]");
    function move(direction) {
      var slide = slider.querySelector(".workshop-slide");
      if (!slide) return;
      slider.scrollBy({ left: direction * (slide.offsetWidth + 18), behavior: "smooth" });
    }
    previous.addEventListener("click", function () { move(-1); });
    next.addEventListener("click", function () { move(1); });
    slider.addEventListener("scroll", function () {
      var slide = slider.querySelector(".workshop-slide");
      if (!slide) return;
      var active = Math.round(slider.scrollLeft / (slide.offsetWidth + 18)) + 1;
      active = Math.max(1, Math.min(locations.length, active));
      current.textContent = active;
      chips.forEach(function (chip, i) { chip.classList.toggle("active", i === active - 1); });
      var on = chips[active - 1];
      if (on && on.parentNode) on.parentNode.scrollTo({ left: on.offsetLeft - on.parentNode.offsetLeft - 24, behavior: "smooth" });
    });
    var chips = Array.prototype.slice.call(el.querySelectorAll("[data-ws-chip]"));
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var slide = slider.querySelector(".workshop-slide");
        if (!slide) return;
        var index = parseInt(chip.getAttribute("data-ws-chip"), 10) || 0;
        slider.scrollTo({ left: index * (slide.offsetWidth + 18), behavior: "smooth" });
      });
    });
  });

  /* Modlar / fonksiyonlar */
  set("modes-grid", function (grid) {
    var list = cfg.modes || [];
    if (!list.length) { var s = grid.closest("section"); if (s) s.style.display = "none"; return; }
    grid.innerHTML = list.map(function (m) {
      return '<div class="card mode-card"><div class="ico">' + esc(m.icon || "⚙️") + '</div>' +
        '<h3>' + esc(m.name) + '</h3><p>' + esc(m.desc) + '</p></div>';
    }).join("");
  });

  /* Tek cihaz, koca bir mutfak — yerine geçtiği aletler */
  set("replaces-grid", function (grid) {
    var list = cfg.replaces || [];
    if (!list.length) { var s = grid.closest("section"); if (s) s.style.display = "none"; return; }
    grid.innerHTML = list.map(function (r) {
      return '<div class="replace-chip"><span class="replace-ico">' + esc(r.icon || "✅") + '</span>' +
        '<span class="replace-name">' + esc(r.name) + '</span></div>';
    }).join("");
  });

  /* Aksesuarlar */
  set("accessories-grid", function (grid) {
    var list = cfg.accessories || [];
    if (!list.length) { var s = grid.closest("section"); if (s) s.style.display = "none"; return; }
    grid.innerHTML = list.map(function (a) {
      return '<div class="card"><div class="ico">' + esc(a.icon || "🧩") + '</div>' +
        '<h3>' + esc(a.title) + '</h3><p>' + esc(a.desc) + '</p></div>';
    }).join("");
  });

  /* Kampanyalı modeller — kart + açılır bilgi paneli + satın alma linki */
  set("models-period", function (el) { if (cfg.campaignPeriod) el.textContent = cfg.campaignPeriod + " · Detaylar için karttaki başlığa tıklayın."; });
  set("models-grid", function (grid) {
    var list = cfg.models || [];
    if (!list.length) { var s = grid.closest("section"); if (s) s.style.display = "none"; return; }
    grid.innerHTML = list.map(function (m) {
      var url = withId(m.url);
      var tag = m.tag ? '<span class="model-tag">' + esc(m.tag) + '</span>' : "";
      var incl = (m.includes || []).map(function (i) { return '<li>' + esc(i) + '</li>'; }).join("");
      var saveAmt = m.oldPrice ? (priceToNum(m.oldPrice) - priceToNum(m.price)) : 0;
      var saveTag = saveAmt > 0 ? '<span class="price-save">' + numToTRY(saveAmt) + ' indirim</span>' : "";
      var priceBlock = m.oldPrice
        ? '<div class="model-price"><span class="price-old">' + esc(m.oldPrice) + '</span>' +
          '<span class="price-new">' + esc(m.price) + '</span>' + saveTag + '</div>'
        : '<div class="model-price">' + esc(m.price) + '</div>';

      /* Taksit vurgusu: aylık tutar öne çıkar, toplam ikinci planda kalır */
      var monthlyBlock = "";
      var n = parseInt(m.installments, 10) || 0;
      var base = priceToNum(m.installmentBase || m.price);
      if (n > 1 && base > 0) {
        monthlyBlock =
          '<div class="model-monthly">' +
            '<span class="mm-label">Vade farksız ' + n + ' taksit</span>' +
            '<span class="mm-amt">' + numToTRY(Math.round(base / n)) + '<small>/ay</small></span>' +
            '<span class="mm-note">' + n + ' × ' + numToTRY(Math.round(base / n)) +
              ' · toplam ' + esc(m.installmentBase || m.price) + '</span>' +
          '</div>';
      }
      return '<div class="model-card">' + tag +
        '<div class="model-img"><img src="' + esc(m.image) + '" alt="' + esc(m.name) + '" loading="lazy" ' +
          'onerror="this.onerror=null;this.src=\'img/tm7-campaign.jpg\';" /></div>' +
        '<div class="model-body">' +
          '<h3>' + esc(m.name) + '</h3>' +
          monthlyBlock +
          priceBlock +
          '<ul class="model-incl">' + incl + '</ul>' +
          '<a class="btn btn-primary btn-block" href="' + esc(url) + '" target="_blank" rel="noopener">Satın Al →</a>' +
          '<a class="btn btn-whatsapp btn-block btn-sm" href="' + esc(waUrl) + '"' + (waUrl !== "#" ? ' target="_blank" rel="noopener"' : "") + '><span class="wa-ico">✆</span> Bilgi Al</a>' +
          '<details class="model-details"><summary>Kampanya detayları ▾</summary>' +
            '<p>' + esc(m.details) + '</p>' +
            '<p class="model-sku">Ürün kodu: ' + esc(m.sku) + ' · Danışman: ' + esc(cfg.advisorName || "") + ' (' + esc(cfg.advisorId || "") + ')</p>' +
          '</details>' +
        '</div></div>';
    }).join("");

    /* Tıklayınca ürün görselini büyüten lightbox */
    var lb = document.createElement("div");
    lb.className = "img-lightbox";
    lb.setAttribute("hidden", "");
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML =
      '<button type="button" class="lb-close" aria-label="Kapat">×</button>' +
      '<img class="lb-img" src="" alt="" />';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector(".lb-img");

    function openLb(src, alt) {
      lbImg.src = src; lbImg.alt = alt || "";
      lb.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
    }
    function closeLb() {
      lb.setAttribute("hidden", "");
      lbImg.src = "";
      document.body.style.overflow = "";
    }

    grid.addEventListener("click", function (e) {
      var box = e.target.closest(".model-img");
      if (!box) return;
      var img = box.querySelector("img");
      if (img) openLb(img.getAttribute("src"), img.getAttribute("alt"));
    });
    lb.addEventListener("click", function () { closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.hasAttribute("hidden") && e.key === "Escape") closeLb();
    });
  });

  /* Kullanıcı yorumları (gerçek) */
  set("testimonials-grid", function (grid) {
    var list = cfg.testimonials || [];
    if (!list.length) { var s = grid.closest("section"); if (s) s.style.display = "none"; return; }
    grid.innerHTML = list.map(function (t) {
      var src = t.source ? '<span class="t-src">' + esc(t.source) + '</span>' : "";
      return '<div class="card t-card">' +
        '<div class="t-verified">✓ Gerçek kullanıcı yorumu</div>' +
        '<p>“' + esc(t.text) + '”</p>' +
        '<div class="t-name">— ' + esc(t.name || "Kullanıcı") + src + '</div></div>';
    }).join("");
  });

  /* Instagram gönderileri (resmi embed) */
  ["ig-follow"].forEach(function (id) {
    set(id, function (el) { el.href = cfg.instagramUrl || "#"; if (cfg.instagramUrl) { el.target = "_blank"; el.rel = "noopener"; } });
  });
  set("ig-grid", function (grid) {
    // Liste öğeleri: düz link (Instagram embed) VEYA { video, poster, link, caption } (sitede inline oynar)
    var list = (cfg.instagramPosts || []).map(function (item) {
      if (item && typeof item === "object" && item.video) {
        return { type: "video", video: item.video, poster: item.poster || "",
          link: item.link ? String(item.link).split("?")[0] : "", caption: item.caption || "" };
      }
      return { type: "embed", url: String(item).split("?")[0] };
    }).filter(function (it) { return it.type === "video" ? !!it.video : !!it.url; });
    if (!list.length) { var s = grid.closest("section"); if (s) s.style.display = "none"; return; }

    /* Tıklanabilir gönderi kartları — tıklayınca popup akış açılır */
    grid.innerHTML = list.map(function (it, i) {
      var isVideo = it.type === "video";
      var isReel = isVideo || /\/reel\//.test(it.url || "");
      var posterStyle = (isVideo && it.poster) ? ' style="background-image:url(\'' + esc(it.poster) + '\')"' : "";
      var posterClass = (isVideo && it.poster) ? " ig-card-poster" : "";
      var label = isVideo ? "▶ Video" : (isReel ? "▶ Reel" : "📸 Gönderi");
      return '<button type="button" class="ig-card' + posterClass + '" data-idx="' + i + '"' + posterStyle + ' aria-label="Gönderiyi akışta aç">' +
        '<span class="ig-card-ico" aria-hidden="true">' +
          (isVideo
            ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>') +
        '</span>' +
        '<span class="ig-card-label">' + label + (list.length > 1 ? " " + (i + 1) : "") + '</span>' +
        '<span class="ig-card-cta">' + (isVideo ? "İzle →" : "Akışta aç →") + '</span>' +
      '</button>';
    }).join("");

    /* ---- Popup akış (dikey feed — tüm gönderiler, aşağı kaydır) ---- */
    var igEmbedLoaded = false;
    function loadIgEmbed() {
      if (window.instgrm && window.instgrm.Embeds) { window.instgrm.Embeds.process(); return; }
      if (igEmbedLoaded) return;
      igEmbedLoaded = true;
      var s = document.createElement("script");
      s.async = true; s.src = "https://www.instagram.com/embed.js";
      s.onload = function () { if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process(); };
      document.body.appendChild(s);
    }

    var modal = document.createElement("div");
    modal.className = "ig-modal";
    modal.setAttribute("hidden", "");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Instagram gönderileri akışı");
    modal.innerHTML =
      '<div class="ig-modal-backdrop" data-close></div>' +
      '<div class="ig-modal-box">' +
        '<div class="ig-feed-head">' +
          '<span class="ig-feed-title">📸 @thermozeyno</span>' +
          '<button type="button" class="ig-modal-close" data-close aria-label="Kapat">×</button>' +
        '</div>' +
        '<div class="ig-feed">' +
          list.map(function (it, i) {
            var inner;
            if (it.type === "video") {
              inner = '<video class="ig-video" controls playsinline preload="metadata"' +
                (it.poster ? ' poster="' + esc(it.poster) + '"' : "") + '>' +
                '<source src="' + esc(it.video) + '" />' +
                'Tarayıcınız videoyu oynatamıyor.</video>' +
                (it.caption ? '<p class="ig-video-cap">' + esc(it.caption) + '</p>' : "") +
                (it.link ? '<a class="ig-video-link" href="' + esc(it.link) + '" target="_blank" rel="noopener">Instagram\'da aç →</a>' : "");
            } else {
              inner = '<blockquote class="instagram-media" data-instgrm-permalink="' + esc(it.url) +
                '" data-instgrm-version="14" style="margin:0 auto;width:100%;max-width:480px"></blockquote>';
            }
            return '<div class="ig-feed-item" data-feed="' + i + '">' + inner + '</div>';
          }).join("") +
          '<div class="ig-feed-end">Tüm gönderiler için ' +
            '<a href="' + esc(cfg.instagramUrl || "#") + '" target="_blank" rel="noopener">@thermozeyno →</a></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    var feed = modal.querySelector(".ig-feed");
    var items = modal.querySelectorAll(".ig-feed-item");

    // Bir video oynayınca diğerlerini duraklat
    feed.addEventListener("play", function (e) {
      if (e.target.tagName !== "VIDEO") return;
      feed.querySelectorAll("video").forEach(function (v) { if (v !== e.target) v.pause(); });
    }, true);

    function openModal(i) {
      modal.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
      loadIgEmbed();
      // tıklanan gönderiye konumlan; sonra embed yüklenince yeniden hizala
      var scrollTo = function () {
        if (items[i]) feed.scrollTop = items[i].offsetTop - 8;
        else feed.scrollTop = 0;
      };
      scrollTo();
      setTimeout(scrollTo, 80);
    }
    function closeModal() {
      modal.setAttribute("hidden", "");
      document.body.style.overflow = "";
      feed.querySelectorAll("video").forEach(function (v) { v.pause(); });
    }

    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".ig-card");
      if (!card) return;
      openModal(parseInt(card.getAttribute("data-idx"), 10) || 0);
    });
    modal.addEventListener("click", function (e) {
      if (e.target.hasAttribute("data-close")) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (modal.hasAttribute("hidden")) return;
      if (e.key === "Escape") closeModal();
    });
  });

  /* Kullanım kılavuzları */
  set("manuals-grid", function (grid) {
    var list = cfg.manuals || [];
    if (!list.length) { var s = grid.closest("section"); if (s) s.style.display = "none"; return; }
    grid.innerHTML = list.map(function (m) {
      return '<a class="manual-card" href="' + esc(m.url) + '" target="_blank" rel="noopener">' +
        '<span class="manual-ico">📄</span>' +
        '<span class="manual-title">' + esc(m.title) + '</span>' +
        '<span class="manual-dl">PDF indir →</span></a>';
    }).join("");
  });

  /* Hikayeler (Instagram tarzı) */
  set("stories-bar", function (bar) {
    var list = cfg.stories || [];
    if (!list.length) { var s = bar.closest(".stories-section"); if (s) s.style.display = "none"; return; }
    var fallback = cfg.instagramUrl || "#";
    bar.innerHTML = list.map(function (st, i) {
      var cover = st.image
        ? '<span class="story-img" style="background-image:url(\'' + esc(st.image) + '\')"></span>'
        : '<span class="story-emoji">' + esc(st.emoji || "✨") + '</span>';
      var inner = '<span class="story-ring">' + cover + '</span><span class="story-label">' + esc(st.label || "") + '</span>';
      // Slaytlı hikaye → tıklayınca kayar story viewer açılır
      if (st.slides && st.slides.length) {
        return '<button type="button" class="story story-has-viewer" data-story="' + i + '">' + inner + '</button>';
      }
      var href = st.link || fallback;
      var isInternal = href.charAt(0) === "#";
      var ext = (href && href !== "#" && !isInternal) ? ' target="_blank" rel="noopener"' : "";
      return '<a class="story" href="' + esc(href) + '"' + ext + '>' + inner + '</a>';
    }).join("");

    /* ---- Kayar (yana kaydırılabilir) Instagram tarzı story viewer ---- */
    var sv = document.createElement("div");
    sv.className = "story-viewer";
    sv.setAttribute("hidden", "");
    sv.setAttribute("role", "dialog");
    sv.setAttribute("aria-modal", "true");
    sv.innerHTML =
      '<button type="button" class="sv-close" data-sv-close aria-label="Kapat">×</button>' +
      '<button type="button" class="sv-tap sv-tap-prev" data-sv-prev aria-label="Önceki"></button>' +
      '<button type="button" class="sv-tap sv-tap-next" data-sv-next aria-label="Sonraki"></button>' +
      '<div class="sv-card">' +
        '<div class="sv-bars"></div>' +
        '<div class="sv-head"><span class="sv-avatar"></span><span class="sv-title"></span></div>' +
        '<div class="sv-body"><span class="sv-emoji"></span><h3 class="sv-h"></h3><p class="sv-p"></p></div>' +
        '<a class="sv-cta" target="_blank" rel="noopener">Instagram\'da Gör →</a>' +
      '</div>';
    document.body.appendChild(sv);

    var svBars = sv.querySelector(".sv-bars");
    var svCard = sv.querySelector(".sv-card");
    var svAvatar = sv.querySelector(".sv-avatar");
    var svTitle = sv.querySelector(".sv-title");
    var svEmoji = sv.querySelector(".sv-emoji");
    var svH = sv.querySelector(".sv-h");
    var svP = sv.querySelector(".sv-p");
    var svCta = sv.querySelector(".sv-cta");
    var DURATION = 5000;
    var svStory = null, svSlides = [], svIdx = 0, svTimer = null, svStart = 0;

    function svRenderSlide(i) {
      svIdx = Math.max(0, Math.min(svSlides.length - 1, i));
      var sl = svSlides[svIdx];
      svCard.style.background = sl.bg || "linear-gradient(160deg,#8134af,#dd2a7b)";
      svEmoji.textContent = sl.emoji || "✨";
      svH.textContent = sl.title || "";
      svP.textContent = sl.text || "";
      // ilerleme çubuklarını güncelle
      svBars.querySelectorAll(".sv-bar > i").forEach(function (fill, k) {
        fill.style.transition = "none";
        fill.style.width = k < svIdx ? "100%" : "0%";
      });
      // mevcut çubuğu animasyonla doldur
      var cur = svBars.querySelectorAll(".sv-bar > i")[svIdx];
      if (cur) { void cur.offsetWidth; cur.style.transition = "width " + DURATION + "ms linear"; cur.style.width = "100%"; }
    }
    function svClearTimer() { if (svTimer) { clearTimeout(svTimer); svTimer = null; } }
    function svScheduleNext() {
      svClearTimer();
      svStart = Date.now();
      svTimer = setTimeout(function () { svNext(); }, DURATION);
    }
    function svGo(i) {
      if (i < 0) { svRenderSlide(0); svScheduleNext(); return; }
      if (i >= svSlides.length) { svClose(); return; }
      svRenderSlide(i); svScheduleNext();
    }
    function svNext() { svGo(svIdx + 1); }
    function svPrev() { svGo(svIdx - 1); }
    function svOpen(story) {
      svStory = story; svSlides = story.slides || [];
      if (!svSlides.length) return;
      svAvatar.textContent = story.emoji || "✨";
      svTitle.textContent = story.label || "";
      var hl = story.highlight || story.link || fallback;
      svCta.href = hl;
      svCta.style.display = (hl && hl !== "#" && hl.charAt(0) !== "#") ? "" : "none";
      svBars.innerHTML = svSlides.map(function () { return '<span class="sv-bar"><i></i></span>'; }).join("");
      sv.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
      svGo(0);
    }
    function svClose() {
      svClearTimer();
      sv.setAttribute("hidden", "");
      document.body.style.overflow = "";
    }

    bar.addEventListener("click", function (e) {
      var b = e.target.closest(".story-has-viewer");
      if (!b) return;
      e.preventDefault();
      var idx = parseInt(b.getAttribute("data-story"), 10) || 0;
      if (list[idx] && list[idx].slides) svOpen(list[idx]);
    });
    sv.addEventListener("click", function (e) {
      if (e.target.closest("[data-sv-close]")) { svClose(); return; }
      if (e.target.closest(".sv-cta")) { return; } // linke izin ver
      if (e.target.closest("[data-sv-prev]")) { svPrev(); return; }
      if (e.target.closest("[data-sv-next]")) { svNext(); return; }
    });
    document.addEventListener("keydown", function (e) {
      if (sv.hasAttribute("hidden")) return;
      if (e.key === "Escape") svClose();
      else if (e.key === "ArrowLeft") svPrev();
      else if (e.key === "ArrowRight") svNext();
    });
    // Dokunmatik: yana kaydırma
    var tx = null;
    sv.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; svClearTimer(); }, { passive: true });
    sv.addEventListener("touchend", function (e) {
      if (tx === null) { svScheduleNext(); return; }
      var dx = e.changedTouches[0].clientX - tx; tx = null;
      if (dx > 45) svPrev(); else if (dx < -45) svNext(); else svScheduleNext();
    }, { passive: true });
  });

  /* Kaydırınca yumuşak beliren animasyon (JS yoksa içerik yine görünür) */
  document.documentElement.classList.add("js");
  try {
    var revealEls = document.querySelectorAll(".section, .model-card, .card, .step, .order-steps > li");
    revealEls.forEach(function (el) { el.classList.add("reveal"); });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.08 });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }
  } catch (e) { /* animasyon başarısız olsa bile içerik görünür kalır */ }

  /* ---- Premium katman: ilerleme çizgisi, menü gölgesi, sayı animasyonu, satın alma çubuğu ---- */
  try {
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    var header = document.querySelector(".site-header");

    /* Sayısal özet: görünür olunca sayılar yukarı sayar */
    var statEls = document.querySelectorAll(".stat strong");
    if (!reduceMotion && "IntersectionObserver" in window) {
      var statIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          statIo.unobserve(en.target);
          var el = en.target, full = el.textContent, m = full.match(/^(\D*)([\d.]+)(.*)$/);
          if (!m) return;
          var target = parseInt(m[2].replace(/\./g, ""), 10), start = null;
          if (!target) return;
          function frame(ts) {
            if (start === null) start = ts;
            var p = Math.min(1, (ts - start) / 1100), eased = 1 - Math.pow(1 - p, 3);
            el.textContent = p < 1 ? m[1] + Math.round(target * eased).toLocaleString("tr-TR") + m[3] : full;
            if (p < 1) requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
        });
      }, { threshold: 0.6 });
      statEls.forEach(function (el) { statIo.observe(el); });
    }

    /* Sabit satın alma çubuğu (yalnızca ana sayfada) */
    var buyTarget = document.getElementById("modeller");
    var heroEl = document.querySelector(".hero");
    var model = (cfg.models || [])[0];
    var buybar = null;
    if (buyTarget && heroEl && model) {
      var n = parseInt(model.installments, 10) || 0;
      var base = priceToNum(model.installmentBase || model.price);
      var priceText = n > 1 ? n + " × " + numToTRY(Math.round(base / n)).replace(" TL", " ₺") + " vade farksız" : esc(model.price);
      var endTime = cfg.campaignEndsAt ? new Date(cfg.campaignEndsAt).getTime() : NaN;
      var daysLeft = isNaN(endTime) ? -1 : Math.floor((endTime - Date.now()) / 86400000);
      var leftText = daysLeft >= 1 ? " · <em>Son " + daysLeft + " gün</em>" : (daysLeft === 0 ? " · <em>Son gün!</em>" : "");
      buybar = document.createElement("div");
      buybar.className = "buybar";
      buybar.setAttribute("role", "region");
      buybar.setAttribute("aria-label", "Hızlı satın alma");
      buybar.innerHTML =
        '<img class="buybar-thumb" src="img/tm7-hero.png" alt="" />' +
        '<div class="buybar-info"><strong>Thermomix® TM7</strong><span>' + priceText + leftText + '</span></div>' +
        '<a class="btn btn-whatsapp buybar-wa" href="' + esc(waUrl) + '"' + (waUrl !== "#" ? ' target="_blank" rel="noopener"' : "") + ' aria-label="WhatsApp\'tan sor">✆</a>' +
        '<a class="btn btn-primary btn-sm" href="#modeller">Satın Al →</a>';
      document.body.appendChild(buybar);
    }

    var ticking = false;
    function onScroll() {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
      if (buybar) {
        var pastHero = heroEl.getBoundingClientRect().bottom < 0;
        var r = buyTarget.getBoundingClientRect();
        var atModels = r.top < window.innerHeight * 0.75 && r.bottom > window.innerHeight * 0.25;
        var atEnd = max - window.scrollY < 160;
        var show = pastHero && !atModels && !atEnd;
        buybar.classList.toggle("show", show);
        document.body.classList.toggle("has-buybar", show);
      }
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  } catch (e) { /* süsleme katmanı başarısız olsa bile site çalışır */ }
})();
