/* Portfolio behaviour: language (EN/AR), theme, mobile menu, OTA panel. No dependencies. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

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
     Every translatable element holds its Arabic text in data-ar.
     The English text is stored once in data-en, then swapped back and forth. */
  var nodes = document.querySelectorAll('[data-ar]');
  var langBtn = document.getElementById('lang');
  var titles = {
    en: document.title,
    ar: 'بسام الغامدي | مهندس أتمتة ومطوّر ويب متكامل'
  };

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

  /* ---------- OTA panel: runs once (static if reduced motion is preferred) ---------- */
  var items = document.querySelectorAll('#ota-list li');
  var fill = document.getElementById('ota-fill');
  var state = document.getElementById('ota-state');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function finish() { state.textContent = 'Complete'; state.classList.add('done'); }
  if (reduce) {
    items.forEach(function (li) { li.classList.add('on'); });
    fill.style.width = '100%';
    finish();
  } else {
    requestAnimationFrame(function () { fill.style.width = '100%'; });
    items.forEach(function (li) {
      setTimeout(function () { li.classList.add('on'); }, Number(li.dataset.ms));
    });
    setTimeout(finish, 3300);
  }

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
