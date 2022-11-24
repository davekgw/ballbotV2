
const handle = async(m, { up, q, d, conn, isBotAdmin, isAdmin, budy, repl }) => {
	// REPLY
	const rep = async (teks) => await conn.sendteks(m.chat, teks, d.f1('Notifikasi Keamanan Group', ''))
	// DELETE
	const del = async () => await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender} });
	if (!m.chat.endsWith(q.idgc)) return
	if (conn.db.data.chat[m.chat].antivn) {
		if (m.mtype === 'audioMessage') {
			rep('[ ANTI VOICE NOTE ]\ngroup ini dilengkapi dengan anti VN\nVN anda dihapus bot');
			if (isAdmin) return repl('Maaf Kamu admin ternyata');
			if (m.isOwn) return repl('Oh tidak, kamu ownerku');
			if (!isBotAdmin) return repl('Oh tidak, Bot not admin');
			del();
		}
	}
};

export default handle;