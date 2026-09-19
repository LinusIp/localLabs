# Decisions

Why the page is the way it is, so that a later change does not undo a choice
by accident. Newest first.

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
- **Screens are cropped to what matters and never shown larger than their own
  pixels**, so their words stay readable.
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
