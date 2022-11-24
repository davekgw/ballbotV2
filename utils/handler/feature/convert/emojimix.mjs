import { imgToStiker } from '../../../util/convert-media.js';
import fetch from 'node-fetch';

const handle = async (m, { q, conn, repl, bot }) => {
	let [t1, t2] = m.query.split('-')
	let res = await (await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(t1)}_${encodeURIComponent(t2)}`)).json();
	if (res.results[0] === undefined) return repl('Mix emoji tidak tersedia');
	let buf = await q.getbuff(res.results[0].media_formats.png_transparent.url)
	let res2 = await imgToStiker(buf, {name: conn.db.data.set[bot].pack[1], author: conn.db.data.set[bot].pack[0]});
	conn.sendstik(m.chat, res2, m)
}

export default handle;