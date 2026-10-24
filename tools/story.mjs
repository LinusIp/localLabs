// Writes the scroll-story preview in its three languages: story/index.html,
// story/ru/index.html and story/uz/index.html. Built section by section; the
// live page stays index.html until the story replaces it.
//
//   node tools/story.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { STRINGS } from "./strings.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TELEGRAM = "https://t.me/localSpace_discussion";
const release = JSON.parse(readFileSync(join(ROOT, "release.json"), "utf8"));

const LANGS = [
  { code: "en", dir: "story/", root: "../" },
  { code: "ru", dir: "story/ru/", root: "../../" },
  { code: "uz", dir: "story/uz/", root: "../../" },
];

// Step 1's words. The readings are what the preview build's first screen
// showed on the test laptop on 21 October 2026 (shots/first-run-0.2.webp).
const STEP1 = {
  en: {
    eyebrow: "It looks first",
    title: "First, it reads your computer.",
    body: "The graphics card, its memory and the system memory, read on the computer itself before anything downloads. Nothing is sent.",
    reads: [["Graphics card", "NVIDIA GeForce RTX 3050 Ti Laptop GPU"], ["Graphics memory", "4 GB"], ["System memory", "16 GB"]],
    source: "As the preview build read our test laptop on 21 October 2026.",
    alt: "The first screen of localSpace 0.2.0-preview.1, with This computer ringed: NVIDIA GeForce RTX 3050 Ti Laptop GPU, 4 GB of graphics memory, 16 GB of system memory. Below it, the model recommended for this computer, Qwen3.5 4B.",
  },
  ru: {
    eyebrow: "Сначала оно смотрит",
    title: "Сначала оно читает ваш компьютер.",
    body: "Видеокарту, её память и оперативную память — прямо на компьютере, ещё до загрузки. Ничего не отправляется.",
    reads: [["Видеокарта", "NVIDIA GeForce RTX 3050 Ti Laptop GPU"], ["Видеопамять", "4 ГБ"], ["Оперативная память", "16 ГБ"]],
    source: "Так предварительная версия прочитала наш тестовый ноутбук 21 октября 2026 года.",
    alt: "Первый экран localSpace 0.2.0-preview.1 на английском, раздел «Этот компьютер» обведён: NVIDIA GeForce RTX 3050 Ti Laptop GPU, 4 ГБ видеопамяти, 16 ГБ оперативной памяти. Ниже — модель, рекомендованная этому компьютеру: Qwen3.5 4B.",
  },
  uz: {
    eyebrow: "Avval qaraydi",
    title: "Avval u kompyuteringizni oʻqiydi.",
    body: "Videokarta, uning xotirasi va tizim xotirasi — hech narsa yuklab olinmasdan oldin, kompyuterning oʻzida oʻqiladi. Hech narsa yuborilmaydi.",
    reads: [["Videokarta", "NVIDIA GeForce RTX 3050 Ti Laptop GPU"], ["Videoxotira", "4 GB"], ["Tizim xotirasi", "16 GB"]],
    source: "Sinov versiyasi sinov noutbukimizni 2026-yil 21-oktabrda shunday oʻqidi.",
    alt: "localSpace 0.2.0-preview.1 ning ingliz tilidagi birinchi ekrani, «Bu kompyuter» qismi belgilangan: NVIDIA GeForce RTX 3050 Ti Laptop GPU, 4 GB videoxotira, 16 GB tizim xotirasi. Uning ostida shu kompyuterga tavsiya etilgan model: Qwen3.5 4B.",
  },
};

// Step 2: the model list as the app showed it on the same laptop
// (shots/models-0.2.webp), in the app's own words, which are English. The
// measured speed is the one figure the site states for the 4B there.
const MODELS = [
  { name: "Qwen3.5 4B", by: "Alibaba (Qwen)", line: "Runs well — faster than you read: about 15 to 20 words a second.", pick: true },
  { name: "Gemma 4 E2B", by: "Google", line: "Runs well — faster than you read: about 15 to 20 words a second." },
  { name: "Gemma 4 E4B", by: "Google", line: "Runs well — faster than you read: about 7 to 10 words a second." },
  { name: "Qwen3.5 9B", by: "Alibaba (Qwen)", line: "Runs well — faster than you read: about 5 to 7 words a second. Needs most of this computer's memory: close other programs, such as your browser, before you use it." },
];

