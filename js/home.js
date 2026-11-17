(function () {
  "use strict";

  var links = {
    home: document.querySelector('.biava-navbar .nav-link[href="index.html"]'),
    shop: document.querySelector('.biava-navbar .nav-link[href="index.html#shop"]'),
    about: document.querySelector('.biava-navbar .nav-link[href="index.html#about"]')
  };
  var shop = document.getElementById("shop");
  var about = document.getElementById("about");
  var current = null;

  function setActive(key) {
    if (key === current) { return; }
    current = key;
    Object.keys(links).forEach(function (name) {
      var link = links[name];
      if (!link) { return; }
      if (name === key) {
        link.classList.add("active");
        link.setAttribute("aria-current", name === "home" ? "page" : "location");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  function update() {
    var line = window.innerHeight * 0.35;
    var key = "home";
    if (shop && shop.getBoundingClientRect().top <= line) { key = "shop"; }
    if (about && about.getBoundingClientRect().top <= line) { key = "about"; }
    setActive(key);
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
