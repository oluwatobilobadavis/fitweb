/* =============================================
   THE FIT STORE – CART LOGIC
   ============================================= */
 
const CART_KEY = 'fitstore_cart';
 
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch(e) { return []; }
}
 
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartUI();
}
 
function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;
  let cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  saveCart(cart);
  showToast(`<i class="fas fa-check-circle"></i> ${product.name.substring(0,30)}… added to cart`);
}
 
function removeFromCart(productId) {
  let cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
}
 
function updateCartQty(productId, qty) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}
 
function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const p = getProductById(item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}
 
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}
 
function updateCartUI() {
  const count = getCartCount();
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = count;
 
  const cartItemsEl = document.getElementById('cartItems');
  const cartFooterEl = document.getElementById('cartFooter');
  const cartTotalEl = document.getElementById('cartTotal');
  if (!cartItemsEl) return;
 
  const cart = getCart();
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p></div>`;
    if (cartFooterEl) cartFooterEl.style.display = 'none';
    return;
  }
 
  cartItemsEl.innerHTML = cart.map(item => {
    const p = getProductById(item.id);
    if (!p) return '';
    const imgContent = p.image
      ? `<img src="${p.image}" alt="${p.name}">`
      : `<i class="${p.icon}"></i>`;
    return `
      <div class="cart-item">
        <div class="cart-item-img">${imgContent}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name.substring(0,40)}${p.name.length>40?'…':''}</div>
          <div class="cart-item-price">${formatPrice(p.price)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="updateCartQty(${p.id}, ${item.qty - 1})"><i class="fas fa-minus"></i></button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${p.id}, ${item.qty + 1})"><i class="fas fa-plus"></i></button>
            <button class="remove-btn" onclick="removeFromCart(${p.id})"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>
    `;
  }).join('');
 
  if (cartFooterEl) cartFooterEl.style.display = 'block';
  if (cartTotalEl) cartTotalEl.textContent = formatPrice(getCartTotal());
}
 
// Toast notification
let toastTimeout;
function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = msg;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}
 
// Init
document.addEventListener('DOMContentLoaded', updateCartUI);