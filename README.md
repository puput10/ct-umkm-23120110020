# `<isi: nama UMKM>`: `<isi: judul singkat solusi, misalnya "Tiket Servis Digital">`

> [!IMPORTANT]
> **Isi saat kickoff, lalu jadikan commit pertama kamu.** Bagian yang wajib terisi di commit pertama: **1. Identitas**, **2. Kasus**, dan **3. Data lapangan** (kolom "Rencana" saja). Hapus setiap teks `<isi: ...>` seutuhnya (termasuk tanda `< >`), lalu tulis isianmu sendiri di tempatnya. Bagian lain diisi bertahap sesuai minggu di **Timeline**.
>
> Kotak petunjuk seperti ini boleh kamu hapus setelah bagiannya terisi.

## 1. Identitas

Repo ini harus **Public** dengan nama `ct-umkm-<NIM>`, supaya dosen bisa membukanya tanpa undangan. Nama lengkap tidak perlu ditulis di sini karena sudah ada di Edlink.

| | |
|---|---|
| NIM | `<isi: NIM>` |
| Nama panggilan (opsional) | `<isi: boleh dikosongkan>` |
| Repo | `https://github.com/<isi: username>/ct-umkm-<isi: NIM>` |

## 2. Kasus

Salin dari bank studi kasus, lalu tulis ulang masalahnya dengan kalimatmu sendiri.

| | |
|---|---|
| Nomor kasus | `<isi: nomor>` |
| Jenis UMKM | `<isi: jenis UMKM dari bank kasus>` |
| Kelompok kasus | `<isi: misalnya Antrean & status order>` |
| Masalah utama (bank kasus) | `<isi: salin persis>` |
| Masalah utama (kalimatku) | `<isi: satu kalimat yang menyebut siapa yang rugi dan kapan masalah itu terjadi>` |
| Tantangan Bonus | `<isi: salin dari bank kasus>` |

## 3. Data lapangan: rencana dan realisasi

Pilih satu jalur: **minimal 3 narasumber** atau **minimal 20 data transaksi**. Detail dan contoh ada di [`docs/01-data-lapangan.md`](docs/01-data-lapangan.md).

Jalur yang saya pilih: `<isi: narasumber / transaksi>`

| Kode | Siapa (peran, tanpa nama) | Hubungan dengan kasus | Rencana (cara, minggu) | Realisasi |
|---|---|---|---|---|
| N1 | `<isi: misalnya pemilik usaha laundry dekat kampus>` | `<isi: UMKM sejenis kasus saya>` | `<isi: tatap muka, PTS−4>` | `<isi: belum / selesai, lihat docs/01>` |
| N2 | `<isi: peran>` | `<isi: hubungan>` | `<isi: rencana>` | `<isi: realisasi>` |
| N3 | `<isi: peran>` | `<isi: hubungan>` | `<isi: rencana>` | `<isi: realisasi>` |

Kalau memilih jalur transaksi, isi satu baris saja: kode `T`, sumber catatan (misalnya buku nota pemilik), rencana pengambilan, realisasi.

## 4. Tautan

| | |
|---|---|
| Aplikasi live (Netlify) | `<isi saat PAS−6: https://nama-situs.netlify.app>` |
| Video demo (maksimal 3 menit) | `<isi saat PAS−1: link YouTube unlisted atau Google Drive>` |
| Timestamp video per FW | `<isi saat PAS−1: menit:detik saat setiap FW mulai tampil, misalnya FW1 0:10, FW2 0:45, FW3 1:30, Bonus 2:20>` |
| Rilis PTS | tag `v-pts` di menu **Releases** repo ini |
| Rilis PAS | tag `v-pas` di menu **Releases** repo ini |

**Link live harus berasal dari situs Netlify yang terhubung ke repo ini** (di dasbor Netlify: **Import from Git**, lalu **GitHub → Connect**, pilih repo ini; build command dikosongkan, publish directory diisi root `.`; nama menu bisa sedikit berbeda). Dengan cara ini setiap push otomatis memperbarui situs, kecuali push yang hanya mengubah `docs/` atau `README.md` (aturan hemat kredit di bawah), sehingga kode di link live selalu sama dengan kode di repo. Unggah manual (drag and drop folder) hanya untuk keadaan darurat, dan beri tahu dosen kalau terpaksa memakainya.