const STEPS = {
  en: {
    pick: {
      eyebrow: "It chooses",
      title: "Then it picks the model that fits.",
      body: "Every model says how it will run on this computer before you download it. The one that fits best comes first.",
      recommended: "Recommended",
      unit: "tokens a second, measured",
      measured: "Measured on the same laptop: 25.2 tokens a second.",
      note: "The models' lines are the app's own words on that laptop.",
    },
    ask: {
      eyebrow: "Then you ask",
      title: "Show it a photo. Ask in your language.",
      body: "One handwritten problem, answered in English, Russian and Uzbek, on the computer itself.",
      tabs: "Answer in",
      placeholder: "Qwen3.5 4B's real answer goes here after the sitting.",
    },
    privacy: { eyebrow: "Private" },
    end: { title: "Try it on your own computer." },
  },
  ru: {
    pick: {
      eyebrow: "Оно выбирает",
      title: "Потом оно выбирает подходящую модель.",
      body: "Каждая модель ещё до загрузки говорит, как она будет работать на этом компьютере. Лучшая для него идёт первой.",
      recommended: "Рекомендовано",
      unit: "токена в секунду, измерено",
      measured: "Измерено на том же ноутбуке: 25,2 токена в секунду.",
      note: "Строки моделей — слова самого приложения на том ноутбуке, на английском.",
    },
    ask: {
      eyebrow: "Потом вы спрашиваете",
      title: "Покажите фото. Спросите на своём языке.",
      body: "Одна рукописная задача, решённая на английском, русском и узбекском — на самом компьютере.",
      tabs: "Ответ на",
      placeholder: "Здесь будет настоящий ответ Qwen3.5 4B после сеанса.",
    },
    privacy: { eyebrow: "Приватно" },
    end: { title: "Попробуйте на своём компьютере." },
  },
  uz: {
    pick: {
      eyebrow: "Tanlaydi",
      title: "Keyin u mos modelni tanlaydi.",
      body: "Har bir model yuklab olinmasdan oldin bu kompyuterda qanday ishlashini aytadi. Eng mosi birinchi turadi.",
      recommended: "Tavsiya etiladi",
      unit: "token soniyasiga, oʻlchangan",
      measured: "Oʻsha noutbukda oʻlchangan: soniyasiga 25,2 token.",
      note: "Model satrlari — ilovaning oʻsha noutbukdagi oʻz soʻzlari, ingliz tilida.",
    },
    ask: {
      eyebrow: "Keyin siz soʻraysiz",
      title: "Rasm koʻrsating. Oʻz tilingizda soʻrang.",
      body: "Bitta qoʻlda yozilgan masala ingliz, rus va oʻzbek tillarida — kompyuterning oʻzida yechilgan.",
      tabs: "Javob tili",
      placeholder: "Seansdan keyin bu yerda Qwen3.5 4B ning haqiqiy javobi boʻladi.",
    },
    privacy: { eyebrow: "Maxfiy" },
    end: { title: "Oʻz kompyuteringizda sinab koʻring." },
  },
};

// The founder's photo, shown beside the question; a marked slot until it is
// chosen and its sitting is done.
const PHOTO_SLOT = { en: "The photo goes here", ru: "Здесь будет фото", uz: "Bu yerda rasm boʻladi" };

// Step 3: the question asked in each language in the sitting, and the
// answer Qwen3.5 4B gave, word for word. Null until the sitting.
const ASKED = {
  en: { name: "English", question: "Solve the problem in this picture and explain each step.", answer: null },
  ru: { name: "Русский", question: "Реши задачу на этой картинке и объясни каждый шаг.", answer: null },
  uz: { name: "Oʻzbekcha", question: "Bu rasmdagi masalani yeching va har bir qadamni tushuntiring.", answer: null },
};

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

// The three real screens of the stack, top first.
function stack(r, alt) {
  return `<div class="stack">
          <div class="card card-3" aria-hidden="true"><img src="${r}shots/chat-0.2.webp" width="792" height="648" alt="" loading="lazy" decoding="async"></div>
          <div class="card card-2" aria-hidden="true"><img src="${r}shots/models-0.2.webp" width="685" height="530" alt="" loading="lazy" decoding="async"></div>
          <div class="card card-1"><img src="${r}shots/first-run-0.2.webp" width="540" height="463" alt="${esc(alt)}" fetchpriority="high"></div>`;
}

