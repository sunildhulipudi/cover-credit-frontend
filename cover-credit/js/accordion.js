/* ============================================================
   COVER CREDIT — Accordion Component
   ============================================================ */

(function () {
  'use strict';

  document.querySelectorAll('.accordion__header').forEach(function (header) {
    header.addEventListener('click', function () {
      const item    = header.closest('.accordion__item');
      const isOpen  = item.classList.contains('accordion__item--open');

      /* Close all siblings */
      const accordion = item.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.accordion__item--open').forEach(function (openItem) {
          openItem.classList.remove('accordion__item--open');
        });
      }

      /* Toggle clicked */
      if (!isOpen) {
        item.classList.add('accordion__item--open');
      }
    });
  });

})();
