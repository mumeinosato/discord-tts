import axios from "axios";
import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const api = process.env.VOICEVOX_API_URL;
const rpc = axios.create({baseURL: api, proxy: false});

export async function voicevox(text: string,filepath: string, speaker: number) {

    try {
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

        return true

        fs.writeFileSync(filepath, Buffer.from(synthesis.data), 'binary')
    } catch (error) {
        console.error(error)
        return false
    }
}