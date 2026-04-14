const { Client } = require('discord.js-selfbot-v13');
const express = require('express');

const app = express();

// --- الإعدادات ديالك ---
const TOKEN = 'MTE4MjAzNTA3OTY5NDkxMzU2Ng.GoD3IU.pbIYOwfm-3xKGuQRPhsCAE3HL2QBkFGJpD0N2o';
const CHANNEL_ID = '1492956296868003931';
// ----------------------

const client = new Client({ checkUpdate: false });

// سيرڤر باش يبقى الكود فايق مع Cron-job
app.get('/', (req, res) => res.send('Selfbot is 24/7 Active!'));
app.listen(3000, () => console.log('✅ Web Server is ready.'));

// 🔥 نظام الحماية من الطيحان (Anti-Crash)
process.on('unhandledRejection', (error) => {
    console.log('⚠️ [Anti-Crash] مشكل بسيط تم التجاوز ديالو، الكود غيبقى خدام.');
});
process.on('uncaughtException', (error) => {
    console.log('⚠️ [Anti-Crash] مشكل بسيط تم التجاوز ديالو، الكود غيبقى خدام.');
});

const joinVoice = async () => {
  try {
    const channel = await client.channels.fetch(CHANNEL_ID);
    await client.voice.joinChannel(channel, {
      selfMute: true,  // المايك مسدود باش ما يعيقوش بيك
      selfDeaf: true,  // الصوت مسدود باش الكود يكون خفيف
      videoSelf: false,
    });
    console.log(`🎙️ دخلت للروم: ${channel.name} بنجاح!`);
  } catch (err) {
    console.error('⚠️ مشكل فالدخول، غنحاولو من بعد 10 ثواني...');
    setTimeout(joinVoice, 10000); 
  }
};

client.on('ready', async () => {
  console.log(`✅ البوت خدام دابا بكونط: ${client.user.tag}`);
  joinVoice();
});

// 🔄 الكود "العنيد" لي كيرجع الكونط للروم يلا جراو عليه
client.on('voiceStateUpdate', (oldState, newState) => {
  if (oldState.id === client.user.id && !newState.channelId) {
    console.log('🔄 ديسكورد خرجوني من الروم! أنا راجع دابا بالزز...');
    setTimeout(joinVoice, 4000); // كيتسنى 4 ثواني وكيرجع يدخل
  }
});

client.login(TOKEN).catch(err => {
  console.error('❌ التوكن غالط أو مابقاش خدام (خاصك تبدل المودباس وتجيب توكن جديد).');
});
