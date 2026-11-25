(() => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const overlay = document.querySelector(".nav-overlay");
  const body = document.body;

  const setMenu = (open) => {
    if (!overlay || !menuToggle) return;
    overlay.classList.toggle("is-open", open);
    body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "Close" : "Menu";
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      setMenu(!overlay.classList.contains("is-open"));
    });
  }

  overlay?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  const onScroll = () => {
    if (!header) return;
    const overHero = window.scrollY < window.innerHeight * 0.7;
    header.classList.toggle("is-over-hero", overHero && body.dataset.page === "home");
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  const form = document.querySelector(".contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const first = String(data.get("first") || "").trim();
    const last = String(data.get("last") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Booking enquiry — ${first} ${last}`.trim());
    const body = encodeURIComponent(
      `Name: ${first} ${last}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
    );
    window.location.href = `mailto:myriam.bentaou@hotmail.co.uk?subject=${subject}&body=${body}`;
    form.classList.add("is-sent");
  });
})();
