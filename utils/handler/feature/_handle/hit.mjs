import fs from 'fs';

let cmd = JSON.parse(fs.readFileSync('./utils/handler/feature/listcmd.json'))
const handle = async (m, { q, conn, bot }) => {
	let cmdd = cmd.map(v => v[0])
	if (!cmdd.includes(m.command)) return
	if (cmdd.includes(m.command)) {
		conn.db.data.set[bot].hit.push({cmd: m.command, hit: new Date()*1, user: m.sender.split('@')[0]})
	}
}

export default handle;