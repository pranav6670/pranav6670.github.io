/* site.js — nav, About split-view, reveal-on-scroll */
(function () {
  "use strict";

  // Sticky nav border on scroll
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile menu toggle
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.querySelector(".nav__menu");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (menu) {
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        document.body.classList.remove("nav-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // About: desktop master-detail
  var aboutBtns = document.querySelectorAll(".about-nav button");
  var aboutPanels = document.querySelectorAll(".about-panel");
  aboutBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-target");
      aboutBtns.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
      aboutPanels.forEach(function (p) { p.classList.toggle("is-active", p.id === target); });
    });
  });

  // About: mobile accordion
  document.querySelectorAll(".about-panel__header").forEach(function (header) {
    header.addEventListener("click", function () {
      var open = header.parentElement.classList.toggle("is-open");
      header.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  // Article videos: play while on screen, pause off screen (muted inline demos)
  var vids = document.querySelectorAll("video[data-inview]");
  if ("IntersectionObserver" in window && vids.length) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    vids.forEach(function (v) { vio.observe(v); });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
