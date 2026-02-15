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

// ---- Store: Search, Filter & Click (only runs on store page) ----
// ---- Donate form handler (only runs on donate page) ----
document.addEventListener('DOMContentLoaded', () => {

    // == STORE LOGIC ==
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');
    const gameCards = document.querySelectorAll('.game-card');
    const noResults = document.getElementById('no-results');

    if (searchBar && categoryFilter) {
        function filterGames() {
            const search = searchBar.value.toLowerCase();
            const category = categoryFilter.value;
            let visible = 0;

            gameCards.forEach(card => {
                const title = card.dataset.title.toLowerCase();
                const cat = card.dataset.category;
                const show = title.includes(search) && (category === 'all' || cat === category);
                card.style.display = show ? '' : 'none';
                if (show) visible++;
            });

            noResults.style.display = visible === 0 ? 'block' : 'none';
        }

        searchBar.addEventListener('input', filterGames);
        categoryFilter.addEventListener('change', filterGames);

        // Click to open game
        gameCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const link = card.dataset.link;
                if (link && link !== '#') window.location.href = link;
            });
        });
    }

    // == DONATE LOGIC ==
    const donateForm = document.getElementById('donate-form');
    const donateThanks = document.getElementById('donate-thanks');
    const donateSubmit = document.getElementById('donate-submit');

    if (donateForm && donateThanks && donateSubmit) {
        donateForm.addEventListener('submit', () => {
            donateThanks.textContent = '🎉 Thank you for supporting Photon Studios! We\'ll confirm your reward via email soon.';
            donateThanks.classList.add('show');
            donateSubmit.disabled = true;
            donateSubmit.textContent = 'Sending...';
        });
    }
});