**Link live harus bisa dibuka tanpa login.** Situs Netlify baru bisa berstatus privat: hanya pemilik akun yang bisa membukanya. Setelah situs tayang, tekan **Make public** di pengaturan situs Netlify, lalu buka link live di jendela samaran browser. Halaman aplikasi harus langsung tampil, bukan halaman login Netlify. Di Netlify baru, pengaturannya ada di **Manage → General → Visitor access → Project visibility → Edit visibility → Public → Save**.

**Hemat kredit Netlify.** Paket gratis Netlify memberi kredit yang cukup untuk sekitar 20 deploy produksi per bulan. Kalau kredit habis, situsmu berhenti tampil sampai bulan berikutnya. `netlify.toml` di repo ini sudah mengatur agar commit yang hanya mengubah `docs/` atau `README.md` tidak memicu deploy. Commit sesering apa pun, tetapi **push sekali di akhir setiap sesi kerja**, bukan setiap commit. Sisa kredit terlihat di pojok kiri atas dasbor Netlify.

Cara membuat rilis: buka repo di github.com, klik **Create a new release** di kolom kanan (kalau sudah pernah ada rilis: **Releases**, lalu **Draft a new release**). Di kotak tag ketik `v-pts` (atau `v-pas`), pilih **Create new tag**, isi judul, lalu klik **Publish release**. Rilis menyimpan keadaan repo saat itu; dosen menilai isi repo pada tag tersebut.

> [!IMPORTANT]
> **Setelah `v-pas` dibuat, jangan push sampai tanya jawab selesai. Dosen menilai commit `v-pas`.** Saat tanya jawab kamu membuka **Activity → Deploys** di Netlify dan menunjukkan deploy yang tayang beserta hash commit-nya. Itu deploy dari commit terakhirmu yang mengubah sesuatu di luar `docs/` dan `README.md`; commit sesudahnya yang hanya mengubah `docs/` atau `README.md` memang tidak di-deploy.

## 5. Fitur Wajib

Salin Fitur Wajib dari bank kasus **apa adanya**: setiap butir yang dipisah koma di kolom Fitur Wajib menjadi satu FW (FW1, FW2, dan seterusnya), dengan urutan yang sama. Koma di dalam tanda kurung bukan pemisah, karena isi kurung adalah rincian butir itu. Label sebelum titik dua (misalnya "POS sederhana:") adalah judul, jadi hitung butirnya sesudah titik dua. Tanda `+`, `&`, dan `/` menyambung bagian dari butir yang sama. Jangan memecah satu butir menjadi beberapa FW, dan jangan menggabungkan butir. Kode FW yang sama dipakai di semua file `docs/`. Perbarui status setiap kali kamu commit.

Status: **Belum** · **Sedang dikerjakan** · **Selesai** (berjalan di link live) · **Teruji** (lulus kasus uji di `docs/05-testing.md`).

- [ ] **FW1** `<isi: butir pertama Fitur Wajib>` · Status: `Belum` · Kasus uji: `(diisi PAS−2)`
- [ ] **FW2** `<isi: butir kedua>` · Status: `Belum` · Kasus uji: `(diisi PAS−2)`
- [ ] **FW3** `<isi: butir ketiga>` · Status: `Belum` · Kasus uji: `(diisi PAS−2)`
- [ ] **Bonus** `<isi: Tantangan Bonus, opsional>` · Status: `Belum` · Kasus uji: `(diisi PAS−2)`

Jumlah baris FW mengikuti jumlah butir di bank kasus; tambah atau hapus baris kalau jumlahnya bukan tiga. Tantangan Bonus opsional: menambah nilai PAS sampai 10 poin, dengan nilai akhir PAS maksimal 100. Bonus hanya dihitung kalau semua FW berjalan di link live. Centang kotak `[x]` hanya kalau status sudah **Teruji**, lalu ganti `(diisi PAS−2)` dengan kode kasus ujinya, misalnya `U01, U04`.

Contoh satu baris yang sudah selesai (kasus netral, bukan dari bank kasus). Hapus contoh ini setelah kamu paham formatnya:

- [x] **FW1** Tiket servis bernomor · Status: `Teruji` · Kasus uji: `U01, U06`

## 6. Cara menjalankan di komputer sendiri

