# AI Prompt Journal

**Minggu:** sepanjang proyek, dari kickoff sampai PAS · **Dinilai di:** PTS, kriteria *AI Prompt Journal* (30 poin) dan PAS, kriteria *AI Prompt Journal lanjutan* (15 poin)

> [!TIP]
> **Pilar CT yang dilatih: Evaluation**, ditambah pilar apa pun yang sedang kamu kerjakan saat bertanya ke AI. AI boleh dipakai sebebasnya. Nilaimu datang dari **menemukan dan membuktikan** kesalahannya, bukan dari seberapa sering kamu bertanya.

## 1. Yang harus ada

**Sampai PTS (rilis `v-pts`)**

- [ ] **Minimal 5 entri**, termasuk **minimal 3 kesalahan AI** yang ditemukan dan dikoreksi dengan bukti (aturannya di bawah).

**Sampai PAS (rilis `v-pas`)**

- [ ] **Minimal 3 entri baru** setelah rilis `v-pts`, termasuk **minimal 1 kesalahan AI baru** yang ditemukan dan dikoreksi dengan bukti.

**Setiap entri** memuat tujuh bagian ini, dengan urutan ini: **Tanggal · Tujuan · Prompt · Ringkasan jawaban AI · Penilaian saya · Koreksi & alasan · Pilar CT.**

**Satu entri dihitung sebagai "kesalahan AI dikoreksi"** kalau memenuhi ketiganya:

1. Penilaian saya: `salah` atau `kurang`.
2. Koreksi & alasan menulis **jawaban yang benar** dan **bukti pemeriksaan** yang bisa diulang orang lain: output kode yang kamu jalankan, kode baris data dari `01` (misalnya T05), uji tangan, atau jawaban narasumber.
3. Koreksi itu **dipakai**: sebut file atau commit tempat hasil koreksinya ada.

Penilaian `salah` atau `kurang` tanpa bukti tidak dihitung sebagai kesalahan AI. Dosen boleh menanyakan entri mana pun saat tanya jawab PAS, jadi tulis hanya yang benar-benar kamu alami dan pahami.

Anjuran (tidak dinilai sebagai minimum): sebarkan entri PTS ke minimal 3 pilar CT berbeda, supaya AI dipakai di setiap tahap blueprint, bukan hanya untuk kode.

## 2. Cara mengerjakan

1. **Tulis entri saat itu juga**, bukan di akhir minggu. Prompt dan jawabannya cepat terlupa.
2. **Salin prompt persis** seperti yang kamu kirim. Sebut nama tool AI-nya di awal. Prompt yang sangat panjang boleh dipotong dengan `[...]`, asal bagian pentingnya tetap ada.
3. **Ringkas jawaban AI** dengan kalimatmu sendiri, maksimal 5 kalimat. Kode boleh ditempel kalau pendek.
4. **Periksa sebelum menilai.** Jalankan kodenya, hitung ulang dari datamu, atau telusuri pseudocode-nya dengan satu contoh. Jangan menilai `benar` hanya karena jawabannya terdengar meyakinkan.
5. **Pilih satu pilar CT** yang paling dilatih di entri itu: Decomposition, Pattern Recognition, Abstraction, Algorithm Design, atau Evaluation.
6. Isi tabel rekap di bagian 5 setiap kali menambah entri.

Kesalahan AI yang sering ditemukan mahasiswa:

- Salah menghitung dari tabel yang ditempel ("7 dari 20", padahal 5).
- Mengarang jawaban narasumber atau data yang terdengar masuk akal.
- Flowchart dengan keputusan yang hanya punya satu cabang, atau cabang tanpa label.
- Memakai nama atribut yang tidak ada di model datamu.
- Kode yang lulus untuk contoh biasa tetapi gagal di kasus tepi: input kosong, data dihapus, hari libur.
- Menyebut sumber atau angka statistik yang tidak bisa dicek.

## 3. Contoh pengisian

> [!NOTE]
> Kasus netral **Servis Jam Tangan Pak Darto**. **Data fiktif untuk keperluan pembelajaran.** Contoh ini adalah satu entri fase PTS. Kesalahan AI-nya halus: kodenya berjalan tanpa error dan lulus untuk contoh biasa.

### J03 · Nomor tiket otomatis untuk FW1

**Tanggal:** `<tanggal sesi kerja>`, minggu PTS−1

**Tujuan:** Mendapatkan cara membuat nomor tiket berikutnya untuk FW1, lalu menuliskannya di pseudocode FW1.

**Prompt:**

> (tool AI: `<nama tool>`) Saya membuat aplikasi tiket servis jam untuk kios kecil. Data tiket disimpan di localStorage sebagai array objek dengan atribut noTiket, panggilan, ciriJam. Buatkan fungsi JavaScript buatNoTiket(daftarTiket) yang menghasilkan nomor tiket berikutnya dengan format D-001, D-002, dan seterusnya. Nomor tiket tidak boleh dipakai ulang.

**Ringkasan jawaban AI:** AI memberi fungsi yang mengambil panjang daftar tiket, menambah 1, lalu menambahkan nol di depan. Menurut AI, nomornya "selalu bertambah sehingga tidak akan dipakai ulang".

```js
function buatNoTiket(daftarTiket) {
  const urut = daftarTiket.length + 1;
  return "D-" + String(urut).padStart(3, "0");
}
```

**Penilaian saya:** salah

**Koreksi & alasan:**

Nomor hanya bertambah selama tidak ada tiket yang dihapus. Saya menyalin fungsi dari AI ke file `uji-tiket.js`, menambahkan tiga baris di bawah ini (satu tiket dihapus), lalu menjalankan `node uji-tiket.js`:

