const handle = async (m, { q, conn, isAdmin, isBotAdmin, members, quoted, repl, bot }) => {
	if (!m.isGc) return repl(q.forgc);
	if (!isAdmin) return repl(q.admin);
	if (!quoted) return repl(q.forteks);
	let ments = conn.db.data.set[bot].antitag ? members.map(v=> v.id).filter(v=> !q.developer.map(a=>a+idwa).includes(v)): members.map(v => conn.createJid(v.id))
	conn.sendteks(m.chat, m.quoted ? m.quoted.text : m.query, m, { mentions: ments })
};

export default handle;