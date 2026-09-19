/* The localSpace landing page. Everything here is an enhancement: without it
   the page is complete, the forms post straight to Formspree and the demo
   shows its answer whole. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function onMotionChange(listener) {
    if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', listener);
    else reduceMotion.addListener(listener);
  }

  /* The contact address is written plainly in index.html, in the company card
     and the footer, so it can be read without scripts. The forms' fallback
     takes it from there: changing the address is one edit, in one file. */
  var contactLink = document.querySelector('a[data-contact]');
  var CONTACT_EMAIL = contactLink ? contactLink.textContent.trim() : '';

  /* -- header: a hairline once the page has moved; the sheet closes after a choice */

  var head = document.querySelector('.site-head');
  function markScrolled() { head.classList.toggle('is-scrolled', window.scrollY > 4); }
  window.addEventListener('scroll', markScrolled, { passive: true });
  markScrolled();

  var menu = document.querySelector('.menu');
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) menu.open = false;
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });

  /* -- entrances: each section's heading, and at most three children of a row,
     rise once as they arrive. Nothing already on screen is ever hidden. */

  (function entrances() {
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
    var groups = [];
    document.querySelectorAll('main h2:not(.vh)').forEach(function (heading) { groups.push([heading]); });
    groups.push(Array.prototype.slice.call(document.querySelectorAll('.claims li'), 0, 3));
    groups.push(Array.prototype.slice.call(document.querySelectorAll('.way'), 0, 3));

    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        seen.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px' });

    groups.forEach(function (group) {
      group.forEach(function (element, index) {
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.style.setProperty('--delay', index * 60 + 'ms');
        element.classList.add('reveal');
        seen.observe(element);
      });
    });
  })();

  /* -- the waitlist: both forms, one implementation ------------------------------ */

  var EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var SEND_TIMEOUT_MS = 15000;

  document.querySelectorAll('form[data-waitlist]').forEach(function (form) {
    var fields = form.querySelector('.form-fields');
    var email = form.querySelector('input[type="email"]');
    var pick = form.querySelector('select');
    var trap = form.querySelector('input[name="_gotcha"]');
    var submit = form.querySelector('button[type="submit"]');
    var status = form.querySelector('.form-status');
    var label = submit.textContent;

    function say(parts, tone) {
      status.className = 'form-status' + (tone ? ' is-' + tone : '');
      status.textContent = '';
      parts.forEach(function (part) { status.append(part); });
    }

    function withFallback(sentence) {
      if (!CONTACT_EMAIL) return [sentence + ' Please try again in a minute.'];
      var link = document.createElement('a');
      link.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('Please add me to the localSpace waitlist');
      link.textContent = CONTACT_EMAIL;
      return [sentence + ' Try again, or email ', link, ' and we will add you by hand.'];
    }

    function ready() {
      submit.disabled = false;
      submit.textContent = label;
      form.removeAttribute('aria-busy');
    }

    function refuseAddress(sentence) {
      email.setAttribute('aria-invalid', 'true');
      say([sentence], 'error');
      email.focus();
    }

    email.addEventListener('input', function () { email.removeAttribute('aria-invalid'); });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (trap.value) return;

      var address = email.value.trim();
      if (!EMAIL_SHAPE.test(address)) {
        refuseAddress('That email address does not look complete. Check it and try again.');
        return;
      }

      submit.disabled = true;
      submit.textContent = 'Sending…';
      form.setAttribute('aria-busy', 'true');
      say([], '');

      var abort = 'AbortController' in window ? new AbortController() : null;
      var timer = abort ? setTimeout(function () { abort.abort(); }, SEND_TIMEOUT_MS) : 0;

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: address,
          use_case: pick.value || 'unspecified',
          _subject: 'localSpace preview request: ' + address
        }),
        signal: abort ? abort.signal : undefined
      })
        .then(function (response) {
          clearTimeout(timer);
          if (response.ok) {
            fields.hidden = true;
            form.removeAttribute('aria-busy');
            say(['You are on the list. We will email you once — when there is a build worth your disk space.'], 'ok');
            status.tabIndex = -1;
            status.focus();
            return;
          }
          return response.json().catch(function () { return {}; }).then(function (body) {
            ready();
            var errors = (body && body.errors) || [];
            var aboutTheAddress = errors.some(function (error) { return error.field === 'email'; });
            if (aboutTheAddress) {
              refuseAddress('The list would not take that address. Check it for a typo and try again.');
              return;
            }
            say(withFallback('That did not go through on our side.'), 'error');
            submit.focus();
          });
        })
        .catch(function () {
          clearTimeout(timer);
          ready();
          say(withFallback('That did not reach us. Your connection may have dropped.'), 'error');
          submit.focus();
        });
    });
  });

  /* -- the speed demo ------------------------------------------------------------
     The same answer streams word by word at the rate measured for the chosen
     setup, starting with the first word. It pauses off screen and in a hidden
     tab, loops after a pause, and under reduced motion stands still: the whole
     answer and the rate as figures. */

  (function speedDemo() {
    var demo = document.querySelector('[data-demo]');
    if (!demo) return;

    var WORDS_PER_TOKEN = 0.75; /* the app's own conversion, so the page and the app agree */
    var HOLD_MS = 4000;

    var chips = Array.prototype.slice.call(demo.querySelectorAll('.chip'));
    var answer = demo.querySelector('[data-demo-answer]');
    var modelOut = demo.querySelector('[data-demo-model]');
    var rateOut = demo.querySelector('[data-demo-rate]');

    /* A screen reader hears the whole answer, never half of one. */
    var spoken = document.createElement('p');
    spoken.className = 'vh';
    spoken.textContent = answer.textContent;
    answer.parentNode.insertBefore(spoken, answer);
    answer.setAttribute('aria-hidden', 'true');

    /* Each word becomes a span where it stands, so the answer keeps its shape
       and the panel never changes height while it streams. */
    var words = [];
    var pieces = answer.textContent.split(/(\s+)/);
    answer.textContent = '';
    pieces.forEach(function (piece) {
      if (!piece) return;
      if (/^\s+$/.test(piece)) {
        answer.appendChild(document.createTextNode(piece));
        return;
      }
      var word = document.createElement('span');
      word.className = 'w';
      word.textContent = piece;
      answer.appendChild(word);
      words.push(word);
    });

    /* A long word is several tokens and takes longer; the average is exactly the
       measured rate, from the first word to the last. */
    var weights = words.map(function (word) { return Math.max(1, Math.round(word.textContent.length / 4)); });
    var times = [];

    function schedule(tokensPerSecond) {
      var span = ((words.length - 1) / (tokensPerSecond * WORDS_PER_TOKEN)) * 1000;
      var total = weights.slice(1).reduce(function (sum, weight) { return sum + weight; }, 0);
      var reached = 0;
      times = weights.map(function (weight, index) {
        if (index === 0) return 0;
        reached += weight;
        return (span * reached) / total;
      });
    }

    var state = 'still'; /* streaming | holding | still */
    var running = false;
    var inView = !('IntersectionObserver' in window);
    var shown = 0;
    var startedAt = 0;
    var pausedAt = 0;
    var frame = 0;
    var holdTimer = 0;
    var holdLeft = 0;
    var holdBegan = 0;

    function mayRun() { return inView && !document.hidden && !reduceMotion.matches; }

    function hideAll() {
      words.forEach(function (word) { word.classList.remove('on', 'last'); });
    }

    function tick(now) {
      var elapsed = now - startedAt;
      while (shown < words.length && times[shown] <= elapsed) {
        if (shown > 0) words[shown - 1].classList.remove('last');
        words[shown].classList.add('on', 'last');
        shown += 1;
      }
      if (shown < words.length) {
        frame = requestAnimationFrame(tick);
        return;
      }
      words[words.length - 1].classList.remove('last');
      state = 'holding';
      holdLeft = HOLD_MS;
      holdBegan = now;
      holdTimer = setTimeout(restart, holdLeft);
    }

    function restart() {
      cancelAnimationFrame(frame);
      clearTimeout(holdTimer);
      hideAll();
      answer.classList.add('is-streaming');
      shown = 0;
      state = 'streaming';
      startedAt = pausedAt = performance.now();
      running = mayRun();
      if (running) frame = requestAnimationFrame(tick);
    }

    function pause() {
      if (!running) return;
      running = false;
      pausedAt = performance.now();
      cancelAnimationFrame(frame);
      if (state === 'holding') {
        clearTimeout(holdTimer);
        holdLeft -= pausedAt - holdBegan;
      }
    }

    function resume() {
      if (running || !mayRun()) return;
      running = true;
      var now = performance.now();
      if (state === 'streaming') {
        startedAt += now - pausedAt;
        frame = requestAnimationFrame(tick);
      } else if (state === 'holding') {
        holdBegan = now;
        holdTimer = setTimeout(restart, Math.max(0, holdLeft));
      }
    }

    function standStill() {
      running = false;
      cancelAnimationFrame(frame);
      clearTimeout(holdTimer);
      hideAll();
      answer.classList.remove('is-streaming');
      state = 'still';
    }

    function showRate(tokensPerSecond) {
      var figure = document.createElement('span');
      figure.className = 'num';
      figure.textContent = String(tokensPerSecond);
      var wordsPerSecond = Math.round(tokensPerSecond * WORDS_PER_TOKEN);
      rateOut.textContent = '';
      rateOut.append(figure, ' tokens a second · about ' + wordsPerSecond + ' words a second');
    }

    function choose(chip) {
      chips.forEach(function (other) { other.setAttribute('aria-pressed', String(other === chip)); });
      var tokensPerSecond = parseFloat(chip.getAttribute('data-tps'));
      modelOut.textContent = chip.getAttribute('data-model');
      showRate(tokensPerSecond);
      schedule(tokensPerSecond);
      if (reduceMotion.matches) standStill();
      else restart();
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () { choose(chip); });
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[entries.length - 1].isIntersecting;
        if (inView) resume();
        else pause();
      }, { threshold: 0.2 }).observe(demo);
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pause();
      else resume();
    });

    onMotionChange(function () {
      if (reduceMotion.matches) standStill();
      else restart();
    });

    demo.querySelector('[data-demo-pick]').hidden = false;
    choose(chips.filter(function (chip) { return chip.getAttribute('aria-pressed') === 'true'; })[0] || chips[0]);
  })();
})();
