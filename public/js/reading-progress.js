(function () {
  var marker = document.querySelector('[data-reading-progress]');
  if (!marker) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var bar = document.createElement('div');
  bar.setAttribute('data-reading-progress-bar', '');
  bar.style.position = 'fixed';
  bar.style.top = '0';
  bar.style.left = '0';
  bar.style.height = '1px';
  bar.style.width = '0%';
  bar.style.zIndex = '9999';
  bar.style.pointerEvents = 'none';
  bar.style.background = 'rgba(156, 149, 140, 0.55)';
  bar.style.transformOrigin = 'left center';
  bar.style.transition = 'width 120ms ease-out';

  document.body.appendChild(bar);

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function update() {
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop || 0;
    var max = (doc.scrollHeight || 0) - window.innerHeight;
    if (max <= 0) {
      bar.style.width = '0%';
      return;
    }
    var p = clamp(scrollTop / max, 0, 1);
    bar.style.width = (p * 100).toFixed(2) + '%';
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();
