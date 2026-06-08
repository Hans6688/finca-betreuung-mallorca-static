/* Swiderski Property Management - Main JS */
document.addEventListener('DOMContentLoaded', function () {
  // NAVIGATION
  var nav = document.getElementById('main-nav');
  var navIsTransparent = nav && nav.classList.contains('nav-transparent');
  function updateNav() {
    if (!nav) return;
    if (navIsTransparent) {
      if (window.scrollY > 60) {
        nav.classList.remove('nav-transparent');
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.add('nav-transparent');
        nav.classList.remove('nav-scrolled');
      }
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // MOBILE MENU
  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('nav-mobile');
  var mobileClose = document.getElementById('nav-mobile-close');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // SCROLL ANIMATIONS
  var scrollObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in-up, .fade-in').forEach(function (el) {
    scrollObserver.observe(el);
  });

  // BEFORE/AFTER SLIDER
  document.querySelectorAll('.ba-container').forEach(function (container) {
    var handle = container.querySelector('.ba-handle');
    var afterDiv = container.querySelector('.ba-after');
    if (!handle || !afterDiv) return;
    var dragging = false;
    function setPosition(clientX) {
      var rect = container.getBoundingClientRect();
      var x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      var pct = (x / rect.width) * 100;
      afterDiv.style.width = pct + '%';
      handle.style.left = pct + '%';
    }
    handle.addEventListener('mousedown', function (e) { dragging = true; e.preventDefault(); });
    document.addEventListener('mousemove', function (e) { if (dragging) setPosition(e.clientX); });
    document.addEventListener('mouseup', function () { dragging = false; });
    handle.addEventListener('touchstart', function (e) { dragging = true; e.preventDefault(); }, { passive: false });
    document.addEventListener('touchmove', function (e) { if (dragging && e.touches[0]) setPosition(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('touchend', function () { dragging = false; });
  });
});
