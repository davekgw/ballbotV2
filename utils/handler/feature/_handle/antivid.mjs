
const handle = async(m, { up, q, d, conn, isBotAdmin, isAdmin, budy, repl }) => {
	// REPLY
	const rep = async (teks) => await conn.sendteks(m.chat, teks, d.f1('Notifikasi Keamanan Group', ''))
	// DELETE
	const del = async () => await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender} });
	// KICK
	const kik = async () => await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
	if (!m.chat.endsWith(q.idgc)) return
	if (conn.db.data.chat[m.chat].antivid) {
		if (m.mtype === 'videoMessage') {
			rep('[ ANTI VIDEO ]\ngroup ini dilengkapi dengan anti Video\nVideo anda dihapus bot');
			if (isAdmin) return repl('Maaf Kamu admin ternyata');
			if (m.isOwn) return repl('Oh tidak, kamu ownerku');
			if (!isBotAdmin) return repl('Oh tidak, Bot not admin');
			del();
		}
	}
};

export default handle;