/* ============================================================
   BennyCuTools — Shared JS
   Nav, theme toggle, scroll observer, shared utilities
   ============================================================ */

(function() {
  'use strict';

  // gsap-ready is set but NOT used for hiding elements
  // gsap-loaded is set by gsap-init.js only after GSAP loads
  document.documentElement.classList.add('gsap-ready');

  // ---- Theme Toggle ----
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getStoredTheme() {
    return localStorage.getItem('bcu-theme');
  }

  function setTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('bcu-theme', dark ? 'dark' : 'light');
  }

  // Initialize theme
  const stored = getStoredTheme();
  if (stored === 'dark') {
    setTheme(true);
  } else if (stored === 'light') {
    setTheme(false);
  }
  // If no stored preference, stay with light (default)

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(!isDark);
    });
  }

  // ---- Mobile Navigation ----
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isOpen);
      mobileNav.classList.toggle('is-open', !isOpen);

      if (!isOpen) {
        // Focus first link when opening
        const firstLink = mobileNav.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        hamburger.focus();
      }
    });

    // Close on click outside
    document.addEventListener('click', function(e) {
      if (mobileNav.classList.contains('is-open') &&
          !mobileNav.contains(e.target) &&
          !hamburger.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
      }
    });
  }

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var headerHeight = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = this.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('is-open');

      // Close all others
      document.querySelectorAll('.faq-item.is-open').forEach(function(openItem) {
        if (openItem !== item) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          var otherAnswer = openItem.querySelector('.faq-answer');
          if (typeof gsap !== 'undefined') {
            gsap.to(otherAnswer, { height: 0, duration: 0.3, ease: 'power2.inOut' });
          } else {
            otherAnswer.style.height = '0';
          }
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('is-open');
        this.setAttribute('aria-expanded', 'false');
        if (typeof gsap !== 'undefined') {
          gsap.to(answer, { height: 0, duration: 0.3, ease: 'power2.inOut' });
        } else {
          answer.style.height = '0';
        }
      } else {
        item.classList.add('is-open');
        this.setAttribute('aria-expanded', 'true');
        var inner = answer.querySelector('.faq-answer-inner');
        var targetHeight = inner.offsetHeight;
        if (typeof gsap !== 'undefined') {
          gsap.to(answer, { height: targetHeight, duration: 0.3, ease: 'power2.inOut' });
        } else {
          answer.style.height = targetHeight + 'px';
        }
      }
    });
  });

  // ---- Utility: Split Text into Words ----
  window.BCU = window.BCU || {};
  window.BCU.splitText = function(element) {
    var text = element.textContent;
    var words = text.split(/\s+/);
    element.innerHTML = '';
    words.forEach(function(word, i) {
      var wrapper = document.createElement('span');
      wrapper.className = 'split-word';
      var inner = document.createElement('span');
      inner.className = 'split-word-inner';
      inner.textContent = word;
      wrapper.appendChild(inner);
      element.appendChild(wrapper);
      if (i < words.length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
    });
    return element.querySelectorAll('.split-word-inner');
  };

  // ---- Utility: Format Number ----
  window.BCU.formatNumber = function(n, prefix, suffix) {
    prefix = prefix || '';
    suffix = suffix || '';
    return prefix + Math.round(n).toLocaleString() + suffix;
  };

  // ---- Reduced motion check ----
  window.BCU.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

})();
