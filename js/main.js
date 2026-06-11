// ═══════════════════════════════════════════════════════════════
//  CONFIGURACIÓN DE MONETIZACIÓN
//  ⚠️  Reemplaza estos dos valores cuando tengas las cuentas.
//      Mientras estén vacíos, no se carga ningún anuncio ni link roto.
// ═══════════════════════════════════════════════════════════════
const MONETIZACION = {
  // Tu "tag" de Amazon Afiliados. Ejemplo: 'techgearlab-21'
  amazonTag: 'techgearlab-20',

  // Tu ID de editor de Google AdSense. Ejemplo: 'ca-pub-1234567890123456'
  adsensePublisherId: '',

  // Tienda de Amazon a usar para los enlaces (es = España, com = EE.UU., com.mx = México)
  amazonDominio: 'com',

  // Tu ID de medición de Google Analytics. Ejemplo: 'G-XXXXXXXXXX'
  googleAnalyticsId: 'G-3DE8BXDK5R'
};

// ── Google Analytics 4 ──
if (MONETIZACION.googleAnalyticsId) {
  const ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + MONETIZACION.googleAnalyticsId;
  document.head.appendChild(ga);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', MONETIZACION.googleAnalyticsId);
}

// ── Google AdSense (Auto Ads) ──
if (MONETIZACION.adsensePublisherId) {
  const ad = document.createElement('script');
  ad.async = true;
  ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + MONETIZACION.adsensePublisherId;
  ad.crossOrigin = 'anonymous';
  document.head.appendChild(ad);
}

// ── Enlaces de afiliados de Amazon ──
// Cualquier <a data-amazon="término de búsqueda"> se convierte en un enlace afiliado.
document.querySelectorAll('[data-amazon]').forEach(el => {
  const query = encodeURIComponent(el.dataset.amazon);
  let url = 'https://www.amazon.' + MONETIZACION.amazonDominio + '/s?k=' + query;
  if (MONETIZACION.amazonTag) url += '&tag=' + MONETIZACION.amazonTag;
  el.href = url;
  el.target = '_blank';
  el.rel = 'sponsored noopener';
});

// ── Aviso de afiliados (se inserta automáticamente al inicio de cada artículo) ──
(() => {
  const prose = document.querySelector('.prose');
  if (prose && document.querySelector('[data-amazon]')) {
    const aviso = document.createElement('p');
    aviso.className = 'affiliate-disclosure';
    aviso.innerHTML = 'ℹ️ <strong>Aviso:</strong> ZonaBenchmark participa en el programa de afiliados de Amazon. Si compras a través de nuestros enlaces podemos recibir una pequeña comisión, sin coste adicional para ti.';
    prose.insertBefore(aviso, prose.firstChild);
  }
})();

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

// ── Filtro desde el menú superior (#cat=...) ──
// El menú agrupa varias categorías: Hardware = GPU + CPU + SSD, etc.
const NAV_GROUPS = {
  laptops: ['laptop'],
  hardware: ['gpu', 'cpu', 'almacenamiento'],
  perifericos: ['teclado', 'raton', 'monitor', 'auriculares', 'streaming', 'setup']
};

function aplicarFiltroDesdeHash() {
  const m = location.hash.match(/^#cat=([\w-]+)$/);
  if (!m || !cards.length) return;
  const grupo = NAV_GROUPS[m[1]] || [m[1]];
  catBtns.forEach(b => b.classList.remove('active'));
  const btnExacto = [...catBtns].find(b => grupo.length === 1 && b.dataset.cat === grupo[0]);
  if (btnExacto) btnExacto.classList.add('active');
  cards.forEach(card => {
    card.style.display = grupo.includes(card.dataset.category) ? '' : 'none';
  });
  document.getElementById('articulos')?.scrollIntoView({ behavior: 'smooth' });
}
window.addEventListener('hashchange', aplicarFiltroDesdeHash);
aplicarFiltroDesdeHash();

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