// One file's card in the end section: name, size, SHA-256 with its copy button.
function fileCard(t, key) {
  const f = release.files[key];
  const s = t.files[key];
  const size = `${f.mb.replace(".", t.decimal)} ${t.labels.mb}`;
  return `
        <article class="file">
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.about)}</p>
          <a class="btn btn-primary" href="${esc(release.counter + f.route)}">${esc(s.button)}</a>
          <dl class="facts">
            <div><dt>${esc(t.labels.file)}</dt><dd><code>${esc(f.name)}</code></dd></div>
            <div><dt>${esc(t.labels.size)}</dt><dd>${esc(size)}</dd></div>
            <div><dt>SHA-256</dt><dd class="hash-row"><code id="sha-${key}">${esc(f.sha256)}</code><button class="copy" type="button" data-copy="sha-${key}" hidden>${esc(t.copy)}</button></dd></div>
          </dl>
        </article>`;
}

function page(lang) {
  const t = STRINGS[lang.code];
  const s = STEP1[lang.code];
  const st = STEPS[lang.code];
  const r = lang.root;
  const download = release.counter + release.files.setup.route;
  const switcher = LANGS.map((l) =>
    `<a href="${r}${l.dir}" lang="${l.code}"${l.code === lang.code ? ' aria-current="true"' : ""}>${STRINGS[l.code].langName}</a>`,
  ).join("");
  return `<!DOCTYPE html>
<html lang="${lang.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="robots" content="noindex">
<meta name="theme-color" content="#f8f8fb">
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="preload" href="${r}fonts/figtree-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${r}story.css">
<script>if (!matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("js");</script>
<script src="${r}story.js" defer></script>
</head>
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
<header class="head">
  <div class="wrap head-in">
    <a class="brand" href="#top"><img src="${r}brand/localspace-lockup.png" width="102" height="30" alt="localSpace"></a>
    <nav class="langs" aria-label="${esc(t.nav.language)}">${switcher}</nav>
    <a class="btn btn-primary" href="${esc(download)}">${esc(t.nav.download)}</a>
  </div>
</header>
<main id="main">
  <section class="hero" id="top" aria-labelledby="hero-title">
    <div class="wrap hero-grid">
      <div>
        <h1 id="hero-title">${esc(t.h1[0])}</h1>
        <p class="lede">${esc(t.lede)}</p>
        <div class="ctas">
          <a class="btn btn-primary btn-big" href="${esc(download)}">${esc(t.heroButton)}</a>
          <a class="btn btn-quiet btn-big" href="${TELEGRAM}">${esc(t.dl.communityButton)}</a>
        </div>
        <p class="meta">${esc(t.versionWord)} ${esc(release.version)} <span class="tag">${esc(t.preview)}</span> · ${esc(t.windows)}</p>
      </div>
      ${stack(r, t.steps[0].alt)}
        </div>
    </div>
  </section>

  <section class="story" data-story aria-labelledby="step1-title">
    <div class="stage">
      <div class="wrap stage-grid">
        <div>
          <p class="eyebrow">${esc(s.eyebrow)}</p>
          <h2 id="step1-title">${esc(s.title)}</h2>
          <p class="body">${esc(s.body)}</p>
          <dl class="reads">
${s.reads.map(([k, v]) => `            <div class="read"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("\n")}
          </dl>
          <p class="source">${esc(s.source)}</p>
        </div>
        ${stack(r, s.alt)}
          <div class="ring" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="story story-pick" data-story aria-labelledby="pick-title">
    <div class="stage">
      <div class="wrap stage-grid">
        <div>
          <p class="eyebrow">${esc(st.pick.eyebrow)}</p>
          <h2 id="pick-title">${esc(st.pick.title)}</h2>
          <p class="body">${esc(st.pick.body)}</p>
          <p class="measured-line">${esc(st.pick.measured)}</p>
          <p class="source">${esc(st.pick.note)}</p>
        </div>
        <ul class="models" lang="en">
