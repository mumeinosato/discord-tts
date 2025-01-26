import { joinVoiceChannel, getVoiceConnection } from "@discordjs/voice";
import { vccmd } from "./commands/vc";
import { namecmd } from "./commands/name";

export async function cmd(cmdname: string, client: any, interaction: any): Promise<String> {
    if (cmdname === "join" || cmdname === "leave") {
        return await vccmd(cmdname, client, interaction)
    } else if (cmdname  === "name") {
        return namecmd(interaction)
    }
    
    return "test"
}