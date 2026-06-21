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

    // Run all animation modules
    initMastheadTimeline();
    initNavIndicator();
    initPullQuoteReveal();
    initStatAnimations();
    initProjectAnimations();
    initStackAnimations();

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
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                          rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
      if (!isInDialog) {
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

})();
