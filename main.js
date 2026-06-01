/* =============================================
   THE FIT STORE – MAIN JS
   ============================================= */
 
document.addEventListener('DOMContentLoaded', () => {
 
  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
    const backToTop = document.getElementById('backToTop');
    backToTop?.classList.toggle('visible', window.scrollY > 400);
  });
 
  /* ---- HAMBURGER ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });
 
  /* ---- CART TOGGLE ---- */
  const cartToggle = document.getElementById('cartToggle');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCart = document.getElementById('closeCart');
  function openCart() {
    cartSidebar?.classList.add('open');
    cartOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCartFn() {
    cartSidebar?.classList.remove('open');
    cartOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }
  cartToggle?.addEventListener('click', openCart);
  closeCart?.addEventListener('click', closeCartFn);
  cartOverlay?.addEventListener('click', closeCartFn);
 
  /* ---- SEARCH ---- */
  const searchToggle = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchBtn = document.getElementById('searchBtn');
 
  searchToggle?.addEventListener('click', () => {
    searchBar?.classList.toggle('open');
    if (searchBar?.classList.contains('open')) searchInput?.focus();
  });
  closeSearch?.addEventListener('click', () => {
    searchBar?.classList.remove('open');
    if (searchResults) { searchResults.innerHTML = ''; searchResults.classList.remove('has-results'); }
  });
 
  function runSearch() {
    const q = searchInput?.value || '';
    if (!q.trim()) {
      if (searchResults) { searchResults.innerHTML = ''; searchResults.classList.remove('has-results'); }
      return;
    }
    const results = searchProducts(q);
    if (!searchResults) return;
    if (results.length === 0) {
      searchResults.innerHTML = '<div style="padding:1.5rem;color:var(--gray);text-align:center"><i class="fas fa-search" style="margin-right:.5rem"></i>No products found</div>';
      searchResults.classList.add('has-results');
      return;
    }
    searchResults.innerHTML = results.slice(0,8).map(p => `
      <a href="product.html?id=${p.id}" class="search-result-item">
        <div class="sri-placeholder"><i class="${p.icon}"></i></div>
        <div class="sri-info">
          <strong>${p.name}</strong>
          <span>${formatPrice(p.price)}</span>
        </div>
      </a>
    `).join('');
    searchResults.classList.add('has-results');
  }
 
  searchInput?.addEventListener('input', runSearch);
  searchBtn?.addEventListener('click', () => {
    const q = searchInput?.value;
    if (q?.trim()) window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
  });
  searchInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = searchInput?.value;
      if (q?.trim()) window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
    }
  });
 
  /* ---- FEATURED PRODUCTS ---- */
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    const featured = getFeaturedProducts();
    featuredGrid.innerHTML = featured.map(renderProductCard).join('');
    initReveal();
  }
 
  /* ---- BACK TO TOP ---- */
  document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
 
  /* ---- SCROLL REVEAL ---- */
  initReveal();
 
});
 
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}