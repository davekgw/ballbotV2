const handle = async (m, {q, conn }) => {
	let db = conn.db.data.store
	if (!db[m.command.toLowerCase()]) return
	if (db[m.command.toLowerCase()]) {
		let b = Object.values(db[m.command.toLowerCase()])
		let list = b.length !== 0 ? b.map(v=> [v.tilte, `.store ${m.command.toLowerCase()}@${v.tilte}`, v.des ? v.des : '']) : [['belom ada list disini', '', 'perintah add list : *.addlist namastore@namalist@namadeskripsi* \nLakukan lah sambil mereply pesan isi']]
		conn.sendlist(m.chat, `List message dari ${m.command}\n`, q.name, list, m)
	}
}

export default handle;