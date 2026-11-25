/*
 * storage.js: penyimpan data sederhana di localStorage browser.
 *
 * Cara pakai (di app.js):
 *   const db = CTStorage.open('nama-aplikasi');   // prefix unik per aplikasi
 *   db.create('pelanggan', { nama: 'Ani' });      // -> { id: '...', nama: 'Ani' }
 *   db.list('pelanggan');                         // -> semua data pelanggan
 *   db.get('pelanggan', id);                      // -> satu data atau null
 *   db.update('pelanggan', id, { nama: 'Ana' });  // -> data baru atau null
 *   db.remove('pelanggan', id);                   // -> true kalau terhapus
 *
 * Setiap "koleksi" (pelanggan, order, stok, ...) disimpan sebagai satu daftar
 * JSON di localStorage dengan kunci "prefix:koleksi", misalnya "kasir:order".
 * Prefix membuat dua aplikasi di localhost tidak saling menimpa data.
 */
const CTStorage = {
  VERSION: 1,                                // versi format file ekspor
  NAME_PATTERN: /^[A-Za-z0-9][A-Za-z0-9_-]*$/, // nama koleksi: huruf, angka, - dan _
  SEED_FLAG: '_seeded',                      // penanda bahwa data contoh sudah pernah dimuat

  // id unik: waktu sekarang + angka acak, keduanya dalam basis 36 (0-9, a-z)
  makeId: function () {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  },

  checkName: function (name) {
    if (typeof name !== 'string' || !CTStorage.NAME_PATTERN.test(name)) {
      throw new Error('Nama koleksi "' + name + '" tidak valid. Pakai huruf, angka, - atau _.');
    }
  },

  // Mengubah teks menjadi objek. Teks yang rusak diberi pesan yang jelas.
  parseJSON: function (text) {
    try {
      return JSON.parse(text);
    } catch (e) {
      // detail asli dari browser disimpan di "cause" dan terlihat di Console
      throw new Error('File ini bukan JSON yang valid. Periksa tanda koma, kutip dan kurung.', { cause: e });
    }
  },

  // Memeriksa bentuk data impor SEBELUM ada yang ditulis.
  // Bentuk yang benar: { "app": "prefix", "version": 1, "data": { "koleksi": [ { "id": "..." } ] } }
  validate: function (obj, prefix) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      throw new Error('Isi file harus berupa objek JSON, misalnya { "data": { ... } }.');
    }
    if (obj.app !== undefined && obj.app !== prefix) {
      throw new Error('File ini milik aplikasi "' + obj.app + '", bukan aplikasi "' + prefix + '".');
    }
    if (typeof obj.version === 'number' && obj.version > CTStorage.VERSION) {
      throw new Error('File ini memakai format versi ' + obj.version + ', aplikasi ini hanya mengenal sampai versi ' + CTStorage.VERSION + '.');
    }
    const data = obj.data;
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('File tidak punya bagian "data" yang berisi koleksi.');
    }
    for (const name of Object.keys(data)) {
      CTStorage.checkName(name); // juga menolak nama internal yang diawali _
      const items = data[name];
      if (!Array.isArray(items)) {
        throw new Error('Koleksi "' + name + '" harus berupa daftar [ ... ].');
      }
      const seen = new Set();
      items.forEach(function (item, i) {
        const where = 'Data ke-' + (i + 1) + ' di koleksi "' + name + '"';
        if (!item || typeof item !== 'object' || Array.isArray(item)) {
          throw new Error(where + ' harus berupa objek { ... }.');
        }
        if (typeof item.id !== 'string' || item.id === '') {
          throw new Error(where + ' tidak punya "id" berupa teks.');
        }
        if (seen.has(item.id)) {
          throw new Error(where + ' memakai id "' + item.id + '" yang sudah dipakai.');
        }
        seen.add(item.id);
      });
    }
    return data;
  },

  open: function (prefix, options) {
    options = options || {};
    if (typeof prefix !== 'string' || prefix === '' || prefix.includes(':')) {
      throw new Error('Prefix aplikasi wajib diisi dan tidak boleh memuat tanda titik dua.');
    }
    const storage = 'storage' in options ? options.storage : browserStorage();
    if (!storage) {
      throw new Error('localStorage tidak tersedia di browser ini. Data tidak bisa disimpan.');
    }
    const warn = options.onWarn || function (msg) { console.warn(msg); };
    const keyOf = function (name) { return prefix + ':' + name; };

    // localStorage bisa diblokir browser (mode privat tertentu), jadi dibungkus try
    function browserStorage() {
      try {
        return typeof localStorage !== 'undefined' ? localStorage : null;
      } catch (e) {
        return null;
      }
    }

    // Membaca satu koleksi. Isi yang rusak dianggap kosong (dengan peringatan).
    function read(name) {
      CTStorage.checkName(name);
      const text = storage.getItem(keyOf(name));
      if (text === null) return [];
      try {
        const items = JSON.parse(text);
        if (Array.isArray(items)) return items;
      } catch (e) { /* lanjut ke peringatan di bawah */ }
      warn('Data "' + keyOf(name) + '" rusak dan dianggap kosong.');
      return [];
    }

    // Menulis satu kunci. Error kuota diubah menjadi pesan yang jelas.
    function write(key, value) {
      try {
        storage.setItem(key, value);
      } catch (e) {
        const full = e && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.code === 22);
        throw new Error(full
          ? 'Penyimpanan browser penuh. Ekspor data dulu, lalu hapus data yang tidak dipakai.'
          : 'Data tidak bisa disimpan di browser ini (' + (e && e.message) + ').');
      }
    }

    function save(name, items) {
      write(keyOf(name), JSON.stringify(items));
    }

    // Semua kunci localStorage milik aplikasi ini (diawali "prefix:")
    function ownKeys() {
      const keys = [];
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key && key.startsWith(prefix + ':')) keys.push(key);
      }
      return keys;
    }

    // Nama koleksi milik aplikasi ini. Kunci internal ("_...") dan nama aneh dilewati.
    function collectionNames() {
      return ownKeys()
        .map(function (key) { return key.slice(prefix.length + 1); })
        .filter(function (name) {
          if (name.startsWith('_')) return false;
          if (CTStorage.NAME_PATTERN.test(name)) return true;
          warn('Kunci "' + keyOf(name) + '" dilewati karena namanya tidak valid.');
          return false;
        });
    }

    const db = {
      prefix: prefix,

      list: function (name) {
        return read(name).map(function (item) { return Object.assign({}, item); });
      },

      get: function (name, id) {
        const found = read(name).find(function (item) { return item.id === id; });
        return found ? Object.assign({}, found) : null;
      },

      create: function (name, data) {
        const items = read(name);
        const item = Object.assign({}, data, { id: CTStorage.makeId() });
        items.push(item);
        save(name, items);
        return Object.assign({}, item);
      },

      update: function (name, id, changes) {
        const items = read(name);
        const index = items.findIndex(function (item) { return item.id === id; });
        if (index === -1) return null;
        items[index] = Object.assign({}, items[index], changes, { id: id }); // id tidak boleh berubah
        save(name, items);
        return Object.assign({}, items[index]);
      },

      remove: function (name, id) {
        const items = read(name);
        const rest = items.filter(function (item) { return item.id !== id; });
        if (rest.length === items.length) return false;
        save(name, rest);
        return true;
      },

      // Semua koleksi aplikasi ini dalam satu objek (bentuk sama dengan data/sample.json)
      exportData: function () {
        const data = {};
        collectionNames().forEach(function (name) { data[name] = read(name); });
        return { app: prefix, version: CTStorage.VERSION, data: data };
      },

      exportJSON: function () {
        return JSON.stringify(db.exportData(), null, 2);
      },

      // Mengunduh semua data sebagai file .json (hanya di browser)
      downloadJSON: function (filename) {
        const blob = new Blob([db.exportJSON()], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || prefix + '-data.json';
        document.body.appendChild(link); // beberapa browser hanya mengunduh dari link yang ada di halaman
        link.click();
        link.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000); // beri waktu unduhan dimulai
      },

      // Mengganti SEMUA data aplikasi ini dengan isi obj. Semua atau tidak sama sekali:
      // bentuk diperiksa dulu, dan kalau penulisan gagal di tengah, data lama dipulihkan.
      importData: function (obj) {
        const data = CTStorage.validate(obj, prefix);
        const backup = {};
        ownKeys().forEach(function (key) { backup[key] = storage.getItem(key); });
        try {
          collectionNames().forEach(function (name) { storage.removeItem(keyOf(name)); });
          Object.keys(data).forEach(function (name) { save(name, data[name]); });
        } catch (e) {
          collectionNames().forEach(function (name) { storage.removeItem(keyOf(name)); });
          Object.keys(backup).forEach(function (key) { storage.setItem(key, backup[key]); });
          throw e;
        }
      },

      importJSON: function (text) {
        db.importData(CTStorage.parseJSON(text));
      },

      // Memuat data contoh hanya pada kunjungan pertama. Hasil: true kalau data dimuat.
      seedOnce: function (obj) {
        if (storage.getItem(keyOf(CTStorage.SEED_FLAG)) !== null || collectionNames().length > 0) {
          return false;
        }
        db.importData(obj);
        write(keyOf(CTStorage.SEED_FLAG), '1');
        return true;
      },

      // Menghapus semua data aplikasi ini saja (aplikasi lain tidak tersentuh)
      clearAll: function () {
        ownKeys().forEach(function (key) { storage.removeItem(key); });
      },
    };
    return db;
  },
};

// Di browser, CTStorage langsung bisa dipakai oleh app.js.
// Di Node (tests/storage.test.js), CTStorage diambil lewat require().
if (typeof module !== 'undefined') module.exports = CTStorage;
