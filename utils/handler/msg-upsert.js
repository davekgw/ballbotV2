import { db } from '../schema/schema.js';
import d from '../helper/fake.js';
import q from '../../Setting/settings.js';
import detect from './detect.js';
import cmds from './feature/controlers.mjs';
import { conn2 } from '../util/conn2.mjs';
import parser from './parse-messages.js';
import printToConsole from '../print.js';
const bb = (teks) => '```'+teks+'```';
const isntNull = x => x !== null;
const findAdmin = arr =>  arr.filter(v=> v.admin !== null).map(i=>i.id);
let cache = new Map();
let userAfk = new Map();
export default async (iqbal, serve, s) => {
	try {
		let up = iqbal.messages[0];
		if (!up) return;
		if (up.key.remoteJid === q.idst) return;
		await serve.readMessages([up.key]);
		if (up.key.id.endsWith('BOLA') && up.key.id.length === 32) return;
		if (up.key.id.startsWith('3EB0') && up.key.id.length === 12) return;
		// console.log(up);
		let m = parser(serve, up, s);
		let bot = await serve.createJid(serve.user.id);
		userAfk.set(m.sender, {time: 0, reason: '', bool: false});
		if(m.isGc) {
			if (!cache.has(m.chat)){
				cache.set(m.chat, await serve.groupMetadata(m.chat).catch(_=>{}));
				console.log(`Pembuatan metadata pada: ${m.chat} telah siap`);
			}
		}
		if (up.messageStubType == 21  && cache.has(m.chat) || up.messageStubType == 25  && cache.has(m.chat) || up.messageStubType == 26  && cache.has(m.chat) || up.messageStubType == 27  && cache.has(m.chat) || up.messageStubType == 28  && cache.has(m.chat) || up.messageStubType == 29  && cache.has(m.chat) || up.messageStubType == 30  && cache.has(m.chat) || up.messageStubType == 32  && cache.has(m.chat) || up.messageStubType == 71 && cache.has(m.chat)) {
			let user = up.messageStubType ? up.messageStubParameters.join() : ''
			if (up.messageStubType == 28 && user.includes(bot)) {
				cache.delete(m.chat, await serve.groupMetadata(m.chat).catch(_=>{}))
				return console.log(`Mendelete metadata pada chat ${m.chat}\nJangan lupa Follow my github: https://github.com/bolaxd/`);
			}
			if (up.messageStubType == 32 && user.includes(bot)) {
				cache.delete(m.chat, await serve.groupMetadata(m.chat).catch(_=>{}))
				return console.log(`Mendelete metadata pada chat ${m.chat}\nJangan lupa Follow my github: https://github.com/bolaxd/`);
			}
			cache.set(m.chat, await serve.groupMetadata(m.chat).catch(_=>{}))
			console.log(`Mereload metadata pada chat ${m.chat}\nJangan lupa star my github: https://github.com/bolaxd/`);
		}
		if (/protocolMessage/.test(m.mtype) && m.msg.ephemeralExpiration && m.msg.type == 3  && cache.has(m.chat) || /protocolMessage/.test(m.mtype) && !m.msg.ephemeralExpiration && m.msg.type == 3 && cache.has(m.chat)) {
			cache.set(m.chat, await serve.groupMetadata(m.chat).catch(_=>{}))
			console.log(`Mereload metadata pada chat ${m.chat}\nJangan lupa star my github: https://github.com/bolaxd/`);
		}
		let extra = {};
			extra.q = q;
			extra.d = d;
			extra.up = up; 
			extra.bb = bb;
			extra.findAdmin = findAdmin;
			extra.conn = serve;
			extra.conn2 = conn2;
			extra.userAfk = userAfk;
			extra.repl = text => serve.sendteks(m.chat, text, m);
			extra.isNum = x => typeof x == 'number' && isNaN(x);
			extra.more = String.fromCharCode(8206).repeat(4001);
			extra.budy = typeof m.text == 'string' ? m.text : '';
			extra.bot = bot;
			extra.lblock = await serve.fetchBlocklist().catch(_=>[]);
			extra.isblock = m.isGc ? extra.lblock.includes(m.sender) : false;
			extra.meta = m.isGc ? await cache.get(m.chat) : {} || {};
			extra.members = m.isGc ? await extra.meta.participants : [] || [];
			extra.admins = m.isGc ? await findAdmin(extra.members) : [] || [];
			extra.isAdmin = m.isGc ? extra.admins.includes(m.sender) :false;
			extra.isBotAdmin = m.isGc ? extra.admins.includes(extra.bot) :false;
			extra.isPrem = q.prems.map(v=> v + q.idwa).includes(m.sender);
			extra.getpp = async(sender) => {let pp;try {pp = await serve.profilePictureUrl(sender, 'image')} catch (e) {pp = q.thumb2};return pp};
			extra.quoted = m.quoted ? m.quoted : m;
			extra.quotry = m.quoted ? m.quoted.text : m.query;
			extra.mime = (extra.quoted.msg || extra.quoted).mimetype || extra.quoted.mediaType || '';
			db(m, extra)
			printToConsole(m, extra)
			detect(m, extra)
			cmds(m, extra)
     	} catch (e) {
		console.error(e);
	}
}
