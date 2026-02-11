/* ============================================================
   BennyCuTools — GSAP Initialization
   gsap-init.js: Register plugins, shared animation patterns
   ============================================================ */

(function() {
  'use strict';

  // Mark GSAP as loaded so we know animations should work
  window.BCU = window.BCU || {};
  window.BCU.gsapLoaded = typeof gsap !== 'undefined';

  if (typeof gsap === 'undefined') {
    // GSAP failed to load - add fallback class immediately
    document.documentElement.classList.add('gsap-fallback');
    return;
  }

  // Register plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Default GSAP settings
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8
  });

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none none'
  });

  // ---- Shared Animation Registrations ----

  if (window.BCU.prefersReduced) {
    // Skip all animations — content stays visible via CSS defaults
    document.documentElement.classList.add('gsap-fallback');
    return;
  }

  // IMPORTANT: We no longer hide elements via gsap.set() opacity:0
  // Instead, we use gsap.from() which animates FROM a state TO current state
  // This means if ScrollTrigger doesn't fire, elements stay visible

  // Mark animations as ready
  window.BCU.animationsReady = true;

  // ---- Staggered Reveal for data-animate="fade-up" groups ----
  window.BCU.animateFadeUp = function(selector, options) {
    options = options || {};
    var elements = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
    if (!elements || elements.length === 0) return;

    gsap.from(elements, {
      y: options.y || 40,
      opacity: 0,
      duration: options.duration || 0.8,
      stagger: options.stagger || 0.1,
      ease: options.ease || 'power3.out',
      scrollTrigger: options.trigger ? {
        trigger: options.trigger,
        start: options.start || 'top 80%',
        once: true
      } : undefined
    });
  };

  // ---- Counter Animation ----
  // DISABLED - counter animations cause values to show 0 if not triggered
  // Static values in HTML are more reliable
  window.BCU.animateCounter = function(element, target, options) {
    // Do nothing - let HTML static values display
    return;
  };

  // ---- Text Split Animation ----
  window.BCU.animateSplitText = function(element) {
    var words = window.BCU.splitText(element);
    // Only animate position, not opacity - to avoid invisible text
    gsap.fromTo(words,
      { y: 12 },
      { y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' }
    );
  };

  // ---- SVG Line Draw ----
  window.BCU.animateLineDraw = function(svgPath, triggerElement) {
    if (!svgPath) return;
    var length = svgPath.getTotalLength();
    svgPath.style.strokeDasharray = length;
    svgPath.style.strokeDashoffset = length;

    gsap.to(svgPath, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerElement || svgPath.closest('section'),
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: true
      }
    });
  };

  // ---- Parallax ----
  window.BCU.parallax = function(element, speed) {
    if (window.innerWidth < 768) return; // Skip on mobile
    gsap.to(element, {
      y: function() { return (speed || 0.3) * 100; },
      ease: 'none',
      scrollTrigger: {
        trigger: element.parentElement || element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  };

})();
