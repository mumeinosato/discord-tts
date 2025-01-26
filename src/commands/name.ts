import { setName } from "../utils/user";

export async function namecmd(interaction: any): Promise<string> {
    const name = interaction.options.getString("txt")
    const id = interaction.member.user.id
    await setName(id, name)
    return "ユーザー名を設定しました"
}