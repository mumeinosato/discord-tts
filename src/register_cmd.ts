import { REST, Routes } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const commands = [
    {
        name: "join",
        description: "読み上げを開始します",
    },
    {
        name: "leave",
        description: "読み上げを終了します",
    },
    {
        name: "name",
        description: "ユーザー名の読み上げ方を指定します",
        options: [
            {
                name: "txt",
                description: "読み上げ方",
                type: 3,
                required: true
            }
        ]
    },
    {
        name: "add_dictionary",
        description: "辞書に追加します",
        options: [
            {
                name: "word",
                description: "追加する単語",
                type: 3,
                required: true
            },
            {
                name: "reading",
                description: "読み方",
                type: 3,
                required: true
            }
        ]
    },
    {
        name: "remove_dictionary",
        description: "辞書から削除します",
        options: [
            {
                name: "word",
                description: "削除する単語",
                type: 3,
                required: true
            }
        ]
    },
]

if (!process.env.TOKEN) {
    throw new Error('TOKEN is not defined in the environment variables');
}

if (!process.env.client_id) {
    throw new Error('CLIENT_ID is not defined in the environment variables');
}


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

export async function setcmd(): Promise<void> {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.client_id as string),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
        return;
    } catch (error) {
        console.error(error);
        return;
    }
}