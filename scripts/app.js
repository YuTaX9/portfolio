/* Portfolio behaviour. No dependencies.
   Language (EN/AR), theme, menu, OTA panel, contact form,
   scroll reveal, counters, rotating role line, scroll-spy, progress bar. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function save(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

  /* ---------- Theme ---------- */
  var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  root.setAttribute('data-theme', load('theme') || (prefersLight ? 'light' : 'dark'));
  document.getElementById('theme').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    save('theme', next);
  });

  /* ---------- Language ----------
     Each translatable element keeps Arabic in data-ar; English is stored in data-en. */
  var nodes = document.querySelectorAll('[data-ar]');
  var langBtn = document.getElementById('lang');
  var titles = { en: document.title, ar: 'بسام الغامدي | مهندس أتمتة ومطوّر ويب متكامل' };
  nodes.forEach(function (el) { el.setAttribute('data-en', el.textContent); });

  function setLang(lang) {
    var ar = lang === 'ar';
    root.lang = lang;
    root.dir = ar ? 'rtl' : 'ltr';
    nodes.forEach(function (el) { el.textContent = el.getAttribute(ar ? 'data-ar' : 'data-en'); });
    document.title = titles[lang];
    langBtn.textContent = ar ? 'English' : 'العربية';
    langBtn.lang = ar ? 'en' : 'ar';
    save('lang', lang);
  }
  langBtn.addEventListener('click', function () { setLang(root.lang === 'ar' ? 'en' : 'ar'); });
  if (load('lang') === 'ar') setLang('ar');

  /* ---------- Mobile menu ---------- */
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- OTA panel (runs once) ---------- */
  var items = document.querySelectorAll('#ota-list li');
  var fill = document.getElementById('ota-fill');
  var state = document.getElementById('ota-state');
  function finish() { state.textContent = 'Complete'; state.classList.add('done'); }
  if (reduce) {
    items.forEach(function (li) { li.classList.add('on'); });
    fill.style.width = '100%';
    finish();
  } else {
    requestAnimationFrame(function () { fill.style.width = '100%'; });
    items.forEach(function (li) { setTimeout(function () { li.classList.add('on'); }, Number(li.dataset.ms)); });
    setTimeout(finish, 3300);
  }

  /* ---------- Rotating role line (typed) ---------- */
  var roles = {
    en: ['Automation Engineer', 'OTA Deployments', 'Full-Stack Developer', 'Data Engineering'],
    ar: ['مهندس أتمتة', 'تحديثات OTA', 'مطوّر ويب متكامل', 'هندسة البيانات']
  };
  var roleEl = document.getElementById('role');
  var ri = 0, ci = 0, deleting = false, lastLang = root.lang;
  function typeRole() {
    if (lastLang !== root.lang) { lastLang = root.lang; ri = 0; ci = 0; deleting = false; }
    var list = roles[root.lang === 'ar' ? 'ar' : 'en'];
    var word = list[ri % list.length];
    ci += deleting ? -1 : 1;
    roleEl.textContent = word.slice(0, ci);
    var wait = deleting ? 45 : 90;
    if (!deleting && ci === word.length) { deleting = true; wait = 1600; }
    else if (deleting && ci === 0) { deleting = false; ri++; wait = 350; }
    setTimeout(typeRole, wait);
  }
  if (reduce) { roleEl.textContent = roles.en[0]; } else { roleEl.textContent = ''; typeRole(); }

  /* ---------- Scroll reveal (staggered) ---------- */
  var targets = document.querySelectorAll('.hero-text > *, .ota, .section > h2, .about-grid > p, .stat, .skill, .project, .timeline li, .cred li, .contact-grid > *');
  targets.forEach(function (el, i) {
    el.classList.add('reveal');
    var siblings = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty('--d', Math.min(siblings, 6) * 0.08 + 's');
  });
  function show(el) {
    el.classList.add('in');
    setTimeout(function () { el.classList.add('done'); }, 1300);
  }
  if ('IntersectionObserver' in window && !reduce) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { show(en.target); revealObs.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    targets.forEach(function (el) { revealObs.observe(el); });
  } else {
    targets.forEach(show);
  }

  /* ---------- Count-up numbers ---------- */
  var counters = document.querySelectorAll('.stat b[data-to]');
  function count(el) {
    var to = Number(el.dataset.to), suffix = el.dataset.suffix || '', start = null;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min((ts - start) / 1400, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - t, 3))) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduce) {
    counters.forEach(function (el) { el.textContent = '0' + (el.dataset.suffix || ''); });
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { count(en.target); countObs.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObs.observe(el); });
  }

  /* ---------- Scroll-spy, progress bar, back-to-top ---------- */
  var links = document.querySelectorAll('nav a[href^="#"]:not(.btn)');
  var sections = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute('href')); });
  var bar = document.getElementById('progress');
  var toTop = document.getElementById('toTop');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    toTop.classList.toggle('show', y > 600);
    var current = -1;
    sections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= window.innerHeight * 0.35) current = i; });
    links.forEach(function (a, i) { a.classList.toggle('active', i === current); });
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  onScroll();

  /* ---------- Contact form (Getform) ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var msg = {
    en: { sending: 'Sending…', ok: 'Message sent. Thank you!', fail: 'Sending failed. Please email me directly.', net: 'Network error. Please try again later.' },
    ar: { sending: 'جارٍ الإرسال…', ok: 'تم إرسال رسالتك. شكرًا لك!', fail: 'تعذّر الإرسال. تواصل معي عبر البريد مباشرة.', net: 'خطأ في الشبكة. حاول لاحقًا.' }
  };
  function say(key, cls) { status.textContent = msg[root.lang === 'ar' ? 'ar' : 'en'][key]; status.className = cls || ''; }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var submit = form.querySelector('button[type="submit"]');
    submit.disabled = true; say('sending');
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (res) { if (res.ok) { say('ok', 'ok'); form.reset(); } else { say('fail', 'err'); } })
      .catch(function () { say('net', 'err'); })
      .then(function () { submit.disabled = false; setTimeout(function () { status.textContent = ''; }, 5000); });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
