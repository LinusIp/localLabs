/* The scroll-story page. Sets --p on each [data-story] section, from 0 when
   it starts to scroll by to 1 when its sticky stage is about to leave, and
   nothing else: the motion itself is in story.css. Without this script, or
   with motion reduced, every section shows its finished frame. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-story]'));
  if (!sections.length) return;

  var frame = 0;

  function measure() {
    frame = 0;
    var view = window.innerHeight;
    sections.forEach(function (section) {
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
