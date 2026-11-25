// Uji untuk js/storage.js. Jalankan dari folder repo:  node --test tests/
// Tidak perlu npm install: node:test dan node:assert sudah bawaan Node.
const test = require('node:test');
const assert = require('node:assert/strict');
const CTStorage = require('../js/storage.js');

// localStorage palsu: perilakunya sama dengan localStorage di browser.
// quotaBytes (opsional) membuat setItem melempar error kalau isi terlalu besar.
function fakeStorage(quotaBytes) {
  const map = new Map();
  return {
    get length() { return map.size; },
    key(i) { return Array.from(map.keys())[i] ?? null; },
    getItem(k) { return map.has(k) ? map.get(k) : null; },
    setItem(k, v) {
      const used = Array.from(map.entries())
        .filter(([key]) => key !== k)
        .reduce((n, [key, val]) => n + key.length + val.length, 0);
      if (quotaBytes !== undefined && used + k.length + String(v).length > quotaBytes) {
        const err = new Error('quota');
        err.name = 'QuotaExceededError';
        throw err;
      }
      map.set(k, String(v));
    },
    removeItem(k) { map.delete(k); },
    dump() { return Object.fromEntries(map); },
  };
}

test('create, list, get, update, remove', () => {
  const db = CTStorage.open('uji', { storage: fakeStorage() });
  assert.deepEqual(db.list('catatan'), []);

  const a = db.create('catatan', { title: 'A' });
  const b = db.create('catatan', { title: 'B' });
  assert.equal(typeof a.id, 'string');
  assert.notEqual(a.id, b.id);
  assert.deepEqual(db.list('catatan').map((x) => x.title), ['A', 'B']);
  assert.deepEqual(db.get('catatan', a.id), { id: a.id, title: 'A' });
  assert.equal(db.get('catatan', 'tidak-ada'), null);

  const changed = db.update('catatan', a.id, { title: 'A2', id: 'dibajak' });
  assert.deepEqual(changed, { id: a.id, title: 'A2' }, 'id tidak boleh berubah');
  assert.equal(db.update('catatan', 'tidak-ada', { title: 'x' }), null);

  assert.equal(db.remove('catatan', a.id), true);
  assert.equal(db.remove('catatan', a.id), false);
  assert.deepEqual(db.list('catatan').map((x) => x.id), [b.id]);
});

test('list mengembalikan salinan, bukan data asli', () => {
  const db = CTStorage.open('uji', { storage: fakeStorage() });
  db.create('catatan', { title: 'A' });
  db.list('catatan')[0].title = 'diubah di luar';
  assert.equal(db.list('catatan')[0].title, 'A');
});

test('makeId menghasilkan id unik', () => {
  const ids = new Set(Array.from({ length: 2000 }, () => CTStorage.makeId()));
  assert.equal(ids.size, 2000);
});

test('nama koleksi tidak valid ditolak', () => {
  const db = CTStorage.open('uji', { storage: fakeStorage() });
  assert.throws(() => db.create('', { title: 'x' }), /Nama koleksi/);
  assert.throws(() => db.list('_rahasia'), /Nama koleksi/);
  assert.throws(() => db.list('ada spasi'), /Nama koleksi/);
});

test('prefix memisahkan data dua aplikasi di browser yang sama', () => {
  const storage = fakeStorage();
  const kasir = CTStorage.open('kasir', { storage });
  const stok = CTStorage.open('stok', { storage });
  kasir.create('barang', { name: 'Kopi' });
  assert.deepEqual(stok.list('barang'), []);
  assert.deepEqual(Object.keys(storage.dump()), ['kasir:barang']);
  assert.deepEqual(Object.keys(stok.exportData().data), []);
});

test('prefix kosong atau berisi titik dua ditolak', () => {
  assert.throws(() => CTStorage.open('', { storage: fakeStorage() }), /Prefix/);
  assert.throws(() => CTStorage.open('a:b', { storage: fakeStorage() }), /Prefix/);
});

test('exportData punya bentuk tetap', () => {
  const db = CTStorage.open('uji', { storage: fakeStorage() });
  db.create('catatan', { title: 'A' });
  db.create('kategori', { name: 'Umum' });
  const out = db.exportData();
  assert.equal(out.app, 'uji');
  assert.equal(out.version, 1);
  assert.deepEqual(Object.keys(out.data).sort(), ['catatan', 'kategori']);
  assert.equal(out.data.catatan[0].title, 'A');
  // exportJSON harus bisa dibaca balik oleh importJSON (misalnya di HP lain)
  const db2 = CTStorage.open('uji', { storage: fakeStorage() });
  db2.importJSON(db.exportJSON());
  assert.deepEqual(db2.list('kategori'), db.list('kategori'));
});

test('import menolak file milik aplikasi lain atau versi yang lebih baru', () => {
  const { storage, db, before } = setupWithData();
  const other = JSON.stringify({ app: 'kasir', version: 1, data: { catatan: [] } });
  assert.throws(() => db.importJSON(other), /milik aplikasi "kasir", bukan aplikasi "uji"/);
  const newer = JSON.stringify({ app: 'uji', version: 2, data: { catatan: [] } });
  assert.throws(() => db.importJSON(newer), /versi 2.*sampai versi 1/);
  assert.equal(JSON.stringify(storage.dump()), before);
});

