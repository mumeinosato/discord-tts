import { Message } from "discord.js";
import { voice } from "./voice";

export async function msg(message: Message) {
    if (message.author.bot) return

    const channel = message.member?.voice.channel
    if(channel) {
        await voice(message)
    }
}