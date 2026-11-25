# 01 · Data Lapangan

**Minggu:** PTS−4 · **Dinilai di:** PTS, kriteria *Pattern & data lapangan* (15 poin, bersama bagian pola di `03`)

> [!TIP]
> **Pilar CT yang dilatih: Pattern Recognition.** Pola hanya bisa ditemukan dari data yang nyata. Minggu ini kamu mengumpulkan bahan mentahnya: kejadian, angka, dan kutipan. Kamu belum menyimpulkan apa-apa; menghitung pola dilakukan di `03`.

## 1. Yang harus ada

Pilih **satu jalur**. Minimum terpenuhi kalau satu jalur lengkap. Dua jalur yang sama-sama setengah jadi (misalnya 2 narasumber dan 10 transaksi) **tidak** memenuhi minimum.

**Jalur A: minimal 3 narasumber**

- [ ] 3 orang berbeda (kode `N1`, `N2`, `N3`) yang benar-benar terlibat dengan jenis UMKM kasusmu: pemilik, karyawan, atau pelanggan tetap.
- [ ] Setiap narasumber menjawab **minimal 5 pertanyaan** tentang kejadian yang sudah terjadi (bukan pendapat atau rencana).
- [ ] Setiap narasumber punya **minimal 1 kutipan langsung**.

**Jalur B: minimal 20 data transaksi**

- [ ] **20 baris** transaksi nyata (kode `T01` sampai `T20`), dari catatan pemilik (dengan izin) atau dari pengamatanmu langsung.
- [ ] Setiap baris punya **minimal 5 kolom** terisi.

**Kedua jalur**

- [ ] Bagian "Sumber dan izin" terisi: dari mana data didapat, bagaimana caranya, dan izin yang diberikan.
- [ ] **Minimal 3 temuan awal**, masing-masing menyebut kode buktinya (misalnya `N2`, `T05`).
- [ ] Tidak ada data pribadi (lihat 2.3).

Data yang dikarang, oleh kamu sendiri atau oleh AI, tidak dihitung. Nilai plus: minimal satu narasumber (Jalur A) adalah **pemilik** UMKM nyata yang sejenis dengan kasusmu, dan izinnya tercatat. Plus ini menaikkan nilai satu tingkat, hanya kalau hitungan polamu di `03` cocok dengan data di file ini.

## 2. Cara mengerjakan

### 2.1 Wawancara singkat: tanya kejadian, bukan pendapat

Pakai tiga aturan dari Rob Fitzpatrick, *The Mom Test* (2013):

1. Bicarakan hidup dan pekerjaan mereka, bukan ide aplikasimu.
2. Tanyakan kejadian spesifik yang sudah terjadi, bukan pendapat atau rencana ke depan.
3. Lebih banyak mendengar daripada bicara.

Orang cenderung menjawab "iya, bagus" kalau ditanya pendapat, supaya sopan. Kejadian nyata lebih sulit dikarang. Bandingkan:

| Pertanyaan buruk (pendapat atau masa depan) | Pertanyaan baik (kejadian nyata) |
|---|---|
| "Bapak butuh aplikasi tiket servis?" | "Kapan terakhir ada jam pelanggan yang tertukar? Ceritakan dari awal." |
| "Janji ambil sering meleset, ya?" | "Minggu lalu, berapa pelanggan yang datang tapi jamnya belum jadi?" |
| "Berapa lama biasanya servis mesin?" | "Jam terakhir yang diservis mesinnya, masuk hari apa dan selesai hari apa?" |
| "Kalau ada aplikasinya, Bapak mau pakai?" | "Sekarang titipan jam dicatat di mana? Boleh saya lihat?" |

Tips praktis:

- 10 sampai 15 menit per narasumber cukup. Siapkan 6 sampai 8 pertanyaan, pakai minimal 5.
- Setiap jawaban yang menarik, susul dengan "Lalu apa yang Bapak/Ibu lakukan?" atau "Itu terjadi berapa kali bulan ini?"
- Catat angka, nama hari, dan kejadian. Jangan mencatat kesimpulanmu sendiri sebagai jawaban.
- Jangan menceritakan ide aplikasimu sampai wawancara selesai.

### 2.2 Mengumpulkan 20 transaksi

1. Tentukan kolom dulu (minimal 5), misalnya waktu, barang atau jasa, jumlah, harga, dan catatan masalah.
2. Ambil 20 transaksi **berturut-turut**, bukan memilih yang menarik saja. Pilihan yang disaring membuat pola palsu.
3. Tulis sumbernya: buku nota pemilik, rekap kasir, atau pengamatan langsung di jam tertentu.

### 2.3 Izin dan privasi

Repo kamu **public**. Siapa pun bisa membacanya.

