// Writes the page in its three languages: index.html, ru/index.html and
// uz/index.html, from one layout, the strings in tools/strings.mjs and the
// release's values in release.json. Run it after changing any of them:
//
//   node tools/pages.mjs
//
// The written pages are committed; the site itself has no build step.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { STRINGS } from "./strings.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://linusip.github.io/localLabs/";
const TELEGRAM = "https://t.me/localSpace_discussion";
const EMAIL = "locallabs.io@gmail.com";
const COUNTER_REPO = "https://github.com/LinusIp/localspace-downloads";
const release = JSON.parse(readFileSync(join(ROOT, "release.json"), "utf8"));

const LANGS = [
  { code: "en", dir: "", root: "" },
  { code: "ru", dir: "ru/", root: "../" },
  { code: "uz", dir: "uz/", root: "../" },
];

const MARK = `<svg viewBox="0 0 256 256" focusable="false"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M136.4 40.85 199.27 77.15A16.8 16.8 0 0 1 207.67 91.7V164.3A16.8 16.8 0 0 1 199.27 178.85L136.4 215.15A16.8 16.8 0 0 1 119.6 215.15L56.73 178.85A16.8 16.8 0 0 1 48.33 164.3V91.7A16.8 16.8 0 0 1 56.73 77.15L119.6 40.85A16.8 16.8 0 0 1 136.4 40.85Z" stroke-width="23.3"/><path d="M88.5 105.3 128 131.2 167.5 105.3" stroke-width="9.1"/><path d="M128 131.2V208.3" stroke-width="9.1"/></g><g fill="currentColor"><circle cx="88.5" cy="105.3" r="15.5"/><circle cx="167.5" cy="105.3" r="15.5"/><circle cx="128" cy="168.2" r="15.5"/></g></svg>`;

// The demo's question and answer are real, from Qwen2.5 7B, and stay in the
// language the model wrote them in on every page.
const DEMO_QUESTION = "Write a short, polite email to my landlord asking him to fix the leaking tap in the kitchen.";
const DEMO_ANSWER = `Subject: Request for Kitchen Tap Repair

Dear [Landlord's Name],

I hope this email finds you well. I am writing to bring to your attention a small issue in the kitchen. The tap seems to be leaking, which is a bit concerning. I believe it would be best if you could have a look at it and arrange for it to be fixed at your earliest convenience.

Thank you for your prompt attention to this matter.

Best regards,`;

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function fileName(key) {
  const f = release.files[key];
  const kind = key === "setup" ? "setup.exe" : "portable.zip";
  return f.name || `localSpace-0.2.0-<build>-windows-x64-${kind}`;
}

function fileCard(t, key) {
  const f = release.files[key];
  const s = t.files[key];
  const href = release.counter + f.route;
  const size = f.mb ? `${esc(f.mb.replace(".", t.decimal))} ${esc(t.labels.mb)}` : `<span class="pending">${esc(t.pending)}</span>`;
  const hash = f.sha256
    ? `<code class="hash" id="sha-${key}">${esc(f.sha256)}</code><button class="copy" type="button" data-copy="sha-${key}" hidden>${esc(t.copy)}</button>`
    : `<span class="pending">${esc(t.pending)}</span>`;
  return `
        <article class="file">
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.about)}</p>
          <a class="btn btn-primary" href="${esc(href)}">${esc(s.button)}</a>
          <dl class="facts">
            <div><dt>${esc(t.labels.file)}</dt><dd><code>${esc(fileName(key))}</code></dd></div>
            <div><dt>${esc(t.labels.size)}</dt><dd>${size}</dd></div>
            <div><dt>SHA-256</dt><dd class="hash-row">${hash}</dd></div>
          </dl>
        </article>`;
}

