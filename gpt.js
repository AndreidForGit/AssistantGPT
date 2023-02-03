// modules
const sdk = require('api')('@writesonic/v2.2#4enbxztlcbti48j');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

// authentication
sdk.auth(process.env.WRITESONIC_KEY);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// logic
const openaiResponse =(async (ctx) => {
  try {
      if (ctx.from.id === parseInt(process.env.DEV)) {
      const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: ctx.message.text,
          max_tokens: 1024,
          temperature: 0.5,
          n: 1,
          stop: null
      });
      console.log(ctx.message.text);
      console.log(response.data);
      return ctx.reply(response.data.choices[0].text)
    } else {return ctx.reply("bad request")}
  } catch (err) {
    console.log(err)
    return ctx.reply(err)
  }
});


const chatSonicResponse = (ctx) => {
  var message = ctx.message.text.replace('/sonic ', '')
  if (ctx.from.id === parseInt(process.env.DEV)) {
    sdk.chatsonic_V2BusinessContentChatsonic_post({
        enable_google_results: 'true',
        enable_memory: true,
        input_text: message
    }, {engine: 'premium'})
    .then(({ data }) => {
        console.log(message);
        console.log(data);
        return ctx.reply(data.message + '\nBy: Sonic')
    })
    .catch(err => console.error(err));
  }
}

module.exports = {openaiResponse, chatSonicResponse}