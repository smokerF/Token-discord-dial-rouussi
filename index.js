const { Client } = require('discord.js-selfbot-v13');
const express = require('express');

const client = new Client({ checkUpdate: false });
const app = express();

// --- CONFIGURATION ---
const TOKEN = 'MTE4MjAzNTA3OTY5NDkxMzU2Ng.GOj5cl.TR6a4XmU66hItA7UzVs54CoxLYmm-071Toj7WE'; // حط التوكن هنا بين هاد جوج شريطات
const CHANNEL_ID = '1492957715058786325'; 
// ---------------------

app.get('/', (req, res) => res.send('Selfbot is Active!'));
app.listen(3000, () => console.log('Web Server ready.'));

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const channel = await client.channels.fetch(CHANNEL_ID);

  const joinVoice = async () => {
    try {
      await client.voice.joinChannel(channel, {
        selfMute: false,
        selfDeaf: false,
        videoSelf: false,
      });
      console.log(`Joined channel: ${channel.name}`);
    } catch (err) {
      console.error('Error joining voice:', err);
      setTimeout(joinVoice, 10000); 
    }
  };

  joinVoice();
});

client.on('shardDisconnect', () => {
  console.log('Disconnected! Reconnecting...');
});

client.login(MTE4MjAzNTA3OTY5NDkxMzU2Ng.GOj5cl.TR6a4XmU66hItA7UzVs54CoxLYmm-071Toj7WE);
