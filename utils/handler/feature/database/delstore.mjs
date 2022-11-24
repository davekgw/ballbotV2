const handle = async(m, { conn, q, repl }) => {
	if (!m.query) return repl(`Salah command!!!\nContoh : *.delstore jb-store`);
	let store = {
		k: m.query.toLowerCase(),
		b: m.query.toUpperCase(),
	};
	let db = conn.db.data.store;
	if (!db[store.k] && !db[store.b]) return repl(`Store yang anda ingin delete listnya tidak ada\nAdd store dengan perintah .cs *nama store*\nAtau cari Nama store di bot ini dengan perintah .liststore`);
	if (!db[store.b].creator.includes(m.sender)) return repl(`Maaf!!!\n\nAnda siapa?\nanda bukan owner dari store ini!!!`);
	delete conn.db.data.store[store.k];
	delete conn.db.data.store[store.b];
	repl(`Sukses delete store : ${store.k} dari database bot ini`);
};

export default handle;