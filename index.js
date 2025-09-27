const { Telegraf } = require('telegraf');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { TOKEN, OWNER } = require('./token.js')

const bot = new Telegraf(TOKEN);

// Captions
const startCaption = `\`\`\`7-Bot
Hello there, My name is Seven-Bot,
Select a button to continue
\`\`\``;
const allmenuCaption = `\`\`\`7-Bot
Menu yang sudah di sediakan :
=> /spotify
=> /ytmp3
=> /ytmp4
=> /tourl
=> /pinterest
=> /ytstalk
\`\`\``;
// Commands
bot.start((ctx) => {
  ctx.replyWithPhoto("https://files.catbox.moe/6h1oae.jpg", {
    caption: startCaption,
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [[
        {
          text: "Show Features", callback_data: "allmenu"
        },
        {
          text: "Telegram Channel", url: "https://t.me/D7eppeli_Exploration"
        }
      ]]
    }
  });
})

bot.action("allmenu", async(ctx) => {
  ctx.editMediaMessage({
    type: "photo",
    media: "https://files.catbox.moe/6h1oae.jpg",
    caption: allmenuCaption,
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [[
        {
          text: "Back to home", callback_data: "menu"
        },
        {
          text: "Telegram Channel", url: "https://t.me/D7eppeli_Exploration"
        }
      ]]
    }
  });
})

bot.action("menu", async(ctx) => {
  ctx.editMediaMessage({
    type: "photo",
    media: "https://files.catbox.moe/6h1oae.jpg",
    caption: startCaption,
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [[
        {
          text: "Show Features", callback_data: "allmenu"
        },
        {
          text: "Telegram Channel", url: "https://t.me/D7eppeli_Exploration"
        }
      ]]
    }
  });
})

bot.command("spotify", async(ctx) => {
  const args = ctx.message.text.split(" ")
  const teks = args[1];
  const res = axios.get(`https://api.siputzx.my.id/api/s/spotify?query=${encodeURIComponent(teks)}`);
  const data = res.data;
  const hasil = data.data[0];
  const urlLagu = await axios.get(`https://api.siputzx.my.id/api/d/spotifyv2?url=${encodeURIComponent(hasil.track_url)}`);
  const dLagu = urlLagu.data;
  const caption = `\`\`\`
  🎵 *Title:* ${hasil.title}
  🎤 *Artist:* ${hasil.artist}
  ⏱️ *Duration:* ${hasil.duration}
  💿 *Album:* ${hasil.album}
  📅 *Release Date:* ${hasil.release_date}
  🔗 *Spotify URL:* ${hasil.track_url}
  \`\`\``;

  ctx.replyWithAudio(dLagu.mp3DownloadLink, {
    caption: caption,
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [[
        {
          text: "Lets Dance",
          callback_data: "Bwabwa"
        }
      ]]
    }
  });
})

bot.command("yts", async(ctx) => {
  const args = ctx.message.text.split(" ")
  const teks = args[1];
  const res = axios.get(`https://api.siputzx.my.id/api/s/youtube?query=${encodeURIComponent(teks)}`);
  const data = res.data;
  const hasil = data.data[0];
  const urlLagu = await axios.get(`https://api.siputzx.my.id/api/d/spotifyv2?url=${encodeURIComponent(hasil.track_url)}`);
  const dLagu = urlLagu.data;
  const caption = `\`\`\`
  Title: ${hasil.title}
  Author: ${hasil.author.name}
  Duration: ${hasil.duration.seconds}
  Views: ${hasil.views}
  Release Date: ${hasil.ago}
  URL: ${hasil.url}
  \`\`\``;

  ctx.replyWithPhoto(hasil.image, {
    caption: caption,
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: [[
        {
          text: "Download mp3",
          callback_data: "ytmp3"
        },
        {
          text: "Download mp4",
          callback_data: "ytmp4"
        }
      ]]
    }
  });
})
