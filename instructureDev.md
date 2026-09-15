# Panduan Teknis Pengembang (instructureDev.md)

## Dokumentasi & Petunjuk Penggantian Aset Foto Website Pricelist Multimedia

Dokumen ini ditujukan sebagai panduan teknis bagi Anda untuk mengelola, menyimpan, dan mengganti seluruh gambar produk pada website pricelist penyewaan peralatan multimedia.

---

## 1. Struktur Folder Penyimpanan Gambar

Seluruh file foto produk Anda harus ditempatkan di dalam direktori `assets/images/`. Untuk menjaga keteraturan proyek, folder telah dibagi berdasarkan kategori produk sebagai berikut:

```text
r:/Pricelist Multimedia2/
│
├── index.html                  <-- File HTML utama
├── css/
│   └── style.css               <-- File styling CSS
├── js/
│   └── script.js               <-- File logika interaktif & fallback
│
└── assets/
    └── images/
        ├── phones/             <-- Simpan foto iPhone & Samsung di sini
        ├── cameras/            <-- Simpan foto Sony Mirrorless & Lensa di sini
        ├── stabilizers/        <-- Simpan foto Gimbal / Stabilizer di sini
        ├── audio/              <-- Simpan foto Microphone & Wireless Mic di sini
        └── lighting/           <-- Simpan foto Lampu Studio Godox di sini
```

---

## 2. Pemahaman Class CSS Gambar (Rasio Vertikal 9:16)

Website ini menggunakan wadah khusus dengan rasio vertikal **9:16** yang telah dioptimasi untuk berbagai macam ukuran gambar asli Anda (mulai dari resolusi terkecil **166 × 157** hingga terbesar **372 × 312**):

1. **Class Wadah: `.card-img-wrapper`**
   - Mengunci proporsi kartu menjadi vertikal tepat 9 banding 16 (`aspect-ratio: 9 / 16;`).
   - Menyembunyikan bagian foto yang berlebih (`overflow: hidden;`).
2. **Class Gambar: `.card-img`**
   - Memastikan foto Anda mengisi seluruh wadah tanpa penyok atau gepeng (`object-fit: cover; object-position: center;`).
   - Memberikan efek zoom halus saat kursor diarahkan ke kartu produk (`transition: transform 0.6s;`).

> **PENTING:** Jangan mengubah atau menghapus `class="card-img"` pada elemen `<img>` agar rasio dan penataan gambar tetap presisi dan rapi.

---

## 3. Tabel Pemetaan Baris Kode Penggantian Gambar (`index.html`)

