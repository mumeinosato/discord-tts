import { joinVoiceChannel, getVoiceConnection } from "@discordjs/voice";

export async function cmd(cmdname: string, client: any, interaction: any): Promise<String> {
    if (cmdname === "join") {
        const member = interaction.member

        if (member) {
            const channel = member.voice.channel
            if (!channel) {
                return "VCに接続してからコマンドを実行してください"
            }
            joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });
            return "VCに参加しました"
        }
    } else if (cmdname === "leave") {
        const channel = interaction.member.voice.channel

        if (!channel) {
            return "VCに接続してからコマンドを実行してください"
        }
        const connection = getVoiceConnection(channel.guild.id)
        if (connection) {
            connection.destroy()
            return "VCから退出しました"
        } else {
            return "VCに参加していません"
        }
    }

    return "test"
}