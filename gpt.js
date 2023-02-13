// modules
const sdk = require('api')('@writesonic/v2.2#4enbxztlcbti48j');
const { Configuration, OpenAIApi } = require("openai");
const { envData } = require('./env')


// logic
const openaiResponse =(async (ctx) => {
  try {
    if (envData.dev.UsersId.includes(ctx.from.id)) {

      const configuration = new Configuration({
        apiKey: envData.dev.openaiKey,
      });
      const openai = new OpenAIApi(configuration);

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
    } else if (envData.users.UsersId.includes(ctx.from.id)) {
      const configuration = new Configuration({
        apiKey: envData.users.openaiKey,
      });
      const openai = new OpenAIApi(configuration);
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
        return ctx.reply(response.data.choices[0].text + '\n Hola puta')
    } else {return ctx.reply("bad request")}
  } catch (err) {
    console.log(err)
    return ctx.reply(err)
  }
});


const chatSonicResponse = (ctx) => {
  sdk.auth(envData.dev.writesonicKey);
  var message = ctx.message.text.replace('/sonic ', '')
  if (envData.dev.UsersId.includes(ctx.from.id)) {
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