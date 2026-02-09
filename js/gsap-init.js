/* ============================================================
   BennyCuTools — GSAP Initialization
   gsap-init.js: Register plugins, shared animation patterns
   ============================================================ */

(function() {
  'use strict';

  if (typeof gsap === 'undefined') return;

  // Progressive enhancement: do NOT add gsap-loaded class to hide content via CSS.
  // Hidden states are set below via gsap.set() so content stays visible if JS fails.

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
    return;
  }

  // ---- Set initial hidden states via JS (progressive enhancement) ----
  // If JS fails before this point, all content remains visible.
  document.querySelectorAll('[data-animate]').forEach(function(el) {
    var type = el.getAttribute('data-animate');
    var props = { opacity: 0 };
    if (type === 'fade-up') props.y = 40;
    else if (type === 'fade-left') props.x = -40;
    else if (type === 'fade-right') props.x = 40;
    else if (type === 'scale-up') props.scale = 0.95;
    else if (type === 'rotate-in') { props.rotation = -5; props.x = -20; }
    gsap.set(el, props);
  });

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
  window.BCU.animateCounter = function(element, target, options) {
    options = options || {};
    var proxy = { value: options.from || 0 };
    gsap.to(proxy, {
      value: target,
      duration: options.duration || 1.5,
      ease: options.ease || 'power2.out',
      onUpdate: function() {
        var formatted = options.format ? options.format(proxy.value) : Math.round(proxy.value);
        element.textContent = formatted;
      },
      scrollTrigger: options.trigger ? {
        trigger: options.trigger,
        start: options.start || 'top 80%',
        once: true
      } : undefined
    });
  };

  // ---- Text Split Animation ----
  window.BCU.animateSplitText = function(element) {
    var words = window.BCU.splitText(element);
    gsap.fromTo(words,
      { y: 20, opacity: 0.2 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power3.out' }
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
