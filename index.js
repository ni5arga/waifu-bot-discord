require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const axios = require('axios');
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const targets = ['-waifu'];

bot.login(TOKEN);

bot.on('ready', async () => {
  console.info(`I'm ready, logged in as ${bot.user.tag}`);

  // Register the slash command globally
  const commands = [
    {
      name: 'waifu',
      description: 'Get a random waifu image'
    },
  ];

  const rest = new REST({ version: '9' }).setToken(TOKEN);

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
});

bot.on('messageCreate', (msg) => {
  if (msg.author.bot) return;

  const foundWord = targets.find((target) => msg.content.includes(target));
  if (foundWord) {
    axios.get('https://api.waifu.pics/sfw/waifu').then((response) => {
      msg.channel.send(`Here you go ---> ${response.data.url}`);
    });
  }
});

bot.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'waifu') {
    try {
      const response = await axios.get('https://api.waifu.pics/sfw/waifu');
      await interaction.reply(`Here you go ---> ${response.data.url}`);
    } catch (error) {
      console.error('Error fetching waifu image:', error);
      await interaction.reply('Failed to fetch waifu image. Please try again later.');
    }
  }
});
