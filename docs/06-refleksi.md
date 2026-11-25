# 06 · Refleksi: Blueprint vs Realisasi

**Minggu:** PAS−1 · **Dinilai di:** PAS, kriteria *Refleksi gap* (15 poin)

> [!TIP]
> **Pilar CT yang dilatih: Evaluation.** Blueprint PTS adalah tebakan terbaikmu sebelum membangun. Refleksi membandingkan tebakan itu dengan kenyataan: apa yang berubah, kenapa, dan apa yang kamu pelajari dari perubahan itu.

## 1. Yang harus ada

- [ ] **Tabel gap minimal 3 baris.** Setiap baris menyebut bagian blueprint (file `02`, `03`, atau `04` dan bagiannya), rencana di PTS, realisasi di PAS, alasan berubah, dan bukti (commit, kasus uji, atau entri journal).
- [ ] **Minimal 2 pelajaran**, masing-masing menyebut pilar CT dan baris gap atau kasus uji yang menjadi dasarnya.
- [ ] **Minimal 2 kesalahan AI**, masing-masing dengan kode entri dari `prompt-journal.md`, apa salahnya, dan bagaimana kamu mengetahuinya.
- [ ] **Minimal 2 hal yang akan kamu lakukan berbeda** kalau mengulang proyek ini. Setiap hal menyebut sesuatu yang **khas kasusmu** (data, atribut, fitur, atau kejadian tertentu), bukan saran umum seperti "mulai lebih awal" atau "lebih sering menguji".

## 2. Cara mengerjakan

1. Buka `02`, `03`, dan `04` versi PTS: di halaman **Releases**, klik nama tag `v-pts` untuk melihat isi repo pada saat rilis itu. Bandingkan dengan aplikasi yang sekarang berjalan.
2. Cari perubahan di tiga tempat: atribut yang ditambah atau dibuang, langkah algoritma yang berubah, dan fitur yang ternyata dikerjakan dengan cara lain.
3. Untuk setiap perubahan, tulis **kenapa** dengan kejadian nyata: kasus uji yang gagal, masukan pemilik, atau keterbatasan HP. "Ternyata lebih baik" bukan alasan.
4. Pelajaran ditulis spesifik. "Saya belajar banyak tentang JavaScript" tidak bisa diperiksa. "Pseudocode yang benar tidak menjamin kode benar; U03 gagal karena kode menjumlahkan, bukan MAKS" bisa diperiksa.
5. Kalau tidak ada yang berubah sama sekali, itu tanda kamu belum menguji cukup keras. Kembali ke `05` dulu.

## 3. Contoh pengisian

> [!NOTE]
> Kasus netral **Servis Jam Tangan Pak Darto**. **Data fiktif untuk keperluan pembelajaran.** Kode J03 dan J07 merujuk ke entri journal contoh; J03 ditulis lengkap di `prompt-journal.md`.

### Gap blueprint vs realisasi

| ID | Bagian blueprint | Rencana (PTS) | Realisasi (PAS) | Mengapa berubah | Bukti |
|---|---|---|---|---|---|
| G1 | `03` 5.2, `TIKET.status` | `menginap`, `siap`, `diambil` | Ditambah `batal` | Saat uji coba, satu pelanggan membatalkan servis mesin. Kalau tiketnya dihapus, jam yang dikembalikan tanpa servis tidak tercatat. | commit `<hash>` |
| G2 | `04` FW1, input `ciriJam` | Teks bebas | Tiga pilihan cepat (analog/digital, warna, tali) ditambah teks bebas | Saat uji di HP, mengetik ciri jam adalah langkah paling lama dalam membuat tiket. | commit `<hash>`, uji U01 diulang |
| G3 | `03` 5.2, `JENIS_PEKERJAAN.estimasiHari` | Angka tetap di kode | Bisa diubah di halaman Pengaturan | Saat uji coba di kios, Pak Darto minta estimasi servis mesin bisa dinaikkan menjadi 6 hari kalau suku cadangnya harus dipesan dulu. Dengan angka tetap di kode, permintaan itu hanya bisa dipenuhi lewat saya. | commit `<hash>` |

### Yang saya pelajari

1. **Abstraction (G3):** estimasi mesin 4 hari kerja berasal dari 5 tiket saja (P2), dan permintaan Pak Darto menunjukkan angka itu memang berubah-ubah. Angka aturan seperti ini disimpan sebagai data yang bisa diubah pemilik, bukan ditanam di kode.
2. **Algorithm Design (U03):** pseudocode yang benar tidak menjamin kode benar. Uji tangan yang saya lakukan di `04` perlu diulang terhadap kode, bukan hanya terhadap pseudocode.

### Yang AI salah

| Entri | Apa salahnya | Bagaimana saya tahu |
|---|---|---|
| J03 | Nomor tiket dibuat dari panjang daftar, sehingga nomor lama dipakai ulang setelah ada tiket yang dihapus. | Menjalankan kode AI di Node.js: setelah D-002 dihapus, tiket baru diberi nomor D-003 yang sudah ada. |
| J07 | Kode AI menjumlahkan `estimasiHari` semua pekerjaan, padahal blueprint memakai MAKS. | Kasus uji U03 gagal: janji keluar Selasa, seharusnya Senin. |

### Kalau mengulang

1. Saat menyalin 20 tiket di PTS−4, menanyakan ke Pak Darto apakah pernah ada servis yang dibatalkan. Dengan begitu status `batal` (G1) sudah ada di model data sejak `03`.
2. Mengamati lebih banyak tiket servis mesin sebelum menetapkan `estimasiHari` = 4, karena dari 20 tiket hanya 5 yang pekerjaan mesin (P2).

## 4. Cek sebelum commit

- [ ] Ada minimal 3 baris gap, masing-masing dengan alasan berupa kejadian nyata dan bukti.
- [ ] Ada minimal 2 pelajaran, masing-masing menyebut pilar CT dan dasarnya (G atau U).
- [ ] Ada minimal 2 kesalahan AI dengan kode entri yang benar-benar ada di `prompt-journal.md`.
- [ ] Ada minimal 2 hal yang akan kulakukan berbeda, masing-masing khas kasusku.

## 5. Isianmu

Semua yang ada di bawah judul ini adalah isianmu, dan hanya bagian ini yang diperiksa dosen. Jangan menghapus judul ini dan jangan menambah bagian baru sesudahnya.

### 5.1 Gap blueprint vs realisasi

| ID | Bagian blueprint | Rencana (PTS) | Realisasi (PAS) | Mengapa berubah | Bukti |
|---|---|---|---|---|---|
| G1 | `<isi: file dan bagian>` | `<isi>` | `<isi>` | `<isi: kejadian nyata>` | `<isi: commit, kasus uji, atau entri journal>` |
| G2 | `<isi>` | `<isi>` | `<isi>` | `<isi>` | `<isi>` |
| G3 | `<isi>` | `<isi>` | `<isi>` | `<isi>` | `<isi>` |

### 5.2 Yang saya pelajari

1. **`<isi: pilar>` (`<isi: G atau U>`):** `<isi>`
2. **`<isi: pilar>` (`<isi: G atau U>`):** `<isi>`

### 5.3 Yang AI salah

| Entri | Apa salahnya | Bagaimana saya tahu |
|---|---|---|
| `<isi: J..>` | `<isi>` | `<isi>` |
| `<isi: J..>` | `<isi>` | `<isi>` |

### 5.4 Kalau mengulang

1. `<isi: hal yang khas kasusmu>`
2. `<isi: hal yang khas kasusmu>`
