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
    more: "The next steps, the model cards, the chat, privacy and the end, come next.",
  },
  ru: {
    eyebrow: "Сначала оно смотрит",
    title: "Сначала оно читает ваш компьютер.",
    body: "Видеокарту, её память и оперативную память — прямо на компьютере, ещё до загрузки. Ничего не отправляется.",
    reads: [["Видеокарта", "NVIDIA GeForce RTX 3050 Ti Laptop GPU"], ["Видеопамять", "4 ГБ"], ["Оперативная память", "16 ГБ"]],
    source: "Так предварительная версия прочитала наш тестовый ноутбук 21 октября 2026 года.",
    alt: "Первый экран localSpace 0.2.0-preview.1 на английском, раздел «Этот компьютер» обведён: NVIDIA GeForce RTX 3050 Ti Laptop GPU, 4 ГБ видеопамяти, 16 ГБ оперативной памяти. Ниже — модель, рекомендованная этому компьютеру: Qwen3.5 4B.",
    more: "Дальше — карточки моделей, чат, приватность и финал.",
  },
  uz: {
    eyebrow: "Avval qaraydi",
    title: "Avval u kompyuteringizni oʻqiydi.",
    body: "Videokarta, uning xotirasi va tizim xotirasi — hech narsa yuklab olinmasdan oldin, kompyuterning oʻzida oʻqiladi. Hech narsa yuborilmaydi.",
    reads: [["Videokarta", "NVIDIA GeForce RTX 3050 Ti Laptop GPU"], ["Videoxotira", "4 GB"], ["Tizim xotirasi", "16 GB"]],
    source: "Sinov versiyasi sinov noutbukimizni 2026-yil 21-oktabrda shunday oʻqidi.",
    alt: "localSpace 0.2.0-preview.1 ning ingliz tilidagi birinchi ekrani, «Bu kompyuter» qismi belgilangan: NVIDIA GeForce RTX 3050 Ti Laptop GPU, 4 GB videoxotira, 16 GB tizim xotirasi. Uning ostida shu kompyuterga tavsiya etilgan model: Qwen3.5 4B.",
    more: "Keyingi qadamlar — model kartalari, chat, maxfiylik va yakun — keyinroq.",
  },
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

function page(lang) {
  const t = STRINGS[lang.code];
  const s = STEP1[lang.code];
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
<meta name="theme-color" content="#faf9f8">
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

  <p class="wrap end-note">${esc(s.more)}</p>
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
