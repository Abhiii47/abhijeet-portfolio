/**
 * The Engineering Times — Abhijeet Kadu
 * main.js — GSAP 3 + ScrollTrigger + Lenis + All Animations
 *
 * Load sequence (GSAP timeline, all times from page load):
 *   t=0.1s  Masthead name clip-path reveal, 0.85s
 *   t=0.85s Tagline bar fade-up, 0.5s
 *   t=0.95s Subtitle bar fade-up, 0.5s
 *   t=1.15s Badge fade-up, 0.4s
 *   t=1.35s Red rule scaleX grow, 0.7s
 *   t=1.5s  Dateline typewriter begins (JS interval)
 *
 * Scroll animations (GSAP ScrollTrigger, once: true):
 *   Pull quote: word-by-word stagger reveal
 *   Stats: count-up animation on enter
 *   Project cards: asymmetric directional stagger
 *   Stack rows: alternating left/right slide-in
 *
 * Hover (GSAP):
 *   Project cards: y -4px, 0.3s, power2.out
 */

(function () {
  'use strict';

  // Set theme immediately to prevent Flash of Unstyled Content (FOUC)
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  /* ──────────────────────────────────────────────────────
     GUARDS — reduced motion & GSAP availability
  ────────────────────────────────────────────────────── */
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const gsapReady = typeof gsap !== 'undefined';
  const stReady   = typeof ScrollTrigger !== 'undefined';
  const lenisReady = typeof Lenis !== 'undefined';

  /* ──────────────────────────────────────────────────────
     INIT — wait for DOM
  ────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {

    // Top bar date (always runs — no animation)
    setTopBarDate();

    // RAG Spec Dialog
    initRagDialog();

    // Copy Email Action
    initEmailCopy();

    // Night Edition Theme Toggle click listener
    initThemeToggleListener();

    if (prefersReduced) {
      revealAllInstant();
      setDatelineInstant();
      initStatAnimations(); // still animate numbers, just no transforms
      return;
    }

    if (!gsapReady) {
      revealAllInstant();
      setDatelineInstant();
      return;
    }

    // Register ScrollTrigger
    if (stReady) gsap.registerPlugin(ScrollTrigger);

    // Lenis smooth scroll
    if (lenisReady) initLenis();

    // Run all animation & interaction modules
    initMastheadTimeline();
    initNavIndicator();
    initPullQuoteReveal();
    initStatAnimations();
    initProjectAnimations();
    initStackAnimations();

    // High Impact Interactive Modules
    initAtsDemo();
    initRagBenchmark();
    initTechFiltering();
    initCommandPalette();
    initTickerClickHandlers();
    initQuoteRotator();

    // Dateline typewriter at t=0.8s
    setTimeout(initTypewriter, 800);
  });

  /* ──────────────────────────────────────────────────────
     LENIS SMOOTH SCROLL
  ────────────────────────────────────────────────────── */
  function initLenis() {
    const lenis = new Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    // Connect Lenis to GSAP ticker for ScrollTrigger sync
    if (stReady) {
      lenis.on('scroll', ScrollTrigger.update);
    }
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* ──────────────────────────────────────────────────────
     TOP BAR DATE
  ────────────────────────────────────────────────────── */
  function setTopBarDate() {
    const el = document.getElementById('top-bar-date');
    if (!el) return;
    const d = new Date();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July',
                    'August','September','October','November','December'];
    el.textContent = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  /* ──────────────────────────────────────────────────────
     MASTHEAD GSAP TIMELINE
     Sequence: name → tagline → subtitle → badge → red-rule
  ────────────────────────────────────────────────────── */
  function initMastheadTimeline() {
    const name     = document.getElementById('mast-pub-name');
    const tagline  = document.getElementById('mast-tagline');
    const subtitle = document.getElementById('mast-subtitle');
    const badge    = document.getElementById('mast-badge');
    const redRule  = document.getElementById('dr-red');

    if (!name) return;

    // Set initial states
    gsap.set(name, { clipPath: 'inset(0 0 100% 0)' });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // t=0.1s — name clip-path reveal (top-to-bottom wipe), 0.85s
    tl.to(name, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.85,
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)'
    }, 0.1);

    // t=0.85s — tagline fade-up, 0.5s
    if (tagline) {
      tl.to(tagline, {
        opacity: 1,
        y: 0,
        duration: 0.5
      }, 0.85);
    }

    // t=0.95s — subtitle fade-up, 0.5s
    if (subtitle) {
      tl.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.5
      }, 0.95);
    }

    // t=1.15s — badge fade-up, 0.4s
    if (badge) {
      tl.to(badge, {
        opacity: 1,
        y: 0,
        duration: 0.4
      }, 1.15);
    }

    // t=1.35s — red rule scaleX grow, 0.7s
    if (redRule) {
      tl.to(redRule, {
        scaleX: 1,
        duration: 0.7,
        ease: 'power2.inOut'
      }, 1.35);
    }
  }

  /* ──────────────────────────────────────────────────────
     DATELINE TYPEWRITER
     Starts at t=1.5s via setTimeout in init
  ────────────────────────────────────────────────────── */
  function initTypewriter() {
    const el = document.getElementById('dateline');
    if (!el) return;

    const d = new Date();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July',
                    'August','September','October','November','December'];
    const text = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} — Mumbai, IN`;

    // Build blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';
    cursor.setAttribute('aria-hidden', 'true');

    el.textContent = '';
    el.appendChild(cursor);

    let i = 0;
    function typeNext() {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
        // random interval between 15–30ms
        setTimeout(typeNext, 15 + Math.floor(Math.random() * 16));
      } else {
        // fade out cursor after 1.5 seconds
        setTimeout(() => {
          gsap.to(cursor, { opacity: 0, duration: 0.5, onComplete: () => cursor.remove() });
        }, 1500);
      }
    }
    typeNext();
  }

  function setDatelineInstant() {
    const el = document.getElementById('dateline');
    if (!el) return;
    const d = new Date();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July',
                    'August','September','October','November','December'];
    el.textContent = `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} — Mumbai, IN`;
  }

  /* ──────────────────────────────────────────────────────
     NAV INDICATOR — GSAP sliding red underline
  ────────────────────────────────────────────────────── */
  function initNavIndicator() {
    const wrap      = document.getElementById('nav-links-wrap');
    const indicator = document.getElementById('nav-indicator');
    const links     = document.querySelectorAll('.nav-link');
    if (!wrap || !indicator || !links.length) return;

    // Set initial width to 0
    gsap.set(indicator, { width: 0, left: 0, opacity: 0 });

    function moveIndicator(link) {
      const wrapRect = wrap.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      gsap.to(indicator, {
        left:    linkRect.left - wrapRect.left,
        width:   linkRect.width,
        opacity: 1,
        duration: 0.32,
        ease: 'power2.out'
      });
      links.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
    }

    // Click behaviour
    links.forEach(link => {
      link.addEventListener('click', () => moveIndicator(link));
    });

    // Initial position on first profile link after font load
    setTimeout(() => {
      const firstLink = document.querySelector('.nav-link[data-section="profile"]');
      if (firstLink) moveIndicator(firstLink);
    }, 200);

    // Scroll-driven section detection
    if (!stReady) return;

    const sections = ['profile', 'projects', 'stack', 'contact'];
    sections.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => {
          const link = document.querySelector(`.nav-link[data-section="${id}"]`);
          if (link) moveIndicator(link);
        },
        onEnterBack: () => {
          const link = document.querySelector(`.nav-link[data-section="${id}"]`);
          if (link) moveIndicator(link);
        }
      });
    });
  }

  /* ──────────────────────────────────────────────────────
     PULL QUOTE — word-by-word stagger reveal
  ────────────────────────────────────────────────────── */
  function initPullQuoteReveal() {
    const quoteP = document.getElementById('pull-quote-text');
    if (!quoteP) return;

    // Split into word spans
    const raw = quoteP.textContent;
    const words = raw.split(' ');
    quoteP.innerHTML = words
      .map(w => `<span class="word">${w}</span>`)
      .join(' ');

    // Initial state
    gsap.set('.pull-quote .word', { opacity: 0, y: 8 });

    if (!stReady) return;

    gsap.to('.pull-quote .word', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.06,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#pull-quote',
        start: 'top 75%',
        once: true
      }
    });
  }

  /* ──────────────────────────────────────────────────────
     STAT COUNT ANIMATIONS
     <3s counts down from 10s
     99.9% counts up from 0
     DP-600 types in character by character
  ────────────────────────────────────────────────────── */
  function initStatAnimations() {
    const latencyEl = document.getElementById('stat-latency');
    const uptimeEl  = document.getElementById('stat-uptime');
    const certEl    = document.getElementById('stat-cert');

    if (!latencyEl && !uptimeEl && !certEl) return;

    let started = false;

    function runCountAnimations() {
      if (started) return;
      started = true;

      // 1. Countdown: 10.0s → <3s
      if (latencyEl) {
        latencyEl.textContent = '10.0s';
        const DURATION = 1000;
        const START_VAL = 10.0;
        const END_VAL   = 2.8;
        const startTime = performance.now();

        function countDown(now) {
          const elapsed  = now - startTime;
          const progress = Math.min(elapsed / DURATION, 1);
          // easeOutQuart
          const eased    = 1 - Math.pow(1 - progress, 4);
          const val      = START_VAL - (START_VAL - END_VAL) * eased;

          if (progress >= 1) {
            latencyEl.textContent = '<3s';
          } else {
            latencyEl.textContent = val.toFixed(1) + 's';
            requestAnimationFrame(countDown);
          }
        }
        requestAnimationFrame(countDown);
      }

      // 2. Count-up: 0.0% → 99.9%
      if (uptimeEl) {
        uptimeEl.textContent = '0.0%';
        const DURATION = 1000;
        const startTime = performance.now();

        function countUp(now) {
          const elapsed  = now - startTime;
          const progress = Math.min(elapsed / DURATION, 1);
          const eased    = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          const val      = 99.9 * eased;

          if (progress >= 1) {
            uptimeEl.textContent = '99.9%';
          } else {
            uptimeEl.textContent = val.toFixed(1) + '%';
            requestAnimationFrame(countUp);
          }
        }
        requestAnimationFrame(countUp);
      }

      // 3. Type-in: DP-600
      if (certEl) {
        const fullText = 'DP-600';
        certEl.textContent = '';
        let idx = 0;
        function typeChar() {
          if (idx < fullText.length) {
            certEl.textContent = fullText.slice(0, idx + 1);
            idx++;
            setTimeout(typeChar, 100);
          }
        }
        setTimeout(typeChar, 200);
      }
    }

    // Trigger on scroll enter (once)
    if (stReady) {
      ScrollTrigger.create({
        trigger: '#feature-stats',
        start: 'top 70%',
        once: true,
        onEnter: runCountAnimations
      });
    } else {
      // No ScrollTrigger — run after short delay
      setTimeout(runCountAnimations, 800);
    }
  }

  /* ──────────────────────────────────────────────────────
     PROJECT CARDS — scroll stagger + hover physics
  ────────────────────────────────────────────────────── */
  function initProjectAnimations() {
    const bento    = document.querySelector('.bento-grid');
    const cardSmart  = document.querySelector('.card-smart');
    const cardRag    = document.querySelector('.card-rag');
    const cardRoom   = document.querySelector('.card-roomfood');
    const cardAmazon = document.querySelector('.card-amazon');

    if (!bento) return;

    // Set initial states
    if (cardSmart)  gsap.set(cardSmart,  { opacity: 0, x: -20 });
    if (cardRag)    gsap.set(cardRag,    { opacity: 0, x: 20 });
    if (cardRoom)   gsap.set(cardRoom,   { opacity: 0, y: 16 });
    if (cardAmazon) gsap.set(cardAmazon, { opacity: 0, y: 16 });

    if (stReady) {
      // SmartResume — slides in from left first
      if (cardSmart) {
        gsap.to(cardSmart, {
          opacity: 1, x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bento,
            start: 'top 78%',
            once: true
          }
        });
      }

      // RAG — slides in from right, slight delay
      if (cardRag) {
        gsap.to(cardRag, {
          opacity: 1, x: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: bento,
            start: 'top 78%',
            once: true
          }
        });
      }

      // Bottom row — stagger up
      const bottomCards = [cardRoom, cardAmazon].filter(Boolean);
      if (bottomCards.length) {
        gsap.to(bottomCards, {
          opacity: 1, y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          delay: 0.2,
          scrollTrigger: {
            trigger: bento,
            start: 'top 78%',
            once: true
          }
        });
      }
    } else {
      // No ScrollTrigger — reveal instantly
      [cardSmart, cardRag, cardRoom, cardAmazon].forEach(c => {
        if (c) gsap.set(c, { opacity: 1, x: 0, y: 0 });
      });
    }

    // Hover physics on all project cards (gated for touch devices)
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (hasHover) {
      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -2, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
      });
    }
  }

  /* ──────────────────────────────────────────────────────
     STACK ROWS — alternating left/right slide-in
  ────────────────────────────────────────────────────── */
  /* ──────────────────────────────────────────────────────
     STACK SECTION — Classified Ads Stagger Fade-Up
  ────────────────────────────────────────────────────── */
  function initStackAnimations() {
    if (!stReady) return;

    const ads = document.querySelectorAll('.classified-ad');
    const grid = document.querySelector('.classifieds-grid');
    if (!grid || !ads.length) return;

    // Initial states
    gsap.set(ads, { opacity: 0, y: 12 });

    gsap.to(ads, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: grid,
        start: 'top 82%',
        once: true
      }
    });
  }

  /* ──────────────────────────────────────────────────────
     FALLBACKS — reduced motion or no GSAP
  ────────────────────────────────────────────────────── */
  function revealAllInstant() {
    const pub = document.getElementById('mast-pub-name');
    if (pub) {
      pub.style.clipPath = 'none';
    }

    ['mast-tagline', 'mast-subtitle', 'mast-badge'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });

    const redRule = document.getElementById('dr-red');
    if (redRule) redRule.style.transform = 'scaleX(1)';

    document.querySelectorAll('.project-card, .stack-row').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    // Reveal pull quote words
    const quoteP = document.getElementById('pull-quote-text');
    if (quoteP) {
      const raw = quoteP.textContent;
      quoteP.innerHTML = raw.split(' ')
        .map(w => `<span class="word">${w}</span>`)
        .join(' ');
    }
  }

  /* ──────────────────────────────────────────────────────
     RAG SPEC DIALOG
  ────────────────────────────────────────────────────── */
  function initRagDialog() {
    const dialog = document.getElementById('rag-spec-dialog');
    const openBtn = document.getElementById('open-rag-spec');
    const closeBtn = document.getElementById('close-rag-spec');

    if (!dialog || !openBtn || !closeBtn) return;

    // Helper to open the dialog with GSAP animation
    function openDialog() {
      dialog.showModal();
      document.body.style.overflow = 'hidden';

      if (gsapReady && !prefersReduced) {
        // Animate from scale(0.95) and opacity(0) to scale(1) and opacity(1)
        gsap.fromTo(dialog,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.25, ease: 'power3.out' }
        );
      }
    }

    // Helper to close the dialog with GSAP animation
    function closeDialog() {
      if (gsapReady && !prefersReduced) {
        // Add class to trigger backdrop CSS transition
        dialog.classList.add('is-closing');

        // Animate dialog to scale(0.95) and opacity(0)
        gsap.to(dialog, {
          opacity: 0,
          scale: 0.95,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            dialog.close();
            dialog.classList.remove('is-closing');
          }
        });
      } else {
        dialog.close();
      }
    }

    openBtn.addEventListener('click', openDialog);
    closeBtn.addEventListener('click', closeDialog);

    // Intercept native escape key (cancel event) for smooth closing animation
    dialog.addEventListener('cancel', function (event) {
      event.preventDefault();
      closeDialog();
    });

    // Close on backdrop overlay click
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) {
        closeDialog();
      }
    });

    // Reset overflow on dialog close (handles native close or fallbacks)
    dialog.addEventListener('close', function () {
      document.body.style.overflow = '';
    });
  }

  /* ──────────────────────────────────────────────────────
     COPY EMAIL TO CLIPBOARD
  ────────────────────────────────────────────────────── */
  function initEmailCopy() {
    const btn = document.getElementById('copy-email-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      const email = btn.getAttribute('data-email');
      navigator.clipboard.writeText(email).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.borderColor = 'var(--red)';
        btn.style.color = 'var(--red)';
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy email: ', err);
      });
    });
  }

  /* ──────────────────────────────────────────────────────
     NIGHT EDITION THEME TOGGLE
     ────────────────────────────────────────────────────── */
  function initThemeToggleListener() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    // Set correct initial button text based on current theme attribute
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      toggleBtn.textContent = 'Day Edition';
      toggleBtn.setAttribute('aria-label', 'Toggle Day Edition');
    } else {
      toggleBtn.textContent = 'Night Edition';
      toggleBtn.setAttribute('aria-label', 'Toggle Night Edition');
    }

    toggleBtn.addEventListener('click', function () {
      if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent = 'Night Edition';
        toggleBtn.setAttribute('aria-label', 'Toggle Night Edition');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent = 'Day Edition';
        toggleBtn.setAttribute('aria-label', 'Toggle Day Edition');
      }
    });
  }

  /* ──────────────────────────────────────────────────────
     SMARTRESUME ATS DYNAMIC INFERENCE DEMO
  ────────────────────────────────────────────────────── */
  function initAtsDemo() {
    const runBtn = document.getElementById('run-ats-btn');
    const roleSelect = document.getElementById('ats-role-select');
    const scoreBar = document.getElementById('ats-score-bar');
    const scoreVal = document.getElementById('ats-score-val');
    const tagsContainer = document.getElementById('ats-features-tags');
    const togglesContainer = document.getElementById('ats-skills-toggles');

    if (!runBtn || !roleSelect || !scoreBar || !scoreVal || !tagsContainer) return;

    const featureWeights = {
      python: { name: 'Python 3.11', weight: 6.8 },
      fastapi: { name: 'FastAPI', weight: 8.4 },
      vectordb: { name: 'Vector DB', weight: 7.6 },
      vertexai: { name: 'GCP Vertex AI', weight: 6.2 },
      postgres: { name: 'PostgreSQL', weight: 5.4 },
      nextjs: { name: 'Next.js / React', weight: 4.8 }
    };

    const roleBaseMap = {
      ml: 58.0,
      rag: 54.0,
      fullstack: 62.0
    };

    function runInference() {
      const selectedRole = roleSelect.value || 'ml';
      const baseScore = roleBaseMap[selectedRole] || 58.0;

      // Calculate score based on checked checkboxes
      const checkboxes = togglesContainer ? togglesContainer.querySelectorAll('input[type="checkbox"]') : [];
      let totalAdd = 0;
      const activeTags = [];

      checkboxes.forEach(cb => {
        if (cb.checked && featureWeights[cb.value]) {
          const item = featureWeights[cb.value];
          totalAdd += item.weight;
          activeTags.push(`${item.name} (+${item.weight}%)`);
        }
      });

      const finalScore = Math.min(99.4, (baseScore + totalAdd)).toFixed(1);

      runBtn.textContent = 'Calculating...';
      runBtn.style.opacity = '0.6';

      setTimeout(() => {
        scoreBar.style.width = `${finalScore}%`;
        scoreVal.textContent = `${finalScore}%`;

        tagsContainer.innerHTML = activeTags.map(tag => 
          `<span class="ats-tag">${tag}</span>`
        ).join('');

        runBtn.textContent = 'Run Inference →';
        runBtn.style.opacity = '1';
      }, 250);
    }

    runBtn.addEventListener('click', runInference);
    roleSelect.addEventListener('change', runInference);
    if (togglesContainer) {
      togglesContainer.addEventListener('change', runInference);
    }
  }

  /* ──────────────────────────────────────────────────────
     RAG LIVE LATENCY BENCHMARK SIMULATOR
  ────────────────────────────────────────────────────── */
  function initRagBenchmark() {
    const runBtn = document.getElementById('run-rag-bench-btn');
    const statusEl = document.getElementById('rag-bench-status');
    const totalLatencyEl = document.getElementById('rag-total-latency');

    if (!runBtn) return;

    const stepTimers = {
      1: document.getElementById('rag-time-1'),
      2: document.getElementById('rag-time-2'),
      3: document.getElementById('rag-time-3'),
      4: document.getElementById('rag-time-4')
    };

    const stepElements = {
      1: document.getElementById('rag-step-1'),
      2: document.getElementById('rag-step-2'),
      3: document.getElementById('rag-step-3'),
      4: document.getElementById('rag-step-4')
    };

    let isRunning = false;

    runBtn.addEventListener('click', function () {
      if (isRunning) return;
      isRunning = true;
      runBtn.textContent = 'Benchmarking...';
      runBtn.disabled = true;
      if (statusEl) statusEl.textContent = 'Status: Benchmark running...';

      // Reset steps
      for (let i = 1; i <= 4; i++) {
        if (stepTimers[i]) stepTimers[i].textContent = '-- ms';
        if (stepElements[i]) {
          stepElements[i].classList.remove('is-running', 'is-done');
        }
      }

      // Randomize latencies slightly for realism
      const jitter = () => Math.floor(Math.random() * 30) - 15;
      const t1 = 38 + jitter();
      const t2 = 82 + jitter();
      const t3 = 110 + jitter();
      const t4 = 1840 + Math.floor(Math.random() * 120) - 60;
      const total = ((t1 + t2 + t3 + t4) / 1000).toFixed(2);

      // Step 1
      if (stepElements[1]) stepElements[1].classList.add('is-running');
      setTimeout(() => {
        if (stepTimers[1]) stepTimers[1].textContent = t1 + ' ms';
        if (stepElements[1]) stepElements[1].classList.replace('is-running', 'is-done');

        // Step 2
        if (stepElements[2]) stepElements[2].classList.add('is-running');
        setTimeout(() => {
          if (stepTimers[2]) stepTimers[2].textContent = t2 + ' ms';
          if (stepElements[2]) stepElements[2].classList.replace('is-running', 'is-done');

          // Step 3
          if (stepElements[3]) stepElements[3].classList.add('is-running');
          setTimeout(() => {
            if (stepTimers[3]) stepTimers[3].textContent = t3 + ' ms';
            if (stepElements[3]) stepElements[3].classList.replace('is-running', 'is-done');

            // Step 4
            if (stepElements[4]) stepElements[4].classList.add('is-running');
            setTimeout(() => {
              if (stepTimers[4]) stepTimers[4].textContent = t4.toLocaleString() + ' ms';
              if (stepElements[4]) stepElements[4].classList.replace('is-running', 'is-done');

              if (totalLatencyEl) totalLatencyEl.textContent = total + 's';
              if (statusEl) statusEl.textContent = 'Status: Benchmark Complete (' + total + 's)';

              runBtn.textContent = 'Re-Run Test ▶';
              runBtn.disabled = false;
              isRunning = false;
            }, 450);

          }, 250);

        }, 200);

      }, 150);
    });
  }

  /* ──────────────────────────────────────────────────────
     CORRESPONDENT'S NOTE ROTATOR
  ────────────────────────────────────────────────────── */
  function initQuoteRotator() {
    const rotateBtn = document.getElementById('rotate-quote-btn');
    const quoteText = document.getElementById('note-quote-text');

    if (!rotateBtn || !quoteText) return;

    const quotes = [
      `"I default to GCP for ML workloads and Next.js for client-facing systems. A stack is chosen strictly for operational stability, maintainability, and latency constraints."`,
      `"The most challenging ML problems live in the latency window between model prediction and vector retrieval."`,
      `"Production AI is 10% model architecture and 90% pipeline reliability, vector indexing, and zero-hallucination protocols."`
    ];

    let currentIndex = 0;

    rotateBtn.addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % quotes.length;
      quoteText.style.opacity = '0.2';
      
      setTimeout(() => {
        quoteText.textContent = quotes[currentIndex];
        quoteText.style.opacity = '1';
      }, 150);
    });
  }

  /* ──────────────────────────────────────────────────────
     INTERACTIVE TECH TAG CROSS-FILTERING
  ────────────────────────────────────────────────────── */
  function initTechFiltering() {
    const techButtons = document.querySelectorAll('.tech-tag');
    const filterBanner = document.getElementById('tech-filter-banner');
    const filterNameEl = document.getElementById('tech-filter-name');
    const filterCountEl = document.getElementById('tech-filter-count');
    const resetBtn = document.getElementById('reset-tech-filter');
    const projectCards = document.querySelectorAll('.project-card');

    if (!techButtons.length || !projectCards.length) return;

    function applyFilter(tech) {
      const lowerTech = tech.toLowerCase().trim();
      let matchCount = 0;

      projectCards.forEach(card => {
        const cardTech = (card.getAttribute('data-tech') || '').toLowerCase();
        if (cardTech.includes(lowerTech)) {
          card.classList.remove('is-filtered-out');
          card.classList.add('is-highlighted');
          matchCount++;
        } else {
          card.classList.add('is-filtered-out');
          card.classList.remove('is-highlighted');
        }
      });

      if (filterBanner && filterNameEl && filterCountEl) {
        filterNameEl.textContent = tech.toUpperCase();
        filterCountEl.textContent = `${matchCount} stories matching`;
        filterBanner.removeAttribute('hidden');
      }

      // Smooth scroll to projects section
      const projectsSec = document.getElementById('projects');
      if (projectsSec) {
        projectsSec.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function clearFilter() {
      projectCards.forEach(card => {
        card.classList.remove('is-filtered-out', 'is-highlighted');
      });
      if (filterBanner) {
        filterBanner.setAttribute('hidden', '');
      }
    }

    techButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const tech = btn.getAttribute('data-tech') || btn.textContent;
        applyFilter(tech);
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', clearFilter);
    }
  }

  /* ──────────────────────────────────────────────────────
     EDITORIAL COMMAND PALETTE (CMD+K)
  ────────────────────────────────────────────────────── */
  function initCommandPalette() {
    const dialog = document.getElementById('command-palette');
    const triggerBtn = document.getElementById('cmd-k-trigger');
    const input = document.getElementById('cmd-input');
    const items = document.querySelectorAll('.cmd-item');

    if (!dialog) return;

    function openPalette() {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
        if (input) {
          input.value = '';
          input.focus();
          filterList('');
        }
      }
    }

    function closePalette() {
      if (typeof dialog.close === 'function') {
        dialog.close();
      }
    }

    if (triggerBtn) {
      triggerBtn.addEventListener('click', openPalette);
    }

    // Keyboard shortcut Cmd+K or Ctrl+K
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (dialog.open) {
          closePalette();
        } else {
          openPalette();
        }
      }
    });

    // Close on backdrop click
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) {
        closePalette();
      }
    });

    // Fuzzy search filtering
    function filterList(query) {
      const q = query.toLowerCase().trim();
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    }

    if (input) {
      input.addEventListener('input', function () {
        filterList(input.value);
      });
    }

    // Execute item action
    items.forEach(item => {
      item.addEventListener('click', function () {
        const action = item.getAttribute('data-action');
        const target = item.getAttribute('data-target');

        closePalette();

        if (action === 'goto' && target) {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else if (action === 'open-rag') {
          const ragBtn = document.getElementById('open-rag-spec');
          if (ragBtn) ragBtn.click();
        } else if (action === 'open-ats') {
          const atsBox = document.getElementById('ats-demo-box');
          if (atsBox) {
            atsBox.scrollIntoView({ behavior: 'smooth' });
            const runBtn = document.getElementById('run-ats-btn');
            if (runBtn) runBtn.click();
          }
        } else if (action === 'toggle-theme') {
          const themeBtn = document.getElementById('theme-toggle');
          if (themeBtn) themeBtn.click();
        } else if (action === 'copy-email') {
          const copyBtn = document.getElementById('copy-email-btn');
          if (copyBtn) copyBtn.click();
        } else if (action === 'print-cv') {
          window.print();
        }
      });
    });
  }

  /* ──────────────────────────────────────────────────────
     TICKER CLICK HANDLERS
  ────────────────────────────────────────────────────── */
  function initTickerClickHandlers() {
    const tickerItems = document.querySelectorAll('.ticker-item');
    tickerItems.forEach(item => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function () {
        const text = item.textContent.toLowerCase();
        if (text.includes('rag')) {
          const ragBtn = document.getElementById('open-rag-spec');
          if (ragBtn) ragBtn.click();
        } else if (text.includes('smartresume')) {
          const atsBox = document.getElementById('ats-demo-box');
          if (atsBox) atsBox.scrollIntoView({ behavior: 'smooth' });
        } else if (text.includes('ecovis') || text.includes('fabric')) {
          const stackSec = document.getElementById('stack');
          if (stackSec) stackSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

})();
