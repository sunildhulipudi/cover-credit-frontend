/**
 * CoverCredit — Book Page Auto-Select
 * Reads the ?type= URL param and auto-selects the matching department
 * card on step 1 of the booking form, then automatically advances to step 2.
 *
 * HOW TO USE:
 *   Add this script at the bottom of book.html's <body>:
 *     <script src="/book-autoselect.js"></script>
 *
 * SUPPORTED TYPE VALUES:
 *   ?type=health        → Health Insurance
 *   ?type=life          → Life Insurance
 *   ?type=bike          → Bike Insurance
 *   ?type=car           → Car Insurance
 *   ?type=commercial    → Commercial Vehicle
 *   ?type=loans         → Loans
 *
 * HOW TO LINK FROM OTHER PAGES:
 *   Health page CTA:    href="/book?type=health"
 *   Life page CTA:      href="/book?type=life"
 *   Bike page CTA:      href="/book?type=bike"
 *   Car page CTA:       href="/book?type=car"
 *   Commercial CTA:     href="/book?type=commercial"
 *   Loans page CTA:     href="/book?type=loans"
 *   Generic CTA:        href="/book"   ← no param = user picks manually
 *
 * HOW IT WORKS:
 *   1. Reads ?type= from the URL
 *   2. Finds the matching department card by its emoji/text label
 *   3. Clicks it (triggers your existing form's selection logic)
 *   4. After a short delay, clicks the "Continue" button to advance to step 2
 *   5. Smoothly scrolls to the top of the form
 *
 * IMPORTANT — READ THIS:
 *   This script finds the department cards using their visible text labels.
 *   If you rename any label in book.html, update the TYPE_MAP below to match.
 */

(function () {
  // ─── MAP: URL param value → text that appears in the department card ──────────
  // The value must exactly match (case-insensitive) some text inside the card element.
  const TYPE_MAP = {
    'health':     'Health Insurance',
    'life':       'Life Insurance',
    'bike':       'Bike Insurance',
    'car':        'Car Insurance',
    'commercial': 'Commercial Vehicle',
    'loans':      'Loans',
  };

  // ─── READ URL PARAM ───────────────────────────────────────────────────────────
  const params = new URLSearchParams(window.location.search);
  const type   = (params.get('type') || '').toLowerCase().trim();

  if (!type || !TYPE_MAP[type]) {
    // No param or unrecognised value — do nothing, let user choose manually.
    return;
  }

  const targetLabel = TYPE_MAP[type].toLowerCase();

  // ─── WAIT FOR FORM TO RENDER, THEN AUTO-SELECT ────────────────────────────────
  // Uses a short polling loop in case the form renders after the DOM loads
  // (e.g. if your booking form is JS-rendered).
  var attempts = 0;
  var maxAttempts = 20; // try for up to ~2 seconds

  var poll = setInterval(function () {
    attempts++;

    // Find all clickable department cards — look for elements that contain
    // the target label text and are likely interactive (div, li, label, button).
    var cards = document.querySelectorAll(
      '.booking-option, .department-card, [data-department], ' +
      '.step-1 li, .step-1 label, .step-1 div[class]'
    );

    // Fallback: search ALL clickable-looking elements on the page for the text
    if (!cards.length) {
      cards = document.querySelectorAll('li, label, [role="option"], [role="button"]');
    }

    var matched = null;
    cards.forEach(function (el) {
      if (el.textContent.toLowerCase().includes(targetLabel)) {
        matched = el;
      }
    });

    if (matched) {
      clearInterval(poll);
      autoSelect(matched);
    } else if (attempts >= maxAttempts) {
      clearInterval(poll);
      console.warn('[CoverCredit Book] Could not find department card for type:', type,
        '— user will need to select manually.');
    }
  }, 100);

  // ─── AUTO-SELECT + ADVANCE ────────────────────────────────────────────────────
  function autoSelect(card) {
    // Smooth scroll to the form
    var form = document.querySelector('form, .booking-form, .book-form, main, #book-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Brief pause so the user can see what's being selected
    setTimeout(function () {
      // Click the card to trigger your existing selection logic
      card.click();

      // If it contains a radio/checkbox, also trigger that directly
      var input = card.querySelector('input[type="radio"], input[type="checkbox"]');
      if (input) {
        input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }

      // Show a subtle "pre-selected" toast message
      showPreSelectedToast(TYPE_MAP[type]);

      // After another short pause, click the Continue / Next button
      setTimeout(function () {
        var continueBtn = findContinueButton();
        if (continueBtn) {
          continueBtn.click();
        }
      }, 600);

    }, 400);
  }

  // ─── FIND THE CONTINUE BUTTON ─────────────────────────────────────────────────
  function findContinueButton() {
    // Try various common patterns for "Continue" / "Next" buttons
    var selectors = [
      'button[type="submit"]',
      'button.continue', '.continue-btn', '#continue-btn',
      'button.next', '.next-btn',
      '.step-1 button', '.step-actions button',
    ];

    for (var i = 0; i < selectors.length; i++) {
      var btn = document.querySelector(selectors[i]);
      if (btn) return btn;
    }

    // Last resort: find any button whose text says "continue" or "next"
    var allButtons = document.querySelectorAll('button, [role="button"]');
    for (var j = 0; j < allButtons.length; j++) {
      var text = allButtons[j].textContent.toLowerCase().trim();
      if (text.includes('continue') || text === 'next →' || text === 'next') {
        return allButtons[j];
      }
    }

    console.warn('[CoverCredit Book] Could not find Continue button — user will need to click it.');
    return null;
  }

  // ─── TOAST NOTIFICATION ───────────────────────────────────────────────────────
  function showPreSelectedToast(label) {
    // Only inject once
    if (document.getElementById('cc-book-toast')) return;

    var toast = document.createElement('div');
    toast.id = 'cc-book-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = '✅&nbsp; <strong>' + label + '</strong> pre-selected for you';

    var style = [
      'position:fixed', 'top:80px', 'left:50%', 'transform:translateX(-50%)',
      'background:#0f172a', 'color:#e2e8f0', 'padding:10px 20px',
      'border-radius:30px', 'font-size:14px', 'font-family:sans-serif',
      'box-shadow:0 4px 20px rgba(0,0,0,0.25)', 'z-index:9999',
      'white-space:nowrap', 'transition:opacity 0.4s',
      'border:1px solid rgba(14,165,233,0.4)'
    ].join(';');
    toast.setAttribute('style', style);

    document.body.appendChild(toast);

    // Fade out after 3 seconds
    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () { toast.remove(); }, 400);
    }, 3000);
  }

})();
