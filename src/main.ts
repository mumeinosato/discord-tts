import { GatewayIntentBits, Client, Partials, Message } from 'discord.js'
import dotenv from 'dotenv'

import { setcmd } from './register_cmd'

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


client.login(process.env.TOKEN)