${MODELS.map((m, i) => `          <li class="model${m.pick ? " is-pick" : ""}" style="--i: ${i}">
            ${m.pick ? `<span class="badge" lang="${lang.code}">${esc(st.pick.recommended)}</span>` : ""}
            <p class="model-name">${esc(m.name)} <span>${esc(m.by)}</span></p>
            <p class="model-line">${esc(m.line)}</p>
            ${m.pick ? `<p class="model-speed" lang="${lang.code}"><b>${(25.2).toLocaleString(lang.code)}</b> ${esc(st.pick.unit)}</p>` : ""}
          </li>`).join("\n")}
        </ul>
      </div>
    </div>
  </section>

  <section class="story story-ask" data-story aria-labelledby="ask-title">
    <div class="stage">
      <div class="wrap stage-grid">
        <div>
          <p class="eyebrow">${esc(st.ask.eyebrow)}</p>
          <h2 id="ask-title">${esc(st.ask.title)}</h2>
          <p class="body">${esc(st.ask.body)}</p>
          <div class="answer-tabs" role="group" aria-label="${esc(st.ask.tabs)}" data-tabs hidden>
${LANGS.map((l) => `            <button type="button" class="chip" data-tab="${l.code}" aria-pressed="${l.code === lang.code}" lang="${l.code}">${esc(ASKED[l.code].name)}</button>`).join("\n")}
          </div>
        </div>
        <div class="window">
          <div class="window-bar"><span>localSpace</span><span class="model-chip">Qwen3.5 4B</span></div>
${LANGS.map((l) => `          <div class="thread" data-answer="${l.code}" lang="${l.code}"${l.code === lang.code ? "" : " hidden"}>
            <div class="msg msg-you"><span class="avatar" aria-hidden="true">A</span><div><div class="photo-slot">${esc(PHOTO_SLOT[lang.code])}</div><p>${esc(ASKED[l.code].question)}</p></div></div>
            <div class="msg msg-model"><span class="avatar avatar-model" aria-hidden="true"></span><div>${ASKED[l.code].answer ? `<p class="answer">${esc(ASKED[l.code].answer)}</p>` : `<p class="placeholder">${esc(st.ask.placeholder)}</p>`}</div></div>
          </div>`).join("\n")}
        </div>
      </div>
    </div>
  </section>

  <section class="plain privacy" aria-labelledby="privacy-title">
    <div class="wrap">
      <p class="eyebrow">${esc(st.privacy.eyebrow)}</p>
      <h2 id="privacy-title">${esc(t.claims[0][0])}.</h2>
      <p class="lede">${esc(t.claims[0][1])}</p>
      <ul class="claims">
${t.claims.slice(1).map(([a, b]) => `        <li><strong>${esc(a)}</strong><span>${esc(b)}</span></li>`).join("\n")}
      </ul>
    </div>
  </section>

  <section class="plain end" id="download" aria-labelledby="end-title">
    <div class="wrap">
      <h2 id="end-title">${esc(st.end.title)}</h2>
      <div class="ctas">
        <a class="btn btn-primary btn-big" href="${esc(download)}">${esc(t.heroButton)}</a>
        <a class="btn btn-quiet btn-big" href="${TELEGRAM}">${esc(t.dl.communityButton)}</a>
      </div>
      <p class="meta">${esc(t.dl.lede.replace("{version}", release.version))}</p>
      <div class="files">${["setup", "portable"].map((k) => fileCard(t, k)).join("")}
      </div>
      <p class="source">${esc(t.dl.counted)} <a href="https://github.com/LinusIp/localspace-downloads">${esc(t.dl.counterCode)}</a></p>
      <div class="dl-grid">
        <div><h3>${esc(t.dl.checkTitle)}</h3><p>${esc(t.dl.checkRun)}</p><pre class="command"><code>${esc(`Get-FileHash .\\${release.files.setup.name} -Algorithm SHA256`)}</code></pre><p>${esc(t.dl.checkCompare)}</p></div>
        <div><h3>${esc(t.dl.needsTitle)}</h3><p>${esc(t.dl.needs)}</p><p class="source">${esc(t.dl.measured)}</p></div>
        <div><h3>${esc(t.dl.stopTitle)}</h3><p>${t.dl.smartScreen}</p><p>${t.dl.smartAppControl}</p></div>
        <div><h3>${esc(t.ways.server.title)}</h3><p>${esc(t.ways.server.note)}</p><p>${t.ways.server.write.replace("{telegram}", `<a href="${TELEGRAM}">${esc(t.telegram)}</a>`).replace("{email}", `<a href="mailto:locallabs.io@gmail.com">locallabs.io@gmail.com</a>`)}</p></div>
      </div>
    </div>
  </section>
</main>
</body>
</html>
`;
}

for (const lang of LANGS) {
  const out = join(ROOT, lang.dir, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page(lang));
}
