require('dotenv').config();
const Discord = require('discord.js');
const axios = require('axios');
const TOKEN = process.env.TOKEN;
const bot = new Discord.Client();
const targets = ['/waifu', '/neko', '/megumin', '/shinobu'];

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`I'm ready, logged in as ${bot.user.tag}`);
});

bot.on('message', (msg) => {
  if (msg.author.bot) return;

  const foundWord = targets.find((target) => msg.content.includes(target));
  if (foundWord) {
    axios.get('https://api.waifu.pics/sfw${foundWord}').then((response) => {

      msg.channel.send(
        `Here you go ---> ${response.data.url}`
      );
    });
  }
});
