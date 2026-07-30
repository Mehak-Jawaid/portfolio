const header = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = Array.from(navMenu.querySelectorAll("a"));
const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

const yearSlot = document.getElementById("year");
if (yearSlot) {
    yearSlot.textContent = new Date().getFullYear();
}

const closeMenu = () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
};

navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const setActiveLink = (id) => {
    navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
};

const spy = new IntersectionObserver(
    (entries) => {
        entries
            .filter((entry) => entry.isIntersecting)
            .forEach((entry) => setActiveLink(entry.target.id));
    },
    { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => spy.observe(section));

const revealer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
    revealer.observe(element);
});
