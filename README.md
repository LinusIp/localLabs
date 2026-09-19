# localSpace landing page

The page at https://linusip.github.io/localLabs/, served by GitHub Pages from
`main`: pushing to `main` publishes it.

Static and self-contained: `index.html`, `style.css`, `script.js`, the Figtree
font in `fonts/`, and images. No build step and no framework. The page asks
nothing of any other server, except the waitlist form, which posts to
Formspree when someone submits it.

To preview it, serve this folder over http rather than opening the file, since
browsers refuse the font from `file://`. For example, run
`python -m http.server 8000` here and open http://localhost:8000/. Submitting
the form in a preview adds a real entry to the list.

Why things are the way they are: [DECISIONS.md](DECISIONS.md).