- Minta izin lisan, jelaskan bahwa data dipakai untuk tugas kuliah dan akan tampil di internet tanpa nama. Tulis hasilnya: `Izin: ya (lisan)`.
- Pakai kode: narasumber `N1`, pelanggan `P-01`, transaksi `T01`.
- **Jangan** menulis nama lengkap, nomor HP, alamat rumah, plat nomor, atau foto wajah. Jangan mengunggah foto nota yang memuat nama atau nomor pelanggan.
- Nama usaha hanya ditulis kalau pemiliknya mengizinkan. Kalau tidak, tulis jenis dan wilayahnya, misalnya "laundry kiloan dekat kampus".

Dasar hukumnya: UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.

> [!CAUTION]
> **Data pribadi nyata di repo menurunkan nilai.** Kalau nama lengkap, nomor HP, alamat rumah, plat nomor, atau foto wajah narasumber atau pelanggan ada di file mana pun di repo, kriteria *Pattern & data lapangan* di PTS langsung bernilai Kurang. Di PAS, data pribadi nyata di repo atau di video membuat kriteria *Prototipe* langsung Kurang.

### 2.4 Peran AI minggu ini

AI boleh membantu menyusun daftar pertanyaan atau memeriksa apakah pertanyaanmu menanyakan pendapat. AI **tidak boleh** mengarang jawaban atau transaksi. Catat pemakaiannya di `prompt-journal.md`.

## 3. Contoh pengisian

> [!NOTE]
> Kasus netral **Servis Jam Tangan Pak Darto** (kios servis jam kecil; masalahnya: jam pelanggan tertukar dan janji ambil sering meleset). Kasus ini tidak ada di bank kasus. **Data fiktif untuk keperluan pembelajaran.** Contoh ini memakai Jalur B.

**Jalur:** B (transaksi)

**Sumber dan izin:** buku nota Pak Darto, 20 tiket berturut-turut sejak Senin pekan pertama pengamatan. Disalin di kios dengan izin lisan Pak Darto (`Izin: ya (lisan)`). Nama dan nomor HP pelanggan tidak disalin. Hari ditulis sebagai "hari ke-": hari ke-1 = Senin, hari ke-7 = Minggu (kios tutup).

<details>
<summary><b>Lihat 20 baris transaksi contoh</b></summary>

| Kode | Masuk (hari ke-) | Pekerjaan | Ciri jam | Janji ambil (hari ke-) | Selesai (hari ke-) | Biaya (Rp) | Catatan |
|---|---|---|---|---|---|---|---|
| T01 | 1 | Baterai | analog perak, rantai | 1 | 1 | 25.000 | |
| T02 | 1 | Mesin | analog hitam, kulit | 3 | 4 | 150.000 | pelanggan datang hari ke-3, belum jadi |
| T03 | 2 | Tali | digital hitam, karet | 2 | 2 | 35.000 | |
| T04 | 2 | Kaca | analog emas, rantai | 4 | 3 | 60.000 | |
| T05 | 2 | Baterai | digital biru, karet | 2 | 2 | 25.000 | |
| T06 | 3 | Mesin | analog hitam, kulit | 5 | 8 | 150.000 | tertukar dengan T02 |
| T07 | 3 | Baterai | analog putih, kulit | 3 | 3 | 25.000 | |
| T08 | 4 | Kaca | digital hitam, karet | 6 | 5 | 60.000 | |
| T09 | 4 | Baterai | analog perak, rantai | 4 | 4 | 25.000 | |
| T10 | 4 | Tali | analog cokelat, kulit | 4 | 4 | 40.000 | |
| T11 | 5 | Mesin + Kaca | analog perak, rantai | 8 | 10 | 200.000 | pelanggan tanya lewat WA 2 kali |
| T12 | 5 | Baterai | digital hitam, karet | 5 | 5 | 25.000 | |
| T13 | 6 | Kaca | analog emas, kulit | 8 | 8 | 60.000 | |
| T14 | 6 | Baterai | analog hitam, kulit | 6 | 6 | 25.000 | |
| T15 | 8 | Mesin | analog hitam, kulit | 10 | 11 | 150.000 | hampir tertukar dengan T16 |
| T16 | 8 | Kaca | analog hitam, kulit | 10 | 9 | 60.000 | hampir tertukar dengan T15 |
| T17 | 9 | Tali | digital putih, karet | 9 | 9 | 35.000 | |
| T18 | 9 | Baterai | analog emas, rantai | 9 | 9 | 25.000 | |
| T19 | 10 | Mesin | digital hitam, karet | 12 | 13 | 150.000 | |
| T20 | 11 | Baterai | analog perak, kulit | 11 | 11 | 25.000 | |

</details>

**Temuan awal**

