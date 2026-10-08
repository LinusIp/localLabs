/* "Who it's for": the stage that becomes each world in turn, the switcher
   that says which world is in front, and the small windows that type their
   request and write their answer. The page is complete without any of it:
   every world is drawn as a still picture beside its text, and every window
   shows its whole request and answer. */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var box = document.querySelector('[data-worlds]');
  if (!box) return;

  var panels = Array.prototype.slice.call(box.querySelectorAll('[data-world]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.switcher a'));
  var row = document.querySelector('.switcher ol');
  var stageBox = box.querySelector('.stage');
  /* The answers were written by Qwen2.5 7B on the 4 GB laptop, measured at
     13.2 tokens a second: they appear at that pace, in the app's 0.75 words a token. */
  var WORDS_PER_SECOND = 13.2 * 0.75;
  var POINTS = 48;
  var canWatch = 'IntersectionObserver' in window;
  var stage = null;
  var current = '';

  function make(name, attrs) {
    var el = document.createElementNS(NS, name);
    for (var key in attrs) el.setAttribute(key, attrs[key]);
    return el;
  }

  /* -- which world is in front ---------------------------------------------------- */

  /* The line a world crosses to come in front: below whatever stays at the top
     of the screen, a third of the way into what is left (half on a wide screen,
     where the stage stands beside the words). */
  function readingLine() {
    var top = 0;
    var switcher = document.querySelector('.switcher');
    if (switcher) top = Math.max(top, switcher.getBoundingClientRect().bottom);
    var wide = window.innerWidth >= 1000;
    if (stage && !wide) top = Math.max(top, stageBox.getBoundingClientRect().bottom);
    return Math.round(top + (window.innerHeight - top) * (wide ? 0.5 : 0.3));
  }

  var front = null;
  function watchWorlds() {
    if (!canWatch) return;
    if (front) front.disconnect();
    var line = readingLine();
    front = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) bringToFront(entry.target.getAttribute('data-world'));
      });
    }, { rootMargin: -line + 'px 0px ' + -(window.innerHeight - line - 1) + 'px 0px' });
    panels.forEach(function (panel) { front.observe(panel); });
  }

  function bringToFront(name) {
    if (name === current) return;
    current = name;
    links.forEach(function (link) {
      var on = link.getAttribute('href') === '#' + name;
      if (on) {
        link.setAttribute('aria-current', 'true');
        keepInView(link);
      } else {
        link.removeAttribute('aria-current');
      }
    });
    if (stage) stage.show(name);
  }

  /* The switcher scrolls sideways on a phone: the world in front stays visible in it. */
  function keepInView(link) {
    if (!row) return;
    var r = link.getBoundingClientRect();
    var bounds = row.getBoundingClientRect();
    if (r.left >= bounds.left && r.right <= bounds.right) return;
    row.scrollBy({ left: r.left - bounds.left - 16, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  }

  /* -- the outline of a world, and its changing into the next ------------------------ */

  function parsePoints(text) {
    return text.trim().split(/\s+/).map(function (pair) { return pair.split(',').map(Number); });
  }

  /* Any outline as the same number of points, clockwise, starting where the
     middle of the picture meets its top: so one outline turns into another
     without twisting. */
  function resample(points, count) {
    var area = 0;
    for (var i = 0; i < points.length; i++) {
      var a = points[i];
      var b = points[(i + 1) % points.length];
      area += a[0] * b[1] - b[0] * a[1];
    }
    var pts = area < 0 ? points.slice().reverse() : points;
    var best = null;
    for (var j = 0; j < pts.length; j++) {
      var p = pts[j];
      var q = pts[(j + 1) % pts.length];
      if ((p[0] - 200) * (q[0] - 200) > 0 || p[0] === q[0]) continue;
      var t = (200 - p[0]) / (q[0] - p[0]);
      var y = p[1] + t * (q[1] - p[1]);
      if (!best || y < best.y) best = { index: j, y: y };
    }
    var walk = [[200, best.y]];
    for (var k = 1; k <= pts.length; k++) walk.push(pts[(best.index + k) % pts.length]);
    walk.push([200, best.y]);
    var lengths = [0];
    for (var m = 1; m < walk.length; m++) {
      lengths.push(lengths[m - 1] + Math.hypot(walk[m][0] - walk[m - 1][0], walk[m][1] - walk[m - 1][1]));
    }
    var total = lengths[lengths.length - 1];
    var out = [];
    var seg = 1;
    for (var n = 0; n < count; n++) {
      var d = (total * n) / count;
      while (lengths[seg] < d) seg += 1;
      var span = lengths[seg] - lengths[seg - 1] || 1;
      var f = (d - lengths[seg - 1]) / span;
      out.push([walk[seg - 1][0] + f * (walk[seg][0] - walk[seg - 1][0]), walk[seg - 1][1] + f * (walk[seg][1] - walk[seg - 1][1])]);
    }
    return out;
  }

  function inside(pts, x, y) {
    var hit = false;
    for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      var a = pts[i];
      var b = pts[j];
      if (a[1] > y !== b[1] > y && x < ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]) + a[0]) hit = !hit;
    }
    return hit;
  }

  /* The wall nearest a point, as the direction pointing back inside. */
  function inward(pts, x, y, cx, cy) {
    var bestD = Infinity;
    var normal = [0, 0];
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i];
      var b = pts[(i + 1) % pts.length];
      var ex = b[0] - a[0];
      var ey = b[1] - a[1];
      var len2 = ex * ex + ey * ey || 1;
      var t = Math.max(0, Math.min(1, ((x - a[0]) * ex + (y - a[1]) * ey) / len2));
      var px = a[0] + t * ex;
      var py = a[1] + t * ey;
      var d = (x - px) * (x - px) + (y - py) * (y - py);
      if (d < bestD) {
        bestD = d;
        var len = Math.sqrt(len2);
        normal = [-ey / len, ex / len];
        if (normal[0] * (cx - px) + normal[1] * (cy - py) < 0) normal = [-normal[0], -normal[1]];
      }
    }
    return normal;
  }

  function centre(pts) {
    var x = 0;
    var y = 0;
    pts.forEach(function (p) { x += p[0]; y += p[1]; });
    return [x / pts.length, y / pts.length];
  }

  function perimeter(pts) {
    var total = 0;
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i];
      var b = pts[(i + 1) % pts.length];
      total += Math.hypot(b[0] - a[0], b[1] - a[1]);
    }
    return total;
  }

  var ease = function (k) { return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };

  /* -- the stage ---------------------------------------------------------------------- */

  function Stage(container) {
    var self = this;
    this.svg = make('svg', { viewBox: '0 0 400 300', class: 'scene', 'aria-hidden': 'true', preserveAspectRatio: 'xMidYMid meet' });
    this.insideShape = make('polygon', { class: 'inside' });
    this.wall = make('polygon', { class: 'wall' });
    this.svg.appendChild(this.insideShape);
    this.worlds = {};
    panels.forEach(function (panel) {
      var still = panel.querySelector('.scene');
      if (!still) return;
      var things = still.querySelector('.things').cloneNode(true);
      Array.prototype.forEach.call(things.children, function (child, i) {
        child.style.setProperty('--i', String(Math.min(i, 8)));
      });
      self.svg.appendChild(things);
      self.worlds[panel.getAttribute('data-world')] = {
        pts: resample(parsePoints(still.querySelector('.wall').getAttribute('points')), POINTS),
        things: things,
        mark: (still.getAttribute('data-mark') || '200,150,0.24').split(',').map(Number),
        anchors: (still.getAttribute('data-anchors') || '200,150').split(' ').map(function (pair) { return pair.split(',').map(Number); }),
      };
    });
    this.svg.appendChild(this.wall);
    this.dotLayer = make('g', {});
    this.svg.appendChild(this.dotLayer);
    this.mark = this.figure();
    this.svg.appendChild(this.mark);
    container.appendChild(this.svg);
    this.name = '';
    this.pts = null;
    this.dots = [];
    this.running = false;
    this.opened = false;
  }

  /* The mark's three nodes and their joins, whole, its nodes pulsing in turn as
     the app's thinking indicator does. Moved as one piece; never stretched. */
  Stage.prototype.figure = function () {
    var mark = make('g', { class: 'mark' });
    var figure = make('g', { class: 'figure', transform: 'translate(-128 -149)' });
    figure.appendChild(make('path', { d: 'M88.5 105.3 128 131.2 167.5 105.3' }));
    figure.appendChild(make('path', { d: 'M128 131.2V208.3' }));
    figure.appendChild(make('circle', { class: 'n n1', cx: '88.5', cy: '105.3', r: '15.5' }));
    figure.appendChild(make('circle', { class: 'n n2', cx: '167.5', cy: '105.3', r: '15.5' }));
    figure.appendChild(make('circle', { class: 'n n3', cx: '128', cy: '168.2', r: '15.5' }));
    mark.appendChild(figure);
    return mark;
  };

  Stage.prototype.draw = function () {
    var text = this.pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
    this.insideShape.setAttribute('points', text);
    this.wall.setAttribute('points', text);
  };

  Stage.prototype.morph = function (to, ms) {
    var self = this;
    cancelAnimationFrame(this.morphing);
    if (!this.pts || ms === 0) {
      this.pts = to.map(function (p) { return p.slice(); });
      this.draw();
      return;
    }
    var from = this.pts.map(function (p) { return p.slice(); });
    var began = performance.now();
    var frame = function (now) {
      var k = Math.min(1, (now - began) / ms);
      var e = ease(k);
      self.pts = from.map(function (p, i) { return [p[0] + (to[i][0] - p[0]) * e, p[1] + (to[i][1] - p[1]) * e]; });
      self.draw();
      if (k < 1) self.morphing = requestAnimationFrame(frame);
    };
    this.morphing = requestAnimationFrame(frame);
  };

  Stage.prototype.show = function (name) {
    var next = this.worlds[name];
    if (!next || name === this.name) return;
    var before = this.worlds[this.name];
    if (before) {
      var leaving = before.things;
      leaving.classList.remove('on');
      leaving.classList.add('off');
      setTimeout(function () { if (!leaving.classList.contains('on')) leaving.classList.remove('off'); }, 260);
    }
    next.things.classList.add('off');
    next.things.getBoundingClientRect();
    next.things.classList.remove('off');
    next.things.classList.add('on');
    this.morph(next.pts, this.name ? 760 : 0);
    this.mark.style.transform = 'translate(' + next.mark[0] + 'px, ' + next.mark[1] + 'px) scale(' + next.mark[2] + ')';
    this.anchors = next.anchors;
    this.name = name;
    if (name !== 'intro') this.closeNow();
  };

  /* -- the green dots: they travel between the things of a world, and turn at
        its wall rather than pass through it ------------------------------------------ */

  Stage.prototype.seed = function () {
    for (var i = 0; i < 12; i++) {
      var a = this.anchors[i % this.anchors.length];
      var dot = { x: a[0] + (Math.random() - 0.5) * 24, y: a[1] + (Math.random() - 0.5) * 24, vx: (Math.random() - 0.5) * 30, vy: (Math.random() - 0.5) * 30, to: (i + 1) % this.anchors.length };
      dot.el = make('circle', { class: 'dot', r: '3.5', cx: dot.x.toFixed(1), cy: dot.y.toFixed(1) });
      this.dotLayer.appendChild(dot.el);
      this.dots.push(dot);
    }
  };

  Stage.prototype.step = function (dt) {
    var pts = this.pts;
    var anchors = this.anchors;
    var mid = centre(pts);
    for (var i = 0; i < this.dots.length; i++) {
      var d = this.dots[i];
      var a = anchors[d.to % anchors.length];
      var dx = a[0] - d.x;
      var dy = a[1] - d.y;
      var dist = Math.hypot(dx, dy) || 1;
      if (dist < 12) d.to = (d.to + 1 + Math.floor(Math.random() * (anchors.length - 1))) % anchors.length;
      var pull = Math.min(1, dt * 1.6);
      d.vx += (dx / dist * 44 - d.vx) * pull + (Math.random() - 0.5) * 140 * dt;
      d.vy += (dy / dist * 44 - d.vy) * pull + (Math.random() - 0.5) * 140 * dt;
      var nx = d.x + d.vx * dt;
      var ny = d.y + d.vy * dt;
      if (!inside(pts, nx, ny)) {
        var n = inward(pts, nx, ny, mid[0], mid[1]);
        var along = d.vx * n[0] + d.vy * n[1];
        if (along < 0) {
          d.vx -= 2 * along * n[0];
          d.vy -= 2 * along * n[1];
        }
        nx = d.x + d.vx * dt;
        ny = d.y + d.vy * dt;
        if (!inside(pts, nx, ny)) {
          nx = d.x + (mid[0] - d.x) * 0.12;
          ny = d.y + (mid[1] - d.y) * 0.12;
        }
      }
      d.x = nx;
      d.y = ny;
      d.el.setAttribute('cx', nx.toFixed(1));
      d.el.setAttribute('cy', ny.toFixed(1));
    }
  };

  Stage.prototype.start = function () {
    if (this.running) return;
    var self = this;
    var last = performance.now();
    this.running = true;
    var frame = function (now) {
      if (!self.running) return;
      self.step(Math.min(0.05, (now - last) / 1000));
      last = now;
      self.frame = requestAnimationFrame(frame);
    };
    this.frame = requestAnimationFrame(frame);
  };

  Stage.prototype.stop = function () {
    this.running = false;
    cancelAnimationFrame(this.frame);
  };

  /* -- the opening, once: without a wall a few dots leave for a cloud, then the
        wall closes ------------------------------------------------------------------ */

  Stage.prototype.opening = function () {
    var self = this;
    var total = perimeter(this.pts);
    var gap = 46;
    var middle = total / 12;
    this.wall.style.strokeDasharray = total - gap + ' ' + gap;
    this.wall.style.strokeDashoffset = String(-(middle + gap / 2));
    var from = [200, 146];
    var door = [251, 61.5];
    var cloud = [338, 54];
    var reds = [];
    for (var i = 0; i < 4; i++) {
      var red = make('circle', { class: 'dot-out', r: '3.5', cx: '200', cy: '146', opacity: '0' });
      this.svg.appendChild(red);
      reds.push(red);
    }
    this.reds = reds;
    var began = performance.now();
    var flight = 1500;
    var apart = 420;
    var frame = function (now) {
      if (self.opened) return;
      var t = now - began - 500;
      var flying = false;
      reds.forEach(function (red, i) {
        var k = (t - i * apart) / flight;
        if (k < 0) { flying = true; return; }
        if (k >= 1) { red.setAttribute('opacity', '0'); return; }
        flying = true;
        var e = ease(k);
        var x;
        var y;
        if (e < 0.55) {
          var s = e / 0.55;
          x = from[0] + (door[0] - from[0]) * s;
          y = from[1] + (door[1] - from[1]) * s;
        } else {
          var u = (e - 0.55) / 0.45;
          x = door[0] + (cloud[0] - door[0]) * u;
          y = door[1] + (cloud[1] - door[1]) * u;
        }
        red.setAttribute('cx', x.toFixed(1));
        red.setAttribute('cy', y.toFixed(1));
        red.setAttribute('opacity', k > 0.9 ? String((1 - k) * 10) : '1');
      });
      if (flying) {
        self.openingFrame = requestAnimationFrame(frame);
      } else {
        self.close(gap, total, middle);
      }
    };
    this.openingFrame = requestAnimationFrame(frame);
  };

  Stage.prototype.close = function (gap, total, middle) {
    var self = this;
    var began = performance.now();
    var frame = function (now) {
      if (self.opened) return;
      var k = Math.min(1, (now - began) / 650);
      var g = gap * (1 - ease(k));
      self.wall.style.strokeDasharray = total - g + ' ' + g;
      self.wall.style.strokeDashoffset = String(-(middle + g / 2));
      if (k < 1) requestAnimationFrame(frame);
      else self.closeNow();
    };
    requestAnimationFrame(frame);
  };

  Stage.prototype.closeNow = function () {
    if (this.opened) return;
    this.opened = true;
    cancelAnimationFrame(this.openingFrame);
    this.wall.style.strokeDasharray = '';
    this.wall.style.strokeDashoffset = '';
    (this.reds || []).forEach(function (red) { red.remove(); });
    stageBox.classList.add('closed');
  };

  /* -- the small windows: the request types itself, the answer comes word by word -------- */

  function splitInto(el, unit, className, out) {
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        var parts = unit === 'char' ? Array.from(node.textContent) : node.textContent.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        parts.forEach(function (part) {
          if (!part) return;
          if (unit === 'word' && /^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          var span = document.createElement('span');
          span.className = className;
          span.textContent = part;
          frag.appendChild(span);
          out.push({ el: span, weight: unit === 'word' ? Math.max(1, Math.round(part.length / 4)) : 1 });
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1 && !node.classList.contains('vh')) {
        splitInto(node, unit, className, out);
      }
    });
    return out;
  }

  function prepare(win) {
    var steps = [];
    var request = win.querySelector('[data-type]');
    var at = 0;
    if (request) {
      splitInto(request, 'char', 'c', []).forEach(function (piece, i) {
        at += 24 + (i % 5) * 7;
        steps.push({ el: piece.el, at: at, caret: true });
      });
    }
    at += 420;
    var soon = win.querySelector('[data-soon]');
    if (soon) steps.push({ el: soon, at: at });
    var answer = win.querySelector('[data-stream]');
    if (answer) {
      var words = [];
      Array.prototype.forEach.call(answer.children, function (child) {
        if (child.hasAttribute('data-board')) {
          Array.prototype.forEach.call(child.querySelectorAll('.sticky'), function (note) { words.push({ el: note, note: true }); });
        } else {
          splitInto(child, 'word', 'w', words);
        }
      });
      var plain = words.filter(function (w) { return !w.note; });
      var mean = plain.reduce(function (sum, w) { return sum + w.weight; }, 0) / (plain.length || 1);
      words.forEach(function (w) {
        at += w.note ? 450 : (1000 * w.weight) / mean / WORDS_PER_SECOND;
        steps.push({ el: w.el, at: at, caret: !w.note });
      });
    }
    win.steps = steps;
  }

  function play(win) {
    if (win.played) return;
    win.played = true;
    var steps = win.steps;
    var shown = 0;
    var caret = null;
    var began = performance.now();
    win.classList.add('is-playing');
    var frame = function (now) {
      if (!win.playing) return;
      var t = now - began;
      while (shown < steps.length && steps[shown].at <= t) {
        if (caret) caret.classList.remove('last');
        var step = steps[shown];
        step.el.classList.add('on');
        caret = step.caret ? step.el : null;
        if (caret) caret.classList.add('last');
        shown += 1;
      }
      if (shown < steps.length) win.frame = requestAnimationFrame(frame);
      else finish(win);
    };
    win.playing = true;
    win.frame = requestAnimationFrame(frame);
  }

  function finish(win) {
    win.playing = false;
    cancelAnimationFrame(win.frame);
    (win.steps || []).forEach(function (step) { step.el.classList.add('on'); });
    var caret = win.querySelector('.last');
    if (caret) caret.classList.remove('last');
    win.classList.remove('is-playing');
  }

  function watchWindows() {
    var windows = Array.prototype.slice.call(document.querySelectorAll('[data-mini]'));
    if (!canWatch) return;
    /* A window starts once its top is well inside the screen: a tall one may
       never be mostly in view under a phone's stage. */
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        seen.unobserve(entry.target);
        play(entry.target);
      });
    }, { rootMargin: '0px 0px -22% 0px' });
    windows.forEach(function (win) {
      prepare(win);
      /* A window already in view keeps its words; one further down waits, blank, to be read. */
      if (win.getBoundingClientRect().top < window.innerHeight) return;
      win.classList.add('is-playing');
      seen.observe(win);
    });
    reduceMotion.addEventListener && reduceMotion.addEventListener('change', function () {
      if (reduceMotion.matches) windows.forEach(finish);
    });
  }

  /* -- the end: the nine worlds come in as tiles around the mark ---------------------------- */

  function watchTiles() {
    var tiles = document.querySelector('[data-tiles]');
    if (!tiles || !canWatch || tiles.getBoundingClientRect().top < window.innerHeight) return;
    Array.prototype.forEach.call(tiles.querySelectorAll('.tile'), function (tile) {
      var r = tile.querySelector('rect');
      var x = Number(r.getAttribute('x')) + 22;
      var y = Number(r.getAttribute('y')) + 22;
      tile.style.setProperty('--dx', ((x - 200) * 0.9).toFixed(1));
      tile.style.setProperty('--dy', ((y - 150) * 0.9).toFixed(1));
    });
    tiles.classList.add('tiles-on');
    var arrive = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      tiles.classList.add('in');
      arrive.disconnect();
    }, { threshold: 0.35 });
    arrive.observe(tiles);
  }

  /* -- start ---------------------------------------------------------------------------- */

  function startStage() {
    box.classList.add('stage-on');
    stage = new Stage(stageBox);
    stage.show(panels[0].getAttribute('data-world'));
    stage.seed();
    stage.opening();
    var visible = true;
    var inSight = new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !document.hidden) stage.start();
      else stage.stop();
    });
    inSight.observe(stageBox);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stage.stop();
      else if (visible) stage.start();
    });
    reduceMotion.addEventListener && reduceMotion.addEventListener('change', function () {
      if (!reduceMotion.matches) return;
      stage.stop();
      stage.closeNow();
      box.classList.remove('stage-on');
    });
  }

  if (!reduceMotion.matches && canWatch) {
    startStage();
    watchWindows();
    watchTiles();
  }
  watchWorlds();
  var resized = 0;
  window.addEventListener('resize', function () {
    clearTimeout(resized);
    resized = setTimeout(watchWorlds, 200);
  });
})();
