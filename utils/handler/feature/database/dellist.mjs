const handle = async(m, { conn, q, repl }) => {
	let [st, nameList] = m.query.split('@')
	if (!st) return repl(`Salah command!!!\nContoh : *.dellist jb-store@Mobile legends`);
	if (!nameList) return repl(`Salah command!!!\nContoh : *.dellist jb-store@Mobile legends`);
	let store = {
		k: st.toLowerCase(),
		b: st.toUpperCase(),
	}
	let db = conn.db.data.store
	if (!db[store.k] && !db[store.b]) return repl(`Store yang anda ingin delete listnya tidak ada\nAdd store dengan perintah .cs *nama store*\nAtau cari Nama store di bot ini dengan perintah .liststore`);
	if (!db[store.b].creator.includes(m.sender)) return repl(`Maaf!!!\n\nAnda siapa?\nanda bukan owner dari store ini!!!`);
	if (!db[store.k][nameList.toLowerCase()]) return repl(`List yang anda ingin delete di store ${store.b} Tidak ada\nCek list store dengan mengetikan namanya\ncontoh : .drian-store`);
	delete conn.db.data.store[store.k][nameList.toLowerCase()]
	conn.db.data.store[store.b].update = new Date()*1
	repl(`Sukses delete list ${nameList} dari store ${store}`);
}

export default handle;