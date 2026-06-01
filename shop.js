/* =============================================
   THE FIT STORE – SHOP PAGE JS
   ============================================= */
 
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  let currentCat = params.get('cat') || 'all';
  const searchQuery = params.get('search') || '';
  let maxPrice = 60000;
  let sortVal = 'default';
 
  const shopGrid = document.getElementById('shopGrid');
  const pageTitle = document.getElementById('pageTitle');
  const productCount = document.getElementById('productCount');
  const noResults = document.getElementById('noResults');
  const catLinks = document.querySelectorAll('.filter-link');
  const sortSelect = document.getElementById('sortSelect');
  const priceRange = document.getElementById('priceRange');
  const priceMaxEl = document.getElementById('priceMax');
 
  // Update title
  if (searchQuery) {
    pageTitle.textContent = `Search: "${searchQuery}"`;
    currentCat = 'all';
  } else {
    const labels = { all:'All Products', creatine:'Creatine', preworkout:'Pre-Workout / BCAA / Vitamins', massgainer:'Mass Gainer', wheyprotein:'Whey Protein', gymwear:'Gym Wear' };
    pageTitle.textContent = labels[currentCat] || 'All Products';
  }
 
  // Active filter link
  catLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.cat === currentCat);
    link.addEventListener('click', e => {
      e.preventDefault();
      currentCat = link.dataset.cat;
      catLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const labels = { all:'All Products', creatine:'Creatine', preworkout:'Pre-Workout / BCAA / Vitamins', massgainer:'Mass Gainer', wheyprotein:'Whey Protein', gymwear:'Gym Wear' };
      pageTitle.textContent = labels[currentCat] || 'All Products';
      renderShop();
      history.pushState({}, '', currentCat === 'all' ? 'shop.html' : `shop.html?cat=${currentCat}`);
    });
  });
 
  sortSelect?.addEventListener('change', () => { sortVal = sortSelect.value; renderShop(); });
 
  priceRange?.addEventListener('input', () => {
    maxPrice = parseInt(priceRange.value);
    priceMaxEl.textContent = '₦' + maxPrice.toLocaleString('en-NG');
    renderShop();
  });
 
  // View toggle
  document.getElementById('gridViewBtn')?.addEventListener('click', () => {
    shopGrid.classList.remove('list-view');
    document.getElementById('gridViewBtn').classList.add('active');
    document.getElementById('listViewBtn').classList.remove('active');
  });
  document.getElementById('listViewBtn')?.addEventListener('click', () => {
    shopGrid.classList.add('list-view');
    document.getElementById('listViewBtn').classList.add('active');
    document.getElementById('gridViewBtn').classList.remove('active');
  });
 
  function renderShop() {
    let products = searchQuery ? searchProducts(searchQuery) : getProductsByCategory(currentCat);
    products = products.filter(p => p.price <= maxPrice);
    if (sortVal === 'price-asc') products.sort((a,b) => a.price - b.price);
    else if (sortVal === 'price-desc') products.sort((a,b) => b.price - a.price);
    else if (sortVal === 'rating') products.sort((a,b) => b.rating - a.rating);
 
    if (products.length === 0) {
      shopGrid.innerHTML = '';
      noResults.style.display = 'block';
      productCount.innerHTML = 'Showing <strong>0</strong> products';
    } else {
      noResults.style.display = 'none';
      shopGrid.innerHTML = products.map(renderProductCard).join('');
      productCount.innerHTML = `Showing <strong>${products.length}</strong> product${products.length !== 1 ? 's' : ''}`;
      initReveal();
    }
  }
 
  renderShop();
});