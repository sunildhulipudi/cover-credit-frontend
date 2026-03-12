/**
 * CoverCredit — Universal Navigation
 * Drop this script on every page. It injects the nav, handles mobile menu,
 * dropdown, and marks the active page automatically.
 *
 * HOW TO USE ON EACH PAGE:
 *   1. Add an empty <header id="cc-nav"></header> where you want the nav.
 *   2. Add this script tag at the bottom of <body>:
 *        <script src="/nav.js"></script>
 *   3. That's it — no other changes needed.
 *
 * LINKING TO BOOK PAGE WITH AUTO-SELECT:
 *   Use these URLs in your CTA buttons:
 *     Health page    → /book?type=health
 *     Life page      → /book?type=life
 *     Bike page      → /book?type=bike
 *     Car page       → /book?type=car
 *     Commercial     → /book?type=commercial
 *     Loans page     → /book?type=loans
 *     Generic (any)  → /book  (no auto-select, user chooses manually)
 */

(function () {
  // ─── NAV HTML ────────────────────────────────────────────────────────────────
  const NAV_HTML = `
    <nav class="cc-nav" role="navigation" aria-label="Main navigation">

      <!-- Top utility bar -->
      <div class="cc-nav__topbar">
        <div class="cc-nav__topbar-inner">
          <span class="cc-nav__topbar-brand">CoverCredit</span>
          <div class="cc-nav__topbar-actions">
            <span class="cc-nav__partner-badge">🤝 Our Partners</span>
            <span class="cc-nav__irdai-badge">✅ IRDAI Verified</span>
            <a href="/book" class="cc-nav__topbar-btn cc-nav__topbar-btn--outline">📅 Book Consultation</a>
            <a href="https://wa.me/917842854466" target="_blank" rel="noopener" class="cc-nav__topbar-btn cc-nav__topbar-btn--whatsapp">💬 WhatsApp Us</a>
          </div>
        </div>
      </div>

      <!-- Main nav bar -->
      <div class="cc-nav__bar">
        <div class="cc-nav__bar-inner">

          <!-- Logo -->
          <a href="/" class="cc-nav__logo" aria-label="CoverCredit Home">
            Cover<strong>Credit</strong>
          </a>

          <!-- Desktop links -->
          <ul class="cc-nav__links" role="list">
            <li><a href="/health-insurance" data-page="health-insurance">Health Insurance</a></li>
            <li><a href="/life-insurance" data-page="life-insurance">Life Insurance</a></li>
            <li class="cc-nav__dropdown-wrap">
              <button class="cc-nav__dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                Vehicle <span class="cc-nav__caret" aria-hidden="true">▾</span>
              </button>
              <ul class="cc-nav__dropdown" role="list">
                <li><a href="/bike-insurance" data-page="bike-insurance">🏍️ Bike Insurance</a></li>
                <li><a href="/car-insurance" data-page="car-insurance">🚗 Car Insurance</a></li>
                <li><a href="/commercial-vehicle-insurance" data-page="commercial-vehicle-insurance">🚛 Commercial Vehicles</a></li>
              </ul>
            </li>
            <li><a href="/loans" data-page="loans">Loans</a></li>
            <li><a href="/blog" data-page="blog">Blog</a></li>
            <li><a href="/about" data-page="about">About</a></li>
            <li><a href="/contact" data-page="contact">Contact</a></li>
          </ul>

          <!-- Desktop CTA -->
          <a href="/book" class="cc-nav__cta">Book Free Consultation</a>

          <!-- Mobile hamburger -->
          <button class="cc-nav__hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="cc-mobile-menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div class="cc-nav__mobile" id="cc-mobile-menu" aria-hidden="true">
        <ul class="cc-nav__mobile-links" role="list">
          <li><a href="/health-insurance" data-page="health-insurance">🏥 Health Insurance</a></li>
          <li><a href="/life-insurance" data-page="life-insurance">❤️ Life Insurance</a></li>
          <li><a href="/bike-insurance" data-page="bike-insurance">🏍️ Bike Insurance</a></li>
          <li><a href="/car-insurance" data-page="car-insurance">🚗 Car Insurance</a></li>
          <li><a href="/commercial-vehicle-insurance" data-page="commercial-vehicle-insurance">🚛 Commercial Vehicles</a></li>
          <li><a href="/loans" data-page="loans">💰 Loans &amp; Finance</a></li>
          <li><a href="/blog" data-page="blog">📝 Blog</a></li>
          <li><a href="/about" data-page="about">🏢 About Us</a></li>
          <li><a href="/contact" data-page="contact">📞 Contact</a></li>
        </ul>
        <a href="/book" class="cc-nav__mobile-cta">Book Free Consultation →</a>
      </div>

    </nav>
  `;

  // ─── CSS ─────────────────────────────────────────────────────────────────────
  const NAV_CSS = `
    /* ── Reset / Base ── */
    .cc-nav *, .cc-nav *::before, .cc-nav *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .cc-nav { font-family: -apple-system, 'Segoe UI', sans-serif; position: sticky; top: 0; z-index: 1000; }

    /* ── Top utility bar ── */
    .cc-nav__topbar {
      background: #0f172a;
      color: #94a3b8;
      font-size: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .cc-nav__topbar-inner {
      max-width: 1200px; margin: 0 auto; padding: 6px 20px;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
    }
    .cc-nav__topbar-brand { font-weight: 700; color: #e2e8f0; font-size: 13px; }
    .cc-nav__topbar-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .cc-nav__partner-badge, .cc-nav__irdai-badge { font-size: 11px; color: #64748b; }
    .cc-nav__topbar-btn {
      padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600;
      text-decoration: none; white-space: nowrap; transition: all 0.2s;
    }
    .cc-nav__topbar-btn--outline {
      border: 1px solid #334155; color: #94a3b8;
    }
    .cc-nav__topbar-btn--outline:hover { border-color: #0ea5e9; color: #0ea5e9; }
    .cc-nav__topbar-btn--whatsapp {
      background: #22c55e; color: #fff; border: 1px solid #22c55e;
    }
    .cc-nav__topbar-btn--whatsapp:hover { background: #16a34a; }

    /* ── Main bar ── */
    .cc-nav__bar {
      background: #fff;
      border-bottom: 1px solid #e2e8f0;
      box-shadow: 0 1px 8px rgba(0,0,0,0.06);
    }
    .cc-nav__bar-inner {
      max-width: 1200px; margin: 0 auto; padding: 0 20px;
      display: flex; align-items: center; gap: 24px; height: 60px;
    }

    /* ── Logo ── */
    .cc-nav__logo {
      text-decoration: none; font-size: 20px; font-weight: 400;
      color: #1e293b; letter-spacing: -0.3px; flex-shrink: 0;
    }
    .cc-nav__logo strong { font-weight: 800; color: #0ea5e9; }

    /* ── Desktop links ── */
    .cc-nav__links {
      display: flex; align-items: center; gap: 4px;
      list-style: none; flex: 1;
    }
    .cc-nav__links a {
      display: block; padding: 8px 12px; border-radius: 6px;
      font-size: 14px; font-weight: 500; color: #475569;
      text-decoration: none; white-space: nowrap; transition: all 0.15s;
    }
    .cc-nav__links a:hover, .cc-nav__links a.cc-active {
      color: #0ea5e9; background: #f0f9ff;
    }
    .cc-nav__links a.cc-active { font-weight: 600; }

    /* ── Vehicle dropdown ── */
    .cc-nav__dropdown-wrap { position: relative; }
    .cc-nav__dropdown-trigger {
      display: flex; align-items: center; gap: 4px;
      padding: 8px 12px; border-radius: 6px; border: none; background: none; cursor: pointer;
      font-size: 14px; font-weight: 500; color: #475569; white-space: nowrap; transition: all 0.15s;
    }
    .cc-nav__dropdown-trigger:hover, .cc-nav__dropdown-trigger.cc-active {
      color: #0ea5e9; background: #f0f9ff;
    }
    .cc-nav__caret { font-size: 10px; transition: transform 0.2s; }
    .cc-nav__dropdown-trigger[aria-expanded="true"] .cc-nav__caret { transform: rotate(180deg); }
    .cc-nav__dropdown {
      position: absolute; top: calc(100% + 6px); left: 0;
      background: #fff; border: 1px solid #e2e8f0; border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1); min-width: 200px;
      list-style: none; padding: 6px;
      opacity: 0; pointer-events: none; transform: translateY(-6px);
      transition: opacity 0.15s, transform 0.15s;
    }
    .cc-nav__dropdown.cc-open {
      opacity: 1; pointer-events: auto; transform: translateY(0);
    }
    .cc-nav__dropdown a {
      display: block; padding: 10px 14px; border-radius: 6px;
      font-size: 13px; font-weight: 500; color: #475569; text-decoration: none; transition: all 0.1s;
    }
    .cc-nav__dropdown a:hover { background: #f0f9ff; color: #0ea5e9; }

    /* ── Desktop CTA ── */
    .cc-nav__cta {
      padding: 9px 18px; background: #0ea5e9; color: #fff; border-radius: 8px;
      font-size: 13px; font-weight: 700; text-decoration: none; white-space: nowrap;
      flex-shrink: 0; transition: background 0.2s, transform 0.15s;
      box-shadow: 0 2px 8px rgba(14,165,233,0.3);
    }
    .cc-nav__cta:hover { background: #0284c7; transform: translateY(-1px); }

    /* ── Hamburger ── */
    .cc-nav__hamburger {
      display: none; flex-direction: column; gap: 5px; justify-content: center;
      background: none; border: none; cursor: pointer; padding: 8px; margin-left: auto;
    }
    .cc-nav__hamburger span {
      display: block; width: 22px; height: 2px; background: #475569; border-radius: 2px;
      transition: all 0.25s;
    }
    .cc-nav__hamburger[aria-expanded="true"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .cc-nav__hamburger[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
    .cc-nav__hamburger[aria-expanded="true"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* ── Mobile menu ── */
    .cc-nav__mobile {
      display: none; /* shown via JS class */
      background: #fff; border-bottom: 1px solid #e2e8f0;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    }
    .cc-nav__mobile.cc-open { display: block; }
    .cc-nav__mobile-links {
      list-style: none; padding: 12px 0 4px;
    }
    .cc-nav__mobile-links a {
      display: block; padding: 14px 24px;
      font-size: 15px; font-weight: 500; color: #334155; text-decoration: none;
      border-bottom: 1px solid #f1f5f9; transition: background 0.1s;
    }
    .cc-nav__mobile-links a:hover, .cc-nav__mobile-links a.cc-active {
      background: #f0f9ff; color: #0ea5e9;
    }
    .cc-nav__mobile-links a.cc-active { font-weight: 700; }
    .cc-nav__mobile-cta {
      display: block; margin: 16px 20px 20px;
      background: #0ea5e9; color: #fff; text-align: center;
      padding: 14px; border-radius: 10px; font-size: 15px; font-weight: 700;
      text-decoration: none; box-shadow: 0 2px 8px rgba(14,165,233,0.3);
      transition: background 0.2s;
    }
    .cc-nav__mobile-cta:hover { background: #0284c7; }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .cc-nav__topbar-brand,
      .cc-nav__partner-badge,
      .cc-nav__irdai-badge { display: none; }
      .cc-nav__topbar-inner { justify-content: flex-end; }
    }
    @media (max-width: 768px) {
      .cc-nav__topbar { display: none; } /* hide topbar on mobile — too cluttered */
      .cc-nav__links, .cc-nav__cta { display: none; }
      .cc-nav__hamburger { display: flex; }
      .cc-nav__bar-inner { height: 56px; }
    }
  `;

  // ─── INJECT STYLES ────────────────────────────────────────────────────────────
  if (!document.getElementById('cc-nav-styles')) {
    const style = document.createElement('style');
    style.id = 'cc-nav-styles';
    style.textContent = NAV_CSS;
    document.head.appendChild(style);
  }

  // ─── INJECT HTML ──────────────────────────────────────────────────────────────
  const target = document.getElementById('cc-nav');
  if (!target) {
    console.warn('[CoverCredit Nav] No <header id="cc-nav"> found. Nav not injected.');
    return;
  }
  target.innerHTML = NAV_HTML;

  // ─── ACTIVE STATE ─────────────────────────────────────────────────────────────
  // Marks the current page's link as active based on the URL path.
  const path = window.location.pathname.replace(/^\/|\/$/g, ''); // e.g. "health-insurance"
  document.querySelectorAll('[data-page]').forEach(function (el) {
    if (el.dataset.page === path) {
      el.classList.add('cc-active');
      // If inside Vehicle dropdown, also mark the trigger button as active
      const wrap = el.closest('.cc-nav__dropdown-wrap');
      if (wrap) {
        wrap.querySelector('.cc-nav__dropdown-trigger').classList.add('cc-active');
      }
    }
  });

  // ─── VEHICLE DROPDOWN ─────────────────────────────────────────────────────────
  const dropdownTrigger = document.querySelector('.cc-nav__dropdown-trigger');
  const dropdown = document.querySelector('.cc-nav__dropdown');

  if (dropdownTrigger && dropdown) {
    dropdownTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('cc-open');
      dropdown.classList.toggle('cc-open', !isOpen);
      dropdownTrigger.setAttribute('aria-expanded', String(!isOpen));
    });
    // Close on outside click
    document.addEventListener('click', function () {
      dropdown.classList.remove('cc-open');
      dropdownTrigger.setAttribute('aria-expanded', 'false');
    });
  }

  // ─── MOBILE HAMBURGER ─────────────────────────────────────────────────────────
  const hamburger = document.querySelector('.cc-nav__hamburger');
  const mobileMenu = document.getElementById('cc-mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.contains('cc-open');
      mobileMenu.classList.toggle('cc-open', !isOpen);
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.setAttribute('aria-hidden', String(isOpen));
    });
  }

})();
