import fs from 'node:fs';

export const db = async (m, { q, conn, isNum, bot }) => {
	try {
// Untuk User nya [ otomatis add pas gk ada ]
		let user = conn.db.data.user[m.sender]
		if (typeof user !== 'object') conn.db.data.user[m.sender] = {}
		if (user) {
		if (!isNum(user.lastused)) conn.db.data.user[m.sender].lastused = new Date*1
		if (!isNum(user.win)) conn.db.data.user[m.sender].win = 0
		if (!isNum(user.lose)) conn.db.data.user[m.sender].lose = 0
		if (!isNum(user.coin)) conn.db.data.user[m.sender].coin = 0
		} else conn.db.data.user[m.sender] = {
			lastused: new Date*1,
			win: 0,
			lose: 0,
			coin: 0,
		}
	// Group kalo belom ada ini buat bukti
		if (m.isGc) {
			let cht = conn.db.data.chat[m.chat]
			if (typeof cht !== 'object') conn.db.data.chat[m.chat] = {}
			if (cht) {
				if (!('ban') in cht) conn.db.data.chat[m.chat].ban = false
				if (!('detect') in cht) conn.db.data.chat[m.chat].detect = true
				if (!('link') in cht) conn.db.data.chat[m.chat].link = false
				if (!('antidel') in cht) conn.db.data.chat[m.chat].antidel = false
				if (!('antilink') in cht) conn.db.data.chat[m.chat].antilink = false
				if (!('antivn') in cht) conn.db.data.chat[m.chat].antivn = false
				if (!('antistik') in cht) conn.db.data.chat[m.chat].antistik = false
				if (!('antiimg') in cht) conn.db.data.chat[m.chat].antiimg = false
				if (!('antivid') in cht) conn.db.data.chat[m.chat].antivid = false
				if (!('antibot') in cht) conn.db.data.chat[m.chat].antibot = false
				if (!('antiluar') in cht) conn.db.data.chat[m.chat].antiluar = false
				if (!('antivo') in cht) conn.db.data.chat[m.chat].antivo = false
				if (!('autostik') in cht) conn.db.data.chat[m.chat].autostik = false
				if (!('list') in cht) conn.db.data.chat[m.chat].list = []
			} else conn.db.data.chat[m.chat] = {
				ban: false,
				detect: true,
				link: false, 
				antidel: false,
				antilink: false,
				antivn: false,
				antistik: false,
				antiimg: false,
				antivid: false,
				antibot: false,
				antiluar: false,
				antivo: false,
				autostik: false,
				list: [],
			}
		}
// Bot nya dah auto insert
		let sett = conn.db.data.set[bot]
		if (typeof sett !== 'object') conn.db.data.set[bot] = {}
		if (sett) {
			if (!('update') in sett) conn.db.data.set[bot].hit = []
			if (!('public') in sett) conn.db.data.set[bot].public = true
			if (!('call') in sett) conn.db.data.set[bot].call = true
			if (!('cookie') in sett) conn.db.data.set[bot].cookie = ''
			if (!('group') in sett) conn.db.data.set[bot].group = true
			if (!('main') in sett) conn.db.data.set[bot].main = false
			if (!('antitag') in sett) conn.db.data.set[bot].antitag = false
			if (!('pack') in sett) conn.db.data.set[bot].pack = [q.name, 'Paket stiker ++']
		} else conn.db.data.set[bot] = {
			hit: [],
			public: true,
			call: true,
			cookie: '',
			group: true,
			main: false,
			antitag: false,
			pack: [q.name, 'Paket stiker ++']
		}
		
		let command = JSON.parse(fs.readFileSync('./utils/handler/feature/listcmd.json'));
		for (let i of command) {
			let cmd = conn.db.data.dash[i[0]]
			if (typeof cmd !== 'object') conn.db.data.dash[i[0]] = {}
			conn.db.data.dash[i[0]] = {
				regis: false,
				prems: false,
				admin: false,
				botadmin: false,
				owner: false,
				grup: false,
				private: false,
				ban: false,
				main: false,
			}
		}
	} catch (e) {
		console.log(e)
	}
}