Berikut adalah daftar lokasi baris kode yang **spesifik** di dalam file [index.html](file:///r:/Pricelist%20Multimedia2/index.html) beserta class dan nama file lokal yang disarankan:

| No  | Kategori                | Nama Barang                  | Baris Target di `index.html` | Target Class | Lokasi & Nama File Rekomendasi                    |
| :-: | :---------------------- | :--------------------------- | :--------------------------: | :----------: | :------------------------------------------------ |
|  1  | iPhone & Samsung        | **iPhone 13**                |         **Baris 48**         |  `card-img`  | `assets/images/phones/iphone-13.jpg`              |
|  2  | iPhone & Samsung        | **iPhone 17 Pro**            |         **Baris 69**         |  `card-img`  | `assets/images/phones/iphone-17-pro.jpg`          |
|  3  | iPhone & Samsung        | **Samsung 23 Ultra**         |         **Baris 90**         |  `card-img`  | `assets/images/phones/samsung-23-ultra.jpg`       |
|  4  | iPhone & Samsung        | **Samsung 24 Ultra**         |        **Baris 111**         |  `card-img`  | `assets/images/phones/samsung-24-ultra.jpg`       |
|  5  | iPhone & Samsung        | **Samsung 25 Ultra**         |        **Baris 132**         |  `card-img`  | `assets/images/phones/samsung-25-ultra.jpg`       |
|  6  | Sony Mirrorless & Lensa | **Sony A6400**               |        **Baris 176**         |  `card-img`  | `assets/images/cameras/sony-a6400.jpg`            |
|  7  | Sony Mirrorless & Lensa | **Sony A6700**               |        **Baris 197**         |  `card-img`  | `assets/images/cameras/sony-a6700.jpg`            |
|  8  | Sony Mirrorless & Lensa | **Sony ZV-E10**              |        **Baris 218**         |  `card-img`  | `assets/images/cameras/sony-zve10.jpg`            |
|  9  | Sony Mirrorless & Lensa | **Lensa 35MM**               |        **Baris 239**         |  `card-img`  | `assets/images/cameras/lensa-35mm.jpg`            |
| 10  | Stabilizer              | **DJI Osmo Mobile 7**        |        **Baris 273**         |  `card-img`  | `assets/images/stabilizers/dji-osmo-mobile-7.jpg` |
| 11  | Stabilizer              | **DJI RS 3 Basic**           |        **Baris 294**         |  `card-img`  | `assets/images/stabilizers/dji-rs3-basic.jpg`     |
| 12  | Stabilizer              | **Zhiyun Weebill S**         |        **Baris 315**         |  `card-img`  | `assets/images/stabilizers/zhiyun-weebill-s.jpg`  |
| 13  | Microphone              | **Hollyland Lark M2 Combo**  |        **Baris 349**         |  `card-img`  | `assets/images/audio/hollyland-lark-m2.jpg`       |
| 14  | Microphone              | **Hollyland Lark M2s Combo** |        **Baris 370**         |  `card-img`  | `assets/images/audio/hollyland-lark-m2s.jpg`      |
| 15  | Microphone              | **DJI Mic 2**                |        **Baris 391**         |  `card-img`  | `assets/images/audio/dji-mic-2.jpg`               |
| 16  | Lighting                | **Godox SL60W**              |        **Baris 425**         |  `card-img`  | `assets/images/lighting/godox-sl60w.jpg`          |
| 17  | Lighting                | **Godox SL60W x2**           |        **Baris 446**         |  `card-img`  | `assets/images/lighting/godox-sl60w-x2.jpg`       |

---

## 4. Panduan Langkah Demi Langkah Mengganti Foto

Untuk mengganti foto placeholder dengan foto asli milik Anda, ikuti 3 langkah mudah berikut:

### Langkah 1: Masukkan File Foto ke Folder Terkait

Salin file gambar Anda ke dalam subfolder yang sesuai di dalam `assets/images/`.  
_Contoh:_ Simpan foto iPhone 13 Anda ke dalam `assets/images/phones/` dan beri nama file `iphone-13.jpg` (atau format `.png` / `.webp`).

### Langkah 2: Buka File `index.html` dan Ubah Atribut `src`

Buka file `index.html` menggunakan teks editor Anda (seperti VS Code atau Notepad), lalu cari baris kode produk yang bersangkutan.

**Contoh Kasus 1: Mengganti Foto iPhone 13 (Baris 48)**

- **Kode Semula (Placeholder Online):**
  ```html
  <div class="card-img-wrapper">
    <img
      src="https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=720&q=80"
      alt="iPhone 13"
      class="card-img"
      loading="lazy"
    />
  </div>
  ```
- **Ubah Menjadi (File Lokal Milik Anda):**
  ```html
  <div class="card-img-wrapper">
    <img
      src="assets/images/phones/iphone-13.jpg"
      alt="iPhone 13"
      class="card-img"
      loading="lazy"
    />
  </div>
  ```

**Contoh Kasus 2: Mengganti Foto Sony A6400 (Baris 176)**

- **Ubah Atribut `src` Menjadi:**
  ```html
  <img
    src="assets/images/cameras/sony-a6400.jpg"
    alt="Sony A6400"
    class="card-img"
    loading="lazy"
  />
  ```

### Langkah 3: Simpan dan Refresh Browser

Tekan `Ctrl + S` untuk menyimpan file `index.html`, lalu buka atau refresh halaman `index.html` di browser Anda. Foto akan langsung tampil proporsional secara otomatis.

---

## 5. Fitur Pengaman Fallback Otomatis

Jika Anda salah mengetikkan nama file foto atau file gambar belum sempat diletakkan di dalam folder, sistem JavaScript pada file `js/script.js` akan secara otomatis menampilkan **Placeholder SVG Studio Multimedia 9:16 yang elegan** bertuliskan _"Foto Belum Tersedia"_. Hal ini memastikan tata letak kartu website tidak akan pernah berantakan atau menampilkan ikon gambar pecah (broken image) di hadapan klien Anda.

---

## 6. Tips Optimasi Foto untuk Deploy ke Vercel / Netlify

1. **Format Gambar yang Disarankan:**
   - Gunakan format **WebP** atau **JPG** untuk kompresi terbaik dan loading halaman kilat.
   - Format **PNG** cocok jika foto produk Anda memiliki latar belakang transparan.
2. **Ukuran File:**
   - Karena resolusi foto asli Anda berkisar antara `166x157` hingga `372x312`, ukuran filenya sudah relatif ringan.
   - Usahakan ukuran tiap file gambar tetap di bawah **300 KB** agar klien yang mengakses via koneksi seluler HP dapat membuka website dengan seketika.
3. **Deploy ke Vercel atau Netlify:**
   - Website ini 100% statis murni tanpa build command yang rumit.
   - Anda cukup menghubungkan repository Git ke Vercel/Netlify atau menggunakan fitur _Drag and Drop folder_ pada dashboard Netlify Drop.
