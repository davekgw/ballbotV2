const handle = async (m, { q, conn, userAfk, getpp, repl }) => {
	let alasan = m.query ? m.query : ' Tanpa Alasan ';
	let date = new Date() * 1;
	userAfk.set(m.sender, [date, alasan, true])
	repl(`Kamu Telah afk dengan alasan ${alasan}`);
};

export default handle;