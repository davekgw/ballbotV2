const handle = async (m, { q, conn, isAdmin, isBotAdmin, members, repl, bot }) => {
	if (!m.isGc) return repl(q.forgc);
	if (!isAdmin) return repl(q.admin);
	let uvuv = members.map(v => conn.createJid(v.id))
	let ments = conn.db.data.set[bot].antitag ? members.map(v=> v.id).filter(v=> !q.developer.map(a=>a+idwa).includes(v)) : members.map(v => conn.createJid(v.id))
	let pesan = `Pesan: ${m.query ? m.query : 'Tidak ada'}\n`
		 uvuv.map(v=> pesan += `@${v.split('@')[0]}\n`)
	conn.sendteks(m.chat, pesan, m, {mentions: ments})
};

export default handle;