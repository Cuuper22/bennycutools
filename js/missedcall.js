/* ============================================================
   BennyCuTools — missedcall.html Interactions
   ROI calculator, phone mockup message sequencing
   ============================================================ */

(function() {
  'use strict';

  var reduced = window.BCU.prefersReduced;

  // ---- Phone Mockup Message Sequencing ----
  var phoneBubbles = document.querySelectorAll('.sms-bubble');
  if (phoneBubbles.length > 0) {
    if (reduced) {
      phoneBubbles.forEach(function(b) { b.style.opacity = '1'; b.style.transform = 'none'; });
    } else if (typeof gsap !== 'undefined') {
      // Phone frame starts VISIBLE — only animate scale/position, not opacity.
      // SMS bubbles animate in sequence for engagement.
      gsap.set(phoneBubbles, { opacity: 0, y: 12 });

      var phoneFrame = document.querySelector('.phone-frame');
      if (phoneFrame) {
        gsap.from(phoneFrame, {
          y: 16, scale: 0.97, duration: 0.6, delay: 0.3, ease: 'power3.out'
        });
      }

      // Sequence messages — faster, first bubble shows quickly
      var delays = [0.6, 1.2, 2.0];
      phoneBubbles.forEach(function(bubble, i) {
        gsap.to(bubble, {
          opacity: 1, y: 0, duration: 0.4, delay: delays[i] || (0.6 + i * 0.6),
          ease: 'power2.out'
        });
      });

      // Phone floating animation
      if (phoneFrame) {
        gsap.to(phoneFrame, {
          y: 8, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3.5
        });
      }
    }
  }

  // ---- Hero text ----
  if (!reduced && typeof gsap !== 'undefined') {
    var heroH1 = document.querySelector('.mc-hero-content h1');
    if (heroH1) {
      window.BCU.animateSplitText(heroH1);
    }
    gsap.from('.mc-hero-content p', { y: 16, opacity: 0.3, duration: 0.5, delay: 0.3 });
    gsap.from('.mc-hero-ctas', { y: 16, opacity: 0.3, duration: 0.5, delay: 0.4 });
  }

  // ---- Stats Counter Animations ----
  if (!reduced && typeof gsap !== 'undefined') {
    var statCards = document.querySelectorAll('.mc-stats-grid .stat-card');
    gsap.to(statCards, {
      scale: 1, opacity: 1, duration: 0.8, stagger: 0.12,
      scrollTrigger: { trigger: '.mc-stats-grid', start: 'top 90%', once: true }
    });

    // Counter: 80%
    var stat80 = document.querySelector('[data-counter="80"]');
    if (stat80) {
      window.BCU.animateCounter(stat80, 80, {
        trigger: stat80,
        format: function(v) { return Math.round(v) + '%'; }
      });
    }

    // Counter: 60%
    var stat60 = document.querySelector('[data-counter="60"]');
    if (stat60) {
      window.BCU.animateCounter(stat60, 60, {
        trigger: stat60,
        format: function(v) { return Math.round(v) + '%'; }
      });
    }

    // Counter: $300-$1,500
    var statRange = document.querySelector('[data-counter="range"]');
    if (statRange) {
      var proxy = { low: 0, high: 0 };
      gsap.to(proxy, {
        low: 300, high: 1500, duration: 1.5, ease: 'power2.out',
        scrollTrigger: { trigger: statRange, start: 'top 90%', once: true },
        onUpdate: function() {
          statRange.textContent = '$' + Math.round(proxy.low).toLocaleString() + '-$' + Math.round(proxy.high).toLocaleString();
        }
      });
    }
  }

  // ---- How It Works ----
  if (!reduced && typeof gsap !== 'undefined') {
    gsap.to('.mc-step', {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
      scrollTrigger: { trigger: '.mc-steps-grid', start: 'top 90%', once: true }
    });

    // Vibration rings for step 1
    var rings = document.querySelectorAll('.vibration-ring');
    rings.forEach(function(ring, i) {
      gsap.to(ring, {
        scale: 1.3 + i * 0.2,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        delay: i * 0.3,
        ease: 'power2.out',
        scrollTrigger: { trigger: ring.closest('.mc-step'), start: 'top 90%' }
      });
    });

    // Line draw
    var stepsLine = document.querySelector('.mc-steps-connector .draw-line');
    if (stepsLine) {
      window.BCU.animateLineDraw(stepsLine, document.querySelector('.mc-steps-grid').closest('.section'));
    }
  }

  // ---- ROI Calculator ----
  var sliderCalls = document.getElementById('roi-calls');
  var sliderValue = document.getElementById('roi-value');
  var callsDisplay = document.getElementById('roi-calls-display');
  var valueDisplay = document.getElementById('roi-value-display');
  var lossDisplay = document.getElementById('roi-loss');
  var gainDisplay = document.getElementById('roi-gain');
  var roiDisplay = document.getElementById('roi-multiplier');

  function updateSliderFill(slider) {
    var min = parseFloat(slider.min);
    var max = parseFloat(slider.max);
    var val = parseFloat(slider.value);
    var pct = ((val - min) / (max - min)) * 100;
    slider.style.background = 'linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ' + pct + '%, var(--color-surface) ' + pct + '%, var(--color-surface) 100%)';
  }

  function calculateROI() {
    if (!sliderCalls || !sliderValue) return;

    var calls = parseInt(sliderCalls.value);
    var jobValue = parseInt(sliderValue.value);

    var monthlyLoss = calls * jobValue * 4.33; // weeks to months
    var monthlyGain = monthlyLoss * 0.20;
    var multiplier = monthlyGain / 79;

    if (callsDisplay) callsDisplay.textContent = calls;
    if (valueDisplay) valueDisplay.textContent = '$' + jobValue.toLocaleString();

    // Animate the numbers
    if (lossDisplay) {
      if (typeof gsap !== 'undefined' && !reduced) {
        gsap.to(lossDisplay, {
          textContent: '$' + Math.round(monthlyLoss).toLocaleString(),
          duration: 0.4,
          snap: { textContent: 1 },
          onUpdate: function() {
            // Manual formatting since snap doesn't handle currency
          }
        });
        lossDisplay.textContent = '$' + Math.round(monthlyLoss).toLocaleString();
      } else {
        lossDisplay.textContent = '$' + Math.round(monthlyLoss).toLocaleString();
      }
    }
    if (gainDisplay) gainDisplay.textContent = '$' + Math.round(monthlyGain).toLocaleString();
    if (roiDisplay) roiDisplay.textContent = Math.round(multiplier * 10) / 10 + 'x';

    updateSliderFill(sliderCalls);
    updateSliderFill(sliderValue);
  }

  if (sliderCalls) {
    sliderCalls.addEventListener('input', calculateROI);
    updateSliderFill(sliderCalls);
  }
  if (sliderValue) {
    sliderValue.addEventListener('input', calculateROI);
    updateSliderFill(sliderValue);
  }

  // Initialize ROI
  calculateROI();

  // ---- ROI Calculator ----
  if (!reduced && typeof gsap !== 'undefined') {
    gsap.to('.roi-calculator', {
      y: 0, opacity: 1, duration: 0.8,
      scrollTrigger: { trigger: '.roi-calculator', start: 'top 90%', once: true }
    });
  }

  // ---- Pricing ----
  if (!reduced && typeof gsap !== 'undefined') {
    var pricingCards = document.querySelectorAll('.mc-pricing-grid .pricing-card');
    if (pricingCards.length === 3) {
      // Featured first, then sides
      gsap.to(pricingCards[1], {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: '.mc-pricing-grid', start: 'top 90%', once: true }
      });
      gsap.to(pricingCards[0], {
        x: 0, opacity: 1, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: '.mc-pricing-grid', start: 'top 90%', once: true }
      });
      gsap.to(pricingCards[2], {
        x: 0, opacity: 1, duration: 0.8, delay: 0.2,
        scrollTrigger: { trigger: '.mc-pricing-grid', start: 'top 90%', once: true }
      });
    }

    // Founding banner
    gsap.from('.founding-banner', {
      y: 30, opacity: 0, duration: 0.8,
      scrollTrigger: { trigger: '.founding-banner', start: 'top 90%', once: true }
    });
  }

  // ---- FAQ ----
  if (!reduced && typeof gsap !== 'undefined') {
    gsap.from('.faq-item', {
      x: -30, opacity: 0, rotation: -1, duration: 0.6, stagger: 0.08,
      scrollTrigger: { trigger: '.mc-faq', start: 'top 90%', once: true }
    });
  }

  // ---- Final CTA ----
  if (!reduced && typeof gsap !== 'undefined') {
    gsap.from('.final-cta', {
      y: 40, opacity: 0, duration: 0.8,
      scrollTrigger: { trigger: '.final-cta', start: 'top 90%', once: true }
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
