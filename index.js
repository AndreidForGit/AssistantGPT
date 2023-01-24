// MODULES
const { Telegraf } = require('telegraf');
const { openaiResponse, chatSonicResponse } = require('./gpt');
require('dotenv').config();

// API AUTHENTICATION
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

/////////BOT LOGIC////////
bot.start((ctx) => {
    console.log('Message: ', ctx.message.text);
    if (ctx.from.id === parseInt(process.env.DEV)) {
        ctx.reply(`wellcome ${ctx.from.first_name}!`)
    } else {
        ctx.reply(`wellcome ${ctx.from.first_name}!, Tu id es: ${ctx.from.id}`)
    }
})

// OPENAI RESPONSES
bot.on('text', ctx => {
    openaiResponse(ctx)
})

// WRITTESONIC RESPONSES
bot.command('sonic', ctx => {
    console.log('Message: ', ctx.message.text)
    chatSonicResponse(ctx)
})

bot.launch()