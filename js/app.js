/*
 * app.js: aplikasi contoh "Catatan".
 * Alurnya selalu sama:  STATE (data)  ->  RENDER (tampilan)  ->  EVENTS (aksi pengguna)
 * Setiap aksi mengubah data lewat db, lalu memanggil render() lagi.
 */

// ===== 1. PENGATURAN =====
// GANTI prefix dengan nama aplikasimu (misalnya 'laundry-ani') supaya datanya terpisah.
// Samakan juga nilai "app" di data/sample.json, karena impor menolak file aplikasi lain.
const db = CTStorage.open('catatan-demo');
const COLLECTION = 'catatan';
const SAMPLE_URL = 'data/sample.json';

// ===== 2. STATE =====
const state = {
  notes: [],       // salinan data dari db
  editingId: null, // id catatan yang sedang diubah, null kalau sedang menambah
};

// Elemen halaman yang dipakai berulang kali
const el = {
  form: document.getElementById('note-form'),
  formTitle: document.getElementById('form-title'),
  title: document.getElementById('note-title'),
  titleError: document.getElementById('title-error'),
  body: document.getElementById('note-body'),
  submit: document.getElementById('submit-btn'),
  cancel: document.getElementById('cancel-btn'),
  list: document.getElementById('note-list'),
  listTitle: document.getElementById('list-title'),
  count: document.getElementById('note-count'),
  empty: document.getElementById('empty-state'),
  exportBtn: document.getElementById('export-btn'),
  importBtn: document.getElementById('import-btn'),
  fileInput: document.getElementById('import-file'),
  resetBtn: document.getElementById('reset-btn'),
  status: document.getElementById('status'),
};

// Data dari file impor bisa tidak lengkap atau salah tipe.
// Fungsi ini memastikan setiap catatan punya judul dan isi berupa teks.
function toNote(item) {
  return {
    id: item.id,
    title: typeof item.title === 'string' ? item.title.trim() : '',
    body: typeof item.body === 'string' ? item.body : '',
  };
}

function titleOf(note) {
  return note.title || '(tanpa judul)';
}

function loadNotes() {
  state.notes = db.list(COLLECTION).map(toNote);
}

// ===== 3. RENDER =====
function render() {
  const notes = state.notes.slice().reverse(); // terbaru di atas
  el.list.replaceChildren(...notes.map(renderNote));
  el.empty.hidden = notes.length > 0;
  el.count.textContent = notes.length + ' catatan';

  const editing = state.editingId !== null;
  el.formTitle.textContent = editing ? 'Ubah catatan' : 'Tulis catatan';
  el.submit.textContent = editing ? 'Simpan perubahan' : 'Simpan catatan';
  el.cancel.hidden = !editing;
}

// textContent (bukan innerHTML) supaya isi catatan tidak dijalankan sebagai HTML
function renderNote(note) {
  const li = document.createElement('li');
  li.className = 'note' + (note.id === state.editingId ? ' is-editing' : '');

  const text = document.createElement('div');
  const title = document.createElement('h3');
  title.className = 'note-title';
  title.textContent = titleOf(note);
  text.append(title);
  if (note.body) {
    const body = document.createElement('p');
    body.className = 'note-body';
    body.textContent = note.body;
    text.append(body);
  }

  const actions = document.createElement('div');
  actions.className = 'note-actions';
  actions.append(
    makeButton('Ubah', 'btn btn-quiet', 'Ubah catatan ' + titleOf(note), () => startEdit(note.id)),
    makeButton('Hapus', 'btn btn-quiet btn-danger', 'Hapus catatan ' + titleOf(note), () => deleteNote(note.id)),
  );

  li.append(text, actions);
  return li;
}

function makeButton(label, className, ariaLabel, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = label;
  button.setAttribute('aria-label', ariaLabel);
  button.addEventListener('click', onClick);
  return button;
}

let statusTimer;
function showStatus(message, type) {
  clearTimeout(statusTimer);
  el.status.textContent = message;
  el.status.className = 'status' + (type ? ' is-' + type : '');
  const ms = type === 'error' ? 8000 : 4000; // pesan error tampil lebih lama
  statusTimer = setTimeout(() => { el.status.textContent = ''; }, ms);
}

// Error tampil di layar (untuk pengguna) dan di Console (untuk kamu saat debugging)
function showError(context, err) {
  console.error(context, err);
  showStatus(context + ' ' + err.message, 'error');
}

function showTitleError(show) {
  el.titleError.hidden = !show;
  el.title.setAttribute('aria-invalid', String(show));
}

// ===== 4. AKSI =====
function saveForm() {
  const data = { title: el.title.value.trim(), body: el.body.value.trim() };
  if (data.title === '') {
    showTitleError(true);
    el.title.focus();
    return;
  }
  showTitleError(false);
  if (state.editingId === null) {
    db.create(COLLECTION, data);
    showStatus('Catatan tersimpan.', 'success');
  } else {
    db.update(COLLECTION, state.editingId, data);
    showStatus('Perubahan tersimpan.', 'success');
  }
  resetForm();
  loadNotes();
  render();
}