Aplikasi ini web statis (HTML, CSS, JavaScript), tanpa backend dan tanpa build. Cara membuka repo di VS Code dan menyalakan Live Server ada di PDF **Panduan Mahasiswa**, lengkap dengan gambar. Ringkasnya:

1. Buka folder repo di **VS Code**.
2. Pasang ekstensi **Live Server** (penerbit: Ritwick Dey) dari panel Extensions.
3. Klik kanan `index.html`, pilih **Open with Live Server**. Browser terbuka di alamat `http://127.0.0.1:5500`.

Versi terminal (kalau Node.js sudah terpasang):

```bash
npx serve .
```

Jangan membuka `index.html` dengan klik dua kali (alamat `file://`), karena browser bisa menolak membaca file `data/` dari alamat seperti itu.

**Sebelum menulis fitur pertama (PAS−6), ganti nama aplikasi di dua tempat dengan nama yang sama**, misalnya `servisjam-<NIM>`:

1. `js/app.js`: baris `CTStorage.open('catatan-demo')` menjadi `CTStorage.open('servisjam-<NIM>')`.
2. `data/sample.json`: nilai `"app": "catatan-demo"` menjadi `"app": "servisjam-<NIM>"`.

Kalau hanya satu yang diganti, saat pertama dibuka aplikasi menampilkan "Data contoh tidak dimuat". Kalau keduanya tidak diganti, datamu bercampur dengan data demo di browser yang sama.

Ekspor dan impor data memakai bentuk JSON yang sama dengan `data/sample.json`: `{ app, version, data: { namaKoleksi: [ { id, ... } ] } }`. **Impor mengganti seluruh data** yang ada, tidak menggabungkan. Ekspor dulu kalau ingin menyimpan cadangan.

Uji otomatis untuk `js/storage.js` (dan uji milikmu sendiri di folder `tests/`) dijalankan dari terminal:

```bash
node --test tests/
```

## 7. Struktur repo

```
.
├── README.md                 # file ini
├── index.html                # halaman aplikasi
├── css/style.css             # tampilan (mobile-first)
├── js/app.js                 # logika Fitur Wajib
├── js/storage.js             # simpan dan baca data di localStorage
├── data/sample.json          # data contoh FIKTIF untuk uji coba
├── tests/storage.test.js     # uji storage.js, jalankan: node --test tests/
├── netlify.toml              # pengaturan deploy Netlify
├── .gitignore
├── .github/workflows/check.yml   # cek otomatis: file wajib ada dan tidak kosong
└── docs/
    ├── 01-data-lapangan.md        # PTS−4
    ├── 02-decomposition.md        # PTS−3
    ├── 03-pattern-abstraction.md  # PTS−2
    ├── 04-algorithm.md            # PTS−1
    ├── 05-testing.md              # PAS−2
    ├── 06-refleksi.md             # PAS−1
    └── prompt-journal.md          # sepanjang proyek
```

Kamu boleh menambah file JavaScript sendiri di `js/`. Jangan mengganti nama atau memindahkan file di `docs/`, karena cek otomatis mencarinya di tempat itu.

> [!WARNING]
> Tanda centang hijau dari cek otomatis (`check.yml`) hanya berarti semua file wajib **ada dan tidak kosong**. Centang hijau tidak berarti isinya sudah lengkap atau memenuhi Daftar minimum di bawah.

## 8. Timeline

| Minggu | Yang dikerjakan | File |
|---|---|---|
| Kickoff | Pilih kasus, buat repo Public dari template, isi README bagian 1 sampai 3 | `README.md` |
| PTS−4 | Wawancara atau kumpulkan transaksi | `docs/01-data-lapangan.md` |
| PTS−3 | Pohon masalah | `docs/02-decomposition.md` |
| PTS−2 | Pola dari data, model data, daftar yang diabaikan | `docs/03-pattern-abstraction.md` |
| PTS−1 | Flowchart dan pseudocode setiap Fitur Wajib; isi README bagian 11 | `docs/04-algorithm.md`, `README.md` |
| Sepanjang PTS | Catat pemakaian AI | `docs/prompt-journal.md` |
| **PTS** | Buat rilis `v-pts`, kumpulkan link repo di Edlink | Releases |
| PAS−6 | Hubungkan repo ke Netlify (Import from GitHub), pastikan push otomatis memperbarui situs, isi link live | `README.md` |
| PAS−5 sampai PAS−3 | Bangun Fitur Wajib, minimal satu fitur per minggu | `js/`, `index.html` |
| PAS−2 | Pengujian, Tantangan Bonus (opsional) | `docs/05-testing.md` |
| PAS−1 | Refleksi, rekam video demo, perbarui README bagian 11 | `docs/06-refleksi.md`, `README.md` |
| **PAS** | Buat rilis `v-pas`, kumpulkan link repo, live, dan video di Edlink; jangan push lagi sampai tanya jawab selesai; demo dan tanya jawab 5 menit tanpa AI | Releases |