| Kode | Temuan | Bukti |
|---|---|---|
| TA1 | Ganti baterai dan ganti tali selalu selesai di hari yang sama dengan hari masuk. | T01, T03, T05, T07, T09, T10, T12, T14, T17, T18, T20 |
| TA2 | Janji ambil yang meleset selalu pekerjaan mesin. | T02, T06, T11, T15, T19 |
| TA3 | Jam yang tertukar atau hampir tertukar sama-sama analog hitam bertali kulit, dan semuanya menginap. | T02, T06, T15, T16 |

Perhatikan: temuan awal hanya menyebut apa yang terlihat. Menghitung dan menyimpulkan baru dilakukan di `03`.

## 4. Cek sebelum commit

- [ ] Satu jalur sudah lengkap: 3 narasumber dengan masing-masing 5 pertanyaan dan 1 kutipan, **atau** 20 baris transaksi dengan 5 kolom.
- [ ] Setiap pertanyaan menanyakan kejadian yang sudah terjadi, bukan pendapat atau rencana.
- [ ] Ada 3 temuan awal dan setiap temuan menyebut kode buktinya.
- [ ] Tidak ada nama lengkap, nomor HP, alamat, plat nomor, atau foto wajah di file ini.
- [ ] Bagian jalur yang tidak dipakai (5.3A atau 5.3B) sudah dihapus.

## 5. Isianmu

Semua yang ada di bawah judul ini adalah isianmu, dan hanya bagian ini yang diperiksa dosen. Jangan menghapus judul ini dan jangan menambah bagian baru sesudahnya.

### 5.1 Jalur yang dipilih

`<isi: A (narasumber) atau B (transaksi)>`

### 5.2 Sumber dan izin

`<isi: dari mana data didapat, kapan secara relatif (misalnya PTS−4), bagaimana caranya, izin yang diberikan>`

### 5.3A Narasumber (hapus bagian ini kalau memakai Jalur B)

#### N1

| | |
|---|---|
| Peran | `<isi: misalnya pemilik, karyawan, pelanggan tetap>` |
| Hubungan dengan kasus | `<isi: jenis usahanya dan kenapa relevan dengan kasusmu>` |
| Cara dan lama | `<isi: tatap muka / telepon / chat, berapa menit>` |
| Izin | `<isi: ya (lisan) / ya (tertulis di chat)>` |

| No | Pertanyaan | Jawaban ringkas |
|---|---|---|
| 1 | `<isi>` | `<isi>` |
| 2 | `<isi>` | `<isi>` |
| 3 | `<isi>` | `<isi>` |
| 4 | `<isi>` | `<isi>` |
| 5 | `<isi>` | `<isi>` |

Kutipan langsung: "`<isi>`"

#### N2

| | |
|---|---|
| Peran | `<isi>` |
| Hubungan dengan kasus | `<isi>` |
| Cara dan lama | `<isi>` |
| Izin | `<isi>` |

| No | Pertanyaan | Jawaban ringkas |
|---|---|---|
| 1 | `<isi>` | `<isi>` |
| 2 | `<isi>` | `<isi>` |
| 3 | `<isi>` | `<isi>` |
| 4 | `<isi>` | `<isi>` |
| 5 | `<isi>` | `<isi>` |

Kutipan langsung: "`<isi>`"

#### N3

| | |
|---|---|
| Peran | `<isi>` |
| Hubungan dengan kasus | `<isi>` |
| Cara dan lama | `<isi>` |
| Izin | `<isi>` |

| No | Pertanyaan | Jawaban ringkas |
|---|---|---|
| 1 | `<isi>` | `<isi>` |
| 2 | `<isi>` | `<isi>` |
| 3 | `<isi>` | `<isi>` |
| 4 | `<isi>` | `<isi>` |
| 5 | `<isi>` | `<isi>` |

Kutipan langsung: "`<isi>`"

### 5.3B Transaksi (hapus bagian ini kalau memakai Jalur A)

Ganti judul kolom sesuai kasusmu. Minimal 5 kolom; tambah kolom kalau perlu.

| Kode | `<kolom 1>` | `<kolom 2>` | `<kolom 3>` | `<kolom 4>` | `<kolom 5>` |
|---|---|---|---|---|---|
| T01 | | | | | |
| T02 | | | | | |
| T03 | | | | | |
| T04 | | | | | |
| T05 | | | | | |
| T06 | | | | | |
| T07 | | | | | |
| T08 | | | | | |
| T09 | | | | | |
| T10 | | | | | |
| T11 | | | | | |
| T12 | | | | | |
| T13 | | | | | |
| T14 | | | | | |
| T15 | | | | | |
| T16 | | | | | |
| T17 | | | | | |
| T18 | | | | | |
| T19 | | | | | |
| T20 | | | | | |

### 5.4 Temuan awal

| Kode | Temuan | Bukti |
|---|---|---|
| TA1 | `<isi>` | `<isi: kode N atau T>` |
| TA2 | `<isi>` | `<isi>` |
| TA3 | `<isi>` | `<isi>` |
