/* =============================================
   THE FIT STORE – PRODUCTS DATABASE
   Edit this file to add/remove products.
   ============================================= */
 
const PRODUCTS_KEY = 'fitstore_products';
 
const DEFAULT_PRODUCTS = [
  // CREATINE
  { id: 1, name: 'Optimum Nutrition Creatine Monohydrate', category: 'creatine', price: 18500, oldPrice: 22000, image: '', icon: 'fas fa-flask', badge: 'Bestseller', rating: 5, reviews: 124, featured: true, desc: 'Pure micronised creatine monohydrate. Increase strength, power and muscle mass. 300g – 60 servings.' },
  { id: 2, name: 'MuscleTech Platinum Creatine', category: 'creatine', price: 15000, oldPrice: null, image: '', icon: 'fas fa-flask', badge: null, rating: 4, reviews: 88, featured: false, desc: 'Ultra-pure creatine monohydrate for maximum muscle strength and endurance. 400g.' },
  { id: 3, name: 'BPI Sports Best Creatine', category: 'creatine', price: 21000, oldPrice: 25000, image: '', icon: 'fas fa-flask', badge: 'Sale', rating: 4, reviews: 56, featured: false, desc: '6-in-1 creatine formula with betaine and coconut water. 300g – 50 servings.' },
 
  // PRE-WORKOUT / BCAA / VITAMINS
  { id: 4, name: 'C4 Original Pre-Workout', category: 'preworkout', price: 22000, oldPrice: 27000, image: '', icon: 'fas fa-bolt', badge: 'Hot', rating: 5, reviews: 201, featured: true, desc: 'The #1 selling pre-workout. Explosive energy, focus and endurance. 195g – 30 servings.' },
  { id: 5, name: 'Scivation Xtend BCAA', category: 'preworkout', price: 19500, oldPrice: 23000, image: '', icon: 'fas fa-bolt', badge: null, rating: 5, reviews: 167, featured: true, desc: '7g BCAAs per serving with 2.5g glutamine. Zero sugar, zero carbs. 30 servings.' },
  { id: 6, name: 'Animal Pak Multivitamin', category: 'preworkout', price: 28000, oldPrice: 33000, image: '', icon: 'fas fa-capsules', badge: 'New', rating: 4, reviews: 93, featured: false, desc: 'The ultimate training pack with vitamins, minerals, antioxidants and performance complex. 44 packs.' },
  { id: 7, name: 'Ghost Legend Pre-Workout', category: 'preworkout', price: 24000, oldPrice: null, image: '', icon: 'fas fa-bolt', badge: null, rating: 4, reviews: 77, featured: false, desc: 'Full transparency formula with L-citrulline, beta-alanine and natural caffeine. 345g.' },
 
  // MASS GAINER
  { id: 8, name: 'Serious Mass Optimum Nutrition', category: 'massgainer', price: 45000, oldPrice: 55000, image: '', icon: 'fas fa-weight', badge: 'Bestseller', rating: 5, reviews: 312, featured: true, desc: 'The ultimate mass-building formula. 1250 calories per serving. 5.44kg bag.' },
  { id: 9, name: 'BSN True Mass 1200', category: 'massgainer', price: 38000, oldPrice: 44000, image: '', icon: 'fas fa-weight', badge: null, rating: 4, reviews: 145, featured: false, desc: 'Ultra-premium mass gainer with 50g protein per serving. 4.73kg.' },
  { id: 10, name: 'Dymatize Super Mass Gainer', category: 'massgainer', price: 42000, oldPrice: null, image: '', icon: 'fas fa-weight', badge: 'Sale', rating: 4, reviews: 98, featured: false, desc: 'High-calorie mass gainer with 52g protein, creatine and vitamins. 6lbs.' },
 
  // WHEY PROTEIN
  { id: 11, name: 'Gold Standard 100% Whey', category: 'wheyprotein', price: 35000, oldPrice: 42000, image: '', icon: 'fas fa-blender', badge: 'Bestseller', rating: 5, reviews: 445, featured: true, desc: '24g protein per serving. 5.5g BCAAs. Available in multiple flavors. 2.27kg – 74 servings.' },
  { id: 12, name: 'Dymatize ISO100 Whey', category: 'wheyprotein', price: 40000, oldPrice: 48000, image: '', icon: 'fas fa-blender', badge: 'Premium', rating: 5, reviews: 288, featured: true, desc: 'Hydrolyzed 100% whey protein isolate. 25g protein, 5.5g BCAAs. 2.3kg.' },
  { id: 13, name: 'MuscleTech NitroTech Whey', category: 'wheyprotein', price: 32000, oldPrice: 38000, image: '', icon: 'fas fa-blender', badge: null, rating: 4, reviews: 199, featured: false, desc: 'Scientifically engineered whey with creatine. 30g protein per serving. 4lbs.' },
  { id: 14, name: 'BSN SYNTHA-6 Whey Protein', category: 'wheyprotein', price: 29000, oldPrice: null, image: '', icon: 'fas fa-blender', badge: null, rating: 4, reviews: 156, featured: false, desc: 'Ultra-premium protein matrix with 22g protein per serving. Rich chocolate flavors. 5lbs.' },
 
  // GYM WEAR
  { id: 15, name: 'Pro Performance Training Tee', category: 'gymwear', price: 7500, oldPrice: 9500, image: '', icon: 'fas fa-tshirt', badge: 'New', rating: 4, reviews: 67, featured: true, desc: 'Moisture-wicking fabric, anti-odour technology. Slim fit performance cut. Available: S-XXL.' },
  { id: 16, name: 'Flex Compression Shorts', category: 'gymwear', price: 9000, oldPrice: 11000, image: '', icon: 'fas fa-tshirt', badge: null, rating: 5, reviews: 88, featured: false, desc: '4-way stretch compression shorts. Flatlock seams for zero chafing. Available: S-XXL.' },
  { id: 17, name: 'Elite Gym Joggers', category: 'gymwear', price: 14000, oldPrice: 17000, image: '', icon: 'fas fa-tshirt', badge: 'Sale', rating: 4, reviews: 45, featured: false, desc: 'Tapered fit joggers with zip pockets and ribbed cuffs. Moisture-wicking. S-XXL.' },
  { id: 18, name: 'Lifting Belt – Heavy Duty', category: 'gymwear', price: 18000, oldPrice: null, image: '', icon: 'fas fa-tshirt', badge: 'New', rating: 5, reviews: 112, featured: true, desc: 'Genuine leather power lifting belt. 4" wide. Supports lower back. Sizes: S-XL.' },
];
 
