/* The scroll-story page. Sets --p on each [data-story] section, from 0 when
   it starts to scroll by to 1 when its sticky stage is about to leave; the
   motion itself is in story.css. Also the answer's language switch and the
   copy buttons. Without this script, or with motion reduced, every section
   shows its finished frame and the answer in the page's own language. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* -- the answer in English, Russian or Uzbek ------------------------------- */

  var tabs = document.querySelector('[data-tabs]');
  if (tabs) {
    var buttons = Array.prototype.slice.call(tabs.querySelectorAll('[data-tab]'));
    var threads = Array.prototype.slice.call(document.querySelectorAll('[data-answer]'));
    tabs.hidden = false;
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var want = button.getAttribute('data-tab');
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
        threads.forEach(function (t) { t.hidden = t.getAttribute('data-answer') !== want; });
      });
    });
  }

  /* -- copy buttons: each SHA-256 has one ------------------------------------ */

  var copyWords = { en: ['Copy', 'Copied'], ru: ['Копировать', 'Скопировано'], uz: ['Nusxalash', 'Nusxalandi'] };
  var words = copyWords[document.documentElement.lang] || copyWords.en;
  if (navigator.clipboard && window.isSecureContext) {
    document.querySelectorAll('button[data-copy]').forEach(function (button) {
      var source = document.getElementById(button.getAttribute('data-copy'));
      if (!source) return;
      button.hidden = false;
      var timer = 0;
      button.addEventListener('click', function () {
        navigator.clipboard.writeText(source.textContent.trim()).then(function () {
          button.textContent = words[1];
          clearTimeout(timer);
          timer = setTimeout(function () { button.textContent = words[0]; }, 2000);
        });
      });
    });
  }

  /* -- scroll progress ------------------------------------------------------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-story]'));

  var frame = 0;

  function measure() {
    frame = 0;
    var view = window.innerHeight;
    sections.forEach(function (section) {
      /* A section that is not pinned (phones) shows its finished frame. */
      var stage = section.querySelector('.stage');
      if (stage && getComputedStyle(stage).position !== 'sticky') {
        section.style.removeProperty('--p');
        return;
      }
      var box = section.getBoundingClientRect();
      var travel = Math.max(1, box.height - view);
      var p = Math.min(1, Math.max(0, -box.top / travel));
      section.style.setProperty('--p', p.toFixed(3));
    });
  }

  function onScroll() {
    if (!frame) frame = requestAnimationFrame(measure);
  }

  function apply() {
    if (reduce.matches) {
      document.documentElement.classList.remove('js');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      sections.forEach(function (section) { section.style.removeProperty('--p'); });
      return;
    }
    document.documentElement.classList.add('js');
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    measure();
  }

  if (reduce.addEventListener) reduce.addEventListener('change', apply);
  else reduce.addListener(apply);
  apply();
})();
