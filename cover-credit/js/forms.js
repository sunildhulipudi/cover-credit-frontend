/* ============================================================
   COVER CREDIT — Forms JS (connects to real backend)
   ============================================================ */

(function () {
  'use strict';

  // ── Change this to your deployed Render backend URL after deploying ──
  // e.g. 'https://cover-credit-api.onrender.com'
  // During local testing use 'http://localhost:5000'
  const API_URL = 'https://cover-credit-backend.onrender.com';

  // ── Generic form handler ──────────────────────────────────
  function handleForm(formId, successId, endpoint, buildPayload) {
    const form    = document.getElementById(formId);
    const success = document.getElementById(successId);
    if (!form || !success) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const btn = form.querySelector('.form-submit');
      const originalText = btn ? btn.textContent : '';

      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      try {
        const payload  = buildPayload(form);
        const response = await fetch(API_URL + endpoint, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.success) {
          form.reset();
          success.textContent = '✅ ' + data.message;
          success.style.background = '#edf8f1';
          success.style.borderColor = '#a3e0b5';
          success.style.color = '#1a6e35';
          success.classList.add('show');
          success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          success.textContent = '❌ ' + (data.message || 'Something went wrong. Please call us directly.');
          success.style.background = '#fdf0f0';
          success.style.borderColor = '#f5c6c6';
          success.style.color = '#cf4343';
          success.classList.add('show');
        }

      } catch (err) {
        success.textContent = '❌ Could not connect. Please call us at +91 96428 34789.';
        success.style.background = '#fdf0f0';
        success.style.borderColor = '#f5c6c6';
        success.style.color = '#cf4343';
        success.classList.add('show');

      } finally {
        if (btn) { btn.disabled = false; btn.textContent = originalText; }
      }
    });
  }

  // ── Phone number formatting ───────────────────────────────
  document.querySelectorAll('input[type="tel"]').forEach(function (input) {
    input.addEventListener('input', function () {
      input.value = input.value.replace(/[^\d+\s\-]/g, '');
    });
  });

  // ── Contact form ─────────────────────────────────────────
  handleForm(
    'contact-form',
    'contact-success',
    '/api/contact',
    function (form) {
      return {
        firstName: form.querySelector('#first-name')?.value?.trim() || '',
        lastName:  form.querySelector('#last-name')?.value?.trim()  || '',
        phone:     form.querySelector('#phone')?.value?.trim()       || '',
        email:     form.querySelector('#email')?.value?.trim()       || '',
        interest:  form.querySelector('#interest')?.value            || 'Other',
        message:   form.querySelector('#message')?.value?.trim()     || '',
      };
    }
  );

  // ── Booking form ──────────────────────────────────────────
  handleForm(
    'book-form',
    'book-success',
    '/api/book',
    function (form) {
      return {
        name:               form.querySelector('#b-name')?.value?.trim()  || '',
        phone:              form.querySelector('#b-phone')?.value?.trim() || '',
        email:              form.querySelector('#b-email')?.value?.trim() || '',
        topic:              form.querySelector('#b-topic')?.value          || '',
        preferredLanguage:  form.querySelector('#b-lang')?.value          || 'Telugu',
        preferredTimeSlot:  form.querySelector('#b-time')?.value          || 'Any time is fine',
        notes:              form.querySelector('#b-note')?.value?.trim()  || '',
      };
    }
  );

})();