function startEdit(id) {
  const found = db.get(COLLECTION, id);
  if (!found) return;
  const note = toNote(found);
  state.editingId = id;
  el.title.value = note.title;
  el.body.value = note.body;
  showTitleError(false);
  render();
  el.title.focus();
}

function resetForm() {
  state.editingId = null;
  el.form.reset();
  showTitleError(false);
}

function deleteNote(id) {
  const found = db.get(COLLECTION, id);
  if (!found || !confirm('Hapus catatan "' + titleOf(toNote(found)) + '"?')) return;
  db.remove(COLLECTION, id);
  if (state.editingId === id) resetForm();
  loadNotes();
  render();
  el.listTitle.focus(); // tombol yang diklik sudah hilang, fokus pindah ke judul daftar
  showStatus('Catatan dihapus.', 'success');
}

function readImportFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      db.importJSON(reader.result);
    } catch (err) {
      showError('Impor dibatalkan.', err); // data lama tetap utuh
      return;
    }
    resetForm();
    loadNotes();
    render();
    showStatus('Impor berhasil: ' + state.notes.length + ' catatan.', 'success');
  };
  reader.onerror = () => showError('Impor dibatalkan.', new Error('File tidak bisa dibaca.'));
  reader.readAsText(file);
}

// Mengambil teks data/sample.json. Hasilnya null kalau browser tidak bisa mengambil
// file itu, misalnya karena index.html dibuka langsung (file://) atau file tidak ada.
async function fetchSampleText() {
  if (location.protocol === 'file:') return null; // file://: browser memblokir fetch, jadi tidak dicoba
  try {
    const response = await fetch(SAMPLE_URL);
    if (response.ok) return await response.text();
    console.warn(SAMPLE_URL + ' tidak bisa diambil (status ' + response.status + ').');
  } catch (err) {
    console.warn(SAMPLE_URL + ' tidak bisa diambil.', err);
  }
  return null;
}

async function resetSample() {
  if (!confirm('Semua catatan diganti dengan data contoh. Lanjutkan?')) return;
  const text = await fetchSampleText();
  if (text === null) {
    showStatus('Data contoh hanya bisa dimuat lewat server lokal atau situs online, bukan file://.', 'error');
    return;
  }
  try {
    db.importJSON(text); // JSON rusak, bentuk salah, atau penyimpanan penuh: pesan dari storage.js
  } catch (err) {
    showError('Data contoh tidak dimuat.', err);
    return;
  }
  resetForm();
  loadNotes();
  render();
  showStatus('Data contoh dimuat ulang.', 'success');
}

// Wrapper: error dari db (misalnya penyimpanan penuh) tampil sebagai pesan, bukan crash
function safely(action) {
  return (...args) => {
    try {
      return action(...args);
    } catch (err) {
      showError('Gagal.', err);
    }
  };
}

// ===== 5. EVENTS =====
el.form.addEventListener('submit', (event) => {
  event.preventDefault();
  safely(saveForm)();
});
el.title.addEventListener('input', () => {
  if (el.title.value.trim() !== '') showTitleError(false);
});
el.cancel.addEventListener('click', () => {
  resetForm();
  render();
});
el.exportBtn.addEventListener('click', safely(() => {
  db.downloadJSON(db.prefix + '-data.json');
  showStatus('File ' + db.prefix + '-data.json diunduh.', 'success');
}));
el.importBtn.addEventListener('click', () => el.fileInput.click());
el.fileInput.addEventListener('change', () => {
  const file = el.fileInput.files[0];
  el.fileInput.value = ''; // supaya file yang sama bisa dipilih lagi
  if (file && confirm('Impor akan mengganti semua catatan dengan isi file. Lanjutkan?')) {
    readImportFile(file);
  }
});
el.resetBtn.addEventListener('click', resetSample);

// ===== FITUR KAMU =====
// Tambahkan fitur wajib kasusmu di sini dengan pola yang sama:
//   1. tambah koleksi baru, misalnya db.create('order', { ... })
//   2. tulis fungsi render untuk menampilkannya
//   3. pasang event pada tombol atau formulirnya
// Pisahkan perhitungan (total harga, antrean, stok) ke fungsi biasa tanpa DOM
// supaya mudah diuji dan dijelaskan saat tanya jawab.

// ===== 6. MULAI =====
async function start() {
  loadNotes();
  render();
  const text = await fetchSampleText();
  if (text === null) return; // file:// atau sample.json tidak ada: lanjut tanpa data contoh
  try {
    if (db.seedOnce(CTStorage.parseJSON(text))) { // hanya pada kunjungan pertama
      loadNotes();
      render();
    }
  } catch (err) {
    showError('Data contoh tidak dimuat.', err);
  }
}
start();
