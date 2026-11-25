# 05 · Pengujian

**Minggu:** PAS−2 · **Dinilai di:** PAS, kriteria *Pengujian* (15 poin)

> [!TIP]
> **Pilar CT yang dilatih: Evaluation.** Kamu membuktikan aplikasi bekerja dengan menjalankannya, bukan dengan yakin. Kasus uji yang gagal bukan aib; kasus uji gagal yang tidak ditindaklanjuti adalah masalah.

## 1. Yang harus ada

- [ ] **Minimal 5 kasus uji** dalam tabel dengan kolom: ID · Fitur · Langkah/Input · Hasil yang diharapkan · Hasil aktual · Lulus/Gagal · Tindak lanjut.
- [ ] **Minimal 2 kasus tepi atau ekstrem**, ditandai `(tepi)` atau `(ekstrem)` di kolom Fitur.
- [ ] **Setiap FW punya minimal 1 kasus uji.**
- [ ] **Setiap kasus Gagal punya tindak lanjut**: penyebab, perbaikan (dengan commit), dan hasil uji ulang. Kalau belum diperbaiki, tulis alasannya.

Hasil aktual ditulis setelah menjalankan aplikasi di link live, dan baris "Lingkungan uji" membantu dosen mengulang ujimu. Keduanya adalah cara kerja yang diharapkan (lihat bagian 2), bukan butir minimum terpisah.

## 2. Cara mengerjakan

1. **Ambil bahan dari `04-algorithm.md`.** Setiap kasus tepi di sana adalah calon kasus uji. Tambahkan satu kasus "jalur normal" per FW.
2. **Tulis hasil yang diharapkan sebelum menjalankan aplikasi.** Kalau ditulis sesudahnya, kamu cenderung menyesuaikan dengan apa yang muncul.
3. **Langkah harus bisa diulang orang lain.** Tulis data persis yang dimasukkan dan tombol yang diklik, bukan "isi form dengan benar".
4. **Uji di link live, di HP kalau bisa.** Hasil aktual berasal dari menjalankan aplikasi di link live (Netlify), bukan disalin dari hasil yang diharapkan. Tulis link, perangkat, dan versi commit di baris "Lingkungan uji". Pemilik UMKM memakai HP. Jangan lupa uji muat ulang halaman: data harus tetap ada.
5. **Catat yang gagal apa adanya.** Kolom Lulus/Gagal berisi hasil percobaan pertama. Perbaikan dan uji ulang ditulis di kolom Tindak lanjut.
6. **Perbarui README bagian 5**: FW yang lulus ujinya berstatus `Teruji`, dan kode kasus ujinya ditulis di sana.

Kalau kamu menulis uji otomatis untuk fungsi milikmu di folder `tests/`, jalankan dengan `node --test tests/` dan masukkan sebagai satu baris di tabel. Uji otomatis tidak menggantikan uji di link live.

## 3. Contoh pengisian

> [!NOTE]
> Kasus netral **Servis Jam Tangan Pak Darto**. **Data fiktif untuk keperluan pembelajaran.** Kasus tepi K1 sampai K3 berasal dari contoh di `04-algorithm.md`.

**Lingkungan uji:** link live `https://servisjam-<NIM>.netlify.app` · HP Android, Chrome · versi commit `<hash>`

| ID | Fitur | Langkah/Input | Hasil yang diharapkan | Hasil aktual | Lulus/Gagal | Tindak lanjut |
|---|---|---|---|---|---|---|
| U01 | FW1 | Buat 3 tiket (D-001, D-002, D-003). Hapus D-002. Buat 1 tiket baru. | Tiket baru D-004; tidak ada dua tiket bernomor sama | D-004 | Lulus | |
| U02 | FW2 (tepi) | Tiket masuk Sabtu, pekerjaan Ganti kaca (K2) | Janji ambil Senin | Senin | Lulus | |
| U03 | FW2 (tepi) | Tiket masuk Rabu, pekerjaan Servis mesin dan Ganti kaca (K3) | Janji ambil Senin (lama 4 hari kerja) | Selasa | Gagal | Kode menjumlahkan estimasi (4 + 1 = 5 hari), padahal pseudocode memakai MAKS. Diperbaiki di commit `<hash>`. Uji ulang: Senin, Lulus. Dicatat di journal J07. |
| U04 | FW2 (tepi) | Klik Simpan tanpa memilih pekerjaan (K1) | Pesan "Pilih minimal satu pekerjaan"; tiket tidak tersimpan | Pesan muncul, jumlah tiket tetap | Lulus | |
| U05 | FW3 | Hari ini Selasa. Tiket belum diambil: D-004 janji Senin (menginap), D-005 janji Kamis (menginap), D-006 janji Selasa (siap). Buka daftar. | Urutan D-004, D-006, D-005; D-004 bertanda Terlambat | Sesuai harapan | Lulus | |
| U06 | FW1 | Buat tiket D-007. Muat ulang halaman, lalu tutup dan buka lagi browser. Buat 1 tiket baru. | D-007 masih ada; tiket baru D-008 | D-007 ada; tiket baru D-008 | Lulus | |

Cek minimum: 6 kasus uji; 3 kasus tepi (U02, U03, U04); FW1 diuji di U01 dan U06, FW2 di U02 sampai U04, FW3 di U05; satu kasus Gagal dengan tindak lanjut.

## 4. Cek sebelum commit

- [ ] Ada minimal 5 kasus uji, dan minimal 2 di antaranya bertanda `(tepi)` atau `(ekstrem)`.
- [ ] Setiap FW di README muncul minimal sekali di kolom Fitur.
- [ ] Hasil aktual kutulis setelah menjalankan aplikasi di link live.
- [ ] Setiap kasus Gagal punya penyebab, perbaikan dengan commit, dan hasil uji ulang (atau alasan belum diperbaiki).
- [ ] Status FW di README bagian 5 sudah diperbarui.

## 5. Isianmu

Semua yang ada di bawah judul ini adalah isianmu, dan hanya bagian ini yang diperiksa dosen. Jangan menghapus judul ini dan jangan menambah bagian baru sesudahnya.

**Lingkungan uji:** link live `<isi>` · perangkat dan browser `<isi>` · versi commit `<isi>`

| ID | Fitur | Langkah/Input | Hasil yang diharapkan | Hasil aktual | Lulus/Gagal | Tindak lanjut |
|---|---|---|---|---|---|---|
| U01 | `<isi>` | `<isi>` | `<isi>` | `<isi>` | `<isi>` | `<isi>` |
| U02 | `<isi>` | `<isi>` | `<isi>` | `<isi>` | `<isi>` | `<isi>` |
| U03 | `<isi>` | `<isi>` | `<isi>` | `<isi>` | `<isi>` | `<isi>` |
| U04 | `<isi>` | `<isi>` | `<isi>` | `<isi>` | `<isi>` | `<isi>` |
| U05 | `<isi>` | `<isi>` | `<isi>` | `<isi>` | `<isi>` | `<isi>` |

Kolom Tindak lanjut boleh kosong hanya untuk kasus yang Lulus.