function getProducts() {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch(e) {}
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}
 
function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}
 
function getFeaturedProducts() {
  return getProducts().filter(p => p.featured);
}
 
function getProductsByCategory(cat) {
  if (!cat || cat === 'all') return getProducts();
  return getProducts().filter(p => p.category === cat);
}
 
function getProductById(id) {
  return getProducts().find(p => p.id === parseInt(id));
}
 
function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return getProducts().filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q)
  );
}
 
function formatPrice(n) {
  return '₦' + n.toLocaleString('en-NG');
}
 
function renderStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<i class="${i <= rating ? 'fas' : 'far'} fa-star"></i>`;
  }
  return html;
}
 
function getCategoryLabel(cat) {
  const labels = {
    creatine: 'Creatine',
    preworkout: 'Pre-Workout / BCAA / Vitamins',
    massgainer: 'Mass Gainer',
    wheyprotein: 'Whey Protein',
    gymwear: 'Gym Wear'
  };
  return labels[cat] || cat;
}
 
function renderProductCard(product) {
  const imgContent = product.image
    ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
    : `<div class="product-image-placeholder"><i class="${product.icon}"></i></div>`;
 
  return `
    <div class="product-card reveal" data-id="${product.id}">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      <div class="product-image">
        ${imgContent}
      </div>
      <div class="product-info">
        <div class="product-cat">${getCategoryLabel(product.category)}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-stars">${renderStars(product.rating)}<span>(${product.reviews})</span></div>
        <div class="product-footer">
          <div>
            ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
            <span class="product-price">${formatPrice(product.price)}</span>
          </div>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})" title="Add to cart">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}