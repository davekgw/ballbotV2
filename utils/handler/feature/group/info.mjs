const handle = async (m, { q, conn, meta, isBotAdmin, isAdmin, repl }) => {
	if (!m.isGc) return repl(q.forgc)
	if (m.query == 'link') {
		if (!isBotAdmin) return repl(q.botadmin)
			if (isAdmin) {
				conn.groupInviteCode(m.chat)
					.then(v => repl(`Link Group\n\nhttps://chat.whatsapp.com/${v}`))
					.catch(e => repl(q.gagal))
			} else if (!isAdmin) {
				if (!conn.db.data.chat[m.chat].link) return repl(q.linkadm)
				conn.groupInviteCode(m.chat)
					.then(v => repl(`Link Group\n\nhttps://chat.whatsapp.com/${v}`))
					.catch(e => repl(q.gagal))
			}
	} else if (m.query == 'revoke') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		conn.groupRevokeInvite(m.chat)
			.then(v => repl(q.sukses))
			.catch(v => repl(q.gagal))
	} else if (m.query == 'gcbuka') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		conn.groupSettingUpdate(m.chat, 'not_announcement')
			.then(v => repl(q.sukses))
			.catch(v => repl(q.gagal))
	} else if (m.query == 'gctutup') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		conn.groupSettingUpdate(m.chat, 'announcement')
			.then(v => repl(q.sukses))
			.catch(v => repl(q.gagal))
	} else if (m.query == 'infobuka') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		conn.groupSettingUpdate(m.chat, 'unlocked')
			.then(v => repl(q.sukses))
			.catch(v => repl(q.gagal))
	} else if (m.query == 'infotutup') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		conn.groupSettingUpdate(m.chat, 'locked')
			.then(v => repl(q.sukses))
			.catch(v => repl(q.gagal))
	} else if (m.query == 'detekbuka') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (conn.db.data.chat[m.chat].detect) return repl(q.active)
		conn.db.data.chat[m.chat].detect = true
		repl(q.sukses)
	} else if (m.query == 'detektutup') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (!conn.db.data.chat[m.chat].detect) return repl(q.unactive)
		conn.db.data.chat[m.chat].detect = false
		repl(q.sukses)
	} else if (m.query == 'linkbuka') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (conn.db.data.chat[m.chat].link) return repl(q.active)
		conn.db.data.chat[m.chat].link = true
		repl(q.sukses)
	} else if (m.query == 'linktutup') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (!conn.db.data.chat[m.chat].link) return repl(q.unactive)
		conn.db.data.chat[m.chat].link = false
		repl(q.sukses)
	} else if (m.query == 'linkon') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (conn.db.data.chat[m.chat].antilink) return repl(q.active)
		conn.db.data.chat[m.chat].antilink = true
		repl(q.sukses)
	} else if (m.query == 'linkoff') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (!conn.db.data.chat[m.chat].antilink) return repl(q.unactive)
		conn.db.data.chat[m.chat].antilink = false
		repl(q.sukses)
	} else if (m.query == 'vnon') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (conn.db.data.chat[m.chat].antivn) return repl(q.active)
		conn.db.data.chat[m.chat].antivn = true
		repl(q.sukses)
	} else if (m.query == 'vnoff') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (!conn.db.data.chat[m.chat].antivn) return repl(q.unactive)
		conn.db.data.chat[m.chat].antivn = false
		repl(q.sukses)
	} else if (m.query == 'stikon') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (conn.db.data.chat[m.chat].antistik) return repl(q.active)
		conn.db.data.chat[m.chat].antistik = true
		repl(q.sukses)
	} else if (m.query == 'stikoff') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (!conn.db.data.chat[m.chat].antistik) return repl(q.unactive)
		conn.db.data.chat[m.chat].antistik = false
		repl(q.sukses)
	} else if (m.query == 'vidon') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (conn.db.data.chat[m.chat].antivid) return repl(q.active)
		conn.db.data.chat[m.chat].antivid = true
		repl(q.sukses)
	} else if (m.query == 'vidoff') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (!conn.db.data.chat[m.chat].antivid) return repl(q.unactive)
		conn.db.data.chat[m.chat].antivid = false
		repl(q.sukses)
	} else if (m.query == 'imgon') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (conn.db.data.chat[m.chat].antiimg) return repl(q.active)
		conn.db.data.chat[m.chat].antiimg = true
		repl(q.sukses)
	} else if (m.query == 'imgoff') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (!conn.db.data.chat[m.chat].antiimg) return repl(q.unactive)
		conn.db.data.chat[m.chat].antiimg = false
		repl(q.sukses)
	} else if (m.query == 'boton') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (conn.db.data.chat[m.chat].antibot) return repl(q.active)
		conn.db.data.chat[m.chat].antibot = true
		repl(q.sukses)
	} else if (m.query == 'botoff') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (!conn.db.data.chat[m.chat].antibot) return repl(q.unactive)
		conn.db.data.chat[m.chat].antibot = false
		repl(q.sukses)
	} else if (m.query == 'luaron') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (conn.db.data.chat[m.chat].antiluar) return repl(q.active)
		conn.db.data.chat[m.chat].antiluar = true
		repl(q.sukses)
	} else if (m.query == 'luaroff') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (!conn.db.data.chat[m.chat].antiluar) return repl(q.unactive)
		conn.db.data.chat[m.chat].antiluar = false
		repl(q.sukses)
	} else if (m.query == 'austikon') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (conn.db.data.chat[m.chat].autostik) return repl(q.active)
		conn.db.data.chat[m.chat].autostik = true
		repl(q.sukses)
	} else if (m.query == 'austikoff') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (!conn.db.data.chat[m.chat].autostik) return repl(q.unactive)
		conn.db.data.chat[m.chat].autostik = false
		repl(q.sukses)
	} else if (m.query == 'voon') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (conn.db.data.chat[m.chat].antivo) return repl(q.active)
		conn.db.data.chat[m.chat].antivo = true
		repl(q.sukses)
	} else if (m.query == 'vooff') {
		if (!isBotAdmin) return repl(q.botadmin)
		if (!isAdmin) return repl(q.admin)
		if (!conn.db.data.chat[m.chat].antivo) return repl(q.unactive)
		conn.db.data.chat[m.chat].antivo = false
		repl(q.sukses)
	} else {
		let list = []
		let teks = `INFO GROUP \n\n`
			 teks += `Nama Group: *${meta.subject}*\n`
			 teks += `Members: *${meta.size}*\n`
			 teks += `Pembuat Group: *${meta.owner == undefined ? 'Kosong' : meta.owner.split('@')[0]}*\n`
			 teks += `Status Anda: *${isAdmin ? 'Orang dalam' : 'Bukan orang dalam'}*\n`
			 teks += `Edit info: *${meta.restrict ? 'Hanya admin' : 'Semua member'}*\n`
			 teks += `Kirim pesan: ${meta.announce ? 'Hanya admin' : 'Semua member'}\n`
			 teks += `Detect Group: *${conn.db.data.chat[m.chat].detect ? 'Online' : 'Offline'}*\n`
			 teks += isAdmin ? `Bagikan link Group: *${conn.db.data.chat[m.chat].link ? 'Boleh' : 'Jangan'}*\n` : ``
			 teks += `Anti link: *${conn.db.data.chat[m.chat].antilink ? 'hidup' : 'mati'}*\n`
			 teks += `Anti VN: *${conn.db.data.chat[m.chat].antivn ? 'hidup' : 'mati'}*\n`
			 teks += `Anti Sticker: *${conn.db.data.chat[m.chat].antistik ? 'hidup' : 'mati'}*\n`
			 teks += `Anti Image: *${conn.db.data.chat[m.chat].antiimg ? 'hidup' : 'mati'}*\n`
			 teks += `Anti Video: *${conn.db.data.chat[m.chat].antivid ? 'hidup' : 'mati'}*\n`
			 teks += `Anti Bot: *${conn.db.data.chat[m.chat].antibot ? 'hidup' : 'mati'}*\n`
			 teks += `Anti Nomor Luar: *${conn.db.data.chat[m.chat].antiluar ? 'hidup' : 'mati'}*\n`
			 teks += `Anti View Once: *${conn.db.data.chat[m.chat].antivo ? 'hidup' : 'mati'}*\n`
			 teks += `Auto stiker: *${conn.db.data.chat[m.chat].autostik ? 'hidup' : 'mati'}*\n`
		list.push(['Link Group ini', '.info link', 'Link group whatsapp ini'])
		if (isAdmin) {
			list.push(['Reset link grup', '.info revoke', 'Reset atau ganti link group jni dengan yang baru'])
			if (meta.restrict) list.push(['Buka Edit info', '.info infobuka', 'Beri akses member untuk mengedit info group'])
			else list.push(['Tutup Edit Info', '.info infotutup', 'Jangan beri akses member untuk mengedit info group'])
			if (meta.announce) list.push(['Buka Group', '.info gcbuka', 'Beri akses member untuk mengirim pesan ke group'])
			else list.push(['Tutup Group', '.info gctutup', 'Jangan beri akses member untuk mengirim pesan ke group'])
			if (conn.db.data.chat[m.chat].detect) list.push(['Matikan Detect group', '.info detektutup', 'Bot tidak akan memberikan deteksi perubahan group'])
			else list.push(['Hidupkan Detect group', '.info detekbuka', 'Bot akan mulai deteksi perubahan yang ada di group'])
			if (conn.db.data.chat[m.chat].link) list.push(['Jangan Bagi link ke member', '.info linktutup', 'Bot tidak akan memberikan link group kepada member'])
			else list.push(['Bagi link ke member', '.info linkbuka', 'Bot akan memberikan link ke member jika diminta'])
			if (conn.db.data.chat[m.chat].antilink) list.push(['Matikan antilink', '.info linkoff', 'matikan larangan member untuk share link gc lain'])
			else list.push(['Hidupkan anti link', '.info linkon', 'melarang member untuk share link gc lain'])
			if (conn.db.data.chat[m.chat].antivn) list.push(['Matikan anti VN', '.info vnoff', 'matikan larangan member untuk VN di group'])
			else list.push(['Hidupkan anti VN', '.info vnon', 'melarang member untuk VN in group'])
			if (conn.db.data.chat[m.chat].antistik) list.push(['Matikan anti stiker', '.info stikoff', 'matikan larangan member untuk kirim stiker di group'])
			else list.push(['Hidupkan anti stiker', '.info stikon', 'melarang member untuk Kirim stiker in group'])
			if (conn.db.data.chat[m.chat].antiimg) list.push(['Matikan anti Gambar', '.info imgoff', 'matikan larangan member untuk kirim gambar di group'])
			else list.push(['Hidupkan anti gambar', '.info imgon', 'melarang member untuk Kirim gambar in group'])
			if (conn.db.data.chat[m.chat].antivid) list.push(['Matikan anti Video', '.info vidoff', 'matikan larangan member untuk kirim video di group'])
			else list.push(['Hidupkan anti video', '.info vidon', 'melarang member untuk Kirim video in group'])
			if (conn.db.data.chat[m.chat].antibot) list.push(['Matikan anti bot', '.info botoff', 'terima semua bot yang masuk ke group selain bot ini'])
			else list.push(['Hidupkan anti bot', '.info boton', 'Tolak semua bot yang masuk ke group selain bot ini'])
			if (conn.db.data.chat[m.chat].antiluar) list.push(['Matikan anti Nomor luar', '.info luaroff', 'Bot akan mematikan penolakan user Nomor luar yang join'])
			else list.push(['Hidupkan anti Nomor Luar', '.info luaron', 'Bot akan menolak semua user Ber Nomor luar'])
			if (conn.db.data.chat[m.chat].antivo) list.push(['Matikan anti View Once', '.info vooff', 'Bot tidak akan meneruskan pesan view once ke media'])
			else list.push(['Hidupkan anti View Once', '.info voon', 'Bot akan meneruskan pesan view once ke media'])
			if (conn.db.data.chat[m.chat].autostik) list.push(['Matikan Auto stiker', '.info austikoff', 'bot tidak akan membuat stiker ketika member mengirim video / gambar'])
			else list.push(['Hidupkan auto stiker', '.info austikon', 'Bot akan membuat stiker otomatis ketika member mengirim gambar / video'])
			}
		conn.sendlist(m.chat, teks, q.name, list, m)
	}
};

export default handle;