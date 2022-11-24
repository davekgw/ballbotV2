import { imgToStiker, vidToStiker } from '../../../util/convert-media.js';

const handle = async(m, { q, d, conn, quoted, bot }) => {
	if (!m.chat.endsWith(q.idgc)) return
	if (conn.db.data.chat[m.chat].autostik) {
		if (m.mtype === 'imageMessage') {
			let dl = await imgToStiker(await m.download(), {pack: conn.db.data.set[bot].pack[1], author: conn.db.data.set[bot].pack[0]});
			conn.sendstik(m.chat, dl, d.f1('Auto stiker group!!!',''))
		} 
		if (m.mtype === 'videoMessage') {
			if ((quoted.msg || quoted).seconds >= 9) return
			let dl = await vidToStiker(await m.download(), {pack: conn.db.data.set[bot].pack[1], author: conn.db.data.set[bot].pack[0]});
			conn.sendstik(m.chat, dl, d.f1('Auto stiker group!!!',''))
		}
	}
};

export default handle;