/* =====================================================================
   ASWIN PORTFOLIO - script.js
   Vanilla JavaScript. No frameworks, no build step.

   Contents:
   1. Configuration (Formspree endpoint)
   2. Project data (edit or replace projects here)
   3. Helpers
   4. Theme toggle (saved in localStorage)
   5. Preloader (shown once per browser session)
   6. Header scroll state and mobile menu
   7. Active section highlighting in the navigation
   8. Scroll reveal and skill ring animation
   9. Subtle hero parallax
   10. Custom cursor (desktop only)
   11. Works gallery: filters, horizontal scrolling, opening projects
   12. Project presentation dialog (Escape closes it)
   13. Contact form validation and Formspree submission
   14. Footer letter animation and copyright year
   ===================================================================== */

(function () {
  'use strict';

  /* ---------- 1. CONFIGURATION ---------- */

  const CONFIG = {
    // Create a free form at https://formspree.io, then paste its endpoint here.
    // It looks like: https://formspree.io/f/abcd1234
    formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID'
  };

  /* ---------- 2. PROJECT DATA ----------
     Each project feeds the gallery card and the full-screen presentation.
     To use a real image, add an `image` path, for example:
       image: 'assets/projects/northwind.jpg'
     When `image` is empty, a generated placeholder artwork is shown.
  */

  const PROJECTS = [
    {
      id: 'northwind',
      title: 'Northwind Coffee Identity',
      client: 'Northwind Coffee',
      category: 'Brand Identity',
      year: 2025,
      image: '',
      art: { bg: '#E9DFCD', fg: '#15130F', accent: '#8A6A4F', shape: 'circle', label: 'Northwind' },
      brief: 'Northwind is a neighbourhood roaster opening its second location. The brand needed to feel crafted and warm without slipping into rustic clichés, and to work on cups, bags and signage.',
      inspiration: 'Early twentieth-century coffee house posters and the quiet geometry of Scandinavian packaging. We wanted the logo to feel like a stamp pressed into paper.',
      process: [
        'Explored forty wordmark sketches and narrowed them to three directions with the founders.',
        'Developed a circular mark based on roasting drum proportions, then tested it at cup and stamp sizes.',
        'Built a colour and type system with guidelines for signage, menus and seasonal campaigns.'
      ],
      tools: 'Illustrator, Photoshop, InDesign',
      outcome: 'A flexible identity that holds up on a 40 mm bag label and a six-metre shop sign alike, now used across all retail and digital touchpoints.'
    },
    {
      id: 'halcyon',
      title: 'Halcyon Festival Poster',
      client: 'Halcyon Festival',
      category: 'Poster and Ads',
      year: 2025,
      image: '',
      art: { bg: '#15130F', fg: '#F1ECE2', accent: '#C9B08E', shape: 'stripe', label: 'Halcyon' },
      brief: 'A three-day music festival needed a main poster that could be read from a moving car and still reward someone standing right in front of it.',
      inspiration: 'Light through blinds in late afternoon and the bold rhythm of mid-century record sleeves.',
      process: [
        'Mapped the lineup into a hierarchy so the headliners read first without shouting.',
        'Built the key visual from repeated vertical bands that suggest sunlight moving across a wall.',
        'Adapted the system into transit shelters, digital screens and a short motion loop.'
      ],
      tools: 'Illustrator, After Effects, Photoshop',
      outcome: 'The poster became the most shared image of the season, and the same system carried the campaign across six cities.'
    },
    {
      id: 'marrow',
      title: 'Marrow Skincare Packaging',
      client: 'Marrow Skincare',
      category: 'Packaging',
      year: 2024,
      image: '',
      art: { bg: '#D8CBB4', fg: '#2A2420', accent: '#F4EEE2', shape: 'arch', label: 'Marrow' },
      brief: 'A new skincare line needed bottles, boxes and inserts that feel calm and premium on a shelf, with clear ingredient information.',
      inspiration: 'Apothecary labels, architectural arches and the soft matte finish of stone.',
      process: [
        'Created a shape language around a single arch, used differently on each product.',
        'Tested ink and paper combinations with the printer to get a consistent matte tone.',
        'Prepared dielines and print-ready files for six SKUs and a gift set.'
      ],
      tools: 'Illustrator, InDesign, Photoshop',
      outcome: 'Packaging that sold through its first print run within eight weeks, with a clean layout that met regulatory label requirements.'
    },
    {
      id: 'tidewater',
      title: 'Tidewater Annual Report',
      client: 'Tidewater Architecture',
      category: 'Editorial and Print',
      year: 2024,
      image: '',
      art: { bg: '#F3EDE2', fg: '#1E1A16', accent: '#A38F79', shape: 'grid', label: 'Tidewater' },
      brief: 'A 64-page annual report for an architecture firm. It had to present financials and project data clearly while showing the firm\'s work at its best.',
      inspiration: 'Architectural drawings, grid systems and the generous margins of well-edited monographs.',
      process: [
        'Built a twelve-column grid that could hold dense financial tables and full-bleed project photography.',
        'Designed a data style for charts that stayed legible in both colour and black and white.',
        'Set the document in InDesign with linked data and a documented template for next year.'
      ],
      tools: 'InDesign, Illustrator, Photoshop',
      outcome: 'A report that the firm now uses as a sales document, with a reusable template that cut the following year\'s layout time in half.'
    },
    {
      id: 'ember',
      title: 'Ember Kitchen Social Series',
      client: 'Ember Kitchen',
      category: 'Social Media',
      year: 2024,
      image: '',
      art: { bg: '#A38F79', fg: '#F6F1E7', accent: '#5C4A3B', shape: 'circle', label: 'Ember' },
      brief: 'A restaurant wanted a social presence that matched its warm dining room and changed with the menu each season, without a new design every week.',
      inspiration: 'Coals, copper pans and the soft circles of plates seen from above.',
      process: [
        'Defined a circular frame that could hold a dish photo, a price or a short line of copy.',
        'Built a Figma library of feed grids, story sets and highlight covers.',
        'Created a monthly template workflow so the team could publish without a designer.'
      ],
      tools: 'Figma, Photoshop, Canva',
      outcome: 'Follower growth of around 40 percent in six months, with the team publishing consistently on their own.'
    },
    {
      id: 'lumen',
      title: 'Lumen Type Specimen',
      client: 'Lumen Type Studio',
      category: 'Editorial and Print',
      year: 2023,
      image: '',
      art: { bg: '#EDE5D6', fg: '#15130F', accent: '#B9A58A', shape: 'stripe', label: 'Lumen' },
      brief: 'A type foundry needed a specimen booklet that showed its new serif family in use, not just in alphabets.',
      inspiration: 'Old printers\' specimen sheets, reimagined with contemporary layouts.',
      process: [
        'Wrote sample texts in four languages to show how the family behaves at different sizes.',
        'Set the booklet with varied columns to test the typeface in real reading conditions.',
        'Produced a digital version with interactive weight and size controls.'
      ],
      tools: 'InDesign, Illustrator',
      outcome: 'The specimen is now sent with every licence and is cited as a reference in several typography courses.'
    },
    {
      id: 'solace',
      title: 'Solace Tea Labels',
      client: 'Solace Tea Co.',
      category: 'Packaging',
      year: 2023,
      image: '',
      art: { bg: '#5C4A3B', fg: '#F1E8D8', accent: '#C7B293', shape: 'arch', label: 'Solace' },
      brief: 'A small tea company needed a label system that could be printed in short runs, with a different colour for each blend.',
      inspiration: 'Tea leaves drying on a tray and the quiet colours of an evening garden.',
      process: [
        'Designed a modular label with a fixed header and a variable colour field.',
        'Limited the palette to four inks to keep short-run printing affordable.',
        'Prepared a simple template so new blends could be added in under an hour.'
      ],
      tools: 'Illustrator, Photoshop',
      outcome: 'A label system that supported twelve blends in its first year with no change to the core layout.'
    },
    {
      id: 'quiet-hours',
      title: 'Quiet Hours Album Campaign',
      client: 'Quiet Hours Records',
      category: 'Poster and Ads',
      year: 2023,
      image: '',
      art: { bg: '#201C18', fg: '#D9CBB2', accent: '#6F5D4C', shape: 'grid', label: 'Quiet' },
      brief: 'An independent label needed a campaign for a late-night ambient album, with artwork that worked as a poster, a streaming banner and a vinyl sleeve.',
      inspiration: 'Night city windows and the slow fade of a dimmed room.',
      process: [
        'Created a square grid of lit and unlit cells that could be read as windows or as a waveform.',
        'Adapted the artwork to portrait, square and banner formats.',
        'Delivered a sleeve file with the correct bleed and spine for vinyl production.'
      ],
      tools: 'Photoshop, Illustrator, InDesign',
      outcome: 'The campaign was used across print and streaming platforms, and the sleeve was shortlisted in a regional design award.'
    },
    {
      id: 'orbit',
      title: 'Orbit Finance Brand Refresh',
      client: 'Orbit Finance',
      category: 'Brand Identity',
      year: 2025,
      image: '',
      art: { bg: '#E4D8C2', fg: '#2B2521', accent: '#9B8267', shape: 'arch', label: 'Orbit' },
      brief: 'A fintech company wanted to appear more human and approachable without losing the trust that its customers depend on.',
      inspiration: 'Soft daylight, rounded architecture and the reassurance of well-kept paperwork.',
      process: [
        'Audited twenty competitor identities to find a space that felt warmer but still serious.',
        'Refined the logo into a simpler, more open form that reads well at very small sizes.',
        'Documented motion and tone guidelines for app onboarding and email.'
      ],
      tools: 'Figma, Illustrator',
      outcome: 'A refreshed identity launched across the app and website, with positive feedback in early customer research.'
    },
    {
      id: 'dream-ledger',
      title: 'Dream Ledger Key Visual',
      client: 'Dream Ledger',
      category: 'Photo Manipulation',
      year: 2024,
      image: '',
      art: { bg: '#CFC6B8', fg: '#151310', accent: '#7A6755', shape: 'circle', label: 'Dream' },
      brief: 'A journaling app wanted a key visual that suggested memory and imagination. It needed to work as a hero image on the homepage and as a print poster.',
      inspiration: 'Surrealist collage, old atlas maps and the feeling of waking up mid-thought.',
      process: [
        'Shot textured paper and architectural details as raw material for the composite.',
        'Built the final scene in layers, with light and shadow matched across each element.',
        'Retouched colour for screen and print, with separate versions for dark and light backgrounds.'
      ],
      tools: 'Photoshop, Blender, Illustrator',
      outcome: 'The key visual is the app\'s main marketing image, and a limited print run sold out within a month.'
    }
  ];

  /* ---------- 3. HELPERS ---------- */

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const html = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* Builds a placeholder artwork as SVG. Each project gets a distinct composition
     from its own colours and shape, so the gallery looks designed before real images are added. */
  function artHTML(project, ariaHidden) {
    if (project.image) {
      return `<img src="${project.image}" alt="${ariaHidden ? '' : project.title}" loading="lazy" ${ariaHidden ? 'aria-hidden="true"' : ''}>`;
    }

    const { bg, fg, accent, shape, label } = project.art;
    let body = '';

    if (shape === 'circle') {
      body = `
        <circle cx="400" cy="520" r="300" fill="${accent}"/>
        <rect x="0" y="720" width="800" height="280" fill="${fg}" opacity="0.12"/>
        <circle cx="560" cy="330" r="60" fill="${fg}"/>`;
    } else if (shape === 'arch') {
      body = `
        <path d="M200 1000V520a200 200 0 0 1 400 0v480z" fill="${accent}"/>
        <circle cx="400" cy="420" r="58" fill="${fg}" opacity="0.9"/>`;
    } else if (shape === 'stripe') {
      for (let i = 0; i < 7; i++) {
        body += `<rect x="${-200 + i * 150}" y="-100" width="70" height="1200" fill="${i % 2 ? accent : fg}" transform="rotate(18 400 500)"/>`;
      }
    } else if (shape === 'grid') {
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 4; c++) {
          const on = (r * 3 + c) % 4 === 0 || (r + c) % 5 === 0;
          body += `<rect x="${60 + c * 180}" y="${70 + r * 180}" width="150" height="150" fill="${on ? accent : fg}" opacity="${on ? 1 : 0.12}"/>`;
        }
      }
    }

    return `
      <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" ${ariaHidden ? 'aria-hidden="true" focusable="false"' : `role="img" aria-label="${project.title} artwork"`}>
        <rect width="800" height="1000" fill="${bg}"/>
        ${body}
        <text x="60" y="935" font-family="Playfair Display, Georgia, serif" font-size="72" fill="${fg}">${label}</text>
      </svg>`;
  }

  function cardHTML(project) {
    return `
      <button type="button" class="work-card" data-id="${project.id}" data-category="${project.category}">
        <span class="work-art">${artHTML(project, true)}</span>
        <span class="work-meta">
          <span class="work-cat">${project.category}, ${project.year}</span>
          <span class="work-title">${project.title}</span>
        </span>
      </button>`;
  }

  function projectHTML(project) {
    return `
      <article class="project">
        <h2 id="project-title" class="project-title">${project.title}</h2>

        <div class="project-hero">${artHTML(project, false)}</div>

        <div class="project-grid">
          <section>
            <h3>Creative brief</h3>
            <p>${project.brief}</p>
          </section>
          <section>
            <h3>Design inspiration</h3>
            <p>${project.inspiration}</p>
          </section>
          <section>
            <h3>Design process</h3>
            <ol>${project.process.map((step) => `<li>${step}</li>`).join('')}</ol>
          </section>
          <section>
            <h3>Tools used</h3>
            <p>${project.tools}</p>
            <p style="margin-top:20px;">Client: ${project.client}</p>
          </section>
        </div>

        <section class="project-final">
          <h3>Final design</h3>
          <p>${project.outcome}</p>
          <div class="project-hero">${artHTML({ ...project, art: { ...project.art, bg: project.art.fg, fg: project.art.bg } }, false)}</div>
        </section>
      </article>`;
  }

  /* ---------- 4. THEME TOGGLE ---------- */

  function initTheme() {
    const button = $('#theme-toggle');
    if (!button) return;

    const setTheme = (theme, save) => {
      html.dataset.theme = theme;
      const isDark = theme === 'dark';
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('aria-pressed', String(isDark));
      if (save) {
        try {
          localStorage.setItem('aswinTheme', theme);
        } catch (e) { /* storage may be blocked; theme still applies for this visit */ }
      }
    };

    // Sync button state with the theme applied by the inline script in <head>
    setTheme(html.dataset.theme === 'dark' ? 'dark' : 'light', false);

    button.addEventListener('click', () => {
      setTheme(html.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
  }

  /* ---------- 5. PRELOADER ---------- */

  function initPreloader() {
    const preloader = $('#preloader');

    // The head script only sets is-loading on a first visit without reduced motion
    if (!html.classList.contains('is-loading')) {
      if (preloader) preloader.remove();
      return;
    }

    try {
      sessionStorage.setItem('aswinIntro', '1');
    } catch (e) { /* ignore */ }

    const minimumTime = new Promise((resolve) => setTimeout(resolve, 1400));
    const pageLoaded = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
    const safetyTimeout = new Promise((resolve) => setTimeout(resolve, 3500));

    // Wait for the minimum animation time and page load, but never longer than 3.5 seconds
    Promise.race([Promise.all([minimumTime, pageLoaded]), safetyTimeout]).then(() => {
      preloader.classList.add('is-done');
      setTimeout(() => {
        html.classList.remove('is-loading');
        preloader.remove();
      }, 800);
    });
  }

  /* ---------- 6. HEADER AND MOBILE MENU ---------- */

  function initHeader() {
    const header = $('#site-header');
    const toggle = $('#menu-toggle');
    const nav = $('#site-nav');

    // Add a background once the page has been scrolled
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!toggle || !nav) return;

    const setMenu = (open) => {
      header.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Open menu';
      document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => {
      setMenu(!header.classList.contains('menu-open'));
    });

    // Close the menu when a link is chosen
    $$('a', nav).forEach((link) => link.addEventListener('click', () => setMenu(false)));

    // Escape closes the menu
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && header.classList.contains('menu-open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Reset if the viewport grows to desktop size while the menu is open
    window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- 7. ACTIVE SECTION HIGHLIGHT ---------- */

  function initActiveNav() {
    const links = $$('.site-nav a');
    const sectionIds = ['home', 'about', 'services', 'works', 'experience', 'contact'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (!('IntersectionObserver' in window) || !sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.removeAttribute('aria-current'));
        const active = $(`.site-nav a[href="#${entry.target.id}"]`);
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => observer.observe(section));
  }

  /* ---------- 8. SCROLL REVEAL ---------- */

  function initReveal() {
    const items = $$('[data-reveal]');

    // Small stagger so grouped items arrive one after another
    items.forEach((item, index) => {
      item.style.setProperty('--d', `${(index % 4) * 90}ms`);
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach((item) => observer.observe(item));
  }

  /* ---------- 9. HERO PARALLAX ---------- */

  function initParallax() {
    const media = $('[data-parallax]');
    if (!media || reduceMotion || window.innerWidth < 901) return;

    let ticking = false;

    const update = () => {
      // Moves the portrait slightly slower than the page, up to the end of the first screen
      const shift = Math.min(window.scrollY, window.innerHeight) * 0.14;
      media.style.transform = `translate3d(0, ${shift}px, 0)`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- 10. CUSTOM CURSOR (desktop) ---------- */

  function initCursor() {
    if (!finePointer || reduceMotion) return;

    const dot = $('.cursor');
    if (!dot) return;

    html.classList.add('has-cursor');

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.opacity = '1';
    }, { passive: true });

    // Smoothly follow the pointer
    const loop = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      window.requestAnimationFrame(loop);
    };
    loop();

    // Grow over interactive elements
    const interactive = 'a, button, .work-card, .filter, input, textarea';
    document.addEventListener('pointerover', (event) => {
      if (event.target.closest(interactive)) dot.classList.add('is-hover');
    });
    document.addEventListener('pointerout', (event) => {
      if (event.target.closest(interactive)) dot.classList.remove('is-hover');
    });
  }

  /* ---------- 11. WORKS GALLERY ---------- */

  function initWorks() {
    const track = $('#works-track');
    const filters = $('#filters');
    const prev = $('#gallery-prev');
    const next = $('#gallery-next');
    if (!track || !filters) return;

    // Build cards and filter buttons from the project data
    track.innerHTML = PROJECTS.map(cardHTML).join('');

    const categories = ['All', ...new Set(PROJECTS.map((p) => p.category))];
    filters.innerHTML = categories
      .map((category) => `<button type="button" class="filter" aria-pressed="${category === 'All'}" data-filter="${category}">${category}</button>`)
      .join('');

    // Filter projects by category
    filters.addEventListener('click', (event) => {
      const button = event.target.closest('.filter');
      if (!button) return;

      const selected = button.dataset.filter;
      $$('.filter', filters).forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      $$('.work-card', track).forEach((card) => {
        card.hidden = !(selected === 'All' || card.dataset.category === selected);
      });
      track.scrollTo({ left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    // Open a project when its card is chosen
    track.addEventListener('click', (event) => {
      const card = event.target.closest('.work-card');
      if (card) openProject(card.dataset.id, card);
    });

    // Scroll by one card width using the arrow buttons
    const scrollByCard = (direction) => {
      const visible = $('.work-card:not([hidden])', track);
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const distance = visible ? visible.getBoundingClientRect().width + gap : 400;
      track.scrollBy({ left: direction * distance, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    if (prev) prev.addEventListener('click', () => scrollByCard(-1));
    if (next) next.addEventListener('click', () => scrollByCard(1));

    // Arrow keys move through the gallery when it has focus
    track.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollByCard(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollByCard(-1);
      }
    });
  }

  /* ---------- 12. PROJECT PRESENTATION DIALOG ---------- */

  let dialog = null;
  let lastTrigger = null;

  function openProject(id, trigger) {
    const project = PROJECTS.find((item) => item.id === id);
    if (!project || !dialog) return;

    lastTrigger = trigger;
    $('#project-cat').textContent = `${project.category}, ${project.year}`;
    $('#project-body').innerHTML = projectHTML(project);

    dialog.showModal();
    dialog.scrollTop = 0;
    $('#project-close').focus();
  }

  // Plays the closing animation, then closes the dialog
  function closeProject() {
    if (!dialog || !dialog.open) return;

    if (reduceMotion) {
      dialog.close();
      return;
    }

    dialog.classList.add('is-closing');
    dialog.addEventListener('animationend', () => dialog.close(), { once: true });
  }

  function initDialog() {
    dialog = $('#project-dialog');
    if (!dialog) return;

    $('#project-close').addEventListener('click', closeProject);

    // Escape: intercept the native close so the exit animation can play
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeProject();
    });

    // Return focus to the card that opened the project
    dialog.addEventListener('close', () => {
      dialog.classList.remove('is-closing');
      if (lastTrigger) lastTrigger.focus();
    });
  }

  /* ---------- 13. CONTACT FORM ---------- */

  const validators = {
    name: (value) => (value.trim().length >= 2 ? '' : 'Please enter your name.'),
    email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? '' : 'Enter an email address such as name@example.com.'),
    subject: (value) => (value.trim().length >= 3 ? '' : 'Add a short subject, at least 3 characters.'),
    message: (value) => (value.trim().length >= 20 ? '' : 'Tell me a little more, at least 20 characters.')
  };

  function initContact() {
    const form = $('#contact-form');
    const status = $('#form-status');
    if (!form) return;

    const setStatus = (message, type) => {
      status.textContent = message;
      status.className = `form-status ${type || ''}`.trim();
    };

    // Check one field, show or clear its message, and return whether it passed
    const validateField = (field) => {
      const validator = validators[field.name];
      if (!validator) return true;

      const message = validator(field.value);
      const errorEl = document.getElementById(`${field.name}-error`);
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (errorEl) errorEl.textContent = message;
      return !message;
    };

    // Validate a field when the visitor leaves it, once it has a value
    form.addEventListener('focusout', (event) => {
      const field = event.target;
      if (field.value.trim() !== '') validateField(field);
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      setStatus('', '');

      const fields = Array.from(form.elements).filter((el) => validators[el.name]);
      let firstInvalid = null;

      fields.forEach((field) => {
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        setStatus('Please fix the highlighted fields.', 'is-error');
        return;
      }

      if (CONFIG.formspreeEndpoint.includes('YOUR_FORM_ID')) {
        setStatus('The form is not connected yet. Add your Formspree form ID in script.js.', 'is-error');
        return;
      }

      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = 'Sending...';

      try {
        const response = await fetch(CONFIG.formspreeEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form)
        });

        if (response.ok) {
          form.reset();
          fields.forEach((field) => field.setAttribute('aria-invalid', 'false'));
          setStatus('Thank you. Your message is on its way, and I will reply within two working days.', 'is-success');
        } else {
          const data = await response.json().catch(() => ({}));
          const message = data.errors
            ? data.errors.map((error) => error.message).join(' ')
            : 'Something went wrong. Please try again, or email me directly.';
          setStatus(message, 'is-error');
        }
      } catch (error) {
        setStatus('Network error. Check your connection and try again.', 'is-error');
      } finally {
        button.disabled = false;
        button.textContent = 'Send message';
      }
    });
  }

  /* ---------- 14. FOOTER AND YEAR ---------- */

  function initFooter() {
    const title = $('#footer-title');
    if (title) {
      // Split the title into words and letters so each letter can move on hover
      const text = title.getAttribute('aria-label') || title.textContent.trim();
      let index = 0;

      title.innerHTML = text
        .split(' ')
        .map((word) => {
          const letters = Array.from(word)
            .map((letter) => `<span style="--i:${index++}" aria-hidden="true">${letter}</span>`)
            .join('');
          return `<span class="word" aria-hidden="true">${letters}</span>`;
        })
        .join(' ');
    }

    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- START ---------- */

  function init() {
    initTheme();
    initPreloader();
    initHeader();
    initActiveNav();
    initReveal();
    initParallax();
    initCursor();
    initWorks();
    initDialog();
    initContact();
    initFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();