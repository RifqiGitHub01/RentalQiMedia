/**
 * script.js — Pricelist Sewa Peralatan Multimedia
 *
 * File ini menangani perilaku ringan halaman:
 *  1. Lazy loading gambar (untuk performa di koneksi lambat)
 *  2. Fallback jika file gambar tidak ditemukan (sudah ditangani juga via onerror di HTML)
 *  3. Animasi fade-in card saat pertama kali masuk viewport
 *
 * Tidak ada framework — Vanilla JS murni.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. INTERSECTION OBSERVER — Animasi fade-in card
     Setiap .product-card akan fade-in saat masuk ke viewport.
     Untuk menonaktifkan animasi ini, hapus atau komentari
     seluruh blok "INTERSECTION OBSERVER" di bawah.
  ============================================================ */
  const cards = document.querySelectorAll('.product-card');

  // Set semua card jadi transparan + sedikit geser ke bawah sebelum terlihat
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          // Hentikan observasi setelah animasi dijalankan
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,   // Animasi dimulai saat 10% card terlihat
      rootMargin: '0px 0px -20px 0px'
    }
  );

  cards.forEach(card => observer.observe(card));


  /* ============================================================
     2. IMAGE DATA — Sinkronisasi nama file gambar
     ============================================================
     Bagian ini adalah REFERENSI UTAMA untuk sinkronisasi gambar.
     Setiap objek di array PRODUCTS di bawah mendefinisikan:
       - id        : ID unik produk (tidak perlu diubah)
       - imgSrc    : PATH FILE GAMBAR — INI YANG ANDA UBAH
                     setelah menaruh foto ke folder assets/images/
       - altText   : Teks alternatif gambar (untuk aksesibilitas & SEO)

     CARA SINKRONISASI GAMBAR VIA script.js:
     ----------------------------------------
     Secara default, src gambar sudah didefinisikan langsung di index.html.
     Fungsi injectImages() di bawah ini adalah METODE ALTERNATIF:
     jika Anda lebih suka mengatur semua path gambar dari satu tempat
     (file JS ini), aktifkan fungsi injectImages() dengan uncomment baris
     terakhir di file ini.

     Selama injectImages() tidak dipanggil, HTML menggunakan src-nya sendiri.
  ============================================================ */
  const PRODUCTS = [
    // ── iPhone & Samsung ──────────────────────────────────────
    { id: 'iphone-13',       imgSrc: 'assets/images/iphone-13.jpg',       altText: 'iPhone 13' },
    { id: 'iphone-17-pro',   imgSrc: 'assets/images/iphone-17-pro.jpg',   altText: 'iPhone 17 Pro' },
    { id: 'samsung-s23',     imgSrc: 'assets/images/samsung-s23-ultra.jpg', altText: 'Samsung S23 Ultra' },
    { id: 'samsung-s24',     imgSrc: 'assets/images/samsung-s24-ultra.jpg', altText: 'Samsung S24 Ultra' },
    { id: 'samsung-s25',     imgSrc: 'assets/images/samsung-s25-ultra.jpg', altText: 'Samsung S25 Ultra' },

    // ── Sony Mirrorless & Lensa ───────────────────────────────
    { id: 'sony-a6400',      imgSrc: 'assets/images/sony-a6400.jpg',      altText: 'Sony A6400' },
    { id: 'sony-a6700',      imgSrc: 'assets/images/sony-a6700.jpg',      altText: 'Sony A6700' },
    { id: 'sony-zv-e10',     imgSrc: 'assets/images/sony-zv-e10.jpg',     altText: 'Sony ZV-E10' },
    { id: 'lensa-35mm',      imgSrc: 'assets/images/lensa-35mm.jpg',      altText: 'Lensa 35MM E-Mount' },

    // ── Stabilizer ────────────────────────────────────────────
    { id: 'dji-osmo-7',      imgSrc: 'assets/images/dji-osmo-mobile-7.jpg', altText: 'DJI Osmo Mobile 7' },
    { id: 'dji-rs3',         imgSrc: 'assets/images/dji-rs3-basic.jpg',   altText: 'DJI RS 3 Basic' },
    { id: 'zhiyun-weebill',  imgSrc: 'assets/images/zhiyun-weebill-s.jpg', altText: 'Zhiyun Weebill S' },

    // ── Microphone ────────────────────────────────────────────
    { id: 'lark-m2',         imgSrc: 'assets/images/hollyland-lark-m2.jpg',  altText: 'Hollyland Lark M2 Combo' },
    { id: 'lark-m2s',        imgSrc: 'assets/images/hollyland-lark-m2s.jpg', altText: 'Hollyland Lark M2s Combo' },
    { id: 'dji-mic-2',       imgSrc: 'assets/images/dji-mic-2.jpg',       altText: 'DJI Mic 2' },

    // ── Lighting ──────────────────────────────────────────────
    { id: 'godox-sl60w',     imgSrc: 'assets/images/godox-sl60w.jpg',     altText: 'Godox SL60W' },
    { id: 'godox-sl60w-x2',  imgSrc: 'assets/images/godox-sl60w-x2.jpg',  altText: 'Godox SL60W x2' },
  ];

  /**
   * injectImages()
   * Membaca array PRODUCTS di atas dan mengaplikasikan imgSrc + altText
   * ke elemen <img> yang memiliki data-product-id yang sesuai di index.html.
   *
   * AKTIFKAN FUNGSI INI jika Anda ingin mengatur semua gambar dari JS:
   *   1. Tambahkan atribut data-product-id="<id>" ke setiap <img> di index.html
   *      Contoh: <img data-product-id="iphone-13" class="card-img" ... />
   *   2. Uncomment baris  injectImages();  di paling bawah file ini.
   */
  function injectImages() {
    PRODUCTS.forEach(product => {
      const imgEl = document.querySelector(`img[data-product-id="${product.id}"]`);
      if (imgEl) {
        imgEl.src = product.imgSrc;
        imgEl.alt = product.altText;
      }
    });
  }

  // Uncomment baris di bawah untuk mengaktifkan injeksi gambar via JS:
  // injectImages();

}); // END DOMContentLoaded
