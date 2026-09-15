/**
 * PRICELIST MULTIMEDIA - VANILLA JAVASCRIPT
 * Ringan, cepat, tanpa dependensi eksternal.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Tahun Dinamis pada Footer
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Tombol Back to Top
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 350) {
          backToTopBtn.classList.add("visible");
        } else {
          backToTopBtn.classList.remove("visible");
        }
      },
      { passive: true },
    );

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 3. Fallback Gambar Otomatis (Jika File Belum Tersedia atau Rusak)
  // Menghasilkan placeholder SVG bertema studio multimedia 9:16 yang elegan
  const fallbackSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 640" width="360" height="640">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e0f2fe" />
          <stop offset="50%" stop-color="#bfdbfe" />
          <stop offset="100%" stop-color="#93c5fd" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrad)" />
      <g transform="translate(180, 290)" text-anchor="middle">
        <circle cx="0" cy="-30" r="45" fill="#2563eb" opacity="0.15" />
        <path d="M-22,-45 L-12,-45 L-7,-52 L7,-52 L12,-45 L22,-45 C25,-45 27,-43 27,-40 L27,-18 C27,-15 25,-13 22,-13 L-22,-13 C-25,-13 -27,-15 -27,-18 L-27,-40 C-27,-43 -25,-45 -22,-45 Z M0,-22 C5.5,-22 10,-26.5 10,-32 C10,-37.5 5.5,-42 0,-42 C-5.5,-42 -10,-37.5 -10,-32 C-10,-26.5 -5.5,-22 0,-22 Z" fill="#2563eb" />
        <text y="40" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" fill="#1e3a8a">Foto Belum Tersedia</text>
        <text y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#475569">Lihat instructureDev.md</text>
      </g>
    </svg>
  `)}`;

  const productImages = document.querySelectorAll(".card-img");
  productImages.forEach((img) => {
    img.addEventListener("error", function () {
      if (this.src !== fallbackSvg) {
        this.src = fallbackSvg;
        this.alt = "Placeholder Gambar Multimedia";
      }
    });
  });

  // 4. Subtle Fade-in Animation pada Scroll Menggunakan Intersection Observer
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    const cards = document.querySelectorAll(".product-card");
    cards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(16px)";
      card.style.transition = `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${(index % 4) * 0.08}s`;
      observer.observe(card);
    });
  }
});
