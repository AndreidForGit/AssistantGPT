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
        ctx.reply(`wellcome ${ctx.from.first_name}! \nThis is a playgroud for a chatbot like ChatGPT, `+
        'you can use OpenAI api by just writting anything.\nYou can also use /sonic to interact with '+
        'WritteSonic api, witch is based on the same GPT-3 model.')
    } else {
        ctx.reply(`wellcome ${ctx.from.first_name}!, Tu id es: ${ctx.from.id}`)
    }
})

// WRITTESONIC RESPONSES
bot.command('sonic', ctx => {
    console.log('Message to sonic: ', ctx.message.text)
    chatSonicResponse(ctx)
})

// OPENAI RESPONSES
bot.on('text', ctx => {
    openaiResponse(ctx)
})

bot.launch()