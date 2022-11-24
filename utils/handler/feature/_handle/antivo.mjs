const handle = async(m, { q, d, conn, isAdmin }) => {
	if (!m.chat.endsWith(q.idgc)) return
	if (conn.db.data.chat[m.chat].antivo) {
		if (/viewOnce/.test(m.mtype)) {
			if (!isAdmin) return
			let dl = await m.download();
			conn.sendMessage(m.chat, { [m.mtype.replace(/Message/, '')]: dl, caption: `<Anti View Once/>\n\nMatikan anti View Once di *.info*\nCaption: ${m.message[m.mtype].caption}`}, {quoted: d.f1('Anti View Once...','')})
		}
	}
};

export default handle;