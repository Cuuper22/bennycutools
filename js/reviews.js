/* ============================================================
   BennyCuTools — reviews.html Interactions
   Demo tab cycling, review card animations, typing effect
   ============================================================ */

(function() {
  'use strict';

  var reduced = window.BCU.prefersReduced;

  // ---- Hero Review Card Typing Effect ----
  var responseText = document.querySelector('.review-response-text');
  var typingCursor = document.querySelector('.typing-cursor');
  var fullResponse = "Thank you so much, Sarah! We're glad the team made your experience a great one. Your kind words really mean a lot to us. We'd love to see you again soon!";

  if (responseText && !reduced) {
    responseText.textContent = '';
    if (typingCursor) typingCursor.classList.add('blink');

    var charIndex = 0;
    function typeChar() {
      if (charIndex < fullResponse.length) {
        responseText.textContent += fullResponse[charIndex];
        charIndex++;
        var delay = 20 + Math.random() * 30;
        setTimeout(typeChar, delay);
      } else {
        if (typingCursor) {
          setTimeout(function() { typingCursor.classList.remove('blink'); }, 1000);
        }
      }
    }
    setTimeout(typeChar, 1500);
  } else if (responseText) {
    responseText.textContent = fullResponse;
  }

  // ---- Hero Animations ----
  if (!reduced && typeof gsap !== 'undefined') {
    var heroH1 = document.querySelector('.rv-hero-content h1');
    if (heroH1) {
      window.BCU.animateSplitText(heroH1);
    }
    gsap.from('.rv-hero-content p', { y: 30, opacity: 0, duration: 0.7, delay: 0.4 });
    gsap.from('.rv-hero-ctas', { y: 30, opacity: 0, duration: 0.7, delay: 0.5 });

    // Review mockup
    var mockup = document.querySelector('.review-mockup');
    if (mockup) {
      gsap.from(mockup, { y: 40, opacity: 0, scale: 0.95, duration: 1, delay: 0.5, ease: 'power3.out' });
    }
  }

  // ---- Before/After Demo ----
  var demoTabs = document.querySelectorAll('.demo-tab');
  var demoPanels = document.querySelectorAll('.demo-panel');
  var progressFill = document.querySelector('.progress-bar-fill');
  var cycleTimer = null;
  var cycleDuration = 6000;
  var currentDemo = 0;

  function showDemo(index) {
    currentDemo = index;

    // Update tabs
    demoTabs.forEach(function(tab, i) {
      tab.classList.toggle('active', i === index);
    });

    // Update panels
    demoPanels.forEach(function(panel, i) {
      if (i === index) {
        panel.classList.add('active');
        if (!reduced && typeof gsap !== 'undefined') {
          gsap.from(panel, { opacity: 0, x: 30, duration: 0.3, ease: 'power2.out' });
        }
        // Animate speed badge counter
        var badge = panel.querySelector('.speed-counter');
        if (badge && !reduced && typeof gsap !== 'undefined') {
          var proxy = { val: 0 };
          gsap.to(proxy, {
            val: 12,
            duration: 1.2,
            delay: 0.3,
            ease: 'power2.out',
            onUpdate: function() {
              badge.textContent = Math.round(proxy.val);
            }
          });
        }
      } else {
        panel.classList.remove('active');
      }
    });

    // Reset progress bar
    if (progressFill) {
      progressFill.style.transition = 'none';
      progressFill.style.width = '0%';
      requestAnimationFrame(function() {
        progressFill.style.transition = 'width ' + cycleDuration + 'ms linear';
        progressFill.style.width = '100%';
      });
    }
  }

  function startCycle() {
    stopCycle();
    cycleTimer = setInterval(function() {
      currentDemo = (currentDemo + 1) % demoPanels.length;
      showDemo(currentDemo);
    }, cycleDuration);
  }

  function stopCycle() {
    if (cycleTimer) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }
  }

  demoTabs.forEach(function(tab, i) {
    tab.addEventListener('click', function() {
      showDemo(i);
      stopCycle();
      startCycle();
    });
  });

  if (demoPanels.length > 0) {
    showDemo(0);
    startCycle();
  }

  // ---- Stats Counter Animations ----
  if (!reduced && typeof gsap !== 'undefined') {
    var statCards = document.querySelectorAll('.rv-stats-grid .stat-card');
    gsap.to(statCards, {
      scale: 1, opacity: 1, duration: 0.8, stagger: 0.12,
      scrollTrigger: { trigger: '.rv-stats-grid', start: 'top 90%', once: true }
    });

    // Counter: 76%
    var stat76 = document.querySelector('[data-counter="76"]');
    if (stat76) {
      window.BCU.animateCounter(stat76, 76, {
        trigger: stat76,
        format: function(v) { return Math.round(v) + '%'; }
      });
    }

    // Counter: 89%
    var stat89 = document.querySelector('[data-counter="89"]');
    if (stat89) {
      window.BCU.animateCounter(stat89, 89, {
        trigger: stat89,
        format: function(v) { return Math.round(v) + '%'; }
      });
    }

    // Counter: 5-9%
    var statRevenue = document.querySelector('[data-counter="5-9"]');
    if (statRevenue) {
      var proxy = { low: 0, high: 0 };
      gsap.to(proxy, {
        low: 5, high: 9, duration: 1.5, ease: 'power2.out',
        scrollTrigger: { trigger: statRevenue, start: 'top 90%', once: true },
        onUpdate: function() {
          statRevenue.textContent = Math.round(proxy.low) + '-' + Math.round(proxy.high) + '%';
        }
      });
    }
  }

  // ---- How It Works ----
  if (!reduced && typeof gsap !== 'undefined') {
    gsap.to('.rv-step', {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
      scrollTrigger: { trigger: '.rv-steps-grid', start: 'top 90%', once: true }
    });

    var stepsLine = document.querySelector('.rv-steps-connector .draw-line');
    if (stepsLine) {
      window.BCU.animateLineDraw(stepsLine, document.querySelector('.rv-steps-grid').closest('.section'));
    }
  }

  // ---- Features ----
  if (!reduced && typeof gsap !== 'undefined') {
    gsap.to('.rv-hero-feature', {
      y: 0, opacity: 1, duration: 0.8,
      scrollTrigger: { trigger: '.rv-hero-feature', start: 'top 90%', once: true }
    });

    gsap.to('.rv-features-grid .feature-card', {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.08,
      scrollTrigger: { trigger: '.rv-features-grid', start: 'top 90%', once: true }
    });
  }

  // ---- Pricing ----
  if (!reduced && typeof gsap !== 'undefined') {
    var pricingCards = document.querySelectorAll('.rv-pricing-grid .pricing-card');
    if (pricingCards.length === 3) {
      // Center card first, then sides
      gsap.to(pricingCards[1], {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.rv-pricing-grid', start: 'top 90%', once: true }
      });
      gsap.to(pricingCards[0], {
        x: 0, opacity: 1, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: '.rv-pricing-grid', start: 'top 90%', once: true }
      });
      gsap.to(pricingCards[2], {
        x: 0, opacity: 1, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: '.rv-pricing-grid', start: 'top 90%', once: true }
      });
    }

    gsap.from('.sprint-offer', {
      y: 30, opacity: 0, duration: 0.8,
      scrollTrigger: { trigger: '.sprint-offer', start: 'top 90%', once: true }
    });
  }

  // ---- Audit CTA ----
  if (!reduced && typeof gsap !== 'undefined') {
    var checkItems = document.querySelectorAll('.audit-checklist-item');
    gsap.from(checkItems, {
      x: -20, opacity: 0, duration: 0.5, stagger: 0.12,
      scrollTrigger: { trigger: '.audit-cta', start: 'top 90%', once: true }
    });

    // Check marks draw in
    checkItems.forEach(function(item, i) {
      var check = item.querySelector('.audit-check svg');
      if (check) {
        gsap.from(check, {
          scale: 0, rotation: -90, duration: 0.4, delay: 0.1 + i * 0.12,
          scrollTrigger: { trigger: '.audit-cta', start: 'top 90%', once: true }
        });
      }
    });
  }

  // ---- FAQ ----
  if (!reduced && typeof gsap !== 'undefined') {
    gsap.from('.faq-item', {
      x: -30, opacity: 0, rotation: -1, duration: 0.6, stagger: 0.08,
      scrollTrigger: { trigger: '.faq-list', start: 'top 90%', once: true }
    });
  }

  // ---- Section titles ----
  if (!reduced && typeof gsap !== 'undefined') {
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
  }

  // ---- Parallax Orbs ----
  if (!reduced && typeof gsap !== 'undefined') {
    document.querySelectorAll('.parallax-orb').forEach(function(orb) {
      window.BCU.parallax(orb, 0.4);
    });
  }

})();
