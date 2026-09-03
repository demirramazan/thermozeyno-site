/* Basit içerik koruması — caydırıcıdır, %100 engel değildir.
   (Tarayıcıda "kaynağı görüntüle" her zaman mümkündür; bu yüzden
    asıl koruma: sunucuda telif + DMCA bildirimi + filigran.) */
(function () {
  function inForm(el) {
    return el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
  }

  // Sağ tık menüsünü kapat
  document.addEventListener("contextmenu", function (e) {
    if (!inForm(e.target)) e.preventDefault();
  });

  // Metin seçmeyi engelle (form alanları hariç)
  document.addEventListener("selectstart", function (e) {
    if (!inForm(e.target)) e.preventDefault();
  });

  // Kopyalama / kesme engeli (form alanları hariç)
  ["copy", "cut"].forEach(function (evt) {
    document.addEventListener(evt, function (e) {
      if (!inForm(e.target)) e.preventDefault();
    });
  });

  // Görsel sürükleyip kaydetmeyi engelle
  document.addEventListener("dragstart", function (e) {
    if (e.target && e.target.tagName === "IMG") e.preventDefault();
  });

  // Kısayolları engelle: F12, Ctrl+U (kaynak), Ctrl+S (kaydet),
  // Ctrl+Shift+I/J/C (geliştirici araçları), Ctrl+C (form dışı)
  document.addEventListener("keydown", function (e) {
    var k = (e.key || "").toLowerCase();
    if (e.key === "F12") { e.preventDefault(); return; }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (k === "i" || k === "j" || k === "c")) { e.preventDefault(); return; }
    if ((e.ctrlKey || e.metaKey) && (k === "u" || k === "s")) { e.preventDefault(); return; }
    if ((e.ctrlKey || e.metaKey) && k === "c" && !inForm(e.target)) { e.preventDefault(); }
  });
})();
