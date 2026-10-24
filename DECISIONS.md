# Decisions

Why the page is the way it is, so that a later change does not undo a choice
by accident. Newest first.

## 2026-10-24: the scroll-story page, and the shared palette

- **The new page tells the product in scroll steps** (hero; it reads your
  computer; it picks the model; the card opens into the chat; privacy; the
  end), built at `/story/` beside the live page until it replaces it. The
  look is calm and light, with the real app screens as cards; a dark version
  is kept for a later dark mode.
- **The colours are the app's, palette (a), indigo and amber,** the same
  `--ls-*` names and values as the app's own set, in one block at the top of
  `story.css`. Buttons use `--ls-accent-fill` with `--ls-on-accent`; text and
  links use `--ls-accent`; `--ls-accent-strong` is only a fill shade (in the
  dark set it is too dark for text); amber is only for "Recommended".
- **The app screens inside the cards are still the 0.2.0 green** until a
  build with the new palette exists; they are retaken then, in one sitting.
- **Motion has no library:** `story.js` sets one number per section as it
  scrolls, and `story.css` turns it into the movement. With reduced motion
  or no scripts nothing is pinned and every step is shown finished.
- **The step with the chat answers one real picture in English, Russian and
  Uzbek, switchable,** because no language comes first. The answers are
  Qwen3.5 4B's, word for word, from one sitting.

## 2026-10-21: the examples retaken on Qwen3.5 4B

- **The demo, the speed and the three screens come from localSpace
  0.2.0-preview.1 (920b7123),** in one sitting on 21 October 2026, on one
  laptop: NVIDIA GeForce RTX 3050 Ti Laptop GPU (4 GB), 16 GB of memory,
  Silent mode, with the model placed the app's own way (most of it on the
  card). Qwen2.5, which 0.2 no longer offers, is gone from the page.
- **The demo's answer** is the one Qwen3.5 4B wrote, word for word, measured
  by `localspace measure --chat`: 121 tokens at 25.2 a second. The two chat
  answers in the third screen ran at 25.06 and 25.13 a second (the engine's
  own timing). Words a second still use the app's 0.75 words per token.
- **One chip, not three.** The processor-only run was stopped by the laptop's
  watch when free memory fell under 3 GB, so it has no figure; a speed is
  shown only once it has been measured.
- **The link-preview image** shows that one measured speed.

## 2026-10-21: the download section, in three languages

- **The waitlist is gone; the page offers the download.** Both Formspree forms
  and their script are removed. The header, the hero and the first way to run
  it point to the download section; companies write to the Telegram group or
  by email.
- **The Download buttons go through a counter,**
  `localspace.locallabs-io.workers.dev`
  ([LinusIp/localspace-downloads](https://github.com/LinusIp/localspace-downloads)),
  which adds 1 per day and file and redirects to the file on GitHub. It stores
  nothing about the visitor and skips link previews and crawlers. The page
  says so under the buttons and links the counter's code. No analytics.
- **The file facts are written into the page, not fetched:** name, size in
  MB and the full SHA-256, from the release's `SHA256SUMS.txt`, with the
  `Get-FileHash` line. They live in `release.json`; `node tools/pages.mjs`
  writes the three pages from it. Until a release is published, size and hash
  read "given on publish day" and the counter answers "not published yet".
- **The Smart App Control note is the one written for the download page,**
  word for word. The page never suggests turning Smart App Control off; the
  "More info, then Run anyway" line is for SmartScreen only.
- **English, Russian and Uzbek (Latin script),** at `/`, `/ru/` and `/uz/`,
  from one layout (`tools/pages.mjs`) and one file of strings
  (`tools/strings.mjs`). The demo and the screenshots stay as recorded, in
  English, and the Russian and Uzbek captions say so.
- **The Russian page uses the system's sans,** because Figtree has no Cyrillic
  letters: one font for the whole page rather than two in one line.
- **The one measured figure for 0.2 is stated as measured:** tokens per
  second, English answers, and the computer it ran on.

## 2026-09-19: the rebuild

- **Every speed on the page is our own measurement.** One laptop (Ryzen 7
  6800H, 16 GB, RTX 3050 Ti Laptop GPU with 4 GB, llama.cpp b10869 through
  Vulkan), measured on 18 and 19 September 2026: Qwen2.5 7B on the processor
  alone, 9.5 tokens a second; the same 7B with part of it on the 4 GB card,
  13.2; Qwen2.5 3B wholly on the card, 40.5. Words a second use the app's own
  0.75 words per token, so the page and the app agree. A server is added once
  we have measured one ourselves; published figures for hardware we have not
  run are not shown.
- **The demo streams from the first word.** The wait before the first word is
  not animated, and the caption says these are speeds once it is writing.
- **The demo's text is a real answer** that Qwen2.5 7B gave on that laptop,
  through the app, on 19 September 2026, to the question shown. It stops at the
  sign-off: the record of that answer breaks off one line later, so that line
  is not shown. The same text streams for every setup, so the only thing that
  changes is the speed.
- **Nothing is loaded from anyone else.** Figtree is served from this
  repository under the SIL Open Font License (`fonts/OFL-Figtree.txt`); no
  Google Fonts. JetBrains Mono is gone; figures use the system's monospace, as
  the app does. The one request to another party is the waitlist form's, to
  Formspree, when someone submits it, and the page says so beside the form.
- **Light only.** The app has no dark theme and the page matches the app. Dark
  mode comes back when the app has one.
- **Where the brief and the app differed, the app won.** The page uses the
  app's own colour tokens under the app's names, the shadow and radii of its
  first-run card, the avatars of its chat, and its own lockup image rather
  than a second logo made of the mark and typed text.
- **The three screens in "How it works" are the app as it was on 19 September
  2026**, on a laptop with a 4 GB RTX 3050 Ti and 16 GB, as the first screen
  itself says: that first screen, the list of models, and a conversation whose
  two answers are Qwen2.5 7B's own. Each is cropped to what matters, never cut
  or joined inside, and shown at the app's own size, so its words stay
  readable.
- **The contact address is locallabs.io@gmail.com**, written plainly in
  `index.html` (the company card and the footer) so it reads without scripts.
  `script.js` takes it from the page for the form's fallback, so a new address
  is one edit in one file.
- **Link previews point at https://linusip.github.io/localLabs/** (canonical,
  `og:url`, `og:image`) until a domain is live.
- **No licence line** while the source is not public.
- **The © line names localLabs**, the company; localSpace is what it makes.
- **The waitlist's "How would you run it?" wording changed on 2026-09-19.**
  Before: "On my own workstation", "A server for my team", an option about
  writing one's own add-on, "Evaluating for a regulated or air-gapped
  environment", "Just curious". After: "On my own computer", "On a server for
  my team or company", "At an organisation that cannot send data to the
  cloud", "Just curious". Answers from before that date carry the old wording.
- **"What it runs on" is not a section yet.** With one laptop measured it would
  repeat the demo. It returns when the testers' machines give it real rows.
