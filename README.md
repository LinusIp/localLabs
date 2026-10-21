# localSpace landing page

The page at https://linusip.github.io/localLabs/, served by GitHub Pages from
`main`: pushing to `main` publishes it.

Static and self-contained: the page in English (`index.html`), Russian
(`ru/`) and Uzbek (`uz/`), `style.css`, `script.js`, the Figtree font in
`fonts/`, and images. No framework. The page loads nothing from any other
server; its Download buttons go to the download counter
([LinusIp/localspace-downloads](https://github.com/LinusIp/localspace-downloads)),
which redirects to the file on GitHub.

The three pages are written by `node tools/pages.mjs` from one layout, the
strings in `tools/strings.mjs` and the release facts in `release.json`.
Edit those, run it, and commit the pages it writes.

To preview it, serve this folder over http rather than opening the file, since
browsers refuse the font from `file://`. For example, run
`python -m http.server 8000` here and open http://localhost:8000/.

Why things are the way they are: [DECISIONS.md](DECISIONS.md).
