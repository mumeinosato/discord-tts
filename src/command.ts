import { joinVoiceChannel, getVoiceConnection } from "@discordjs/voice";
import { vccmd } from "./commands/vc";
import { namecmd } from "./commands/name";
import { dictionarycmd } from "./commands/dictionary";

export async function cmd(cmdname: string, client: any, interaction: any): Promise<String> {
    if (cmdname === "join" || cmdname === "leave") {
        return await vccmd(cmdname, client, interaction)
    } else if (cmdname  === "name") {
        return namecmd(interaction)
    } else if (cmdname === "add_dictionary" || cmdname === "remove_dictionary") {
        return await dictionarycmd(cmdname, client, interaction)
    }
    
    return "test"
}