function page(lang) {
  const t = STRINGS[lang.code];
  const r = lang.root;
  const url = SITE + lang.dir;
  const alternates = LANGS.map(
    (l) => `<link rel="alternate" hreflang="${l.code}" href="${SITE}${l.dir}">`,
  ).join("\n");
  const switcher = LANGS.map((l) =>
    l.code === lang.code
      ? `<a href="${r}${l.dir}" aria-current="true" lang="${l.code}">${STRINGS[l.code].langName}</a>`
      : `<a href="${r}${l.dir}" lang="${l.code}" hreflang="${l.code}">${STRINGS[l.code].langName}</a>`,
  ).join("");
  const tg = `<a href="${TELEGRAM}">${esc(t.telegram)}</a>`;
  const mail = `<a href="mailto:${EMAIL}?subject=${encodeURIComponent(t.mailSubject)}" data-contact>${EMAIL}</a>`;
  const setupHref = release.counter + release.files.setup.route;
  const check = `Get-FileHash .\\${fileName("setup")} -Algorithm SHA256`;

  return `<!DOCTYPE html>
<html lang="${lang.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<link rel="canonical" href="${url}">
${alternates}
<link rel="alternate" hreflang="x-default" href="${SITE}">
<meta name="theme-color" content="#faf9f8">

<meta property="og:type" content="website">
<meta property="og:site_name" content="localSpace">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(t.h1.join(" "))}">
<meta property="og:description" content="${esc(t.description)}">
<meta property="og:image" content="${SITE}og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The localSpace logo and the words: Your computer can run its own AI. We will tell you how well. Below them, three speeds measured on one laptop: 9.5, 13.2 and 40.5 tokens a second.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(t.h1.join(" "))}">
<meta name="twitter:description" content="${esc(t.description)}">
<meta name="twitter:image" content="${SITE}og.png">

<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="icon" href="${r}favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="${r}apple-touch-icon.png">
<link rel="preload" href="${r}fonts/figtree-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${r}style.css">
<script src="${r}script.js" defer></script>
</head>
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>

<header class="site-head" id="top">
  <div class="wrap head-in">
    <a class="brand" href="#top"><img src="${r}brand/localspace-lockup.png" width="102" height="30" alt="localSpace"></a>
    <nav class="nav-links" aria-label="${esc(t.nav.sections)}">
      <a href="#how">${esc(t.nav.how)}</a>
      <a href="#companies">${esc(t.nav.companies)}</a>
    </nav>
    <nav class="langs" aria-label="${esc(t.nav.language)}">${switcher}</nav>
    <a class="btn btn-primary head-cta" href="#download">${esc(t.nav.download)}</a>
    <details class="menu">
      <summary>${esc(t.nav.menu)}</summary>
      <nav class="menu-sheet" aria-label="${esc(t.nav.sections)}">
        <a href="#how">${esc(t.nav.how)}</a>
        <a href="#companies">${esc(t.nav.companies)}</a>
        <a href="#download">${esc(t.nav.download)}</a>
      </nav>
    </details>
  </div>
</header>

<main id="main" tabindex="-1">

  <section class="hero" aria-labelledby="hero-title">
    <div class="wrap hero-grid">
      <div>
        <h1 id="hero-title"><span>${esc(t.h1[0])}</span> <span>${esc(t.h1[1])}</span></h1>
        <p class="lede">${esc(t.lede)}</p>
        <div class="hero-get">
          <div class="hero-buttons">
            <a class="btn btn-primary btn-big" href="${esc(setupHref)}">${esc(t.heroButton)}</a>
            <a class="btn btn-secondary btn-big" href="${TELEGRAM}">${esc(t.dl.communityButton)}</a>
          </div>
          <p class="hero-meta">${esc(t.versionWord)} ${esc(release.version)} <span class="tag">${esc(t.preview)}</span> · ${esc(t.windows)}</p>
          <p class="hero-meta"><a href="#download">${esc(t.heroDetails)}</a></p>
        </div>
      </div>

      <figure class="demo" data-demo>
        <div class="demo-pick" data-demo-pick hidden>
          <p class="demo-label" id="demo-label">${esc(t.demo.label)}</p>
          <div class="chips" role="group" aria-labelledby="demo-label">
            <button class="chip" type="button" aria-pressed="false" data-tps="9.5" data-model="Qwen2.5 7B">${esc(t.demo.cpu)} <span class="chip-model">7B</span></button>
            <button class="chip" type="button" aria-pressed="true" data-tps="13.2" data-model="Qwen2.5 7B">${esc(t.demo.gpu)} <span class="chip-model">7B</span></button>
            <button class="chip" type="button" aria-pressed="false" data-tps="40.5" data-model="Qwen2.5 3B">${esc(t.demo.gpu)} <span class="chip-model">3B</span></button>
          </div>
        </div>
        <div class="panel">
          <div class="thread">
            <div class="msg" lang="en">
              <span class="avatar" aria-hidden="true">Y</span>
              <p class="msg-body msg-person">${esc(DEMO_QUESTION)}</p>
            </div>
            <div class="msg" lang="en">
              <span class="avatar avatar-model" aria-hidden="true">${MARK}</span>
              <div class="msg-body">
                <p class="answer" data-demo-answer>${esc(DEMO_ANSWER)}</p>
              </div>
            </div>
          </div>
          <div class="panel-foot">
            <span class="model-chip" data-demo-model>Qwen2.5 7B</span>
            <p class="rate" data-demo-rate data-rate="${esc(t.demo.rate)}" aria-live="polite">${esc(t.demo.rate).replace("{t}", `<span class="num">${(13.2).toLocaleString(lang.code)}</span>`).replace("{w}", "10")}</p>
          </div>
        </div>
        <figcaption>${esc(t.demo.caption)}</figcaption>
        <p class="earlier">${esc(t.earlier)}</p>
      </figure>
    </div>
  </section>

  <section class="claims" aria-labelledby="claims-title">
    <div class="wrap">
      <h2 class="vh" id="claims-title">${esc(t.claimsTitle)}</h2>
      <ul>
${t.claims.map(([a, b]) => `        <li><strong>${esc(a)}</strong><span>${esc(b)}</span></li>`).join("\n")}
      </ul>
    </div>
  </section>

  <section class="section" id="how" aria-labelledby="how-title">
    <div class="wrap">
      <h2 id="how-title">${esc(t.nav.how)}</h2>
      <p class="earlier earlier-how">${esc(t.earlier)}</p>
      <ol class="steps">
${t.steps
  .map(
    (s, i) => `        <li>
          <figure class="step">
            <figcaption>
              <h3>${esc(s.title)}</h3>
              <p>${esc(s.text)}</p>
            </figcaption>
            <img class="shot" src="${r}${SHOTS[i].src}" width="${SHOTS[i].w}" height="${SHOTS[i].h}" loading="lazy" decoding="async" alt="${esc(s.alt)}">
          </figure>
        </li>`,
  )
  .join("\n")}
      </ol>
    </div>
  </section>

  <section class="section section-alt" id="companies" aria-labelledby="ways-title">
    <div class="wrap">
      <h2 id="ways-title">${esc(t.ways.title)}</h2>
      <div class="ways">
        <article class="way">
          <h3>${esc(t.ways.own.title)}</h3>
          <p>${esc(t.ways.own.text)}</p>
          <p class="way-end"><a href="#download">${esc(t.nav.download)}</a></p>
        </article>
        <article class="way">
          <h3>${esc(t.ways.server.title)}</h3>
          <p>${esc(t.ways.server.text)}</p>
          <p class="way-note">${esc(t.ways.server.note)}</p>
          <p class="way-end">${t.ways.server.write.replace("{telegram}", tg).replace("{email}", mail)}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section download" id="download" aria-labelledby="download-title">
    <div class="wrap">
      <h2 id="download-title">${esc(t.dl.title)} <span class="tag tag-big">${esc(t.preview)}</span></h2>
      <p class="lede">${esc(t.dl.lede.replace("{version}", release.version))}</p>

      <div class="files">${fileCard(t, "setup")}${fileCard(t, "portable")}
      </div>
      <p class="count-note">${esc(t.dl.counted)} <a href="${COUNTER_REPO}">${esc(t.dl.counterCode)}</a></p>

      <div class="dl-grid">
        <div class="dl-block">
          <h3>${esc(t.dl.checkTitle)}</h3>
          <p>${esc(t.dl.checkRun)}</p>
          <pre class="command"><code>${esc(check)}</code></pre>
          <p>${esc(t.dl.checkCompare)}</p>
        </div>
        <div class="dl-block">
          <h3>${esc(t.dl.needsTitle)}</h3>
          <p>${esc(t.dl.needs)}</p>
          <p class="measured">${esc(t.dl.measured)}</p>
        </div>
        <div class="dl-block">
          <h3>${esc(t.dl.stopTitle)}</h3>
          <p>${t.dl.smartScreen}</p>
          <p>${t.dl.smartAppControl}</p>
        </div>
        <div class="dl-block">
          <h3>${esc(t.dl.standsTitle)}</h3>
          <ul class="stands">
${t.dl.stands.map((s) => `            <li>${esc(s)}</li>`).join("\n")}
          </ul>
        </div>
      </div>

      <div class="community">
        <div>
          <h3>${esc(t.dl.communityTitle)}</h3>
          <p>${esc(t.dl.community)}</p>
        </div>
        <a class="btn btn-secondary" href="${TELEGRAM}">${esc(t.dl.communityButton)}</a>
      </div>
    </div>
  </section>

</main>

<footer class="site-foot">
  <div class="wrap foot-in">
    <a class="brand" href="#top"><img src="${r}brand/localspace-lockup.png" width="102" height="30" alt="localSpace" loading="lazy" decoding="async"></a>
    <nav class="foot-links" aria-label="${esc(t.nav.footer)}">
      <a href="#how">${esc(t.nav.how)}</a>
      <a href="#companies">${esc(t.nav.companies)}</a>
      <a href="#download">${esc(t.nav.download)}</a>
    </nav>
    <p class="foot-meta"><a href="mailto:${EMAIL}" data-contact>${EMAIL}</a> <a href="${TELEGRAM}">Telegram</a> <span>© 2026 localLabs</span></p>
  </div>
</footer>
</body>
</html>
`;
}

const SHOTS = [
  { src: "shots/first-run.webp", w: 576, h: 598 },
  { src: "shots/models.webp", w: 694, h: 728 },
  { src: "shots/chat.webp", w: 795, h: 540 },
];

for (const lang of LANGS) {
  const out = join(ROOT, lang.dir, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page(lang));
}
