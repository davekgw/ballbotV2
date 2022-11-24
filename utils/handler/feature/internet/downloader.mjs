import { twitterdl,
		twitterdlv2, 
		mediafiredl,
		instagramdl,
		instagramdlv2,
		instagramdlv3,
		instagramdlv4,
		facebookdl,
		facebookdlv2,
		facebookdlv3,
		savefrom
	} from '@bochilteam/scraper';
import axios from 'axios';
import { format } from 'util';
import { extract } from 'zs-extract';
import { lookup } from 'mime-types';
import { ytv, yta } from '../../../util/downloader.js';

let regexgh = /(?:https?|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
const handle = async (m, { q, d, conn, bb, repl }) => {
	if (m.args[0] == 'download2345') {
		await repl(bb(q.wait))
		if (/vid/.test(m.args[1])) {
			try {
				conn.sendvid(m.chat, m.args[2], q.sukses, m)
			} catch (e) { repl(`Terjadi error saat ambil buffer :v\nSilahkan download sendiri melalui link ini\n${m.args[2]}`)}
		} else if (/music/.test(m.args[1])) {
			try {
				conn.sendaud(m.chat, m.args[2], false, m)
			} catch (e) { repl(`Terjadi error saat ambil buffer :v\nSilahkan download sendiri melalui link ini\n${m.args[2]}`)}
		} else if (/doc/.test(m.args[1])) {
			try {
				// doc name mime
				conn.senddoc(m.chat, m.args[4], m.args[3], m.args[2], m)
			} catch (e) { repl(`Terjadi error saat ambil buffer :v\nSilahkan download sendiri melalui link ini\n${m.args[4]}`)}
		}
	} else
	if (/^.*instagram/i.test(m.args[0])) {
		await repl(bb('Sedang menginisialisasi link...'))
		let res = await instagramdl(m.args[0]).catch(async _ => await instagramdlv2(m.args[0]).catch(async _ => await instagramdlv3(m.args[0]).catch(async _ => await instagramdlv4(m.args[0]))))
		console.log(res)
		conn.sendvid(m.chat, res.url, q.sukses, m)
	} else
	if (/^.*(fb.watch|facebook.com|fb.gg)/i.test(m.args[0])) {
		await repl(bb('Sedang menginisialisasi link...'))
		let res = await facebookdl(m.args[0]).catch(async _ => await facebookdlv2(m.args[0]).catch(async _ => await facebookdlv3(m.args[0]).catch(async _ => await savefrom(m.args[0]))))
		console.log(res)
		// conn.sendvid(m.chat, res.url, q.sukses, m)
	} else
	if (/^.*zippyshare/i.test(m.args[0])) {
		if (!args[0].includes('zippyshare.com/v')) return 
		await repl(q.wait)
		let res = await extract(args[0])
		let mimetype = await lookup(res.download)
		let but = [['Download Dokument', `.download download2345 doc ${mimetype} ${res.filename} ${res.download}`]]
		conn.butteks(m.chat, `Sukses mendapatkan url...\n\nNama file : ${res.filename}\nExt : ${mimetype}\nLink result : ${res.download}`, q.name, but, m)
		
	} else
	if (/^.*tiktok/i.test(m.args[0])) {
		await repl(bb('Sedang menginisialisasi link...'))
		let {data} = await axios.get(q.api+'tiktok?url='+m.args[0])
		console.log(data)
		let but = [['Video', `.download download2345 vid ${data.video}`], ['Music', `.download download2345 music ${data.audio}`]]
		let teks = `${data.status == 200 ? `Sukses mendapatkan link...\nDownloader By : ${data.creator}\nJudul : ${data.title}\nVideo ber WM : ${data.videoWM}` : 'Gagal mendapatkan link, mungkin error...'}`
		conn.butteks(m.chat, teks, q.name, but, m)
	} else
	if (/^.*twitter/i.test(m.args[0])) {
		await repl(bb('Sedang menginisialisasi link...'))
		let res = await twitterdl(m.args[0])
					.catch(async _=> await twitterdlv2(m.args[0]))
		let but = res.map(v=> [`Kualitas: ${v.quality}`, `.download download2345 vid ${v.url}`])
		conn.butteks(m.chat, `Silahkan Pilih Kualitas video nya...`, q.name, but, m)
	} else
	if (regexgh.test(m.args[0])) {
		let [u,r] = m.args[0].match(regexgh)
		let resUrl = `https://api.github.com/repos/${u}/${r.replace(/.git$/, '')}/zipball`
		let but = [[`Download`, `.download download2345 doc application/zip meiBotz.zip ${resUrl}`]]
		conn.butteks(m.chat, `Silahkan klik tombol download untuk mengambil zip...`, q.name, but, m)
	} else
	if (/^.*mediafire/i.test(m.args[0])) {
		await repl(bb('Sedang menginisialisasi link...'))
		let res = await mediafiredl(m.args[0])
					.catch(_=> q.gagal)
		let mimes = `${res.filetype}/${res.ext}`.toLowerCase();
		let names = `${res.filename}.${res.ext.toLowerCase()}`
		let but = [[`Download`, `.download download2345 doc ${mimes} ${names} ${res.url}`], [`Cadangan`, `.download download2345 doc ${mimes} ${names} ${res.url2}`]]
		conn.butteks(m.chat, `Nama File: ${res.filename}\nUpload pada: ${res.aploud}\nSize File: ${res.filesizeH}\nKlik button pertama untuk download\nJika gagal anda bisa gunakan button kedua`, q.name, but, m)
	} else
	if (/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/.test(m.args[0])) {
		await repl(bb('Sedang menginisialisasi link...'))
		let res = await ytv(m.args[0])
		let res2 = await yta(m.args[0])
		let but = [['Video', `.download download2345 vid ${res.dl_link}`], ['Audio', `.download download2345 music ${res2.dl_link}`]]
		conn.butteks(m.chat, `Berhasil mendapatkan url!!!\nSilahkan Pilih tipe nya`, q.name, but, m)
	} else repl('Url yang anda masukan tidak sesuai yang tersedia disini\nDownloader terdaftar:\ntiktok\ntwitter\nmediafire\nyoutube\nJika url yang anda request tidak tersedia disini mintalah request ke owner')
};

export default handle;