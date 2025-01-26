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