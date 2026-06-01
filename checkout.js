/* CHECKOUT JS */
document.addEventListener('DOMContentLoaded', () => {
 
  // Render order items
  const cart = getCart();
  const orderItems = document.getElementById('orderItems');
  const orderSubtotal = document.getElementById('orderSubtotal');
  const orderTotal = document.getElementById('orderTotal');
 
  if (cart.length === 0) {
    orderItems.innerHTML = '<p style="color:var(--gray);font-size:.9rem">Your cart is empty.</p>';
  } else {
    orderItems.innerHTML = cart.map(item => {
      const p = getProductById(item.id);
      if (!p) return '';
      const img = p.image ? `<img src="${p.image}" alt="${p.name}">` : `<i class="${p.icon}"></i>`;
      return `
        <div class="order-item">
          <div class="order-item-img">${img}</div>
          <div>
            <div class="order-item-name">${p.name.substring(0,35)}…</div>
            <div class="order-item-qty">Qty: ${item.qty}</div>
          </div>
          <div class="order-item-price">${formatPrice(p.price * item.qty)}</div>
        </div>
      `;
    }).join('');
    const total = getCartTotal();
    orderSubtotal.textContent = formatPrice(total);
    orderTotal.textContent = formatPrice(total);
  }
 
  // Payment method toggle
  document.querySelectorAll('.pay-method').forEach(pm => {
    pm.addEventListener('click', () => {
      document.querySelectorAll('.pay-method').forEach(p => p.classList.remove('active'));
      pm.classList.add('active');
      pm.querySelector('input').checked = true;
      const val = pm.querySelector('input').value;
      document.getElementById('bankDetails')?.classList.toggle('visible', val === 'transfer');
    });
  });
  // Show bank details by default
  document.getElementById('bankDetails')?.classList.add('visible');
 
  // Place order
  document.getElementById('placeOrderBtn')?.addEventListener('click', () => {
    const first = document.getElementById('firstName')?.value.trim();
    const last = document.getElementById('lastName')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const address = document.getElementById('address')?.value.trim();
    const city = document.getElementById('city')?.value.trim();
    const state = document.getElementById('state')?.value;
 
    if (!first || !last || !email || !phone || !address || !city || !state) {
      alert('Please fill in all required fields.');
      return;
    }
 
    const paymethod = document.querySelector('input[name="paymethod"]:checked')?.value;
 
    if (paymethod === 'whatsapp') {
      const items = getCart().map(item => {
        const p = getProductById(item.id);
        return p ? `${p.name} x${item.qty} = ${formatPrice(p.price * item.qty)}` : '';
      }).filter(Boolean).join('%0A');
      const total = getCartTotal();
      const msg = `Hello! I'd like to place an order:%0A%0A${items}%0A%0ATotal: ${formatPrice(total)}%0A%0AName: ${first} ${last}%0APhone: ${phone}%0AAddress: ${address}, ${city}, ${state}`;
      window.open(`https://wa.me/2348054372352?text=${msg}`, '_blank');
      return;
    }
 
    if (paymethod === 'paystack') {
      alert('Paystack integration requires your Paystack Public Key. Visit paystack.com to get your key and replace YOUR_PAYSTACK_KEY in checkout.js');
      return;
    }
 
    // Bank transfer – show success
    document.getElementById('confirmPhone').textContent = phone;
    document.getElementById('successModal').style.display = 'flex';
    localStorage.removeItem('fitstore_cart');
  });
 
  document.getElementById('successModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('successModal')) {
      window.location.href = 'index.html';
    }
  });
});