test('kunci asing dengan nama tidak valid dilewati saat ekspor, dengan peringatan', () => {
  const storage = fakeStorage();
  const warnings = [];
  const db = CTStorage.open('uji', { storage, onWarn: (m) => warnings.push(m) });
  db.create('catatan', { title: 'A' });
  storage.setItem('uji:ada spasi', '[]');
  assert.deepEqual(Object.keys(db.exportData().data), ['catatan']);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /uji:ada spasi/);
});

test('parseJSON memberi pesan bahasa Indonesia', () => {
  assert.deepEqual(CTStorage.parseJSON('{"a":1}'), { a: 1 });
  assert.throws(() => CTStorage.parseJSON('{"a":1,}'), /bukan JSON yang valid/);
});

test('importJSON mengganti semua data lama', () => {
  const db = CTStorage.open('uji', { storage: fakeStorage() });
  db.create('lama', { x: 1 });
  db.importJSON(JSON.stringify({ data: { catatan: [{ id: 'n1', title: 'Baru' }] } }));
  assert.deepEqual(db.list('lama'), []);
  assert.deepEqual(db.list('catatan'), [{ id: 'n1', title: 'Baru' }]);
});

function setupWithData() {
  const storage = fakeStorage();
  const db = CTStorage.open('uji', { storage });
  db.create('catatan', { title: 'Tetap ada' });
  return { storage, db, before: JSON.stringify(storage.dump()) };
}

test('import menolak teks yang bukan JSON tanpa mengubah data', () => {
  const { storage, db, before } = setupWithData();
  assert.throws(() => db.importJSON('{ ini bukan json'), /bukan JSON yang valid/);
  assert.throws(() => db.importJSON(''), /bukan JSON yang valid/);
  assert.equal(JSON.stringify(storage.dump()), before);
});

test('import menolak bentuk data yang salah tanpa setengah menulis', () => {
  const { storage, db, before } = setupWithData();
  const bad = [
    '[]',
    'null',
    '"teks"',
    '{}',
    '{"data": []}',
    '{"data": {"catatan": "bukan daftar"}}',
    '{"data": {"catatan": [1, 2]}}',
    '{"data": {"catatan": [{"title": "tanpa id"}]}}',
    '{"data": {"catatan": [{"id": "a"}, {"id": "a"}]}}',
    '{"data": {"_rahasia": []}}',
    // koleksi pertama benar, koleksi kedua salah: tidak boleh ada yang tertulis
    '{"data": {"baru": [{"id": "ok"}], "rusak": [{"id": 5}]}}',
  ];
  for (const text of bad) {
    assert.throws(() => db.importJSON(text), Error, text);
    assert.equal(JSON.stringify(storage.dump()), before, 'data berubah setelah: ' + text);
  }
});

test('import yang gagal karena kuota memulihkan data lama', () => {
  const storage = fakeStorage(200);
  const db = CTStorage.open('uji', { storage });
  db.create('catatan', { title: 'Lama' });
  const before = JSON.stringify(storage.dump());
  const big = { data: { a: [{ id: '1', t: 'x'.repeat(80) }], b: [{ id: '2', t: 'y'.repeat(150) }] } };
  assert.throws(() => db.importData(big), /penuh/);
  assert.equal(JSON.stringify(storage.dump()), before);
});

test('create saat kuota penuh memberi pesan jelas dan data lama utuh', () => {
  const storage = fakeStorage(60);
  const db = CTStorage.open('uji', { storage });
  db.create('catatan', { title: 'kecil' });
  const before = JSON.stringify(storage.dump());
  assert.throws(() => db.create('catatan', { title: 'x'.repeat(100) }), /Penyimpanan browser penuh/);
  assert.equal(JSON.stringify(storage.dump()), before);
});

test('isi localStorage yang rusak dibaca sebagai daftar kosong', () => {
  const storage = fakeStorage();
  storage.setItem('uji:catatan', '{rusak');
  storage.setItem('uji:lain', '{"bukan":"daftar"}');
  const db = CTStorage.open('uji', { storage, onWarn: () => {} });
  assert.deepEqual(db.list('catatan'), []);
  assert.deepEqual(db.list('lain'), []);
});

test('seedOnce hanya mengisi data contoh sekali', () => {
  const storage = fakeStorage();
  const db = CTStorage.open('uji', { storage });
  const sample = { data: { catatan: [{ id: 's1', title: 'Contoh' }] } };
  assert.equal(db.seedOnce(sample), true);
  db.remove('catatan', 's1');
  assert.equal(db.seedOnce(sample), false, 'tidak mengisi ulang setelah pengguna menghapus');
  assert.deepEqual(db.list('catatan'), []);
  assert.deepEqual(Object.keys(db.exportData().data), ['catatan'], 'penanda seed tidak ikut diekspor');
});

test('seedOnce tidak menimpa data yang sudah ada', () => {
  const db = CTStorage.open('uji', { storage: fakeStorage() });
  db.create('catatan', { title: 'Milik pengguna' });
  assert.equal(db.seedOnce({ data: { catatan: [{ id: 's1', title: 'Contoh' }] } }), false);
  assert.equal(db.list('catatan')[0].title, 'Milik pengguna');
});

test('clearAll hanya menghapus data aplikasi ini', () => {
  const storage = fakeStorage();
  const a = CTStorage.open('a', { storage });
  const b = CTStorage.open('b', { storage });
  a.create('x', { v: 1 });
  b.create('x', { v: 2 });
  a.clearAll();
  assert.deepEqual(a.list('x'), []);
  assert.equal(b.list('x').length, 1);
});

test('tanpa localStorage, open memberi pesan jelas', () => {
  assert.throws(() => CTStorage.open('uji', { storage: null }), /localStorage tidak tersedia/);
});
