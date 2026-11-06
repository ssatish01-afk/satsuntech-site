/* SatSun Tech — shared site script (no dependencies) */
(function () {
  "use strict";

  /* ---- Config -----------------------------------------------------------
     Set GA_MEASUREMENT_ID to your GA4 web-stream ID (e.g. "G-XXXXXXXXXX")
     to enable analytics on every page. Leave empty to keep analytics off. */
  var GA_MEASUREMENT_ID = "";

  /* ---- Mobile navigation ---------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---- Mark the current page in the nav ------------------------------- */
  var path = window.location.pathname.replace(/index\.html$/, "");
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    if (href === path || (href !== "/" && path.indexOf(href) === 0)) {
      a.setAttribute("aria-current", "page");
    }
  });

  /* ---- Reveal on scroll ------------------------------------------------ */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal");

  if (!reduced && targets.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      observer.observe(el);
    });
  } else {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---- External links open in a new tab -------------------------------- */
  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    if (a.hostname && a.hostname !== window.location.hostname) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    }
  });

  /* ---- Footer year ----------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---- Google Analytics 4 (only when an ID is set) ---------------------- */
  if (GA_MEASUREMENT_ID) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });

    // Count store/app clicks so you can see which page sends installs.
    document.querySelectorAll("[data-track]").forEach(function (a) {
      a.addEventListener("click", function () {
        window.gtag("event", "app_link_click", {
          link_name: a.getAttribute("data-track"),
          page_path: window.location.pathname
        });
      });
    });
  }
})();
