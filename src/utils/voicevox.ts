import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import dotenv from "dotenv";

dotenv.config();

const api = process.env.VOICEVOX_API_URL;
const rpc = axios.create({baseURL: api, proxy: false});

export async function voicevox(text: string,filename: string, speaker: number) {

    try {
        const filepath = path.join('voice_data', filename)

        const audio_query = await rpc.post('audio_query',null,{
            params: {
                text: text,
                speaker: speaker
            }
        })

        const synthesis = await rpc.post('synthesis',JSON.stringify(audio_query.data),{
            params: {speaker: speaker},
            responseType: 'arraybuffer',
            headers: {
                'accept': 'audio/wav',
                'Content-Type': 'application/json'
            }
        })

        fs.writeFileSync(filepath, Buffer.from(synthesis.data), 'binary')
    } catch (error) {
        console.error(error)
    }
}