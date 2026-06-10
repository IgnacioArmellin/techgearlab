// ── Mobile nav toggle ──
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    }
  });
}

// ── Cookie banner ──
const banner = document.getElementById('cookie-banner');

function hideBanner() {
  if (banner) {
    banner.classList.add('hidden');
    setTimeout(() => { banner.style.display = 'none'; }, 300);
  }
}

if (banner) {
  if (localStorage.getItem('cookies-choice')) {
    banner.style.display = 'none';
  }

  document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('cookies-choice', 'accepted');
    hideBanner();
  });

  document.getElementById('cookie-reject')?.addEventListener('click', () => {
    localStorage.setItem('cookies-choice', 'rejected');
    hideBanner();
  });
}

// ── Category filter ──
const catBtns = document.querySelectorAll('.cat-btn');
const cards = document.querySelectorAll('.card[data-category]');

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;

    cards.forEach(card => {
      const show = cat === 'all' || card.dataset.category === cat;
      card.style.display = show ? '' : 'none';
    });
  });
});

// ── Live search ──
const searchInput = document.getElementById('search-input');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = (!q || text.includes(q)) ? '' : 'none';
    });

    // Reset category active state when searching
    if (q) {
      catBtns.forEach(b => b.classList.remove('active'));
      catBtns[0]?.classList.add('active');
    }
  });
}

// ── Table of contents active highlight ──
const tocLinks = document.querySelectorAll('.toc-list a');
const headings = document.querySelectorAll('.prose h2, .prose h3');

if (tocLinks.length && headings.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.toc-list a[href="#${entry.target.id}"]`);
        active?.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  headings.forEach(h => observer.observe(h));
}
