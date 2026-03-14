// Vložiť pred </body>
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.product-card').forEach(function(card) {
    var dateAdded = card.dataset.dateAdded; // data-date-added="2026-03-01"
    if (dateAdded) {
      var added = new Date(dateAdded);
      var thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      if (added >= thirtyDaysAgo) {
        var badge = document.createElement('span');
        badge.className = 'badge-new';
        badge.textContent = 'Novinka';
        card.querySelector('.product-image-wrapper').appendChild(badge);
      }
    }
  });
});