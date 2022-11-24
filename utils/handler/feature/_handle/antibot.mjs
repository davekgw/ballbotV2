
const handle = async(m, { up, q, d, conn, isBotAdmin, isAdmin, budy, repl }) => {
	// REPLY
	const rep = async (teks) => await conn.sendteks(m.chat, teks, d.f1('Notifikasi Keamanan Group', ''))
	// KICK
	const kik = async () => await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
	if (!m.chat.endsWith(q.idgc)) return
	if (conn.db.data.chat[m.chat].antibot) {
		if (up.key.id.startsWith('BAE5') && !up.key.fromMe) {
			rep('[ ANTI BOT ]\ngroup ini dilengkapi dengan anti bot\nanda melanggar larangan bot\nAnda berhak di kick');
			if (isAdmin) return repl('Maaf Kamu admin ternyata')
			if (m.isOwn) return repl('Oh tidak, kamu ownerku')
			if (!isBotAdmin) return repl('Oh tidak, Bot not admin')
			kik();
		}
	}
};

export default handle;