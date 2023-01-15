const sdk = require('api')('@writesonic/v2.2#4enbxztlcbti48j');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
sdk.auth(process.env.AI_TOKEN);

bot.start((ctx) => {
    console.log('Message: ', ctx.message.text);
    replyMessage(ctx, `wellcome ${ctx.from.first_name}!`)
})

bot.on('text', ctx => {
    sdk.chatsonic_V2BusinessContentChatsonic_post({
        enable_google_results: 'true',
        enable_memory: true,
        input_text: ctx.message.text
    }, {engine: 'premium'})
    .then(({ data }) => {
        console.log(ctx.message.text);
        console.log(data);
        if (ctx.from.id === parseInt(process.env.DEV)) {
            return ctx.reply(data.message)
        }
    })
    .catch(err => console.error(err));
})

bot.launch()