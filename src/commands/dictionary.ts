import { add_dictionary, remove_dictionary } from "../utils/dictionary";

export async function dictionarycmd(cmdname: string, client: any, interaction: any): Promise<string> {
    if (cmdname === "add_dictionary"){
        const server = interaction.guild.id
        const word = interaction.options.getString("word")
        const reading = interaction.options.getString("reading")
        await add_dictionary(server, word, reading)
        return "辞書に追加しました"
    } else if (cmdname === "remove_dictionary") {
        const server = interaction.guild.id
        const word = interaction.options.getString("word")
        await remove_dictionary(server, word)
        return "辞書から削除しました"
    }

    return "test"
}
