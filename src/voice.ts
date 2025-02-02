import { Message } from "discord.js";
import { randomUUID } from "crypto";
import path from "path";
import fs, { cp } from "fs";
import { AudioPlayerStatus, createAudioPlayer, createAudioResource, getVoiceConnection } from "@discordjs/voice";
import { voicevox } from "./utils/voicevox";
import { getUser } from "./utils/user";
import { get_reading } from "./utils/dictionary";
import { console } from "inspector";

async function playAudio(channelId: string, text: string, voiceId: number) {
    const connection = getVoiceConnection(channelId);
    if (!connection) return;
    
    const filename = `${randomUUID()}.wav`;
    const rootPath = path.resolve(__dirname, '..'); 
    const filepath = path.join(rootPath, 'voice_data', filename);
    try {
        await voicevox(text, filepath, voiceId);
        
        const resource = createAudioResource(filepath);
        const player = createAudioPlayer();
        
        player.play(resource);
        connection.subscribe(player);
        
        player.on(AudioPlayerStatus.Idle, () => {
            player.stop();
            fs.unlink(filepath, (err) => {
                if (err) console.error("ファイル削除エラー: ", err);
            });
        });
    } catch (error) {
        console.error("音声再生エラー: ", error);
    }
}

export async function voice(message: Message) {
    const channel = message.member?.voice.channel;
    if (!channel) return;
    
    const user = await getUser(message.author.id);
    if (!user) return;

    const text = await get_reading(message.guild?.id as string, message.content);
    
    await playAudio(channel.guild.id, text, user.voice);
}

export async function join(newState: any) {
    const channel = newState.channel;
    if (!channel) return;
    
    const user = await getUser(newState.member?.user.id);
    if (!user) return;
    
    let name;
    if (user.name === null) {
        name = newState.member?.user.displayName;
    } else {
        name = user.name;
    }
    await playAudio(channel.guild.id, `${name}さんが参加しました`, 8);
}
