# 📁 instructureDev.md — Panduan Teknis Developer

> File ini berisi panduan teknis untuk mengelola aset gambar dan menyesuaikan konten website Pricelist Multimedia.

---

## 1. Struktur Folder Proyek

Setelah Anda mengekstrak semua file, struktur folder yang benar adalah sebagai berikut:

```
pricelist-multimedia/          ← root folder proyek
│
├── index.html                 ← halaman utama website
├── style.css                  ← semua styling / tampilan
├── script.js                  ← logika ringan & animasi
├── instructureDev.md          ← file panduan ini
│
└── assets/
    └── images/                ← ⚠️ BUAT FOLDER INI SECARA MANUAL
        ├── iphone-13.jpg
        ├── iphone-17-pro.jpg
        ├── samsung-s23-ultra.jpg
        ├── samsung-s24-ultra.jpg
        ├── samsung-s25-ultra.jpg
        ├── sony-a6400.jpg
        ├── sony-a6700.jpg
        ├── sony-zv-e10.jpg
        ├── lensa-35mm.jpg
        ├── dji-osmo-mobile-7.jpg
        ├── dji-rs3-basic.jpg
        ├── zhiyun-weebill-s.jpg
        ├── hollyland-lark-m2.jpg
        ├── hollyland-lark-m2s.jpg
        ├── dji-mic-2.jpg
        ├── godox-sl60w.jpg
        └── godox-sl60w-x2.jpg
```

### Cara membuat folder `assets/images`:

**Di Windows (File Explorer):**
```
Klik kanan di dalam folder proyek → New → Folder → beri nama "assets"
Masuk ke folder assets → buat folder lagi bernama "images"
```

**Di Terminal / PowerShell:**
```powershell
mkdir assets\images
```

**Di Terminal Mac/Linux:**
```bash
mkdir -p assets/images
```

---

## 2. Panduan Mengganti Gambar di `index.html`

Setiap produk memiliki satu tag `<img>` di dalam `index.html`. Untuk mengganti placeholder dengan foto asli, ubah nilai atribut **`src`** pada tag tersebut.

### Format atribut `src`:
```
src="assets/images/NAMA-FILE-GAMBAR.jpg"
```

### Daftar lengkap tag `<img>` yang harus diperbarui:

| Produk | Baris di index.html | Nilai `src` yang harus diisi |
|---|---|---|
| iPhone 13 | ~37 | `assets/images/iphone-13.jpg` |
| iPhone 17 Pro | ~50 | `assets/images/iphone-17-pro.jpg` |
| Samsung S23 Ultra | ~63 | `assets/images/samsung-s23-ultra.jpg` |
| Samsung S24 Ultra | ~76 | `assets/images/samsung-s24-ultra.jpg` |
| Samsung S25 Ultra | ~89 | `assets/images/samsung-s25-ultra.jpg` |
| Sony A6400 | ~118 | `assets/images/sony-a6400.jpg` |
| Sony A6700 | ~132 | `assets/images/sony-a6700.jpg` |
| Sony ZV-E10 | ~146 | `assets/images/sony-zv-e10.jpg` |
| Lensa 35MM | ~160 | `assets/images/lensa-35mm.jpg` |
| DJI Osmo Mobile 7 | ~187 | `assets/images/dji-osmo-mobile-7.jpg` |
| DJI RS 3 Basic | ~200 | `assets/images/dji-rs3-basic.jpg` |
| Zhiyun Weebill S | ~213 | `assets/images/zhiyun-weebill-s.jpg` |
| Hollyland Lark M2 | ~233 | `assets/images/hollyland-lark-m2.jpg` |
| Hollyland Lark M2s | ~246 | `assets/images/hollyland-lark-m2s.jpg` |
| DJI Mic 2 | ~259 | `assets/images/dji-mic-2.jpg` |
| Godox SL60W | ~279 | `assets/images/godox-sl60w.jpg` |
| Godox SL60W x2 | ~292 | `assets/images/godox-sl60w-x2.jpg` |

### Contoh sebelum dan sesudah:

**Sebelum (placeholder aktif):**
```html
<img
  src="assets/images/iphone-13.jpg"
  alt="iPhone 13"
  class="card-img"
  onerror="this.src='https://placehold.co/400x300/e8f0fe/3b82d4?text=iPhone+13'"
/>
```

**Sesudah (foto sudah tersedia di folder):**
```html
<img
  src="assets/images/iphone-13.jpg"
  alt="iPhone 13"
  class="card-img"
  onerror="this.src='https://placehold.co/400x300/e8f0fe/3b82d4?text=iPhone+13'"
/>
```

> ✅ Selama nama file di folder dan nilai `src` di HTML cocok, gambar akan otomatis muncul.
> ⚠️ Atribut `onerror` adalah fallback: jika file gambar tidak ditemukan, akan muncul placeholder biru secara otomatis. Anda boleh menghapus `onerror` setelah semua foto sudah tersedia.

---

## 3. Aturan Penamaan File Gambar

Ikuti aturan berikut agar gambar tidak error:

