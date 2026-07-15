const toggleButton = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggleButton && navLinks) {
  toggleButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      toggleButton.setAttribute("aria-expanded", "false");
    });
  });
}

const revealTargets = document.querySelectorAll(
  ".section-grid, .section-heading, .product-card, .feature-card, .callout-card, .contact-card, .legal-copy"
);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && revealTargets.length) {
  const isMobileViewport = window.matchMedia("(max-width: 560px)").matches;

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealTargets.forEach((target, index) => {
    target.classList.add("reveal-on-scroll");

    const isCard =
      target.classList.contains("product-card") ||
      target.classList.contains("feature-card");

    if (isMobileViewport && isCard) {
      target.classList.add(index % 2 === 0 ? "reveal-from-left" : "reveal-from-right");
    } else {
      target.classList.add("reveal-up-soft");
    }

    const staggerDelay = isMobileViewport && isCard ? 90 : 60;
    target.style.transitionDelay = `${Math.min(index * staggerDelay, 280)}ms`;
    revealObserver.observe(target);
  });
}
