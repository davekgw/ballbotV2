
const handle = async(m, { q, d, conn, bot, isBotAdmin }) => {
	const del = async () => await conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: m.id, participant: m.sender} });
	if (!m.isGc) return
	if (conn.db.data.set[bot].antitag) {
		let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : []), ...(m.react ? [m.rtarget] : [])])]
		for (let u of jids) {
			if (m.fromMe) continue
			if (!q.developer.map(v=>v + q.idwa).includes(u)) continue
			if (isBotAdmin) del();
			conn.sendteks(m.chat, `Jangan Tag Owner!!! ${m.react ? '@'+m.sender.split('@')[0] : ''}\n\nOwner Mode anti tag`, m, {mentions: [m.sender]});
		}
	}
};

export default handle;