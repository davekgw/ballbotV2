const handle = async (m, { q, conn, bot, repl }) => {
	if (!m.isOwn) return repl(q.owner)
	if (m.args[0] == 'group') {
		conn.db.data.set[bot].public = true
		conn.db.data.set[bot].group = true
		conn.db.data.set[bot].main = false
		repl('Sukses mengganti nya ke mode group!\nSiapapun yang chat bot di private chat akan diarahkan ke group ballbot kecuali user premium!!!');
	} else if (m.args[0] == 'self') {
		conn.db.data.set[bot].group = false
		conn.db.data.set[bot].public = false
		conn.db.data.set[bot].main = false
		repl('Sukses mengganti nya ke mode Self\nBot cuma bisa di chat oleh Owner sendiri');
	} else if (m.args[0] == 'public') {
		conn.db.data.set[bot].group = false
		conn.db.data.set[bot].public = true
		conn.db.data.set[bot].main = false
		repl('Sukses mengganti nya ke mode Public\nSemua user dapat chat bot');
	} else if (m.args[0] == 'main') {
		conn.db.data.set[bot].group = false
		conn.db.data.set[bot].public = false
		conn.db.data.set[bot].main = true
		repl('Sukses mengganti nya ke mode maintenance\nSemua user dapat chat bot');
	} else {
		let list = [
				['Group', `.modes group`, ''],
				['Self', `.modes self`, ''],
				['Public', `.modes public`, ''],
				['Maintenance', `.modes main`, ''],
			]
		conn.sendlist(m.chat, `Hai owner!!\n${q.name} silahkan pilih mode nya disini!`, q.name, list, m)
	}
};

export default handle;