```js
let daftar = [{ noTiket: "D-001" }, { noTiket: "D-002" }, { noTiket: "D-003" }];
daftar = daftar.filter((t) => t.noTiket !== "D-002"); // D-002 dihapus (salah input)
console.log(buatNoTiket(daftar)); // nomor baru
```

Output: `D-003`. Nomor itu sudah dipakai jam lain. Di kios, label kertas D-003 masih terikat di jam lama, jadi dua jam berlabel sama: persis masalah jam tertukar di pola P3.

Ada dua cara memperbaiki, dan masing-masing sendirian masih bolong:

- "Nomor terbesar di data + 1": kalau tiket terakhir (D-003) yang dihapus, nomor D-003 keluar lagi.
- Penghitung `nomorTerakhir` yang hanya naik: kalau cadangan JSON diimpor di HP lain, penghitung di HP itu masih 0, jadi nomor D-001 keluar lagi padahal sudah ada di data.

Koreksinya memakai keduanya: nomor baru = yang terbesar di antara `nomorTerakhir` dan nomor di data, ditambah 1. `nomorTerakhir` disimpan di koleksi data yang sama (misalnya koleksi `pengaturan`), supaya ikut terekspor. Saya menjalankan `node koreksi-tiket.js`:

```js
const assert = require("node:assert");

// Versi koreksi: lanjut dari yang terbesar di antara penghitung dan nomor yang ada di data
function nomorDari(noTiket) {
  return Number(noTiket.slice(2)); // "D-017" menjadi 17
}

function buatNoTiket(daftarTiket, nomorTerakhir) {
  let terbesar = nomorTerakhir;
  for (const t of daftarTiket) {
    terbesar = Math.max(terbesar, nomorDari(t.noTiket));
  }
  const urut = terbesar + 1;
  return { noTiket: "D-" + String(urut).padStart(3, "0"), nomorTerakhir: urut };
}

const tiga = [{ noTiket: "D-001" }, { noTiket: "D-002" }, { noTiket: "D-003" }];

// 1. D-002 dihapus
let daftar = tiga.filter((t) => t.noTiket !== "D-002");
assert.strictEqual(buatNoTiket(daftar, 3).noTiket, "D-004");

// 2. Tiket terakhir (D-003) dihapus: nomor D-003 tidak boleh keluar lagi
daftar = tiga.filter((t) => t.noTiket !== "D-003");
assert.strictEqual(buatNoTiket(daftar, 3).noTiket, "D-004");

// 3. Cadangan diimpor di HP lain: penghitung di HP itu masih 0
assert.strictEqual(buatNoTiket(tiga, 0).noTiket, "D-004");

// 4. Lewat 999
assert.strictEqual(buatNoTiket([{ noTiket: "D-999" }], 999).noTiket, "D-1000");
assert.strictEqual(buatNoTiket([{ noTiket: "D-1000" }], 0).noTiket, "D-1001");

console.log("semua uji lulus");
```

Output: `semua uji lulus`. Keempat uji mewakili hapus di tengah, hapus tiket terakhir, impor di HP lain, dan nomor di atas 999. Koreksi ini dipakai di pseudocode FW1 (`04-algorithm.md`) dan menjadi kasus uji U01 di `05-testing.md`.

**Pilar CT:** Evaluation

## 4. Cek sebelum commit

- [ ] Setiap entri punya ketujuh bagian, dengan prompt yang disalin persis.
- [ ] Setiap penilaian `salah` atau `kurang` punya bukti pemeriksaan yang bisa diulang dan menyebut file atau commit tempat koreksinya dipakai.
- [ ] Tabel rekap sesuai dengan isi entri.
- [ ] Menjelang PTS: minimal 5 entri, termasuk 3 kesalahan AI dikoreksi. Menjelang PAS: minimal 3 entri baru, termasuk 1 kesalahan AI baru.

## 5. Isianmu

Semua yang ada di bawah judul ini adalah isianmu, dan hanya bagian ini yang diperiksa dosen. Jangan menghapus judul ini dan jangan menambah bagian baru sesudahnya.

### Rekap

| Fase | Jumlah entri | Kesalahan AI dikoreksi (kode entri) | Pilar CT yang tercakup |
|---|---|---|---|
| PTS | `<isi>` | `<isi: misalnya J02, J03, J05>` | `<isi: anjuran 3 pilar atau lebih>` |
| PAS | `<isi>` | `<isi>` | `<isi>` |

### Fase PTS

Salin blok di bawah ini untuk setiap entri. Nomori berurutan (J01, J02, dan seterusnya) dan lanjutkan nomornya di fase PAS.

#### J01 · `<isi: judul singkat>`

**Tanggal:** `<isi>`, minggu `<isi: misalnya PTS−4>`

**Tujuan:** `<isi: apa yang ingin kamu dapatkan dan untuk file mana>`

**Prompt:**

> (tool AI: `<isi>`) `<isi: salin persis>`

**Ringkasan jawaban AI:** `<isi: maksimal 5 kalimat>`

**Penilaian saya:** `<isi: benar / salah / kurang>`

**Koreksi & alasan:** `<isi: jawaban yang benar, bukti pemeriksaan, dan file atau commit tempat koreksi dipakai>`

**Pilar CT:** `<isi: Decomposition / Pattern Recognition / Abstraction / Algorithm Design / Evaluation>`

### Fase PAS

Entri setelah rilis `v-pts` ditulis di sini, dengan format yang sama.
