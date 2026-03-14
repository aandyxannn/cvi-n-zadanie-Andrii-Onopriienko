document.addEventListener('DOMContentLoaded', function() {
  const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
  addToCartBtns.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();  // Fix 1: pridané ()
      const productId = btn.getAttribute('data-product');
      const quantity = document.querySelector('#qty-' + productId).value;  // Fix 2: .val() → .value
      fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: productId,
          qty: quantity
        })
      })
      .then(response => response.json())  // Fix 3: pridané ()
      .then(data => {
        console.log('Pridané do košíka', data);
      })
      .catch(error => {
        console.error('Chyba:', error);
      });
    });
  });
});
