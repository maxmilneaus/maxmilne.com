(function () {
  var root = document.querySelector('[data-footnote-previews]');
  if (!root) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function findFootnoteTextByHref(href) {
    if (!href || href[0] !== '#') return null;
    var id = href.slice(1);
    var target = document.getElementById(id);
    if (!target) return null;

    var clone = target.cloneNode(true);
    var backrefs = clone.querySelectorAll('a[href^="#fnref"], a.footnote-backref');
    backrefs.forEach(function (a) { a.remove(); });
    var text = (clone.textContent || '').trim().replace(/\s+/g, ' ');
    return text || null;
  }

  var tip = document.createElement('div');
  tip.setAttribute('data-footnote-tip', '');
  tip.style.position = 'fixed';
  tip.style.maxWidth = '32ch';
  tip.style.padding = '0.5rem 0.65rem';
  tip.style.borderRadius = '8px';
  tip.style.border = '1px solid rgba(74, 69, 63, 0.6)';
  tip.style.background = 'rgba(32, 29, 26, 0.92)';
  tip.style.color = 'rgba(232, 221, 212, 0.92)';
  tip.style.fontSize = '0.92rem';
  tip.style.lineHeight = '1.45';
  tip.style.zIndex = '10000';
  tip.style.pointerEvents = 'none';
  tip.style.opacity = '0';
  tip.style.transform = 'translateY(2px)';
  tip.style.transition = reduce ? 'none' : 'opacity 120ms ease-out, transform 120ms ease-out';

  document.body.appendChild(tip);

  function showAt(x, y, text) {
    tip.textContent = text;
    tip.style.opacity = '1';
    tip.style.transform = 'translateY(0)';

    // initial placement
    tip.style.left = (x + 10) + 'px';
    tip.style.top = (y - 10) + 'px';

    // keep inside viewport
    var rect = tip.getBoundingClientRect();
    var vw = window.innerWidth;
    var vh = window.innerHeight;

    var nx = x + 10;
    var ny = y - 10;

    if (nx + rect.width > vw - 10) nx = vw - rect.width - 10;
    if (ny - rect.height < 10) ny = y + 16;

    tip.style.left = nx + 'px';
    tip.style.top = ny + 'px';
  }

  function hide() {
    tip.style.opacity = '0';
    tip.style.transform = 'translateY(2px)';
  }

  function move(e) {
    showAt(e.clientX, e.clientY, tip.textContent || '');
  }

  var refs = root.querySelectorAll('sup a[href^="#fn"], a[href^="#fn"]');

  refs.forEach(function (a) {
    var href = a.getAttribute('href');
    var text = findFootnoteTextByHref(href);
    if (!text) return;

    a.addEventListener('mouseenter', function (e) { showAt(e.clientX, e.clientY, text); });
    a.addEventListener('mousemove', function (e) { showAt(e.clientX, e.clientY, text); });
    a.addEventListener('mouseleave', hide);

    a.addEventListener('focus', function () {
      var r = a.getBoundingClientRect();
      showAt(r.left + r.width / 2, r.top, text);
    });
    a.addEventListener('blur', hide);
  });
})();
