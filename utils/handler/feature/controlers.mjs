import fs from 'fs';
import s from 'similarity';
import { format } from 'util';
let path = './utils/handler/feature/'
let cmdd = JSON.parse(fs.readFileSync(path+"listcmd.json"))
export default async (m, extra) => {
	let { q, d, bb, bot, conn, isblock, up, isAdmin, isBotAdmin, isPrem, repl } = extra
	/* Aku dapet dari : https://stackoverflow.com/questions/36367532/how-can-i-conditionally-import-an-es6-module */
	const e_ = async (err) => {
		q.developer.map(async v=> {
			await q.delay(3000)
			conn.sendteks(v+q.idwa, `Command : /${m.command}\nOleh : @${m.sender.split('@')[0]}\n\n${bb(format(err))}`, d.f1(err, ''), {mentions: [m.sender]})
		})
	}
	let cate = fs.readdirSync(path)
	for (let b of cate.filter(_=>_.startsWith('_') && !_.endsWith('.mjs') && !_.endsWith('.json'))) {
		let file = fs.readdirSync(path+b)
		for (let u of file) if (m.message && !isblock) (await import('./'+b+'/'+u)).default(m, extra).catch(e=>e_(e));
	}
	for (let u of cmdd) {
		if (m.command !== u[0]) continue
		// ketika dia di block
		if (m.command && isblock) continue
		// ketika mode self / public
		if (m.command && !m.isOwn && conn.db.data.set[bot].public) {
			conn.sendteks(m.chat, `Bot sekarang sedang mode Owner / Self\nSilahkan chat Owner untuk membuat bot public`, m)
			continue
		}
		// ketika mode maintrnance all
		if (m.command && !m.isOwn && conn.db.data.set[bot].main) {
			conn.sendteks(m.chat, `Bot sekarang sedang mode maintenance!!!\nSilahkan tunggu sampai bot selesai diperbaiki`, m)
			continue
		}
		// ketika mode group
		if (m.command && m.isPc && conn.db.data.set[bot].group && !m.isOwn && !isPrem) {
			let gc = `https://chat.whatsapp.com/${await conn.groupInviteCode(q.gcbot[0]).catch(e=> '')}`
			conn.sendteks(m.chat, `${q.name} Mode group\n\nsilahkan Join ke group bot untuk berkomunikasi dengan bot\nBergabunglah dengan user premium agar bebas chat bot kapan saja!!!`, m, d.f2(q.name+ ' Mode group', q.thumb2, gc))
			continue
		}
		if (m.command && !m.isGc && conn.db.data.dash[m.command].grup) {
			repl('Fitur ini khusus di group...')
			continue
		}
		if (m.command && !m.isPc && conn.db.data.dash[m.command].private) {
			repl('Fitur ini khusus di Pribadi chat...')
			continue
		}
		if (m.command && !isPrem && conn.db.data.dash[m.command].prems) {
			repl('Fitur ini khusus member premium...')
			continue
		}
		if (m.command && !m.isOwn && conn.db.data.dash[m.command].ban) {
			repl('Fitur ini telah di ban owner sementara...')
			continue
		}
		if (m.command && !m.isOwn && conn.db.data.dash[m.command].main) {
			repl('Fitur ini sedang dalam pemeliharaan system...')
			continue
		}
		if (m.command && !m.isOwn && conn.db.data.dash[m.command].owner) {
			repl('Fitur ini khusus owner...')
			continue
		}
		if (m.command && !isAdmin && conn.db.data.dash[m.command].admin) {
			repl('Fitur ini khusus admin group...')
			continue
		}
		if (m.command && !isBotAdmin && conn.db.data.dash[m.command].botadmin) {
			repl('Bot harus admin jika ingin gunakan fitur ini')
			continue
		}
		if (s(u[0], m.command) >= 1) (await import('./'+u[1]+'.mjs')).default(m, extra).catch(e=>e_(e));
	}
};