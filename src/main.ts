import { GatewayIntentBits, Client, Partials, Message } from 'discord.js'
import dotenv from 'dotenv'

import { setcmd } from './register_cmd'
import { cmd } from './command'

dotenv.config()

const client = new Client({
    intents: [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember],
  })

client.once('ready', async() => {
    await setcmd()
    console.log('Ready!')
    if(client.user){
        console.log(client.user.tag)
    }
})

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return
  const message = await cmd(interaction.commandName, client, interaction)
  await interaction.reply(message as string)
});

client.login(process.env.TOKEN)