| Aturan | ✅ Benar | ❌ Salah |
|---|---|---|
| Gunakan huruf kecil semua | `iphone-13.jpg` | `iPhone-13.jpg` |
| Gunakan tanda `-` sebagai pemisah | `sony-a6400.jpg` | `sony a6400.jpg` |
| Jangan ada spasi | `dji-mic-2.jpg` | `dji mic 2.jpg` |
| Sesuaikan ekstensi | `godox-sl60w.jpg` | `godox-sl60w.JPG` |

**Format gambar yang didukung:** `.jpg`, `.jpeg`, `.png`, `.webp`
> Jika menggunakan format `.png` atau `.webp`, ubah ekstensi di atribut `src` di HTML agar sesuai.

---

## 4. Cara Mengubah Gambar via `script.js` (Metode Alternatif)

Jika Anda lebih suka mengatur semua path gambar dari **satu tempat**, Anda bisa menggunakan array `PRODUCTS` di dalam `script.js`.

### Langkah-langkah:

**Langkah 1** — Buka `script.js`, temukan array `PRODUCTS` (sekitar baris 65–87).
Ubah nilai `imgSrc` sesuai nama file Anda:

```js
// script.js — baris ~65
const PRODUCTS = [
  { id: 'iphone-13', imgSrc: 'assets/images/iphone-13.jpg', altText: 'iPhone 13' },
  // dst...
];
```

**Langkah 2** — Di setiap `<img>` di `index.html`, tambahkan atribut `data-product-id`:

```html
<!-- Tambahkan data-product-id="iphone-13" seperti berikut: -->
<img
  data-product-id="iphone-13"
  src="assets/images/iphone-13.jpg"
  alt="iPhone 13"
  class="card-img"
/>
```

**Langkah 3** — Di `script.js`, baris terakhir, **uncomment** baris pemanggilan fungsi:

```js
// Sebelum (tidak aktif):
// injectImages();

// Sesudah (aktif):
injectImages();
```

---

## 5. Cara Mengubah Tampilan (style.css)

### Ganti Warna Aksen

Buka `style.css`, temukan blok `:root` di bagian atas (baris ~17). Ubah nilai variabel berikut:

```css
:root {
  --color-accent:   #3b82d4;  /* ← Warna biru utama: judul, harga, border hover */
  --color-accent2:  #2563b8;  /* ← Warna biru gelap saat hover */
  --color-bg:       #f5f7fa;  /* ← Warna latar halaman */
  --color-surface:  #ffffff;  /* ← Warna latar card produk */
}
```

### Ubah Ukuran Card

Di `style.css`, cari class `.product-grid` (baris ~130):

```css
.product-grid {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  /*                                               ↑
     Ubah 220px untuk memperbesar/memperkecil lebar minimum card.
     Contoh: 180px = lebih kecil, 280px = lebih besar            */
}
```

### Ubah Rasio Gambar Card

Di `style.css`, cari class `.card-image-wrapper` (baris ~145):

```css
.card-image-wrapper {
  padding-bottom: 75%;   /* 4:3 */
  /* Ganti dengan:
     56.25%  untuk rasio 16:9
     100%    untuk rasio 1:1 (kotak)   */
}
```

---

## 6. Cara Menambah Produk Baru

**Langkah 1** — Siapkan gambar dan letakkan di `assets/images/nama-produk-baru.jpg`

**Langkah 2** — Buka `index.html`, temukan section kategori yang sesuai (ditandai komentar `<!-- KATEGORI ... -->`).

**Langkah 3** — Copy salah satu blok card yang sudah ada, lalu tempel di dalam `<div class="product-grid">`. Ubah nilai berikut:

```html
<div class="product-card">
  <div class="card-image-wrapper">
    <img
      src="assets/images/nama-produk-baru.jpg"    <!-- ← Ganti src -->
      alt="Nama Produk Baru"                       <!-- ← Ganti alt -->
      class="card-img"
      onerror="this.src='https://placehold.co/400x300/e8f0fe/3b82d4?text=Nama+Produk'"
    />
  </div>
  <div class="card-body">
    <h3 class="card-name">Nama Produk Baru</h3>     <!-- ← Nama produk -->
    <p class="card-note">Catatan opsional</p>        <!-- ← Hapus baris ini jika tidak perlu -->
    <p class="card-price">Rp 000.000 <span class="price-unit">/ hari</span></p>
  </div>
</div>
```

**Langkah 4** — Jika menggunakan metode `script.js`, tambahkan juga entri baru di array `PRODUCTS`:

```js
{ id: 'nama-produk-baru', imgSrc: 'assets/images/nama-produk-baru.jpg', altText: 'Nama Produk Baru' },
```

---

## 7. Deploy ke Vercel atau Netlify

Website ini adalah **static site murni** — tidak butuh build step apapun.

### Vercel:
1. Push folder proyek ke GitHub
2. Login ke [vercel.com](https://vercel.com) → **Add New Project**
3. Import repo → biarkan semua setting default → **Deploy**

### Netlify:
1. Login ke [netlify.com](https://www.netlify.com) → **Add new site**
2. Pilih **Deploy manually** → drag & drop seluruh folder proyek
3. *Atau* hubungkan ke GitHub repo untuk auto-deploy

> ✅ Pastikan folder `assets/images/` dan semua file gambar sudah di-push ke repo sebelum deploy.

---

*File ini dibuat otomatis sebagai panduan teknis proyek Pricelist Multimedia.*
