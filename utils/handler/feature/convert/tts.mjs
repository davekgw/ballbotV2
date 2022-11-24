import gtts from '@google-cloud/text-to-speech';
import { promisify } from 'util';
import { writeFile, readFileSync } from 'fs';

const writeWithPromise = promisify(writeFile)
const tts = new gtts.TextToSpeechClient();

const handle = async (m, { q, conn, repl }) => {
	if (!m.query) return repl(q.notext);
	const req = {
		input: { text: m.query },
		voice: { language: 'id', ssmlGender: 'NEUTRAL'},
		audioConfig: { audioEncoding: 'MP3' }
	}
	let [ response ] = await tts.synthesizeSpeech(req);
	let path = `/TMP/audio-${new Date()*1}.mp3`
	await writeWithPromise(path, response.audioContent, 'binary')
	let buff = await readFileSync(path)
	conn.sendaud(m.chat, buff, m)
}

export default handle