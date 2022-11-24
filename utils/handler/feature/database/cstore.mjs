const handle = async(m, { conn, q, repl }) => {
	if (!m.query) return repl(`Masukan Nama store yang ingin anda gunakan!!!`);
	let store = {
		k: m.query.toLowerCase(),
		b: m.query.toUpperCase(),
	}
	conn.db.data.store[store.k] = {}
	conn.db.data.store[store.b] = {}
	conn.db.data.store[store.b].creator = [m.sender]
	conn.db.data.store[store.b].date = new Date()*1
	conn.db.data.store[store.b].update = new Date()*1
	repl(`Sukses membuat Nama store dengan nama ${m.query} Silahkan anda memanggil store dengan nama store nya\nContoh : .drian-store`)
};

export default handle;