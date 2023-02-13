// MODULES
const { Telegraf } = require('telegraf');
const { openaiResponse, chatSonicResponse } = require('./gpt');
const {envData} = require('./env')

// API AUTHENTICATION
const bot = new Telegraf(envData.telegramToken);

/////////BOT LOGIC////////
bot.start((ctx) => {
    console.log('Message: ', ctx.message.text);
    console.log('Message: ', envData);
    if (envData.dev.UsersId.includes(ctx.from.id) || envData.users.UsersId.includes(ctx.from.id)) {
        ctx.reply(`wellcome ${ctx.from.first_name}! \nThis is a playgroud for a chatbot like ChatGPT, `+
        'you can use OpenAI api by just writting anything.')
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