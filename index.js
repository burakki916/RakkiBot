const { Client, Intents } = require('discord.js');
const { token } = require('./token.json');
const handler = require('./commandHandler');
var calorant = require('./calorant');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once('ready', () => {
  const channel = client.channels.cache.get("980694201220096010");
  channel.send("Bot is up!");
  calorant.init(client);
  client.user.setStatus("r!help for help"); 
  setInterval(updateShit,60000);
  function updateShit(){
    calorant.timey(client);
  }

      

});
client.on('message',message =>{
if(message.content.startsWith('r!')){
    console.log("["+ message.author.username+"] " + message.content);
    handler.handle(message); 
    // if(message.content.startsWith("r!update")){
    //   calorant.sendSummary(client,"Day");
    // }
}

});

client.login(token);