/* ===========================
   PHOTON STUDIOS — script.js
   =========================== */

// ---- Navbar scroll effect ----
window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', scrollY > 50);
});

// ---- Scroll reveal ----
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('v');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.r').forEach(el => observer.observe(el));