## 9. Daftar minimum

Daftar ini memuat **semua** yang dinilai sebagai minimum. Angkanya sama dengan yang tertulis di masing-masing file `docs/`. Kalau ada yang tampak berbeda, yang berlaku adalah daftar ini; tanyakan ke dosen di klinik. Hal lain di file `docs/` yang tidak ada di daftar ini adalah anjuran.

**PTS (Blueprint)**

| File | Minimum |
|---|---|
| Repo | Public, bernama `ct-umkm-<NIM>`; ketujuh file `docs/` tetap di tempat dan bernama asli |
| Rilis | `v-pts` dibuat sebelum batas tugas Edlink "PTS - Blueprint" |
| `README.md` | Bagian 1, 2, 3, 5, dan 11 terisi tanpa sisa `<isi: ...>` (nama panggilan boleh kosong); FW sama persis dengan butir Fitur Wajib di bank kasus |
| `01-data-lapangan.md` | 3 narasumber (masing-masing 5 pertanyaan tentang kejadian nyata dan 1 kutipan langsung) **atau** 20 baris transaksi (masing-masing 5 kolom); bagian "Sumber dan izin" terisi; 3 temuan awal, masing-masing menyebut kode buktinya; tanpa data pribadi |
| `02-decomposition.md` | Pohon Mermaid yang tampil di github.com: 1 akar yang menyebut siapa yang rugi dan kapan; 3 cabang tingkat 1; setiap cabang tingkat 1 punya 2 anak dan 1 jalur sampai tingkat 3; setiap FW muncul di 1 node; setiap cabang tingkat 1 punya 1 bukti dari `01` |
| `03-pattern-abstraction.md` | 3 pola, masing-masing dengan hitungan "x dari y" yang cocok dengan data `01`, kode bukti, dan akibat untuk desain; 2 entitas, masing-masing 3 atribut bertipe dengan contoh nilai dan 1 kunci; setiap atribut dipakai FW, Tantangan Bonus, atau pola; hubungan antarentitas ditulis; 3 hal yang sengaja diabaikan beserta alasannya |
| `04-algorithm.md` | Untuk **setiap** FW: input dan output; 1 flowchart Mermaid (Mulai, Selesai, 1 keputusan dengan 2 cabang berlabel); pseudocode memakai nama atribut dari `03`; 1 kasus tepi. Ditambah **1 uji tangan** untuk FW yang paling rumit |
| `prompt-journal.md` | 5 entri, termasuk 3 kesalahan AI yang ditemukan dan dikoreksi dengan bukti; setiap entri memuat 7 bagian |

**PAS (Build & Evaluate)**

