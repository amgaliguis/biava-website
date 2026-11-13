(function () {
  "use strict";

  var STEP = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
  var TEXT_INPUTS = ["text", "email", "tel", "search", "url", "password"];

  function clickables() {
    return Array.prototype.slice.call(document.querySelectorAll("a[href], button, input, select, textarea"))
      .filter(function (el) {
        return !el.disabled && el.offsetParent !== null && el.getAttribute("tabindex") !== "-1";
      });
  }

  function onScreen(el) {
    var r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight;
  }

  function keepsArrowKeys(el, key) {
    var tag = el.tagName;
    if (tag === "TEXTAREA" || tag === "SELECT") { return true; }
    if (tag === "INPUT" && el.type === "radio") { return true; }
    if (tag === "INPUT" && TEXT_INPUTS.indexOf(el.type) !== -1) {
      return key === "ArrowLeft" || key === "ArrowRight";
    }
    return false;
  }

  document.addEventListener("keydown", function (e) {
    var step = STEP[e.key];
    if (!step || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) { return; }

    var active = document.activeElement;
    if (active && keepsArrowKeys(active, e.key)) { return; }

    var list = clickables();
    var index = list.indexOf(active);
    var target;

    if (index === -1) {
      var visible = list.filter(onScreen);
      target = step > 0 ? visible[0] : visible[visible.length - 1];
    } else {
      target = list[index + step];
    }

    if (!target) { return; }
    e.preventDefault();
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "nearest", behavior: "instant" });
  });
})();
