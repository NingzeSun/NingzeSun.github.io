// Google Analytics 4 for both the homepage and the project page.
// Paste the measurement ID (Admin > Data streams > Web) below; nothing loads until then or on local previews.
(function () {
  var id = 'G-QZ36MXXE5M';
  if (id === 'G-XXXXXXXXXX' || location.protocol === 'file:' || /^(localhost|127\.)/.test(location.hostname)) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id);
})();
