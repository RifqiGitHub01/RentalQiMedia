/**
 * PRICELIST MULTIMEDIA - VANILLA JAVASCRIPT
 * Fitur: Pengatur QTY Real-Time (Single & Dual Options), Opsi Transportasi,
 * Floating Order Summary, Modal Konfirmasi Persetujuan, & WhatsApp Checkout.
 * Ringan, cepat, tanpa dependensi eksternal.
 */

// ==========================================================================
// 1. KONFIGURASI WHATSAPP
// Format: Gunakan kode negara 62 tanpa simbol (+) atau spasi. Contoh: 6281234567890
// ==========================================================================
const WHATSAPP_CONFIG = {
  phoneNumber: "6285156266150",
  storeName: "Qi Media",
};

const TRANSPORT_FEE = 100000; // Biaya Transportasi Antar-Jemput

document.addEventListener("DOMContentLoaded", () => {
  // ========================================================================
  // 2. STATE KERANJANG SEWA & LAYANAN TAMBAHAN
  // ========================================================================
  const cartState = {};
  let isTransportSelected = false;

  // Elemen DOM Floating Summary
  const floatingBar = document.getElementById("floatingOrderBar");
  const totalItemsEl = document.getElementById("totalSelectedItems");
  const totalAmountEl = document.getElementById("totalOrderAmount");
  const btnCheckoutWA = document.getElementById("btnCheckoutWA");
  const backToTopBtn = document.getElementById("backToTop");

  // Elemen Checkbox Transportasi (Section Bawah & Floating Bar)
  const transportCheckbox = document.getElementById("transportCheckbox");
  const transportFloatingCheckbox = document.getElementById(
    "transportFloatingCheckbox",
  );

  // Elemen DOM Modal Konfirmasi & Persetujuan
  const orderModal = document.getElementById("orderModal");
  const btnModalClose = document.getElementById("btnModalClose");
  const btnModalCancel = document.getElementById("btnModalCancel");
  const btnModalProceed = document.getElementById("btnModalProceed");
  const agreementCheckbox = document.getElementById("agreementCheckbox");
  const modalItemsList = document.getElementById("modalItemsList");
  const modalItemCounter = document.getElementById("modalItemCounter");
  const modalTransportRow = document.getElementById("modalTransportRow");
  const modalTotalAmount = document.getElementById("modalTotalAmount");

  /**
   * Format angka menjadi mata uang Rupiah (IDR)
   * @param {number} number
   * @returns {string} Contoh: Rp 250.000
   */
  function formatRupiah(number) {
    return "Rp " + number.toLocaleString("id-ID");
  }

  /**
   * Perbarui tampilan akumulasi pesanan secara real-time
   */
  function updateOrderSummary() {
    let totalQty = 0;
    let itemsTotal = 0;

    Object.values(cartState).forEach((item) => {
      totalQty += item.qty;
      itemsTotal += item.qty * item.price;
    });

    const grandTotal = itemsTotal + (isTransportSelected ? TRANSPORT_FEE : 0);

    if (totalItemsEl) {
      totalItemsEl.textContent = totalQty;
    }

    if (totalAmountEl) {
      totalAmountEl.textContent = formatRupiah(grandTotal);
    }

    // Tampilkan atau sembunyikan floating bar secara dinamis
    if (floatingBar) {
      if (totalQty > 0) {
        floatingBar.classList.add("active");
        if (backToTopBtn) {
          backToTopBtn.classList.add("offset-above-bar");
        }
      } else {
        floatingBar.classList.remove("active");
        if (backToTopBtn) {
          backToTopBtn.classList.remove("offset-above-bar");
        }
      }
    }
  }

  // ========================================================================
  // 3. SINKRONISASI CHECKBOX TRANSPORTASI (ANTAR-JEMPUT EVENT)
  // ========================================================================
  function handleTransportToggle(isChecked) {
    isTransportSelected = isChecked;
    if (transportCheckbox) transportCheckbox.checked = isChecked;
    if (transportFloatingCheckbox)
      transportFloatingCheckbox.checked = isChecked;
    updateOrderSummary();
  }

  if (transportCheckbox) {
    transportCheckbox.addEventListener("change", (e) => {
      handleTransportToggle(e.target.checked);
    });
  }

  if (transportFloatingCheckbox) {
    transportFloatingCheckbox.addEventListener("change", (e) => {
      handleTransportToggle(e.target.checked);
    });
  }

  // ========================================================================
  // 4. LOGIKA KONTROL QTY (+ DAN -) UNTUK SINGLE & DUAL OPTIONS
  // ========================================================================
  const qtyControls = document.querySelectorAll(".card-qty-control");

  qtyControls.forEach((control) => {
    const optionRow = control.closest(".card-option-row");
    const parentCard = control.closest(".product-card");

    // Ambil metadata produk baik dari option row (dual) atau card (single)
    const itemId = optionRow ? optionRow.dataset.id : parentCard.dataset.id;
    const itemName = optionRow
      ? optionRow.dataset.name
      : parentCard.dataset.name;
    const itemPrice =
      parseInt(
        optionRow ? optionRow.dataset.price : parentCard.dataset.price,
        10,
      ) || 0;

    const btnPlus = control.querySelector(".qty-btn-plus");
    const btnMinus = control.querySelector(".qty-btn-minus");
    const qtyValueEl = control.querySelector(".qty-value");

    if (!btnPlus || !btnMinus || !qtyValueEl || !itemId) return;

    // Event Klik Tambah (+)
    btnPlus.addEventListener("click", (e) => {
      e.stopPropagation();

      if (!cartState[itemId]) {
        cartState[itemId] = {
          name: itemName,
          price: itemPrice,
          qty: 0,
        };
      }

      cartState[itemId].qty += 1;
      const currentQty = cartState[itemId].qty;

      // Update Tampilan DOM
      qtyValueEl.textContent = currentQty;
      btnMinus.removeAttribute("disabled");

      if (optionRow) {
        optionRow.classList.add("has-qty");
      }
      if (parentCard) {
        parentCard.classList.add("has-qty");
      }

      updateOrderSummary();
    });

    // Event Klik Kurang (-)
    btnMinus.addEventListener("click", (e) => {
      e.stopPropagation();

      if (!cartState[itemId] || cartState[itemId].qty <= 0) return;

      cartState[itemId].qty -= 1;
      const currentQty = cartState[itemId].qty;

      // Update Tampilan DOM
      qtyValueEl.textContent = currentQty;

      if (currentQty <= 0) {
        btnMinus.setAttribute("disabled", "true");
        if (optionRow) {
          optionRow.classList.remove("has-qty");
        }
        delete cartState[itemId];

        // Periksa apakah kartu masih memiliki item opsi lain yang aktif
        if (parentCard) {
          const anyActiveInCard = Array.from(
            parentCard.querySelectorAll(".qty-value"),
          ).some((el) => parseInt(el.textContent, 10) > 0);

          if (!anyActiveInCard) {
            parentCard.classList.remove("has-qty");
          }
        }
      }

      updateOrderSummary();
    });
  });

  // ========================================================================
  // 5. LOGIKA MODAL RINGKASAN PESANAN & PERSETUJUAN WAJIB
  // ========================================================================
  function openModal() {
    const selectedItems = Object.values(cartState).filter(
      (item) => item.qty > 0,
    );

    if (selectedItems.length === 0) {
      alert(
        "Silakan pilih minimal 1 peralatan multimedia sebelum melanjutkan ke pemesanan.",
      );
      return;
    }

    // Render daftar item pada modal
    modalItemsList.innerHTML = "";
    let itemsTotal = 0;
    let totalQuantity = 0;

    selectedItems.forEach((item) => {
      const subtotal = item.qty * item.price;
      itemsTotal += subtotal;
      totalQuantity += item.qty;

      const isAddon = item.name.startsWith("+");
      const unitLabel = isAddon ? `${item.qty}x` : `${item.qty} unit`;

      const itemRow = document.createElement("div");
      itemRow.className = "modal-item-row";
      itemRow.innerHTML = `
        <div class="modal-item-info">
          <span class="modal-item-name">${item.name}</span>
          <span class="modal-item-meta">${unitLabel} &times; ${formatRupiah(item.price)}/hari</span>
        </div>
        <span class="modal-item-subtotal">${formatRupiah(subtotal)}</span>
      `;
      modalItemsList.appendChild(itemRow);
    });

    if (modalItemCounter) {
      modalItemCounter.textContent = `${totalQuantity} Pilihan`;
    }

    // Tampilkan / sembunyikan baris transportasi
    if (modalTransportRow) {
      if (isTransportSelected) {
        modalTransportRow.style.display = "flex";
        itemsTotal += TRANSPORT_FEE;
      } else {
        modalTransportRow.style.display = "none";
      }
    }

    // Update total akhir pada modal
    if (modalTotalAmount) {
      modalTotalAmount.textContent = formatRupiah(itemsTotal);
    }

    // Reset status persetujuan wajib
    if (agreementCheckbox) {
      agreementCheckbox.checked = false;
    }
    if (btnModalProceed) {
      btnModalProceed.setAttribute("disabled", "true");
    }

    // Tampilkan modal dialog
    if (orderModal) {
      orderModal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (orderModal) {
      orderModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  // Buka modal saat tombol checkout floating diklik
  if (btnCheckoutWA) {
    btnCheckoutWA.addEventListener("click", openModal);
  }

  // Tutup modal
  if (btnModalClose) {
    btnModalClose.addEventListener("click", closeModal);
  }
  if (btnModalCancel) {
    btnModalCancel.addEventListener("click", closeModal);
  }
  if (orderModal) {
    orderModal.addEventListener("click", (e) => {
      if (e.target === orderModal) {
        closeModal();
      }
    });
  }

  // Kontrol aktivasi tombol 'Lanjut Pesan' berdasarkan checkbox persetujuan
  if (agreementCheckbox && btnModalProceed) {
    agreementCheckbox.addEventListener("change", () => {
      if (agreementCheckbox.checked) {
        btnModalProceed.removeAttribute("disabled");
      } else {
        btnModalProceed.setAttribute("disabled", "true");
      }
    });
  }

  // ========================================================================
  // 6. CHECKOUT WHATSAPP: REDIRECT DENGAN FORMAT LENGKAP
  // ========================================================================
  if (btnModalProceed) {
    btnModalProceed.addEventListener("click", () => {
      if (!agreementCheckbox || !agreementCheckbox.checked) {
        alert(
          "Harap setujui klausul pertanggungjawaban unit sebelum melanjutkan.",
        );
        return;
      }

      const selectedItems = Object.values(cartState).filter(
        (item) => item.qty > 0,
      );

      if (selectedItems.length === 0) return;

      let grandTotal = 0;
      let orderListText = "";

      selectedItems.forEach((item, index) => {
        const itemSubtotal = item.qty * item.price;
        grandTotal += itemSubtotal;

        const isAddon = item.name.startsWith("+");
        const unitLabel = isAddon ? `${item.qty}x` : `${item.qty} unit`;
        const priceLabel = isAddon ? "Biaya Add-on" : "Tarif";

        if (item.qty === 1) {
          orderListText += `${index + 1}. *${item.name}* (${unitLabel})\n   └ ${priceLabel}: ${formatRupiah(item.price)}/hari\n`;
        } else {
          orderListText += `${index + 1}. *${item.name}* (${unitLabel})\n   └ Subtotal: ${formatRupiah(itemSubtotal)}/hari (@ ${formatRupiah(item.price)})\n`;
        }
      });

      let transportText = "";
      if (isTransportSelected) {
        grandTotal += TRANSPORT_FEE;
        transportText = `\n🚚 *LAYANAN TAMBAHAN:*\n• Antar Jemput ke Lokasi Event: ${formatRupiah(TRANSPORT_FEE)} (PP)\n`;
      }

      // Susun format template pesan WhatsApp
      const message = `Halo Admin ${WHATSAPP_CONFIG.storeName}, saya ingin menyewa peralatan multimedia berikut:

📋 *RINCIAN SEWA PERALATAN:*
${orderListText}${transportText}
💰 *TOTAL ESTIMASI BIAYA:* ${formatRupiah(grandTotal)}/hari

⚠️ *KETENTUAN & PERNYATAAN SEWA:*
Saya telah memahami dan menyetujui ketentuan:
_"Saya mengerti dan setuju bahwa jika unit yang disewa hilang, saya wajib membayar ganti rugi senilai unit tersebut"._

Apakah unit-unit tersebut tersedia untuk jadwal sewa saya? Mohon informasi persyaratan dan prosedur sewanya. Terima kasih!`;

      // Redirect ke WhatsApp API
      const waUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");

      closeModal();
    });
  }

  // ========================================================================
  // 7. INISIALISASI TAHUN DINAMIS PADA FOOTER
  // ========================================================================
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ========================================================================
  // 8. TOMBOL BACK TO TOP
  // ========================================================================
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

  // ========================================================================
  // 9. FALLBACK GAMBAR OTOMATIS (JIKA FILE FOTO BELUM TERSEDIA / RUSAK)
  // ========================================================================
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

  // ========================================================================
  // 10. FADE-IN ANIMATION SAAT SCROLL (INTERSECTION OBSERVER)
  // ========================================================================
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