| File | Minimum |
|---|---|
| Aplikasi | Semua FW berjalan di link live Netlify yang terhubung ke repo ini (auto-deploy setiap push); link live terbuka tanpa login (**Make public**); data tetap ada setelah halaman dimuat ulang. Saat tanya jawab kamu menunjukkan deploy berstatus **Published** di **Activity → Deploys** (branch `main`) beserta hash commit-nya. Antara commit itu dan `v-pas` hanya `docs/` atau `README.md` yang boleh berbeda. Commit yang hanya mengubah `docs/` atau `README.md` memang tidak di-deploy (aturan hemat kredit di `netlify.toml`) |
| `README.md` | Bagian 4, 5, dan 11 lengkap: link live, link video, timestamp video per FW, status setiap FW, pernyataan AI diperbarui |
| `05-testing.md` | 5 kasus uji; 2 di antaranya kasus tepi atau ekstrem; setiap FW punya 1 kasus uji; setiap kasus Gagal punya tindak lanjut |
| `06-refleksi.md` | 3 baris gap blueprint vs realisasi; 2 pelajaran; 2 kesalahan AI dengan kode entri journal; 2 hal yang akan dilakukan berbeda, masing-masing menyebut hal yang khas kasusmu |
| `prompt-journal.md` | 3 entri baru setelah rilis `v-pts`, termasuk 1 kesalahan AI baru yang dikoreksi dengan bukti |
| Video | Maksimal 3 menit, memperlihatkan semua FW berjalan di link live dengan alamat `netlify.app` terlihat |
| Commit | 10 commit milikmu sendiri (commit awal dari template tidak dihitung); tersebar di 4 minggu berbeda (Senin sampai Minggu); tanpa commit raksasa di akhir: satu commit dalam 7 hari terakhir sebelum rilis `v-pas` yang menambah bersih 300 baris atau lebih (baris tambah dikurangi baris hapus) di `js/`, `css/`, dan `index.html` |
| Rilis | `v-pas` dibuat sebelum batas tugas Edlink "PAS - Prototipe"; sesudahnya tidak ada push sampai tanya jawab selesai |
| Tanya jawab | 5 menit tanpa AI: menjalankan setiap FW di link live, menjelaskan per baris satu fungsi yang dipilih dosen, dan memprediksi hasil satu perubahan input |
| Tantangan Bonus (opsional) | Dihitung hanya kalau semua FW berjalan: +5 kalau bonus berjalan di link live, +5 lagi kalau bonus punya kasus uji Lulus di `05-testing.md` |

Semua angka adalah **batas bawah** ("minimal"), kecuali durasi video dan ukuran commit raksasa, yang merupakan batas atas.

## 10. Aturan commit

- Commit kecil dan sering: satu commit untuk satu perubahan yang bisa kamu jelaskan dalam satu kalimat.
- Commit awal yang dibuat GitHub saat kamu memakai template **tidak dihitung**.
- Sampai PAS: **minimal 10 commit milikmu sendiri**, tersebar di **minimal 4 minggu berbeda**. Satu commit raksasa di akhir, atau kurang dari salah satu angka itu, mengurangi nilai PAS sebanyak 15 poin. Commit raksasa = satu commit dalam 7 hari terakhir sebelum rilis `v-pas` yang menambah bersih 300 baris atau lebih di `js/`, `css/`, dan `index.html`. File `docs/` tidak dihitung.
- Pesan commit menjelaskan isi, misalnya `Tambah pohon masalah cabang penerimaan`. Hindari `update`, `fix`, atau `asdf`.
- Commit lewat panel **Source Control** di VS Code: tulis pesan, klik **Commit**, lalu **Sync Changes**.

## 11. Pernyataan penggunaan AI

**Wajib, cukup singkat.** Isi sebelum rilis `v-pts`, lalu perbarui sebelum rilis `v-pas`.

> [!NOTE]
> AI boleh dipakai (tool apa saja), dengan syarat setiap pemakaian penting tercatat di [`docs/prompt-journal.md`](docs/prompt-journal.md). Saat tanya jawab PAS kamu menjelaskan kodemu sendiri **tanpa AI**. Kalau tidak bisa, komponen Demo dinilai maksimal 50%.

| | |
|---|---|
| Tool AI yang saya pakai | `<isi: nama tool>` |
| Saya pakai untuk | `<isi: misalnya menyusun pertanyaan wawancara, mengecek pseudocode, menulis kode awal FW2>` |
| Tidak saya pakai untuk | `<isi: misalnya mengarang jawaban narasumber atau data transaksi>` |
| Jumlah entri journal / kesalahan AI ditemukan | `<isi: misalnya 6 entri / 3 kesalahan>` |

Pernyataan: `<isi: satu atau dua kalimatmu sendiri bahwa kamu memahami isi repo ini dan bisa menjelaskannya tanpa AI>`

## 12. Privasi

Repo ini **Public**. Jangan menaruh nama lengkap, nomor HP, alamat, atau foto wajah narasumber dan pelanggan. Pakai kode (N1, P-03, T07). Data di `data/sample.json` harus fiktif.

> [!CAUTION]
> Data pribadi nyata di repo membuat kriteria *Pattern & data lapangan* (PTS) langsung bernilai Kurang. Data pribadi nyata di repo atau di video membuat kriteria *Prototipe* (PAS) langsung Kurang.
