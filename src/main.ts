import { GatewayIntentBits, Client, Partials, Message } from 'discord.js'
import { getVoiceConnection } from '@discordjs/voice'
import dotenv from 'dotenv'

import { setcmd } from './register_cmd'
import { cmd } from './command'
import { msg } from './message'
import { join } from './voice'

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

client.on('messageCreate', msg)

client.on('voiceStateUpdate', async (oldState, newState) => {
  const statusChk =
    oldState.serverDeaf === newState.serverDeaf &&
    oldState.serverMute === newState.serverMute &&
    oldState.selfDeaf === newState.selfDeaf &&
    oldState.selfMute === newState.selfMute &&
    oldState.selfVideo === newState.selfVideo &&
    oldState.streaming === newState.streaming;

  const channel = newState.channel;
  const connection = getVoiceConnection(channel?.guild.id!);
  if (connection && newState.member?.user.id !== process.env.client_id) {
    if ((statusChk == true || oldState.serverDeaf == null) && newState.channel) {
      //console.log('join');
      //console.log(`User ${newState.member?.user.id} (${newState.member?.user.tag}) joined ${newState.member?.user.displayName}`);
      await join(newState);
    }
  }
})

client.login(process.env.TOKEN)
