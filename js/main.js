/* ============================================================
   COVER CREDIT — Main JS (animations, utilities)
   ============================================================ */

(function () {
  'use strict';

  /* ----- Intersection Observer: fade-up on scroll ----- */
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.card, .dark-card, .testimonial, .stat-box, .info-box, .team-card, .blog-card').forEach(function (el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  /* ----- Smooth back-to-top (if present) ----- */
  var backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      backBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
    }, { passive: true });

    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----- Current year in footer ----- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
