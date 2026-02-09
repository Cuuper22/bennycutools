/* ============================================================
   BennyCuTools — index.html Interactions
   Dashboard mockup, industry selector, comparison toggle
   ============================================================ */

(function() {
  'use strict';

  if (window.BCU.prefersReduced) {
    // Content stays visible via CSS defaults — nothing to do
    return;
  }

  // Wait for GSAP
  if (typeof gsap === 'undefined') return;

  // ---- Hero Animations ----
  var heroH1 = document.querySelector('.hero-content h1');
  if (heroH1) {
    window.BCU.animateSplitText(heroH1);
  }

  // Hero subheadline and CTAs — subtle entrance, not from invisible
  gsap.from('.hero-content p', { y: 16, opacity: 0.3, duration: 0.5, delay: 0.3 });
  gsap.from('.hero-ctas', { y: 16, opacity: 0.3, duration: 0.5, delay: 0.4 });

  // ---- Dashboard Mockup Animation ----
  // Dashboard starts VISIBLE — only animate position/scale, not opacity.
  // Internal content animates in quickly so the dashboard feels alive, not empty.
  var dashboard = document.querySelector('.dashboard-mockup');
  if (dashboard) {
    gsap.from(dashboard, { y: 24, scale: 0.98, duration: 0.8, delay: 0.3, ease: 'power3.out' });

    // Sidebar items — fast stagger, slight opacity
    var sidebarItems = dashboard.querySelectorAll('.sidebar-item');
    gsap.from(sidebarItems, { x: -10, opacity: 0.4, duration: 0.3, stagger: 0.05, delay: 0.4 });

    // Metric cards — visible immediately, slight scale pop
    var metricCards = dashboard.querySelectorAll('.metric-card');
    gsap.from(metricCards, { scale: 0.95, duration: 0.4, stagger: 0.08, delay: 0.5 });

    // Metric values counter — start counting immediately
    dashboard.querySelectorAll('.metric-value[data-target]').forEach(function(el) {
      var target = parseFloat(el.getAttribute('data-target'));
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var proxy = { value: 0 };
      gsap.to(proxy, {
        value: target,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out',
        onUpdate: function() {
          el.textContent = prefix + Math.round(proxy.value).toLocaleString() + suffix;
        }
      });
    });

    // Chart bars grow — faster
    var bars = dashboard.querySelectorAll('.metric-bar-segment');
    bars.forEach(function(bar) {
      var h = bar.style.height || bar.getAttribute('data-height') || '60%';
      bar.style.height = '0';
      gsap.to(bar, { height: h, duration: 0.5, delay: 0.6 + Math.random() * 0.2, ease: 'power2.out' });
    });

    // Table rows — faster, less delay
    var tableRows = dashboard.querySelectorAll('.dashboard-table tbody tr');
    gsap.from(tableRows, { opacity: 0.3, x: -6, duration: 0.3, stagger: 0.04, delay: 0.7 });
  }

  // ---- Parallax Orbs ----
  document.querySelectorAll('.parallax-orb').forEach(function(orb) {
    window.BCU.parallax(orb, 0.4);
  });

  // ---- Social Proof ----
  gsap.from('.proof-item', {
    y: 20, opacity: 0, duration: 0.6, stagger: 0.1,
    scrollTrigger: { trigger: '.social-proof', start: 'top 90%', once: true }
  });

  // ---- Services Cards ----
  gsap.to('.service-card', {
    y: 0, opacity: 1, duration: 0.8, stagger: 0.08,
    scrollTrigger: { trigger: '.services-grid', start: 'top 90%', once: true }
  });

  // ---- How It Works ----
  gsap.to('.step', {
    y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
    scrollTrigger: { trigger: '.steps-grid', start: 'top 90%', once: true }
  });

  // Line draw
  var stepsLine = document.querySelector('.steps-connector .draw-line');
  if (stepsLine) {
    window.BCU.animateLineDraw(stepsLine, document.querySelector('.how-it-works'));
  }

  // Step glow on scroll
  document.querySelectorAll('.step-number').forEach(function(num, i) {
    ScrollTrigger.create({
      trigger: num,
      start: 'top 90%',
      once: true,
      onEnter: function() {
        gsap.to(num, {
          boxShadow: '0 0 24px var(--color-accent-glow), 0 0 48px var(--color-accent-glow)',
          duration: 0.6,
          delay: i * 0.2
        });
      }
    });
  });

  // ---- Features Grid ----
  var featureCards = document.querySelectorAll('.features-grid .feature-card');
  gsap.to(featureCards, {
    y: 0, opacity: 1, duration: 0.8, stagger: 0.08,
    scrollTrigger: { trigger: '.features-grid', start: 'top 90%', once: true }
  });

  // Feature icons
  featureCards.forEach(function(card) {
    var icon = card.querySelector('.feature-card-icon');
    if (icon) {
      gsap.from(icon, {
        scale: 0, rotation: -15, duration: 0.5,
        scrollTrigger: { trigger: card, start: 'top 90%', once: true }
      });
    }
  });

  // ---- Comparison Toggle ----
  var compBtns = document.querySelectorAll('.comparison-toggle button');
  var compPanels = document.querySelectorAll('.comparison-panel');

  compBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = this.getAttribute('data-target');

      compBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');

      compPanels.forEach(function(panel) {
        if (panel.getAttribute('data-panel') === target) {
          panel.classList.add('active');
          // Animate items in
          var items = panel.querySelectorAll('li');
          gsap.from(items, { x: -20, opacity: 0, duration: 0.4, stagger: 0.06 });
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // ---- Industries Selector ----
  var industryBtns = document.querySelectorAll('.industry-btn');
  var industryPanels = document.querySelectorAll('.industry-detail');

  industryBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = this.getAttribute('data-industry');

      industryBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');

      industryPanels.forEach(function(panel) {
        if (panel.getAttribute('data-industry') === target) {
          panel.classList.add('active');
          gsap.from(panel, { y: 20, opacity: 0, duration: 0.5 });
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // ---- Portfolio Cards ----
  gsap.to('.portfolio-card', {
    y: 0, opacity: 1, duration: 0.9, stagger: 0.12,
    scrollTrigger: { trigger: '.portfolio-grid', start: 'top 90%', once: true }
  });

  // ---- Pricing ----
  var pricingPrice = document.querySelector('.pricing-price .counter-value');
  if (pricingPrice) {
    window.BCU.animateCounter(pricingPrice, 49, {
      trigger: pricingPrice,
      format: function(v) { return '$' + Math.round(v); }
    });
  }

  // Competitor rows
  gsap.from('.competitor-table tbody tr', {
    x: -30, opacity: 0, duration: 0.6, stagger: 0.15,
    scrollTrigger: { trigger: '.competitor-table', start: 'top 90%', once: true }
  });

  // ---- Section titles ----
  document.querySelectorAll('.section h2[data-split]').forEach(function(h2) {
    ScrollTrigger.create({
      trigger: h2,
      start: 'top 90%',
      once: true,
      onEnter: function() {
        window.BCU.animateSplitText(h2);
      }
    });
  });

  // ---- Section labels ----
  gsap.from('.section-label', {
    y: 20, opacity: 0, duration: 0.5,
    scrollTrigger: { trigger: '.section-label', start: 'top 90%', once: true }
  });

})();
