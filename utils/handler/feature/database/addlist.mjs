const handle = async(m, { conn, q, repl }) => {
	if (!m.quoted && !m.query) return repl(`Salah command!!!\nContoh : *.addlist jb-store@Mobile legends@Ini adalah store mobile legends,* Sambil mereply isian list nya`)
	let [st, nameList, desc] = m.query.split('@')
	if (!st) return repl(`Salah command!!!\nContoh : *.addlist jb-store@Mobile legends@Ini adalah store mobile legends,* Sambil mereply isian list nya`);
	if (!nameList) return repl(`Salah command!!!\nContoh : *.addlist jb-store@Mobile legends@Ini adalah store mobile legends,* Sambil mereply isian List nya`);
	let store = {
		k: st.toLowerCase(),
		b: st.toUpperCase(),
	}
	let db = conn.db.data.store
	if (!db[store.k] && !db[store.b]) return repl(`Store yang anda ingin add listnya tidak ada\nAdd store dengan perintah .cs *nama store*\nAtau cari Nama store di bot ini dengan perintah .liststore`);
	if (!db[store.b].creator.includes(m.sender)) return repl(`Maaf!!!\n\nAnda siapa?\nanda bukan owner dari store ini!!!`, m);
	conn.db.data.store[store.k][nameList.toLowerCase()] = {}
	conn.db.data.store[store.k][nameList.toLowerCase()].tilte = nameList.toLowerCase()
	conn.db.data.store[store.k][nameList.toLowerCase()].des = desc
	conn.db.data.store[store.k][nameList.toLowerCase()].isi = m.quoted.text
	conn.db.data.store[store.b].update = new Date()*1
	repl(`Sukses add list ke store ${store.k} dengan Nama list ${nameList}\n${desc ? `Dengan Deskripsi : ${desc}` : ''}`);
}

export default handle;