# Micelle — English / فارسی

A 20-slide scientific lesson based on **Polymeric micelle-hydrogel composites design for biomedical applications**, Li et al., *Chinese Chemical Letters* 36 (2025), 110072.

Open `index.html` in a modern browser, or run `npm start` and visit **http://localhost:3000**. No npm packages or external services are needed.

The language switch selects English or Persian and preserves the current slide. Persian is the default; the selection is remembered. You can also use `?lang=fa` or `?lang=en` in the URL. Slides, diagram labels, teaching notes, quizzes, the release plot, and the research-ideas panel are localized. Actual English paper titles and DOIs are preserved. Persian uses bundled Noto Sans Arabic fonts and right-to-left layout. Both PDFs remain landscape with 20 pages.

The presentation includes original labeled SVG diagrams, an attributed review figure, source links, an illustrative interactive release model, and three knowledge checks. Slide 19 introduces three research questions; the **Research ideas / ایده‌های پژوهشی** button opens detailed hypotheses, comparisons, measurements, decision criteria, and supporting references. These are proposed extensions, not reported results or confirmed novelty. The podcast and all associated files have been removed.

Downloads:

- `exports/micelle-hydrogel-lesson.pdf` — English slides.
- `exports/micelle-hydrogel-lesson-fa.pdf` — اسلایدهای فارسی.
- `exports/teaching-notes.md` / `exports/teaching-notes-fa.md` — teaching notes / یادداشت‌های آموزشی.
- `exports/research-ideas-en.md` / `exports/research-ideas-fa.md` — research proposals / پیشنهادهای پژوهشی.

Use arrow keys, Page Up/Down, or the navigation buttons; Home/End goes to first/last slide. In Persian, the left arrow advances and the right arrow goes back. N opens notes; O opens the overview; F toggles fullscreen; P prints. Swipe direction follows the selected language.

Rebuild: `npm run export`. Verify: `npm test`. These commands use installed Google Chrome (`CHROME_PATH` can override `/usr/bin/google-chrome`) and Node's built-in WebSocket support. The final website and PDFs are ready to use without rebuilding.

The supplied PDF is the main teaching source. Primary studies were checked to verify examples and research directions. Slide 15 contains cropped review Figure 7 (page 6), attributed there to Wang et al., © 2020 ACS. The original study's 2025 image correction is linked. All other diagrams are original teaching schematics; the release model contains no experimental data. Cell and animal findings are identified as preclinical.

Fonts use the SIL Open Font License; copies are in `assets/Lato-LICENSE.txt` and `assets/Noto-LICENSE.txt`.
