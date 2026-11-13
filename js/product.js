(function () {
  "use strict";

  var ORDER_EMAIL = "orders@examplewebsite142.com";

  var mainPhoto = document.getElementById("main-photo");
  var counter = document.getElementById("photo-counter");
  var thumbs = Array.prototype.slice.call(document.querySelectorAll(".thumb"));
  var current = 0;

  function showPhoto(index) {
    current = (index + thumbs.length) % thumbs.length;
    var thumb = thumbs[current];

    mainPhoto.src = thumb.getAttribute("data-src");
    mainPhoto.alt = thumb.getAttribute("data-alt");
    counter.textContent = "Photo " + (current + 1) + " of " + thumbs.length;

    thumbs.forEach(function (t, i) {
      t.setAttribute("aria-current", i === current ? "true" : "false");
    });
  }

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener("click", function () { showPhoto(i); });
  });
  document.getElementById("photo-prev").addEventListener("click", function () { showPhoto(current - 1); });
  document.getElementById("photo-next").addEventListener("click", function () { showPhoto(current + 1); });

  var sizeButtons = Array.prototype.slice.call(document.querySelectorAll(".size-pill"));
  var sizeSelected = document.getElementById("size-selected");
  var sizeError = document.getElementById("size-error");
  var chosenSize = null;

  sizeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      chosenSize = button.getAttribute("data-size");
      sizeButtons.forEach(function (b) {
        b.setAttribute("aria-pressed", b === button ? "true" : "false");
      });
      sizeSelected.textContent = "Selected: " + chosenSize;
      sizeError.hidden = true;
    });
  });

  var qtyInput = document.getElementById("quantity");
  var qtyMinus = document.getElementById("qty-minus");
  var qtyPlus = document.getElementById("qty-plus");
  var MIN = Number(qtyInput.min) || 1;
  var MAX = Number(qtyInput.max) || 99;

  function setQuantity(value) {
    var n = Math.round(Number(value));
    if (isNaN(n) || n < MIN) { n = MIN; }
    if (n > MAX) { n = MAX; }
    qtyInput.value = n;
    qtyMinus.setAttribute("aria-disabled", n <= MIN ? "true" : "false");
    qtyPlus.setAttribute("aria-disabled", n >= MAX ? "true" : "false");
  }

  qtyMinus.addEventListener("click", function () { setQuantity(Number(qtyInput.value) - 1); });
  qtyPlus.addEventListener("click", function () { setQuantity(Number(qtyInput.value) + 1); });
  qtyInput.addEventListener("change", function () { setQuantity(qtyInput.value); });
  setQuantity(qtyInput.value);

  document.getElementById("order-now").addEventListener("click", function () {
    if (!chosenSize) {
      sizeError.hidden = false;
      sizeButtons[0].focus();
      return;
    }

    var product = document.querySelector("h1").textContent.trim();
    var price = Number(document.getElementById("product-price").getAttribute("data-price"));
    var quantity = Number(qtyInput.value);
    var total = price * quantity;

    var subject = "BIAVA Order: " + product + " (Size " + chosenSize + ")";
    var body = [
      "Hi BIAVA,",
      "",
      "I'd like to order:",
      "",
      "Product: " + product,
      "Size: " + chosenSize,
      "Quantity: " + quantity,
      "Price: ₱" + price.toLocaleString("en-US") + " each",
      "Total: ₱" + total.toLocaleString("en-US"),
      "",
      "My name:",
      "Contact number:",
      "Delivery address:",
      "",
      "Thank you!"
    ].join("\r\n");

    window.location.href = "mailto:" + ORDER_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
})();
