import { imgToStiker, vidToStiker } from '../../../util/convert-media.js';

const handle = async (m, { q, conn, d, quoted, mime, bot, repl }) => {
	let teks = 'reply foto / kirim foto dengan caption .stiker';
	if (!quoted) return repl(teks);
	if (!/(image|video|webp)/.test(mime)) return repl(teks);
	let buf = await quoted.download();
	if (/image/.test(mime)) conn.sendstik(m.chat, await imgToStiker(buf, {name: conn.db.data.set[bot].pack[1], author: conn.db.data.set[bot].pack[0]}), m, d.f2('',q.thumb2,''))
	else if (/video/.test(mime)) conn.sendstik(m.chat, await vidToStiker(buf, {name: conn.db.data.set[bot].pack[1], author: conn.db.data.set[bot].pack[0]}), m, d.f2('',q.thumb2,''))
};

export default handle;
