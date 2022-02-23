require('dotenv').config();

import { Client } from 'discord.js';
import { get } from 'axios';

const TOKEN = process.env.TOKEN;
const Tsuzumi = new Client();
// Prefix is /
const commands = ['/waifu', '/neko', '/shinobu', '/megumin'];


Tsuzumi.login(TOKEN);

Tsuzumi.on('ready', () => {
  console.info(`I'm ready. I've logged in as ${Tsuzumi.user.tag}`);
});

Tsuzumi.on('message', (msg) => {
  if (msg.author.Tsuzumi) return;

  const detectedCommand = commands.find((well) => msg.content.includes(well));
  if (detectedCommand) {
    get('https://api.waifu.pics/${detectedCommand}').then((response) => {

      msg.channel.send(
        `Here you go ---> ${response.data.url}`
      );
    });
  }
});
